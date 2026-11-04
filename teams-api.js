/**
 * @file teams-api.js
 * Backend Team MULTIUTENTE: contratto client sopra lo schema `supabase-schema-teams.sql`.
 * Stesso stile di api.js (funzioni sb*, difensive: se non c'è server/sessione tornano
 * vuoto senza rompere). La UI non parla mai diretta col server: passa SOLO da qui.
 * Caricato DOPO api.js (che crea il client `sb`) e PRIMA di app.js.
 *
 * Modello (vedi SQL): i membri sono utenti veri (user_id); l'invito è una riga
 * team_members con status 'invited'; la task vera nasce solo quando una proposta è
 * accettata; la chat ha canali 'team' | 'group:<id>' | 'dm:<uidA>_<uidB>'.
 *
 * NB: inerte finché Supabase non è vivo e l'utente non ha una sessione. Nessuna di
 * queste funzioni è ancora cablata in app.js: è il backbone pronto da collegare.
 */

// ---- uid dell'utente loggato (null se offline/non loggato) ----
async function sbUid(){ if(!sb) return null; try{ const{data:{user}}=await sb.auth.getUser(); return user?user.id:null; }catch(e){ return null; } }

// Canale DM deterministico tra due utenti: 'dm:' + i due uid ordinati (così è uguale da entrambi i lati).
function dmChannel(a,b){ return 'dm:'+[String(a),String(b)].sort().join('_'); }

// ============================================================================
// TEAMS
// ============================================================================

// Tutti i team di cui faccio parte (membro attivo o invitato) o che possiedo. RLS filtra da sé.
async function sbTeamsList(){ if(!sb) return []; try{ const{data,error}=await sb.from('teams').select('*').order('created_at',{ascending:true}); if(error) return []; return data||[]; }catch(e){ return []; } }

