/**
 * @file teams-sync.js
 * Bridge Team locale <-> server. Il locale (TEAMS in app.js) resta la sorgente per
 * la UI; questo modulo fa da MIRROR col server via teams-api.js, in modo additivo e
 * non invasivo (rifondazione graduale: la grafica non cambia). Caricato DOPO app.js
 * (usa TEAMS, TEAM_SEQ, saveTeams, renderTeams) e dopo teams-api.js.
 *
 * Inerte senza sessione: se non loggato o Supabase assente, ogni funzione è no-op.
 *
 * Collegamento su un team: campo `sid` = id (uuid) del team sul server.
 *  - team creato dall'utente  -> teamsCloudPushNew(t)  : lo crea sul server, salva t.sid
 *  - al login/boot            -> teamsCloudPull()      : scarica i team del server e li
 *                                                        fonde nel locale (dedup per sid)
 *
 * SLICE 1 (questa): creazione + pull con idratazione membri. Task/proposte/chat/inviti
 * e realtime arrivano nelle fette successive.
 */

// Palette e iniziale per ricostruire i membri scaricati (il server non tiene colore/iniziale UI).
const TC_PALETTE=['#8d7bd0','#6f9bf0','#7ed0b0','#f0c46f','#ef9a9a','#e0a3f0','#f4a6c8','#8a5a4a','#5aa0a0','#b8a6f4'];
function tcInitial(name){ const s=String(name||'').trim(); return s?s[0].toUpperCase():'?'; }
function tcColor(i){ return TC_PALETTE[(i||0)%TC_PALETTE.length]; }

// Sono loggato? (sessione reale lato server). Riusa lo stesso criterio del resto dell'app.
async function tcLoggedUid(){ if(!sb) return null; try{ const{data:{user}}=await sb.auth.getUser(); return user?user.id:null; }catch(e){ return null; } }

// Mappa un membro-server -> membro-locale (shape della UI), tenendo l'uid reale.
function tcMemberFromServer(m,idx){ return { i:tcInitial(m.name), c:tcColor(idx), name:m.name||'Utente', admin:!!m.admin, tags:Array.isArray(m.tags)?m.tags:[], uid:m.uid, status:m.status||'active' }; }

// Mette su un team-locale appena creato il mirror sul server (fire-and-forget, non blocca la UI).
async function teamsCloudPushNew(t){
  try{
    if(!t||t.sid) return;                 // già su server o niente da fare
    const uid=await tcLoggedUid(); if(!uid) return;   // offline: resta solo locale
    const r=await sbTeamCreate(t.name, t.color||null, t.desc||null);
    if(r&&r.ok&&r.team){
      t.sid=r.team.id;                    // aggancio locale<->server
      // il membro "io" locale prende il mio uid reale (così le assegnazioni combaciano)
      const me=(t.members||[]).find(m=>m.admin)||t.members&&t.members[0];
      if(me&&!me.uid) me.uid=uid;
      if(typeof saveTeams==='function') saveTeams();
    }
  }catch(e){ /* mirror best-effort: il locale funziona comunque */ }
}

function tcFirst(name){ return (typeof firstName==='function')?firstName(name):String(name||'').split(' ')[0]; }

// Rimuove dalla campanella (INVITES_IN) tutti gli inviti cloud, o solo quello con un dato sid.
function tcClearCloudInvites(sid){
  if(typeof INVITES_IN==='undefined') return false;
  let ch=false;
  for(let i=INVITES_IN.length-1;i>=0;i--){ const x=INVITES_IN[i]; if(x&&x.cloud&&(!sid||x.sid===sid)){ INVITES_IN.splice(i,1); ch=true; } }
  return ch;
}

