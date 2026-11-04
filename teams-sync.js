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

// Scarica i team del server e li fonde nel locale (dedup per sid). Chiamata al boot autenticato.
let _tcPulling=false;
async function teamsCloudPull(){
  if(_tcPulling) return; _tcPulling=true;
  try{
    const uid=await tcLoggedUid(); if(!uid){ return; }
    if(typeof TEAMS==='undefined'){ return; }
    const rows=await sbTeamsList();
    if(!Array.isArray(rows)||!rows.length){ return; }
    let changed=false;
    for(const row of rows){
      let local=TEAMS.find(t=>t.sid===row.id);
      const members=await sbTeamMembers(row.id);
      const mapped=members.map(tcMemberFromServer);
      if(local){
        // aggiorna nome/colore/membri dal server (il server è la verità per un team condiviso)
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
  }catch(e){ /* best-effort */ }
  finally{ _tcPulling=false; }
}