// Crea un team: inserisce la riga teams (owner = io) e mi aggiunge come membro admin attivo.
async function sbTeamCreate(name,color,description){ if(!sb) return{error:'no-server'}; const uid=await sbUid(); if(!uid) return{error:'no-auth'}; try{
  const{data:t,error}=await sb.from('teams').insert({name:name,color:color||null,description:description||null,owner_id:uid}).select().single();
  if(error) return{error:error.message};
  const{error:me}=await sb.from('team_members').insert({team_id:t.id,user_id:uid,admin:true,status:'active'});
  if(me) return{error:me.message};
  return{ok:true,team:t};
}catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamUpdate(teamId,fields){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('teams').update(fields).eq('id',teamId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamDelete(teamId){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('teams').delete().eq('id',teamId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

// ============================================================================
// MEMBRI + INVITI
// ============================================================================

// Membri del team arricchiti col profilo (nome, username, foto). Due query: niente FK diretta member→profiles.
async function sbTeamMembers(teamId){ if(!sb) return []; try{
  const{data:rows,error}=await sb.from('team_members').select('*').eq('team_id',teamId);
  if(error||!rows||!rows.length) return [];
  const ids=rows.map(r=>r.user_id);
  const{data:profs}=await sb.from('profiles').select('*').in('id',ids);
  const byId={}; (profs||[]).forEach(p=>{ byId[p.id]=p; });
  return rows.map(r=>{ const p=byId[r.user_id]||{}; return {
    memberId:r.id, uid:r.user_id, admin:!!r.admin, tags:Array.isArray(r.tags)?r.tags:[], status:r.status||'active',
    name:(((p.name||'')+' '+(p.surname||'')).trim())||'Utente', username:p.username||'', photo:p.photo||'',
  }; });
}catch(e){ return []; } }

// Invita un utente (già profilo/registrato): riga membro con status 'invited'. L'invitato poi accetta.
async function sbTeamInvite(teamId,userId,admin,tags){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('team_members').insert({team_id:teamId,user_id:userId,admin:!!admin,tags:tags||[],status:'invited'}); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

// Rispondo a un invito sulla MIA riga: accetto (→active) o rifiuto/lascio (→left).
async function sbTeamRespondInvite(teamId,accept){ if(!sb) return{error:'no-server'}; const uid=await sbUid(); if(!uid) return{error:'no-auth'}; try{ const{error}=await sb.from('team_members').update({status:accept?'active':'left'}).eq('team_id',teamId).eq('user_id',uid); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

// Admin aggiorna un membro (ruolo admin, tag/mansioni).
async function sbTeamMemberUpdate(teamId,userId,fields){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('team_members').update(fields).eq('team_id',teamId).eq('user_id',userId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamLeave(teamId){ return sbTeamRespondInvite(teamId,false); }

// ============================================================================
// TASK DI TEAM
// ============================================================================

async function sbTeamTasks(teamId){ if(!sb) return []; try{ const{data,error}=await sb.from('team_tasks').select('*').eq('team_id',teamId).order('created_at',{ascending:true}); if(error) return []; return data||[]; }catch(e){ return []; } }

// Crea una task diretta (es. assegnata a me stesso, o da admin). Per assegnare ad ALTRI si usa una proposta.
async function sbTeamTaskCreate(teamId,t){ if(!sb) return{error:'no-server'}; const uid=await sbUid(); if(!uid) return{error:'no-auth'}; try{
  const{data,error}=await sb.from('team_tasks').insert({team_id:teamId,title:t.title,assignee_id:t.assignee_id||null,created_by:uid,due:t.due||null,done:!!t.done,meta:t.meta||{}}).select().single();
  return{error:error?error.message:null,task:data||null};
}catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamTaskToggle(taskId,done){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('team_tasks').update({done:!!done,updated_at:new Date().toISOString()}).eq('id',taskId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamTaskUpdate(taskId,fields){ if(!sb) return{error:'no-server'}; try{ fields=Object.assign({updated_at:new Date().toISOString()},fields); const{error}=await sb.from('team_tasks').update(fields).eq('id',taskId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

async function sbTeamTaskDelete(taskId){ if(!sb) return{error:'no-server'}; try{ const{error}=await sb.from('team_tasks').delete().eq('id',taskId); return{error:error?error.message:null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

// ============================================================================
// PROPOSTE DI TASK (accetta / modifica / rifiuta)
// ============================================================================

// Proposte che mi riguardano (ricevute o inviate). RLS limita già ai due interessati.
async function sbTeamProposals(teamId){ if(!sb) return []; try{ const{data,error}=await sb.from('team_task_proposals').select('*').eq('team_id',teamId).order('created_at',{ascending:true}); if(error) return []; return data||[]; }catch(e){ return []; } }

// Invio una proposta di task a un altro membro. La task vera nascerà solo se lui accetta.
async function sbTeamProposalCreate(teamId,toId,p){ if(!sb) return{error:'no-server'}; const uid=await sbUid(); if(!uid) return{error:'no-auth'}; try{
  const{data,error}=await sb.from('team_task_proposals').insert({team_id:teamId,from_id:uid,to_id:toId,title:p.title||null,due:p.due||null,status:'pending',draft:p.draft||{}}).select().single();
  return{error:error?error.message:null,proposal:data||null};
}catch(e){ return{error:String((e&&e.message)||e)}; } }

// Rispondo a una proposta: 'accept' crea la task e la collega; 'reject' con motivo; 'counter' contro-proposta.
async function sbTeamProposalRespond(propId,action,extra){ if(!sb) return{error:'no-server'}; extra=extra||{}; try{
  const{data:p,error:ge}=await sb.from('team_task_proposals').select('*').eq('id',propId).single();
  if(ge||!p) return{error:(ge&&ge.message)||'not-found'};
  if(action==='accept'){
    const draft=(p.draft&&typeof p.draft==='object')?p.draft:{};
    const{data:task,error:te}=await sb.from('team_tasks').insert({team_id:p.team_id,title:p.title||draft.title||'Task',assignee_id:p.to_id,created_by:p.from_id,due:p.due||draft.due||null,done:false,meta:draft.meta||{}}).select().single();
    if(te) return{error:te.message};
    const{error:ue}=await sb.from('team_task_proposals').update({status:'accepted',task_id:task.id,updated_at:new Date().toISOString()}).eq('id',propId);
    return{error:ue?ue.message:null,task:task};
  }
  if(action==='reject'){ const{error}=await sb.from('team_task_proposals').update({status:'rejected',reason:extra.reason||null,updated_at:new Date().toISOString()}).eq('id',propId); return{error:error?error.message:null}; }
  if(action==='counter'){ const{error}=await sb.from('team_task_proposals').update({status:'counter',title:extra.title||p.title,due:extra.due||p.due,draft:extra.draft||p.draft,updated_at:new Date().toISOString()}).eq('id',propId); return{error:error?error.message:null}; }
  return{error:'bad-action'};
}catch(e){ return{error:String((e&&e.message)||e)}; } }

// ============================================================================
// CHAT DI TEAM (canali 'team' | 'group:<id>' | 'dm:<uidA>_<uidB>')
// ============================================================================

async function sbTeamMessages(teamId,channel){ if(!sb) return []; try{ const{data,error}=await sb.from('team_messages').select('*').eq('team_id',teamId).eq('channel',channel).order('created_at',{ascending:true}); if(error) return []; return data||[]; }catch(e){ return []; } }

async function sbTeamSend(teamId,channel,text){ if(!sb) return{error:'no-server'}; const uid=await sbUid(); if(!uid) return{error:'no-auth'}; try{ const{data,error}=await sb.from('team_messages').insert({team_id:teamId,channel:channel,from_id:uid,text:text}).select().single(); return{error:error?error.message:null,msg:data||null}; }catch(e){ return{error:String((e&&e.message)||e)}; } }

// ============================================================================
// REALTIME: collaborazione istantanea
// ============================================================================

// Sottoscrive i cambi di un team (task, proposte, chat, membri). `on` è una callback
// (payload)=>{} con payload.table e payload.eventType. Torna l'handle: chiamare .unsubscribe() per staccare.
function sbTeamSubscribe(teamId,on){ if(!sb) return{unsubscribe:function(){}}; try{
  const ch=sb.channel('team:'+teamId);
  ['team_tasks','team_task_proposals','team_messages','team_members'].forEach(tbl=>{
    ch.on('postgres_changes',{event:'*',schema:'public',table:tbl,filter:'team_id=eq.'+teamId},function(payload){ try{ on&&on({table:tbl,eventType:payload.eventType,new:payload.new,old:payload.old}); }catch(e){} });
  });
  ch.subscribe();
  return{unsubscribe:function(){ try{ sb.removeChannel(ch); }catch(e){} }};
}catch(e){ return{unsubscribe:function(){}}; } }
