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
    // loggato: via gli inviti-demo finti hardcoded (restano solo gli inviti reali)
    if(typeof INVITES_IN!=='undefined'){ for(let i=INVITES_IN.length-1;i>=0;i--){ if(INVITES_IN[i]&&!INVITES_IN[i].cloud){ INVITES_IN.splice(i,1); invChanged=true; } } }
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
      // task e proposte condivise del team (merge, best-effort)
      const lt=TEAMS.find(t=>t.sid===row.id);
      if(lt){ if(await teamsCloudPullTasks(lt)) changed=true; await teamsCloudPullProposals(lt); }
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

// ============================================================================
// SLICE 3/4 — task, proposte, chat e realtime sul server (per i team cloud)
// Tutto guardato su t.sid: i team solo-locali (demo/offline) restano intatti.
// ============================================================================
function tcTeamBySid(sid){ if(typeof TEAMS==='undefined') return null; return TEAMS.find(t=>t.sid===sid)||null; }
function tcMemberUid(t,idx){ const m=t&&t.members&&t.members[idx]; return m?m.uid:null; }
function tcMemberIdxByUid(t,uid){ if(!t||!t.members||!uid) return -1; return t.members.findIndex(m=>m.uid===uid); }
function tcDateToIso(dt){ return (typeof isoFromDate==='function')?isoFromDate(dt):''; }
function tcIsoToDate(iso){ if(!iso) return (typeof realToday==='function')?realToday():null; const p=String(iso).split('-').map(Number); return (p.length===3&&p[0])?[p[0],p[1]-1,p[2]]:((typeof realToday==='function')?realToday():null); }

// ---- TASK di team ----
async function teamsCloudCreateTask(t,task){
  try{
    if(!t||!t.sid||!task||task.stid) return;
    const uid=await tcLoggedUid(); if(!uid) return;
    const asg=(typeof task.assignee==='number')?tcMemberUid(t,task.assignee):uid;
    const r=await sbTeamTaskCreate(t.sid,{title:task.title,assignee_id:asg||uid,due:tcDateToIso(task.date),done:!!task.done,meta:{}});
    if(r&&r.task){ task.stid=r.task.id; if(typeof saveTasks==='function') saveTasks(); }
  }catch(e){}
}
async function teamsCloudToggleTask(task,done){ try{ if(task&&task.stid) await sbTeamTaskToggle(task.stid,done); }catch(e){} }

async function teamsCloudPullTasks(t){
  try{
    if(!t||!t.sid||typeof TASKS==='undefined') return false;
    const rows=await sbTeamTasks(t.sid); if(!Array.isArray(rows)) return false;
    let ch=false;
    for(const row of rows){
      const ai=row.assignee_id?tcMemberIdxByUid(t,row.assignee_id):-1;
      let lt=TASKS.find(x=>x.stid===row.id);
      if(lt){ lt.title=row.title; lt.done=!!row.done; if(ai>=0) lt.assignee=ai; if(row.due) lt.date=tcIsoToDate(row.due); ch=true; }
      else{ const task={id:(typeof TID!=='undefined'?++TID:Date.now()),stid:row.id,title:row.title,scope:'team:'+t.tid,date:tcIsoToDate(row.due),done:!!row.done}; if(ai>=0) task.assignee=ai; TASKS.push(task); ch=true; }
    }
    if(ch && typeof saveTasks==='function') saveTasks();
    return ch;
  }catch(e){ return false; }
}

// ---- PROPOSTE (accetta/modifica/rifiuta) ----
async function teamsCloudCreateProposal(t,memberIdx,mm){
  try{
    if(!t||!t.sid||!mm||mm.propSid) return;
    const toUid=tcMemberUid(t,memberIdx); if(!toUid) return;
    const draft=mm.draft||{title:mm.title,deadline:mm.deadline};
    const r=await sbTeamProposalCreate(t.sid,toUid,{title:mm.title,due:mm.deadline||null,draft:draft});
    if(r&&r.proposal){ mm.propSid=r.proposal.id; if(typeof saveTeams==='function') saveTeams(); }
  }catch(e){}
}
async function teamsCloudRespondProposal(mm,action,extra){ try{ if(!mm||!mm.propSid) return null; return await sbTeamProposalRespond(mm.propSid,action,extra||{}); }catch(e){ return null; } }

