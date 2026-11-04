-- ============================================================================
-- Workie — schema Supabase (ricostruito dal codice client: api.js / app.js / sync.js)
-- Da incollare in: Supabase → SQL Editor → New query → Run.
-- Ricrea il backend perso (il vecchio progetto free e' stato cancellato).
-- NB: dopo averlo eseguito, in Supabase → Authentication → Providers → Email:
--     disattiva "Confirm email" (accesso immediato per la beta).
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles : un profilo per utente (id = auth user id)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text,
  surname    text,
  username   text unique,
  bio        text,
  work_type  text,
  website    text,
  socials    jsonb default '{}'::jsonb,
  share      jsonb default '{}'::jsonb,
  photo      text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- connections : richieste/collegamenti tra utenti (pending / accepted / declined)
-- ---------------------------------------------------------------------------
create table if not exists public.connections (
  id         uuid primary key default gen_random_uuid(),
  from_id    uuid not null references auth.users(id) on delete cascade,
  to_id      uuid not null references auth.users(id) on delete cascade,
  status     text not null default 'pending',
  created_at timestamptz default now()
);
create index if not exists connections_from_idx on public.connections(from_id);
create index if not exists connections_to_idx   on public.connections(to_id);

-- ---------------------------------------------------------------------------
-- messages : chat 1-a-1 tra utenti
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  from_id    uuid not null references auth.users(id) on delete cascade,
  to_id      uuid not null references auth.users(id) on delete cascade,
  text       text not null,
  created_at timestamptz default now()
);
create index if not exists messages_from_idx on public.messages(from_id);
create index if not exists messages_to_idx   on public.messages(to_id);

-- ---------------------------------------------------------------------------
-- app_data : "cloud localStorage" per la sync cross-device (un blob jsonb per utente)
-- ---------------------------------------------------------------------------
create table if not exists public.app_data (
  id         uuid primary key references auth.users(id) on delete cascade,
  data       jsonb,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- push_subs : iscrizioni Web Push (una per endpoint/device)
-- ---------------------------------------------------------------------------
create table if not exists public.push_subs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  endpoint   text not null unique,
  p256dh     text,
  auth       text,
  created_at timestamptz default now()
);
create index if not exists push_subs_user_idx on public.push_subs(user_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles    enable row level security;
alter table public.connections enable row level security;
alter table public.messages    enable row level security;
alter table public.app_data    enable row level security;
alter table public.push_subs   enable row level security;

-- profiles: chiunque loggato puo' leggere (serve per ricerca utenti); scrivi solo il tuo
drop policy if exists profiles_read   on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists profiles_delete on public.profiles;
create policy profiles_read   on public.profiles for select to authenticated using (true);
create policy profiles_insert on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy profiles_update on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy profiles_delete on public.profiles for delete to authenticated using (auth.uid() = id);

-- connections: vedi/gestisci solo quelle in cui sei coinvolto; crei solo da te
drop policy if exists connections_read   on public.connections;
drop policy if exists connections_insert on public.connections;
drop policy if exists connections_update on public.connections;
create policy connections_read   on public.connections for select to authenticated using (auth.uid() = from_id or auth.uid() = to_id);
create policy connections_insert on public.connections for insert to authenticated with check (auth.uid() = from_id);
create policy connections_update on public.connections for update to authenticated using (auth.uid() = from_id or auth.uid() = to_id) with check (auth.uid() = from_id or auth.uid() = to_id);

-- messages: leggi quelle che ti riguardano; invii solo come mittente
drop policy if exists messages_read   on public.messages;
drop policy if exists messages_insert on public.messages;
create policy messages_read   on public.messages for select to authenticated using (auth.uid() = from_id or auth.uid() = to_id);
create policy messages_insert on public.messages for insert to authenticated with check (auth.uid() = from_id);

-- app_data: solo il tuo blob
drop policy if exists app_data_all on public.app_data;
create policy app_data_all on public.app_data for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- push_subs: solo le tue iscrizioni
drop policy if exists push_subs_all on public.push_subs;
create policy push_subs_all on public.push_subs for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- Trigger: crea automaticamente la riga profiles quando nasce un utente
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Realtime: notifiche istantanee per chat 1-a-1 (e inviti)
-- ============================================================================
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.connections;