// Scarica i team del server: i team dove sono ATTIVO entrano nel locale; quelli dove sono
// solo INVITATO vanno nella campanella come inviti reali (dedup per sid). Boot autenticato.
let _tcPulling=false;
async function teamsCloudPull(){
  if(_tcPulling) return; _tcPulling=true;
  try{
    const uid=await tcLoggedUid(); if(!uid){ return; }
    if(typeof TEAMS==='undefined'){ return; }
    const rows=await sbTeamsList();
    if(!Array.isArray(rows)){ return; }
    let changed=false, invChanged=false;
    invChanged=tcClearCloudInvites()||invChanged;   // ricostruiamo gli inviti cloud da zero
    for(const row of rows){
      const members=await sbTeamMembers(row.id);
      const mine=members.find(m=>m.uid===uid);
      const myStatus=mine?mine.status:(row.owner_id===uid?'active':'active');
      if(myStatus==='invited'){
        // invito in attesa → campanella, NON è ancora un team mio
        const owner=members.find(m=>m.uid===row.owner_id);
        if(typeof INVITES_IN!=='undefined' && !INVITES_IN.some(x=>x.sid===row.id)){
          INVITES_IN.push({id:'c:'+row.id, sid:row.id, cloud:true, team:row.name||'Team', emoji:'🧩', from:(owner?tcFirst(owner.name):'Qualcuno')});
          invChanged=true;
        }
        const li=TEAMS.findIndex(t=>t.sid===row.id);   // se c'era come attivo, toglilo
        if(li>=0){ TEAMS.splice(li,1); changed=true; }
        continue;
      }
      // membro attivo (o owner): upsert del team nel locale
      const mapped=members.filter(m=>m.status!=='left').map(tcMemberFromServer);
      let local=TEAMS.find(t=>t.sid===row.id);
      if(local){
        local.name=row.name||local.name;
        if(row.color) local.color=row.color;
        if(mapped.length) local.members=mapped;
        changed=true;
      }else{
        TEAMS.push({
          tid:(typeof TEAM_SEQ!=='undefined'?TEAM_SEQ++:Date.now()),
          sid:row.id, cloud:true,
          name:row.name||'Team', color:row.color||tcColor(0), act:0,
          owner:row.owner_id===uid, desc:row.description||'',
          invites:[], spaces:[], docs:[], events:[], cm:{},
          members:mapped.length?mapped:[{i:'I',c:tcColor(0),name:'Io',admin:true,tags:[],uid:uid}]
        });
        changed=true;
      }
    }
    if(changed){
      if(typeof saveTeams==='function') saveTeams();
      if(typeof renderTeams==='function') renderTeams();
      if(typeof syncTaskTeams==='function') syncTaskTeams();
    }
    if(invChanged && typeof renderBell==='function') renderBell();
  }catch(e){ /* best-effort */ }
  finally{ _tcPulling=false; }
}

// Invita un amico (connessione reale) in un team: assicura che il team sia sul server, poi crea l'invito.
async function teamsCloudInviteFriend(t,friendUid){
  const uid=await tcLoggedUid(); if(!uid) return{error:'no-auth'};
  if(!t||!friendUid) return{error:'bad-args'};
  if(!t.sid){ await teamsCloudPushNew(t); }
  if(!t.sid) return{error:'no-sid'};
  if((t.members||[]).some(m=>m.uid===friendUid)) return{error:'already'};
  return await sbTeamInvite(t.sid, friendUid, false, []);
}

// Accetto un invito reale: divento membro attivo e il team scende come attivo (re-pull).
async function teamsCloudAcceptInvite(sid){
  if(!sid) return{error:'no-sid'};
  const r=await sbTeamRespondInvite(sid,true);
  if(r&&r.error) return r;
  tcClearCloudInvites(sid);
  await teamsCloudPull();
  return{ok:true};
}

// Rifiuto un invito reale: la mia riga membro va a 'left'.
async function teamsCloudDeclineInvite(sid){
  if(!sid) return{error:'no-sid'};
  const r=await sbTeamRespondInvite(sid,false);
  if(r&&r.error) return r;
  tcClearCloudInvites(sid);
  if(typeof renderBell==='function') renderBell();
  return{ok:true};
}