async function teamsCloudPullProposals(t){
  try{
    if(!t||!t.sid) return false;
    const uid=await tcLoggedUid(); if(!uid) return false;
    const rows=await sbTeamProposals(t.sid); if(!Array.isArray(rows)) return false;
    let ch=false;
    for(const p of rows){
      const mine=p.from_id===uid; const otherUid=mine?p.to_id:p.from_id;
      const oi=tcMemberIdxByUid(t,otherUid); if(oi<0) continue;
      const chan='dm:'+oi; const list=(typeof chatMsgs==='function')?chatMsgs(t,chan):null; if(!list) continue;
      let mm=list.find(x=>x.propSid===p.id);
      if(!mm){ list.push({proposal:true,mine:mine,title:p.title||(p.draft&&p.draft.title)||'Task',deadline:p.due||'',draft:p.draft||null,status:p.status,reason:p.reason||'',propSid:p.id,ts:(typeof nowTs==='function'?nowTs():Date.now())}); ch=true; }
      else if(mm.status!==p.status||mm.reason!==(p.reason||'')){ mm.status=p.status; mm.reason=p.reason||''; if(p.due) mm.deadline=p.due; ch=true; }
    }
    if(ch && typeof saveTeams==='function') saveTeams();
    return ch;
  }catch(e){ return false; }
}

// ---- CHAT di team ----
async function tcServerChannel(t,localChan){
  const myUid=await tcLoggedUid();
  if(!localChan||localChan===('team:'+t.tid)||localChan===String(t.tid)) return 'team';
  if(localChan.indexOf('dm:')===0){ const uid=tcMemberUid(t,+localChan.slice(3)); return (uid&&myUid)?dmChannel(myUid,uid):null; }
  if(localChan.indexOf('grp:')===0) return 'group:'+localChan.slice(4);
  return 'team';
}
async function teamsCloudSendChat(t,localChan,text){ try{ if(!t||!t.sid) return null; const ch=await tcServerChannel(t,localChan); if(!ch) return null; const r=await sbTeamSend(t.sid,ch,text); return (r&&r.msg)?r.msg:null; }catch(e){ return null; } }
async function teamsCloudPullChat(t,localChan){
  try{
    if(!t||!t.sid) return false; const ch=await tcServerChannel(t,localChan); if(!ch) return false;
    const uid=await tcLoggedUid(); const rows=await sbTeamMessages(t.sid,ch); if(!Array.isArray(rows)) return false;
    const list=(typeof chatMsgs==='function')?chatMsgs(t,localChan):null; if(!list) return false;
    let ch2=false;
    for(const m of rows){ if(list.some(x=>x.smid===m.id)) continue; list.push({smid:m.id,self:m.from_id===uid,text:m.text||'',ts:m.created_at?new Date(m.created_at).getTime():(typeof nowTs==='function'?nowTs():Date.now())}); ch2=true; }
    if(ch2 && typeof saveTeams==='function') saveTeams();
    return ch2;
  }catch(e){ return false; }
}

// ---- REALTIME (collaborazione istantanea sul team aperto) ----
let _tcSub=null,_tcSubSid=null,_tcRtTimer=null;
function teamsCloudUnsub(){ try{ if(_tcSub&&_tcSub.unsubscribe) _tcSub.unsubscribe(); }catch(e){} _tcSub=null; _tcSubSid=null; }
function teamsCloudSubscribe(t){
  try{
    if(!t||!t.sid) return;
    if(_tcSubSid===t.sid) return;
    teamsCloudUnsub(); _tcSubSid=t.sid;
    _tcSub=sbTeamSubscribe(t.sid,function(){ tcOnRealtime(t); });
  }catch(e){}
}
function tcOnRealtime(t){
  clearTimeout(_tcRtTimer);
  _tcRtTimer=setTimeout(async function(){
    try{
      await teamsCloudPullTasks(t); await teamsCloudPullProposals(t);
      if(typeof curChatId!=='undefined'&&curChatId) await teamsCloudPullChat(t,curChatId);
      if(typeof curTeam!=='undefined'&&curTeam&&curTeam.sid===t.sid&&typeof renderTeamMain==='function') renderTeamMain();
    }catch(e){}
  },350);
}
