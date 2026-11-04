-- ============================================================================
-- Workie — Team MULTIUTENTE sul server (fase 2 del backend)
-- Da eseguire DOPO supabase-schema.sql, nello stesso progetto Supabase.
-- Porta i Team dal locale (dati del singolo) al server condiviso tra piu' utenti:
-- un amico crea un team, invita, e si condividono membri, task, chat e approvazioni.
--
-- Scelte di modello (allineate alla UI gia' costruita):
--  - i membri sono UTENTI VERI (user_id), non piu' indici di un array locale;
--  - l'invito e' una riga team_members con status 'invited' (l'invitato accetta/rifiuta);
--  - le task hanno un assegnatario (assignee_id) e un flag done;
--  - le PROPOSTE di task (accetta/modifica/rifiuta/contro-proposta) sono una tabella
--    dedicata: la task vera nasce solo quando la proposta e' accettata;
--  - la chat di team ha canali: 'team', 'group:<id>' e 'dm:<uidA>_<uidB>'.
--  - campi extra delle task (ora, descrizione, livello, immagini) stanno in meta jsonb,
--    cosi' il modello resta snello e si estende senza migrazioni.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper SECURITY DEFINER: evitano la ricorsione tra le policy RLS
-- (una policy che interroga un'altra tabella con RLS andrebbe in loop; questi
--  helper girano coi diritti del creatore e saltano l'RLS, quindi niente loop).
-- NB: queste funzioni citano team_members, creata piu' sotto. Postgres valida il
-- corpo delle funzioni sql alla creazione: disattiviamo il check (le tabelle
-- esistono comunque quando le funzioni vengono CHIAMATE, dalle policy RLS).
-- ---------------------------------------------------------------------------
set check_function_bodies = off;

create or replace function public.is_team_member(tid uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.team_members m
    where m.team_id = tid and m.user_id = auth.uid() and m.status = 'active'
  );
$$;

create or replace function public.is_team_member_any(tid uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.team_members m
    where m.team_id = tid and m.user_id = auth.uid()
  );
$$;

create or replace function public.is_team_admin(tid uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.teams t where t.id = tid and t.owner_id = auth.uid())
      or exists (
        select 1 from public.team_members m
        where m.team_id = tid and m.user_id = auth.uid() and m.status = 'active' and m.admin = true
      );
$$;

-- ---------------------------------------------------------------------------
-- teams
-- ---------------------------------------------------------------------------
create table if not exists public.teams (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  color       text,
  description text,
  owner_id    uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- team_members  (membri + inviti: status active | invited | left)
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  admin      boolean default false,
  tags       text[] default '{}',
  status     text default 'active',
  created_at timestamptz default now(),
  unique (team_id, user_id)
);
create index if not exists team_members_user_idx on public.team_members(user_id);
create index if not exists team_members_team_idx on public.team_members(team_id);

-- ---------------------------------------------------------------------------
-- team_tasks
-- ---------------------------------------------------------------------------
create table if not exists public.team_tasks (
  id          uuid primary key default gen_random_uuid(),
  team_id     uuid not null references public.teams(id) on delete cascade,
  title       text not null,
  assignee_id uuid references auth.users(id) on delete set null,
  created_by  uuid references auth.users(id) on delete set null,
  due         date,
  done        boolean default false,
  meta        jsonb default '{}'::jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index if not exists team_tasks_team_idx on public.team_tasks(team_id);
create index if not exists team_tasks_assignee_idx on public.team_tasks(assignee_id);

-- ---------------------------------------------------------------------------
-- team_task_proposals  (flusso approvazione: pending|accepted|rejected|counter)
-- ---------------------------------------------------------------------------
create table if not exists public.team_task_proposals (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  from_id    uuid not null references auth.users(id) on delete cascade,
  to_id      uuid not null references auth.users(id) on delete cascade,
  title      text,
  due        date,
  status     text default 'pending',
  reason     text,
  draft      jsonb default '{}'::jsonb,
  task_id    uuid references public.team_tasks(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists team_proposals_team_idx on public.team_task_proposals(team_id);
create index if not exists team_proposals_to_idx   on public.team_task_proposals(to_id);

-- ---------------------------------------------------------------------------
-- team_messages  (chat di team: canali 'team' | 'group:<id>' | 'dm:<uidA>_<uidB>')
-- ---------------------------------------------------------------------------
create table if not exists public.team_messages (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  channel    text not null,
  from_id    uuid references auth.users(id) on delete set null,
  text       text,
  created_at timestamptz default now()
);
create index if not exists team_messages_chan_idx on public.team_messages(team_id, channel, created_at);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.teams               enable row level security;
alter table public.team_members        enable row level security;
alter table public.team_tasks          enable row level security;
alter table public.team_task_proposals enable row level security;
alter table public.team_messages       enable row level security;

-- teams: vedi i team di cui fai parte (anche se solo invitato); crei il tuo; admin modifica; owner elimina
drop policy if exists teams_read   on public.teams;
drop policy if exists teams_insert on public.teams;
drop policy if exists teams_update on public.teams;
drop policy if exists teams_delete on public.teams;
create policy teams_read   on public.teams for select to authenticated using (owner_id = auth.uid() or public.is_team_member_any(id));
create policy teams_insert on public.teams for insert to authenticated with check (owner_id = auth.uid());
create policy teams_update on public.teams for update to authenticated using (public.is_team_admin(id)) with check (public.is_team_admin(id));
create policy teams_delete on public.teams for delete to authenticated using (owner_id = auth.uid());

-- team_members: i membri del team si vedono tra loro; l'admin invita/gestisce; ognuno gestisce la PROPRIA riga (accetta invito / lascia)
drop policy if exists team_members_read   on public.team_members;
drop policy if exists team_members_insert on public.team_members;
drop policy if exists team_members_update on public.team_members;
drop policy if exists team_members_delete on public.team_members;
create policy team_members_read   on public.team_members for select to authenticated using (public.is_team_member_any(team_id));
create policy team_members_insert on public.team_members for insert to authenticated with check (public.is_team_admin(team_id) or user_id = auth.uid());
create policy team_members_update on public.team_members for update to authenticated using (user_id = auth.uid() or public.is_team_admin(team_id)) with check (user_id = auth.uid() or public.is_team_admin(team_id));
create policy team_members_delete on public.team_members for delete to authenticated using (user_id = auth.uid() or public.is_team_admin(team_id));

-- team_tasks: qualunque membro attivo del team legge e scrive le task del team
drop policy if exists team_tasks_all on public.team_tasks;
create policy team_tasks_all on public.team_tasks for all to authenticated using (public.is_team_member(team_id)) with check (public.is_team_member(team_id));

-- team_task_proposals: le vedono/gestiscono i due interessati; crei solo come mittente (e membro del team)
drop policy if exists team_proposals_read   on public.team_task_proposals;
drop policy if exists team_proposals_insert on public.team_task_proposals;
drop policy if exists team_proposals_update on public.team_task_proposals;
drop policy if exists team_proposals_delete on public.team_task_proposals;
create policy team_proposals_read   on public.team_task_proposals for select to authenticated using (auth.uid() = from_id or auth.uid() = to_id);
create policy team_proposals_insert on public.team_task_proposals for insert to authenticated with check (auth.uid() = from_id and public.is_team_member(team_id));
create policy team_proposals_update on public.team_task_proposals for update to authenticated using (auth.uid() = from_id or auth.uid() = to_id) with check (auth.uid() = from_id or auth.uid() = to_id);
create policy team_proposals_delete on public.team_task_proposals for delete to authenticated using (auth.uid() = from_id);

-- team_messages: membri del team; i canali 'dm:' sono visibili solo ai due uid contenuti nel nome del canale
drop policy if exists team_messages_read   on public.team_messages;
drop policy if exists team_messages_insert on public.team_messages;
create policy team_messages_read on public.team_messages for select to authenticated
  using (public.is_team_member(team_id) and (channel not like 'dm:%' or position(auth.uid()::text in channel) > 0));
create policy team_messages_insert on public.team_messages for insert to authenticated
  with check (public.is_team_member(team_id) and from_id = auth.uid() and (channel not like 'dm:%' or position(auth.uid()::text in channel) > 0));

-- ============================================================================
-- Realtime: collaborazione istantanea (task, proposte, chat, cambi membership)
-- ============================================================================
alter publication supabase_realtime add table public.team_tasks;
alter publication supabase_realtime add table public.team_task_proposals;
alter publication supabase_realtime add table public.team_messages;
alter publication supabase_realtime add table public.team_members;
