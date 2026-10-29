// --- backend Supabase (client sb + helper) spostato in api.js, caricato prima di app.js ---
function sbProfileToUser(p){return{name:p.name||'',surname:p.surname||'',username:p.username||'',bio:p.bio||'',workType:p.work_type||'',website:p.website||'',socials:(p.socials&&typeof p.socials==='object')?p.socials:{},share:(p.share&&typeof p.share==='object')?p.share:{},photo:p.photo||''};}
function userToSbProfile(){return{name:USER.name||'',surname:USER.surname||'',username:(USER.username||'').toLowerCase()||null,bio:USER.bio||'',work_type:USER.workType||'',website:USER.website||'',socials:USER.socials||{},share:USER.share||{},photo:USER.photo||''};}
// --- mappa asset SVG spostata in svg.js, caricato prima di app.js ---
// inject placeholders
document.body.innerHTML = document.body.innerHTML
  .replaceAll('__BLOB__',SVG.blob).replaceAll('__AV__',SVG.av).replaceAll('__AVS__',SVG.av)
  .replaceAll('__CK__',SVG.check).replaceAll('__ARRB__',SVG.arr).replaceAll('__ARR__',SVG.arr)
  .replaceAll('__BACK__',SVG.back).replaceAll('__PREV__',SVG.prev).replaceAll('__NEXT__',SVG.next)
  .replaceAll('__PLAY__',SVG.play).replaceAll('__X__',SVG.x)
  .replaceAll('__I_HOME__',`<i class="ni">${SVG.home}</i>`).replaceAll('__I_DESK__',`<i class="ni"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1.5 21 5.5 17 9.5"/><path d="M3 11.5v-2a4 4 0 0 1 4-4h14"/><path d="M7 22.5 3 18.5 7 14.5"/><path d="M21 12.5v2a4 4 0 0 1-4 4H3"/></svg></i>`).replaceAll('__I_TASK__',`<i class="ni">${SVG.task}</i>`)
  .replaceAll('__I_TEAM__',`<i class="ni">${SVG.team}</i>`).replaceAll('__I_AGENT__',`<i class="ni">${SVG.agent}</i>`)
  .replaceAll('__I_PROJ__',`<i class="ni">${SVG.proj}</i>`).replaceAll('__I_SET__',`<i class="ni">${SVG.set}</i>`)
  .replaceAll('__Q_DESK__',SVG.daily).replaceAll('__Q_TASK__',SVG.task).replaceAll('__Q_TEAM__',SVG.team).replaceAll('__Q_AGENT__',SVG.agent).replaceAll('__Q_PROJ__',SVG.proj)
  .replaceAll('__I_CONN__',`<i class="ni">${SVG.conn}</i>`).replaceAll('__I_SOCIAL__',`<i class="ni">${SVG.bubble}</i>`).replaceAll('__HELP__',SVG.help).replaceAll('__AIFACE__',SVG.aiface).replaceAll('__GRID2__',SVG.grid)
  .replaceAll('__BD_BOARD__',SVG.grid).replaceAll('__PD_FILE__',SVG.file).replaceAll('__TRASH__',SVG.trash)
  .replaceAll('__BD_TEXT__',SVG.text).replaceAll('__BD_NOTE__',SVG.note).replaceAll('__BD_IMG__',SVG.image).replaceAll('__BD_PLUS__',SVG.plus).replaceAll('__BD_MINUS__',SVG.minus).replaceAll('__BD_EDIT__',SVG.edit)
  .replaceAll('__BD_PEN__',SVG.pen).replaceAll('__BD_RECT__',SVG.sq).replaceAll('__BD_CIRC__',SVG.circ).replaceAll('__BD_ARROW__',SVG.arrowtool).replaceAll('__BD_LINE__',SVG.linetool)
  .replaceAll('__BD_SHAPES__',SVG.shapes).replaceAll('__BD_UNDO__',SVG.undo).replaceAll('__BD_REDO__',SVG.redo).replaceAll('__CAM__',SVG.cam).replaceAll('__AR__',SVG.arr)
  .replaceAll('__GOOGLE_G__','<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>');

// ---------- Navigation ----------
function go(page){
  if(page==='settings'&&typeof openSettings==='function'){const _a=document.querySelector('.app');if(_a)_a.classList.remove('drawer-open');openSettings('generale');return;}
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.dataset.page===page));
  if(page==='profile'&&typeof renderProfile==='function'){try{renderProfile();}catch(e){}}
  const map={agentchat:'agents',projectdetail:'projects',teamdetail:'team',taskdetail:'',groupdetail:'',planday:'home',dayplan:'',connections:'',settings:'',profile:''};
  const tgt=(map[page]!==undefined?map[page]:page);
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.go===tgt));
  {const sp=document.getElementById('sidePlan');if(sp){const it=sp.querySelector('.side-plan-item');if(it)it.classList.toggle('active',page==='dayplan');}}
  document.querySelectorAll('.m-tab').forEach(n=>n.classList.toggle('active', n.dataset.go===tgt));
  const mm=document.querySelector('.main');if(mm)mm.scrollTop=0;window.scrollTo(0,0);
  const app=document.querySelector('.app');if(app)app.classList.remove('drawer-open');
  if(app)app.classList.remove('hide-glow');
  if(page==='desktop'&&typeof renderDaily==='function'){try{renderDaily();}catch(e){}}
  if(page==='home'&&typeof renderDwWidget==='function'){try{renderDwWidget();}catch(e){}try{if(typeof applyHomePrefs==='function')applyHomePrefs();}catch(e){}try{if(typeof renderOvPlan==='function')renderOvPlan();}catch(e){}}
  if(page==='social'&&typeof renderSocial==='function'){try{renderSocial();}catch(e){}}
  if(page==='workflow'&&typeof renderWorkflow==='function'){try{renderWorkflow();}catch(e){}}
  if(page==='resolve'&&typeof renderCarousel==='function'){try{renderCarousel(page);}catch(e){}}
  if(page==='taskdetail'&&typeof renderTaskPage==='function'){try{renderTaskPage();}catch(e){}}
  if(page==='planday'&&typeof openPlanday==='function'){try{openPlanday();}catch(e){}}
  if(page==='dayplan'&&typeof renderDayplan==='function'){try{renderDayplan();}catch(e){}}
  if(page==='groupdetail'&&typeof renderGroupPage==='function'){try{renderGroupPage();}catch(e){}}
  if(page==='inbox'&&typeof renderInboxPage==='function'){try{renderInboxPage();}catch(e){}}
  if(page==='plugin'&&typeof renderPlugins==='function'){try{renderPlugins();}catch(e){}}
  if(page==='tasks'&&typeof renderTasks==='function'){try{renderTasks();}catch(e){}}
  if(typeof renderSideTasks==='function'){try{renderSideTasks();}catch(e){}}
  // La sidebar sinistra mostra le CHAT delle task (non più le viste task). Su ogni pagina normale
  // forziamo la vista "chat"; in taskdetail resta la chat della task corrente.
  if(page!=='taskdetail'&&typeof setSideView==='function'){try{setSideView('chat');}catch(e){}}
  else if(typeof renderSideChat==='function'){try{renderSideChat();}catch(e){}} // in chat: evidenzia la chat corrente nella sidebar
  // Bottone chat AI fisso: su tasks/day/project (non su home dove c'è l'icona accanto alla matita, né in taskdetail)
  {const ab=document.getElementById('aiSideBtn');if(ab)ab.style.display='';}
  try{navRecord(page);}catch(e){}
}
// ---- Cronologia navigazione (frecce avanti/indietro tipo browser) ----
let navHist=[],navIdx=-1,navApplying=false;
const navState=(page)=>({page,taskId:(page==='taskdetail'&&typeof taskPageId!=='undefined')?taskPageId:null});
const navSame=(a,b)=>!!(a&&b&&a.page===b.page&&a.taskId===b.taskId);
function navRecord(page){
  if(navApplying||!page||page==='settings')return;
  const st=navState(page);
  if(navIdx>=0&&navSame(navHist[navIdx],st)){navUpdateBtns();return;}
  navHist=navHist.slice(0,navIdx+1);navHist.push(st);navIdx=navHist.length-1;
  navUpdateBtns();
}
function navApply(st){
  navApplying=true;
  try{if(st.page==='taskdetail'&&st.taskId!=null&&typeof openTaskPage==='function')openTaskPage(st.taskId);else go(st.page);}catch(e){}
  navApplying=false;navUpdateBtns();
}
function navBack(){if(navIdx>0){navIdx--;navApply(navHist[navIdx]);}}
function navFwd(){if(navIdx<navHist.length-1){navIdx++;navApply(navHist[navIdx]);}}
function navUpdateBtns(){
  const b=document.getElementById('navBack'),f=document.getElementById('navFwd');
  if(b)b.disabled=!(navIdx>0);
  if(f)f.disabled=!(navIdx<navHist.length-1);
}
{const b=document.getElementById('navBack'),f=document.getElementById('navFwd');
 if(b)b.addEventListener('click',navBack);
 if(f)f.addEventListener('click',navFwd);
 if(!navHist.length){const cur=document.querySelector('.page.active');navRecord(cur&&cur.dataset?cur.dataset.page:'home');}
 navUpdateBtns();}
function renderAiDrawer(){
  const el=document.getElementById('aiDrawerBody');if(!el)return;
  if(typeof rsvLoad==='function')rsvLoad();
  const store=(typeof RESOLVE_CHATS!=='undefined'&&RESOLVE_CHATS)?RESOLVE_CHATS:{};
  const chats=Object.keys(store).map(k=>({id:+k,e:store[k]})).filter(x=>x.e&&x.e.msgs&&x.e.msgs.length&&TASKS.some(t=>t.id===x.id));
  if(!chats.length){el.innerHTML='<div class="sc-empty">'+tr('side_chat_empty')+'</div>';return;}
  el.innerHTML='<div class="aid-list">'+chats.map(({id,e})=>{
    const t=TASKS.find(x=>x.id===id);const title=t?taskTitle(t):('#'+id);
    const active=(taskPageId===id);
    return '<div class="st-item sc-chatitem'+(active?' active':'')+'" data-scchat="'+id+'"><span class="st-title">'+bdEsc(title)+'</span><button class="sc-del" data-scdel="'+id+'" title="'+bdEsc(tr('sc_del'))+'" aria-label="'+bdEsc(tr('sc_del'))+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button></div>';
  }).join('')+'</div>';
}
function openAiSide(force){
  const app=document.querySelector('.app');if(!app)return;
  const open=(force===undefined)?!app.classList.contains('ai-drawer-open'):!!force;
  app.classList.toggle('ai-drawer-open',open);
  if(open){app.classList.remove('day-drawer-open');const db=document.getElementById('daySideBtn');if(db)db.classList.remove('on');}
  if(open)renderAiDrawer();
  const ab=document.getElementById('aiSideBtn');if(ab)ab.classList.toggle('on',open);
  const ob=document.getElementById('ovAiBtn');if(ob)ob.classList.toggle('on',open);
}
// Drawer "Giornata" a destra: spinge il contenuto come la sidebar sinistra (non è un layer sopra).
function openDaySide(force){
  const app=document.querySelector('.app');if(!app)return;
  const open=(force===undefined)?!app.classList.contains('day-drawer-open'):!!force;
  if(open){app.classList.remove('ai-drawer-open');const ab=document.getElementById('aiSideBtn');if(ab)ab.classList.remove('on');const ob=document.getElementById('ovAiBtn');if(ob)ob.classList.remove('on');}
  app.classList.toggle('day-drawer-open',open);
  const db=document.getElementById('daySideBtn');if(db)db.classList.toggle('on',open);
  if(open){try{renderDaySide();}catch(e){}}
}
{const oa=document.getElementById('ovAiBtn');if(oa)oa.addEventListener('click',e=>{e.stopPropagation();openAiSide();});
 const aa=document.getElementById('aiSideBtn');if(aa)aa.addEventListener('click',e=>{e.stopPropagation();openAiSide();});
 // Bottone Giornata in alto a destra: apre/chiude un drawer a destra (segnaposto; la funzione verrà rifatta)
 {const da=document.getElementById('daySideBtn');if(da)da.addEventListener('click',e=>{e.stopPropagation();openDaySide();});
  const dc=document.getElementById('dayDrawerClose');if(dc)dc.addEventListener('click',e=>{e.stopPropagation();openDaySide(false);});
  const dBody=document.getElementById('dayDrawerBody');if(dBody)dBody.addEventListener('click',e=>{
    if(e.target.closest('[data-dsplan]')){openDaySide(false);if(typeof go==='function')go('planday');return;}
    const row=e.target.closest('[data-dsw]');if(row){const id=+row.dataset.dsw;openDaySide(false);if(typeof openTaskPage==='function')openTaskPage(id);return;}
  });
  // tasti routine sotto il titolo: per ora aprono le Impostazioni generali (la voce dedicata arriva dopo)
  const dr=document.getElementById('dayDrawer');if(dr)dr.addEventListener('click',e=>{
    if(e.target.closest('[data-dsroutine]')||e.target.closest('[data-dssettings]')){openDaySide(false);if(typeof go==='function')go('settings');return;}
  });}
 const ax=document.getElementById('aidClose');if(ax)ax.addEventListener('click',()=>openAiSide(false));
 const adr=document.getElementById('aiDrawer');if(adr)adr.addEventListener('click',e=>{
   const del=e.target.closest('[data-scdel]');
   if(del){e.stopPropagation();const id=+del.dataset.scdel;askConfirm(tr('sc_del_confirm'),()=>{if(typeof rsvLoad==='function')rsvLoad();try{delete RESOLVE_CHATS[id];}catch(_){}if(typeof rsvSave==='function')rsvSave();renderAiDrawer();if(typeof showToast==='function')showToast(tr('sc_del_ok'));});return;}
   const it=e.target.closest('[data-scchat]');if(it&&typeof openResolveChat==='function'){openResolveChat(+it.dataset.scchat);openAiSide(false);}
 });
 /* la sidebar chat resta aperta (come quella sinistra); si chiude con la × o ri-cliccando l'icona */
 const ssi=document.getElementById('sideSearchInput');if(ssi)ssi.addEventListener('input',()=>{const q=ssi.value.trim().toLowerCase();document.querySelectorAll('#sideTasks .st-item').forEach(it=>{const tx=(it.textContent||'').toLowerCase();it.style.display=(!q||tx.includes(q))?'':'none';});});}
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');
  if(g){go(g.dataset.go);}
});
// ===== Switcher Tasks / Agents: cambia la modalità (e con essa la navbar) =====
let APP_MODE='tasks';
function setMode(mode){
  mode=(mode==='agents')?'agents':'tasks';
  APP_MODE=mode;
  const app=document.querySelector('.app');if(app)app.classList.toggle('agents-mode',mode==='agents');
  document.querySelectorAll('#modeSwitch .ms-seg').forEach(s=>s.classList.toggle('active',s.dataset.mode===mode));
  go(mode==='agents'?'agents':'home');
}
{const ms=document.getElementById('modeSwitch');if(ms)ms.addEventListener('click',e=>{const s=e.target.closest('.ms-seg');if(s)setMode(s.dataset.mode);});}
// ================= PANNELLI "in arrivo" (Workflow / Resolve) =================
const CC_TARROW='<svg viewBox="0 0 72 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="7" x2="62" y2="7"/><polyline points="55 2 64 7 55 12"/></svg>';
const CC_FARROW='<svg viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="7" x2="19" y2="7"/><polyline points="15 3 21 7 15 11"/></svg>';
function ccTask(text){return '<div class="cc-task"><span class="cc-task-chk"></span><span class="cc-task-t">'+bdEsc(text)+'</span><span class="cc-task-tag">'+tr('filter_personal')+'</span></div>';}
function ccWin(){return '<div class="cc-win"><div class="cc-win-bar"><span></span><span></span><span></span></div><div class="cc-win-body"><div class="cc-win-line" style="width:82%"></div><div class="cc-win-line" style="width:96%"></div><div class="cc-win-line" style="width:68%"></div><div class="cc-win-line" style="width:90%"></div><div class="cc-win-line" style="width:74%"></div></div></div>';}
function ccMailStack(){return '<div class="cc-mailstack">'+ccWin()+ccWin()+ccWin()+'</div>';}
function ccApps(){const S='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9l-4.8 3.1L16 18l-4-3.4L8 18l1.3-5.9L4.5 9l5.6-1.4z"/></svg>';const cols=['#d97757','#10a37f','#111111','#c9f24d'];return '<div class="cc-apps">'+cols.map((c,i)=>'<span class="cc-app" style="background:'+c+'">'+(i===0?S:'')+'</span>').join('')+'</div>';}
function ccPanel(key){
  const logo='<span class="cc-logo">'+(SVG.blob||'')+'</span>';
  const tag=(a,b)=>'<div class="cc-tagline"><span>'+tr(a)+'</span><span class="cc-tarrow">'+CC_TARROW+'</span><span>'+tr(b)+'</span></div>';
  const far='<span class="cc-farrow">'+CC_FARROW+'</span>';
  if(key==='resolve'){
    return '<div class="cc-box">'+logo+'<h2 class="cc-title">'+tr('cc_rs_title')+'</h2>'+tag('cc_rs_tag_a','cc_rs_tag_b')
      +'<div class="cc-flow">'
      +'<div class="cc-step"><div class="cc-visual">'+ccTask('Preparare la presentazione per il cliente')+'</div><div class="cc-label">'+tr('cc_rs_s1')+'</div></div>'+far
      +'<div class="cc-step"><div class="cc-visual">'+ccWin()+'</div><div class="cc-label">'+tr('cc_rs_s2')+'</div></div>'+far
      +'<div class="cc-step"><div class="cc-visual">'+ccApps()+'</div><div class="cc-label">'+tr('cc_rs_s3')+'</div></div>'
      +'</div></div><div class="cc-foot">'+tr('cc_foot')+'</div>';
  }
  return '<div class="cc-box">'+logo+'<h2 class="cc-title">'+tr('cc_wf_title')+'</h2>'+tag('cc_wf_tag_a','cc_wf_tag_b')
    +'<div class="cc-flow">'
    +'<div class="cc-step"><div class="cc-visual">'+ccMailStack()+'</div><div class="cc-label">'+tr('cc_wf_s1')+'</div></div>'+far
    +'<div class="cc-step cc-step-wide"><div class="cc-visual" style="align-items:stretch">'+ccTask('Preparare la presentazione per il cliente')+ccTask('Scrivere 5 post per Instagram')+ccTask('Organizzare i file del progetto')+'</div><div class="cc-label">'+tr('cc_wf_s2')+'</div></div>'
    +'</div></div><div class="cc-foot">'+tr('cc_foot')+'</div>';
}
function renderCarousel(key){const el=document.getElementById(key+'Carousel');if(!el)return;el.innerHTML=ccPanel(key);}
// ---------- Drawer mobile (hamburger) ----------
{const mb=document.getElementById('mBurger');if(mb)mb.addEventListener('click',()=>{const a=document.querySelector('.app');if(a)a.classList.toggle('drawer-open');});
 const bd=document.getElementById('mDrawerBackdrop');if(bd)bd.addEventListener('click',()=>{const a=document.querySelector('.app');if(a)a.classList.remove('drawer-open');});
 // stile Claude: toccando la pagina (anteprima a destra) il menu si chiude
 const main=document.querySelector('.main');if(main)main.addEventListener('click',e=>{const a=document.querySelector('.app');if(a&&a.classList.contains('drawer-open')){e.preventDefault();e.stopPropagation();a.classList.remove('drawer-open');}},true);}
// Bottone "+" (mobile): contestuale in base alla pagina attiva
{const mc=document.getElementById('mCreate'),ov=document.getElementById('mCreateOv');
 if(mc&&ov){
   mc.addEventListener('click',()=>{
     const pg=document.querySelector('.page.active')?.dataset.page;
     if(pg==='desktop'){if(typeof openDaySetup==='function')openDaySetup();return;}
     if(pg==='tasks'){if(typeof openNewTask==='function')openNewTask();return;}
     if(pg==='projects'){if(typeof openProjTpl==='function')openProjTpl();return;}
     if(pg==='team'){const b=document.getElementById('createTeamBtn');if(b)b.click();return;}
     if(pg==='social'){if(typeof socOpenAdd==='function')socOpenAdd();return;}
     ov.classList.add('open'); // home e resto → foglio a 3 scelte
   });
   ov.addEventListener('click',e=>{if(e.target===ov)ov.classList.remove('open');});
   ov.querySelectorAll('[data-mcreate]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.mcreate;ov.classList.remove('open');
     if(a==='day'){if(typeof go==='function')go('desktop');setTimeout(()=>{if(typeof openDaySetup==='function')openDaySetup();},90);}
     else if(a==='task'){if(typeof openNewTask==='function')openNewTask();}
     else if(a==='project'){if(typeof openProjTpl==='function')openProjTpl();}
   }));
 }}

// ---------- i18n ----------
// --- i18n (STR / LANGS / LOCALES) spostato in i18n.js, caricato prima di app.js ---
// --- dati date (MONTHS / DOWS) spostati in dates.js, caricato prima di app.js ---
try{Object.assign(STR.it,{um_usage:'Utilizzo',um_lang:'Lingua',um_upgrade:'Aggiorna il piano',um_changelog:'Visualizza changelog',um_help:'Ottieni aiuto',um_logout:'Esci',um_search:'Cerca…',pl_search_ph:'Cerca plugin…'});Object.assign(STR.en,{um_usage:'Usage',um_lang:'Language',um_upgrade:'Upgrade plan',um_changelog:'View changelog',um_help:'Get help',um_logout:'Log out',um_search:'Search…',pl_search_ph:'Search plugins…'});Object.assign(STR.es,{um_usage:'Uso',um_lang:'Idioma',um_upgrade:'Mejorar el plan',um_changelog:'Ver el changelog',um_help:'Obtener ayuda',um_logout:'Cerrar sesión',um_search:'Buscar…',pl_search_ph:'Buscar plugins…'});}catch(e){}
try{Object.assign(STR.it,{home_greet:'Pronto a risolvere qualche ',home_words:'task|impegno|progetto|faccenda|idea|lavoro'});Object.assign(STR.en,{home_greet:'Ready to tackle your ',home_words:'task|project|errand|idea|to-do|workload'});Object.assign(STR.es,{home_greet:'Listo para resolver tu ',home_words:'tarea|proyecto|recado|idea|pendiente|trabajo'});}catch(e){}
try{Object.assign(STR.it,{tt_close:"Chiudi",tt_sidebar:"Apri/chiudi la sidebar",tt_bug:"Segnala un bug",tt_newtask:"Nuovo task",tt_clear:"Cancella",tt_edit:"Modifica",tt_undo:"Annulla (Ctrl+Z)",tt_delrow:"Elimina riga",tt_delcol:"Elimina colonna",tt_stopdict:"Ferma la dettatura",tt_rename:"Rinomina",tt_newprofile:"Nuovo profilo",tt_delprofile:"Elimina profilo",tt_addyours:"Aggiungi la tua"});Object.assign(STR.en,{tt_close:"Close",tt_sidebar:"Open/close the sidebar",tt_bug:"Report a bug",tt_newtask:"New task",tt_clear:"Clear",tt_edit:"Edit",tt_undo:"Undo (Ctrl+Z)",tt_delrow:"Delete row",tt_delcol:"Delete column",tt_stopdict:"Stop dictation",tt_rename:"Rename",tt_newprofile:"New profile",tt_delprofile:"Delete profile",tt_addyours:"Add your own"});Object.assign(STR.es,{tt_close:"Cerrar",tt_sidebar:"Abrir/cerrar la barra lateral",tt_bug:"Reportar un error",tt_newtask:"Nueva tarea",tt_clear:"Borrar",tt_edit:"Editar",tt_undo:"Deshacer (Ctrl+Z)",tt_delrow:"Eliminar fila",tt_delcol:"Eliminar columna",tt_stopdict:"Detener el dictado",tt_rename:"Renombrar",tt_newprofile:"Nuevo perfil",tt_delprofile:"Eliminar perfil",tt_addyours:"Añade la tuya"});}catch(e){}
try{Object.assign(STR.it,{dwt_focus:"Focus timer",dwt_dnd:"Non disturbare",dwt_music:"Musica focus",dwt_break:"Pause smart",dwt_water:"Promemoria acqua",dwt_note:"Note del giorno"});Object.assign(STR.en,{dwt_focus:"Focus timer",dwt_dnd:"Do not disturb",dwt_music:"Focus music",dwt_break:"Smart breaks",dwt_water:"Water reminder",dwt_note:"Day notes"});Object.assign(STR.es,{dwt_focus:"Temporizador",dwt_dnd:"No molestar",dwt_music:"Música focus",dwt_break:"Pausas inteligentes",dwt_water:"Recordatorio de agua",dwt_note:"Notas del día"});}catch(e){}
Object.assign(STR.es,{nav_plugin:"Plugin",plugin_soon_sub:"Pronto podrás añadir plugins a Workie.",st_unpin:"Desfijar",st_pinned:"Fijados",st_pin_drop:"Suelta aquí para fijar",ov_pref_chat:"Mostrar el chat bajo el saludo",ov_pref_grad:"Fondo animado",ov_chat_ph:"Pregunta lo que quieras…",nt_add_category:"Categoría",cat_hint:"Las categorías agrupan las tareas por cliente, empresa o contexto. Las gestionas desde aquí; los grupos, en cambio, los creas con el + al añadir una tarea.",cat_new_ph:"Nueva categoría…",cat_delete:"Eliminar categoría",cat_empty:"Sin categorías. Crea una abajo.",cat_confirm_del:"¿Eliminar esta categoría? Las tareas no se borrarán.",cat_none:"Ninguna",premium_chat:"El chat con IA es una función Premium.",rsv_scope_task:"Esta tarea",rsv_scope_task_sb:"Solo esta tarea",rsv_scope_group:"Este grupo",rsv_scope_group_sb:"Todas las tareas del grupo",rsv_scope_all:"Todas las tareas",rsv_scope_all_sb:"Alcance completo",ovc_pick:"Seleccionar tarea",ovc_pick_h:"Elige una tarea",ovc_recent:"Tareas recientes",ovc_none:"No hay tareas activas",ovc_need:"Elige primero una tarea",ib_pick:"Selecciona un email para leerlo",ib_make_task:"Crear tarea",ib_reply:"Responder",pl_sub:"Trabaja con la IA en tus herramientas favoritas.",pl_have:"Añadir",pl_configure:"Configurar",pl_connected:"Conectada",pl_installed:"Instalados",pl_manage:"Gestionar",pl_remove:"clic para quitar",pl_inst_empty:"Aún no hay apps. Añádelas con +.",pl_public:"Públicos",pl_personal:"Personales",pl_personal_empty:"Aún no hay plugins personales.",pl_conn_soon:"Conexión real en camino — por ahora aparece como conectada.",pl_disconnected:"Desconectada",pl_none:"No se encontró ningún plugin",plm_sub:"Gestiona plugins, apps y MCP",plm_browse:"Explorar el directorio",plm_add:"Añadir",pl_enable:"Activar",pl_disable:"Desactivar",tool_on:"Activo",tool_off:"Activar",ft_session:"Sesión de concentración · 25 min",ft_ready:"Lista",ft_running:"En curso",ft_paused:"En pausa",ft_done:"Completada",ft_start:"Iniciar",ft_pause:"Pausar",ft_reset:"Reiniciar",ft_complete:"¡Sesión de concentración completada! 🎉",wt_glasses:"Vasos hoy",wt_goal:"Objetivo: 8",wt_goal_ok:"¡Objetivo alcanzado!",nt_note_ph:"Notas del día…",nt_autosave:"Guardado automático",nt_chars:"caracteres",dnd_l1:"Notificaciones en pausa",dnd_l2:"Sin distracciones",mu_playing:"Reproduciendo",mu_paused:"En pausa",mu_l1:"Música para concentrarte",mu_l2:"Ritmos relajantes",br_l1:"Pausa cada 50 min",br_l2:"Yo te aviso",nav_overview:"Resumen",nav_routine:"Día",side_chat_empty:"Tus chats aparecerán aquí.",si_connect_t:"Conecta tu correo",si_connect_d:"Conecta Gmail u Outlook para ver tus emails aquí y convertirlos en tareas.",si_connect_btn:"Conectar un buzón",sb2_newtask:"Nueva tarea",sb2_team:"Nuevo equipo",sb2_group:"Nuevo grupo",mic_soon:"🎙️ Pronto podrás dictar tareas a Workie y él las preparará por ti.",view_label:"Vista",mt_title:"Añadir varias tareas",mt_hint:"Dicta o escribe todas las tareas que tengas en mente, una tras otra. Workie las reconoce y las convierte en tareas listas.",mt_ph:"Ej. Llama al proveedor mañana a las 10, prepara 5 carruseles antes del viernes, escribe a Rossi…",mt_dictate:"Dictar tareas",mt_analyze:"Crear las tareas",mt_review_h:"Workie preparó %n tareas — revisa y confirma",mt_add_one:"Añadir una tarea",mt_back:"Volver al texto",mt_confirm:"Añadir %n tareas",mt_none:"No reconocí ninguna tarea. Prueba a reformular.",mt_added:"%n tareas añadidas ✓",mt_no_voice:"El dictado por voz no es compatible con este navegador.",ov_help:"¿Cómo puedo ayudarte hoy?",ov_plan:"Planifica tu día",ov_resolve:"Resuelve las tareas",ov_newtask:"Añadir tareas",ov_today_tasks:"Tareas de hoy",ov_day:"Tu día",pday_title:"Planifica tu día",pday_desc:"Workie mira las tareas que tienes que hacer, razona cuánto duran (o te lo pregunta si tiene dudas) y te dice cómo repartirlas durante el día.",pday_note:"Función en construcción: estamos definiendo los principios con los que razonará Workie. Por ahora crea un orden de partida a partir de tus tareas.",pday_cta:"Crear el plan",pday_pick:"¿Qué tareas quieres planificar hoy?",pday_f_due:"Por hacer",pday_addall:"Añadir todas",pday_removeall:"Quitar todas",pday_empty:"No hay tareas para este filtro.",pday_pick_none:"Selecciona al menos una tarea para planificar.",pday_started:"Plan de hoy · iniciado a las %s",pday_reset:"Empezar de nuevo",pday_update:"Actualizar el plan",pday_loading:"Estoy creando tu plan…",pday_rm_title:"El plan de tu día",pday_rm_sub:"Arrastra para reordenar — los horarios se actualizan solos.",pday_confirm:"Confirmar el plan",pday_back_pick:"Editar las tareas",expl_meeting:"Reunión: bloquea el hueco y avisa a los asistentes.",expl_quick:"Rápida: hazla ya y quítatela de encima.",expl_overdue:"Atrasada: mejor cerrarla pronto.",expl_default:"Resérvate un bloque dedicado.",ov_order_title:"El orden de tu día",ov_order_clear:"Restablecer",nav_dayplan:"Tu día",dayplan_sub:"Así decidimos organizar hoy.",dayplan_edit:"Editar plan",dayplan_reset:"Borrar plan",dayplan_empty:"No hay plan para hoy. Crea tu plan desde el Resumen.",dayplan_now:"Ahora",tdw_all:"Todas las tareas",gdw_notes:"Notas",gdw_addtask:"Añadir tarea",nt_name_ph2:"Nombre de la tarea",nt_desc_ph2:"Añade una descripción…",dq_3days_s:"+3d",dq_week_s:"+1 sem.",dq_other:"Otra…",nt_sw_task:"Tarea",nt_sw_group:"Grupo",nt_add_group:"Grupo",nt_advanced:"Avanzado",nt_grp_addtasks:"Añadir tareas existentes",nt_grp_search:"Busca una tarea…",nt_none_group:"Sin grupo",nt_grp_empty_search:"No se encontró ninguna tarea",nt_grp_created:"Grupo creado ✓",cal_day:"Día",cal_year:"Año",stm_categories:"Categorías",stm_back_app:"Volver a la app",stm_back_to:"Volver a %s",stc_hint:"Crea y gestiona las categorías con las que organizas tus tareas.",stc_new_ph:"Ej. Cliente Rossi",pib_upload:"Adjuntar imagen",pib_search:"Buscar",pib_think:"Razonar",pib_canvas:"Canvas",pib_voice:"Mensaje de voz",pib_send:"Enviar",pib_stop:"Detener la grabación",pib_ph_search:"Busca en la web…",pib_ph_think:"Razona a fondo…",pib_ph_canvas:"Crea en el canvas…",pib_voicemsg:"[Mensaje de voz · %s seg]",pib_imgmsg:"[Imagen adjunta]",pib_remove:"Quitar imagen",pib_close:"Cerrar",home_routine:"Rutina",home_tasks:"Tareas",pmd_title:"Planifica tu día",pmd_sub:"Workie mira las tareas de hoy y las atrasadas y te dice por dónde empezar.",pmd_btn:"Crear el plan",pmd_btn_again:"Regenerar el plan",pmd_intro:"Así organizaría el día%n:",pmd_at:"a las",pmd_quick:"rápida, quítatela de encima",pmd_overdue:"lleva %d de retraso — ¿la cierras ahora o la reprogramas?",pmd_meeting:"lleva %d de retraso: ¿se saltó o se te olvidó quitarla? Si quieres la reprogramo y aviso a los asistentes.",pmd_empty:"No tienes tareas para hoy ni atrasadas. ¡Disfruta tu día! 🎉",pmd_preview:"— Plan generado por Workie (vista previa).",pmd_day:"día",pmd_days:"días",td_details:"Detalles",td_info:"Info",td_context:"Contexto",td_status:"Estado",td_no_desc:"Sin descripción",tdw_invite:"¿Quieres que Workie te ayude a resolver esta tarea?",tdw_ph_empty:"Escribe cualquier mensaje para activar la ayuda de Workie…",tdw_ph:"Escribe un mensaje…",tdw_openchat:"Abre el chat para resolver la tarea",tdw_closechat:"Cerrar el chat",tdw_toggle_info:"Mostrar/ocultar info de la tarea",tdw_yes:"Sí, ayúdame",tdw_no:"No, gracias",tdw_start_again:"Cambié de idea, ayúdame Workie",tdw_changed:"Cambié de idea",tdw_declined:"Vale, aquí estoy cuando quieras.",tdw_greet:"¡Hola%n! ¿Cómo puedo ayudarte con «%s»?",td_cancel:"Cancelar",rsv_ask_desc:"Solo veo el título, sin descripción. ¿Puedes decirme en dos líneas qué tienes que hacer exactamente para «%s»? Así preparo un plan a medida.",rsv_analyze:"Analizar un sitio",rsv_offtopic:"Sigamos con la tarea «%s» 🙂 Con eso te ayudo encantado — ¿cómo quieres proceder?",rsv_sub:"Te ayudo a completar la tarea",rsv_ph:"Pregunta a Resolve…",rsv_intro:"¡Hola! Soy Resolve. Puedo ayudarte a completar «%s». ¿Por dónde quieres empezar?",rsv_chip_plan:"Dame un plan",rsv_chip_split:"Divide en subtareas",rsv_chip_start:"¿Por dónde empiezo?",rsv_preview:"— Resolve está en vista previa: pronto responderá la IA de Workie.",rsv_r_plan:"Así abordaría «%s»:\n\n1. Aclara el objetivo y qué significa \"hecho\".\n2. Divide el trabajo en 2-3 pasos concretos.\n3. Reserva un momento en tu agenda y empieza por el primer paso.",rsv_r_split:"La dividiría así:\n\n• Preparación — reúne lo que necesitas\n• Ejecución — el grueso del trabajo\n• Revisión — comprueba y cierra",rsv_r_generic:"Genial. Dime en qué punto estás y te ayudo con el siguiente paso.",td_done:"Completada",td_todo:"Por hacer",td_time:"Hora",td_scope:"Alcance",td_group:"Grupo",td_progress:"Progreso",td_delete:"Eliminar tarea",td_mark_done:"Marcar completada",td_mark_todo:"Marcar por hacer",td_no_meta:"Sin detalles adicionales.",td_all_tasks:"Todas las tareas",dw_routine:"Rutina",dw_setup_sub:"Configura tus actividades recurrentes para cada día.",suf2_tasks_t:"Gestiona tus tareas",suf2_tasks_d:"Tareas y grupos para cada cliente o proyecto, siempre bajo control.",suf2_mail_t:"Importa tareas desde el correo",suf2_mail_d:"Conecta tu bandeja y convierte los emails en tareas con un toque.",suf2_plan_t:"Planifica tu día",suf2_plan_d:"Workie ordena tus actividades durante el día, con horarios y prioridades.",suf2_resolve_t:"Resuelve las tareas rápido",suf2_resolve_d:"La IA te prepara un plan paso a paso para completar cada tarea.",ib_manage:"Gestionar buzones",ib_manage_sub:"Conecta y gestiona tu correo.",ib_cs_title:"Conecta tu bandeja",ib_cs_sub:"Elige tu proveedor para gestionar el correo directamente desde Workie.",ib_cs_note:"Solo lectura: Workie no envía ni modifica nada sin tu visto bueno.",ib_connected:"conectada",ib_disconnect:"Desconectar",ib_add_mailbox:"Añadir otro buzón",ib_from_email:"Del email",ib_ai_working:"Workie está simplificando el email…",ib_ai_done:"Esta es la tarea que preparé",ib_ai_done_n:"Preparé %n tareas",ib_task_title:"Título de la tarea",ib_task_confirm:"Añadir la tarea",ib_task_confirm_n:"Añadir las tareas",ib_tasks_added:"%n tareas añadidas ✓",ib_group_toggle:"Agrupar en un grupo",ib_group_name:"Nombre del grupo",ib_remove:"Quitar",ib_task_added:"Tarea añadida ✓",ib_task_title2:"Crear tarea desde el email",ib_task_sub:"Workie simplifica el email en una tarea.",ib_search_ph:"Buscar en los emails…",ib_f_all:"Todos",ib_f_unread:"No leídos",ib_no_results:"No se encontraron emails.",ib_refreshed:"Bandeja actualizada",ib_prov_soon:"Pronto disponible para este proveedor. Por ahora usa Gmail.",ib_load_more:"Cargar más",dq_none:"Ninguna",nt_pick_title:"Crear",nt_pick_sub:"¿Qué quieres crear?",nt_type_task:"Tarea única",nt_type_task_d:"Añade una sola tarea.",nt_type_group:"Grupo de tareas",nt_type_group_d:"Agrupa varias tareas juntas.",nt_type_dictate:"Dictar tareas",nt_type_dictate_d:"Escribe o dicta varias tareas.",nt_dictate_hint:"Escribe (o dicta) una tarea por línea.",nt_dictate_create:"Crear las tareas",nt_dictate_done:"tareas creadas",nt_sub_edit:"Edita los detalles de la tarea.",grp_name_ph2:"Nombre del grupo",rsv_rm_title:"Roadmap",rsv_rm_accept:"Aceptar roadmap",rsv_rm_update:"Actualizar roadmap",rsv_rm_steps:"pasos",rsv_g_step:"Paso",rsv_g_how:"Cómo hacerlo",rsv_g_apps:"Apps recomendadas",rsv_g_prompts:"Prompts listos",rsv_g_copy:"Copiar",rsv_g_copied:"Copiado ✓",rsv_g_loading:"Workie prepara la guía…",rsv_g_done:"Marcar como hecho",rsv_g_done_on:"Hecho",rsv_g_fallback:"Concéntrate en este paso y complétalo antes de pasar al siguiente.",rsv_add:"Añadir",rsv_voice:"Dictar",rsv_add_img:"Añadir imagen",rsv_analyze_prefix:"Analiza este sitio:",rsv_g_openai:"Abrir en Claude",rsv_g_regen:"Regenerar guía",rsv_rm_tasks:"Añadir a las tareas",rsv_ac_q:"Todos los pasos están hechos. ¿Marco la tarea como completada?",rsv_ac_yes:"Sí, completar",rsv_g_ready:"Guía lista",rsv_fn_roadmap:"Crear el roadmap",rsv_cta_roadmap:"Ver y crear roadmap",rsv_cta_view:"Ver roadmap",rsv_rm_open:"Abrir al lado",rsv_fn_roadmap_prompt:"Créame un roadmap con los pasos concretos para completar esta tarea.",rsv_quiz_q:"Pregunta",rsv_quiz_of:"de",plan_free_d:"El plan gratuito",plan_pro_d:"Todo desbloqueado",plan_tester_d:"Acceso beta · IA ×5",plan_upgrade:"Pasar a Pro",usage_sim:"Simular",prof_title:"Cómo trabajo (para la IA)",prof_hours:"Horario de trabajo",prof_note_ph:"Ej. rindo mejor por la mañana, almuerzo a las 13, evita reuniones después de las 17…",rd_have_code:"¿Tienes un código?",rd_placeholder:"Introduce el código",rd_btn:"Canjear",rd_ok_pro:"¡Código válido! Pro activado ✓",rd_ok_tester:"¡Código válido! Tester (IA ×5) activado ✓",rd_bad:"Código no válido o caducado.",rd_activated:"%p activado ✓",ag_folder:"Carpeta",ag_fi_remove:"Quitar de la carpeta",ag_intake_sub:"Describe qué debe hacer, o parte de uno listo.",ag_intake_ph:"Ej. Convierte artículos en carúseles de Instagram, máx 8 diapositivas, estilo informativo, números destacados, sin clickbait.",ag_generate:"Generar agente",ag_or_preset:"O parte de un agente listo",ag_config:"Configura el agente",ag_f_name:"Nombre",ag_f_role:"Rol",ag_f_goal:"Objetivo",ag_f_instr:"Cómo trabaja",ag_f_instr_ph:"Una regla por línea…",ag_save_agent:"Guardar agente",ag_gen_err:"No pude generar el agente. Inténtalo de nuevo.",ag_created:"Agente creado ✓",ag_saved:"Agente actualizado ✓",ag_p_analyst:"Analiza un artículo y extrae un brief con hechos y números clave.",ag_p_carousel:"Convierte artículos en guiones para carúseles de Instagram.",ag_p_visual:"Prepara el layout y la jerarquía visual del carrusel.",ag_p_brand:"Comprueba que los resultados respeten las guías de marca.",ag_p_event:"Escribe copy de LinkedIn e Instagram para promocionar eventos.",ag_p_research:"Busca y resume información de la web con fuentes.",ag_p_email:"Escribe y resume correos de forma profesional.",ag_tab_overview:"Resumen",ag_tab_agents:"Agentes",ag_tab_teams:"Equipos",ag_tab_activity:"Actividad",ag_tab_conn:"Conexiones",ag_stat_review:"por revisar",ag_stat_working:"trabajando",ag_stat_done:"hechas hoy",ag_ov_review:"Por revisar",ag_ov_none_review:"Nada que revisar por ahora.",ag_ov_team:"Tu equipo de IA",ag_ov_none_team:"Aún no tienes agentes.",ag_teams_empty_t:"Aún no hay equipos",ag_teams_empty_s:"Combina varios agentes en un equipo para automatizar flujos completos.",ag_new_team:"Nuevo equipo",ag_act_empty_t:"Sin actividad",ag_act_empty_s:"Aquí verás lo que hacen tus agentes, paso a paso.",ag_conn_ai:"IA",ag_conn_design:"Diseño",ag_conn_pub:"Publicación",ag_conn_prod:"Productividad",ag_conn_auto:"Automatización",ag_connect:"Conectar",ag_not_conn:"No conectado",ag_agents_word:"agentes",ag_sub:"Asistentes de IA especializados, listos para trabajar por ti.",ag_new:"Nuevo agente",ag_empty_t:"Aún no hay agentes",ag_empty_s:"Crea tu primer agente: un asistente de IA a medida para una tarea recurrente.",ag_soon:"Pronto podrás crear tus agentes.",ag_untitled:"Agente sin nombre",svc_oauth_popup:"Permite los popups para completar la conexión.",svc_oauth_fail:"Conexión fallida. Inténtalo de nuevo.",svc_account_sub:"Conecta tu cuenta — usa tus créditos.",svc_hf_note:"Conecta tu cuenta de Higgsfield con el login: las generaciones usarán los CRÉDITOS DE TU PLAN de Higgsfield. Sin API separada que pagar.",svc_connect_account:"Conectar mi cuenta de %s",svc_oauth_todo:"Conexión de cuenta (OAuth) en construcción — la activamos pronto.",svc_connect_t:"Conectar %s",svc_key_sub:"Pega tus credenciales de %s. Quedan en tu cuenta.",svc_oauth_sub:"Conexión mediante login.",svc_oauth_note:"Conectar %s se hace con login y autorización (OAuth). Para activarlo hay que registrar la app de desarrollador en la plataforma — próximamente.",svc_where:"Dónde encontrarla",svc_security:"Tus credenciales quedan en tu cuenta y solo sirven para que tus agentes trabajen por ti. No las compartimos.",svc_save:"Conectar",svc_update:"Actualizar credenciales",svc_disconnect:"Desconectar",svc_fill:"Completa todos los campos.",svc_connected:"%s conectado ✓",pl_featured:"Destacados",pl_feat_note:"Las herramientas con las que Workie realmente conecta (o está construyendo). El resto del catálogo está en Públicos.",agr_kickoff:"Produce ahora tu trabajo para esta fase, según el contexto. Ve directo al entregable.",agr_empty:"(sin respuesta)",agr_offline:"No puedo conectar con la IA ahora. Inténtalo en un momento.",agr_limit:"Te quedaste sin solicitudes de IA. Prueba más tarde o pásate a Pro.",agr_img_needtool:"Para generar imágenes necesito una herramienta conectada. Una cuenta normal de ChatGPT no basta: hace falta un servicio con API. Conecta una de estas y sigo:",agr_img_withtool:"Genero las imágenes con %s. Aquí tienes 10 propuestas: elige 1 o 2, o dime cómo cambiarlas.",agr_img_connected:"%s conectado ✓",agr_with:"Estás trabajando con",agr_chat_ph:"Escribe a %s… (o dicta)",agr_msg_images:"Aquí tienes 10 propuestas gráficas. Elige 1 o 2 abajo, o dime cómo cambiarlas.",agr_msg_images_rev:"Hecho, aquí tienes 10 nuevas. Elige 1 o 2 o dime más.",agr_wf_consists:"En qué consiste",agr_lead:"Agente principal · coordina los sub-agentes",agr_greet:"¡Hola! Cuéntame qué creamos hoy: tu idea, el enfoque, restricciones. Yo reparto el trabajo a los sub-agentes.",agr_idea_ph:"Ej. Un carrusel sobre el artículo del lanzamiento, tono informativo, números destacados, 8 diapositivas…",agr_go:"¡Vamos! →",agr_progress:"Paso %n de %t",agr_working:"%s está trabajando…",agr_now:"En curso",agr_waiting:"En espera",agr_accepted:"Hecho",agr_ok_next:"Está bien, siguiente",agr_modify:"Modificar",agr_change_ph:"¿Qué quieres cambiar? Escríbelo y lo rehace…",agr_regen:"Regenerar",agr_pick:"Elige 1 o 2 gráficas para usar.",agr_use_sel:"Usar las %n seleccionadas",agr_regen_all:"Regenerar todas",agr_finish:"Finalizar",agr_done_t:"Workflow completado",agr_done_s:"%s completó todos los pasos. Encontrarás los resultados en la actividad del agente.",agr_back_agent:"Volver al agente",agr_your_idea:"tu idea",agr_mock_text:"[Ejemplo] %s preparó una primera propuesta basada en: «%idea».\n\nAquí aparecerá el resultado real al conectar la IA. Si está bien pulsa «Está bien, siguiente», si no escríbeme abajo qué cambiar.",agr_mock_text_edit:"[Ejemplo · revisado] Apliqué tu petición: «%f».\n\n%s actualizó la propuesta.",agr_mock_report:"[Ejemplo] %s programó el contenido aprobado.\n\n• 1 carrusel · listo para publicar\n• Fechas y horas configuradas\n\nAquí aparecerá el informe real al conectar la herramienta.",ag_delete:"Eliminar agente",ag_del_confirm:"¿Eliminar este agente? No se puede deshacer.",ag_del_ok:"Agente eliminado ✓",ag_sub_nodesc:"Instrucciones operativas aún sin definir.",agw_subs_hint:"Para cada uno, escribe (o dicta) qué hará DE VERDAD, de forma operativa. Luego la IA puede refinar el prompt.",agw_sub_ops_ph:"Qué hace operativamente: input, qué produce, reglas, estilo, output esperado…",agw_refine:"Mejorar con IA",agw_refine_empty:"Escribe primero qué debe hacer este sub-agente.",agw_refine_prompt:"Eres experto en prompts de agentes IA. Reescribe de forma clara y operativa las instrucciones del sub-agente «%name» (parte de un agente que: %agent). Instrucciones del usuario: «%desc». Devuelve SOLO las instrucciones finales, en español, concisas pero completas: qué recibe, qué debe producir, reglas, tono/estilo, formato de salida. Sin preámbulos.",agw_title:"Nuevo agente",agw_s1_h:"¿Qué debe hacer tu agente?",agw_s1_sub:"Cuéntale todo lo que debe hacer. Puedes escribirlo o dictarlo por voz.",agw_s1_ph:"Ej. Convertir los artículos de nuestra marca en carruseles de Instagram, encontrar los datos clave, escribir los textos y programarlos…",agw_rec:"Dictar por voz",agw_continue:"Continuar",agw_thinking:"Lo estoy pensando…",agw_ai:"IA",agw_understood:"Entendí lo que necesitas.",agw_q_title:"Un par de cosas para acertar",agw_ans_ph:"Responde aquí (opcional)…",agw_answer:"Responder y continuar",agw_skip:"Saltar, está bien",agw_proposed_subs:"Sub-agentes sugeridos",agw_s3_h:"Así trabajará",agw_s3_sub:"Dividí el trabajo en pasos. Dale un nombre al agente y créalo.",agw_wf_title:"Workflow sugerido",agw_name_title:"Nombre del agente",agw_create:"Crear agente",agw_no_wf:"Workflow aún no definido.",agw_ai_offline:"IA no disponible — muestro una propuesta básica para refinar.",agw_prompt_answers:"Detalles adicionales del usuario:",agw_fb_understood:"Entendido: %s. Prepararé un agente con los sub-agentes adecuados y un workflow por pasos.",agw_fb_s1:"Análisis y textos",agw_fb_s2:"Creación gráfica",agw_fb_s3:"Publicación",ag_subs_word:"sub-agentes",ag_build_sub:"Dale un nombre y añade los sub-agentes que trabajan para él.",ag_build_name:"Nombre del agente",ag_build_name_ph:"Ej. Carruseles para Economy",ag_build_desc:"Qué hace",ag_build_desc_ph:"En breve, qué hace este agente…",ag_build_subs:"Sub-agentes",ag_build_subs_empty:"Aún no hay sub-agentes. Añádelos abajo.",ag_build_add_sub:"Añadir sub-agente",ag_build_tools:"Herramientas",ag_build_tools_ph:"Ej. Higgsfield, Metricool, Claude",ag_build_sub_name_ph:"Nombre (ej. Periodista)",ag_build_sub_desc_ph:"Qué hace…",ag_edit_title:"Editar agente",ag_edit:"Editar",ag_role_journalist:"Periodista",ag_role_designer:"Graphic Designer",ag_role_marketing:"Marketing Expert",ag_role_social:"Social Media Manager",ag_role_copy:"Copywriter",ag_role_research:"Researcher",ag_dt_overview:"Resumen",ag_dt_workflow:"Workflow",ag_dt_events:"Eventos",ag_dsec_desc:"Descripción",ag_dsec_subs:"Sub Agentes",ag_dsec_tools:"Herramientas",ag_no_desc:"Sin descripción aún.",ag_no_subs:"Sin sub-agentes aún.",ag_no_tools:"Sin herramientas conectadas.",ag_wf_start:"Iniciar nuevo workflow",ag_wf_prev:"Workflows anteriores",ag_events_soon:"Aquí verás los eventos de este agente.",ag_you_here:"Estás aquí",ag_run_hi:"Hola, soy tu %s, ¿de qué se trata?",ag_run_ph:"Escribe aquí…",ag_new_workflow:"Nuevo Workflow",ag_test:"Probar agente",ag_test_sub:"Pega un artículo y mira qué extrae el agente.",ag_test_ph:"Pega aquí el texto de un artículo…",ag_test_run:"Ejecutar agente",ag_test_running:"El agente está analizando…",ag_test_done:"Análisis completado ✓",ag_test_notext:"Pega primero un texto para analizar.",ag_test_failed:"El agente devolvió un error.",ag_test_offline:"Servicio de agentes no disponible. Inícialo en local e inténtalo de nuevo.",ag_r_topic:"Tema",ag_r_angle:"Ángulo",ag_r_summary:"Resumen",ag_r_facts:"Hechos clave",ag_r_numbers:"Números clave",ag_r_people:"Personas / empresas",ag_r_hook:"Posible gancho",ag_r_context:"Contexto importante",ag_r_warnings:"Por verificar",ag_r_raw:"Ver salida en bruto",mic_denied:"Micrófono no disponible o permiso denegado.",mic_err:"No pude transcribir el audio. Inténtalo de nuevo.",aid_title:"Tus chats",sc_del:"Eliminar chat",sc_del_confirm:"¿Eliminar este chat? No se puede deshacer.",sc_del_ok:"Chat eliminado ✓",cmdk_ph:"Buscar tareas, páginas…",cmdk_empty:"Sin resultados",cmdk_pages:"Páginas",cmdk_tasks:"Tareas",mem_title:"Lo que Workie sabe de ti",mem_clear:"Borrar",mem_empty:"Workie aún está conociéndote. Cuanto más lo uses, mejor te conocerá.",mem_cleared:"Memoria borrada",usage_tasks:"Tareas al día",usage_ai:"Funciones IA",usage_inbox:"Tareas desde el correo",usage_unlimited:"Ilimitadas",usage_on:"Activas",usage_pro_only:"Solo Pro",usage_left:"Te quedan %n tareas hoy",usage_none:"Has alcanzado el límite de hoy",usage_ai_d:"Chat Resolve, roadmaps, guías y Planifica tu día.",usage_used:"usado",usage_ai_left:"%n/%c solicitudes restantes",usage_ai_reset:"se recarga en %t",ai_limit_toast:"Te has quedado sin solicitudes de IA por ahora. Se recarga en %t.",usage_inbox_d:"Conecta la bandeja en Free; crear tareas desde el correo es Pro.",usage_dev:"Modo prueba",usage_sim_free:"Simular Free",usage_sim_pro:"Simular Pro",up_title:"Desbloquea todo con Pro",up_sub:"Tareas ilimitadas, IA completa y bandeja inteligente.",up_day:"día",up_month:"mes",up_inbox_connect:"Conectar la bandeja",up_teams:"Equipos y Agents",up_cta:"Pasar a Pro",up_current:"Ya eres Pro",up_reco:"Recomendado",up_fine:"Pago seguro con Stripe. Cancela cuando quieras.",up_soon:"El pago aún no está activo. ¡Muy pronto!",up_reason_tasks:"Has alcanzado las 7 tareas de hoy del plan Free. Pasa a Pro para tareas ilimitadas.",up_reason_ai:"Las funciones IA están incluidas en el plan Pro.",up_reason_inbox:"Crear tareas desde el correo es una función Pro."});
Object.assign(STR.it,{nav_plugin:`Plugin`,plugin_soon_sub:`Presto potrai aggiungere plugin a Workie.`,st_unpin:`Sblocca`,st_pinned:`Fissati`,st_pin_drop:`Lascia qui per fissare`,ov_pref_chat:`Mostra la chat sotto il saluto`,ov_pref_grad:`Sfondo animato`,ov_chat_ph:`Chiedi qualsiasi cosa…`,nt_add_category:`Categoria`,cat_hint:`Le categorie raggruppano le task per cliente, azienda o contesto. Le gestisci da qui; i gruppi invece li crei dal + quando aggiungi una task.`,cat_new_ph:`Nuova categoria…`,cat_delete:`Elimina categoria`,cat_empty:`Nessuna categoria. Creane una qui sotto.`,cat_confirm_del:`Eliminare questa categoria? Le task non verranno cancellate.`,cat_none:`Nessuna`,premium_chat:`La chat AI è una funzione Premium.`,rsv_scope_task:`Questa task`,rsv_scope_task_sb:`Solo questa task`,rsv_scope_group:`Questo gruppo`,rsv_scope_group_sb:`Tutte le task del gruppo`,rsv_scope_all:`Tutte le task`,rsv_scope_all_sb:`Ambito completo`,ovc_pick:`Seleziona task`,ovc_pick_h:`Scegli una task`,ovc_recent:`Task recenti`,ovc_none:`Nessuna task attiva`,ovc_need:`Scegli prima una task`,ib_pick:`Seleziona un'email per leggerla`,ib_make_task:`Crea task`,ib_reply:`Rispondi`,pl_sub:`Lavora con l'AI nei tuoi strumenti preferiti.`,pl_have:`Aggiungi`,pl_configure:`Configura`,pl_connected:`Collegata`,pl_installed:`Installati`,pl_manage:`Gestisci`,pl_remove:`clicca per rimuovere`,pl_inst_empty:`Nessuna app ancora. Aggiungile con +.`,pl_public:`Pubblici`,pl_personal:`Personali`,pl_personal_empty:`Nessun plugin personale ancora.`,pl_conn_soon:`Collegamento reale in arrivo — per ora è segnata come collegata.`,pl_disconnected:`Scollegata`,pl_none:`Nessun plugin trovato`,plm_sub:`Gestisci plugin, app e MCP`,plm_browse:`Sfoglia la directory`,plm_add:`Aggiungi`,pl_enable:`Attiva`,pl_disable:`Disattiva`,tool_on:`Attivo`,tool_off:`Attiva`,ft_session:`Sessione focus · 25 min`,ft_ready:`Pronta`,ft_running:`In corso`,ft_paused:`In pausa`,ft_done:`Completata`,ft_start:`Avvia`,ft_pause:`Pausa`,ft_reset:`Azzera`,ft_complete:`Sessione focus completata! 🎉`,wt_glasses:`Bicchieri oggi`,wt_goal:`Obiettivo: 8`,wt_goal_ok:`Obiettivo raggiunto!`,nt_note_ph:`Appunti della giornata…`,nt_autosave:`Salvataggio automatico`,nt_chars:`caratteri`,dnd_l1:`Notifiche in pausa`,dnd_l2:`Niente distrazioni`,mu_playing:`In riproduzione`,mu_paused:`In pausa`,mu_l1:`Musica per concentrarti`,mu_l2:`Beats rilassanti`,br_l1:`Pausa ogni 50 min`,br_l2:`Ti avviso io`});
Object.assign(STR.en,{nav_plugin:`Plugin`,plugin_soon_sub:`Soon you'll be able to add plugins to Workie.`,st_unpin:`Unpin`,st_pinned:`Pinned`,st_pin_drop:`Drop here to pin`,ov_pref_chat:`Show chat under the greeting`,ov_pref_grad:`Animated background`,ov_chat_ph:`Ask anything…`,nt_add_category:`Category`,cat_hint:`Categories group tasks by client, company or context. Manage them here; groups instead are created from + when you add a task.`,cat_new_ph:`New category…`,cat_delete:`Delete category`,cat_empty:`No categories. Create one below.`,cat_confirm_del:`Delete this category? Tasks won't be deleted.`,cat_none:`None`,premium_chat:`The AI chat is a Premium feature.`,rsv_scope_task:`This task`,rsv_scope_task_sb:`Only this task`,rsv_scope_group:`This group`,rsv_scope_group_sb:`All tasks in the group`,rsv_scope_all:`All tasks`,rsv_scope_all_sb:`Full scope`,ovc_pick:`Select task`,ovc_pick_h:`Choose a task`,ovc_recent:`Recent tasks`,ovc_none:`No active tasks`,ovc_need:`Pick a task first`,ib_pick:`Select an email to read it`,ib_make_task:`Create task`,ib_reply:`Reply`,pl_sub:`Work with AI across your favorite tools.`,pl_have:`Add`,pl_configure:`Set up`,pl_connected:`Connected`,pl_installed:`Installed`,pl_manage:`Manage`,pl_remove:`click to remove`,pl_inst_empty:`No apps yet. Add them with +.`,pl_public:`Public`,pl_personal:`Personal`,pl_personal_empty:`No personal plugins yet.`,pl_conn_soon:`Real connection coming soon — for now it's marked as connected.`,pl_disconnected:`Disconnected`,pl_none:`No plugin found`,plm_sub:`Manage plugins, apps and MCP`,plm_browse:`Browse the directory`,plm_add:`Add`,pl_enable:`Enable`,pl_disable:`Disable`,tool_on:`On`,tool_off:`Turn on`,ft_session:`Focus session · 25 min`,ft_ready:`Ready`,ft_running:`Running`,ft_paused:`Paused`,ft_done:`Done`,ft_start:`Start`,ft_pause:`Pause`,ft_reset:`Reset`,ft_complete:`Focus session complete! 🎉`,wt_glasses:`Glasses today`,wt_goal:`Goal: 8`,wt_goal_ok:`Goal reached!`,nt_note_ph:`Notes for the day…`,nt_autosave:`Auto-saved`,nt_chars:`chars`,dnd_l1:`Notifications paused`,dnd_l2:`No distractions`,mu_playing:`Playing`,mu_paused:`Paused`,mu_l1:`Music to focus`,mu_l2:`Relaxing beats`,br_l1:`Break every 50 min`,br_l2:`I'll remind you`});
Object.assign(STR.it,{nav_overview:`Overview`,nav_routine:`Giornata`,side_chat_empty:`Le tue chat compariranno qui.`,si_connect_t:`Collega la posta`,si_connect_d:`Collega Gmail o Outlook per vedere le email qui e trasformarle in task.`,si_connect_btn:`Collega una casella`});
Object.assign(STR.en,{nav_overview:`Overview`,nav_routine:`Day`,side_chat_empty:`Your chats will show up here.`,si_connect_t:`Connect your mail`,si_connect_d:`Connect Gmail or Outlook to see your emails here and turn them into tasks.`,si_connect_btn:`Connect a mailbox`});
Object.assign(STR.it,{view_overview:`Panoramica`,view_calendar:`Calendario`,filter_all:`Tutto`,filter_personal:`Personale`,search_ph:`Cerca`,cal_week:`Settimana`,cal_month:`Mese`,nt_modal:`Nuovo task`,nt_name:`Titolo`,nt_name_ph:`Es. Pubblicare 10 post`,nt_tag:`Tag`,nt_tag_ph:`Es. Social`,nt_color:`Colore`,nt_target:`Obiettivo`,nt_target_ph:`Es. 10`,nt_scope:`Tipo`,nt_create:`Crea task`,ttl7:`Pubblicare 10 post`,no_tasks:`Nessun task qui.`});
Object.assign(STR.en,{view_overview:`Overview`,view_calendar:`Calendar`,filter_all:`All`,filter_personal:`Personal`,search_ph:`Search`,cal_week:`Week`,cal_month:`Month`,nt_modal:`New task`,nt_name:`Title`,nt_name_ph:`E.g. Publish 10 posts`,nt_tag:`Tag`,nt_tag_ph:`E.g. Social`,nt_color:`Color`,nt_target:`Goal`,nt_target_ph:`E.g. 10`,nt_scope:`Type`,nt_create:`Create task`,ttl7:`Publish 10 posts`,no_tasks:`No tasks here.`});
Object.assign(STR.fr,{view_overview:`Aperçu`,view_calendar:`Calendrier`,filter_all:`Tout`,filter_personal:`Personnel`,search_ph:`Rechercher`,cal_week:`Semaine`,cal_month:`Mois`,nt_modal:`Nouvelle tâche`,nt_name:`Titre`,nt_name_ph:`Ex. Publier 10 posts`,nt_tag:`Tag`,nt_tag_ph:`Ex. Social`,nt_color:`Couleur`,nt_target:`Objectif`,nt_target_ph:`Ex. 10`,nt_scope:`Type`,nt_create:`Créer la tâche`,ttl7:`Publier 10 posts`,no_tasks:`Aucune tâche ici.`});
Object.assign(STR.es,{view_overview:`Resumen`,view_calendar:`Calendario`,filter_all:`Todo`,filter_personal:`Personal`,search_ph:`Buscar`,cal_week:`Semana`,cal_month:`Mes`,nt_modal:`Nueva tarea`,nt_name:`Título`,nt_name_ph:`Ej. Publicar 10 posts`,nt_tag:`Etiqueta`,nt_tag_ph:`Ej. Social`,nt_color:`Color`,nt_target:`Objetivo`,nt_target_ph:`Ej. 10`,nt_scope:`Tipo`,nt_create:`Crear tarea`,ttl7:`Publicar 10 posts`,no_tasks:`No hay tareas aquí.`});
Object.assign(STR.it,{g_urgent:`Urgenti`,g_todo:`Da completare`,g_done:`Completati`,g_overdue:`In ritardo`,g_today:`Oggi`,g_upcoming:`In arrivo`,al_more:`altre`,nt_desc:`Descrizione`,nt_desc_ph:`Aggiungi una descrizione...`,nt_images:`Immagini (max 5)`,nt_deadline:`Scadenza`,nt_time:`Orario (facoltativo)`,nt_by_date:`Data`,nt_by_month:`Mese`,history_title:`Storico attività`,history_link:`Storico completate`,no_completed:`Nessuna attività completata.`,month_all:`tutto il mese`});
Object.assign(STR.en,{g_urgent:`Urgent`,g_todo:`To do`,g_done:`Completed`,g_overdue:`Overdue`,g_today:`Today`,g_upcoming:`Upcoming`,al_more:`more`,nt_desc:`Description`,nt_desc_ph:`Add a description...`,nt_images:`Images (max 5)`,nt_deadline:`Deadline`,nt_time:`Time (optional)`,nt_by_date:`Date`,nt_by_month:`Month`,history_title:`Activity history`,history_link:`Completed history`,no_completed:`No completed activities.`,month_all:`whole month`});
Object.assign(STR.it,{sb2_newtask:`Nuova task`,sb2_team:`Nuovo team`,sb2_group:`Nuovo gruppo`});
Object.assign(STR.en,{sb2_newtask:`New task`,sb2_team:`New team`,sb2_group:`New group`});
Object.assign(STR.it,{mic_soon:`🎙️ Presto potrai dettare le task a Workie e lui le preparerà per te.`,view_label:`Vista`,mt_title:`Aggiungi più task`,mt_hint:`Detta o scrivi tutte le task che hai in mente, anche di seguito. Workie le riconosce e le trasforma in task pronte.`,mt_ph:`Es. Chiama il fornitore domani alle 10, prepara 5 caroselli entro venerdì, manda la mail a Rossi…`,mt_dictate:`Detta le task`,mt_analyze:`Crea le task`,mt_review_h:`Workie ha preparato %n task — controlla e conferma`,mt_add_one:`Aggiungi una task`,mt_back:`Torna al testo`,mt_confirm:`Aggiungi %n task`,mt_none:`Non ho riconosciuto nessuna task. Prova a riformulare.`,mt_added:`%n task aggiunte ✓`,mt_no_voice:`La dettatura vocale non è supportata da questo browser.`});
Object.assign(STR.en,{mic_soon:`🎙️ Soon you'll be able to dictate tasks to Workie and it'll prepare them for you.`,view_label:`View`,mt_title:`Add multiple tasks`,mt_hint:`Dictate or type all the tasks on your mind, one after another. Workie recognizes them and turns them into ready tasks.`,mt_ph:`E.g. Call the supplier tomorrow at 10, prepare 5 carousels by Friday, email Rossi…`,mt_dictate:`Dictate tasks`,mt_analyze:`Create the tasks`,mt_review_h:`Workie prepared %n tasks — review and confirm`,mt_add_one:`Add a task`,mt_back:`Back to text`,mt_confirm:`Add %n tasks`,mt_none:`I didn't catch any task. Try rephrasing.`,mt_added:`%n tasks added ✓`,mt_no_voice:`Voice dictation isn't supported by this browser.`});
Object.assign(STR.it,{ov_help:`Come posso aiutarti oggi?`,ov_plan:`Pianifica la giornata`,ov_resolve:`Risolvi le task`,ov_newtask:`Aggiungi task`,ov_today_tasks:`Task del giorno`,ov_day:`La giornata`,pday_title:`Pianifica la giornata`,pday_desc:`Workie guarda le task che hai da fare, ragiona su quanto tempo durano (o te lo chiede se ha dei dubbi) e ti dice come suddividerle nella giornata.`,pday_note:`Funzione in costruzione: stiamo definendo i principi con cui Workie ragionerà. Per ora crea un ordine di partenza dalle tue task.`,pday_cta:`Crea il piano`,pday_pick:`Quali task vuoi pianificare oggi?`,pday_f_due:`Da fare`,pday_addall:`Aggiungi tutte`,pday_removeall:`Rimuovi tutte`,pday_empty:`Nessuna task per questo filtro.`,pday_pick_none:`Seleziona almeno una task da pianificare.`,pday_started:`Piano di oggi · avviato alle %s`,pday_reset:`Ricomincia`,pday_update:`Aggiorna il piano`,pday_loading:`Sto creando il tuo piano…`,pday_rm_title:`Il piano della tua giornata`,pday_rm_sub:`Trascina per riordinare — gli orari si aggiornano da soli.`,pday_confirm:`Conferma il piano`,pday_back_pick:`Modifica le task`,expl_meeting:`Riunione: blocca lo slot e avvisa i presenti.`,expl_quick:`Veloce: falla subito e liberatene.`,expl_overdue:`In ritardo: meglio chiuderla presto.`,expl_default:`Ritagliati un blocco dedicato.`,ov_order_title:`Ordine della giornata`,ov_order_clear:`Azzera`});
Object.assign(STR.it,{nav_dayplan:`La giornata`,dayplan_sub:`Ecco come abbiamo deciso di organizzare oggi.`,dayplan_edit:`Modifica piano`,dayplan_reset:`Azzera piano`,dayplan_empty:`Nessun piano per oggi. Crea il tuo piano dalla Overview.`,dayplan_now:`Adesso`});
Object.assign(STR.en,{nav_dayplan:`Your day`,dayplan_sub:`Here's how we decided to organize today.`,dayplan_edit:`Edit plan`,dayplan_reset:`Clear plan`,dayplan_empty:`No plan for today. Create your plan from the Overview.`,dayplan_now:`Now`});
Object.assign(STR.it,{tdw_all:`Tutte le task`,gdw_notes:`Note`,gdw_addtask:`Aggiungi task`});
Object.assign(STR.en,{tdw_all:`All tasks`,gdw_notes:`Notes`,gdw_addtask:`Add task`});
Object.assign(STR.it,{nt_name_ph2:`Nome della task`,nt_desc_ph2:`Aggiungi una descrizione…`,dq_3days_s:`+3g`,dq_week_s:`+1 sett.`,dq_other:`Altra…`});
Object.assign(STR.en,{nt_name_ph2:`Task name`,nt_desc_ph2:`Add a description…`,dq_3days_s:`+3d`,dq_week_s:`+1 wk`,dq_other:`Other…`});
Object.assign(STR.it,{nt_sw_task:`Task`,nt_sw_group:`Gruppo`,nt_add_group:`Gruppo`,nt_advanced:`Avanzate`,nt_grp_addtasks:`Aggiungi task esistenti`,nt_grp_search:`Cerca una task…`,nt_none_group:`Nessun gruppo`,nt_grp_empty_search:`Nessuna task trovata`,nt_grp_created:`Gruppo creato ✓`});
Object.assign(STR.en,{nt_sw_task:`Task`,nt_sw_group:`Group`,nt_add_group:`Group`,nt_advanced:`Advanced`,nt_grp_addtasks:`Add existing tasks`,nt_grp_search:`Search a task…`,nt_none_group:`No group`,nt_grp_empty_search:`No task found`,nt_grp_created:`Group created ✓`});
Object.assign(STR.it,{cal_day:`Giorno`,cal_year:`Anno`,stm_categories:`Categorie`,stm_back_app:`Torna all'app`,stm_back_to:`Torna a %s`,stc_hint:`Crea e gestisci le categorie con cui organizzi le tue task.`,stc_new_ph:`Es. Cliente Rossi`});
Object.assign(STR.en,{cal_day:`Day`,cal_year:`Year`,stm_categories:`Categories`,stm_back_app:`Back to app`,stm_back_to:`Back to %s`,stc_hint:`Create and manage the categories you organize your tasks with.`,stc_new_ph:`E.g. Client Rossi`});
Object.assign(STR.it,{pib_upload:`Allega immagine`,pib_search:`Cerca`,pib_think:`Ragiona`,pib_canvas:`Canvas`,pib_voice:`Messaggio vocale`,pib_send:`Invia`,pib_stop:`Ferma la registrazione`,pib_ph_search:`Cerca sul web…`,pib_ph_think:`Ragiona a fondo…`,pib_ph_canvas:`Crea sul canvas…`,pib_voicemsg:`[Messaggio vocale · %s sec]`,pib_imgmsg:`[Immagine allegata]`,pib_remove:`Rimuovi immagine`,pib_close:`Chiudi`});
Object.assign(STR.en,{pib_upload:`Attach image`,pib_search:`Search`,pib_think:`Think`,pib_canvas:`Canvas`,pib_voice:`Voice message`,pib_send:`Send`,pib_stop:`Stop recording`,pib_ph_search:`Search the web…`,pib_ph_think:`Think deeply…`,pib_ph_canvas:`Create on canvas…`,pib_voicemsg:`[Voice message · %s sec]`,pib_imgmsg:`[Image attached]`,pib_remove:`Remove image`,pib_close:`Close`});
Object.assign(STR.en,{ov_help:`How can I help you today?`,ov_plan:`Plan my day`,ov_resolve:`Resolve tasks`,ov_newtask:`Add tasks`,ov_today_tasks:`Today's tasks`,ov_day:`Your day`,pday_title:`Plan my day`,pday_desc:`Workie looks at the tasks you have to do, reasons about how long they take (or asks you when unsure) and tells you how to spread them across the day.`,pday_note:`Feature in progress: we're defining the principles Workie will reason with. For now it creates a starting order from your tasks.`,pday_cta:`Create the plan`,pday_pick:`Which tasks do you want to plan today?`,pday_f_due:`To do`,pday_addall:`Add all`,pday_removeall:`Remove all`,pday_empty:`No tasks for this filter.`,pday_pick_none:`Select at least one task to plan.`,pday_started:`Today's plan · started at %s`,pday_reset:`Start over`,pday_update:`Update the plan`,pday_loading:`Building your plan…`,pday_rm_title:`Your day plan`,pday_rm_sub:`Drag to reorder — times update automatically.`,pday_confirm:`Confirm the plan`,pday_back_pick:`Edit tasks`,expl_meeting:`Meeting: block the slot and notify attendees.`,expl_quick:`Quick: do it now and get it done.`,expl_overdue:`Overdue: best to close it soon.`,expl_default:`Carve out a dedicated block.`,ov_order_title:`Your day's order`,ov_order_clear:`Reset`});
Object.assign(STR.it,{home_routine:`Routine`,home_tasks:`Tasks`,pmd_title:`Pianifica la giornata`,pmd_sub:`Workie guarda le task di oggi e in ritardo e ti dice da dove partire.`,pmd_btn:`Crea il piano`,pmd_btn_again:`Rigenera il piano`,pmd_intro:`Ecco come organizzerei la giornata%n:`,pmd_at:`alle`,pmd_quick:`veloce, toglitela subito`,pmd_overdue:`è in ritardo di %d — la chiudi ora o la riprogrammi?`,pmd_meeting:`è in ritardo di %d: è saltata o ti sei dimenticato di toglierla? Se vuoi la riprogrammo e avviso i partecipanti.`,pmd_empty:`Non hai task per oggi né in ritardo. Goditi la giornata! 🎉`,pmd_preview:`— Piano generato da Workie (anteprima).`,pmd_day:`giorno`,pmd_days:`giorni`});
Object.assign(STR.en,{home_routine:`Routine`,home_tasks:`Tasks`,pmd_title:`Plan my day`,pmd_sub:`Workie looks at today's and overdue tasks and tells you where to start.`,pmd_btn:`Build the plan`,pmd_btn_again:`Rebuild the plan`,pmd_intro:`Here's how I'd organize the day%n:`,pmd_at:`at`,pmd_quick:`quick, get it out of the way`,pmd_overdue:`is %d overdue — close it now or reschedule?`,pmd_meeting:`is %d overdue: did it get skipped or did you forget to remove it? I can reschedule it and notify the attendees.`,pmd_empty:`No tasks for today or overdue. Enjoy your day! 🎉`,pmd_preview:`— Plan generated by Workie (preview).`,pmd_day:`day`,pmd_days:`days`});
Object.assign(STR.it,{td_details:`Dettagli`,td_info:`Info`,td_context:`Contesto`,td_status:`Stato`,td_no_desc:`Nessuna descrizione`,tdw_invite:`Vuoi farti aiutare da Workie per risolvere questa task?`,tdw_ph_empty:`Scrivi un qualsiasi messaggio per attivare l'aiuto di Workie…`,tdw_ph:`Scrivi un messaggio…`,tdw_openchat:`Apri la chat per risolvere la task`,tdw_closechat:`Chiudi la chat`,tdw_toggle_info:`Mostra/nascondi info task`,tdw_yes:`Sì, aiutami`,tdw_no:`No, grazie`,tdw_start_again:`Ho cambiato idea, aiutami Workie`,tdw_changed:`Ho cambiato idea`,tdw_declined:`Va bene, sono qui quando vuoi.`,tdw_greet:`Ciao%n! Come posso aiutarti con «%s»?`,td_cancel:`Annulla`,rsv_ask_desc:`Vedo solo il titolo, senza descrizione. Puoi dirmi in due righe cosa devi fare di preciso per «%s»? Così preparo un piano su misura.`,rsv_analyze:`Perfetto, parto dalla descrizione. Per aiutarti al meglio ho bisogno di qualche info:\n\n1. Qual è l'obiettivo concreto (com'è fatta la task “finita”)?\n2. Per quando ti serve?\n3. Hai vincoli, strumenti o preferenze da tenere presenti?`,rsv_offtopic:`Restiamo sulla task «%s» 🙂 Su questo ti aiuto volentieri — come vuoi procedere?`});
Object.assign(STR.en,{td_details:`Details`,td_info:`Info`,td_context:`Context`,td_status:`Status`,td_no_desc:`No description`,tdw_invite:`Want Workie to help you get this task done?`,tdw_ph_empty:`Type any message to bring in Workie…`,tdw_ph:`Type a message…`,tdw_openchat:`Open the chat to solve this task`,tdw_closechat:`Close the chat`,tdw_toggle_info:`Show/hide task info`,tdw_yes:`Yes, help me`,tdw_no:`No, thanks`,tdw_start_again:`I changed my mind, help me Workie`,tdw_changed:`I changed my mind`,tdw_declined:`No worries, I'm here whenever you want.`,tdw_greet:`Hi%n! How can I help with "%s"?`,td_cancel:`Cancel`,rsv_ask_desc:`I only see the title, no description. Can you tell me in a line or two what exactly you need to do for "%s"? Then I'll build a tailored plan.`,rsv_analyze:`Great, I'll start from the description. To help you best I need a few things:\n\n1. What's the concrete goal (what does "done" look like)?\n2. When do you need it by?\n3. Any constraints, tools or preferences to keep in mind?`,rsv_offtopic:`Let's stay on the task "%s" 🙂 I can help with that — how do you want to proceed?`});
Object.assign(STR.it,{rsv_sub:`Ti aiuto a completare la task`,rsv_ph:`Chiedi a Resolve…`,rsv_intro:`Ciao! Sono Resolve. Posso aiutarti a completare «%s». Da dove vuoi partire?`,rsv_chip_plan:`Dammi un piano`,rsv_chip_split:`Dividi in sotto-task`,rsv_chip_start:`Da dove inizio?`,rsv_preview:`— Resolve è in anteprima: presto a rispondere sarà l'AI di Workie.`,rsv_r_plan:`Ecco come affronterei «%s»:\n\n1. Chiarisci l'obiettivo e cosa significa "fatto".\n2. Spezza il lavoro in 2-3 passi concreti.\n3. Blocca un momento in agenda e parti dal primo passo.`,rsv_r_split:`Proverei a dividerla così:\n\n• Preparazione — raccogli ciò che ti serve\n• Esecuzione — il grosso del lavoro\n• Revisione — controlla e chiudi`,rsv_r_generic:`Ottimo. Dimmi a che punto sei e ti aiuto con il prossimo passo.`});
Object.assign(STR.en,{rsv_sub:`I help you get this task done`,rsv_ph:`Ask Resolve…`,rsv_intro:`Hi! I'm Resolve. I can help you complete "%s". Where would you like to start?`,rsv_chip_plan:`Give me a plan`,rsv_chip_split:`Break into subtasks`,rsv_chip_start:`Where do I start?`,rsv_preview:`— Resolve is a preview: Workie's AI will answer here soon.`,rsv_r_plan:`Here's how I'd tackle "%s":\n\n1. Clarify the goal and what "done" means.\n2. Break the work into 2-3 concrete steps.\n3. Block time on your calendar and start with step one.`,rsv_r_split:`I'd split it like this:\n\n• Prep — gather what you need\n• Execution — the bulk of the work\n• Review — check and wrap up`,rsv_r_generic:`Great. Tell me where you're at and I'll help with the next step.`});
Object.assign(STR.it,{td_done:`Completata`,td_todo:`Da fare`,td_time:`Ora`,td_scope:`Ambito`,td_group:`Gruppo`,td_progress:`Avanzamento`,td_delete:`Elimina task`,td_mark_done:`Segna completata`,td_mark_todo:`Segna da fare`,td_no_meta:`Nessun dettaglio aggiuntivo.`,td_all_tasks:`Tutte le task`});
Object.assign(STR.en,{td_done:`Completed`,td_todo:`To do`,td_time:`Time`,td_scope:`Scope`,td_group:`Group`,td_progress:`Progress`,td_delete:`Delete task`,td_mark_done:`Mark done`,td_mark_todo:`Mark to do`,td_no_meta:`No extra details.`,td_all_tasks:`All tasks`});
Object.assign(STR.fr,{g_urgent:`Urgentes`,g_todo:`À faire`,g_done:`Terminées`,g_overdue:`En retard`,g_today:`Aujourd'hui`,g_upcoming:`À venir`,al_more:`autres`,nt_desc:`Description`,nt_desc_ph:`Ajouter une description...`,nt_images:`Images (max 5)`,nt_deadline:`Échéance`,nt_time:`Heure (facultatif)`,nt_by_date:`Date`,nt_by_month:`Mois`,history_title:`Historique`,history_link:`Terminées`,no_completed:`Aucune activité terminée.`,month_all:`tout le mois`});
Object.assign(STR.es,{g_urgent:`Urgentes`,g_todo:`Por hacer`,g_done:`Completadas`,g_overdue:`Atrasadas`,g_today:`Hoy`,g_upcoming:`Próximas`,al_more:`más`,nt_desc:`Descripción`,nt_desc_ph:`Añade una descripción...`,nt_images:`Imágenes (máx 5)`,nt_deadline:`Fecha límite`,nt_time:`Hora (opcional)`,nt_by_date:`Fecha`,nt_by_month:`Mes`,history_title:`Historial`,history_link:`Completadas`,no_completed:`No hay actividades completadas.`,month_all:`todo el mes`});
Object.assign(STR.it,{auth_google:`Continua con Google`,auth_or:`oppure`});
Object.assign(STR.en,{auth_google:`Continue with Google`,auth_or:`or`});
Object.assign(STR.fr,{auth_google:`Continuer avec Google`,auth_or:`ou`});
Object.assign(STR.es,{auth_google:`Continuar con Google`,auth_or:`o`});
Object.assign(STR.it,{mcs_title:`Crea`,mcs_task:`Nuovo task`,mcs_project:`Nuovo progetto`});
Object.assign(STR.en,{mcs_title:`Create`,mcs_task:`New task`,mcs_project:`New project`});
Object.assign(STR.fr,{mcs_title:`Créer`,mcs_task:`Nouvelle tâche`,mcs_project:`Nouveau projet`});
Object.assign(STR.es,{mcs_title:`Crear`,mcs_task:`Nueva tarea`,mcs_project:`Nuevo proyecto`});
Object.assign(STR.it,{cc_foot:`Questa funzione arriverà presto in Workie.`,cc_wf_title:`Workflow sarà il tuo alleato nel caos`,cc_wf_tag_a:`Collega la tua email`,cc_wf_tag_b:`al resto pensa Workie`,cc_wf_s1:`Filtra le email`,cc_wf_s2:`Crea i task`,cc_rs_title:`Resolve sarà la tua guida`,cc_rs_tag_a:`Scegli una task`,cc_rs_tag_b:`Workie ti aiuta a risolverla`,cc_rs_s1:`Scegli una task`,cc_rs_s2:`Workie la analizza`,cc_rs_s3:`Ti mostra la soluzione e i tool migliori`});
Object.assign(STR.en,{cc_foot:`This feature is coming to Workie soon.`,cc_wf_title:`Workflow will be your companion in the chaos`,cc_wf_tag_a:`Connect your email`,cc_wf_tag_b:`Workie'll do the rest`,cc_wf_s1:`Filtering emails`,cc_wf_s2:`Creating tasks`,cc_rs_title:`Resolve will be your guide`,cc_rs_tag_a:`Select a task`,cc_rs_tag_b:`Workie'll help you resolve it`,cc_rs_s1:`Choose a task`,cc_rs_s2:`Workie studies`,cc_rs_s3:`Shows the solution and best apps`});
Object.assign(STR.fr,{cc_foot:`Cette fonction arrivera bientôt sur Workie.`,cc_wf_title:`Workflow sera ton allié dans le chaos`,cc_wf_tag_a:`Connecte ton email`,cc_wf_tag_b:`Workie fait le reste`,cc_wf_s1:`Filtre les emails`,cc_wf_s2:`Crée les tâches`,cc_rs_title:`Resolve sera ton guide`,cc_rs_tag_a:`Choisis une tâche`,cc_rs_tag_b:`Workie t'aide à la résoudre`,cc_rs_s1:`Choisis une tâche`,cc_rs_s2:`Workie analyse`,cc_rs_s3:`Montre la solution et les meilleurs outils`});
Object.assign(STR.es,{cc_foot:`Esta función llegará pronto a Workie.`,cc_wf_title:`Workflow será tu aliado en el caos`,cc_wf_tag_a:`Conecta tu email`,cc_wf_tag_b:`Workie hace el resto`,cc_wf_s1:`Filtra los emails`,cc_wf_s2:`Crea las tareas`,cc_rs_title:`Resolve será tu guía`,cc_rs_tag_a:`Elige una tarea`,cc_rs_tag_b:`Workie te ayuda a resolverla`,cc_rs_s1:`Elige una tarea`,cc_rs_s2:`Workie la analiza`,cc_rs_s3:`Muestra la solución y las mejores apps`});
Object.assign(STR.it,{cd_outlook:`Email e calendario`});
Object.assign(STR.en,{cd_outlook:`Email and calendar`});
Object.assign(STR.fr,{cd_outlook:`E-mail et calendrier`});
Object.assign(STR.es,{cd_outlook:`Email y calendario`});
Object.assign(STR.it,{cc_soon:`In arrivo`,cc_foot:`Questa funzione arriverà presto in Workie.`,cc_wf1_t:`Collega la tua email`,cc_wf1_d:`Colleghi Gmail o Outlook (oppure incolli un'email a mano). Workflow legge solo ciò che serve, in sicurezza.`,cc_wf2_t:`L'AI trova le cose da fare`,cc_wf2_d:`Da ogni email Workflow individua richieste e scadenze e le trasforma in task già pronti.`,cc_wf3_t:`Tu approvi, e sono nei task`,cc_wf3_d:`Rivedi i task proposti e aggiungi solo quelli che vuoi. Niente entra senza il tuo ok.`,cc_rs1_t:`Scegli una task`,cc_rs1_d:`Seleziona una task su cui sei bloccato o che non sai come affrontare.`,cc_rs2_t:`Ricevi il piano dall'AI`,cc_rs2_d:`L'AI di Workie ti propone il modo migliore per risolverla, passo dopo passo.`,cc_rs3_t:`Passala a Claude`,cc_rs3_d:`Presto potrai inviare il piano direttamente a Claude che esegue la task per te (via MCP).`});
Object.assign(STR.en,{cc_soon:`Coming soon`,cc_foot:`This feature is coming to Workie soon.`,cc_wf1_t:`Connect your email`,cc_wf1_d:`Connect Gmail or Outlook (or paste an email by hand). Workflow reads only what's needed, securely.`,cc_wf2_t:`The AI finds the to-dos`,cc_wf2_d:`From every email, Workflow spots requests and deadlines and turns them into ready-made tasks.`,cc_wf3_t:`You approve, they're in your tasks`,cc_wf3_d:`Review the proposed tasks and add only the ones you want. Nothing lands without your ok.`,cc_rs1_t:`Pick a task`,cc_rs1_d:`Select a task you're stuck on or unsure how to tackle.`,cc_rs2_t:`Get the AI plan`,cc_rs2_d:`Workie's AI proposes the best way to solve it, step by step.`,cc_rs3_t:`Hand it to Claude`,cc_rs3_d:`Soon you'll be able to send the plan straight to Claude, who runs the task for you (via MCP).`});
Object.assign(STR.fr,{cc_soon:`Bientôt`,cc_foot:`Cette fonction arrivera bientôt sur Workie.`,cc_wf1_t:`Connecte ton email`,cc_wf1_d:`Connecte Gmail ou Outlook (ou colle un email à la main). Workflow ne lit que le nécessaire, en sécurité.`,cc_wf2_t:`L'IA trouve les choses à faire`,cc_wf2_d:`Dans chaque email, Workflow repère les demandes et échéances et les transforme en tâches prêtes.`,cc_wf3_t:`Tu approuves, c'est dans tes tâches`,cc_wf3_d:`Passe en revue les tâches proposées et n'ajoute que celles que tu veux. Rien sans ton accord.`,cc_rs1_t:`Choisis une tâche`,cc_rs1_d:`Sélectionne une tâche qui te bloque ou que tu ne sais pas aborder.`,cc_rs2_t:`Reçois le plan de l'IA`,cc_rs2_d:`L'IA de Workie te propose la meilleure façon de la résoudre, étape par étape.`,cc_rs3_t:`Confie-la à Claude`,cc_rs3_d:`Bientôt tu pourras envoyer le plan directement à Claude, qui exécute la tâche pour toi (via MCP).`});
Object.assign(STR.it,{wf_connect_t:`Le email diventano task`,wf_connect_d:`Collega la tua casella: l'inbox compare qui e trasformi ogni email in un task con un tocco.`,wf_connect_gmail:`Collega Gmail`,wf_connect_outlook:`Outlook`,wf_hero_note:`Workflow accede alla posta solo in lettura, per mostrartela qui. Niente viene modificato o inviato.`,wf_inbox:`Posta in arrivo`,wf_refresh:`Aggiorna`,wf_disconnect:`Scollega`,wf_loading:`Carico la posta…`,wf_error:`Impossibile caricare la posta. Riprova o ricollega Gmail.`,wf_empty:`Nessuna email nella posta in arrivo.`,wf_make_task:`Crea task da questa email`,wf_task_created:`Task creato ✓`,wf_from:`Da:`,gmail_err:`Connessione a Gmail non riuscita`,gmail_nosubject:`(nessun oggetto)`,wf_go_connect:`Collega una casella`,conn_back_wf:`Torna a Workflow`,wf_manage:`Gestisci`,outlook_setup:`Outlook non è ancora configurato: serve l'app su Azure (la prepariamo insieme).`,outlook_err:`Connessione a Outlook non riuscita`});
Object.assign(STR.en,{wf_connect_t:`Emails become tasks`,wf_connect_d:`Connect your mailbox: your inbox shows up here and you turn any email into a task in one tap.`,wf_connect_gmail:`Connect Gmail`,wf_connect_outlook:`Outlook`,wf_hero_note:`Workflow accesses your mail read-only, just to show it here. Nothing is changed or sent.`,wf_inbox:`Inbox`,wf_refresh:`Refresh`,wf_disconnect:`Disconnect`,wf_loading:`Loading your mail…`,wf_error:`Couldn't load your mail. Try again or reconnect Gmail.`,wf_empty:`No emails in your inbox.`,wf_make_task:`Create a task from this email`,wf_task_created:`Task created ✓`,wf_from:`From:`,gmail_err:`Gmail connection failed`,gmail_nosubject:`(no subject)`,wf_go_connect:`Connect a mailbox`,conn_back_wf:`Back to Workflow`,wf_manage:`Manage`,outlook_setup:`Outlook isn't set up yet: it needs the Azure app.`,outlook_err:`Outlook connection failed`});
Object.assign(STR.fr,{wf_connect_t:`Les emails deviennent des tâches`,wf_connect_d:`Connecte ta boîte : ta réception s'affiche ici et tu transformes chaque email en tâche d'un geste.`,wf_connect_gmail:`Connecter Gmail`,wf_connect_outlook:`Outlook`,wf_hero_note:`Workflow accède à ta messagerie en lecture seule, juste pour l'afficher ici. Rien n'est modifié ni envoyé.`,wf_inbox:`Boîte de réception`,wf_refresh:`Actualiser`,wf_disconnect:`Déconnecter`,wf_loading:`Chargement du courrier…`,wf_error:`Impossible de charger le courrier. Réessaie ou reconnecte Gmail.`,wf_empty:`Aucun email dans la boîte de réception.`,wf_make_task:`Créer une tâche depuis cet email`,wf_task_created:`Tâche créée ✓`,wf_from:`De :`,gmail_err:`Échec de la connexion à Gmail`,gmail_nosubject:`(sans objet)`,wf_go_connect:`Connecter une boîte`,conn_back_wf:`Retour à Workflow`,wf_manage:`Gérer`,outlook_setup:`Outlook n'est pas encore configuré : il faut l'app Azure.`,outlook_err:`Échec de la connexion à Outlook`});
Object.assign(STR.es,{wf_connect_t:`Los emails se convierten en tareas`,wf_connect_d:`Conecta tu buzón: tu bandeja aparece aquí y conviertes cualquier email en tarea con un toque.`,wf_connect_gmail:`Conectar Gmail`,wf_connect_outlook:`Outlook`,wf_hero_note:`Workflow accede a tu correo solo en lectura, para mostrarlo aquí. Nada se modifica ni se envía.`,wf_inbox:`Bandeja de entrada`,wf_refresh:`Actualizar`,wf_disconnect:`Desconectar`,wf_loading:`Cargando el correo…`,wf_error:`No se pudo cargar el correo. Reintenta o reconecta Gmail.`,wf_empty:`No hay emails en la bandeja.`,wf_make_task:`Crear tarea desde este email`,wf_task_created:`Tarea creada ✓`,wf_from:`De:`,gmail_err:`Error al conectar con Gmail`,gmail_nosubject:`(sin asunto)`,wf_go_connect:`Conectar un buzón`,conn_back_wf:`Volver a Workflow`,wf_manage:`Gestionar`,outlook_setup:`Outlook aún no está configurado: necesita la app de Azure.`,outlook_err:`Error al conectar con Outlook`});
Object.assign(STR.es,{cc_soon:`Muy pronto`,cc_foot:`Esta función llegará pronto a Workie.`,cc_wf1_t:`Conecta tu email`,cc_wf1_d:`Conecta Gmail u Outlook (o pega un email a mano). Workflow lee solo lo necesario, de forma segura.`,cc_wf2_t:`La IA encuentra las tareas`,cc_wf2_d:`De cada email, Workflow detecta peticiones y fechas y las convierte en tareas listas.`,cc_wf3_t:`Tú apruebas, y están en tus tareas`,cc_wf3_d:`Revisa las tareas propuestas y añade solo las que quieras. Nada entra sin tu ok.`,cc_rs1_t:`Elige una tarea`,cc_rs1_d:`Selecciona una tarea en la que estás atascado o no sabes cómo abordar.`,cc_rs2_t:`Recibe el plan de la IA`,cc_rs2_d:`La IA de Workie te propone la mejor forma de resolverla, paso a paso.`,cc_rs3_t:`Pásala a Claude`,cc_rs3_d:`Pronto podrás enviar el plan directamente a Claude, que ejecuta la tarea por ti (vía MCP).`});
Object.assign(STR.it,{nav_resolve:`Resolve`,rs_sub:`Scegli una task, l'AI ti dà il piano per risolverla.`,rs_hero_t:`Non sai da dove iniziare?`,rs_hero_p:`Seleziona una delle tue task: l'AI di Workie ti propone il modo migliore per risolverla, passo dopo passo. In futuro potrai passare il piano direttamente a Claude per eseguirlo.`,rs_choose:`Scegli una task`,rs_no_tasks:`Nessuna task aperta. Creane una nei Task e torna qui.`,rs_placeholder:`Seleziona una task a sinistra per ricevere il piano dell'AI.`,rs_task_label:`Task da risolvere`,rs_thinking:`L'AI sta preparando il piano…`,rs_regen:`Rigenera`,rs_send_claude:`Invia a Claude`,rs_prompt:`Ho questa task da svolgere: «%t». Dammi il modo migliore per risolverla: un piano passo-passo, conciso e pratico, con eventuali strumenti o accorgimenti utili. Rispondi in italiano.`,rs_demo:`Ecco un possibile approccio per «%t»:\n\n1. **Chiarisci l'obiettivo** — definisci cosa significa "fatto" per questa task.\n2. **Spezzala in sotto-attività** — 2-4 passi piccoli e concreti.\n3. **Stima i tempi** — assegna a ciascun passo una durata realistica.\n4. **Parti dal primo passo** — inizia dalla cosa più semplice per prendere slancio.\n\n(Anteprima demo — online l'AI ti darà una risposta su misura per questa task.)`,rs_claude_soon:`Presto: passa il piano direttamente a Claude per eseguirlo (MCP in arrivo).`,side_home:`Home`,side_work:`Work`,nav_workflow:`Workflow`,nav_inbox:`Inbox`,nav_automations:`Automazioni`,nav_insights:`Statistiche`,nav_soon:`presto`,wf_sub:`Le email diventano task, con il tuo ok.`,wf_hero_t:`Dalle email ai task, in automatico`,wf_hero_p:`Collega la tua email (o incolla un messaggio): Workflow individua le cose da fare e te le propone come task. Aggiungi solo quelle che approvi tu — niente finisce nei task senza il tuo consenso.`,wf_connect_t:`Collega una casella`,wf_other_mail:`Altra email`,wf_manual_ph:`Incolla qui un'email e Workflow ne estrae i task…`,wf_manual_hint:`Prova: incolla il testo di un'email con una richiesta.`,wf_extract:`Estrai task`,wf_sugg_t:`Task proposti dalle tue email`,wf_from:`Da`,wf_add:`Aggiungi ai task`,wf_dismiss:`Ignora`,wf_empty:`Nessun task in attesa. Collega una casella o incolla un'email qui sopra.`,wf_added:`Aggiunto ai task ✓`,wf_pasted:`Email incollata`,wf_manual_subject:`Testo incollato`,wf_from_manual:`Estratto manualmente`,wf_extracted:`Task proposto qui sotto`,wf_connect_soon:`Collegamento email in arrivo — per ora incolla il testo manualmente.`});
Object.assign(STR.en,{nav_resolve:`Resolve`,rs_sub:`Pick a task, the AI gives you the plan to solve it.`,rs_hero_t:`Not sure where to start?`,rs_hero_p:`Select one of your tasks: Workie's AI proposes the best way to solve it, step by step. Soon you'll be able to hand the plan straight to Claude to execute it.`,rs_choose:`Choose a task`,rs_no_tasks:`No open tasks. Create one in Tasks and come back here.`,rs_placeholder:`Select a task on the left to get the AI's plan.`,rs_task_label:`Task to solve`,rs_thinking:`The AI is preparing the plan…`,rs_regen:`Regenerate`,rs_send_claude:`Send to Claude`,rs_prompt:`I have this task to do: "%t". Give me the best way to solve it: a concise, practical step-by-step plan, with any useful tools or tips. Answer in English.`,rs_demo:`Here's a possible approach for "%t":\n\n1. **Clarify the goal** — define what "done" means for this task.\n2. **Break it into subtasks** — 2-4 small, concrete steps.\n3. **Estimate the time** — give each step a realistic duration.\n4. **Start with step one** — begin with the easiest thing to build momentum.\n\n(Demo preview — online the AI will give you an answer tailored to this task.)`,rs_claude_soon:`Coming soon: hand the plan straight to Claude to execute it (MCP on the way).`,side_home:`Home`,side_work:`Work`,nav_workflow:`Workflow`,nav_inbox:`Inbox`,nav_automations:`Automations`,nav_insights:`Insights`,nav_soon:`soon`,wf_sub:`Emails become tasks, with your approval.`,wf_hero_t:`From emails to tasks, automatically`,wf_hero_p:`Connect your email (or paste a message): Workflow spots the things to do and proposes them as tasks. You only add the ones you approve — nothing lands in your tasks without your consent.`,wf_connect_t:`Connect a mailbox`,wf_other_mail:`Other email`,wf_manual_ph:`Paste an email here and Workflow extracts the tasks…`,wf_manual_hint:`Try it: paste the text of an email with a request.`,wf_extract:`Extract tasks`,wf_sugg_t:`Tasks proposed from your emails`,wf_from:`From`,wf_add:`Add to tasks`,wf_dismiss:`Dismiss`,wf_empty:`No tasks waiting. Connect a mailbox or paste an email above.`,wf_added:`Added to tasks ✓`,wf_pasted:`Pasted email`,wf_manual_subject:`Pasted text`,wf_from_manual:`Manually extracted`,wf_extracted:`Task proposed below`,wf_connect_soon:`Email connection coming soon — for now paste the text manually.`});
Object.assign(STR.fr,{nav_resolve:`Resolve`,rs_sub:`Choisis une tâche, l'IA te donne le plan pour la résoudre.`,rs_hero_t:`Tu ne sais pas par où commencer ?`,rs_hero_p:`Sélectionne une de tes tâches : l'IA de Workie te propose la meilleure façon de la résoudre, étape par étape. Bientôt tu pourras confier le plan directement à Claude pour l'exécuter.`,rs_choose:`Choisis une tâche`,rs_no_tasks:`Aucune tâche ouverte. Crées-en une dans Tâches et reviens ici.`,rs_placeholder:`Sélectionne une tâche à gauche pour obtenir le plan de l'IA.`,rs_task_label:`Tâche à résoudre`,rs_thinking:`L'IA prépare le plan…`,rs_regen:`Régénérer`,rs_send_claude:`Envoyer à Claude`,rs_prompt:`J'ai cette tâche à faire : « %t ». Donne-moi la meilleure façon de la résoudre : un plan étape par étape, concis et pratique, avec les outils ou astuces utiles. Réponds en français.`,rs_demo:`Voici une approche possible pour « %t » :\n\n1. **Clarifie l'objectif** — définis ce que « terminé » signifie.\n2. **Découpe en sous-tâches** — 2-4 petites étapes concrètes.\n3. **Estime le temps** — donne une durée réaliste à chaque étape.\n4. **Commence par la première étape** — la plus simple, pour l'élan.\n\n(Aperçu démo — en ligne, l'IA te donnera une réponse sur mesure.)`,rs_claude_soon:`Bientôt : confie le plan directement à Claude pour l'exécuter (MCP à venir).`,side_home:`Accueil`,side_work:`Travail`,nav_workflow:`Workflow`,nav_inbox:`Boîte intelligente`,nav_automations:`Automatisations`,nav_insights:`Statistiques`,nav_soon:`bientôt`,wf_sub:`Les emails deviennent des tâches, avec ton accord.`,wf_hero_t:`Des emails aux tâches, automatiquement`,wf_hero_p:`Connecte ton email (ou colle un message) : Workflow repère les choses à faire et te les propose en tâches. Tu n'ajoutes que celles que tu approuves — rien n'entre dans tes tâches sans ton accord.`,wf_connect_t:`Connecter une boîte`,wf_other_mail:`Autre email`,wf_manual_ph:`Colle un email ici et Workflow en extrait les tâches…`,wf_manual_hint:`Essaie : colle le texte d'un email avec une demande.`,wf_extract:`Extraire les tâches`,wf_sugg_t:`Tâches proposées depuis tes emails`,wf_from:`De`,wf_add:`Ajouter aux tâches`,wf_dismiss:`Ignorer`,wf_empty:`Aucune tâche en attente. Connecte une boîte ou colle un email ci-dessus.`,wf_added:`Ajouté aux tâches ✓`,wf_pasted:`Email collé`,wf_manual_subject:`Texte collé`,wf_from_manual:`Extrait manuellement`,wf_extracted:`Tâche proposée ci-dessous`,wf_connect_soon:`Connexion email bientôt disponible — pour l'instant colle le texte manuellement.`});
Object.assign(STR.es,{nav_resolve:`Resolve`,rs_sub:`Elige una tarea, la IA te da el plan para resolverla.`,rs_hero_t:`¿No sabes por dónde empezar?`,rs_hero_p:`Selecciona una de tus tareas: la IA de Workie te propone la mejor forma de resolverla, paso a paso. Pronto podrás pasar el plan directamente a Claude para ejecutarlo.`,rs_choose:`Elige una tarea`,rs_no_tasks:`No hay tareas abiertas. Crea una en Tareas y vuelve aquí.`,rs_placeholder:`Selecciona una tarea a la izquierda para obtener el plan de la IA.`,rs_task_label:`Tarea a resolver`,rs_thinking:`La IA está preparando el plan…`,rs_regen:`Regenerar`,rs_send_claude:`Enviar a Claude`,rs_prompt:`Tengo esta tarea que hacer: "%t". Dame la mejor forma de resolverla: un plan paso a paso, conciso y práctico, con herramientas o consejos útiles. Responde en español.`,rs_demo:`Aquí tienes un posible enfoque para "%t":\n\n1. **Aclara el objetivo** — define qué significa "hecho".\n2. **Divídela en subtareas** — 2-4 pasos pequeños y concretos.\n3. **Estima el tiempo** — da a cada paso una duración realista.\n4. **Empieza por el primer paso** — el más fácil, para coger impulso.\n\n(Vista previa demo — en línea la IA te dará una respuesta a medida.)`,rs_claude_soon:`Muy pronto: pasa el plan directamente a Claude para ejecutarlo (MCP en camino).`,side_home:`Inicio`,side_work:`Trabajo`,nav_workflow:`Workflow`,nav_inbox:`Bandeja inteligente`,nav_automations:`Automatizaciones`,nav_insights:`Estadísticas`,nav_soon:`pronto`,wf_sub:`Los emails se convierten en tareas, con tu visto bueno.`,wf_hero_t:`De los emails a las tareas, automáticamente`,wf_hero_p:`Conecta tu email (o pega un mensaje): Workflow detecta lo que hay que hacer y te lo propone como tareas. Solo añades las que apruebas — nada entra en tus tareas sin tu consentimiento.`,wf_connect_t:`Conectar un buzón`,wf_other_mail:`Otro email`,wf_manual_ph:`Pega un email aquí y Workflow extrae las tareas…`,wf_manual_hint:`Pruébalo: pega el texto de un email con una petición.`,wf_extract:`Extraer tareas`,wf_sugg_t:`Tareas propuestas desde tus emails`,wf_from:`De`,wf_add:`Añadir a tareas`,wf_dismiss:`Descartar`,wf_empty:`No hay tareas en espera. Conecta un buzón o pega un email arriba.`,wf_added:`Añadido a tareas ✓`,wf_pasted:`Email pegado`,wf_manual_subject:`Texto pegado`,wf_from_manual:`Extraído manualmente`,wf_extracted:`Tarea propuesta abajo`,wf_connect_soon:`Conexión de email muy pronto — por ahora pega el texto manualmente.`});
Object.assign(STR.it,{ql_members:`Membri`,ql_chat:`Chat`,role_owner:`Proprietario`,role_member:`Membro`,more_members:`altri membri`,team_chat_greet:`Benvenuto nella chat del team!`,send_ph:`Scrivi un messaggio...`});
Object.assign(STR.en,{ql_members:`Members`,ql_chat:`Chat`,role_owner:`Owner`,role_member:`Member`,more_members:`more members`,team_chat_greet:`Welcome to the team chat!`,send_ph:`Write a message...`});
Object.assign(STR.fr,{ql_members:`Membres`,ql_chat:`Chat`,role_owner:`Propriétaire`,role_member:`Membre`,more_members:`autres membres`,team_chat_greet:`Bienvenue dans le chat de l'équipe !`,send_ph:`Écrire un message...`});
Object.assign(STR.es,{ql_members:`Miembros`,ql_chat:`Chat`,role_owner:`Propietario`,role_member:`Miembro`,more_members:`más miembros`,team_chat_greet:`¡Bienvenido al chat del equipo!`,send_ph:`Escribe un mensaje...`});
Object.assign(STR.it,{ql_database:`Database`,ts_info:`Informazioni del team`,ts_change_logo:`Cambia immagine`,ts_save:`Salva modifiche`,ts_readonly:`Solo il proprietario può modificare`,ts_leave:`Esci dal team`,ts_advanced:`Impostazioni avanzate`,ts_danger:`Zona pericolosa`,ts_delete:`Elimina team`,ts_delete_confirm:`Conferma eliminazione`,ts_visibility:`Visibilità`,ts_private:`Privato`,ts_public:`Pubblico`,ts_invite_who:`Chi può invitare`,ts_everyone:`Tutti`,ts_admins:`Solo admin`,db_soon:`Database del team — in arrivo.`,toast_left:`Hai lasciato il team`,toast_deleted:`Team eliminato`,toast_saved:`Modifiche salvate`});
Object.assign(STR.en,{ql_database:`Database`,ts_info:`Team info`,ts_change_logo:`Change image`,ts_save:`Save changes`,ts_readonly:`Only the owner can edit`,ts_leave:`Leave team`,ts_advanced:`Advanced settings`,ts_danger:`Danger zone`,ts_delete:`Delete team`,ts_delete_confirm:`Confirm deletion`,ts_visibility:`Visibility`,ts_private:`Private`,ts_public:`Public`,ts_invite_who:`Who can invite`,ts_everyone:`Everyone`,ts_admins:`Admins only`,db_soon:`Team database — coming soon.`,toast_left:`You left the team`,toast_deleted:`Team deleted`,toast_saved:`Changes saved`});
Object.assign(STR.fr,{ql_database:`Base de données`,ts_info:`Infos de l'équipe`,ts_change_logo:`Changer l'image`,ts_save:`Enregistrer`,ts_readonly:`Seul le propriétaire peut modifier`,ts_leave:`Quitter l'équipe`,ts_advanced:`Paramètres avancés`,ts_danger:`Zone dangereuse`,ts_delete:`Supprimer l'équipe`,ts_delete_confirm:`Confirmer la suppression`,ts_visibility:`Visibilité`,ts_private:`Privé`,ts_public:`Public`,ts_invite_who:`Qui peut inviter`,ts_everyone:`Tout le monde`,ts_admins:`Admins seulement`,db_soon:`Base de données de l'équipe — bientôt.`,toast_left:`Vous avez quitté l'équipe`,toast_deleted:`Équipe supprimée`,toast_saved:`Modifications enregistrées`});
Object.assign(STR.es,{ql_database:`Base de datos`,ts_info:`Información del equipo`,ts_change_logo:`Cambiar imagen`,ts_save:`Guardar cambios`,ts_readonly:`Solo el propietario puede editar`,ts_leave:`Salir del equipo`,ts_advanced:`Ajustes avanzados`,ts_danger:`Zona peligrosa`,ts_delete:`Eliminar equipo`,ts_delete_confirm:`Confirmar eliminación`,ts_visibility:`Visibilidad`,ts_private:`Privado`,ts_public:`Público`,ts_invite_who:`Quién puede invitar`,ts_everyone:`Todos`,ts_admins:`Solo admins`,db_soon:`Base de datos del equipo — próximamente.`,toast_left:`Has salido del equipo`,toast_deleted:`Equipo eliminado`,toast_saved:`Cambios guardados`});
Object.assign(STR.it,{space_general:`Generale`,invite_email:`+ Invita via email`,invite_ph:`Email del membro`,invite_send:`Invita`,pending:`In attesa`,m_roles:`Ruoli`,add_tag_ph:`Nuovo ruolo...`,save:`Salva`,requests:`Richieste`,no_requests:`Nessuna richiesta`,invited_you:`ti ha invitato a`,accept:`Accetta`,decline:`Rifiuta`,spaces_h:`Spazi condivisi`,create_space:`+ Crea spazio`,space_name:`Nome dello spazio`,create:`Crea`,toast_invited:`Invito inviato`,toast_joined_team:`Ti sei unito al team`,empty_space:`Spazio vuoto`});
Object.assign(STR.en,{space_general:`General`,invite_email:`+ Invite by email`,invite_ph:`Member email`,invite_send:`Invite`,pending:`Pending`,m_roles:`Roles`,add_tag_ph:`New role...`,save:`Save`,requests:`Requests`,no_requests:`No requests`,invited_you:`invited you to`,accept:`Accept`,decline:`Decline`,spaces_h:`Shared spaces`,create_space:`+ Create space`,space_name:`Space name`,create:`Create`,toast_invited:`Invite sent`,toast_joined_team:`You joined the team`,empty_space:`Empty space`});
Object.assign(STR.fr,{space_general:`Général`,invite_email:`+ Inviter par email`,invite_ph:`Email du membre`,invite_send:`Inviter`,pending:`En attente`,m_roles:`Rôles`,add_tag_ph:`Nouveau rôle...`,save:`Enregistrer`,requests:`Demandes`,no_requests:`Aucune demande`,invited_you:`vous a invité à`,accept:`Accepter`,decline:`Refuser`,spaces_h:`Espaces partagés`,create_space:`+ Créer un espace`,space_name:`Nom de l'espace`,create:`Créer`,toast_invited:`Invitation envoyée`,toast_joined_team:`Vous avez rejoint l'équipe`,empty_space:`Espace vide`});
Object.assign(STR.it,{space_empty:`Personalizza questo spazio aggiungendo widget.`,ql_events:`Eventi`,add_event:`+ Aggiungi evento`,ev_new:`Nuovo evento`,ev_info:`Info`,ev_objectives:`Obiettivi`,ev_related:`Task relativi`,ev_obj_ph:`Aggiungi obiettivo...`,ev_task_ph:`Aggiungi task...`,ev_when:`Ora / luogo`,ev_create:`Crea evento`,ev_desc_ph:`Descrizione dell'evento...`,no_objectives:`Nessun obiettivo`,no_events:`Nessun evento`});
Object.assign(STR.en,{space_empty:`Customize this space by adding widgets.`,ql_events:`Events`,add_event:`+ Add event`,ev_new:`New event`,ev_info:`Info`,ev_objectives:`Objectives`,ev_related:`Related tasks`,ev_obj_ph:`Add objective...`,ev_task_ph:`Add task...`,ev_when:`Time / place`,ev_create:`Create event`,ev_desc_ph:`Event description...`,no_objectives:`No objectives`,no_events:`No events`});
Object.assign(STR.fr,{space_empty:`Personnalisez cet espace en ajoutant des widgets.`,ql_events:`Événements`,add_event:`+ Ajouter un événement`,ev_new:`Nouvel événement`,ev_info:`Info`,ev_objectives:`Objectifs`,ev_related:`Tâches liées`,ev_obj_ph:`Ajouter un objectif...`,ev_task_ph:`Ajouter une tâche...`,ev_when:`Heure / lieu`,ev_create:`Créer l'événement`,ev_desc_ph:`Description de l'événement...`,no_objectives:`Aucun objectif`,no_events:`Aucun événement`});
Object.assign(STR.it,{chat_groups:`Gruppi`});Object.assign(STR.en,{chat_groups:`Groups`});Object.assign(STR.fr,{chat_groups:`Groupes`});Object.assign(STR.es,{chat_groups:`Grupos`});
Object.assign(STR.it,{dk_hidden:`Nascosti`,dk_add:`Aggiungi`,dk_no_hidden:`Nessun widget nascosto.`,dk_open_full:`Apri a schermo intero`});Object.assign(STR.en,{dk_hidden:`Hidden`,dk_add:`Add`,dk_no_hidden:`No hidden widgets.`,dk_open_full:`Open full screen`});Object.assign(STR.fr,{dk_hidden:`Masqués`,dk_add:`Ajouter`,dk_no_hidden:`Aucun widget masqué.`,dk_open_full:`Ouvrir en plein écran`});Object.assign(STR.es,{dk_hidden:`Ocultos`,dk_add:`Añadir`,dk_no_hidden:`Sin widgets ocultos.`,dk_open_full:`Abrir a pantalla completa`});
Object.assign(STR.it,{pf_items:`elementi`,new_project_short:`Nuovo progetto`,confirm_del_project:`Eliminare questo progetto e la sua lavagna?`,bd_text:`Testo`,bd_note:`Nota`,bd_image:`Immagine`,pd_board_sub:`Lavagna · trascina per muoverti, rotella per zoomare`});
Object.assign(STR.en,{pf_items:`items`,new_project_short:`New project`,confirm_del_project:`Delete this project and its board?`,bd_text:`Text`,bd_note:`Note`,bd_image:`Image`,pd_board_sub:`Whiteboard · drag to pan, scroll to zoom`});
Object.assign(STR.fr,{pf_items:`éléments`,new_project_short:`Nouveau projet`,confirm_del_project:`Supprimer ce projet et son tableau ?`,bd_text:`Texte`,bd_note:`Note`,bd_image:`Image`,pd_board_sub:`Tableau · glissez pour vous déplacer, molette pour zoomer`});
Object.assign(STR.es,{pf_items:`elementos`,new_project_short:`Nuevo proyecto`,confirm_del_project:`¿Eliminar este proyecto y su pizarra?`,bd_text:`Texto`,bd_note:`Nota`,bd_image:`Imagen`,pd_board_sub:`Pizarra · arrastra para moverte, rueda para zoom`});
Object.assign(STR.it,{bd_pen:`Pennarello`,bd_rect:`Rettangolo`,bd_circle:`Cerchio`,bd_arrow:`Freccia`,bd_line:`Linea`});
Object.assign(STR.en,{bd_pen:`Marker`,bd_rect:`Rectangle`,bd_circle:`Circle`,bd_arrow:`Arrow`,bd_line:`Line`});
Object.assign(STR.fr,{bd_pen:`Feutre`,bd_rect:`Rectangle`,bd_circle:`Cercle`,bd_arrow:`Flèche`,bd_line:`Ligne`});
Object.assign(STR.es,{bd_pen:`Rotulador`,bd_rect:`Rectángulo`,bd_circle:`Círculo`,bd_arrow:`Flecha`,bd_line:`Línea`});
Object.assign(STR.it,{crop_title:`Ritaglia immagine`,crop_save:`Salva`,remove_photo:`Rimuovi foto`});
Object.assign(STR.en,{crop_title:`Crop image`,crop_save:`Save`,remove_photo:`Remove photo`});
Object.assign(STR.fr,{crop_title:`Recadrer l'image`,crop_save:`Enregistrer`,remove_photo:`Supprimer la photo`});
Object.assign(STR.es,{crop_title:`Recortar imagen`,crop_save:`Guardar`,remove_photo:`Quitar foto`});
Object.assign(STR.it,{dk_cat_widgets:`Widget`,dk_cat_apps:`App connesse`,dk_apps_hint:`Collega un servizio per usarlo come app qui.`,toast_connected_app:`%s collegato · ora è un'app nel Desktop`,conn_intro:`Collega i tuoi servizi: ognuno diventa un'app che puoi aggiungere al Desktop.`,open_app:`Apri`});
Object.assign(STR.en,{dk_cat_widgets:`Widgets`,dk_cat_apps:`Connected apps`,dk_apps_hint:`Connect a service to use it as an app here.`,toast_connected_app:`%s connected · now an app in Desktop`,conn_intro:`Connect your services: each one becomes an app you can add to the Desktop.`,open_app:`Open`});
Object.assign(STR.fr,{dk_cat_widgets:`Widgets`,dk_cat_apps:`Apps connectées`,dk_apps_hint:`Connectez un service pour l'utiliser comme app ici.`,toast_connected_app:`%s connecté · désormais une app dans le Bureau`,conn_intro:`Connectez vos services : chacun devient une app à ajouter au Bureau.`,open_app:`Ouvrir`});
Object.assign(STR.es,{dk_cat_widgets:`Widgets`,dk_cat_apps:`Apps conectadas`,dk_apps_hint:`Conecta un servicio para usarlo como app aquí.`,toast_connected_app:`%s conectado · ahora es una app en el Escritorio`,conn_intro:`Conecta tus servicios: cada uno se vuelve una app para añadir al Escritorio.`,open_app:`Abrir`});
Object.assign(STR.it,{gcal_loading:`Carico gli eventi…`,gcal_empty:`Nessun evento in arrivo`,gcal_err:`Connessione non riuscita`,gcal_untitled:`(senza titolo)`,conn_soon:`In arrivo`,conn_soon_h:`In arrivo`,widget_err:`Widget non disponibile`,sp_nothing:`Niente in riproduzione`,sp_sample_t:`Brano di esempio`,sp_sample_a:`Artista`,sp_search_ph:`Cerca brani, artisti, playlist`,sp_your_playlists:`Le tue playlist`,sp_tracks:`Brani`,sp_playlists:`Playlist`,sp_no_results:`Nessun risultato`,sp_no_playlists:`Nessuna playlist`,sp_back:`Indietro`,sp_need_premium:`La riproduzione richiede Spotify Premium`,sp_no_device:`Avvio il player… riprova tra un secondo`,sp_reconnect:`Sessione Spotify scaduta: riconnetti Spotify in Connessioni`,gd_new:`Nuovo`,gd_sample:`Esempio`,gd_doc:`Doc`,gd_sheet:`Foglio`,gd_slides:`Slide`,cd_suite:`Documenti, Fogli e Presentazioni`,cd_docs:`Crea e apri documenti`,cd_sheets:`Crea e apri fogli di calcolo`,cd_slides:`Crea e apri presentazioni`,gd_new_doc:`Documento senza titolo`,gd_new_sheet:`Foglio senza titolo`,gd_new_slides:`Presentazione senza titolo`,gd_creating:`Creo il file…`,gd_err:`Operazione non riuscita`,gd_empty:`Crea il tuo primo file qui sopra`});
Object.assign(STR.en,{gcal_loading:`Loading events…`,gcal_empty:`No upcoming events`,gcal_err:`Connection failed`,gcal_untitled:`(no title)`,conn_soon:`Coming soon`,conn_soon_h:`Coming soon`,widget_err:`Widget unavailable`,sp_nothing:`Nothing playing`,sp_sample_t:`Sample track`,sp_sample_a:`Artist`,sp_search_ph:`Search tracks, artists, playlists`,sp_your_playlists:`Your playlists`,sp_tracks:`Tracks`,sp_playlists:`Playlists`,sp_no_results:`No results`,sp_no_playlists:`No playlists`,sp_back:`Back`,sp_need_premium:`Playback requires Spotify Premium`,sp_no_device:`Starting the player… try again in a second`,sp_reconnect:`Spotify session expired: reconnect Spotify in Connections`,gd_new:`New`,gd_sample:`Sample`,gd_doc:`Doc`,gd_sheet:`Sheet`,gd_slides:`Slides`,cd_suite:`Docs, Sheets and Slides`,cd_docs:`Create and open documents`,cd_sheets:`Create and open spreadsheets`,cd_slides:`Create and open presentations`,gd_new_doc:`Untitled document`,gd_new_sheet:`Untitled spreadsheet`,gd_new_slides:`Untitled presentation`,gd_creating:`Creating file…`,gd_err:`Action failed`,gd_empty:`Create your first file above`});
Object.assign(STR.fr,{gcal_loading:`Chargement des événements…`,gcal_empty:`Aucun événement à venir`,gcal_err:`Échec de la connexion`,gcal_untitled:`(sans titre)`,conn_soon:`Bientôt`,conn_soon_h:`Bientôt disponible`,widget_err:`Widget indisponible`,sp_nothing:`Rien en lecture`,sp_sample_t:`Morceau d'exemple`,sp_sample_a:`Artiste`,sp_search_ph:`Cherchez titres, artistes, playlists`,sp_your_playlists:`Vos playlists`,sp_tracks:`Titres`,sp_playlists:`Playlists`,sp_no_results:`Aucun résultat`,sp_no_playlists:`Aucune playlist`,sp_back:`Retour`,sp_need_premium:`La lecture nécessite Spotify Premium`,sp_no_device:`Démarrage du lecteur… réessayez dans un instant`,sp_reconnect:`Session Spotify expirée : reconnectez Spotify dans Connexions`,gd_new:`Nouveau`,gd_sample:`Exemple`,gd_doc:`Doc`,gd_sheet:`Feuille`,gd_slides:`Diapos`,cd_suite:`Docs, Feuilles et Présentations`,cd_docs:`Créer et ouvrir des documents`,cd_sheets:`Créer et ouvrir des feuilles`,cd_slides:`Créer et ouvrir des présentations`,gd_new_doc:`Document sans titre`,gd_new_sheet:`Feuille sans titre`,gd_new_slides:`Présentation sans titre`,gd_creating:`Création du fichier…`,gd_err:`Échec de l'action`,gd_empty:`Créez votre premier fichier ci-dessus`});
Object.assign(STR.es,{gcal_loading:`Cargando eventos…`,gcal_empty:`Sin eventos próximos`,gcal_err:`Conexión fallida`,gcal_untitled:`(sin título)`,conn_soon:`Próximamente`,conn_soon_h:`Próximamente`,widget_err:`Widget no disponible`,sp_nothing:`Nada en reproducción`,sp_sample_t:`Pista de ejemplo`,sp_sample_a:`Artista`,sp_search_ph:`Busca canciones, artistas, playlists`,sp_your_playlists:`Tus playlists`,sp_tracks:`Canciones`,sp_playlists:`Playlists`,sp_no_results:`Sin resultados`,sp_no_playlists:`Sin playlists`,sp_back:`Atrás`,sp_need_premium:`La reproducción requiere Spotify Premium`,sp_no_device:`Iniciando el reproductor… reinténtalo en un segundo`,sp_reconnect:`Sesión de Spotify caducada: reconecta Spotify en Conexiones`,gd_new:`Nuevo`,gd_sample:`Ejemplo`,gd_doc:`Doc`,gd_sheet:`Hoja`,gd_slides:`Diapos`,cd_suite:`Docs, Hojas y Presentaciones`,cd_docs:`Crea y abre documentos`,cd_sheets:`Crea y abre hojas de cálculo`,cd_slides:`Crea y abre presentaciones`,gd_new_doc:`Documento sin título`,gd_new_sheet:`Hoja sin título`,gd_new_slides:`Presentación sin título`,gd_creating:`Creando archivo…`,gd_err:`Acción fallida`,gd_empty:`Crea tu primer archivo arriba`});
Object.assign(STR.it,{err_email_taken:`Esiste già un account con questa mail`,confirm_email_sent:`Ti abbiamo inviato un'email di conferma: cliccala per attivare l'account.`,al_today_tasks:`task da completare oggi`,al_tap_list:`Tocca per vedere la lista`,al_late_tasks:`task in ritardo`,al_next:`Prossimo`,al_this_month:`questo mese`,al_all_clear:`Tutto sotto controllo, niente in scadenza.`,al_today_word:`Oggi`,al_tomorrow:`Domani`,al_yesterday:`Ieri`,al_days_ago:`da %n giorni`,al_in_days:`tra %n giorni`});
Object.assign(STR.en,{err_email_taken:`An account with this email already exists`,confirm_email_sent:`We sent you a confirmation email: click it to activate your account.`,al_today_tasks:`tasks to do today`,al_tap_list:`Tap to see the list`,al_late_tasks:`overdue tasks`,al_next:`Next`,al_this_month:`this month`,al_all_clear:`All clear, nothing due.`,al_today_word:`Today`,al_tomorrow:`Tomorrow`,al_yesterday:`Yesterday`,al_days_ago:`%n days ago`,al_in_days:`in %n days`});
Object.assign(STR.fr,{err_email_taken:`Un compte avec cet e-mail existe déjà`,confirm_email_sent:`Nous vous avons envoyé un email de confirmation : cliquez dessus pour activer le compte.`,al_today_tasks:`tâches à faire aujourd'hui`,al_tap_list:`Touchez pour voir la liste`,al_late_tasks:`tâches en retard`,al_next:`Prochain`,al_this_month:`ce mois`,al_all_clear:`Tout est sous contrôle, rien à échéance.`,al_today_word:`Aujourd'hui`,al_tomorrow:`Demain`,al_yesterday:`Hier`,al_days_ago:`il y a %n jours`,al_in_days:`dans %n jours`});
Object.assign(STR.es,{err_email_taken:`Ya existe una cuenta con este correo`,confirm_email_sent:`Te enviamos un email de confirmación: haz clic para activar la cuenta.`,al_today_tasks:`tareas para hoy`,al_tap_list:`Toca para ver la lista`,al_late_tasks:`tareas atrasadas`,al_next:`Próximo`,al_this_month:`este mes`,al_all_clear:`Todo bajo control, nada pendiente.`,al_today_word:`Hoy`,al_tomorrow:`Mañana`,al_yesterday:`Ayer`,al_days_ago:`hace %n días`,al_in_days:`en %n días`});
Object.assign(STR.it,{profile_title:`Profilo`,profile_name:`Nome`,profile_email:`Email`,profile_password:`Password`,pw_new:`Nuova password`,pw_confirm:`Conferma password`,pw_update:`Aggiorna password`,pw_done:`Password aggiornata`,pw_short:`Password troppo corta`,pw_mismatch:`Le password non coincidono`,plan_free:`Piano Free`,profile_plan_val:`Piano Free · Workie`});
Object.assign(STR.en,{profile_title:`Profile`,profile_name:`Name`,profile_email:`Email`,profile_password:`Password`,pw_new:`New password`,pw_confirm:`Confirm password`,pw_update:`Update password`,pw_done:`Password updated`,pw_short:`Password too short`,pw_mismatch:`Passwords do not match`,plan_free:`Free plan`,profile_plan_val:`Free plan · Workie`});
Object.assign(STR.fr,{profile_title:`Profil`,profile_name:`Nom`,profile_email:`E-mail`,profile_password:`Mot de passe`,pw_new:`Nouveau mot de passe`,pw_confirm:`Confirmer le mot de passe`,pw_update:`Mettre à jour`,pw_done:`Mot de passe mis à jour`,pw_short:`Mot de passe trop court`,pw_mismatch:`Les mots de passe ne correspondent pas`,plan_free:`Forfait gratuit`,profile_plan_val:`Forfait gratuit · Workie`});
Object.assign(STR.es,{profile_title:`Perfil`,profile_name:`Nombre`,profile_email:`Correo`,profile_password:`Contraseña`,pw_new:`Nueva contraseña`,pw_confirm:`Confirmar contraseña`,pw_update:`Actualizar contraseña`,pw_done:`Contraseña actualizada`,pw_short:`Contraseña demasiado corta`,pw_mismatch:`Las contraseñas no coinciden`,plan_free:`Plan gratis`,profile_plan_val:`Plan gratis · Workie`});
Object.assign(STR.it,{aw_title:`Benvenuto in Workie`,aw_sub1:`Porta il tuo lavoro al livello successivo con`,aw_sub2:`agenti AI intelligenti`,aw_sub3:`che ti supportano in ogni attività, progetto e workflow.`,aw_register:`Registrati`,aw_login:`Accedi`,aw_continue:`Continua`,fo_title:`Prima di tutto`,fo_sub1:`Per sfruttare al meglio Workie è importante`,fo_sub2:`accedere o registrarsi`,fo_sub3:`nell'app.`,login_title:`Bentornato`,login_sub:`Accedi al tuo account Workie.`,login_switch:`Non hai un account?`,reg_title:`Crea il tuo account`,reg_sub:`Bastano una mail e una password.`,reg_switch:`Hai già un account?`,ph_email:`Email`,ph_password:`Password`,ph_password2:`Conferma password`,on_title:`Come ti chiami?`,on_sub1:`Tutto pronto! Prima di iniziare dicci`,on_sub2:`come vuoi essere chiamato`,on_sub3:`nell'app.`,on_ph:`Il tuo nome`,oi_title:`Prima di entrare nell'app...`,oi_sub1:`...vogliamo conoscerti un po'`,oi_sub2:`per migliorare la tua esperienza`,oi_sub3:`nell'app.`,op_title:`Qual è la tua professione?`,os_title:`In che settore lavori?`,od_title:`Tutto pronto!`,od_sub1:`Abbiamo personalizzato Workie`,od_sub2:`per te`,od_sub3:`. Buon lavoro!`,ob_enter:`Entra in Workie`,prof_student:`Studente`,prof_freelancer:`Freelancer`,prof_worker:`Lavoratore`,prof_pension:`Pensione`,prof_other:`Altro`,cap_studying:`Userai Workie per studiare`,cap_work:`Userai Workie per lavoro`,cap_hobbies:`Userai Workie per hobby`,seg_tech:`Tecnologia`,seg_marketing:`Marketing`,seg_design:`Design`,seg_finance:`Finanza`,seg_health:`Salute`,seg_education:`Istruzione`,seg_retail:`Commercio`,seg_food:`Food`,seg_media:`Media`,seg_legal:`Legale`,seg_robotics:`Robotica`,seg_other:`Altro`,err_email:`Inserisci una mail valida`,err_pw_short:`La password deve avere almeno 6 caratteri`,err_pw_match:`Le password non coincidono`,err_no_account:`Nessun account con questa mail`,err_wrong_pw:`Password errata`,logout:`Esci`});
Object.assign(STR.it,{dw_act_emoji:`Emoji`,dw_auto:`Auto`});
Object.assign(STR.en,{dw_act_emoji:`Emoji`,dw_auto:`Auto`});
if(STR.es)Object.assign(STR.es,{dw_act_emoji:`Emoji`,dw_auto:`Auto`});
if(STR.fr)Object.assign(STR.fr,{dw_act_emoji:`Emoji`,dw_auto:`Auto`});
Object.assign(STR.en,{aw_title:`Welcome to Workie`,aw_sub1:`Take your work to the next level with`,aw_sub2:`intelligent AI agents`,aw_sub3:`that support you across every task, project and workflow.`,aw_register:`Register`,aw_login:`Login`,aw_continue:`Continue`,fo_title:`First of all`,fo_sub1:`In order to unleash Workie potential it is important to`,fo_sub2:`login or register`,fo_sub3:`into the app.`,login_title:`Welcome back`,login_sub:`Log in to your Workie account.`,login_switch:`No account yet?`,reg_title:`Create your account`,reg_sub:`Just an email and a password.`,reg_switch:`Already have an account?`,ph_email:`Email`,ph_password:`Password`,ph_password2:`Confirm password`,on_title:`How should we call you?`,on_sub1:`All ready! Before starting your journey tell us`,on_sub2:`how you would like to be called`,on_sub3:`into the app.`,on_ph:`Your name`,oi_title:`Before joining the app...`,oi_sub1:`...we want to know something about you`,oi_sub2:`in order to improve your experience`,oi_sub3:`into the app.`,op_title:`What is your profession?`,os_title:`In what segment do you work?`,od_title:`All set up!`,od_sub1:`We've tailored Workie`,od_sub2:`just for you`,od_sub3:`. Enjoy!`,ob_enter:`Enter Workie`,prof_student:`Student`,prof_freelancer:`Freelancer`,prof_worker:`Worker`,prof_pension:`Pension`,prof_other:`Other`,cap_studying:`You'll use Workie for studying`,cap_work:`You'll use Workie for work`,cap_hobbies:`You'll use Workie for hobbies`,seg_tech:`Technology`,seg_marketing:`Marketing`,seg_design:`Design`,seg_finance:`Finance`,seg_health:`Health`,seg_education:`Education`,seg_retail:`Retail`,seg_food:`Food`,seg_media:`Media`,seg_legal:`Legal`,seg_robotics:`Robotics`,seg_other:`Other`,err_email:`Enter a valid email`,err_pw_short:`Password must be at least 6 characters`,err_pw_match:`Passwords do not match`,err_no_account:`No account with this email`,err_wrong_pw:`Wrong password`,logout:`Log out`});
Object.assign(STR.fr,{aw_title:`Bienvenue sur Workie`,aw_sub1:`Faites passer votre travail au niveau supérieur avec des`,aw_sub2:`agents IA intelligents`,aw_sub3:`qui vous accompagnent dans chaque tâche, projet et workflow.`,aw_register:`S'inscrire`,aw_login:`Se connecter`,aw_continue:`Continuer`,fo_title:`Tout d'abord`,fo_sub1:`Pour exploiter tout le potentiel de Workie il faut`,fo_sub2:`se connecter ou s'inscrire`,fo_sub3:`dans l'app.`,login_title:`Bon retour`,login_sub:`Connectez-vous à votre compte Workie.`,login_switch:`Pas de compte ?`,reg_title:`Créez votre compte`,reg_sub:`Juste un e-mail et un mot de passe.`,reg_switch:`Déjà un compte ?`,ph_email:`E-mail`,ph_password:`Mot de passe`,ph_password2:`Confirmer le mot de passe`,on_title:`Comment vous appeler ?`,on_sub1:`Tout est prêt ! Avant de commencer dites-nous`,on_sub2:`comment vous aimeriez être appelé`,on_sub3:`dans l'app.`,on_ph:`Votre nom`,oi_title:`Avant de rejoindre l'app...`,oi_sub1:`...nous voulons en savoir plus sur vous`,oi_sub2:`afin d'améliorer votre expérience`,oi_sub3:`dans l'app.`,op_title:`Quelle est votre profession ?`,os_title:`Dans quel secteur travaillez-vous ?`,od_title:`Tout est prêt !`,od_sub1:`Nous avons personnalisé Workie`,od_sub2:`rien que pour vous`,od_sub3:`. Bon travail !`,ob_enter:`Entrer dans Workie`,prof_student:`Étudiant`,prof_freelancer:`Freelance`,prof_worker:`Salarié`,prof_pension:`Retraité`,prof_other:`Autre`,cap_studying:`Vous utiliserez Workie pour étudier`,cap_work:`Vous utiliserez Workie pour le travail`,cap_hobbies:`Vous utiliserez Workie pour les loisirs`,seg_tech:`Technologie`,seg_marketing:`Marketing`,seg_design:`Design`,seg_finance:`Finance`,seg_health:`Santé`,seg_education:`Éducation`,seg_retail:`Commerce`,seg_food:`Food`,seg_media:`Médias`,seg_legal:`Juridique`,seg_robotics:`Robotique`,seg_other:`Autre`,err_email:`Saisissez un e-mail valide`,err_pw_short:`Le mot de passe doit faire au moins 6 caractères`,err_pw_match:`Les mots de passe ne correspondent pas`,err_no_account:`Aucun compte avec cet e-mail`,err_wrong_pw:`Mot de passe incorrect`,logout:`Se déconnecter`});
Object.assign(STR.es,{aw_title:`Bienvenido a Workie`,aw_sub1:`Lleva tu trabajo al siguiente nivel con`,aw_sub2:`agentes de IA inteligentes`,aw_sub3:`que te acompañan en cada tarea, proyecto y flujo de trabajo.`,aw_register:`Regístrate`,aw_login:`Entrar`,aw_continue:`Continuar`,fo_title:`Antes de nada`,fo_sub1:`Para aprovechar todo el potencial de Workie es importante`,fo_sub2:`iniciar sesión o registrarse`,fo_sub3:`en la app.`,login_title:`Bienvenido de nuevo`,login_sub:`Entra en tu cuenta de Workie.`,login_switch:`¿No tienes cuenta?`,reg_title:`Crea tu cuenta`,reg_sub:`Solo un correo y una contraseña.`,reg_switch:`¿Ya tienes cuenta?`,ph_email:`Correo`,ph_password:`Contraseña`,ph_password2:`Confirmar contraseña`,on_title:`¿Cómo te llamas?`,on_sub1:`¡Todo listo! Antes de empezar dinos`,on_sub2:`cómo quieres que te llamemos`,on_sub3:`en la app.`,on_ph:`Tu nombre`,oi_title:`Antes de entrar en la app...`,oi_sub1:`...queremos conocerte un poco`,oi_sub2:`para mejorar tu experiencia`,oi_sub3:`en la app.`,op_title:`¿Cuál es tu profesión?`,os_title:`¿En qué sector trabajas?`,od_title:`¡Todo listo!`,od_sub1:`Hemos personalizado Workie`,od_sub2:`para ti`,od_sub3:`. ¡A trabajar!`,ob_enter:`Entrar en Workie`,prof_student:`Estudiante`,prof_freelancer:`Freelance`,prof_worker:`Trabajador`,prof_pension:`Jubilado`,prof_other:`Otro`,cap_studying:`Usarás Workie para estudiar`,cap_work:`Usarás Workie para trabajar`,cap_hobbies:`Usarás Workie para aficiones`,seg_tech:`Tecnología`,seg_marketing:`Marketing`,seg_design:`Diseño`,seg_finance:`Finanzas`,seg_health:`Salud`,seg_education:`Educación`,seg_retail:`Comercio`,seg_food:`Food`,seg_media:`Medios`,seg_legal:`Legal`,seg_robotics:`Robótica`,seg_other:`Otro`,err_email:`Introduce un correo válido`,err_pw_short:`La contraseña debe tener al menos 6 caracteres`,err_pw_match:`Las contraseñas no coinciden`,err_no_account:`No hay cuenta con este correo`,err_wrong_pw:`Contraseña incorrecta`,logout:`Cerrar sesión`});
Object.assign(STR.it,{dk_widgets:`Widget`,dk_empty:`Aggiungi un widget dalla tendina a destra per iniziare.`,cancel:`Annulla`,confirm_close_desktop:`Chiudere questo desktop? Le finestre verranno eliminate.`,confirm_remove_widget:`Rimuovere questo widget dal desktop?`});
Object.assign(STR.en,{dk_widgets:`Widgets`,dk_empty:`Add a widget from the tray on the right to get started.`,cancel:`Cancel`,confirm_close_desktop:`Close this desktop? Its windows will be deleted.`,confirm_remove_widget:`Remove this widget from the desktop?`});
Object.assign(STR.fr,{dk_widgets:`Widgets`,dk_empty:`Ajoutez un widget depuis le tiroir à droite pour commencer.`,cancel:`Annuler`,confirm_close_desktop:`Fermer ce bureau ? Ses fenêtres seront supprimées.`,confirm_remove_widget:`Retirer ce widget du bureau ?`});
Object.assign(STR.es,{dk_widgets:`Widgets`,dk_empty:`Añade un widget desde la bandeja de la derecha para empezar.`,cancel:`Cancelar`,confirm_close_desktop:`¿Cerrar este escritorio? Sus ventanas se eliminarán.`,confirm_remove_widget:`¿Quitar este widget del escritorio?`});
Object.assign(STR.it,{agents_title:`Agenti AI`,coming_soon:`In arrivo`,agents_soon_sub:`Gli agenti AI di Workie stanno arrivando.`,desktop_soon_sub:`Daily sta arrivando: la tua giornata, i tuoi rituali, i tuoi progressi.`,dq_today:`Oggi`,dq_tomorrow:`Domani`,dq_3days:`Tra 3 giorni`,dq_week:`Prossima settimana`,dq_pick:`Scegli una data`,mq_pick:`Scegli un mese`,nt_edit:`Modifica task`,nt_save:`Salva modifiche`,nt_delete:`Elimina task`,confirm_del_task:`Eliminare questo task?`});
Object.assign(STR.en,{agents_title:`AI Agents`,coming_soon:`Coming soon`,agents_soon_sub:`Workie's AI agents are on their way.`,desktop_soon_sub:`Daily is on its way: your day, your rituals, your progress.`,dq_today:`Today`,dq_tomorrow:`Tomorrow`,dq_3days:`In 3 days`,dq_week:`Next week`,dq_pick:`Pick a date`,mq_pick:`Pick a month`,nt_edit:`Edit task`,nt_save:`Save changes`,nt_delete:`Delete task`,confirm_del_task:`Delete this task?`});
Object.assign(STR.fr,{agents_title:`Agents IA`,coming_soon:`Bientôt disponible`,agents_soon_sub:`Les agents IA de Workie arrivent bientôt.`,desktop_soon_sub:`Daily arrive bientôt : ta journée, tes rituels, tes progrès.`,dq_today:`Aujourd'hui`,dq_tomorrow:`Demain`,dq_3days:`Dans 3 jours`,dq_week:`Semaine prochaine`,dq_pick:`Choisir une date`,mq_pick:`Choisir un mois`,nt_edit:`Modifier la tâche`,nt_save:`Enregistrer`,nt_delete:`Supprimer la tâche`,confirm_del_task:`Supprimer cette tâche ?`});
Object.assign(STR.es,{agents_title:`Agentes IA`,coming_soon:`Próximamente`,agents_soon_sub:`Los agentes IA de Workie están en camino.`,desktop_soon_sub:`Daily está en camino: tu día, tus rituales, tus progresos.`,dq_today:`Hoy`,dq_tomorrow:`Mañana`,dq_3days:`En 3 días`,dq_week:`Próxima semana`,dq_pick:`Elegir una fecha`,mq_pick:`Elegir un mes`,nt_edit:`Editar tarea`,nt_save:`Guardar cambios`,nt_delete:`Eliminar tarea`,confirm_del_task:`¿Eliminar esta tarea?`});
Object.assign(STR.it,{dw_alerts:`Avvisi`,dw_rituals:`Rituali`,dw_add_ritual:`+ Rituale`,dw_new_ritual:`Nuovo rituale`,dw_ritual_ph:`Es. Leggere 20 minuti`,dw_create_ritual:`Crea rituale`,dw_empty:`Niente in programma per oggi. Aggiungi un orario a una task o crea un rituale.`,dw_untimed:`Senza orario`,dw_now:`Adesso`,dw_ritual:`Rituale`,dw_rituals_left:`Rituali da fare`,dw_no_rituals:`Nessun rituale. Creane uno qui sotto.`,dw_ritual_del:`Eliminare questo rituale?`});
Object.assign(STR.it,{pd_board:`Lavagna`,pd_files:`File`,members_word:`Membri`,pd_task_ph:`Aggiungi un task al progetto…`,add:`Aggiungi`,pd_file_add:`+ Carica file`,pd_no_tasks:`Nessun task in questo progetto. Aggiungine uno qui sopra.`,pd_no_files:`Nessun file. Carica il primo qui sopra.`,pd_you:`Tu`,pd_folder_add:`+ Cartella`,pd_folder_name:`Nome della cartella`,pd_folder_del:`Rimuovere la cartella e tutto il suo contenuto?`,pd_file_del:`Rimuovere questo file?`});
Object.assign(STR.en,{dw_alerts:`Notices`,dw_rituals:`Rituals`,dw_add_ritual:`+ Ritual`,dw_new_ritual:`New ritual`,dw_ritual_ph:`E.g. Read 20 minutes`,dw_create_ritual:`Create ritual`,dw_empty:`Nothing planned for today. Add a time to a task or create a ritual.`,dw_untimed:`No time`,dw_now:`Now`,dw_ritual:`Ritual`,dw_rituals_left:`Rituals to do`,dw_no_rituals:`No rituals. Create one below.`,dw_ritual_del:`Delete this ritual?`});
Object.assign(STR.en,{pd_board:`Board`,pd_files:`Files`,members_word:`Members`,pd_task_ph:`Add a task to the project…`,add:`Add`,pd_file_add:`+ Upload file`,pd_no_tasks:`No tasks in this project. Add one above.`,pd_no_files:`No files. Upload the first one above.`,pd_you:`You`,pd_folder_add:`+ Folder`,pd_folder_name:`Folder name`,pd_folder_del:`Remove the folder and all its contents?`,pd_file_del:`Remove this file?`});
Object.assign(STR.fr,{dw_alerts:`Notifications`,dw_rituals:`Rituels`,dw_add_ritual:`+ Rituel`,dw_new_ritual:`Nouveau rituel`,dw_ritual_ph:`Ex. Lire 20 minutes`,dw_create_ritual:`Créer le rituel`,dw_empty:`Rien de prévu aujourd hui. Ajoute une heure à une tâche ou crée un rituel.`,dw_untimed:`Sans heure`,dw_now:`Maintenant`,dw_ritual:`Rituel`,dw_rituals_left:`Rituels à faire`,dw_no_rituals:`Aucun rituel. Crées-en un ci-dessous.`,dw_ritual_del:`Supprimer ce rituel ?`});
Object.assign(STR.fr,{pd_board:`Tableau`,pd_files:`Fichiers`,members_word:`Membres`,pd_task_ph:`Ajouter une tâche au projet…`,add:`Ajouter`,pd_file_add:`+ Importer un fichier`,pd_no_tasks:`Aucune tâche dans ce projet. Ajoutes-en une ci-dessus.`,pd_no_files:`Aucun fichier. Importe le premier ci-dessus.`,pd_you:`Toi`,pd_folder_add:`+ Dossier`,pd_folder_name:`Nom du dossier`,pd_folder_del:`Supprimer le dossier et tout son contenu ?`,pd_file_del:`Supprimer ce fichier ?`});
Object.assign(STR.es,{dw_alerts:`Avisos`,dw_rituals:`Rituales`,dw_add_ritual:`+ Ritual`,dw_new_ritual:`Nuevo ritual`,dw_ritual_ph:`Ej. Leer 20 minutos`,dw_create_ritual:`Crear ritual`,dw_empty:`Nada planeado para hoy. Añade una hora a una tarea o crea un ritual.`,dw_untimed:`Sin hora`,dw_now:`Ahora`,dw_ritual:`Ritual`,dw_rituals_left:`Rituales por hacer`,dw_no_rituals:`No hay rituales. Crea uno abajo.`,dw_ritual_del:`¿Eliminar este ritual?`});
Object.assign(STR.it,{dw_routine:`Routine`,dw_setup:`Imposta giornata`,dw_setup_title:`La tua routine`,dw_setup_sub:`Imposta le tue attività ricorrenti per ogni giorno.`,dw_setup_intro:`Seleziona le tue attività ricorrenti e tienile sotto controllo durante la giornata. Scegli in quali giorni ripeterle.`,dw_activity_ph:`Es. Palestra`,dw_your_activities:`Le tue attività`,dw_no_activities:`Nessuna attività per oggi. Impostala con "Imposta la tua giornata".`,dw_timed_tasks:`Task con orario`,dw_acts_left:`Attività da completare`,dw_all_done:`Tutto fatto per oggi!`,dw_act_del:`Eliminare questa attività?`,dw_no_setup:`Nessuna attività. Aggiungine una qui sotto.`,dw_habits:`Buone abitudini`,dw_add_habit:`+ Abitudine`,dw_habit_title:`Aggiungi un'abitudine`,dw_habit_intro:`Scegli un preset o creane una tua.`,dw_habit_ph:`Es. Meditare`,dw_habit_target:`Volte`,dw_no_habits:`Nessuna abitudine. Aggiungine una qui sotto.`,dw_habit_del:`Eliminare questa abitudine?`,hb_water:`Bere 6 bicchieri d'acqua`,hb_walk:`Camminare ogni 30 minuti`,hb_stretch:`Fare stretching`,hb_fruit:`Mangiare 2 frutti`,hb_noscreen:`Niente schermo prima di dormire`,hb_gratitude:`3 cose per cui sono grato`});
Object.assign(STR.en,{dw_routine:`Routine`,dw_setup:`Set up day`,dw_setup_title:`Your routine`,dw_setup_sub:`Set up your recurring activities for each day.`,dw_setup_intro:`Select your recurring activities and keep track of them through the day. Choose which days to repeat them.`,dw_activity_ph:`E.g. Gym`,dw_your_activities:`Your activities`,dw_no_activities:`No activities for today. Set them with "Set up your day".`,dw_timed_tasks:`Timed tasks`,dw_acts_left:`Activities to complete`,dw_all_done:`All done for today!`,dw_act_del:`Delete this activity?`,dw_no_setup:`No activities. Add one below.`,dw_habits:`Good habits`,dw_add_habit:`+ Habit`,dw_habit_title:`Add a habit`,dw_habit_intro:`Pick a preset or create your own.`,dw_habit_ph:`E.g. Meditate`,dw_habit_target:`Times`,dw_no_habits:`No habits. Add one below.`,dw_habit_del:`Delete this habit?`,hb_water:`Drink 6 glasses of water`,hb_walk:`Walk every 30 minutes`,hb_stretch:`Do some stretching`,hb_fruit:`Eat 2 fruits`,hb_noscreen:`No screen before bed`,hb_gratitude:`3 things I'm grateful for`});
Object.assign(STR.fr,{dw_setup:`Organiser la journée`,dw_setup_title:`Organise ta journée`,dw_setup_intro:`Sélectionne tes activités récurrentes et suis-les au fil de la journée. Choisis les jours où les répéter.`,dw_activity_ph:`Ex. Sport`,dw_your_activities:`Tes activités`,dw_no_activities:`Aucune activité aujourd'hui. Configure-la avec « Organise ta journée ».`,dw_timed_tasks:`Tâches à heure fixe`,dw_acts_left:`Activités à terminer`,dw_all_done:`Tout est fait !`,dw_act_del:`Supprimer cette activité ?`,dw_no_setup:`Aucune activité. Ajoutes-en une ci-dessous.`,dw_habits:`Bonnes habitudes`,dw_add_habit:`+ Habitude`,dw_habit_title:`Ajouter une habitude`,dw_habit_intro:`Choisis un preset ou crée la tienne.`,dw_habit_ph:`Ex. Méditer`,dw_habit_target:`Fois`,dw_no_habits:`Aucune habitude. Ajoutes-en une ci-dessous.`,dw_habit_del:`Supprimer cette habitude ?`,hb_water:`Boire 6 verres d'eau`,hb_walk:`Marcher toutes les 30 minutes`,hb_stretch:`Faire des étirements`,hb_fruit:`Manger 2 fruits`,hb_noscreen:`Pas d'écran avant de dormir`,hb_gratitude:`3 choses dont je suis reconnaissant`});
Object.assign(STR.es,{dw_setup:`Organizar día`,dw_setup_title:`Organiza tu día`,dw_setup_intro:`Selecciona tus actividades recurrentes y hazles seguimiento durante el día. Elige en qué días repetirlas.`,dw_activity_ph:`Ej. Gimnasio`,dw_your_activities:`Tus actividades`,dw_no_activities:`Sin actividades para hoy. Configúralas con "Organiza tu día".`,dw_timed_tasks:`Tareas con hora`,dw_acts_left:`Actividades por completar`,dw_all_done:`¡Todo hecho por hoy!`,dw_act_del:`¿Eliminar esta actividad?`,dw_no_setup:`Sin actividades. Añade una abajo.`,dw_habits:`Buenos hábitos`,dw_add_habit:`+ Hábito`,dw_habit_title:`Añadir un hábito`,dw_habit_intro:`Elige un preset o crea el tuyo.`,dw_habit_ph:`Ej. Meditar`,dw_habit_target:`Veces`,dw_no_habits:`Sin hábitos. Añade uno abajo.`,dw_habit_del:`¿Eliminar este hábito?`,hb_water:`Beber 6 vasos de agua`,hb_walk:`Caminar cada 30 minutos`,hb_stretch:`Hacer estiramientos`,hb_fruit:`Comer 2 frutas`,hb_noscreen:`Sin pantallas antes de dormir`,hb_gratitude:`3 cosas por las que agradezco`});
Object.assign(STR.it,{dw_edit_habits:`Modifica abitudini`,dw_activity:`Attività`,dw_repeat_on:`Ripeti il:`,dw_no_setup_day:`Nessuna attività per questo giorno. Aggiungila qui sotto.`,dw_focus:`Focus`,dw_break:`Pausa`,dw_paused:`in pausa`,dw_activate:`Attiva`,dw_block:`Blocca`,dw_resume:`Riprendi`,dw_reset:`Reset`,dw_timer_hint:`30 min di focus, poi 3 min di pausa per camminare.`,dw_no_habits:`Nessuna abitudine attiva. Aprila da Modifica abitudini.`});
Object.assign(STR.en,{dw_edit_habits:`Edit habits`,dw_activity:`Activity`,dw_repeat_on:`Repeat on:`,dw_no_setup_day:`No activities for this day. Add one below.`,dw_focus:`Focus`,dw_break:`Break`,dw_paused:`paused`,dw_activate:`Start`,dw_block:`Block`,dw_resume:`Resume`,dw_reset:`Reset`,dw_timer_hint:`30 min focus, then a 3 min walk break.`,dw_no_habits:`No active habits. Open Edit habits to add some.`});
Object.assign(STR.fr,{dw_edit_habits:`Modifier les habitudes`,dw_activity:`Activité`,dw_repeat_on:`Répéter le :`,dw_no_setup_day:`Aucune activité ce jour. Ajoutes-en une ci-dessous.`,dw_focus:`Focus`,dw_break:`Pause`,dw_paused:`en pause`,dw_activate:`Démarrer`,dw_block:`Bloquer`,dw_resume:`Reprendre`,dw_reset:`Réinit.`,dw_timer_hint:`30 min de focus, puis 3 min de pause pour marcher.`,dw_no_habits:`Aucune habitude active. Ouvre Modifier les habitudes.`});
Object.assign(STR.es,{dw_edit_habits:`Editar hábitos`,dw_activity:`Actividad`,dw_repeat_on:`Repetir el:`,dw_no_setup_day:`Sin actividades este día. Añade una abajo.`,dw_focus:`Focus`,dw_break:`Pausa`,dw_paused:`en pausa`,dw_activate:`Activar`,dw_block:`Bloquear`,dw_resume:`Reanudar`,dw_reset:`Reiniciar`,dw_timer_hint:`30 min de foco, luego 3 min de pausa para caminar.`,dw_no_habits:`Sin hábitos activos. Ábrelo en Editar hábitos.`});
Object.assign(STR.it,{dw_rename_profile:`Nuovo nome per questa giornata`});
Object.assign(STR.en,{dw_rename_profile:`New name for this day`});
Object.assign(STR.fr,{dw_rename_profile:`Nouveau nom pour cette journée`});
Object.assign(STR.es,{dw_rename_profile:`Nuevo nombre para este día`});
Object.assign(STR.it,{dw_profile:`Profilo`,dw_new_profile:`Nome del nuovo profilo (es. Lavoro)`,dw_new_profile_short:`Nuovo`,dw_prof_del:`Eliminare questo profilo e le sue attività?`,dw_suggestions:`Consigli — trascina o clicca per aggiungere`,dw_drop_hint:`Trascina qui i consigli o aggiungi un'attività qui sotto.`});
Object.assign(STR.en,{dw_profile:`Profile`,dw_new_profile:`New profile name (e.g. Work)`,dw_new_profile_short:`New`,dw_prof_del:`Delete this profile and its activities?`,dw_suggestions:`Suggestions — drag or click to add`,dw_drop_hint:`Drag suggestions here, or add an activity below.`});
Object.assign(STR.fr,{dw_profile:`Profil`,dw_new_profile:`Nom du nouveau profil (ex. Travail)`,dw_new_profile_short:`Nouveau`,dw_prof_del:`Supprimer ce profil et ses activités ?`,dw_suggestions:`Suggestions — glisse ou clique pour ajouter`,dw_drop_hint:`Glisse les suggestions ici, ou ajoute une activité ci-dessous.`});
Object.assign(STR.es,{dw_profile:`Perfil`,dw_new_profile:`Nombre del nuevo perfil (ej. Trabajo)`,dw_new_profile_short:`Nuevo`,dw_prof_del:`¿Eliminar este perfil y sus actividades?`,dw_suggestions:`Sugerencias — arrastra o haz clic para añadir`,dw_drop_hint:`Arrastra sugerencias aquí, o añade una actividad abajo.`});
Object.assign(STR.it,{dw_widget_empty:`Non hai ancora impostato la tua giornata.`});
Object.assign(STR.en,{dw_widget_empty:`You haven't set up your day yet.`});
Object.assign(STR.fr,{dw_widget_empty:`Tu n'as pas encore organisé ta journée.`});
Object.assign(STR.es,{dw_widget_empty:`Aún no has organizado tu día.`});
Object.assign(STR.it,{dw_day:`Giorno`,dw_day_activities:`Attività del giorno`,dw_suggest_hint:`Trascina o clicca per aggiungerli alla giornata.`,dw_new_act:`Nuova attività`,dw_edit_act:`Modifica attività`,dw_act_name:`Nome`,dw_act_time:`Orario`,dw_repeat:`Ripeti`,dw_save:`Salva`,dw_del_act:`Elimina attività`,dw_edit:`Modifica`,dw_everyday:`Tutti i giorni`,dw_weekdays:`Giorni lavorativi`,dw_weekend:`Weekend`,dw_no_days:`Nessun giorno`});
Object.assign(STR.en,{dw_day:`Day`,dw_day_activities:`Day activities`,dw_suggest_hint:`Drag or click to add them to your day.`,dw_new_act:`New activity`,dw_edit_act:`Edit activity`,dw_act_name:`Name`,dw_act_time:`Time`,dw_repeat:`Repeat`,dw_save:`Save`,dw_del_act:`Delete activity`,dw_edit:`Edit`,dw_everyday:`Every day`,dw_weekdays:`Weekdays`,dw_weekend:`Weekend`,dw_no_days:`No days`});
Object.assign(STR.fr,{dw_day:`Jour`,dw_day_activities:`Activités du jour`,dw_suggest_hint:`Glisse ou clique pour les ajouter à ta journée.`,dw_new_act:`Nouvelle activité`,dw_edit_act:`Modifier l'activité`,dw_act_name:`Nom`,dw_act_time:`Heure`,dw_repeat:`Répéter`,dw_save:`Enregistrer`,dw_del_act:`Supprimer l'activité`,dw_edit:`Modifier`,dw_everyday:`Tous les jours`,dw_weekdays:`Jours de semaine`,dw_weekend:`Week-end`,dw_no_days:`Aucun jour`});
Object.assign(STR.es,{dw_day:`Día`,dw_day_activities:`Actividades del día`,dw_suggest_hint:`Arrastra o haz clic para añadirlas al día.`,dw_new_act:`Nueva actividad`,dw_edit_act:`Editar actividad`,dw_act_name:`Nombre`,dw_act_time:`Hora`,dw_repeat:`Repetir`,dw_save:`Guardar`,dw_del_act:`Eliminar actividad`,dw_edit:`Editar`,dw_everyday:`Todos los días`,dw_weekdays:`Días laborables`,dw_weekend:`Fin de semana`,dw_no_days:`Ningún día`});
Object.assign(STR.it,{dw_add_widget:`Aggiungi widget`,dw_open_window:`Apri sul desktop`,dw_win_blocked:`Consenti i popup per aprire la finestra`,dw_upcoming:`In arrivo`,dw_widget_added:`Widget aggiunto`,dw_widget_on:`Widget aggiunto alla Home`,dw_widget_off:`Widget rimosso dalla Home`,dw_habits_saved:`Abitudini salvate`});
Object.assign(STR.en,{dw_add_widget:`Add widget`,dw_open_window:`Open on desktop`,dw_win_blocked:`Allow pop-ups to open the window`,dw_upcoming:`Upcoming`,dw_widget_added:`Widget added`,dw_widget_on:`Widget added to Home`,dw_widget_off:`Widget removed from Home`,dw_habits_saved:`Habits saved`});
Object.assign(STR.fr,{dw_add_widget:`Ajouter un widget`,dw_open_window:`Ouvrir sur le bureau`,dw_win_blocked:`Autorise les pop-ups pour ouvrir la fenêtre`,dw_upcoming:`À venir`,dw_widget_added:`Widget ajouté`,dw_widget_on:`Widget ajouté à l'accueil`,dw_widget_off:`Widget retiré de l'accueil`,dw_habits_saved:`Habitudes enregistrées`});
Object.assign(STR.es,{dw_add_widget:`Añadir widget`,dw_open_window:`Abrir en el escritorio`,dw_win_blocked:`Permite las ventanas emergentes para abrir la ventana`,dw_upcoming:`Próximo`,dw_widget_added:`Widget añadido`,dw_widget_on:`Widget añadido a Inicio`,dw_widget_off:`Widget quitado de Inicio`,dw_habits_saved:`Hábitos guardados`});
Object.assign(STR.es,{pd_board:`Pizarra`,pd_files:`Archivos`,members_word:`Miembros`,pd_task_ph:`Añade una tarea al proyecto…`,add:`Añadir`,pd_file_add:`+ Subir archivo`,pd_no_tasks:`No hay tareas en este proyecto. Añade una arriba.`,pd_no_files:`No hay archivos. Sube el primero arriba.`,pd_you:`Tú`,pd_folder_add:`+ Carpeta`,pd_folder_name:`Nombre de la carpeta`,pd_folder_del:`¿Eliminar la carpeta y todo su contenido?`,pd_file_del:`¿Eliminar este archivo?`});
Object.assign(STR.it,{tpl_title:`Nuovo progetto`,tpl_name_ph:`Es. Campagna estate`,tpl_pick:`Parti da un modello`,tpl_create:`Crea progetto`,tpl_blank:`Vuoto`,tpl_blank_d:`Parti da zero`,tpl_editorial:`Piano editoriale`,tpl_editorial_d:`Temi, calendario e post`,tpl_launch:`Lancio prodotto`,tpl_launch_d:`Dal teaser al go-live`,tpl_campaign:`Campagna`,tpl_campaign_d:`Brief, contenuti, risultati`,qc_title:`Cattura rapida`,qc_ph:`Cosa hai in mente?`,qc_task:`Task`,qc_idea:`Idea`,qc_today:`Per oggi`,qc_add:`Aggiungi`,qc_saved_task:`Task aggiunta`,qc_saved_idea:`Idea salvata`});
Object.assign(STR.en,{tpl_title:`New project`,tpl_name_ph:`E.g. Summer campaign`,tpl_pick:`Start from a template`,tpl_create:`Create project`,tpl_blank:`Blank`,tpl_blank_d:`Start from scratch`,tpl_editorial:`Editorial plan`,tpl_editorial_d:`Topics, calendar and posts`,tpl_launch:`Product launch`,tpl_launch_d:`From teaser to go-live`,tpl_campaign:`Campaign`,tpl_campaign_d:`Brief, content, results`,qc_title:`Quick capture`,qc_ph:`What's on your mind?`,qc_task:`Task`,qc_idea:`Idea`,qc_today:`For today`,qc_add:`Add`,qc_saved_task:`Task added`,qc_saved_idea:`Idea saved`});
Object.assign(STR.fr,{tpl_title:`Nouveau projet`,tpl_name_ph:`Ex. Campagne d'été`,tpl_pick:`Partir d'un modèle`,tpl_create:`Créer le projet`,tpl_blank:`Vierge`,tpl_blank_d:`Partir de zéro`,tpl_editorial:`Plan éditorial`,tpl_editorial_d:`Thèmes, calendrier et posts`,tpl_launch:`Lancement produit`,tpl_launch_d:`Du teaser au lancement`,tpl_campaign:`Campagne`,tpl_campaign_d:`Brief, contenus, résultats`,qc_title:`Capture rapide`,qc_ph:`Qu'as-tu en tête ?`,qc_task:`Tâche`,qc_idea:`Idée`,qc_today:`Pour aujourd'hui`,qc_add:`Ajouter`,qc_saved_task:`Tâche ajoutée`,qc_saved_idea:`Idée enregistrée`});
Object.assign(STR.es,{tpl_title:`Nuevo proyecto`,tpl_name_ph:`Ej. Campaña de verano`,tpl_pick:`Empieza con una plantilla`,tpl_create:`Crear proyecto`,tpl_blank:`En blanco`,tpl_blank_d:`Empieza de cero`,tpl_editorial:`Plan editorial`,tpl_editorial_d:`Temas, calendario y posts`,tpl_launch:`Lanzamiento`,tpl_launch_d:`Del teaser al lanzamiento`,tpl_campaign:`Campaña`,tpl_campaign_d:`Brief, contenidos, resultados`,qc_title:`Captura rápida`,qc_ph:`¿Qué tienes en mente?`,qc_task:`Tarea`,qc_idea:`Idea`,qc_today:`Para hoy`,qc_add:`Añadir`,qc_saved_task:`Tarea añadida`,qc_saved_idea:`Idea guardada`});
Object.assign(STR.it,{ov_my_tasks:`Le mie task`,chat_new_group:`+ Nuovo gruppo`,group_name:`Nome del gruppo`,assign_to:`Assegna a`,assignee_me:`Me stesso`,proposal_sent:`Proposta inviata via chat`,you_proposed:`Hai proposto una task`,proposed_task:`Ti ha proposto una task`,prop_modify:`Modifica`,prop_accepted:`Proposta accettata`,prop_rejected:`Proposta rifiutata`,prop_modified:`Scadenza modificata · in attesa di conferma`,new_deadline:`Nuova scadenza`,confirm:`Conferma`,task_title_ph:`Titolo della task`});
Object.assign(STR.en,{ov_my_tasks:`My tasks`,chat_new_group:`+ New group`,group_name:`Group name`,assign_to:`Assign to`,assignee_me:`Myself`,proposal_sent:`Proposal sent via chat`,you_proposed:`You proposed a task`,proposed_task:`Proposed a task`,prop_modify:`Modify`,prop_accepted:`Proposal accepted`,prop_rejected:`Proposal rejected`,prop_modified:`Deadline modified · awaiting confirmation`,new_deadline:`New deadline`,confirm:`Confirm`,task_title_ph:`Task title`});
Object.assign(STR.fr,{ov_my_tasks:`Mes tâches`,chat_new_group:`+ Nouveau groupe`,group_name:`Nom du groupe`,assign_to:`Assigner à`,assignee_me:`Moi-même`,proposal_sent:`Proposition envoyée par chat`,you_proposed:`Vous avez proposé une tâche`,proposed_task:`A proposé une tâche`,prop_modify:`Modifier`,prop_accepted:`Proposition acceptée`,prop_rejected:`Proposition refusée`,prop_modified:`Échéance modifiée · en attente de confirmation`,new_deadline:`Nouvelle échéance`,confirm:`Confirmer`,task_title_ph:`Titre de la tâche`});
Object.assign(STR.es,{ov_my_tasks:`Mis tareas`,chat_new_group:`+ Nuevo grupo`,group_name:`Nombre del grupo`,assign_to:`Asignar a`,assignee_me:`Yo mismo`,proposal_sent:`Propuesta enviada por chat`,you_proposed:`Has propuesto una tarea`,proposed_task:`Te ha propuesto una tarea`,prop_modify:`Modificar`,prop_accepted:`Propuesta aceptada`,prop_rejected:`Propuesta rechazada`,prop_modified:`Fecha modificada · esperando confirmación`,new_deadline:`Nueva fecha`,confirm:`Confirmar`,task_title_ph:`Título de la tarea`});
Object.assign(STR.it,{ql_feed:`Attività`,feed_empty:`Ancora nessuna attività nel team.`,feed_completed:`ha completato`,feed_assigned:`ha assegnato`,feed_to:`a`,feed_created:`ha creato`,feed_invited:`ha invitato`,assign_title:`Assegna a`,assign_none:`Nessuno`,t_now:`ora`,t_min:` min fa`,t_hr:` h fa`,t_day:` g fa`});
Object.assign(STR.en,{ql_feed:`Activity`,feed_empty:`No team activity yet.`,feed_completed:`completed`,feed_assigned:`assigned`,feed_to:`to`,feed_created:`created`,feed_invited:`invited`,assign_title:`Assign to`,assign_none:`Nobody`,t_now:`now`,t_min:`m ago`,t_hr:`h ago`,t_day:`d ago`});
Object.assign(STR.fr,{ql_feed:`Activité`,feed_empty:`Pas encore d'activité dans l'équipe.`,feed_completed:`a terminé`,feed_assigned:`a assigné`,feed_to:`à`,feed_created:`a créé`,feed_invited:`a invité`,assign_title:`Assigner à`,assign_none:`Personne`,t_now:`maintenant`,t_min:` min`,t_hr:` h`,t_day:` j`});
Object.assign(STR.es,{ql_feed:`Actividad`,feed_empty:`Aún no hay actividad en el equipo.`,feed_completed:`completó`,feed_assigned:`asignó`,feed_to:`a`,feed_created:`creó`,feed_invited:`invitó`,assign_title:`Asignar a`,assign_none:`Nadie`,t_now:`ahora`,t_min:` min`,t_hr:` h`,t_day:` d`});
Object.assign(STR.es,{space_empty:`Personaliza este espacio añadiendo widgets.`,ql_events:`Eventos`,add_event:`+ Añadir evento`,ev_new:`Nuevo evento`,ev_info:`Info`,ev_objectives:`Objetivos`,ev_related:`Tareas relacionadas`,ev_obj_ph:`Añadir objetivo...`,ev_task_ph:`Añadir tarea...`,ev_when:`Hora / lugar`,ev_create:`Crear evento`,ev_desc_ph:`Descripción del evento...`,no_objectives:`Sin objetivos`,no_events:`Sin eventos`});
Object.assign(STR.es,{space_general:`General`,invite_email:`+ Invitar por email`,invite_ph:`Email del miembro`,invite_send:`Invitar`,pending:`Pendiente`,m_roles:`Roles`,add_tag_ph:`Nuevo rol...`,save:`Guardar`,requests:`Solicitudes`,no_requests:`Sin solicitudes`,invited_you:`te invitó a`,accept:`Aceptar`,decline:`Rechazar`,spaces_h:`Espacios compartidos`,create_space:`+ Crear espacio`,space_name:`Nombre del espacio`,create:`Crear`,toast_invited:`Invitación enviada`,toast_joined_team:`Te uniste al equipo`,empty_space:`Espacio vacío`});
Object.assign(STR.it,{nt_group:`Gruppo`,grp_all:`Tutti`,grp_none:`Nessuno`,grp_new:`Nuovo gruppo`,grp_new_title:`Nuovo gruppo`,grp_edit_title:`Modifica gruppo`,grp_edit_link:`Modifica`,grp_name:`Nome del gruppo`,grp_name_ph:`Es. Cliente Rossi`,grp_create:`Crea gruppo`,grp_save:`Salva`,grp_delete:`Elimina gruppo`,grp_confirm_del:`Eliminare questo gruppo? Le task resteranno ma senza gruppo.`,grp_empty:`Nessuna task in questo gruppo. Aggiungine una con "+ Nuovo task".`,grp_toggle:`Gruppi`,grp_manage:`Modifica gruppi`,gm_title:`Gestisci gruppi`,gm_new:`Nuovo gruppo`,gm_add:`Aggiungi`,gm_active:`Attivo`,gm_color:`Cambia colore`,gm_empty:`Ancora nessun gruppo. Creane uno qui sotto.`,grp_link:`Collega a un progetto`,grp_link_none:`Nessun progetto`,proj_link_group:`Gruppo collegato`,proj_link_none:`Nessun gruppo`});
Object.assign(STR.en,{nt_group:`Group`,grp_all:`All`,grp_none:`None`,grp_new:`New group`,grp_new_title:`New group`,grp_edit_title:`Edit group`,grp_edit_link:`Edit`,grp_name:`Group name`,grp_name_ph:`E.g. Client Rossi`,grp_create:`Create group`,grp_save:`Save`,grp_delete:`Delete group`,grp_confirm_del:`Delete this group? Tasks will stay but without a group.`,grp_empty:`No tasks in this group. Add one with "+ New task".`,grp_toggle:`Groups`,grp_manage:`Manage groups`,gm_title:`Manage groups`,gm_new:`New group`,gm_add:`Add`,gm_active:`Active`,gm_color:`Change color`,gm_empty:`No groups yet. Create one below.`,grp_link:`Link to a project`,grp_link_none:`No project`,proj_link_group:`Linked group`,proj_link_none:`No group`});
Object.assign(STR.fr,{nt_group:`Groupe`,grp_all:`Tous`,grp_none:`Aucun`,grp_new:`Nouveau groupe`,grp_new_title:`Nouveau groupe`,grp_edit_title:`Modifier le groupe`,grp_edit_link:`Modifier`,grp_name:`Nom du groupe`,grp_name_ph:`Ex. Client Rossi`,grp_create:`Créer le groupe`,grp_save:`Enregistrer`,grp_delete:`Supprimer le groupe`,grp_confirm_del:`Supprimer ce groupe ? Les tâches resteront mais sans groupe.`,grp_empty:`Aucune tâche dans ce groupe. Ajoutez-en une avec "+ Nouvelle tâche".`,grp_toggle:`Groupes`,grp_manage:`Gérer les groupes`,gm_title:`Gérer les groupes`,gm_new:`Nouveau groupe`,gm_add:`Ajouter`,gm_active:`Actif`,gm_color:`Changer la couleur`,gm_empty:`Aucun groupe. Créez-en un ci-dessous.`,grp_link:`Lier à un projet`,grp_link_none:`Aucun projet`,proj_link_group:`Groupe lié`,proj_link_none:`Aucun groupe`});
Object.assign(STR.es,{nt_group:`Grupo`,grp_all:`Todos`,grp_none:`Ninguno`,grp_new:`Nuevo grupo`,grp_new_title:`Nuevo grupo`,grp_edit_title:`Editar grupo`,grp_edit_link:`Editar`,grp_name:`Nombre del grupo`,grp_name_ph:`Ej. Cliente Rossi`,grp_create:`Crear grupo`,grp_save:`Guardar`,grp_delete:`Eliminar grupo`,grp_confirm_del:`¿Eliminar este grupo? Las tareas quedarán pero sin grupo.`,grp_empty:`No hay tareas en este grupo. Añade una con "+ Nueva tarea".`,grp_toggle:`Grupos`,grp_manage:`Gestionar grupos`,gm_title:`Gestionar grupos`,gm_new:`Nuevo grupo`,gm_add:`Añadir`,gm_active:`Activo`,gm_color:`Cambiar color`,gm_empty:`Aún no hay grupos. Crea uno abajo.`,grp_link:`Vincular a un proyecto`,grp_link_none:`Sin proyecto`,proj_link_group:`Grupo vinculado`,proj_link_none:`Sin grupo`});
Object.assign(STR.it,{nav_social:`Social`,soc_sub:`La tua rete: chat, connessioni e team`,soc_new:`+ Nuova chat`,soc_search_ph:`Cerca…`,soc_no_msg:`Nessun messaggio`,soc_you:`Tu:`,soc_no_results:`Nessun risultato`,soc_empty_list:`Ancora nessuna chat. Creane una con "+ Nuova chat".`,soc_pick:`Scegli una chat o creane una nuova`,soc_start_hint:`Inizia la conversazione 👋`,soc_offline_hint:`I messaggi si sincronizzeranno quando colleghiamo l'account`,soc_call_audio:`Chiamata audio`,soc_call_video:`Videochiamata`,soc_msg_ph:`Scrivi un messaggio…`,soc_beta_note:`Beta: i messaggi sono salvati sul tuo dispositivo. Diventeranno condivisi quando colleghiamo il server.`,soc_new_prompt:`Nome della chat (persona o gruppo):`,soc_call_connecting:`Connessione…`,soc_call_demo:`Anteprima chiamata · connessione tra persone in arrivo`,soc_call_nomedia:`Fotocamera/microfono non disponibili`,soc_notif_title:`Inviti a collegarsi`,soc_notif_empty:`Nessuna notifica`,soc_wants_connect:`Vuole collegarsi con te`,soc_accept:`Accetta`,soc_decline:`Rifiuta`,soc_pending:`In attesa`,soc_req_pending:`Richiesta inviata`,soc_req_sent:`Richiesta di collegamento inviata`,soc_connected:`Ora siete collegati! Potete scrivervi e chiamarvi.`});
Object.assign(STR.en,{nav_social:`Social`,soc_sub:`Your network: chats, connections and teams`,soc_new:`+ New chat`,soc_search_ph:`Search…`,soc_no_msg:`No messages`,soc_you:`You:`,soc_no_results:`No results`,soc_empty_list:`No chats yet. Create one with "+ New chat".`,soc_pick:`Pick a chat or start a new one`,soc_start_hint:`Start the conversation 👋`,soc_offline_hint:`Messages will sync once your account is connected`,soc_call_audio:`Audio call`,soc_call_video:`Video call`,soc_msg_ph:`Type a message…`,soc_beta_note:`Beta: messages are saved on your device. They'll become shared once we connect the server.`,soc_new_prompt:`Chat name (person or group):`,soc_call_connecting:`Connecting…`,soc_call_demo:`Call preview · person-to-person connection coming soon`,soc_call_nomedia:`Camera/microphone unavailable`,soc_notif_title:`Connection requests`,soc_notif_empty:`No notifications`,soc_wants_connect:`Wants to connect with you`,soc_accept:`Accept`,soc_decline:`Decline`,soc_pending:`Pending`,soc_req_pending:`Request sent`,soc_req_sent:`Connection request sent`,soc_connected:`You're connected! You can now message and call.`});
Object.assign(STR.fr,{nav_social:`Social`,soc_sub:`Votre réseau : chats, connexions et équipes`,soc_new:`+ Nouveau chat`,soc_search_ph:`Rechercher…`,soc_no_msg:`Aucun message`,soc_you:`Vous :`,soc_no_results:`Aucun résultat`,soc_empty_list:`Aucun chat. Créez-en un avec "+ Nouveau chat".`,soc_pick:`Choisissez un chat ou créez-en un`,soc_start_hint:`Commencez la conversation 👋`,soc_offline_hint:`Les messages se synchroniseront une fois le compte connecté`,soc_call_audio:`Appel audio`,soc_call_video:`Appel vidéo`,soc_msg_ph:`Écrivez un message…`,soc_beta_note:`Bêta : les messages sont enregistrés sur votre appareil. Ils deviendront partagés une fois le serveur connecté.`,soc_new_prompt:`Nom du chat (personne ou groupe) :`,soc_call_connecting:`Connexion…`,soc_call_demo:`Aperçu d'appel · connexion entre personnes bientôt`,soc_call_nomedia:`Caméra/micro indisponibles`,soc_notif_title:`Demandes de connexion`,soc_notif_empty:`Aucune notification`,soc_wants_connect:`Veut se connecter avec vous`,soc_accept:`Accepter`,soc_decline:`Refuser`,soc_pending:`En attente`,soc_req_pending:`Demande envoyée`,soc_req_sent:`Demande de connexion envoyée`,soc_connected:`Vous êtes connectés ! Vous pouvez vous écrire et vous appeler.`});
Object.assign(STR.es,{nav_social:`Social`,soc_sub:`Tu red: chats, conexiones y equipos`,soc_new:`+ Nuevo chat`,soc_search_ph:`Buscar…`,soc_no_msg:`Sin mensajes`,soc_you:`Tú:`,soc_no_results:`Sin resultados`,soc_empty_list:`Aún no hay chats. Crea uno con "+ Nuevo chat".`,soc_pick:`Elige un chat o crea uno nuevo`,soc_start_hint:`Empieza la conversación 👋`,soc_offline_hint:`Los mensajes se sincronizarán cuando conectes la cuenta`,soc_call_audio:`Llamada de audio`,soc_call_video:`Videollamada`,soc_msg_ph:`Escribe un mensaje…`,soc_beta_note:`Beta: los mensajes se guardan en tu dispositivo. Serán compartidos cuando conectemos el servidor.`,soc_new_prompt:`Nombre del chat (persona o grupo):`,soc_call_connecting:`Conectando…`,soc_call_demo:`Vista previa de llamada · conexión entre personas próximamente`,soc_call_nomedia:`Cámara/micrófono no disponibles`,soc_notif_title:`Solicitudes de conexión`,soc_notif_empty:`Sin notificaciones`,soc_wants_connect:`Quiere conectar contigo`,soc_accept:`Aceptar`,soc_decline:`Rechazar`,soc_pending:`Pendiente`,soc_req_pending:`Solicitud enviada`,soc_req_sent:`Solicitud de conexión enviada`,soc_connected:`¡Ya estáis conectados! Podéis escribiros y llamaros.`});
Object.assign(STR.it,{soc_add:`+ Aggiungi`,soc_tab_recent:`Chat recenti`,soc_tab_conn:`Connessioni`,soc_tab_team:`Team`,soc_add_title:`Aggiungi connessione`,soc_add_sub:`Aggiungi una persona alla tua rete. Potrai scriverle e chiamarla.`,soc_add_name_ph:`Nome e cognome`,soc_add_handle_ph:`@username o email (opzionale)`,soc_add_do:`Aggiungi`,cancel_word:`Annulla`,soc_close:`Chiudi`,soc_add_sub2:`Cerca una persona per nome o @username.`,soc_add_search_ph:`Nome o @username`,soc_add_hint:`Digita un nome o @username per cercare.`,soc_searching:`Ricerca in corso…`,soc_no_user:`Nessun utente Workie trovato con questo nome.`,soc_add_exists:`Hai già questa connessione.`,soc_add_action:`Aggiungi alla tua rete`,soc_add_server_note:`La ricerca tra utenti reali sarà attiva quando colleghiamo il server.`,soc_conn_empty:`Nessuna connessione. Tocca "+ Aggiungi" per crearne una.`,soc_team_empty:`Non fai parte di nessun team.`,soc_empty_recent:`Nessuna chat. Apri una connessione o un team per iniziare.`,soc_message:`Messaggio`,soc_added:`Connessione aggiunta`});
Object.assign(STR.en,{soc_add:`+ Add`,soc_tab_recent:`Recent chats`,soc_tab_conn:`Connections`,soc_tab_team:`Team`,soc_add_title:`Add connection`,soc_add_sub:`Add a person to your network. You'll be able to message and call them.`,soc_add_name_ph:`Full name`,soc_add_handle_ph:`@username or email (optional)`,soc_add_do:`Add`,cancel_word:`Cancel`,soc_close:`Close`,soc_add_sub2:`Search for a person by name or @username.`,soc_add_search_ph:`Name or @username`,soc_add_hint:`Type a name or @username to search.`,soc_searching:`Searching…`,soc_no_user:`No Workie user found with this name.`,soc_add_exists:`You already have this connection.`,soc_add_action:`Add to your network`,soc_add_server_note:`Search among real users will be active once we connect the server.`,soc_conn_empty:`No connections. Tap "+ Add" to create one.`,soc_team_empty:`You're not part of any team.`,soc_empty_recent:`No chats. Open a connection or team to start.`,soc_message:`Message`,soc_added:`Connection added`});
Object.assign(STR.fr,{soc_add:`+ Ajouter`,soc_tab_recent:`Chats récents`,soc_tab_conn:`Connexions`,soc_tab_team:`Équipe`,soc_add_title:`Ajouter une connexion`,soc_add_sub:`Ajoutez une personne à votre réseau. Vous pourrez lui écrire et l'appeler.`,soc_add_name_ph:`Nom et prénom`,soc_add_handle_ph:`@identifiant ou email (facultatif)`,soc_add_do:`Ajouter`,cancel_word:`Annuler`,soc_close:`Fermer`,soc_add_sub2:`Cherchez une personne par nom ou @identifiant.`,soc_add_search_ph:`Nom ou @identifiant`,soc_add_hint:`Tapez un nom ou @identifiant pour rechercher.`,soc_searching:`Recherche…`,soc_no_user:`Aucun utilisateur Workie trouvé avec ce nom.`,soc_add_exists:`Vous avez déjà cette connexion.`,soc_add_action:`Ajouter à votre réseau`,soc_add_server_note:`La recherche parmi les vrais utilisateurs sera active une fois le serveur connecté.`,soc_conn_empty:`Aucune connexion. Touchez "+ Ajouter" pour en créer une.`,soc_team_empty:`Vous ne faites partie d'aucune équipe.`,soc_empty_recent:`Aucun chat. Ouvrez une connexion ou une équipe pour commencer.`,soc_message:`Message`,soc_added:`Connexion ajoutée`});
Object.assign(STR.it,{ou_title:`Scegli il tuo username`,ou_ph:`username`,ou_hint:`Sarà il tuo nome univoco su Workie · premi Invio`,username_short:`Almeno 3 caratteri (lettere, numeri, . _)`,username_taken:`Questo username è già in uso`,username_ok:`Username disponibile`,profile_username:`Username`,username_ph:`username`});
Object.assign(STR.en,{ou_title:`Choose your username`,ou_ph:`username`,ou_hint:`It'll be your unique name on Workie · press Enter`,username_short:`At least 3 characters (letters, numbers, . _)`,username_taken:`This username is already taken`,username_ok:`Username available`,profile_username:`Username`,username_ph:`username`});
Object.assign(STR.fr,{ou_title:`Choisissez votre identifiant`,ou_ph:`identifiant`,ou_hint:`Ce sera votre nom unique sur Workie · appuyez sur Entrée`,username_short:`Au moins 3 caractères (lettres, chiffres, . _)`,username_taken:`Cet identifiant est déjà pris`,username_ok:`Identifiant disponible`,profile_username:`Identifiant`,username_ph:`identifiant`});
Object.assign(STR.es,{ou_title:`Elige tu usuario`,ou_ph:`usuario`,ou_hint:`Será tu nombre único en Workie · pulsa Enter`,username_short:`Al menos 3 caracteres (letras, números, . _)`,username_taken:`Este usuario ya está en uso`,username_ok:`Usuario disponible`,profile_username:`Usuario`,username_ph:`usuario`});
Object.assign(STR.it,{pr_intro:`Workie crede nella trasparenza delle pratiche sui dati. Scopri come vengono protette le tue informazioni quando utilizzi Workie. Consulta l'Informativa sulla privacy per maggiori dettagli.`,pr_protect:`Come proteggiamo i tuoi dati`,pr_use:`Come utilizziamo i tuoi dati`,pr_location:`Metadati della posizione`,pr_location_d:`Consenti a Workie di utilizzare metadati di posizione approssimativa (città/regione) per migliorare l'esperienza del prodotto.`,pr_improve:`Contribuisci a migliorare i nostri modelli AI`,pr_improve_d:`Consenti l'utilizzo delle tue chat e sessioni per addestrare e migliorare i modelli AI di Workie.`,bill_beta_t:`Workie è in beta testing`,bill_beta_s:`Per ora l'app è completamente gratuita: nessun pagamento richiesto. 🎉`});
Object.assign(STR.en,{pr_intro:`Workie believes in transparent data practices. Learn how your information is protected when you use Workie. See the Privacy Policy for more details.`,pr_protect:`How we protect your data`,pr_use:`How we use your data`,pr_location:`Location metadata`,pr_location_d:`Allow Workie to use approximate location metadata (city/region) to improve the product experience.`,pr_improve:`Help improve our AI models`,pr_improve_d:`Allow your chats and sessions to be used to train and improve Workie's AI models.`,bill_beta_t:`Workie is in beta testing`,bill_beta_s:`For now the app is completely free: no payment required. 🎉`});
Object.assign(STR.fr,{pr_intro:`Workie croit en des pratiques de données transparentes. Découvrez comment vos informations sont protégées lorsque vous utilisez Workie. Consultez la Politique de confidentialité pour plus de détails.`,pr_protect:`Comment nous protégeons vos données`,pr_use:`Comment nous utilisons vos données`,pr_location:`Métadonnées de localisation`,pr_location_d:`Autorisez Workie à utiliser des métadonnées de localisation approximative (ville/région) pour améliorer l'expérience.`,pr_improve:`Aidez à améliorer nos modèles IA`,pr_improve_d:`Autorisez l'utilisation de vos chats et sessions pour entraîner et améliorer les modèles IA de Workie.`,bill_beta_t:`Workie est en phase bêta`,bill_beta_s:`Pour l'instant l'app est entièrement gratuite : aucun paiement requis. 🎉`});
Object.assign(STR.es,{pr_intro:`Workie cree en prácticas de datos transparentes. Descubre cómo se protege tu información cuando usas Workie. Consulta la Política de privacidad para más detalles.`,pr_protect:`Cómo protegemos tus datos`,pr_use:`Cómo usamos tus datos`,pr_location:`Metadatos de ubicación`,pr_location_d:`Permite a Workie usar metadatos de ubicación aproximada (ciudad/región) para mejorar la experiencia del producto.`,pr_improve:`Ayuda a mejorar nuestros modelos de IA`,pr_improve_d:`Permite usar tus chats y sesiones para entrenar y mejorar los modelos de IA de Workie.`,bill_beta_t:`Workie está en fase beta`,bill_beta_s:`Por ahora la app es completamente gratis: no se requiere pago. 🎉`});
Object.assign(STR.it,{pf_edit:`Modifica`,pf_joined:`Iscritto a Workie da`,pf_contacts:`Contatti`,pf_connect:`Collegati`,pf_message:`Messaggio`,pf_add_bio:`Aggiungi una biografia dalle impostazioni`,pf_mutual:`Hai %n collegamenti in comune`,stm_public:`Profilo pubblico`,stm_website:`Sito web`,stm_website_ph:`iltuosito.com`,stm_share_email:`Mostra email nel profilo`,stm_share_email_d:`La tua email sarà visibile a chi apre il tuo profilo.`,stm_share_web:`Mostra sito web nel profilo`,stm_share_web_d:`Il tuo sito sarà visibile a chi apre il tuo profilo.`});
Object.assign(STR.en,{pf_edit:`Edit`,pf_joined:`On Workie since`,pf_contacts:`Contacts`,pf_connect:`Connect`,pf_message:`Message`,pf_add_bio:`Add a bio from settings`,pf_mutual:`You have %n connections in common`,stm_public:`Public profile`,stm_website:`Website`,stm_website_ph:`yoursite.com`,stm_share_email:`Show email on profile`,stm_share_email_d:`Your email will be visible to profile visitors.`,stm_share_web:`Show website on profile`,stm_share_web_d:`Your website will be visible to profile visitors.`});
Object.assign(STR.fr,{pf_edit:`Modifier`,pf_joined:`Sur Workie depuis`,pf_contacts:`Contacts`,pf_connect:`Se connecter`,pf_message:`Message`,pf_add_bio:`Ajoutez une bio depuis les paramètres`,pf_mutual:`Vous avez %n relations en commun`,stm_public:`Profil public`,stm_website:`Site web`,stm_website_ph:`votresite.com`,stm_share_email:`Afficher l'email sur le profil`,stm_share_email_d:`Votre email sera visible par les visiteurs du profil.`,stm_share_web:`Afficher le site sur le profil`,stm_share_web_d:`Votre site sera visible par les visiteurs du profil.`});
Object.assign(STR.es,{pf_edit:`Editar`,pf_joined:`En Workie desde`,pf_contacts:`Contactos`,pf_connect:`Conectar`,pf_message:`Mensaje`,pf_add_bio:`Añade una biografía desde ajustes`,pf_mutual:`Tienes %n conexiones en común`,stm_public:`Perfil público`,stm_website:`Sitio web`,stm_website_ph:`tusitio.com`,stm_share_email:`Mostrar email en el perfil`,stm_share_email_d:`Tu email será visible para quien abra tu perfil.`,stm_share_web:`Mostrar sitio web en el perfil`,stm_share_web_d:`Tu sitio será visible para quien abra tu perfil.`});
Object.assign(STR.it,{stm_del_title:`Elimina account`,stm_del_desc:`Elimina definitivamente il tuo account e i tuoi dati. L'azione non è reversibile.`,stm_del_btn:`Elimina account`,stm_del_confirm:`Eliminare definitivamente il tuo account? Questa azione non può essere annullata.`});
Object.assign(STR.en,{stm_del_title:`Delete account`,stm_del_desc:`Permanently delete your account and your data. This can't be undone.`,stm_del_btn:`Delete account`,stm_del_confirm:`Permanently delete your account? This action cannot be undone.`});
Object.assign(STR.fr,{stm_del_title:`Supprimer le compte`,stm_del_desc:`Supprime définitivement votre compte et vos données. Action irréversible.`,stm_del_btn:`Supprimer le compte`,stm_del_confirm:`Supprimer définitivement votre compte ? Cette action est irréversible.`});
Object.assign(STR.es,{stm_del_title:`Eliminar cuenta`,stm_del_desc:`Elimina permanentemente tu cuenta y tus datos. No se puede deshacer.`,stm_del_btn:`Eliminar cuenta`,stm_del_confirm:`¿Eliminar permanentemente tu cuenta? Esta acción no se puede deshacer.`});
Object.assign(STR.it,{stm_home:`Home`,stm_home_daily:`Mostra Daily in Home`,stm_home_daily_d:`La tua giornata in cima alla Home.`,stm_home_tasks:`Mostra Task in Home`,stm_home_tasks_d:`Le task da tenere d'occhio in Home.`});
Object.assign(STR.en,{stm_home:`Home`,stm_home_daily:`Show Daily on Home`,stm_home_daily_d:`Your day at the top of Home.`,stm_home_tasks:`Show Tasks on Home`,stm_home_tasks_d:`Tasks worth a look on Home.`});
Object.assign(STR.fr,{stm_home:`Accueil`,stm_home_daily:`Afficher Daily sur l'accueil`,stm_home_daily_d:`Ta journée en haut de l'accueil.`,stm_home_tasks:`Afficher les tâches sur l'accueil`,stm_home_tasks_d:`Les tâches à surveiller sur l'accueil.`});
Object.assign(STR.es,{stm_home:`Inicio`,stm_home_daily:`Mostrar Daily en Inicio`,stm_home_daily_d:`Tu día en la parte superior de Inicio.`,stm_home_tasks:`Mostrar Tareas en Inicio`,stm_home_tasks_d:`Tareas para vigilar en Inicio.`});
Object.assign(STR.it,{stm_search:`Cerca`,stm_g_settings:`Impostazioni`,stm_g_desktop:`Applicazione Desktop`,stm_g_custom:`Personalizza`,stm_generale:`Generale`,stm_privacy:`Privacy`,stm_billing:`Fatturazione`,stm_features:`Funzionalità`,stm_extensions:`Estensioni`,stm_developer:`Sviluppatore`,stm_connectors:`Connettori`,stm_plugins:`Plugin`,stm_profile:`Profilo`,stm_prefs:`Preferenze`,stm_avatar:`Avatar`,stm_change:`Cambia`,stm_surname:`Cognome`,stm_work:`Quale opzione ti descrive meglio?`,stm_choose:`Seleziona…`,stm_worker:`Lavoratore`,stm_student:`Studente`,stm_other:`Altro`,stm_bio:`Biografia`,stm_bio_ph:`Scrivi qualcosa su di te…`,stm_font:`Carattere`,stm_change_email:`Cambia email`,stm_new_email:`Nuova email`,stm_new_email_ph:`nuova@email.com`,stm_update_email:`Aggiorna email`,stm_change_pw:`Cambia password`,stm_cur_pw:`Password attuale`,stm_same_email:`È già la tua email attuale`,stm_email_done:`Email aggiornata, ricarico…`,stm_wrong_cur:`Password attuale errata`,stm_pw_done:`Password aggiornata`,stm_soon_sub:`Questa sezione sarà disponibile presto.`,stm_save:`Salva`,stm_saved_ok:`Modifiche salvate ✓`,update_title:`Nuova versione disponibile`,update_sub:`Riavvia l'app per avere le ultime novità.`,update_btn:`Riavvia`,update_btn2:`Riavvia per aggiornare`});
Object.assign(STR.en,{stm_search:`Search`,stm_g_settings:`Settings`,stm_g_desktop:`Desktop app`,stm_g_custom:`Customize`,stm_generale:`General`,stm_privacy:`Privacy`,stm_billing:`Billing`,stm_features:`Features`,stm_extensions:`Extensions`,stm_developer:`Developer`,stm_connectors:`Connectors`,stm_plugins:`Plugins`,stm_profile:`Profile`,stm_prefs:`Preferences`,stm_avatar:`Avatar`,stm_change:`Change`,stm_surname:`Last name`,stm_work:`Which option describes you best?`,stm_choose:`Select…`,stm_worker:`Worker`,stm_student:`Student`,stm_other:`Other`,stm_bio:`Bio`,stm_bio_ph:`Write something about you…`,stm_font:`Font`,stm_change_email:`Change email`,stm_new_email:`New email`,stm_new_email_ph:`new@email.com`,stm_update_email:`Update email`,stm_change_pw:`Change password`,stm_cur_pw:`Current password`,stm_same_email:`That's already your current email`,stm_email_done:`Email updated, reloading…`,stm_wrong_cur:`Wrong current password`,stm_pw_done:`Password updated`,stm_soon_sub:`This section will be available soon.`,stm_save:`Save`,stm_saved_ok:`Changes saved ✓`,update_title:`New version available`,update_sub:`Restart the app to get the latest.`,update_btn:`Restart`,update_btn2:`Restart to update`});
Object.assign(STR.fr,{stm_search:`Rechercher`,stm_g_settings:`Paramètres`,stm_g_desktop:`Application Bureau`,stm_g_custom:`Personnaliser`,stm_generale:`Général`,stm_privacy:`Confidentialité`,stm_billing:`Facturation`,stm_features:`Fonctionnalités`,stm_extensions:`Extensions`,stm_developer:`Développeur`,stm_connectors:`Connecteurs`,stm_plugins:`Plugins`,stm_profile:`Profil`,stm_prefs:`Préférences`,stm_avatar:`Avatar`,stm_change:`Changer`,stm_surname:`Nom`,stm_work:`Quelle option vous décrit le mieux ?`,stm_choose:`Sélectionner…`,stm_worker:`Travailleur`,stm_student:`Étudiant`,stm_other:`Autre`,stm_bio:`Bio`,stm_bio_ph:`Écrivez quelque chose sur vous…`,stm_font:`Police`,stm_change_email:`Changer d'email`,stm_new_email:`Nouvel email`,stm_new_email_ph:`nouveau@email.com`,stm_update_email:`Mettre à jour l'email`,stm_change_pw:`Changer le mot de passe`,stm_cur_pw:`Mot de passe actuel`,stm_same_email:`C'est déjà votre email actuel`,stm_email_done:`Email mis à jour, rechargement…`,stm_wrong_cur:`Mot de passe actuel incorrect`,stm_pw_done:`Mot de passe mis à jour`,stm_soon_sub:`Cette section sera bientôt disponible.`,stm_save:`Enregistrer`,stm_saved_ok:`Modifications enregistrées ✓`,update_title:`Nouvelle version disponible`,update_sub:`Redémarrez l'app pour les dernières nouveautés.`,update_btn:`Redémarrer`,update_btn2:`Redémarrer pour mettre à jour`});
Object.assign(STR.it,{push_invite_title:`Nuovo invito`,push_invite_body:`vuole connettersi con te`});
Object.assign(STR.en,{push_invite_title:`New invite`,push_invite_body:`wants to connect with you`});
Object.assign(STR.fr,{push_invite_title:`Nouvelle invitation`,push_invite_body:`veut se connecter avec vous`});
Object.assign(STR.es,{push_invite_title:`Nueva invitación`,push_invite_body:`quiere conectarse contigo`});
Object.assign(STR.it,{stm_notif:`Notifiche`,stm_notif_push:`Notifiche push`,stm_notif_push_d:`Avvisi per messaggi, inviti e promemoria delle attività.`,stm_notif_on:`Notifiche attivate ✓`,stm_notif_off:`Notifiche disattivate`,stm_notif_denied:`Permesso negato dal browser`,stm_notif_ios:`Su iPhone: aggiungi Workie alla schermata Home e riaprila da lì per attivarle.`,stm_notif_unsupported:`Notifiche non supportate su questo dispositivo`,stm_notif_blocked:`Notifiche bloccate: sbloccale nelle impostazioni del browser`,stm_notif_err:`Impossibile attivare, riprova`});
Object.assign(STR.en,{stm_notif:`Notifications`,stm_notif_push:`Push notifications`,stm_notif_push_d:`Alerts for messages, invites and task reminders.`,stm_notif_on:`Notifications on ✓`,stm_notif_off:`Notifications off`,stm_notif_denied:`Permission denied by the browser`,stm_notif_ios:`On iPhone: add Workie to your Home Screen and reopen it from there to enable.`,stm_notif_unsupported:`Notifications not supported on this device`,stm_notif_blocked:`Notifications blocked: unblock them in your browser settings`,stm_notif_err:`Couldn't enable, try again`});
Object.assign(STR.fr,{stm_notif:`Notifications`,stm_notif_push:`Notifications push`,stm_notif_push_d:`Alertes pour messages, invitations et rappels de tâches.`,stm_notif_on:`Notifications activées ✓`,stm_notif_off:`Notifications désactivées`,stm_notif_denied:`Autorisation refusée par le navigateur`,stm_notif_ios:`Sur iPhone : ajoutez Workie à l'écran d'accueil et rouvrez-la depuis là pour activer.`,stm_notif_unsupported:`Notifications non prises en charge sur cet appareil`,stm_notif_blocked:`Notifications bloquées : débloquez-les dans les réglages du navigateur`,stm_notif_err:`Activation impossible, réessayez`});
Object.assign(STR.es,{stm_notif:`Notificaciones`,stm_notif_push:`Notificaciones push`,stm_notif_push_d:`Avisos de mensajes, invitaciones y recordatorios de tareas.`,stm_notif_on:`Notificaciones activadas ✓`,stm_notif_off:`Notificaciones desactivadas`,stm_notif_denied:`Permiso denegado por el navegador`,stm_notif_ios:`En iPhone: añade Workie a la pantalla de inicio y ábrela desde ahí para activarlas.`,stm_notif_unsupported:`Notificaciones no compatibles en este dispositivo`,stm_notif_blocked:`Notificaciones bloqueadas: desbloquéalas en los ajustes del navegador`,stm_notif_err:`No se pudo activar, inténtalo de nuevo`});
Object.assign(STR.es,{stm_search:`Buscar`,stm_g_settings:`Ajustes`,stm_g_desktop:`Aplicación de escritorio`,stm_g_custom:`Personalizar`,stm_generale:`General`,stm_privacy:`Privacidad`,stm_billing:`Facturación`,stm_features:`Funciones`,stm_extensions:`Extensiones`,stm_developer:`Desarrollador`,stm_connectors:`Conectores`,stm_plugins:`Plugins`,stm_profile:`Perfil`,stm_prefs:`Preferencias`,stm_avatar:`Avatar`,stm_change:`Cambiar`,stm_surname:`Apellido`,stm_work:`¿Qué opción te describe mejor?`,stm_choose:`Seleccionar…`,stm_worker:`Trabajador`,stm_student:`Estudiante`,stm_other:`Otro`,stm_bio:`Biografía`,stm_bio_ph:`Escribe algo sobre ti…`,stm_font:`Fuente`,stm_change_email:`Cambiar email`,stm_new_email:`Nuevo email`,stm_new_email_ph:`nuevo@email.com`,stm_update_email:`Actualizar email`,stm_change_pw:`Cambiar contraseña`,stm_cur_pw:`Contraseña actual`,stm_same_email:`Ya es tu email actual`,stm_email_done:`Email actualizado, recargando…`,stm_wrong_cur:`Contraseña actual incorrecta`,stm_pw_done:`Contraseña actualizada`,stm_soon_sub:`Esta sección estará disponible pronto.`,stm_save:`Guardar`,stm_saved_ok:`Cambios guardados ✓`,update_title:`Nueva versión disponible`,update_sub:`Reinicia la app para las novedades.`,update_btn:`Reiniciar`,update_btn2:`Reiniciar para actualizar`});
Object.assign(STR.es,{soc_add:`+ Añadir`,soc_tab_recent:`Chats recientes`,soc_tab_conn:`Conexiones`,soc_tab_team:`Equipo`,soc_add_title:`Añadir conexión`,soc_add_sub:`Añade una persona a tu red. Podrás escribirle y llamarla.`,soc_add_name_ph:`Nombre y apellido`,soc_add_handle_ph:`@usuario o email (opcional)`,soc_add_do:`Añadir`,cancel_word:`Cancelar`,soc_close:`Cerrar`,soc_add_sub2:`Busca a una persona por nombre o @usuario.`,soc_add_search_ph:`Nombre o @usuario`,soc_add_hint:`Escribe un nombre o @usuario para buscar.`,soc_searching:`Buscando…`,soc_no_user:`No se encontró ningún usuario de Workie con este nombre.`,soc_add_exists:`Ya tienes esta conexión.`,soc_add_action:`Añadir a tu red`,soc_add_server_note:`La búsqueda entre usuarios reales estará activa cuando conectemos el servidor.`,soc_conn_empty:`Sin conexiones. Toca "+ Añadir" para crear una.`,soc_team_empty:`No formas parte de ningún equipo.`,soc_empty_recent:`Sin chats. Abre una conexión o equipo para empezar.`,soc_message:`Mensaje`,soc_added:`Conexión añadida`});
Object.assign(STR.it,{pd_create_file:`+ Crea file`,pd_doc_add:`+ Foglio di testo`,pd_sheet_add:`+ Foglio di calcolo`,fe_new_doc:`Foglio di testo`,fe_new_sheet:`Foglio di calcolo`,fe_export:`Esporta`,fe_saved:`Salvato`,fe_doc_ph:`Scrivi qui il tuo documento…`});
Object.assign(STR.en,{pd_create_file:`+ Create file`,pd_doc_add:`+ Text document`,pd_sheet_add:`+ Spreadsheet`,fe_new_doc:`Text document`,fe_new_sheet:`Spreadsheet`,fe_export:`Export`,fe_saved:`Saved`,fe_doc_ph:`Write your document here…`});
Object.assign(STR.fr,{pd_create_file:`+ Créer un fichier`,pd_doc_add:`+ Document texte`,pd_sheet_add:`+ Feuille de calcul`,fe_new_doc:`Document texte`,fe_new_sheet:`Feuille de calcul`,fe_export:`Exporter`,fe_saved:`Enregistré`,fe_doc_ph:`Écrivez votre document ici…`});
Object.assign(STR.es,{pd_create_file:`+ Crear archivo`,pd_doc_add:`+ Documento de texto`,pd_sheet_add:`+ Hoja de cálculo`,fe_new_doc:`Documento de texto`,fe_new_sheet:`Hoja de cálculo`,fe_export:`Exportar`,fe_saved:`Guardado`,fe_doc_ph:`Escribe tu documento aquí…`});
Object.assign(STR.it,{ai_sub:`Il tuo assistente`,ai_ph:`Scrivi un messaggio…`,ai_hi:`Ciao, sono Workie AI`,ai_hi_sub:`Chiedimi qualsiasi cosa sul tuo lavoro, task e progetti.`,ai_demo:`Sono ancora in fase demo 🙂 Presto sarò collegato a un vero modello AI per aiutarti davvero con task, progetti e organizzazione.`,ai_err:`Ops, qualcosa è andato storto. Riprova.`});
Object.assign(STR.en,{ai_sub:`Your assistant`,ai_ph:`Type a message…`,ai_hi:`Hi, I'm Workie AI`,ai_hi_sub:`Ask me anything about your work, tasks and projects.`,ai_demo:`I'm still in demo mode 🙂 Soon I'll be connected to a real AI model to actually help with tasks, projects and planning.`,ai_err:`Oops, something went wrong. Try again.`});
Object.assign(STR.fr,{ai_sub:`Ton assistant`,ai_ph:`Écris un message…`,ai_hi:`Salut, je suis Workie AI`,ai_hi_sub:`Demande-moi tout sur ton travail, tes tâches et projets.`,ai_demo:`Je suis encore en démo 🙂 Bientôt connecté à un vrai modèle IA pour t'aider vraiment.`,ai_err:`Oups, une erreur. Réessaie.`});
Object.assign(STR.es,{ai_sub:`Tu asistente`,ai_ph:`Escribe un mensaje…`,ai_hi:`Hola, soy Workie AI`,ai_hi_sub:`Pregúntame lo que sea sobre tu trabajo, tareas y proyectos.`,ai_demo:`Todavía estoy en demo 🙂 Pronto estaré conectado a un modelo de IA real para ayudarte de verdad.`,ai_err:`Uy, algo salió mal. Inténtalo de nuevo.`});
Object.assign(STR.it,{ai_tab_chat:`Chat`,ai_tab_all:`Tutte le chat`,ai_tab_work:`Work`,ai_greet:`Ciao, sono l'AI di Workie. Attualmente ti trovi sulla pagina %s. Hai bisogno di aiuto a gestirla?`,ai_of:`di`,ai_answers:`risposte`,ai_skip:`Salta`,ai_new_chat:`Nuova chat`,ai_empty_conv:`Conversazione vuota`,ai_work_h:`Azioni rapide`,ai_w_newtask:`Crea una nuova task`,ai_w_newproj:`Crea un nuovo progetto`,ai_w_setday:`Imposta la tua giornata`,ai_c_createday:`Aiutami a creare la mia giornata tipo`,ai_c_fixday:`Sistemami la mia giornata`,ai_c_tipsday:`Dammi dei consigli su come gestire la mia giornata`,ai_c_newtask:`Crea una nuova task`,ai_c_planweek:`Aiutami a pianificare la settimana`,ai_c_tipstasks:`Consigli per organizzare le task`,ai_c_newproj:`Crea un nuovo progetto`,ai_c_tipsproj:`Consigli per gestire i progetti`,ai_c_tipsteam:`Consigli per lavorare in team`,ai_c_today:`Cosa ho in programma oggi?`,ai_r_fixday:`Ottimo! Apri "Imposta giornata" e riordina le attività per orario: metti prima quelle importanti al mattino, lascia le pause tra un blocco e l'altro e sposta le attività leggere alla sera. Se vuoi te la creo da zero: chiedimi "Aiutami a creare la mia giornata tipo".`,ai_r_tipsday:`Tre consigli per la tua giornata: 1) inizia con l'attività più importante quando hai più energia; 2) raggruppa le attività simili per non cambiare contesto in continuazione; 3) inserisci pause vere tra un blocco e l'altro. In Daily puoi segnare le attività fatte e tenere sotto controllo i progressi.`,ai_r_planweek:`Per pianificare la settimana: assegna una data e un orario alle task più importanti, raggruppale per cliente/progetto con i Gruppi, e tieni un po' di margine ogni giorno per gli imprevisti. Vuoi che apra il calendario dei task?`,ai_r_tipstasks:`Per organizzare le task: usa i Gruppi per separare clienti o progetti, dai una scadenza alle cose importanti, e spezza gli obiettivi grandi in task piccole con un contatore. Così vedi subito i progressi.`,ai_r_tipsproj:`Per gestire un progetto: parti da una lavagna con le idee, trasformale in task assegnate, e tieni i file nel progetto. Piccoli passi ma costanti battono i grandi sprint saltuari.`,ai_r_tipsteam:`Per lavorare in team: crea uno spazio condiviso, assegna le task alle persone giuste e usa la chat del team per gli aggiornamenti veloci. La trasparenza sugli obiettivi fa il resto.`,ai_r_today:`Su Daily trovi la tua giornata con le attività di oggi e i progressi; in Home vedi "In arrivo" con i prossimi impegni. Vuoi che ti aiuti a sistemare la giornata?`,ai_day_intro:`Certo! Per aiutarmi rispondimi a queste brevi domande:`,ai_day_q_name:`Come vuoi nominare questa giornata?`,ai_day_ph_name:`Scrivi qua il nome…`,ai_day_q_wake:`A che ora ti svegli?`,ai_day_q_work:`Qual è il tuo orario di lavoro?`,ai_day_ph_work:`Es. 9:30 - 18:00`,ai_day_q_lunch:`A che ora fai la pausa pranzo?`,ai_day_q_extra:`Attività extra da inserire? (separale con la virgola)`,ai_day_ph_extra:`Es. Palestra, Videogiochi`,ai_day_done:`Fatto! Ho creato la giornata «%s» con sveglia, orario di lavoro, pranzo e le tue attività. La trovi in Daily: puoi modificarla quando vuoi da "Imposta giornata".`,ai_act_wake:`Sveglia`,ai_act_workstart:`Inizio lavoro`,ai_act_lunch:`Pausa pranzo`,ai_act_workend:`Fine lavoro`,ai_search_ph:`Cerca nelle chat…`,ai_new_chat_sub:`Inizia una nuova conversazione`,ai_no_results:`Nessuna chat trovata`});
Object.assign(STR.it,{ai_limit:`Al momento non riesco a rispondere (forse ho raggiunto il limite gratuito). Riprova tra poco 🙂`});
Object.assign(STR.en,{ai_limit:`I can't reply right now (maybe I hit the free limit). Please try again in a bit 🙂`});
Object.assign(STR.fr,{ai_limit:`Je ne peux pas répondre pour l'instant (limite gratuite atteinte ?). Réessaie bientôt 🙂`});
Object.assign(STR.es,{ai_limit:`Ahora no puedo responder (quizá alcancé el límite gratuito). Inténtalo de nuevo en un rato 🙂`});
Object.assign(STR.en,{ai_search_ph:`Search chats…`,ai_new_chat_sub:`Start a new conversation`,ai_no_results:`No chats found`});
Object.assign(STR.fr,{ai_search_ph:`Rechercher…`,ai_new_chat_sub:`Démarrer une conversation`,ai_no_results:`Aucune chat trouvée`});
Object.assign(STR.es,{ai_search_ph:`Buscar en las chats…`,ai_new_chat_sub:`Inicia una conversación`,ai_no_results:`No se encontraron chats`});
Object.assign(STR.en,{ai_tab_chat:`Chat`,ai_tab_all:`All chats`,ai_tab_work:`Work`,ai_greet:`Hi, I'm Workie's AI. You're currently on the %s page. Need a hand managing it?`,ai_of:`of`,ai_answers:`answers`,ai_skip:`Skip`,ai_new_chat:`New chat`,ai_empty_conv:`Empty conversation`,ai_work_h:`Quick actions`,ai_w_newtask:`Create a new task`,ai_w_newproj:`Create a new project`,ai_w_setday:`Set up your day`,ai_c_createday:`Help me build my typical day`,ai_c_fixday:`Sort out my day`,ai_c_tipsday:`Give me tips on managing my day`,ai_c_newtask:`Create a new task`,ai_c_planweek:`Help me plan my week`,ai_c_tipstasks:`Tips to organize tasks`,ai_c_newproj:`Create a new project`,ai_c_tipsproj:`Tips to manage projects`,ai_c_tipsteam:`Tips for teamwork`,ai_c_today:`What's on today?`,ai_r_fixday:`Great! Open "Set up day" and reorder activities by time: put important ones in the morning, keep breaks between blocks, and move light activities to the evening. Or I can build it from scratch — just ask "Help me build my typical day".`,ai_r_tipsday:`Three tips for your day: 1) start with the most important task when your energy is highest; 2) batch similar activities to avoid context switching; 3) add real breaks between blocks. In Daily you can check off activities and track progress.`,ai_r_planweek:`To plan your week: give dates and times to your top tasks, group them by client/project with Groups, and leave some slack each day for surprises. Want me to open the task calendar?`,ai_r_tipstasks:`To organize tasks: use Groups to separate clients or projects, set deadlines on what matters, and split big goals into small tasks with a counter. That way you see progress instantly.`,ai_r_tipsproj:`To manage a project: start from a whiteboard of ideas, turn them into assigned tasks, and keep files in the project. Small steady steps beat occasional big sprints.`,ai_r_tipsteam:`For teamwork: create a shared space, assign tasks to the right people, and use team chat for quick updates. Transparency on goals does the rest.`,ai_r_today:`Daily shows today's activities and progress; Home shows "Upcoming" with your next items. Want me to help sort your day?`,ai_day_intro:`Sure! To help you, answer these quick questions:`,ai_day_q_name:`What do you want to call this day?`,ai_day_ph_name:`Type the name here…`,ai_day_q_wake:`What time do you wake up?`,ai_day_q_work:`What are your working hours?`,ai_day_ph_work:`E.g. 9:30 - 18:00`,ai_day_q_lunch:`When is your lunch break?`,ai_day_q_extra:`Any extra activities? (comma separated)`,ai_day_ph_extra:`E.g. Gym, Video games`,ai_day_done:`Done! I created the day "%s" with wake-up, working hours, lunch and your activities. You'll find it in Daily — edit it anytime from "Set up day".`,ai_act_wake:`Wake up`,ai_act_workstart:`Work starts`,ai_act_lunch:`Lunch break`,ai_act_workend:`Work ends`});
Object.assign(STR.fr,{ai_tab_chat:`Chat`,ai_tab_all:`Toutes les chats`,ai_tab_work:`Work`,ai_greet:`Salut, je suis l'IA de Workie. Tu es sur la page %s. Besoin d'aide pour la gérer ?`,ai_of:`sur`,ai_answers:`réponses`,ai_skip:`Passer`,ai_new_chat:`Nouvelle chat`,ai_empty_conv:`Conversation vide`,ai_work_h:`Actions rapides`,ai_w_newtask:`Créer une tâche`,ai_w_newproj:`Créer un projet`,ai_w_setday:`Organiser ta journée`,ai_c_createday:`Aide-moi à créer ma journée type`,ai_c_fixday:`Organise ma journée`,ai_c_tipsday:`Des conseils pour gérer ma journée`,ai_c_newtask:`Créer une tâche`,ai_c_planweek:`Aide-moi à planifier la semaine`,ai_c_tipstasks:`Conseils pour organiser les tâches`,ai_c_newproj:`Créer un projet`,ai_c_tipsproj:`Conseils pour gérer les projets`,ai_c_tipsteam:`Conseils pour le travail d'équipe`,ai_c_today:`Quel est mon programme aujourd'hui ?`,ai_r_fixday:`Super ! Ouvre « Organiser la journée » et réordonne les activités par heure : les importantes le matin, des pauses entre les blocs, les activités légères le soir. Ou je peux la créer de zéro — demande « Aide-moi à créer ma journée type ».`,ai_r_tipsday:`Trois conseils : 1) commence par la tâche la plus importante quand tu as le plus d'énergie ; 2) regroupe les activités similaires ; 3) ajoute de vraies pauses. Dans Daily tu peux cocher les activités et suivre tes progrès.`,ai_r_planweek:`Pour planifier ta semaine : donne des dates et heures à tes tâches clés, regroupe-les par client/projet avec les Groupes, et garde une marge chaque jour. Veux-tu que j'ouvre le calendrier ?`,ai_r_tipstasks:`Pour organiser les tâches : utilise les Groupes pour séparer clients/projets, mets des échéances, et découpe les grands objectifs en petites tâches avec compteur.`,ai_r_tipsproj:`Pour gérer un projet : pars d'un tableau d'idées, transforme-les en tâches assignées, et garde les fichiers dans le projet. Des petits pas réguliers valent mieux.`,ai_r_tipsteam:`Pour le travail d'équipe : crée un espace partagé, assigne les tâches aux bonnes personnes, et utilise le chat d'équipe pour les mises à jour.`,ai_r_today:`Daily montre les activités du jour et les progrès ; l'Accueil montre « À venir ». Veux-tu que je t'aide à organiser ta journée ?`,ai_day_intro:`Bien sûr ! Réponds à ces quelques questions :`,ai_day_q_name:`Comment veux-tu nommer cette journée ?`,ai_day_ph_name:`Écris le nom ici…`,ai_day_q_wake:`À quelle heure te réveilles-tu ?`,ai_day_q_work:`Quels sont tes horaires de travail ?`,ai_day_ph_work:`Ex. 9:30 - 18:00`,ai_day_q_lunch:`Quand est ta pause déjeuner ?`,ai_day_q_extra:`Activités en plus ? (séparées par des virgules)`,ai_day_ph_extra:`Ex. Sport, Jeux vidéo`,ai_day_done:`Fait ! J'ai créé la journée « %s » avec réveil, horaires, déjeuner et tes activités. Tu la trouves dans Daily — modifiable via « Organiser la journée ».`,ai_act_wake:`Réveil`,ai_act_workstart:`Début du travail`,ai_act_lunch:`Pause déjeuner`,ai_act_workend:`Fin du travail`});
Object.assign(STR.es,{ai_tab_chat:`Chat`,ai_tab_all:`Todas las chats`,ai_tab_work:`Work`,ai_greet:`Hola, soy la IA de Workie. Ahora estás en la página %s. ¿Necesitas ayuda para gestionarla?`,ai_of:`de`,ai_answers:`respuestas`,ai_skip:`Saltar`,ai_new_chat:`Nueva chat`,ai_empty_conv:`Conversación vacía`,ai_work_h:`Acciones rápidas`,ai_w_newtask:`Crear una tarea`,ai_w_newproj:`Crear un proyecto`,ai_w_setday:`Organiza tu día`,ai_c_createday:`Ayúdame a crear mi día tipo`,ai_c_fixday:`Organiza mi día`,ai_c_tipsday:`Dame consejos para gestionar mi día`,ai_c_newtask:`Crear una tarea`,ai_c_planweek:`Ayúdame a planificar la semana`,ai_c_tipstasks:`Consejos para organizar tareas`,ai_c_newproj:`Crear un proyecto`,ai_c_tipsproj:`Consejos para gestionar proyectos`,ai_c_tipsteam:`Consejos para trabajar en equipo`,ai_c_today:`¿Qué tengo hoy?`,ai_r_fixday:`¡Genial! Abre "Organizar día" y reordena por hora: lo importante por la mañana, pausas entre bloques, lo ligero por la tarde. O te la creo de cero — pídeme "Ayúdame a crear mi día tipo".`,ai_r_tipsday:`Tres consejos: 1) empieza por lo más importante cuando tengas más energía; 2) agrupa actividades similares; 3) añade pausas reales. En Daily puedes marcar actividades y ver tu progreso.`,ai_r_planweek:`Para planificar la semana: pon fecha y hora a tus tareas clave, agrúpalas por cliente/proyecto con los Grupos, y deja margen cada día. ¿Abro el calendario?`,ai_r_tipstasks:`Para organizar tareas: usa Grupos para separar clientes/proyectos, pon fechas límite, y divide objetivos grandes en tareas pequeñas con contador.`,ai_r_tipsproj:`Para gestionar un proyecto: parte de una pizarra de ideas, conviértelas en tareas asignadas y guarda los archivos en el proyecto. Pasos pequeños y constantes.`,ai_r_tipsteam:`Para trabajar en equipo: crea un espacio compartido, asigna tareas a las personas adecuadas y usa el chat del equipo para novedades.`,ai_r_today:`Daily muestra las actividades de hoy y el progreso; Inicio muestra "Próximo". ¿Te ayudo a organizar el día?`,ai_day_intro:`¡Claro! Para ayudarte responde a estas preguntas:`,ai_day_q_name:`¿Cómo quieres llamar a este día?`,ai_day_ph_name:`Escribe el nombre aquí…`,ai_day_q_wake:`¿A qué hora te despiertas?`,ai_day_q_work:`¿Cuál es tu horario de trabajo?`,ai_day_ph_work:`Ej. 9:30 - 18:00`,ai_day_q_lunch:`¿Cuándo es tu pausa de comida?`,ai_day_q_extra:`¿Actividades extra? (separadas por comas)`,ai_day_ph_extra:`Ej. Gimnasio, Videojuegos`,ai_day_done:`¡Listo! Creé el día "%s" con despertar, horario, comida y tus actividades. Lo tienes en Daily — edítalo desde "Organizar día".`,ai_act_wake:`Despertar`,ai_act_workstart:`Inicio trabajo`,ai_act_lunch:`Pausa comida`,ai_act_workend:`Fin trabajo`});
Object.assign(STR.it,{theme_classico:`Classico`,theme_classico_d:`Scuro · lilla`,theme_futuristico:`Futuristico`,theme_futuristico_d:`Viola vetro`,theme_chiaro:`Chiaro`,theme_chiaro_d:`Classico, bianco`,theme_custom:`Personalizzato`,theme_custom_d:`Scegli tu`,cu_bg:`Sfondo`,cu_accent:`Accento`,cu_panels:`Pannelli`,cu_text:`Testo`,cu_image:`Immagine…`,cu_remove:`Rimuovi`,cu_hint:`Scegli sfondo, colore accento/tasti, pannelli e testo. Le modifiche si applicano subito.`,cu_save:`Salva tema`,cu_name_ph:`Nome del tema…`,cu_saved:`Tema salvato`,cu_saved_theme:`Tuo tema`,conn_soon_sub:`Le connessioni con le tue app stanno arrivando.`});
Object.assign(STR.it,{su_title:`Un nuovo modo di lavorare`,su_google:`Continua con Google`,su_or:`OPPURE`,su_email_ph:`Inserisci la tua email o numero di telefono`,su_email_btn:`Continua con l'email`,su_pw_ph:`Crea una password`,su_legal:`Continuando accetti i Termini di servizio e la Privacy Policy di Workie.`,suf_dailywork:`Organizza la tua giornata: rituali, attività e progressi in un unico posto.`,suf_tasks:`Task e gruppi per ogni cliente o progetto, sempre sotto controllo.`,suf_team:`Lavora insieme al tuo team con spazi, chat ed eventi condivisi.`,suf_agents:`Presto: agenti AI che ti aiutano in ogni attività e workflow.`,suf_themes:`Rendi Workie tuo con temi e colori personalizzati.`,splash_lang:`Scegli la lingua`,on_ph2:`Nome`,ob_enter_hint:`Premi Invio per continuare`,od_describe:`Cosa ti descrive meglio?`});
Object.assign(STR.en,{su_title:`A new way to work`,su_google:`Continue with Google`,su_or:`OR`,su_email_ph:`Enter your email or phone number`,su_email_btn:`Continue with email`,su_pw_ph:`Create a password`,su_legal:`By continuing you agree to Workie's Terms of Service and Privacy Policy.`,suf_dailywork:`Organize your day: rituals, activities and progress in one place.`,suf_tasks:`Tasks and groups for every client or project, always under control.`,suf_team:`Work together with shared spaces, chat and events.`,suf_agents:`Coming soon: AI agents that help you across every task and workflow.`,suf_themes:`Make Workie yours with custom themes and colors.`,splash_lang:`Select language`,on_ph2:`Name`,ob_enter_hint:`Press Enter to continue`,od_describe:`What describes you best?`});
Object.assign(STR.fr,{su_title:`Une nouvelle façon de travailler`,su_google:`Continuer avec Google`,su_or:`OU`,su_email_ph:`Saisis ton email ou numéro de téléphone`,su_email_btn:`Continuer avec l'email`,su_pw_ph:`Crée un mot de passe`,su_legal:`En continuant, tu acceptes les Conditions et la Politique de confidentialité de Workie.`,suf_dailywork:`Organise ta journée : rituels, activités et progrès au même endroit.`,suf_tasks:`Tâches et groupes pour chaque client ou projet, toujours sous contrôle.`,suf_team:`Travaillez ensemble avec espaces, chat et événements partagés.`,suf_agents:`Bientôt : des agents IA qui t'aident dans chaque tâche.`,suf_themes:`Personnalise Workie avec des thèmes et couleurs.`,splash_lang:`Choisir la langue`,on_ph2:`Nom`,ob_enter_hint:`Appuie sur Entrée pour continuer`,od_describe:`Qu'est-ce qui te décrit le mieux ?`});
Object.assign(STR.es,{su_title:`Una nueva forma de trabajar`,su_google:`Continuar con Google`,su_or:`O`,su_email_ph:`Introduce tu email o número de teléfono`,su_email_btn:`Continuar con el email`,su_pw_ph:`Crea una contraseña`,su_legal:`Al continuar aceptas los Términos y la Política de privacidad de Workie.`,suf_dailywork:`Organiza tu día: rituales, actividades y progreso en un solo lugar.`,suf_tasks:`Tareas y grupos para cada cliente o proyecto, siempre bajo control.`,suf_team:`Trabaja en equipo con espacios, chat y eventos compartidos.`,suf_agents:`Pronto: agentes IA que te ayudan en cada tarea y flujo.`,suf_themes:`Haz tuyo Workie con temas y colores personalizados.`,splash_lang:`Elige el idioma`,on_ph2:`Nombre`,ob_enter_hint:`Pulsa Intro para continuar`,od_describe:`¿Qué te describe mejor?`});
Object.assign(STR.en,{theme_classico:`Classic`,theme_classico_d:`Dark · lilac`,theme_futuristico:`Futuristic`,theme_futuristico_d:`Purple glass`,theme_chiaro:`Light`,theme_chiaro_d:`Classic, white`,theme_custom:`Custom`,theme_custom_d:`Your choice`,cu_bg:`Background`,cu_accent:`Accent`,cu_panels:`Panels`,cu_text:`Text`,cu_image:`Image…`,cu_remove:`Remove`,cu_hint:`Pick background, accent/button color, panels and text. Changes apply instantly.`,cu_save:`Save theme`,cu_name_ph:`Theme name…`,cu_saved:`Theme saved`,cu_saved_theme:`Your theme`,conn_soon_sub:`Connections to your apps are on their way.`});
Object.assign(STR.fr,{theme_classico:`Classique`,theme_classico_d:`Sombre · lilas`,theme_futuristico:`Futuriste`,theme_futuristico_d:`Verre violet`,theme_chiaro:`Clair`,theme_chiaro_d:`Classique, blanc`,theme_custom:`Personnalisé`,theme_custom_d:`À toi`,cu_bg:`Fond`,cu_accent:`Accent`,cu_panels:`Panneaux`,cu_text:`Texte`,cu_image:`Image…`,cu_remove:`Retirer`,cu_hint:`Choisis fond, couleur d'accent/boutons, panneaux et texte. Effet immédiat.`,cu_save:`Enregistrer`,cu_name_ph:`Nom du thème…`,cu_saved:`Thème enregistré`,cu_saved_theme:`Ton thème`,conn_soon_sub:`Les connexions à tes apps arrivent bientôt.`});
Object.assign(STR.es,{theme_classico:`Clásico`,theme_classico_d:`Oscuro · lila`,theme_futuristico:`Futurista`,theme_futuristico_d:`Cristal violeta`,theme_chiaro:`Claro`,theme_chiaro_d:`Clásico, blanco`,theme_custom:`Personalizado`,theme_custom_d:`Tú eliges`,cu_bg:`Fondo`,cu_accent:`Acento`,cu_panels:`Paneles`,cu_text:`Texto`,cu_image:`Imagen…`,cu_remove:`Quitar`,cu_hint:`Elige fondo, color de acento/botones, paneles y texto. Cambios al instante.`,cu_save:`Guardar tema`,cu_name_ph:`Nombre del tema…`,cu_saved:`Tema guardado`,cu_saved_theme:`Tu tema`,conn_soon_sub:`Las conexiones con tus apps están en camino.`});
// ---- Lingue aggiuntive (Fase 1: interfaccia principale; le stringhe non ancora tradotte ripiegano sull'inglese) ----
['de','pt','nl','pl','ru','uk','ro','zh','ja','ko'].forEach(l=>{if(!STR[l])STR[l]={};});
Object.assign(STR.de,{nav_home:`Home`,nav_desktop:`Daily`,nav_tasks:`Aufgaben`,nav_team:`Team`,nav_projects:`Projekte`,nav_connections:`Kontakte`,nav_settings:`Einstellungen`,nav_social:`Social`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`bald`,g_morning:`Guten Morgen`,g_afternoon:`Guten Tag`,g_evening:`Guten Abend`,home_watch:`Einen Blick wert`,dw_upcoming:`Anstehend`,new_task:`+ Neue Aufgabe`,new_project:`+ Neues Projekt`,team_create:`+ Team erstellen`,team_join:`Beitreten`,back:`Zurück`,al_all_clear:`Alles erledigt, nichts fällig.`,g_overdue:`Überfällig`,g_today:`Heute`,connect:`Verbinden`,nt_group:`Gruppe`,grp_all:`Alle`,grp_none:`Keine`,grp_new:`Neue Gruppe`,grp_manage:`Gruppen verwalten`,grp_link:`Mit einem Projekt verknüpfen`,grp_link_none:`Kein Projekt`,proj_link_group:`Verknüpfte Gruppe`,proj_link_none:`Keine Gruppe`,gm_title:`Gruppen verwalten`,gm_add:`Hinzufügen`,gm_active:`Aktiv`,set_language:`Sprache`,set_appearance:`Erscheinungsbild`,stm_prefs:`Präferenzen`,stm_home:`Home`,stm_notif:`Benachrichtigungen`,stm_notif_push:`Push-Benachrichtigungen`,stm_notif_push_d:`Hinweise zu Nachrichten, Einladungen und Aufgaben-Erinnerungen.`,stm_generale:`Allgemein`,stm_privacy:`Datenschutz`,stm_billing:`Abrechnung`,stm_features:`Funktionen`,stm_profile:`Profil`,set_account:`Konto`,stm_home_daily:`Daily auf der Startseite zeigen`,stm_home_tasks:`Aufgaben auf der Startseite zeigen`,stm_g_settings:`Einstellungen`,stm_g_desktop:`Desktop-App`,stm_g_custom:`Anpassen`,mcs_title:`Erstellen`,mcs_task:`Neue Aufgabe`,mcs_project:`Neues Projekt`,dw_setup:`Tag einrichten`,dw_setup_title:`Richte deinen Tag ein`,soc_tab_recent:`Letzte Chats`,soc_tab_conn:`Kontakte`,soc_tab_team:`Team`,soc_add:`+ Hinzufügen`,soc_sub:`Dein Netzwerk: Chats, Kontakte und Teams`,pd_board:`Board`,pd_files:`Dateien`,members_word:`Mitglieder`,pd_task_ph:`Aufgabe zum Projekt hinzufügen…`,add:`Hinzufügen`,requests:`Anfragen`,no_requests:`Keine Anfragen`,accept:`Annehmen`,decline:`Ablehnen`,invited_you:`hat dich eingeladen zu`,grp_save:`Speichern`,grp_create:`Gruppe erstellen`,grp_delete:`Gruppe löschen`,grp_name:`Gruppenname`,stm_save:`Speichern`,coming_soon:`Demnächst`,splash_lang:`Sprache wählen`});
Object.assign(STR.pt,{nav_home:`Início`,nav_desktop:`Daily`,nav_tasks:`Tarefas`,nav_team:`Equipe`,nav_projects:`Projetos`,nav_connections:`Conexões`,nav_settings:`Configurações`,nav_social:`Social`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`em breve`,g_morning:`Bom dia`,g_afternoon:`Boa tarde`,g_evening:`Boa noite`,home_watch:`Vale a pena ver`,dw_upcoming:`Próximos`,new_task:`+ Nova tarefa`,new_project:`+ Novo projeto`,team_create:`+ Criar equipe`,team_join:`Entrar`,back:`Voltar`,al_all_clear:`Tudo em dia, nada pendente.`,g_overdue:`Atrasadas`,g_today:`Hoje`,connect:`Conectar`,nt_group:`Grupo`,grp_all:`Todos`,grp_none:`Nenhum`,grp_new:`Novo grupo`,grp_manage:`Gerenciar grupos`,grp_link:`Vincular a um projeto`,grp_link_none:`Nenhum projeto`,proj_link_group:`Grupo vinculado`,proj_link_none:`Nenhum grupo`,gm_title:`Gerenciar grupos`,gm_add:`Adicionar`,gm_active:`Ativo`,set_language:`Idioma`,set_appearance:`Aparência`,stm_prefs:`Preferências`,stm_home:`Início`,stm_notif:`Notificações`,stm_notif_push:`Notificações push`,stm_notif_push_d:`Avisos de mensagens, convites e lembretes de tarefas.`,stm_generale:`Geral`,stm_privacy:`Privacidade`,stm_billing:`Faturamento`,stm_features:`Recursos`,stm_profile:`Perfil`,set_account:`Conta`,stm_home_daily:`Mostrar Daily no Início`,stm_home_tasks:`Mostrar Tarefas no Início`,stm_g_settings:`Configurações`,stm_g_desktop:`App para desktop`,stm_g_custom:`Personalizar`,mcs_title:`Criar`,mcs_task:`Nova tarefa`,mcs_project:`Novo projeto`,dw_setup:`Configurar dia`,dw_setup_title:`Configure o seu dia`,soc_tab_recent:`Conversas recentes`,soc_tab_conn:`Conexões`,soc_tab_team:`Equipe`,soc_add:`+ Adicionar`,soc_sub:`Sua rede: conversas, conexões e equipes`,pd_board:`Quadro`,pd_files:`Arquivos`,members_word:`Membros`,pd_task_ph:`Adicione uma tarefa ao projeto…`,add:`Adicionar`,requests:`Solicitações`,no_requests:`Nenhuma solicitação`,accept:`Aceitar`,decline:`Recusar`,invited_you:`convidou você para`,grp_save:`Salvar`,grp_create:`Criar grupo`,grp_delete:`Excluir grupo`,grp_name:`Nome do grupo`,stm_save:`Salvar`,coming_soon:`Em breve`,splash_lang:`Selecionar idioma`});
Object.assign(STR.nl,{nav_home:`Home`,nav_desktop:`Daily`,nav_tasks:`Taken`,nav_team:`Team`,nav_projects:`Projecten`,nav_connections:`Connecties`,nav_settings:`Instellingen`,nav_social:`Sociaal`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`binnenkort`,g_morning:`Goedemorgen`,g_afternoon:`Goedemiddag`,g_evening:`Goedenavond`,home_watch:`De moeite waard`,dw_upcoming:`Binnenkort`,new_task:`+ Nieuwe taak`,new_project:`+ Nieuw project`,team_create:`+ Team maken`,team_join:`Deelnemen`,back:`Terug`,al_all_clear:`Alles in orde, niets openstaand.`,g_overdue:`Te laat`,g_today:`Vandaag`,connect:`Verbinden`,nt_group:`Groep`,grp_all:`Alle`,grp_none:`Geen`,grp_new:`Nieuwe groep`,grp_manage:`Groepen beheren`,grp_link:`Aan een project koppelen`,grp_link_none:`Geen project`,proj_link_group:`Gekoppelde groep`,proj_link_none:`Geen groep`,gm_title:`Groepen beheren`,gm_add:`Toevoegen`,gm_active:`Actief`,set_language:`Taal`,set_appearance:`Weergave`,stm_prefs:`Voorkeuren`,stm_home:`Home`,stm_notif:`Meldingen`,stm_notif_push:`Pushmeldingen`,stm_notif_push_d:`Meldingen voor berichten, uitnodigingen en taakherinneringen.`,stm_generale:`Algemeen`,stm_privacy:`Privacy`,stm_billing:`Facturering`,stm_features:`Functies`,stm_profile:`Profiel`,set_account:`Account`,stm_home_daily:`Daily op Home tonen`,stm_home_tasks:`Taken op Home tonen`,stm_g_settings:`Instellingen`,stm_g_desktop:`Desktop-app`,stm_g_custom:`Aanpassen`,mcs_title:`Maken`,mcs_task:`Nieuwe taak`,mcs_project:`Nieuw project`,dw_setup:`Dag instellen`,dw_setup_title:`Stel je dag in`,soc_tab_recent:`Recente chats`,soc_tab_conn:`Connecties`,soc_tab_team:`Team`,soc_add:`+ Toevoegen`,soc_sub:`Je netwerk: chats, connecties en teams`,pd_board:`Bord`,pd_files:`Bestanden`,members_word:`Leden`,pd_task_ph:`Voeg een taak toe aan het project…`,add:`Toevoegen`,requests:`Verzoeken`,no_requests:`Geen verzoeken`,accept:`Accepteren`,decline:`Weigeren`,invited_you:`heeft je uitgenodigd voor`,grp_save:`Opslaan`,grp_create:`Groep maken`,grp_delete:`Groep verwijderen`,grp_name:`Groepsnaam`,stm_save:`Opslaan`,coming_soon:`Binnenkort`,splash_lang:`Taal kiezen`});
Object.assign(STR.pl,{nav_home:`Start`,nav_desktop:`Daily`,nav_tasks:`Zadania`,nav_team:`Zespół`,nav_projects:`Projekty`,nav_connections:`Kontakty`,nav_settings:`Ustawienia`,nav_social:`Społeczność`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`wkrótce`,g_morning:`Dzień dobry`,g_afternoon:`Dzień dobry`,g_evening:`Dobry wieczór`,home_watch:`Warte uwagi`,dw_upcoming:`Nadchodzące`,new_task:`+ Nowe zadanie`,new_project:`+ Nowy projekt`,team_create:`+ Utwórz zespół`,team_join:`Dołącz`,back:`Wstecz`,al_all_clear:`Wszystko ogarnięte, nic w terminie.`,g_overdue:`Zaległe`,g_today:`Dziś`,connect:`Połącz`,nt_group:`Grupa`,grp_all:`Wszystkie`,grp_none:`Brak`,grp_new:`Nowa grupa`,grp_manage:`Zarządzaj grupami`,grp_link:`Połącz z projektem`,grp_link_none:`Brak projektu`,proj_link_group:`Połączona grupa`,proj_link_none:`Brak grupy`,gm_title:`Zarządzaj grupami`,gm_add:`Dodaj`,gm_active:`Aktywna`,set_language:`Język`,set_appearance:`Wygląd`,stm_prefs:`Preferencje`,stm_home:`Start`,stm_notif:`Powiadomienia`,stm_notif_push:`Powiadomienia push`,stm_notif_push_d:`Alerty o wiadomościach, zaproszeniach i przypomnieniach o zadaniach.`,stm_generale:`Ogólne`,stm_privacy:`Prywatność`,stm_billing:`Płatności`,stm_features:`Funkcje`,stm_profile:`Profil`,set_account:`Konto`,stm_home_daily:`Pokaż Daily na stronie głównej`,stm_home_tasks:`Pokaż Zadania na stronie głównej`,stm_g_settings:`Ustawienia`,stm_g_desktop:`Aplikacja desktopowa`,stm_g_custom:`Dostosuj`,mcs_title:`Utwórz`,mcs_task:`Nowe zadanie`,mcs_project:`Nowy projekt`,dw_setup:`Zaplanuj dzień`,dw_setup_title:`Zaplanuj swój dzień`,soc_tab_recent:`Ostatnie czaty`,soc_tab_conn:`Kontakty`,soc_tab_team:`Zespół`,soc_add:`+ Dodaj`,soc_sub:`Twoja sieć: czaty, kontakty i zespoły`,pd_board:`Tablica`,pd_files:`Pliki`,members_word:`Członkowie`,pd_task_ph:`Dodaj zadanie do projektu…`,add:`Dodaj`,requests:`Prośby`,no_requests:`Brak próśb`,accept:`Akceptuj`,decline:`Odrzuć`,invited_you:`zaprosił(a) Cię do`,grp_save:`Zapisz`,grp_create:`Utwórz grupę`,grp_delete:`Usuń grupę`,grp_name:`Nazwa grupy`,stm_save:`Zapisz`,coming_soon:`Wkrótce`,splash_lang:`Wybierz język`});
Object.assign(STR.ru,{nav_home:`Главная`,nav_desktop:`Daily`,nav_tasks:`Задачи`,nav_team:`Команда`,nav_projects:`Проекты`,nav_connections:`Контакты`,nav_settings:`Настройки`,nav_social:`Сообщество`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`скоро`,g_morning:`Доброе утро`,g_afternoon:`Добрый день`,g_evening:`Добрый вечер`,home_watch:`Стоит взглянуть`,dw_upcoming:`Предстоящее`,new_task:`+ Новая задача`,new_project:`+ Новый проект`,team_create:`+ Создать команду`,team_join:`Присоединиться`,back:`Назад`,al_all_clear:`Всё под контролем, ничего не горит.`,g_overdue:`Просрочено`,g_today:`Сегодня`,connect:`Связаться`,nt_group:`Группа`,grp_all:`Все`,grp_none:`Нет`,grp_new:`Новая группа`,grp_manage:`Управление группами`,grp_link:`Связать с проектом`,grp_link_none:`Нет проекта`,proj_link_group:`Связанная группа`,proj_link_none:`Нет группы`,gm_title:`Управление группами`,gm_add:`Добавить`,gm_active:`Активна`,set_language:`Язык`,set_appearance:`Оформление`,stm_prefs:`Предпочтения`,stm_home:`Главная`,stm_notif:`Уведомления`,stm_notif_push:`Push-уведомления`,stm_notif_push_d:`Оповещения о сообщениях, приглашениях и напоминаниях о задачах.`,stm_generale:`Общие`,stm_privacy:`Конфиденциальность`,stm_billing:`Оплата`,stm_features:`Возможности`,stm_profile:`Профиль`,set_account:`Аккаунт`,stm_home_daily:`Показывать Daily на главной`,stm_home_tasks:`Показывать задачи на главной`,stm_g_settings:`Настройки`,stm_g_desktop:`Десктоп-приложение`,stm_g_custom:`Настроить`,mcs_title:`Создать`,mcs_task:`Новая задача`,mcs_project:`Новый проект`,dw_setup:`Настроить день`,dw_setup_title:`Настройте свой день`,soc_tab_recent:`Недавние чаты`,soc_tab_conn:`Контакты`,soc_tab_team:`Команда`,soc_add:`+ Добавить`,soc_sub:`Ваша сеть: чаты, контакты и команды`,pd_board:`Доска`,pd_files:`Файлы`,members_word:`Участники`,pd_task_ph:`Добавьте задачу в проект…`,add:`Добавить`,requests:`Запросы`,no_requests:`Нет запросов`,accept:`Принять`,decline:`Отклонить`,invited_you:`пригласил(а) вас в`,grp_save:`Сохранить`,grp_create:`Создать группу`,grp_delete:`Удалить группу`,grp_name:`Название группы`,stm_save:`Сохранить`,coming_soon:`Скоро`,splash_lang:`Выберите язык`});
Object.assign(STR.uk,{nav_home:`Головна`,nav_desktop:`Daily`,nav_tasks:`Завдання`,nav_team:`Команда`,nav_projects:`Проєкти`,nav_connections:`Контакти`,nav_settings:`Налаштування`,nav_social:`Спільнота`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`незабаром`,g_morning:`Доброго ранку`,g_afternoon:`Доброго дня`,g_evening:`Доброго вечора`,home_watch:`Варто переглянути`,dw_upcoming:`Найближче`,new_task:`+ Нове завдання`,new_project:`+ Новий проєкт`,team_create:`+ Створити команду`,team_join:`Приєднатися`,back:`Назад`,al_all_clear:`Усе під контролем, нічого не горить.`,g_overdue:`Прострочено`,g_today:`Сьогодні`,connect:`Зв’язатися`,nt_group:`Група`,grp_all:`Усі`,grp_none:`Немає`,grp_new:`Нова група`,grp_manage:`Керування групами`,grp_link:`Пов’язати з проєктом`,grp_link_none:`Немає проєкту`,proj_link_group:`Пов’язана група`,proj_link_none:`Немає групи`,gm_title:`Керування групами`,gm_add:`Додати`,gm_active:`Активна`,set_language:`Мова`,set_appearance:`Оформлення`,stm_prefs:`Уподобання`,stm_home:`Головна`,stm_notif:`Сповіщення`,stm_notif_push:`Push-сповіщення`,stm_notif_push_d:`Сповіщення про повідомлення, запрошення та нагадування про завдання.`,stm_generale:`Загальні`,stm_privacy:`Конфіденційність`,stm_billing:`Оплата`,stm_features:`Можливості`,stm_profile:`Профіль`,set_account:`Обліковий запис`,stm_home_daily:`Показувати Daily на головній`,stm_home_tasks:`Показувати завдання на головній`,stm_g_settings:`Налаштування`,stm_g_desktop:`Десктоп-застосунок`,stm_g_custom:`Налаштувати`,mcs_title:`Створити`,mcs_task:`Нове завдання`,mcs_project:`Новий проєкт`,dw_setup:`Налаштувати день`,dw_setup_title:`Налаштуйте свій день`,soc_tab_recent:`Нещодавні чати`,soc_tab_conn:`Контакти`,soc_tab_team:`Команда`,soc_add:`+ Додати`,soc_sub:`Ваша мережа: чати, контакти й команди`,pd_board:`Дошка`,pd_files:`Файли`,members_word:`Учасники`,pd_task_ph:`Додайте завдання до проєкту…`,add:`Додати`,requests:`Запити`,no_requests:`Немає запитів`,accept:`Прийняти`,decline:`Відхилити`,invited_you:`запросив(ла) вас до`,grp_save:`Зберегти`,grp_create:`Створити групу`,grp_delete:`Видалити групу`,grp_name:`Назва групи`,stm_save:`Зберегти`,coming_soon:`Незабаром`,splash_lang:`Виберіть мову`});
Object.assign(STR.ro,{nav_home:`Acasă`,nav_desktop:`Daily`,nav_tasks:`Sarcini`,nav_team:`Echipă`,nav_projects:`Proiecte`,nav_connections:`Conexiuni`,nav_settings:`Setări`,nav_social:`Social`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`în curând`,g_morning:`Bună dimineața`,g_afternoon:`Bună ziua`,g_evening:`Bună seara`,home_watch:`Merită o privire`,dw_upcoming:`Urmează`,new_task:`+ Sarcină nouă`,new_project:`+ Proiect nou`,team_create:`+ Creează echipă`,team_join:`Alătură-te`,back:`Înapoi`,al_all_clear:`Totul e în regulă, nimic scadent.`,g_overdue:`Întârziate`,g_today:`Astăzi`,connect:`Conectează`,nt_group:`Grup`,grp_all:`Toate`,grp_none:`Niciunul`,grp_new:`Grup nou`,grp_manage:`Gestionează grupurile`,grp_link:`Leagă de un proiect`,grp_link_none:`Niciun proiect`,proj_link_group:`Grup asociat`,proj_link_none:`Niciun grup`,gm_title:`Gestionează grupurile`,gm_add:`Adaugă`,gm_active:`Activ`,set_language:`Limbă`,set_appearance:`Aspect`,stm_prefs:`Preferințe`,stm_home:`Acasă`,stm_notif:`Notificări`,stm_notif_push:`Notificări push`,stm_notif_push_d:`Alerte pentru mesaje, invitații și memento-uri pentru sarcini.`,stm_generale:`General`,stm_privacy:`Confidențialitate`,stm_billing:`Facturare`,stm_features:`Funcții`,stm_profile:`Profil`,set_account:`Cont`,stm_home_daily:`Arată Daily pe pagina principală`,stm_home_tasks:`Arată Sarcinile pe pagina principală`,stm_g_settings:`Setări`,stm_g_desktop:`Aplicație desktop`,stm_g_custom:`Personalizează`,mcs_title:`Creează`,mcs_task:`Sarcină nouă`,mcs_project:`Proiect nou`,dw_setup:`Configurează ziua`,dw_setup_title:`Configurează-ți ziua`,soc_tab_recent:`Conversații recente`,soc_tab_conn:`Conexiuni`,soc_tab_team:`Echipă`,soc_add:`+ Adaugă`,soc_sub:`Rețeaua ta: conversații, conexiuni și echipe`,pd_board:`Tablă`,pd_files:`Fișiere`,members_word:`Membri`,pd_task_ph:`Adaugă o sarcină la proiect…`,add:`Adaugă`,requests:`Cereri`,no_requests:`Nicio cerere`,accept:`Acceptă`,decline:`Refuză`,invited_you:`te-a invitat la`,grp_save:`Salvează`,grp_create:`Creează grup`,grp_delete:`Șterge grupul`,grp_name:`Numele grupului`,stm_save:`Salvează`,coming_soon:`În curând`,splash_lang:`Alege limba`});
Object.assign(STR.zh,{nav_home:`主页`,nav_desktop:`Daily`,nav_tasks:`任务`,nav_team:`团队`,nav_projects:`项目`,nav_connections:`联系人`,nav_settings:`设置`,nav_social:`社交`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`即将推出`,g_morning:`早上好`,g_afternoon:`下午好`,g_evening:`晚上好`,home_watch:`值得关注`,dw_upcoming:`即将到来`,new_task:`+ 新建任务`,new_project:`+ 新建项目`,team_create:`+ 创建团队`,team_join:`加入`,back:`返回`,al_all_clear:`一切就绪，暂无待办。`,g_overdue:`已逾期`,g_today:`今天`,connect:`连接`,nt_group:`分组`,grp_all:`全部`,grp_none:`无`,grp_new:`新建分组`,grp_manage:`管理分组`,grp_link:`关联到项目`,grp_link_none:`无项目`,proj_link_group:`关联的分组`,proj_link_none:`无分组`,gm_title:`管理分组`,gm_add:`添加`,gm_active:`启用`,set_language:`语言`,set_appearance:`外观`,stm_prefs:`偏好设置`,stm_home:`主页`,stm_notif:`通知`,stm_notif_push:`推送通知`,stm_notif_push_d:`关于消息、邀请和任务提醒的通知。`,stm_generale:`常规`,stm_privacy:`隐私`,stm_billing:`账单`,stm_features:`功能`,stm_profile:`个人资料`,set_account:`账户`,stm_home_daily:`在主页显示 Daily`,stm_home_tasks:`在主页显示任务`,stm_g_settings:`设置`,stm_g_desktop:`桌面应用`,stm_g_custom:`自定义`,mcs_title:`创建`,mcs_task:`新建任务`,mcs_project:`新建项目`,dw_setup:`安排一天`,dw_setup_title:`安排你的一天`,soc_tab_recent:`最近聊天`,soc_tab_conn:`联系人`,soc_tab_team:`团队`,soc_add:`+ 添加`,soc_sub:`你的人脉：聊天、联系人和团队`,pd_board:`白板`,pd_files:`文件`,members_word:`成员`,pd_task_ph:`为项目添加任务…`,add:`添加`,requests:`请求`,no_requests:`暂无请求`,accept:`接受`,decline:`拒绝`,invited_you:`邀请你加入`,grp_save:`保存`,grp_create:`创建分组`,grp_delete:`删除分组`,grp_name:`分组名称`,stm_save:`保存`,coming_soon:`即将推出`,splash_lang:`选择语言`});
Object.assign(STR.ja,{nav_home:`ホーム`,nav_desktop:`Daily`,nav_tasks:`タスク`,nav_team:`チーム`,nav_projects:`プロジェクト`,nav_connections:`つながり`,nav_settings:`設定`,nav_social:`ソーシャル`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`近日公開`,g_morning:`おはようございます`,g_afternoon:`こんにちは`,g_evening:`こんばんは`,home_watch:`注目`,dw_upcoming:`今後の予定`,new_task:`+ 新しいタスク`,new_project:`+ 新しいプロジェクト`,team_create:`+ チームを作成`,team_join:`参加`,back:`戻る`,al_all_clear:`すべて完了、期限のものはありません。`,g_overdue:`期限切れ`,g_today:`今日`,connect:`つながる`,nt_group:`グループ`,grp_all:`すべて`,grp_none:`なし`,grp_new:`新しいグループ`,grp_manage:`グループを管理`,grp_link:`プロジェクトにリンク`,grp_link_none:`プロジェクトなし`,proj_link_group:`リンク中のグループ`,proj_link_none:`グループなし`,gm_title:`グループを管理`,gm_add:`追加`,gm_active:`有効`,set_language:`言語`,set_appearance:`外観`,stm_prefs:`環境設定`,stm_home:`ホーム`,stm_notif:`通知`,stm_notif_push:`プッシュ通知`,stm_notif_push_d:`メッセージ・招待・タスクのリマインダーを通知します。`,stm_generale:`一般`,stm_privacy:`プライバシー`,stm_billing:`お支払い`,stm_features:`機能`,stm_profile:`プロフィール`,set_account:`アカウント`,stm_home_daily:`ホームに Daily を表示`,stm_home_tasks:`ホームにタスクを表示`,stm_g_settings:`設定`,stm_g_desktop:`デスクトップアプリ`,stm_g_custom:`カスタマイズ`,mcs_title:`作成`,mcs_task:`新しいタスク`,mcs_project:`新しいプロジェクト`,dw_setup:`一日を設定`,dw_setup_title:`一日を設定しましょう`,soc_tab_recent:`最近のチャット`,soc_tab_conn:`つながり`,soc_tab_team:`チーム`,soc_add:`+ 追加`,soc_sub:`あなたのネットワーク：チャット、つながり、チーム`,pd_board:`ボード`,pd_files:`ファイル`,members_word:`メンバー`,pd_task_ph:`プロジェクトにタスクを追加…`,add:`追加`,requests:`リクエスト`,no_requests:`リクエストはありません`,accept:`承認`,decline:`拒否`,invited_you:`があなたを招待しました:`,grp_save:`保存`,grp_create:`グループを作成`,grp_delete:`グループを削除`,grp_name:`グループ名`,stm_save:`保存`,coming_soon:`近日公開`,splash_lang:`言語を選択`});
Object.assign(STR.ko,{nav_home:`홈`,nav_desktop:`Daily`,nav_tasks:`작업`,nav_team:`팀`,nav_projects:`프로젝트`,nav_connections:`연결`,nav_settings:`설정`,nav_social:`소셜`,nav_workflow:`Workflow`,nav_resolve:`Resolve`,nav_soon:`곧 출시`,g_morning:`좋은 아침이에요`,g_afternoon:`안녕하세요`,g_evening:`좋은 저녁이에요`,home_watch:`살펴볼 만한`,dw_upcoming:`예정`,new_task:`+ 새 작업`,new_project:`+ 새 프로젝트`,team_create:`+ 팀 만들기`,team_join:`참여`,back:`뒤로`,al_all_clear:`모두 완료, 마감된 항목이 없어요.`,g_overdue:`기한 초과`,g_today:`오늘`,connect:`연결`,nt_group:`그룹`,grp_all:`전체`,grp_none:`없음`,grp_new:`새 그룹`,grp_manage:`그룹 관리`,grp_link:`프로젝트에 연결`,grp_link_none:`프로젝트 없음`,proj_link_group:`연결된 그룹`,proj_link_none:`그룹 없음`,gm_title:`그룹 관리`,gm_add:`추가`,gm_active:`활성`,set_language:`언어`,set_appearance:`화면`,stm_prefs:`환경설정`,stm_home:`홈`,stm_notif:`알림`,stm_notif_push:`푸시 알림`,stm_notif_push_d:`메시지, 초대, 작업 알림에 대한 알림입니다.`,stm_generale:`일반`,stm_privacy:`개인정보`,stm_billing:`결제`,stm_features:`기능`,stm_profile:`프로필`,set_account:`계정`,stm_home_daily:`홈에 Daily 표시`,stm_home_tasks:`홈에 작업 표시`,stm_g_settings:`설정`,stm_g_desktop:`데스크톱 앱`,stm_g_custom:`사용자 지정`,mcs_title:`만들기`,mcs_task:`새 작업`,mcs_project:`새 프로젝트`,dw_setup:`하루 설정`,dw_setup_title:`하루를 설정하세요`,soc_tab_recent:`최근 채팅`,soc_tab_conn:`연결`,soc_tab_team:`팀`,soc_add:`+ 추가`,soc_sub:`내 네트워크: 채팅, 연결, 팀`,pd_board:`보드`,pd_files:`파일`,members_word:`멤버`,pd_task_ph:`프로젝트에 작업 추가…`,add:`추가`,requests:`요청`,no_requests:`요청 없음`,accept:`수락`,decline:`거절`,invited_you:`님이 초대했습니다:`,grp_save:`저장`,grp_create:`그룹 만들기`,grp_delete:`그룹 삭제`,grp_name:`그룹 이름`,stm_save:`저장`,coming_soon:`곧 출시`,splash_lang:`언어 선택`});

// Etichette impostazioni interfaccia (sfondo animato). tr() fa fallback en→it per le altre lingue.
Object.assign(STR.it,{set_interface:`Interfaccia`,set_gradient:`Sfondo animato`,set_gradient_d:`La luce viola che si muove dietro l'app.`,ds_noplan_t:`Nessun piano per oggi`,ds_noplan_d:`Crea il piano della giornata e lo vedrai qui, con gli orari.`,ds_make_plan:`Pianifica la giornata`,ds_edit_routine:`Modifica la routine`,ds_day_settings:`Impostazioni giornata`,ib_connect_t:`Collega la tua email a Workie`,ib_connect_sub:`Trasforma le email in task, direttamente da Workie.`,ib_b1_t:`I permessi si apriranno in una nuova scheda`,ib_b1_d:`Accetta i permessi per continuare.`,ib_b2_t:`I tuoi dati, al sicuro`,ib_b2_d:`Workie non usa la tua posta per addestrare modelli.`,ib_b3_t:`Sei tu ad avere il controllo`,ib_b3_d:`Vengono usati solo i permessi che approvi.`,ib_cont:`Continua con %s`,ib_terms:`Continuando accetti i %tos e la %pp.`,ib_tos:`Termini di servizio`,ib_pp:`Privacy`,set_mailboxes:`Caselle di posta`,ib_mail_sub:`Gestisci le email collegate a Workie.`,ib_your_mailboxes:`Le tue caselle`,ib_no_accounts:`Nessuna casella collegata.`,ib_f_flagged:`Evidenziate`,ib_f_archive:`Archivio`,ib_f_sent:`Inviate`,ib_f_drafts:`Bozze`,ib_f_trash:`Cestino`,ib_f_spam:`Spam`,ib_folder_soon:`Collegheremo questa cartella a breve.`,ib_g_today:`Oggi`,ib_g_yesterday:`Ieri`,ib_g_week:`Questa settimana`,ib_g_lastweek:`Settimana scorsa`,ib_g_month:`Questo mese`,ib_g_older:`Più vecchie`,ib_reply:`Rispondi`,ib_reply_all:`Rispondi a tutti`,ib_forward:`Inoltra`,ib_compose:`Scrivi`,ib_cmp_title:`Nuovo messaggio`,ib_cmp_to:`A`,ib_cmp_subj:`Oggetto`,ib_cmp_body:`Scrivi il messaggio…`,ib_cmp_send:`Invia`,ib_cmp_discard:`Elimina bozza`,ib_cmp_sent:`Messaggio inviato ✓`,ib_cmp_needto:`Aggiungi un destinatario.`,ib_cmp_soon:`Pronto. L'invio reale si attiva col collegamento dell'account.`});
Object.assign(STR.en,{set_interface:`Interface`,set_gradient:`Animated background`,set_gradient_d:`The purple light drifting behind the app.`,ds_noplan_t:`No plan for today`,ds_noplan_d:`Create your day plan and it shows up here, with times.`,ds_make_plan:`Plan my day`,ds_edit_routine:`Edit routine`,ds_day_settings:`Day settings`,ib_connect_t:`Connect your email to Workie`,ib_connect_sub:`Turn emails into tasks, right from Workie.`,ib_b1_t:`Permissions open in a new tab`,ib_b1_d:`Accept the permissions to continue.`,ib_b2_t:`Your data stays safe`,ib_b2_d:`Workie never uses your mailbox to train models.`,ib_b3_t:`You stay in control`,ib_b3_d:`Only the permissions you approve are used.`,ib_cont:`Continue with %s`,ib_terms:`By continuing you accept our %tos and %pp.`,ib_tos:`Terms of Service`,ib_pp:`Privacy Policy`,set_mailboxes:`Mailboxes`,ib_mail_sub:`Manage the mailboxes connected to Workie.`,ib_your_mailboxes:`Your mailboxes`,ib_no_accounts:`No mailbox connected yet.`,ib_f_flagged:`Flagged`,ib_f_archive:`Archive`,ib_f_sent:`Sent`,ib_f_drafts:`Drafts`,ib_f_trash:`Trash`,ib_f_spam:`Spam`,ib_folder_soon:`We'll connect this folder soon.`,ib_g_today:`Today`,ib_g_yesterday:`Yesterday`,ib_g_week:`This week`,ib_g_lastweek:`Last week`,ib_g_month:`This month`,ib_g_older:`Older`,ib_reply:`Reply`,ib_reply_all:`Reply all`,ib_forward:`Forward`,ib_compose:`Compose`,ib_cmp_title:`New message`,ib_cmp_to:`To`,ib_cmp_subj:`Subject`,ib_cmp_body:`Write your message…`,ib_cmp_send:`Send`,ib_cmp_discard:`Discard`,ib_cmp_sent:`Message sent ✓`,ib_cmp_needto:`Add a recipient.`,ib_cmp_soon:`Ready. Real sending turns on once the account is connected.`});

let LANG=(function(){try{return localStorage.getItem('workie_lang')||'en';}catch(e){return 'en';}})();
function tr(k){const o=STR[LANG];if(o&&o[k]!=null)return o[k];if(STR.en&&STR.en[k]!=null)return STR.en[k];if(STR.it&&STR.it[k]!=null)return STR.it[k];return k;}
// --- livello account/storage (DEV_LOCAL / CUR_ACC / ukey / migrazione) spostato in storage.js, caricato prima di app.js ---
// ===== SYNC cross-device: funzioni in sync.js. Qui restano solo intercettatore + listener (ordine di avvio). =====
// intercetta i salvataggi delle chiavi-dati: marca la chiave (timestamp) e programma un push (debounce)
(function(){const _si=localStorage.setItem.bind(localStorage);localStorage.setItem=function(k,v){_si(k,v);try{if(!syncApplying&&sb&&typeof k==='string'){const i=k.indexOf('::');if(i>0){const base=k.slice(0,i);if(SYNC_KEYS.indexOf(base)>=0){const m=ktsLoad();m[base]=Date.now();ktsSave(m);syncSchedule();}}}}catch(e){}};})();
document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncOnFocus();});
window.addEventListener('focus',syncOnFocus);
let greetRotTimer=null;
function greetWords(){return (tr('home_words')||'task').split('|').filter(Boolean);}
function startGreetRotator(){
  if(greetRotTimer){clearInterval(greetRotTimer);greetRotTimer=null;}
  const el=document.getElementById('ovRotate');if(!el)return;
  let i=0;
  greetRotTimer=setInterval(()=>{
    const cur=document.getElementById('ovRotate');
    if(!cur||!document.querySelector('[data-page="home"].page.active')){clearInterval(greetRotTimer);greetRotTimer=null;return;}
    cur.classList.add('rot-out');
    setTimeout(()=>{
      const GW=greetWords();i=(i+1)%GW.length;
      cur.textContent=GW[i];
      cur.classList.remove('rot-out');
    },240);
  },2200);
}
// Preferenze Overview (chatbox sotto il saluto + sfondo gradient) — persistite
let ovPrefs=(()=>{try{return JSON.parse(localStorage.getItem('workie_ov_prefs'))||{};}catch(e){return {};}})();
if(ovPrefs.gradient===undefined)ovPrefs.gradient=true;
if(ovPrefs.chatbox===undefined)ovPrefs.chatbox=true;
function saveOvPrefs(){try{localStorage.setItem('workie_ov_prefs',JSON.stringify(ovPrefs));}catch(e){}}
// Account Pro di default (badge "· Pro"). Solo workie_premium==='0' simula un utente free (per testare il gate).
function isPremium(){try{return localStorage.getItem(ukey('workie_premium'))!=='0';}catch(e){return true;}}
// ===== Sistema PIANO (Free / Pro / Tester) =====
function roleGet(){try{const r=localStorage.getItem(ukey('workie_role'));if(r==='free'||r==='pro'||r==='tester')return r;}catch(e){}return isPremium()?'pro':'free';}
function roleSet(r){if(r!=='free'&&r!=='pro'&&r!=='tester')r='free';try{localStorage.setItem(ukey('workie_role'),r);}catch(e){}try{localStorage.setItem(ukey('workie_premium'),r==='free'?'0':'1');}catch(e){}try{updatePlanBadge();}catch(e){}}
function isPro(){const r=roleGet();return r==='pro'||r==='tester';}
function isTester(){return roleGet()==='tester';}
function planName(){const r=roleGet();return r==='tester'?'Tester':(r==='pro'?'Pro':'Free');}
function planSetLocal(pro){roleSet(pro?'pro':'free');}
const FREE_TASKS_PER_DAY=7;
function planDayKey(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function tasksTodayCount(){try{const o=JSON.parse(localStorage.getItem(ukey('workie_taskday'))||'{}');return o.k===planDayKey()?(o.n||0):0;}catch(e){return 0;}}
function tasksTodayInc(n){try{const k=planDayKey();let o=JSON.parse(localStorage.getItem(ukey('workie_taskday'))||'{}');if(o.k!==k)o={k:k,n:0};o.n=(o.n||0)+(n||1);localStorage.setItem(ukey('workie_taskday'),JSON.stringify(o));}catch(e){}}
function tasksLeftToday(){return Math.max(0,FREE_TASKS_PER_DAY-tasksTodayCount());}
function canCreateTask(){return isPro()||tasksTodayCount()<FREE_TASKS_PER_DAY;}
function canUseAI(){return isPro();}
function canEmailToTask(){return isPro();}
// ----- Limite AI a finestra di 5 ore (come Claude): si ricarica ogni 5h -----
const AI_WINDOW_MS=5*3600*1000;
const AI_CAP=40; // richieste AI per finestra di 5h (piano Pro). Modificabile.
const TESTER_MULT=5; // il ruolo Tester ha utilizzo AI x5
function aiCap(){return isTester()?AI_CAP*TESTER_MULT:AI_CAP;}
function aiUsageGet(){try{let o=JSON.parse(localStorage.getItem(ukey('workie_ai_usage'))||'null');const now=Date.now();if(!o||!o.start||(now-o.start)>=AI_WINDOW_MS)o={start:now,used:0};return o;}catch(e){return {start:Date.now(),used:0};}}
function aiUsageSave(o){try{localStorage.setItem(ukey('workie_ai_usage'),JSON.stringify(o));}catch(e){}}
function aiLeft(){return Math.max(0,aiCap()-aiUsageGet().used);}
function aiPct(){return Math.min(100,Math.round(aiUsageGet().used/aiCap()*100));}
function aiResetMs(){const o=aiUsageGet();return Math.max(0,AI_WINDOW_MS-(Date.now()-o.start));}
function aiResetLabel(){const totalMin=Math.max(1,Math.ceil(aiResetMs()/60000));const h=Math.floor(totalMin/60),m=totalMin%60;return h>0?((m>0)?(h+'h '+m+'m'):(h+'h')):(m+'m');}
function aiConsume(){const o=aiUsageGet();if(o.used>=aiCap())return false;o.used++;aiUsageSave(o);return true;}
// ===== Codici di riscatto (dai le key agli amici). In fase 2 andranno su Supabase. =====
const REDEEM_CODES={
  'WORKIE-PRO-2026':'pro','AMICI-PRO-7K3M':'pro','AMICI-PRO-Q9F2':'pro','AMICI-PRO-M4X8':'pro',
  'TESTER-X5-BETA':'tester','TESTER-9F2A-K7':'tester','TESTER-Z3M1-Q8':'tester'
};
function redeemCode(raw){const c=(raw||'').trim().toUpperCase();if(!c)return null;const role=REDEEM_CODES[c];if(!role)return null;roleSet(role);try{aiUsageSave({start:Date.now(),used:0});}catch(e){}return role;}
function aiTry(){if(!isPro())return 'upgrade';if(aiLeft()<=0)return 'limit';return 'ok';}
function showAiLimit(){try{showToast(tr('ai_limit_toast').replace('%t',aiResetLabel()));}catch(_){}}
// ----- Profilo utente per l'AI (personalizzazione, locale; in fase 2 su Supabase) -----
function aiProfileGet(){try{return JSON.parse(localStorage.getItem(ukey('workie_ai_profile'))||'{}')||{};}catch(e){return {};}}
function aiProfileSave(o){try{localStorage.setItem(ukey('workie_ai_profile'),JSON.stringify(o||{}));}catch(e){}}
function aiProfileContext(){
  const p=aiProfileGet();const bits=[];
  const nm=(typeof USER!=='undefined'&&USER&&USER.name)?USER.name:'';if(nm)bits.push('nome '+nm);
  if(p.workStart||p.workEnd)bits.push('orario di lavoro '+(p.workStart||'?')+'–'+(p.workEnd||'?'));
  if(p.peak)bits.push('rende di più: '+p.peak);
  if(p.note)bits.push('preferenze: '+String(p.note).slice(0,220));
  return bits.length?('\n\nProfilo utente (personalizza di conseguenza): '+bits.join('; ')+'.'):'';}
// ===== Memoria AI: Workie impara fatti stabili sull'utente e li ricorda in ogni chat. =====
// Fase 1: in locale (per account). Fase 2 (Supabase): segue l'utente su tutti i dispositivi.
function aiMemGet(){try{return JSON.parse(localStorage.getItem(ukey('workie_ai_memory'))||'[]')||[];}catch(e){return [];}}
function aiMemSave(a){try{localStorage.setItem(ukey('workie_ai_memory'),JSON.stringify((a||[]).slice(-40)));}catch(e){}}
function aiMemClear(){try{localStorage.removeItem(ukey('workie_ai_memory'));}catch(e){}}
function aiMemContext(){const m=aiMemGet();if(!m.length)return '';return '\n\nCosa Workie ha imparato su di te (tienine conto con naturalezza, non elencarlo): '+m.slice(-20).map(x=>'• '+x).join(' ');}
// Estrae 0-2 fatti nuovi dalla conversazione. Fire-and-forget, NON scala i crediti (meter:false).
function aiMemLearn(hist){
  try{
    if(!isPro())return; if(!Array.isArray(hist)||!hist.length)return;
    const mem=aiMemGet();
    const convo=hist.slice(-6).map(m=>((m.role==='ai'||m.r==='ai')?'A: ':'U: ')+String(m.text||m.t||'').slice(0,400)).join('\n');
    if(convo.replace(/\s/g,'').length<40)return;
    aiChat({mode:'mem',meter:false,messages:[{role:'user',text:convo}],context:mem.length?('Già noti (non ripetere): '+mem.slice(-20).join('; ')):''})
      .then(function(reply){
        let arr=null;try{arr=JSON.parse(reply);}catch(_){try{arr=JSON.parse((String(reply).match(/\[[\s\S]*\]/)||[])[0]);}catch(__){}}
        if(!Array.isArray(arr)||!arr.length)return;
        const cur=aiMemGet();const low=cur.map(s=>String(s).toLowerCase());let added=false;
        arr.forEach(function(f){f=String(f||'').trim();if(f&&f.length<=140&&low.indexOf(f.toLowerCase())<0){cur.push(f);low.push(f.toLowerCase());added=true;}});
        if(added){aiMemSave(cur);try{if(document.getElementById('usageOverlay')&&document.getElementById('usageOverlay').classList.contains('open'))renderUsage();}catch(_){}}
      }).catch(function(){});
  }catch(_){}
}
// guard: ritorna true se puoi creare, altrimenti apre l'upgrade e ritorna false
function guardTask(){if(canCreateTask())return true;openUpgrade('tasks');return false;}
function guardAI(){if(canUseAI())return true;openUpgrade('ai');return false;}
function updatePlanBadge(){const el=document.getElementById('userPlan');if(el)el.textContent='· '+planName();}
const PRO_PRICE='6';
function planDevMode(){try{const h=location.hostname;if(h==='localhost'||h==='127.0.0.1'||h==='[::1]'||h.endsWith('.localhost'))return true;return localStorage.getItem('workie_dev')==='1';}catch(e){return false;}}
function nextRole(){const r=roleGet();return r==='free'?'pro':(r==='pro'?'tester':'free');}
const PLAN_CK='<svg class="plan-yes" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
function openUsage(){renderUsage();const o=document.getElementById('usageOverlay');if(o)o.classList.add('open');}
function closeUsage(){const o=document.getElementById('usageOverlay');if(o)o.classList.remove('open');}
function openUpgrade(reason){renderUpgrade(reason);const o=document.getElementById('upgradeOverlay');if(o)o.classList.add('open');}
function closeUpgrade(){const o=document.getElementById('upgradeOverlay');if(o)o.classList.remove('open');}
function renderUsage(){
  const b=document.getElementById('usageBody');if(!b)return;const pro=isPro();
  const used=tasksTodayCount(),left=tasksLeftToday(),pct=Math.min(100,Math.round(used/FREE_TASKS_PER_DAY*100));
  const pdesc=isTester()?tr('plan_tester_d'):(pro?tr('plan_pro_d'):tr('plan_free_d'));
  let h='<div class="usage-plan'+(isTester()?' tester':'')+'"><div class="usage-plan-l"><span class="usage-plan-name">'+planName()+'</span><span class="usage-plan-d">'+pdesc+'</span></div>'+(pro?'<span class="usage-pbadge">'+planName().toUpperCase()+'</span>':'<button class="usage-up" id="usageUp">'+tr('plan_upgrade')+'</button>')+'</div>';
  h+='<div class="usage-row"><div class="usage-row-h"><span>'+tr('usage_tasks')+'</span><span class="usage-row-n">'+(pro?tr('usage_unlimited'):used+' / '+FREE_TASKS_PER_DAY)+'</span></div>'+(pro?'':'<div class="usage-bar"><div class="usage-bar-f" style="width:'+pct+'%"></div></div><div class="usage-note">'+(left>0?tr('usage_left').replace('%n',left):tr('usage_none'))+'</div>')+'</div>';
  if(pro){const apct=aiPct(),aleft=aiLeft();h+='<div class="usage-row"><div class="usage-row-h"><span>'+tr('usage_ai')+(isTester()?' <span class="usage-x5">×5</span>':'')+'</span><span class="usage-row-n">'+apct+'% '+tr('usage_used')+'</span></div><div class="usage-bar"><div class="usage-bar-f" style="width:'+apct+'%"></div></div><div class="usage-note">'+tr('usage_ai_left').replace('%n',aleft).replace('%c',aiCap())+' · '+tr('usage_ai_reset').replace('%t',aiResetLabel())+'</div></div>';}
  else h+='<div class="usage-row"><div class="usage-row-h"><span>'+tr('usage_ai')+'</span><span class="usage-row-n">'+tr('usage_pro_only')+'</span></div><div class="usage-note">'+tr('usage_ai_d')+'</div></div>';
  h+='<div class="usage-row"><div class="usage-row-h"><span>'+tr('usage_inbox')+'</span><span class="usage-row-n'+(pro?' on':'')+'">'+(pro?tr('usage_on'):tr('usage_pro_only'))+'</span></div><div class="usage-note">'+tr('usage_inbox_d')+'</div></div>';
  {const pf=aiProfileGet();h+='<div class="usage-prof"><div class="usage-prof-h">'+tr('prof_title')+'</div>'
    +'<div class="usage-prof-row"><span class="usage-prof-l">'+tr('prof_hours')+'</span><span class="usage-prof-times"><input type="time" id="profStart" value="'+(pf.workStart||'')+'"><span class="usage-prof-dash">–</span><input type="time" id="profEnd" value="'+(pf.workEnd||'')+'"></span></div>'
    +'<textarea id="profNote" class="usage-prof-note" rows="2" placeholder="'+bdEsc(tr('prof_note_ph')).replace(/"/g,'&quot;')+'">'+bdEsc(pf.note||'')+'</textarea>';
    const mem=aiMemGet();
    h+='<div class="usage-mem"><div class="usage-mem-h"><span>'+tr('mem_title')+'</span>'+(mem.length?'<button class="usage-mem-clear" id="memClear">'+tr('mem_clear')+'</button>':'')+'</div>';
    if(mem.length)h+='<div class="usage-mem-list">'+mem.slice(-20).map(x=>'<span class="usage-mem-chip">'+bdEsc(x)+'</span>').join('')+'</div>';
    else h+='<div class="usage-note">'+tr('mem_empty')+'</div>';
    h+='</div></div>';}
  if(planDevMode()){const nr=nextRole();const nn=nr==='tester'?'Tester':(nr==='pro'?'Pro':'Free');h+='<div class="usage-dev"><span>'+tr('usage_dev')+'</span><button class="usage-devbtn" id="usageDev">'+tr('usage_sim')+': '+nn+'</button></div>';}
  b.innerHTML=h;
}
function renderUpgrade(reason){
  const b=document.getElementById('upgradeBody');if(!b)return;
  const banners={tasks:tr('up_reason_tasks'),ai:tr('up_reason_ai'),inbox:tr('up_reason_inbox')};
  const banner=(reason&&banners[reason])?'<div class="plan-banner">'+banners[reason]+'</div>':'';
  const feat=(name,free,pro)=>'<div class="plan-frow"><span class="plan-fname">'+name+'</span><span class="plan-fc">'+free+'</span><span class="plan-fc hi">'+pro+'</span></div>';
  const NO='<span class="plan-no">—</span>';
  b.innerHTML=banner
    +'<div class="plan-hero"><div class="plan-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.2 5.3L20 9l-4 3.9L17 19l-5-2.8L7 19l1-6.1L4 9l5.8-.7z"/></svg></div><div class="plan-hero-t">'+tr('up_title')+'</div><div class="plan-hero-s">'+tr('up_sub')+'</div></div>'
    +'<div class="plan-table"><div class="plan-thead"><span></span><span class="plan-th">Free</span><span class="plan-th hi"><span class="plan-reco">'+tr('up_reco')+'</span>Pro</span></div>'
      +feat(tr('usage_tasks'),'7 / '+tr('up_day'),tr('usage_unlimited'))
      +feat(tr('usage_ai'),NO,PLAN_CK)
      +feat(tr('up_inbox_connect'),PLAN_CK,PLAN_CK)
      +feat(tr('usage_inbox'),NO,PLAN_CK)
      +feat(tr('up_teams'),NO,PLAN_CK)
    +'</div>'
    +'<div class="plan-foot"><div class="plan-price"><span class="plan-price-n">€'+PRO_PRICE+'</span><span class="plan-price-p">/'+tr('up_month')+'</span></div>'
      +'<button class="plan-cta" id="planCta">'+(isPro()?tr('up_current'):tr('up_cta'))+'</button></div>'
    +'<div class="plan-fine">'+tr('up_fine')+'</div>'
    +'<div class="plan-redeem-wrap"><button class="plan-redeem-link" id="planRedeemLink"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M17 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/><circle cx="9" cy="12" r="1.4"/></svg>'+tr('rd_have_code')+'</button>'
      +'<div class="plan-redeem" id="planRedeem"><div class="plan-redeem-row"><input id="redeemInput" class="plan-redeem-in" placeholder="'+tr('rd_placeholder')+'" autocomplete="off" spellcheck="false"><button class="plan-redeem-btn" id="redeemBtn">'+tr('rd_btn')+'</button></div><div class="plan-redeem-msg" id="redeemMsg"></div></div></div>';
}
async function startCheckout(){
  if(isPro()){closeUpgrade();openUsage();return;}
  try{
    const r=await fetch(FN_BASE+'/.netlify/functions/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:(typeof USER!=='undefined'&&USER.email)||''})});
    const raw=await r.text();let d={};try{d=JSON.parse(raw);}catch(_){}
    if(r.ok&&d&&d.url){window.location.href=d.url;return;}
    throw new Error((d&&d.error)||('HTTP '+r.status));
  }catch(e){try{showToast(tr('up_soon'));}catch(_){}}
}
document.addEventListener('click',function(e){
  if(e.target.closest('#usageX')||e.target.id==='usageOverlay'){closeUsage();return;}
  if(e.target.closest('#upgradeX')||e.target.id==='upgradeOverlay'){closeUpgrade();return;}
  if(e.target.closest('#usageUp')){closeUsage();openUpgrade();return;}
  if(e.target.closest('#usageDev')){roleSet(nextRole());renderUsage();try{showToast(planName()+' (simulato)');}catch(_){}return;}
  if(e.target.closest('#memClear')){aiMemClear();renderUsage();try{showToast(tr('mem_cleared'));}catch(_){}return;}
  if(e.target.closest('#planCta')){startCheckout();return;}
  if(e.target.closest('#planRedeemLink')){const r=document.getElementById('planRedeem');if(r)r.classList.toggle('on');const i=document.getElementById('redeemInput');if(i)setTimeout(()=>{try{i.focus();}catch(_){}},60);return;}
  if(e.target.closest('#redeemBtn')){doRedeem();return;}
});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='redeemInput'){e.preventDefault();doRedeem();}});
document.addEventListener('input',function(e){if(e.target&&(e.target.id==='profStart'||e.target.id==='profEnd'||e.target.id==='profNote')){const p=aiProfileGet();const s=document.getElementById('profStart'),en=document.getElementById('profEnd'),n=document.getElementById('profNote');if(s)p.workStart=s.value;if(en)p.workEnd=en.value;if(n)p.note=n.value;aiProfileSave(p);}});
function doRedeem(){
  const inp=document.getElementById('redeemInput'),msg=document.getElementById('redeemMsg');if(!inp)return;
  const role=redeemCode(inp.value);
  if(role){if(msg){msg.textContent=tr(role==='tester'?'rd_ok_tester':'rd_ok_pro');msg.className='plan-redeem-msg ok';}
    setTimeout(()=>{closeUpgrade();try{showToast(tr('rd_activated').replace('%p',planName()));}catch(_){}},1000);
  }else{if(msg){msg.textContent=tr('rd_bad');msg.className='plan-redeem-msg err';}try{inp.focus();inp.select();}catch(_){}}
}
try{updatePlanBadge();}catch(e){}
function applyOvPrefs(){
  const chatOn=!!ovPrefs.chatbox&&isPremium();
  const app=document.querySelector('.app');if(app)app.classList.toggle('no-gradient',!ovPrefs.gradient);
  const cb=document.getElementById('ovChatbox');if(cb){cb.style.display=chatOn?'block':'none';if(!chatOn){cb.classList.remove('expanded','listopen');}}
  const t1=document.getElementById('ovtgChat');if(t1)t1.classList.toggle('on',chatOn);
  const t2=document.getElementById('ovtgGrad');if(t2)t2.classList.toggle('on',!!ovPrefs.gradient);
}
{const eb=document.getElementById('ovEditBtn'),em=document.getElementById('ovEditMenu'),hb=document.getElementById('ovHelpBtn'),hm=document.getElementById('ovHelpMenu');
 function ovCloseMenus(except){[em,hm].forEach(x=>{if(x&&x!==except)x.classList.remove('open');});}
 if(eb&&em){
   eb.addEventListener('click',e=>{e.stopPropagation();const o=!em.classList.contains('open');ovCloseMenus(em);em.classList.toggle('open',o);});
   em.addEventListener('click',e=>{const it=e.target.closest('[data-ovpref]');if(!it)return;const k=it.dataset.ovpref;if(k==='chatbox'&&!ovPrefs.chatbox&&!isPremium()){try{showToast(tr('premium_chat'));}catch(_){}return;}ovPrefs[k]=!ovPrefs[k];saveOvPrefs();applyOvPrefs();});
 }
 if(hb&&hm){hb.addEventListener('click',e=>{e.stopPropagation();const o=!hm.classList.contains('open');ovCloseMenus(hm);hm.classList.toggle('open',o);});}
 document.addEventListener('click',e=>{if(!e.target.closest('.ov-icwrap'))ovCloseMenus(null);});
}
try{applyOvPrefs();}catch(e){}
// Impostazioni → Interfaccia: interruttore dello sfondo animato (palla viola)
{const gr=document.getElementById('setGradRow');
 if(gr)gr.addEventListener('click',()=>{ovPrefs.gradient=!ovPrefs.gradient;saveOvPrefs();applyOvPrefs();});}
function updateGreeting(){
  const now=new Date();const h=now.getHours();
  const g=h<12?tr('g_morning'):h<18?tr('g_afternoon'):tr('g_evening');
  const nm=(typeof USER!=='undefined'&&USER.name)?USER.name.trim().split(/\s+/)[0]:'';
  const ge=document.getElementById('greet');if(ge){ge.innerHTML=bdEsc(tr('home_greet'))+'<span class="ov-greet-hl" id="ovRotate">'+bdEsc(greetWords()[0]||'')+'</span>';startGreetRotator();}
  const dd=document.getElementById('homeDate');
  let dstr='';try{dstr=now.toLocaleDateString(LOCALES[LANG],{weekday:'long',day:'numeric',month:'long'});}catch(e){}
  if(dd)dd.textContent=dstr;
  const td=document.getElementById('tasksDate');if(td)td.textContent=dstr;
  if(typeof renderHomeAlerts==='function')renderHomeAlerts();
  if(typeof renderDwWidget==='function')renderDwWidget();
  if(typeof renderOvPlan==='function')renderOvPlan();
}
function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=tr(el.getAttribute('data-i18n'));});
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{el.placeholder=tr(el.getAttribute('data-i18n-ph'));});
  document.querySelectorAll('[data-i18n-t]').forEach(el=>{el.title=tr(el.getAttribute('data-i18n-t'));el.setAttribute('aria-label',tr(el.getAttribute('data-i18n-t')));});
  const safe=(fn)=>{try{if(typeof fn==='function')fn();}catch(e){console.warn('render skip',e);}};
  safe(updateGreeting);
  safe(typeof renderAgents==='function'?renderAgents:null);
  safe(typeof renderTeams==='function'?renderTeams:null);
  safe(typeof renderConn==='function'?renderConn:null);
  safe(typeof renderSocial==='function'?renderSocial:null);
  safe(typeof renderTaskFilter==='function'?renderTaskFilter:null);
  safe(typeof renderScopeSelector==='function'?renderScopeSelector:null);
  safe(typeof renderTasks==='function'?renderTasks:null);
  safe(typeof renderSideTasks==='function'?renderSideTasks:null);
  safe(typeof renderCalendar==='function'?renderCalendar:null);
  safe(typeof buildCalendar==='function'?buildCalendar:null);
  safe(typeof renderHistory==='function'?renderHistory:null);
  safe(typeof renderProjGrid==='function'?renderProjGrid:null);
  safe(()=>{const tt={pen:'bd_pen',rect:'bd_rect',ellipse:'bd_circle',arrow:'bd_arrow',line:'bd_line'};document.querySelectorAll('.bd-tool[data-tool]').forEach(el=>{if(tt[el.dataset.tool])el.title=tr(tt[el.dataset.tool]);});});
  safe(typeof renderProfCards==='function'?renderProfCards:null);
  safe(typeof renderSegGrid==='function'?renderSegGrid:null);
  safe(typeof renderBell==='function'?renderBell:null);
  safe(typeof renderDesktop==='function'?renderDesktop:null);
  safe(typeof renderDaily==='function'?renderDaily:null);
  safe(typeof renderThemeGrid==='function'?renderThemeGrid:null);
  safe(typeof renderSuCarousel==='function'&&document.querySelector('.signup2.active')?renderSuCarousel:null);
  document.querySelectorAll('.langopt').forEach(o=>o.classList.toggle('active',o.dataset.lang===LANG));
}
function setLang(l){LANG=l;try{localStorage.setItem('workie_lang',l);}catch(e){}applyLang();}
function renderLangPickers(){
  const row=document.getElementById('langRow');
  if(row)row.innerHTML=Object.keys(LANGS).map(l=>'<div class="langopt'+(LANG===l?' active':'')+'" data-lang="'+l+'">'+LANGS[l].name+'</div>').join('');
  const menu=document.getElementById('splashLangMenu');
  if(menu)menu.innerHTML=Object.keys(LANGS).map(l=>'<div class="sl-opt" data-lang="'+l+'">'+LANGS[l].name+'</div>').join('');
}
try{renderLangPickers();}catch(e){}

// ---------- Agents grid ----------
const AGENTS=[
  {n:'Journalist',dk:'ad1'},
  {n:'Social Media Manager',dk:'ad2'},
  {n:'Accountant',dk:'ad3'},
  {n:'Ads Manager',dk:'ad4'},
  {n:'Researcher',dk:'ad5'},
  {n:'Designer',dk:'ad6'},
];
const grid=document.getElementById('agentGrid');
// ===== Agents — scheletro a tab (Panoramica · Agenti · Team · Attività · Connessioni) =====
let USER_AGENTS=(function(){try{return JSON.parse(localStorage.getItem(ukey('workie_agents'))||'[]')||[];}catch(e){return [];}})();
let AG_TEAMS=(function(){try{return JSON.parse(localStorage.getItem(ukey('workie_ag_teams'))||'[]')||[];}catch(e){return [];}})();
function saveAgents(){try{localStorage.setItem(ukey('workie_agents'),JSON.stringify(USER_AGENTS));}catch(e){}}
function saveAgTeams(){try{localStorage.setItem(ukey('workie_ag_teams'),JSON.stringify(AG_TEAMS));}catch(e){}}
// Cartelle (stile iOS) + ordine della griglia agenti
let AG_FOLDERS=(function(){try{return JSON.parse(localStorage.getItem(ukey('workie_ag_folders'))||'[]')||[];}catch(e){return [];}})();
let AG_ORDER=(function(){try{return JSON.parse(localStorage.getItem(ukey('workie_ag_order'))||'[]')||[];}catch(e){return [];}})();
function saveAgFolders(){try{localStorage.setItem(ukey('workie_ag_folders'),JSON.stringify(AG_FOLDERS));}catch(e){}}
function saveAgOrder(){try{localStorage.setItem(ukey('workie_ag_order'),JSON.stringify(AG_ORDER));}catch(e){}}
function agInFolder(id){return AG_FOLDERS.some(function(f){return (f.agents||[]).map(String).indexOf(String(id))>=0;});}
function agSyncOrder(){
  // elimina cartelle vuote
  AG_FOLDERS=AG_FOLDERS.filter(function(f){return (f.agents||[]).length;});
  // togli chiavi non più valide
  AG_ORDER=AG_ORDER.filter(function(k){
    if(k.indexOf('a:')===0){var id=k.slice(2);return USER_AGENTS.some(function(a){return String(a.id)===id;})&&!agInFolder(id);}
    if(k.indexOf('f:')===0){var fid=k.slice(2);return AG_FOLDERS.some(function(f){return String(f.id)===fid;});}
    return false;
  });
  // aggiungi agenti top-level nuovi
  USER_AGENTS.forEach(function(a){var id=String(a.id);if(!agInFolder(id)&&AG_ORDER.indexOf('a:'+id)<0)AG_ORDER.push('a:'+id);});
  // assicura tutte le cartelle presenti
  AG_FOLDERS.forEach(function(f){if(AG_ORDER.indexOf('f:'+f.id)<0)AG_ORDER.push('f:'+f.id);});
  saveAgFolders();saveAgOrder();
}
function agCombine(srcKey,dstKey){
  if(srcKey.indexOf('a:')!==0)return; // solo agenti si combinano
  var srcId=srcKey.slice(2);
  if(dstKey.indexOf('f:')===0){var f=AG_FOLDERS.find(function(x){return 'f:'+x.id===dstKey;});if(f){f.agents=f.agents||[];if(f.agents.map(String).indexOf(srcId)<0)f.agents.push(srcId);}AG_ORDER=AG_ORDER.filter(function(k){return k!==srcKey;});}
  else if(dstKey.indexOf('a:')===0){var dstId=dstKey.slice(2);var fid='f'+Date.now().toString(36);AG_FOLDERS.push({id:fid,name:tr('ag_folder'),agents:[dstId,srcId]});var pos=AG_ORDER.indexOf(dstKey);AG_ORDER=AG_ORDER.filter(function(k){return k!==srcKey&&k!==dstKey;});AG_ORDER.splice(pos<0?AG_ORDER.length:pos,0,'f:'+fid);}
  agSyncOrder();
}
function agReorder(key,idx){AG_ORDER=AG_ORDER.filter(function(k){return k!==key;});if(idx<0||idx>AG_ORDER.length)idx=AG_ORDER.length;AG_ORDER.splice(idx,0,key);saveAgOrder();}
const AG_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3.5"/><path d="M12 8V4.6"/><circle cx="12" cy="3.1" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="14" r="1.35" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.35" fill="currentColor" stroke="none"/><path d="M9.5 17.3h5"/></svg>';
const AG_TEAM_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.4"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M15 19a4.3 4.3 0 0 1 6 0"/></svg>';
const AG_ACT_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const AG_PLUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
const AG_CONNS=[
  {cat:'ag_conn_ai',items:[{k:'claude',n:'Claude',d:'claude.ai'},{k:'chatgpt',n:'ChatGPT',d:'openai.com'}]},
  {cat:'ag_conn_design',items:[{k:'figma',n:'Figma',d:'figma.com'},{k:'higgsfield',n:'Higgsfield',d:'higgsfield.ai'}]},
  {cat:'ag_conn_pub',items:[{k:'metricool',n:'Metricool',d:'metricool.com'}]},
  {cat:'ag_conn_prod',items:[{k:'gmail',n:'Gmail',d:'gmail.com'},{k:'gcal',n:'Google Calendar',d:'calendar.google.com'},{k:'gdrive',n:'Google Drive',d:'drive.google.com'}]},
  {cat:'ag_conn_auto',items:[{k:'n8n',n:'n8n',d:'n8n.io'}]}
];
function agConnIcon(d,n){return '<img src="https://www.google.com/s2/favicons?domain='+encodeURIComponent(d)+'&sz=64" alt="" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'"><span class="ag-conn-ini">'+bdEsc((n||'?').charAt(0))+'</span>';}
function agEmptyState(ic,t,s,btnLabel,btnId){return '<div class="ag-empty"><div class="ag-empty-ic">'+ic+'</div><div class="ag-empty-t">'+bdEsc(t)+'</div><div class="ag-empty-s">'+bdEsc(s)+'</div>'+(btnLabel?'<button class="ag-empty-btn" id="'+btnId+'" type="button">'+AG_PLUS+bdEsc(btnLabel)+'</button>':'')+'</div>';}
function agentCard(a){return '<div class="ag-card" data-agid="'+bdEsc(String(a.id))+'"><div class="ag-card-top"><span class="ag-card-ic">'+(a.icon||AG_ICON)+'</span><span class="ag-card-name">'+bdEsc(a.name||tr('ag_untitled'))+'</span></div>'+(a.desc?'<div class="ag-card-desc">'+bdEsc(a.desc)+'</div>':'')+'</div>';}
function teamCard(t){return '<div class="ag-card" data-agteam="'+bdEsc(String(t.id))+'"><div class="ag-card-top"><span class="ag-card-ic">'+AG_TEAM_ICON+'</span><span class="ag-card-name">'+bdEsc(t.name||tr('ag_untitled'))+'</span></div><div class="ag-card-desc">'+((t.agents&&t.agents.length)||0)+' '+bdEsc(tr('ag_agents_word'))+'</div></div>';}
// ---- sezioni (scheletro) ----
function agOverview(){
  const stat=(n,l)=>'<div class="ag-stat"><span class="ag-stat-n">'+n+'</span><span class="ag-stat-l">'+bdEsc(l)+'</span></div>';
  const stats='<div class="ag-stats">'+stat(0,tr('ag_stat_review'))+stat(0,tr('ag_stat_working'))+stat(0,tr('ag_stat_done'))+'</div>';
  const review='<div class="ag-sec"><div class="ag-sec-h">'+bdEsc(tr('ag_ov_review'))+'</div><div class="ag-soft">'+bdEsc(tr('ag_ov_none_review'))+'</div></div>';
  const team='<div class="ag-sec"><div class="ag-sec-h">'+bdEsc(tr('ag_ov_team'))+'</div><div class="ag-soft">'+bdEsc(tr('ag_ov_none_team'))+' <button class="ag-link" data-aggo="agents" type="button">'+bdEsc(tr('ag_new'))+'</button></div></div>';
  return stats+review+team;
}
function agTile(a){return '<div class="ag-tile ag-tile-agent" data-agtile="a:'+bdEsc(String(a.id))+'"><div class="ag-tile-ic">'+(a.icon||AG_ICON)+'</div><div class="ag-tile-name">'+bdEsc(a.name||tr('ag_untitled'))+'</div></div>';}
function agFolderTile(f){var mini=(f.agents||[]).slice(0,4).map(function(id){var a=USER_AGENTS.find(function(x){return String(x.id)===String(id);});return '<span class="ag-mini">'+(a?(a.icon||AG_ICON):'')+'</span>';}).join('');return '<div class="ag-tile ag-tile-folder" data-agtile="f:'+bdEsc(String(f.id))+'"><div class="ag-tile-ic ag-folder-ic">'+mini+'</div><div class="ag-tile-name">'+bdEsc(f.name||tr('ag_folder'))+'</div></div>';}
function agMyAgents(){
  if(!USER_AGENTS.length)return agEmptyState(AG_ICON,tr('ag_empty_t'),tr('ag_empty_s'),tr('ag_new'),'agEmptyNew');
  agSyncOrder();
  var tiles=AG_ORDER.map(function(k){
    if(k.indexOf('a:')===0){var a=USER_AGENTS.find(function(x){return String(x.id)===k.slice(2);});return a?agTile(a):'';}
    var f=AG_FOLDERS.find(function(x){return String(x.id)===k.slice(2);});return f?agFolderTile(f):'';
  }).join('');
  return '<div class="ag-barcta"><button class="ag-new" id="agNew" type="button">'+AG_PLUS+bdEsc(tr('ag_new'))+'</button></div><div class="ag-tiles" id="agTiles">'+tiles+'</div>';
}
function agTeamsTab(){
  if(!AG_TEAMS.length)return agEmptyState(AG_TEAM_ICON,tr('ag_teams_empty_t'),tr('ag_teams_empty_s'),tr('ag_new_team'),'agEmptyNewTeam');
  return '<div class="ag-barcta"><button class="ag-new" id="agNewTeam" type="button">'+AG_PLUS+bdEsc(tr('ag_new_team'))+'</button></div><div class="ag-grid">'+AG_TEAMS.map(teamCard).join('')+'</div>';
}
function agActivityTab(){return agEmptyState(AG_ACT_ICON,tr('ag_act_empty_t'),tr('ag_act_empty_s'),'','');}
function agConnectionsTab(){
  return AG_CONNS.map(g=>'<div class="ag-sec"><div class="ag-sec-h">'+bdEsc(tr(g.cat))+'</div><div class="ag-conn-list">'+g.items.map(it=>'<div class="ag-conn-row"><span class="ag-conn-ic">'+agConnIcon(it.d,it.n)+'</span><span class="ag-conn-name">'+bdEsc(it.n)+'</span><span class="ag-conn-status">'+bdEsc(tr('ag_not_conn'))+'</span><button class="ag-conn-btn" data-agconn="'+it.k+'" type="button">'+bdEsc(tr('ag_connect'))+'</button></div>').join('')+'</div></div>').join('');
}
// ===================== AGENTS — nuova struttura (griglia → dettaglio → workflow) =====================
// Palette pastello per gli avatar "blob" degli agenti
const AG_PAL=[
  {bg:'#d7f2e4',blob:'#79cfa6'},{bg:'#d9e9ff',blob:'#6fb0f0'},{bg:'#ffe7c9',blob:'#f3b365'},
  {bg:'#ffd8e0',blob:'#f389a0'},{bg:'#e7ddff',blob:'#b095ef'},{bg:'#dcdce2',blob:'#4c4c55'},{bg:'#ffdcd0',blob:'#f29e89'}
];
function agHash(s){s=String(s||'');let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h;}
function agPal(a){const i=(a&&a.pal!=null)?a.pal:(agHash(a&&a.id)%AG_PAL.length);return AG_PAL[((i%AG_PAL.length)+AG_PAL.length)%AG_PAL.length];}
function agBlobArt(a){const p=agPal(a);return '<svg class="ag-blobsvg" viewBox="0 0 100 100" aria-hidden="true"><path fill="'+p.blob+'" d="M53 9c16-1 32 9 37 25s-1 33-12 44-30 16-45 8S9 59 12 42 37 10 53 9z"/><circle cx="41" cy="51" r="5.2" fill="#2b2b30"/><circle cx="60" cy="51" r="5.2" fill="#2b2b30"/><circle cx="39.2" cy="49" r="1.7" fill="#fff"/><circle cx="58.2" cy="49" r="1.7" fill="#fff"/><path d="M42 62c4.2 4.4 11.8 4.4 16 0" stroke="#2b2b30" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';}
function agAvatar(a,cls){const p=agPal(a);return '<span class="ag-av '+(cls||'')+'" style="background:'+p.bg+'">'+agBlobArt(a)+'</span>';}
// ---- Griglia ----
function agRow(a){
  const n=(a.subAgents&&a.subAgents.length)||0;
  const meta=n?('<span class="ag-trow-meta">'+n+' '+bdEsc(tr('ag_subs_word'))+'</span>'):'';
  return '<button class="ag-trow" data-agopen="'+bdEsc(String(a.id))+'" type="button"><span class="ag-tdot" style="background:'+agPal(a).blob+'"></span><span class="ag-trow-name">'+bdEsc(a.name||tr('ag_untitled'))+'</span>'+meta+'</button>';
}
function agGridView(){
  const head='<div class="tk-head"><span class="tk-headic">'+AG_ICON+'</span><div class="page-title tk-bigtitle">'+bdEsc(tr('nav_agents'))+'</div><div class="tasks-actions"><button class="tasks-add" id="agNew" type="button" title="'+bdEsc(tr('ag_new'))+'" aria-label="'+bdEsc(tr('ag_new'))+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button></div></div>';
  const body=USER_AGENTS.length?('<div class="ag-trows">'+USER_AGENTS.map(agRow).join('')+'</div>'):('<div class="ag-empty-rows"><div class="ag-empty-t">'+bdEsc(tr('ag_empty_t'))+'</div><div class="ag-empty-s">'+bdEsc(tr('ag_empty_s'))+'</div></div>');
  return head+body;
}
// ---- Breadcrumb ----
const AG_CLOUD='<svg class="ag-crumb-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 9.2 4 4 0 0 0 6.5 19z"/></svg>';
function agCrumb(parts,cur){let h='<div class="ag-crumb">'+AG_CLOUD;parts.forEach(p=>{h+='<button class="ag-crumb-link" data-agcrumb="'+p[1]+'" type="button">'+bdEsc(p[0])+'</button><span class="ag-crumb-sep">/</span>';});h+='<span class="ag-crumb-cur">'+bdEsc(cur)+'</span></div>';return h;}
// ---- Dettaglio agente ----
function agDetActions(a){
  return '<div class="ag-dactions"><button class="tdp-btn" data-agedit="'+bdEsc(String(a.id))+'" type="button">'+TDI.edit+' '+bdEsc(tr('ag_edit'))+'</button><button class="tdp-btn danger" data-agdel="'+bdEsc(String(a.id))+'" type="button">'+TDI.trash+' '+bdEsc(tr('ag_delete'))+'</button></div>';
}
function agOverviewTab(a){
  const sect=(label,body)=>'<div class="ag-dsec"><div class="ag-dsec-h">'+bdEsc(label)+'</div>'+body+'</div>';
  const desc=(a.description||a.goal||'').trim();
  const descBody='<div class="ag-dtext'+(desc?'':' soft')+'">'+bdEsc(desc||tr('ag_no_desc'))+'</div>';
  const subs=a.subAgents||[];
  const subsBody=subs.length?('<div class="ag-sublist">'+subs.map(s=>'<div class="ag-subitem"><div class="ag-subitem-n">'+bdEsc(s.name||s)+'</div>'+(s.desc?'<div class="ag-subitem-d">'+bdEsc(s.desc)+'</div>':'<div class="ag-subitem-d soft">'+bdEsc(tr('ag_sub_nodesc'))+'</div>')+'</div>').join('')+'</div>'):('<div class="ag-dtext soft">'+bdEsc(tr('ag_no_subs'))+'</div>');
  const tools=a.tools||[];
  const toolsBody=tools.length?('<div class="ag-dctx">'+tools.map(t=>'<span class="tk-tag tk-grp">'+bdEsc(t)+'</span>').join('')+'</div>'):('<div class="ag-dtext soft">'+bdEsc(tr('ag_no_tools'))+'</div>');
  return sect(tr('ag_dsec_desc'),descBody)+'<div class="ag-dsep"></div>'+sect(tr('ag_dsec_subs'),subsBody)+'<div class="ag-dsep"></div>'+sect(tr('ag_dsec_tools'),toolsBody)+agDetActions(a);
}
function agWorkflowTab(a){
  const plan=a.workflowPlan||[];
  const subs=a.subAgents||[];
  let planBody='';
  if(plan.length){
    planBody='<div class="ag-dsec"><div class="ag-dsec-h">'+bdEsc(tr('agr_wf_consists'))+'</div><div class="agwf-flow">'+plan.map((w,i)=>{
      const nm=(w.agents&&w.agents[0])||w.step||('Step '+(i+1));
      const pa={id:String(a.id)+':'+i,pal:i%AG_PAL.length},p=agPal(pa);
      const sub=subs.find(s=>s.name===nm);
      const line=(i<plan.length-1)?'<span class="agwf-line"></span>':'';
      return '<div class="agwf-step">'+line+'<span class="agwf-av" style="background:'+p.bg+'">'+agBlobArt(pa)+'</span><div class="agwf-tx"><div class="agwf-phase">'+bdEsc(w.step||nm)+'</div><div class="agwf-agent">'+bdEsc(nm)+'</div>'+((sub&&sub.desc)?'<div class="agwf-desc">'+bdEsc(sub.desc)+'</div>':'')+'</div></div>';
    }).join('')+'</div></div><div class="ag-dsep"></div>';
  }
  const start='<button class="ag-wf-start" id="agWfStart" type="button">'+AG_PLUS+'<span>'+bdEsc(tr('ag_wf_start'))+'</span></button>';
  const prev=a.workflows||[];
  let prevBody='';
  if(prev.length)prevBody='<div class="ag-dsec-sub">'+bdEsc(tr('ag_wf_prev'))+'</div><div class="ag-wf-list">'+prev.map(w=>'<div class="ag-wf-row">'+bdEsc(typeof w==='string'?w:(w.name||'')) +'</div>').join('')+'</div>';
  return '<div class="ag-wf">'+planBody+start+prevBody+'</div>';
}
function agEventsTab(a){return '<div class="ag-dtext soft" style="margin-top:14px">'+bdEsc(tr('ag_events_soon'))+'</div>';}
function agDelete(id){
  askConfirm(tr('ag_del_confirm'),function(){
    const i=USER_AGENTS.findIndex(x=>String(x.id)===String(id));if(i>=0)USER_AGENTS.splice(i,1);
    if(typeof saveAgents==='function')saveAgents();
    agView='grid';agSelId=null;renderAgents();
    if(typeof showToast==='function')showToast(tr('ag_del_ok'));
  });
}
function agDetailView(a){
  const tabs=[['overview','ag_dt_overview'],['workflow','ag_dt_workflow'],['events','ag_dt_events']];
  const tabbar=tabs.map(t=>'<button class="ag-dtab'+(agDetTab===t[0]?' active':'')+'" data-agdtab="'+t[0]+'" type="button">'+bdEsc(tr(t[1]))+'</button>').join('');
  let content=agDetTab==='workflow'?agWorkflowTab(a):(agDetTab==='events'?agEventsTab(a):agOverviewTab(a));
  return agCrumb([[tr('nav_agents'),'grid']],a.name||tr('ag_untitled'))+
    '<div class="ag-dhead">'+agAvatar(a,'ag-av-lg')+'<div class="ag-dtitle">'+bdEsc(a.name||tr('ag_untitled'))+'</div></div>'+
    '<div class="ag-dtabs">'+tabbar+'</div><div class="ag-dbody">'+content+'</div>';
}
// ---- Workflow in esecuzione ----
// ===== RUN WORKFLOW — esperienza guidata a step (approva / modifica), stile app =====
let agRun=null;
const AGR_CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
function agStepType(name){const n=(name||'').toLowerCase();if(/graphic|design|visual|immagin|grafic|photo|foto|image/.test(n))return 'images';if(/social|publish|pubblic|metricool|schedul|post/.test(n))return 'report';return 'text';}
function agRunStepsFrom(a){
  const plan=(a.workflowPlan&&a.workflowPlan.length)?a.workflowPlan:null;
  const subs=(a.subAgents&&a.subAgents.length)?a.subAgents:[];
  let steps;
  if(plan){steps=plan.map((w,i)=>{const nm=(w.agents&&w.agents[0])||w.step||('Step '+(i+1));const sub=subs.find(s=>s.name===nm)||null;return {name:nm,phase:w.step||nm,sub,status:'pending',output:null,images:null,selected:[],feedback:'',editing:false};});}
  else{steps=subs.map(s=>({name:s.name,phase:s.name,sub:s,status:'pending',output:null,images:null,selected:[],feedback:'',editing:false}));}
  if(!steps.length)steps=[{name:a.name||'Agente',phase:a.name||'Agente',sub:null,status:'pending',output:null,images:null,selected:[],feedback:'',editing:false}];
  steps.forEach(st=>st.type=agStepType(st.name));
  return steps;
}
function agRunStart(a){agRun={agentId:a.id,idea:'',steps:agRunStepsFrom(a),cur:0,phase:'intro'};agView='run';renderAgents();}
function agRunPalFor(a,i){return {id:String(a.id)+':'+i,pal:i%AG_PAL.length};}
function agRunView(a){
  if(!agRun||agRun.agentId!==a.id)agRun={agentId:a.id,idea:'',steps:agRunStepsFrom(a),cur:0,phase:'intro'};
  const crumb=agCrumb([[tr('nav_agents'),'grid'],[a.name||tr('ag_untitled'),'detail']],tr('ag_new_workflow'));
  if(agRun.phase==='intro')return crumb+agRunIntro(a);
  if(agRun.phase==='done')return crumb+agRunDone(a);
  return crumb+agRunStepsView(a);
}
function agRunIntro(a){
  return '<div class="agr-intro">'+
    '<div class="agr-lead">'+agAvatar(a,'ag-av-lg')+'<div class="agr-lead-tx"><div class="agr-lead-name">'+bdEsc(a.name||tr('ag_untitled'))+'</div><div class="agr-lead-role">'+bdEsc(tr('agr_lead'))+'</div></div></div>'+
    '<div class="agw-bubble"><div class="agw-bubble-ai">'+AGW_SPARK+'<span>'+bdEsc(a.name||tr('ag_untitled'))+'</span></div>'+bdEsc(tr('agr_greet'))+'</div>'+
    '<div class="agw-desc-wrap"><textarea id="agrIdea" class="agw-ta" placeholder="'+bdEsc(tr('agr_idea_ph'))+'">'+bdEsc(agRun.idea||'')+'</textarea>'+
    '<button class="agw-mic" id="agrMic" type="button" title="'+bdEsc(tr('agw_rec'))+'">'+AGW_MIC+'</button></div>'+
    '<button class="agw-cta" id="agrGo" type="button">'+bdEsc(tr('agr_go'))+'</button></div>';
}
const AGR_SEND='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>';
function agRunStepsView(a){
  const st=agRun.steps[agRun.cur];const curN=agRun.cur+1;
  // header
  let h='<div class="agr-head">'+agAvatar(a,'ag-av-md')+'<div class="agr-head-tx"><div class="agr-head-name">'+bdEsc(a.name||tr('ag_untitled'))+'</div><div class="agr-head-sub">'+bdEsc(tr('agr_progress').replace('%n',curN).replace('%t',agRun.steps.length))+'</div></div></div>';
  // stepper (dove sei)
  h+='<div class="agr-stepper">'+agRun.steps.map((s,i)=>{
    const pa=agRunPalFor(a,i),p=agPal(pa);const cls=s.status==='done'?'done':(i===agRun.cur?'cur':'next');
    const dot='<div class="agr-dot '+cls+'"><span class="agr-dot-av" style="background:'+p.bg+'">'+(s.status==='done'?AGR_CHK:agBlobArt(pa))+'</span><span class="agr-dot-n">'+bdEsc(s.name)+'</span></div>';
    const line=(i<agRun.steps.length-1)?'<span class="agr-dot-line'+(s.status==='done'?' done':'')+'"></span>':'';
    return dot+line;
  }).join('')+'</div>';
  // con chi stai lavorando
  const pa=agRunPalFor(a,agRun.cur),p=agPal(pa);
  h+='<div class="agr-with"><span class="agr-with-av" style="background:'+p.bg+'">'+agBlobArt(pa)+'</span><div class="agr-with-tx"><div class="agr-with-lbl">'+bdEsc(tr('agr_with'))+'</div><div class="agr-with-name">'+bdEsc(st.name)+(st.phase&&st.phase!==st.name?' · '+bdEsc(st.phase):'')+'</div></div></div>';
  // chat
  h+='<div class="agr-chat">'+(st.messages||[]).map(m=>agRunMsgHtml(a,m)).join('')+(st.status==='running'?'<div class="agr-msg agent"><span class="agr-msg-av" style="background:'+p.bg+'">'+agBlobArt(pa)+'</span><div class="agr-bubble agr-typing"><span></span><span></span><span></span></div></div>':'')+'</div>';
  // composer
  const dis=st.status!=='ready';
  h+='<div class="agr-composer"><div class="agr-cbox"><textarea id="agrChatInput" class="agr-cinput" rows="1" placeholder="'+bdEsc(tr('agr_chat_ph').replace('%s',st.name))+'"'+(dis?' disabled':'')+'></textarea><button class="agr-mic2" id="agrChatMic" type="button" title="'+bdEsc(tr('agw_rec'))+'">'+AGW_MIC+'</button><button class="agr-send" id="agrChatSend" type="button"'+(dis?' disabled':'')+'>'+AGR_SEND+'</button></div>';
  let lbl,aDis=dis;
  if(st.type==='images'){lbl=tr('agr_use_sel').replace('%n',st.selected.length)+' →';aDis=dis||!st.selected.length;}
  else if(st.type==='report')lbl=tr('agr_finish')+' ✓';
  else lbl=tr('agr_ok_next')+' →';
  h+='<button class="agr-next" id="agrAccept" type="button"'+(aDis?' disabled':'')+'>'+bdEsc(lbl)+'</button></div>';
  return h;
}
function agRunMsgHtml(a,m){
  if(m.role==='user')return '<div class="agr-msg user"><div class="agr-bubble">'+bdEsc(m.text)+'</div></div>';
  const pa=agRunPalFor(a,agRun.cur),p=agPal(pa);
  let extra='';
  if(m.images){const st=agRun.steps[agRun.cur];extra='<div class="agr-imggrid">'+(st.images||[]).map((im,k)=>'<button class="agr-img'+(st.selected.indexOf(k)>=0?' sel':'')+'" data-agimg="'+k+'" type="button" style="background:'+im+'"><span class="agr-img-chk">'+AGR_CHK+'</span></button>').join('')+'</div>';}
  if(m.imgtool){const conn=agImgConnected();extra='<div class="agr-tools">'+AG_IMG_SERVICES.filter(id=>conn.indexOf(id)<0).map(id=>{const ap=PLUGIN_APPS.find(x=>x.id===id)||{n:id,dom:''};return '<div class="agr-tool"><span class="agr-tool-ic">'+agConnIcon(ap.dom,ap.n)+'</span><span class="agr-tool-n">'+bdEsc(ap.n)+'</span><button class="agr-tool-btn" data-imgconnect="'+id+'" type="button">'+bdEsc(tr('ag_connect'))+'</button></div>';}).join('')+'</div>';}
  return '<div class="agr-msg agent"><span class="agr-msg-av" style="background:'+p.bg+'">'+agBlobArt(pa)+'</span><div class="agr-bubble">'+bdEsc(m.text)+extra+'</div></div>';
}
function agRunDone(a){
  return '<div class="agr-done"><div class="agr-done-ic">'+AGR_CHK+'</div><div class="agr-done-t">'+bdEsc(tr('agr_done_t'))+'</div><div class="agr-done-s">'+bdEsc(tr('agr_done_s').replace('%s',a.name||''))+'</div><button class="agw-cta" id="agrClose" type="button" style="width:auto;margin:0 auto;padding:0 26px">'+bdEsc(tr('agr_back_agent'))+'</button></div>';
}
// --- logica (per ora risposte di esempio; da collegare all'AI/motore) ---
function agrScroll(){setTimeout(()=>{try{const ms=document.querySelectorAll('.agr-chat .agr-msg');const last=ms[ms.length-1];if(last)last.scrollIntoView({behavior:'smooth',block:'center'});}catch(_){}},70);}
function agRunMockImages(n){const out=[];for(let k=0;k<n;k++){const p=AG_PAL[(k+(agRun?agRun.cur:0))%AG_PAL.length];out.push('linear-gradient(135deg,'+p.bg+' 0%,'+p.blob+' 100%)');}return out;}
function agRunBegin(){const ta=document.getElementById('agrIdea');if(ta)agRun.idea=(ta.value||'').trim();agRun.phase='steps';agRun.cur=0;renderAgents();agRunStartStep(0);}
// --- Strumenti di generazione immagini (serve un'API esterna: NON un account ChatGPT) ---
// Servizi che generano immagini e si possono collegare davvero (connessione reale per-utente)
const AG_IMG_SERVICES=['higgsfield'];
function agImgConnected(){return AG_IMG_SERVICES.filter(id=>(typeof svcConnected==='function')&&svcConnected(id));}
function agImgToolName(k){const t=PLUGIN_APPS.find(a=>a.id===k);return t?t.n:((SVC_CONN&&SVC_CONN[k])?SVC_CONN[k].n:k);}
// --- Contesto + storico per la chiamata AI del sub-agente ---
function agRunContext(a,st){
  const L=[];
  L.push('AGENTE: '+(a.name||'')+(a.description?(' — '+a.description):''));
  L.push('TU SEI il sub-agente: '+st.name);
  if(st.sub&&st.sub.desc)L.push('LE TUE ISTRUZIONI OPERATIVE: '+st.sub.desc);
  if(st.phase&&st.phase!==st.name)L.push('FASE DEL WORKFLOW: '+st.phase);
  if(agRun.idea)L.push("RICHIESTA DELL'UTENTE: "+agRun.idea);
  const prev=[];
  for(let i=0;i<agRun.cur;i++){const ps=agRun.steps[i];const last=(ps.messages||[]).filter(m=>m.role==='agent'&&!m.imgtool).slice(-1)[0];if(last&&last.text&&!ps._isImg)prev.push('— '+ps.name+': '+last.text);}
  if(prev.length)L.push('LAVORO GIÀ FATTO DAI SUB-AGENTI PRECEDENTI:\n'+prev.join('\n\n'));
  return L.join('\n');
}
function agRunAiMessages(st){
  const out=[{role:'user',text:tr('agr_kickoff')}];
  (st.messages||[]).forEach(m=>{if(m.imgtool)return;out.push({role:(m.role==='agent'?'assistant':'user'),text:m.text});});
  return out;
}
async function agRunAiTurn(st){
  const a=agSel();
  try{
    const reply=await aiChat({mode:'sub',context:agRunContext(a,st),messages:agRunAiMessages(st)});
    if(!agRun||agRun.steps[agRun.cur]!==st)return;
    st.messages.push({role:'agent',text:(reply||'').trim()||tr('agr_empty')});
  }catch(e){
    if(!agRun||agRun.steps[agRun.cur]!==st)return;
    if(String(e&&e.message)==='ai_limit'){if(typeof showAiLimit==='function')showAiLimit();st.messages.push({role:'agent',text:tr('agr_limit')});}
    else st.messages.push({role:'agent',text:tr('agr_offline')});
  }
  st.status='ready';renderAgents();agrScroll();
}
function agRunStartStep(i){
  const st=agRun.steps[i];if(!st)return;
  agRun.cur=i;st.status='running';st.messages=st.messages||[];renderAgents();agrScroll();
  if(st.type==='images'){
    st._isImg=true;
    const conn=agImgConnected();
    setTimeout(()=>{if(!agRun||agRun.steps[i]!==st)return;
      if(!conn.length){st.messages.push({role:'agent',text:tr('agr_img_needtool'),imgtool:true});}
      else{st.imgtool=conn[0];st.images=agRunMockImages(10);st.selected=[];st.messages.push({role:'agent',text:tr('agr_img_withtool').replace('%s',agImgToolName(conn[0])),images:true});}
      st.status='ready';renderAgents();agrScroll();
    },500);
    return;
  }
  agRunAiTurn(st); // testo/report via AI
}
function agRunSend(){
  const st=agRun.steps[agRun.cur];if(!st||st.status!=='ready')return;
  const inp=document.getElementById('agrChatInput');const txt=inp?(inp.value||'').trim():'';if(!txt)return;
  st.messages.push({role:'user',text:txt});st.status='running';renderAgents();agrScroll();
  if(st.type==='images'){
    const conn=agImgConnected();
    setTimeout(()=>{if(!agRun)return;
      if(!conn.length){st.messages.push({role:'agent',text:tr('agr_img_needtool'),imgtool:true});}
      else{st.images=agRunMockImages(10);st.selected=[];st.messages.push({role:'agent',text:tr('agr_msg_images_rev'),images:true});}
      st.status='ready';renderAgents();agrScroll();
    },500);
    return;
  }
  agRunAiTurn(st);
}
function agRunImgConnect(k){if(typeof svcOpenConnect==='function')svcOpenConnect(k);}
function agRunAccept(){const i=agRun.cur,st=agRun.steps[i];if(!st||st.status!=='ready')return;st.status='done';if(i+1<agRun.steps.length){agRunStartStep(i+1);}else{agRun.phase='done';renderAgents();}}
function agRunImgToggle(k){const st=agRun.steps[agRun.cur];if(!st||st.type!=='images')return;const idx=st.selected.indexOf(k);if(idx>=0)st.selected.splice(idx,1);else{if(st.selected.length>=2)st.selected.shift();st.selected.push(k);}renderAgents();}
// ---- Stato + dispatcher ----
let agView='grid',agSelId=null,agDetTab='overview',agRunStep=0;
function agSel(){return USER_AGENTS.find(x=>String(x.id)===String(agSelId));}
function openAgent(id){agSelId=id;agView='detail';agDetTab='overview';renderAgents();}
function agBackGrid(){agView='grid';agSelId=null;renderAgents();}
function renderAgents(){
  const body=document.getElementById('agBody');if(!body)return;
  let html;
  if(agView==='detail'&&agSel())html=agDetailView(agSel());
  else if(agView==='run'&&agSel())html=agRunView(agSel());
  else{agView='grid';html=agGridView();}
  body.innerHTML=html;
}
document.addEventListener('click',function(e){
  const op=e.target.closest('[data-agopen]');if(op){openAgent(op.dataset.agopen);return;}
  const ed=e.target.closest('[data-agedit]');if(ed){agOpen(ed.dataset.agedit);return;}
  const del=e.target.closest('[data-agdel]');if(del){agDelete(del.dataset.agdel);return;}
  if(e.target.closest('#agNew')){agNew();return;}
  const cr=e.target.closest('[data-agcrumb]');if(cr){const t=cr.dataset.agcrumb;if(t==='grid')agBackGrid();else if(t==='detail'){agView='detail';agDetTab='overview';renderAgents();}return;}
  const dt=e.target.closest('[data-agdtab]');if(dt){agDetTab=dt.dataset.agdtab;renderAgents();return;}
  if(e.target.closest('#agWfStart')){const a=agSel();if(a)agRunStart(a);return;}
  // --- run workflow ---
  if(e.target.closest('#agrGo')){agRunBegin();return;}
  if(e.target.closest('#agrMic')){agwDoRecord(document.getElementById('agrIdea'),document.getElementById('agrMic'));return;}
  if(e.target.closest('#agrChatMic')){agwDoRecord(document.getElementById('agrChatInput'),document.getElementById('agrChatMic'));return;}
  if(e.target.closest('#agrChatSend')){agRunSend();return;}
  if(e.target.closest('#agrAccept')){agRunAccept();return;}
  if(e.target.closest('#agrClose')){agView='detail';agDetTab='workflow';renderAgents();return;}
  const icn=e.target.closest('[data-imgconnect]');if(icn){agRunImgConnect(icn.dataset.imgconnect);return;}
  const aimg=e.target.closest('[data-agimg]');if(aimg){agRunImgToggle(+aimg.dataset.agimg);return;}
});
document.addEventListener('keydown',function(e){if(e.target&&e.target.id==='agrChatInput'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();agRunSend();}});
// ===================== WIZARD creazione agente (full-screen, guidato) =====================
let agwStep=1,agwBusy=false,agw={desc:'',title:'',understanding:'',questions:[],subAgents:[],workflow:[]};
function agWizOpen(){agwStep=1;agwBusy=false;agw={desc:'',title:'',understanding:'',questions:[],subAgents:[],workflow:[]};const w=document.getElementById('agWiz');if(w){w.classList.add('open');w.setAttribute('aria-hidden','false');}document.documentElement.classList.add('agwiz-open');agWizRender();}
function agWizClose(){const w=document.getElementById('agWiz');if(w){w.classList.remove('open');w.setAttribute('aria-hidden','true');}document.documentElement.classList.remove('agwiz-open');agwStopRec();}
function agWizDots(){let h='<div class="agw-steps">';for(let i=1;i<=3;i++)h+='<span class="agw-dot'+(i===agwStep?' on':(i<agwStep?' done':''))+'"></span>';return h+'</div>';}
const AGW_SPARK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>';
function agWizRender(){
  const b=document.getElementById('agWizBody');if(!b)return;
  if(agwBusy){b.innerHTML=agWizDots()+'<div class="agw-busy"><div class="agw-spin"></div><div>'+bdEsc(tr('agw_thinking'))+'</div></div>';return;}
  if(agwStep===2){b.innerHTML=agWizDots()+agWizStep2();agwRenderSubs();}
  else if(agwStep===3)b.innerHTML=agWizDots()+agWizStep3();
  else b.innerHTML=agWizDots()+agWizStep1();
  // focus
  setTimeout(()=>{try{if(agwStep===1){const t=document.getElementById('agwDesc');if(t){t.value=agw.desc||'';t.focus();}}if(agwStep===3){const t=document.getElementById('agwTitle');if(t)t.value=agw.title||'';}}catch(_){}},40);
}
function agWizStep1(){
  return '<div class="agw-h">'+bdEsc(tr('agw_s1_h'))+'</div><div class="agw-sub">'+bdEsc(tr('agw_s1_sub'))+'</div>'+
    '<div class="agw-desc-wrap"><textarea id="agwDesc" class="agw-ta" placeholder="'+bdEsc(tr('agw_s1_ph'))+'"></textarea>'+
    '<button class="agw-mic" id="agwMic" type="button" title="'+bdEsc(tr('agw_rec'))+'" aria-label="'+bdEsc(tr('agw_rec'))+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg></button></div>'+
    '<button class="agw-cta" id="agwNext1" type="button">'+bdEsc(tr('agw_continue'))+'</button>';
}
const AGW_MIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg>';
function agwSubCard(s,i){
  return '<div class="agw-subcard" data-si="'+i+'">'+
    '<div class="agw-subcard-h"><input class="agw-subname" placeholder="'+bdEsc(tr('ag_build_sub_name_ph'))+'" autocomplete="off" value="'+bdEsc(s.name||'')+'"><button class="agw-subdel" data-subdel2="'+i+'" type="button" aria-label="x"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div>'+
    '<div class="agw-subta-wrap"><textarea class="agw-subta" placeholder="'+bdEsc(tr('agw_sub_ops_ph'))+'">'+bdEsc(s.desc||'')+'</textarea>'+
    '<div class="agw-subta-tools"><button class="agw-submic" data-submic="'+i+'" type="button" title="'+bdEsc(tr('agw_rec'))+'" aria-label="'+bdEsc(tr('agw_rec'))+'">'+AGW_MIC+'</button>'+
    '<button class="agw-subai" data-subai="'+i+'" type="button">'+AGW_SPARK+'<span>'+bdEsc(tr('agw_refine'))+'</span></button></div></div>'+
    '</div>';
}
function agwRenderSubs(){
  const el=document.getElementById('agwSubs');if(!el)return;
  if(!agw.subAgents.length){el.innerHTML='<div class="ag-sub-empty">'+bdEsc(tr('ag_build_subs_empty'))+'</div>';return;}
  el.innerHTML=agw.subAgents.map((s,i)=>agwSubCard(s,i)).join('');
}
function agwSyncSubs(){
  const arr=[];document.querySelectorAll('#agwSubs .agw-subcard').forEach(c=>{const n=(c.querySelector('.agw-subname')||{}).value||'';const d=(c.querySelector('.agw-subta')||{}).value||'';arr.push({name:n,desc:d});});agw.subAgents=arr;
}
function agWizStep2(){
  let h='<div class="agw-bubble"><div class="agw-bubble-ai">'+AGW_SPARK+'<span>'+bdEsc(tr('agw_ai'))+'</span></div>'+bdEsc(agw.understanding||tr('agw_understood'))+'</div>';
  const hasQ=agw.questions&&agw.questions.length;
  if(hasQ){
    h+='<div class="agw-bubble"><div class="agw-bubble-ai">'+AGW_SPARK+'<span>'+bdEsc(tr('agw_q_title'))+'</span></div><div class="agw-qs">'+agw.questions.map(q=>'<div class="agw-q">'+bdEsc(q)+'</div>').join('')+'</div>'+
      '<textarea id="agwAns" class="agw-ta agw-ans" style="min-height:90px;padding:14px" placeholder="'+bdEsc(tr('agw_ans_ph'))+'"></textarea></div>'+
      '<button class="agw-cta" id="agwAnswer" type="button">'+bdEsc(tr('agw_answer'))+'</button><button class="agw-ghost" id="agwSkipQ" type="button">'+bdEsc(tr('agw_skip'))+'</button>';
  }
  h+='<div class="agw-sec-h">'+bdEsc(tr('agw_proposed_subs'))+'</div><div class="agw-subhint">'+bdEsc(tr('agw_subs_hint'))+'</div>';
  h+='<div class="agw-subcards" id="agwSubs"></div>';
  h+='<div class="agw-subquick2">'+AG_SUB_PRESETS.map(k=>'<button class="ag-sub-chip" data-subadd2="'+k+'" type="button">+ '+bdEsc(tr(k))+'</button>').join('')+'</div>';
  h+='<button class="ag-sub-add" id="agwAddSub" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>'+bdEsc(tr('ag_build_add_sub'))+'</span></button>';
  h+='<button class="agw-cta" id="agwNext2" type="button">'+bdEsc(tr('agw_continue'))+'</button>';
  return h;
}
function agWizStep3(){
  const wf=(agw.workflow&&agw.workflow.length)?agw.workflow:[];
  const steps=wf.length?('<div class="agw-wf">'+wf.map((w,i)=>'<div class="agw-wfstep"><div class="agw-wfnum">'+(i+1)+'</div><div class="agw-wftx"><div class="agw-wfname">'+bdEsc(w.step||w.name||('Step '+(i+1)))+'</div>'+((w.agents&&w.agents.length)?'<div class="agw-wfagents">'+bdEsc((w.agents||[]).join(' · '))+'</div>':'')+'</div></div>').join('')+'</div>'):('<div class="agw-sub" style="margin:0 0 20px">'+bdEsc(tr('agw_no_wf'))+'</div>');
  return '<div class="agw-h">'+bdEsc(tr('agw_s3_h'))+'</div><div class="agw-sub">'+bdEsc(tr('agw_s3_sub'))+'</div>'+
    '<div class="agw-sec-h">'+bdEsc(tr('agw_wf_title'))+'</div>'+steps+
    '<div class="agw-sec-h">'+bdEsc(tr('agw_name_title'))+'</div><input id="agwTitle" class="agw-titlein" autocomplete="off" value="'+bdEsc(agw.title||'')+'">'+
    '<button class="agw-cta" id="agwCreate" type="button">'+bdEsc(tr('agw_create'))+'</button>';
}
function agwParse(reply){let cfg=null;try{cfg=JSON.parse(reply);}catch(_){try{cfg=JSON.parse((String(reply).match(/\{[\s\S]*\}/)||[])[0]);}catch(__){}}return (cfg&&typeof cfg==='object')?cfg:null;}
function agwFallback(desc){
  agw.title=agw.title||desc.replace(/\s+/g,' ').trim().split(' ').slice(0,5).join(' ');
  agw.understanding=tr('agw_fb_understood').replace('%s',desc.slice(0,120));
  agw.questions=[];
  agw.subAgents=[{name:tr('ag_role_journalist'),desc:''},{name:tr('ag_role_designer'),desc:''},{name:tr('ag_role_social'),desc:''}];
  agw.workflow=[{step:tr('agw_fb_s1'),agents:[tr('ag_role_journalist')]},{step:tr('agw_fb_s2'),agents:[tr('ag_role_designer')]},{step:tr('agw_fb_s3'),agents:[tr('ag_role_social')]}];
}
async function agWizAnalyze(extraAnswers){
  const descEl=document.getElementById('agwDesc');if(descEl)agw.desc=(descEl.value||'').trim();
  if(!agw.desc)return;
  {const g=(typeof aiTry==='function')?aiTry():'ok';if(g==='upgrade'){if(typeof openUpgrade==='function')openUpgrade('ai');return;}if(g==='limit'){if(typeof showAiLimit==='function')showAiLimit();return;}}
  agwBusy=true;agWizRender();
  try{
    const prompt=agw.desc+(extraAnswers?('\n\n'+tr('agw_prompt_answers')+'\n'+extraAnswers):'');
    const reply=await aiChat({mode:'agent',messages:[{role:'user',text:prompt}]});
    const cfg=agwParse(reply);if(!cfg)throw new Error('parse');
    agw.title=cfg.title||agw.title||agw.desc.slice(0,40);
    agw.understanding=cfg.understanding||'';
    agw.questions=Array.isArray(cfg.questions)?cfg.questions.filter(Boolean):[];
    agw.subAgents=Array.isArray(cfg.subAgents)?cfg.subAgents.map(s=>({name:(s.name||s)||'',desc:s.desc||''})).filter(s=>s.name):[];
    agw.workflow=Array.isArray(cfg.workflow)?cfg.workflow.map(w=>({step:w.step||w.name||'',agents:Array.isArray(w.agents)?w.agents:(w.agents?[w.agents]:[])})):[];
    if(typeof aiConsume==='function')aiConsume();
  }catch(e){agwFallback(agw.desc);if(typeof showToast==='function')showToast(tr('agw_ai_offline'));}
  agwBusy=false;agwStep=2;agWizRender();
}
function agWizCreate(){
  const te=document.getElementById('agwTitle');const title=((te?te.value:agw.title)||'').trim()||agw.title||tr('ag_untitled');
  const subs=(agw.subAgents||[]).map(s=>({name:(s.name||'').trim(),desc:(s.desc||'').trim()})).filter(s=>s.name);
  const id='a'+Date.now().toString(36);
  USER_AGENTS.push({id,name:title,description:agw.understanding||agw.desc,subAgents:subs,tools:[],workflowPlan:agw.workflow||[],pal:agHash(id)%AG_PAL.length,createdAt:Date.now()});
  if(typeof saveAgents==='function')saveAgents();
  agWizClose();
  if(typeof go==='function')go('agents');
  agSelId=id;agView='detail';agDetTab='overview';renderAgents();
  if(typeof showToast==='function')showToast(tr('ag_created'));
}
// Audio del wizard (registra → trascrive via /transcribe) — generico: funziona su qualsiasi textarea+mic
let agwRec=null,agwChunks=[],agwStream=null,agwRecOn=false,agwRecMic=null;
function agwStopRec(){try{if(agwRec&&agwRec.state!=='inactive')agwRec.stop();}catch(_){}try{if(agwStream)agwStream.getTracks().forEach(t=>t.stop());}catch(_){}agwStream=null;agwRecOn=false;if(agwRecMic){agwRecMic.classList.remove('rec','loading');agwRecMic=null;}}
async function agwDoRecord(ta,mic){
  if(!ta||!mic)return;
  const hasRec=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
  if(!hasRec){if(typeof showToast==='function')showToast(tr('mt_no_voice'));return;}
  if(agwRecOn){try{if(agwRec&&agwRec.state!=='inactive')agwRec.stop();}catch(_){}return;}
  {const g=(typeof aiTry==='function')?aiTry():'ok';if(g==='upgrade'){if(typeof openUpgrade==='function')openUpgrade('ai');return;}if(g==='limit'){if(typeof showAiLimit==='function')showAiLimit();return;}}
  try{agwStream=await navigator.mediaDevices.getUserMedia({audio:true});}catch(e){if(typeof showToast==='function')showToast(tr('mic_denied'));return;}
  agwChunks=[];agwRecMic=mic;let mime='';try{['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'].some(t=>{if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t)){mime=t;return true;}return false;});}catch(_){}
  try{agwRec=mime?new MediaRecorder(agwStream,{mimeType:mime}):new MediaRecorder(agwStream);}catch(e){try{agwRec=new MediaRecorder(agwStream);}catch(_){if(typeof showToast==='function')showToast(tr('mic_err'));agwStopRec();return;}}
  agwRec.ondataavailable=e=>{if(e.data&&e.data.size)agwChunks.push(e.data);};
  agwRec.onstop=async()=>{
    agwRecOn=false;mic.classList.remove('rec');mic.classList.add('loading');try{if(agwStream)agwStream.getTracks().forEach(t=>t.stop());}catch(_){}agwStream=null;
    try{const blob=new Blob(agwChunks,{type:(agwRec&&agwRec.mimeType)||mime||'audio/webm'});if(!blob.size){mic.classList.remove('loading');agwRecMic=null;return;}
      const dataUrl=await blobToDataUrl(blob);
      const r=await fetch(FN_BASE+'/.netlify/functions/transcribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audio:dataUrl,lang:(typeof LANG!=='undefined'?LANG:'it')})});
      const d=await r.json().catch(()=>({}));
      if(r.ok&&d&&d.text){ta.value=(ta.value?ta.value.replace(/\s*$/,'')+'\n':'')+d.text;try{ta.dispatchEvent(new Event('input',{bubbles:true}));}catch(_){}if(typeof aiConsume==='function')aiConsume();}
      else if(typeof showToast==='function')showToast((d&&d.error)||tr('mic_err'));
    }catch(e){if(typeof showToast==='function')showToast(tr('mic_err'));}
    mic.classList.remove('loading');agwRecMic=null;
  };
  agwRecOn=true;mic.classList.add('rec');try{agwRec.start();}catch(e){agwRecOn=false;mic.classList.remove('rec');agwStopRec();}
}
function agwToggleRec(){agwDoRecord(document.getElementById('agwDesc'),document.getElementById('agwMic'));}
function agwRecordCard(i){const card=document.querySelector('#agwSubs .agw-subcard[data-si="'+i+'"]');if(!card)return;agwDoRecord(card.querySelector('.agw-subta'),card.querySelector('.agw-submic'));}
// L'AI riscrive in modo pulito/operativo le istruzioni del sub-agente
async function agwRefineSub(i){
  agwSyncSubs();const s=agw.subAgents[i];if(!s)return;
  const card=document.querySelector('#agwSubs .agw-subcard[data-si="'+i+'"]');if(!card)return;
  const ta=card.querySelector('.agw-subta'),btn=card.querySelector('.agw-subai');
  if(!(s.desc||'').trim()){if(typeof showToast==='function')showToast(tr('agw_refine_empty'));return;}
  {const g=(typeof aiTry==='function')?aiTry():'ok';if(g==='upgrade'){if(typeof openUpgrade==='function')openUpgrade('ai');return;}if(g==='limit'){if(typeof showAiLimit==='function')showAiLimit();return;}}
  if(btn){btn.classList.add('loading');btn.disabled=true;}
  try{
    const prompt=tr('agw_refine_prompt').replace('%name',s.name||'').replace('%agent',agw.title||agw.desc||'').replace('%desc',s.desc);
    const reply=await aiChat({mode:'assistant',messages:[{role:'user',text:prompt}]});
    const clean=(reply||'').trim();
    if(clean){s.desc=clean;if(ta)ta.value=clean;if(typeof aiConsume==='function')aiConsume();}
    else throw new Error('empty');
  }catch(e){if(typeof showToast==='function')showToast(tr('agw_ai_offline'));}
  if(btn){btn.classList.remove('loading');btn.disabled=false;}
}
// Handlers wizard
{const bk=document.getElementById('agWizBack');if(bk)bk.addEventListener('click',()=>{if(agwBusy)return;if(agwStep>1){agwStep--;agWizRender();}else agWizClose();});}
document.addEventListener('click',function(e){
  if(!e.target.closest('#agWiz'))return;
  if(e.target.closest('#agwMic')){agwToggleRec();return;}
  const smic=e.target.closest('[data-submic]');if(smic){agwRecordCard(+smic.dataset.submic);return;}
  const sai=e.target.closest('[data-subai]');if(sai){agwRefineSub(+sai.dataset.subai);return;}
  const sdel=e.target.closest('[data-subdel2]');if(sdel){agwSyncSubs();agw.subAgents.splice(+sdel.dataset.subdel2,1);agwRenderSubs();return;}
  if(e.target.closest('#agwAddSub')){agwSyncSubs();agw.subAgents.push({name:'',desc:''});agwRenderSubs();setTimeout(()=>{const cs=document.querySelectorAll('#agwSubs .agw-subcard');const last=cs[cs.length-1];if(last){const inp=last.querySelector('.agw-subname');if(inp)inp.focus();}},30);return;}
  const sadd=e.target.closest('[data-subadd2]');if(sadd){agwSyncSubs();agw.subAgents.push({name:tr(sadd.dataset.subadd2),desc:''});agwRenderSubs();return;}
  if(e.target.closest('#agwNext1')){agWizAnalyze('');return;}
  if(e.target.closest('#agwAnswer')){const a=(document.getElementById('agwAns')||{}).value||'';agWizAnalyze(a.trim());return;}
  if(e.target.closest('#agwSkipQ')){agwSyncSubs();agw.questions=[];agWizRender();return;}
  if(e.target.closest('#agwNext2')){agwSyncSubs();agwStep=3;agWizRender();return;}
  if(e.target.closest('#agwCreate')){agWizCreate();return;}
});
// ===== Servizio Agenti locale (Mastra) — V0 gira in locale su questa macchina =====
// Override possibile: localStorage 'workie_agent_svc'. Default: servizio Mastra dev.
let agPendingKey='';
function agSvcUrl(){try{return (localStorage.getItem('workie_agent_svc')||'').trim()||'http://localhost:4111';}catch(_){return 'http://localhost:4111';}}
// Agenti che hanno un endpoint eseguibile reale nel servizio locale (V0: solo Content Analyst).
const AG_RUNNABLE={'content-analyst':{path:'/custom/content-analyst'}};
// ===== Crea Agente: intake (descrizione o preset) → l'AI genera la config → modifica → salva =====
const AG_PRESETS=[
  {id:'analyst',name:'Content Analyst',dk:'ag_p_analyst',key:'content-analyst',prompt:'Analizza articoli e URL ed estrai un brief strutturato: la storia principale, i fatti, i numeri importanti e l’angolo. Scarta le informazioni irrilevanti.'},
  {id:'carousel',name:'Carousel Writer',dk:'ag_p_carousel',prompt:'Trasforma un articolo in uno script per un carosello Instagram. Massimo 8 slide, frasi brevi, evidenzia numeri e dati chiave, niente clickbait, mantieni l’accuratezza dei fatti e chiudi con una CTA utile.'},
  {id:'visual',name:'Visual Director',dk:'ag_p_visual',prompt:'Definisci layout, gerarchia visiva e contenuti pronti per un template Figma a partire da uno script di carosello.'},
  {id:'brand',name:'Brand Guardian',dk:'ag_p_brand',prompt:'Controlla gli output rispetto alle linee guida del brand: tono di voce, numero di slide, stile dei titoli, clickbait, CTA, tipografia e claim dubbi. Segnala cosa correggere.'},
  {id:'event',name:'Event Copywriter',dk:'ag_p_event',prompt:'Crea copy per LinkedIn e Instagram per promuovere un evento, con CTA e varianti, a partire da data, luogo, speaker e descrizione.'},
  {id:'research',name:'Researcher',dk:'ag_p_research',prompt:'Cerca informazioni affidabili su un argomento e sintetizzale in punti chiave, citando le fonti.'},
  {id:'email',name:'Email Assistant',dk:'ag_p_email',prompt:'Scrivi e riassumi email professionali: tono adeguato, sintesi dei punti d’azione e risposte pronte.'}
];
let agEditingId=null,agBuildSubs=[],agCurKey='',agSubRoot=null;
// Ruoli pronti per i sub-agenti (chip rapide)
const AG_SUB_PRESETS=['ag_role_journalist','ag_role_designer','ag_role_marketing','ag_role_social','ag_role_copy','ag_role_research'];
const AG_SUBDEL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
function agEsc2(v){return bdEsc(v==null?'':String(v));}
function agRenderSubList(){
  const el=agSubRoot?agSubRoot.querySelector('.ag-subbuild'):null;if(!el)return;
  if(!agBuildSubs.length){el.innerHTML='<div class="ag-sub-empty">'+agEsc2(tr('ag_build_subs_empty'))+'</div>';return;}
  el.innerHTML=agBuildSubs.map((s,i)=>'<div class="ag-sub-row" data-idx="'+i+'"><input class="ag-in ag-sub-name" placeholder="'+agEsc2(tr('ag_build_sub_name_ph'))+'" autocomplete="off" value="'+agEsc2(s.name)+'"><input class="ag-in ag-sub-desc" placeholder="'+agEsc2(tr('ag_build_sub_desc_ph'))+'" autocomplete="off" value="'+agEsc2(s.desc)+'"><button class="ag-sub-del" data-subdel="'+i+'" type="button" aria-label="x">'+AG_SUBDEL+'</button></div>').join('');
}
function agRenderSubQuick(){
  const el=agSubRoot?agSubRoot.querySelector('.ag-subquick'):null;if(!el)return;
  el.innerHTML=AG_SUB_PRESETS.map(k=>'<button class="ag-sub-chip" data-subadd="'+k+'" type="button">+ '+agEsc2(tr(k))+'</button>').join('');
}
function agSyncSubInputs(){
  if(!agSubRoot)return;const arr=[];agSubRoot.querySelectorAll('.ag-sub-row').forEach(r=>{const n=(r.querySelector('.ag-sub-name')||{}).value||'';const d=(r.querySelector('.ag-sub-desc')||{}).value||'';arr.push({name:n,desc:d});});agBuildSubs=arr;
}
function agAddSub(name,desc){
  agSyncSubInputs();agBuildSubs.push({name:name||'',desc:desc||''});agRenderSubList();
  setTimeout(()=>{const rows=agSubRoot?agSubRoot.querySelectorAll('.ag-sub-row'):[];const last=rows[rows.length-1];if(last){const inp=last.querySelector(name?'.ag-sub-desc':'.ag-sub-name');if(inp)inp.focus();}},30);
}
function agRemoveSub(i){agSyncSubInputs();agBuildSubs.splice(i,1);agRenderSubList();}
function agCloseModal(){const m=document.getElementById('agModal');if(m)m.classList.remove('open');}
function agOpenBuilder(id){
  const a=id?USER_AGENTS.find(x=>String(x.id)===String(id)):null;
  agEditingId=a?a.id:null;
  agBuildSubs=(a&&Array.isArray(a.subAgents))?a.subAgents.map(s=>({name:s.name||'',desc:s.desc||''})):[];
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v||'';};
  set('agFName',a?a.name:'');set('agFDesc',a?(a.description||a.goal||''):'');set('agFTools',(a&&a.tools)?a.tools.join(', '):'');
  const tt=document.getElementById('agBuildTitle');if(tt)tt.textContent=tr(a?'ag_edit_title':'ag_new');
  agSubRoot=document.getElementById('agModal');
  agRenderSubList();agRenderSubQuick();
  const m=document.getElementById('agModal');if(m)m.classList.add('open');
  setTimeout(()=>{try{document.getElementById('agFName').focus();}catch(_){}},60);
}
function agNew(){agWizOpen();}
function agOpen(id){agOpenBuilder(id);}
function agSave(){
  const val=id=>((document.getElementById(id)||{}).value||'').trim();
  const name=val('agFName');if(!name){const n=document.getElementById('agFName');if(n)n.focus();return;}
  agSyncSubInputs();
  const subs=agBuildSubs.map(s=>({name:(s.name||'').trim(),desc:(s.desc||'').trim()})).filter(s=>s.name);
  const description=val('agFDesc');
  const tools=val('agFTools').split(',').map(t=>t.trim()).filter(Boolean);
  const wasEdit=!!agEditingId;let id=agEditingId;
  if(wasEdit){const a=USER_AGENTS.find(x=>String(x.id)===String(agEditingId));if(a){a.name=name;a.description=description;a.subAgents=subs;a.tools=tools;a.desc=description;}}
  else{id='a'+Date.now().toString(36);USER_AGENTS.push({id,name,description,subAgents:subs,tools,desc:description,pal:agHash(id)%AG_PAL.length,createdAt:Date.now()});}
  saveAgents();agEditingId=null;agCloseModal();
  agSelId=id;agView='detail';agDetTab='overview';renderAgents();
  if(typeof showToast==='function')showToast(tr(wasEdit?'ag_saved':'ag_created'));
}
// ===== Prova agente: invoca il servizio Agenti locale e mostra il risultato strutturato =====
function agOpenTest(){
  const key=agCurKey;const cfg=AG_RUNNABLE[key];if(!cfg)return;
  const ov=document.getElementById('agTestOv');if(!ov)return;
  const t=document.getElementById('agTestTitle');if(t)t.textContent=((document.getElementById('agFName')||{}).value||'Content Analyst');
  const out=document.getElementById('agTestOut');if(out)out.innerHTML='';
  ov.classList.add('open');
  setTimeout(()=>{try{document.getElementById('agTestInput').focus();}catch(_){}},60);
}
function agCloseTest(){const ov=document.getElementById('agTestOv');if(ov)ov.classList.remove('open');}
function agEscHtml(s){return bdEsc(String(s==null?'':s));}
function agList(arr){arr=Array.isArray(arr)?arr.filter(x=>String(x||'').trim()):[];if(!arr.length)return '<span class="ag-r-empty">—</span>';return '<ul class="ag-r-list">'+arr.map(x=>'<li>'+agEscHtml(x)+'</li>').join('')+'</ul>';}
function agRenderResult(r){
  const row=(label,val)=>'<div class="ag-r-row"><div class="ag-r-k">'+agEscHtml(label)+'</div><div class="ag-r-v">'+val+'</div></div>';
  let html='<div class="ag-r-card">';
  html+=row(tr('ag_r_topic'),agEscHtml(r.topic));
  html+=row(tr('ag_r_angle'),agEscHtml(r.angle));
  html+=row(tr('ag_r_summary'),agEscHtml(r.summary));
  html+=row(tr('ag_r_facts'),agList(r.keyFacts));
  html+=row(tr('ag_r_numbers'),agList(r.keyNumbers));
  html+=row(tr('ag_r_people'),agList(r.peopleOrCompanies));
  html+=row(tr('ag_r_hook'),agEscHtml(r.potentialHook));
  html+=row(tr('ag_r_context'),agList(r.importantContext));
  if((r.warnings||[]).length)html+=row('⚠️ '+tr('ag_r_warnings'),agList(r.warnings));
  html+='</div>';
  html+='<details class="ag-r-raw"><summary>'+agEscHtml(tr('ag_r_raw'))+'</summary><pre>'+agEscHtml(JSON.stringify(r,null,2))+'</pre></details>';
  return html;
}
async function agRunTest(){
  const key=agCurKey;const cfg=AG_RUNNABLE[key];if(!cfg)return;
  const text=((document.getElementById('agTestInput')||{}).value||'').trim();
  const out=document.getElementById('agTestOut');const btn=document.getElementById('agTestRun');
  if(!text){if(out)out.innerHTML='<div class="ag-test-msg ag-test-err">'+agEscHtml(tr('ag_test_notext'))+'</div>';return;}
  if(btn){btn.classList.add('loading');btn.disabled=true;}
  if(out)out.innerHTML='<div class="ag-test-msg ag-test-run"><span class="ag-spin"></span>'+agEscHtml(tr('ag_test_running'))+'</div>';
  try{
    const res=await fetch(agSvcUrl()+cfg.path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
    let data=null;try{data=await res.json();}catch(_){}
    if(!res.ok||!data||data.ok!==true){
      const err=(data&&data.error)?data.error:('HTTP '+res.status);
      if(out)out.innerHTML='<div class="ag-test-msg ag-test-err">'+agEscHtml(tr('ag_test_failed'))+'<br><small>'+agEscHtml(err)+'</small></div>';
    }else{
      if(out)out.innerHTML='<div class="ag-test-ok">'+agEscHtml(tr('ag_test_done'))+'</div>'+agRenderResult(data.result||{});
    }
  }catch(e){
    // Tipico: servizio locale non avviato (fetch fallita) → messaggio chiaro + hint.
    if(out)out.innerHTML='<div class="ag-test-msg ag-test-err">'+agEscHtml(tr('ag_test_offline'))+'<br><small>'+agEscHtml(agSvcUrl())+'</small></div>';
  }
  if(btn){btn.classList.remove('loading');btn.disabled=false;}
}
{const tb=document.getElementById('agTestBtn');if(tb)tb.addEventListener('click',agOpenTest);}
{const tx=document.getElementById('agTestX');if(tx)tx.addEventListener('click',agCloseTest);}
{const tr2=document.getElementById('agTestRun');if(tr2)tr2.addEventListener('click',agRunTest);}
{const ov=document.getElementById('agTestOv');if(ov)ov.addEventListener('click',e=>{if(e.target.id==='agTestOv')agCloseTest();});}
{const x=document.getElementById('agModalX');if(x)x.addEventListener('click',agCloseModal);}
{const sv=document.getElementById('agSaveBtn');if(sv)sv.addEventListener('click',agSave);}
document.addEventListener('click',function(e){
  if(e.target.closest('.ag-sub-add')){agAddSub('','');return;}
  const qc=e.target.closest('[data-subadd]');if(qc){agAddSub(tr(qc.dataset.subadd),'');return;}
  const sd=e.target.closest('[data-subdel]');if(sd){agRemoveSub(+sd.dataset.subdel);return;}
});
{const m=document.getElementById('agModal');if(m)m.addEventListener('click',e=>{if(e.target.id==='agModal')agCloseModal();});}
// ===== Drag stile Apple sulle tile agenti (riordina + crea cartelle) =====
let agJustDragged=false;
document.addEventListener('pointerdown',function(e){
  if(e.button!==undefined&&e.button!==0)return;
  const tile=e.target.closest('#agTiles .ag-tile');if(!tile)return;
  const key=tile.dataset.agtile,sx=e.clientX,sy=e.clientY;
  let started=false,clone=null,ox=0,oy=0,combineEl=null,insertIdx=null;
  const allTiles=function(){return Array.prototype.slice.call(document.querySelectorAll('#agTiles .ag-tile'));};
  function onMove(ev){
    const dx=ev.clientX-sx,dy=ev.clientY-sy;
    if(!started){ if(Math.hypot(dx,dy)<6)return; started=true;
      const r=tile.getBoundingClientRect();ox=sx-r.left;oy=sy-r.top;
      clone=tile.cloneNode(true);clone.classList.add('ag-tile-clone');clone.style.width=r.width+'px';clone.style.left=(ev.clientX-ox)+'px';clone.style.top=(ev.clientY-oy)+'px';document.body.appendChild(clone);
      tile.classList.add('ag-tile-ghost');document.body.classList.add('ag-dragging');
    }
    clone.style.left=(ev.clientX-ox)+'px';clone.style.top=(ev.clientY-oy)+'px';
    combineEl=null;insertIdx=null;allTiles().forEach(function(t){t.classList.remove('ag-combine');});
    let over=null;allTiles().forEach(function(t){if(t===tile)return;const r=t.getBoundingClientRect();if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom)over=t;});
    const canCombine=(key.indexOf('a:')===0);
    if(over&&canCombine){const r=over.getBoundingClientRect();if(Math.abs(ev.clientX-(r.left+r.width/2))<r.width*0.32&&Math.abs(ev.clientY-(r.top+r.height/2))<r.height*0.32){combineEl=over;over.classList.add('ag-combine');}}
    if(!combineEl){const list=allTiles().filter(function(t){return t!==tile;});let idx=list.length;for(let i=0;i<list.length;i++){const r=list[i].getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;if(ev.clientY<cy-r.height*0.35||(ev.clientY<=cy+r.height*0.35&&ev.clientX<cx)){idx=i;break;}}insertIdx=idx;}
  }
  function onUp(ev){
    document.removeEventListener('pointermove',onMove);document.removeEventListener('pointerup',onUp);
    if(!started)return;
    if(clone)clone.remove();tile.classList.remove('ag-tile-ghost');document.body.classList.remove('ag-dragging');
    allTiles().forEach(function(t){t.classList.remove('ag-combine');});
    if(combineEl){agCombine(key,combineEl.dataset.agtile);}else if(insertIdx!==null){agReorder(key,insertIdx);}
    agJustDragged=true;setTimeout(function(){agJustDragged=false;},60);
    renderAgents();
  }
  document.addEventListener('pointermove',onMove);
  document.addEventListener('pointerup',onUp);
});
// apertura tile (se non è stato un drag)
document.addEventListener('click',function(e){
  const til=e.target.closest('#agTiles .ag-tile');if(til&&!agJustDragged){const k=til.dataset.agtile;if(k.indexOf('a:')===0)agOpen(k.slice(2));else if(k.indexOf('f:')===0)agOpenFolder(k.slice(2));}
});
// ===== Overlay cartella =====
let agCurFolder=null;
function agOpenFolder(id){
  const f=AG_FOLDERS.find(function(x){return String(x.id)===String(id);});if(!f)return;agCurFolder=id;
  const nm=document.getElementById('agFolderName');if(nm)nm.value=f.name||tr('ag_folder');
  agRenderFolder();const ov=document.getElementById('agFolderOv');if(ov)ov.classList.add('open');
}
function agCloseFolder(){const ov=document.getElementById('agFolderOv');if(ov)ov.classList.remove('open');agCurFolder=null;renderAgents();}
function agRenderFolder(){
  const f=AG_FOLDERS.find(function(x){return String(x.id)===String(agCurFolder);});const grid=document.getElementById('agFolderGrid');if(!grid)return;
  if(!f){agCloseFolder();return;}
  grid.innerHTML=(f.agents||[]).map(function(id){var a=USER_AGENTS.find(function(x){return String(x.id)===String(id);});if(!a)return '';return '<div class="ag-fi" data-agfi="'+bdEsc(String(a.id))+'"><button class="ag-fi-x" data-agfix="'+bdEsc(String(a.id))+'" type="button" aria-label="'+bdEsc(tr('ag_fi_remove'))+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button><div class="ag-tile-ic">'+(a.icon||AG_ICON)+'</div><div class="ag-tile-name">'+bdEsc(a.name||tr('ag_untitled'))+'</div></div>';}).join('');
}
function agFolderRemove(aid){
  const f=AG_FOLDERS.find(function(x){return String(x.id)===String(agCurFolder);});if(!f)return;
  f.agents=(f.agents||[]).filter(function(id){return String(id)!==String(aid);});
  if(AG_ORDER.indexOf('a:'+aid)<0)AG_ORDER.splice(0,0,'a:'+aid); // torna in cima alla griglia
  agSyncOrder();
  if(!AG_FOLDERS.some(function(x){return String(x.id)===String(agCurFolder);})){agCloseFolder();return;}
  agRenderFolder();
}
{const fx=document.getElementById('agFolderX');if(fx)fx.addEventListener('click',agCloseFolder);}
{const ov=document.getElementById('agFolderOv');if(ov)ov.addEventListener('click',function(e){if(e.target.id==='agFolderOv')agCloseFolder();});}
{const nm=document.getElementById('agFolderName');if(nm)nm.addEventListener('input',function(){const f=AG_FOLDERS.find(function(x){return String(x.id)===String(agCurFolder);});if(f){f.name=nm.value;saveAgFolders();}});}
{const grid=document.getElementById('agFolderGrid');if(grid)grid.addEventListener('click',function(e){const x=e.target.closest('[data-agfix]');if(x){e.stopPropagation();agFolderRemove(x.dataset.agfix);return;}const it=e.target.closest('[data-agfi]');if(it){agCloseFolder();agOpen(it.dataset.agfi);}});}
// tabs
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
}));

// ---------- Projects + Whiteboard ----------
function bdEsc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function projDefault(){return {seq:1,iseq:1,list:[]};}
function loadPRJ(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_projects')));if(s&&Array.isArray(s.list)){s.list=s.list.filter(p=>p&&typeof p==='object').map(p=>{const b=(p.board&&typeof p.board==='object')?p.board:{};return {...p,id:p.id!=null?p.id:0,name:p.name||'Progetto',board:{pan:(b.pan&&typeof b.pan==='object')?b.pan:{x:60,y:50},zoom:b.zoom||1,items:Array.isArray(b.items)?b.items:[]}};});if(!s.seq)s.seq=Math.max(0,...s.list.map(p=>p.id||0))+1;if(!s.iseq)s.iseq=1;return s;}}catch(e){}return null;}
let PRJ=loadPRJ()||projDefault();
function prjSave(){try{localStorage.setItem(ukey('workie_projects'),JSON.stringify(PRJ));}catch(e){}}
// pulizia una-tantum: rimuove i vecchi progetti campione se non modificati (board vuota)
(function(){const samples=['Article Automation','Campagna Estate','Piano Editoriale'];if(PRJ.list.length&&PRJ.list.every(p=>samples.includes(p.name)&&!(p.board&&p.board.items&&p.board.items.length))){PRJ.list=[];PRJ.seq=1;PRJ.iseq=1;prjSave();}})();
let curProjId=null;
function curProj(){return PRJ.list.find(p=>p.id===curProjId)||PRJ.list[0];}

function teamNameById(tid){try{const t=TEAMS.find(x=>x.tid===tid);return t?teamName(t):null;}catch(e){return null;}}
function renderProjGrid(){
  const g=document.getElementById('projGrid');if(!g)return;
  g.innerHTML=PRJ.list.map(p=>{
    const tn=p.tid!=null?teamNameById(p.tid):null;
    const badge=tn?`<div class="proj-team">${SVG.team}<span>${bdEsc(tn)}</span></div>`:'';
    return `<div class="proj-card${tn?' proj-team-card':''}" data-popen="${p.id}"><span class="proj-del" data-pdel="${p.id}">${SVG.x}</span><div class="proj-ic">${p.icon||'📁'}</div><div class="proj-name">${bdEsc(p.name)}</div>${badge}<div class="proj-foot">${(p.board&&p.board.items?p.board.items.length:0)} ${tr('pf_items')}</div></div>`;
  }).join('')
    +`<div class="proj-card proj-new" id="projNewCard"><div class="proj-ic">${SVG.plus}</div><div class="proj-name">${tr('new_project_short')}</div></div>`;
}
function openProject(id){curProjId=id;bdSel=null;bdUndo=[];bdRedo=[];pdFolder=null;bdSetTool('select');const p=curProj();document.getElementById('projTitle').textContent=p.name;go('projectdetail');document.querySelectorAll('#pdTabs .pd-tab').forEach(t=>t.classList.toggle('active',t.dataset.pdtab==='board'));document.querySelectorAll('.pd-page .pd-pane').forEach(pn=>pn.classList.toggle('active',pn.dataset.pdpane==='board'));renderBoard();pdRefreshCounts();}
// ===== Progetto = spazio di lavoro (schede) =====
function projectTasks(){return TASKS.filter(t=>t.projectId===curProjId);}
function pdRefreshCounts(){const p=curProj();if(!p)return;const tc=projectTasks().length,fc=(p.files||[]).filter(f=>f.kind!=='folder').length;const te=document.getElementById('pdTaskCount'),fe=document.getElementById('pdFileCount');if(te){te.textContent=tc;te.style.display=tc?'inline-block':'none';}if(fe){fe.textContent=fc;fe.style.display=fc?'inline-block':'none';}}
let pdFolder=null;
function pdTab(tab){document.querySelectorAll('#pdTabs .pd-tab').forEach(t=>t.classList.toggle('active',t.dataset.pdtab===tab));document.querySelectorAll('.pd-page .pd-pane').forEach(p=>p.classList.toggle('active',p.dataset.pdpane===tab));const sub=document.getElementById('projSub');if(sub)sub.style.display=tab==='board'?'':'none';if(tab==='board')renderBoard();else if(tab==='tasks')renderPdTasks();else if(tab==='files')renderPdFiles();else if(tab==='members')renderPdMembers();}
function renderPdTasks(){const list=document.getElementById('pdTasksList');if(!list)return;const ts=projectTasks();list.innerHTML=ts.length?ts.map(taskRow).join(''):`<div class="pd-empty">${tr('pd_no_tasks')}</div>`;pdRefreshCounts();
  const sel=document.getElementById('pdGroupSel');if(sel){const cur=projLinkedGroup(curProjId);sel.innerHTML='<option value="">'+tr('proj_link_none')+'</option>'+GROUPS.map(g=>'<option value="'+g.id+'"'+(cur===g.id?' selected':'')+'>'+bdEsc(g.name)+'</option>').join('');sel.value=cur!=null?String(cur):'';}
}
document.getElementById('pdGroupSel').addEventListener('change',e=>{
  const gid=e.target.value===''?null:+e.target.value;
  const curG=projLinkedGroup(curProjId);
  if(curG!=null){const g0=GROUPS.find(x=>x.id===curG);grpSetLink(g0,null);}
  if(gid!=null){const g=GROUPS.find(x=>x.id===gid);grpSetLink(g,curProjId);}
  saveGroups();renderPdTasks();if(typeof renderTasks==='function')renderTasks();if(typeof renderHomeAlerts==='function')renderHomeAlerts();
});
function pdFileById(id){return (curProj().files||[]).find(f=>f.id===id);}
function pdNormalizeFiles(){const all=curProj().files||[];let max=all.reduce((m,f)=>Math.max(m,f.id||0),0),changed=false;all.forEach(f=>{if(f.id==null){f.id=++max;changed=true;}if(!f.kind){f.kind='file';changed=true;}if(f.parent===undefined){f.parent=null;changed=true;}});if(changed)prjSave();return max;}
function renderPdFiles(){const list=document.getElementById('pdFilesList');if(!list)return;pdNormalizeFiles();const all=curProj().files||[];
  if(pdFolder!=null&&!pdFileById(pdFolder))pdFolder=null;
  const crumb=document.getElementById('pdFileCrumb');
  if(pdFolder!=null){let path=[],cur=pdFileById(pdFolder);while(cur){path.unshift(cur);cur=cur.parent!=null?pdFileById(cur.parent):null;}crumb.style.display='flex';crumb.innerHTML=`<span class="pd-crumb-i" data-pdcrumb="root">${tr('pd_files')}</span>`+path.map(f=>`<span class="pd-crumb-sep">/</span><span class="pd-crumb-i" data-pdcrumb="${f.id}">${bdEsc(f.name)}</span>`).join('');}
  else crumb.style.display='none';
  const here=all.filter(f=>(f.parent!=null?f.parent:null)===pdFolder);
  const folders=here.filter(f=>f.kind==='folder'),files=here.filter(f=>f.kind!=='folder');
  let html=folders.map(f=>`<div class="pd-frow"><span class="fic">${SVG.folder}</span><span class="fname" data-pdfolder="${f.id}">${bdEsc(f.name)}</span><span class="frm" data-pdfrm="${f.id}">${SVG.x}</span></div>`).join('')
    +files.map(f=>{const isE=f.kind==='doc'||f.kind==='sheet';const ic=f.kind==='doc'?SVG.doc:f.kind==='sheet'?SVG.sheet:SVG.file;const openAttr=isE?`data-pdedit="${f.id}"`:`data-pdfopen="${f.id}"`;return `<div class="pd-frow"><span class="fic">${ic}</span><span class="fname" ${openAttr}>${bdEsc(f.name)}</span><span class="frm" data-pdfrm="${f.id}">${SVG.x}</span></div>`;}).join('');
  list.innerHTML=html||`<div class="pd-empty">${tr('pd_no_files')}</div>`;pdRefreshCounts();}
function renderPdMembers(){const list=document.getElementById('pdMembersList');if(!list)return;const p=curProj();const rows=[];const mi=(USER.name||'U').trim().charAt(0).toUpperCase();rows.push(`<div class="pd-mrow"><span class="pd-av">${mi}</span><span class="mname">${bdEsc(USER.name||'Tu')}</span><span class="mrole">${tr('pd_you')}</span></div>`);if(p.tid!=null){const t=TEAMS.find(x=>x.tid===p.tid);if(t&&Array.isArray(t.members))t.members.forEach(m=>{if(m&&m.name&&m.name!==USER.name)rows.push(`<div class="pd-mrow"><span class="pd-av">${(m.name||'?').charAt(0).toUpperCase()}</span><span class="mname">${bdEsc(m.name)}</span><span class="mrole">${m.admin?'Admin':''}</span></div>`);});}list.innerHTML=rows.join('');}
document.getElementById('pdTabs').addEventListener('click',e=>{const t=e.target.closest('.pd-tab');if(t)pdTab(t.dataset.pdtab);});
function pdAddTask(){const inp=document.getElementById('pdTaskInput');const name=inp.value.trim();if(!name)return;if(!guardTask())return;const p=curProj();const task={id:++TID,title:name,scope:(p.tid!=null?('team:'+p.tid):'personal'),done:false,projectId:curProjId};const lg=projLinkedGroup(curProjId);if(lg!=null)task.gid=lg;TASKS.push(task);tasksTodayInc();saveTasks();inp.value='';renderPdTasks();if(typeof renderTasks==='function')renderTasks();if(typeof renderHomeAlerts==='function')renderHomeAlerts();}
document.getElementById('pdTaskAdd').addEventListener('click',pdAddTask);
document.getElementById('pdTaskInput').addEventListener('keydown',e=>{if(e.key==='Enter')pdAddTask();});
document.getElementById('pdTasksList').addEventListener('click',e=>{const lb=e.target.closest('.lvl-btn');if(lb){const t=TASKS.find(x=>x.id==lb.dataset.id);if(t&&t.level){t.level.cur=Math.max(0,Math.min(t.level.tgt,t.level.cur+(lb.dataset.act==='inc'?1:-1)));t.done=t.level.cur>=t.level.tgt;saveTasks();renderPdTasks();}return;}const ck=e.target.closest('.check');if(ck){const t=TASKS.find(x=>x.id==ck.dataset.id);if(t){setTaskDone(t,!t.done);saveTasks();renderPdTasks();}return;}const row=e.target.closest('.task[data-id]');if(row)openTaskPage(+row.dataset.id);});
document.getElementById('pdFileAdd').addEventListener('click',()=>document.getElementById('pdFileInput').click());
document.getElementById('pdFolderAdd').addEventListener('click',()=>{const name=(window.prompt(tr('pd_folder_name'))||'').trim();if(!name)return;const p=curProj();if(!p.files)p.files=[];const max=pdNormalizeFiles();p.files.push({id:max+1,kind:'folder',name,parent:pdFolder});prjSave();renderPdFiles();});
document.getElementById('pdFileInput').addEventListener('change',e=>{const p=curProj();if(!p.files)p.files=[];const fs=[...e.target.files];let pending=fs.length;if(!pending)return;const dest=pdFolder;fs.forEach(f=>{const r=new FileReader();r.onload=ev=>{const id=(p.files.reduce((m,x)=>Math.max(m,x.id||0),0))+1;p.files.push({id,kind:'file',name:f.name,type:f.type,data:ev.target.result,parent:dest});pending--;if(pending<=0){prjSave();renderPdFiles();}};r.readAsDataURL(f);});e.target.value='';});
document.getElementById('pdFilesList').addEventListener('click',e=>{
  const fo=e.target.closest('[data-pdfolder]');if(fo){pdFolder=+fo.dataset.pdfolder;renderPdFiles();return;}
  const ed=e.target.closest('[data-pdedit]');if(ed){openFileEditor(+ed.dataset.pdedit);return;}
  const op=e.target.closest('[data-pdfopen]');if(op){const f=pdFileById(+op.dataset.pdfopen);if(f&&f.data){const a=document.createElement('a');a.href=f.data;a.download=f.name;document.body.appendChild(a);a.click();a.remove();}return;}
  const rm=e.target.closest('[data-pdfrm]');if(rm){const id=+rm.dataset.pdfrm;const f=pdFileById(id);askConfirm(tr(f&&f.kind==='folder'?'pd_folder_del':'pd_file_del'),()=>{const toRm=new Set([id]);let grew=true;while(grew){grew=false;(curProj().files||[]).forEach(x=>{if(x.parent!=null&&toRm.has(x.parent)&&!toRm.has(x.id)){toRm.add(x.id);grew=true;}});}curProj().files=(curProj().files||[]).filter(x=>!toRm.has(x.id));prjSave();renderPdFiles();});}});
document.getElementById('pdFileCrumb').addEventListener('click',e=>{const c=e.target.closest('[data-pdcrumb]');if(!c)return;pdFolder=c.dataset.pdcrumb==='root'?null:+c.dataset.pdcrumb;renderPdFiles();});

// ===== File editor: Foglio di testo (.docx) e Foglio di calcolo (.xlsx) =====
const SHEET_COLS=8,SHEET_ROWS=30;
let feFile=null,feType=null,feCell=null,feSaveTimer=null;
function pdNextFileId(){const p=curProj();if(!p.files)p.files=[];return (p.files.reduce((m,x)=>Math.max(m,x.id||0),0))+1;}
function pdCreateDoc(){const p=curProj();if(!p.files)p.files=[];const id=pdNextFileId();p.files.push({id,kind:'doc',name:tr('fe_new_doc'),parent:pdFolder,html:''});prjSave();renderPdFiles();openFileEditor(id);}
function pdCreateSheet(){const p=curProj();if(!p.files)p.files=[];const id=pdNextFileId();p.files.push({id,kind:'sheet',name:tr('fe_new_sheet'),parent:pdFolder,cells:{}});prjSave();renderPdFiles();openFileEditor(id);}
document.getElementById('pdDocAdd').addEventListener('click',pdCreateDoc);
document.getElementById('pdSheetAdd').addEventListener('click',pdCreateSheet);
const pdCreateWrap=document.getElementById('pdCreateWrap');
document.getElementById('pdCreateBtn').addEventListener('click',e=>{e.stopPropagation();pdCreateWrap.classList.toggle('open');});
document.getElementById('pdCreateMenu').addEventListener('click',()=>pdCreateWrap.classList.remove('open'));
document.addEventListener('click',e=>{if(pdCreateWrap&&!pdCreateWrap.contains(e.target))pdCreateWrap.classList.remove('open');});
function feShowSaved(){const s=document.getElementById('feSaved');if(!s)return;s.textContent=tr('fe_saved');clearTimeout(feSaveTimer);feSaveTimer=setTimeout(()=>{s.textContent='';},1200);}
function feQueueSave(){prjSave();feShowSaved();}
function openFileEditor(id){
  const f=pdFileById(id);if(!f)return;feFile=f;feType=f.kind;feCell=null;
  document.getElementById('feOverlay').classList.add('open');
  document.getElementById('feTitle').value=f.name;
  const doc=document.getElementById('feDoc'),sheetWrap=document.getElementById('feSheetWrap'),docTools=document.getElementById('feDocTools'),sheetTools=document.getElementById('feSheetTools');
  if(feType==='doc'){doc.style.display='block';sheetWrap.style.display='none';docTools.style.display='flex';sheetTools.style.display='none';doc.setAttribute('data-ph',tr('fe_doc_ph'));doc.innerHTML=f.html||'';feSavedRange=null;try{document.execCommand('styleWithCSS',false,true);}catch(e){}setTimeout(()=>doc.focus(),30);}
  else{doc.style.display='none';sheetWrap.style.display='flex';docTools.style.display='none';sheetTools.style.display='flex';feUndo=[];feRedo=[];f.fmt=f.fmt||{};document.getElementById('feFx').value='';document.getElementById('feCellRef').textContent='';const nf=document.getElementById('feNumFmt');if(nf)nf.value='';feRenderSheet();}
}
function closeFileEditor(){if(feType==='doc'&&feFile)feFile.html=document.getElementById('feDoc').innerHTML;if(feFile)prjSave();document.getElementById('feOverlay').classList.remove('open');feFile=null;feType=null;renderPdFiles();}
document.getElementById('feClose').addEventListener('click',closeFileEditor);
document.getElementById('feTitle').addEventListener('input',e=>{if(feFile){feFile.name=e.target.value.trim()||tr(feType==='doc'?'fe_new_doc':'fe_new_sheet');feQueueSave();}});
// ---- Doc editor ----
let feSavedRange=null;
function feSaveSel(){const s=getSelection();if(s&&s.rangeCount){const r=s.getRangeAt(0);if(document.getElementById('feDoc').contains(r.commonAncestorContainer))feSavedRange=r.cloneRange();}}
function feRestoreSel(){if(feSavedRange){try{const s=getSelection();s.removeAllRanges();s.addRange(feSavedRange);}catch(e){}}}
function applyDocCmd(cmd,val){const doc=document.getElementById('feDoc');doc.focus();feRestoreSel();try{document.execCommand(cmd,false,val!=null?val:null);}catch(e){}if(feFile){feFile.html=doc.innerHTML;feQueueSave();}feUpdateDocBtns();feSaveSel();}
document.getElementById('feDoc').addEventListener('input',()=>{if(feFile){feFile.html=document.getElementById('feDoc').innerHTML;feQueueSave();}});
document.getElementById('feDocTools').addEventListener('mousedown',e=>{if(e.target.closest('button[data-doc]'))e.preventDefault();});
document.getElementById('feDocTools').addEventListener('click',e=>{const b=e.target.closest('button[data-doc]');if(!b)return;applyDocCmd(b.dataset.doc);});
document.getElementById('feDocTools').addEventListener('change',e=>{const sel=e.target.closest('[data-docsel]');if(!sel)return;if(sel.dataset.docsel==='block')applyDocCmd('formatBlock',sel.value);else if(sel.dataset.docsel==='size')applyDocCmd('fontSize',sel.value);});
document.getElementById('feDocTools').addEventListener('input',e=>{const col=e.target.closest('[data-doccolor]');if(!col)return;applyDocCmd(col.dataset.doccolor==='fore'?'foreColor':'hiliteColor',col.value);});
function feUpdateDocBtns(){['bold','italic','underline','strikeThrough','justifyLeft','justifyCenter','justifyRight'].forEach(c=>{const b=document.querySelector('#feDocTools [data-doc="'+c+'"]');if(b){try{b.classList.toggle('on',document.queryCommandState(c));}catch(e){}}});}
document.getElementById('feDoc').addEventListener('keyup',()=>{feUpdateDocBtns();feSaveSel();});
document.getElementById('feDoc').addEventListener('mouseup',()=>{feUpdateDocBtns();feSaveSel();});
// ---- Sheet: modello + formule ----
function colName(idx){let s='';idx++;while(idx>0){const m=(idx-1)%26;s=String.fromCharCode(65+m)+s;idx=Math.floor((idx-1)/26);}return s;}
function colIdx(letters){letters=letters.toUpperCase();let n=0;for(let i=0;i<letters.length;i++)n=n*26+(letters.charCodeAt(i)-64);return n-1;}
function shRaw(f,ref){return (f.cells&&f.cells[ref]!=null)?String(f.cells[ref]):'';}
function shNum(f,ref,seen){const raw=shRaw(f,ref);if(raw==='')return 0;if(raw[0]==='='){const v=shEval(f,raw.slice(1),ref,seen);return (typeof v==='number'&&isFinite(v))?v:0;}const n=parseFloat(raw.replace(',','.'));return isNaN(n)?0:n;}
function shRangeNums(f,args,seen){const nums=[];args.split(',').forEach(part=>{part=part.trim();const rng=part.match(/^([A-Za-z]{1,2})(\d{1,4}):([A-Za-z]{1,2})(\d{1,4})$/);if(rng){const c1=colIdx(rng[1]),r1=+rng[2]-1,c2=colIdx(rng[3]),r2=+rng[4]-1;for(let c=Math.min(c1,c2);c<=Math.max(c1,c2);c++)for(let r=Math.min(r1,r2);r<=Math.max(r1,r2);r++)nums.push(shNum(f,colName(c)+(r+1),Object.assign({},seen)));}else{const cel=part.match(/^([A-Za-z]{1,2})(\d{1,4})$/);if(cel)nums.push(shNum(f,part.toUpperCase(),Object.assign({},seen)));else{const n=parseFloat(part);if(!isNaN(n))nums.push(n);}}});return nums;}
function shEval(f,expr,selfRef,seen){seen=seen||{};if(selfRef){if(seen[selfRef])return NaN;seen[selfRef]=true;}
  try{
    expr=expr.replace(/\b(SUM|AVERAGE|AVG|MIN|MAX|COUNT)\s*\(([^()]*)\)/gi,(m,fn,args)=>{const nums=shRangeNums(f,args,seen);fn=fn.toUpperCase();if(!nums.length)return '0';if(fn==='SUM')return String(nums.reduce((a,b)=>a+b,0));if(fn==='AVERAGE'||fn==='AVG')return String(nums.reduce((a,b)=>a+b,0)/nums.length);if(fn==='MIN')return String(Math.min.apply(null,nums));if(fn==='MAX')return String(Math.max.apply(null,nums));if(fn==='COUNT')return String(nums.length);return '0';});
    expr=expr.replace(/([A-Za-z]{1,2})(\d{1,4})/g,(m,c,r)=>String(shNum(f,(c+r).toUpperCase(),Object.assign({},seen))));
    if(!/^[-+*/().,\s\d]*$/.test(expr)||expr.trim()==='')return NaN;
    const v=Function('"use strict";return('+expr.replace(/,/g,'.')+')')();return (typeof v==='number'&&isFinite(v))?v:NaN;
  }catch(e){return NaN;}
}
function shFmtNum(v){if(Number.isInteger(v))return String(v);return String(Math.round(v*1e6)/1e6);}
function shDisplay(f,ref){const raw=shRaw(f,ref);if(raw==='')return {t:''};if(raw[0]==='='){const v=shEval(f,raw.slice(1),ref,{});if(typeof v!=='number'||!isFinite(v))return {t:'#ERR',err:true};return {t:shFmtNum(v),num:true};}const clean=raw.replace(',','.');const n=parseFloat(clean);if(!isNaN(n)&&String(n)===clean)return {t:raw,num:true};return {t:raw};}
function feIsLight(hex){const h=String(hex).replace('#','');if(h.length<6)return true;const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (0.299*r+0.587*g+0.114*b)>150;}
function fmtNumNF(v,nf){if(nf==='eur')return '€ '+v.toFixed(2);if(nf==='pct')return shFmtNum(v)+'%';if(nf==='int')return String(Math.round(v));if(nf==='dec2')return v.toFixed(2);return shFmtNum(v);}
function feRenderSheet(){const f=feFile;if(!f||f.kind!=='sheet')return;f.cells=f.cells||{};f.fmt=f.fmt||{};
  let html='<thead><tr><th class="fe-rh"></th>';for(let c=0;c<SHEET_COLS;c++)html+='<th>'+colName(c)+'</th>';html+='</tr></thead><tbody>';
  for(let r=0;r<SHEET_ROWS;r++){html+='<tr><td class="fe-rh">'+(r+1)+'</td>';for(let c=0;c<SHEET_COLS;c++){const ref=colName(c)+(r+1);const fm=f.fmt[ref]||null;const raw=shRaw(f,ref);
    let disp='',cls='';
    if(raw!==''){if(raw[0]==='='){const v=shEval(f,raw.slice(1),ref,{});if(typeof v!=='number'||!isFinite(v)){disp='#ERR';cls='err';}else{disp=fmtNumNF(v,fm&&fm.nf);cls='num';}}
      else{const clean=raw.replace(',','.');const n=parseFloat(clean);if(!isNaN(n)&&String(n)===clean){disp=fmtNumNF(n,fm&&fm.nf);cls='num';}else disp=raw;}}
    let style='';if(fm){if(fm.b)style+='font-weight:700;';if(fm.i)style+='font-style:italic;';if(fm.fill){style+='background:'+fm.fill+';';if(!fm.color)style+='color:'+(feIsLight(fm.fill)?'#1c1830':'#ffffff')+';';}if(fm.color)style+='color:'+fm.color+';';if(fm.align)style+='text-align:'+fm.align+';';}
    html+='<td tabindex="0" data-ref="'+ref+'" class="'+(cls?cls+' ':'')+(feCell===ref?'on':'')+'"'+(style?' style="'+style+'"':'')+'>'+bdEsc(disp)+'</td>';}html+='</tr>';}
  html+='</tbody>';document.getElementById('feSheet').innerHTML=html;}
function feSelectCell(td){document.querySelectorAll('#feSheet td.on').forEach(x=>x.classList.remove('on'));td.classList.add('on');feCell=td.dataset.ref;document.getElementById('feCellRef').textContent=feCell;document.getElementById('feFx').value=shRaw(feFile,feCell);
  const fm=(feFile.fmt&&feFile.fmt[feCell])||{};const nf=document.getElementById('feNumFmt');if(nf)nf.value=fm.nf||'';
  const setOn=(k,v)=>{const b=document.querySelector('#feSheetTools [data-sh="'+k+'"]');if(b)b.classList.toggle('on',!!v);};
  setOn('bold',fm.b);setOn('italic',fm.i);setOn('left',fm.align==='left');setOn('center',fm.align==='center');setOn('right',fm.align==='right');}
// undo/redo + formattazione celle + righe/colonne
let feUndo=[],feRedo=[];
function feSnap(){if(!feFile)return;feUndo.push(JSON.stringify({c:feFile.cells,f:feFile.fmt||{}}));if(feUndo.length>60)feUndo.shift();feRedo.length=0;}
function feRestoreSnap(s){const o=JSON.parse(s);feFile.cells=o.c;feFile.fmt=o.f;prjSave();feRenderSheet();}
function feUndoDo(){if(!feUndo.length)return;feRedo.push(JSON.stringify({c:feFile.cells,f:feFile.fmt||{}}));feRestoreSnap(feUndo.pop());}
function feRedoDo(){if(!feRedo.length)return;feUndo.push(JSON.stringify({c:feFile.cells,f:feFile.fmt||{}}));feRestoreSnap(feRedo.pop());}
function shRemap(f,fn){const nc={},nf={};const mv=(obj,tgt)=>{Object.keys(obj).forEach(ref=>{const m=ref.match(/^([A-Za-z]{1,2})(\d+)$/);if(!m){tgt[ref]=obj[ref];return;}const nr=fn(colIdx(m[1]),+m[2]);if(nr)tgt[colName(nr.c)+nr.r]=obj[ref];});};mv(f.cells||{},nc);mv(f.fmt||{},nf);f.cells=nc;f.fmt=nf;}
function shShiftRows(f,atRow,delta){shRemap(f,(c,r)=>delta>0?{c,r:(r>=atRow?r+1:r)}:(r===atRow?null:{c,r:(r>atRow?r-1:r)}));}
function shShiftCols(f,atCol,delta){shRemap(f,(c,r)=>delta>0?{c:(c>=atCol?c+1:c),r}:(c===atCol?null:{c:(c>atCol?c-1:c),r}));}
function feApplySh(op,val){
  if(op==='undo')return feUndoDo();if(op==='redo')return feRedoDo();
  if(!feCell)return;
  if(op==='rowabove'||op==='colleft'||op==='delrow'||op==='delcol'){feSnap();const m=feCell.match(/^([A-Za-z]{1,2})(\d+)$/);const col=colIdx(m[1]),row=+m[2];
    if(op==='rowabove')shShiftRows(feFile,row,1);else if(op==='delrow')shShiftRows(feFile,row,-1);else if(op==='colleft')shShiftCols(feFile,col,1);else shShiftCols(feFile,col,-1);
    feQueueSave();feRenderSheet();return;}
  feSnap();feFile.fmt=feFile.fmt||{};const fm=feFile.fmt[feCell]=feFile.fmt[feCell]||{};
  if(op==='bold')fm.b=!fm.b;else if(op==='italic')fm.i=!fm.i;
  else if(op==='left'||op==='center'||op==='right')fm.align=(fm.align===op?null:op);
  else if(op==='color')fm.color=val;else if(op==='fill')fm.fill=val;else if(op==='nf')fm.nf=val||null;
  if(Object.keys(fm).every(k=>!fm[k]))delete feFile.fmt[feCell];
  feQueueSave();feRenderSheet();const td=document.querySelector('#feSheet td[data-ref="'+feCell+'"]');if(td)feSelectCell(td);}
document.getElementById('feSheetTools').addEventListener('click',e=>{const b=e.target.closest('button[data-sh]');if(b)feApplySh(b.dataset.sh);});
document.getElementById('feSheetTools').addEventListener('change',e=>{if(e.target.id==='feNumFmt')feApplySh('nf',e.target.value);});
document.getElementById('feSheetTools').addEventListener('input',e=>{const col=e.target.closest('[data-shcolor]');if(col)feApplySh(col.dataset.shcolor,col.value);});
function feEditCell(td){td.textContent=shRaw(feFile,td.dataset.ref);td.setAttribute('contenteditable','true');td.focus();const range=document.createRange();range.selectNodeContents(td);range.collapse(false);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);}
function feCommitCell(td){const ref=td.dataset.ref,val=td.textContent.trim();td.removeAttribute('contenteditable');if(val===shRaw(feFile,ref)){feRenderSheet();return;}feSnap();if(val==='')delete feFile.cells[ref];else feFile.cells[ref]=val;feQueueSave();feRenderSheet();}
document.getElementById('feSheet').addEventListener('click',e=>{const td=e.target.closest('td[data-ref]');if(td&&td.getAttribute('contenteditable')!=='true')feSelectCell(td);});
document.getElementById('feSheet').addEventListener('dblclick',e=>{const td=e.target.closest('td[data-ref]');if(td)feEditCell(td);});
document.getElementById('feSheet').addEventListener('focusout',e=>{const td=e.target.closest&&e.target.closest('td[data-ref]');if(td&&td.getAttribute('contenteditable')==='true')feCommitCell(td);},true);
document.getElementById('feSheet').addEventListener('keydown',e=>{const td=e.target.closest&&e.target.closest('td[data-ref]');if(!td)return;
  if(td.getAttribute('contenteditable')==='true'){if(e.key==='Enter'){e.preventDefault();feCommitCell(td);}else if(e.key==='Escape'){e.preventDefault();td.removeAttribute('contenteditable');feRenderSheet();}return;}
  if(e.key==='Enter'||e.key==='F2'){e.preventDefault();feEditCell(td);}
  else if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();if(shRaw(feFile,td.dataset.ref)!==''){feSnap();delete feFile.cells[td.dataset.ref];feQueueSave();feRenderSheet();}}
  else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){e.preventDefault();feEditCell(td);td.textContent=e.key;const range=document.createRange();range.selectNodeContents(td);range.collapse(false);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);}});
document.getElementById('feFx').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(!feCell)return;const val=e.target.value.trim();if(val===shRaw(feFile,feCell))return;feSnap();if(val==='')delete feFile.cells[feCell];else feFile.cells[feCell]=val;feQueueSave();feRenderSheet();}});
// ---- Export .docx / .xlsx (ZIP OOXML puro, senza librerie) ----
const _crcTab=(function(){const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc32(u8){let c=0xFFFFFFFF;for(let i=0;i<u8.length;i++)c=_crcTab[(c^u8[i])&0xFF]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function zipStore(files){const enc=new TextEncoder();const chunks=[];let offset=0;const central=[];
  const u16=n=>{const b=new Uint8Array(2);new DataView(b.buffer).setUint16(0,n&0xFFFF,true);return b;};
  const u32=n=>{const b=new Uint8Array(4);new DataView(b.buffer).setUint32(0,n>>>0,true);return b;};
  const push=u8=>{chunks.push(u8);offset+=u8.length;};
  files.forEach(f=>{const nameB=enc.encode(f.name);const data=(f.data instanceof Uint8Array)?f.data:enc.encode(f.data);const crc=crc32(data);const localOff=offset;
    push(u32(0x04034b50));push(u16(20));push(u16(0));push(u16(0));push(u16(0));push(u16(0));push(u32(crc));push(u32(data.length));push(u32(data.length));push(u16(nameB.length));push(u16(0));push(nameB);push(data);
    central.push({nameB,crc,size:data.length,localOff});});
  const cdStart=offset;
  central.forEach(c=>{push(u32(0x02014b50));push(u16(20));push(u16(20));push(u16(0));push(u16(0));push(u16(0));push(u16(0));push(u32(c.crc));push(u32(c.size));push(u32(c.size));push(u16(c.nameB.length));push(u16(0));push(u16(0));push(u16(0));push(u16(0));push(u32(0));push(u32(c.localOff));push(c.nameB);});
  const cdSize=offset-cdStart;
  push(u32(0x06054b50));push(u16(0));push(u16(0));push(u16(central.length));push(u16(central.length));push(u32(cdSize));push(u32(cdStart));push(u16(0));
  let total=0;chunks.forEach(c=>total+=c.length);const out=new Uint8Array(total);let p=0;chunks.forEach(c=>{out.set(c,p);p+=c.length;});return out;}
function xmlEsc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function dl(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function cssColorToHex(c){if(!c)return null;c=String(c).trim();const m=c.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);if(m)return (((+m[1])<<16)|((+m[2])<<8)|(+m[3])).toString(16).padStart(6,'0').toUpperCase();if(c[0]==='#'){let h=c.slice(1);if(h.length===3)h=h.split('').map(x=>x+x).join('');if(h.length>=6)return h.slice(0,6).toUpperCase();}return null;}
function fmtFromEl(el,fmt){const f=Object.assign({},fmt),tag=el.tagName.toLowerCase(),s=el.style||{};
  if(tag==='b'||tag==='strong')f.b=1;if(tag==='i'||tag==='em')f.i=1;if(tag==='u')f.u=1;if(tag==='s'||tag==='strike'||tag==='del')f.strike=1;
  if(s.fontWeight==='bold'||parseInt(s.fontWeight,10)>=600)f.b=1;if(s.fontStyle==='italic')f.i=1;
  const td=(s.textDecorationLine||s.textDecoration||'');if(td.indexOf('underline')>=0)f.u=1;if(td.indexOf('line-through')>=0)f.strike=1;
  if(s.color){const h=cssColorToHex(s.color);if(h)f.color=h;}if(s.backgroundColor){const h=cssColorToHex(s.backgroundColor);if(h)f.hl=h;}
  if(s.fontSize){const px=parseFloat(s.fontSize);if(px)f.sz=Math.round(px*1.5);}
  if(tag==='font'){const c=el.getAttribute('color');if(c){const h=cssColorToHex(c);if(h)f.color=h;}const sz=el.getAttribute('size');const map={'1':16,'2':20,'3':24,'4':28,'5':36,'6':48,'7':72};if(sz&&map[sz])f.sz=map[sz];}
  return f;}
function docxRun(text,fmt){let rpr='';if(fmt.b)rpr+='<w:b/>';if(fmt.i)rpr+='<w:i/>';if(fmt.strike)rpr+='<w:strike/>';if(fmt.color)rpr+='<w:color w:val="'+fmt.color+'"/>';if(fmt.sz)rpr+='<w:sz w:val="'+fmt.sz+'"/><w:szCs w:val="'+fmt.sz+'"/>';if(fmt.u)rpr+='<w:u w:val="single"/>';if(fmt.hl)rpr+='<w:shd w:val="clear" w:color="auto" w:fill="'+fmt.hl+'"/>';return '<w:r>'+(rpr?'<w:rPr>'+rpr+'</w:rPr>':'')+'<w:t xml:space="preserve">'+xmlEsc(text)+'</w:t></w:r>';}
function docxRuns(node,fmt){let out='';node.childNodes.forEach(ch=>{if(ch.nodeType===3){if(ch.nodeValue)out+=docxRun(ch.nodeValue,fmt);}else if(ch.nodeType===1){const tag=ch.tagName.toLowerCase();if(tag==='br'){out+='<w:r><w:br/></w:r>';return;}out+=docxRuns(ch,fmtFromEl(ch,fmt));}});return out;}
function docxAlign(el){const ta=(el.style&&el.style.textAlign)||'';if(ta==='center')return 'center';if(ta==='right')return 'right';if(ta==='justify')return 'both';return '';}
function docxParas(root){const paras=[],BLOCK=['p','div','h1','h2','h3','li','blockquote'];
  (function walk(el){el.childNodes.forEach(node=>{if(node.nodeType===1){const tag=node.tagName.toLowerCase();if(tag==='ul'||tag==='ol'){walk(node);return;}if(BLOCK.indexOf(tag)>=0){let f={},pre='';if(tag==='h1')f={b:1,sz:'40'};else if(tag==='h2')f={b:1,sz:'32'};else if(tag==='h3')f={b:1,sz:'28'};if(tag==='li')pre='•  ';let runs='';if(pre)runs+=docxRun(pre,f);runs+=docxRuns(node,f);const al=docxAlign(node),ppr=al?'<w:pPr><w:jc w:val="'+al+'"/></w:pPr>':'';paras.push('<w:p>'+ppr+(runs||'<w:r><w:t/></w:r>')+'</w:p>');return;}const runs=docxRuns(node,{});if(runs)paras.push('<w:p>'+runs+'</w:p>');}else if(node.nodeType===3){if(node.nodeValue&&node.nodeValue.trim())paras.push('<w:p>'+docxRun(node.nodeValue,{})+'</w:p>');}});})(root);
  if(!paras.length)paras.push('<w:p><w:r><w:t/></w:r></w:p>');return paras.join('');}
function exportDocx(f){const tmp=document.createElement('div');tmp.innerHTML=f.html||'';const body=docxParas(tmp);
  const doc='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+body+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>';
  const ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  const rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  const zip=zipStore([{name:'[Content_Types].xml',data:ct},{name:'_rels/.rels',data:rels},{name:'word/document.xml',data:doc}]);
  dl(new Blob([zip],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}),(f.name||'documento')+'.docx');}
function exportXlsx(f){f.cells=f.cells||{};let maxC=0,maxR=0;Object.keys(f.cells).forEach(k=>{const m=k.match(/^([A-Za-z]{1,2})(\d{1,4})$/);if(m){maxC=Math.max(maxC,colIdx(m[1]));maxR=Math.max(maxR,+m[2]-1);}});
  let rows='';for(let r=0;r<=maxR;r++){let cells='';for(let c=0;c<=maxC;c++){const ref=colName(c)+(r+1),raw=shRaw(f,ref);if(raw==='')continue;if(raw[0]==='='){const v=shEval(f,raw.slice(1),ref,{});const num=(typeof v==='number'&&isFinite(v))?v:0;cells+='<c r="'+ref+'"><f>'+xmlEsc(raw.slice(1))+'</f><v>'+num+'</v></c>';}else{const clean=raw.replace(',','.'),n=parseFloat(clean);if(!isNaN(n)&&String(n)===clean)cells+='<c r="'+ref+'"><v>'+n+'</v></c>';else cells+='<c r="'+ref+'" t="inlineStr"><is><t xml:space="preserve">'+xmlEsc(raw)+'</t></is></c>';}}if(cells)rows+='<row r="'+(r+1)+'">'+cells+'</row>';}
  const sheet='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'+rows+'</sheetData></worksheet>';
  const wb='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Foglio1" sheetId="1" r:id="rId1"/></sheets></workbook>';
  const wbRels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>';
  const ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>';
  const rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
  const zip=zipStore([{name:'[Content_Types].xml',data:ct},{name:'_rels/.rels',data:rels},{name:'xl/workbook.xml',data:wb},{name:'xl/_rels/workbook.xml.rels',data:wbRels},{name:'xl/worksheets/sheet1.xml',data:sheet}]);
  dl(new Blob([zip],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),(f.name||'foglio')+'.xlsx');}
document.getElementById('feExport').addEventListener('click',()=>{if(!feFile)return;if(feType==='doc'){feFile.html=document.getElementById('feDoc').innerHTML;exportDocx(feFile);}else exportXlsx(feFile);prjSave();});
function newProject(){const p={id:PRJ.seq++,name:tr('new_project_short')+' '+(PRJ.list.length+1),icon:'📁',board:{pan:{x:60,y:50},zoom:1,items:[]}};PRJ.list.push(p);prjSave();renderProjGrid();openProject(p.id);}
// ===== Template di progetto =====
const PROJ_TEMPLATES=[
  {key:'blank',icon:'📁',name:()=>tr('tpl_blank'),desc:()=>tr('tpl_blank_d'),tasks:[],notes:[]},
  {key:'editorial',icon:'📝',name:()=>tr('tpl_editorial'),desc:()=>tr('tpl_editorial_d'),tasks:['Definire i temi del mese','Creare il calendario editoriale','Scrivere gli articoli','Preparare le grafiche','Programmare le pubblicazioni'],notes:['🎯 Obiettivo del mese','👥 Target']},
  {key:'launch',icon:'🚀',name:()=>tr('tpl_launch'),desc:()=>tr('tpl_launch_d'),tasks:['Definire il posizionamento','Creare la landing page','Scrivere l\'email di lancio','Post social di teaser','Raccogliere feedback dai beta tester'],notes:['🚀 Data di lancio','💡 Messaggio chiave']},
  {key:'campaign',icon:'📣',name:()=>tr('tpl_campaign'),desc:()=>tr('tpl_campaign_d'),tasks:['Scrivere il brief creativo','Definire budget e canali','Produrre i contenuti','Pianificare le pubblicazioni','Analizzare i risultati'],notes:['📣 Obiettivo campagna','💰 Budget']}
];
const projTplOv=document.getElementById('projTplOverlay');
function openProjTpl(){document.getElementById('projTplName').value='';projTplOv.classList.add('open');setTimeout(()=>document.getElementById('projTplName').focus(),50);}
document.getElementById('projTplX').addEventListener('click',()=>projTplOv.classList.remove('open'));
projTplOv.addEventListener('click',e=>{if(e.target===projTplOv)projTplOv.classList.remove('open');});
function createProjectFromModal(){
  const nm=document.getElementById('projTplName').value.trim()||(tr('new_project_short')+' '+(PRJ.list.length+1));
  const p={id:PRJ.seq++,name:nm,icon:'📁',board:{pan:{x:60,y:50},zoom:1,items:[]}};
  PRJ.list.push(p);
  prjSave();renderProjGrid();projTplOv.classList.remove('open');openProject(p.id);
}
document.getElementById('projTplCreate').addEventListener('click',createProjectFromModal);
document.getElementById('projTplName').addEventListener('keydown',e=>{if(e.key==='Enter')createProjectFromModal();});
// ===== Cattura rapida =====
let qcType='task';
const qcOv=document.getElementById('qcOverlay');
function openQc(){qcType='task';document.getElementById('qcInput').value='';document.querySelectorAll('#qcType .s').forEach(s=>s.classList.toggle('active',s.dataset.qct==='task'));document.getElementById('qcToday').classList.add('on');document.getElementById('qcTodayRow').style.display='flex';qcOv.classList.add('open');setTimeout(()=>document.getElementById('qcInput').focus(),50);}
{const _qf=document.getElementById('qcFab');if(_qf)_qf.addEventListener('click',openQc);}
document.getElementById('qcX').addEventListener('click',()=>qcOv.classList.remove('open'));
qcOv.addEventListener('click',e=>{if(e.target===qcOv)qcOv.classList.remove('open');});
document.getElementById('qcType').addEventListener('click',e=>{const s=e.target.closest('.s');if(!s)return;qcType=s.dataset.qct;document.querySelectorAll('#qcType .s').forEach(x=>x.classList.toggle('active',x===s));document.getElementById('qcTodayRow').style.display=qcType==='task'?'flex':'none';});
document.getElementById('qcToday').addEventListener('click',function(){this.classList.toggle('on');});
function qcSave(){
  const name=document.getElementById('qcInput').value.trim();if(!name)return;
  if(!guardTask()){qcOv.classList.remove('open');return;}
  const task={id:++TID,title:name,scope:'personal',done:false};
  if(qcType==='idea')task.tag={l:tr('qc_idea'),c:'#b8a6f4'};
  else if(document.getElementById('qcToday').classList.contains('on'))task.date=realToday();
  TASKS.push(task);tasksTodayInc();saveTasks();qcOv.classList.remove('open');
  showToast(tr(qcType==='idea'?'qc_saved_idea':'qc_saved_task'));
  if(typeof renderTasks==='function')renderTasks();if(typeof buildCalendar==='function')buildCalendar();if(typeof renderHomeAlerts==='function')renderHomeAlerts();
  if(document.getElementById('calView')&&document.getElementById('calView').style.display!=='none'&&typeof renderCalendar==='function')renderCalendar();
}
document.getElementById('qcSave').addEventListener('click',qcSave);
document.getElementById('qcInput').addEventListener('keydown',e=>{if(e.key==='Enter')qcSave();});

// ----- Whiteboard -----
let bdTool='select', bdColor='#b8a6f4', bdSel=null, bdDrag=null, bdUndo=[], bdRedo=[], bdClip=null;
const bdCanvas=document.getElementById('bdCanvas');
const bdFile=document.getElementById('bdFile');
function bdPush(){bdUndo.push(JSON.stringify(curProj().board.items));if(bdUndo.length>80)bdUndo.shift();bdRedo=[];}
function bdRestore(from,to){if(!from.length)return;to.push(JSON.stringify(curProj().board.items));if(to.length>80)to.shift();curProj().board.items=JSON.parse(from.pop());bdSel=null;prjSave();renderBoard();}
function bdUndoAct(){bdRestore(bdUndo,bdRedo);}
function bdRedoAct(){bdRestore(bdRedo,bdUndo);}
function bdCloneItem(src,ox,oy){const it=JSON.parse(JSON.stringify(src));it.id=PRJ.iseq++;if(it.type==='draw')it.pts=it.pts.map(p=>[p[0]+ox,p[1]+oy]);else{it.x+=ox;it.y+=oy;}return it;}
function bdBox(it){
  if(it.type==='draw'){const xs=it.pts.map(p=>p[0]),ys=it.pts.map(p=>p[1]);const l=Math.min(...xs),t=Math.min(...ys);return {l,t,w:Math.max(1,Math.max(...xs)-l),h:Math.max(1,Math.max(...ys)-t)};}
  if(it.type==='line'||it.type==='arrow'){return {l:Math.min(it.x,it.x+it.w),t:Math.min(it.y,it.y+it.h),w:Math.max(1,Math.abs(it.w)),h:Math.max(1,Math.abs(it.h))};}
  return {l:it.x,t:it.y,w:it.w,h:it.h};
}
function bdShapeSVG(it){const w=it.w,h=it.h,c=it.color||'#b8a6f4',sw=2.5;
  if(it.type==='rect')return `<svg class="bd-svg" width="${w}" height="${h}"><rect x="${sw}" y="${sw}" width="${Math.max(0,w-sw*2)}" height="${Math.max(0,h-sw*2)}" rx="9" fill="${c}22" stroke="${c}" stroke-width="${sw}"/></svg>`;
  return `<svg class="bd-svg" width="${w}" height="${h}"><ellipse cx="${w/2}" cy="${h/2}" rx="${Math.max(0,w/2-sw)}" ry="${Math.max(0,h/2-sw)}" fill="${c}22" stroke="${c}" stroke-width="${sw}"/></svg>`;
}
function bdVecSVG(it){const bx=bdBox(it),sx=it.x-bx.l,sy=it.y-bx.t,ex=it.x+it.w-bx.l,ey=it.y+it.h-bx.t,c=it.color||'#b8a6f4',sw=2.6;let extra='';
  if(it.type==='arrow'){const ang=Math.atan2(ey-sy,ex-sx),L=14,a1x=ex-L*Math.cos(ang-0.5),a1y=ey-L*Math.sin(ang-0.5),a2x=ex-L*Math.cos(ang+0.5),a2y=ey-L*Math.sin(ang+0.5);extra=`<polyline points="${a1x.toFixed(1)},${a1y.toFixed(1)} ${ex},${ey} ${a2x.toFixed(1)},${a2y.toFixed(1)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;}
  return `<svg class="bd-svg" width="${bx.w}" height="${bx.h}" style="position:absolute;left:0;top:0"><line class="bd-hit" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="transparent" stroke-width="16"/><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>${extra}</svg>`;
}
function bdDrawSVG(it){const bx=bdBox(it),d='M '+it.pts.map(p=>`${(p[0]-bx.l).toFixed(1)} ${(p[1]-bx.t).toFixed(1)}`).join(' L ');
  return `<svg class="bd-svg" width="${bx.w}" height="${bx.h}" style="position:absolute;left:0;top:0"><path class="bd-hit" d="${d}" fill="none" stroke="transparent" stroke-width="16"/><path d="${d}" fill="none" stroke="${it.color||'#b8a6f4'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function boardItemHTML(it){
  const sel=it.id===bdSel?' sel':'',rm=`<span class="bd-rm" data-brm="${it.id}">${SVG.x}</span>`,rs=`<span class="bd-rs" data-brs="${it.id}"></span>`;
  if(it.type==='text'||it.type==='note'){const cls=it.type==='note'?'bd-note':'bd-text';
    const sz={s:14,m:18,l:26}[it.size]||15;const st=`font-size:${sz}px;font-weight:${it.bold?700:400};${it.tcolor?`color:${it.tcolor};`:''}`;
    return `<div class="bd-item ${cls}${sel}" data-bid="${it.id}" style="left:${it.x}px;top:${it.y}px;width:${it.w}px"><div class="bd-in" style="${st}">${bdEsc(it.text||'')}</div>${rm}${rs}</div>`;}
  if(it.type==='image'){const h=Math.round(it.w*(it.r||0.66));
    return `<div class="bd-item bd-image${sel}" data-bid="${it.id}" style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${h}px"><img src="${it.src}" draggable="false">${rm}${rs}</div>`;}
  if(it.type==='rect'||it.type==='ellipse'){
    return `<div class="bd-item bd-shape${sel}" data-bid="${it.id}" style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${it.h}px">${bdShapeSVG(it)}${rm}${rs}</div>`;}
  const bx=bdBox(it);let handles='';
  if(it.id===bdSel){
    if(it.type==='draw'){handles=`${rm}${rs}`;}
    else{const sx=it.x-bx.l,sy=it.y-bx.t,ex=it.x+it.w-bx.l,ey=it.y+it.h-bx.t;
      handles=`<span class="bd-end" data-bend="${it.id}:1" style="left:${sx}px;top:${sy}px"></span><span class="bd-end" data-bend="${it.id}:2" style="left:${ex}px;top:${ey}px"></span><span class="bd-rm" data-brm="${it.id}" style="left:${((sx+ex)/2-9).toFixed(0)}px;top:${((sy+ey)/2-9).toFixed(0)}px;right:auto">${SVG.x}</span>`;}
  }
  return `<div class="bd-item bd-vec${sel}" data-bid="${it.id}" style="left:${bx.l}px;top:${bx.t}px;width:${bx.w}px;height:${bx.h}px">${it.type==='draw'?bdDrawSVG(it):bdVecSVG(it)}${handles}</div>`;
}
function renderBoard(){
  const layer=document.getElementById('bdLayer');if(!layer)return;const b=curProj().board;
  layer.style.transform=`translate(${b.pan.x}px,${b.pan.y}px) scale(${b.zoom})`;
  layer.innerHTML=b.items.map(boardItemHTML).join('');
  const zv=document.getElementById('bdZval');if(zv)zv.textContent=Math.round(b.zoom*100)+'%';
  bdUpdateFormat();
}
function bdSelItem(){return bdSel!=null?curProj().board.items.find(x=>x.id===bdSel):null;}
function bdUpdateFormat(){const bar=document.getElementById('bdFormat');if(!bar)return;const it=bdSelItem();
  if(it&&(it.type==='text'||it.type==='note')){bar.classList.add('show');
    bar.querySelectorAll('[data-fsize]').forEach(b=>b.classList.toggle('on',(it.size||'m')===b.dataset.fsize));
    bar.querySelector('[data-fmt="bold"]').classList.toggle('on',!!it.bold);
    bar.querySelectorAll('[data-fcolor]').forEach(b=>b.classList.toggle('on',(it.tcolor||'#ffffff').toLowerCase()===b.dataset.fcolor.toLowerCase()));
  }else bar.classList.remove('show');
}
document.getElementById('bdFormat').addEventListener('mousedown',e=>e.stopPropagation());
document.getElementById('bdFormat').addEventListener('click',e=>{
  const it=bdSelItem();if(!it)return;
  const sz=e.target.closest('[data-fsize]');if(sz){bdPush();it.size=sz.dataset.fsize;prjSave();bdRerenderItem(it);bdUpdateFormat();return;}
  const bold=e.target.closest('[data-fmt="bold"]');if(bold){bdPush();it.bold=!it.bold;prjSave();bdRerenderItem(it);bdUpdateFormat();return;}
  const col=e.target.closest('[data-fcolor]');if(col){bdPush();it.tcolor=col.dataset.fcolor;prjSave();bdRerenderItem(it);bdUpdateFormat();return;}
  const ed=e.target.closest('[data-fmt="edit"]');if(ed){const el=bdCanvas.querySelector(`[data-bid="${it.id}"]`);if(el)bdStartEdit(el,it);return;}
});
function bdRerenderItem(it){const el=bdCanvas.querySelector(`[data-bid="${it.id}"]`);if(el)el.outerHTML=boardItemHTML(it);}
function bdSetTransform(){const b=curProj().board;document.getElementById('bdLayer').style.transform=`translate(${b.pan.x}px,${b.pan.y}px) scale(${b.zoom})`;}
function bdCenter(){const r=bdCanvas.getBoundingClientRect(),b=curProj().board;return {x:(r.width/2-b.pan.x)/b.zoom,y:(r.height/2-b.pan.y)/b.zoom};}
function bdPt(e){const r=bdCanvas.getBoundingClientRect(),b=curProj().board;return {x:Math.round((e.clientX-r.left-b.pan.x)/b.zoom),y:Math.round((e.clientY-r.top-b.pan.y)/b.zoom)};}
function bdSetTool(t){bdTool=t;document.querySelectorAll('.bd-tool[data-tool],.bd-pop-item[data-tool]').forEach(el=>el.classList.toggle('on',el.dataset.tool===t));const sb=document.getElementById('bdShapesBtn');if(sb)sb.classList.toggle('on',['rect','ellipse','arrow','line'].includes(t));bdCanvas.classList.toggle('drawing',t!=='select');}
function bdAdd(type){bdPush();const c=bdCenter(),b=curProj().board,w=180,it={id:PRJ.iseq++,type,x:Math.round(c.x-w/2),y:Math.round(c.y-22),w,text:''};b.items.push(it);bdSel=it.id;prjSave();renderBoard();const el=bdCanvas.querySelector(`[data-bid="${it.id}"]`);if(el)bdStartEdit(el,it);}
function bdStartEdit(el,it){
  el.classList.add('editing');const inp=el.querySelector('.bd-in');if(!inp)return;
  inp.contentEditable='true';inp.focus();
  const range=document.createRange();range.selectNodeContents(inp);range.collapse(false);
  const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
  const finish=()=>{inp.removeEventListener('blur',finish);inp.contentEditable='false';el.classList.remove('editing');it.text=inp.innerText.trim();const b=curProj().board;if(!it.text){b.items=b.items.filter(x=>x.id!==it.id);renderBoard();}prjSave();};
  inp.addEventListener('blur',finish);
}
bdCanvas.addEventListener('mousedown',e=>{
  const b=curProj().board;
  const rs=e.target.closest('[data-brs]');
  if(rs){const it=b.items.find(x=>x.id==rs.dataset.brs);if(!it)return;bdDrag={mode:'resize',it,sx:e.clientX,sy:e.clientY,ow:it.w,oh:it.h,box:bdBox(it),opts:it.pts?it.pts.map(p=>p.slice()):null,before:JSON.stringify(b.items)};e.preventDefault();return;}
  const ep=e.target.closest('[data-bend]');
  if(ep){const[id,which]=ep.dataset.bend.split(':');const it=b.items.find(x=>x.id==+id);if(!it)return;bdDrag={mode:'endpoint',it,which,sx:e.clientX,sy:e.clientY,ox:it.x,oy:it.y,ow:it.w,oh:it.h,before:JSON.stringify(b.items)};e.preventDefault();return;}
  if(e.target.closest('.bd-rm'))return;
  const itemEl=e.target.closest('.bd-item');
  if(itemEl&&!itemEl.classList.contains('editing')&&bdTool==='select'){
    const it=b.items.find(x=>x.id==itemEl.dataset.bid);if(!it)return;
    bdSel=it.id;b.items.splice(b.items.indexOf(it),1);b.items.push(it);
    bdDrag={mode:'move',it,sx:e.clientX,sy:e.clientY,ox:it.x,oy:it.y,opts:it.pts?it.pts.map(p=>p.slice()):null,before:JSON.stringify(b.items)};
    renderBoard();e.preventDefault();return;
  }
  if(bdTool!=='select'){
    const pt=bdPt(e),before=JSON.stringify(b.items);let it;
    if(bdTool==='pen')it={id:PRJ.iseq++,type:'draw',color:bdColor,pts:[[pt.x,pt.y]]};
    else it={id:PRJ.iseq++,type:bdTool,x:pt.x,y:pt.y,w:1,h:1,color:bdColor};
    b.items.push(it);bdSel=null;bdDrag={mode:'create',it,tool:bdTool,sx:e.clientX,sy:e.clientY,start:pt,before};
    renderBoard();e.preventDefault();return;
  }
  bdSel=null;renderBoard();
  bdDrag={mode:'pan',sx:e.clientX,sy:e.clientY,ox:b.pan.x,oy:b.pan.y};bdCanvas.classList.add('panning');
});
document.addEventListener('mousemove',e=>{
  if(!bdDrag)return;const b=curProj().board,z=b.zoom,it=bdDrag.it;
  const dx=(e.clientX-bdDrag.sx)/z,dy=(e.clientY-bdDrag.sy)/z;
  if(bdDrag.mode==='pan'){b.pan.x=bdDrag.ox+(e.clientX-bdDrag.sx);b.pan.y=bdDrag.oy+(e.clientY-bdDrag.sy);bdSetTransform();return;}
  if(bdDrag.mode==='move'){if(it.type==='draw')it.pts=bdDrag.opts.map(p=>[p[0]+dx,p[1]+dy]);else{it.x=Math.round(bdDrag.ox+dx);it.y=Math.round(bdDrag.oy+dy);}bdRerenderItem(it);return;}
  if(bdDrag.mode==='resize'){
    if(it.type==='draw'){const bx=bdDrag.box,nw=Math.max(20,bdDrag.box.w+dx),nh=Math.max(20,bdDrag.box.h+dy),fx=nw/bx.w,fy=nh/bx.h;it.pts=bdDrag.opts.map(p=>[bx.l+(p[0]-bx.l)*fx,bx.t+(p[1]-bx.t)*fy]);}
    else if(it.type==='text'||it.type==='note')it.w=Math.max(60,Math.round(bdDrag.ow+dx));
    else if(it.type==='image')it.w=Math.max(50,Math.round(bdDrag.ow+dx));
    else{it.w=Math.max(20,Math.round(bdDrag.ow+dx));it.h=Math.max(20,Math.round(bdDrag.oh+dy));}
    bdRerenderItem(it);return;
  }
  if(bdDrag.mode==='endpoint'){
    if(bdDrag.which==='1'){it.x=Math.round(bdDrag.ox+dx);it.y=Math.round(bdDrag.oy+dy);it.w=Math.round(bdDrag.ow-dx);it.h=Math.round(bdDrag.oh-dy);}
    else{it.w=Math.round(bdDrag.ow+dx);it.h=Math.round(bdDrag.oh+dy);}
    bdRerenderItem(it);return;
  }
  if(bdDrag.mode==='create'){
    const pt=bdPt(e);
    if(bdDrag.tool==='pen')it.pts.push([pt.x,pt.y]);
    else if(it.type==='rect'||it.type==='ellipse'){it.x=Math.min(bdDrag.start.x,pt.x);it.y=Math.min(bdDrag.start.y,pt.y);it.w=Math.max(1,Math.abs(pt.x-bdDrag.start.x));it.h=Math.max(1,Math.abs(pt.y-bdDrag.start.y));}
    else{it.w=pt.x-bdDrag.start.x;it.h=pt.y-bdDrag.start.y;}
    bdRerenderItem(it);return;
  }
});
document.addEventListener('mouseup',()=>{
  if(!bdDrag){bdCanvas.classList.remove('panning');return;}
  const b=curProj().board,it=bdDrag.it,mode=bdDrag.mode,tool=bdDrag.tool,before=bdDrag.before;
  bdCanvas.classList.remove('panning');
  if(mode==='create'){
    if(it.type==='draw'){if(it.pts.length<2)b.items=b.items.filter(x=>x.id!==it.id);}
    else{if(Math.abs(it.w)<6&&Math.abs(it.h)<6){if(it.type==='rect'){it.w=140;it.h=90;}else if(it.type==='ellipse'){it.w=120;it.h=120;}else{it.w=140;it.h=0;}}bdSel=it.id;}
    if(tool!=='pen')bdSetTool('select');
  }
  if(before!==undefined&&mode!=='pan'&&JSON.stringify(b.items)!==before){bdUndo.push(before);if(bdUndo.length>80)bdUndo.shift();bdRedo=[];}
  bdDrag=null;if(mode!=='pan')renderBoard();prjSave();
});
bdCanvas.addEventListener('wheel',e=>{
  e.preventDefault();const b=curProj().board,r=bdCanvas.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,old=b.zoom;
  let nz=old*(e.deltaY<0?1.1:0.9);nz=Math.max(0.25,Math.min(3,nz));
  b.pan.x=mx-(mx-b.pan.x)*(nz/old);b.pan.y=my-(my-b.pan.y)*(nz/old);b.zoom=nz;
  bdSetTransform();const zv=document.getElementById('bdZval');if(zv)zv.textContent=Math.round(nz*100)+'%';prjSave();
},{passive:false});
function bdZoomBtn(dir){const b=curProj().board,r=bdCanvas.getBoundingClientRect(),mx=r.width/2,my=r.height/2,old=b.zoom;let nz=Math.max(0.25,Math.min(3,old*(dir>0?1.2:1/1.2)));b.pan.x=mx-(mx-b.pan.x)*(nz/old);b.pan.y=my-(my-b.pan.y)*(nz/old);b.zoom=nz;renderBoard();prjSave();}
bdCanvas.addEventListener('dblclick',e=>{const itemEl=e.target.closest('.bd-text,.bd-note');if(!itemEl)return;const it=curProj().board.items.find(x=>x.id==itemEl.dataset.bid);if(it)bdStartEdit(itemEl,it);});
bdCanvas.addEventListener('click',e=>{const rm=e.target.closest('[data-brm]');if(rm){const id=+rm.dataset.brm,b=curProj().board;bdPush();b.items=b.items.filter(x=>x.id!==id);bdSel=null;prjSave();renderBoard();}});
function bdCloseShapes(){document.getElementById('bdShapesPop').classList.remove('open');}
document.getElementById('bdAddText').addEventListener('click',()=>{bdSetTool('select');bdCloseShapes();bdAdd('text');});
document.getElementById('bdAddNote').addEventListener('click',()=>{bdSetTool('select');bdCloseShapes();bdAdd('note');});
document.getElementById('bdAddImg').addEventListener('click',()=>{bdSetTool('select');bdCloseShapes();bdFile.click();});
document.getElementById('bdTPen').addEventListener('click',()=>{bdCloseShapes();bdSetTool(bdTool==='pen'?'select':'pen');});
document.getElementById('bdShapesBtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('bdShapesPop').classList.toggle('open');});
document.querySelectorAll('#bdShapesPop .bd-pop-item').forEach(el=>el.addEventListener('click',()=>{bdSetTool(el.dataset.tool);bdCloseShapes();}));
document.addEventListener('click',e=>{if(!e.target.closest('.bd-shape-wrap'))bdCloseShapes();});
document.querySelectorAll('#bdColors .bd-sw').forEach(el=>el.addEventListener('click',()=>{bdColor=el.dataset.color;document.querySelectorAll('#bdColors .bd-sw').forEach(s=>s.classList.toggle('on',s===el));if(bdSel!=null){const it=curProj().board.items.find(x=>x.id===bdSel);if(it&&'color'in it){bdPush();it.color=bdColor;prjSave();renderBoard();}}}));
document.getElementById('bdUndoBtn').addEventListener('click',bdUndoAct);
document.getElementById('bdRedoBtn').addEventListener('click',bdRedoAct);
document.getElementById('bdZoomIn').addEventListener('click',()=>bdZoomBtn(1));
document.getElementById('bdZoomOut').addEventListener('click',()=>bdZoomBtn(-1));
document.getElementById('bdZval').addEventListener('click',()=>{const b=curProj().board;b.zoom=1;b.pan={x:60,y:50};renderBoard();prjSave();});
document.addEventListener('keydown',e=>{
  const ap=document.querySelector('.page.active');if(!ap||ap.dataset.page!=='projectdetail')return;
  if(e.target.isContentEditable||/^(input|textarea)$/i.test(e.target.tagName))return;
  const meta=e.ctrlKey||e.metaKey,k=e.key.toLowerCase(),b=curProj().board;
  if(meta&&k==='z'){e.preventDefault();if(e.shiftKey)bdRedoAct();else bdUndoAct();return;}
  if(meta&&k==='y'){e.preventDefault();bdRedoAct();return;}
  if(meta&&k==='c'){if(bdSel!=null){const it=b.items.find(x=>x.id===bdSel);if(it)bdClip=JSON.stringify(it);}return;}
  if(meta&&k==='x'){if(bdSel!=null){const it=b.items.find(x=>x.id===bdSel);if(it){bdClip=JSON.stringify(it);bdPush();b.items=b.items.filter(x=>x.id!==bdSel);bdSel=null;prjSave();renderBoard();}}return;}
  if(meta&&(k==='v')){if(bdClip){bdPush();const it=bdCloneItem(JSON.parse(bdClip),24,24);b.items.push(it);bdSel=it.id;prjSave();renderBoard();}return;}
  if(meta&&k==='d'){e.preventDefault();if(bdSel!=null){const it=b.items.find(x=>x.id===bdSel);if(it){bdPush();const c=bdCloneItem(it,24,24);b.items.push(c);bdSel=c.id;prjSave();renderBoard();}}return;}
  if(e.key==='Escape'){bdSetTool('select');bdSel=null;bdCloseShapes();renderBoard();}
  else if(e.key==='Delete'||e.key==='Backspace'){if(bdSel!=null){bdPush();b.items=b.items.filter(x=>x.id!==bdSel);bdSel=null;prjSave();renderBoard();}}
});
bdFile.addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const img=new Image();img.onload=()=>{bdPush();const c=bdCenter(),b=curProj().board,ratio=(img.height/img.width)||0.66,w=Math.min(300,img.width||300);b.items.push({id:PRJ.iseq++,type:'image',x:Math.round(c.x-w/2),y:Math.round(c.y-w*ratio/2),w,r:ratio,src:rd.result});bdSel=PRJ.iseq-1;prjSave();renderBoard();};img.src=rd.result;};rd.readAsDataURL(f);e.target.value='';});
document.getElementById('newProjBtn').addEventListener('click',openProjTpl);
document.querySelector('[data-page="projects"]').addEventListener('click',e=>{
  const del=e.target.closest('[data-pdel]');
  if(del){e.stopPropagation();const id=+del.dataset.pdel;askConfirm(tr('confirm_del_project'),()=>{PRJ.list=PRJ.list.filter(p=>p.id!==id);if(!PRJ.list.length)PRJ=projDefault();prjSave();renderProjGrid();});return;}
  if(e.target.closest('#projNewCard')){openProjTpl();return;}
  const open=e.target.closest('[data-popen]');if(open){openProject(+open.dataset.popen);}
});
function renameProjTitle(el){const old=el.textContent;const inp=document.createElement('input');inp.className='pd-rename';inp.value=old;el.replaceWith(inp);inp.focus();inp.select();
  const save=()=>{const v=inp.value.trim()||old;curProj().name=v;prjSave();renderProjGrid();const t=document.createElement('div');t.className='page-title';t.id='projTitle';t.textContent=v;inp.replaceWith(t);t.addEventListener('dblclick',()=>renameProjTitle(t));};
  inp.addEventListener('blur',save);inp.addEventListener('keydown',ev=>{if(ev.key==='Enter')inp.blur();});}
document.querySelector('#projTitle').addEventListener('dblclick',function(){renameProjTitle(this);});
try{renderProjGrid();}catch(e){}

// ---------- User / Profile ----------
let USER=(()=>{try{return JSON.parse(localStorage.getItem(ukey('workie_user')))||{};}catch(e){return {};}})();
USER=Object.assign({name:'Umberto',email:'umberto@workie.app',photo:'',surname:'',bio:'',workType:'',username:'',website:'',socials:{},share:{},joinTs:0},USER);
if(!USER.socials||typeof USER.socials!=='object')USER.socials={};
if(!USER.share||typeof USER.share!=='object')USER.share={};
if(!USER.joinTs){USER.joinTs=new Date().getTime();}
function fullName(){return (((USER.name||'')+' '+(USER.surname||'')).trim())||USER.name||'';}
function saveUser(){try{localStorage.setItem(ukey('workie_user'),JSON.stringify(USER));}catch(e){}}
function normUsername(u){return (u||'').trim().toLowerCase().replace(/^@+/,'').replace(/[^a-z0-9._]/g,'').slice(0,20);}
function usernameTaken(u,exceptEmail){u=normUsername(u);if(!u)return false;try{const m=loadAccounts();const ex=(exceptEmail||'').trim().toLowerCase();return Object.keys(m).some(k=>k!==ex&&normUsername(m[k].username)===u);}catch(e){return false;}}
function persistUsernameToAccount(){try{const sess=localStorage.getItem('workie_session');if(!sess)return;const m=loadAccounts();const k=sess.trim().toLowerCase();if(m[k]){m[k].username=USER.username||'';saveAccounts(m);}}catch(e){}}
function userInitial(){return ((USER.name||'U').trim().charAt(0)||'U').toUpperCase();}
function avatarInner(){return USER.photo?`<img src="${USER.photo}" alt="">`:userInitial();}
function renderUser(){
  const txt=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  const html=(id,v)=>{const el=document.getElementById(id);if(el)el.innerHTML=v;};
  txt('userName',(USER.name||'').trim()||fullName());txt('userMail',USER.email);html('userAvatar',avatarInner());html('mAvatar',avatarInner());
  txt('sh2Name',fullName());html('sh2Avatar',avatarInner());
  txt('profileName',fullName());txt('profileMail',USER.email);txt('profMailStatic',USER.email);html('profileAv',avatarInner());
  const sav=document.getElementById('stmAv');if(sav)sav.innerHTML=avatarInner();
  const rm=document.getElementById('profRemovePhoto');if(rm)rm.style.display=USER.photo?'inline-block':'none';
  const el=document.getElementById('profInputName');if(el&&document.activeElement!==el)el.value=USER.name;
  const uel=document.getElementById('profInputUsername');if(uel&&document.activeElement!==uel)uel.value=USER.username||'';
  txt('profileUsername',USER.username?('@'+USER.username):'');
}
const profPhotoFile=document.getElementById('profPhotoFile');
if(profPhotoFile)profPhotoFile.addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>openCropper(rd.result);rd.readAsDataURL(f);e.target.value='';});
// ----- image cropper -----
const cropOverlay=document.getElementById('cropOverlay'),cropImg=document.getElementById('cropImg'),cropStage=document.getElementById('cropStage'),cropZoom=document.getElementById('cropZoom');
let crop={S:264,imgW:0,imgH:0,cover:1,scale:1,tx:0,ty:0,drag:null};
function cropApply(){const rW=crop.imgW*crop.scale,rH=crop.imgH*crop.scale;crop.tx=Math.min(0,Math.max(crop.S-rW,crop.tx));crop.ty=Math.min(0,Math.max(crop.S-rH,crop.ty));cropImg.style.width=rW+'px';cropImg.style.transform=`translate(${crop.tx}px,${crop.ty}px)`;}
function openCropper(src){const im=new Image();im.onload=()=>{crop.imgW=im.naturalWidth;crop.imgH=im.naturalHeight;crop.cover=Math.max(crop.S/crop.imgW,crop.S/crop.imgH);crop.scale=crop.cover;crop.tx=(crop.S-crop.imgW*crop.scale)/2;crop.ty=(crop.S-crop.imgH*crop.scale)/2;cropImg.src=src;cropZoom.value='1';cropApply();cropOverlay.classList.add('open');};im.src=src;}
function closeCropper(){cropOverlay.classList.remove('open');}
cropZoom.addEventListener('input',()=>{const cx=crop.S/2,cy=crop.S/2,old=crop.scale;crop.scale=crop.cover*parseFloat(cropZoom.value);const f=crop.scale/old;crop.tx=cx-(cx-crop.tx)*f;crop.ty=cy-(cy-crop.ty)*f;cropApply();});
cropStage.addEventListener('mousedown',e=>{crop.drag={x:e.clientX,y:e.clientY,tx:crop.tx,ty:crop.ty};cropStage.classList.add('dragging');e.preventDefault();});
document.addEventListener('mousemove',e=>{if(!crop.drag)return;crop.tx=crop.drag.tx+(e.clientX-crop.drag.x);crop.ty=crop.drag.ty+(e.clientY-crop.drag.y);cropApply();});
document.addEventListener('mouseup',()=>{if(crop.drag){crop.drag=null;cropStage.classList.remove('dragging');}});
document.getElementById('cropX').addEventListener('click',closeCropper);
document.getElementById('cropCancel').addEventListener('click',closeCropper);
cropOverlay.addEventListener('click',e=>{if(e.target===cropOverlay)closeCropper();});
document.getElementById('cropSave').addEventListener('click',()=>{const out=256,cv=document.createElement('canvas');cv.width=out;cv.height=out;const ctx=cv.getContext('2d'),k=out/crop.S;ctx.drawImage(cropImg,crop.tx*k,crop.ty*k,crop.imgW*crop.scale*k,crop.imgH*crop.scale*k);USER.photo=cv.toDataURL('image/jpeg',0.9);saveUser();renderUser();closeCropper();});
renderUser();

// ---------- Auth / Onboarding ----------
const authGate=document.getElementById('authGate');
// Account registry — ogni email registrata è salvata (più account possibili)
function loadAccounts(){try{const m=JSON.parse(localStorage.getItem('workie_accounts'));if(m&&typeof m==='object'&&!Array.isArray(m))return m;}catch(e){}return {};}
function saveAccounts(m){try{localStorage.setItem('workie_accounts',JSON.stringify(m));}catch(e){}}
function findAccount(email){return loadAccounts()[(email||'').trim().toLowerCase()]||null;}
function saveAccount(acc){const m=loadAccounts();m[acc.email.trim().toLowerCase()]=acc;saveAccounts(m);}
// migrazione dal vecchio singolo account
(function(){let old=null;try{old=JSON.parse(localStorage.getItem('workie_account'));}catch(e){}if(old&&old.email){const m=loadAccounts();if(!m[old.email.toLowerCase()]){m[old.email.toLowerCase()]=old;saveAccounts(m);}localStorage.removeItem('workie_account');}})();
function authShow(name){
  document.querySelectorAll('.auth-screen').forEach(s=>s.classList.toggle('active',s.dataset.auth===name));
  if(typeof stopSplash==='function'&&name!=='splash')stopSplash();
  if(name==='splash'&&typeof startSplash==='function')startSplash();
  if(name==='signup'){if(typeof suReset==='function')suReset();if(typeof renderSuCarousel==='function')renderSuCarousel();}
  if(name==='obdescribe'&&typeof renderObDesc==='function')renderObDesc();
  if(name==='register'){const e=document.getElementById('regEmail');if(!e.value)e.value=USER.email&&USER.email!=='umberto@workie.app'?USER.email:'';document.getElementById('regErr').textContent='';}
  if(name==='login'){document.getElementById('loginErr').textContent='';}
  if(name==='obname'){const i=document.getElementById('obNameInput');if(!i.value)i.value=obData.name||'';setTimeout(()=>i.focus(),40);}
  if(name==='obusername'){const i=document.getElementById('obUserInput');if(!i.value)i.value=obData.username||'';setTimeout(()=>i.focus(),40);}
}
function enterApp(acc){
  localStorage.setItem('workie_session',acc.email);
  // ricarica: ogni account legge/scrive i propri dati (desktop, progetti, profilo, connessioni) nel suo namespace
  location.reload();
}
function validEmail(s){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);}
let obReg=null,obData={name:'',username:'',profession:'',segment:''};
let obOAuth=false,obUid=null,obEmail='',obPhoto='';
async function googleSignIn(){
  if(!sb){if(typeof showToast==='function')showToast('Server non disponibile');return;}
  const redirectTo=location.origin+location.pathname;
  try{const{error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo,queryParams:{prompt:'select_account'}}});
    if(error){if(typeof showToast==='function')showToast(error.message.replace(/provider is not enabled/i,'Login Google non ancora attivo su Supabase'));}
  }catch(e){if(typeof showToast==='function')showToast(String(e&&e.message||e));}
}
// avvia l'onboarding per un utente già autenticato (es. primo accesso con Google) senza username
function startOAuthOnboarding(user,prof){
  obOAuth=true;obReg=null;obUid=user.id;obEmail=user.email||'';
  const md=user.user_metadata||{};
  const fullName=((md.full_name||md.name||(prof&&prof.name)||'')+'').trim();
  obPhoto=md.avatar_url||md.picture||(prof&&prof.photo)||'';
  obData={name:fullName,username:'',profession:'',segment:''};
  try{authGate.classList.remove('hidden');}catch(e){}
  if(typeof applyThemeVars==='function')applyThemeVars();
  if(fullName){authShow('obusername');setTimeout(()=>{const i=document.getElementById('obUserInput');if(i)i.focus();},60);}
  else{authShow('obname');const ni=document.getElementById('obNameInput');if(ni){ni.value='';setTimeout(()=>ni.focus(),60);}}
}
// nav between welcome/firstof/login/register
document.getElementById('goContinue').addEventListener('click',()=>authShow('firstof'));
document.getElementById('goRegister').addEventListener('click',()=>authShow('register'));
document.getElementById('goLogin').addEventListener('click',()=>authShow('login'));
document.getElementById('toRegister').addEventListener('click',()=>authShow('register'));
document.getElementById('toLogin').addEventListener('click',()=>authShow('login'));
// register — flusso semplice: email + password → dentro l'app (niente onboarding)
async function registerAndEnter(email,pw,errEl){
  const nm=(email.split('@')[0]||'Utente');
  if(!sb){if(findAccount(email)){if(errEl)errEl.textContent=tr('err_email_taken');return;}const acc={email,pw,name:nm,username:'',onboarded:true};saveAccount(acc);enterApp(acc);return;}
  if(errEl)errEl.textContent='…';
  const r=await sbSignUp(email,pw);
  if(r.error){if(errEl)errEl.textContent=/already|registered|exists|duplicate/i.test(r.error||'')?tr('err_email_taken'):r.error;return;}
  if(r.needConfirm){if(errEl)errEl.textContent='';if(typeof showToast==='function')showToast(tr('confirm_email_sent'));const le=document.getElementById('loginEmail');if(le)le.value=email;authShow('login');return;}
  const uid=r.user.id;localStorage.setItem('workie_session',uid);
  const prof={name:nm,surname:'',username:'',email:email,bio:'',workType:'other',website:'',socials:{},share:{},photo:'',joinTs:Date.now()};
  try{localStorage.setItem('workie_user::'+uid,JSON.stringify(prof));}catch(e){}
  try{await sb.from('profiles').upsert({id:uid,name:nm});}catch(e){}
  location.reload();
}
function doRegister(){
  const email=document.getElementById('regEmail').value.trim(),pw=document.getElementById('regPw').value,pw2=document.getElementById('regPw2').value,err=document.getElementById('regErr');
  if(!validEmail(email)){err.textContent=tr('err_email');return;}
  if(pw.length<6){err.textContent=tr('err_pw_short');return;}
  if(pw!==pw2){err.textContent=tr('err_pw_match');return;}
  registerAndEnter(email,pw,err);
}
document.getElementById('regBtn').addEventListener('click',doRegister);
document.getElementById('regPw2').addEventListener('keydown',e=>{if(e.key==='Enter')doRegister();});
// login
async function doLogin(){
  const email=document.getElementById('loginEmail').value.trim(),pw=document.getElementById('loginPw').value,err=document.getElementById('loginErr');
  if(!sb){const acc=findAccount(email);if(!acc){err.textContent=tr('err_no_account');return;}if(acc.pw!==pw){err.textContent=tr('err_wrong_pw');return;}err.textContent='';enterApp(acc);return;}
  err.textContent='…';
  const r=await sbSignIn(email,pw);
  if(r.error){err.textContent=/invalid|credentials|not confirmed/i.test(r.error)?tr('err_wrong_pw'):r.error;return;}
  err.textContent='';localStorage.setItem('workie_session',r.user.id);location.reload();
}
document.getElementById('loginBtn').addEventListener('click',doLogin);
document.getElementById('loginPw').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
{const lg=document.getElementById('loginGoogle');if(lg)lg.addEventListener('click',googleSignIn);const rg=document.getElementById('regGoogle');if(rg)rg.addEventListener('click',googleSignIn);}
// onboarding: name
function obNameNext(){const v=document.getElementById('obNameInput').value.trim();if(!v){const i=document.getElementById('obNameInput');i.style.borderColor='#f0a0a0';i.focus();return;}obData.name=v;authShow('obusername');}
document.getElementById('obNameInput').addEventListener('keydown',e=>{if(e.key==='Enter')obNameNext();});
// onboarding: username
async function obUsernameNext(){
  const inp=document.getElementById('obUserInput'),err=document.getElementById('obUserErr');
  const u=normUsername(inp.value);if(inp.value!==u)inp.value=u;
  if(u.length<3){err.textContent=tr('username_short');inp.focus();return;}
  err.textContent='…';
  const taken=sb? await sbUsernameTaken(u,null) : usernameTaken(u,obReg&&obReg.email);
  if(taken){err.textContent=tr('username_taken');inp.focus();return;}
  err.textContent='';obData.username=u;authShow('obdescribe');
}
document.getElementById('obUserInput').addEventListener('input',e=>{const u=normUsername(e.target.value);if(e.target.value!==u)e.target.value=u;document.getElementById('obUserErr').textContent='';});
document.getElementById('obUserInput').addEventListener('keydown',e=>{if(e.key==='Enter')obUsernameNext();});
// onboarding: cosa ti descrive (3 card illustrate) -> entra
const OB_DESC=[
  {v:'worker',k:'prof_worker',vb:'0 0 120 142',svg:'<path d="M41.4713 0.0483743C47.2338 -0.366705 53.4834 1.88868 56.8692 6.84365C59.8471 11.2003 56.9754 14.6597 56.7206 19.1279C56.5944 21.3434 57.7024 24.3968 57.2215 26.7057C56.9329 28.4098 55.2398 28.6558 53.8644 28.2962C50.7876 32.2356 50.6859 34.4521 44.7992 33.4676C43.6806 33.3497 42.5176 33.0695 41.402 33.3836C36.7066 34.8405 39.5523 37.0434 40.5813 39.7309C42.9765 45.9773 43.5 52.7704 45.4353 59.1644C46.2212 61.7604 47.3432 64.1762 50.0093 65.2014C58.9827 68.6517 73.155 62.0876 77.964 73.4679C78.0739 73.7264 77.9103 74.1187 77.7654 74.3344C76.3252 75.409 75.8868 73.6205 75.3284 72.8562C72.1532 68.5095 67.8563 68.5781 63.0747 68.758C58.603 68.9264 49.4567 68.9011 46.2735 65.5207C41.6937 60.6569 41.4742 50.2823 39.5552 44.0709C39.1338 42.7809 38.7177 41.4804 38.235 40.2121C37.9191 39.5687 37.6229 38.7832 37.259 38.1714C36.2742 36.5541 35.8977 34.4228 37.3434 32.9734C40.082 30.2279 43.3397 31.1203 46.6781 31.4411C49.5921 31.7209 50.3603 28.5591 51.9689 26.8961C52.9066 25.9267 53.7677 26.0165 55.0297 26.0501C55.2846 23.2525 54.5159 20.4348 54.6463 17.5179C54.6321 15.5111 56.4046 11.8836 55.782 10.0368C53.0572 1.89423 38.3426 -1.13115 33.8591 6.93799C31.742 10.5618 31.5101 14.7704 32.5187 18.8041C33.1305 21.2507 34.7156 25.3777 33.471 27.8392C32.7199 29.3244 30.2613 30.5502 28.8601 31.4688C23.4982 34.9674 20.6842 42.7674 19.4603 48.9521C17.8983 56.8447 17.1364 66.0522 17.294 74.1351C17.3748 78.2771 17.9934 82.3358 17.7702 86.5131C17.6855 88.0997 17.2971 90.7156 15.4309 91.1381C14.0997 91.4938 12.5697 89.6511 12.3265 88.4138C10.9667 81.5626 10.4877 74.574 9.36899 67.6564C8.98926 65.3087 8.13588 60.2868 6.11184 58.7808C5.13505 58.0539 2.92376 58.2897 2.43237 59.6328C1.55837 62.0221 2.22077 64.5121 2.75651 66.9001C3.43265 70.5456 4.46303 74.1023 5.21898 77.7259C5.43258 78.6655 5.50465 79.6707 5.69577 80.6104C6.60336 85.0689 6.78748 90.4179 8.13088 94.6961C8.43766 95.8123 8.82289 96.9046 9.28368 97.9653C16.1018 114.053 46.8563 89.6687 53.3292 104.041C56.2359 110.495 54.8284 128.441 56.4295 135.855C56.9242 138.141 58.2707 139.115 59.0339 140.931C58.6617 142.812 57.1278 141.843 56.3658 140.818C52.5049 135.625 53.5269 127.021 53.2182 120.783C53.0459 117.117 52.6866 113.465 52.142 109.837C51.8595 107.84 51.587 105.04 50.1923 103.506C47.3893 100.423 42.237 101.932 38.7592 102.529C32.2173 103.651 25.5502 106.219 18.875 105.923C18.5411 107.388 17.7546 108.707 17.3532 110.134C15.9354 115.175 15.8266 120.668 15.0857 125.844C14.747 128.211 14.4932 143.509 10.4212 141.824C9.55673 140.917 10.4431 139.704 10.745 138.682C12.7724 131.824 12.6946 124.334 13.7793 117.269C14.1107 115.111 14.0848 112.834 14.604 110.696C15.0253 108.934 15.6077 107.46 16.4115 105.875C7.14709 104.78 5.99105 96.361 4.87111 88.6623C4.46702 85.977 4.02647 83.2956 3.54969 80.6217C2.41688 74.2108 0.164755 67.5558 0.00237169 61.116C-0.0830667 57.7312 2.14745 55.7215 5.46893 56.1954C7.20155 56.4426 8.39844 57.4424 9.2748 59.0608C12.4726 66.8526 12.1547 75.8126 13.7456 84.0536C13.9364 85.0424 14.0991 88.492 15.1163 88.5475C15.4982 88.1073 15.5845 86.0842 15.5664 85.47C15.3142 76.9086 14.6815 68.4236 15.4686 59.8567C16.2082 51.8053 17.2473 43.7054 21.1228 36.4776C22.4319 34.0361 24.1889 31.9638 26.3785 30.2845C27.3789 29.5219 30.6219 27.9727 31.236 26.9698C32.5193 24.8736 30.3005 20.3126 29.978 17.5834C29.4306 12.9533 29.5848 8.54054 32.4199 4.66079C34.8677 1.31102 37.6983 0.580625 41.4713 0.0483743Z"/><path d="M31.8638 62C32.4588 62.0369 32.6548 62.3278 33.0923 62.7483C35.2877 71.3246 37.8209 78.0389 47.6782 78.7372C51.7797 79.0277 60.0753 79.6073 63.3584 82.0874C64.6363 82.0054 65.9886 81.7187 67.288 81.6897C71.9612 81.5874 76.6674 81.6328 81.3419 81.6631L108.714 81.9473C110.887 81.9649 113.06 81.9624 115.244 82.0041C116.532 82.0546 117.944 81.7477 119.204 82.0243C120.148 82.2327 120.091 83.3225 119.848 84.0258C119.562 84.2834 119.391 84.3769 118.981 84.3744C115.324 84.3491 111.547 84.2872 107.897 84.2355C108.382 85.67 108.598 87.4619 108.801 88.976C109.359 93.2784 109.484 97.6274 109.173 101.955C108.988 104.387 108.619 106.855 108.485 109.281C108.267 113.864 108.253 118.457 108.443 123.042C108.576 125.978 109.168 129.005 109.324 131.94C109.407 133.506 111.024 137.581 109.682 138.471C109.345 138.488 109.076 138.493 108.765 138.343C106.126 137.06 105.63 117.453 105.691 114.015C105.743 111.089 106.101 108.232 106.304 105.322C106.637 100.596 106.754 95.9365 106.471 91.2086C106.341 89.0518 106.2 86.7067 105.515 84.6433C105.171 84.3074 105.296 84.4123 104.673 84.3832L65.5505 84.0094C65.8081 84.2986 66.0543 84.5966 66.2879 84.9047C67.1453 86.0324 67.8966 88.0756 68.2501 89.442C71.2819 101.158 67.5064 112.979 65.9141 124.607C65.5871 128.677 65.1249 133.021 68.6075 135.881C70.4813 137.421 75.1079 137.311 76.007 138.48C76.6749 140.945 73.282 139.71 72.2794 139.546C59.5488 137.461 63.6349 124.146 64.9949 115.371C66.2639 106.649 68.413 97.0124 65.505 88.4002C63.1753 81.5217 53.9661 81.5672 47.9937 81.1605C38.5036 80.5127 33.9178 74.7809 31.5996 66.098C31.167 64.4776 30.379 63.1964 31.8638 62Z"/><path d="M107.389 48C110.225 48.4522 108.544 50.5679 108.106 52.367C107.693 54.0623 106.944 55.7728 106.349 57.4122L101.786 69.6918C100.731 72.5271 99.8335 75.8017 98.4291 78.4581C98.0073 79.2549 92.1079 78.9252 90.9725 78.9514C83.353 79.1213 76.0645 78.9052 68.6129 77.3403C68.5738 77.3453 68.5346 77.3503 68.4942 77.3553C68.1494 77.3915 67.8387 77.434 67.5179 77.2554C67.2414 77.1005 67.0772 76.8333 67.0203 76.5285C66.9484 76.1364 67.0683 75.6081 67.3664 75.3184C68.2644 74.4504 71.3485 75.3771 72.4738 75.6019C80.3446 77.1805 88.6411 76.5161 96.6407 76.6147C96.8984 75.0498 97.7155 73.2751 98.2611 71.764L102.655 59.8528C103.883 56.5969 105.037 53.249 106.166 49.9565C106.51 48.9538 106.459 48.6518 107.389 48Z"/>'},
  {v:'student',k:'prof_student',vb:'0 0 111 142',svg:'<path d="M39.7903 0.079928C44.8801 -0.375068 49.6363 1.10134 53.2544 4.79563C56.1017 7.7032 57.4894 12.1247 56.287 16.0855C55.9199 17.2959 54.8258 18.4489 54.6044 19.7268C54.3372 21.6839 55.0978 23.6951 55.0076 25.656C54.8993 28.007 53.6153 28.2558 51.6863 28.0714C50.5281 29.5344 49.583 31.2662 48.2039 32.531C44.5292 35.9012 39.0943 29.6011 36.6329 35.2352C37.0605 36.3233 37.8341 37.4067 38.3825 38.4612C41.378 44.2213 41.9116 50.8863 43.7696 57.0484C44.7798 60.3288 45.5985 64.6528 49.3697 65.7637C51.662 66.439 53.888 66.6354 56.2377 66.7295C59.2901 66.8517 62.4183 67.0162 65.4466 66.599C66.4648 66.4588 67.9008 65.6699 68.8239 65.1983C65.9389 61.9728 62.5964 61.0901 59.7161 58.9201C59.6668 58.7767 59.6487 58.7602 59.6524 58.584C59.6764 57.5378 70.4019 40.0443 71.3431 39.4237C71.5862 39.2637 72.1447 39.3258 72.4191 39.3736C73.1714 39.5044 73.9297 39.8062 74.647 40.0604C78.8176 41.5374 81.6377 44.1481 84.2086 47.6779C84.5059 47.5517 84.8092 47.4375 85.1161 47.3356C89.7176 45.833 94.7138 45.5985 99.1179 47.8448C99.556 48.0683 99.6053 48.3357 99.6956 48.7644C99.302 49.9473 87.7677 68.51 87.2947 68.8706C86.6315 69.3762 85.3617 68.9456 84.6299 68.7992C83.1952 72.6511 78.1159 76.4897 73.9754 76.6663C72.4155 76.7317 70.4296 76.5429 68.9973 76.7377C66.5744 77.0668 64.1057 78.4362 61.6359 78.7859C61.3567 78.8306 61.1388 78.9806 61.0209 79.2274C61.5083 79.6037 63.3523 79.3871 64.0588 79.4633C72.3289 80.3428 86.8782 77.5035 90.6985 87.2724C92.6303 92.2131 93.8207 98.6745 94.8161 103.796C95.9054 109.392 97.044 114.979 98.232 120.555C98.9807 123.962 99.5403 128.114 101.638 130.972C104.511 134.885 109.033 134.514 110.664 136.175C110.896 136.412 110.99 136.62 111 136.955C110.724 137.587 110.082 138.001 109.385 137.818C106.034 136.986 101.408 134.976 99.5367 131.859C96.9213 127.5 95.8789 120.493 94.8871 115.455C93.7461 109.492 92.5485 103.541 91.2955 97.6015C90.5072 93.8766 89.8572 89.3932 87.6137 86.2478C86.4112 84.5638 84.7418 83.5306 82.7775 82.9499C78.6792 81.7389 72.4264 81.993 68.0789 81.8103C62.2233 81.5647 56.3568 81.2103 50.5022 81.0143C47.8655 80.926 45.2383 81.2066 42.6196 80.753C38.5272 80.044 35.3083 78.0031 32.9412 74.5613C31.826 72.939 30.8549 71.1849 29.9693 69.4271C28.945 67.3943 24.3794 57.3608 24.7153 55.4811C24.9271 55.1327 24.9141 55.1595 25.2867 54.988C25.8565 54.962 26.3553 55.3221 26.5729 55.8401C29.2046 62.1024 32.2669 72.933 38.1244 76.8865C43.3936 80.4433 54.3612 78.6141 60.2963 77.0873C62.5952 76.4958 65.4285 75.5751 67.7804 74.969C72.9006 74.5468 76.9989 75.505 80.818 71.0518C81.2104 70.5933 82.4489 69.6412 82.2684 68.9395C81.0347 68.2351 76.4766 69.3968 74.9432 69.0472C74.6507 68.9807 74.5183 68.7 74.4075 68.4834C74.6964 66.8583 77.5309 67.0392 78.2531 65.8055L78.1604 65.6246C75.752 64.7768 71.4827 65.9077 69.2909 67.1694C68.8925 67.3988 67.0378 68.3177 66.436 68.3891C60.2445 69.1198 50.7358 69.8505 45.5476 65.8983C40.033 59.1108 40.7696 46.8935 36.5455 39.2747C35.0056 36.7944 33.5178 34.4454 36.3126 32.0528C38.8723 29.8614 41.8366 31.1602 44.6238 31.5636C47.727 32.0126 48.5668 28.2825 50.5125 26.6792C51.519 25.8499 51.7473 26.3063 52.7621 26.1562C53.5103 25.3024 52.3874 20.2338 52.8135 18.9484C53.4758 16.9877 54.5141 16.3021 54.6778 14.0481C55.4192 3.90874 41.4801 -1.65936 34.2858 4.62227C30.3394 8.06819 29.2134 13.4828 30.3834 18.4643C30.7482 20.21 31.7822 22.3504 31.5761 24.1398C31.1237 28.0696 26.5293 30.1906 23.8041 32.4988C19.774 35.8707 16.9537 42.2034 16.0301 47.3676C13.912 59.2116 14.5238 72.1527 17.0705 83.8875C18.0286 88.3032 20.053 93.6274 23.5251 96.6082C25.6874 98.4386 28.9165 99.6266 31.7217 99.917C43.0447 101.088 54.3769 98.3999 65.6055 97.3341C68.9431 97.0184 72.6659 96.8151 75.6497 98.6141C76.9664 99.3919 78.3855 101.109 78.8922 102.623C82.0156 111.971 82.6367 122.195 84.9055 131.776C85.5976 135.576 87.4825 138.181 91.4821 138.701C92.6713 138.855 94.5622 138.607 94.8835 140.238C94.6921 140.915 94.1698 141.135 93.5078 141.111C91.8408 141.048 88.845 140.507 87.3838 139.734C86.5172 139.266 85.7529 138.629 85.1354 137.859C82.467 134.564 81.4908 126.32 80.7831 122.036C80.0754 117.683 79.2774 113.345 78.3903 109.025C77.4238 104.31 76.6848 99.7597 70.8869 99.4307C66.2205 99.1113 61.6359 100.149 57.0212 100.646C47.8509 101.634 37.1987 103.717 28.151 101.397C17.8364 98.7508 15.198 87.1865 13.751 78.0721C13.1295 74.1585 12.7433 70.0719 11.4084 66.2877C10.5904 63.7908 9.64662 61.357 7.69988 59.5222C5.43058 57.3832 1.73028 56.9502 2.17875 61.1597C2.43825 63.5951 3.00913 65.5557 3.61323 67.9058C4.33287 70.6513 5.01857 73.406 5.67009 76.1679C7.30991 83.2475 8.27184 90.7058 10.7766 97.489C12.272 101.539 15.7289 104.573 19.943 105.372C27.008 106.712 34.6232 105.799 41.7108 105.274C45.5003 104.994 51.4518 104.203 54.9414 105.173C55.9681 105.454 56.9201 105.957 57.7314 106.646C60.7091 109.146 61.2508 114.184 61.8742 117.808C63.0225 124.472 63.41 131.305 64.9386 137.898C65.2058 139.05 66.3565 140.642 65.4309 141.602C64.4933 141.945 63.7663 141.568 63.4714 140.619C60.6754 131.609 60.8969 121.833 58.6449 112.669C57.8987 109.629 56.529 107.57 53.2476 107.115C50.0488 106.671 47.0118 107.15 43.8217 107.335C36.7549 107.751 29.2418 108.857 22.1911 107.94C21.6407 108.675 20.323 110.559 20.0834 111.417C17.4299 120.913 17.2607 130.991 14.632 140.53C14.2459 141.931 13.065 142.67 12.3243 141.182C12.1307 140.793 12.8603 138.402 12.9494 137.808C15.0035 129.552 15.5066 121.014 17.3853 112.731C17.8275 110.781 18.5286 109.323 19.5598 107.635C12.7663 105.607 9.66009 102.001 7.68122 95.0997C6.08679 89.5383 5.30612 83.8318 4.01668 78.1931C3.43569 75.5679 2.79091 72.9572 2.08282 70.3634C1.48089 68.1124 0.537736 64.7183 0.157271 62.5043C-0.0567323 61.3225 -0.052275 60.1112 0.170274 58.9311C0.362372 57.914 0.771841 57.0402 1.66926 56.5252C5.46343 54.3478 9.4402 57.426 11.28 60.7132C11.7443 61.5425 12.0616 62.3006 12.526 63.0572L12.6013 63.178C12.725 61.5474 12.6164 59.5467 12.7198 57.7605C13.2298 48.8267 14.6381 39.5152 20.7929 32.5968C23.3461 29.7269 26.6988 28.4381 28.9587 25.4797C30.0284 24.0841 29.4794 22.2887 29.0018 20.7908C25.9629 11.2592 29.6731 2.01823 39.7903 0.079928ZM61.8682 58.0679C66.0171 60.6395 66.9667 60.6517 70.828 64.3786C71.1903 64.2532 71.6717 64.0686 72.028 63.9667L73.1365 63.8414C76.1251 59.0202 79.3809 53.5522 82.5019 48.8574C80.1729 45.0237 76.7931 42.3755 72.3903 41.3604L72.1977 41.3178C68.6061 46.8076 65.1613 52.3928 61.8682 58.0679ZM80.0176 66.7281L81.3452 66.6978C83.0014 66.7031 84.6094 66.7652 86.2343 67.1463L97.3365 49.2132C95.5419 48.4631 93.6125 48.0969 91.6711 48.1382C88.7017 48.3584 87.273 48.7785 84.406 49.5126C83.5093 50.8032 76.0661 62.3258 75.8362 63.3616C76.7943 64.2509 81.4848 62.3713 80.0176 66.7281Z"/>'},
  {v:'other',k:'prof_other',vb:'0 0 123 191',svg:'<path d="M30.6579 0.0984197C35.7821 -0.550456 40.3237 2.06118 43.078 6.3967C44.7825 6.19377 46.5298 5.89791 48.2251 6.2606C54.0317 7.50243 56.4978 10.3021 55.5134 16.4412C56.2855 16.4392 57.0569 16.4597 57.8278 16.5024C60.4445 16.6724 63.4712 17.6838 65.2127 19.7862C66.5308 21.4063 67.1615 23.5034 66.9647 25.6072C66.0268 34.9308 49.5712 32.6229 43.1865 32.6332C41.3735 32.6361 38.6825 32.5817 36.9202 32.3456C32.8408 32.5196 28.0127 32.4299 23.9013 32.4679C17.2195 32.5296 6.73774 34.8009 1.62941 29.4624C-1.80303 25.8756 0.722437 18.7204 4.26685 16.0859C8.33819 12.8775 12.0092 12.1519 16.9868 12.6239C18.6176 5.08282 23.0847 0.871879 30.6579 0.0984197ZM36.4517 30.3928C42.7639 30.6518 59.204 32.374 63.6039 28.2554C64.5179 27.3996 65.004 26.295 65.0457 25.025C65.0964 23.4891 64.4792 22.0393 63.4653 20.9316C61.8744 19.1943 59.4127 18.4872 57.1449 18.4528C55.8807 18.4336 54.2889 18.8111 53.1533 18.1843C52.3898 16.7371 55.7131 12.8835 52.0899 10.0933C48.1495 7.05878 46.6906 8.54825 42.3025 8.36498C41.686 8.33918 40.362 5.90881 39.8597 5.42C37.6551 2.85538 33.7885 1.66193 30.5621 2.12155C24.8551 2.76674 20.0555 6.31205 19.1887 12.0817C18.5754 16.1639 17.6784 14.3765 14.0906 14.4212C8.378 14.4921 1.61003 18.7224 2.06762 25.3559C2.32199 28.8806 5.84538 30.3732 8.81695 30.7425C10.8726 31.0652 12.9605 30.8302 15.0142 30.897C17.1645 30.967 19.3284 30.5423 21.4328 30.5265C26.2613 30.4902 31.6608 30.0919 36.4517 30.3928Z"/><path d="M47.3312 49.1398C47.361 49.1331 47.3909 49.1265 47.4207 49.1198C50.3137 48.7151 53.2582 49.3432 55.7222 50.8907C57.7269 52.1775 59.4249 54.1606 59.9118 56.4683C60.0711 57.0784 60.4558 58.7753 60.854 59.1775C63.652 62.0004 64.2231 61.9542 63.0269 65.9697C62.9683 66.1645 63.3831 69.2964 63.341 70.1527C63.1501 73.9558 59.5001 73.9769 57.5976 76.4907C56.8261 77.5796 56.9088 79.0971 57.1498 80.3328C57.3617 81.4214 59.3843 82.1423 60.3416 82.5132C61.3649 82.9092 62.3492 83.2907 63.3515 83.7374C64.3688 84.1813 65.3486 84.7071 66.2803 85.3092C77.9503 92.9613 79.8468 123.001 78.7182 135.866C78.5574 137.702 77.8422 140.46 77.229 142.222C76.5318 144.232 75.6737 146.186 74.6639 148.062C74.0538 149.199 72.8802 150.713 72.8757 152.019C72.9358 154.745 73.4422 157.475 73.573 160.2C73.9276 167.682 72.8562 175.015 72.6157 182.469C72.5616 184.099 72.7089 187.528 71.8509 188.783C71.3489 189.063 71.6059 189.02 71.0574 188.94C70.6772 188.523 70.5074 187.84 70.4969 187.291C70.3767 181.033 71.1882 174.661 71.4752 168.448C71.6059 165.699 71.6089 162.946 71.4857 160.197C71.3715 157.834 71.2122 153.184 70.5495 150.992C69.149 146.349 67.9378 142.331 66.9896 137.552C65.9948 132.353 65.0406 127.146 64.1299 121.932C63.4807 118.373 62.9563 114.682 61.8082 111.271C61.5633 110.542 61.5603 110.472 61.8939 109.853C62.4499 109.507 62.1569 109.59 62.8015 109.581C63.4387 109.872 63.8188 110.808 63.9856 111.459C66.3554 120.714 67.4043 130.274 69.4781 139.597C70.1693 142.706 70.8485 145.308 72.0793 148.263C74.2026 145.486 75.522 141.539 76.2673 138.177C78.7588 126.937 75.7008 96.4907 66.9911 88.3527C65.7333 87.1767 64.205 86.276 62.6377 85.562C60.5429 84.6079 56.7265 83.8774 55.5058 81.7827C55.1025 81.0905 55.1198 79.8272 55.0914 79.0384C54.8577 72.5535 59.8021 74.2147 61.2177 70.7821C61.8488 69.2518 61.105 67.0288 61.1981 65.3492C61.2447 64.5224 61.5242 63.7099 61.7616 62.9202C61.0043 61.9526 59.6954 61.1396 59.0583 60.0945C58.1867 58.665 58.3024 56.9047 57.4338 55.4443C54.386 50.3184 47.4618 49.9774 42.6507 52.651C38.5991 54.8628 36.0296 58.8019 36.1925 63.4782C36.3542 68.1227 39.3795 70.3814 42.7095 73.0625C44.4854 74.6084 44.8857 75.7675 45.1 77.9023C45.6885 82.0081 41.098 83.3368 38.113 85.2846C29.6615 90.7998 28.8972 100.526 27.8239 109.618C26.8753 117.654 25.9779 125.875 29.7375 133.509C30.1742 134.396 30.3831 135.486 31.1687 136.199L31.3822 136.158C31.7157 135.426 31.7338 133.776 31.833 132.898C32.3509 128.307 32.2554 123.795 32.3076 119.202C32.3261 117.565 32.1615 114.377 32.317 112.964C32.771 112.28 33.2378 112.244 33.9338 112.679C34.6906 114.049 34.2563 126.813 34.1401 129.034C33.8283 134.993 32.9978 140.903 33.0822 146.882C33.1012 148.22 33.164 149.445 34.2299 150.413C37.8201 153.676 52.0846 152.681 56.8793 151.793C58.8434 151.428 62.253 150.143 63.9856 150.175C64.3688 150.182 64.5071 150.271 64.7731 150.527C64.9023 151.091 64.9188 150.826 64.7641 151.352C63.8234 152.258 61.975 152.603 60.6782 152.912C55.4456 154.207 50.0543 154.774 44.6617 154.598C43.0155 154.543 38.2915 153.965 37.4482 154.053C35.3686 155.584 36.0962 168.152 36.1396 170.953C36.1951 175.301 36.0964 179.65 35.8438 183.992C35.7816 185.15 35.7217 186.745 35.5632 187.913C35.5081 188.32 35.0699 188.616 34.6921 188.788C33.4011 188.459 33.7312 185.613 33.8065 184.556C34.2662 178.103 34.2314 171.728 34.0913 165.272C34.012 161.617 34.0916 156.877 34.9862 153.36C34.3105 152.964 33.4361 152.465 32.8534 151.993C29.6939 149.357 31.8754 144.679 31.0279 141.293C30.4725 139.62 29.5267 137.74 28.7021 136.189C23.7627 126.887 24.8069 118.545 25.961 108.617C27.0675 99.0977 28.3179 88.5673 37.7536 83.1957C39.2863 82.3229 41.5856 81.1944 42.7432 79.9233L42.8819 79.7681C43.976 74.7394 40.2239 74.2594 37.5499 71.2283C29.6314 62.252 36.454 50.6629 47.3312 49.1398Z"/><path d="M102.156 26.0606C103.768 25.8944 105.4 26.071 106.937 26.5787C110.44 27.7398 112.325 29.6787 113.931 32.8348C121.568 31.5151 125.578 38.8982 121.174 44.3888C118.588 47.6119 108.694 46.9093 104.44 46.9678C100.928 47.003 97.3207 47.0206 93.8108 46.9604C91.125 46.8794 85.9624 46.6366 84.1319 44.3761C80.3937 39.7631 86.7198 34.4578 91.4215 34.5056C92.3582 34.5152 93.04 34.5643 93.8819 34.6416C94.9091 30.2669 97.3489 26.7423 102.156 26.0606ZM103.032 45.0741C106.813 45.0928 116.935 45.7788 119.603 43.1791C120.602 42.2056 121.042 40.8045 120.996 39.441C120.949 38.0242 120.357 36.6609 119.284 35.7018C118.273 34.7966 117.033 34.5951 115.705 34.6722C114.643 34.7337 113.561 35.1491 112.586 34.5845C111.881 33.6847 111.701 32.8257 111.123 31.949C109.441 29.3978 106.874 28.2158 103.883 27.8654C103.599 27.8306 103.313 27.8116 103.026 27.8087C100.702 28.1729 98.837 29.0417 97.423 30.9962C96.9205 31.6955 96.5396 32.472 96.295 33.2939C96.0341 34.1413 95.8474 36.5984 94.881 36.5136C90.8019 36.1548 85.1694 36.6779 85.1057 41.9546C85.0983 42.5196 86.0024 43.4776 86.5079 43.7234C90.0252 45.5549 98.9808 45.1402 103.032 45.0741Z"/><path d="M48.7169 165C52.5237 165.949 53.1642 185.164 52.9688 188.883C52.91 190.003 53.0656 190.298 52.258 191C51.7844 190.851 51.6135 190.847 51.2926 190.444C51.1176 189.987 50.953 180.975 50.8411 179.392C50.6703 176.961 50.3604 174.541 49.913 172.15C49.6374 170.679 49.3 169.367 48.7534 167.983C48.5077 167.361 47.9535 166.347 48.0031 165.724C48.2413 165.25 48.2908 165.268 48.7169 165Z"/>'},
];
function renderObDesc(){const el=document.getElementById('obDescCards');if(!el)return;
  el.innerHTML=OB_DESC.map(d=>`<div class="ob-desc-card" data-descv="${d.v}"><div class="ob-desc-ill"><svg viewBox="${d.vb}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${d.svg}</svg></div><div class="ob-desc-label">${tr(d.k)}</div></div>`).join('');
}
async function finishOAuth(){
  const uid=obUid;if(!uid||!sb){location.reload();return;}
  localStorage.setItem('workie_session',uid);
  const prof={name:(obData.name||'').trim()||'Utente',surname:'',username:obData.username||'',email:obEmail,bio:'',workType:obData.profession||'other',website:'',socials:{},share:{},photo:obPhoto||'',joinTs:Date.now()};
  try{localStorage.setItem('workie_user::'+uid,JSON.stringify(prof));}catch(e){}
  try{await sb.from('profiles').upsert({id:uid,name:prof.name,username:(obData.username||'').toLowerCase()||null,work_type:obData.profession||'other',photo:obPhoto||null});}catch(e){}
  location.reload();
}
async function finishSignup(){
  if(obOAuth){return finishOAuth();}
  if(!sb){const acc={email:obReg.email,pw:obReg.pw,name:(obData.name||'').trim()||'Utente',username:obData.username||'',profession:obData.profession||'other',segment:obData.segment||'',onboarded:true};saveAccount(acc);enterApp(acc);return;}
  const email=obReg.email,pw=obReg.pw;
  const r=await sbSignUp(email,pw);
  if(r.error){const taken=/already|registered|exists|duplicate/i.test(r.error||'');const msg=taken?tr('err_email_taken'):r.error;const eu=document.getElementById('obUserErr');if(eu){eu.textContent=msg;authShow('obusername');}else if(typeof showToast==='function')showToast(msg);return;}
  if(r.needConfirm){if(typeof showToast==='function')showToast(tr('confirm_email_sent'));authShow('login');return;}
  const uid=r.user.id;localStorage.setItem('workie_session',uid);
  const prof={name:(obData.name||'').trim()||'Utente',surname:'',username:obData.username||'',email:email,bio:'',workType:obData.profession||'other',website:'',socials:{},share:{},photo:'',joinTs:Date.now()};
  try{localStorage.setItem('workie_user::'+uid,JSON.stringify(prof));}catch(e){}
  try{await sb.from('profiles').upsert({id:uid,name:prof.name,username:(obData.username||'').toLowerCase()||null,work_type:obData.profession||'other'});}catch(e){}
  location.reload();
}
function obFinish(){finishSignup();}
document.getElementById('obDescCards').addEventListener('click',e=>{const c=e.target.closest('[data-descv]');if(!c)return;obData.profession=c.dataset.descv;document.querySelectorAll('#obDescCards .ob-desc-card').forEach(x=>x.classList.toggle('on',x===c));setTimeout(obFinish,240);});
document.getElementById('obIntroNext').addEventListener('click',()=>authShow('obprofession'));
// onboarding: profession + segment cards
function obProfs(){return [
  {v:'student',label:tr('prof_student'),cap:tr('cap_studying')},
  {v:'freelancer',label:tr('prof_freelancer'),cap:tr('cap_work')},
  {v:'worker',label:tr('prof_worker'),cap:tr('cap_work')},
  {v:'pension',label:tr('prof_pension'),cap:tr('cap_hobbies')},
  {v:'other',label:tr('prof_other'),cap:tr('cap_hobbies')},
];}
const OB_SEGS=['tech','marketing','design','finance','health','education','retail','food','media','legal','robotics','other'];
function renderProfCards(){const el=document.getElementById('profCards');if(!el)return;
  el.innerHTML=obProfs().map(p=>`<div class="ob-card-wrap"><div class="ob-card${obData.profession===p.v?' on':''}" data-profv="${p.v}"><span class="ob-card-label">${p.label}</span></div><div class="ob-card-cap">${p.cap}</div></div>`).join('');
}
function renderSegGrid(){const el=document.getElementById('segGrid');if(!el)return;
  el.innerHTML=OB_SEGS.map(s=>`<div class="ob-gcard${obData.segment===s?' on':''}" data-segv="${s}"><span class="ob-gcard-label">${tr('seg_'+s)}</span></div>`).join('');
}
document.getElementById('profCards').addEventListener('click',e=>{const c=e.target.closest('[data-profv]');if(!c)return;obData.profession=c.dataset.profv;renderProfCards();});
document.getElementById('segGrid').addEventListener('click',e=>{const c=e.target.closest('[data-segv]');if(!c)return;obData.segment=c.dataset.segv;renderSegGrid();});
document.getElementById('profNext').addEventListener('click',()=>{if(!obData.profession)return;authShow('obsegment');});
document.getElementById('segNext').addEventListener('click',()=>{if(!obData.segment)return;authShow('obdone');});
document.getElementById('doneNext').addEventListener('click',finishSignup);
// logout
function doLogout(){if(sb){sb.auth.signOut().catch(()=>{});}localStorage.removeItem('workie_session');location.reload();}

// ===== SPLASH (welcome + lingua, stile Apple) =====
const SPLASH_HI=['Welcome to','Benvenuto su','Bienvenue sur','Bienvenido a','Willkommen bei','Bem-vindo ao','ようこそ','欢迎使用','Добро пожаловать','환영합니다','Välkommen till','Hoş geldin'];
let splashTimer=null,splashI=0;
function startSplash(){
  const hi=document.getElementById('swHi');if(!hi)return;
  stopSplash();splashI=0;hi.textContent=SPLASH_HI[0];
  splashTimer=setInterval(()=>{
    hi.style.opacity='0';
    setTimeout(()=>{splashI=(splashI+1)%SPLASH_HI.length;hi.textContent=SPLASH_HI[splashI];hi.style.opacity='1';},450);
  },2000);
}
function stopSplash(){if(splashTimer){clearInterval(splashTimer);splashTimer=null;}}
{const lw=document.getElementById('splashLangWrap'),lb=document.getElementById('splashLangBtn');
  lb.addEventListener('click',e=>{e.stopPropagation();lw.classList.toggle('open');});
  document.addEventListener('click',()=>lw.classList.remove('open'));
  document.getElementById('splashLangMenu').addEventListener('click',e=>{const o=e.target.closest('[data-lang]');if(!o)return;lw.classList.remove('open');stopSplash();setLang(o.dataset.lang);authShow('signup');});
}

// ===== SIGNUP (registrazione 2 colonne) =====
try{Object.assign(STR.it,{suf2_tasks_t:'Gestisci le task',suf2_tasks_d:'Task e gruppi per ogni cliente o progetto, sempre sotto controllo.',suf2_mail_t:'Importa le task dalle mail',suf2_mail_d:'Collega la tua inbox e trasforma le email in task con un tocco.',suf2_plan_t:'Pianifica la giornata',suf2_plan_d:'Workie ordina le tue attività nella giornata, con orari e priorità.',suf2_resolve_t:'Risolvi velocemente le task',suf2_resolve_d:"L'AI ti prepara un piano passo-passo per completare ogni task."});Object.assign(STR.en,{suf2_tasks_t:'Manage your tasks',suf2_tasks_d:'Tasks and groups for every client or project, always under control.',suf2_mail_t:'Import tasks from email',suf2_mail_d:'Connect your inbox and turn emails into tasks in one tap.',suf2_plan_t:'Plan your day',suf2_plan_d:'Workie arranges your activities across the day, with times and priorities.',suf2_resolve_t:'Solve tasks fast',suf2_resolve_d:'The AI prepares a step-by-step plan to complete every task.'});}catch(e){}
const SU_FEATURES=[
  {ik:'suf2_tasks_t',dk:'suf2_tasks_d',svg:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l.7.7L6.2 5.2M4 12l.7.7L6.2 11.2M4 18l.7.7L6.2 17.2"/>',mock:['a hi','b','a']},
  {ik:'suf2_mail_t',dk:'suf2_mail_d',svg:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.5z"/>',mock:['a','b hi','c']},
  {ik:'suf2_plan_t',dk:'suf2_plan_d',svg:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.6V12l3 1.8"/>',mock:['b','a hi','c']},
  {ik:'suf2_resolve_t',dk:'suf2_resolve_d',svg:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/>',mock:['a hi','b','a hi']}
];
let suSlide=0,suTimer=null;
function renderSuCarousel(){
  const car=document.getElementById('suCarousel'),dots=document.getElementById('suDots');if(!car)return;
  car.innerHTML=SU_FEATURES.map((f,i)=>`<div class="su-slide${i===0?' on':''}" data-si="${i}"><div class="su-slide-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${f.svg}</svg></div><div class="su-slide-t">${tr(f.ik)}</div><div class="su-slide-d">${tr(f.dk)}</div><div class="su-mock">${f.mock.map(m=>`<div class="su-mock-row ${m}"></div>`).join('')}</div></div>`).join('');
  dots.innerHTML=SU_FEATURES.map((f,i)=>`<div class="su-dot${i===0?' on':''}" data-sdot="${i}"></div>`).join('');
  suSlide=0;suStartRotate();
}
function suGo(i){
  suSlide=(i+SU_FEATURES.length)%SU_FEATURES.length;
  document.querySelectorAll('#suCarousel .su-slide').forEach(s=>s.classList.toggle('on',+s.dataset.si===suSlide));
  document.querySelectorAll('#suDots .su-dot').forEach(d=>d.classList.toggle('on',+d.dataset.sdot===suSlide));
}
function suStartRotate(){if(suTimer)clearInterval(suTimer);suTimer=setInterval(()=>suGo(suSlide+1),3600);}
document.getElementById('suDots').addEventListener('click',e=>{const d=e.target.closest('[data-sdot]');if(!d)return;suGo(+d.dataset.sdot);suStartRotate();});
// signup: step email/password
document.getElementById('suToLogin').addEventListener('click',()=>authShow('login'));
function suEmailNext(){
  const email=document.getElementById('suEmail').value.trim(),err=document.getElementById('suErr');
  if(!validEmail(email)){err.textContent=tr('err_email');return;}
  if(findAccount(email)){err.textContent=tr('err_email_taken')+' — '+tr('aw_login');document.getElementById('loginEmail').value=email;setTimeout(()=>authShow('login'),900);return;}
  err.textContent='';obReg={email,pw:''};obData={name:'',profession:'',segment:''};
  document.getElementById('suEmailLabel').textContent=email;
  document.getElementById('suStepEmail').style.display='none';
  document.getElementById('suStepPw').style.display='block';
  setTimeout(()=>document.getElementById('suPw').focus(),40);
}
function suPwNext(){
  const pw=document.getElementById('suPw').value,err=document.getElementById('suPwErr');
  if(pw.length<6){err.textContent=tr('err_pw_short');return;}
  const email=(obReg&&obReg.email)||document.getElementById('suEmail').value.trim();
  registerAndEnter(email,pw,err);
}
function suReset(){document.getElementById('suStepEmail').style.display='block';document.getElementById('suStepPw').style.display='none';document.getElementById('suErr').textContent='';document.getElementById('suPwErr').textContent='';document.getElementById('suPw').value='';}
document.getElementById('suEmailBtn').addEventListener('click',suEmailNext);
document.getElementById('suEmail').addEventListener('keydown',e=>{if(e.key==='Enter')suEmailNext();});
document.getElementById('suPwBtn').addEventListener('click',suPwNext);
document.getElementById('suPw').addEventListener('keydown',e=>{if(e.key==='Enter')suPwNext();});
document.getElementById('suBack').addEventListener('click',suReset);
document.getElementById('suGoogle').addEventListener('click',()=>{
  if(sb){googleSignIn();return;}
  // fallback offline (nessun server): demo locale
  obReg={email:'utente'+Date.now()+'@gmail.com',pw:'google'};obData={name:'',profession:'',segment:''};authShow('obname');
});

// init
renderProfCards();renderSegGrid();
(function authInit(){
  // DEV in locale: sessione automatica (niente login) — usa il flusso normale, salta solo la verifica server
  if(DEV_LOCAL&&!localStorage.getItem('workie_session'))localStorage.setItem('workie_session','dev-local');
  const sess=localStorage.getItem('workie_session');
  // Mostro subito l'app se c'è una sessione in cache (i dati sono già caricati per quell'utente)
  if(sess){renderUser();authGate.classList.add('hidden');go('home');}
  else{authShow('splash');startSplash();renderSuCarousel();}
  // Verifico la sessione col server e carico il profilo
  (async function(){
    if(!sb)return;
    if(DEV_LOCAL)return; // in locale non verifico col server (evita il logout automatico)
    let session=null;try{const r=await sb.auth.getSession();session=r.data&&r.data.session;}catch(e){}
    if(session&&session.user){
      const uid=session.user.id;
      const prof=await sbLoadProfile(uid);
      // Flusso semplice: se autenticato entra nell'app (niente onboarding forzato)
      if(localStorage.getItem('workie_session')!==uid){localStorage.setItem('workie_session',uid);location.reload();return;}
      USER.email=session.user.email||USER.email;
      if(prof)Object.assign(USER,sbProfileToUser(prof));
      if(prof&&prof.created_at&&!USER.joinTs)USER.joinTs=new Date(prof.created_at).getTime();
      if(!USER.name||USER.name==='Umberto')USER.name=(session.user.email||'').split('@')[0]||'Utente';
      saveUser();renderUser();authGate.classList.add('hidden');if(typeof applyThemeVars==='function')applyThemeVars();
      syncPull().then(applied=>{if(applied)location.reload();}).catch(()=>{});
    } else if(localStorage.getItem('workie_session')){
      // sessione non più valida sul server → torna al login
      localStorage.removeItem('workie_session');authGate.classList.remove('hidden');authShow('splash');if(typeof startSplash==='function')startSplash();if(typeof renderSuCarousel==='function')renderSuCarousel();if(typeof applyThemeVars==='function')applyThemeVars();
    }
  })();
})();

// ---------- Team ----------
const ACCENT='#8d7bd0';
// TEAMS per-account (vuoto per i nuovi account; persistito)
function loadTeams(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_teams')));if(Array.isArray(s))return s.filter(t=>t&&typeof t==='object').map(t=>({...t,tid:t.tid!=null?t.tid:0,name:t.name||'Team',members:Array.isArray(t.members)?t.members:[],spaces:Array.isArray(t.spaces)?t.spaces:[],events:Array.isArray(t.events)?t.events:[],docs:Array.isArray(t.docs)?t.docs:[],invites:Array.isArray(t.invites)?t.invites:[]}));}catch(e){}return [];}
function saveTeams(){try{localStorage.setItem(ukey('workie_teams'),JSON.stringify(TEAMS));}catch(e){}}
let TEAMS=loadTeams();
let TEAM_SEQ=(TEAMS.reduce((m,t)=>Math.max(m,(t&&t.tid)||0),-1))+1;
const teamGrid=document.getElementById('teamGrid');
function teamName(t){return t.nameKey?tr(t.nameKey):t.name;}
function teamMeta(t){return `${t.members.length} ${tr('members')} · ${t.act} ${tr('open_tasks')}`;}
function renderTeams(){
  teamGrid.innerHTML=TEAMS.map((t,i)=>`
    <div class="team-box" data-team="${i}">
      <div class="tb-top">
        <div class="team-emoji">${teamLogo(t)}</div>
        <div class="team-info">
          <div class="tb-name">${teamName(t)}</div>
          <div class="tb-meta">${teamMeta(t)}</div>
        </div>
      </div>
      <div class="members">${t.members.slice(0,4).map(m=>`<div class="m" style="background:${m.c}">${m.i}</div>`).join('')}${t.members.length>4?`<div class="m" style="background:#555">+${t.members.length-4}</div>`:''}</div>
    </div>`).join('');
}
const TEAM_QL=[{k:'overview',ik:'view_overview',ic:'grid'},{k:'feed',ik:'ql_feed',ic:'clock'},{k:'members',ik:'ql_members',ic:'team'},{k:'chat',ik:'ql_chat',ic:'bubble'},{k:'tasks',ik:'nav_tasks',ic:'task'},{k:'calendar',ik:'view_calendar',ic:'cal'},{k:'events',ik:'ql_events',ic:'event'},{k:'database',ik:'ql_database',ic:'db'},{k:'settings',ik:'nav_settings',ic:'set'}];
function firstName(n){return (n||'Tu').trim().split(' ')[0];}
function logFeed(t,text){if(!t)return;if(!Array.isArray(t.feed))t.feed=[];t.feed.push({text,ts:nowTs()});if(t.feed.length>50)t.feed=t.feed.slice(-50);saveTeams();}
function nowTs(){return new Date().getTime();}
function memberOpenTasks(t,idx){return TASKS.filter(x=>x.scope==='team:'+t.tid&&x.assignee===idx&&!x.done).length;}
function assigneeAv(t,task){
  if(task.assignee==null||!t.members[task.assignee])return `<div class="tt-av tt-none" data-assign="${task.id}" title="${tr('assign_to')}">+</div>`;
  const m=t.members[task.assignee];return `<div class="tt-av" style="background:${m.c}" data-assign="${task.id}" title="${bdEsc(m.name)}">${m.i}</div>`;
}
function relTime(ts){const d=Math.floor((nowTs()-ts)/1000);if(d<60)return tr('t_now');if(d<3600)return Math.floor(d/60)+tr('t_min');if(d<86400)return Math.floor(d/3600)+tr('t_hr');return Math.floor(d/86400)+tr('t_day');}
let curTeam=null,teamSection='overview',delConfirm=false,curSpaceName=null,curEventIdx=-1,curChatId=null,GROUP_SEQ=1,chatOpen={groups:true,members:true};
function chatRowHTML(t,c){
  const last=chatMsgs(t,c.id).slice(-1)[0];
  const prev=last?(last.proposal?(last.mine?tr('you_proposed'):tr('proposed_task')):last.text):'';
  const av=c.type==='group'?`<div class="m-av" style="background:#574a7a">${c.name.charAt(0).toUpperCase()}</div>`:`<div class="m-av" style="background:${c.c}">${c.i}</div>`;
  return `<div class="member-row clickable" data-chat="${c.id}">${av}<div class="m-main"><div class="m-nameline"><span class="m-name">${c.name}</span></div>${prev?`<div class="m-tags" style="font-size:12px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${prev}</div>`:''}</div></div>`;
}
function chatList(t){
  const me=meMember(t),mi=t.members.indexOf(me);
  const groups=(t.groups||[]).map(g=>({id:'grp:'+g.id,type:'group',name:g.name,members:g.members}));
  const dms=t.members.map((m,idx)=>idx===mi?null:{id:'dm:'+idx,type:'dm',name:m.name,i:m.i,c:m.c,mi:idx}).filter(Boolean);
  return [...groups,...dms];
}
function chatMsgs(t,id){t.cm=t.cm||{};t.cm[id]=t.cm[id]||[];return t.cm[id];}
function teamLogo(t){return t.logo?`<img src="${t.logo}" alt="">`:`${t.emoji}`;}
function setTeamTitle(){if(curTeam)document.getElementById('teamDetailTitle').textContent=teamName(curTeam);}
const TAG_COLORS={Marketing:'#b8a6f4',Social:'#6f9bf0',Redazione:'#7ed0b0',Amministrazione:'#f0c46f'};
const BASE_TAGS=['Marketing','Social','Redazione','Amministrazione'];
function tagColor(tg){return TAG_COLORS[tg]||'#9a8fd6';}
function meMember(t){return t.members.find(m=>m.name==='Umberto')||t.members[0];}
function canManage(t){const me=meMember(t);return !!t.owner||!!(me&&me.admin);}
function allTags(t){const s=new Set(BASE_TAGS);t.members.forEach(m=>(m.tags||[]).forEach(x=>s.add(x)));return [...s];}
function ensureRoleSpace(t,tag){t.spaces=t.spaces||[];if(!t.spaces.some(s=>s.role&&s.name===tag))t.spaces.push({name:tag,role:true,docs:[['📌','Bacheca '+tag,tagColor(tag),'—']]});}
function syncRoleSpaces(t){const s=new Set();t.members.forEach(m=>(m.tags||[]).forEach(x=>s.add(x)));s.forEach(tg=>ensureRoleSpace(t,tg));}
function roleDocs(t,tag){const sp=(t.spaces||[]).find(s=>s.role&&s.name===tag);return sp?sp.docs:[];}
function userSpaces(t){
  const me=meMember(t),mi=t.members.indexOf(me);
  const out=[{name:tr('space_general'),color:'#8a8f98',docs:t.docs||[]}];
  (me.tags||[]).forEach(tag=>out.push({name:tag,color:tagColor(tag),docs:roleDocs(t,tag)}));
  (t.spaces||[]).filter(sp=>sp.custom&&sp.members&&sp.members.includes(mi)).forEach(sp=>out.push({name:sp.name,color:'#b8a6f4',docs:sp.docs||[]}));
  return out;
}
function teamMiniCal(t){
  const now=new Date(),y=now.getFullYear(),m=now.getMonth(),today=now.getDate();
  const months=MONTHS[LANG]||MONTHS.it,dow=DOWS[LANG]||DOWS.it;
  const first=new Date(y,m,1).getDay(),start=(first+6)%7,days=new Date(y,m+1,0).getDate(),prevDays=new Date(y,m,0).getDate();
  const marked=new Set(TASKS.filter(x=>x.scope==='team:'+t.tid&&x.date&&x.date[0]===y&&x.date[1]===m).map(x=>x.date[2]));
  let html=`<div class="cal-h"><div class="cal-month">${months[m]} ${y}</div></div><div class="cal-grid">`;
  dow.forEach(d=>html+=`<div class="cal-dow">${d}</div>`);
  for(let i=0;i<start;i++)html+=`<div class="cal-day out">${prevDays-start+i+1}</div>`;
  for(let d=1;d<=days;d++){let cls='cal-day';if(d===today)cls+=' today';if(marked.has(d))cls+=' has';html+=`<div class="${cls}">${d}</div>`;}
  const rem=(start+days)%7;if(rem)for(let i=1;i<=7-rem;i++)html+=`<div class="cal-day out">${i}</div>`;
  return html+'</div>';
}
function spaceWidgets(t,name){t.sw=t.sw||{};t.sw[name]=t.sw[name]||[];return t.sw[name];}
function spaceProjects(t,name){return PRJ.list.filter(p=>p.tid===t.tid&&p.space===name);}
function newSpaceProject(t,name){const p={id:PRJ.seq++,name:tr('new_project_short')+' '+(PRJ.list.length+1),icon:'📁',tid:t.tid,space:name,board:{pan:{x:60,y:50},zoom:1,items:[]}};PRJ.list.push(p);prjSave();renderProjGrid();openProject(p.id);}
function renderSpaceWidget(w,idx){
  const rm=`<div class="w-rm" data-wrm="${idx}">×</div>`;
  if(w==='note')return `<div class="sp-widget"><div class="card">${rm}<div class="card-h">${tr('tile_notes')}</div><textarea class="w-note" placeholder="..."></textarea></div></div>`;
  if(w==='calendar')return `<div class="sp-widget"><div class="card w-cal">${rm}<div class="card-h">${tr('view_calendar')}</div>${teamMiniCal(curTeam)}</div></div>`;
  if(w==='tasks'){const tt=TASKS.filter(x=>x.scope==='team:'+curTeam.tid).slice(0,3);return `<div class="sp-widget"><div class="card">${rm}<div class="card-h">${tr('nav_tasks')}</div>${tt.length?tt.map(taskRow).join(''):`<div class="task-empty">${tr('no_tasks')}</div>`}</div></div>`;}
  if(w==='spotify')return `<div class="sp-widget"><div class="card">${rm}<div class="card-h">Spotify</div><div class="spotify-row"><div class="spotify-art"></div><div class="spotify-info"><div class="spotify-title">Maledetta primavera</div><div class="spotify-artist">Tony Boy</div><div class="bar"><i style="width:32%"></i></div></div></div></div></div>`;
  if(w==='timer')return `<div class="sp-widget"><div class="card">${rm}<div class="card-h">Timer</div><div class="timer-num">-00:15:37</div><div class="bar"><i style="width:64%"></i></div></div></div>`;
  if(w==='clock')return `<div class="sp-widget"><div class="card">${rm}<div class="card-h">${tr('w_clock')}</div><div class="clock-face"></div></div></div>`;
  return '';
}
function evTitle(e){return e.tk?tr(e.tk):(e.title||'');}
function evMon(e){return (e.mk?tr(e.mk):((MONTHS[LANG]||MONTHS.it)[e.mo]||'').slice(0,3));}
function evTime(e){return e.tm?tr(e.tm):(e.when||'');}
function renderMsg(mm,i){
  if(mm.proposal)return renderProposal(mm,i);
  return `<div class="msg${mm.self?' me':''}">${mm.self?'':`<div class="av">${SVG.av}</div>`}<div class="msg-text">${mm.text}</div></div>`;
}
function renderProposal(mm,i){
  let b=`<div class="prop-h">${mm.mine?tr('you_proposed'):tr('proposed_task')}</div><div class="prop-title">${mm.title}</div><div class="prop-dl">${tr('nt_deadline')}: ${mm.deadline||'—'}</div>`;
  if(mm.status==='accepted')b+=`<div class="prop-final ok">${SVG.check} ${tr('prop_accepted')}</div>`;
  else if(mm.status==='rejected')b+=`<div class="prop-final no">${tr('prop_rejected')}</div>`;
  else if(mm._editing)b+=`<div class="prop-edit"><input type="date" id="propDate" value="${mm.deadline||''}"><button class="pa-acc" data-prop="${i}" data-pa="confirm">${tr('confirm')}</button></div>`;
  else if(mm.status==='counter')b+=`<div class="prop-final" style="color:var(--text-dim)">${tr('prop_modified')}</div><div class="prop-actions"><button class="pa-acc" data-prop="${i}" data-pa="acc">${tr('accept')}</button><button class="pa-rej" data-prop="${i}" data-pa="rej">${tr('decline')}</button></div>`;
  else b+=`<div class="prop-actions"><button class="pa-acc" data-prop="${i}" data-pa="acc">${tr('accept')}</button><button data-prop="${i}" data-pa="mod">${tr('prop_modify')}</button><button class="pa-rej" data-prop="${i}" data-pa="rej">${tr('decline')}</button></div>`;
  return `<div class="msg"><div class="av">${SVG.av}</div><div class="prop">${b}</div></div>`;
}
function renderTeamQuickLinks(){
  const el=document.getElementById('teamQuickLinks');if(!el)return;
  el.innerHTML=TEAM_QL.map(q=>`<div class="ql-item${q.k===teamSection?' active':''}" data-ql="${q.k}">${SVG[q.ic]}<span>${tr(q.ik)}</span></div>`).join('');
}
function renderTeamMain(){
  const main=document.getElementById('teamDetailMain');if(!main||!curTeam)return;
  const t=curTeam,owner=!!t.owner;
  if(teamSection==='overview'){
    const spaces=userSpaces(t);
    const spacesHTML=spaces.map((sp,idx)=>`<div class="space-card" data-spi="${idx}"><span class="sc-dot" style="background:${sp.color}"></span><span class="sc-name">${sp.name}</span><span class="sc-arrow">${SVG.next}</span></div>`).join('');
    const myTasks=TASKS.filter(x=>x.scope==='team:'+t.tid).slice(0,4);
    const tasksHTML=myTasks.length?myTasks.map(taskRow).join(''):`<div class="task-empty">${tr('no_tasks')}</div>`;
    const evs=(t.events||[]).slice(0,3);
    const evHTML=evs.length?evs.map(e=>`<div class="event"><div class="event-date"><div class="event-day">${e.d}</div><div class="event-mon">${evMon(e)}</div></div><div class="event-info"><div class="event-title">${evTitle(e)}</div><div class="event-time">${evTime(e)}</div></div></div>`).join(''):`<div class="task-empty">—</div>`;
    main.innerHTML=`<div class="section-h2">${tr('shared_space')}</div><div class="spaces-scroll">${spacesHTML}</div>
      <div style="max-width:600px">
        <div class="section-h2" style="margin-top:24px">${tr('ov_my_tasks')}</div>${tasksHTML}
        <div class="section-h2" style="margin-top:24px">${tr('upcoming_events')}</div>${evHTML}
      </div>`;
  }else if(teamSection==='calendar'){
    main.innerHTML=`<div class="section-h2">${tr('view_calendar')}</div><div class="cal" style="max-width:440px;padding:18px">${teamMiniCal(t)}</div>`;
  }else if(teamSection==='events'){
    const evs=t.events||[];
    const list=evs.length?evs.map((e,idx)=>`<div class="event clickable" data-evi="${idx}"><div class="event-date"><div class="event-day">${e.d}</div><div class="event-mon">${evMon(e)}</div></div><div class="event-info"><div class="event-title">${evTitle(e)}</div><div class="event-time">${evTime(e)}</div></div><span class="ev-arrow">${SVG.next}</span></div>`).join(''):`<div class="task-empty">${tr('no_events')}</div>`;
    main.innerHTML=`<div class="section-h2">${tr('upcoming_events')}</div><div style="max-width:580px">${list}<button class="btn-add" id="addEventBtn" style="margin-top:10px">${tr('add_event')}</button></div>`;
  }else if(teamSection==='event'){
    const e=t.events[curEventIdx];if(!e){teamSection='events';return renderTeamMain();}
    const objs=(e.obj||[]).length?(e.obj).map((o,i)=>`<div class="obj-row"><span class="obj-dot"></span><span class="obj-t">${o}</span><span class="obj-rm" data-objrm="${i}">×</span></div>`).join(''):`<div class="task-empty" style="padding:8px 2px">${tr('no_objectives')}</div>`;
    const tks=(e.tasks||[]).map((tk,i)=>`<div class="ev-task${tk.done?' done':''}"><div class="check" data-evtask="${i}">${SVG.check}</div><div class="task-main"><div class="task-title">${tk.title}</div></div></div>`).join('');
    main.innerHTML=`<div class="crumb"><span class="c-team" id="crumbEvents">${teamName(t)}</span>${SVG.next}<span class="c-cur">${evTitle(e)}</span></div>
      <div class="ev-detail">
        <div class="card"><div class="card-h">${tr('ev_info')}</div><div class="ev-meta">${SVG.cal} ${e.d} ${evMon(e)} · ${evTime(e)}</div><textarea class="w-note" id="evDesc" placeholder="${tr('ev_desc_ph')}">${e.desc||''}</textarea></div>
        <div class="card"><div class="card-h">${tr('ev_objectives')}</div>${objs}<input class="ev-add-input" id="evObjInput" placeholder="${tr('ev_obj_ph')}"></div>
        <div class="card"><div class="card-h">${tr('ev_related')}</div>${tks}<input class="ev-add-input" id="evTaskInput" placeholder="${tr('ev_task_ph')}"></div>
      </div>`;
  }else if(teamSection==='space'){
    const widgets=spaceWidgets(t,curSpaceName);
    const grid=widgets.length?`<div class="sp-widgets">${widgets.map((w,idx)=>renderSpaceWidget(w,idx)).join('')}</div>`:`<div class="sp-empty">${tr('space_empty')}</div>`;
    const sprojs=spaceProjects(t,curSpaceName);
    const projGrid=`<div class="sp-proj-grid">${sprojs.map(p=>`<div class="sp-proj-card" data-spopen="${p.id}"><div class="proj-ic">${p.icon||'📁'}</div><div class="proj-name">${bdEsc(p.name)}</div><div class="proj-foot">${p.board.items.length} ${tr('pf_items')}</div></div>`).join('')}<div class="sp-proj-card proj-new" id="spNewProj"><div class="proj-ic">${SVG.plus}</div><div class="proj-name">${tr('new_project_short')}</div></div></div>`;
    main.innerHTML=`<div class="crumb"><span class="c-team" id="crumbTeam">${teamName(t)}</span>${SVG.next}<span class="c-cur">${curSpaceName}</span></div>
      <div class="sp-add-bar"><button class="btn-primary-sm" id="spAddWidget">${tr('add_widget')}</button></div>${grid}
      <div class="section-h2" style="margin-top:24px">${tr('nav_projects')}</div>${projGrid}`;
  }else if(teamSection==='members'){
    const manage=canManage(t);
    const maxLoad=Math.max(1,...t.members.map((m,idx)=>memberOpenTasks(t,idx)));
    const rows=t.members.map((m,idx)=>{
      const adm=m.admin?`<span class="m-admin">Admin</span>`:'';
      const tags=(m.tags||[]).map(tg=>`<span class="m-tag" style="background:${tagColor(tg)}22;color:${tagColor(tg)}">${tg}</span>`).join('');
      const load=memberOpenTasks(t,idx);const over=load>=4;
      const wl=`<div class="m-load" title="${load} ${tr('open_tasks')}"><div class="m-load-bar"><i style="width:${Math.round(load/maxLoad*100)}%;background:${over?'#e0675a':'var(--accent)'}"></i></div><span class="m-load-n${over?' over':''}">${load}</span></div>`;
      return `<div class="member-row${manage?' clickable':''}" data-mi="${idx}"><div class="m-av" style="background:${m.c}">${m.i}</div><div class="m-main"><div class="m-nameline"><span class="m-name">${m.name}</span>${adm}</div>${tags?`<div class="m-tags">${tags}</div>`:''}</div>${wl}</div>`;
    }).join('');
    const inv=(t.invites||[]).map(em=>`<div class="member-row pending"><div class="m-av invite">@</div><div class="m-name">${em}</div><div class="m-role">${tr('pending')}</div></div>`).join('');
    const btn=manage?`<button class="btn-add" id="inviteMemberBtn">${tr('invite_email')}</button>`:'';
    main.innerHTML=`<div class="section-h2">${tr('ql_members')} · ${t.members.length}</div><div style="max-width:600px">${rows}${inv}${btn}</div>`;
  }else if(teamSection==='chat'){
    const chats=chatList(t);
    const groups=chats.filter(c=>c.type==='group'),dms=chats.filter(c=>c.type==='dm');
    const grpBody=groups.length?groups.map(c=>chatRowHTML(t,c)).join(''):`<div class="chat-sec-empty">—</div>`;
    const dmBody=dms.map(c=>chatRowHTML(t,c)).join('');
    main.innerHTML=`<div class="section-h2">${tr('ql_chat')}</div><div style="max-width:600px">
      <div class="chat-sec${chatOpen.groups?' open':''}"><div class="chat-sec-h" data-csec="groups"><span class="cs-name">${tr('chat_groups')}</span><span class="count">${groups.length}</span><span class="hist-chev">›</span></div><div class="chat-sec-body">${grpBody}</div></div>
      <div class="chat-sec${chatOpen.members?' open':''}"><div class="chat-sec-h" data-csec="members"><span class="cs-name">${tr('ql_members')}</span><span class="count">${dms.length}</span><span class="hist-chev">›</span></div><div class="chat-sec-body">${dmBody}</div></div>
      <button class="btn-add" id="newGroupBtn" style="margin-top:12px">${tr('chat_new_group')}</button></div>`;
  }else if(teamSection==='chatconv'){
    const chat=chatList(t).find(c=>c.id===curChatId);if(!chat){teamSection='chat';return renderTeamMain();}
    const msgs=chatMsgs(t,curChatId);
    const bodyHTML=msgs.length?msgs.map((mm,i)=>renderMsg(mm,i)).join(''):'';
    main.innerHTML=`<div class="crumb"><span class="c-team" id="crumbChat">${teamName(t)}</span>${SVG.next}<span class="c-cur">${chat.name}</span></div>
      <div class="tchat" style="height:480px;max-width:600px"><div class="tchat-body" id="tchatBody">${bodyHTML}</div><div class="tchat-foot"><input id="tchatInput" placeholder="${tr('send_ph')}"><div class="send-btn" id="tchatSend">${SVG.arr}</div></div></div>`;
    const bd=document.getElementById('tchatBody');bd.scrollTop=bd.scrollHeight;
  }else if(teamSection==='tasks'){
    const tt=TASKS.filter(x=>x.scope==='team:'+t.tid);
    const rowsHTML=tt.map(task=>`<div class="tt-row">${taskRow(task)}${assigneeAv(t,task)}</div>`).join('');
    main.innerHTML=`<div class="section-h2">${tr('nav_tasks')} · ${tt.length}</div><div style="max-width:600px">${tt.length?rowsHTML:`<div class="task-empty">${tr('no_tasks')}</div>`}<button class="btn-add" id="teamTaskBtn">${tr('new_task')}</button></div>`;
  }else if(teamSection==='feed'){
    const feed=Array.isArray(t.feed)?t.feed.slice().reverse():[];
    const body=feed.length?feed.map(f=>`<div class="feed-row"><span class="feed-dot"></span><div class="feed-main"><div class="feed-t">${bdEsc(f.text)}</div><div class="feed-time">${relTime(f.ts)}</div></div></div>`).join(''):`<div class="task-empty">${tr('feed_empty')}</div>`;
    main.innerHTML=`<div class="section-h2">${tr('ql_feed')}</div><div style="max-width:600px">${body}</div>`;
  }else if(teamSection==='database'){
    main.innerHTML=`<div class="section-h2">${tr('ql_database')}</div><div class="db-empty">${tr('db_soon')}</div>`;
  }else if(teamSection==='settings'){
    const name=teamName(t),desc=t.desc||'';
    let h=`<div class="ts"><div class="section-h2">${tr('ts_info')}</div><div class="ts-card">
      <div class="ts-logo-row"><div class="ts-logo">${teamLogo(t)}</div>${owner?`<div><button class="conn-btn" id="tsLogoBtn">${tr('ts_change_logo')}</button><input type="file" id="tsLogoInput" accept="image/*" style="display:none"></div>`:''}</div>
      <label class="field-label">${tr('tm_name')}</label>
      ${owner?`<input id="tsName" class="modal-search" value="${name.replace(/"/g,'&quot;')}" style="margin-bottom:14px">`:`<div class="ts-ro">${name}</div>`}
      <label class="field-label">${tr('nt_desc')}</label>
      ${owner?`<textarea id="tsDesc" class="nt-textarea" style="margin-bottom:0">${desc}</textarea>`:`<div class="ts-ro">${desc||'—'}</div>`}
      ${owner?`<button class="primary-btn" id="tsSave" style="margin-top:16px">${tr('ts_save')}</button>`:`<div class="ts-note">${tr('ts_readonly')}</div>`}
    </div>`;
    if(canManage(t)){
      const spacesList=(t.spaces||[]).map(sp=>{const cnt=sp.role?t.members.filter(m=>(m.tags||[]).includes(sp.name)).length:(sp.members?sp.members.length:0);return `<div class="space-line"><span class="sc-dot" style="background:${sp.role?tagColor(sp.name):'#b8a6f4'}"></span><span class="sl-name">${sp.name}</span><span class="sl-count">${cnt} ${tr('members')}</span></div>`;}).join('');
      h+=`<div class="section-h2">${tr('spaces_h')}</div><div class="ts-card">${spacesList}<button class="btn-add" id="createSpaceBtn" style="margin-top:${(t.spaces&&t.spaces.length)?'8px':'0'}">${tr('create_space')}</button></div>`;
    }
    if(owner){
      h+=`<div class="section-h2">${tr('ts_advanced')}</div><div class="ts-card">
        <div class="ts-opt"><span>${tr('ts_visibility')}</span><div class="seg ts-seg"><div class="s active">${tr('ts_private')}</div><div class="s">${tr('ts_public')}</div></div></div>
        <div class="ts-opt"><span>${tr('ts_invite_who')}</span><div class="seg ts-seg"><div class="s active">${tr('ts_everyone')}</div><div class="s">${tr('ts_admins')}</div></div></div>
      </div>
      <div class="section-h2 danger">${tr('ts_danger')}</div><button class="ts-delete${delConfirm?' confirm':''}" id="tsDelete">${delConfirm?tr('ts_delete_confirm'):tr('ts_delete')}</button>`;
    }else{
      h+=`<button class="ts-leave" id="tsLeave">${tr('ts_leave')}</button>`;
    }
    main.innerHTML=h+'</div>';
  }
}
function openTeam(i){
  const t=TEAMS[i];curTeam=t;teamSection='overview';delConfirm=false;
  syncRoleSpaces(t);setTeamTitle();renderTeamQuickLinks();renderTeamMain();
  go('teamdetail');
}
document.getElementById('teamQuickLinks').addEventListener('click',e=>{const q=e.target.closest('[data-ql]');if(!q)return;teamSection=q.dataset.ql;delConfirm=false;renderTeamQuickLinks();renderTeamMain();});
document.getElementById('teamDetailMain').addEventListener('click',e=>{
  if(!curTeam)return;
  const sc=e.target.closest('.space-card[data-spi]');if(sc){const sp=userSpaces(curTeam)[+sc.dataset.spi];if(sp){curSpaceName=sp.name;teamSection='space';renderTeamMain();}return;}
  if(e.target.closest('#crumbTeam')){teamSection='overview';renderTeamMain();return;}
  if(e.target.closest('#spAddWidget')){renderSpwTiles();spwOv.classList.add('open');return;}
  if(e.target.closest('#spNewProj')){newSpaceProject(curTeam,curSpaceName);return;}
  const spo=e.target.closest('.sp-proj-card[data-spopen]');if(spo){openProject(+spo.dataset.spopen);return;}
  const wrm=e.target.closest('[data-wrm]');if(wrm){spaceWidgets(curTeam,curSpaceName).splice(+wrm.dataset.wrm,1);renderTeamMain();return;}
  const evrow=e.target.closest('.event.clickable[data-evi]');if(evrow){curEventIdx=+evrow.dataset.evi;teamSection='event';renderTeamMain();return;}
  if(e.target.closest('#crumbEvents')){teamSection='events';renderTeamMain();return;}
  if(e.target.closest('#addEventBtn')){openEventModal();return;}
  const objrm=e.target.closest('[data-objrm]');if(objrm){curTeam.events[curEventIdx].obj.splice(+objrm.dataset.objrm,1);renderTeamMain();return;}
  const evt=e.target.closest('[data-evtask]');if(evt){const tk=curTeam.events[curEventIdx].tasks[+evt.dataset.evtask];tk.done=!tk.done;renderTeamMain();return;}
  const cs=e.target.closest('.chat-sec-h[data-csec]');if(cs){chatOpen[cs.dataset.csec]=!chatOpen[cs.dataset.csec];renderTeamMain();return;}
  const cr=e.target.closest('.member-row.clickable[data-chat]');if(cr){curChatId=cr.dataset.chat;teamSection='chatconv';renderTeamMain();return;}
  if(e.target.closest('#crumbChat')){teamSection='chat';renderTeamMain();return;}
  if(e.target.closest('#newGroupBtn')){openGroupModal();return;}
  if(e.target.closest('#teamTaskBtn')){openNewTask(curTeam);return;}
  if(e.target.closest('#tchatSend')){sendChatMsg();return;}
  const pa=e.target.closest('[data-pa]');if(pa){handleProposal(+pa.dataset.prop,pa.dataset.pa);return;}
  const mr=e.target.closest('.member-row.clickable[data-mi]');if(mr){openMemberModal(+mr.dataset.mi);return;}
  if(e.target.closest('#inviteMemberBtn')){document.getElementById('inviteEmail').value='';inviteOv.classList.add('open');return;}
  if(e.target.closest('#createSpaceBtn')){openSpaceModal();return;}
  if(e.target.closest('#tsLogoBtn')){document.getElementById('tsLogoInput').click();return;}
  if(e.target.closest('#tsSave')){const n=document.getElementById('tsName').value.trim();if(n){curTeam.name=n;delete curTeam.nameKey;}curTeam.desc=document.getElementById('tsDesc').value.trim();saveTeams();renderTeams();setTeamTitle();showToast(tr('toast_saved'));return;}
  if(e.target.closest('#tsLeave')){const idx=TEAMS.indexOf(curTeam);if(idx>=0)TEAMS.splice(idx,1);saveTeams();renderTeams();syncTaskTeams();showToast(tr('toast_left'));go('team');return;}
  const del=e.target.closest('#tsDelete');
  if(del){if(!delConfirm){delConfirm=true;renderTeamMain();}else{const idx=TEAMS.indexOf(curTeam);if(idx>=0)TEAMS.splice(idx,1);saveTeams();renderTeams();syncTaskTeams();delConfirm=false;showToast(tr('toast_deleted'));go('team');}return;}
  const seg=e.target.closest('.ts-seg .s');if(seg){seg.parentElement.querySelectorAll('.s').forEach(x=>x.classList.toggle('active',x===seg));return;}
  const lb=e.target.closest('.lvl-btn');if(lb){const t=TASKS.find(x=>x.id==lb.dataset.id);if(t&&t.level){t.level.cur=Math.max(0,Math.min(t.level.tgt,t.level.cur+(lb.dataset.act==='inc'?1:-1)));t.done=t.level.cur>=t.level.tgt;saveTasks();renderTeamMain();}return;}
  const asg=e.target.closest('[data-assign]');if(asg){openAssign(+asg.dataset.assign);return;}
  const ck=e.target.closest('.check');if(ck){const t=TASKS.find(x=>x.id==ck.dataset.id);if(t){t.done=!t.done;saveTasks();if(t.done)logFeed(curTeam,firstName(USER.name)+' '+tr('feed_completed')+' "'+taskTitle(t)+'"');renderTeamMain();}}
});
// ---- Assegna task a un membro ----
let assignTaskId=null;
const assignOv=document.getElementById('assignOverlay');
function openAssign(taskId){assignTaskId=taskId;const t=curTeam;if(!t)return;const task=TASKS.find(x=>x.id===taskId);
  let html=`<div class="assign-row${task&&task.assignee==null?' sel':''}" data-am="none"><div class="tt-av tt-none">—</div><span>${tr('assign_none')}</span></div>`;
  html+=t.members.map((m,idx)=>`<div class="assign-row${task&&task.assignee===idx?' sel':''}" data-am="${idx}"><div class="tt-av" style="background:${m.c}">${m.i}</div><span>${bdEsc(m.name)}</span></div>`).join('');
  document.getElementById('assignList').innerHTML=html;assignOv.classList.add('open');}
document.getElementById('assignX').addEventListener('click',()=>assignOv.classList.remove('open'));
assignOv.addEventListener('click',e=>{if(e.target===assignOv)assignOv.classList.remove('open');});
document.getElementById('assignList').addEventListener('click',e=>{const r=e.target.closest('[data-am]');if(!r||assignTaskId==null)return;const task=TASKS.find(x=>x.id===assignTaskId);if(!task)return;
  const v=r.dataset.am;task.assignee=(v==='none')?null:(+v);saveTasks();
  if(task.assignee!=null&&curTeam&&curTeam.members[task.assignee])logFeed(curTeam,firstName(USER.name)+' '+tr('feed_assigned')+' "'+taskTitle(task)+'" '+tr('feed_to')+' '+firstName(curTeam.members[task.assignee].name));
  assignOv.classList.remove('open');renderTeamMain();});
document.getElementById('teamDetailMain').addEventListener('change',e=>{
  if(e.target.id==='tsLogoInput'&&curTeam){const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>{curTeam.logo=ev.target.result;renderTeams();renderTeamMain();};r.readAsDataURL(f);}}
  if(e.target.id==='evDesc'&&curTeam&&teamSection==='event'){curTeam.events[curEventIdx].desc=e.target.value;}
});
document.getElementById('teamDetailMain').addEventListener('keydown',e=>{
  if(!curTeam||e.key!=='Enter')return;
  const id=e.target.id;
  if(id==='tchatInput'){sendChatMsg();return;}
  if(teamSection!=='event')return;
  const ev=curTeam.events[curEventIdx];
  if(id==='evObjInput'){const v=e.target.value.trim();if(v){ev.desc=document.getElementById('evDesc').value;ev.obj=ev.obj||[];ev.obj.push(v);renderTeamMain();document.getElementById('evObjInput').focus();}}
  if(id==='evTaskInput'){const v=e.target.value.trim();if(v){ev.desc=document.getElementById('evDesc').value;ev.tasks=ev.tasks||[];ev.tasks.push({title:v,done:false});renderTeamMain();document.getElementById('evTaskInput').focus();}}
});
// ----- Member roles modal -----
let editMi=-1,editTags=[],editAdmin=false;
const memberOv=document.getElementById('memberOverlay');
function renderMemberTags(){
  document.getElementById('memberTags').innerHTML=allTags(curTeam).map(tg=>`<div class="tag-chip${editTags.includes(tg)?' on':''}" data-tag="${tg}" style="${editTags.includes(tg)?`background:${tagColor(tg)};`:''}">${tg}</div>`).join('');
}
function openMemberModal(mi){
  editMi=mi;const m=curTeam.members[mi];editTags=[...(m.tags||[])];editAdmin=!!m.admin;
  document.getElementById('memberModalName').textContent=m.name;
  document.getElementById('newTagInput').value='';
  document.getElementById('memberAdminChk').classList.toggle('on',editAdmin);
  renderMemberTags();memberOv.classList.add('open');
}
document.getElementById('memberTags').addEventListener('click',e=>{const c=e.target.closest('[data-tag]');if(!c)return;const tg=c.dataset.tag;editTags=editTags.includes(tg)?editTags.filter(x=>x!==tg):[...editTags,tg];renderMemberTags();});
document.getElementById('newTagInput').addEventListener('keydown',e=>{if(e.key==='Enter'){const v=e.target.value.trim();if(v&&!editTags.includes(v)){editTags.push(v);e.target.value='';renderMemberTags();}}});
document.getElementById('memberAdminChk').addEventListener('click',()=>{editAdmin=!editAdmin;document.getElementById('memberAdminChk').classList.toggle('on',editAdmin);});
document.getElementById('memberModalX').addEventListener('click',()=>memberOv.classList.remove('open'));
memberOv.addEventListener('click',e=>{if(e.target===memberOv)memberOv.classList.remove('open');});
document.getElementById('memberSave').addEventListener('click',()=>{
  const m=curTeam.members[editMi];m.tags=[...editTags];m.admin=editAdmin;
  editTags.forEach(tg=>ensureRoleSpace(curTeam,tg));
  memberOv.classList.remove('open');renderTeamMain();renderTeams();
});
// ----- Invite modal -----
const inviteOv=document.getElementById('inviteOverlay');
document.getElementById('inviteModalX').addEventListener('click',()=>inviteOv.classList.remove('open'));
inviteOv.addEventListener('click',e=>{if(e.target===inviteOv)inviteOv.classList.remove('open');});
document.getElementById('inviteSend').addEventListener('click',()=>{
  const em=document.getElementById('inviteEmail').value.trim();if(!em)return;
  curTeam.invites=curTeam.invites||[];curTeam.invites.push(em);
  logFeed(curTeam,firstName(USER.name)+' '+tr('feed_invited')+' '+em);
  inviteOv.classList.remove('open');renderTeamMain();showToast(tr('toast_invited'));
});
// ----- Create space modal -----
let spaceSel=new Set();
const spaceOv=document.getElementById('spaceOverlay');
function renderSpaceMembers(){
  document.getElementById('spaceMembers').innerHTML=curTeam.members.map((m,idx)=>`<div class="mem-check${spaceSel.has(idx)?' on':''}" data-si="${idx}"><div class="mc-box">${SVG.check}</div><span>${m.name}</span></div>`).join('');
}
function openSpaceModal(){spaceSel=new Set();document.getElementById('spaceName').value='';renderSpaceMembers();spaceOv.classList.add('open');}
document.getElementById('spaceMembers').addEventListener('click',e=>{const r=e.target.closest('[data-si]');if(!r)return;const i=+r.dataset.si;spaceSel.has(i)?spaceSel.delete(i):spaceSel.add(i);renderSpaceMembers();});
document.getElementById('spaceModalX').addEventListener('click',()=>spaceOv.classList.remove('open'));
spaceOv.addEventListener('click',e=>{if(e.target===spaceOv)spaceOv.classList.remove('open');});
document.getElementById('spaceCreate').addEventListener('click',()=>{
  const n=document.getElementById('spaceName').value.trim();if(!n)return;
  curTeam.spaces=curTeam.spaces||[];curTeam.spaces.push({name:n,custom:true,members:[...spaceSel],docs:[]});
  spaceOv.classList.remove('open');renderTeamMain();
});
// ----- Space widget modal -----
const spwOv=document.getElementById('spaceWidgetOverlay');
const SPACE_W=[{k:'note',e:'📝',ik:'tile_notes'},{k:'calendar',e:'🗓️',ik:'view_calendar'},{k:'tasks',e:'✅',ik:'nav_tasks'},{k:'spotify',e:'🎵',label:'Spotify'},{k:'timer',e:'⏱️',label:'Timer'},{k:'clock',e:'🕐',ik:'w_clock'}];
function renderSpwTiles(){document.getElementById('spwTiles').innerHTML=SPACE_W.map(w=>`<div class="wtile" data-spw="${w.k}"><div class="ic">${w.e}</div><span>${w.ik?tr(w.ik):w.label}</span></div>`).join('');}
document.getElementById('spwX').addEventListener('click',()=>spwOv.classList.remove('open'));
spwOv.addEventListener('click',e=>{
  if(e.target===spwOv){spwOv.classList.remove('open');return;}
  const tile=e.target.closest('[data-spw]');
  if(tile&&curTeam&&curSpaceName){spaceWidgets(curTeam,curSpaceName).push(tile.dataset.spw);spwOv.classList.remove('open');renderTeamMain();}
});
// ----- New event modal -----
const eventOv=document.getElementById('eventOverlay');
function openEventModal(){['newEventName','newEventDate','newEventWhen'].forEach(id=>document.getElementById(id).value='');eventOv.classList.add('open');}
document.getElementById('eventModalX').addEventListener('click',()=>eventOv.classList.remove('open'));
eventOv.addEventListener('click',e=>{if(e.target===eventOv)eventOv.classList.remove('open');});
document.getElementById('eventCreate').addEventListener('click',()=>{
  const name=document.getElementById('newEventName').value.trim();if(!name)return;
  const dv=document.getElementById('newEventDate').value,when=document.getElementById('newEventWhen').value.trim();
  let d='—',mo=new Date().getMonth();
  if(dv){const p=dv.split('-').map(Number);d=String(p[2]);mo=p[1]-1;}
  curTeam.events=curTeam.events||[];curTeam.events.push({d,mo,title:name,when:when||tr('all_day'),desc:'',obj:[],tasks:[]});
  eventOv.classList.remove('open');renderTeamMain();
});
// ----- Chat send + proposal -----
function sendChatMsg(){const inp=document.getElementById('tchatInput');if(!inp)return;const v=inp.value.trim();if(!v)return;chatMsgs(curTeam,curChatId).push({self:true,text:v});inp.value='';renderTeamMain();}
function handleProposal(idx,act){
  const mm=chatMsgs(curTeam,curChatId)[idx];if(!mm)return;
  if(act==='mod'){mm._editing=true;renderTeamMain();return;}
  if(act==='confirm'){const d=document.getElementById('propDate').value;if(d){mm.deadline=d;if(mm.draft){const p=d.split('-').map(Number);mm.draft.date=[p[0],p[1]-1,p[2]];delete mm.draft.month;}}mm._editing=false;mm.status='counter';renderTeamMain();return;}
  if(act==='rej'){mm.status='rejected';renderTeamMain();return;}
  if(act==='acc'){mm.status='accepted';
    if(mm.draft){TASKS.push(mm.draft);}
    else{const p=(mm.deadline||'').split('-').map(Number);const date=(p.length===3&&p[0])?[p[0],p[1]-1,p[2]]:realToday();TASKS.push({id:++TID,title:mm.title,scope:'team:'+curTeam.tid,date,done:false});}
    renderTeamMain();
  }
}
// ----- New group modal -----
let grpSel=new Set();
const groupOv=document.getElementById('groupOverlay');
function renderGroupMembers(){document.getElementById('groupMembers').innerHTML=curTeam.members.map((m,idx)=>`<div class="mem-check${grpSel.has(idx)?' on':''}" data-gi="${idx}"><div class="mc-box">${SVG.check}</div><span>${m.name}</span></div>`).join('');}
function openGroupModal(){grpSel=new Set();document.getElementById('groupName').value='';renderGroupMembers();groupOv.classList.add('open');}
document.getElementById('groupMembers').addEventListener('click',e=>{const r=e.target.closest('[data-gi]');if(!r)return;const i=+r.dataset.gi;grpSel.has(i)?grpSel.delete(i):grpSel.add(i);renderGroupMembers();});
document.getElementById('groupModalX').addEventListener('click',()=>groupOv.classList.remove('open'));
groupOv.addEventListener('click',e=>{if(e.target===groupOv)groupOv.classList.remove('open');});
document.getElementById('groupCreate').addEventListener('click',()=>{
  const n=document.getElementById('groupName').value.trim();if(!n)return;
  curTeam.groups=curTeam.groups||[];curTeam.groups.push({id:GROUP_SEQ++,name:n,members:[...grpSel]});
  groupOv.classList.remove('open');renderTeamMain();
});
// ----- Team task modal (assign) -----
let ttAssignee='me';
const teamTaskOv=document.getElementById('teamTaskOverlay');
function renderTtAssignee(){
  const me=meMember(curTeam),mi=curTeam.members.indexOf(me);
  let html=`<div class="s${ttAssignee==='me'?' active':''}" data-asg="me">${tr('assignee_me')}</div>`;
  curTeam.members.forEach((m,idx)=>{if(idx!==mi)html+=`<div class="s${ttAssignee==='m'+idx?' active':''}" data-asg="m${idx}">${m.name}</div>`;});
  document.getElementById('ttAssignee').innerHTML=html;
}
function openTeamTaskModal(){ttAssignee='me';document.getElementById('ttTitle').value='';document.getElementById('ttDate').value='';renderTtAssignee();teamTaskOv.classList.add('open');}
document.getElementById('ttAssignee').addEventListener('click',e=>{const s=e.target.closest('[data-asg]');if(!s)return;ttAssignee=s.dataset.asg;renderTtAssignee();});
document.getElementById('ttModalX').addEventListener('click',()=>teamTaskOv.classList.remove('open'));
teamTaskOv.addEventListener('click',e=>{if(e.target===teamTaskOv)teamTaskOv.classList.remove('open');});
document.getElementById('ttCreate').addEventListener('click',()=>{
  const title=document.getElementById('ttTitle').value.trim();if(!title)return;
  const dv=document.getElementById('ttDate').value;
  if(ttAssignee==='me'){
    const date=dv?(function(){const p=dv.split('-').map(Number);return [p[0],p[1]-1,p[2]];})():realToday();
    TASKS.push({id:++TID,title,scope:'team:'+curTeam.tid,date,done:false});
    teamTaskOv.classList.remove('open');renderTeamMain();
  }else{
    const mi=+ttAssignee.slice(1);
    chatMsgs(curTeam,'dm:'+mi).push({proposal:true,mine:true,title,deadline:dv||'',status:'pending'});
    teamTaskOv.classList.remove('open');renderTeamMain();showToast(tr('proposal_sent'));
  }
});
// ----- Requests bell -----
let INVITES_IN=[{id:1,team:'Design Lab',emoji:'🎨',from:'Sofia'},{id:2,team:'Marketing Club',emoji:'📣',from:'Luca'}];
let reqOpen=false;
function renderBell(){
  const b=document.getElementById('reqBell');if(!b)return;
  b.innerHTML=`${SVG.bell}${INVITES_IN.length?`<span class="bell-badge">${INVITES_IN.length}</span>`:''}`;
  document.getElementById('reqPop').innerHTML=reqOpen?`<div class="req-pop"><div class="req-h">${tr('requests')}</div>${INVITES_IN.length?INVITES_IN.map(r=>`<div class="req-item"><div class="req-text"><b>${r.from}</b> ${tr('invited_you')} <b>${r.emoji} ${r.team}</b></div><div class="req-actions"><button class="req-acc" data-acc="${r.id}">${tr('accept')}</button><button class="req-dec" data-dec="${r.id}">${tr('decline')}</button></div></div>`).join(''):`<div class="req-empty">${tr('no_requests')}</div>`}</div>`:'';
}
document.getElementById('reqBell').addEventListener('click',e=>{e.stopPropagation();reqOpen=!reqOpen;renderBell();});
document.getElementById('reqPop').addEventListener('click',e=>{
  e.stopPropagation();
  const acc=e.target.closest('[data-acc]');
  if(acc){const id=+acc.dataset.acc;const r=INVITES_IN.find(x=>x.id===id);if(r){TEAMS.push({tid:TEAM_SEQ++,name:r.team,emoji:r.emoji,act:0,owner:false,desc:'',invites:[],spaces:[],members:[{i:'A',c:'#8a5a4a',name:'Admin',admin:true,tags:[]},{i:'U',c:ACCENT,name:'Umberto',admin:false,tags:[]}],docs:[],events:[]});}INVITES_IN=INVITES_IN.filter(x=>x.id!==id);reqOpen=INVITES_IN.length>0;renderBell();renderTeams();syncTaskTeams();showToast(tr('toast_joined_team'));return;}
  const dec=e.target.closest('[data-dec]');
  if(dec){INVITES_IN=INVITES_IN.filter(x=>x.id!==+dec.dataset.dec);renderBell();}
});
document.addEventListener('click',()=>{if(reqOpen){reqOpen=false;renderBell();}});
renderTeams();
teamGrid.addEventListener('click',e=>{
  const b=e.target.closest('[data-team]');
  if(b)openTeam(+b.dataset.team);
});
// team modal
const tOv=document.getElementById('teamOverlay');
const EMOJIS=['🚀','💼','🎓','🏠','🎨','📊','⚡','🌟','🧩','🔥','🎯','🍀'];
let pickedEmoji='🚀';
const emojiPick=document.getElementById('emojiPick');
emojiPick.innerHTML=EMOJIS.map((e,i)=>`<div class="ep${i===0?' sel':''}" data-emoji="${e}">${e}</div>`).join('');
emojiPick.addEventListener('click',e=>{
  const ep=e.target.closest('.ep');if(!ep)return;
  emojiPick.querySelectorAll('.ep').forEach(x=>x.classList.remove('sel'));
  ep.classList.add('sel');pickedEmoji=ep.dataset.emoji;
});
document.getElementById('createTeamBtn').addEventListener('click',()=>{document.getElementById('newTeamName').value='';tOv.classList.add('open');});
document.getElementById('teamModalX').addEventListener('click',()=>tOv.classList.remove('open'));
tOv.addEventListener('click',e=>{if(e.target===tOv)tOv.classList.remove('open');});
document.getElementById('doCreate').addEventListener('click',()=>{
  const name=(document.getElementById('newTeamName').value.trim())||tr('tm_new_title');
  TEAMS.push({tid:TEAM_SEQ++,name,emoji:pickedEmoji,act:0,owner:true,desc:'',invites:[],spaces:[],members:[{i:'U',c:ACCENT,name:'Umberto',admin:true,tags:[]}],
    docs:[['📝','tile_notes','#6a4a8a','U']],events:[]});
  document.getElementById('newTeamName').value='';saveTeams();
  tOv.classList.remove('open');renderTeams();syncTaskTeams();openTeam(TEAMS.length-1);
});

// ---------- Task checkboxes (home/desktop widgets) ----------
document.addEventListener('click',e=>{
  const ck=e.target.closest('.check');
  if(ck && !ck.closest('#taskList')){ck.closest('.task').classList.toggle('done');}
});

// ---------- Tasks module ----------
const TCOLORS=['#b8a6f4','#6f9bf0','#7ed0b0','#f0c46f','#ef9a9a','#e0a3f0','#f4a6c8','#8a8f98'];
// TASKS per-account (vuoto per i nuovi account; persistito)
function loadTasks(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_tasks')));if(Array.isArray(s))return s.filter(t=>t&&typeof t==='object').map(t=>({...t,id:t.id!=null?t.id:0,scope:t.scope||'all',tag:(t.tag&&typeof t.tag==='object')?t.tag:null,images:Array.isArray(t.images)?t.images:null,date:Array.isArray(t.date)?t.date:null,month:Array.isArray(t.month)?t.month:null}));}catch(e){}return [];}
function saveTasks(){try{localStorage.setItem(ukey('workie_tasks'),JSON.stringify(TASKS));}catch(e){}try{if(typeof renderSideTasks==='function')renderSideTasks();}catch(e){}}
let TASKS=loadTasks();
let TID=TASKS.reduce((m,t)=>Math.max(m,(t&&t.id)||0),100)+1;
// ---- Gruppi di task (es. per cliente) ----
function loadGroups(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_groups')));if(Array.isArray(s))return s.filter(g=>g&&typeof g==='object'&&g.id!=null).map(g=>({id:g.id,name:g.name||'Gruppo',color:g.color||'#b8a6f4',active:g.active!==false,pin:!!g.pin,projectId:(g.projectId!=null?g.projectId:undefined)}));}catch(e){}return [];}
function saveGroups(){try{localStorage.setItem(ukey('workie_groups'),JSON.stringify(GROUPS));}catch(e){}}
let GROUPS=loadGroups();
// ---- Categorie (es. cliente/azienda) — gestite dalle Impostazioni, DISTINTE dai Gruppi ----
function loadCategories(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_categories')));if(Array.isArray(s))return s.filter(c=>c&&typeof c==='object'&&c.id!=null).map(c=>({id:c.id,name:c.name||'Categoria',color:c.color||'#6f9bf0'}));}catch(e){}return [];}
function saveCategories(){try{localStorage.setItem(ukey('workie_categories'),JSON.stringify(CATEGORIES));}catch(e){}}
let CATEGORIES=loadCategories();
let CATID=CATEGORIES.reduce((m,c)=>Math.max(m,c.id||0),0)+1;
function catById(id){return (typeof CATEGORIES!=='undefined')?CATEGORIES.find(c=>c.id===id)||null:null;}
// ---- Link gruppo di task <-> progetto (relazione 1:1, bidirezionale) ----
function grpLinkedProject(gid){if(gid==null)return null;const g=GROUPS.find(x=>x.id===gid);return (g&&g.projectId!=null)?g.projectId:null;}
function projLinkedGroup(pid){if(pid==null)return null;const g=GROUPS.find(x=>x.projectId===pid);return g?g.id:null;}
function grpSetLink(g,pid){
  if(!g)return;
  if(pid==null){delete g.projectId;return;}
  GROUPS.forEach(x=>{if(x!==g&&x.projectId===pid)delete x.projectId;}); // un progetto = un solo gruppo
  g.projectId=pid;
  // backfill: unisci le task già presenti nel gruppo e nel progetto
  TASKS.forEach(t=>{if(t.gid===g.id&&t.projectId!==pid)t.projectId=pid;else if(t.projectId===pid&&t.gid!==g.id)t.gid=g.id;});
  saveTasks();
}
let GID=GROUPS.reduce((m,g)=>Math.max(m,g.id||0),0)+1;
let groupView=null;
let groupsShown=(()=>{try{const v=localStorage.getItem(ukey('workie_groups_shown'));return v==null?true:v==='1';}catch(e){return true;}})();
function saveGroupsShown(){try{localStorage.setItem(ukey('workie_groups_shown'),groupsShown?'1':'0');}catch(e){}}
function activeGroups(){return GROUPS.filter(g=>g.active!==false);}
// salva tasks e teams alla chiusura / quando si lascia l'app (rete di sicurezza)
window.addEventListener('beforeunload',()=>{try{saveTasks();saveTeams();}catch(e){}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){try{saveTasks();saveTeams();}catch(e){}}});
// Al ritorno sull'app (focus/ripresa), ridisegna le task: se è cambiato il giorno lo scope "oggi" si aggiorna.
function tasksDayRefresh(){try{if(typeof renderTasks==='function')renderTasks();}catch(e){}try{if(typeof buildCalendar==='function')buildCalendar();}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tasksDayRefresh();});
window.addEventListener('focus',tasksDayRefresh);
let taskFilter='all';
let catFilter=null;
let ovScope={mode:'day',d:null,today:true},miniCur=new Date();
// Bozza del chatbox home: sopravvive alla navigazione finché NON si invia.
// Dopo l'invio si azzera (si riseleziona la task); se non invii, task+testo restano.
let ovcDraft={task:null,text:''};
function realToday(){const n=new Date();return [n.getFullYear(),n.getMonth(),n.getDate()];}
ovScope.d=realToday();ovScope.today=true;
function cmpDate(a,b){return a[0]-b[0]||a[1]-b[1]||a[2]-b[2];}
function taskOnDay(t,y,m,d){if(t.month)return t.month[0]===y&&t.month[1]===m;return t.date&&t.date[0]===y&&t.date[1]===m&&t.date[2]===d;}
function taskInMonth(t,y,m){if(t.month)return t.month[0]===y&&t.month[1]===m;return t.date&&t.date[0]===y&&t.date[1]===m;}
function taskDue(t){if(t.date)return t.date;if(t.month)return [t.month[0],t.month[1],new Date(t.month[0],t.month[1]+1,0).getDate()];return null;}
// Categoria temporale di una task (gestisce anche gli obiettivi mensili)
function taskPast(t){const today=realToday();if(t.month)return (t.month[0]<today[0]||(t.month[0]===today[0]&&t.month[1]<today[1]));const d=t.date;return !!(d&&cmpDate(d,today)<0);}
function taskTodayCat(t){const today=realToday();if(t.month)return t.month[0]===today[0]&&t.month[1]===today[1];const d=t.date;return (d&&cmpDate(d,today)===0)|| !d;}
function taskFuture(t){const today=realToday();if(t.month)return (t.month[0]>today[0]||(t.month[0]===today[0]&&t.month[1]>today[1]));const d=t.date;return !!(d&&cmpDate(d,today)>0);}
function taskByDue(a,b){const da=taskDue(a),db=taskDue(b);if(!da&&!db)return 0;if(!da)return 1;if(!db)return -1;return cmpDate(da,db);}
function relDayLabel(due){const t=realToday();const diff=Math.round((Date.UTC(due[0],due[1],due[2])-Date.UTC(t[0],t[1],t[2]))/86400000);
  if(diff===0)return tr('al_today_word');if(diff===1)return tr('al_tomorrow');if(diff===-1)return tr('al_yesterday');
  return diff<0?tr('al_days_ago').replace('%n',-diff):tr('al_in_days').replace('%n',diff);}
function homeTaskRow(t,red){const d=taskDue(t);const dl=d?relDayLabel(d):'';const sub=[dl,t.time||''].filter(Boolean).join(' · ');return `<div class="alert${red?' red':''}" data-htask="${t.id}"><span class="alert-dot"></span><div class="alert-main"><div class="alert-title">${bdEsc(taskTitle(t))}</div>${sub?`<div class="alert-sub">${bdEsc(sub)}</div>`:''}</div></div>`;}
function applyHomePrefs(){
  const dw=document.getElementById('homeDwWidget');if(dw)dw.style.display=(USER.showDaily!==false)?'':'none';
  const tk=document.getElementById('homeTasksBlock');if(tk)tk.style.display=(USER.showTasks!==false)?'':'none';
}
let homeAlertPage={};
function renderHomeAlerts(){
  const el=document.getElementById('homeAlerts');if(!el)return;
  const active=TASKS.filter(t=>!t.done);
  const overdue=active.filter(taskPast).sort(taskByDue);
  const dueToday=active.filter(taskTodayCat).sort(taskByDue);
  const groups=[['g_overdue',overdue,true],['g_today',dueToday,false]].filter(g=>g[1].length);
  if(!groups.length){el.innerHTML=`<div class="alert-empty">${tr('al_all_clear')}</div>`;return;}
  // Se sono presenti entrambe le categorie: 1 task alla volta per ciascuna. Se ce n'è una sola: 3 alla volta.
  const per=groups.length>=2?1:3;
  let html='';
  groups.forEach(([gk,items,red])=>{
    const pages=Math.ceil(items.length/per);
    let pg=homeAlertPage[gk]||0;if(pg>=pages)pg=pages-1;if(pg<0)pg=0;homeAlertPage[gk]=pg;
    const slice=items.slice(pg*per,pg*per+per);
    const nav=pages>1?`<span class="home-tgnav"><button class="home-tgarrow" data-halnav="${gk}:prev"${pg===0?' disabled':''}>${SVG.prev}</button><span class="home-tgpage">${pg+1}/${pages}</span><button class="home-tgarrow" data-halnav="${gk}:next"${pg>=pages-1?' disabled':''}>${SVG.next}</button></span>`:'';
    html+=`<div class="home-tgrp${red?' red':''}"><span>${tr(gk)}</span><span class="count">${items.length}</span>${nav}</div>`+slice.map(t=>homeTaskRow(t,red)).join('');
  });
  el.innerHTML=html;
}
// Lista task nella sidebar (In ritardo / Oggi / In arrivo) — stile Claude, sezioni comprimibili
let taskPageId=null, taskPageBack='tasks';
let sideTaskCollapsed=(()=>{try{return JSON.parse(localStorage.getItem('workie_side_collapsed'))||{};}catch(e){return {};}})();
function stMonoPie(done,total){const f=total?done/total:0,cx=8,cy=8,r=3.6;let inner='';
  if(f>=1)inner=`<circle cx="8" cy="8" r="${r}" fill="currentColor"/>`;
  else if(f>0){const th=f*2*Math.PI,ex=(cx+r*Math.sin(th)).toFixed(2),ey=(cy-r*Math.cos(th)).toFixed(2),la=f>0.5?1:0;inner=`<path d="M8,8 L8,${(cy-r).toFixed(2)} A${r},${r} 0 ${la},1 ${ex},${ey} Z" fill="currentColor"/>`;}
  return `<svg class="st-pie" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.8" fill="none" stroke="currentColor" stroke-width="2" opacity=".45"/>${inner}</svg>`;}
const ST_FOLD_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
const ST_CHEV_SVG='<svg class="st-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
const ST_PIN_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M9 3.5h6l-1 6 2.5 2.5v1.5H7.5v-1.5L10 9.5z"/></svg>';
let stDragData=null;
function stGroupPinned(gid){const g=(typeof GROUPS!=='undefined')?GROUPS.find(x=>x.id===gid):null;return !!(g&&g.pin);}
function stGroupItemsHTML(items,cls,pinnedSec,onTaskPage){
  const byGrp=new Map(),loose=[];
  items.forEach(t=>{const g=(t.gid!=null&&typeof GROUPS!=='undefined')?GROUPS.find(x=>x.id===t.gid):null;if(g){if(!byGrp.has(g.id))byGrp.set(g.id,[]);byGrp.get(g.id).push(t);}else loose.push(t);});
  let inner='';
  byGrp.forEach((tks,gid)=>{const g=GROUPS.find(x=>x.id===gid);const fk='sgrp:'+gid+':'+cls;const fcol=!!sideTaskCollapsed[fk];
    inner+='<div class="st-folder'+(fcol?' col':'')+'" draggable="true" data-stfold="'+fk+'" data-fgid="'+gid+'"><span class="st-fold-ic" style="color:'+g.color+'">'+ST_FOLD_SVG+'</span><span class="st-name">'+bdEsc(g.name)+'</span>'+(pinnedSec?'<button class="st-unpin" data-unpingrp="'+gid+'" title="'+tr('st_unpin')+'">'+ST_PIN_SVG+'</button>':'')+ST_CHEV_SVG+'</div>';
    if(!fcol)inner+=tks.map(t=>'<div class="st-subitem'+(onTaskPage&&t.id===taskPageId?' active':'')+'" draggable="true" data-sttask="'+t.id+'"><span class="st-title">'+bdEsc(taskTitle(t))+'</span></div>').join('');
  });
  inner+=loose.map(t=>'<div class="st-item'+(onTaskPage&&t.id===taskPageId?' active':'')+'" draggable="true" data-sttask="'+t.id+'"><span class="st-title">'+bdEsc(taskTitle(t))+'</span>'+(pinnedSec?'<button class="st-unpin" data-unpintask="'+t.id+'" title="'+tr('st_unpin')+'">'+ST_PIN_SVG+'</button>':'')+'</div>').join('');
  return inner;
}
function stDoneItemsHTML(items){
  return items.map(t=>'<div class="st-item done" data-sttask="'+t.id+'"><span class="st-title">'+bdEsc(taskTitle(t))+'</span></div>').join('');
}
function renderSideTasks(){
  const el=document.getElementById('sideTasks');if(!el)return;
  const active=TASKS.filter(t=>!t.done);
  const today=realToday();
  const isPinned=(t)=>!!(t.pin||(t.gid!=null&&stGroupPinned(t.gid)));
  const pinnedL=[];
  const dueCatOf=(t)=>{const d=taskDue(t);if(!d)return 'today';const c=cmpDate(d,today);return c<0?'overdue':(c===0?'today':'upcoming');};
  const overdue=[],todayL=[],upcoming=[];
  active.forEach(t=>{if(isPinned(t)){pinnedL.push(t);return;}const c=dueCatOf(t);if(c==='overdue')overdue.push(t);else if(c==='today')todayL.push(t);else upcoming.push(t);});
  pinnedL.sort(taskByDue);overdue.sort(taskByDue);todayL.sort(taskByDue);upcoming.sort(taskByDue);
  const doneByCat={overdue:[],today:[],upcoming:[]};
  TASKS.filter(t=>isDoneToday(t)&&!isPinned(t)).forEach(t=>{const c=dueCatOf(t);(doneByCat[c]||doneByCat.today).push(t);});
  Object.keys(doneByCat).forEach(k=>doneByCat[k].sort((a,b)=>(a.doneAt||0)-(b.doneAt||0)));
  const groups=[['g_overdue',overdue,'overdue'],['g_today',todayL,'today'],['g_upcoming',upcoming,'upcoming']];
  const onTaskPage=!!document.querySelector('.page[data-page="taskdetail"].active');
  let html='';
  // Titolo sezione (stile "Spaces")
  const secTitle='<div class="st-secttl">'+tr('nav_tasks')+'</div>';
  // Sezione FISSATI (sopra Today) — solo se ci sono elementi pinnati
  if(pinnedL.length){
    const pcol=!!sideTaskCollapsed['pinned'];
    html+='<div class="st-sec st-sec-pin" data-stsec="pinned"><button class="st-label'+(pcol?' col':'')+'" data-sttoggle="pinned"><span class="st-pinhdr">'+ST_PIN_SVG+'</span><span class="st-name">'+tr('st_pinned')+'</span></button>'+(pcol?'':stGroupItemsHTML(pinnedL,'pinned',true,onTaskPage))+'</div>';
  }
  groups.forEach(([lk,items,cls])=>{const doneItems=doneByCat[cls]||[];const doneN=doneItems.length;const total=items.length+doneN;
    // Today è sempre presente (bersaglio del drag); le altre solo se hanno elementi
    if(!total&&cls!=='today')return;
    const col=!!sideTaskCollapsed[cls];
    const inner=col?'':(stGroupItemsHTML(items,cls,false,onTaskPage)+stDoneItemsHTML(doneItems));
    html+='<div class="st-sec" data-stsec="'+cls+'"><button class="st-label'+(col?' col':'')+'" data-sttoggle="'+cls+'">'+stMonoPie(doneN,total)+'<span class="st-name">'+tr(lk)+'</span></button>'+inner+'</div>';
  });
  el.innerHTML=secTitle+(html||'<div class="st-empty">'+tr('al_all_clear')+'</div>');
  try{if(typeof renderSidePlan==='function')renderSidePlan();}catch(e){}
}
function stPinDrop(){
  if(!stDragData)return;
  if(stDragData.type==='group'){const g=GROUPS.find(x=>x.id===stDragData.id);if(g){g.pin=true;if(typeof saveGroups==='function')saveGroups();}}
  else{const t=TASKS.find(x=>x.id===stDragData.id);if(t){if(t.gid!=null){const g=GROUPS.find(x=>x.id===t.gid);if(g){g.pin=true;if(typeof saveGroups==='function')saveGroups();}}else{t.pin=true;saveTasks();}}}
  stDragData=null;renderSideTasks();try{if(typeof renderTasks==='function')renderTasks();}catch(e){}
}
{const _st=document.getElementById('sideTasks');if(_st){
  _st.addEventListener('click',e=>{
    const up=e.target.closest('[data-unpingrp]');if(up){const g=GROUPS.find(x=>x.id===+up.dataset.unpingrp);if(g){g.pin=false;if(typeof saveGroups==='function')saveGroups();}renderSideTasks();try{if(typeof renderTasks==='function')renderTasks();}catch(_){}return;}
    const ut=e.target.closest('[data-unpintask]');if(ut){const t=TASKS.find(x=>x.id===+ut.dataset.unpintask);if(t){t.pin=false;saveTasks();}renderSideTasks();try{if(typeof renderTasks==='function')renderTasks();}catch(_){}return;}
    const fold=e.target.closest('[data-stfold]');if(fold){const k=fold.dataset.stfold;sideTaskCollapsed[k]=!sideTaskCollapsed[k];try{localStorage.setItem('workie_side_collapsed',JSON.stringify(sideTaskCollapsed));}catch(_){}renderSideTasks();return;}
    const tg=e.target.closest('[data-sttoggle]');if(tg){const k=tg.dataset.sttoggle;sideTaskCollapsed[k]=!sideTaskCollapsed[k];try{localStorage.setItem('workie_side_collapsed',JSON.stringify(sideTaskCollapsed));}catch(_){}renderSideTasks();return;}
    const it=e.target.closest('[data-sttask]');if(it&&typeof openTaskPage==='function')openTaskPage(+it.dataset.sttask);
  });
  _st.addEventListener('dragover',e=>{const sec=e.target.closest('[data-stsec="today"]');if(sec&&stDragData){e.preventDefault();try{e.dataTransfer.dropEffect='move';}catch(_){}sec.classList.add('st-drop');}});
  _st.addEventListener('dragleave',e=>{const sec=e.target.closest('[data-stsec="today"]');if(sec&&!sec.contains(e.relatedTarget))sec.classList.remove('st-drop');});
  _st.addEventListener('drop',e=>{const sec=e.target.closest('[data-stsec="today"]');if(sec&&stDragData){e.preventDefault();sec.classList.remove('st-drop');stPinDrop();}});
}}
document.addEventListener('dragstart',e=>{
  const fold=e.target.closest&&e.target.closest('[data-stfold]');
  const sTask=e.target.closest&&e.target.closest('[data-sttask]');
  const row=e.target.closest&&e.target.closest('.task[data-id]');
  if(fold)stDragData={type:'group',id:+fold.dataset.fgid};
  else if(sTask)stDragData={type:'task',id:+sTask.dataset.sttask};
  else if(row)stDragData={type:'task',id:+row.dataset.id};
  else{return;}
  try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','pin');}catch(_){}
  const app=document.querySelector('.app');if(app)app.classList.add('dragging-task');
});
document.addEventListener('dragend',()=>{document.querySelectorAll('.st-drop,.st-pinzone.over').forEach(s=>s.classList.remove('st-drop','over'));const app=document.querySelector('.app');if(app)app.classList.remove('dragging-task');stDragData=null;});
// Zona di rilascio dedicata "Lascia qui per fissare"
{const pz=document.getElementById('stPinZone');if(pz){
  pz.addEventListener('dragover',e=>{if(stDragData){e.preventDefault();try{e.dataTransfer.dropEffect='move';}catch(_){}pz.classList.add('over');}});
  pz.addEventListener('dragleave',e=>{if(!pz.contains(e.relatedTarget))pz.classList.remove('over');});
  pz.addEventListener('drop',e=>{if(stDragData){e.preventDefault();pz.classList.remove('over');stPinDrop();}const app=document.querySelector('.app');if(app)app.classList.remove('dragging-task');});
}}
try{renderSideTasks();}catch(e){}
// Sidebar ridimensionabile (trascina il bordo destro, min/max come Claude)
{const sb=document.querySelector('.sidebar'),rz=document.getElementById('sideResizer');const MINW=268,MAXW=380;
 if(sb){sb.classList.add('no-anim');try{const w=+localStorage.getItem('workie_side_w');if(w>=MINW&&w<=MAXW)sb.style.width=w+'px';}catch(e){}requestAnimationFrame(()=>requestAnimationFrame(()=>sb.classList.remove('no-anim')));}
 if(sb&&rz){let sx=0,sw=0,drag=false;
   rz.addEventListener('mousedown',e=>{drag=true;sx=e.clientX;sw=sb.offsetWidth;rz.classList.add('drag');sb.classList.add('no-anim');document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();});
   window.addEventListener('mousemove',e=>{if(!drag)return;const w=Math.max(MINW,Math.min(MAXW,sw+(e.clientX-sx)));sb.style.width=w+'px';});
   window.addEventListener('mouseup',()=>{if(!drag)return;drag=false;rz.classList.remove('drag');sb.classList.remove('no-anim');document.body.style.cursor='';document.body.style.userSelect='';try{localStorage.setItem('workie_side_w',String(sb.offsetWidth));}catch(e){}});
   const DEFW=276;
   rz.addEventListener('dblclick',e=>{e.preventDefault();sb.classList.remove('no-anim');sb.style.width=DEFW+'px';try{localStorage.setItem('workie_side_w',String(DEFW));}catch(e){}});
 }}
// Resizer per il drawer AI a destra (larghezza modificabile come la sidebar sinistra)
{const adr=document.getElementById('aiDrawer'),arz=document.getElementById('aidResizer');const AMIN=220,AMAX=460,ADEF=260;
 const setAidW=(w)=>{if(adr)adr.style.setProperty('--aid-w',w+'px');};
 if(adr){try{const w=+localStorage.getItem('workie_ai_drawer_w');if(w>=AMIN&&w<=AMAX)setAidW(w);}catch(e){}}
 if(adr&&arz){let sx=0,sw=0,drag=false;
   arz.addEventListener('mousedown',e=>{drag=true;sx=e.clientX;sw=adr.offsetWidth;arz.classList.add('drag');adr.classList.add('no-anim');document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();});
   window.addEventListener('mousemove',e=>{if(!drag)return;const w=Math.max(AMIN,Math.min(AMAX,sw-(e.clientX-sx)));setAidW(w);});
   window.addEventListener('mouseup',()=>{if(!drag)return;drag=false;arz.classList.remove('drag');adr.classList.remove('no-anim');document.body.style.cursor='';document.body.style.userSelect='';try{localStorage.setItem('workie_ai_drawer_w',String(adr.offsetWidth));}catch(e){}});
   arz.addEventListener('dblclick',e=>{e.preventDefault();adr.classList.remove('no-anim');setAidW(ADEF);try{localStorage.setItem('workie_ai_drawer_w',String(ADEF));}catch(e){}});
 }}
// Toolbar sidebar: Home/Chat (viste nella sidebar) + azioni Inbox/?/Cerca
// Default = 'chat': la sidebar mostra le chat delle task al posto delle viste task.
var sideView='chat';
function setSideView(v){
  sideView=v;
  document.querySelectorAll('[data-sview]').forEach(b=>b.classList.toggle('active',b.dataset.sview===v));
  const home=(v==='home');
  // Il nav resta SEMPRE visibile; cambia solo la sezione inferiore (task / chat / inbox)
  const st=document.getElementById('sideTasks'),sc=document.getElementById('sideChat'),si=document.getElementById('sideInbox');
  if(st)st.style.display=home?'':'none';
  if(sc){sc.classList.toggle('open',v==='chat');if(v==='chat'&&typeof renderSideChat==='function')renderSideChat();}
  if(si){si.classList.toggle('open',v==='inbox');if(v==='inbox'&&typeof renderSideInbox==='function')renderSideInbox();}
}
function renderSideChat(){
  const el=document.getElementById('sideChat');if(!el)return;
  if(typeof rsvLoad==='function')rsvLoad();
  const store=(typeof RESOLVE_CHATS!=='undefined'&&RESOLVE_CHATS)?RESOLVE_CHATS:{};
  const chats=Object.keys(store).map(k=>({id:+k,e:store[k]})).filter(x=>x.e&&x.e.msgs&&x.e.msgs.length&&TASKS.some(t=>t.id===x.id));
  const ttl='<div class="sc-secttl">Chat</div>';
  if(!chats.length){el.innerHTML=ttl+'<div class="sc-empty">'+tr('side_chat_empty')+'</div>';return;}
  const onChat=!!document.querySelector('.page[data-page="taskdetail"].active')&&!!document.querySelector('.tdw.chat-open');
  // Riga sottile: solo titolo + pallino viola quando l'ultimo messaggio è dell'AI (= da leggere) e non sei dentro quella chat.
  el.innerHTML=ttl+'<div class="sc-list">'+chats.map(({id,e})=>{
    const t=TASKS.find(x=>x.id===id);const title=t?taskTitle(t):('#'+id);
    const active=(onChat&&taskPageId===id);
    const unread=!active&&!!e.unread; // pallino solo per una risposta AI non ancora letta
    return '<div class="sc-item'+(active?' active':'')+(unread?' unread':'')+'" data-scchat="'+id+'"><span class="sc-ni"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z"/></svg></span><span class="sc-ctitle">'+bdEsc(title)+'</span><span class="sc-dot"></span></div>';
  }).join('')+'</div>';
}
{const el=document.getElementById('sideChat');if(el)el.addEventListener('click',e=>{const it=e.target.closest('[data-scchat]');if(it&&typeof openResolveChat==='function')openResolveChat(+it.dataset.scchat);});}
function renderSideInbox(){
  const el=document.getElementById('sideInbox');if(!el)return;
  const connected=(typeof mailConnected==='function')&&mailConnected();
  if(!connected){
    el.innerHTML='<div class="si-hero"><div class="si-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.5z"/></svg></div><div class="si-t">'+tr('si_connect_t')+'</div><div class="si-d">'+tr('si_connect_d')+'</div><button class="si-btn" data-siconnect>'+tr('si_connect_btn')+'</button></div>';
    return;
  }
  const msgs=[...(typeof GMAIL_MSGS!=='undefined'?GMAIL_MSGS:[]),...(typeof OUTLOOK_MSGS!=='undefined'?OUTLOOK_MSGS:[])].sort((a,b)=>(b.date?b.date.getTime():0)-(a.date?a.date.getTime():0));
  if(!msgs.length){el.innerHTML='<div class="si-empty">'+tr('wf_empty')+'</div>';return;}
  el.innerHTML='<div class="si-list">'+msgs.map(m=>'<div class="si-msg"><div class="si-from">'+bdEsc(m.from||m.fromEmail||'')+'</div><div class="si-subj">'+bdEsc(m.subject||'')+'</div></div>').join('')+'</div>';
}
{const si=document.getElementById('sideInbox');if(si)si.addEventListener('click',e=>{if(e.target.closest('[data-siconnect]')){if(typeof go==='function')go('connections');}});}
// ===== Pagina Inbox (due pannelli) =====
let ibSel=null,ibQuery='',ibFilter='all';
let ibRead=(()=>{try{return new Set(JSON.parse(localStorage.getItem(ukey('workie_inbox_read')))||[]);}catch(e){return new Set();}})();
function ibSaveRead(){try{localStorage.setItem(ukey('workie_inbox_read'),JSON.stringify([...ibRead]));}catch(e){}}
function ibMarkRead(id){if(id&&!ibRead.has(id)){ibRead.add(id);ibSaveRead();}}
function ibUnreadCount(){return ibMails().filter(m=>!ibRead.has(m.id)).length;}
const IB_SAMPLE=[
  {id:'s1',from:'Roberta Bianchi',fromEmail:'roberta@studiobianchi.it',date:'Oggi · 09:14',subject:'Conferma appuntamento — Campagna Cervino',body:'Ciao,\n\nti confermo l\'appuntamento di lunedì per la Campagna Cervino. Prima però mi servirebbe il preventivo aggiornato con le nuove voci che avevamo discusso.\n\nPuoi mandarmelo entro venerdì?\n\nGrazie,\nRoberta'},
  {id:'s2',from:'Marco Rossi',fromEmail:'marco@economygroup.it',date:'Ieri · 18:02',subject:'Podcast — revisione episodio 3',body:'Ho ascoltato la bozza dell\'episodio 3. Ci sono un paio di tagli da fare intorno al minuto 12 e la sigla va abbassata di volume.\n\nQuando riesci a sistemare?'},
  {id:'s3',from:'Design Weekly',fromEmail:'news@designweekly.co',date:'Lun · 11:40',subject:'10 trend UI da tenere d\'occhio nel 2026',body:'Questa settimana: micro-interazioni, tipografia variabile, interfacce "quiet"...\n\nBuona lettura!'}
];
function ibMails(){
  if(typeof ibConnected==='function'&&ibConnected()){
    const real=[...(typeof GMAIL_MSGS!=='undefined'?GMAIL_MSGS:[]),...(typeof OUTLOOK_MSGS!=='undefined'?OUTLOOK_MSGS:[])].sort((a,b)=>(b.date?b.date.getTime():0)-(a.date?a.date.getTime():0));
    return real.map((m,i)=>({id:(m.src||'m')+'_'+(m.id||i),from:m.from||m.fromEmail||'',fromEmail:m.fromEmail||m.from||'',ts:(m.date&&m.date.getTime?m.date.getTime():0),flagged:!!m.flagged,date:(m.date?m.date.toLocaleString(LOCALES[LANG]||'it',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):''),subject:m.subject||'',body:m.body||m.snippet||'',to:m.to||'',cc:m.cc||'',attachments:m.attachments||[],thread:m.thread||null}));
  }
  return IB_SAMPLE;
}
try{Object.assign(STR.it,{ib_manage:'Gestisci caselle',ib_manage_sub:'Collega e gestisci le tue email.',ib_cs_title:'Collega la tua inbox',ib_cs_sub:'Scegli il tuo provider per gestire le email direttamente da Workie.',ib_cs_note:'Sola lettura: Workie non invia né modifica nulla senza il tuo ok.',ib_connected:'collegata',ib_disconnect:'Scollega',ib_add_mailbox:"Aggiungi un'altra casella",ib_from_email:"Dall'email",ib_ai_working:"Workie sta semplificando l'email…",ib_ai_done:'Ecco la task che ho preparato',ib_ai_done_n:'Ho preparato %n task',ib_task_title:'Titolo della task',ib_task_confirm:'Aggiungi la task',ib_task_confirm_n:'Aggiungi le task',ib_tasks_added:'%n task aggiunte ✓',ib_group_toggle:'Raggruppa in un gruppo',ib_group_name:'Nome del gruppo',ib_remove:'Rimuovi',ib_task_added:'Task aggiunta ✓',ib_task_title2:"Crea task dall'email",ib_task_sub:"Workie semplifica l'email in una task.",ib_search_ph:'Cerca nelle email…',ib_f_all:'Tutte',ib_f_unread:'Non lette',ib_no_results:'Nessuna email trovata.',ib_refreshed:'Inbox aggiornata',ib_prov_soon:'Presto disponibile per questo provider. Per ora usa Gmail.',ib_load_more:'Carica altre',dq_none:'Nessuna'});
Object.assign(STR.en,{ib_manage:'Manage mailboxes',ib_manage_sub:'Connect and manage your email.',ib_cs_title:'Connect your inbox',ib_cs_sub:'Pick your provider to manage email right from Workie.',ib_cs_note:'Read-only: Workie never sends or changes anything without your ok.',ib_connected:'connected',ib_disconnect:'Disconnect',ib_add_mailbox:'Add another mailbox',ib_from_email:'From the email',ib_ai_working:'Workie is simplifying the email…',ib_ai_done:"Here's the task I prepared",ib_ai_done_n:'I prepared %n tasks',ib_task_title:'Task title',ib_task_confirm:'Add the task',ib_task_confirm_n:'Add the tasks',ib_tasks_added:'%n tasks added ✓',ib_group_toggle:'Group into a group',ib_group_name:'Group name',ib_remove:'Remove',ib_task_added:'Task added ✓',ib_task_title2:'Create task from email',ib_task_sub:'Workie simplifies the email into a task.',ib_search_ph:'Search emails…',ib_f_all:'All',ib_f_unread:'Unread',ib_no_results:'No emails found.',ib_refreshed:'Inbox refreshed',ib_prov_soon:'Coming soon for this provider. Use Gmail for now.',ib_load_more:'Load more',dq_none:'None'});}catch(e){}
// ---- Collegamento caselle ----
const IB_PROVIDERS=[
  {id:'gmail',name:'Gmail',color:'#ea4335',domain:'gmail.com'},
  {id:'outlook',name:'Outlook',color:'#0078d4',domain:'outlook.com'}
  // Altri provider (iCloud, Yahoo, Proton, IMAP) rimossi per ora: si riattivano aggiungendoli qui.
];
// Account = stato REALE delle connessioni (Gmail/Outlook via OAuth), non finto/persistito.
function ibAccounts(){
  const list=[];
  if(typeof gmailConnected==='function'&&gmailConnected())list.push({id:'gmail',name:'Gmail',color:'#ea4335',domain:'gmail.com',email:GMAIL_EMAIL||''});
  if(typeof outlookOn==='function'&&outlookOn())list.push({id:'outlook',name:'Outlook',color:'#0078d4',domain:'outlook.com',email:(typeof OUTLOOK_EMAIL!=='undefined'?OUTLOOK_EMAIL:'')||''});
  return list;
}
function ibConnected(){return ibAccounts().length>0;}
// Logo del provider (SVG trasparente) per bottoni/caselle
function ibProvBrand(id){
  if(id==='gmail')return '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C42.9 35.8 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>';
  if(id==='outlook')return '<img src="img/outlook.svg" alt="Outlook" class="ib-oico">';
  const p=(typeof IB_PROVIDERS!=='undefined')?IB_PROVIDERS.find(x=>x.id===id):null;return p?ibProvIcon(p):'';
}
function ibOnMail(){try{const pg=document.querySelector('.page[data-page="inbox"].active');if(pg)renderInboxPage();}catch(_){}try{const mo=document.getElementById('ibManageOverlay');if(mo&&mo.classList.contains('open'))ibManageRender();}catch(_){}}
function ibProvIcon(p){if(p.domain)return '<img src="https://www.google.com/s2/favicons?domain='+p.domain+'&sz=128" alt="" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'"><span class="ib-prov-fallback" style="display:none;background:'+p.color+'">'+(p.name||'?').charAt(0)+'</span>';return '<span class="ib-prov-fallback" style="display:grid;background:'+p.color+'">@</span>';}
function ibConnectProvider(pid){
  if(pid==='gmail'){if(typeof gmailConnect==='function')gmailConnect();return;}
  if(pid==='outlook'){if(typeof OUTLOOK_CLIENT_ID!=='undefined'&&OUTLOOK_CLIENT_ID&&typeof outlookConnect==='function'){outlookConnect();}else{try{showToast(tr('outlook_setup'));}catch(_){}}return;}
  try{showToast(tr('ib_prov_soon'));}catch(_){}
}
function ibDisconnectProvider(pid){
  if(pid==='gmail'&&typeof gmailDisconnect==='function'){gmailDisconnect();GMAIL_EMAIL='';}
  else if(pid==='outlook'&&typeof outlookDisconnect==='function'){outlookDisconnect();}
  ibOnMail();
}
function renderInboxConnect(){
  const el=document.getElementById('ibConnectScreen');if(!el)return;
  const MAIL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>';
  const SWAP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>';
  const IC_LINK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15 20 4"/><path d="M15 4h5v5"/><path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/></svg>';
  const IC_LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>';
  const IC_SHIELD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.3-3 7.3-7 8.5-4-1.2-7-4.2-7-8.5V6z"/><path d="M9.2 12.2l1.9 1.9 3.7-3.9"/></svg>';
  const bene=(ic,t,d)=>'<div class="ib-cs-b"><span class="ib-cs-b-ic">'+ic+'</span><div class="ib-cs-b-tx"><div class="ib-cs-b-t">'+t+'</div><div class="ib-cs-b-d">'+d+'</div></div></div>';
  const GICON='<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C42.9 35.8 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>';
  const OICON='<img src="img/outlook.svg" alt="Outlook" class="ib-oico">';
  const brandIcon=id=>id==='gmail'?GICON:(id==='outlook'?OICON:ibProvIcon(IB_PROVIDERS.find(x=>x.id===id)||{}));
  const btn=(id,label)=>{const p=IB_PROVIDERS.find(x=>x.id===id);if(!p)return '';return '<button type="button" class="ib-cs-prov" data-ibprov="'+id+'"><span class="ib-cs-prov-ic">'+brandIcon(id)+'</span><span>'+tr('ib_cont').replace('%s',label)+'</span></button>';};
  const INBOX_IC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.5z"/></svg>';
  const WK=(typeof SVG!=='undefined'&&SVG.blob)?SVG.blob:'<span style="font-family:var(--serif);font-weight:700">W</span>';
  const terms=tr('ib_terms').replace('%tos','<a class="ib-cs-link" data-ibterms>'+tr('ib_tos')+'</a>').replace('%pp','<a class="ib-cs-link" data-ibprivacy>'+tr('ib_pp')+'</a>');
  el.innerHTML=
    '<div class="ib-cs-center"><div class="ib-cs-card">'
   +'<div class="ib-cs-logos"><span class="ib-cs-logo solo">'+INBOX_IC+'</span></div>'
   +'<div class="ib-cs-title">'+tr('ib_connect_t')+'</div>'
   +'<div class="ib-cs-sub">'+tr('ib_connect_sub')+'</div>'
   +'<div class="ib-cs-benefits">'+bene(IC_LINK,tr('ib_b1_t'),tr('ib_b1_d'))+bene(IC_LOCK,tr('ib_b2_t'),tr('ib_b2_d'))+bene(IC_SHIELD,tr('ib_b3_t'),tr('ib_b3_d'))+'</div>'
   +'<div class="ib-cs-actions">'+btn('gmail','Google')+btn('outlook','Outlook')+'</div>'
   +'<div class="ib-cs-terms">'+terms+'</div>'
   +'</div></div>';
}
const IB_IC_REPLY='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>';
const IB_IC_REPLYALL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 17 2 12 7 7"/><polyline points="12 17 7 12 12 7"/><path d="M22 18v-2a4 4 0 0 0-4-4H8"/></svg>';
const IB_IC_FWD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>';
const IB_IC_TASK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
const IB_IC_CLIP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21.4 11.05 12.2 20.2a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 1 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5"/></svg>';
function ibAvatarColor(s){const p=['#8168e6','#6f9bf0','#7ed0b0','#f0a35b','#ef7a85','#c58af0','#5ec8d8'];s=s||'?';let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return p[h%p.length];}
function ibFmtDate(d){if(!d)return '';if(d.toLocaleString)return d.toLocaleString(LOCALES[LANG]||'it',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});return String(d);}
function ibBodyHTML(b){b=bdEsc(b||'');b=b.replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" class="ib-rd-link" target="_blank" rel="noopener">$1</a>');return b.replace(/\n/g,'<br>');}
function ibReplyBar(){return '<div class="ib-rd-replybar"><button class="ib-rd-rbtn" data-ibreplyone>'+IB_IC_REPLY+'<span>'+tr('ib_reply')+'</span></button><button class="ib-rd-rbtn" data-ibreplyall>'+IB_IC_REPLYALL+'<span>'+tr('ib_reply_all')+'</span></button><button class="ib-rd-rbtn" data-ibforward>'+IB_IC_FWD+'<span>'+tr('ib_forward')+'</span></button></div>';}
function ibMsgHTML(msg,idx,open,mailId){
  const initial=(msg.from||'?').trim().charAt(0).toUpperCase();
  const av='<div class="ib-rd-av" style="background:'+ibAvatarColor(msg.from)+'">'+bdEsc(initial)+'</div>';
  const atts=(open&&msg.attachments&&msg.attachments.length)?'<div class="ib-rd-atts">'+msg.attachments.map(a=>'<span class="ib-rd-att">'+IB_IC_CLIP+'<span class="ib-rd-att-n">'+bdEsc(a.name)+'</span>'+(a.size?'<span class="ib-rd-att-s">'+bdEsc(a.size)+'</span>':'')+'</span>').join('')+'</div>':'';
  const acts='<div class="ib-rd-acts"><button class="ib-rd-aic" data-ibreplyone title="'+tr('ib_reply')+'">'+IB_IC_REPLY+'</button><button class="ib-rd-aic" data-ibreplyall title="'+tr('ib_reply_all')+'">'+IB_IC_REPLYALL+'</button><button class="ib-rd-aic" data-ibforward title="'+tr('ib_forward')+'">'+IB_IC_FWD+'</button><button class="ib-rd-aic" data-ibtask="'+mailId+'" title="'+tr('ib_make_task')+'">'+IB_IC_TASK+'</button></div>';
  const recips=open?('<div class="ib-rd-l2">'+(msg.to?'<span><b>A:</b> '+bdEsc(msg.to)+'</span>':'')+(msg.cc?'<span><b>Cc:</b> '+bdEsc(msg.cc)+'</span>':'')+'</div>'):('<div class="ib-rd-snip">'+bdEsc((msg.body||'').replace(/\s+/g,' ').trim().slice(0,110))+'</div>');
  const head='<div class="ib-rd-mhead">'+av+'<div class="ib-rd-minfo"><div class="ib-rd-l1"><span class="ib-rd-name">'+bdEsc(msg.from)+'</span>'+((open&&msg.fromEmail)?'<span class="ib-rd-email">'+bdEsc(msg.fromEmail)+'</span>':'')+'<span class="ib-rd-date">'+bdEsc(ibFmtDate(msg.date))+'</span></div>'+recips+'</div>'+(open?acts:'')+'</div>';
  const body=open?(atts+'<div class="ib-rd-body">'+ibBodyHTML(msg.body)+'</div>'+ibReplyBar()):'';
  return '<div class="ib-rd-msg'+(open?' open':' collapsed')+'" data-ibmsg="'+idx+'">'+head+body+'</div>';
}
let ibThreadOpen=new Set(),ibReaderFor=null;
function ibRenderReader(){
  const reader=document.getElementById('ibReader');if(!reader)return;
  const m=ibMails().find(x=>x.id===ibSel);
  if(!m){reader.innerHTML='<div class="ib-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.5z"/></svg>'+tr('ib_pick')+'</div>';ibReaderFor=null;return;}
  const thread=(m.thread&&m.thread.length)?m.thread:[m];
  if(ibReaderFor!==m.id){ibReaderFor=m.id;ibThreadOpen=new Set([thread.length-1]);}
  let html='<div class="ib-rd-subject"><span>'+bdEsc(m.subject)+'</span>'+(thread.length>1?'<span class="ib-rd-tcount">'+thread.length+'</span>':'')+'</div><div class="ib-rd-thread">';
  thread.forEach((msg,i)=>{html+=ibMsgHTML(msg,i,ibThreadOpen.has(i),m.id);});
  reader.innerHTML=html+'</div>';
}
const IB_FILTERS=[
  {k:'all',lbl:'ib_f_all'},
  {k:'unread',lbl:'ib_f_unread',count:true},
  {k:'flagged',lbl:'ib_f_flagged'},
  {k:'archive',lbl:'ib_f_archive'},
  {k:'sent',lbl:'ib_f_sent'},
  {k:'drafts',lbl:'ib_f_drafts'},
  {k:'trash',lbl:'ib_f_trash'},
  {k:'spam',lbl:'ib_f_spam'}
];
const IB_DGROUPS=[['today','ib_g_today'],['yesterday','ib_g_yesterday'],['week','ib_g_week'],['lastweek','ib_g_lastweek'],['month','ib_g_month'],['older','ib_g_older']];
let ibCollapse={};
function ibDateGroup(ts){
  if(!ts)return 'older';
  const now=new Date();const sod=x=>{const y=new Date(x);y.setHours(0,0,0,0);return y;};
  const t0=sod(now),md=sod(new Date(ts));
  const dd=Math.round((t0-md)/86400000);
  if(dd<=0)return 'today';
  if(dd===1)return 'yesterday';
  const dow=(now.getDay()+6)%7;
  const weekStart=new Date(t0);weekStart.setDate(t0.getDate()-dow);
  const lastWeekStart=new Date(weekStart);lastWeekStart.setDate(weekStart.getDate()-7);
  if(md>=weekStart)return 'week';
  if(md>=lastWeekStart)return 'lastweek';
  const monthStart=new Date(t0.getFullYear(),t0.getMonth(),1);
  if(md>=monthStart)return 'month';
  return 'older';
}
function ibRenderFilters(){
  const el=document.getElementById('ibFilters');if(!el)return;
  const unreadN=(typeof ibMails==='function')?ibMails().filter(m=>!ibRead.has(m.id)).length:0;
  el.innerHTML=IB_FILTERS.map(f=>{
    const on=(ibFilter===f.k)||(f.k==='all'&&(!ibFilter||ibFilter==='all'));
    const cnt=(f.count&&unreadN)?'<span class="ib-fcount">'+unreadN+'</span>':'';
    return '<button type="button" class="ib-fbtn'+(on?' active':'')+'" data-ibfilter="'+f.k+'">'+tr(f.lbl)+cnt+'</button>';
  }).join('');
}
function renderInboxPage(){
  const body=document.getElementById('ibBody'),cs=document.getElementById('ibConnectScreen'),mng=document.getElementById('ibManage'),badge=document.getElementById('ibUnreadBadge');
  const head=document.querySelector('[data-page="inbox"] .ib-head');
  const crumb=document.getElementById('ibCrumb');
  if(!ibConnected()){
    if(head)head.style.display='none'; // la connect screen ha il suo header (stile Tasks)
    if(crumb)crumb.style.display='none';
    {const tb=document.getElementById('ibToolbar');if(tb)tb.style.display='none';}
    if(body)body.style.display='none';if(cs)cs.style.display='flex';if(mng)mng.style.display='none';if(badge)badge.style.display='none';
    renderInboxConnect();return;
  }
  if(head)head.style.display='';
  if(crumb){crumb.style.display='';const em=document.getElementById('ibCrumbEmail');if(em){const a=(typeof ibAccounts==='function')?ibAccounts()[0]:null;em.textContent=(a&&a.email)||'umberto@work.app';}}
  if(cs)cs.style.display='none';if(body)body.style.display='flex';if(mng)mng.style.display='';
  {const tb=document.getElementById('ibToolbar');if(tb)tb.style.display='flex';}
  if(typeof ibRenderFilters==='function')ibRenderFilters();
  if(typeof gmailConnected==='function'&&gmailConnected()&&!GMAIL_MSGS.length&&!gmailLoading&&typeof gmailFetch==='function')gmailFetch();
  const list=document.getElementById('ibList');if(!list)return;
  const all=ibMails();
  if(!all.length&&(gmailLoading||(typeof outlookLoading!=='undefined'&&outlookLoading))){list.innerHTML='<div class="ib-list-empty">'+tr('wf_loading')+'</div>';return;}
  const q=(ibQuery||'').trim().toLowerCase();
  const matchQ=m=>!q||((m.subject||'')+' '+(m.from||'')+' '+(m.body||'')).toLowerCase().includes(q);
  const IB_FOLDER_SOON=['archive','sent','drafts','trash','spam']; // cartelle non ancora collegate
  let mails;
  if(IB_FOLDER_SOON.indexOf(ibFilter)>=0)mails=[];
  else if(ibFilter==='flagged')mails=all.filter(m=>matchQ(m)&&m.flagged);
  else mails=all.filter(m=>matchQ(m)&&(ibFilter!=='unread'||!ibRead.has(m.id)||m.id===ibSel));
  if(!mails.some(m=>m.id===ibSel))ibSel=mails.length?mails[0].id:null;
  ibMarkRead(ibSel);
  const emptyMsg=(IB_FOLDER_SOON.indexOf(ibFilter)>=0)?tr('ib_folder_soon'):tr('ib_no_results');
  // item compatto (solo mittente + oggetto, niente anteprima) + raggruppamento per data stile Task
  const itemHTML=m=>'<div class="ib-mail'+(m.id===ibSel?' sel':'')+(ibRead.has(m.id)?' read':'')+'" data-ibmail="'+m.id+'"><span class="ib-mail-udot"></span><div class="ib-mail-top"><span class="ib-mail-from">'+bdEsc(m.from)+'</span><span class="ib-mail-date">'+bdEsc(m.date||'')+'</span></div><div class="ib-mail-subj">'+bdEsc(m.subject)+'</div></div>';
  if(mails.length){
    const buckets={};mails.forEach(m=>{const g=ibDateGroup(m.ts);(buckets[g]||(buckets[g]=[])).push(m);});
    let html='';
    IB_DGROUPS.forEach(([k,lbl])=>{const grp=buckets[k];if(!grp)return;
      const readN=grp.filter(m=>ibRead.has(m.id)).length,unreadN=grp.length-readN,col=!!ibCollapse[k];
      html+='<div class="tgroup-h tgroup-box tg-toggle'+(col?' collapsed':'')+'" data-ibgroup="'+k+'"><svg class="tg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'+pieIcon(readN,grp.length)+'<span>'+tr(lbl)+'</span> <span class="count">'+unreadN+'</span></div>';
      if(!col)html+=grp.map(itemHTML).join('');});
    list.innerHTML=html;
  }else list.innerHTML='<div class="ib-list-empty">'+emptyMsg+'</div>';
  if(typeof gmailConnected==='function'&&gmailConnected()&&typeof gmailPageToken!=='undefined'&&gmailPageToken){list.innerHTML+='<button class="ib-loadmore" id="ibLoadMore"'+(gmailMore?' disabled':'')+'>'+(gmailMore?tr('wf_loading'):tr('ib_load_more'))+'</button>';}
  const uc=all.filter(m=>!ibRead.has(m.id)).length;
  {const fu=document.getElementById('ibFUnread');if(fu)fu.textContent=uc?uc:'';}
  if(badge){badge.textContent=uc;badge.style.display=uc?'':'none';}
  ibRenderReader();
}
// ---- Gestisci caselle (modale) ----
function ibManageRender(){
  const el=document.getElementById('ibManageBody');if(!el)return;
  const accts=ibAccounts();
  const connected=accts.map(a=>'<div class="ib-acct"><span class="ib-prov-ic">'+ibProvIcon(a)+'</span><span class="ib-acct-tx"><b>'+bdEsc(a.name)+'</b><span>'+bdEsc(a.email||'')+'</span></span><button class="ib-acct-x" data-ibdisc="'+a.id+'" title="'+tr('ib_disconnect')+'">×</button></div>').join('');
  const avail=IB_PROVIDERS.filter(p=>!accts.some(a=>a.id===p.id));
  const add=avail.length?'<div class="ib-mng-sub">'+tr('ib_add_mailbox')+'</div><div class="ib-cs-grid sm">'+avail.map(p=>'<button type="button" class="ib-prov" data-ibprov="'+p.id+'"><span class="ib-prov-ic">'+ibProvIcon(p)+'</span><span class="ib-prov-name">'+p.name+'</span></button>').join('')+'</div>':'';
  el.innerHTML=(connected?'<div class="ib-mng-list">'+connected+'</div>':'')+add;
}
function ibManageOpen(){ibManageRender();const ov=document.getElementById('ibManageOverlay');if(ov)ov.classList.add('open');}
// Menu a tendina sul crumb: elenco caselle salvate + "Gestione inbox"
function ibCrumbMenuRender(){
  const el=document.getElementById('ibCrumbMenu');if(!el)return;
  const accts=(typeof ibAccounts==='function')?ibAccounts():[];const cur=accts[0];
  const CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const GEAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  let html=accts.map(a=>'<button type="button" class="ibcm-item'+(cur&&a.id===cur.id?' on':'')+'" data-ibacct="'+a.id+'"><span class="ibcm-ic">'+ibProvIcon(a)+'</span><span class="ibcm-tx">'+bdEsc(a.email||a.name)+'</span>'+((cur&&a.id===cur.id)?'<span class="ibcm-chk">'+CHK+'</span>':'')+'</button>').join('');
  html+='<div class="ibcm-sep"></div><button type="button" class="ibcm-item ibcm-manage" data-ibmanage><span class="ibcm-ic">'+GEAR+'</span><span class="ibcm-tx">'+tr('ib_manage')+'</span></button>';
  el.innerHTML=html;
}
function ibCrumbToggle(open){const cb=document.getElementById('ibCrumb');if(!cb)return;const willOpen=(open===undefined)?!cb.classList.contains('menuopen'):!!open;if(willOpen)ibCrumbMenuRender();cb.classList.toggle('menuopen',willOpen);}
// ---- Crea task dall'email (AI semplifica + conferma) ----
let ibTaskMail=null;
function ibHeuristicTitle(m){let s=(m.subject||'').replace(/^\s*(re|fwd|fw|r|i)\s*:\s*/gi,'').trim();return (s||tr('ib_make_task')).slice(0,90);}
function ibHeuristicDesc(m){let b=(m.body||'').replace(/\s+/g,' ').trim();const cut=b.slice(0,160);return (m.from?(tr('wf_from')+' '+m.from+'. '):'')+cut+(b.length>160?'…':'');}
function ibExtractDate(text){
  const t=(text||'').toLowerCase();
  if(/\bdopodomani\b/.test(t)){const d=new Date();d.setDate(d.getDate()+2);return d;}
  if(/\bdomani\b/.test(t)){const d=new Date();d.setDate(d.getDate()+1);return d;}
  if(/\boggi\b/.test(t)){return new Date();}
  const days={domenica:0,'lunedì':1,lunedi:1,'martedì':2,martedi:2,'mercoledì':3,mercoledi:3,'giovedì':4,giovedi:4,'venerdì':5,venerdi:5,sabato:6};
  for(const k in days){if(t.includes(k)){const d=new Date();let diff=(days[k]-d.getDay()+7)%7;if(diff===0)diff=7;d.setDate(d.getDate()+diff);return d;}}
  return null;
}
function ibToISO(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function ibDefaultGroupName(m){let s=(m.subject||'').replace(/^\s*(re|fwd|fw|r|i)\s*:\s*/gi,'').trim();return (s||tr('ib_make_task')).slice(0,40);}
async function ibSimplifyEmail(m){
  const dd=ibExtractDate((m.subject||'')+' '+(m.body||''));
  const fallback={group:false,groupName:ibDefaultGroupName(m),tasks:[{title:ibHeuristicTitle(m),desc:ibHeuristicDesc(m),date:dd?ibToISO(dd):''}]};
  try{
    const reply=await aiChat({mode:'chat',messages:[{role:'user',text:'Oggi è '+ibToISO(new Date())+'. Analizza questa email ed estrai le COSE DA FARE. Restituisci SOLO un JSON valido (nessun altro testo, niente ```): {"group": true/false, "groupName": "nome breve se group=true", "tasks": [{"title":"titolo conciso e azionabile max 8 parole","description":"1-2 frasi su cosa fare","deadline":"YYYY-MM-DD assoluta se c\'è una scadenza (es. entro venerdì/domani), altrimenti \\"\\""}]}. REGOLE: se c\'è UNA sola cosa da fare → un solo task, group=false. Se ce ne sono PIÙ, elencale come task separati; imposta group=true SOLO se fanno parte dello stesso progetto/contesto (allora metti un groupName), altrimenti group=false (task indipendenti). Massimo 6 task. Email:\nOggetto: '+(m.subject||'')+'\nCorpo:\n'+((m.body||'').slice(0,1200))}]});
    let raw=(reply||'').trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();
    const s=raw.indexOf('{'),e2=raw.lastIndexOf('}');if(s>=0&&e2>s)raw=raw.slice(s,e2+1);
    const j=JSON.parse(raw);
    let tasks=Array.isArray(j.tasks)?j.tasks:[];
    tasks=tasks.map(t=>({title:(t.title||'').toString().slice(0,90),desc:(t.description||'').toString().slice(0,300),date:/^\d{4}-\d{2}-\d{2}$/.test(t.deadline||'')?t.deadline:''})).filter(t=>t.title).slice(0,6);
    if(!tasks.length)return fallback;
    return {group:tasks.length>1&&!!j.group,groupName:(j.groupName||ibDefaultGroupName(m)).toString().slice(0,40),tasks};
  }catch(e){}
  return fallback;
}
let ibTaskDraft=null;
function ibDateChipsHTML(date,idx){
  const months=(MONTHS[LANG]||MONTHS.it);
  const today=ibToISO(new Date());const tm=new Date();tm.setDate(tm.getDate()+1);const tomo=ibToISO(tm);
  const sel=v=>date===v?' active':'';
  let sugg='';
  if(date&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&date!==today&&date!==tomo){const p=date.split('-').map(Number);sugg='<button type="button" class="nt-dchip active" data-ibt-date="'+idx+'" data-ibdate="'+date+'">'+p[2]+' '+(months[p[1]-1]||'').slice(0,3)+'</button>';}
  return '<button type="button" class="nt-dchip'+(date?'':' active')+'" data-ibt-date="'+idx+'" data-ibdate="">'+tr('dq_none')+'</button>'
    +'<button type="button" class="nt-dchip'+sel(today)+'" data-ibt-date="'+idx+'" data-ibdate="'+today+'">'+tr('dq_today')+'</button>'
    +'<button type="button" class="nt-dchip'+sel(tomo)+'" data-ibt-date="'+idx+'" data-ibdate="'+tomo+'">'+tr('dq_tomorrow')+'</button>'+sugg;
}
function ibTaskBuildHTML(){
  const m=ibTaskMail,d=ibTaskDraft;if(!m||!d)return '';const attr=s=>bdEsc(String(s==null?'':s)).replace(/"/g,'&quot;');
  const multi=d.tasks.length>1;
  let h='<div class="ib-src"><span class="ib-src-l">'+tr('ib_from_email')+'</span><div class="ib-src-subj">'+bdEsc(m.subject||'')+'</div><div class="ib-src-from">'+bdEsc(m.from||'')+'</div></div>'
    +'<div class="ib-ai-badge"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="3"/></svg>'+(multi?tr('ib_ai_done_n').replace('%n',d.tasks.length):tr('ib_ai_done'))+'</div>';
  if(multi){
    h+='<div class="ibt-grouprow"><button type="button" class="ibt-grouptgl'+(d.group?' on':'')+'" data-ibt-grouptgl><span class="ibt-tgl"><span class="ibt-tgl-dot"></span></span>'+tr('ib_group_toggle')+'</button>'
      +(d.group?'<input class="ibt-groupname nt-prop-in" data-ibt-groupname value="'+attr(d.groupName)+'" placeholder="'+tr('ib_group_name')+'">':'')+'</div>';
  }
  h+='<div class="ibt-list">'+d.tasks.map((t,i)=>'<div class="ibt-card'+(multi?' multi':'')+'">'
      +(multi?'<button type="button" class="ibt-rm" data-ibt-rm="'+i+'" title="'+tr('ib_remove')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>':'')
      +(multi?'':'<label class="nt-block-l">'+tr('ib_task_title')+'</label>')
      +'<input class="ibt-title nt-prop-in" data-ibt-title="'+i+'" value="'+attr(t.title)+'">'
      +(multi?'':'<label class="nt-block-l">'+tr('nt_desc')+'</label><textarea class="ibt-desc nt-prop-in ib-task-desc" data-ibt-desc="'+i+'" rows="3">'+bdEsc(t.desc||'')+'</textarea>')
      +(multi?'':'<label class="nt-block-l">'+tr('nt_deadline')+'</label>')
      +'<div class="nt-datechips ibt-dates">'+ibDateChipsHTML(t.date,i)+'</div>'
      +'</div>').join('')+'</div>';
  h+='<div class="ib-task-actions"><button class="primary-btn" id="ibTaskConfirm">'+(multi?tr('ib_task_confirm_n'):tr('ib_task_confirm'))+'</button><button class="danger-btn" id="ibTaskCancel">'+tr('td_cancel')+'</button></div>';
  return h;
}
function ibTaskRenderPreview(res){
  const body=document.getElementById('ibTaskBody');if(!body||!ibTaskMail)return;
  ibTaskDraft={group:!!res.group,groupName:res.groupName||ibDefaultGroupName(ibTaskMail),tasks:(res.tasks||[]).map(t=>({title:t.title||'',desc:t.desc||'',date:t.date||''}))};
  if(!ibTaskDraft.tasks.length)ibTaskDraft.tasks=[{title:ibHeuristicTitle(ibTaskMail),desc:'',date:''}];
  body.innerHTML=ibTaskBuildHTML();
  setTimeout(()=>{const inp=document.querySelector('#ibTaskBody .ibt-title');if(inp){inp.focus();inp.select();}},80);
}
function ibTaskCommit(){
  if(!ibTaskDraft)return;
  const tasks=ibTaskDraft.tasks.filter(t=>(t.title||'').trim());
  if(!tasks.length)return;
  const mk=(t,gid)=>{const task={id:++TID,title:t.title.trim(),scope:'personal',done:false};if(t.date){const p=t.date.split('-').map(Number);task.date=[p[0],p[1]-1,p[2]];}if((t.desc||'').trim())task.desc=t.desc.trim();task.tag={l:'Email',c:'#8168e6'};if(gid!=null)task.gid=gid;TASKS.push(task);};
  if(ibTaskDraft.group&&tasks.length>1){
    const gid=(typeof GID!=='undefined')?GID++:(GROUPS.reduce((m,g)=>Math.max(m,g.id||0),0)+1);
    GROUPS.push({id:gid,name:(ibTaskDraft.groupName||'').trim()||tr('ib_make_task'),color:'#8168e6',active:true});
    if(typeof saveGroups==='function')saveGroups();
    tasks.forEach(t=>mk(t,gid));
  }else tasks.forEach(t=>mk(t,null));
  saveTasks();try{renderTasks();}catch(_){}try{renderSideTasks();}catch(_){}try{renderHomeAlerts();}catch(_){}try{buildCalendar();}catch(_){}
  try{showToast(tasks.length>1?tr('ib_tasks_added').replace('%n',tasks.length):tr('ib_task_added'));}catch(_){}
}
function ibTaskOpen(m){
  if(!canEmailToTask()){openUpgrade('inbox');return;}
  ibTaskMail=m;const ov=document.getElementById('ibTaskOverlay'),body=document.getElementById('ibTaskBody');if(!ov||!body)return;
  body.innerHTML='<div class="ib-src"><span class="ib-src-l">'+tr('ib_from_email')+'</span><div class="ib-src-subj">'+bdEsc(m.subject||'')+'</div><div class="ib-src-from">'+bdEsc(m.from||'')+'</div></div>'
    +'<div class="ib-ai-loading"><span class="ib-ai-spin"></span>'+tr('ib_ai_working')+'</div>';
  ov.classList.add('open');
  const started=Date.now();
  ibSimplifyEmail(m).then(res=>{const wait=Math.max(0,650-(Date.now()-started));setTimeout(()=>ibTaskRenderPreview(res),wait);});
}
// ---- Handler pagina Inbox ----
{const ip=document.querySelector('[data-page="inbox"]');if(ip)ip.addEventListener('click',e=>{
  if(e.target.closest('#ibActB')){ibComposeOpen();return;}
  if(e.target.closest('#ibCrumbMail')){e.stopPropagation();ibCrumbToggle();return;}
  if(e.target.closest('[data-ibmanage]')){ibCrumbToggle(false);if(typeof openSettings==='function')openSettings('caselle',tr('nav_inbox'));return;}
  {const ac=e.target.closest('[data-ibacct]');if(ac){ibCrumbToggle(false);/* cambio casella: per ora chiude il menu */return;}}
  const prov=e.target.closest('[data-ibprov]');if(prov){ibConnectProvider(prov.dataset.ibprov);return;}
  if(e.target.closest('#ibLoadMore')){if(typeof gmailFetchMore==='function')gmailFetchMore();return;}
  {const g=e.target.closest('[data-ibgroup]');if(g){const k=g.dataset.ibgroup;ibCollapse[k]=!ibCollapse[k];renderInboxPage();return;}}
  // --- lettore: rispondi / inoltra / crea task / espandi messaggio nel thread ---
  if(e.target.closest('[data-ibreplyone]')||e.target.closest('[data-ibreplyall]')){const m0=ibMails().find(x=>x.id===ibSel);if(m0){const lm=(m0.thread&&m0.thread.length)?m0.thread[m0.thread.length-1]:m0;const subj=/^re:/i.test(m0.subject||'')?m0.subject:'Re: '+(m0.subject||'');ibComposeOpen({to:lm.fromEmail||'',subject:subj});}return;}
  if(e.target.closest('[data-ibforward]')){const m0=ibMails().find(x=>x.id===ibSel);if(m0){const lm=(m0.thread&&m0.thread.length)?m0.thread[m0.thread.length-1]:m0;ibComposeOpen({subject:'Fwd: '+(m0.subject||''),body:'\n\n---------- '+(lm.from||'')+' · '+(lm.date||'')+' ----------\n'+(lm.body||'')});}return;}
  {const mk0=e.target.closest('[data-ibtask]');if(mk0){const m0=ibMails().find(x=>x.id===mk0.dataset.ibtask);if(m0&&typeof ibTaskOpen==='function')ibTaskOpen(m0);return;}}
  {const hh=e.target.closest('.ib-rd-mhead');if(hh){const mw=hh.closest('[data-ibmsg]');if(mw){const i=+mw.dataset.ibmsg;if(ibThreadOpen.has(i))ibThreadOpen.delete(i);else ibThreadOpen.add(i);ibRenderReader();return;}}}
  const mail=e.target.closest('[data-ibmail]');if(mail){ibSel=mail.dataset.ibmail;renderInboxPage();return;}
  if(e.target.closest('#ibManage')){if(typeof openSettings==='function')openSettings('caselle',tr('nav_inbox'));return;}
  if(e.target.closest('[data-ibreply]')){try{showToast(tr('coming_soon'));}catch(_){}return;}
  const mk=e.target.closest('[data-ibtask]');if(mk){const m=ibMails().find(x=>x.id===mk.dataset.ibtask);if(m)ibTaskOpen(m);return;}
});}
// Chiude il menu caselle cliccando fuori
document.addEventListener('click',e=>{if(!e.target.closest('#ibCrumb'))ibCrumbToggle(false);});
// ---- Compositore nuova email (funzioni base) ----
function ibComposeOpen(pref){const ov=document.getElementById('ibComposeOverlay');if(!ov)return;
  const to=document.getElementById('ibCmpTo'),su=document.getElementById('ibCmpSubj'),bo=document.getElementById('ibCmpBody');
  if(to)to.value=(pref&&pref.to)||'';if(su)su.value=(pref&&pref.subject)||'';if(bo)bo.value=(pref&&pref.body)||'';
  ov.classList.add('open');setTimeout(()=>{if(to)to.focus();},60);}
function ibComposeClose(){const ov=document.getElementById('ibComposeOverlay');if(ov)ov.classList.remove('open');}
function ibComposeSend(){const t=document.getElementById('ibCmpTo');const to=(t&&t.value||'').trim();
  if(!to){try{showToast(tr('ib_cmp_needto'));}catch(_){}if(t)t.focus();return;}
  // Invio reale: richiede lo scope di invio dell'account (Gmail/Outlook) — da collegare.
  ibComposeClose();try{showToast(tr('ib_cmp_soon'));}catch(_){}}
{const ov=document.getElementById('ibComposeOverlay');
 if(ov){ov.addEventListener('click',e=>{
   if(e.target===ov){ibComposeClose();return;}
   if(e.target.closest('#ibCmpClose')||e.target.closest('#ibCmpDiscard')){ibComposeClose();return;}
   if(e.target.closest('#ibCmpSend')){ibComposeSend();return;}
 });
 ov.addEventListener('keydown',e=>{if(e.key==='Escape')ibComposeClose();});}}
// Toolbar: ricerca a comparsa, filtri, aggiorna
{const wrap=document.getElementById('ibSearchWrap'),tog=document.getElementById('ibSearchToggle'),inp=document.getElementById('ibSearch');
 if(wrap&&tog&&inp){
   tog.addEventListener('click',e=>{e.stopPropagation();const open=!wrap.classList.contains('open');
     if(open){wrap.classList.add('open');setTimeout(()=>inp.focus(),120);}
     else{wrap.classList.remove('open');if(inp.value){inp.value='';ibQuery='';renderInboxPage();}}});
   inp.addEventListener('input',()=>{ibQuery=inp.value;renderInboxPage();});
   inp.addEventListener('keydown',e=>{if(e.key==='Escape'){inp.value='';ibQuery='';wrap.classList.remove('open');renderInboxPage();}});
   inp.addEventListener('blur',()=>{if(!inp.value.trim())wrap.classList.remove('open');});
 }}
{const f=document.querySelector('#ibToolbar .ib-filters');if(f)f.addEventListener('click',e=>{const b=e.target.closest('[data-ibfilter]');if(!b)return;ibFilter=b.dataset.ibfilter;document.querySelectorAll('#ibToolbar .ib-fbtn').forEach(x=>x.classList.toggle('active',x===b));renderInboxPage();});}
{const r=document.getElementById('ibRefresh');if(r)r.addEventListener('click',()=>{r.classList.remove('spin');void r.offsetWidth;r.classList.add('spin');if(typeof gmailConnected==='function'&&gmailConnected()&&typeof gmailFetch==='function')gmailFetch();if(typeof outlookOn==='function'&&outlookOn()&&typeof outlookFetch==='function')outlookFetch();renderInboxPage();try{if(typeof showToast==='function')showToast(tr('ib_refreshed'));}catch(_){}});}
// Overlay gestisci caselle
{const ov=document.getElementById('ibManageOverlay');if(ov)ov.addEventListener('click',e=>{
  if(e.target===ov||e.target.closest('#ibManageX')){ov.classList.remove('open');return;}
  const prov=e.target.closest('[data-ibprov]');if(prov){ibConnectProvider(prov.dataset.ibprov);ibManageRender();return;}
  const dc=e.target.closest('[data-ibdisc]');if(dc){ibDisconnectProvider(dc.dataset.ibdisc);return;}
});}
// Overlay crea task dall'email
{const ov=document.getElementById('ibTaskOverlay');if(ov){
  ov.addEventListener('input',e=>{
    if(!ibTaskDraft)return;
    const tt=e.target.closest('[data-ibt-title]');if(tt){const i=+tt.dataset.ibtTitle;if(ibTaskDraft.tasks[i])ibTaskDraft.tasks[i].title=tt.value;return;}
    const td=e.target.closest('[data-ibt-desc]');if(td){const i=+td.dataset.ibtDesc;if(ibTaskDraft.tasks[i])ibTaskDraft.tasks[i].desc=td.value;return;}
    const gn=e.target.closest('[data-ibt-groupname]');if(gn){ibTaskDraft.groupName=gn.value;return;}
  });
  ov.addEventListener('click',e=>{
    if(e.target===ov||e.target.closest('#ibTaskX')||e.target.closest('#ibTaskCancel')){ov.classList.remove('open');return;}
    const dc=e.target.closest('[data-ibt-date]');if(dc){const i=+dc.dataset.ibtDate;if(ibTaskDraft&&ibTaskDraft.tasks[i])ibTaskDraft.tasks[i].date=dc.dataset.ibdate||'';const row=dc.parentElement;if(row)row.querySelectorAll('.nt-dchip').forEach(x=>x.classList.toggle('active',x===dc));return;}
    const rm=e.target.closest('[data-ibt-rm]');if(rm){const i=+rm.dataset.ibtRm;if(ibTaskDraft){ibTaskDraft.tasks.splice(i,1);if(ibTaskDraft.tasks.length<=1)ibTaskDraft.group=false;const b=document.getElementById('ibTaskBody');if(b)b.innerHTML=ibTaskBuildHTML();}return;}
    if(e.target.closest('[data-ibt-grouptgl]')){if(ibTaskDraft){ibTaskDraft.group=!ibTaskDraft.group;const b=document.getElementById('ibTaskBody');if(b)b.innerHTML=ibTaskBuildHTML();}return;}
    if(e.target.closest('#ibTaskConfirm')){ibTaskCommit();ov.classList.remove('open');return;}
  });
}}
// ===== Pagina Plugin: catalogo app (2 livelli: ce l'ho → collego) =====
const PL_DATA={
 'Comunicazione':[['Slack','#611f69','slack.com','Messaggi e canali del team'],['Microsoft Teams','#4b53bc','teams.microsoft.com','Chat e riunioni aziendali'],['Discord','#5865f2','discord.com','Community e chat vocali'],['Zoom','#2d8cff','zoom.us','Videochiamate e webinar'],['Google Meet','#00897b','meet.google.com','Videochiamate al volo'],['Telegram','#26a5e4','telegram.org','Messaggi e canali'],['WhatsApp','#25d366','whatsapp.com','Messaggi e chiamate'],['Gmail','#ea4335','gmail.com','Email di Google'],['Outlook','#0078d4','outlook.com','Email di Microsoft'],['Skype','#00aff0','skype.com','Chiamate e messaggi']],
 'Note e Doc':[['Notion','#111111','notion.so','Note, wiki e database'],['Obsidian','#7c3aed','obsidian.md','Note collegate in locale'],['Evernote','#00a82d','evernote.com','Appunti e ritagli web'],['Google Docs','#4285f4','docs.google.com','Documenti condivisi'],['Word','#2b579a','office.com','Documenti di testo'],['Coda','#f46a54','coda.io','Doc con database'],['Craft','#ea3d5c','craft.do','Documenti eleganti'],['Bear','#d34a47','bear.app','Note in markdown'],['OneNote','#7719aa','onenote.com','Blocco note digitale'],['Confluence','#1868db','atlassian.com','Wiki e documentazione team']],
 'Project Mgmt':[['Trello','#0079bf','trello.com','Bacheche kanban'],['Asana','#f06a6a','asana.com','Gestione progetti e task'],['Jira','#2684ff','atlassian.com','Ticket e sprint agili'],['Monday','#ff3d57','monday.com','Work OS visuale'],['ClickUp','#7b68ee','clickup.com','Task, doc e obiettivi'],['Linear','#5e6ad2','linear.app','Issue tracking per team'],['Basecamp','#1d2d35','basecamp.com','Progetti e comunicazione'],['Todoist','#e44332','todoist.com','Liste di cose da fare'],['Things','#1a7bff','culturedcode.com','To-do per Apple'],['Height','#6a5cff','height.app','Project management con AI']],
 'Calendario':[['Google Calendar','#4285f4','calendar.google.com','Agenda di Google'],['Outlook Calendar','#0f6cbd','outlook.com','Agenda di Microsoft'],['Calendly','#006bff','calendly.com','Prenotazione appuntamenti'],['Fantastical','#f5333f','flexibits.com','Calendario avanzato Apple'],['Notion Calendar','#111111','cron.com','Il calendario di Notion'],['Cal.com','#292929','cal.com','Scheduling open source'],['Reclaim','#4f46e5','reclaim.ai','Agenda automatica con AI'],['Clockify','#03a9f4','clockify.me','Tracciamento del tempo'],['Toggl','#e57cd8','toggl.com','Time tracking semplice'],['RescueTime','#d9463f','rescuetime.com','Analisi della produttività']],
 'Design':[['Figma','#f24e1e','figma.com','Design UI collaborativo'],['Photoshop','#31a8ff','adobe.com','Fotoritocco Adobe'],['Illustrator','#ff9a00','adobe.com','Grafica vettoriale'],['Canva','#00c4cc','canva.com','Grafiche facili per tutti'],['Sketch','#fdb300','sketch.com','Design UI per Mac'],['Framer','#0055ff','framer.com','Siti e prototipi'],['Adobe XD','#ff61f6','adobe.com','Prototipazione UI'],['Affinity','#1b72be','affinity.serif.com','Suite creativa'],['Miro','#f2cf00','miro.com','Lavagna collaborativa'],['InVision','#ff3366','invisionapp.com','Prototipi e feedback']],
 'Sviluppo':[['GitHub','#24292e','github.com','Repository e codice'],['GitLab','#fc6d26','gitlab.com','DevOps e CI/CD'],['VS Code','#007acc','code.visualstudio.com','Editor di codice'],['Bitbucket','#0052cc','bitbucket.org','Repository Atlassian'],['Vercel','#111111','vercel.com','Deploy frontend'],['Netlify','#00c7b7','netlify.com','Hosting e deploy web'],['Docker','#2496ed','docker.com','Container per app'],['Postman','#ff6c37','postman.com','Test delle API'],['Sentry','#362d59','sentry.io','Monitoraggio errori'],['CodePen','#111111','codepen.io','Snippet front-end']],
 'Marketing':[['HubSpot','#ff7a59','hubspot.com','CRM e marketing'],['Mailchimp','#ffcf00','mailchimp.com','Email marketing'],['Meta Business','#0668e1','business.facebook.com','Ads Facebook e Instagram'],['LinkedIn','#0a66c2','linkedin.com','Rete professionale'],['Buffer','#2a2a2a','buffer.com','Programmazione social'],['Hootsuite','#ff4500','hootsuite.com','Gestione social'],['Later','#5b4eff','later.com','Pianificazione Instagram'],['Brevo','#0b996e','brevo.com','Email e automazioni'],['Klaviyo','#232426','klaviyo.com','Marketing per e-commerce'],['Semrush','#ff642d','semrush.com','SEO e analisi']],
 'Finanza':[['Stripe','#635bff','stripe.com','Pagamenti online'],['PayPal','#003087','paypal.com','Pagamenti e incassi'],['QuickBooks','#2ca01c','quickbooks.intuit.com','Contabilità'],['Xero','#13b5ea','xero.com','Contabilità cloud'],['Wave','#1c9be6','waveapps.com','Fatture e contabilità gratis'],['FreshBooks','#0075dd','freshbooks.com','Fatture per freelance'],['Fatture in Cloud','#00b96b','fattureincloud.it','Fatturazione italiana'],['Revolut','#0666eb','revolut.com','Conto business'],['Wise','#37517e','wise.com','Pagamenti internazionali'],['Pennylane','#4353ff','pennylane.com','Gestione finanziaria']],
 'Storage':[['Google Drive','#1fa463','drive.google.com','File cloud di Google'],['Dropbox','#0061ff','dropbox.com','File sincronizzati'],['OneDrive','#0078d4','onedrive.live.com','Cloud di Microsoft'],['Box','#0061d5','box.com','Cloud per aziende'],['iCloud','#3693f3','icloud.com','Cloud di Apple'],['WeTransfer','#409fff','wetransfer.com','Invio file grandi'],['Mega','#d9272e','mega.io','Cloud cifrato'],['pCloud','#17a5e6','pcloud.com','Storage sicuro'],['Sync','#0d6efd','sync.com','Cloud privato'],['Creative Cloud','#da1f26','adobe.com','File e app Adobe']],
 'AI assistenti':[['ChatGPT','#10a37f','openai.com','Assistente AI di OpenAI'],['Claude','#d97757','claude.ai','Assistente AI di Anthropic'],['Gemini','#1a73e8','gemini.google.com','Assistente AI di Google'],['Perplexity','#20808d','perplexity.ai','Ricerca con AI'],['Grok','#111111','x.ai','Assistente AI di xAI'],['Microsoft Copilot','#0078d4','copilot.microsoft.com','AI di Microsoft'],['Notion AI','#111111','notion.so','AI dentro Notion'],['Manus','#111111','manus.im','Agente AI autonomo'],['DeepSeek','#4d6bfe','deepseek.com','Modelli AI open'],['Mistral','#ff7000','mistral.ai','AI europea, Le Chat'],['Poe','#5d5cde','poe.com','Tanti chatbot in uno'],['NotebookLM','#4285f4','notebooklm.google.com','Ricerca sui tuoi documenti']],
 'AI immagini e video':[['Midjourney','#111111','midjourney.com','Immagini da testo'],['Higgsfield','#111111','higgsfield.ai','Video AI cinematici'],['Runway','#111111','runwayml.com','Video generativi'],['Luma AI','#111111','lumalabs.ai','Video e 3D con AI'],['Sora','#111111','sora.com','Video da testo, OpenAI'],['Kling','#111111','klingai.com','Video AI realistici'],['Pika','#111111','pika.art','Video generativi'],['Ideogram','#111111','ideogram.ai','Immagini con testo'],['Leonardo','#111111','leonardo.ai','Arte e asset AI'],['Krea','#111111','krea.ai','Immagini in tempo reale'],['HeyGen','#6c5ce7','heygen.com','Avatar video AI'],['Synthesia','#ff6c4b','synthesia.io','Video con presentatori AI']],
 'AI audio e creazione':[['ElevenLabs','#111111','elevenlabs.io','Voci sintetiche realistiche'],['Suno','#111111','suno.com','Canzoni con AI'],['Udio','#111111','udio.com','Musica generativa'],['Descript','#24d3a5','descript.com','Editing audio e video con AI'],['Gamma','#8b5cf6','gamma.app','Presentazioni con AI'],['Cursor','#111111','cursor.com','Editor di codice con AI'],['v0','#111111','v0.dev','UI generate da testo'],['Lovable','#ff4785','lovable.dev','App full-stack con AI'],['Bolt','#111111','bolt.new','Web app istantanee'],['Replit','#f26207','replit.com','Coding nel browser con AI'],['Windsurf','#09b6a2','windsurf.com','IDE agentico'],['Fireflies','#6b48ff','fireflies.ai','Note delle riunioni con AI']],
 'Automazione':[['Zapier','#ff4f00','zapier.com','Collega le tue app'],['Make','#6d00cc','make.com','Automazioni visuali'],['n8n','#ea4b71','n8n.io','Automazioni open source'],['IFTTT','#111111','ifttt.com','Se questo, allora quello']]
};
const PL_CATS=Object.keys(PL_DATA);
const PLUGIN_APPS=[];
PL_CATS.forEach(cat=>PL_DATA[cat].forEach(([n,col,dom,d])=>PLUGIN_APPS.push({id:n.toLowerCase().replace(/[^a-z0-9]+/g,'-'),n,cat,col,dom,d})));
// FEATURED = quelli con cui abbiamo (o stiamo costruendo) una connessione reale
const PL_FEATURED=['higgsfield','gmail','google-calendar','google-drive','figma','canva','notion'];
function plFeaturedApps(){return PL_FEATURED.map(id=>PLUGIN_APPS.find(a=>a.id===id)).filter(Boolean);}
let PLUGINS=(()=>{try{return JSON.parse(localStorage.getItem(ukey('workie_plugins')))||{};}catch(e){return {};}})();
function savePlugins(){try{localStorage.setItem(ukey('workie_plugins'),JSON.stringify(PLUGINS));}catch(e){}}
// ===== Connessioni REALI per-utente (ognuno collega il suo account) =====
// A chiave/token = subito; OAuth = richiede un'app sviluppatore registrata dall'owner.
const SVC_CONN={
  'higgsfield':{type:'oauth',n:'Higgsfield',account:true,noteKey:'svc_hf_note'},
  'figma':{type:'key',n:'Figma',fields:[{k:'token',l:'Personal Access Token',pw:true}],helpurl:'https://www.figma.com/developers/api#access-tokens',helptxt:'Settings → Security → Personal access tokens'},
  'canva':{type:'oauth',n:'Canva'},
  'gmail':{type:'oauth',n:'Gmail'},'google-calendar':{type:'oauth',n:'Google Calendar'},'google-drive':{type:'oauth',n:'Google Drive'}
};
let SVC_CREDS=(()=>{try{return JSON.parse(localStorage.getItem(ukey('workie_svc_creds')))||{};}catch(e){return {};}})();
function svcSaveCreds(){try{localStorage.setItem(ukey('workie_svc_creds'),JSON.stringify(SVC_CREDS));}catch(e){}}
function svcIsReal(id){return !!SVC_CONN[id];}
function svcConnected(id){return !!(PLUGINS[id]&&PLUGINS[id].c);}
function svcOpenConnect(id){
  const spec=SVC_CONN[id];if(!spec)return;
  const t=document.getElementById('svcConnTitle'),sub=document.getElementById('svcConnSub'),body=document.getElementById('svcConnBody');
  if(t)t.textContent=tr('svc_connect_t').replace('%s',spec.n);
  const conn=svcConnected(id);
  if(spec.type==='oauth'){
    if(sub)sub.textContent=tr(spec.account?'svc_account_sub':'svc_oauth_sub');
    const note=spec.noteKey?tr(spec.noteKey):tr('svc_oauth_note').replace('%s',spec.n);
    body.innerHTML='<div class="svc-note">'+bdEsc(note)+'</div>'+
      '<button class="ag-save-btn" data-svcoauth="'+id+'" type="button">'+bdEsc(tr('svc_connect_account').replace('%s',spec.n))+'</button>'+
      (conn?'<button class="svc-disc" data-svcdisc="'+id+'" type="button">'+bdEsc(tr('svc_disconnect'))+'</button>':'');
  }else{
    if(sub)sub.textContent=tr('svc_key_sub').replace('%s',spec.n);
    const cur=SVC_CREDS[id]||{};
    body.innerHTML=spec.fields.map(f=>'<div class="ag-field"><label>'+bdEsc(f.l)+'</label><input class="ag-in" id="svcf_'+f.k+'" '+(f.pw?'type="password"':'type="text"')+' autocomplete="off" value="'+bdEsc(cur[f.k]||'')+'"></div>').join('')+
      '<a class="svc-help" href="'+spec.helpurl+'" target="_blank" rel="noopener">'+bdEsc(tr('svc_where')+': '+spec.helptxt)+' ↗</a>'+
      '<div class="svc-sec">'+bdEsc(tr('svc_security'))+'</div>'+
      '<button class="ag-save-btn" data-svcsave="'+id+'" type="button">'+bdEsc(conn?tr('svc_update'):tr('svc_save'))+'</button>'+
      (conn?'<button class="svc-disc" data-svcdisc="'+id+'" type="button">'+bdEsc(tr('svc_disconnect'))+'</button>':'');
  }
  const ov=document.getElementById('svcConnOv');if(ov)ov.classList.add('open');
}
function svcSave(id){
  const spec=SVC_CONN[id];if(!spec||spec.type!=='key')return;
  const creds={};let ok=true;
  spec.fields.forEach(f=>{const el=document.getElementById('svcf_'+f.k);const v=el?(el.value||'').trim():'';creds[f.k]=v;if(!v)ok=false;});
  if(!ok){if(typeof showToast==='function')showToast(tr('svc_fill'));return;}
  SVC_CREDS[id]=creds;svcSaveCreds();
  PLUGINS[id]=Object.assign({},PLUGINS[id],{o:true,c:true,en:true});savePlugins();
  const ov=document.getElementById('svcConnOv');if(ov)ov.classList.remove('open');
  if(typeof renderPlugins==='function')renderPlugins();
  if(typeof showToast==='function')showToast(tr('svc_connected').replace('%s',spec.n));
  if(typeof agView!=='undefined'&&agView==='run'&&agRun){const st=agRun.steps[agRun.cur];if(st&&st.type==='images'){st.messages=[];agRunStartStep(agRun.cur);}}
}
// OAuth account (Higgsfield via Clerk/MCP): apre il login in popup, riceve i token via postMessage
function svcStartOAuth(id){
  if(id!=='higgsfield'){if(typeof showToast==='function')showToast(tr('svc_oauth_todo'));return;}
  let w;try{w=window.open(FN_BASE+'/.netlify/functions/higgsfield-auth?action=start','hf_oauth','width=480,height=740');}catch(_){}
  if(!w){if(typeof showToast==='function')showToast(tr('svc_oauth_popup'));return;}
  function onMsg(e){
    if(e.origin!==location.origin)return;
    const d=e.data;if(!d||d.type!=='higgsfield_oauth')return;
    window.removeEventListener('message',onMsg);
    if(d.ok&&d.access_token){
      SVC_CREDS[id]={access_token:d.access_token,refresh_token:d.refresh_token||'',expires_at:Date.now()+((+d.expires_in||3600)*1000)};svcSaveCreds();
      PLUGINS[id]=Object.assign({},PLUGINS[id],{o:true,c:true,en:true});savePlugins();
      const ov=document.getElementById('svcConnOv');if(ov)ov.classList.remove('open');
      if(typeof renderPlugins==='function')renderPlugins();
      if(typeof showToast==='function')showToast(tr('svc_connected').replace('%s',(SVC_CONN[id]||{}).n||id));
      if(typeof agView!=='undefined'&&agView==='run'&&agRun){const st=agRun.steps[agRun.cur];if(st&&st.type==='images'){st.messages=[];agRunStartStep(agRun.cur);}}
    }else{if(typeof showToast==='function')showToast(tr('svc_oauth_fail')+(d.error?(' · '+d.error):''));}
  }
  window.addEventListener('message',onMsg);
}
function svcDisconnect(id){
  delete SVC_CREDS[id];svcSaveCreds();
  if(PLUGINS[id]){PLUGINS[id].c=false;savePlugins();}
  const ov=document.getElementById('svcConnOv');if(ov)ov.classList.remove('open');
  if(typeof renderPlugins==='function')renderPlugins();
  if(typeof showToast==='function')showToast(tr('pl_disconnected'));
}
{const ov=document.getElementById('svcConnOv');if(ov)ov.addEventListener('click',e=>{
  if(e.target.id==='svcConnOv'||e.target.closest('#svcConnX')){ov.classList.remove('open');return;}
  const sv=e.target.closest('[data-svcsave]');if(sv){svcSave(sv.dataset.svcsave);return;}
  const dc=e.target.closest('[data-svcdisc]');if(dc){svcDisconnect(dc.dataset.svcdisc);return;}
  const so=e.target.closest('[data-svcoauth]');if(so){svcStartOAuth(so.dataset.svcoauth);return;}
});}
let plQ='',plTab='featured';
function plInitials(n){const w=n.split(/\s+/).filter(Boolean);return (w.length>1?(w[0][0]+w[1][0]):n.slice(0,2)).toUpperCase();}
function plTextColor(hex){hex=(hex||'').replace('#','');if(hex.length<6)return '#fff';const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);return ((0.299*r+0.587*g+0.114*b)/255>0.62)?'#1a1a1d':'#fff';}
const PL_CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>';
const PL_PLUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
const PL_GEAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
function plIcon(a){return '<span class="pl-ic"><img src="https://www.google.com/s2/favicons?domain='+encodeURIComponent(a.dom||'')+'&sz=128" alt="" loading="lazy" onerror="this.closest(\'.pl-ic\').classList.add(\'noimg\')"><span class="pl-ini" style="background:'+a.col+';color:'+plTextColor(a.col)+'">'+bdEsc(plInitials(a.n))+'</span></span>';}
function plRow(a){const s=PLUGINS[a.id]||{};const owned=!!s.o,conn=!!s.c;
  let right;
  if(!owned)right='<button class="pl-add" data-plown="'+a.id+'" title="'+tr('pl_have')+'">'+PL_PLUS+'</button>';
  else if(!conn)right='<button class="pl-cfg" data-plconn="'+a.id+'">'+tr('pl_configure')+'</button>';
  else right='<button class="pl-done" data-plconn="'+a.id+'" title="'+tr('pl_connected')+'">'+PL_CHK+'</button>';
  return '<div class="pl-row'+(owned?' owned':'')+'" data-plapp="'+a.id+'">'+plIcon(a)+'<div class="pl-row-tx"><div class="pl-row-n">'+bdEsc(a.n)+'</div><div class="pl-row-d">'+bdEsc(a.d||a.cat)+'</div></div>'+right+'</div>';
}
function renderPlugins(){
  const body=document.getElementById('plBody');if(!body)return;
  const q=plQ.trim().toLowerCase();
  const owned=PLUGIN_APPS.filter(a=>(PLUGINS[a.id]||{}).o);
  let html='';
  if(q){
    const list=PLUGIN_APPS.filter(a=>a.n.toLowerCase().includes(q)||(a.d||'').toLowerCase().includes(q));
    html+= list.length?('<div class="pl-list">'+list.map(plRow).join('')+'</div>'):('<div class="pl-empty">'+tr('pl_none')+'</div>');
    body.innerHTML=html;return;
  }
  // Installati
  html+='<div class="pl-sec-h"><span>'+tr('pl_installed')+'</span><button class="pl-gear" title="'+tr('pl_manage')+'">'+PL_GEAR+'</button></div>';
  html+= owned.length?('<div class="pl-inst">'+owned.map(a=>{const s=PLUGINS[a.id]||{};return '<button class="pl-inst-ic'+(s.c?' conn':'')+(s.en===false?' off':'')+'" data-plstrip="'+a.id+'">'+plIcon(a)+'<span class="pl-inst-lbl">'+bdEsc(a.n)+'</span></button>';}).join('')+'</div>'):('<div class="pl-inst-empty">'+tr('pl_inst_empty')+'</div>');
  // Tabs
  html+='<div class="pl-tabs"><button class="pl-tab'+(plTab==='featured'?' on':'')+'" data-pltab="featured">'+tr('pl_featured')+'</button><button class="pl-tab'+(plTab==='pubblici'?' on':'')+'" data-pltab="pubblici">'+tr('pl_public')+'</button><button class="pl-tab'+(plTab==='personali'?' on':'')+'" data-pltab="personali">'+tr('pl_personal')+'</button></div>';
  if(plTab==='featured'){
    html+='<div class="pl-featnote">'+tr('pl_feat_note')+'</div><div class="pl-list">'+plFeaturedApps().map(plRow).join('')+'</div>';
  }else if(plTab==='personali'){
    html+= owned.length?('<div class="pl-list">'+owned.map(plRow).join('')+'</div>'):('<div class="pl-empty">'+tr('pl_personal_empty')+'</div>');
  }else{
    PL_CATS.forEach(cat=>{const apps=PLUGIN_APPS.filter(a=>a.cat===cat);html+='<div class="pl-cat-h">'+bdEsc(cat)+'</div><div class="pl-list">'+apps.map(plRow).join('')+'</div>';});
  }
  body.innerHTML=html;
}
{const pg=document.querySelector('[data-page="plugin"]');if(pg){pg.addEventListener('click',e=>{
  const tb=e.target.closest('[data-pltab]');if(tb){plTab=tb.dataset.pltab;renderPlugins();return;}
  const strip=e.target.closest('[data-plstrip]');if(strip){const id=strip.dataset.plstrip;const s=PLUGINS[id]||{};s.o=false;s.c=false;PLUGINS[id]=s;savePlugins();renderPlugins();return;}
  if(e.target.closest('.pl-gear')){plmOpen();return;}
  const ow=e.target.closest('[data-plown]');if(ow){const id=ow.dataset.plown;if(svcIsReal(id)){svcOpenConnect(id);return;}const s=PLUGINS[id]||{};s.o=true;if(s.en===undefined)s.en=true;PLUGINS[id]=s;savePlugins();renderPlugins();return;}
  const cn=e.target.closest('[data-plconn]');if(cn){const id=cn.dataset.plconn;if(svcIsReal(id)){svcOpenConnect(id);return;}const s=PLUGINS[id]||{};if(!s.o){return;}s.c=!s.c;PLUGINS[id]=s;savePlugins();renderPlugins();try{showToast(s.c?tr('pl_conn_soon'):tr('pl_disconnected'));}catch(_){}return;}
 });
 const ps=document.getElementById('plSearch');if(ps)ps.addEventListener('input',()=>{plQ=ps.value;const cl=document.getElementById('plClear');if(cl)cl.style.display=ps.value?'grid':'none';renderPlugins();});
 const clr=document.getElementById('plClear');if(clr)clr.addEventListener('click',()=>{const ps2=document.getElementById('plSearch');if(ps2){ps2.value='';plQ='';clr.style.display='none';renderPlugins();ps2.focus();}});}}
// ===== Modale gestione plugin (rotella) =====
let plmTab='plugin',plmQ='';
function plmRender(){
  const list=document.getElementById('plmList');if(!list)return;
  const owned=PLUGIN_APPS.filter(a=>(PLUGINS[a.id]||{}).o);
  const cnt=document.getElementById('plmCount');if(cnt)cnt.textContent=owned.length;
  if(plmTab!=='plugin'){list.innerHTML='<div class="plm-empty">'+tr('coming_soon')+'</div>';return;}
  const q=plmQ.trim().toLowerCase();
  const rows=owned.filter(a=>!q||a.n.toLowerCase().includes(q)||(a.d||'').toLowerCase().includes(q));
  if(!rows.length){list.innerHTML='<div class="plm-empty">'+(owned.length?tr('pl_none'):tr('pl_inst_empty'))+'</div>';return;}
  list.innerHTML=rows.map(a=>{const s=PLUGINS[a.id]||{};const on=s.en!==false;
    return '<div class="plm-row" data-plapp="'+a.id+'">'+plIcon(a)+'<div class="plm-row-tx"><div class="plm-row-n">'+bdEsc(a.n)+'<span class="plm-row-tag">'+bdEsc(a.cat)+'</span></div><div class="plm-row-d">'+bdEsc(a.d||'')+'</div></div><button class="plm-tg'+(on?' on':'')+'" data-plmtg="'+a.id+'" title="'+(on?tr('pl_disable'):tr('pl_enable'))+'"></button></div>';
  }).join('');
}
function plmOpen(){plmTab='plugin';plmQ='';const s=document.getElementById('plmSearch');if(s)s.value='';plmRender();const m=document.getElementById('plmModal');if(m)m.classList.add('open');}
function plmClose(){const m=document.getElementById('plmModal');if(m)m.classList.remove('open');}
{const m=document.getElementById('plmModal');if(m){
  m.addEventListener('click',e=>{
    if(e.target===m){plmClose();return;}
    if(e.target.closest('#plmClose')){plmClose();return;}
    if(e.target.closest('#plmBrowse')||e.target.closest('#plmAdd')){plmClose();try{go('plugin');}catch(_){}return;}
    const tb=e.target.closest('[data-plmtab]');if(tb){plmTab=tb.dataset.plmtab;document.querySelectorAll('#plmModal .plm-tab').forEach(x=>x.classList.toggle('on',x.dataset.plmtab===plmTab));plmRender();return;}
    const tg=e.target.closest('[data-plmtg]');if(tg){const id=tg.dataset.plmtg;const st=PLUGINS[id]||{};st.en=(st.en===false);PLUGINS[id]=st;savePlugins();tg.classList.toggle('on',st.en!==false);}
  });
  const ms=document.getElementById('plmSearch');if(ms)ms.addEventListener('input',()=>{plmQ=ms.value;plmRender();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))plmClose();});
}}
{const tb=document.getElementById('sideTopbar');if(tb)tb.addEventListener('click',e=>{
  const vb=e.target.closest('[data-sview]');if(vb){setSideView(vb.dataset.sview);return;}
  const ab=e.target.closest('[data-saction]');if(!ab)return;const a=ab.dataset.saction;
  if(a==='inbox'){if(typeof go==='function')go('workflow');}
  else if(a==='search'){const sb2=document.getElementById('sideSearchBar');if(sb2){sb2.classList.toggle('open');if(sb2.classList.contains('open')){const inp=document.getElementById('sideSearchInput');if(inp)setTimeout(()=>inp.focus(),30);}}}
  else if(a==='help'){if(typeof showToast==='function')showToast(tr('coming_soon'));}
});}
// Icona ricerca nell'header v1 → barra che si apre dall'icona coprendo il logo
{const ssb=document.getElementById('sideSearchBtn'),head=document.getElementById('sideHead');
 function shSearchOpen(o){if(!head)return;head.classList.toggle('searching',o);if(o){const inp=document.getElementById('shSearchInput');if(inp)setTimeout(()=>inp.focus(),120);}else{const inp=document.getElementById('shSearchInput');if(inp)inp.value='';}}
 if(ssb)ssb.addEventListener('click',()=>shSearchOpen(!head.classList.contains('searching')));
 const cx=document.getElementById('shSearchClose');if(cx)cx.addEventListener('click',()=>shSearchOpen(false));
 const inp=document.getElementById('shSearchInput');if(inp)inp.addEventListener('keydown',e=>{if(e.key==='Escape')shSearchOpen(false);});}
// Menu utente (stile Claude) + icona bug + Sidebar v2
{
  const pill=document.getElementById('userPill'),menu=document.getElementById('userMenu'),bug=document.getElementById('userBug'),bar=document.querySelector('.user-bar');
  const sh2User=document.getElementById('sh2User'),app=document.querySelector('.app');
  function umFillLangs(){const el=document.getElementById('umFlyout');if(!el||typeof LANGS==='undefined')return;el.innerHTML=Object.keys(LANGS).map(l=>'<button class="um-lang'+(LANG===l?' on':'')+'" data-umlang="'+l+'"><span>'+LANGS[l].name+'</span><svg class="um-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 10 17 19 8"/></svg></button>').join('');}
  function umOpen(o){if(!menu)return;if(o){const em=document.getElementById('userMenuEmail');if(em)em.textContent=(typeof USER!=='undefined'&&USER.email)||'';umFillLangs();}menu.classList.toggle('open',o);if(bar)bar.classList.toggle('menu-open',o);if(app)app.classList.toggle('um-open',o);if(!o){const ul=document.getElementById('umFlyout');if(ul)ul.classList.remove('open');}}
  if(pill)pill.addEventListener('click',e=>{e.stopPropagation();umOpen(!menu.classList.contains('open'));});
  if(sh2User)sh2User.addEventListener('click',e=>{e.stopPropagation();umOpen(!menu.classList.contains('open'));});
  document.addEventListener('click',e=>{if(menu&&menu.classList.contains('open')&&!menu.contains(e.target)&&!(pill&&pill.contains(e.target))&&!(sh2User&&sh2User.contains(e.target)))umOpen(false);});
  if(menu)menu.addEventListener('click',e=>{
    const lg=e.target.closest('[data-umlang]');if(lg){if(typeof setLang==='function')setLang(lg.dataset.umlang);umFillLangs();return;}
    const it=e.target.closest('[data-um]');if(!it)return;const a=it.dataset.um;
    if(a==='lang'){const ul=document.getElementById('umFlyout');if(ul)ul.classList.toggle('open');return;}
    umOpen(false);
    if(a==='settings'){if(typeof openSettings==='function')openSettings('generale');else if(typeof go==='function')go('settings');}
    else if(a==='connections'){if(typeof go==='function')go('connections');}
    else if(a==='usage'){if(typeof openUsage==='function')openUsage();}
    else if(a==='upgrade'){if(typeof openUpgrade==='function')openUpgrade();}
    else if(a==='logout'){if(typeof doLogout==='function')doLogout();}
    else{if(typeof showToast==='function')showToast(tr('coming_soon'));}
  });
  if(bug)bug.addEventListener('click',()=>{if(typeof showToast==='function')showToast(tr('coming_soon'));});

  // ---- Sidebar v2 RIMOSSA: si usa solo la sidebar classica ----
  try{localStorage.removeItem('workie_sidebar_v2');}catch(e){}
  const barBottom=document.querySelector('.user-bar');
  if(app)app.classList.remove('sb-v2');
  if(menu&&barBottom&&menu.parentElement!==barBottom)barBottom.appendChild(menu);

  // header v2: cerca + comprimi menu
  {const s2=document.getElementById('sh2Search');if(s2)s2.addEventListener('click',()=>{const b=document.getElementById('sideSearchBar');if(b){b.classList.toggle('open');if(b.classList.contains('open')){const inp=document.getElementById('sideSearchInput');if(inp)setTimeout(()=>inp.focus(),30);}}});}
  {const c2=document.getElementById('sh2Collapse');if(c2)c2.addEventListener('click',()=>{if(typeof toggleNav==='function')toggleNav();});}

  // box "Nuova task" + "+" (crea altro)
  {const nt=document.getElementById('sb2NewTask');if(nt)nt.addEventListener('click',()=>{if(typeof openNewTask==='function')openNewTask();});}
  {const plus=document.getElementById('sb2Plus'),m2=document.getElementById('sb2Menu');
   if(plus&&m2){
     const sb2Sync=()=>plus.classList.toggle('open',m2.classList.contains('open'));
     plus.addEventListener('click',e=>{e.stopPropagation();m2.classList.toggle('open');sb2Sync();});
     document.addEventListener('click',e=>{if(m2.classList.contains('open')&&!m2.contains(e.target)&&!plus.contains(e.target)){m2.classList.remove('open');sb2Sync();}});
     m2.addEventListener('click',e=>{const mi=e.target.closest('[data-sb2new]');if(!mi)return;m2.classList.remove('open');sb2Sync();const k=mi.dataset.sb2new;
       if(k==='project'){if(typeof openProjTpl==='function')openProjTpl();else if(typeof go==='function')go('projects');}
       else if(k==='team'){if(typeof go==='function')go('team');const b=document.getElementById('createTeamBtn');if(b)setTimeout(()=>b.click(),60);}
       else if(k==='group'){if(typeof openGm==='function')openGm();}
     });
   }}
}
{const _ha=document.getElementById('homeAlerts');if(_ha)_ha.addEventListener('click',e=>{
  const nv=e.target.closest('[data-halnav]');if(nv){const[gk,dir]=nv.dataset.halnav.split(':');homeAlertPage[gk]=(homeAlertPage[gk]||0)+(dir==='next'?1:-1);renderHomeAlerts();return;}
  const r=e.target.closest('[data-htask]');if(r&&typeof openTaskPage==='function')openTaskPage(+r.dataset.htask);});}
// ===== Plan my day (funzione AI Overview, anteprima) =====
function pmdDaysOverdue(t){const d=taskDue(t);if(!d)return 0;const today=realToday();return Math.round((Date.UTC(today[0],today[1],today[2])-Date.UTC(d[0],d[1],d[2]))/86400000);}
function pmdDayLabel(n){return n+' '+(n===1?tr('pmd_day'):tr('pmd_days'));}
function pmdIsQuick(t){return /mail|email|preventiv|chiam|rispond|invi|breve/i.test(taskTitle(t)+' '+(t.desc||''));}
function pmdIsMeeting(t){return /riunion|meeting|call|incontr/i.test(taskTitle(t)+' '+(t.desc||''));}
function planMyDay(){
  const active=TASKS.filter(t=>!t.done);
  const overdue=active.filter(taskPast).sort(taskByDue);
  const todayL=active.filter(t=>!taskPast(t)&&taskTodayCat(t)).sort(taskByDue);
  if(!overdue.length&&!todayL.length)return tr('pmd_empty');
  const nm=(typeof firstName==='function'&&USER&&USER.name)?firstName(USER.name):'';
  let out=tr('pmd_intro').replace('%n',nm?(', '+nm):'');
  if(todayL.length){let n=1;out+='\n\n'+todayL.map(t=>{const q=pmdIsQuick(t);return (n++)+'. «'+taskTitle(t)+'»'+(t.time?' — '+tr('pmd_at')+' '+t.time:'')+(q?' ('+tr('pmd_quick')+')':'')+'.';}).join('\n');}
  if(overdue.length){out+='\n\n'+overdue.map(t=>{const dl=pmdDayLabel(pmdDaysOverdue(t));return '⚠️ «'+taskTitle(t)+'» '+(pmdIsMeeting(t)?tr('pmd_meeting'):tr('pmd_overdue')).replace('%d',dl);}).join('\n\n');}
  out+='\n\n'+tr('pmd_preview');return out;
}
// Piano della giornata: ordine salvato + box in Overview
let PLAN_DAY=(()=>{try{return JSON.parse(localStorage.getItem(ukey('workie_plan_day')))||null;}catch(e){return null;}})();
function savePlanDay(){try{localStorage.setItem(ukey('workie_plan_day'),PLAN_DAY?JSON.stringify(PLAN_DAY):'');}catch(e){}try{if(document.querySelector('.app.day-drawer-open')&&typeof renderDaySide==='function')renderDaySide();}catch(e){}}
function planDayValid(){return !!(PLAN_DAY&&PLAN_DAY.date&&cmpDate(PLAN_DAY.date,realToday())===0&&PLAN_DAY.order&&PLAN_DAY.order.length);}
// ---- Pianifica la giornata: picker + caricamento + roadmap ----
const PDAY_SPARK='<svg class="ic-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.6V12l3 1.8"/></svg>';
const PDAY_GRIP='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="9" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg>';
const PLAN_FILTERS=[{k:'overdue',lk:'g_overdue'},{k:'today',lk:'g_today'},{k:'upcoming',lk:'g_upcoming'}];
let planFilter='today',planOrder=[],planSel=new Set(),pdayView='pick',planSched=[];
function planCandidates(k){const a=TASKS.filter(t=>!t.done);
  if(k==='overdue')return a.filter(taskPast);
  if(k==='today')return a.filter(t=>!taskPast(t)&&taskTodayCat(t));
  if(k==='upcoming')return a.filter(t=>!taskPast(t)&&!taskTodayCat(t));
  return a;}
function planSyncOrder(){const ids=planCandidates(planFilter).sort(taskByDue).map(t=>t.id);
  planOrder=planOrder.filter(id=>ids.includes(id));ids.forEach(id=>{if(!planOrder.includes(id))planOrder.push(id);});}
function estDur(t){const s=(taskTitle(t)+' '+(t.desc||'')).toLowerCase();
  if(/riunion|meeting|call|incontr/.test(s))return 45;
  if(/mail|email|preventiv|chiam|rispond|invi|breve/.test(s))return 15;return 30;}
function planExpl(t){const s=(taskTitle(t)+' '+(t.desc||'')).toLowerCase();
  if(/riunion|meeting|call|incontr/.test(s))return tr('expl_meeting');
  if(/mail|email|preventiv|chiam|rispond|invi|breve/.test(s))return tr('expl_quick');
  if(taskPast(t))return tr('expl_overdue');return tr('expl_default');}
function fmtHM(h,m){return ('0'+h).slice(-2)+':'+('0'+m).slice(-2);}
function computeSchedule(ids,durMap){const now=new Date();let cur=Math.ceil((now.getHours()*60+now.getMinutes())/5)*5;
  try{const ws=(aiProfileGet().workStart||'');if(/^\d{1,2}:\d{2}$/.test(ws)){const pp=ws.split(':').map(Number);const wsMin=pp[0]*60+pp[1];if(wsMin>cur)cur=wsMin;}}catch(_){}
  return ids.map(id=>{const t=TASKS.find(x=>x.id==id);if(!t)return null;let dur=(durMap&&durMap[id])||estDur(t);dur=Math.max(5,Math.min(240,Math.round(dur/5)*5));const start=[Math.floor(cur/60)%24,cur%60];cur+=dur+5;return {id,start,dur,expl:planExpl(t)};}).filter(Boolean);}
function planSelection(){const order=planOrder.filter(id=>planSel.has(id));[...planSel].forEach(id=>{if(!order.includes(id)&&TASKS.find(t=>t.id==id&&!t.done))order.push(id);});return order;}
function openPlanday(){
  planFilter='today';planOrder=[];planSyncOrder();planSel=new Set();
  const existing=planDayValid()?PLAN_DAY.order.filter(id=>TASKS.find(t=>t.id==id&&!t.done)):[];
  existing.forEach(id=>{if(!planOrder.includes(id))planOrder.push(id);});
  planOrder.forEach(id=>planSel.add(id));
  pdayView='pick';planSched=[];renderPlanday();
}
function renderPlanday(){const b=document.getElementById('pdayBody');if(!b)return;
  if(pdayView==='loading')return renderPdayLoading(b);
  if(pdayView==='roadmap')return renderPdayRoadmap(b);
  renderPdayPick(b);}
function renderPdayPick(b){
  const months=MONTHS[LANG]||MONTHS.it;
  const items=planOrder.map(id=>TASKS.find(t=>t.id==id)).filter(Boolean);
  const rows=items.length?items.map(t=>{const sel=planSel.has(t.id);let meta='';const d=taskDue(t);
    if(d)meta='<span class="pday-rmeta">'+(t.month?months[d[1]]:d[2]+' '+(months[d[1]]||'').slice(0,3))+(t.time?' · '+t.time:'')+'</span>';else if(t.time)meta='<span class="pday-rmeta">'+t.time+'</span>';
    return '<div class="pday-row'+(sel?' sel':'')+'" draggable="true" data-prow="'+t.id+'"><span class="pday-grip">'+PDAY_GRIP+'</span><button class="pday-chk'+(sel?' on':'')+'">'+SVG.check+'</button><span class="pday-rtitle">'+bdEsc(taskTitle(t))+'</span>'+meta+'</div>';}).join(''):'<div class="pday-empty">'+tr('pday_empty')+'</div>';
  const chips=PLAN_FILTERS.map(f=>'<button class="pday-chip'+(planFilter===f.k?' on':'')+'" data-pfilter="'+f.k+'">'+tr(f.lk)+'</button>').join('');
  const has=planDayValid();
  const allSel=planOrder.length>0&&planOrder.every(id=>planSel.has(id));
  const addAllBtn='<button class="pday-addall'+(allSel?' off':'')+'" data-pdaddall>'+(allSel
    ?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>'+tr('pday_removeall')
    :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'+tr('pday_addall'))+'</button>';
  const banner=has?'<div class="pday-banner"><span class="pdb-dot"></span><span>'+tr('pday_started').replace('%s',(PLAN_DAY.at||''))+'</span><button class="pday-reset" data-pdreset>'+tr('pday_reset')+'</button></div>':'';
  b.innerHTML='<h1 class="pday-title">'+tr('pday_title')+'</h1><p class="pday-desc">'+tr('pday_desc')+'</p>'+banner
    +'<div class="pday-box"><div class="pday-box-h"><div class="pday-pick">'+tr('pday_pick')+'</div>'+addAllBtn+'</div><div class="pday-filters">'+chips+'</div><div class="pday-list" id="pdayList">'+rows+'</div></div>'
    +'<button class="pday-cta" data-pdcreate><span>'+(has?tr('pday_update'):tr('pday_cta'))+'</span></button>';
}
function renderPdayLoading(b){
  const names=planSched.map(p=>{const t=TASKS.find(x=>x.id==p.id);return t?taskTitle(t):'';}).filter(Boolean);
  b.innerHTML='<div class="pday-loading"><div class="pl-orb">'+PDAY_SPARK+'</div><div class="pl-title">'+tr('pday_loading')+'</div><div class="pl-tasks">'+names.map((n,i)=>'<span class="pl-task" style="animation-delay:'+(i*0.26+0.2).toFixed(2)+'s">'+bdEsc(n)+'</span>').join('')+'</div></div>';
}
function renderPdayRoadmap(b){
  const rows=planSched.map(p=>{const t=TASKS.find(x=>x.id==p.id);if(!t)return '';
    return '<div class="rm-item" draggable="true" data-rm="'+p.id+'"><div class="rm-left"><div class="rm-time">'+fmtHM(p.start[0],p.start[1])+'</div><span class="rm-dot"></span></div><div class="rm-card"><span class="rm-grip">'+PDAY_GRIP+'</span><div class="rm-body"><div class="rm-ttitle">'+bdEsc(taskTitle(t))+'</div><div class="rm-expl">'+bdEsc(p.expl)+'</div></div><span class="rm-dur">'+p.dur+"'"+'</span></div></div>';}).join('');
  b.innerHTML='<div class="rm-head"><button class="rm-back" data-pdback>'+SVG.back+'<span>'+tr('pday_back_pick')+'</span></button></div>'
    +'<h1 class="pday-title">'+tr('pday_rm_title')+'</h1><p class="pday-desc">'+tr('pday_rm_sub')+'</p>'
    +'<div class="rm-list" id="rmList">'+rows+'</div>'
    +'<button class="pday-cta" data-pdconfirm>'+SVG.check+'<span>'+tr('pday_confirm')+'</span></button>';
}
function pdayNorm(s){return String(s||'').toLowerCase().replace(/\s+/g,' ').trim();}
async function pdayDoCreate(){
  const order=planSelection();if(!order.length){if(typeof showToast==='function')showToast(tr('pday_pick_none'));return;}
  planSched=computeSchedule(order);pdayView='loading';renderPlanday();
  const started=Date.now();
  // AI vera per Pro/Tester con budget; altrimenti resta l'euristica locale
  if(typeof canUseAI==='function'&&canUseAI()&&typeof aiLeft==='function'&&aiLeft()>0){
    try{
      const now=new Date();const months=MONTHS[LANG]||MONTHS.it;
      const lines=order.map(id=>{const t=TASKS.find(x=>x.id==id);if(!t)return '';const d=taskDue(t);const dl=d?(' · scad '+d[2]+' '+((months[d[1]]||'').slice(0,3))):'';const tm=t.time?(' · ore '+t.time):'';const ds=t.desc?(' — '+t.desc.replace(/\s+/g,' ').slice(0,90)):'';return '- '+taskTitle(t)+dl+tm+ds;}).filter(Boolean).join('\n');
      const msg='Ora corrente: '+fmtHM(now.getHours(),now.getMinutes())+'. Organizza QUESTE task per oggi in un ordine sensato (urgenze e scadenze prima, lavori di concentrazione nelle ore migliori, cose veloci per sbloccarsi). Per ognuna dai "title" IDENTICO a come lo trovi qui, "minutes" (durata stimata) e "reason" breve (max 12 parole).\nTask:\n'+lines;
      const reply=await aiChat({mode:'plan',messages:[{role:'user',text:msg}],context:aiProfileContext()+aiMemContext()});
      let raw=(reply||'').trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();const a=raw.indexOf('{'),b=raw.lastIndexOf('}');if(a>=0&&b>a)raw=raw.slice(a,b+1);
      const j=JSON.parse(raw);const plan=Array.isArray(j.plan)?j.plan:[];
      if(plan.length){
        const byTitle={};order.forEach(id=>{const t=TASKS.find(x=>x.id==id);if(t)byTitle[pdayNorm(taskTitle(t))]=id;});
        const aiOrder=[],reasons={},durMap={};
        plan.forEach(p=>{const key=pdayNorm(p.title);let id=byTitle[key];
          if(id==null)id=order.find(oid=>{const t=TASKS.find(x=>x.id==oid);const n=t?pdayNorm(taskTitle(t)):'';return n&&(n.includes(key)||key.includes(n));});
          if(id!=null&&!aiOrder.includes(id)){aiOrder.push(id);if(p.reason)reasons[id]=String(p.reason).slice(0,160);const mn=parseInt(p.minutes,10);if(mn>0)durMap[id]=mn;}});
        order.forEach(id=>{if(!aiOrder.includes(id))aiOrder.push(id);});
        planSched=computeSchedule(aiOrder,durMap).map(s=>({...s,expl:reasons[s.id]||s.expl}));
      }
    }catch(e){/* fallback: resta l'euristica già calcolata */}
  }
  const wait=Math.max(0,900-(Date.now()-started));
  setTimeout(()=>{if(pdayView==='loading'){pdayView='roadmap';renderPlanday();}},wait);
}
function confirmPlan(){const order=planSched.map(p=>p.id);if(!order.length)return;const now=new Date();
  PLAN_DAY={date:realToday(),at:fmtHM(now.getHours(),now.getMinutes()),order,sched:planSched.map(p=>({id:p.id,start:p.start}))};savePlanDay();
  try{renderSidePlan();}catch(e){}
  if(typeof go==='function')go('home');}
// ---- Voce sidebar "La giornata" + pagina del piano deciso ----
function renderSidePlan(){
  const el=document.getElementById('sidePlan');if(!el)return;
  el.style.display='none';el.innerHTML='';return; // voce "La giornata" disattivata per ora — da riposizionare più avanti
  if(!planDayValid()){el.style.display='none';el.innerHTML='';return;}
  const items=PLAN_DAY.order.map(id=>TASKS.find(t=>t.id==id)).filter(Boolean);
  if(!items.length){el.style.display='none';el.innerHTML='';return;}
  const active=!!document.querySelector('.page[data-page="dayplan"].active');
  el.style.display='';
  el.innerHTML='<div class="nav-item side-plan-item'+(active?' active':'')+'" data-go="dayplan"><i class="ni">'+PDAY_SPARK+'</i><span>'+tr('nav_dayplan')+'</span></div>';
}
const DP_EDIT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
function renderDayplan(){
  const b=document.getElementById('dayplanBody');if(!b)return;
  if(!planDayValid()){b.innerHTML='<div class="dayplan-empty">'+PDAY_SPARK+'<p>'+tr('dayplan_empty')+'</p><button class="pday-cta" data-go="planday">'+PDAY_SPARK+'<span>'+tr('pday_title')+'</span></button></div>';return;}
  const sched={};if(PLAN_DAY.sched)PLAN_DAY.sched.forEach(s=>{sched[s.id]=s.start;});
  const items=PLAN_DAY.order.map(id=>TASKS.find(t=>t.id==id)).filter(Boolean);
  const nowMin=(()=>{const d=new Date();return d.getHours()*60+d.getMinutes();})();
  let curId=null;items.forEach(t=>{const st=sched[t.id];if(st&&(st[0]*60+st[1])<=nowMin&&!t.done)curId=t.id;});
  const rows=items.map(t=>{const st=sched[t.id];const time=st?fmtHM(st[0],st[1]):(t.time||'');const dur=estDur(t);const done=!!t.done;const isNow=t.id===curId;
    return '<div class="rm-item dp-item'+(done?' done':'')+(isNow?' now':'')+'" data-dp="'+t.id+'"><div class="rm-left"><div class="rm-time">'+time+'</div><span class="rm-dot"></span></div>'
      +'<div class="rm-card"><button class="dp-chk'+(done?' on':'')+'" data-dpchk="'+t.id+'">'+SVG.check+'</button><div class="rm-body"><div class="rm-ttitle">'+bdEsc(taskTitle(t))+'</div><div class="rm-expl">'+bdEsc(planExpl(t))+'</div></div><span class="rm-dur">'+dur+"'"+'</span></div></div>';}).join('');
  const doneN=items.filter(t=>t.done).length;
  b.innerHTML='<div class="dayplan-head"><div class="dayplan-htext"><h1 class="pday-title">'+tr('nav_dayplan')+'</h1><p class="pday-desc">'+tr('dayplan_sub')+'</p></div>'
    +'<div class="dayplan-actions"><button class="dp-abtn" data-go="planday">'+DP_EDIT+'<span>'+tr('dayplan_edit')+'</span></button><button class="dp-abtn dp-reset" data-dpreset>'+tr('dayplan_reset')+'</button></div></div>'
    +'<div class="dp-progress">'+doneN+' / '+items.length+'</div>'
    +'<div class="rm-list dp-list">'+rows+'</div>';
}
{const db=document.getElementById('dayplanBody');
 if(db)db.addEventListener('click',e=>{
   const ck=e.target.closest('[data-dpchk]');if(ck){const t=TASKS.find(x=>x.id==+ck.dataset.dpchk);if(t){setTaskDone(t,!t.done);saveTasks();renderDayplan();renderSidePlan();try{renderHomeAlerts();}catch(_){}}return;}
   if(e.target.closest('[data-dpreset]')){PLAN_DAY=null;savePlanDay();renderSidePlan();if(typeof go==='function')go('home');return;}
 });}
function renderOvPlan(){
  const el=document.getElementById('ovPlanBox');if(!el)return;
  if(!planDayValid()){el.style.display='none';el.innerHTML='';return;}
  const sched={};if(PLAN_DAY.sched)PLAN_DAY.sched.forEach(s=>{sched[s.id]=s.start;});
  const items=PLAN_DAY.order.map(id=>TASKS.find(t=>t.id==id)).filter(Boolean);
  if(!items.length){el.style.display='none';el.innerHTML='';return;}
  let n=0;
  const rows=items.map(t=>{const done=!!t.done;const st=sched[t.id];const time=(st?fmtHM(st[0],st[1]):t.time);const timeH=time?'<span class="opb-time">'+SVG.clock+time+'</span>':'';return '<div class="opb-item'+(done?' done':'')+'" data-opb="'+t.id+'"><button class="opb-check'+(done?' on':'')+'" data-opbchk="'+t.id+'">'+SVG.check+'</button><span class="opb-num">'+(++n)+'</span><span class="opb-title">'+bdEsc(taskTitle(t))+'</span>'+timeH+'</div>';}).join('');
  el.style.display='';
  el.innerHTML='<div class="ov-card ov-planbox"><div class="ov-card-h">'+PDAY_SPARK+'<span>'+tr('ov_order_title')+'</span><button class="opb-clear" id="opbClear">'+tr('ov_order_clear')+'</button></div><div class="opb-list">'+rows+'</div></div>';
}
{const b=document.getElementById('pmdRun');if(b)b.addEventListener('click',()=>{if(typeof go==='function')go('planday');});
 const rv=document.getElementById('ovResolve');if(rv)rv.addEventListener('click',()=>{if(typeof go==='function')go('tasks');});
 const nt=document.getElementById('ovNewTask');if(nt)nt.addEventListener('click',()=>{if(typeof openNewTask==='function')openNewTask();});
 // ===== Home "Ask anything" — chat a 3 livelli (stile Granola) =====
 let ovcTaskSel=ovcDraft.task;
 function ovcSelTask(){return ovcTaskSel!=null?TASKS.find(x=>x.id===ovcTaskSel):null;}
 function ovcTaskLabel(){const t=ovcSelTask();return t?taskTitle(t):tr('ovc_pick');}
 function ovcSyncLabels(){const lbl=ovcTaskLabel();['ovcTaskLbl1','ovcTaskLbl2'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=lbl;});const cb=document.getElementById('ovChatbox');if(cb)cb.classList.toggle('has-task',ovcTaskSel!=null);const sd=document.getElementById('ovcSend');if(sd)sd.setAttribute('data-tip',tr('ovc_pick'));
   // Slash della pill/scope: prende il colore della task selezionata (default viola quando vuoto).
   const col=ovcTaskSel!=null?ovcTaskColor(ovcSelTask()):null;
   document.querySelectorAll('#ovChatbox .ovc-slash').forEach(s=>{s.style.background=col?col+'26':'';s.style.color=col||'';});
   document.querySelectorAll('#ovChatbox .ovc-taskbtn,#ovChatbox .ovc-scope').forEach(b=>{if(col){b.style.borderColor=col+'66';b.style.background=col+'14';}else{b.style.borderColor='';b.style.background='';}});}
 function ovcAutoGrow(){const ta=document.getElementById('ovcInput');if(!ta)return;ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,160)+'px';ovcLift();}
 /* Fa SALIRE il saluto "Ready to tackle…" quando il box si espande, così non viene coperto.
    Alza il saluto esattamente di quanto il box cresce verso l'alto (misura in tempo reale). */
 function ovcLift(){const cb=document.getElementById('ovChatbox');const gr=document.getElementById('greet');if(!gr)return;
   if(!cb||!cb.classList.contains('expanded')){gr.style.transform='';return;}
   // Altezza FINALE del box calcolata dai pezzi stabili (non da scrollHeight del grid,
   // che è inaffidabile mentre la lista sta animando → causava lo scatto del saluto).
   const exp=document.getElementById('ovcExpanded');
   const top=exp?exp.querySelector('.ovc-top'):null;const row=exp?exp.querySelector('.ovc-inputrow'):null;
   let h=18;if(top)h+=top.offsetHeight;if(row)h+=row.offsetHeight;
   if(cb.classList.contains('listopen')){const list=document.getElementById('ovcList');const lh=list?Math.min(list.scrollHeight,240):0;if(lh)h+=lh+15;}
   gr.style.transform='translateY(-'+Math.max(0,h-52+16)+'px)';}
 /* Colore della task: categoria → gruppo → viola di default (pronto per le categorie colorate). */
 function ovcTaskColor(t){try{if(t&&t.catId!=null&&typeof catById==='function'){const c=catById(t.catId);if(c&&c.color)return c.color;}if(t&&t.gid!=null&&typeof GROUPS!=='undefined'){const g=GROUPS.find(x=>x.id===t.gid);if(g&&g.color)return g.color;}}catch(e){}return '#8168e6';}
 function ovcItemHTML(t){const sb=[];if(t.gid!=null&&typeof GROUPS!=='undefined'){const g=GROUPS.find(x=>x.id===t.gid);if(g)sb.push(g.name);}const d=taskDue(t);if(d){const months=MONTHS[LANG]||MONTHS.it;sb.push(d[2]+' '+(months[d[1]]||''));}
   const col=ovcTaskColor(t);
   return '<button type="button" class="ovc-item'+(ovcTaskSel===t.id?' sel':'')+'" data-ovctask="'+t.id+'"><span class="ovc-item-ic" style="background:'+col+'26;color:'+col+'">/</span><span class="ovc-item-tt">'+bdEsc(taskTitle(t))+'</span>'+(sb.length?'<span class="ovc-item-meta">'+bdEsc(sb.join(' · '))+'</span>':'')+'</button>';}
 function ovcRecentTasks(){return (typeof TASKS!=='undefined'?TASKS:[]).filter(x=>!x.done).slice().sort((a,b)=>(b.id||0)-(a.id||0)).slice(0,5);}
 function ovcMiniOpen(open){const cb=document.getElementById('ovChatbox');if(!cb)return;if(open){const box=document.getElementById('ovcMini');if(box){const list=ovcRecentTasks();box.innerHTML='<div class="ovc-mini-h">'+tr('ovc_recent')+'</div>'+(list.length?list.map(ovcItemHTML).join(''):'<div class="ovc-empty">'+tr('ovc_none')+'</div>');}}cb.classList.toggle('miniopen',open);}
 function ovcListOpen(open){const cb=document.getElementById('ovChatbox');if(!cb)return;if(open)ovcRenderList();cb.classList.toggle('listopen',open);ovcLift();}
 function ovcExpand(open){const cb=document.getElementById('ovChatbox');if(!cb)return;if(open)ovcMiniOpen(false);cb.classList.toggle('expanded',open);const ov=cb.closest('.ov');if(ov)ov.classList.toggle('ovc-focus',open);if(open){const ta=document.getElementById('ovcInput');if(ta){ovcAutoGrow();setTimeout(()=>ta.focus(),120);}}else{ovcListOpen(false);}ovcLift();}
 function ovcRenderList(){const box=document.getElementById('ovcList');if(!box)return;const list=(typeof TASKS!=='undefined'?TASKS:[]).filter(x=>!x.done);
   let h='<div class="ovc-list-h">'+tr('ovc_pick_h')+'</div>';
   if(!list.length)h+='<div class="ovc-empty">'+tr('ovc_none')+'</div>';
   else h+=list.map(ovcItemHTML).join('');
   box.innerHTML=h;}
 function ovcPickTask(id){ovcTaskSel=id;ovcDraft.task=id;ovcSyncLabels();ovcListOpen(false);ovcMiniOpen(false);const cb=document.getElementById('ovChatbox');if(cb&&cb.classList.contains('expanded')){const ta=document.getElementById('ovcInput');if(ta)ta.focus();}}
 function ovcClearTask(){ovcTaskSel=null;ovcDraft.task=null;ovcSyncLabels();ovcMiniOpen(false);ovcListOpen(false);}
 // Il box della home si TRASFORMA in quello della chat: il composer reale parte
 // dalla posizione/misura del box home e scivola al suo posto. Niente sparizioni.
 let ovcMorphFrom=null;
 function rsvPlayMorph(){
   if(!ovcMorphFrom)return;const comp=document.getElementById('rsvComposer');const r1=ovcMorphFrom;ovcMorphFrom=null;
   if(!comp||!r1||!r1.width)return;const r2=comp.getBoundingClientRect();if(!r2.width)return;
   const dx=r1.left-r2.left,dy=r1.top-r2.top,sx=r1.width/r2.width,sy=r1.height/r2.height;
   comp.style.transformOrigin='top left';comp.style.transition='none';comp.style.transform='translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')';
   void comp.offsetWidth;
   requestAnimationFrame(()=>{comp.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';comp.style.transform='';});
   setTimeout(()=>{comp.style.transition='';comp.style.transform='';comp.style.transformOrigin='';},560);
 }
 function ovcMorph(r1){
   if(!r1||!r1.width)return;
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
     const comp=document.getElementById('rsvComposer');
     let r2=comp?comp.getBoundingClientRect():null;
     if(!r2||!r2.width){const W=Math.min(640,window.innerWidth-300);r2={left:(window.innerWidth-W)/2+120,top:window.innerHeight-92,width:W,height:54};}
     const g=document.createElement('div');g.className='ovc-morph';
     g.style.left=r1.left+'px';g.style.top=r1.top+'px';g.style.width=r1.width+'px';g.style.height=r1.height+'px';
     document.body.appendChild(g);void g.offsetWidth;
     g.style.left=r2.left+'px';g.style.top=r2.top+'px';g.style.width=r2.width+'px';g.style.height=r2.height+'px';g.style.opacity='0';
     setTimeout(()=>{try{g.remove();}catch(_){}},500);
   }));
 }
 function ovcSend(){const ta=document.getElementById('ovcInput');if(!ta)return;const text=ta.value.trim();if(!text)return;
   if(ovcTaskSel==null){ovcListOpen(true);try{showToast(tr('ovc_need'));}catch(_){}return;}
   const id=ovcTaskSel;
   // posizione di partenza (box in home) PRIMA di navigare
   const cbx=document.getElementById('ovChatbox');
   const startEl=(cbx&&cbx.classList.contains('expanded'))?document.getElementById('ovcExpanded'):document.getElementById('ovcCollapsed');
   const r1=startEl?startEl.getBoundingClientRect():null;
   ta.value='';ovcAutoGrow();ovcExpand(false);
   ovcDraft.task=null;ovcDraft.text='';            // inviato → nessuna bozza
   // Passaggio ISTANTANEO: niente animazione, la chat appare già pronta col box sotto.
   try{openResolveChat(id);}catch(_){}
   setTimeout(()=>{try{if(typeof rsvSend==='function')rsvSend(text);}catch(_){}},160);}
 {const cb=document.getElementById('ovChatbox');
  if(cb){
    const coll=document.getElementById('ovcCollapsed');
    if(coll){coll.addEventListener('click',e=>{
        if(e.target.closest('#ovcClear1')){e.stopPropagation();ovcClearTask();return;}
        if(e.target.closest('#ovcTaskBtn1')){e.stopPropagation();ovcExpand(true);ovcListOpen(true);return;}
        ovcExpand(true);});
      coll.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();ovcExpand(true);}});}
    const sc=document.getElementById('ovcScopeBtn');if(sc)sc.addEventListener('click',e=>{e.stopPropagation();ovcListOpen(!cb.classList.contains('listopen'));});
    cb.addEventListener('click',e=>{const it=e.target.closest('[data-ovctask]');if(it){e.stopPropagation();ovcPickTask(+it.dataset.ovctask);}});
    const sd=document.getElementById('ovcSend');if(sd)sd.addEventListener('click',ovcSend);
    const ta=document.getElementById('ovcInput');
    if(ta){ta.addEventListener('input',()=>{ovcAutoGrow();ovcDraft.text=ta.value;});ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ovcSend();}else if(e.key==='Escape'){ovcExpand(false);}});}
    document.addEventListener('click',e=>{if(!e.target.closest('#ovChatbox')){ovcMiniOpen(false);const t2=document.getElementById('ovcInput');if(!t2||!t2.value.trim())ovcExpand(false);else ovcListOpen(false);}});
    ovcSyncLabels();
    // Ripristina la bozza non inviata (task già ripristinata in ovcTaskSel; qui testo + espandi)
    {const ti=document.getElementById('ovcInput');
     if(ti&&ovcDraft.text)ti.value=ovcDraft.text;
     if(ovcDraft.text&&ovcDraft.text.trim()){ovcExpand(true);ovcAutoGrow();}}
  }
 }
 const pb=document.getElementById('pdayBody');
 if(pb){
   pb.addEventListener('click',e=>{
     if(e.target.closest('[data-pdcreate]')){pdayDoCreate();return;}
     if(e.target.closest('[data-pdconfirm]')){confirmPlan();return;}
     if(e.target.closest('[data-pdback]')){pdayView='pick';renderPlanday();return;}
     if(e.target.closest('[data-pdreset]')){PLAN_DAY=null;savePlanDay();openPlanday();return;}
     if(e.target.closest('[data-pdaddall]')){const allSel=planOrder.length>0&&planOrder.every(id=>planSel.has(id));if(allSel)planOrder.forEach(id=>planSel.delete(id));else planOrder.forEach(id=>planSel.add(id));renderPlanday();return;}
     const f=e.target.closest('[data-pfilter]');if(f){planFilter=f.dataset.pfilter;planSyncOrder();renderPlanday();return;}
     const r=e.target.closest('[data-prow]');if(r){const id=+r.dataset.prow;if(planSel.has(id))planSel.delete(id);else planSel.add(id);renderPlanday();return;}
   });
   pb.addEventListener('dragstart',e=>{const r=e.target.closest('[data-prow],[data-rm]');if(!r)return;r.classList.add('dragging');try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','');}catch(_){}});
   pb.addEventListener('dragover',e=>{const list=e.target.closest('#pdayList,#rmList');if(!list)return;e.preventDefault();const dragging=list.querySelector('.dragging');const sel=list.id==='pdayList'?'[data-prow]':'[data-rm]';const after=e.target.closest(sel);if(!dragging||!after||after===dragging)return;const rc=after.getBoundingClientRect();const before=(e.clientY-rc.top)<rc.height/2;list.insertBefore(dragging,before?after:after.nextSibling);});
   pb.addEventListener('drop',e=>{if(e.target.closest('#pdayList,#rmList'))e.preventDefault();});
   pb.addEventListener('dragend',e=>{const d=e.target.closest('[data-prow],[data-rm]');if(d)d.classList.remove('dragging');
     const pl=document.getElementById('pdayList'),rl=document.getElementById('rmList');
     if(pl&&pdayView==='pick')planOrder=[...pl.querySelectorAll('[data-prow]')].map(x=>+x.dataset.prow);
     if(rl&&pdayView==='roadmap'){const ids=[...rl.querySelectorAll('[data-rm]')].map(x=>+x.dataset.rm);planSched=computeSchedule(ids);renderPlanday();}});
 }
 const opb=document.getElementById('ovPlanBox');if(opb)opb.addEventListener('click',e=>{
   const ck=e.target.closest('[data-opbchk]');if(ck){const t=TASKS.find(x=>x.id==+ck.dataset.opbchk);if(t){setTaskDone(t,!t.done);saveTasks();renderOvPlan();renderHomeAlerts();try{renderSideTasks();}catch(_){}}return;}
   if(e.target.closest('#opbClear')){PLAN_DAY=null;savePlanDay();renderOvPlan();return;}
   const it=e.target.closest('.opb-title');if(it){const row=it.closest('[data-opb]');if(row&&typeof openTaskPage==='function')openTaskPage(+row.dataset.opb);}
 });}
// ===== DAILYWORK =====
function loadRituals(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_rituals')));if(Array.isArray(s))return s.filter(r=>r&&typeof r==='object').map(r=>({...r,days:(r.days==='all'||!Array.isArray(r.days))?[0,1,2,3,4,5,6]:r.days,pid:r.pid!=null?r.pid:1}));}catch(e){}return [];}
let RITUALS=loadRituals();
function saveRituals(){try{localStorage.setItem(ukey('workie_rituals'),JSON.stringify(RITUALS));}catch(e){}if(typeof renderDwWidget==='function')renderDwWidget();}
let RIT_SEQ=RITUALS.reduce((m,r)=>Math.max(m,r.id||0),0)+1;
// ---- Profili giornata (Lavoro/Vacanza…) ----
function loadProfiles(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_profiles')));if(Array.isArray(s)&&s.length)return s.filter(p=>p&&p.id!=null);}catch(e){}return null;}
let PROFILES=loadProfiles();
let activeProfile=(()=>{try{const v=+localStorage.getItem(ukey('workie_active_profile'));return v||0;}catch(e){return 0;}})();
function saveProfiles(){try{localStorage.setItem(ukey('workie_profiles'),JSON.stringify(PROFILES));localStorage.setItem(ukey('workie_active_profile'),String(activeProfile));}catch(e){}if(typeof renderDwWidget==='function')renderDwWidget();}
if(!PROFILES){
  // Nuovo account: parte pulito. Un solo profilo vuoto, nessun programma pre-inserito.
  PROFILES=[{id:1,name:'Your day'}];activeProfile=1;
  saveProfiles();
}
let PROF_SEQ=PROFILES.reduce((m,p)=>Math.max(m,p.id||0),0)+1;
if(!PROFILES.some(p=>p.id===activeProfile))activeProfile=PROFILES[0].id;
const DW_SUGGEST=[['Doccia','07:15'],['Colazione','07:45'],['Allenamento','18:00'],['Meditazione','07:00'],['Lettura','22:00'],['Passeggiata','13:30'],['Pranzo','13:00'],['Cena','20:00'],['Stretching','09:00'],['Bere acqua',null],['Studio','15:00'],['Pianifica domani','21:30']];
const HABIT_PRESETS=[{k:'water',target:6,kind:'count'},{k:'walk',target:0,kind:'timer'},{k:'stretch',target:0,kind:'check'},{k:'fruit',target:2,kind:'count'},{k:'noscreen',target:0,kind:'check'},{k:'gratitude',target:3,kind:'count'}];
function loadHabits(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_habits')));if(Array.isArray(s)&&s.length&&s.every(h=>h&&typeof h==='object'&&h.kind!==undefined&&h.active!==undefined))return s;}catch(e){}return HABIT_PRESETS.map((p,i)=>({id:i+1,key:p.k,target:p.target,kind:p.kind,active:false,done:{}}));}
let HABITS=loadHabits();
function saveHabits(){try{localStorage.setItem(ukey('workie_habits'),JSON.stringify(HABITS));}catch(e){}}
let HAB_SEQ=HABITS.reduce((m,h)=>Math.max(m,h.id||0),0)+1;
function habitName(h){return h.key?tr('hb_'+h.key):(h.name||'');}
let dwDay=realToday();
function dwKey(d){return d[0]+'-'+String(d[1]+1).padStart(2,'0')+'-'+String(d[2]).padStart(2,'0');}
function dwSameDay(a,b){return a&&b&&a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2];}
function dwIsToday(){return dwSameDay(dwDay,realToday());}
function dwNowMin(){const d=new Date();return d.getHours()*60+d.getMinutes();}
function dwNowLabel(){const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function dwMins(t){return (+t.slice(0,2))*60+(+t.slice(3,5));}
function dwWd(){return (new Date(dwDay[0],dwDay[1],dwDay[2]).getDay()+6)%7;}
function dwActivities(){const wd=dwWd();return RITUALS.filter(r=>r.pid===activeProfile&&Array.isArray(r.days)&&r.days.includes(wd)).sort((a,b)=>(a.time||'99').localeCompare(b.time||'99'));}
function renderDwProfiles(){const el=document.getElementById('dwProfiles');if(!el)return;el.innerHTML=PROFILES.map(p=>'<span class="dw-prof'+(p.id===activeProfile?' on':'')+'" data-dwprof="'+p.id+'">'+bdEsc(p.name)+'</span>').join('')+'<span class="dw-prof add" id="dwProfAdd">'+SVG.plus+'</span>';}
function renderDwStrip(){
  const days=document.getElementById('dwDays');if(!days)return;
  const dows=DOWS[LANG]||DOWS.it,t=realToday();
  const base=new Date(dwDay[0],dwDay[1],dwDay[2]),off=(base.getDay()+6)%7,mon=new Date(base);mon.setDate(base.getDate()-off);
  let html='';
  for(let i=0;i<7;i++){const d=new Date(mon);d.setDate(mon.getDate()+i);const dd=[d.getFullYear(),d.getMonth(),d.getDate()];const sel=dwSameDay(dd,dwDay),tod=dwSameDay(dd,t);
    html+='<div class="dw-day'+(sel?' sel':'')+(tod?' today':'')+'" data-dwday="'+dwKey(dd)+'"><div class="dw-dow">'+dows[i]+'</div><div class="dw-num">'+dd[2]+'</div></div>';}
  days.innerHTML=html;
  const sub=document.getElementById('dwSub');if(sub){const months=MONTHS[LANG]||MONTHS.it;const prof=(PROFILES.find(p=>p.id===activeProfile)||{}).name;sub.textContent=(dwIsToday()?tr('al_today_word')+' · ':'')+dwDay[2]+' '+months[dwDay[1]]+' '+dwDay[0]+(prof?'  ·  '+prof:'');}
}
function dwTimelineItems(){
  const k=dwKey(dwDay);
  const acts=dwActivities().map(r=>({time:r.time||null,title:r.name,kind:'act',id:r.id,emoji:(r.emoji||dwWheelEmoji(r.name)),done:!!(r.done&&r.done[k])}));
  const tasks=TASKS.filter(t=>t.date&&dwSameDay(t.date,dwDay)&&t.time&&!t.month).map(t=>({time:t.time,title:taskTitle(t),kind:'task',id:t.id,done:!!t.done}));
  return acts.concat(tasks).sort((a,b)=>{if(!a.time&&!b.time)return 0;if(!a.time)return -1;if(!b.time)return 1;return a.time.localeCompare(b.time);});
}
function renderDwTimeline(){
  const tl=document.getElementById('dwTimeline');if(!tl)return;
  const list=dwTimelineItems();
  if(!list.length){tl.innerHTML='<div class="dw-noitems" style="padding:44px 4px">'+tr('dw_no_activities')+'</div>';return;}
  const nowM=dwNowMin();let html='',nowIns=false;
  const nowMark='<div class="dw-fitem dw-nowitem" data-nowmark><span class="dw-fitem-time">'+dwNowLabel()+'</span><div class="dw-now-card">'+tr('dw_now')+'</div></div>';
  list.forEach(it=>{
    if(dwIsToday()&&it.time&&!nowIns&&dwMins(it.time)>nowM){html+=nowMark;nowIns=true;}
    const lead=it.kind==='act'
      ? '<button class="dw-emoji'+(it.done?' done':'')+'" data-fcheck="act:'+it.id+'">'+(it.emoji||'📌')+'</button>'
      : '<div class="dw-check'+(it.done?' on':'')+'" data-fcheck="'+it.kind+':'+it.id+'">'+(it.done?SVG.check:'')+'</div>';
    html+='<div class="dw-fitem '+it.kind+(it.done?' done':'')+'"><span class="dw-fitem-time">'+(it.time||'')+'</span><div class="dw-fitem-card">'+lead+'<span class="dw-fitem-t">'+bdEsc(it.title)+'</span></div></div>';
  });
  if(dwIsToday()&&!nowIns)html+=nowMark;
  tl.innerHTML='<div class="dw-tl-pad"></div>'+html+'<div class="dw-tl-pad"></div>';
  dwBindScroll();requestAnimationFrame(()=>{dwSetPads();dwCenterNow();dwScaleItems();});
}
function dwSetPads(){const wrap=document.querySelector('.dw-timeline-wrap');if(!wrap||wrap.clientHeight<80)return;const h=Math.round(wrap.clientHeight*0.44);document.querySelectorAll('#dwTimeline .dw-tl-pad').forEach(p=>p.style.height=h+'px');}
let dwScrollBound=false;
function dwBindScroll(){const wrap=document.querySelector('.dw-timeline-wrap');if(!wrap||dwScrollBound)return;dwScrollBound=true;wrap.addEventListener('scroll',dwScaleItems);}
function dwScaleItems(){
  const wrap=document.querySelector('.dw-timeline-wrap');if(!wrap)return;
  const items=wrap.querySelectorAll('.dw-fitem');if(!items.length)return;
  const wr=wrap.getBoundingClientRect(),cy=wr.top+wr.height/2;
  items.forEach(el=>{const r=el.getBoundingClientRect(),ic=r.top+r.height/2,dist=Math.abs(ic-cy),norm=Math.min(1,dist/(wr.height*0.5));
    el.style.transform='scale('+(1-norm*0.24).toFixed(3)+')';el.style.opacity=(1-norm*0.6).toFixed(2);el.classList.toggle('focused',norm<0.2);});
}
function dwCenterNow(){const wrap=document.querySelector('.dw-timeline-wrap');if(!wrap)return;const target=wrap.querySelector('[data-nowmark]')||wrap.querySelector('.dw-fitem:not(.done)')||wrap.querySelector('.dw-fitem');if(!target)return;wrap.scrollTop=target.offsetTop-wrap.clientHeight/2+target.offsetHeight/2;}
function renderDwAlerts(){
  const el=document.getElementById('dwAlerts');if(!el)return;const rows=[],k=dwKey(dwDay);
  const acts=dwActivities();
  if(dwIsToday()){
    // solo le attività dovute FINO ADESSO (senza orario = sempre dovute; con orario = orario <= ora)
    const now=dwNowMin();
    const dueByNow=acts.filter(r=>!r.time||dwMins(r.time)<=now);
    const total=dueByNow.length,done=dueByNow.filter(r=>r.done&&r.done[k]).length,left=total-done;
    if(left>0){const ratio=done/total;const cls=ratio>=0.8?'ok':(ratio>=0.5?'warn':'red');rows.push({cls,t:tr('dw_acts_left'),s:String(left)});}
  }else{
    const actLeft=acts.filter(r=>!(r.done&&r.done[k])).length;
    if(actLeft)rows.push({t:tr('dw_acts_left'),s:String(actLeft)});
  }
  const overdue=TASKS.filter(t=>!t.done&&t.date&&!t.month&&cmpDate(t.date,realToday())<0);
  if(overdue.length)rows.push({cls:'red',t:overdue.length+' '+tr('al_late_tasks'),s:taskTitle(overdue[0])});
  if(dwIsToday()){const now=dwNowMin();const next=TASKS.filter(t=>t.date&&dwSameDay(t.date,dwDay)&&t.time&&!t.done).map(t=>({t,m:dwMins(t.time)})).filter(x=>x.m>=now).sort((a,b)=>a.m-b.m)[0];if(next)rows.push({t:tr('al_next')+': '+taskTitle(next.t),s:next.t.time});}
  el.innerHTML=rows.length?rows.map(r=>'<div class="dw-alert'+(r.cls?' '+r.cls:'')+'"><div class="dw-at">'+bdEsc(r.t)+'</div>'+(r.s?'<div class="dw-as">'+bdEsc(r.s)+'</div>':'')+'</div>').join(''):'<div class="dw-noitems" style="padding:14px 4px">'+tr('dw_all_done')+'</div>';
}
const FOCUS_MS=30*60000,BREAK_MS=3*60000;
let walkT={running:false,paused:false,phase:'focus',endTs:0,leftMs:FOCUS_MS};
function fmtMs(ms){ms=Math.max(0,ms);const s=Math.round(ms/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function walkLeftMs(){if(!walkT.running)return FOCUS_MS;if(walkT.paused)return walkT.leftMs;return walkT.endTs-Date.now();}
function walkTimerHTML(){
  const running=walkT.running,isFocus=walkT.phase==='focus',left=walkLeftMs(),total=isFocus?FOCUS_MS:BREAK_MS;
  const pct=Math.max(0,Math.min(100,(1-left/total)*100)),ending=isFocus&&left<=120000;
  const color=isFocus?(ending?'#ff6b6b':'#b8a6f4'):'#ffcf6b',label=isFocus?tr('dw_focus'):tr('dw_break');
  const ctrl=running?'<button class="dw-tbtn" data-wt="pause">'+(walkT.paused?tr('dw_resume'):tr('dw_block'))+'</button><button class="dw-tbtn" data-wt="reset">'+tr('dw_reset')+'</button>':'<button class="dw-tbtn primary" data-wt="start">'+tr('dw_activate')+'</button>';
  return '<div class="dw-habit dw-timer"><div class="dw-habit-top"><span class="dw-habit-n">'+bdEsc(habitName({key:'walk'}))+'</span></div>'+(running?'<div class="dw-timer-phase" style="color:'+color+'">'+label+(walkT.paused?' · '+tr('dw_paused'):'')+'</div><div class="dw-timer-clock" style="color:'+color+'">'+fmtMs(left)+'</div><div class="dw-habit-bar"><i style="width:'+pct+'%;background:'+color+'"></i></div>':'<div class="dw-timer-hint">'+tr('dw_timer_hint')+'</div>')+'<div class="dw-timer-ctrl">'+ctrl+'</div></div>';
}
function updateWalkCard(){const el=document.getElementById('dwWalkTimer');if(el)el.innerHTML=walkTimerHTML();}
let walkInterval=setInterval(function(){if(walkT.running&&!walkT.paused){const left=walkT.endTs-Date.now();if(left<=0){walkT.phase=walkT.phase==='focus'?'break':'focus';walkT.endTs=Date.now()+(walkT.phase==='focus'?FOCUS_MS:BREAK_MS);}updateWalkCard();}},1000);
function renderDwHabits(){
  const el=document.getElementById('dwHabits');if(!el)return;const k=dwKey(dwDay);
  const active=HABITS.filter(h=>h.active);
  if(!active.length){el.innerHTML='<div class="dw-noitems" style="padding:12px 4px;font-size:12.5px">'+tr('dw_no_habits')+'</div>';return;}
  el.innerHTML=active.map(h=>{
    if(h.kind==='timer')return '<div id="dwWalkTimer">'+walkTimerHTML()+'</div>';
    const val=(h.done&&h.done[k])||0,top='<div class="dw-habit-top"><span class="dw-habit-n">'+bdEsc(habitName(h))+'</span></div>';
    if(h.target>0){const pct=Math.min(100,Math.round(val/h.target*100));return '<div class="dw-habit">'+top+'<div class="dw-habit-ctr"><button data-hab="'+h.id+':-">−</button><span class="dw-habit-v">'+val+'/'+h.target+'</span><button data-hab="'+h.id+':+">+</button></div><div class="dw-habit-bar"><i style="width:'+pct+'%"></i></div></div>';}
    const on=val>0;return '<div class="dw-habit">'+top+'<div class="dw-check'+(on?' on':'')+'" data-hab="'+h.id+':t" style="margin-top:9px">'+(on?SVG.check:'')+'</div></div>';
  }).join('');
}
function renderDaily(){renderDwStrip();renderDwTimeline();renderDwWheel();renderDwWheelR();renderDwAlerts();renderDwHabits();renderDwWidgetBtn();if(typeof renderDwToolsDock==='function')renderDwToolsDock();}
/* ===== WHEEL: giornata a due ruote — sx impegni (arco sx), dx strumenti (arco dx) ===== */
const DW_WHEEL_SAMPLE=[
  {time:'07:00',title:'Palestra'},
  {time:'09:00',title:'Riunione team'},
  {time:'11:00',title:'Email e task'},
  {time:'13:00',title:'Pranzo'},
  {time:'15:30',title:'Call cliente'},
  {time:'17:00',title:'Studio'},
  {time:'20:00',title:'Cena'}
];
/* strumenti attivabili della giornata (ruota destra) */
const DW_TOOLS=[
  {key:'focus',emoji:'⏱',lk:'dwt_focus'},
  {key:'dnd',emoji:'🔕',lk:'dwt_dnd'},
  {key:'music',emoji:'🎧',lk:'dwt_music'},
  {key:'break',emoji:'☕',lk:'dwt_break'},
  {key:'water',emoji:'💧',lk:'dwt_water'},
  {key:'note',emoji:'✍️',lk:'dwt_note'}
];
let dwToolsActive=null;
function dwToolsLoad(){if(dwToolsActive)return dwToolsActive;let a=[];try{a=JSON.parse(localStorage.getItem(ukey('workie_day_tools'))||'[]');}catch(e){}dwToolsActive=new Set(a);return dwToolsActive;}
function dwToolsSave(){try{localStorage.setItem(ukey('workie_day_tools'),JSON.stringify([...dwToolsLoad()]));}catch(e){}}
// ===== Strumenti attivi: pannelli funzionali (dock in basso) =====
let ftRem=25*60,ftRun=false,ftTimer=null,dwMusicOn=false;
function ftFmt(s){const m=Math.floor(s/60),ss=s%60;return (m<10?'0':'')+m+':'+(ss<10?'0':'')+ss;}
function ftPaint(){const d=document.getElementById('ftDisplay');if(d)d.textContent=ftFmt(ftRem);
  const st=document.getElementById('ftState');if(st)st.textContent=ftRun?tr('ft_running'):(ftRem===0?tr('ft_done'):(ftRem<25*60?tr('ft_paused'):tr('ft_ready')));
  const b=document.getElementById('ftStart');if(b)b.textContent=ftRun?tr('ft_pause'):tr('ft_start');
  const c=document.querySelector('[data-toolcard="focus"]');if(c)c.classList.toggle('running',ftRun);}
function ftStop(){ftRun=false;if(ftTimer){clearInterval(ftTimer);ftTimer=null;}ftPaint();}
function ftStart(){if(ftRun){ftStop();return;}if(ftRem<=0)ftRem=25*60;ftRun=true;ftTimer=setInterval(()=>{if(ftRem>0){ftRem--;ftPaint();if(ftRem===0){ftStop();try{showToast(tr('ft_complete'));}catch(_){}}}},1000);ftPaint();}
function ftReset(){ftStop();ftRem=25*60;ftPaint();}
function waterKey(){return ukey('workie_day_water')+'::'+(typeof realToday==='function'?realToday().join('-'):'d');}
function waterGet(){try{return +localStorage.getItem(waterKey())||0;}catch(e){return 0;}}
function waterAdd(n){let v=Math.max(0,waterGet()+n);try{localStorage.setItem(waterKey(),String(v));}catch(e){}renderDwToolsDock();}
function dwNoteGet(){try{return localStorage.getItem(ukey('workie_day_note'))||'';}catch(e){return '';}}
function dwNoteSet(v){try{localStorage.setItem(ukey('workie_day_note'),v);}catch(e){}}
function dwToolBody(k){
  if(k==='focus')return '<div class="dtc-time" id="ftDisplay">'+ftFmt(ftRem)+'</div>'
    +'<div class="dtc-info"><span>'+tr('ft_session')+'</span><span id="ftState">'+tr('ft_ready')+'</span></div>'
    +'<div class="dtc-btns"><button class="dtc-btn primary" id="ftStart" data-ft="start">'+(ftRun?tr('ft_pause'):tr('ft_start'))+'</button><button class="dtc-btn" data-ft="reset">'+tr('ft_reset')+'</button></div>';
  if(k==='water'){const g=waterGet();return '<div class="dtc-time">'+g+'<span class="dtc-unit">/ 8</span></div>'
    +'<div class="dtc-info"><span>'+tr('wt_glasses')+'</span><span>'+(g>=8?tr('wt_goal_ok'):tr('wt_goal'))+'</span></div>'
    +'<div class="dtc-btns"><button class="dtc-btn primary" data-water="1">+1</button><button class="dtc-btn" data-water="-1">−</button></div>';}
  if(k==='note')return '<textarea class="dtc-note" id="dwNoteTa" placeholder="'+tr('nt_note_ph')+'">'+bdEsc(dwNoteGet())+'</textarea>'
    +'<div class="dtc-info"><span>'+tr('nt_autosave')+'</span><span id="dwNoteCnt">'+dwNoteGet().length+' '+tr('nt_chars')+'</span></div>';
  if(k==='dnd')return '<div class="dtc-dnd"><span class="dtc-pulse"></span></div>'
    +'<div class="dtc-info"><span>'+tr('dnd_l1')+'</span><span>'+tr('dnd_l2')+'</span></div>';
  if(k==='music')return '<div class="dtc-music"><button class="dtc-play" data-music="toggle">'+(dwMusicOn?'❚❚':'▶')+'</button><div><div class="dtc-mtitle">Lo-fi focus mix</div><div class="dtc-msub" id="dwMusicState">'+(dwMusicOn?tr('mu_playing'):tr('mu_paused'))+'</div></div></div>'
    +'<div class="dtc-info"><span>'+tr('mu_l1')+'</span><span>'+tr('mu_l2')+'</span></div>';
  if(k==='break')return '<div class="dtc-time">50<span class="dtc-unit">min</span></div>'
    +'<div class="dtc-info"><span>'+tr('br_l1')+'</span><span>'+tr('br_l2')+'</span></div>';
  return '';}
function dwToolCard(t){return '<div class="dw-tool-card'+(t.key==='focus'&&ftRun?' running':'')+'" data-toolcard="'+t.key+'"><div class="dtc-head"><span class="dtc-ic">'+t.emoji+'</span><span class="dtc-title">'+bdEsc(tr(t.lk))+'</span><button class="dtc-x" data-tooloff="'+t.key+'" title="'+tr('pl_disable')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div><div class="dtc-body">'+dwToolBody(t.key)+'</div></div>';}
function renderDwToolsDock(){const dock=document.getElementById('dwToolsDock');if(!dock)return;const act=dwToolsLoad();const cards=DW_TOOLS.filter(t=>act.has(t.key));dock.innerHTML=cards.map(dwToolCard).join('');dock.classList.toggle('has',cards.length>0);ftPaint();}
{const dock=document.getElementById('dwToolsDock');if(dock){
  dock.addEventListener('click',e=>{
    const off=e.target.closest('[data-tooloff]');if(off){const k=off.dataset.tooloff;if(k==='focus')ftStop();const a=dwToolsLoad();a.delete(k);dwToolsSave();renderDwToolsDock();if(typeof renderDwWheelR==='function')renderDwWheelR();return;}
    const ft=e.target.closest('[data-ft]');if(ft){if(ft.dataset.ft==='start')ftStart();else ftReset();return;}
    const w=e.target.closest('[data-water]');if(w){waterAdd(+w.dataset.water);return;}
    const mu=e.target.closest('[data-music]');if(mu){dwMusicOn=!dwMusicOn;const s=document.getElementById('dwMusicState');if(s)s.textContent=dwMusicOn?tr('mu_playing'):tr('mu_paused');mu.textContent=dwMusicOn?'❚❚':'▶';return;}
  });
  dock.addEventListener('input',e=>{const ta=e.target.closest('#dwNoteTa');if(ta){dwNoteSet(ta.value);const c=document.getElementById('dwNoteCnt');if(c)c.textContent=ta.value.length+' '+tr('nt_chars');}});
}}
function dwWheelEmoji(t){t=(t||'').toLowerCase();
  const m=[['sveglia|wake|alzar','⏰'],['lavor|work|ufficio|office','💼'],['palestr|allena|gym|workout|corsa|run|sport','🏋️'],['riunion|meeting|team|standup','👥'],['call|chiamat|telefon|zoom','📞'],['pranz|lunch','🍽️'],['cena|dinner','🍷'],['colazion|breakfast','🥐'],['studi|legg|read|corso|lezion','📚'],['email|mail|posta','📧'],['spesa|shop|acquist','🛒'],['medic|dottor|visita|dentist','🩺'],['viagg|treno|volo|aereo|trasfer','✈️'],['relax|pausa|break|caffè|caffe','☕'],['scriv|report|document','📝'],['progett|design|creat','🎨'],['dormi|sonno|letto|sleep|bed','🛌'],['medita|yoga','🧘']];
  for(const[re,e]of m){if(new RegExp(re).test(t))return e;}return '📌';}
function renderDwWheel(){
  const sc=document.getElementById('dwWheelScroll');if(!sc)return;
  let list=(typeof dwTimelineItems==='function')?dwTimelineItems():[];
  const preview=!list.length;
  if(preview)list=DW_WHEEL_SAMPLE.slice();
  const rows=list.map((it,i)=>`<div class="dw-wi" data-wi="${i}"><div class="dw-wi-ic">${dwWheelEmoji(it.title)}</div><div class="dw-wi-body"><div class="dw-wi-name">${bdEsc(it.title)}</div><div class="dw-wi-time">${it.time||''}</div></div></div>`).join('');
  sc.innerHTML=`<div class="dw-wheel-pad"></div>${rows}<div class="dw-wheel-pad"></div>`;
  const wheel=document.getElementById('dwWheel');if(wheel)wheel.classList.toggle('preview',preview);
  dwWheelBind();
  requestAnimationFrame(()=>{dwWheelPadsEl(sc);dwWheelCenterNow(sc);dwWheelUpdate();requestAnimationFrame(dwWheelUpdate);});
}
function renderDwWheelR(){
  const sc=document.getElementById('dwWheelScrollR');if(!sc)return;
  const act=dwToolsLoad();
  const rows=DW_TOOLS.map(t=>`<div class="dw-wi dw-wi-r${act.has(t.key)?' active':''}" data-tool="${t.key}"><div class="dw-wi-body"><div class="dw-wi-name">${bdEsc(tr(t.lk))}</div><div class="dw-wi-time">${act.has(t.key)?tr('tool_on'):tr('tool_off')}</div></div><div class="dw-wi-ic">${t.emoji}</div></div>`).join('');
  sc.innerHTML=`<div class="dw-wheel-pad"></div>${rows}<div class="dw-wheel-pad"></div>`;
  dwWheelBind();
  requestAnimationFrame(()=>{dwWheelPadsEl(sc);dwWheelCenterIdx(sc,0);dwWheelUpdate();requestAnimationFrame(dwWheelUpdate);});
}
function dwWheelPadsEl(sc){if(!sc||sc.clientHeight<80)return;const h=Math.round(sc.clientHeight/2-42);sc.querySelectorAll('.dw-wheel-pad').forEach(p=>p.style.height=h+'px');}
function dwWheelPads(){dwWheelPadsEl(document.getElementById('dwWheelScroll'));dwWheelPadsEl(document.getElementById('dwWheelScrollR'));}
function dwWheelCenterIdx(sc,idx){if(!sc)return;const items=sc.querySelectorAll('.dw-wi');if(!items.length)return;const t=items[Math.max(0,Math.min(items.length-1,idx))];sc.scrollTop=t.offsetTop-sc.clientHeight/2+t.offsetHeight/2;}
function dwWheelCenterNow(sc){if(!sc)return;const items=sc.querySelectorAll('.dw-wi');if(!items.length)return;let target=items[0];
  if(typeof dwIsToday==='function'&&dwIsToday()&&typeof dwNowMin==='function'){const now=dwNowMin();for(const el of items){const tm=el.querySelector('.dw-wi-time');const v=tm?tm.textContent.trim():'';if(v&&typeof dwMins==='function'&&dwMins(v)>=now){target=el;break;}}}
  sc.scrollTop=target.offsetTop-sc.clientHeight/2+target.offsetHeight/2;}
function dwWheelBind(){
  [['dwWheelScroll',-1],['dwWheelScrollR',1]].forEach(([id])=>{const sc=document.getElementById(id);if(!sc||sc.dataset.bound)return;sc.dataset.bound='1';let ticking=false;sc.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{dwWheelUpdate();ticking=false;});});});
  const scR=document.getElementById('dwWheelScrollR');
  if(scR&&!scR.dataset.toolbound){scR.dataset.toolbound='1';scR.addEventListener('click',e=>{const it=e.target.closest('.dw-wi[data-tool]');if(!it)return;const key=it.dataset.tool;const a=dwToolsLoad();const on=!a.has(key);if(on)a.add(key);else a.delete(key);dwToolsSave();if(!on&&key==='focus'&&typeof ftStop==='function')ftStop();it.classList.toggle('active',on);it.classList.remove('pop');void it.offsetWidth;if(on)it.classList.add('pop');const pill=it.querySelector('.dw-wi-time');if(pill)pill.textContent=on?tr('tool_on'):tr('tool_off');if(typeof renderDwToolsDock==='function')renderDwToolsDock();});}
}
function dwWheelUpdate(){
  dwWheelUpdEl(document.getElementById('dwWheelScroll'),-1);
  dwWheelUpdEl(document.getElementById('dwWheelScrollR'),1);
}
function dwWheelUpdEl(sc,sign){
  if(!sc)return;const items=sc.querySelectorAll('.dw-wi');if(!items.length)return;
  const wr=sc.getBoundingClientRect(),cy=wr.top+wr.height/2,half=wr.height/2||1;
  let best=null,bestD=1e9;
  items.forEach(el=>{
    const r=el.getBoundingClientRect(),ic=r.top+r.height/2,dy=ic-cy;
    let nd=dy/half;if(nd>1.5)nd=1.5;if(nd<-1.5)nd=-1.5;
    const an=Math.min(1,Math.abs(nd));
    const x=(sign*(nd*nd)*130).toFixed(1);
    const scale=(1-an*0.34).toFixed(3);
    const op=(1-an*0.8).toFixed(2);
    el.style.transform=`translateX(${x}px) scale(${scale})`;
    el.style.opacity=op;
    const ad=Math.abs(dy);if(ad<bestD){bestD=ad;best=el;}
  });
  items.forEach(el=>el.classList.toggle('sel',el===best));
}
// ---- Giornata nella sidebar destra: il piano del Plan my day, a ruota scorrevole ----
function renderDaySide(){
  const body=document.getElementById('dayDrawerBody');if(!body)return;
  if(!planDayValid()){
    body.innerHTML='<div class="dsw-empty"><div class="dsw-empty-t">'+tr('ds_noplan_t')+'</div><div class="dsw-empty-d">'+tr('ds_noplan_d')+'</div><button class="ov-abtn primary dsw-plan-btn" data-dsplan><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.6V12l3 1.8"/></svg><span>'+tr('ds_make_plan')+'</span></button></div>';
    return;
  }
  const toMin=v=>{const m=/^(\d{1,2}):(\d{2})/.exec(String(v||''));return m?(+m[1]*60+ +m[2]):null;};
  const nd=new Date(),nowMin=nd.getHours()*60+nd.getMinutes();
  // Attività di routine di oggi (icona orologino)
  const acts=(typeof dwActivities==='function'?dwActivities():[]).map(r=>({kind:'routine',title:r.name,time:r.time||'',min:toMin(r.time)}));
  // Task del piano (icona task)
  const sched={};if(PLAN_DAY.sched)PLAN_DAY.sched.forEach(s=>{sched[s.id]=s.start;});
  const tasks=PLAN_DAY.order.map(id=>TASKS.find(t=>t.id==id)).filter(Boolean).map(t=>{
    let time=sched[t.id];if(Array.isArray(time))time=fmtHM(time[0],time[1]);if(time==null||time==='')time=t.time||'';
    return {kind:'task',id:t.id,title:taskTitle(t),time,min:toMin(time),done:!!t.done};});
  const list=acts.concat(tasks).sort((a,b)=>(a.min==null?1e9:a.min)-(b.min==null?1e9:b.min));
  const IC_TASK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4.5"/><path d="M8.5 12.4l2.5 2.5 4.6-5.2"/></svg>';
  const IC_CLOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.7V12l3 1.8"/></svg>';
  // linea che segna "ora": dopo le attività passate, prima delle prossime
  const insertAt=list.filter(x=>x.min!=null&&x.min<=nowMin).length;
  const nowLine='<div class="ds-now"><span class="ds-now-dot"></span><span class="ds-now-time">'+fmtHM(nd.getHours(),nd.getMinutes())+'</span></div>';
  let html='';
  list.forEach((x,i)=>{if(i===insertAt)html+=nowLine;
    const ic=x.kind==='routine'?IC_CLOCK:IC_TASK;
    const attr=x.kind==='task'?' data-dsw="'+x.id+'"':'';
    html+='<button type="button" class="ds-item ds-'+x.kind+(x.done?' done':'')+'"'+attr+'><span class="ds-ic">'+ic+'</span><span class="ds-name">'+bdEsc(x.title)+'</span>'+(x.time?'<span class="ds-time">'+bdEsc(String(x.time))+'</span>':'')+'</button>';});
  if(insertAt>=list.length)html+=nowLine;
  body.innerHTML='<div class="ds-list">'+html+'</div>';
}
// La "linea di fuoco" (dove il box è più grande) è vicina all'ALTO, non al centro:
// l'attività corrente sta subito sotto i tasti, le successive scendono e sfumano in basso.
const DS_FOCUS=60;      // px dall'alto della ruota
function dsItemHalf(sc){const it=sc&&sc.querySelector('.dw-wi');return it?it.offsetHeight/2:34;}
function dayWheelPads(sc){if(!sc||sc.clientHeight<80)return;const half=dsItemHalf(sc);const pads=sc.querySelectorAll('.dw-wheel-pad');if(pads[0])pads[0].style.height=Math.max(0,DS_FOCUS-half)+'px';if(pads[1])pads[1].style.height=Math.max(0,sc.clientHeight-DS_FOCUS-half)+'px';}
function dayWheelCenterNow(sc){if(!sc)return;const items=sc.querySelectorAll('.dw-wi');if(!items.length)return;let target=items[0];
  if(typeof dwIsToday==='function'&&dwIsToday()&&typeof dwNowMin==='function'){const now=dwNowMin();for(const el of items){const tm=el.querySelector('.dw-wi-time');const v=tm?tm.textContent.trim():'';if(v&&typeof dwMins==='function'&&dwMins(v)>=now){target=el;break;}}}
  sc.scrollTop=target.offsetTop+target.offsetHeight/2-DS_FOCUS;}
function dayWheelBind(){const sc=document.getElementById('dayWheelScroll');if(!sc||sc.dataset.bound)return;sc.dataset.bound='1';let ticking=false;sc.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{dayWheelUpdate();ticking=false;});});}
function dayWheelUpdate(){
  const sc=document.getElementById('dayWheelScroll');if(!sc)return;const items=sc.querySelectorAll('.dw-wi');if(!items.length)return;
  const wr=sc.getBoundingClientRect(),cy=wr.top+DS_FOCUS,half=wr.height/2||1;let best=null,bestD=1e9;
  items.forEach(el=>{const r=el.getBoundingClientRect(),ic=r.top+r.height/2,dy=ic-cy;let nd=dy/half;if(nd>1.5)nd=1.5;if(nd<-1.5)nd=-1.5;const an=Math.min(1,Math.abs(nd));
    el.style.transform='scale('+(1-an*0.26).toFixed(3)+')';el.style.opacity=(1-an*0.74).toFixed(2);
    const ad=Math.abs(dy);if(ad<bestD){bestD=ad;best=el;}});
  items.forEach(el=>el.classList.toggle('sel',el===best));
}
// ---- Widget Daily (aggiungibile alla Home) ----
let dwWidgetOn=(()=>{try{return localStorage.getItem(ukey('workie_dw_widget'))==='1';}catch(e){return false;}})();
function saveDwWidget(){try{localStorage.setItem(ukey('workie_dw_widget'),dwWidgetOn?'1':'0');}catch(e){}}
function renderDwWidgetBtn(){/* il widget Home è sempre attivo; il bottone apre la finestra desktop */}
function dwTodayItems(){
  const t=realToday(),wd=(new Date(t[0],t[1],t[2]).getDay()+6)%7,k=dwKey(t);
  const acts=RITUALS.filter(r=>r.pid===activeProfile&&Array.isArray(r.days)&&r.days.includes(wd)&&r.time).map(r=>({time:r.time,title:r.name,done:!!(r.done&&r.done[k])}));
  const tasks=TASKS.filter(x=>x.date&&dwSameDay(x.date,t)&&x.time&&!x.month).map(x=>({time:x.time,title:taskTitle(x),done:!!x.done}));
  return acts.concat(tasks).sort((a,b)=>a.time.localeCompare(b.time));
}
function dwHasSetup(){try{return RITUALS.some(r=>r.pid===activeProfile);}catch(e){return false;}}
function renderDwWidget(){
  const el=document.getElementById('homeDwWidget');if(!el)return;
  const items=dwTodayItems();
  const head='';
  if(!items.length){
    if(!dwHasSetup()){
      el.innerHTML='<div class="dw-upcoming">'+head+'<div class="dw-widget-empty">'+tr('dw_widget_empty')+' <span class="dw-we-link" data-opensetup>'+tr('dw_setup_title')+'</span></div></div>';
    }else{
      el.innerHTML='<div class="dw-upcoming">'+head+'<div class="alert-empty">'+tr('dw_all_done')+'</div></div>';
    }
    return;
  }
  const nd=new Date(),now=nd.getHours()*60+nd.getMinutes();
  const times=items.map(i=>dwMins(i.time));
  let startMin=Math.max(0,Math.min(now,times[0])-40);
  let endMin=Math.min(1440,Math.max(now,times[times.length-1])+40);
  const PPM=1.5,xOf=m=>Math.round((m-startMin)*PPM),width=xOf(endMin),nowX=xOf(now);
  // Corsie verticali: le etichette troppo vicine (o allo stesso orario) vengono impilate una sopra l'altra
  const MINGAP=88,laneH=30,topPad=6;
  const pts=items.map((i,idx)=>({i,idx,m:dwMins(i.time),x:xOf(dwMins(i.time))})).sort((a,b)=>a.x-b.x||a.idx-b.idx);
  const laneLast=[];
  pts.forEach(p=>{let lane=0;while(lane<laneLast.length&&p.x-laneLast[lane]<MINGAP)lane++;laneLast[lane]=p.x;p.lane=lane;});
  const maxLane=Math.max(0,laneLast.length-1);
  const lineY=topPad+(maxLane+1)*laneH,trackH=lineY+18;
  const marks=pts.map(p=>{const i=p.i,cls=(p.m<now?'past ':'')+(i.done?'done ':'');
    const lt=lineY-(p.lane+1)*laneH,stemTop=lt+24,stemH=Math.max(0,lineY-stemTop);
    return '<div class="dw-tp '+cls+'" data-go="desktop" style="left:'+p.x+'px">'
      +'<div class="dw-tp-lbl" style="top:'+lt+'px"><span class="dw-tp-time">'+i.time+'</span><span class="dw-tp-name">'+bdEsc(i.title)+'</span></div>'
      +(stemH>2?'<div class="dw-tp-stem" style="top:'+stemTop+'px;height:'+stemH+'px"></div>':'')
      +'<span class="dw-tp-dot" style="top:'+(lineY-4)+'px"></span></div>';}).join('');
  el.innerHTML='<div class="dw-upcoming">'+head
    +'<div class="dw-tl-scroll" id="dwWidgetScroll"><div class="dw-tl-track" style="width:'+width+'px;height:'+trackH+'px">'
    +'<div class="dw-tl-base" style="top:'+lineY+'px"></div><div class="dw-tl-fill" style="top:'+lineY+'px;width:'+nowX+'px"></div>'
    +marks
    +'<div class="dw-tl-now" style="top:'+lineY+'px;left:'+nowX+'px"></div>'
    +'</div></div></div>';
  const sc=document.getElementById('dwWidgetScroll');
  if(sc)sc.scrollLeft=Math.max(0,nowX-Math.round(sc.clientWidth/2));
}
// ---- Finestra desktop del Daily (widget flottante fuori dall'app) ----
let dwWin=null,dwWinTimer=null;
function dwWinContentHTML(){
  const items=dwTodayItems();
  const nd=new Date(),now=nd.getHours()*60+nd.getMinutes();
  const nowLbl=('0'+nd.getHours()).slice(-2)+':'+('0'+nd.getMinutes()).slice(-2);
  if(!items.length)return '<div class="wempty">'+tr('dw_all_done')+'</div>';
  let nowShown=false,rows='';
  items.forEach(i=>{const m=dwMins(i.time),past=m<now;
    if(!past&&!nowShown){rows+='<div class="wnow"><span></span>'+nowLbl+'</div>';nowShown=true;}
    rows+='<div class="wrow'+(past?' past':'')+(i.done?' done':'')+'"><span class="wt">'+i.time+'</span><span class="wn">'+bdEsc(i.title)+'</span></div>';});
  if(!nowShown)rows+='<div class="wnow"><span></span>'+nowLbl+'</div>';
  return rows;
}
// Buone abitudini nella finestra flottante (solo lettura, sempre giornata di oggi)
function dwWinHabitsHTML(){
  const k=dwKey(realToday()),active=HABITS.filter(h=>h.active);
  if(!active.length)return '';
  let rows='<div class="whh">'+tr('dw_habits')+'</div>';
  active.forEach(h=>{const name=bdEsc(habitName(h));
    if(h.kind==='timer'){rows+='<div class="whb"><span class="whn">'+name+'</span><span class="whv">'+tr('dw_focus')+'</span></div>';}
    else if(h.target>0){const val=(h.done&&h.done[k])||0,pct=Math.min(100,Math.round(val/h.target*100));
      rows+='<div class="whb'+(val>=h.target?' done':'')+'"><span class="whn">'+name+'</span><span class="whv">'+val+'/'+h.target+'</span><i class="whbar"><b style="width:'+pct+'%"></b></i></div>';}
    else{const on=((h.done&&h.done[k])||0)>0;rows+='<div class="whb'+(on?' done':'')+'"><span class="whn">'+name+'</span><span class="whv">'+(on?'✓':'—')+'</span></div>';}});
  return rows;
}
function dwWinStyles(accent){
  return '*{box-sizing:border-box;margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;}'
    +'body{background:#161519;color:#ededec;padding:18px;-webkit-font-smoothing:antialiased;}'
    +'.whead{display:flex;align-items:center;gap:9px;font-size:16px;font-weight:600;}'
    +'.whead .dot{width:10px;height:10px;border-radius:50%;background:'+accent+';box-shadow:0 0 10px '+accent+';}'
    +'.wdate{font-size:12px;color:#8079a0;margin:3px 0 16px;text-transform:capitalize;}'
    +'.wrow{display:flex;gap:12px;align-items:center;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.06);}'
    +'.wt{width:46px;flex:none;color:'+accent+';font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;}'
    +'.wn{font-size:14.5px;}'
    +'.wrow.past{opacity:.4;}.wrow.past .wt{color:#8079a0;}'
    +'.wrow.done .wn{text-decoration:line-through;color:#7d7d82;}'
    +'.wnow{display:flex;align-items:center;gap:9px;font-size:11px;color:'+accent+';font-weight:700;margin:9px 0;}'
    +'.wnow span{flex:1;height:2px;background:'+accent+';border-radius:2px;}'
    +'.wempty{color:#8079a0;font-size:14px;padding:28px 0;text-align:center;}'
    +'.whh{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8079a0;font-weight:700;margin:20px 0 10px;}'
    +'.whb{display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;flex-wrap:wrap;}'
    +'.whb .whn{flex:1;}'
    +'.whb .whv{color:'+accent+';font-weight:600;font-size:13px;font-variant-numeric:tabular-nums;}'
    +'.whb.done .whv{color:#7ed0b0;}'
    +'.whbar{flex-basis:100%;height:4px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;margin-top:2px;}'
    +'.whbar b{display:block;height:100%;background:'+accent+';border-radius:3px;}';
}
function dwWinBody(){
  return '<div class="whead"><span class="dot"></span>'+tr('nav_desktop')+'</div><div class="wdate" id="wdate"></div><div id="wc"></div><div id="wh"></div>';
}
function paintDwWin(doc){
  try{
    const c=doc.getElementById('wc');if(c)c.innerHTML=dwWinContentHTML();
    const h=doc.getElementById('wh');if(h)h.innerHTML=dwWinHabitsHTML();
    const d=doc.getElementById('wdate');if(d){const nd=new Date();try{d.textContent=nd.toLocaleDateString(LOCALES[LANG],{weekday:'long',day:'numeric',month:'long'});}catch(e){}}
  }catch(e){}
}
function updateDwWindow(){
  if(!dwWin||dwWin.closed){if(dwWinTimer){clearInterval(dwWinTimer);dwWinTimer=null;}return;}
  paintDwWin(dwWin.document);
}
async function openDwWindow(){
  const accent=(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim())||'#b8a6f4';
  // Preferito: Document Picture-in-Picture → la finestra resta SEMPRE sopra le altre (Chrome/Edge).
  if(window.documentPictureInPicture&&documentPictureInPicture.requestWindow){
    try{
      const pip=await documentPictureInPicture.requestWindow({width:340,height:600});
      dwWin=pip;
      const st=pip.document.createElement('style');st.textContent=dwWinStyles(accent);pip.document.head.appendChild(st);
      try{pip.document.title='Workie · '+tr('nav_desktop');}catch(e){}
      pip.document.body.innerHTML=dwWinBody();
      paintDwWin(pip.document);
      if(dwWinTimer)clearInterval(dwWinTimer);
      dwWinTimer=setInterval(updateDwWindow,30000);
      pip.addEventListener('pagehide',()=>{if(dwWinTimer){clearInterval(dwWinTimer);dwWinTimer=null;}dwWin=null;});
      return;
    }catch(e){/* non supportato o negato: ripiego sul popup */}
  }
  // Fallback: finestra popup normale (non può stare sempre sopra).
  const w=window.open('','workieDaily','width=340,height=600,menubar=no,toolbar=no,location=no,status=no');
  if(!w){showToast(tr('dw_win_blocked'));return;}
  dwWin=w;
  w.document.open();
  w.document.write('<!doctype html><html lang="'+LANG+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Workie · '+tr('nav_desktop')+'</title><style>'+dwWinStyles(accent)+'</style></head><body>'+dwWinBody()+'</body></html>');
  w.document.close();
  paintDwWin(w.document);
  if(dwWinTimer)clearInterval(dwWinTimer);
  dwWinTimer=setInterval(updateDwWindow,30000);
  try{w.focus();}catch(e){}
}
{const _dwb=document.getElementById('dwWidgetBtn');if(_dwb)_dwb.addEventListener('click',openDwWindow);}

// ===== SOCIAL (messaggi + call) — locale ora; con l'account collegato (Supabase) diventa condiviso tra persone =====
let SOCIAL=(function(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_social')));if(Array.isArray(s))return s.filter(c=>c&&typeof c==='object').map(c=>({id:c.id,name:c.name||'Chat',msgs:Array.isArray(c.msgs)?c.msgs:[],connId:c.connId,teamId:c.teamId}));}catch(e){}return [];})();
let SOCIAL_CONN=[];      // connessioni: accettate + richieste in uscita (da Supabase)
let SOCIAL_INVITES=[];   // richieste ricevute (da Supabase)
let SOC_RECENT=[];       // chat 1:1 recenti (da messages)
let SOC_ME=null, socMsgCache={}, socRT=null, socRefreshing=false;
function saveSocInv(){}
let socCur=null,socTeam=null,socSearch='',socTab='recent';
function saveSocial(){try{localStorage.setItem(ukey('workie_social'),JSON.stringify(SOCIAL));}catch(e){}}
function saveSocConn(){}
const SOC_COLORS=['#7b5cff','#f0576c','#2bb673','#f0a93b','#3b9df0','#9b5de5','#e8617a','#2bb3a3'];
function socHash(s){let h=0;s=String(s||'');for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h;}
function socColor(id){const n=(typeof id==='number')?id:socHash(id);return SOC_COLORS[Math.abs(n)%SOC_COLORS.length];}
function socInitials(n){return (n||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'?';}
function socTime(ts){try{const d=new Date(ts);return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);}catch(e){return '';}}
function socOnPage(){const p=document.querySelector('.page.active');return !!(p&&p.dataset.page==='social');}
function socAv(u){return u&&u.photo?'<img src="'+u.photo+'" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">':socInitials(u&&u.name);}
// ---- backend Supabase: connessioni + messaggi reali tra persone ----
async function socMe(){if(SOC_ME)return SOC_ME;if(!sb)return null;try{const{data:{user}}=await sb.auth.getUser();SOC_ME=user?user.id:null;}catch(e){}return SOC_ME;}
function socProf(p,uid){const nm=(((p&&p.name||'')+' '+(p&&p.surname||'')).trim())||'Utente';return{id:uid,uid:uid,email:uid,name:nm,username:(p&&p.username)||'',handle:(p&&p.username)?('@'+p.username):'',bio:(p&&p.bio)||'',photo:(p&&p.photo)||'',socials:(p&&p.socials&&typeof p.socials==='object')?p.socials:{},website:(p&&p.website)||'',share:(p&&p.share&&typeof p.share==='object')?p.share:{},joinTs:(p&&p.created_at)?new Date(p.created_at).getTime():0};}
async function sbLoadSocial(){if(!sb)return false;const me=await socMe();if(!me)return false;
  const{data,error}=await sb.from('connections').select('id,status,from_id,to_id,created_at').or('from_id.eq.'+me+',to_id.eq.'+me).order('created_at',{ascending:false});
  if(error){console.warn('social',error.message);return false;}
  const rows=data||[];const others=[...new Set(rows.map(r=>r.from_id===me?r.to_id:r.from_id).filter(Boolean))];
  let profs={};if(others.length){const{data:pd}=await sb.from('profiles').select('*').in('id',others);(pd||[]).forEach(p=>profs[p.id]=p);}
  const conns=[],invs=[];
  rows.forEach(r=>{const fromMe=r.from_id===me;const oid=fromMe?r.to_id:r.from_id;if(!oid)return;const u=socProf(profs[oid],oid);u.connId=r.id;u.status=r.status;u.dir=fromMe?'out':'in';
    if(r.status==='accepted')conns.push(u);else if(r.status==='pending'){fromMe?conns.push(u):invs.push(u);}});
  SOCIAL_CONN=conns;SOCIAL_INVITES=invs;return true;}
async function sbLoadRecent(){if(!sb)return;const me=await socMe();if(!me)return;
  const{data}=await sb.from('messages').select('id,from_id,to_id,text,created_at').or('from_id.eq.'+me+',to_id.eq.'+me).order('created_at',{ascending:false}).limit(200);
  const seen={},list=[];(data||[]).forEach(m=>{const o=m.from_id===me?m.to_id:m.from_id;if(!o||seen[o])return;seen[o]=1;list.push({uid:o,id:o,prev:(m.from_id===me?tr('soc_you')+' ':'')+(m.text||''),ts:m.created_at?new Date(m.created_at).getTime():0});});
  list.forEach(it=>{const c=SOCIAL_CONN.find(x=>x.uid===it.uid);it.name=c?c.name:'Utente';it.photo=c?c.photo:'';it.handle=c?c.handle:'';});
  SOC_RECENT=list;}
async function socRefresh(rerender){if(!sb||socRefreshing)return;socRefreshing=true;try{const ok=await sbLoadSocial();if(ok)await sbLoadRecent();}catch(e){}socRefreshing=false;renderSocBell();const w=document.querySelector('.soc-bellwrap');if(w&&w.classList.contains('open'))renderSocNotif();if(rerender!==false&&socOnPage())renderSocConvs();}
async function sbConnect(otherId){if(!sb)return null;const me=await socMe();if(!me||!otherId||otherId===me)return null;
  const{data}=await sb.from('connections').select('*').or('and(from_id.eq.'+me+',to_id.eq.'+otherId+'),and(from_id.eq.'+otherId+',to_id.eq.'+me+')');
  const row=(data||[])[0];
  if(row){if(row.status==='accepted')return'accepted';
    if(row.to_id===me){await sb.from('connections').update({status:'accepted'}).eq('id',row.id);return'accepted';}
    if(row.from_id===me&&row.status==='declined'){await sb.from('connections').update({status:'pending'}).eq('id',row.id);return'pending';}
    return row.status;}
  const{error}=await sb.from('connections').insert({from_id:me,to_id:otherId,status:'pending'});
  if(error){console.warn('connect',error.message);return null;}
  try{const nm=(USER&&(USER.name||USER.username))||'Qualcuno';pushSend(otherId,{title:tr('push_invite_title')||'Nuovo invito',body:nm+' '+(tr('push_invite_body')||'vuole connettersi con te'),url:'/',tag:'invite-'+me});}catch(e){}
  return'pending';}
async function sbSendMsg(otherId,text){if(!sb)return null;const me=await socMe();if(!me)return null;try{const{data,error}=await sb.from('messages').insert({from_id:me,to_id:otherId,text:text}).select().single();if(error){console.warn('send',error.message);return null;}
  try{const nm=(USER&&(USER.name||USER.username))||'Nuovo messaggio';pushSend(otherId,{title:nm,body:(text||'').slice(0,140),url:'/',tag:'msg-'+me});}catch(e){}
  return data;}catch(e){return null;}}
async function socReloadChat(uid){if(!sb||!uid)return;const me=await socMe();if(!me)return;
  const{data}=await sb.from('messages').select('id,from_id,to_id,text,created_at').or('and(from_id.eq.'+me+',to_id.eq.'+uid+'),and(from_id.eq.'+uid+',to_id.eq.'+me+')').order('created_at',{ascending:true}).limit(500);
  socMsgCache[uid]=(data||[]).map(m=>({id:m.id,me:m.from_id===me,text:m.text||'',ts:m.created_at?new Date(m.created_at).getTime():nowTs()}));
  if(socCur===uid)renderSocMain();}
function socActive(){if(socCur){const c=SOCIAL_CONN.find(x=>x.uid===socCur)||SOC_RECENT.find(x=>x.uid===socCur)||{};return{kind:'user',key:socCur,name:c.name||'Utente',photo:c.photo||'',handle:c.handle||'',msgs:socMsgCache[socCur]||[]};}
  if(socTeam){const c=SOCIAL.find(x=>x.teamId===socTeam)||{};return{kind:'team',key:socTeam,name:c.name||'Team',photo:'',handle:'',msgs:c.msgs||[]};}return null;}
const SOC_SEND_IC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
function syncSocTabs(){document.querySelectorAll('#socTabs .soc-tab').forEach(b=>b.classList.toggle('on',b.dataset.soctab===socTab));}
function renderSocConvs(){
  const el=document.getElementById('socConvs');if(!el)return;
  const q=socSearch.trim().toLowerCase();
  if(socTab==='conn'){
    const list=SOCIAL_CONN.filter(c=>!q||c.name.toLowerCase().includes(q)||(c.handle||'').toLowerCase().includes(q));
    if(!list.length){el.innerHTML='<div class="soc-empty">'+(SOCIAL_CONN.length?tr('soc_no_results'):tr('soc_conn_empty'))+'</div>';return;}
    el.innerHTML=list.map(c=>{const pend=c.status==='pending';return '<div class="soc-conv'+(socCur===c.uid?' on':'')+'" data-socconn="'+bdEsc(c.uid)+'"><div class="soc-av" style="background:'+socColor(c.uid)+'">'+socAv(c)+'</div><div class="soc-cmain"><div class="soc-cname">'+bdEsc(c.name)+'</div>'+(c.handle?'<div class="soc-cprev">'+bdEsc(c.handle)+'</div>':'')+'</div>'+(pend?'<span class="soc-pending">'+tr('soc_pending')+'</span>':'<span class="soc-connchat" title="'+tr('soc_message')+'">'+SVG.bubble+'</span>')+'</div>';}).join('');
    return;
  }
  if(socTab==='team'){
    const teams=(typeof TEAMS!=='undefined'&&Array.isArray(TEAMS))?TEAMS:[];
    const list=teams.filter(t=>{const nm=(typeof teamName==='function'?teamName(t):t.name)||'';return !q||nm.toLowerCase().includes(q);});
    if(!list.length){el.innerHTML='<div class="soc-empty">'+tr('soc_team_empty')+'</div>';return;}
    el.innerHTML=list.map(t=>{const nm=(typeof teamName==='function'?teamName(t):t.name)||'Team';const mem=(t.members?t.members.length:0);return '<div class="soc-conv'+(socTeam===t.tid?' on':'')+'" data-socteam="'+t.tid+'"><div class="soc-av" style="background:#574a7a">'+socInitials(nm)+'</div><div class="soc-cmain"><div class="soc-cname">'+bdEsc(nm)+'</div><div class="soc-cprev">'+mem+' '+tr('members')+'</div></div><span class="soc-connchat" title="'+tr('soc_message')+'">'+SVG.bubble+'</span></div>';}).join('');
    return;
  }
  const list=SOC_RECENT.filter(c=>!q||(c.name||'').toLowerCase().includes(q)||(c.prev||'').toLowerCase().includes(q));
  if(!list.length){el.innerHTML='<div class="soc-empty">'+(SOC_RECENT.length?tr('soc_no_results'):tr('soc_empty_recent'))+'</div>';return;}
  el.innerHTML=list.map(c=>'<div class="soc-conv'+(socCur===c.uid?' on':'')+'" data-socopen="'+bdEsc(c.uid)+'"><div class="soc-av" style="background:'+socColor(c.uid)+'">'+socAv(c)+'</div><div class="soc-cmain"><div class="soc-cname">'+bdEsc(c.name)+'</div><div class="soc-cprev">'+bdEsc(c.prev||tr('soc_no_msg'))+'</div></div></div>').join('');
}
function renderSocMain(){
  const el=document.getElementById('socMain');if(!el)return;
  const c=socActive();
  if(!c){el.innerHTML='<div class="soc-blank"><span class="soc-blank-ic">'+SVG.bubble+'</span><div>'+tr('soc_pick')+'</div></div>';return;}
  const msgs=(c.msgs||[]);
  const bubbles=msgs.length?msgs.map(m=>'<div class="soc-b '+(m.me?'me':'them')+'">'+bdEsc(m.text)+'<div class="soc-t">'+socTime(m.ts)+'</div></div>').join(''):'<div class="soc-day">'+tr('soc_start_hint')+'</div>';
  el.innerHTML=
    '<div class="soc-chead"><button class="soc-back" data-socback aria-label="Indietro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><div class="soc-av" style="background:'+socColor(c.key)+'">'+socAv(c)+'</div>'
    +'<div class="soc-chead-info"><div class="soc-chead-name">'+bdEsc(c.name)+'</div>'+(c.handle?'<div class="soc-chead-sub">'+bdEsc(c.handle)+'</div>':'')+'</div>'
    +'<div class="soc-callbtns"><button class="soc-callbtn" data-soccall="audio" title="'+tr('soc_call_audio')+'">'+SVG.phone+'</button><button class="soc-callbtn" data-soccall="video" title="'+tr('soc_call_video')+'">'+SVG.video+'</button></div></div>'
    +'<div class="soc-msgs" id="socMsgs">'+bubbles+'</div>'
    +'<div class="soc-inrow"><textarea id="socInput" class="soc-input" rows="1" placeholder="'+tr('soc_msg_ph')+'"></textarea><button class="soc-send" id="socSend">'+SOC_SEND_IC+'</button></div>';
  const mm=document.getElementById('socMsgs');if(mm)mm.scrollTop=mm.scrollHeight;
}
function renderSocial(){renderSocConvs();renderSocMain();if(sb)socRefresh(true);}
async function socSendMsg(){
  const inp=document.getElementById('socInput');if(!inp)return;
  const txt=inp.value.trim();if(!txt)return;
  const c=socActive();if(!c)return;
  inp.value='';inp.style.height='';
  if(c.kind==='team'){const t=SOCIAL.find(x=>x.teamId===c.key);if(t){t.msgs=t.msgs||[];t.msgs.push({me:true,text:txt,ts:nowTs()});saveSocial();}renderSocMain();return;}
  const uid=c.key;socMsgCache[uid]=socMsgCache[uid]||[];socMsgCache[uid].push({id:'tmp'+nowTs(),me:true,text:txt,ts:nowTs()});renderSocMain();
  if(sb){const row=await sbSendMsg(uid,txt);if(row){socReloadChat(uid);sbLoadRecent().then(()=>{if(socTab==='recent'&&socOnPage())renderSocConvs();});}}
}
function socShowChat(on){const p=document.querySelector('.soc-page');if(p)p.classList.toggle('chat-open',on!==false);}
function socCloseChat(){socCur=null;socTeam=null;const p=document.querySelector('.soc-page');if(p)p.classList.remove('chat-open');renderSocConvs();renderSocMain();}
function socOpenConn(uid){if(!uid)return;socCur=uid;socTeam=null;socShowChat(true);renderSocConvs();renderSocMain();if(sb)socReloadChat(uid);}
function socOpenTeam(tid){
  const t=((typeof TEAMS!=='undefined'&&TEAMS)||[]).find(x=>x.tid===tid);if(!t)return;
  const nm=(typeof teamName==='function'?teamName(t):t.name)||'Team';
  let c=SOCIAL.find(x=>x.teamId===tid);
  if(!c){const id=(SOCIAL.reduce((m,x)=>Math.max(m,x.id||0),0)||0)+1;c={id,name:nm,teamId:tid,msgs:[]};SOCIAL.unshift(c);saveSocial();}
  else if(c.name!==nm){c.name=nm;saveSocial();}
  socTeam=tid;socCur=null;socShowChat(true);renderSocConvs();renderSocMain();
}
function socOpenAdd(){document.getElementById('socAddSearch').value='';renderSocAddResults('');document.getElementById('socAddModal').classList.add('open');setTimeout(()=>document.getElementById('socAddSearch').focus(),30);}
function socCloseAdd(){document.getElementById('socAddModal').classList.remove('open');}
let socLastResults=[],socSearchToken=0;
async function renderSocAddResults(q){
  const el=document.getElementById('socAddResults');if(!el)return;
  q=(q||'').trim();
  if(!q){el.innerHTML='<div class="soc-addhint">'+tr('soc_add_hint')+'</div>';return;}
  const token=++socSearchToken;
  el.innerHTML='<div class="soc-addhint">'+tr('soc_searching')+'</div>';
  let users;
  if(sb){users=await sbSearchUsers(q);}
  else{const low=q.toLowerCase().replace(/^@/,'');users=(typeof workieUsers==='function'?workieUsers():[]).filter(u=>u.name.toLowerCase().includes(low)||(u.username||'').toLowerCase().includes(low));}
  if(token!==socSearchToken)return;
  socLastResults=users;
  if(!users.length){el.innerHTML='<div class="soc-addhint">'+tr('soc_no_user')+'</div>';return;}
  el.innerHTML=users.map(u=>'<div class="soc-addres" data-adduser="'+bdEsc(u.email)+'"><div class="soc-av" style="background:'+socColor((u.email.length||1)+3)+'">'+(u.photo?'<img src="'+u.photo+'" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">':socInitials(u.name))+'</div><div class="soc-cmain"><div class="soc-cname">'+bdEsc(u.name)+'</div><div class="soc-cprev">'+bdEsc(u.handle||u.username||'')+'</div></div><span class="soc-addopen">'+SVG.next+'</span></div>').join('');
}
// --- Call (usa la fotocamera reale come anteprima; la connessione tra persone arriva con il backend) ---
let socCallStream=null,socCallState={mic:true,cam:true};
async function socStartCall(video){
  const c=socActive();if(!c)return;
  document.getElementById('socCallName').textContent=c.name;
  const st=document.getElementById('socCallStatus');st.textContent=tr('soc_call_connecting');
  document.getElementById('socCall').classList.add('open');
  const vidEl=document.getElementById('socCallVideo');
  try{
    socCallStream=await navigator.mediaDevices.getUserMedia({video:!!video,audio:true});
    vidEl.srcObject=socCallStream;socCallState={mic:true,cam:!!video};updateSocCallBtns();
    setTimeout(()=>{if(document.getElementById('socCall').classList.contains('open'))st.textContent=tr('soc_call_demo');},1400);
  }catch(e){st.textContent=tr('soc_call_nomedia');}
}
function socEndCall(){
  document.getElementById('socCall').classList.remove('open');
  if(socCallStream){try{socCallStream.getTracks().forEach(t=>t.stop());}catch(e){}socCallStream=null;}
  const v=document.getElementById('socCallVideo');if(v)v.srcObject=null;
}
function updateSocCallBtns(){
  const mic=document.getElementById('socCallMic'),cam=document.getElementById('socCallCam');
  if(mic)mic.classList.toggle('off',!socCallState.mic);
  if(cam)cam.classList.toggle('off',!socCallState.cam);
}
// eventi
document.getElementById('socAddBtn').addEventListener('click',socOpenAdd);
document.getElementById('socAddCancel').addEventListener('click',socCloseAdd);
document.getElementById('socAddSearch').addEventListener('input',e=>renderSocAddResults(e.target.value));
document.getElementById('socAddModal').addEventListener('click',e=>{if(e.target.id==='socAddModal')socCloseAdd();});
document.getElementById('socTabs').addEventListener('click',e=>{const t=e.target.closest('[data-soctab]');if(!t)return;socTab=t.dataset.soctab;socSearch='';document.getElementById('socSearch').value='';syncSocTabs();renderSocConvs();});
// --- Notifiche / inviti a collegarsi ---
function renderSocBell(){const b=document.getElementById('socBellBadge');if(!b)return;const n=(SOCIAL_INVITES||[]).length;b.textContent=n;b.style.display=n?'flex':'none';}
function renderSocNotif(){const el=document.getElementById('socNotif');if(!el)return;
  let html='<div class="soc-notif-h">'+tr('soc_notif_title')+'</div>';
  if(!(SOCIAL_INVITES||[]).length)html+='<div class="soc-notif-empty">'+tr('soc_notif_empty')+'</div>';
  else html+=SOCIAL_INVITES.map(inv=>'<div class="soc-inv"><div class="soc-av" style="background:'+socColor(inv.uid)+'">'+socAv(inv)+'</div><div class="soc-inv-main"><div class="soc-inv-name">'+bdEsc(inv.name)+'</div><div class="soc-inv-sub">'+tr('soc_wants_connect')+'</div></div><div class="soc-inv-btns"><button class="soc-inv-acc" data-invacc="'+inv.connId+'">'+tr('soc_accept')+'</button><button class="soc-inv-dec" data-invdec="'+inv.connId+'">'+tr('soc_decline')+'</button></div></div>').join('');
  el.innerHTML=html;
}
async function socAcceptInvite(connId){if(!sb)return;await sb.from('connections').update({status:'accepted'}).eq('id',connId);await socRefresh(false);renderSocNotif();if(socOnPage())renderSocConvs();if(typeof showToast==='function')showToast(tr('soc_connected'));}
async function socDeclineInvite(connId){if(!sb)return;await sb.from('connections').update({status:'declined'}).eq('id',connId);await socRefresh(false);renderSocNotif();}
document.getElementById('socBell').addEventListener('click',e=>{e.stopPropagation();const w=document.querySelector('.soc-bellwrap');w.classList.toggle('open');if(w.classList.contains('open'))renderSocNotif();});
document.getElementById('socNotif').addEventListener('click',e=>{const a=e.target.closest('[data-invacc]');if(a){socAcceptInvite(+a.dataset.invacc);return;}const d=e.target.closest('[data-invdec]');if(d){socDeclineInvite(+d.dataset.invdec);return;}});
document.addEventListener('click',e=>{const w=document.querySelector('.soc-bellwrap');if(w&&!w.contains(e.target))w.classList.remove('open');});
renderSocBell();
// --- Realtime (se abilitato sulle tabelle) + polling di sicurezza ---
function socSubscribe(){if(!sb||socRT)return;socMe().then(me=>{if(!me)return;try{socRT=sb.channel('soc:'+me)
  .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:'to_id=eq.'+me},p=>{const m=p.new;if(!m)return;const o=m.from_id;if(socMsgCache[o]){if(!socMsgCache[o].some(x=>x.id===m.id))socMsgCache[o].push({id:m.id,me:false,text:m.text||'',ts:m.created_at?new Date(m.created_at).getTime():nowTs()});if(socCur===o)renderSocMain();}sbLoadRecent().then(()=>{if(socOnPage()&&socTab==='recent')renderSocConvs();});})
  .on('postgres_changes',{event:'*',schema:'public',table:'connections'},()=>{socRefresh(false).then(()=>{if(socOnPage())renderSocConvs();});})
  .subscribe();}catch(e){}});}
if(sb){socRefresh(false);socSubscribe();
  setInterval(()=>{if(document.hidden)return;if(socOnPage()){socRefresh(false).then(()=>{if(socOnPage())renderSocConvs();});if(socCur)socReloadChat(socCur);}else{socRefresh(false);}},12000);
  window.addEventListener('focus',()=>{if(sb)socRefresh(false);});
}

// ---------- Avviso "nuova versione disponibile" (auto: confronta l'ETag di index.html) ----------
(function(){
  let appTag=null,ubShown=false;
  async function getTag(){try{const r=await fetch('index.html',{method:'HEAD',cache:'no-store'});return r.headers.get('etag')||r.headers.get('last-modified')||null;}catch(e){return null;}}
  function showUpdate(){if(ubShown)return;ubShown=true;const b=document.getElementById('updateBanner');if(b)b.style.display='flex';}
  const rb=document.getElementById('updateBanner');
  if(rb)rb.addEventListener('click',()=>{try{if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});}catch(e){}location.reload();});
  async function check(){const t=await getTag();if(t&&appTag&&t!==appTag)showUpdate();}
  (async function(){appTag=await getTag();})();
  setInterval(check,90000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)check();});
  window.addEventListener('focus',check);
})();
document.getElementById('socSearch').addEventListener('input',e=>{socSearch=e.target.value;renderSocConvs();});
document.getElementById('socCallEnd').addEventListener('click',socEndCall);
document.getElementById('socCallMic').addEventListener('click',()=>{if(!socCallStream)return;socCallState.mic=!socCallState.mic;socCallStream.getAudioTracks().forEach(t=>t.enabled=socCallState.mic);updateSocCallBtns();});
document.getElementById('socCallCam').addEventListener('click',()=>{if(!socCallStream)return;socCallState.cam=!socCallState.cam;socCallStream.getVideoTracks().forEach(t=>t.enabled=socCallState.cam);updateSocCallBtns();});
document.addEventListener('click',e=>{
  const au=e.target.closest('[data-adduser]');if(au){const u=(socLastResults||[]).find(x=>x.email===au.dataset.adduser)||(typeof workieUserByEmail==='function'?workieUserByEmail(au.dataset.adduser):null);if(u){socCloseAdd();openVisitorProfile(Object.assign({},u));}return;}
  const cn=e.target.closest('[data-socconn]');if(cn){const conn=SOCIAL_CONN.find(c=>c.uid===cn.dataset.socconn);if(!conn)return;if(conn.status==='pending'){openVisitorProfile(conn);return;}if(e.target.closest('.soc-connchat')){socOpenConn(conn.uid);}else{openVisitorProfile(conn);}return;}
  const op=e.target.closest('[data-socopen]');if(op){socOpenConn(op.dataset.socopen);return;}
  const tm=e.target.closest('[data-socteam]');if(tm){socOpenTeam(+tm.dataset.socteam);return;}
  if(e.target.closest('#socSend')){socSendMsg();return;}
  if(e.target.closest('[data-socback]')){socCloseChat();return;}
  const cb=e.target.closest('[data-soccall]');if(cb){socStartCall(cb.dataset.soccall==='video');return;}
});
document.addEventListener('keydown',e=>{
  if(e.target&&e.target.id==='socInput'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();socSendMsg();}
  if(e.target&&e.target.id==='socAddSearch'&&e.key==='Enter'){e.preventDefault();const first=document.querySelector('#socAddResults [data-adduser]');if(first)first.click();}
  if(e.key==='Escape'){if(document.getElementById('socAddModal').classList.contains('open'))socCloseAdd();else if(document.getElementById('socCall').classList.contains('open'))socEndCall();}
});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='socInput'){const t=e.target;t.style.height='auto';t.style.height=Math.min(120,t.scrollHeight)+'px';}});
document.getElementById('dwDays').addEventListener('click',e=>{const d=e.target.closest('[data-dwday]');if(!d)return;const p=d.dataset.dwday.split('-').map(Number);dwDay=[p[0],p[1]-1,p[2]];renderDaily();});
document.getElementById('dwPrev').addEventListener('click',()=>{const d=new Date(dwDay[0],dwDay[1],dwDay[2]);d.setDate(d.getDate()-7);dwDay=[d.getFullYear(),d.getMonth(),d.getDate()];renderDaily();});
document.getElementById('dwNext').addEventListener('click',()=>{const d=new Date(dwDay[0],dwDay[1],dwDay[2]);d.setDate(d.getDate()+7);dwDay=[d.getFullYear(),d.getMonth(),d.getDate()];renderDaily();});
document.getElementById('dwTimeline').addEventListener('click',e=>{const c=e.target.closest('[data-fcheck]');if(!c)return;const parts=c.dataset.fcheck.split(':'),kind=parts[0],id=+parts[1];
  if(kind==='act'){const r=RITUALS.find(x=>x.id===id);if(r){if(!r.done)r.done={};const k=dwKey(dwDay);r.done[k]=!r.done[k];saveRituals();}}
  else{const t=TASKS.find(x=>x.id===id);if(t){setTaskDone(t,!t.done);saveTasks();renderHomeAlerts();}}
  renderDwTimeline();renderDwAlerts();
});
document.getElementById('dwHabits').addEventListener('click',e=>{
  const wt=e.target.closest('[data-wt]');if(wt){const op=wt.dataset.wt;
    if(op==='start')walkT={running:true,paused:false,phase:'focus',endTs:Date.now()+FOCUS_MS,leftMs:FOCUS_MS};
    else if(op==='pause'){if(walkT.paused){walkT.endTs=Date.now()+walkT.leftMs;walkT.paused=false;}else{walkT.leftMs=walkT.endTs-Date.now();walkT.paused=true;}}
    else if(op==='reset')walkT={running:false,paused:false,phase:'focus',endTs:0,leftMs:FOCUS_MS};
    updateWalkCard();return;}
  const hb=e.target.closest('[data-hab]');if(hb){const parts=hb.dataset.hab.split(':'),id=+parts[0],op=parts[1];const h=HABITS.find(x=>x.id===id);if(!h)return;if(!h.done)h.done={};const k=dwKey(dwDay);let v=h.done[k]||0;
    if(op==='+')v=Math.min(h.target,v+1);else if(op==='-')v=Math.max(0,v-1);else v=v>0?0:1;
    h.done[k]=v;saveHabits();renderDwHabits();renderDwAlerts();return;}
});
let setupDay=dwWd();
let setupEdit=null; // id attività in modifica, o null = modalità "aggiungi"
let seDays=[];      // giorni selezionati nell'editor a destra
let seEmoji='';     // emoji scelta per l'attività ('' = automatica dal nome)
// palette emoji per le attività della giornata
const SE_EMOJIS=['⏰','🌅','💼','💻','📞','✍️','📚','📝','🧠','🎧','☕','🍽️','🥐','🍷','🏋️','🚶','🧘','🚴','🛒','🧹','🐶','🎮','🎨','🩺','✈️','💧','🌙','🛌'];
function seEmojiPreview(){if(seEmoji)return seEmoji;const n=(document.getElementById('seName')||{}).value||'';return n.trim()?dwWheelEmoji(n):'📌';}
function renderSetupTabs(){const el=document.getElementById('setupDayTabs');if(!el)return;const dows=DOWS[LANG]||DOWS.it;el.innerHTML=dows.map((d,i)=>'<span class="setup-daytab'+(i===setupDay?' on':'')+'" data-setupday="'+i+'">'+d+'</span>').join('');}
function renderSetupProfiles(){const sel=document.getElementById('setupProfileSel');if(!sel)return;sel.innerHTML=PROFILES.map(p=>'<option value="'+p.id+'"'+(p.id===activeProfile?' selected':'')+'>'+bdEsc(p.name)+'</option>').join('');document.getElementById('setupProfDel').style.visibility=PROFILES.length>1?'visible':'hidden';}
function dwDayBadge(days){days=Array.isArray(days)?days:[];
  if(days.length>=7)return tr('dw_everyday');
  if(days.length===5&&[0,1,2,3,4].every(d=>days.includes(d)))return tr('dw_weekdays');
  if(days.length===2&&days.includes(5)&&days.includes(6))return tr('dw_weekend');
  const dows=DOWS[LANG]||DOWS.it;return days.slice().sort((a,b)=>a-b).map(i=>dows[i]).join(' · ')||tr('dw_no_days');}
function renderSeDays(){const el=document.getElementById('seDaysWrap');if(!el)return;const dows=DOWS[LANG]||DOWS.it;
  const quick=[['dw_everyday',[0,1,2,3,4,5,6]],['dw_weekdays',[0,1,2,3,4]],['dw_weekend',[5,6]]];
  const same=a=>a.length===seDays.length&&a.every(d=>seDays.includes(d));
  el.innerHTML='<div class="se-quick">'+quick.map(q=>'<span class="se-qchip'+(same(q[1])?' on':'')+'" data-sequick="'+q[1].join('-')+'">'+tr(q[0])+'</span>').join('')+'</div>'
    +'<div class="se-days">'+dows.map((d,i)=>'<span class="se-day'+(seDays.includes(i)?' on':'')+'" data-seday="'+i+'">'+d+'</span>').join('')+'</div>';}
function renderSetupEditor(){const el=document.getElementById('setupEditor');if(!el)return;
  const editing=setupEdit!=null;let r=editing?RITUALS.find(x=>x.id===setupEdit):null;if(editing&&!r){setupEdit=null;}
  const nameV=r?bdEsc(r.name).replace(/"/g,'&quot;'):'',timeV=(r&&r.time)?r.time:'';
  el.innerHTML='<div class="se-h">'+tr(editing?'dw_edit_act':'dw_new_act')+'</div>'
    +'<label class="field-label se-right-lbl">'+tr('dw_act_name')+'</label><input id="seName" class="modal-search" style="margin:0 0 13px" value="'+nameV+'" placeholder="'+tr('dw_activity_ph')+'">'
    +'<label class="field-label se-right-lbl">'+tr('dw_act_emoji')+'</label>'
    +'<div class="se-emoji-wrap"><span class="se-emoji-prev" id="seEmojiPrev">'+seEmojiPreview()+'</span><div class="se-emoji-grid">'
      +'<button type="button" class="se-emoji-btn se-emoji-auto'+(seEmoji===''?' on':'')+'" data-seemoji="">'+tr('dw_auto')+'</button>'
      +SE_EMOJIS.map(e=>'<button type="button" class="se-emoji-btn'+(seEmoji===e?' on':'')+'" data-seemoji="'+e+'">'+e+'</button>').join('')
    +'</div></div>'
    +'<label class="field-label se-right-lbl">'+tr('dw_act_time')+'</label><input id="seTime" type="time" class="modal-search" style="margin:0 0 13px;max-width:150px" value="'+timeV+'">'
    +'<label class="field-label se-right-lbl">'+tr('dw_repeat')+'</label><div id="seDaysWrap"></div>'
    +'<div class="se-actions">'+(editing
      ?'<button class="btn-primary-sm accent" id="seSave">'+tr('dw_save')+'</button><button class="danger-btn" id="seDelete">'+tr('dw_del_act')+'</button><button class="se-cancel" id="seCancel">＋ '+tr('dw_new_act')+'</button>'
      :'<button class="btn-primary-sm accent" id="seAdd">'+tr('add')+'</button>')+'</div>';
  renderSeDays();}
function renderSetup(){
  renderSetupProfiles();renderSetupTabs();
  const el=document.getElementById('setupList');
  if(el){const acts=RITUALS.filter(r=>r.pid===activeProfile&&Array.isArray(r.days)&&r.days.includes(setupDay)).sort((a,b)=>(a.time||'99').localeCompare(b.time||'99'));
    if(!acts.length){el.innerHTML='<div class="dw-noitems" style="padding:28px 4px;text-align:center">'+tr('dw_no_setup_day')+'</div>';}
    else{let html='';acts.forEach((r,idx)=>{
      html+='<div class="stl-item'+(setupEdit===r.id?' active':'')+'"><div class="stl-time">'+(r.time||'—')+'</div><div class="stl-body"><div class="stl-box"><span class="stl-emoji">'+(r.emoji||dwWheelEmoji(r.name))+'</span><span class="stl-name">'+bdEsc(r.name)+'</span><button class="stl-edit" data-actedit="'+r.id+'">'+tr('dw_edit')+'</button></div><span class="stl-badge">'+dwDayBadge(r.days)+'</span></div></div>';
      const next=acts[idx+1];
      if(r.time&&next&&next.time){const a=dwMins(r.time),b=dwMins(next.time);let n=0,ticks='';for(let m=Math.ceil((a+1)/30)*30;m<b&&n<8;m+=30,n++){ticks+='<div class="stl-tick"><span>'+('0'+Math.floor(m/60)).slice(-2)+':'+('0'+(m%60)).slice(-2)+'</span></div>';}if(ticks)html+='<div class="stl-gap">'+ticks+'</div>';}
    });el.innerHTML=html;}}
  renderSetupEditor();
}
{const setupOv=document.getElementById('setupOverlay');
function openDaySetup(){setupDay=dwWd();setupEdit=null;seDays=[setupDay];renderSetup();setupOv.classList.add('open');}
document.getElementById('dwSetup').addEventListener('click',()=>{if(typeof go==='function')go('planday');});
{const rb=document.getElementById('dwRoutine');if(rb)rb.addEventListener('click',openDaySetup);}
document.addEventListener('click',e=>{if(e.target.closest('[data-opensetup]')){if(typeof go==='function')go('desktop');openDaySetup();}});
document.getElementById('setupX').addEventListener('click',()=>{setupOv.classList.remove('open');renderDaily();});
setupOv.addEventListener('click',e=>{if(e.target===setupOv){setupOv.classList.remove('open');renderDaily();}});
document.getElementById('setupProfileSel').addEventListener('change',e=>{activeProfile=+e.target.value;saveProfiles();setupEdit=null;seDays=[setupDay];renderSetup();});
document.getElementById('setupProfNew').addEventListener('click',()=>{const n=(window.prompt(tr('dw_new_profile'))||'').trim();if(n){const id=PROF_SEQ++;PROFILES.push({id,name:n});activeProfile=id;saveProfiles();renderSetup();}});
document.getElementById('setupProfRename').addEventListener('click',()=>{const p=PROFILES.find(x=>x.id===activeProfile);if(!p)return;const n=(window.prompt(tr('dw_rename_profile'),p.name)||'').trim();if(n){p.name=n;saveProfiles();renderSetup();if(typeof renderDwWidget==='function')renderDwWidget();}});
document.getElementById('setupProfDel').addEventListener('click',()=>{if(PROFILES.length<=1)return;const id=activeProfile;askConfirm(tr('dw_prof_del'),()=>{PROFILES=PROFILES.filter(p=>p.id!==id);RITUALS=RITUALS.filter(r=>r.pid!==id);activeProfile=PROFILES[0].id;saveProfiles();saveRituals();renderSetup();});});
document.getElementById('setupDayTabs').addEventListener('click',e=>{const t=e.target.closest('[data-setupday]');if(t){setupDay=+t.dataset.setupday;renderSetup();}});
document.getElementById('setupList').addEventListener('click',e=>{const ed=e.target.closest('[data-actedit]');if(ed){const id=+ed.dataset.actedit;const r=RITUALS.find(x=>x.id===id);if(r){setupEdit=id;seDays=(Array.isArray(r.days)?r.days:[]).slice();seEmoji=r.emoji||'';renderSetup();}}});
{const edp=document.getElementById('setupEditor');
edp.addEventListener('click',e=>{
  const q=e.target.closest('[data-sequick]');if(q){seDays=q.dataset.sequick.split('-').map(Number);renderSeDays();return;}
  const d=e.target.closest('[data-seday]');if(d){const i=+d.dataset.seday,k=seDays.indexOf(i);if(k>=0)seDays.splice(k,1);else seDays.push(i);renderSeDays();return;}
  const em=e.target.closest('[data-seemoji]');if(em){seEmoji=em.dataset.seemoji;edp.querySelectorAll('[data-seemoji]').forEach(b=>b.classList.toggle('on',b.dataset.seemoji===seEmoji));const pv=document.getElementById('seEmojiPrev');if(pv)pv.textContent=seEmojiPreview();return;}
  if(e.target.closest('#seAdd')){const nm=document.getElementById('seName').value.trim();if(!nm){document.getElementById('seName').focus();return;}if(!seDays.length)seDays=[setupDay];const time=document.getElementById('seTime').value||null;RITUALS.push({id:RIT_SEQ++,name:nm,time,days:seDays.slice(),emoji:seEmoji||'',pid:activeProfile,done:{}});saveRituals();seDays=[setupDay];seEmoji='';renderSetup();const i2=document.getElementById('seName');if(i2)i2.focus();return;}
  if(e.target.closest('#seSave')){const r=RITUALS.find(x=>x.id===setupEdit);const nm=document.getElementById('seName').value.trim();if(!nm){document.getElementById('seName').focus();return;}if(r){r.name=nm;r.time=document.getElementById('seTime').value||null;r.days=seDays.length?seDays.slice():[setupDay];r.emoji=seEmoji||'';saveRituals();}setupEdit=null;seDays=[setupDay];seEmoji='';renderSetup();return;}
  if(e.target.closest('#seDelete')){const id=setupEdit;askConfirm(tr('dw_act_del'),()=>{RITUALS=RITUALS.filter(r=>r.id!==id);saveRituals();setupEdit=null;seDays=[setupDay];seEmoji='';renderSetup();});return;}
  if(e.target.closest('#seCancel')){setupEdit=null;seDays=[setupDay];seEmoji='';renderSetup();return;}
});
edp.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='seName'){const b=document.getElementById('seAdd')||document.getElementById('seSave');if(b)b.click();}});
edp.addEventListener('input',e=>{if(e.target.id==='seName'&&seEmoji===''){const pv=document.getElementById('seEmojiPrev');if(pv)pv.textContent=seEmojiPreview();const auto=edp.querySelector('.se-emoji-auto');if(auto)auto.textContent=tr('dw_auto');}});
}}
function renderHabitEdit(){const el=document.getElementById('habitList');if(!el)return;
  el.innerHTML=HABITS.map(h=>'<div class="habit-edit-row"><span class="hber-n">'+bdEsc(habitName(h))+'</span><div class="hber-r">'+(h.key?'':'<span class="setup-del" data-habdel="'+h.id+'">'+SVG.x+'</span>')+'<span class="switch'+(h.active?' on':'')+'" data-habtoggle="'+h.id+'"></span></div></div>').join('');
}
{const habitOv=document.getElementById('habitOverlay');let habitSnap=null;
function closeHabitRevert(){if(habitSnap!=null){try{HABITS=JSON.parse(habitSnap);}catch(e){}habitSnap=null;}habitOv.classList.remove('open');renderDwHabits();}
document.getElementById('dwAddHabit').addEventListener('click',()=>{habitSnap=JSON.stringify(HABITS);renderHabitEdit();document.getElementById('habitName').value='';document.getElementById('habitTarget').value='';habitOv.classList.add('open');});
document.getElementById('habitX').addEventListener('click',closeHabitRevert);
habitOv.addEventListener('click',e=>{if(e.target===habitOv)closeHabitRevert();});
document.getElementById('habitSave').addEventListener('click',()=>{habitSnap=null;saveHabits();habitOv.classList.remove('open');renderDwHabits();showToast(tr('dw_habits_saved'));});
document.getElementById('habitList').addEventListener('click',e=>{
  const tg=e.target.closest('[data-habtoggle]');if(tg){const h=HABITS.find(x=>x.id===+tg.dataset.habtoggle);if(h){h.active=!h.active;renderHabitEdit();}return;}
  const del=e.target.closest('[data-habdel]');if(del){const id=+del.dataset.habdel;HABITS=HABITS.filter(h=>h.id!==id);renderHabitEdit();return;}
});
document.getElementById('habitAddCustom').addEventListener('click',()=>{const name=document.getElementById('habitName').value.trim();if(!name)return;const target=parseInt(document.getElementById('habitTarget').value,10)||0;HABITS.push({id:HAB_SEQ++,name,target,kind:target>0?'count':'check',active:true,done:{}});document.getElementById('habitName').value='';document.getElementById('habitTarget').value='';renderHabitEdit();});
document.getElementById('habitName').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('habitAddCustom').click();});}
function renderTaskFilter(){
  if(!TEAMS.some(t=>('team:'+t.tid)===taskFilter)&&taskFilter!=='all'&&taskFilter!=='personal')taskFilter='all';
  let html=`<div class="s${taskFilter==='all'?' active':''}" data-filter="all">${tr('filter_all')}</div>`+
    `<div class="s${taskFilter==='personal'?' active':''}" data-filter="personal">${tr('filter_personal')}</div>`;
  TEAMS.forEach(t=>{html+=`<div class="s${taskFilter==='team:'+t.tid?' active':''}" data-filter="team:${t.tid}">${teamName(t)}</div>`;});
  document.querySelectorAll('.task-filter').forEach(seg=>seg.innerHTML=html);
}
function renderScopeSelector(){
  const seg=document.getElementById('ntScope');if(!seg)return;
  if(ntScope!=='personal'&&!TEAMS.some(t=>('team:'+t.tid)===ntScope))ntScope='personal';
  let html=`<div class="s${ntScope==='personal'?' active':''}" data-scope="personal">${tr('filter_personal')}</div>`;
  TEAMS.forEach(t=>{html+=`<div class="s${ntScope==='team:'+t.tid?' active':''}" data-scope="team:${t.tid}">${teamName(t)}</div>`;});
  seg.innerHTML=html;
}
function syncTaskTeams(){renderTaskFilter();renderScopeSelector();}
function taskTitle(t){return (t&&t.tk)?tr(t.tk):((t&&t.title)||'');}
function tagHTML(t){if(!t.tag)return '';const lbl=t.tag.lk?tr(t.tag.lk):t.tag.l;return `<span class="tag-pill" style="background:${t.tag.c}22;color:${t.tag.c}">${lbl}</span>`;}
function taskSideTags(t){
  const isTeam=typeof t.scope==='string'&&t.scope.indexOf('team:')===0;
  let scopePill;
  if(isTeam){
    const tid=+t.scope.split(':')[1];
    const tm=(typeof TEAMS!=='undefined'&&Array.isArray(TEAMS))?TEAMS.find(x=>x.tid===tid):null;
    const nm=tm?(typeof teamName==='function'?teamName(tm):(tm.name||tr('nav_team'))):tr('nav_team');
    scopePill='<span class="tk-tag tk-team" title="'+bdEsc(nm)+'">'+bdEsc(nm)+'</span>';
  }else{
    scopePill='<span class="tk-tag tk-pers">'+tr('filter_personal')+'</span>';
  }
  let catPill='';
  if(t.catId!=null&&typeof CATEGORIES!=='undefined'){const c=catById(t.catId);if(c)catPill='<span class="tk-tag tk-cat" title="'+bdEsc(c.name)+'"><span class="tk-cdot" style="background:'+c.color+'"></span>'+bdEsc(c.name)+'</span>';}
  let grpPill='';
  if(t.gid!=null&&typeof GROUPS!=='undefined'){const g=GROUPS.find(x=>x.id===t.gid);if(g)grpPill='<span class="tk-tag tk-grp" data-grpopen="'+g.id+'" title="'+bdEsc(g.name)+'"><span class="tk-gfold" style="color:'+g.color+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>'+bdEsc(g.name)+'</span>';}
  return scopePill+catPill+grpPill;
}
function taskRow(t,showDate){
  const lvl=t.level?`<div class="lvl"><button class="lvl-btn" data-id="${t.id}" data-act="dec">−</button><span class="lvl-num">${t.level.cur}/${t.level.tgt}</span><button class="lvl-btn" data-id="${t.id}" data-act="inc">+</button></div>`:'';
  const chk=t.level?'':`<div class="check" data-id="${t.id}">${SVG.check}</div>`;
  const sub=t.sub?`<span>${tr(t.sub)}</span>`:'';
  const time=t.time?`<span class="task-time">${SVG.clock}${t.time}</span>`:'';
  let dateR='';if(showDate){const d=taskDue(t);if(d){const months=MONTHS[LANG]||MONTHS.it;dateR=`<span class="task-date">${t.month?months[d[1]]+' '+d[0]:d[2]+' '+(months[d[1]]||'').slice(0,3)}</span>`;}}
  const desc=t.desc?`<div class="task-desc">${t.desc}</div>`:'';
  const imgs=(t.images&&t.images.length)?`<div class="task-imgs">${t.images.slice(0,5).map(s=>`<span style="background-image:url(${s})"></span>`).join('')}</div>`:'';
  return `<div class="task ${t.done?'done':''}" data-id="${t.id}" draggable="true">${chk}<div class="task-main"><div class="task-title">${taskTitle(t)}</div>${desc}${imgs}</div><div class="task-end">${tagHTML(t)}${taskSideTags(t)}${time}${sub}${dateR}</div><button class="task-del" data-del="${t.id}" title="${tr('td_delete')||'Elimina'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>${lvl}</div>`;
}
function renderGroupBar(){/* sostituito da renderTkFilters (filtro unificato) */ renderTkFilters();}
function renderTkFilters(){
  const el=document.getElementById('tkFilters');if(!el)return;
  const gs=activeGroups();
  if(groupView!=null&&!gs.some(g=>g.id===groupView))groupView=null;
  if(taskFilter==='personal')taskFilter='all';
  groupView=null;
  const cats=(typeof CATEGORIES!=='undefined')?CATEGORIES:[];
  if(catFilter!=null&&!cats.some(c=>c.id===catFilter))catFilter=null;
  const allOn=(taskFilter==='all'&&catFilter==null);
  let html=`<button class="tk-fil${allOn?' on':''}" data-tf="all">${tr('filter_all')}</button>`;
  cats.forEach(c=>{const on=(catFilter===c.id);html+=`<button class="tk-fil tk-fil-cat${on?' on':''}" data-cf="${c.id}" style="${on?'--catc:'+c.color:''}"><span class="tk-fdot" style="background:${c.color}"></span>${bdEsc(c.name)}</button>`;});
  html+=`<button class="tk-fil-manage" id="grpManage" title="${tr('stm_categories')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>`;
  el.innerHTML=html;
}
function scopeLabel(){
  const months=MONTHS[LANG]||MONTHS.it;
  if(ovScope.mode==='month')return `${months[ovScope.m]} ${ovScope.y} · ${tr('month_all')}`;
  const [y,m,d]=ovScope.d;
  try{return new Date(y,m,d).toLocaleDateString(LOCALES[LANG],{weekday:'long',day:'numeric',month:'long'});}catch(e){return `${d} ${months[m]} ${y}`;}
}
let taskCollapse={};
function setTaskDone(t,val){if(!t)return;t.done=!!val;if(val){if(!t.doneAt)t.doneAt=Date.now();}else{delete t.doneAt;}}
function isDoneToday(t){if(!t||!t.done||!t.doneAt)return false;const d=new Date(t.doneAt),td=realToday();return d.getFullYear()===td[0]&&d.getMonth()===td[1]&&d.getDate()===td[2];}
function tgHead(key,label,count,red){const col=!!taskCollapse[key];return `<div class="tgroup-h tg-toggle${red?' red':''}${col?' collapsed':''}" data-tgroup="${key}"><svg class="tg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg><span>${label}</span> <span class="count">${count}</span></div>`;}
function pieIcon(doneN,total){
  const f=total?doneN/total:0;
  const col=f>=0.67?'#3fb950':(f>=0.34?'#e3b341':'#e5686b');
  const cx=9,cy=9,r=4.3;let inner='';
  if(f>=1){inner=`<circle cx="9" cy="9" r="${r}" fill="${col}"/>`;}
  else if(f>0){const th=f*2*Math.PI,ex=(cx+r*Math.sin(th)).toFixed(2),ey=(cy-r*Math.cos(th)).toFixed(2),la=f>0.5?1:0;inner=`<path d="M9,9 L9,${(cy-r).toFixed(2)} A${r},${r} 0 ${la},1 ${ex},${ey} Z" fill="${col}"/>`;}
  return `<svg class="tg-pie" viewBox="0 0 18 18" title="${doneN}/${total}"><circle cx="9" cy="9" r="7" fill="none" stroke="${col}" stroke-width="1.5"/>${inner}</svg>`;
}
function tgHeadPie(key,label,doneN,total,red){const col=!!taskCollapse[key];const left=Math.max(0,total-doneN);
  return `<div class="tgroup-h tgroup-box tg-toggle${red?' red':''}${col?' collapsed':''}" data-tgroup="${key}"><svg class="tg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>${pieIcon(doneN,total)}<span>${label}</span> <span class="count">${left}</span></div>`;}
function renderTasks(){
  renderGroupBar();
  const _dbl=document.getElementById('ovDateBarLbl');if(_dbl)_dbl.textContent=scopeLabel();
  const list=document.getElementById('taskList');if(!list)return;
  // Se la vista è "agganciata a oggi" ma è passato un giorno (PWA tenuta aperta oltre la mezzanotte),
  // ri-sincronizza lo scope a oggi così le task in ritardo restano sempre visibili.
  if(ovScope.mode==='day'&&ovScope.today&&ovScope.d&&cmpDate(ovScope.d,realToday())!==0){ovScope.d=realToday();}
  const ff=TASKS.filter(t=>(taskFilter==='all'||t.scope===taskFilter)&&(catFilter==null||t.catId===catFilter));
  const gv=(groupView!=null)?GROUPS.find(g=>g.id===groupView):null;
  const today0=realToday();
  // Vista "Oggi": mostra In ritardo (passate non completate) / Oggi / In arrivo
  if(!gv&&ovScope.mode==='day'&&ovScope.d&&cmpDate(ovScope.d,today0)===0){
    const dueCat=(t)=>{const d=taskDue(t);if(!d)return 'today';const c=cmpDate(d,today0);return c<0?'overdue':(c===0?'today':'upcoming');};
    const overdue=ff.filter(t=>!t.done&&taskPast(t)).sort(taskByDue);
    const todayNd=ff.filter(t=>!t.done&&taskTodayCat(t));
    const upcoming=ff.filter(t=>!t.done&&taskFuture(t)).sort(taskByDue);
    const doneT=ff.filter(t=>isDoneToday(t));
    const doneOverdue=doneT.filter(t=>dueCat(t)==='overdue');
    const doneTod=doneT.filter(t=>dueCat(t)==='today');
    const doneUpc=doneT.filter(t=>dueCat(t)==='upcoming');
    let html=`<div class="ov-scope">${scopeLabel()}</div>`,any=false;
    const sec=(gk,nd,dn,sd,red)=>{const total=nd.length+dn.length;if(!total)return;any=true;html+=tgHeadPie(gk,tr(gk),dn.length,total,red);if(!taskCollapse[gk]){html+=nd.map(t=>taskRow(t,sd)).join('');html+=dn.map(t=>taskRow(t,sd)).join('');}};
    sec('g_overdue',overdue,doneOverdue,true,true);
    sec('g_today',todayNd,doneTod,false);
    sec('g_upcoming',upcoming,doneUpc,true);
    if(!any)html+=`<div class="task-empty">${tr('no_tasks')}</div>`;
    list.innerHTML=html;return;
  }
  let pool,head,showDate=false;
  if(gv){
    pool=ff.filter(t=>t.gid===gv.id);showDate=true;
    head=`<div class="ov-scope grp-scope"><span class="grp-dot" style="background:${gv.color}"></span>${bdEsc(gv.name)}<button class="grp-edit-btn" id="grpEditBtn">${tr('grp_edit_link')}</button></div>`;
  }else{
    if(ovScope.mode==='month')pool=ff.filter(t=>taskInMonth(t,ovScope.y,ovScope.m));
    else{const[y,m,d]=ovScope.d;pool=ff.filter(t=>taskOnDay(t,y,m,d));}
    head=`<div class="ov-scope">${scopeLabel()}</div>`;
  }
  const today=realToday();
  const done=pool.filter(t=>t.done),nd=pool.filter(t=>!t.done);
  const urgent=nd.filter(t=>{const d=taskDue(t);return d&&cmpDate(d,today)<=0;});
  const todo=nd.filter(t=>{const d=taskDue(t);return !d||cmpDate(d,today)>0;});
  let html=head,any=false;
  [['g_urgent',urgent],['g_todo',todo],['g_done',done]].forEach(([gk,items])=>{
    if(!items.length)return;any=true;
    html+=tgHead(gk,tr(gk),items.length,false);
    if(!taskCollapse[gk])html+=items.map(t=>taskRow(t,showDate)).join('');
  });
  if(!any)html+=`<div class="task-empty">${gv?tr('grp_empty'):tr('no_tasks')}</div>`;
  list.innerHTML=html;
}
document.getElementById('taskList').addEventListener('click',e=>{
  const tg=e.target.closest('[data-tgroup]');
  if(tg){const k=tg.dataset.tgroup;
    if(k.indexOf('grp:')===0){const chev=e.target.closest('.tg-chev');if(chev){taskCollapse[k]=!taskCollapse[k];renderTasks();return;}openGroupPage(+k.slice(4));return;}
    taskCollapse[k]=!taskCollapse[k];renderTasks();return;}
  const lb=e.target.closest('.lvl-btn');
  if(lb){const t=TASKS.find(x=>x.id==lb.dataset.id);if(t&&t.level){t.level.cur=Math.max(0,Math.min(t.level.tgt,t.level.cur+(lb.dataset.act==='inc'?1:-1)));setTaskDone(t,t.level.cur>=t.level.tgt);saveTasks();renderTasks();renderHomeAlerts();}return;}
  const ck=e.target.closest('.check');
  if(ck){const t=TASKS.find(x=>x.id==ck.dataset.id);if(t){setTaskDone(t,!t.done);saveTasks();renderTasks();buildCalendar();renderHomeAlerts();}return;}
  if(e.target.closest('#grpEditBtn')){openGm();return;}
  const go2=e.target.closest('[data-grpopen]');if(go2){e.stopPropagation();openGroupPage(+go2.dataset.grpopen);return;}
  const del=e.target.closest('.task-del');
  if(del){e.stopPropagation();const id=+del.dataset.del;TASKS=TASKS.filter(x=>x.id!==id);saveTasks();renderTasks();try{renderSideTasks();}catch(_){}try{renderHomeAlerts();}catch(_){}try{buildCalendar();}catch(_){}return;}
  const row=e.target.closest('.task[data-id]');
  if(row)openTaskPage(+row.dataset.id);
});
// ===== PAGINA CARTELLA (gruppo di task) =====
let groupPageId=null;
function gdBigPie(doneN,total,color){
  const f=total?doneN/total:0,cx=14,cy=14,r=6.5;let inner='';
  if(f>=1)inner=`<circle cx="14" cy="14" r="${r}" fill="${color}"/>`;
  else if(f>0){const th=f*2*Math.PI,ex=(cx+r*Math.sin(th)).toFixed(2),ey=(cy-r*Math.cos(th)).toFixed(2),la=f>0.5?1:0;inner=`<path d="M14,14 L14,${(cy-r).toFixed(2)} A${r},${r} 0 ${la},1 ${ex},${ey} Z" fill="${color}"/>`;}
  return `<svg class="gdw-pie" viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" fill="none" stroke="${color}" stroke-width="2"/>${inner}</svg>`;
}
function openGroupPage(gid){groupPageId=gid;go('groupdetail');renderGroupPage();}
function renderGroupPage(){
  const b=document.getElementById('groupPageBody');if(!b)return;
  const g=(typeof GROUPS!=='undefined')?GROUPS.find(x=>x.id===groupPageId):null;if(!g){b.innerHTML='';return;}
  const tasks=TASKS.filter(t=>t.gid===g.id);
  const done=tasks.filter(t=>t.done).length;
  const rows=tasks.length?tasks.map(t=>`<div class="gdw-item${t.done?' done':''}"><button class="gdw-check${t.done?' on':''}" data-gdchk="${t.id}">${SVG.check}</button><span class="gdw-ttitle" data-gdopen="${t.id}">${bdEsc(taskTitle(t))}</span></div>`).join(''):`<div class="gdw-empty">${tr('grp_empty')}</div>`;
  const dots='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>';
  b.innerHTML=`<div class="tdw-crumb"><span class="tdw-cloud"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 9.2 4 4 0 0 0 6.5 19z"/></svg></span><span class="tdw-crumb-link" data-go="tasks">${tr('tdw_all')||'Tutte le task'}</span><span class="tdw-crumb-sep">/</span><span class="tdw-crumb-cur">${bdEsc(g.name)}</span></div>
  <div class="gdw">
    <div class="gdw-head">${gdBigPie(done,tasks.length,g.color)}<input class="gdw-title" id="gdwTitle" value="${bdEsc(g.name)}"><div class="gdw-menuwrap"><button class="gdw-menu" id="gdwMenu">${dots}</button><div class="gdw-menupop" id="gdwMenuPop"><button data-gdm="color">${tr('gm_color')}</button><button data-gdm="delete" class="gdw-mdel">${tr('grp_delete')}</button></div></div></div>
    <textarea class="gdw-notes" id="gdwNotes" placeholder="${tr('gdw_notes')}">${bdEsc(g.notes||'')}</textarea>
    <div class="gdw-list">${rows}</div>
    <button class="gdw-add" id="gdwAdd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>${tr('gdw_addtask')}</span></button>
  </div>`;
}
{const b=document.getElementById('groupPageBody');
 if(b){b.addEventListener('click',e=>{
   const g=GROUPS.find(x=>x.id===groupPageId);if(!g)return;
   const chk=e.target.closest('[data-gdchk]');if(chk){const t=TASKS.find(x=>x.id==+chk.dataset.gdchk);if(t){setTaskDone(t,!t.done);saveTasks();renderGroupPage();try{renderTasks();}catch(_){}try{renderSideTasks();}catch(_){}}return;}
   const op=e.target.closest('[data-gdopen]');if(op){openTaskPage(+op.dataset.gdopen);return;}
   if(e.target.closest('#gdwMenu')){const p=document.getElementById('gdwMenuPop');if(p)p.classList.toggle('open');return;}
   const mi=e.target.closest('[data-gdm]');if(mi){const a=mi.dataset.gdm;const p=document.getElementById('gdwMenuPop');if(p)p.classList.remove('open');
     if(a==='color'){const i=TCOLORS.indexOf(g.color);g.color=TCOLORS[(i+1)%TCOLORS.length];saveGroups();renderGroupPage();try{renderTasks();}catch(_){}}
     else if(a==='delete'){askConfirm(tr('grp_confirm_del'),()=>{GROUPS=GROUPS.filter(x=>x.id!==g.id);TASKS.forEach(t=>{if(t.gid===g.id)delete t.gid;});saveGroups();saveTasks();try{renderTkFilters();}catch(_){}try{renderTasks();}catch(_){}try{renderSideTasks();}catch(_){}go('tasks');});}
     return;}
   if(e.target.closest('#gdwAdd')){openNewTask();ntGid=g.id;if(typeof renderNtGroup==='function')renderNtGroup();return;}
 });
 b.addEventListener('input',e=>{const g=GROUPS.find(x=>x.id===groupPageId);if(!g)return;
   if(e.target.id==='gdwTitle'){g.name=e.target.value;saveGroups();try{renderTasks();}catch(_){}try{renderTkFilters();}catch(_){}}
   else if(e.target.id==='gdwNotes'){g.notes=e.target.value;saveGroups();}
 });}}
// filtro unificato Tasks: Tutto / Personale / gruppi / gestisci gruppi
{const tkf=document.getElementById('tkFilters');if(tkf)tkf.addEventListener('click',e=>{
  if(e.target.closest('#grpManage')){if(typeof openSettings==='function')openSettings('categorie',tr('stm_back_to').replace('%s',stCurPageLabel()));else openGm();return;}
  const cf=e.target.closest('[data-cf]');if(cf){const id=+cf.dataset.cf;catFilter=(catFilter===id)?null:id;taskFilter='all';renderTkFilters();renderTasks();try{renderCalendar();}catch(_){}return;}
  const b=e.target.closest('[data-tf]');if(!b)return;
  const v=b.dataset.tf;
  if(v==='all'){taskFilter='all';groupView=null;catFilter=null;}
  else if(v==='personal'){taskFilter='personal';groupView=null;}
  else if(v.indexOf('grp:')===0){const id=+v.slice(4);groupView=(groupView===id)?null:id;taskFilter='all';}
  renderTkFilters();renderTasks();try{renderCalendar();}catch(_){}
});}
// ===== Aggiungi più task: dettatura/testo → riconoscimento → approvazione =====
let MT_DRAFTS=[],mtRec=null;
function mtOpen(voice){
  const ov=document.getElementById('mtOv');if(!ov)return;
  MT_DRAFTS=[];document.getElementById('mtText').value='';
  document.getElementById('mtInputStep').style.display='';
  document.getElementById('mtReviewStep').style.display='none';
  ov.classList.add('open');
  setTimeout(()=>{const t=document.getElementById('mtText');if(t)t.focus();},60);
  if(voice)setTimeout(mtStartVoice,220);
}
function mtClose(){const ov=document.getElementById('mtOv');if(ov)ov.classList.remove('open');if(mtRec){try{mtRec.stop();}catch(e){}mtRec=null;}if(typeof mtRecUI==='function')mtRecUI(false);}
function mtDetectDate(seg){
  const today=realToday();const low=seg.toLowerCase();
  const addDays=(n)=>{const d=new Date(today[0],today[1],today[2]+n);return [d.getFullYear(),d.getMonth(),d.getDate()];};
  const esc=(x)=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  if(/\boggi\b/i.test(low))return {date:today,cleaned:seg.replace(/\boggi\b/i,' ')};
  if(/\bdopodomani\b/i.test(low))return {date:addDays(2),cleaned:seg.replace(/\bdopodomani\b/i,' ')};
  if(/\bdomani\b/i.test(low))return {date:addDays(1),cleaned:seg.replace(/\bdomani\b/i,' ')};
  let m=low.match(/\btra\s+(\d+)\s+giorni?\b/);if(m)return {date:addDays(+m[1]),cleaned:seg.replace(new RegExp(esc(m[0]),'i'),' ')};
  const wd={domenica:0,'lunedì':1,lunedi:1,'martedì':2,martedi:2,'mercoledì':3,mercoledi:3,'giovedì':4,giovedi:4,'venerdì':5,venerdi:5,sabato:6};
  for(const k in wd){const re=new RegExp('(?:^|[\\s(,.])(?:entro |per |il |di )?'+k+'(?![a-zà-û])','i');if(re.test(seg)){const cur=new Date(today[0],today[1],today[2]).getDay();let diff=(wd[k]-cur+7)%7;if(diff===0)diff=7;return {date:addDays(diff),cleaned:seg.replace(re,' ')};}}
  const months={gennaio:0,febbraio:1,marzo:2,aprile:3,maggio:4,giugno:5,luglio:6,agosto:7,settembre:8,ottobre:9,novembre:10,dicembre:11};
  m=low.match(/\b(?:il\s+)?(\d{1,2})\s+(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\b/);
  if(m){const day=+m[1],mon=months[m[2]];let y=today[0];if(mon<today[1])y++;return {date:[y,mon,day],cleaned:seg.replace(new RegExp(esc(m[0]),'i'),' ')};}
  return null;
}
function mtParse(text){
  text=(text||'').trim();if(!text)return [];
  const raw=text.split(/\n+|;|•|•|,| e poi | poi | ed inoltre | inoltre | e (?=(?:chiam|manda|prepar|scriv|fai |fare|contatta|ordin|compra|paga|invia|rispond|organizz|controll|verific|finisc|fissa|prenota|ricord|aggiorn|cerca|studia|leggi|termina))/i);
  const drafts=[];
  raw.forEach(s=>{
    s=s.replace(/^\s*(?:\d+[\.\)]|[-–])\s*/,'').trim();
    if(s.length<2)return;
    let time=null,date=null;
    const tm=s.match(/\b(?:alle?|h)\s*(\d{1,2})(?:[:\.](\d{2}))?\b/i);
    if(tm){const hh=+tm[1],mm=tm[2]?+tm[2]:0;if(hh<24&&mm<60){time=('0'+hh).slice(-2)+':'+('0'+mm).slice(-2);s=s.replace(tm[0],' ');}}
    const dd=mtDetectDate(s);if(dd){date=dd.date;s=dd.cleaned;}
    s=s.replace(/\b(?:entro|per|il|lo|la|di|del|alle|alla)\s*$/i,'').replace(/\s{2,}/g,' ').replace(/\s+([.,;])/g,'$1').trim();
    if(s.length<2)return;
    s=s.charAt(0).toUpperCase()+s.slice(1);
    drafts.push({title:s,date,time});
  });
  return drafts;
}
function mtRenderReview(){
  const box=document.getElementById('mtList');if(!box)return;
  const at=(x)=>String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  box.innerHTML=MT_DRAFTS.length?MT_DRAFTS.map((d,i)=>{
    const iso=d.date?`${d.date[0]}-${String(d.date[1]+1).padStart(2,'0')}-${String(d.date[2]).padStart(2,'0')}`:'';
    return `<div class="mt-row" data-mti="${i}"><input class="mt-rtitle" data-mtf="title" value="${at(d.title)}"><div class="mt-rmeta"><input type="date" class="mt-rin" data-mtf="date" value="${iso}"><input type="time" class="mt-rin mt-rtime" data-mtf="time" value="${d.time||''}"><button class="mt-rm" data-mtrm="${i}" title="Rimuovi" data-i18n-t="ib_remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div></div>`;
  }).join(''):`<div class="mt-empty">${tr('mt_none')}</div>`;
  const rh=document.getElementById('mtReviewH');if(rh)rh.innerHTML=tr('mt_review_h').replace('%n','<b>'+MT_DRAFTS.length+'</b>');
  const cf=document.getElementById('mtConfirm');if(cf)cf.textContent=tr('mt_confirm').replace('%n',MT_DRAFTS.length);
}
function mtAnalyze(){
  if(typeof mtStopVoice==='function')mtStopVoice();
  MT_DRAFTS=mtParse(document.getElementById('mtText').value);
  if(!MT_DRAFTS.length){if(typeof showToast==='function')showToast(tr('mt_none'));return;}
  document.getElementById('mtInputStep').style.display='none';
  document.getElementById('mtReviewStep').style.display='';mtRenderReview();
}
function mtConfirm(){
  let added=0;let cap=isPro()?Infinity:tasksLeftToday();
  if(cap<=0){mtClose();openUpgrade('tasks');return;}
  MT_DRAFTS.forEach(d=>{const t=(d.title||'').trim();if(!t)return;if(added>=cap)return;const task={id:++TID,title:t,scope:'personal',done:false};task.date=d.date||realToday();if(d.time)task.time=d.time;TASKS.push(task);added++;});
  if(!added){if(typeof showToast==='function')showToast(tr('mt_none'));return;}
  tasksTodayInc(added);saveTasks();mtClose();
  const capped=!isPro()&&MT_DRAFTS.filter(d=>(d.title||'').trim()).length>added;
  try{renderTasks();}catch(e){}try{renderHomeAlerts();}catch(e){}try{buildCalendar();}catch(e){}try{renderSideTasks();}catch(e){}
  if(typeof showToast==='function')showToast(tr('mt_added').replace('%n',added));
  if(capped)setTimeout(()=>openUpgrade('tasks'),500);
}
let mtVoiceTimer=null,mtVoiceSec=0;
function mtBuildViz(){const v=document.getElementById('mtViz');if(!v)return;let h='';for(let i=0;i<28;i++){const ht=18+Math.round(Math.random()*78),de=(i*0.035).toFixed(3),du=(0.45+Math.random()*0.45).toFixed(2);h+='<span class="pib-bar" style="height:'+ht+'%;animation-delay:'+de+'s;animation-duration:'+du+'s"></span>';}v.innerHTML=h;}
function mtRecUI(on){const pib=document.getElementById('mtPib');if(!pib)return;pib.classList.toggle('recording',on);
  if(on){mtVoiceSec=0;const tm=document.getElementById('mtTimer');if(tm)tm.textContent='00:00';mtBuildViz();if(mtVoiceTimer)clearInterval(mtVoiceTimer);mtVoiceTimer=setInterval(()=>{mtVoiceSec++;const t=document.getElementById('mtTimer');if(t)t.textContent=('0'+Math.floor(mtVoiceSec/60)).slice(-2)+':'+('0'+(mtVoiceSec%60)).slice(-2);},1000);}
  else{if(mtVoiceTimer){clearInterval(mtVoiceTimer);mtVoiceTimer=null;}}}
function mtStopVoice(){if(mtRec){try{mtRec.stop();}catch(e){}mtRec=null;}mtRecUI(false);}
function mtStartVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(mtRec){mtStopVoice();return;}
  if(!SR){if(typeof showToast==='function')showToast(tr('mt_no_voice'));return;}
  const rec=new SR();rec.lang=(typeof LOCALES!=='undefined'&&LOCALES[LANG])?LOCALES[LANG]:'it-IT';rec.interimResults=true;rec.continuous=true;
  const ta=document.getElementById('mtText');const base=ta.value.trim();
  rec.onresult=(e)=>{let txt='';for(let i=0;i<e.results.length;i++)txt+=e.results[i][0].transcript;ta.value=(base?base+' ':'')+txt;try{ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,180)+'px';}catch(_){}};
  rec.onstart=()=>{mtRecUI(true);};
  rec.onend=()=>{mtRec=null;mtRecUI(false);};
  rec.onerror=()=>{mtRec=null;mtRecUI(false);};
  mtRec=rec;try{rec.start();}catch(e){mtRec=null;mtRecUI(false);}
}
{const ov=document.getElementById('mtOv');
 if(ov){
   document.getElementById('mtClose').addEventListener('click',mtClose);
   ov.addEventListener('click',e=>{if(e.target===ov)mtClose();});
   document.getElementById('mtAnalyze').addEventListener('click',mtAnalyze);
   document.getElementById('mtMic').addEventListener('click',mtStartVoice);
   {const st=document.getElementById('mtStop');if(st)st.addEventListener('click',mtStopVoice);}
   {const mtt=document.getElementById('mtText');if(mtt)mtt.addEventListener('input',()=>{mtt.style.height='auto';mtt.style.height=Math.min(mtt.scrollHeight,180)+'px';const p=document.getElementById('mtPib');if(p)p.classList.toggle('focus',true);});
    mtt.addEventListener('focus',()=>{const p=document.getElementById('mtPib');if(p)p.classList.add('focus');});
    mtt.addEventListener('blur',()=>{const p=document.getElementById('mtPib');if(p)p.classList.remove('focus');});}
   document.getElementById('mtBack').addEventListener('click',()=>{if(typeof mtStopVoice==='function')mtStopVoice();document.getElementById('mtInputStep').style.display='';document.getElementById('mtReviewStep').style.display='none';});
   document.getElementById('mtConfirm').addEventListener('click',mtConfirm);
   document.getElementById('mtAddRow').addEventListener('click',()=>{MT_DRAFTS.push({title:'',date:realToday(),time:null});mtRenderReview();const r=document.querySelectorAll('#mtList .mt-rtitle');if(r.length)r[r.length-1].focus();});
   const list=document.getElementById('mtList');
   list.addEventListener('input',e=>{const row=e.target.closest('[data-mti]');if(!row)return;const i=+row.dataset.mti;const f=e.target.dataset.mtf;if(f==='title')MT_DRAFTS[i].title=e.target.value;else if(f==='time')MT_DRAFTS[i].time=e.target.value||null;else if(f==='date'){const v=e.target.value;MT_DRAFTS[i].date=v?v.split('-').map((n,idx)=>idx===1?(+n-1):+n):null;}});
   list.addEventListener('click',e=>{const rm=e.target.closest('[data-mtrm]');if(rm){MT_DRAFTS.splice(+rm.dataset.mtrm,1);mtRenderReview();}});
 }}
{const mic=document.getElementById('tasksMic');if(mic)mic.addEventListener('click',()=>{if(typeof openNewTask==='function'){openNewTask();ntPickType('dictate');}});}
// Calendario destro nascondibile
let taskCalView=(()=>{try{return localStorage.getItem('workie_tasks_calview')==='1';}catch(e){return false;}})();
function applyTaskView(){
  const ov=document.getElementById('ovView'),cv=document.getElementById('calView');
  if(ov)ov.style.display=taskCalView?'none':'';
  if(cv)cv.style.display=taskCalView?'flex':'none';
  const b=document.getElementById('calToggle');if(b)b.classList.toggle('on',taskCalView);
  const pg=document.querySelector('[data-page="tasks"]');if(pg)pg.classList.toggle('calmode',taskCalView);
  if(taskCalView){try{renderCalendar();}catch(e){}}
}
{const ct=document.getElementById('calToggle');if(ct)ct.addEventListener('click',()=>{taskCalView=!taskCalView;try{localStorage.setItem('workie_tasks_calview',taskCalView?'1':'0');}catch(e){}applyTaskView();});}
applyTaskView();
{const tvs=document.getElementById('taskViewSeg');if(tvs)tvs.addEventListener('click',e=>{
  const s=e.target.closest('[data-view]');if(!s)return;
  document.querySelectorAll('#taskViewSeg [data-view]').forEach(x=>x.classList.toggle('active',x===s));
  const v=s.dataset.view;
  document.getElementById('ovView').style.display=v==='overview'?'flex':'none';
  document.getElementById('calView').style.display=v==='calendar'?'flex':'none';
  if(v==='calendar')renderCalendar();
});}
document.addEventListener('click',e=>{
  const s=e.target.closest('.task-filter .s');if(!s)return;
  taskFilter=s.dataset.filter;renderTaskFilter();renderTasks();renderCalendar();
});
// mini calendar interactions
document.getElementById('cal').addEventListener('click',e=>{
  const nav=e.target.closest('[data-mininav]');
  if(nav){miniCur=new Date(miniCur.getFullYear(),miniCur.getMonth()+(+nav.dataset.mininav),1);buildCalendar();return;}
  if(e.target.closest('#miniMonth')){groupView=null;ovScope={mode:'month',y:miniCur.getFullYear(),m:miniCur.getMonth()};buildCalendar();renderTasks();ovCalClose();return;}
  const day=e.target.closest('[data-miniday]');
  if(day){groupView=null;ovScope={mode:'day',d:[miniCur.getFullYear(),miniCur.getMonth(),+day.dataset.miniday]};buildCalendar();renderTasks();ovCalClose();}
});
// calendario "a comparsa" su mobile (bottom sheet dalla barra data)
function ovCalClose(){const o=document.getElementById('ovView');if(o)o.classList.remove('cal-open');}
{const db=document.getElementById('ovDateBar');if(db)db.addEventListener('click',()=>{const o=document.getElementById('ovView');if(o){o.classList.add('cal-open');if(typeof buildCalendar==='function')buildCalendar();}});
 const bk=document.getElementById('ovCalBackdrop');if(bk)bk.addEventListener('click',ovCalClose);}
// history of completed (overlay, collapsible by month)
let histOpenKeys=null;
function renderHistory(){
  const list=document.getElementById('histList');if(!list)return;
  const months=MONTHS[LANG]||MONTHS.it;
  const byMonth={};
  TASKS.filter(t=>t.done).forEach(t=>{const d=taskDue(t)||[0,0,1];const k=d[0]+'-'+d[1];(byMonth[k]=byMonth[k]||[]).push({t,d});});
  const keys=Object.keys(byMonth).sort((a,b)=>{const A=a.split('-').map(Number),B=b.split('-').map(Number);return B[0]-A[0]||B[1]-A[1];});
  if(histOpenKeys===null)histOpenKeys=new Set(keys.slice(0,1));
  let html='';
  keys.forEach(k=>{const[y,m]=k.split('-').map(Number);const items=byMonth[k].sort((a,b)=>cmpDate(b.d,a.d));
    const open=histOpenKeys.has(k);
    html+=`<div class="hist-month${open?' open':''}"><div class="hist-mh" data-k="${k}"><span class="hist-mname">${months[m]} ${y}</span><span class="hist-count">${items.length}</span><span class="hist-chev">›</span></div><div class="hist-body">${items.map(o=>taskRow(o.t)).join('')}</div></div>`;});
  list.innerHTML=html||`<div class="task-empty">${tr('no_completed')}</div>`;
}
const histOv=document.getElementById('histOverlay');
document.getElementById('histLink').addEventListener('click',()=>{histOpenKeys=null;renderHistory();histOv.classList.add('open');});
document.getElementById('histModalX').addEventListener('click',()=>histOv.classList.remove('open'));
histOv.addEventListener('click',e=>{if(e.target===histOv)histOv.classList.remove('open');});
document.getElementById('histList').addEventListener('click',e=>{
  const mh=e.target.closest('.hist-mh');if(!mh)return;
  const k=mh.dataset.k;if(histOpenKeys.has(k))histOpenKeys.delete(k);else histOpenKeys.add(k);
  mh.parentElement.classList.toggle('open');
});

// ---------- New task modal ----------
const tkOv=document.getElementById('taskOverlay');
let ntColor=TCOLORS[0],ntScope='personal',pendingDate=null,ntImages=[],ntDueMode='date',ntTeamCtx=null,ntAssignee='me',ntEditId=null,ntGid=null,ntCatId=null,ntMode='task';
function renderNtGroup(){
  const sel=document.getElementById('ntGroupSel');if(!sel)return;
  const gs=activeGroups();
  if(ntGid!=null&&!gs.some(g=>g.id===ntGid))ntGid=null;
  let html=`<option value="">${tr('nt_none_group')}</option>`;
  gs.forEach(g=>{html+=`<option value="${g.id}"${ntGid===g.id?' selected':''}>${bdEsc(g.name)}</option>`;});
  sel.innerHTML=html;sel.value=ntGid==null?'':String(ntGid);
  renderNtCat();
}
function renderNtCat(){
  const sel=document.getElementById('ntCatSel');if(!sel)return;
  const cs=(typeof CATEGORIES!=='undefined')?CATEGORIES:[];
  if(ntCatId!=null&&!cs.some(c=>c.id===ntCatId))ntCatId=null;
  let html=`<option value="">${tr('cat_none')}</option>`;
  cs.forEach(c=>{html+=`<option value="${c.id}"${ntCatId===c.id?' selected':''}>${bdEsc(c.name)}</option>`;});
  sel.innerHTML=html;sel.value=ntCatId==null?'':String(ntCatId);
}
{const sel=document.getElementById('ntGroupSel');if(sel)sel.addEventListener('change',()=>{ntGid=sel.value===''?null:+sel.value;});}
{const sel=document.getElementById('ntCatSel');if(sel)sel.addEventListener('change',()=>{ntCatId=sel.value===''?null:+sel.value;});}
// ---- Modal gruppo (crea/modifica) ----
const tgOv=document.getElementById('tgOverlay');let tgColor=TCOLORS[0],tgEditId=null,tgReturnToTask=false;
document.getElementById('tgColors').innerHTML=TCOLORS.map((c,i)=>`<div class="sw${i===0?' sel':''}" data-c="${c}" style="background:${c}"></div>`).join('');
document.getElementById('tgColors').addEventListener('click',e=>{const sw=e.target.closest('.sw');if(!sw)return;document.querySelectorAll('#tgColors .sw').forEach(x=>x.classList.remove('sel'));sw.classList.add('sel');tgColor=sw.dataset.c;});
function tgSetColor(c){tgColor=c;document.querySelectorAll('#tgColors .sw').forEach(x=>x.classList.toggle('sel',x.dataset.c===c));}
function tgFillProjects(pid){const sel=document.getElementById('tgProject');if(!sel)return;const list=(typeof PRJ!=='undefined'&&PRJ.list)?PRJ.list:[];sel.innerHTML='<option value="">'+tr('grp_link_none')+'</option>'+list.map(p=>'<option value="'+p.id+'"'+(pid!=null&&pid===p.id?' selected':'')+'>'+bdEsc((p.icon?p.icon+' ':'')+p.name)+'</option>').join('');sel.value=pid!=null?String(pid):'';}
function openTgNew(returnToTask){tgReturnToTask=!!returnToTask;tgEditId=null;document.getElementById('tgName').value='';tgSetColor(TCOLORS[0]);tgFillProjects(null);document.querySelector('#tgOverlay .modal-title').textContent=tr('grp_new_title');document.getElementById('tgSave').textContent=tr('grp_create');document.getElementById('tgDelete').style.display='none';tgOv.classList.add('open');setTimeout(()=>document.getElementById('tgName').focus(),30);}
function openTgEdit(g){tgReturnToTask=false;tgEditId=g.id;document.getElementById('tgName').value=g.name;tgSetColor(g.color);tgFillProjects(g.projectId!=null?g.projectId:null);document.querySelector('#tgOverlay .modal-title').textContent=tr('grp_edit_title');document.getElementById('tgSave').textContent=tr('grp_save');document.getElementById('tgDelete').style.display='block';tgOv.classList.add('open');}
document.getElementById('tgX').addEventListener('click',()=>tgOv.classList.remove('open'));
tgOv.addEventListener('click',e=>{if(e.target===tgOv)tgOv.classList.remove('open');});
document.getElementById('tgSave').addEventListener('click',()=>{
  const name=document.getElementById('tgName').value.trim();if(!name)return;
  const psel=document.getElementById('tgProject');const pid=(psel&&psel.value!=='')?+psel.value:null;
  if(tgEditId!=null){const g=GROUPS.find(x=>x.id===tgEditId);if(g){g.name=name;g.color=tgColor;grpSetLink(g,pid);}saveGroups();tgOv.classList.remove('open');renderTasks();renderHomeAlerts();if(document.querySelector('.page[data-page="projectdetail"].active'))renderPdTasks();return;}
  const id=GID++;const ng={id,name,color:tgColor,active:true};GROUPS.push(ng);grpSetLink(ng,pid);saveGroups();
  tgOv.classList.remove('open');
  if(tgReturnToTask){ntGid=id;renderNtGroup();tgReturnToTask=false;return;}
  groupView=id;renderTasks();renderHomeAlerts();
});
document.getElementById('tgDelete').addEventListener('click',()=>{
  if(tgEditId==null)return;const id=tgEditId;
  askConfirm(tr('grp_confirm_del'),()=>{
    GROUPS=GROUPS.filter(g=>g.id!==id);TASKS.forEach(t=>{if(t.gid===id)delete t.gid;});
    saveGroups();saveTasks();if(groupView===id)groupView=null;
    tgOv.classList.remove('open');renderTasks();renderHomeAlerts();
  });
});
// ---- Gestione gruppi (attiva/disattiva, rinomina, colore, elimina, aggiungi) ----
const gmOv=document.getElementById('gmOverlay');let gmColor=TCOLORS[0];
document.getElementById('gmColors').innerHTML=TCOLORS.map((c,i)=>`<div class="sw${i===0?' sel':''}" data-c="${c}" style="background:${c}"></div>`).join('');
document.getElementById('gmColors').addEventListener('click',e=>{const sw=e.target.closest('.sw');if(!sw)return;document.querySelectorAll('#gmColors .sw').forEach(x=>x.classList.remove('sel'));sw.classList.add('sel');gmColor=sw.dataset.c;});
function renderGmList(){
  const el=document.getElementById('gmList');if(!el)return;
  if(!GROUPS.length){el.innerHTML=`<div class="gm-empty">${tr('gm_empty')}</div>`;return;}
  const linkSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';
  el.innerHTML=GROUPS.map(g=>{const lp=(g.projectId!=null&&typeof PRJ!=='undefined')?PRJ.list.find(p=>p.id===g.projectId):null;return `<div class="gm-row" data-gid="${g.id}"><span class="gm-cdot" data-cdot style="background:${g.color}" title="${tr('gm_color')}"></span><input class="gm-name${g.active===false?' off':''}" data-gname value="${bdEsc(g.name)}"><button class="gm-link${lp?' on':''}" data-glink title="${tr('grp_link')}">${linkSvg}${lp?'<span>'+bdEsc(lp.name)+'</span>':''}</button><div class="switch${g.active!==false?' on':''}" data-gactive title="${tr('gm_active')}"></div><button class="gm-del" data-gdel title="${tr('grp_delete')}">${SVG.trash||SVG.x}</button></div>`;}).join('');
}
function openGm(){gmColor=TCOLORS[0];document.querySelectorAll('#gmColors .sw').forEach((x,i)=>x.classList.toggle('sel',i===0));document.getElementById('gmName').value='';renderGmList();gmOv.classList.add('open');}
document.getElementById('gmX').addEventListener('click',()=>gmOv.classList.remove('open'));
gmOv.addEventListener('click',e=>{if(e.target===gmOv)gmOv.classList.remove('open');});
function gmRefresh(){renderGroupBar();renderTasks();if(tkOv.classList.contains('open'))renderNtGroup();renderHomeAlerts();}
document.getElementById('gmList').addEventListener('click',e=>{
  const row=e.target.closest('.gm-row');if(!row)return;const id=+row.dataset.gid;const g=GROUPS.find(x=>x.id===id);if(!g)return;
  if(e.target.closest('[data-cdot]')){const idx=TCOLORS.indexOf(g.color);g.color=TCOLORS[(idx+1)%TCOLORS.length];saveGroups();renderGmList();gmRefresh();return;}
  if(e.target.closest('[data-glink]')){gmOv.classList.remove('open');openTgEdit(g);return;}
  if(e.target.closest('[data-gactive]')){g.active=(g.active===false);saveGroups();if(g.active===false&&groupView===id)groupView=null;renderGmList();gmRefresh();return;}
  if(e.target.closest('[data-gdel]')){askConfirm(tr('grp_confirm_del'),()=>{GROUPS=GROUPS.filter(x=>x.id!==id);TASKS.forEach(t=>{if(t.gid===id)delete t.gid;});saveGroups();saveTasks();if(groupView===id)groupView=null;renderGmList();gmRefresh();});return;}
});
document.getElementById('gmList').addEventListener('change',e=>{
  const inp=e.target.closest('[data-gname]');if(!inp)return;const row=inp.closest('.gm-row');const id=+row.dataset.gid;const g=GROUPS.find(x=>x.id===id);
  if(g){const v=inp.value.trim();if(v){g.name=v;saveGroups();gmRefresh();}else inp.value=g.name;}
});
function gmAddGroup(){const inp=document.getElementById('gmName');const name=inp.value.trim();if(!name)return;GROUPS.push({id:GID++,name,color:gmColor,active:true});saveGroups();inp.value='';renderGmList();gmRefresh();}
document.getElementById('gmAdd').addEventListener('click',gmAddGroup);
document.getElementById('gmName').addEventListener('keydown',e=>{if(e.key==='Enter')gmAddGroup();});
// scorciatoie data: imposta il campo data a oggi+N e passa in modalità "data"
document.getElementById('ntDateQuick').addEventListener('click',e=>{
  const c=e.target.closest('[data-day]');if(!c)return;
  const d=new Date();d.setDate(d.getDate()+(+c.dataset.day));
  const v=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  document.getElementById('ntDate').value=v;ntUpdateDateLabel();
  ntDueMode='date';ntCloseCal();
  document.querySelectorAll('#ntDateQuick .nt-dchip').forEach(x=>x.classList.toggle('active',x===c));
});
// ===== calendario data con grafica app (sostituisce il nativo) =====
let ntCalYM=null;
function ntFmtDate(v){if(!v)return tr('dq_pick');const p=v.split('-').map(Number);try{return new Date(p[0],p[1]-1,p[2]).toLocaleDateString(LOCALES[LANG],{weekday:'short',day:'numeric',month:'long'});}catch(e){return v;}}
function ntUpdateDateLabel(){const v=document.getElementById('ntDate').value;document.getElementById('ntDateLbl').textContent=ntFmtDate(v);document.getElementById('ntDateBtn').classList.toggle('empty',!v);}
function ntRenderCal(){
  const dows=DOWS[LANG]||DOWS.it;
  document.getElementById('ntCalDows').innerHTML=dows.map(d=>`<div class="cal-dow">${d}</div>`).join('');
  const y=ntCalYM.y,m=ntCalYM.m;
  document.getElementById('ntCalTitle').textContent=(MONTHS[LANG]||MONTHS.it)[m]+' '+y;
  const lead=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();
  const sel=document.getElementById('ntDate').value,today=realToday();
  let cells='';for(let i=0;i<lead;i++)cells+='<div class="cal-day out"></div>';
  for(let d=1;d<=days;d++){const ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');const isT=(today[0]===y&&today[1]===m&&today[2]===d),isS=(sel===ds);cells+=`<div class="cal-day${isT?' today':''}${isS?' picked':''}" data-pick="${ds}">${d}</div>`;}
  document.getElementById('ntCalGrid').innerHTML=cells;
}
function ntOpenCal(){const v=document.getElementById('ntDate').value;if(v){const p=v.split('-').map(Number);ntCalYM={y:p[0],m:p[1]-1};}else{const t=realToday();ntCalYM={y:t[0],m:t[1]};}ntRenderCal();document.getElementById('ntCalPop').classList.add('open');}
function ntCloseCal(){const p=document.getElementById('ntCalPop');if(p)p.classList.remove('open');}
document.getElementById('ntDateBtn').addEventListener('click',()=>{document.getElementById('ntCalPop').classList.contains('open')?ntCloseCal():ntOpenCal();});
document.getElementById('ntCalPop').addEventListener('click',e=>{
  const nav=e.target.closest('[data-cnav]');
  if(nav){let m=ntCalYM.m+(+nav.dataset.cnav),y=ntCalYM.y;if(m<0){m=11;y--;}if(m>11){m=0;y++;}ntCalYM={y,m};ntRenderCal();return;}
  const day=e.target.closest('[data-pick]');
  if(day){document.getElementById('ntDate').value=day.dataset.pick;ntUpdateDateLabel();document.querySelectorAll('#ntDateQuick .nt-dchip').forEach(x=>x.classList.remove('active'));document.getElementById('ntDateBtn').classList.add('active');ntCloseCal();}
});
// ===== selettore mese con grafica app =====
let ntMonYear=null;
function ntFmtMonth(v){if(!v)return tr('mq_pick');const p=v.split('-').map(Number);return (MONTHS[LANG]||MONTHS.it)[p[1]-1]+' '+p[0];}
function ntUpdateMonthLabel(){const v=document.getElementById('ntMonth').value;document.getElementById('ntMonthLbl').textContent=ntFmtMonth(v);document.getElementById('ntMonthBtn').classList.toggle('empty',!v);}
function ntRenderMonth(){
  document.getElementById('ntMonthTitle').textContent=ntMonYear;
  const mons=MONTHS[LANG]||MONTHS.it,sel=document.getElementById('ntMonth').value,t=realToday();
  document.getElementById('ntMonthGrid').innerHTML=mons.map((nm,i)=>{const ms=ntMonYear+'-'+String(i+1).padStart(2,'0');const isT=(t[0]===ntMonYear&&t[1]===i),isS=(sel===ms);return `<div class="m-cell${isT?' today':''}${isS?' picked':''}" data-mpick="${ms}">${nm.slice(0,3)}</div>`;}).join('');
}
function ntOpenMonth(){const v=document.getElementById('ntMonth').value;ntMonYear=v?(+v.split('-')[0]):realToday()[0];ntRenderMonth();document.getElementById('ntMonthPop').classList.add('open');}
function ntCloseMonth(){const p=document.getElementById('ntMonthPop');if(p)p.classList.remove('open');}
document.getElementById('ntMonthBtn').addEventListener('click',()=>{document.getElementById('ntMonthPop').classList.contains('open')?ntCloseMonth():ntOpenMonth();});
document.getElementById('ntMonthPop').addEventListener('click',e=>{
  const nav=e.target.closest('[data-mnav]');
  if(nav){ntMonYear+=(+nav.dataset.mnav);ntRenderMonth();return;}
  const mc=e.target.closest('[data-mpick]');
  if(mc){document.getElementById('ntMonth').value=mc.dataset.mpick;ntUpdateMonthLabel();ntCloseMonth();}
});
// chiudi i popup cliccando fuori dai controlli scadenza
tkOv.addEventListener('click',e=>{if(!e.target.closest('.due-wrap')){ntCloseCal();ntCloseMonth();}});
function renderNtAssign(){
  if(!ntTeamCtx)return;
  const me=meMember(ntTeamCtx),mi=ntTeamCtx.members.indexOf(me);
  let html=`<div class="s${ntAssignee==='me'?' active':''}" data-asg="me">${tr('assignee_me')}</div>`;
  ntTeamCtx.members.forEach((m,idx)=>{if(idx!==mi)html+=`<div class="s${ntAssignee==='m'+idx?' active':''}" data-asg="m${idx}">${m.name}</div>`;});
  const as=document.getElementById('ntAssign');if(as)as.innerHTML=html;
}
{const as=document.getElementById('ntAssign');if(as)as.addEventListener('click',e=>{const s=e.target.closest('[data-asg]');if(!s)return;ntAssignee=s.dataset.asg;renderNtAssign();});}
function ntUpdateColorDot(){const d=document.getElementById('ntColorDot');if(d)d.style.background=ntColor;}
{const cd=document.getElementById('ntColorDot');if(cd)cd.addEventListener('click',()=>{const i=TCOLORS.indexOf(ntColor);ntColor=TCOLORS[(i+1)%TCOLORS.length];ntUpdateColorDot();});}
// switch Task / Gruppo
try{Object.assign(STR.it,{nt_pick_title:'Crea',nt_pick_sub:'Cosa vuoi creare?',nt_type_task:'Task singola',nt_type_task_d:'Aggiungi una singola task.',nt_type_group:'Gruppo di task',nt_type_group_d:'Raggruppa più task insieme.',nt_type_dictate:'Detta le task',nt_type_dictate_d:'Scrivi o detta più task.',nt_dictate_hint:'Scrivi (o detta) una task per riga.',nt_dictate_create:'Crea le task',nt_dictate_done:'task create',nt_sub_edit:'Modifica i dettagli della task.',grp_name_ph2:'Nome del gruppo'});
Object.assign(STR.en,{nt_pick_title:'Create',nt_pick_sub:'What do you want to create?',nt_type_task:'Single task',nt_type_task_d:'Add a single task.',nt_type_group:'Group of tasks',nt_type_group_d:'Group several tasks together.',nt_type_dictate:'Dictate tasks',nt_type_dictate_d:'Write or dictate several tasks.',nt_dictate_hint:'Write (or dictate) one task per line.',nt_dictate_create:'Create tasks',nt_dictate_done:'tasks created',nt_sub_edit:'Edit the task details.',grp_name_ph2:'Group name'});}catch(e){}
let ntType='task';
const NT_TYPES={
  task:{ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/></svg>'},
  group:{ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2.2"/><rect x="13" y="3" width="8" height="8" rx="2.2"/><rect x="3" y="13" width="8" height="8" rx="2.2"/><rect x="13" y="13" width="8" height="8" rx="2.2"/></svg>'},
  dictate:{ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>'}
};
const NT_TNAME={task:'nt_type_task',group:'nt_type_group',dictate:'nt_type_dictate'};
const NT_TDESC={task:'nt_type_task_d',group:'nt_type_group_d',dictate:'nt_type_dictate_d'};
function ntShowFormFor(type){
  const tf=document.getElementById('ntTaskForm'),gf=document.getElementById('ntGroupForm'),df=document.getElementById('ntDictateForm');
  if(tf)tf.style.display=(type==='task')?'':'none';
  if(gf)gf.style.display=(type==='group')?'':'none';
  if(df)df.style.display=(type==='dictate')?'':'none';
  if(type==='group')renderNtGrpList();
}
function ntSetMode(m){ntMode=m;ntShowFormFor(m);}
function ntShowStep(step){
  const modal=document.querySelector('#taskOverlay .nt-modal2');
  const p=document.getElementById('ntStepPick'),f=document.getElementById('ntStepForm');
  if(!p||!f||!modal)return;
  const shown=(step==='pick')?p:f;
  const setDisp=()=>{if(step==='pick'){f.style.display='none';p.style.display='';}else{p.style.display='none';f.style.display='';}};
  const isOpen=document.getElementById('taskOverlay').classList.contains('open');
  if(!isOpen){setDisp();return;}
  // FLIP: anima l'altezza da quella attuale a quella nuova + fade dello step entrante
  const h0=modal.offsetHeight;
  setDisp();
  shown.classList.remove('nt-step-in');void shown.offsetWidth;shown.classList.add('nt-step-in');
  modal.style.height='auto';const h1=modal.offsetHeight;
  modal.style.overflow='hidden';modal.style.height=h0+'px';void modal.offsetHeight;
  modal.style.transition='height .38s cubic-bezier(.22,.61,.36,1)';modal.style.height=h1+'px';
  clearTimeout(modal._ntHt);modal._ntHt=setTimeout(()=>{modal.style.height='';modal.style.transition='';modal.style.overflow='';},430);
}
function ntPickType(type){
  ntType=type;ntMode=(type==='group')?'group':'task';
  const ic=document.getElementById('ntSelIc'),nm=document.getElementById('ntSelName'),ds=document.getElementById('ntSelDesc'),ft=document.getElementById('ntFormTitle');
  if(ic)ic.innerHTML=(NT_TYPES[type]||NT_TYPES.task).ic;
  if(nm)nm.textContent=tr(NT_TNAME[type]);
  if(ds)ds.textContent=tr(NT_TDESC[type]);
  if(ft)ft.textContent=tr(NT_TNAME[type]);
  // Logo + nome del tipo nell'header, tra freccia e X, con animazione "sale in alto"
  const fic=document.getElementById('ntFormIc');if(fic)fic.innerHTML=(NT_TYPES[type]||NT_TYPES.task).ic;
  const ident=document.getElementById('ntFormIdent');if(ident){ident.classList.remove('nt-ident-in');void ident.offsetWidth;ident.classList.add('nt-ident-in');}
  {const bk=document.getElementById('ntBack');if(bk)bk.style.display='';}
  ntShowFormFor(type);ntShowStep('form');
  setTimeout(()=>{const el=(type==='group')?document.getElementById('ntGrpName'):(type==='dictate')?document.getElementById('ntDictateTa'):document.getElementById('ntName');if(el)el.focus();},280);
}
{const cards=document.getElementById('ntCards');if(cards)cards.addEventListener('click',e=>{const c=e.target.closest('[data-nttype]');if(c)ntPickType(c.dataset.nttype);});}
{const bk=document.getElementById('ntBack');if(bk)bk.addEventListener('click',()=>ntShowStep('pick'));}
{const x2=document.getElementById('taskModalX2');if(x2)x2.addEventListener('click',()=>tkOv.classList.remove('open'));}
// Detta le task: crea una task per riga
{const dc=document.getElementById('ntDictateCreate');if(dc)dc.addEventListener('click',()=>{
  const ta=document.getElementById('ntDictateTa');const txt=((ta&&ta.value)||'').trim();if(!txt)return;
  const lines=txt.split('\n').map(s=>s.trim()).filter(Boolean);if(!lines.length)return;
  lines.forEach(t=>{TASKS.push({id:++TID,title:t,scope:'personal',done:false});});
  saveTasks();try{renderTasks();}catch(e){}try{renderSideTasks();}catch(e){}try{renderHomeAlerts();}catch(e){}
  if(typeof showToast==='function')showToast(lines.length+' '+tr('nt_dictate_done'));
  tkOv.classList.remove('open');
});}
// Detta: microfono → REGISTRA l'audio e lo trascrive con l'AI (Whisper via /transcribe).
// (La Web Speech API non esiste nel webview desktop Tauri: registrare+trascrivere funziona ovunque.)
function blobToDataUrl(blob){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(blob);});}
{const mic=document.getElementById('ntMicBtn');let mediaRec=null,chunks=[],recOn=false,micStream=null;
 const hasRec=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
 if(mic&&!hasRec){mic.style.display='none';}
 else if(mic){
   const stopStream=()=>{try{if(micStream)micStream.getTracks().forEach(t=>t.stop());}catch(_){}micStream=null;};
   mic.addEventListener('click',async()=>{
     const ta=document.getElementById('ntDictateTa');
     if(recOn){try{if(mediaRec&&mediaRec.state!=='inactive')mediaRec.stop();}catch(_){}return;}
     {const g=(typeof aiTry==='function')?aiTry():'ok';if(g==='upgrade'){if(typeof openUpgrade==='function')openUpgrade('ai');return;}if(g==='limit'){if(typeof showAiLimit==='function')showAiLimit();return;}}
     try{micStream=await navigator.mediaDevices.getUserMedia({audio:true});}catch(e){if(typeof showToast==='function')showToast(tr('mic_denied'));return;}
     chunks=[];let mime='';
     try{['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'].some(t=>{if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t)){mime=t;return true;}return false;});}catch(_){}
     try{mediaRec=mime?new MediaRecorder(micStream,{mimeType:mime}):new MediaRecorder(micStream);}catch(e){try{mediaRec=new MediaRecorder(micStream);}catch(_){if(typeof showToast==='function')showToast(tr('mic_err'));stopStream();return;}}
     mediaRec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
     mediaRec.onstop=async()=>{
       recOn=false;mic.classList.remove('rec');mic.classList.add('loading');stopStream();
       try{
         const blob=new Blob(chunks,{type:(mediaRec&&mediaRec.mimeType)||mime||'audio/webm'});
         if(!blob.size){mic.classList.remove('loading');return;}
         const dataUrl=await blobToDataUrl(blob);
         const r=await fetch(FN_BASE+'/.netlify/functions/transcribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audio:dataUrl,lang:(typeof LANG!=='undefined'?LANG:'it')})});
         const d=await r.json().catch(()=>({}));
         if(r.ok&&d&&d.text){if(ta){ta.value=(ta.value?ta.value.replace(/\s*$/,'')+'\n':'')+d.text;try{ta.dispatchEvent(new Event('input',{bubbles:true}));}catch(_){}}if(typeof aiConsume==='function')aiConsume();}
         else if(typeof showToast==='function')showToast((d&&d.error)||tr('mic_err'));
       }catch(e){if(typeof showToast==='function')showToast(tr('mic_err'));}
       mic.classList.remove('loading');
     };
     recOn=true;mic.classList.add('rec');
     try{mediaRec.start();}catch(e){recOn=false;mic.classList.remove('rec');stopStream();}
   });
 }
}
// Advanced toggle
{const at=document.getElementById('ntAdvToggle');if(at)at.addEventListener('click',()=>{const a=document.getElementById('ntAdv');if(!a)return;const open=a.style.display!=='none';a.style.display=open?'none':'';at.classList.toggle('open',!open);});}
// Gruppo: colore + ricerca + crea
let ntGrpColor=TCOLORS[0],ntGrpSel=new Set();
function ntUpdateGrpColorDot(){const el=document.getElementById('ntGrpSwatches');if(!el)return;el.innerHTML=TCOLORS.map(c=>`<button type="button" class="nt-swatch${c===ntGrpColor?' on':''}" data-swatch="${c}" style="background:${c}"></button>`).join('');}
{const el=document.getElementById('ntGrpSwatches');if(el)el.addEventListener('click',e=>{const b=e.target.closest('[data-swatch]');if(!b)return;ntGrpColor=b.dataset.swatch;ntUpdateGrpColorDot();});}
function renderNtGrpList(){
  const el=document.getElementById('ntGrpTaskList');if(!el)return;
  const q=((document.getElementById('ntGrpSearch')||{}).value||'').trim().toLowerCase();
  const items=TASKS.filter(t=>!t.done&&(!q||taskTitle(t).toLowerCase().includes(q)));
  const chk='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  el.innerHTML=items.length?items.map(t=>`<div class="nt-grprow${ntGrpSel.has(t.id)?' on':''}" data-ntgt="${t.id}"><span class="ntg-check">${chk}</span><span class="ntg-t">${bdEsc(taskTitle(t))}</span></div>`).join(''):`<div class="nt-grp-empty">${tr('nt_grp_empty_search')}</div>`;
}
{const el=document.getElementById('ntGrpTaskList');if(el)el.addEventListener('click',e=>{const r=e.target.closest('[data-ntgt]');if(!r)return;const id=+r.dataset.ntgt;if(ntGrpSel.has(id))ntGrpSel.delete(id);else ntGrpSel.add(id);r.classList.toggle('on');});}
{const s=document.getElementById('ntGrpSearch');if(s)s.addEventListener('input',renderNtGrpList);}
{const cr=document.getElementById('ntGrpCreate');if(cr)cr.addEventListener('click',()=>{
  const nm=(document.getElementById('ntGrpName').value||'').trim();if(!nm)return;
  const gdesc=((document.getElementById('ntGrpDesc')||{}).value||'').trim();
  const gid=(typeof GID!=='undefined')?GID++:(GROUPS.reduce((m,g)=>Math.max(m,g.id||0),0)+1);
  {const g={id:gid,name:nm,color:ntGrpColor,active:true};if(gdesc)g.desc=gdesc;GROUPS.push(g);}
  ntGrpSel.forEach(id=>{const t=TASKS.find(x=>x.id===id);if(t)t.gid=gid;});
  if(typeof saveGroups==='function')saveGroups();saveTasks();
  try{renderTkFilters();}catch(e){}try{renderTasks();}catch(e){}try{renderSideTasks();}catch(e){}
  if(typeof showToast==='function')showToast(tr('nt_grp_created'));
  tkOv.classList.remove('open');
});}
document.getElementById('ntDueType').addEventListener('click',e=>{const s=e.target.closest('.s');if(!s)return;ntDueMode=s.dataset.due;document.querySelectorAll('#ntDueType .s').forEach(x=>x.classList.toggle('active',x===s));const isDate=ntDueMode==='date';document.getElementById('ntDateBtn').style.display=isDate?'flex':'none';document.getElementById('ntMonthBtn').style.display=isDate?'none':'flex';document.getElementById('ntDateQuick').style.display=isDate?'flex':'none';ntCloseCal();ntCloseMonth();});
function renderNtImgs(){
  document.getElementById('ntImgs').innerHTML=ntImages.map((s,i)=>`<div class="img-thumb" style="background-image:url(${s})"><div class="rm" data-i="${i}">×</div></div>`).join('')+(ntImages.length<5?`<div class="img-add" id="ntImgAdd">+</div>`:'');
}
document.getElementById('ntImgs').addEventListener('click',e=>{
  const rm=e.target.closest('.rm');if(rm){ntImages.splice(+rm.dataset.i,1);renderNtImgs();return;}
  if(e.target.closest('#ntImgAdd'))document.getElementById('ntImgInput').click();
});
document.getElementById('ntImgInput').addEventListener('change',e=>{
  [...e.target.files].slice(0,5-ntImages.length).forEach(f=>{const r=new FileReader();r.onload=ev=>{if(ntImages.length<5){ntImages.push(ev.target.result);renderNtImgs();}};r.readAsDataURL(f);});
  e.target.value='';
});
function openNewTask(teamCtx){
  ntEditId=null;
  ntTeamCtx=(teamCtx&&teamCtx.tid!==undefined)?teamCtx:null;ntAssignee='me';ntScope='personal';ntColor=TCOLORS[0];
  pendingDate=null;ntImages=[];ntDueMode='date';
  ['ntName','ntDesc','ntTag','ntTarget','ntDate','ntMonth','ntTime'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  // La scadenza parte da OGGI di default (niente più "Pick a date" vuoto).
  {const t=realToday();const iso=t[0]+'-'+String(t[1]+1).padStart(2,'0')+'-'+String(t[2]).padStart(2,'0');const dEl=document.getElementById('ntDate');if(dEl)dEl.value=iso;}
  ntUpdateColorDot();
  document.querySelectorAll('#ntDueType .s').forEach(x=>x.classList.toggle('active',x.dataset.due==='date'));
  document.querySelectorAll('#ntDateQuick .nt-dchip').forEach(x=>x.classList.toggle('active',x.dataset.day==='0'));
  document.getElementById('ntDateBtn').style.display='flex';document.getElementById('ntMonthBtn').style.display='none';document.getElementById('ntDateQuick').style.display='flex';ntCloseCal();ntCloseMonth();ntUpdateDateLabel();ntUpdateMonthLabel();
  {const mt=document.getElementById('ntModalTitle');if(mt)mt.textContent=tr('nt_pick_title');}
  document.getElementById('ntCreate').textContent=tr('nt_create');
  document.getElementById('ntDelete').style.display='none';
  // advanced chiuso, switch su Task
  {const a=document.getElementById('ntAdv');if(a)a.style.display='none';const at=document.getElementById('ntAdvToggle');if(at)at.classList.remove('open');}
  ntType='task';ntShowFormFor('task');
  // reset form gruppo
  {const gn=document.getElementById('ntGrpName');if(gn)gn.value='';const gd=document.getElementById('ntGrpDesc');if(gd)gd.value='';const gs=document.getElementById('ntGrpSearch');if(gs)gs.value='';ntGrpSel=new Set();ntGrpColor=TCOLORS[0];ntUpdateGrpColorDot();}
  // reset dettatura
  {const dt=document.getElementById('ntDictateTa');if(dt)dt.value='';}
  ntGid=(groupView!=null)?groupView:null;ntCatId=null;renderNtGroup();
  renderNtImgs();ntShowStep('pick');tkOv.classList.add('open');
}
// ============ PAGINA TASK (dettaglio a schermo intero) ============
const TDI={
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-8.6-8.6a2 2 0 0 1-.4-1.2V4a1 1 0 0 1 1-1h8.2a2 2 0 0 1 1.2.4l7.2 7.2a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
  scope:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  group:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15V4h13l-2 4 2 4H4"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M3.5 13a9 9 0 1 0 2.6-6.4L3 9"/></svg>'
};
function openTaskPage(id, asChat){
  const t=TASKS.find(x=>x.id==id);if(!t)return;
  tdwEdit=false;tdwPanelHidden=true;try{rsvStepView=null;}catch(e){}
  const cur=document.querySelector('.page.active');
  const cp=cur&&cur.dataset?cur.dataset.page:'';
  taskPageBack=(cp&&cp!=='taskdetail')?cp:'tasks';
  taskPageId=t.id;
  // di default apre le INFO della task; la chat solo se richiesto (sezione chat / robot)
  try{const e=rsvGet(t.id);e.opened=!!asChat;if(asChat)e.unread=false;rsvSave();}catch(_){}
  const bk=document.getElementById('tdBack');if(bk)bk.dataset.go=taskPageBack;
  go('taskdetail');
}
function tdRow(icon,key,valHTML){return valHTML?`<div class="tdp-row"><span class="tdp-ic">${icon}</span><span class="tdp-k">${key}</span><span class="tdp-v">${valHTML}</span></div>`:'';}
// ---- Resolve: chat per aiutarti a risolvere la task ----
const RSV_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.6V12l3 1.8"/></svg>';
const ROBOT_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="8" width="15" height="11" rx="3"/><circle cx="9.5" cy="13" r="1.15"/><circle class="rb-eye-wink" cx="14.5" cy="13" r="1.15"/><path d="M12 4.6V8"/><circle cx="12" cy="3.6" r="1"/><path d="M2.6 12v3M21.4 12v3"/></svg>';
const RSV_SEND='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/></svg>';
const PIB_ICONS={
  clip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9S14.5 18.3 12 21C9.5 18.3 8.2 15 8.2 12S9.5 5.7 12 3z"/></svg>',
  brain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 4A2.5 2.5 0 0 0 7 6.5 2.5 2.5 0 0 0 5 9a2.5 2.5 0 0 0 .5 4.9V16a2.5 2.5 0 0 0 4 2 2.5 2.5 0 0 0 2.5-2.5V6.5A2.5 2.5 0 0 0 9.5 4z"/><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19 9a2.5 2.5 0 0 1-.5 4.9V16a2.5 2.5 0 0 1-4 2 2.5 2.5 0 0 1-2.5-2.5"/></svg>',
  canvas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M10 11l-2 2 2 2M14 11l2 2-2 2"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/></svg>',
  stop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>',
  square:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>'
};
let RESOLVE_CHATS=null;
let tdwEdit=false;
let tdwPanelHidden=true;
function rsvLoad(){if(RESOLVE_CHATS)return;try{RESOLVE_CHATS=JSON.parse(localStorage.getItem(ukey('workie_resolve_chats')))||{};}catch(e){RESOLVE_CHATS={};}}
function rsvSave(){try{localStorage.setItem(ukey('workie_resolve_chats'),JSON.stringify(RESOLVE_CHATS));}catch(e){}try{if(typeof renderSideChat==='function')renderSideChat();}catch(e){}}
function rsvSeed(t){return [{r:'ai',t:tr('rsv_intro').replace('%s',taskTitle(t))}];}
function rsvReply(text,t){const low=(text||'').toLowerCase();
  if(/sotto|subtask|sub-task|dividi|break|split/.test(low))return tr('rsv_r_split')+'\n\n'+tr('rsv_preview');
  if(/piano|plan|inizi|start|dove|begin|come/.test(low))return tr('rsv_r_plan').replace('%s',taskTitle(t))+'\n\n'+tr('rsv_preview');
  return tr('rsv_r_generic')+'\n\n'+tr('rsv_preview');}
try{Object.assign(STR.it,{rsv_rm_title:'Roadmap',rsv_rm_accept:'Accetta roadmap',rsv_rm_update:'Aggiorna roadmap',rsv_rm_steps:'passi',rsv_g_step:'Passo',rsv_g_how:'Come fare',rsv_g_apps:'App consigliate',rsv_g_prompts:'Prompt pronti',rsv_g_copy:'Copia',rsv_g_copied:'Copiato ✓',rsv_g_loading:'Workie prepara la guida…',rsv_g_done:'Segna come fatto',rsv_g_done_on:'Fatto',rsv_g_fallback:'Concentrati su questo passo e completalo prima di procedere al successivo.',rsv_add:'Aggiungi',rsv_voice:'Detta',rsv_add_img:'Aggiungi immagine',rsv_analyze:'Analizza un sito',rsv_analyze_prefix:'Analizza questo sito:',rsv_g_openai:'Apri in Claude',rsv_g_regen:'Rigenera guida',rsv_rm_tasks:'Aggiungi ai task',rsv_ac_q:'Tutti i passi sono fatti. Segno la task come completata?',rsv_ac_yes:'Sì, completa',rsv_g_ready:'Guida pronta',rsv_fn_roadmap:'Crea la roadmap',rsv_cta_roadmap:'Visualizza e crea roadmap',rsv_cta_view:'Visualizza roadmap',rsv_rm_open:'Apri a lato',rsv_fn_roadmap_prompt:'Creami una roadmap con i passi concreti per completare questa task.',rsv_quiz_q:'Domanda',rsv_quiz_of:'di'});Object.assign(STR.en,{rsv_add:'Add',rsv_voice:'Dictate',rsv_add_img:'Add image',rsv_analyze:'Analyze a website',rsv_analyze_prefix:'Analyze this website:',rsv_g_openai:'Open in Claude',rsv_g_regen:'Regenerate guide',rsv_rm_tasks:'Add to tasks',rsv_ac_q:'All steps are done. Mark the task as completed?',rsv_ac_yes:'Yes, complete',rsv_g_ready:'Guide ready',rsv_fn_roadmap:'Create the roadmap',rsv_cta_roadmap:'View and create roadmap',rsv_cta_view:'View roadmap',rsv_rm_open:'Open aside',rsv_fn_roadmap_prompt:'Create a roadmap with the concrete steps to complete this task.',rsv_quiz_q:'Question',rsv_quiz_of:'of',rsv_rm_title:'Roadmap',rsv_rm_accept:'Accept roadmap',rsv_rm_update:'Update roadmap',rsv_rm_steps:'steps',rsv_g_step:'Step',rsv_g_how:'How to',rsv_g_apps:'Suggested apps',rsv_g_prompts:'Ready prompts',rsv_g_copy:'Copy',rsv_g_copied:'Copied ✓',rsv_g_loading:'Workie is preparing the guide…',rsv_g_done:'Mark as done',rsv_g_done_on:'Done',rsv_g_fallback:'Focus on this step and complete it before moving to the next.'});}catch(e){}
try{Object.assign(STR.it,{plan_free_d:'Il piano gratuito',plan_pro_d:'Tutto sbloccato',plan_tester_d:'Accesso beta · AI ×5',plan_upgrade:'Passa a Pro',usage_sim:'Simula',prof_title:'Come lavoro (per l’AI)',prof_hours:'Orario di lavoro',prof_note_ph:'Es. rendo meglio la mattina, pausa pranzo alle 13, evita riunioni dopo le 17…',rd_have_code:'Hai un codice?',rd_placeholder:'Inserisci il codice',rd_btn:'Riscatta',rd_ok_pro:'Codice valido! Pro attivato ✓',rd_ok_tester:'Codice valido! Tester (AI ×5) attivato ✓',rd_bad:'Codice non valido o scaduto.',rd_activated:'%p attivato ✓',ag_folder:"Cartella",ag_fi_remove:"Togli dalla cartella",ag_intake_sub:"Descrivi cosa deve fare, o parti da uno pronto.",ag_intake_ph:"Es. Trasforma articoli in caroselli Instagram, max 8 slide, stile informativo, numeri in evidenza, niente clickbait.",ag_generate:"Genera agente",ag_or_preset:"Oppure parti da un agente pronto",ag_config:"Configura l’agente",ag_f_name:"Nome",ag_f_role:"Ruolo",ag_f_goal:"Obiettivo",ag_f_instr:"Come lavora",ag_f_instr_ph:"Una regola per riga…",ag_save_agent:"Salva agente",ag_gen_err:"Non sono riuscito a generare l’agente. Riprova.",ag_created:"Agente creato ✓",ag_saved:"Agente aggiornato ✓",ag_p_analyst:"Analizza un articolo ed estrae un brief con fatti e numeri chiave.",ag_p_carousel:"Trasforma articoli in script per caroselli Instagram.",ag_p_visual:"Prepara layout e gerarchia visiva per il carosello.",ag_p_brand:"Controlla che gli output rispettino le linee guida del brand.",ag_p_event:"Scrive copy LinkedIn e Instagram per promuovere eventi.",ag_p_research:"Cerca e sintetizza informazioni dal web con le fonti.",ag_p_email:"Scrive e riassume email in modo professionale.",ag_tab_overview:"Panoramica",ag_tab_agents:"Agenti",ag_tab_teams:"Team",ag_tab_activity:"Attività",ag_tab_conn:"Connessioni",ag_stat_review:"da rivedere",ag_stat_working:"al lavoro",ag_stat_done:"completate oggi",ag_ov_review:"Da rivedere",ag_ov_none_review:"Niente da rivedere per ora.",ag_ov_team:"Il tuo team AI",ag_ov_none_team:"Non hai ancora agenti.",ag_teams_empty_t:"Nessun team ancora",ag_teams_empty_s:"Unisci più agenti in un team per automatizzare interi flussi di lavoro.",ag_new_team:"Nuovo team",ag_act_empty_t:"Nessuna attività",ag_act_empty_s:"Qui vedrai cosa fanno i tuoi agenti, passo per passo.",ag_conn_ai:"AI",ag_conn_design:"Design",ag_conn_pub:"Pubblicazione",ag_conn_prod:"Produttività",ag_conn_auto:"Automazione",ag_connect:"Collega",ag_not_conn:"Non collegato",ag_agents_word:"agenti",ag_sub:"Assistenti AI specializzati, pronti a lavorare per te.",ag_new:"Nuovo agente",ag_empty_t:"Nessun agente ancora",ag_empty_s:"Crea il tuo primo agente: un assistente AI su misura per un compito ricorrente.",ag_soon:"Presto potrai creare i tuoi agenti.",ag_untitled:"Agente senza nome",svc_oauth_popup:"Abilita i popup per completare il collegamento.",svc_oauth_fail:"Collegamento non riuscito. Riprova.",svc_account_sub:"Collega il tuo account — userà i tuoi crediti.",svc_hf_note:"Colleghi il tuo account Higgsfield con il login: le generazioni useranno i CREDITI DEL TUO PIANO Higgsfield. Nessuna API separata da pagare.",svc_connect_account:"Collega il mio account %s",svc_oauth_todo:"Collegamento account (OAuth) in costruzione — lo attiviamo a breve.",svc_connect_t:"Collega %s",svc_key_sub:"Incolla le tue credenziali di %s. Restano sul tuo account.",svc_oauth_sub:"Collegamento tramite login.",svc_oauth_note:"Il collegamento a %s avviene con login e autorizzazione (OAuth). Per attivarlo serve registrare l’app sviluppatore sulla piattaforma — in arrivo.",svc_where:"Dove la trovo",svc_security:"Le credenziali restano sul tuo account e servono solo a far lavorare i tuoi agenti per te. Non le condividiamo.",svc_save:"Collega",svc_update:"Aggiorna credenziali",svc_disconnect:"Scollega",svc_fill:"Compila tutti i campi.",svc_connected:"%s collegato ✓",pl_featured:"In evidenza",pl_feat_note:"Gli strumenti con cui Workie ha (o sta costruendo) una connessione reale. Il resto del catalogo è in Pubblici.",agr_kickoff:"Produci ora il tuo lavoro per questa fase, basandoti sul contesto. Vai dritto al deliverable.",agr_empty:"(nessuna risposta)",agr_offline:"Non riesco a raggiungere l’AI in questo momento. Riprova tra poco.",agr_limit:"Hai finito le richieste AI per ora. Riprova più tardi o passa a Pro.",agr_img_needtool:"Per generare le immagini mi serve uno strumento collegato. Un account ChatGPT normale non basta: serve un servizio con API. Collega uno di questi e procedo:",agr_img_withtool:"Genero le immagini con %s. Ecco 10 proposte: scegline 1 o 2, oppure dimmi come cambiarle.",agr_img_connected:"%s collegato ✓",agr_with:"Stai lavorando con",agr_chat_ph:"Scrivi a %s… (o detta)",agr_msg_images:"Ecco 10 proposte grafiche. Scegline 1 o 2 qui sotto, oppure dimmi come cambiarle.",agr_msg_images_rev:"Fatto, ecco 10 nuove proposte. Scegline 1 o 2 o dimmi altro.",agr_wf_consists:"In cosa consiste",agr_lead:"Agente principale · coordina i sub-agenti",agr_greet:"Ciao! Raccontami cosa creiamo oggi: la tua idea, il taglio, eventuali vincoli. Ci penso io a distribuire il lavoro ai sub-agenti.",agr_idea_ph:"Es. Un carosello sull’articolo del lancio del nuovo prodotto, tono informativo, numeri in evidenza, 8 slide…",agr_go:"Via, al lavoro →",agr_progress:"Passo %n di %t",agr_working:"%s sta lavorando…",agr_now:"In corso",agr_waiting:"In attesa",agr_accepted:"Fatto",agr_ok_next:"Va bene, avanti",agr_modify:"Modifica",agr_change_ph:"Cosa vuoi cambiare? Scrivilo e lo rifà…",agr_regen:"Rigenera",agr_pick:"Scegli 1 o 2 grafiche da usare.",agr_use_sel:"Usa le %n selezionate",agr_regen_all:"Rigenera tutte",agr_finish:"Concludi",agr_done_t:"Workflow completato",agr_done_s:"%s ha portato a termine tutti i passaggi. Trovi i risultati nelle attività dell’agente.",agr_back_agent:"Torna all’agente",agr_your_idea:"la tua idea",agr_mock_text:"[Esempio] %s ha preparato una prima proposta basata su: «%idea».\n\nQui comparirà l’output reale una volta collegata l’AI. Se va bene premi «Va bene, avanti», altrimenti scrivimi qui sotto cosa cambiare e lo rifaccio.",agr_mock_text_edit:"[Esempio · rivisto] Ho applicato la tua richiesta: «%f».\n\n%s ha aggiornato la proposta di conseguenza.",agr_mock_report:"[Esempio] %s ha programmato i contenuti approvati.\n\n• 1 carosello · pronto per la pubblicazione\n• Date e orari impostati\n\nQui comparirà il riscontro reale una volta collegato lo strumento.",ag_delete:"Elimina agente",ag_del_confirm:"Eliminare questo agente? L’azione non è reversibile.",ag_del_ok:"Agente eliminato ✓",ag_sub_nodesc:"Istruzioni operative non ancora definite.",agw_subs_hint:"Per ognuno, scrivi (o detta) cosa farà DAVVERO, in modo operativo. Poi l’AI può rifinire il prompt.",agw_sub_ops_ph:"Cosa fa operativamente: input, cosa produce, regole, stile, output atteso…",agw_refine:"Migliora con l’AI",agw_refine_empty:"Scrivi prima cosa deve fare questo sub-agente.",agw_refine_prompt:"Sei un esperto di prompt per agenti AI. Riscrivi in modo chiaro, operativo e azionabile le istruzioni per il sub-agente «%name» (parte di un agente che: %agent). Istruzioni grezze dell’utente: «%desc». Restituisci SOLO le istruzioni finali, in italiano, concise ma complete: cosa riceve in input, cosa deve produrre, regole/vincoli, tono/stile, formato dell’output. Niente premesse.",agw_title:"Nuovo agent",agw_s1_h:"Cosa deve fare il tuo agente?",agw_s1_sub:"Raccontagli tutto quello che deve fare. Puoi scriverlo o dettarlo a voce.",agw_s1_ph:"Es. Deve trasformare gli articoli del nostro brand in caroselli Instagram, trovare i dati chiave, scrivere i testi e programmarli sui social…",agw_rec:"Detta a voce",agw_continue:"Continua",agw_thinking:"Ci sto ragionando…",agw_ai:"AI",agw_understood:"Ho capito cosa ti serve.",agw_q_title:"Un paio di cose per fare meglio",agw_ans_ph:"Rispondi qui (facoltativo)…",agw_answer:"Rispondi e continua",agw_skip:"Salta, va bene così",agw_proposed_subs:"Sub-agenti consigliati",agw_s3_h:"Ecco come lavorerà",agw_s3_sub:"Ho diviso il lavoro in passaggi. Dai un nome all’agente e crealo.",agw_wf_title:"Workflow consigliato",agw_name_title:"Nome dell’agente",agw_create:"Crea agente",agw_no_wf:"Workflow non ancora definito.",agw_ai_offline:"AI non raggiungibile — ti mostro una proposta di base da rifinire.",agw_prompt_answers:"Ulteriori dettagli dall’utente:",agw_fb_understood:"Ok, ho capito: %s. Ti preparo un agente con i sub-agenti giusti e un workflow a step.",agw_fb_s1:"Analisi e testi",agw_fb_s2:"Creazione grafica",agw_fb_s3:"Pubblicazione",ag_subs_word:"sub-agenti",ag_build_sub:"Dagli un nome e aggiungi i sub-agenti che lavorano per lui.",ag_build_name:"Nome agente",ag_build_name_ph:"Es. Caroselli per Economy",ag_build_desc:"Cosa fa",ag_build_desc_ph:"In breve, cosa fa questo agente…",ag_build_subs:"Sub-agenti",ag_build_subs_empty:"Nessun sub-agente ancora. Aggiungili qui sotto.",ag_build_add_sub:"Aggiungi sub-agente",ag_build_tools:"Strumenti",ag_build_tools_ph:"Es. Higgsfield, Metricool, Claude",ag_build_sub_name_ph:"Nome (es. Giornalista)",ag_build_sub_desc_ph:"Cosa fa…",ag_edit_title:"Modifica agente",ag_edit:"Modifica",ag_role_journalist:"Giornalista",ag_role_designer:"Graphic Designer",ag_role_marketing:"Marketing Expert",ag_role_social:"Social Media Manager",ag_role_copy:"Copywriter",ag_role_research:"Researcher",ag_dt_overview:"Panoramica",ag_dt_workflow:"Workflow",ag_dt_events:"Eventi",ag_dsec_desc:"Descrizione",ag_dsec_subs:"Sub Agenti",ag_dsec_tools:"Strumenti",ag_no_desc:"Nessuna descrizione ancora.",ag_no_subs:"Nessun sub-agente ancora.",ag_no_tools:"Nessuno strumento collegato.",ag_wf_start:"Avvia nuovo workflow",ag_wf_prev:"Workflow precedenti",ag_events_soon:"Qui vedrai gli eventi di questo agente.",ag_you_here:"Sei qui",ag_run_hi:"Ciao, sono il tuo %s, di che si tratta?",ag_run_ph:"Scrivi qui…",ag_new_workflow:"Nuovo Workflow",ag_test:"Prova agente",ag_test_sub:"Incolla un articolo e guarda cosa estrae l’agente.",ag_test_ph:"Incolla qui il testo di un articolo…",ag_test_run:"Esegui agente",ag_test_running:"L’agente sta analizzando…",ag_test_done:"Analisi completata ✓",ag_test_notext:"Incolla prima un testo da analizzare.",ag_test_failed:"L’agente ha restituito un errore.",ag_test_offline:"Servizio agenti non raggiungibile. Avvialo in locale e riprova.",ag_r_topic:"Argomento",ag_r_angle:"Angolo",ag_r_summary:"Sintesi",ag_r_facts:"Fatti chiave",ag_r_numbers:"Numeri chiave",ag_r_people:"Persone / aziende",ag_r_hook:"Possibile gancio",ag_r_context:"Contesto importante",ag_r_warnings:"Da verificare",ag_r_raw:"Vedi output grezzo",mic_denied:"Microfono non disponibile o permesso negato.",mic_err:"Non sono riuscito a trascrivere l’audio. Riprova.",aid_title:"Le tue chat",sc_del:"Elimina chat",sc_del_confirm:"Eliminare questa chat? L’azione non è reversibile.",sc_del_ok:"Chat eliminata ✓",cmdk_ph:"Cerca task, pagine…",cmdk_empty:"Nessun risultato",cmdk_pages:"Pagine",cmdk_tasks:"Task",mem_title:"Cosa Workie sa di te",mem_clear:"Cancella",mem_empty:"Workie ti sta ancora conoscendo. Più lo usi, meglio ti conosce.",mem_cleared:"Memoria cancellata",usage_tasks:'Task al giorno',usage_ai:'Funzioni AI',usage_inbox:'Task dalle email',usage_unlimited:'Illimitate',usage_on:'Attive',usage_pro_only:'Solo Pro',usage_left:'Ti restano %n task oggi',usage_none:'Hai raggiunto il limite di oggi',usage_ai_d:'Chat Resolve, roadmap, guide e Pianifica la giornata.',usage_used:'usato',usage_ai_left:'%n/%c richieste rimaste',usage_ai_reset:'si ricarica tra %t',ai_limit_toast:'Hai finito le richieste AI per ora. Si ricarica tra %t.',usage_inbox_d:'Collega l’inbox nel Free; creare task dalle email è Pro.',usage_dev:'Modalità test',usage_sim_free:'Simula Free',usage_sim_pro:'Simula Pro',up_title:'Sblocca tutto con Pro',up_sub:'Task illimitate, AI completa e inbox intelligente.',up_day:'giorno',up_month:'mese',up_inbox_connect:'Collega l’inbox',up_teams:'Team e Agents',up_cta:'Passa a Pro',up_current:'Sei già Pro',up_reco:'Consigliato',up_fine:'Pagamento sicuro con Stripe. Disdici quando vuoi.',up_soon:'Pagamento non ancora attivo. A breve!',up_reason_tasks:'Hai raggiunto le 7 task di oggi del piano Free. Passa a Pro per task illimitate.',up_reason_ai:'Le funzioni AI sono incluse nel piano Pro.',up_reason_inbox:'Creare task dalle email è una funzione Pro.'});Object.assign(STR.en,{plan_free_d:'The free plan',plan_pro_d:'Everything unlocked',plan_tester_d:'Beta access · AI ×5',plan_upgrade:'Upgrade to Pro',usage_sim:'Simulate',prof_title:'How I work (for AI)',prof_hours:'Work hours',prof_note_ph:'E.g. I focus best in the morning, lunch at 1pm, no meetings after 5pm…',rd_have_code:'Have a code?',rd_placeholder:'Enter your code',rd_btn:'Redeem',rd_ok_pro:'Valid code! Pro activated ✓',rd_ok_tester:'Valid code! Tester (AI ×5) activated ✓',rd_bad:'Invalid or expired code.',rd_activated:'%p activated ✓',ag_folder:"Folder",ag_fi_remove:"Remove from folder",ag_intake_sub:"Describe what it should do, or start from a ready-made one.",ag_intake_ph:"E.g. Turn articles into Instagram carousels, max 8 slides, informative style, highlight numbers, no clickbait.",ag_generate:"Generate agent",ag_or_preset:"Or start from a ready-made agent",ag_config:"Configure the agent",ag_f_name:"Name",ag_f_role:"Role",ag_f_goal:"Goal",ag_f_instr:"How it works",ag_f_instr_ph:"One rule per line…",ag_save_agent:"Save agent",ag_gen_err:"Couldn’t generate the agent. Try again.",ag_created:"Agent created ✓",ag_saved:"Agent updated ✓",ag_p_analyst:"Analyzes an article and extracts a brief with key facts and numbers.",ag_p_carousel:"Turns articles into Instagram carousel scripts.",ag_p_visual:"Prepares layout and visual hierarchy for the carousel.",ag_p_brand:"Checks that outputs follow the brand guidelines.",ag_p_event:"Writes LinkedIn and Instagram copy to promote events.",ag_p_research:"Searches and summarizes info from the web with sources.",ag_p_email:"Writes and summarizes emails professionally.",ag_tab_overview:"Overview",ag_tab_agents:"Agents",ag_tab_teams:"Teams",ag_tab_activity:"Activity",ag_tab_conn:"Connections",ag_stat_review:"to review",ag_stat_working:"working",ag_stat_done:"done today",ag_ov_review:"Needs your review",ag_ov_none_review:"Nothing to review yet.",ag_ov_team:"Your AI team",ag_ov_none_team:"You don’t have agents yet.",ag_teams_empty_t:"No teams yet",ag_teams_empty_s:"Combine multiple agents into a team to automate entire workflows.",ag_new_team:"New team",ag_act_empty_t:"No activity",ag_act_empty_s:"Here you’ll see what your agents do, step by step.",ag_conn_ai:"AI",ag_conn_design:"Design",ag_conn_pub:"Publishing",ag_conn_prod:"Productivity",ag_conn_auto:"Automation",ag_connect:"Connect",ag_not_conn:"Not connected",ag_agents_word:"agents",ag_sub:"Specialized AI assistants, ready to work for you.",ag_new:"New agent",ag_empty_t:"No agents yet",ag_empty_s:"Create your first agent: a custom AI assistant for a recurring task.",ag_soon:"You’ll soon be able to create your agents.",ag_untitled:"Untitled agent",svc_oauth_popup:"Allow popups to complete the connection.",svc_oauth_fail:"Connection failed. Try again.",svc_account_sub:"Connect your account — it uses your credits.",svc_hf_note:"Connect your Higgsfield account via login: generations will use YOUR Higgsfield PLAN CREDITS. No separate API to pay.",svc_connect_account:"Connect my %s account",svc_oauth_todo:"Account connection (OAuth) is being built — enabling it shortly.",svc_connect_t:"Connect %s",svc_key_sub:"Paste your %s credentials. They stay on your account.",svc_oauth_sub:"Connect via login.",svc_oauth_note:"Connecting %s happens via login and authorization (OAuth). To enable it, the developer app must be registered on the platform — coming soon.",svc_where:"Where to find it",svc_security:"Your credentials stay on your account and are only used to make your agents work for you. We don’t share them.",svc_save:"Connect",svc_update:"Update credentials",svc_disconnect:"Disconnect",svc_fill:"Fill in all fields.",svc_connected:"%s connected ✓",pl_featured:"Featured",pl_feat_note:"The tools Workie actually connects to (or is building). The rest of the catalog is under Public.",agr_kickoff:"Produce your work for this phase now, based on the context. Go straight to the deliverable.",agr_empty:"(no answer)",agr_offline:"I can’t reach the AI right now. Try again shortly.",agr_limit:"You’re out of AI requests for now. Try later or go Pro.",agr_img_needtool:"To generate images I need a connected tool. A normal ChatGPT account isn’t enough: it needs an API service. Connect one of these and I’ll proceed:",agr_img_withtool:"Generating images with %s. Here are 10 options: pick 1 or 2, or tell me how to change them.",agr_img_connected:"%s connected ✓",agr_with:"You’re working with",agr_chat_ph:"Message %s… (or dictate)",agr_msg_images:"Here are 10 graphic options. Pick 1 or 2 below, or tell me how to change them.",agr_msg_images_rev:"Done — here are 10 new options. Pick 1 or 2, or tell me more.",agr_wf_consists:"What it consists of",agr_lead:"Lead agent · coordinates the sub-agents",agr_greet:"Hi! Tell me what we’re creating today: your idea, the angle, any constraints. I’ll hand the work to the sub-agents.",agr_idea_ph:"E.g. A carousel on the new product launch article, informative tone, numbers highlighted, 8 slides…",agr_go:"Let’s go →",agr_progress:"Step %n of %t",agr_working:"%s is working…",agr_now:"In progress",agr_waiting:"Waiting",agr_accepted:"Done",agr_ok_next:"Looks good, next",agr_modify:"Modify",agr_change_ph:"What do you want to change? Write it and it will redo it…",agr_regen:"Regenerate",agr_pick:"Pick 1 or 2 graphics to use.",agr_use_sel:"Use the %n selected",agr_regen_all:"Regenerate all",agr_finish:"Finish",agr_done_t:"Workflow completed",agr_done_s:"%s finished all the steps. You’ll find the results in the agent’s activity.",agr_back_agent:"Back to agent",agr_your_idea:"your idea",agr_mock_text:"[Example] %s prepared a first proposal based on: \"%idea\".\n\nThe real output will appear here once the AI is connected. If it’s good press \"Looks good, next\", otherwise just write below what to change and I’ll redo it.",agr_mock_text_edit:"[Example · revised] I applied your request: \"%f\".\n\n%s updated the proposal accordingly.",agr_mock_report:"[Example] %s scheduled the approved content.\n\n• 1 carousel · ready to publish\n• Dates and times set\n\nThe real report will appear here once the tool is connected.",ag_delete:"Delete agent",ag_del_confirm:"Delete this agent? This cannot be undone.",ag_del_ok:"Agent deleted ✓",ag_sub_nodesc:"Operational instructions not defined yet.",agw_subs_hint:"For each, write (or dictate) what it will REALLY do, operationally. Then the AI can refine the prompt.",agw_sub_ops_ph:"What it does operationally: input, what it produces, rules, style, expected output…",agw_refine:"Refine with AI",agw_refine_empty:"First write what this sub-agent should do.",agw_refine_prompt:"You are an expert in AI agent prompts. Rewrite clearly and operationally the instructions for the sub-agent \"%name\" (part of an agent that: %agent). User raw instructions: \"%desc\". Return ONLY the final instructions, in English, concise but complete: what it gets as input, what it must produce, rules/constraints, tone/style, output format. No preamble.",agw_title:"New agent",agw_s1_h:"What should your agent do?",agw_s1_sub:"Tell it everything it needs to do. Type it or dictate by voice.",agw_s1_ph:"E.g. Turn our brand articles into Instagram carousels, find the key data, write the copy and schedule it on social…",agw_rec:"Dictate by voice",agw_continue:"Continue",agw_thinking:"Thinking it through…",agw_ai:"AI",agw_understood:"I understood what you need.",agw_q_title:"A couple of things to get it right",agw_ans_ph:"Answer here (optional)…",agw_answer:"Answer and continue",agw_skip:"Skip, it's fine",agw_proposed_subs:"Suggested sub-agents",agw_s3_h:"Here's how it will work",agw_s3_sub:"I split the work into steps. Name the agent and create it.",agw_wf_title:"Suggested workflow",agw_name_title:"Agent name",agw_create:"Create agent",agw_no_wf:"Workflow not defined yet.",agw_ai_offline:"AI unreachable — showing a basic proposal to refine.",agw_prompt_answers:"Extra details from the user:",agw_fb_understood:"Got it: %s. I'll set up an agent with the right sub-agents and a step workflow.",agw_fb_s1:"Analysis & copy",agw_fb_s2:"Graphic creation",agw_fb_s3:"Publishing",ag_subs_word:"sub-agents",ag_build_sub:"Give it a name and add the sub-agents that work for it.",ag_build_name:"Agent name",ag_build_name_ph:"E.g. Carousels for Economy",ag_build_desc:"What it does",ag_build_desc_ph:"In short, what this agent does…",ag_build_subs:"Sub-agents",ag_build_subs_empty:"No sub-agents yet. Add them below.",ag_build_add_sub:"Add sub-agent",ag_build_tools:"Tools",ag_build_tools_ph:"E.g. Higgsfield, Metricool, Claude",ag_build_sub_name_ph:"Name (e.g. Journalist)",ag_build_sub_desc_ph:"What it does…",ag_edit_title:"Edit agent",ag_edit:"Edit",ag_role_journalist:"Journalist",ag_role_designer:"Graphic Designer",ag_role_marketing:"Marketing Expert",ag_role_social:"Social Media Manager",ag_role_copy:"Copywriter",ag_role_research:"Researcher",ag_dt_overview:"Overview",ag_dt_workflow:"Workflow",ag_dt_events:"Events",ag_dsec_desc:"Description",ag_dsec_subs:"Sub Agents",ag_dsec_tools:"Tools",ag_no_desc:"No description yet.",ag_no_subs:"No sub-agents yet.",ag_no_tools:"No tools connected.",ag_wf_start:"Start new workflow",ag_wf_prev:"Previous Workflow",ag_events_soon:"You'll see this agent's events here.",ag_you_here:"You are here",ag_run_hi:"Hi, I'm your %s, what's it about?",ag_run_ph:"Type here…",ag_new_workflow:"New Workflow",ag_test:"Test agent",ag_test_sub:"Paste an article and see what the agent extracts.",ag_test_ph:"Paste an article’s text here…",ag_test_run:"Run agent",ag_test_running:"The agent is analyzing…",ag_test_done:"Analysis complete ✓",ag_test_notext:"Paste some text to analyze first.",ag_test_failed:"The agent returned an error.",ag_test_offline:"Agent service unreachable. Start it locally and try again.",ag_r_topic:"Topic",ag_r_angle:"Angle",ag_r_summary:"Summary",ag_r_facts:"Key facts",ag_r_numbers:"Key numbers",ag_r_people:"People / companies",ag_r_hook:"Potential hook",ag_r_context:"Important context",ag_r_warnings:"To verify",ag_r_raw:"View raw output",mic_denied:"Microphone unavailable or permission denied.",mic_err:"Couldn’t transcribe the audio. Try again.",aid_title:"Your chats",sc_del:"Delete chat",sc_del_confirm:"Delete this chat? This cannot be undone.",sc_del_ok:"Chat deleted ✓",cmdk_ph:"Search tasks, pages…",cmdk_empty:"No results",cmdk_pages:"Pages",cmdk_tasks:"Tasks",mem_title:"What Workie knows about you",mem_clear:"Clear",mem_empty:"Workie is still getting to know you. The more you use it, the better it knows you.",mem_cleared:"Memory cleared",usage_tasks:'Tasks per day',usage_ai:'AI features',usage_inbox:'Tasks from email',usage_unlimited:'Unlimited',usage_on:'Active',usage_pro_only:'Pro only',usage_left:'%n tasks left today',usage_none:'You reached today’s limit',usage_ai_d:'Resolve chat, roadmaps, guides and Plan my day.',usage_used:'used',usage_ai_left:'%n/%c requests left',usage_ai_reset:'recharges in %t',ai_limit_toast:'You’re out of AI requests for now. Recharges in %t.',usage_inbox_d:'Connect inbox on Free; creating tasks from email is Pro.',usage_dev:'Test mode',usage_sim_free:'Simulate Free',usage_sim_pro:'Simulate Pro',up_title:'Unlock everything with Pro',up_sub:'Unlimited tasks, full AI and a smart inbox.',up_day:'day',up_month:'month',up_inbox_connect:'Connect inbox',up_teams:'Teams and Agents',up_cta:'Upgrade to Pro',up_current:'You are already Pro',up_reco:'Recommended',up_fine:'Secure payment with Stripe. Cancel anytime.',up_soon:'Payment not active yet. Coming soon!',up_reason_tasks:'You reached today’s 7 tasks on the Free plan. Go Pro for unlimited tasks.',up_reason_ai:'AI features are included in the Pro plan.',up_reason_inbox:'Creating tasks from email is a Pro feature.'});}catch(e){}
function rsvParseRoadmap(text){
  const m=(text||'').match(/<roadmap>([\s\S]*?)<\/roadmap>/i);
  if(!m)return null;
  const steps=m[1].split('\n').map(l=>l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/,'').trim()).filter(Boolean).slice(0,12);
  if(!steps.length)return null;
  const clean=(text.slice(0,m.index)+' '+text.slice(m.index+m[0].length)).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
  return {steps,clean};
}
function rsvParseOptions(text){
  const m=(text||'').match(/<options(?:\s+total=["']?(\d+)["']?)?>([\s\S]*?)<\/options>/i);
  if(!m)return null;
  let raw=m[2].trim();
  let opts=(raw.indexOf('\n')>=0?raw.split('\n'):raw.split('|')).map(o=>o.replace(/^\s*(?:[-*•]|\d+[.)])\s*/,'').trim()).filter(Boolean).slice(0,5);
  if(!opts.length)return null;
  const clean=(text.slice(0,m.index)+' '+text.slice(m.index+m[0].length)).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
  return {options:opts,total:m[1]?+m[1]:null,clean};
}
function rsvMd(src){
  src=String(src||'');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const inline=s=>esc(s)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  const lines=src.split('\n');let html='',list=null;
  const closeList=()=>{if(list){html+='</'+list+'>';list=null;}};
  lines.forEach(line=>{let m;
    if(m=line.match(/^\s*[-*]\s+(.*)/)){if(list!=='ul'){closeList();html+='<ul>';list='ul';}html+='<li>'+inline(m[1])+'</li>';}
    else if(m=line.match(/^\s*\d+[.)]\s+(.*)/)){if(list!=='ol'){closeList();html+='<ol>';list='ol';}html+='<li>'+inline(m[1])+'</li>';}
    else if(m=line.match(/^\s*#{1,3}\s+(.*)/)){closeList();html+='<div class="md-h">'+inline(m[1])+'</div>';}
    else if(line.trim()===''){closeList();}
    else{closeList();html+='<p>'+inline(line)+'</p>';}
  });
  closeList();return html||'<p></p>';
}
function rsvBubble(m,isLast){
  if(m.typing)return '<div class="tdw-msg ai"><div class="tdw-aitext tdw-typing"><span></span><span></span><span></span></div></div>';
  if(m.r==='ai'){
    let h='<div class="tdw-msg ai"><div class="tdw-aicol"><div class="tdw-aitext">'+rsvMd(m.t)+'</div>';
    if(isLast&&m.starters&&m.starters.length){
      h+='<div class="rsv-starters">'+m.starters.map(o=>'<button type="button" class="rsv-starter" data-rsvopt="'+encodeURIComponent(o)+'">'+bdEsc(o)+'</button>').join('')+'</div>';
    }
    h+='</div></div>';return h;
  }
  let mm='';if(m.img)mm+='<div class="tdw-me-img" style="background-image:url('+m.img+')"></div>';if(m.t)mm+='<div class="tdw-mebub">'+bdEsc(m.t)+'</div>';
  return '<div class="tdw-msg me">'+mm+'</div>';
}
function rsvAcceptRoadmap(steps){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);
  const prev=(e.roadmap&&e.roadmap.steps)||[];
  e.roadmap={steps:steps.map(s=>{const old=prev.find(p=>p.text===s);return {text:s,done:old?old.done:false,guide:old?old.guide:undefined};}),ts:Date.now()};
  rsvSave();rsvStepView=null;
  // la PRIMA bozza resta in chat (card inline); il pannello a destra si apre solo su richiesta
  renderRsvMsgs();
}
function rsvOpenRoadmapPanel(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;
  const tdw=document.querySelector('.tdw');if(tdw){tdw.classList.add('has-roadmap');tdw.classList.add('panel-hidden');}tdwPanelHidden=true;
  const b=document.getElementById('tdwInfoBtn');if(b)b.classList.remove('on');
  rsvStepView=null;renderRsvRoadmap();renderRsvMsgs();
}
let rsvStepView=null;
function renderRsvRoadmap(){
  const el=document.getElementById('tdwRoadmap');if(!el)return;
  const t=TASKS.find(x=>x.id==taskPageId);const tdw=document.querySelector('.tdw');
  if(!t){el.innerHTML='';if(tdw)tdw.classList.remove('has-roadmap');return;}
  const e=rsvGet(t.id);
  if(!e.roadmap||!e.roadmap.steps||!e.roadmap.steps.length){if(tdw)tdw.classList.remove('has-roadmap');el.innerHTML='';rsvStepView=null;return;}
  if(tdw)tdw.classList.add('has-roadmap');
  if(rsvStepView!=null&&e.roadmap.steps[rsvStepView]){renderRsvStepDetail(rsvStepView);return;}
  rsvStepView=null;
  const steps=e.roadmap.steps,doneN=steps.filter(s=>s.done).length,cur=steps.findIndex(s=>!s.done);
  el.innerHTML='<div class="rm-head"><span class="rm-htitle">'+tr('rsv_rm_title')+'</span><span class="rm-count">'+doneN+'/'+steps.length+'</span><button class="rm-close" id="rmClose" title="'+tr('tdw_toggle_info')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div>'
    +rsvStepperHTML(steps,cur)
    +'<div class="rms-foot">'+rsvRoadmapFooter(t,e,steps,doneN)+'</div>';
}
function rsvStepperHTML(steps,cur){
  return '<div class="rms-list">'+steps.map((s,i)=>'<div class="rms-step'+(s.done?' done':'')+(i===cur?' current':'')+'">'
      +'<div class="rms-rail">'+(i<steps.length-1?'<div class="rms-line"><div class="rms-line-fill"></div></div>':'')
        +'<button class="rms-node" data-rmchk="'+i+'" title="'+tr('rsv_g_done')+'"><svg class="rms-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rms-dot"></span></button>'
      +'</div>'
      +'<div class="rms-body"><button class="rms-text" data-rmopen="'+i+'">'+bdEsc(s.text)+'</button>'+(s.guide?'<span class="rms-hasg">'+tr('rsv_g_ready')+'</span>':'')+'</div>'
    +'</div>').join('')+'</div>';
}
function rsvRoadmapCardHTML(e,t){
  const steps=e.roadmap.steps,doneN=steps.filter(s=>s.done).length,cur=steps.findIndex(s=>!s.done);
  return '<div class="tdw-rmcard">'
    +'<div class="tdw-rmcard-h"><svg class="tdw-rmcard-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M8.2 6H14a2 2 0 0 1 2 2v2M8.2 18H14a2 2 0 0 0 2-2v-2"/></svg><span class="tdw-rmcard-ttl">'+tr('rsv_rm_title')+'</span><span class="rm-count">'+doneN+'/'+steps.length+'</span><button class="tdw-rmcard-open" id="rmCardOpen">'+tr('rsv_rm_open')+'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></button></div>'
    +rsvStepperHTML(steps,cur)
    +'<div class="rms-foot">'+rsvRoadmapFooter(t,e,steps,doneN)+'</div>'
    +'</div>';
}
function rsvRoadmapFooter(t,e,steps,doneN){
  return ((doneN===steps.length&&steps.length&&!t.done)?'<div class="rm-autocomplete"><div class="rm-ac-q">'+tr('rsv_ac_q')+'</div><button class="rm-ac-btn" id="rmComplete">'+tr('rsv_ac_yes')+'</button></div>':'')
    +(e.roadmap.exported?'<div class="rm-exported">'+tr('rsv_rm_tasks')+' ✓</div>':'<button class="rm-tasksbtn" id="rmToTasks"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>'+tr('rsv_rm_tasks')+'</button>');
}
function rsvUpdateRoadmapUI(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);if(!e.roadmap)return;
  if(rsvStepView!=null){renderRsvRoadmap();return;}
  const steps=e.roadmap.steps,doneN=steps.filter(s=>s.done).length,cur=steps.findIndex(s=>!s.done);
  document.querySelectorAll('.tdw .rms-list').forEach(list=>{[...list.children].forEach((se,i)=>{const s=steps[i];if(!s)return;se.classList.toggle('done',!!s.done);se.classList.toggle('current',i===cur);});});
  document.querySelectorAll('.tdw .rm-count').forEach(c=>c.textContent=doneN+'/'+steps.length);
  document.querySelectorAll('.tdw .rms-foot').forEach(f=>f.innerHTML=rsvRoadmapFooter(t,e,steps,doneN));
}
function rsvStepsToTasks(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);if(!e.roadmap||!e.roadmap.steps.length||e.roadmap.exported)return;
  const gid=(typeof GID!=='undefined')?GID++:(GROUPS.reduce((m,g)=>Math.max(m,g.id||0),0)+1);
  const color=(t.tag&&t.tag.c)||TCOLORS[0];
  GROUPS.push({id:gid,name:taskTitle(t),color:color,active:true});
  if(typeof saveGroups==='function')saveGroups();
  t.gid=gid;const lp=(typeof grpLinkedProject==='function')?grpLinkedProject(gid):null;if(lp!=null)t.projectId=lp;
  e.roadmap.steps.forEach(s=>{const task={id:++TID,title:s.text,scope:t.scope||'personal',done:!!s.done,gid:gid,date:realToday()};if(s.guide&&s.guide.how)task.desc=s.guide.how;TASKS.push(task);});
  e.roadmap.exported=true;rsvSave();saveTasks();
  try{renderTasks();}catch(_){}try{renderSideTasks();}catch(_){}try{renderTaskPage();}catch(_){}
  if(typeof showToast==='function')showToast(e.roadmap.steps.length+' '+tr('rsv_rm_steps')+' → task ✓');
}
function renderRsvStepDetail(i){
  const el=document.getElementById('tdwRoadmap');const t=TASKS.find(x=>x.id==taskPageId);if(!el||!t)return;
  const e=rsvGet(t.id);const s=e.roadmap&&e.roadmap.steps[i];if(!s){rsvStepView=null;renderRsvRoadmap();return;}
  let body;
  if(s.guide){
    const g=s.guide;
    body='<div class="rm-guide-sec"><div class="rm-guide-h">'+tr('rsv_g_how')+'</div><div class="rm-guide-tx">'+bdEsc(g.how||'')+'</div></div>';
    if(g.apps&&g.apps.length)body+='<div class="rm-guide-sec"><div class="rm-guide-h">'+tr('rsv_g_apps')+'</div><div class="rm-apps">'+g.apps.map(a=>'<span class="rm-app">'+bdEsc(a)+'</span>').join('')+'</div></div>';
    if(g.prompts&&g.prompts.length)body+='<div class="rm-guide-sec"><div class="rm-guide-h">'+tr('rsv_g_prompts')+'</div>'+g.prompts.map((p,pi)=>'<div class="rm-prompt"><div class="rm-prompt-top"><span class="rm-prompt-t">'+bdEsc(p.title||'Prompt')+'</span><span class="rm-prompt-acts"><a class="rm-openai" href="https://claude.ai/new?q='+encodeURIComponent(p.text||'')+'" target="_blank" rel="noopener">'+tr('rsv_g_openai')+'</a><button class="rm-copy" data-rmcopy="'+i+':'+pi+'">'+tr('rsv_g_copy')+'</button></span></div><div class="rm-prompt-tx">'+bdEsc(p.text||'')+'</div></div>').join('')+'</div>';
  }else{
    body='<div class="rm-guide-loading"><span class="ib-ai-spin"></span>'+tr('rsv_g_loading')+'</div>';
  }
  const timeBadge=(s.guide&&s.guide.time)?'<span class="rm-time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'+bdEsc(s.guide.time)+'</span>':'';
  const regen=s.guide?'<button class="rm-regen" data-rmregen="'+i+'" title="'+tr('rsv_g_regen')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg></button>':'';
  el.innerHTML='<div class="rm-head"><button class="rm-close" id="rmStepBack" title="'+tr('back')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><span class="rm-htitle">'+tr('rsv_g_step')+'</span>'+regen+'</div>'
    +'<div class="rm-step-name'+(s.done?' done':'')+'">'+bdEsc(s.text)+'</div>'
    +(timeBadge?'<div class="rm-timerow">'+timeBadge+'</div>':'')
    +'<div class="rm-guide">'+body+'</div>'
    +'<button class="rm-donebtn'+(s.done?' on':'')+'" data-rmdone="'+i+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>'+(s.done?tr('rsv_g_done_on'):tr('rsv_g_done'))+'</span></button>';
  if(!s.guide)rsvGenStep(i);
}
async function rsvGenStep(i){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);const s=e.roadmap&&e.roadmap.steps[i];if(!s||s.guide)return;
  let guide;
  try{
    const reply=await aiChat({mode:'chat',messages:[{role:'user',text:'Per la task «'+taskTitle(t)+'» sto lavorando al passo: «'+s.text+'». Dammi una guida pratica SOLO in JSON valido (nessun altro testo, niente ```): {"how":"2-4 frasi concrete su come svolgere il passo","time":"tempo stimato breve es. ~20 min","apps":["strumenti o app utili, max 4; [] se non servono"],"prompts":[{"title":"nome breve","text":"un prompt pronto da copiare in un\'AI per questo passo"}]}. Inserisci prompts SOLO se un prompt AI è davvero utile qui, altrimenti []. Rispondi in '+(typeof LANG!=='undefined'&&LANG==='it'?'italiano':(typeof LANG!=='undefined'?LANG:'italiano'))+'.'}]});
    let raw=(reply||'').trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();const a=raw.indexOf('{'),b=raw.lastIndexOf('}');if(a>=0&&b>a)raw=raw.slice(a,b+1);
    const j=JSON.parse(raw);
    guide={how:String(j.how||''),time:String(j.time||''),apps:Array.isArray(j.apps)?j.apps.slice(0,4).map(x=>String(x)):[],prompts:Array.isArray(j.prompts)?j.prompts.slice(0,3).map(p=>({title:String(p.title||''),text:String(p.text||'')})).filter(p=>p.text):[]};
  }catch(err){guide={how:tr('rsv_g_fallback'),apps:[],prompts:[]};}
  s.guide=guide;rsvSave();
  if(taskPageId===t.id&&rsvStepView===i)renderRsvStepDetail(i);
}
// Chiamata all'AI vera (proxy Netlify → Claude). Lancia un errore se non raggiungibile.
async function aiChat(opts){
  opts=opts||{};
  if(opts.meter!==false&&!aiConsume())throw new Error('ai_limit');
  const r=await fetch(FN_BASE+'/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:opts.mode||'chat',messages:opts.messages||[],lang:LANG,context:opts.context||''})});
  let data={};try{data=await r.json();}catch(_){}
  if(!r.ok||!data||!data.reply)throw new Error((data&&data.error)||('HTTP '+r.status));
  return String(data.reply);
}
// ---- Ambito conversazione (3 livelli): questa task / gruppo / tutte ----
let rsvScopeSel='task';
const RSV_SC_IC={
  task:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>',
  group:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  all:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 9.2 4 4 0 0 0 6.5 19z"/></svg>'
};
const RSV_SC_CK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>';
function rsvHasGroup(t){return !!(t&&t.gid!=null&&typeof GROUPS!=='undefined'&&GROUPS.some(x=>x.id===t.gid));}
function rsvScopeLabel(t){
  if(rsvScopeSel==='all')return tr('rsv_scope_all');
  if(rsvScopeSel==='group'&&rsvHasGroup(t)){const g=GROUPS.find(x=>x.id===t.gid);return g?g.name:tr('rsv_scope_group');}
  return tr('rsv_scope_task');
}
function rsvScopeMenuHTML(t){
  const hasG=rsvHasGroup(t);const g=hasG?GROUPS.find(x=>x.id===t.gid):null;
  const item=(key,ic,tt,sb)=>`<button type="button" class="pib-scope-item${rsvScopeSel===key?' sel':''}" data-rsvscope="${key}"><span class="pib-scope-ic">${ic}</span><span class="pib-scope-tx"><span class="pib-scope-tt">${bdEsc(tt)}</span><span class="pib-scope-sb">${bdEsc(sb)}</span></span><span class="pib-scope-ck">${RSV_SC_CK}</span></button>`;
  let h=item('task',RSV_SC_IC.task,tr('rsv_scope_task'),tr('rsv_scope_task_sb'));
  if(hasG)h+=item('group',RSV_SC_IC.group,g?g.name:tr('rsv_scope_group'),tr('rsv_scope_group_sb'));
  h+=item('all',RSV_SC_IC.all,tr('rsv_scope_all'),tr('rsv_scope_all_sb'));
  return h;
}
function rsvToggleScopeMenu(){const mn=document.getElementById('rsvScopeMenu'),b=document.getElementById('rsvScopeBtn');if(!mn||!b)return;const t=TASKS.find(x=>x.id==taskPageId);mn.innerHTML=rsvScopeMenuHTML(t);const o=!mn.classList.contains('open');mn.classList.toggle('open',o);b.classList.toggle('open',o);}
function rsvSetScope(s){rsvScopeSel=s;const t=TASKS.find(x=>x.id==taskPageId);const lbl=document.getElementById('rsvScopeLbl');if(lbl)lbl.textContent=rsvScopeLabel(t);const mn=document.getElementById('rsvScopeMenu');if(mn)mn.classList.remove('open');const b=document.getElementById('rsvScopeBtn');if(b)b.classList.remove('open');}
document.addEventListener('click',e=>{if(!e.target.closest('#rsvScopeBtn')&&!e.target.closest('#rsvScopeMenu')){const mn=document.getElementById('rsvScopeMenu');if(mn&&mn.classList.contains('open')){mn.classList.remove('open');const b=document.getElementById('rsvScopeBtn');if(b)b.classList.remove('open');}}});
function rsvMakeRoadmap(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);
  if(e.roadmap&&e.roadmap.steps&&e.roadmap.steps.length){rsvOpenRoadmapPanel();return;}
  rsvSend(tr('rsv_fn_roadmap_prompt'));
}
function rsvOpenRoadmap(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);
  const exists=e.roadmap&&e.roadmap.steps&&e.roadmap.steps.length;
  if(exists){rsvOpenRoadmapPanel();return;}
  // roadmap proposta dall'AI → accettala → la prima bozza appare in CHAT (non a destra)
  const last=e.msgs&&e.msgs.length?e.msgs[e.msgs.length-1]:null;
  if(last&&last.r==='ai'&&last.roadmap&&last.roadmap.length){rsvAcceptRoadmap(last.roadmap);return;}
  rsvSend(tr('rsv_fn_roadmap_prompt'));
}
function rsvSyncCta(){
  const box=document.getElementById('rsvBox'),cta=document.getElementById('rsvCta');if(!box||!cta)return;
  const t=TASKS.find(x=>x.id==taskPageId);const e=t?rsvGet(t.id):null;
  if(!e||e.state!=='active'){box.classList.remove('expanded');return;}
  const msgs=e.msgs||[];const last=msgs.length?msgs[msgs.length-1]:null;
  const proposed=last&&last.r==='ai'&&last.roadmap&&last.roadmap.length;
  const exists=e.roadmap&&e.roadmap.steps&&e.roadmap.steps.length;
  const quizOn=box.classList.contains('quiz');
  // la CTA compare solo finché la bozza non è stata portata in chat; poi vive come card nella chat
  const ready=proposed&&!exists&&!quizOn;
  box.classList.toggle('expanded',!!ready);
  const lbl=cta.querySelector('#rsvRoadmapCTA span');if(lbl)lbl.textContent=(exists&&!proposed)?tr('rsv_cta_view'):tr('rsv_cta_roadmap');
}
function rsvDueShort(t){const d=taskDue(t);if(!d)return '';const months=MONTHS[LANG]||MONTHS.it;return ' (scad. '+d[2]+' '+(months[d[1]]||'')+')';}
function rsvScopeContext(t){
  if(rsvScopeSel==='all'){
    const list=TASKS.filter(x=>!x.done);
    const lines=list.slice(0,50).map(x=>'- '+taskTitle(x)+rsvDueShort(x)).join('\n');
    return 'Ambito della conversazione: TUTTE le task attive dell\'utente ('+list.length+').\nElenco:\n'+lines+'\n\nTask attualmente aperta:\n'+rsvTaskContext(t);
  }
  if(rsvScopeSel==='group'&&rsvHasGroup(t)){
    const g=GROUPS.find(x=>x.id===t.gid);const list=TASKS.filter(x=>x.gid===t.gid);
    const lines=list.map(x=>'- '+taskTitle(x)+(x.done?' [fatta]':'')+rsvDueShort(x)).join('\n');
    return 'Ambito della conversazione: gruppo "'+(g?g.name:'')+'" ('+list.length+' task).\nTask del gruppo:\n'+lines+'\n\nTask attualmente aperta:\n'+rsvTaskContext(t);
  }
  return rsvTaskContext(t)+rsvNearbyContext(t);
}
function rsvNearbyContext(t){
  const active=TASKS.filter(x=>!x.done&&x.id!==t.id);const parts=[];
  const overdue=active.filter(taskPast).length;if(overdue)parts.push(overdue+' task in ritardo in totale');
  const today0=realToday();
  const soon=active.filter(x=>{const d=taskDue(x);if(!d)return false;const c=cmpDate(d,today0);return c>=0&&c<=3;}).sort(taskByDue).slice(0,5);
  if(soon.length)parts.push('in scadenza a breve: '+soon.map(x=>taskTitle(x)+rsvDueShort(x)).join(', '));
  if(t.gid!=null){const sib=TASKS.filter(x=>x.gid===t.gid&&x.id!==t.id);if(sib.length)parts.push('altre task dello stesso gruppo: '+sib.slice(0,8).map(x=>taskTitle(x)+(x.done?' [fatta]':'')).join(', '));}
  return parts.length?('\n\nContesto vicino: '+parts.join('. ')+'.'):'';}
function rsvTaskContext(t){const parts=['Titolo: '+taskTitle(t)];
  if(t.desc)parts.push('Descrizione: '+t.desc);
  const d=taskDue(t);if(d){const months=MONTHS[LANG]||MONTHS.it;parts.push('Scadenza: '+d[2]+' '+(months[d[1]]||'')+' '+d[0]);}
  if(t.time)parts.push('Ora: '+t.time);
  if(t.gid!=null&&typeof GROUPS!=='undefined'){const g=GROUPS.find(x=>x.id===t.gid);if(g)parts.push('Gruppo: '+g.name);}
  if(t.catId!=null&&typeof catById==='function'){const c=catById(t.catId);if(c)parts.push('Categoria: '+c.name);}
  parts.push('Stato: '+(t.done?'completata':'da fare'));
  return parts.join('\n');}
function rsvGet(id){rsvLoad();let e=RESOLVE_CHATS[id];if(Array.isArray(e)){e={state:e.length?'active':'idle',msgs:e};RESOLVE_CHATS[id]=e;}if(!e){e={state:'idle',msgs:[]};RESOLVE_CHATS[id]=e;}if(!e.msgs)e.msgs=[];if(!e.state)e.state='idle';return e;}
function rsvFirstResponse(t){return (t.desc&&t.desc.trim())?tr('rsv_analyze'):tr('rsv_ask_desc').replace('%s',taskTitle(t));}
function rsvStarters(){return [tr('rsv_chip_plan'),tr('rsv_chip_start'),tr('rsv_chip_split')];}
function rsvOnTopic(text,t){const low=(text||'').toLowerCase();
  if(/aiut|piano|passo|obiettiv|scadenz|priorit|dividi|sotto-|sottotask|prepar|organizz|inizi|prossim|va bene|grazie|help|plan|step|goal|deadline|next|split|subtask/.test(low))return true;
  const toks=(taskTitle(t)+' '+(t.desc||'')+' '+((t.tag&&(t.tag.l||''))||'')).toLowerCase().split(/[^a-zà-ù0-9]+/).filter(w=>w.length>3);
  return toks.some(w=>low.includes(w));}
function renderRsvMsgs(){const box=document.getElementById('rsvMsgs');if(!box)return;const t=TASKS.find(x=>x.id==taskPageId);const tdw=document.querySelector('.tdw');const inp=document.getElementById('rsvInput');if(!t){box.innerHTML='';return;}const e=rsvGet(t.id);
  if(e.state==='active'){if(tdw)tdw.classList.add('chat-active');let html=e.msgs.map((m,i)=>{const isLast=i===e.msgs.length-1;if(isLast&&m.r==='ai'&&m.options&&m.options.length)return '';return rsvBubble(m,isLast);}).join('');const panelShowing=tdw&&tdw.classList.contains('has-roadmap')&&tdw.classList.contains('panel-hidden');if(e.roadmap&&e.roadmap.steps&&e.roadmap.steps.length&&!panelShowing){html+=rsvRoadmapCardHTML(e,t);}box.innerHTML=html;if(inp)inp.placeholder=tr('tdw_ph');box.scrollTop=box.scrollHeight;try{rsvSyncQuiz();}catch(_){}try{rsvSyncCta();}catch(_){}return;}
  if(tdw)tdw.classList.remove('chat-active');try{rsvSyncQuiz();}catch(_){}try{rsvSyncCta();}catch(_){}
  if(e.state==='declined'){box.innerHTML=e.msgs.map((m,i)=>rsvBubble(m,i===e.msgs.length-1)).join('')+'<div class="tdw-yn"><button class="tdw-ynbtn" data-rsvstart>'+tr('tdw_start_again')+'</button></div>';box.scrollTop=box.scrollHeight;return;}
  box.innerHTML='<div class="tdw-invite">'+tr('tdw_invite')+'</div><div class="tdw-yn"><button class="tdw-ynbtn primary" data-rsvstart>'+tr('tdw_yes')+'</button><button class="tdw-ynbtn" data-rsvdecline>'+tr('tdw_no')+'</button></div>';}
let rsvQuizLastN=null;
function rsvSyncQuiz(){
  const box=document.getElementById('rsvBox'),q=document.getElementById('rsvQuiz');if(!box||!q)return;
  const t=TASKS.find(x=>x.id==taskPageId);const e=t?rsvGet(t.id):null;
  const msgs=(e&&e.state==='active')?e.msgs:[];const last=msgs.length?msgs[msgs.length-1]:null;
  const on=last&&last.r==='ai'&&last.options&&last.options.length;
  if(!on){box.classList.remove('quiz');q.classList.remove('on');q.innerHTML='';rsvQuizLastN=null;return;}
  let n=0,total=null;msgs.forEach(m=>{if(m.r==='ai'&&m.options&&m.options.length){n++;if(m.optTotal)total=m.optTotal;}});
  const stepLbl=tr('rsv_quiz_q')+' '+n+(total?(' '+tr('rsv_quiz_of')+' '+total):'');
  const qtext=(last.t||'').trim();
  const fresh=(n!==rsvQuizLastN);rsvQuizLastN=n;
  const pct=total?Math.round(n/total*100):0,prevPct=total?Math.round((n-1)/total*100):0;
  const bar=total?('<div class="rsv-quiz-prog"><div class="rsv-quiz-progfill" style="--from:'+prevPct+'%;--to:'+pct+'%;width:'+pct+'%"></div></div>'):'';
  q.innerHTML='<div class="rsv-quiz-in'+(fresh?' enter':'')+'"><div class="rsv-quiz-top"><span class="rsv-quiz-step">'+bdEsc(stepLbl)+'</span></div>'+bar
    +(qtext?'<div class="rsv-quiz-q">'+rsvMd(qtext)+'</div>':'')
    +'<div class="rsv-quiz-opts">'+last.options.map(o=>'<button type="button" class="rsv-quiz-opt" data-rsvopt="'+encodeURIComponent(o)+'">'+bdEsc(o)+'</button>').join('')+'</div></div>';
  q.classList.add('on');box.classList.add('quiz');
}
function rsvStart(){const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);const resuming=e.state==='declined';e.msgs.push({r:'me',t:resuming?tr('tdw_changed'):tr('tdw_yes')});e.msgs.push({r:'ai',t:rsvFirstResponse(t),starters:rsvStarters()});e.state='active';rsvSave();renderRsvMsgs();const inp=document.getElementById('rsvInput');if(inp)setTimeout(()=>inp.focus(),40);}
function rsvDecline(){const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const e=rsvGet(t.id);e.msgs.push({r:'me',t:tr('tdw_no')});e.msgs.push({r:'ai',t:tr('tdw_declined')});e.state='declined';rsvSave();renderRsvMsgs();}
let rsvOnline=true;
async function rsvSend(text,img){text=(text||'').trim();if(!text&&!img)return;const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;const id=t.id;
  {const g=aiTry();if(g==='upgrade'){openUpgrade('ai');return;}if(g==='limit'){showAiLimit();return;}}
  const e=rsvGet(id);e.state='active';e.msgs.push({r:'me',t:text||'',img:img||undefined});e.msgs.push({r:'ai',t:'…',typing:true});rsvSave();renderRsvMsgs();
  let reply;
  try{
    const hist=e.msgs.filter(m=>!m.typing).map(m=>({role:m.r,text:m.t,image:m.img}));
    let pageCtx='';
    const urlM=(text||'').match(/\bhttps?:\/\/[^\s<>"')]+/i)||(text||'').match(/\bwww\.[^\s<>"')]+/i);
    if(urlM){try{const rr=await fetch(FN_BASE+'/.netlify/functions/fetch-url',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:urlM[0]})});const dd=await rr.json();if(rr.ok&&dd&&(dd.text||dd.title))pageCtx='\n\nContenuto della pagina '+(dd.url||urlM[0])+(dd.title?(' — "'+dd.title+'"'):'')+':\n'+String(dd.text||'').slice(0,10000);}catch(_){}}
    reply=await aiChat({mode:'chat',messages:hist,context:rsvScopeContext(t)+pageCtx+aiProfileContext()+aiMemContext()});
    rsvOnline=true;
  }catch(err){
    rsvOnline=false;
    // fallback: euristica locale (offline / chiave non impostata)
    reply=rsvOnTopic(text,t)?rsvReply(text,t):tr('rsv_offtopic').replace('%s',taskTitle(t));
  }
  const cur=rsvGet(id);
  for(let i=cur.msgs.length-1;i>=0;i--){if(cur.msgs[i].typing){cur.msgs.splice(i,1);break;}}
  let _txt='',_hasOpt=false;
  {let txt=reply;const rm=rsvParseRoadmap(txt);if(rm)txt=rm.clean;const op=rsvParseOptions(txt);if(op)txt=op.clean;_txt=txt;_hasOpt=!!op;const aim={r:'ai',t:txt};if(rm)aim.roadmap=rm.steps;if(op){aim.options=op.options;if(op.total)aim.optTotal=op.total;}cur.msgs.push(aim);}
  // Pallino "da leggere" solo se NON stai guardando quella chat in questo momento
  const _viewing=(taskPageId===id)&&!!document.querySelector('.page[data-page="taskdetail"].active')&&!!document.querySelector('.tdw.chat-open');
  if(!_viewing)cur.unread=true;
  rsvSave();
  if(taskPageId===id){renderRsvMsgs();if(!_hasOpt)rsvTypeLast(_txt);}
  // Memoria: dopo una risposta reale (non il fallback offline) imparo 1-2 fatti sull'utente.
  if(rsvOnline&&!_hasOpt)aiMemLearn(cur.msgs.filter(m=>!m.typing));
}
function rsvTypeLast(fullText){
  try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(_){}
  const box=document.getElementById('rsvMsgs');if(!box)return;
  const els=box.querySelectorAll('.tdw-msg.ai .tdw-aitext');const el=els[els.length-1];if(!el)return;
  const full=String(fullText||'');if(!full)return;
  const tokens=full.split(/(\s+)/);const perTick=Math.max(2,Math.ceil(tokens.length/70));
  let i=0;el.innerHTML='';
  const step=()=>{if(!el.isConnected)return;i+=perTick;const partial=tokens.slice(0,i).join('');el.innerHTML=rsvMd(partial);box.scrollTop=box.scrollHeight;if(i<tokens.length)setTimeout(step,16);else el.innerHTML=rsvMd(full);};
  step();
}
let tdwJustDone=false;
function renderTaskPage(){
  const body=document.getElementById('taskPageBody');if(!body)return;
  const t=TASKS.find(x=>x.id==taskPageId);
  if(!t){body.innerHTML='';return;}
  rsvScopeSel='task';
  const months=MONTHS[LANG]||MONTHS.it;
  const done=!!t.done;
  // scadenza
  let dueTxt='';
  if(t.month){dueTxt=`${months[t.month[1]]} ${t.month[0]} · ${tr('month_all')}`;}
  else if(t.date){try{dueTxt=new Date(t.date[0],t.date[1],t.date[2]).toLocaleDateString(LOCALES[LANG],{weekday:'long',day:'numeric',month:'long',year:'numeric'});}catch(e){dueTxt=`${t.date[2]} ${months[t.date[1]]} ${t.date[0]}`;}}
  if(dueTxt)dueTxt=dueTxt.charAt(0).toUpperCase()+dueTxt.slice(1);
  // ambito
  const isTeam=typeof t.scope==='string'&&t.scope.indexOf('team:')===0;
  let scopeTxt=tr('filter_personal');
  if(isTeam){const tid=+t.scope.split(':')[1];const tm=(typeof TEAMS!=='undefined'&&Array.isArray(TEAMS))?TEAMS.find(x=>x.tid===tid):null;scopeTxt=tm?(typeof teamName==='function'?teamName(tm):(tm.name||tr('nav_team'))):tr('nav_team');}
  const scopeHTML=`<span class="tk-tag ${isTeam?'tk-team':'tk-pers'}">${bdEsc(scopeTxt)}</span>`;
  // gruppo
  let grpHTML='';
  if(t.gid!=null&&typeof GROUPS!=='undefined'){const g=GROUPS.find(x=>x.id===t.gid);if(g)grpHTML=`<span class="tk-tag tk-grp"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${g.color}"></span>${bdEsc(g.name)}</span>`;}
  // etichetta
  let tagV='';
  if(t.tag){const lbl=t.tag.lk?tr(t.tag.lk):t.tag.l;tagV=`<span class="tag-pill" style="background:${t.tag.c}22;color:${t.tag.c}">${bdEsc(lbl)}</span>`;}
  // avanzamento
  let lvlV='';
  if(t.level){const pct=t.level.tgt?Math.round(t.level.cur/t.level.tgt*100):0;lvlV=`<div class="tdp-lvl"><div class="tdp-lvlbar"><div class="tdp-lvlfill" style="width:${pct}%"></div></div><span>${t.level.cur}/${t.level.tgt}</span></div>`;}
  const timeV=t.time?bdEsc(t.time):'';
  const statusPill=`<span class="tk-tag ${done?'tk-team':'tk-pers'}">${done?tr('td_done'):tr('td_todo')}</span>`;
  const infoRows=tdRow('',tr('td_status'),statusPill)
    +tdRow('',tr('nt_deadline'),dueTxt?bdEsc(dueTxt):'')
    +tdRow('',tr('td_time'),timeV)
    +tdRow('',tr('nt_tag'),tagV)
    +tdRow('',tr('td_progress'),lvlV);
  // contesto: ambito + gruppo + progetto collegato
  let catHTML='';
  if(t.catId!=null&&typeof CATEGORIES!=='undefined'){const c=catById(t.catId);if(c)catHTML=`<span class="tk-tag tk-cat"><span style="display:inline-block;width:9px;height:9px;border-radius:3px;background:${c.color}"></span>${bdEsc(c.name)}</span>`;}
  let ctxHTML=scopeHTML+catHTML+grpHTML;
  if(t.projectId!=null){try{const p=(typeof PRJ!=='undefined'&&PRJ.list)?PRJ.list.find(x=>x.id==t.projectId):null;if(p)ctxHTML+=`<span class="tk-tag tk-grp"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.9" style="margin-right:2px"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${bdEsc(p.name||p.title||tr('nav_projects'))}</span>`;}catch(e){}}
  const toggleBtn=t.level?'':`<button class="tdp-btn ${done?'':'primary'}" id="tdToggle">${done?TDI.undo:SVG.check} ${done?tr('td_mark_todo'):tr('td_mark_done')}</button>`;
  const descTxt=t.desc?bdEsc(t.desc):`<span class="tdw-muted">${tr('td_no_desc')}</span>`;
  const imgsHTML=(t.images&&t.images.length)?`<div class="tdw-sep"></div><div class="tdw-sec"><div class="tdw-sec-h">${tr('nt_images')}</div><div class="tdp-imgs">${t.images.map(s=>`<span style="background-image:url(${s})"></span>`).join('')}</div></div>`:'';
  // Pannello destro: lettura oppure modifica inline
  const attr=(s)=>bdEsc(String(s==null?'':s)).replace(/"/g,'&quot;');
  let panelInner;
  if(tdwEdit){
    const dateISO=t.date?`${t.date[0]}-${String(t.date[1]+1).padStart(2,'0')}-${String(t.date[2]).padStart(2,'0')}`:'';
    const tagLabel=t.tag?(t.tag.lk?tr(t.tag.lk):(t.tag.l||'')):'';
    panelInner=`<div class="tdw-box"><div class="tdw-sec tdw-form">
        <div class="tdw-field"><label>${tr('nt_name')}</label><input id="edTitle" type="text" value="${attr(taskTitle(t))}"></div>
        <div class="tdw-field"><label>${tr('nt_desc')}</label><textarea id="edDesc" rows="3" placeholder="${tr('nt_desc_ph')}">${bdEsc(t.desc||'')}</textarea></div>
        <div class="tdw-field"><label>${tr('nt_deadline')}</label><input id="edDate" type="date" value="${dateISO}"></div>
        <div class="tdw-field"><label>${tr('td_time')}</label><input id="edTime" type="time" value="${attr(t.time||'')}"></div>
        <div class="tdw-field"><label>${tr('nt_tag')}</label><input id="edTag" type="text" value="${attr(tagLabel)}" placeholder="${tr('nt_tag_ph')}"></div>
        <div class="tdw-field"><label>${tr('nt_target')}</label><input id="edTarget" type="number" min="0" value="${t.level?t.level.tgt:''}" placeholder="${tr('nt_target_ph')}"></div>
      </div></div>
      <div class="tdp-actions tdw-actions">
        <button class="tdp-btn primary" id="tdSave">${SVG.check} ${tr('nt_save')}</button>
        <button class="tdp-btn" id="tdCancel">${tr('td_cancel')}</button>
      </div>`;
  }else{
    panelInner=`<div class="tdw-box">
        <div class="tdw-sec"><div class="tdw-sec-h">${tr('nt_desc')}</div><div class="tdw-desc">${descTxt}</div></div>
        <div class="tdw-sep"></div>
        <div class="tdw-sec"><div class="tdw-sec-h">${tr('td_info')}</div><div class="tp-rows">${infoRows}</div></div>
        ${imgsHTML}
      </div>
      <div class="tdw-box">
        <div class="tdw-sec"><div class="tdw-sec-h">${tr('td_context')}</div><div class="tdw-ctx">${ctxHTML||'<span class="tdw-muted">—</span>'}</div></div>
      </div>
      <div class="tdp-actions tdw-actions">
        ${toggleBtn}
        <button class="tdp-btn" id="tdEdit">${TDI.edit} ${tr('nt_edit')}</button>
        <button class="tdp-btn danger" id="tdDelete">${TDI.trash} ${tr('td_delete')}</button>
      </div>`;
  }
  let chatOpen=false;try{chatOpen=rsvGet(t.id).opened===true;}catch(e){}
  let grpCrumb='';
  if(t.gid!=null&&typeof GROUPS!=='undefined'){const gg=GROUPS.find(x=>x.id===t.gid);if(gg)grpCrumb=`<span class="tdw-crumb-sep">/</span><button class="tdw-crumb-link" data-grpopen="${gg.id}">${bdEsc(gg.name)}</button>`;}
  const animDone=done&&tdwJustDone;tdwJustDone=false;
  body.innerHTML=`<div class="tdw ${done?'done':''} ${animDone?'anim-done':''} ${chatOpen?'chat-open':''} ${chatOpen&&tdwPanelHidden?'panel-hidden':''}">
    <div class="tdw-crumb">
      <span class="tdw-cloud"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 9.2 4 4 0 0 0 6.5 19z"/></svg></span>
      <button class="tdw-crumb-link" data-go="tasks">${tr('td_all_tasks')}</button>
      ${grpCrumb}
      <span class="tdw-crumb-sep">/</span>
      <span class="tdw-crumb-cur">${bdEsc(taskTitle(t))}</span>
      <button class="tdw-infobtn${chatOpen&&!tdwPanelHidden?' on':''}" id="tdwInfoBtn" title="${tr('tdw_toggle_info')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.2"/><circle cx="12" cy="7.9" r="0.9" fill="currentColor" stroke="none"/></svg></button>
    </div>
    <div class="tdw-stage">
      <div class="tdw-main">
        <div class="tdw-titlerow">
          <span class="tk-headic tdw-headic"><span class="tdw-ic tdw-ic-task">${SVG.task}</span><span class="tdw-ic tdw-ic-check"><svg class="tdw-checksvg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path class="tdw-checkp" d="M4 12.7l5 5L20 6.3"/></svg></span></span>
          <div class="tdw-title">${bdEsc(taskTitle(t))}</div>
          <button class="tdw-robot" id="tdwOpenChat" title="${tr('tdw_openchat')}">${ROBOT_ICON}</button>
        </div>
        <div class="tdw-chatbox">
          <div class="tdw-chat" id="rsvMsgs"></div>
          <div class="rsv-composer" id="rsvComposer">
            <div class="rsv-box" id="rsvBox">
              <div class="rsv-inrow">
                <textarea id="rsvInput" class="rsv-ta" rows="1" placeholder="${tr('ov_chat_ph')}"></textarea>
                <button type="button" class="rsv-tbtn rsv-micbtn" id="rsvMic" title="${tr('rsv_voice')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="21"/></svg></button>
                <button type="button" class="rsv-sendbtn" id="rsvSend" title="${tr('pib_send')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tdw-panel" id="tdwPanel">${panelInner}</div>
      <div class="tdw-roadmap" id="tdwRoadmap"></div>
    </div>
  </div>`;
  renderRsvMsgs();
  try{renderRsvRoadmap();}catch(e){}
  try{rsvComposerSync();}catch(e){}
}
let rsvImg=null,rsvMicRec=null,rsvMicOn=false;
function rsvComposerSync(){const ta=document.getElementById('rsvInput'),b=document.getElementById('rsvSend');if(b&&ta)b.classList.toggle('on',ta.value.trim().length>0||!!rsvImg);}
function rsvRenderAtt(){const el=document.getElementById('rsvAtt');if(!el)return;if(rsvImg){el.className='rsv-att on';el.innerHTML='<div class="rsv-att-thumb" style="background-image:url('+rsvImg+')"><span class="rsv-att-x" id="rsvAttX">×</span></div>';}else{el.className='rsv-att';el.innerHTML='';}}
function rsvSubmit(){const ta=document.getElementById('rsvInput');if(!ta)return;const text=ta.value.trim();if(!text&&!rsvImg)return;const img=rsvImg;ta.value='';ta.style.height='auto';rsvImg=null;rsvRenderAtt();rsvComposerSync();rsvPlusClose();if(typeof rsvSend==='function')rsvSend(text,img);}
function rsvPlusClose(){const m=document.getElementById('rsvPlusMenu');if(m)m.classList.remove('on');}
function rsvMicToggle(){
  const mic=document.getElementById('rsvMic'),ta=document.getElementById('rsvInput');
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){try{showToast(tr('mt_no_voice'));}catch(_){}return;}
  if(rsvMicOn&&rsvMicRec){try{rsvMicRec.stop();}catch(_){}return;}
  try{rsvMicRec=new SR();}catch(e){return;}
  rsvMicRec.lang=(typeof LANG!=='undefined'?(LANG==='it'?'it-IT':LANG):'it-IT');rsvMicRec.interimResults=false;rsvMicRec.continuous=false;
  rsvMicRec.onresult=(ev)=>{let s='';for(let i=ev.resultIndex;i<ev.results.length;i++)s+=ev.results[i][0].transcript;s=s.trim();if(s&&ta){ta.value=(ta.value?ta.value.replace(/\s*$/,'')+' ':'')+s;ta.dispatchEvent(new Event('input',{bubbles:true}));ta.focus();}};
  rsvMicRec.onend=()=>{rsvMicOn=false;if(mic)mic.classList.remove('rec');};
  rsvMicRec.onerror=()=>{rsvMicOn=false;if(mic)mic.classList.remove('rec');};
  rsvMicOn=true;if(mic)mic.classList.add('rec');try{rsvMicRec.start();}catch(e){rsvMicOn=false;if(mic)mic.classList.remove('rec');}
}
function tpRefreshLists(){try{renderTasks();}catch(e){}try{buildCalendar();}catch(e){}try{renderHomeAlerts();}catch(e){}try{renderSideTasks();}catch(e){}try{if(document.getElementById('calView')&&document.getElementById('calView').style.display!=='none')renderCalendar();}catch(e){}try{if(document.querySelector('.page[data-page="projectdetail"].active'))renderPdTasks();}catch(e){}}
function tdwFlipPanel(toOpen){
  const tdw=document.querySelector('.tdw'),panel=document.getElementById('tdwPanel');if(!tdw||!panel)return;
  const first=panel.getBoundingClientRect();
  tdw.classList.toggle('chat-open',toOpen);
  const last=panel.getBoundingClientRect();
  const dx=Math.round(first.left-last.left),dy=Math.round(first.top-last.top);
  panel.style.transformOrigin='top left';panel.style.transition='none';panel.style.transform='translate('+dx+'px,'+dy+'px)';panel.style.opacity='0';
  tdw.classList.add('tdw-animating');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{panel.style.transition='transform .48s cubic-bezier(.22,1,.36,1),opacity .34s ease';panel.style.transform='';panel.style.opacity='';}));
  setTimeout(()=>{panel.style.transition='';panel.style.transform='';panel.style.opacity='';panel.style.transformOrigin='';tdw.classList.remove('tdw-animating');},520);
}
function openTaskChat(){
  const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;
  const e=rsvGet(t.id);e.opened=true;e.state='active';e.unread=false;if(!e.msgs.length)e.msgs.push({r:'ai',t:rsvFirstResponse(t),starters:rsvStarters()});rsvSave();
  tdwFlipPanel(true);renderRsvMsgs();
  const inp=document.getElementById('rsvInput');if(inp)setTimeout(()=>inp.focus(),160);
}
function openResolveChat(id){
  const t=TASKS.find(x=>x.id===id);if(!t)return;
  const e=rsvGet(id);e.state='active';e.unread=false;if(!e.msgs.length)e.msgs.push({r:'ai',t:rsvFirstResponse(t),starters:rsvStarters()});rsvSave();
  openTaskPage(id, true); // apre in modalità chat
  requestAnimationFrame(()=>requestAnimationFrame(()=>{try{rsvPlayMorph();}catch(_){}})); // trasforma il box home → chat
}
function closeTaskChat(){
  const t=TASKS.find(x=>x.id==taskPageId);if(t){const e=rsvGet(t.id);e.opened=false;rsvSave();}
  tdwFlipPanel(false);
}
{const tp=document.getElementById('taskPageBody');
 if(tp)tp.addEventListener('click',e=>{
   if(e.target.closest('#rsvScopeBtn')){e.stopPropagation();rsvToggleScopeMenu();return;}
   {const sc=e.target.closest('[data-rsvscope]');if(sc){rsvSetScope(sc.dataset.rsvscope);return;}}
   const gOpen=e.target.closest('[data-grpopen]');if(gOpen){if(typeof openGroupPage==='function')openGroupPage(+gOpen.dataset.grpopen);return;}
   if(e.target.closest('#tdwInfoBtn')){tdwPanelHidden=!tdwPanelHidden;const tdw=document.querySelector('.tdw');if(tdw)tdw.classList.toggle('panel-hidden',tdwPanelHidden);const b=document.getElementById('tdwInfoBtn');if(b)b.classList.toggle('on',!tdwPanelHidden);return;}
   if(e.target.closest('#tdwOpenChat')){openTaskChat();return;}
   if(e.target.closest('#tdwCloseChat')){closeTaskChat();return;}
   if(e.target.closest('[data-rsvstart]')){rsvStart();return;}
   if(e.target.closest('[data-rsvdecline]')){rsvDecline();return;}
   {const ra=e.target.closest('[data-rmaccept]');if(ra){try{const steps=JSON.parse(decodeURIComponent(ra.dataset.rmaccept));if(steps&&steps.length)rsvAcceptRoadmap(steps);}catch(_){}return;}}
   {const rc=e.target.closest('[data-rmchk]');if(rc){const t=TASKS.find(x=>x.id==taskPageId);if(t){const en=rsvGet(t.id);const i=+rc.dataset.rmchk;if(en.roadmap&&en.roadmap.steps[i]){en.roadmap.steps[i].done=!en.roadmap.steps[i].done;rsvSave();rsvUpdateRoadmapUI();}}return;}}
   {const ro=e.target.closest('[data-rmopen]');if(ro){const tdw=document.querySelector('.tdw');if(tdw){tdw.classList.add('has-roadmap');tdw.classList.add('panel-hidden');}tdwPanelHidden=true;const b=document.getElementById('tdwInfoBtn');if(b)b.classList.remove('on');rsvStepView=+ro.dataset.rmopen;renderRsvStepDetail(rsvStepView);renderRsvMsgs();return;}}
   {const rd=e.target.closest('[data-rmdone]');if(rd){const t=TASKS.find(x=>x.id==taskPageId);if(t){const en=rsvGet(t.id);const i=+rd.dataset.rmdone;if(en.roadmap&&en.roadmap.steps[i]){en.roadmap.steps[i].done=!en.roadmap.steps[i].done;rsvSave();renderRsvStepDetail(i);}}return;}}
   {const rg=e.target.closest('[data-rmregen]');if(rg){const t=TASKS.find(x=>x.id==taskPageId);if(t){const en=rsvGet(t.id);const i=+rg.dataset.rmregen;if(en.roadmap&&en.roadmap.steps[i]){delete en.roadmap.steps[i].guide;rsvSave();renderRsvStepDetail(i);rsvGenStep(i);}}return;}}
   {const rcp=e.target.closest('[data-rmcopy]');if(rcp){const t=TASKS.find(x=>x.id==taskPageId);if(t){const en=rsvGet(t.id);const parts=rcp.dataset.rmcopy.split(':');const st=en.roadmap&&en.roadmap.steps[+parts[0]];const pr=st&&st.guide&&st.guide.prompts&&st.guide.prompts[+parts[1]];if(pr){try{navigator.clipboard.writeText(pr.text);}catch(_){}rcp.textContent=tr('rsv_g_copied');setTimeout(()=>{try{rcp.textContent=tr('rsv_g_copy');}catch(_){}},1400);}}return;}}
   if(e.target.closest('#rmCardOpen')){rsvOpenRoadmapPanel();return;}
   if(e.target.closest('#rmStepBack')){rsvStepView=null;renderRsvRoadmap();return;}
   if(e.target.closest('#rmComplete')){const t=TASKS.find(x=>x.id==taskPageId);if(t){setTaskDone(t,true);saveTasks();try{renderTaskPage();}catch(_){}try{renderTasks();}catch(_){}renderRsvRoadmap();}return;}
   if(e.target.closest('#rmToTasks')){rsvStepsToTasks();return;}
   if(e.target.closest('#rmClose')){const tdw=document.querySelector('.tdw');if(tdw)tdw.classList.remove('has-roadmap');tdwPanelHidden=true;if(tdw)tdw.classList.add('panel-hidden');const b=document.getElementById('tdwInfoBtn');if(b)b.classList.remove('on');rsvStepView=null;renderRsvMsgs();return;}
   // --- Prompt Input Box ---
   if(e.target.closest('#rsvSend')){rsvSubmit();return;}
   if(e.target.closest('#rsvRoadmapCTA')){rsvOpenRoadmap();return;}
   if(e.target.closest('#rsvMakeRoadmap')){rsvPlusClose();rsvMakeRoadmap();return;}
   if(e.target.closest('#rsvPlus')){e.stopPropagation();const m=document.getElementById('rsvPlusMenu');if(m)m.classList.toggle('on');return;}
   if(e.target.closest('#rsvAddImg')){rsvPlusClose();const f=document.getElementById('rsvFile');if(f)f.click();return;}
   if(e.target.closest('#rsvAnalyze')){rsvPlusClose();const ta=document.getElementById('rsvInput');if(ta){if(!/https?:\/\//i.test(ta.value))ta.value=(ta.value?ta.value.replace(/\s*$/,'')+' ':'')+tr('rsv_analyze_prefix')+' ';ta.focus();ta.dispatchEvent(new Event('input',{bubbles:true}));}return;}
   if(e.target.closest('#rsvAttX')){rsvImg=null;rsvRenderAtt();rsvComposerSync();return;}
   if(e.target.closest('#rsvMic')){rsvMicToggle();return;}
   {const op=e.target.closest('[data-rsvopt]');if(op){rsvSend(decodeURIComponent(op.dataset.rsvopt));return;}}
   if(e.target.closest('#pibClip')){const f=document.getElementById('pibFile');if(f)f.click();return;}
   {const md=e.target.closest('.pib-mode');if(md){pibToggleMode(md.dataset.pmode);return;}}
   if(e.target.closest('#pibThumbRm')){e.stopPropagation();pibClearImage();return;}
   if(e.target.closest('#pibThumbInner')){pibOpenPreview();return;}
   const t=TASKS.find(x=>x.id==taskPageId);if(!t)return;
   if(e.target.closest('#tdCheck')||e.target.closest('#tdToggle')){const willDone=!t.done;setTaskDone(t,willDone);tdwJustDone=willDone;saveTasks();renderTaskPage();tpRefreshLists();return;}
   if(e.target.closest('#tdEdit')){tdwEdit=true;renderTaskPage();return;}
   if(e.target.closest('#tdCancel')){tdwEdit=false;renderTaskPage();return;}
   if(e.target.closest('#tdSave')){
     const g=id=>document.getElementById(id);
     const nm=(g('edTitle').value||'').trim();if(nm){delete t.tk;t.title=nm;}
     const dv=(g('edDesc').value||'').trim();if(dv)t.desc=dv;else delete t.desc;
     const dt=g('edDate').value;if(dt){const p=dt.split('-').map(Number);t.date=[p[0],p[1]-1,p[2]];delete t.month;}
     const tm=g('edTime').value;if(tm)t.time=tm;else delete t.time;
     const tg=(g('edTag').value||'').trim();if(tg){t.tag={l:tg,c:(t.tag&&t.tag.c)||TCOLORS[0]};}else delete t.tag;
     const tgt=parseInt(g('edTarget').value,10);if(tgt&&tgt>1){const cur=t.level?Math.min(t.level.cur,tgt):0;t.level={cur,tgt};t.done=cur>=tgt;}else delete t.level;
     saveTasks();tdwEdit=false;renderTaskPage();tpRefreshLists();return;
   }
   if(e.target.closest('#tdDelete')){const id=t.id;askConfirm(tr('confirm_del_task'),()=>{TASKS=TASKS.filter(x=>x.id!==id);saveTasks();go(taskPageBack||'tasks');tpRefreshLists();});return;}
 });
 if(tp)tp.addEventListener('keydown',e=>{
   if(e.target&&e.target.id==='rsvInput'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();rsvSubmit();}
 });
 if(tp)tp.addEventListener('input',e=>{if(e.target&&e.target.id==='rsvInput'){e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,160)+'px';rsvComposerSync();}});
 if(tp)tp.addEventListener('change',e=>{if(e.target&&e.target.id==='rsvFile'){const f=e.target.files&&e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>{rsvImg=ev.target.result;rsvRenderAtt();rsvComposerSync();};r.readAsDataURL(f);}e.target.value='';}});
 document.addEventListener('click',e=>{if(!e.target.closest('#rsvPlus')&&!e.target.closest('#rsvPlusMenu'))rsvPlusClose();});
 if(tp)tp.addEventListener('focusin',e=>{if(e.target&&e.target.id==='rsvInput'){const p=document.getElementById('rsvPib');if(p)p.classList.add('focus');}});
 if(tp)tp.addEventListener('focusout',e=>{if(e.target&&e.target.id==='rsvInput'){const p=document.getElementById('rsvPib');if(p)p.classList.remove('focus');}});
 if(tp)tp.addEventListener('change',e=>{if(e.target&&e.target.id==='pibFile'){const f=e.target.files&&e.target.files[0];if(f)pibAddImage(f);e.target.value='';}});
 if(tp)tp.addEventListener('dragover',e=>{if(e.target.closest('#rsvPib')){e.preventDefault();}});
 if(tp)tp.addEventListener('drop',e=>{const p=e.target.closest('#rsvPib');if(p){e.preventDefault();const f=Array.from(e.dataTransfer.files||[]).find(x=>x.type.startsWith('image/'));if(f)pibAddImage(f);}});
}
// ===== Prompt Input Box (barra chat Resolve) — motore vanilla =====
let pibMode=null,pibImgData=null,pibRec=false,pibSec=0,pibTimerH=null;
function pibEl(id){return document.getElementById(id);}
function pibReset(){pibMode=null;pibImgData=null;pibRec=false;pibSec=0;if(pibTimerH){clearInterval(pibTimerH);pibTimerH=null;}}
function pibHasContent(){const t=pibEl('rsvInput');return (!!t&&t.value.trim().length>0)||!!pibImgData;}
function pibPlaceholder(){if(pibMode==='search')return tr('pib_ph_search');if(pibMode==='think')return tr('pib_ph_think');if(pibMode==='canvas')return tr('pib_ph_canvas');const tdw=document.querySelector('.tdw');return (tdw&&tdw.classList.contains('chat-active'))?tr('tdw_ph'):tr('tdw_ph_empty');}
function pibSync(){
  const pib=pibEl('rsvPib');if(!pib)return;
  const ta=pibEl('rsvInput');if(ta)ta.placeholder=pibPlaceholder();
  const act=pibEl('pibAction');
  if(act){let icon=PIB_ICONS.mic,cls='',title=tr('pib_voice');
    if(pibRec){icon=PIB_ICONS.stop;cls=' rec';title=tr('pib_stop');}
    else if(pibHasContent()){icon=PIB_ICONS.arrow;cls=' send';title=tr('pib_send');}
    act.className='pib-action'+cls;act.innerHTML=icon;act.title=title;}
  document.querySelectorAll('#rsvPib .pib-mode').forEach(b=>b.classList.toggle('on',b.dataset.pmode===pibMode));
  pib.classList.toggle('recording',pibRec);
}
function pibRenderThumb(){
  const tw=pibEl('pibThumb');if(!tw)return;
  if(!pibImgData){tw.className='pib-thumb';tw.innerHTML='';return;}
  tw.className='pib-thumb on';
  tw.innerHTML='<div class="pib-thumb-inner" id="pibThumbInner"><img src="'+pibImgData+'" alt=""><button type="button" class="pib-thumb-rm" id="pibThumbRm" title="'+tr('pib_remove')+'">'+PIB_ICONS.close+'</button></div>';
}
function pibAddImage(file){if(!file||!file.type.startsWith('image/')||file.size>10*1024*1024)return;const rd=new FileReader();rd.onload=()=>{pibImgData=String(rd.result);pibRenderThumb();pibSync();};rd.readAsDataURL(file);}
function pibClearImage(){pibImgData=null;pibRenderThumb();pibSync();const f=pibEl('pibFile');if(f)f.value='';}
function pibToggleMode(m){pibMode=(pibMode===m?null:m);pibSync();const ta=pibEl('rsvInput');if(ta)ta.focus();}
function pibFmt(sec){const m=Math.floor(sec/60),s=sec%60;return ('0'+m).slice(-2)+':'+('0'+s).slice(-2);}
function pibBuildViz(){const v=pibEl('pibViz');if(!v)return;let h='';for(let i=0;i<32;i++){const ht=18+Math.round(Math.random()*78),de=(i*0.035).toFixed(3),du=(0.45+Math.random()*0.45).toFixed(2);h+='<span class="pib-bar" style="height:'+ht+'%;animation-delay:'+de+'s;animation-duration:'+du+'s"></span>';}v.innerHTML=h;}
function pibStartRec(){pibRec=true;pibSec=0;const tm=pibEl('pibTimer');if(tm)tm.textContent='00:00';pibBuildViz();pibSync();if(pibTimerH)clearInterval(pibTimerH);pibTimerH=setInterval(()=>{pibSec++;const t=pibEl('pibTimer');if(t)t.textContent=pibFmt(pibSec);},1000);}
function pibStopRec(send){const sec=pibSec;if(pibTimerH){clearInterval(pibTimerH);pibTimerH=null;}pibRec=false;pibSec=0;pibSync();if(send&&typeof rsvSend==='function')rsvSend(tr('pib_voicemsg').replace('%s',sec));}
function pibSubmit(){const ta=pibEl('rsvInput');if(!ta)return;const text=ta.value.trim();if(!text&&!pibImgData)return;
  let msg=text;
  if(pibMode){const lbl=pibMode==='search'?tr('pib_search'):pibMode==='think'?tr('pib_think'):tr('pib_canvas');msg=(text?'['+lbl+': '+text+']':'['+lbl+']');}
  if(!text&&pibImgData)msg=(msg?msg+' ':'')+tr('pib_imgmsg');
  if(typeof rsvSend==='function')rsvSend(msg);
  ta.value='';ta.style.height='';pibClearImage();pibSync();requestAnimationFrame(()=>ta.focus());
}
function pibInit(){pibReset();pibRenderThumb();pibSync();}
function pibOpenPreview(){if(!pibImgData)return;const im=pibEl('pibPreviewImg');if(im)im.src=pibImgData;const ov=pibEl('pibPreview');if(ov)ov.classList.add('on');}
function pibClosePreview(){const ov=pibEl('pibPreview');if(ov)ov.classList.remove('on');}
{const ov=document.getElementById('pibPreview');
 if(ov)ov.addEventListener('mousedown',e=>{if(!e.target.closest('#pibPreviewCard')||e.target.closest('#pibPreviewClose'))pibClosePreview();});
 const cb=document.getElementById('pibPreviewClose');if(cb)cb.innerHTML=PIB_ICONS.close;
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const o=document.getElementById('pibPreview');if(o&&o.classList.contains('on'))pibClosePreview();}});
}
document.addEventListener('paste',e=>{
  const pib=document.getElementById('rsvPib');const tdw=document.querySelector('.tdw.chat-active');
  if(!pib||!tdw)return;
  const it=Array.from((e.clipboardData&&e.clipboardData.items)||[]).find(x=>x.type.startsWith('image/'));
  const f=it&&it.getAsFile();if(f){e.preventDefault();pibAddImage(f);}
});
function openEditTask(id){
  const t=TASKS.find(x=>x.id==id);if(!t)return;
  ntEditId=t.id;ntTeamCtx=null;ntImages=t.images?t.images.slice():[];
  ntScope=t.scope||'personal';ntColor=(t.tag&&t.tag.c)||TCOLORS[0];ntGid=(t.gid!=null)?t.gid:null;ntCatId=(t.catId!=null)?t.catId:null;
  document.getElementById('ntName').value=taskTitle(t);
  document.getElementById('ntDesc').value=t.desc||'';
  document.getElementById('ntTag').value=t.tag?(t.tag.lk?tr(t.tag.lk):(t.tag.l||'')):'';
  document.getElementById('ntTarget').value=t.level?t.level.tgt:'';
  document.getElementById('ntTime').value=t.time||'';
  ntUpdateColorDot();
  // scadenza
  ntDueMode=t.month?'month':'date';
  document.querySelectorAll('#ntDueType .s').forEach(x=>x.classList.toggle('active',x.dataset.due===ntDueMode));
  document.querySelectorAll('#ntDateQuick .nt-dchip').forEach(x=>x.classList.remove('active'));
  if(t.month){document.getElementById('ntMonth').value=t.month[0]+'-'+String(t.month[1]+1).padStart(2,'0');document.getElementById('ntDate').value='';}
  else if(t.date){document.getElementById('ntDate').value=t.date[0]+'-'+String(t.date[1]+1).padStart(2,'0')+'-'+String(t.date[2]).padStart(2,'0');document.getElementById('ntMonth').value='';}
  else{document.getElementById('ntDate').value='';document.getElementById('ntMonth').value='';}
  document.getElementById('ntDateBtn').style.display=ntDueMode==='date'?'flex':'none';
  document.getElementById('ntMonthBtn').style.display=ntDueMode==='month'?'flex':'none';
  document.getElementById('ntDateQuick').style.display=ntDueMode==='date'?'flex':'none';ntCloseCal();ntCloseMonth();ntUpdateDateLabel();ntUpdateMonthLabel();
  ntType='task';ntShowFormFor('task');
  {const a=document.getElementById('ntAdv');if(a)a.style.display='';const at=document.getElementById('ntAdvToggle');if(at)at.classList.add('open');}
  renderNtGroup();
  // in modifica si va diretti allo step 2 (niente picker, back nascosto)
  {const ft=document.getElementById('ntFormTitle');if(ft)ft.textContent=tr('nt_edit');}
  {const fic=document.getElementById('ntFormIc');if(fic)fic.innerHTML=NT_TYPES.task.ic;const ident=document.getElementById('ntFormIdent');if(ident){ident.classList.remove('nt-ident-in');void ident.offsetWidth;ident.classList.add('nt-ident-in');}}
  {const bk=document.getElementById('ntBack');if(bk)bk.style.display='none';}
  document.getElementById('ntCreate').textContent=tr('nt_save');
  document.getElementById('ntDelete').style.display='block';
  renderNtImgs();ntShowStep('form');tkOv.classList.add('open');
}
document.getElementById('ntDelete').addEventListener('click',()=>{
  if(ntEditId==null)return;const id=ntEditId;
  askConfirm(tr('confirm_del_task'),()=>{
    TASKS=TASKS.filter(t=>t.id!==id);saveTasks();
    tkOv.classList.remove('open');ntEditId=null;
    renderTasks();buildCalendar();if(document.getElementById('calView').style.display!=='none')renderCalendar();renderHomeAlerts();
    if(document.querySelector('.page[data-page="projectdetail"].active'))renderPdTasks();
    try{renderSideTasks();}catch(e){}
    if(document.querySelector('.page[data-page="taskdetail"].active'))go(taskPageBack||'tasks');
  });
});
document.getElementById('newTaskBtn').addEventListener('click',()=>openNewTask());
document.getElementById('taskModalX').addEventListener('click',()=>tkOv.classList.remove('open'));
tkOv.addEventListener('click',e=>{if(e.target===tkOv)tkOv.classList.remove('open');});
document.getElementById('ntCreate').addEventListener('click',()=>{
  const name=document.getElementById('ntName').value.trim();if(!name)return;
  if(ntEditId==null&&!guardTask())return;
  const tag=document.getElementById('ntTag').value.trim();
  const tgt=parseInt(document.getElementById('ntTarget').value,10);
  const desc=document.getElementById('ntDesc').value.trim();
  // calcolo scadenza scelta (data o mese)
  let dDate=null,dMonth=null;const dTime=document.getElementById('ntTime').value||null;
  if(ntDueMode==='month'){const mv=document.getElementById('ntMonth').value;if(mv){const p=mv.split('-').map(Number);dMonth=[p[0],p[1]-1];}}
  else{const dv=document.getElementById('ntDate').value;if(dv){const p=dv.split('-').map(Number);dDate=[p[0],p[1]-1,p[2]];}}
  // --- MODALITÀ MODIFICA: aggiorna il task esistente ---
  if(ntEditId!=null){
    const t=TASKS.find(x=>x.id===ntEditId);
    if(t){
      delete t.tk;t.title=name;t.scope=ntScope;
      if(desc)t.desc=desc;else delete t.desc;
      if(tag){t.tag={l:tag,c:ntColor};delete t.tag.lk;}else delete t.tag;
      if(tgt&&tgt>1){const cur=t.level?Math.min(t.level.cur,tgt):0;t.level={cur,tgt};t.done=cur>=tgt;}else delete t.level;
      t.images=ntImages.length?ntImages.slice():undefined;if(!t.images)delete t.images;
      delete t.date;delete t.month;
      if(dMonth)t.month=dMonth;else t.date=dDate||realToday();
      if(dTime)t.time=dTime;else delete t.time;
      if(ntGid!=null){t.gid=ntGid;const lp=grpLinkedProject(ntGid);if(lp!=null)t.projectId=lp;}else delete t.gid;
      if(ntCatId!=null)t.catId=ntCatId;else delete t.catId;
      saveTasks();
    }
    tkOv.classList.remove('open');ntEditId=null;
    buildCalendar();renderTasks();renderHomeAlerts();if(document.getElementById('calView').style.display!=='none')renderCalendar();if(document.querySelector('.page[data-page="projectdetail"].active'))renderPdTasks();
    try{renderSideTasks();}catch(e){}
    if(document.querySelector('.page[data-page="taskdetail"].active'))renderTaskPage();
    return;
  }
  const task={id:++TID,title:name,scope:ntScope,done:false};
  if(ntDueMode==='month'){const mv=document.getElementById('ntMonth').value;if(mv){const p=mv.split('-').map(Number);task.month=[p[0],p[1]-1];}}
  else{const dv=document.getElementById('ntDate').value;if(dv){const p=dv.split('-').map(Number);task.date=[p[0],p[1]-1,p[2]];}}
  if(!task.date&&!task.month)task.date=pendingDate||realToday();
  if(dTime)task.time=dTime;
  if(desc)task.desc=desc;
  if(tag)task.tag={l:tag,c:ntColor};
  if(tgt&&tgt>1)task.level={cur:0,tgt:tgt};
  if(ntImages.length)task.images=ntImages.slice();
  if(ntGid!=null){task.gid=ntGid;const lp=grpLinkedProject(ntGid);if(lp!=null)task.projectId=lp;}
  if(ntCatId!=null)task.catId=ntCatId;
  if(ntTeamCtx){
    task.scope='team:'+ntTeamCtx.tid;
    if(ntAssignee==='me'){TASKS.push(task);tasksTodayInc();logFeed(ntTeamCtx,firstName(USER.name)+' '+tr('feed_created')+' "'+task.title+'"');}
    else{
      const mi=+ntAssignee.slice(1);let dl='';
      if(task.date)dl=`${task.date[0]}-${String(task.date[1]+1).padStart(2,'0')}-${String(task.date[2]).padStart(2,'0')}`;
      else if(task.month)dl=`${task.month[0]}-${String(task.month[1]+1).padStart(2,'0')}`;
      chatMsgs(ntTeamCtx,'dm:'+mi).push({proposal:true,mine:true,title:task.title,deadline:dl,status:'pending',draft:task});
      showToast(tr('proposal_sent'));
    }
    tkOv.classList.remove('open');if(typeof renderTeamMain==='function')renderTeamMain();
    return;
  }
  TASKS.push(task);tasksTodayInc();saveTasks();
  if(task.month){ovScope={mode:'month',y:task.month[0],m:task.month[1]};miniCur=new Date(task.month[0],task.month[1],1);}
  else{ovScope={mode:'day',d:task.date.slice()};miniCur=new Date(task.date[0],task.date[1],1);}
  tkOv.classList.remove('open');buildCalendar();renderTasks();if(document.getElementById('calView').style.display!=='none')renderCalendar();
});

// ---------- Big calendar ----------
let calMode='month',calCur=new Date();
function calMatch(t){const q=((document.getElementById('calSearch')||{}).value||'').toLowerCase();return !q||taskTitle(t).toLowerCase().includes(q);}
function calTasksFor(y,m,d){return TASKS.filter(t=>(taskFilter==='all'||t.scope===taskFilter)&&(catFilter==null||t.catId===catFilter)&&calMatch(t)&&taskOnDay(t,y,m,d));}
function chipHTML(t){return `<div class="chip ${t.done?'dn':''}" style="background:${t.tag?t.tag.c:'#8a8f98'}">${taskTitle(t)}</div>`;}
function renderCalendar(){
  const box=document.getElementById('bigcal');if(!box)return;
  box.classList.add('plain');
  const months=MONTHS[LANG]||MONTHS.it,dows=DOWS[LANG]||DOWS.it,now=new Date();
  if(calMode==='month'){
    const y=calCur.getFullYear(),m=calCur.getMonth();
    document.getElementById('calRange').textContent=`${months[m]} ${y}`;
    const first=new Date(y,m,1).getDay(),start=(first+6)%7;
    const days=new Date(y,m+1,0).getDate(),prev=new Date(y,m,0).getDate();
    let cells='';
    for(let i=0;i<start;i++)cells+=`<div class="mcal-cell out"><div class="mcal-daynum">${prev-start+i+1}</div></div>`;
    for(let d=1;d<=days;d++){
      const isT=now.getFullYear()===y&&now.getMonth()===m&&now.getDate()===d;
      const chips=calTasksFor(y,m,d).map(chipHTML).join('');
      cells+=`<div class="mcal-cell${isT?' today':''}" data-d="${y}-${m}-${d}"><div class="mcal-daynum">${d}</div>${chips}</div>`;
    }
    const rem=(7-(start+days)%7)%7;
    for(let i=1;i<=rem;i++)cells+=`<div class="mcal-cell out"><div class="mcal-daynum">${i}</div></div>`;
    box.innerHTML=`<div class="mcal-head">${dows.map(d=>`<div>${d}</div>`).join('')}</div><div class="mcal-grid">${cells}</div>`;
  }else if(calMode==='day'){
    const y=calCur.getFullYear(),m=calCur.getMonth(),d=calCur.getDate();
    const isT=now.getFullYear()===y&&now.getMonth()===m&&now.getDate()===d;
    document.getElementById('calRange').textContent=`${dows[(new Date(y,m,d).getDay()+6)%7]} ${d} ${months[m]} ${y}`;
    const items=calTasksFor(y,m,d).slice().sort((a,b)=>((a.time||'99:99')<(b.time||'99:99')?-1:1));
    const rows=items.length?items.map(t=>`<div class="dcal-row" data-id="${t.id}"><span class="dcal-time">${t.time||'—'}</span><span class="dcal-dot" style="background:${t.tag?t.tag.c:'#8a8f98'}"></span><span class="dcal-t${t.done?' dn':''}">${taskTitle(t)}</span></div>`).join(''):`<div class="dcal-empty">${tr('no_tasks')}</div>`;
    box.innerHTML=`<div class="dcal"><div class="dcal-h${isT?' today':''}" data-d="${y}-${m}-${d}">${d} ${months[m]}</div><div class="dcal-list">${rows}</div></div>`;
  }else if(calMode==='year'){
    const y=calCur.getFullYear();
    document.getElementById('calRange').textContent=`${y}`;
    let html='<div class="ycal">';
    for(let mm=0;mm<12;mm++){
      const first=new Date(y,mm,1).getDay(),start=(first+6)%7,dim=new Date(y,mm+1,0).getDate(),prevDim=new Date(y,mm,0).getDate();
      let cells='';
      for(let i=0;i<start;i++)cells+=`<span class="yc-o">${prevDim-start+i+1}</span>`;
      for(let dd=1;dd<=dim;dd++){const isT=now.getFullYear()===y&&now.getMonth()===mm&&now.getDate()===dd;const has=calTasksFor(y,mm,dd).length;cells+=`<span class="yc-d${isT?' today':''}${has?' has':''}" data-d="${y}-${mm}-${dd}">${dd}</span>`;}
      const trail=42-start-dim;for(let i=1;i<=trail;i++)cells+=`<span class="yc-o">${i}</span>`;
      html+=`<div class="ycal-m"><div class="ycal-mh" data-ym="${y}-${mm}">${months[mm]}</div><div class="ycal-dows">${dows.map(x=>`<span>${x.slice(0,1)}</span>`).join('')}</div><div class="ycal-grid">${cells}</div></div>`;
    }
    box.innerHTML=html+'</div>';
  }else{
    const base=new Date(calCur);base.setDate(base.getDate()-((base.getDay()+6)%7));
    const cols=[];for(let i=0;i<7;i++){const dt=new Date(base);dt.setDate(base.getDate()+i);cols.push(dt);}
    const a=cols[0],b=cols[6];
    document.getElementById('calRange').textContent=`${a.getDate()} ${months[a.getMonth()].slice(0,3)} - ${b.getDate()} ${months[b.getMonth()].slice(0,3)}`;
    let html='<div class="wcal">';
    cols.forEach((dt,i)=>{
      const y=dt.getFullYear(),m=dt.getMonth(),d=dt.getDate();
      const isT=now.getFullYear()===y&&now.getMonth()===m&&now.getDate()===d;
      const chips=calTasksFor(y,m,d).map(chipHTML).join('');
      html+=`<div class="wcal-col"><div class="wcal-colh${isT?' today':''}" data-d="${y}-${m}-${d}"><div class="wcal-dow">${dows[i]}</div><div class="wcal-dnum">${d}</div></div><div class="wcal-body">${chips}</div></div>`;
    });
    box.innerHTML=html+'</div>';
  }
}
function calStep(dir){if(calMode==='month')calCur.setMonth(calCur.getMonth()+dir);else if(calMode==='week')calCur.setDate(calCur.getDate()+7*dir);else if(calMode==='day')calCur.setDate(calCur.getDate()+dir);else if(calMode==='year')calCur.setFullYear(calCur.getFullYear()+dir);renderCalendar();}
document.getElementById('calPrev').addEventListener('click',()=>calStep(-1));
document.getElementById('calNext').addEventListener('click',()=>calStep(1));
document.getElementById('calToday').addEventListener('click',()=>{calCur=new Date();renderCalendar();});
document.getElementById('calSearch').addEventListener('input',renderCalendar);
{const cs=document.getElementById('calScope');if(cs)cs.addEventListener('click',e=>{const s=e.target.closest('[data-cal]');if(!s)return;document.querySelectorAll('#calScope [data-cal]').forEach(x=>x.classList.toggle('active',x===s));calMode=s.dataset.cal;renderCalendar();});}
document.getElementById('bigcal').addEventListener('click',e=>{
  const ym=e.target.closest('[data-ym]');if(ym){const p=ym.dataset.ym.split('-').map(Number);calCur=new Date(p[0],p[1],1);calMode='month';document.querySelectorAll('#calScope [data-cal]').forEach(x=>x.classList.toggle('active',x.dataset.cal==='month'));renderCalendar();return;}
  const drow=e.target.closest('.dcal-row[data-id]');if(drow){openTaskPage(+drow.dataset.id);return;}
  const cell=e.target.closest('[data-d]');if(!cell)return;openNewTask();const dd=cell.dataset.d.split('-').map(Number);document.getElementById('ntDate').value=`${dd[0]}-${String(dd[1]+1).padStart(2,'0')}-${String(dd[2]).padStart(2,'0')}`;});

// ---------- Chat echo ----------
function wireChat(input,body){
  function send(){
    const v=input.value.trim();if(!v)return;
    body.insertAdjacentHTML('beforeend',`<div class="msg me"><div class="msg-text">${v}</div></div>`);
    input.value='';body.scrollTop=body.scrollHeight;
    setTimeout(()=>{
      body.insertAdjacentHTML('beforeend',`<div class="msg"><div class="av">${SVG.av}</div><div class="msg-text">${tr('working')}</div></div>`);
      body.scrollTop=body.scrollHeight;
    },500);
  }
  input.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
  return send;
}
const acIn=document.getElementById('agentChatInput'),acBody=document.getElementById('agentChatBody');
const acSend=wireChat(acIn,acBody);
document.getElementById('agentChatSend').addEventListener('click',acSend);
// home mini-chat
document.querySelectorAll('[data-echo]').forEach(inp=>{
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){
    const mc=inp.closest('.mini-chat');
    mc.querySelector('.chat-input').insertAdjacentHTML('beforebegin',`<div class="msg me"><div class="msg-text">${inp.value.trim()}</div></div>`);
    inp.value='';
  }});
});

// ---------- Mini calendar (overview) ----------
function buildCalendar(){
  const cal=document.getElementById('cal');if(!cal)return;
  const mc=(typeof miniCur!=='undefined')?miniCur:new Date();
  const y=mc.getFullYear(),m=mc.getMonth();
  const now=new Date(),tY=now.getFullYear(),tM=now.getMonth(),tD=now.getDate();
  const months=MONTHS[LANG]||MONTHS.it,dow=DOWS[LANG]||DOWS.it;
  const first=new Date(y,m,1).getDay(),start=(first+6)%7;
  const days=new Date(y,m+1,0).getDate(),prevDays=new Date(y,m,0).getDate();
  const marked=new Set((typeof TASKS!=='undefined'?TASKS:[]).filter(t=>t.date&&t.date[0]===y&&t.date[1]===m).map(t=>t.date[2]));
  const monthSel=(typeof ovScope!=='undefined')&&ovScope.mode==='month'&&ovScope.y===y&&ovScope.m===m;
  let html=`<div class="cal-h"><div class="cal-month${monthSel?' on':''}" id="miniMonth">${months[m]} ${y}</div><div class="cal-nav"><span data-mininav="-1">‹</span><span data-mininav="1">›</span></div></div><div class="cal-grid">`;
  dow.forEach(d=>html+=`<div class="cal-dow">${d}</div>`);
  for(let i=0;i<start;i++)html+=`<div class="cal-day out">${prevDays-start+i+1}</div>`;
  for(let d=1;d<=days;d++){
    let cls='cal-day';
    const isToday=tY===y&&tM===m&&tD===d;
    const isSel=(typeof ovScope!=='undefined')&&ovScope.mode==='day'&&ovScope.d&&ovScope.d[0]===y&&ovScope.d[1]===m&&ovScope.d[2]===d;
    if(isSel)cls+=' sel';else if(isToday)cls+=' today';
    if(marked.has(d))cls+=' has';
    html+=`<div class="${cls}" data-miniday="${d}">${d}</div>`;
  }
  const rem=(start+days)%7;if(rem)for(let i=1;i<=7-rem;i++)html+=`<div class="cal-day out">${i}</div>`;
  html+='</div>';cal.innerHTML=html;
}

// ---------- Connessioni ----------
// Icone semplificate dei servizi (SVG)
const ICONS={
  gcal:`<svg viewBox="0 0 48 48"><rect x="9" y="9" width="30" height="30" rx="5" fill="#fff" stroke="#dadce0"/><path fill="#4285F4" d="M9 15a6 6 0 0 1 6-6h18a6 6 0 0 1 6 6v2H9z"/><text x="24" y="35" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="15" fill="#4285F4" text-anchor="middle">31</text></svg>`,
  gdocs:`<svg viewBox="0 0 48 48"><path fill="#4285F4" d="M14 5h13l9 9v27a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/><path fill="#A1C2FA" d="M27 5l9 9h-9z"/><g fill="#fff"><rect x="16" y="22" width="16" height="2.3" rx="1.1"/><rect x="16" y="27" width="16" height="2.3" rx="1.1"/><rect x="16" y="32" width="11" height="2.3" rx="1.1"/></g></svg>`,
  gsheets:`<svg viewBox="0 0 48 48"><path fill="#0F9D58" d="M14 5h13l9 9v27a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/><path fill="#87CEAC" d="M27 5l9 9h-9z"/><rect x="16" y="22" width="16" height="13" rx="1" fill="#fff"/><g stroke="#0F9D58" stroke-width="1.3"><path d="M16 26.7h16M16 31h16M21.3 22v13M26.7 22v13"/></g></svg>`,
  gslides:`<svg viewBox="0 0 48 48"><path fill="#F4B400" d="M14 5h13l9 9v27a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/><path fill="#FAD96B" d="M27 5l9 9h-9z"/><rect x="16" y="23" width="16" height="11" rx="1.5" fill="#fff"/></svg>`,
  gsuite:`<svg viewBox="0 0 48 48"><rect x="9" y="15" width="19" height="25" rx="3" fill="#F4B400"/><rect x="14" y="12" width="19" height="25" rx="3" fill="#0F9D58"/><rect x="19" y="9" width="19" height="25" rx="3" fill="#4285F4"/><g fill="#fff"><rect x="23" y="15" width="11" height="1.9" rx=".9"/><rect x="23" y="19" width="11" height="1.9" rx=".9"/><rect x="23" y="23" width="7" height="1.9" rx=".9"/></g></svg>`,
  spotify:`<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#1DB954"/><g fill="none" stroke="#fff" stroke-linecap="round"><path d="M14 19c7-2 15-1.4 21 1.7" stroke-width="3.2"/><path d="M15 25c6-1.6 12-1 17 1.5" stroke-width="2.6"/><path d="M16 30c5-1.2 9-.7 13 1" stroke-width="2.1"/></g></svg>`,
  gmail:`<svg viewBox="0 0 193 145" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M0 39.09V131.82C0 139.08 5.89 145 13.18 145H43.5V71.68Z"/><path fill="#34A853" d="M193 39.09V131.82C193 139.08 187.11 145 179.82 145H149.5V71.68Z"/><path fill="#FBBC04" d="M149.5 15.18V71.68L193 39.09V21.77C193 5.64 174.55-3.5 161.5 6.5Z"/><path fill="#C5221F" d="M0 21.77C0 5.64 18.45-3.5 31.5 6.5L43.5 15.18V71.68L0 39.09Z"/><path fill="#EA4335" d="M43.5 71.68V15.18L96.5 54.93 149.5 15.18V71.68L96.5 111.43Z"/></svg>`
};
const CONNECTIONS=[
  {name:'Gmail',dk:'cd4',icon:ICONS.gmail,on:false,app:'gmail'},
  {name:'Google Calendar',dk:'cd1',icon:ICONS.gcal,on:false,app:'gcal'},
  {name:'Outlook',dk:'cd_outlook',badge:'O',color:'#0078D4',on:false,app:'outlook'},
];
function connSave(){try{const m={};CONNECTIONS.forEach(c=>{if(c.app)m[c.app]=c.on;});localStorage.setItem(ukey('workie_connections'),JSON.stringify(m));}catch(e){}}
(function(){try{const s=JSON.parse(localStorage.getItem(ukey('workie_connections')));if(Array.isArray(s)){s.forEach((on,i)=>{if(CONNECTIONS[i])CONNECTIONS[i].on=!!on;});}else if(s&&typeof s==='object'){CONNECTIONS.forEach(c=>{if(c.app&&s[c.app]!=null)c.on=!!s[c.app];});}}catch(e){}})();
function connApps(){return CONNECTIONS.filter(c=>c.on&&c.app);}
const EMAIL_APPS=['gmail','outlook'];
function connCard(c,i){
  const logo=c.icon?`<div class="conn-logo brand">${c.icon}</div>`:`<div class="conn-logo" style="background:${c.color}">${c.badge}</div>`;
  const action=c.soon?`<span class="conn-soon">${tr('conn_soon')}</span>`:`<button class="conn-btn${c.on?' on':''}" data-conn="${i}">${c.on?tr('connected'):tr('connect')}</button>`;
  const card=`<div class="conn-card${c.soon?' soon':''}">${logo}<div class="conn-info"><div class="conn-name">${c.name}</div><div class="conn-desc">${tr(c.dk)}</div></div>${action}</div>`;
  if(EMAIL_APPS.includes(c.app)&&c.on){
    return `<div class="conn-emailwrap">${card}<button class="conn-backwf" data-backwf>${tr('conn_back_wf')} →</button></div>`;
  }
  return card;
}
function renderConn(){
  const active=document.getElementById('connActive'),avail=document.getElementById('connAvail'),soon=document.getElementById('connSoon');
  const act=CONNECTIONS.map((c,i)=>c.on?connCard(c,i):'').join('');
  active.innerHTML=act;
  document.getElementById('connActiveH').style.display=act?'block':'none';
  active.style.display=act?'grid':'none';
  avail.innerHTML=CONNECTIONS.map((c,i)=>(!c.on&&!c.soon)?connCard(c,i):'').join('');
  if(soon){const sn=CONNECTIONS.map((c,i)=>c.soon?connCard(c,i):'').join('');soon.innerHTML=sn;const sh=document.getElementById('connSoonH');if(sh)sh.style.display=sn?'block':'none';soon.style.display=sn?'grid':'none';}
}
try{renderConn();}catch(e){}
document.querySelector('[data-page="connections"]').addEventListener('click',e=>{
  if(e.target.closest('[data-backwf]')){if(typeof go==='function')go('workflow');return;}
  const b=e.target.closest('[data-conn]');if(!b)return;
  const i=+b.dataset.conn,c=CONNECTIONS[i];
  if(c.app==='gmail'){ if(c.on){gmailDisconnect();}else{gmailConnect();} return; }
  if(c.app==='outlook'){ if(c.on){outlookDisconnect();}else{outlookConnect();} return; }
  if(c.app==='gcal'){ if(c.on){gcalDisconnect();}else{gcalConnect();} return; }
  if(c.app==='spotify'){ if(c.on){spotifyDisconnect();}else{spotifyConnect();} return; }
  if(GDRIVE_APPS.includes(c.app)){ if(c.on){gdriveDisconnect(c.app);}else{gdriveConnect(c.app);} return; }
  c.on=!c.on;renderConn();connSave();
  showToast((c.on?tr('toast_connected_app'):tr('toast_disconnected')).replace('%s',c.name));
});

// ---------- Google Calendar (OAuth client-side, dati reali) ----------
const GOOGLE_CLIENT_ID='478819187843-42koo9sp0ujr6cib1t9dnvcddu66pt4t.apps.googleusercontent.com';
let gcalEvents=[],gcalLoading=false,gcalTC=null;
function gcalLoadToken(){try{const t=JSON.parse(localStorage.getItem(ukey('workie_gcal_token')));if(t&&t.token&&t.exp>Date.now())return t;}catch(e){}return null;}
function gcalSaveToken(token,expiresIn){try{localStorage.setItem(ukey('workie_gcal_token'),JSON.stringify({token,exp:Date.now()+(expiresIn-60)*1000}));}catch(e){}}
function gcalValidToken(){const t=gcalLoadToken();return t?t.token:null;}
function initGcalClient(){
  if(gcalTC)return true;
  if(typeof google==='undefined'||!google.accounts||!google.accounts.oauth2)return false;
  gcalTC=google.accounts.oauth2.initTokenClient({
    client_id:GOOGLE_CLIENT_ID,
    scope:'https://www.googleapis.com/auth/calendar.readonly',
    callback:(resp)=>{
      if(resp&&resp.access_token){
        gcalSaveToken(resp.access_token,resp.expires_in||3600);
        const c=CONNECTIONS.find(x=>x.app==='gcal');if(c){c.on=true;connSave();renderConn();}
        showToast(tr('toast_connected_app').replace('%s','Google Calendar'));
        gcalFetch();
      }else{showToast(tr('gcal_err'));}
    }
  });
  return true;
}
function gcalConnect(){
  if(!initGcalClient()){showToast(tr('gcal_loading'));setTimeout(gcalConnect,600);return;}
  gcalTC.requestAccessToken();
}
function gcalDisconnect(){
  const t=gcalValidToken();if(t&&typeof google!=='undefined'&&google.accounts&&google.accounts.oauth2){try{google.accounts.oauth2.revoke(t);}catch(e){}}
  try{localStorage.removeItem(ukey('workie_gcal_token'));}catch(e){}
  gcalEvents=[];const c=CONNECTIONS.find(x=>x.app==='gcal');if(c){c.on=false;connSave();renderConn();}
  if(typeof renderStage==='function')renderStage();
  showToast(tr('toast_disconnected').replace('%s','Google Calendar'));
}
function gcalFetch(){
  const t=gcalValidToken();if(!t)return;
  gcalLoading=true;if(typeof renderStage==='function')renderStage();
  const now=new Date().toISOString();
  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=8&singleEvents=true&orderBy=startTime&timeMin='+encodeURIComponent(now),{headers:{Authorization:'Bearer '+t}})
    .then(r=>r.json()).then(data=>{
      gcalLoading=false;
      if(data.error){gcalEvents=[];}else{gcalEvents=(data.items||[]).map(ev=>({title:ev.summary||tr('gcal_untitled'),start:ev.start&&(ev.start.dateTime||ev.start.date),allday:!!(ev.start&&ev.start.date&&!ev.start.dateTime)}));}
      if(typeof renderStage==='function')renderStage();
    }).catch(()=>{gcalLoading=false;if(typeof renderStage==='function')renderStage();});
}
function gcalWhen(ev){if(!ev.start)return '';const d=new Date(ev.start),t=realToday();const same=d.getFullYear()===t[0]&&d.getMonth()===t[1]&&d.getDate()===t[2];
  let day=same?tr('al_today_word'):d.toLocaleDateString(LOCALES[LANG],{day:'numeric',month:'short'});
  if(ev.allday)return day;
  try{return day+' · '+d.toLocaleTimeString(LOCALES[LANG],{hour:'2-digit',minute:'2-digit'});}catch(e){return day;}}
// all'avvio: se Google Calendar è collegato e il token è valido, carica gli eventi reali
if(CONNECTIONS.find(c=>c.app==='gcal'&&c.on)&&gcalValidToken())gcalFetch();

// ---------- Google Drive / Documenti (OAuth client-side, file reali) ----------
const GDRIVE_SCOPE='https://www.googleapis.com/auth/drive.file';
const GDRIVE_APPS=['gsuite','gdocs','gsheets','gslides'];
let gdriveFiles=[],gdriveLoading=false,gdriveTC=null,gdrivePendingApp=null;
function gdriveLoadToken(){try{const t=JSON.parse(localStorage.getItem(ukey('workie_gdrive_token')));if(t&&t.token&&t.exp>Date.now())return t;}catch(e){}return null;}
function gdriveSaveToken(token,expiresIn){try{localStorage.setItem(ukey('workie_gdrive_token'),JSON.stringify({token,exp:Date.now()+(expiresIn-60)*1000}));}catch(e){}}
function gdriveValidToken(){const t=gdriveLoadToken();return t?t.token:null;}
function gdriveSetOn(app){const c=CONNECTIONS.find(x=>x.app===app);if(c){c.on=true;connSave();renderConn();showToast(tr('toast_connected_app').replace('%s',c.name));}gdriveFetch();}
function initGdriveClient(){
  if(gdriveTC)return true;
  if(typeof google==='undefined'||!google.accounts||!google.accounts.oauth2)return false;
  gdriveTC=google.accounts.oauth2.initTokenClient({client_id:GOOGLE_CLIENT_ID,scope:GDRIVE_SCOPE,callback:(resp)=>{
    if(resp&&resp.access_token){gdriveSaveToken(resp.access_token,resp.expires_in||3600);const app=gdrivePendingApp;gdrivePendingApp=null;if(app)gdriveSetOn(app);else gdriveFetch();}
    else{showToast(tr('gcal_err'));}
  }});
  return true;
}
function gdriveConnect(app){
  if(gdriveValidToken()){gdriveSetOn(app);return;}
  gdrivePendingApp=app;
  if(!initGdriveClient()){showToast(tr('gcal_loading'));setTimeout(()=>gdriveConnect(app),600);return;}
  gdriveTC.requestAccessToken();
}
function gdriveDisconnect(app){
  const c=CONNECTIONS.find(x=>x.app===app);if(c){c.on=false;connSave();renderConn();}
  if(!CONNECTIONS.some(x=>GDRIVE_APPS.includes(x.app)&&x.on)){const t=gdriveValidToken();if(t&&typeof google!=='undefined'&&google.accounts&&google.accounts.oauth2){try{google.accounts.oauth2.revoke(t);}catch(e){}}try{localStorage.removeItem(ukey('workie_gdrive_token'));}catch(e){}gdriveFiles=[];}
  if(typeof renderStage==='function')renderStage();showToast(tr('toast_disconnected').replace('%s',c?c.name:''));
}
function gdriveLink(f){const id=f.id,mt=f.mimeType||'';if(f.webViewLink)return f.webViewLink;if(mt.includes('document'))return 'https://docs.google.com/document/d/'+id+'/edit';if(mt.includes('spreadsheet'))return 'https://docs.google.com/spreadsheets/d/'+id+'/edit';if(mt.includes('presentation'))return 'https://docs.google.com/presentation/d/'+id+'/edit';return 'https://drive.google.com/file/d/'+id+'/view';}
function gdriveIcon(mt){mt=mt||'';if(mt.includes('document'))return {e:'D',c:'#4285F4'};if(mt.includes('spreadsheet'))return {e:'S',c:'#0F9D58'};if(mt.includes('presentation'))return {e:'P',c:'#F4B400'};return {e:'·',c:'#5f6368'};}
function gdriveFetch(){
  const t=gdriveValidToken();if(!t)return;
  gdriveLoading=true;if(typeof renderStage==='function')renderStage();
  fetch("https://www.googleapis.com/drive/v3/files?orderBy=modifiedTime%20desc&pageSize=15&fields=files(id,name,mimeType,webViewLink)&q="+encodeURIComponent("mimeType contains 'application/vnd.google-apps' and trashed=false"),{headers:{Authorization:'Bearer '+t}})
    .then(r=>r.json()).then(data=>{gdriveLoading=false;gdriveFiles=data.error?[]:(data.files||[]).map(f=>({id:f.id,name:f.name||'',mimeType:f.mimeType||'',link:gdriveLink(f)}));if(typeof renderStage==='function')renderStage();})
    .catch(()=>{gdriveLoading=false;if(typeof renderStage==='function')renderStage();});
}
function gdriveCreate(kind,app){
  const t=gdriveValidToken();if(!t){gdriveConnect(app);return;}
  const map={document:{mime:'application/vnd.google-apps.document',name:tr('gd_new_doc')},spreadsheet:{mime:'application/vnd.google-apps.spreadsheet',name:tr('gd_new_sheet')},presentation:{mime:'application/vnd.google-apps.presentation',name:tr('gd_new_slides')}};
  const m=map[kind];if(!m)return;showToast(tr('gd_creating'));
  fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,webViewLink',{method:'POST',headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:JSON.stringify({name:m.name,mimeType:m.mime})})
    .then(r=>r.json()).then(f=>{if(f&&f.id){window.open(gdriveLink(f),'_blank','noopener');gdriveFetch();}else showToast(tr('gd_err'));})
    .catch(()=>showToast(tr('gd_err')));
}

// ---------- Gmail (OAuth GIS client-side, inbox reale → base di Workflow) ----------
const GMAIL_SCOPE='https://www.googleapis.com/auth/gmail.readonly';
let GMAIL_MSGS=[],gmailLoading=false,gmailTC=null,gmailError='',GMAIL_EMAIL='';
const GM_ENVELOPE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
const GM_REFRESH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></svg>';
function gmailLoadToken(){try{const t=JSON.parse(localStorage.getItem(ukey('workie_gmail_token')));if(t&&t.token&&t.exp>Date.now())return t;}catch(e){}return null;}
function gmailSaveToken(token,expiresIn){try{localStorage.setItem(ukey('workie_gmail_token'),JSON.stringify({token,exp:Date.now()+(expiresIn-60)*1000}));}catch(e){}}
function gmailValidToken(){const t=gmailLoadToken();return t?t.token:null;}
function gmailConnected(){return !!gmailValidToken();}
function wfColor(s){s=s||'?';let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return 'hsl('+(h%360)+',42%,52%)';}
function initGmailClient(){
  if(gmailTC)return true;
  if(typeof google==='undefined'||!google.accounts||!google.accounts.oauth2)return false;
  gmailTC=google.accounts.oauth2.initTokenClient({client_id:GOOGLE_CLIENT_ID,scope:GMAIL_SCOPE,callback:(resp)=>{
    if(resp&&resp.access_token){gmailSaveToken(resp.access_token,resp.expires_in||3600);const c=CONNECTIONS.find(x=>x.app==='gmail');if(c){c.on=true;connSave();if(typeof renderConn==='function')renderConn();}showToast(tr('toast_connected_app').replace('%s','Gmail'));renderWorkflow();gmailFetch();if(typeof ibOnMail==='function')ibOnMail();}
    else{showToast(tr('gmail_err'));}
  }});
  return true;
}
function gmailConnect(){if(!initGmailClient()){showToast(tr('gcal_loading'));setTimeout(gmailConnect,600);return;}gmailTC.requestAccessToken();}
function gmailDisconnect(){
  const t=gmailValidToken();if(t&&typeof google!=='undefined'&&google.accounts&&google.accounts.oauth2){try{google.accounts.oauth2.revoke(t);}catch(e){}}
  try{localStorage.removeItem(ukey('workie_gmail_token'));}catch(e){}
  GMAIL_MSGS=[];const c=CONNECTIONS.find(x=>x.app==='gmail');if(c){c.on=false;connSave();if(typeof renderConn==='function')renderConn();}
  renderWorkflow();showToast(tr('toast_disconnected').replace('%s','Gmail'));
}
function gmailParseFrom(h){if(!h)return {name:'',email:''};const m=h.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>/);if(m)return {name:(m[1]||'').trim()||m[2],email:m[2]};return {name:h.trim(),email:h.trim()};}
let gmailPageToken=null,gmailMore=false;
function gmailFetch(){gmailPageToken=null;gmailFetchPage(null,false);}
function gmailFetchMore(){if(!gmailPageToken||gmailMore||gmailLoading)return;gmailFetchPage(gmailPageToken,true);}
function gmailFetchPage(pageToken,append){
  const t=gmailValidToken();if(!t)return;
  if(append)gmailMore=true;else gmailLoading=true;
  gmailError='';renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();
  if(!GMAIL_EMAIL){fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile',{headers:{Authorization:'Bearer '+t}}).then(r=>r.json()).then(p=>{if(p&&p.emailAddress){GMAIL_EMAIL=p.emailAddress;if(typeof ibOnMail==='function')ibOnMail();}}).catch(()=>{});}
  const url='https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50&labelIds=INBOX'+(pageToken?('&pageToken='+encodeURIComponent(pageToken)):'');
  fetch(url,{headers:{Authorization:'Bearer '+t}})
    .then(r=>r.json()).then(async data=>{
      if(data.error){gmailError=data.error.message||'error';gmailLoading=false;gmailMore=false;if(!append)GMAIL_MSGS=[];renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();return;}
      gmailPageToken=data.nextPageToken||null;
      const ids=(data.messages||[]).map(m=>m.id);
      const msgs=await Promise.all(ids.map(id=>
        fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/'+id+'?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date',{headers:{Authorization:'Bearer '+t}})
          .then(r=>r.json()).then(m=>{const hs={};((m.payload&&m.payload.headers)||[]).forEach(h=>{hs[h.name.toLowerCase()]=h.value;});const f=gmailParseFrom(hs.from);return {id:m.id,src:'gmail',from:f.name,fromEmail:f.email,subject:hs.subject||tr('gmail_nosubject'),snippet:(m.snippet||'').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"'),date:hs.date?new Date(hs.date):null,unread:(m.labelIds||[]).includes('UNREAD')};}).catch(()=>null)
      ));
      const got=msgs.filter(Boolean);
      GMAIL_MSGS=append?GMAIL_MSGS.concat(got.filter(g=>!GMAIL_MSGS.some(x=>x.id===g.id))):got;
      gmailLoading=false;gmailMore=false;renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();
    }).catch(()=>{gmailLoading=false;gmailMore=false;gmailError='network';renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();});
}
function gmailWhen(d){if(!d)return '';const t=realToday();const same=d.getFullYear()===t[0]&&d.getMonth()===t[1]&&d.getDate()===t[2];try{return same?d.toLocaleTimeString(LOCALES[LANG],{hour:'2-digit',minute:'2-digit'}):d.toLocaleDateString(LOCALES[LANG],{day:'numeric',month:'short'});}catch(e){return '';}}
let OUTLOOK_MSGS=[],outlookLoading=false,WF_VIEW=[],OUTLOOK_EMAIL='';
function outlookOn(){const c=CONNECTIONS.find(x=>x.app==='outlook');return !!(c&&c.on);}
function mailConnected(){return gmailConnected()||outlookOn();}
function wfSrcColor(s){return s==='outlook'?'#0078D4':'#EA4335';}
function renderWorkflow(){
  const el=document.getElementById('workflowCarousel');if(!el)return;
  if(!mailConnected()){
    el.innerHTML='<div class="wf-hero"><div class="wf-hero-ic">'+GM_ENVELOPE+'</div>'
      +'<div class="wf-hero-t">'+tr('wf_connect_t')+'</div>'
      +'<div class="wf-hero-d">'+tr('wf_connect_d')+'</div>'
      +'<button class="wf-hero-btn" id="wfGoConnect">'+tr('wf_go_connect')+'</button>'
      +'<div class="wf-hero-note">'+tr('wf_hero_note')+'</div></div>';
    return;
  }
  const msgs=[...GMAIL_MSGS,...OUTLOOK_MSGS].sort((a,b)=>(b.date?b.date.getTime():0)-(a.date?a.date.getTime():0));
  WF_VIEW=msgs;
  let body;
  if((gmailLoading||outlookLoading)&&!msgs.length)body='<div class="wf-loading"><div class="wf-spin"></div>'+tr('wf_loading')+'</div>';
  else if(!msgs.length&&gmailError)body='<div class="wf-empty">'+tr('wf_error')+'</div>';
  else if(!msgs.length)body='<div class="wf-empty">'+tr('wf_empty')+'</div>';
  else body='<div class="wf-list">'+msgs.map((m,i)=>'<div class="wf-msg'+(m.unread?' unread':'')+'"><div class="wf-avatar" style="background:'+wfColor(m.from||m.fromEmail)+'">'+bdEsc((m.from||m.fromEmail||'?').trim().slice(0,1).toUpperCase())+'<span class="wf-srcdot" style="background:'+wfSrcColor(m.src)+'" title="'+(m.src==='outlook'?'Outlook':'Gmail')+'"></span></div><div class="wf-msg-main"><div class="wf-msg-top"><span class="wf-from">'+bdEsc(m.from||m.fromEmail)+'</span><span class="wf-when">'+gmailWhen(m.date)+'</span></div><div class="wf-subj">'+bdEsc(m.subject)+'</div><div class="wf-snippet">'+bdEsc(m.snippet)+'</div></div><button class="wf-totask" data-wftask="'+i+'" title="'+tr('wf_make_task')+'">'+(SVG.plus||'+')+'</button></div>').join('')+'</div>';
  el.innerHTML='<div class="wf-inbox-head"><div class="wf-inbox-title">'+tr('wf_inbox')+'</div><div class="wf-inbox-actions"><button class="wf-ibtn" id="wfRefresh" title="'+tr('wf_refresh')+'">'+GM_REFRESH+'</button><button class="wf-ibtn wf-ibtn-txt" id="wfManage">'+tr('wf_manage')+'</button></div></div>'+body;
}
function wfMakeTask(i){const m=WF_VIEW[i];if(!m)return;const task={id:++TID,title:m.subject,scope:'personal',done:false,date:realToday(),tag:{l:'Email',c:wfSrcColor(m.src)},desc:(m.from?tr('wf_from')+' '+m.from+' — ':'')+(m.snippet||'')};TASKS.push(task);saveTasks();if(typeof renderTasks==='function')renderTasks();if(typeof renderHomeAlerts==='function')renderHomeAlerts();showToast(tr('wf_task_created'));}
function wfRefreshAll(){if(gmailConnected())gmailFetch();if(outlookOn())outlookFetch();}
{const wp=document.querySelector('[data-page="workflow"]');if(wp)wp.addEventListener('click',e=>{
  if(e.target.closest('#wfGoConnect')){if(typeof go==='function')go('connections');return;}
  if(e.target.closest('#wfRefresh')){wfRefreshAll();return;}
  if(e.target.closest('#wfManage')){if(typeof go==='function')go('connections');return;}
  const tk=e.target.closest('[data-wftask]');if(tk){wfMakeTask(+tk.dataset.wftask);tk.classList.add('done');return;}
});}
// boot: se Gmail è collegato e il token è valido, precarica l'inbox
if(CONNECTIONS.find(c=>c.app==='gmail'&&c.on)&&gmailValidToken())gmailFetch();

// ---------- Outlook (Microsoft Graph via MSAL, inbox reale) ----------
const OUTLOOK_CLIENT_ID=''; // ← incolla qui l'Application (client) ID dell'app registrata su Azure (public, come quello Google)
const OUTLOOK_SCOPES=['Mail.Read'];
let msalApp=null;
function initMsal(){
  if(msalApp)return msalApp;
  if(!window.msal||!window.msal.PublicClientApplication||!OUTLOOK_CLIENT_ID)return null;
  try{msalApp=new msal.PublicClientApplication({auth:{clientId:OUTLOOK_CLIENT_ID,authority:'https://login.microsoftonline.com/common',redirectUri:location.origin+location.pathname},cache:{cacheLocation:'localStorage'}});}catch(e){return null;}
  return msalApp;
}
async function outlookToken(){
  const app=initMsal();if(!app)return null;
  const acct=app.getActiveAccount()||app.getAllAccounts()[0];if(!acct)return null;
  try{const r=await app.acquireTokenSilent({scopes:OUTLOOK_SCOPES,account:acct});return r.accessToken;}
  catch(e){try{const r=await app.acquireTokenPopup({scopes:OUTLOOK_SCOPES});return r.accessToken;}catch(e2){return null;}}
}
async function outlookConnect(){
  const app=initMsal();
  if(!app){showToast(tr('outlook_setup'));return;}
  try{const res=await app.loginPopup({scopes:OUTLOOK_SCOPES,prompt:'select_account'});if(res&&res.account){app.setActiveAccount(res.account);OUTLOOK_EMAIL=res.account.username||'';}}
  catch(e){showToast(tr('outlook_err'));return;}
  const c=CONNECTIONS.find(x=>x.app==='outlook');if(c){c.on=true;connSave();if(typeof renderConn==='function')renderConn();}
  showToast(tr('toast_connected_app').replace('%s','Outlook'));renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();outlookFetch();
}
function outlookDisconnect(){
  OUTLOOK_MSGS=[];OUTLOOK_EMAIL='';const c=CONNECTIONS.find(x=>x.app==='outlook');if(c){c.on=false;connSave();if(typeof renderConn==='function')renderConn();}
  renderWorkflow();showToast(tr('toast_disconnected').replace('%s','Outlook'));
}
function outlookFetch(){
  const c=CONNECTIONS.find(x=>x.app==='outlook');if(!c||!c.on)return;
  outlookLoading=true;renderWorkflow();
  outlookToken().then(t=>{
    if(!t){OUTLOOK_MSGS=[];outlookLoading=false;renderWorkflow();return;}
    fetch("https://graph.microsoft.com/v1.0/me/messages?$top=15&$select=subject,from,receivedDateTime,bodyPreview,isRead",{headers:{Authorization:'Bearer '+t}})
      .then(r=>r.json()).then(data=>{
        OUTLOOK_MSGS=(data.error||!data.value)?[]:data.value.map(m=>({id:m.id,src:'outlook',from:(m.from&&m.from.emailAddress&&m.from.emailAddress.name)||'',fromEmail:(m.from&&m.from.emailAddress&&m.from.emailAddress.address)||'',subject:m.subject||tr('gmail_nosubject'),snippet:m.bodyPreview||'',date:m.receivedDateTime?new Date(m.receivedDateTime):null,unread:m.isRead===false}));
        outlookLoading=false;renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();
      }).catch(()=>{OUTLOOK_MSGS=[];outlookLoading=false;renderWorkflow();if(typeof ibOnMail==='function')ibOnMail();});
  });
}
// boot: se Outlook è collegato, precarica
if(outlookOn())outlookFetch();
// widget body condiviso per Docs/Sheets/Slides (ognuno filtra per il suo tipo)
function gdriveAppBody(app,kind,match,color,badge){
  const c=CONNECTIONS.find(x=>x.app===app),conn=c&&c.on;
  const bar=`<div class="gd-bar"><button class="gd-new" data-gcreate="${kind}" data-gapp="${app}">+ ${tr('gd_new')}</button></div>`;
  if(conn){
    if(gdriveLoading)return bar+`<div class="dkw-msg">${tr('gcal_loading')}</div>`;
    const files=gdriveFiles.filter(f=>(f.mimeType||'').includes(match));
    if(!files.length)return bar+`<div class="dkw-msg">${tr('gd_empty')}</div>`;
    return bar+`<div class="dkw-list">${files.map(f=>`<div class="dkw-row gd-file" data-openurl="${f.link}"><div class="dkw-ic" style="background:${color}">${badge}</div><div class="dkw-rmain"><div class="dkw-rt">${bdEsc(f.name)}</div></div></div>`).join('')}</div>`;
  }
  return bar+appList([{ic:badge,icbg:color,t:tr('gd_sample')+' 1'},{ic:badge,icbg:color,t:tr('gd_sample')+' 2'}]);
}
if(CONNECTIONS.some(c=>GDRIVE_APPS.includes(c.app)&&c.on)&&gdriveValidToken())gdriveFetch();

// ---------- Spotify (OAuth Authorization Code + PKCE, client-side) ----------
const SPOTIFY_CLIENT_ID='b8cb53a1da4f4f7cb5e70684eab06a41';
const SPOTIFY_SCOPE='user-read-currently-playing user-read-playback-state user-modify-playback-state user-read-recently-played playlist-read-private streaming';
let spotifyNow=null,spotifyLoading=false;
function spotifyRedirect(){return location.origin;}
function spTokenObj(){try{return JSON.parse(localStorage.getItem(ukey('workie_sp_token')));}catch(e){return null;}}
function spLoadToken(){const t=spTokenObj();return (t&&t.token&&t.exp>Date.now())?t:null;}
function spSaveToken(token,expiresIn,refresh){try{const cur=spTokenObj()||{};localStorage.setItem(ukey('workie_sp_token'),JSON.stringify({token,exp:Date.now()+(expiresIn-60)*1000,refresh:refresh||cur.refresh}));}catch(e){}}
function spotifyValidToken(){const t=spLoadToken();return t?t.token:null;}
// "collegato" = c'è un token (anche scaduto, finché abbiamo come rinnovarlo) → tiene l'app visibile mentre rinnoviamo
function spotifyConnected(){const t=spTokenObj();return !!(t&&t.token&&(t.exp>Date.now()||t.refresh));}
let spRefreshing=null;
function spRefreshToken(){
  if(spRefreshing)return spRefreshing;
  const t=spTokenObj();if(!t||!t.refresh)return Promise.resolve(null);
  spRefreshing=fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:t.refresh,client_id:SPOTIFY_CLIENT_ID})})
    .then(r=>r.json()).then(d=>{if(d&&d.access_token){spSaveToken(d.access_token,d.expires_in||3600,d.refresh_token);return d.access_token;}return null;})
    .catch(()=>null).then(v=>{spRefreshing=null;return v;});
  return spRefreshing;
}
// garantisce un token valido (rinnova se scaduto); null se non rinnovabile
function spEnsureToken(){const t=spotifyValidToken();if(t)return Promise.resolve(t);return spRefreshToken();}
function spB64url(buf){let s='';const b=new Uint8Array(buf);for(let i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function spRand(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return Array.from(a,b=>('0'+b.toString(16)).slice(-2)).join('');}
async function spotifyConnect(){
  const verifier=spRand(48);
  const challenge=spB64url(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const state=spRand(8);
  sessionStorage.setItem('workie_sp_verifier',verifier);sessionStorage.setItem('workie_sp_state',state);
  location.href='https://accounts.spotify.com/authorize?'+new URLSearchParams({client_id:SPOTIFY_CLIENT_ID,response_type:'code',redirect_uri:spotifyRedirect(),scope:SPOTIFY_SCOPE,code_challenge_method:'S256',code_challenge:challenge,state});
}
function spotifyDisconnect(){try{localStorage.removeItem(ukey('workie_sp_token'));}catch(e){}spotifyNow=null;const c=CONNECTIONS.find(x=>x.app==='spotify');if(c){c.on=false;connSave();renderConn();}if(typeof renderStage==='function')renderStage();showToast(tr('toast_disconnected').replace('%s','Spotify'));}
async function spotifyHandleCallback(){
  const p=new URLSearchParams(location.search);const code=p.get('code'),state=p.get('state'),err=p.get('error');
  if(err){history.replaceState({},'',location.pathname);showToast('Spotify ha rifiutato il collegamento: '+err);return;}
  if(!code)return;
  history.replaceState({},'',location.pathname);
  const verifier=sessionStorage.getItem('workie_sp_verifier');
  if(!verifier){showToast('Spotify: sessione di login persa, riprova');return;}
  if(state&&sessionStorage.getItem('workie_sp_state')&&state!==sessionStorage.getItem('workie_sp_state')){showToast('Spotify: verifica di sicurezza fallita');return;}
  try{
    const res=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,redirect_uri:spotifyRedirect(),client_id:SPOTIFY_CLIENT_ID,code_verifier:verifier})});
    const data=await res.json();
    sessionStorage.removeItem('workie_sp_verifier');sessionStorage.removeItem('workie_sp_state');
    if(data.access_token){spSaveToken(data.access_token,data.expires_in||3600,data.refresh_token);const c=CONNECTIONS.find(x=>x.app==='spotify');if(c){c.on=true;connSave();renderConn();}showToast(tr('toast_connected_app').replace('%s','Spotify'));spotifyFetch();if(typeof spInitPlayer==='function')spInitPlayer();}
    else showToast('Spotify login fallito: '+((data.error_description||data.error)||'errore sconosciuto'));
  }catch(e){showToast('Spotify: errore di rete nel login');}
}
function spotifyApply(track,playing,progress,duration,recent){
  const nw=track?{title:track.name,artist:(track.artists||[]).map(a=>a.name).join(', '),art:track.album&&track.album.images&&track.album.images[0]&&track.album.images[0].url,playing:!!playing,progress:progress||0,duration:duration||track.duration_ms||0,recent:!!recent}:null;
  const changed=(!spotifyNow&&nw)||(spotifyNow&&!nw)||(spotifyNow&&nw&&(spotifyNow.title!==nw.title||spotifyNow.playing!==nw.playing));
  spotifyNow=nw;const wasLoading=spotifyLoading;spotifyLoading=false;
  if((changed||wasLoading)&&typeof renderStage==='function'&&document.querySelector('.page.active')&&document.querySelector('.page.active').dataset.page==='desktop')renderStage();
}
function spotifyFetch(silent){
  if(!spotifyValidToken()){if(spotifyConnected())spEnsureToken().then(t=>{if(t)spotifyFetch(silent);});return;}
  const t=spotifyValidToken();
  if(!silent&&!spotifyNow){spotifyLoading=true;if(typeof renderStage==='function')renderStage();}
  fetch('https://api.spotify.com/v1/me/player/currently-playing',{headers:{Authorization:'Bearer '+t}})
    .then(r=>r.status===204?null:r.json())
    .then(d=>{
      if(d&&d.item){spotifyApply(d.item,d.is_playing,d.progress_ms,d.item.duration_ms,false);}
      else{fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1',{headers:{Authorization:'Bearer '+t}}).then(r=>r.json()).then(rp=>{const it=rp&&rp.items&&rp.items[0]&&rp.items[0].track;spotifyApply(it,false,0,0,true);}).catch(()=>{spotifyLoading=false;});}
    }).catch(()=>{spotifyLoading=false;});
}
// init: completa il callback OAuth (se torniamo da Spotify), resetta stato "on" senza token, carica
// ----- Spotify Web Playback SDK: rende Workie un dispositivo riproducibile (richiede Premium) -----
let spPlayer=null,spDeviceId=null,spSdkReady=false;
window.onSpotifyWebPlaybackSDKReady=function(){spSdkReady=true;spInitPlayer();};
function spInitPlayer(){
  try{
    if(spPlayer||!spSdkReady||typeof Spotify==='undefined'||!spotifyValidToken())return;
    spPlayer=new Spotify.Player({name:'Workie',getOAuthToken:cb=>{const t=spotifyValidToken();if(t)cb(t);},volume:0.6});
    spPlayer.addListener('ready',({device_id})=>{spDeviceId=device_id;});
    spPlayer.addListener('not_ready',()=>{spDeviceId=null;});
    spPlayer.addListener('player_state_changed',st=>{try{if(st&&st.track_window&&st.track_window.current_track){const t=st.track_window.current_track;spotifyApply(t,!st.paused,st.position,st.duration,false);}}catch(e){}});
    spPlayer.addListener('account_error',()=>{showToast(tr('sp_need_premium'));});
    spPlayer.addListener('authentication_error',()=>{});
    spPlayer.connect();
  }catch(e){spPlayer=null;}
}
spotifyHandleCallback();
(function(){const c=CONNECTIONS.find(x=>x.app==='spotify');if(!c||!c.on)return;if(spotifyConnected()){spEnsureToken().then(t=>{if(t){spotifyFetch();spInitPlayer();}else{c.on=false;connSave();if(typeof renderConn==='function')renderConn();}});}else{c.on=false;connSave();}})();
// ----- Spotify mini-app (player quando piccolo, app completa quando a schermo intero) -----
let spView={mode:'home',q:'',results:null,playlists:null,plOpen:null,plTracks:null},spSearchT;
function spApiGet(path,_retried){
  return spEnsureToken().then(t=>{
    if(!t)return Promise.reject({status:0,msg:'nessun token',path});
    return fetch('https://api.spotify.com/v1/'+path,{headers:{Authorization:'Bearer '+t}}).then(r=>{
      if(r.status===401&&!_retried){return spRefreshToken().then(()=>spApiGet(path,true));}
      if(r.status===204)return null;
      if(!r.ok)return r.json().catch(()=>null).then(b=>Promise.reject({status:r.status,msg:(b&&b.error&&b.error.message)||'',path}));
      return r.json();
    },netErr=>Promise.reject({status:-1,msg:'rete: '+(netErr&&netErr.message||''),path}));
  });
}
// errore Spotify visibile e PARLANTE (per diagnosticare dal vivo) — include l'URL inviato
function spErr(e){const st=e&&e.status;const m=(e&&e.msg)?' — '+e.msg:'';const pp=(e&&e.path)?' ['+e.path+']':'';
  if(st===401){showToast(tr('sp_reconnect'));}
  else if(st===403){showToast(tr('sp_need_premium')+m);}
  else if(st===0){showToast('Spotify: nessun token, riconnetti');}
  else if(st===-1){showToast('Spotify: errore di rete'+m);}
  else{showToast('Spotify: errore '+st+m+pp);}}
function spImg(images){return images&&images[0]&&images[0].url;}
function spRefocus(){const i=document.querySelector('[data-spq]');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}}
function spLoadPlaylists(){if(spView.playlists)return;spApiGet('me/playlists?'+new URLSearchParams({limit:'20'})).then(d=>{spView.playlists=(d&&d.items)||[];renderStage();}).catch(e=>{spView.playlists=[];renderStage();spErr(e);});}
function spSearch(q){spView.q=q;if(!q.trim()){spView.mode='home';spView.results=null;renderStage();spRefocus();return;}
  spApiGet('search?'+new URLSearchParams({q:q,type:'track,playlist',limit:'20'})).then(d=>{spView.mode='search';spView.results={tracks:(d&&d.tracks&&d.tracks.items)||[],playlists:((d&&d.playlists&&d.playlists.items)||[]).filter(Boolean)};renderStage();spRefocus();}).catch(e=>{spErr(e);});}
function spOpenPlaylist(id,name){spView.plOpen={id,name};spView.plTracks=null;renderStage();
  spApiGet('playlists/'+id+'/tracks?'+new URLSearchParams({limit:'50',fields:'items(track(name,uri,artists(name),external_urls,album(images)))'})).then(d=>{spView.plTracks=((d&&d.items)||[]).map(it=>it.track).filter(Boolean);renderStage();}).catch(e=>{spView.plTracks=[];renderStage();spErr(e);});}
function spOpenInSpotify(url){if(url)window.open(url,'_blank','noopener');}
function spPlayTrack(uri,url){if(!uri){spOpenInSpotify(url);return;}
  spInitPlayer();
  spEnsureToken().then(t=>{if(!t){showToast(tr('sp_reconnect'));spOpenInSpotify(url);return;}
    const dev=spDeviceId?('?device_id='+spDeviceId):'';
    fetch('https://api.spotify.com/v1/me/player/play'+dev,{method:'PUT',headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:JSON.stringify({uris:[uri]})}).then(r=>{
      if(r.ok){setTimeout(()=>spotifyFetch(true),700);}
      else if(r.status===403){showToast(tr('sp_need_premium'));}
      else if(r.status===404){showToast(tr('sp_no_device'));spOpenInSpotify(url);}
      else{spOpenInSpotify(url);}
    }).catch(()=>spOpenInSpotify(url));});}
function spControl(action){
  if(spPlayer&&spDeviceId){if(action==='next')spPlayer.nextTrack();else if(action==='prev')spPlayer.previousTrack();else spPlayer.togglePlay();return;}
  spEnsureToken().then(t=>{if(!t){showToast(tr('sp_reconnect'));return;}
    if(action==='next'||action==='prev'){fetch('https://api.spotify.com/v1/me/player/'+(action==='next'?'next':'previous'),{method:'POST',headers:{Authorization:'Bearer '+t}}).then(r=>{if(r.status===403)showToast(tr('sp_need_premium'));else if(r.status===404)showToast(tr('sp_no_device'));setTimeout(()=>spotifyFetch(true),600);}).catch(()=>{});return;}
    const playing=spotifyNow&&spotifyNow.playing;
    fetch('https://api.spotify.com/v1/me/player/'+(playing?'pause':'play'),{method:'PUT',headers:{Authorization:'Bearer '+t}}).then(r=>{if(r.status===403)showToast(tr('sp_need_premium'));else if(r.status===404)showToast(tr('sp_no_device'));setTimeout(()=>spotifyFetch(true),500);}).catch(()=>{});});}
function spCover(url,rnd){return `<div class="sp-cover${rnd?' rnd':''}"${url?` style="background-image:url('${url}')"`:''}></div>`;}
function spTrackRow(t){if(!t)return '';const art=spImg(t.album&&t.album.images),url=(t.external_urls&&t.external_urls.spotify)||'';return `<div class="sp-row" data-spplay data-spuri="${t.uri||''}" data-spurl="${url}">${spCover(art)}<div class="sp-rmain"><div class="sp-rt">${bdEsc(t.name)}</div><div class="sp-rs">${bdEsc((t.artists||[]).map(a=>a.name).join(', '))}</div></div></div>`;}
function spPlaylistRow(p){if(!p)return '';const art=spImg(p.images);return `<div class="sp-row" data-spplaylist="${p.id||''}" data-spname="${bdEsc(p.name||'')}">${spCover(art)}<div class="sp-rmain"><div class="sp-rt">${bdEsc(p.name||'')}</div><div class="sp-rs">${p.owner&&p.owner.display_name?bdEsc(p.owner.display_name):'Playlist'}</div></div></div>`;}
function spNowBar(){const n=spotifyNow,art=n&&n.art?`style="background-image:url('${n.art}')"`:'';
  return `<div class="sp-bar"><div class="sp-cover" ${art}></div><div class="sp-rmain"><div class="sp-rt">${n?bdEsc(n.title):tr('sp_nothing')}</div><div class="sp-rs">${n?bdEsc(n.artist):''}</div></div><div class="sp-ctl"><button data-spctl="prev">${SVG.prev}</button><button class="pp" data-spctl="toggle">${n&&n.playing?SVG.pause:SVG.play}</button><button data-spctl="next">${SVG.next}</button></div></div>`;}
function spotifyFullApp(){
  let body='';
  if(spView.plOpen){body=`<div class="sp-back" data-spback>${SVG.back}<span>${tr('sp_back')}</span></div><div class="sp-sec-h">${bdEsc(spView.plOpen.name)}</div>`;body+=spView.plTracks?(spView.plTracks.length?spView.plTracks.map(spTrackRow).join(''):`<div class="dkw-msg">${tr('sp_nothing')}</div>`):`<div class="dkw-msg">${tr('gcal_loading')}</div>`;}
  else if(spView.mode==='search'&&spView.results){const r=spView.results;if(r.tracks.length)body+=`<div class="sp-sec-h">${tr('sp_tracks')}</div>`+r.tracks.map(spTrackRow).join('');if(r.playlists.length)body+=`<div class="sp-sec-h">${tr('sp_playlists')}</div>`+r.playlists.map(spPlaylistRow).join('');if(!r.tracks.length&&!r.playlists.length)body=`<div class="dkw-msg">${tr('sp_no_results')}</div>`;}
  else{body=`<div class="sp-sec-h">${tr('sp_your_playlists')}</div>`;body+=spView.playlists?(spView.playlists.length?spView.playlists.map(spPlaylistRow).join(''):`<div class="dkw-msg">${tr('sp_no_playlists')}</div>`):`<div class="dkw-msg">${tr('gcal_loading')}</div>`;if(!spView.playlists)spLoadPlaylists();}
  return `<div class="sp-app"><div class="sp-search"><input data-spq value="${(spView.q||'').replace(/"/g,'&quot;')}" placeholder="${tr('sp_search_ph')}"></div><div class="sp-main">${body}</div>${spNowBar()}</div>`;
}
const SP_MAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>';
function spotifyMini(w){
  const connected=spotifyConnected();
  const n=(connected&&spotifyNow)?spotifyNow:{title:tr('sp_sample_t'),artist:tr('sp_sample_a'),progress:0,duration:0,playing:false,art:''};
  const pct=n.duration?Math.round((n.progress/n.duration)*100):32,art=n.art?`background-image:url('${n.art}');background-size:cover;background-position:center;`:'';
  const row=`<div class="spotify-row" style="background:var(--panel-2)"><div class="spotify-art" style="${art}"></div><div class="spotify-info"><div class="spotify-title">${bdEsc(n.title)}</div><div class="spotify-artist">${bdEsc(n.artist)}</div><div class="bar"><i style="width:${pct}%"></i></div></div><div class="sp-ctl"><button data-spctl="prev">${SVG.prev}</button><button class="pp" data-spctl="toggle">${n.playing?SVG.pause:SVG.play}</button><button data-spctl="next">${SVG.next}</button></div></div>`;
  const search=(connected&&w)?`<button class="sp-minisearch" data-spexpand="${w.id}">${SP_MAG}<span>${tr('sp_search_ph')}</span></button>`:'';
  return row+search;
}
function spotifyWidget(w){const c=CONNECTIONS.find(x=>x.app==='spotify');if(!(c&&c.on&&spotifyConnected()))return spotifyMini(w);if(!spotifyValidToken())spEnsureToken().then(t=>{if(t){spotifyFetch(true);renderStage();}});const big=(curDK().maxId===w.id)||(w.h>=300);return big?spotifyFullApp():spotifyMini(w);}
// ricerca (input) + auto-refresh dolce del now-playing
document.getElementById('dkCanvas').addEventListener('input',e=>{const i=e.target.closest('[data-spq]');if(i){spView.q=i.value;clearTimeout(spSearchT);spSearchT=setTimeout(()=>spSearch(spView.q),450);}});
setInterval(()=>{if(!spotifyConnected())return;const ap=document.querySelector('.page.active');if(!ap||ap.dataset.page!=='desktop')return;const d=curDK();const spW=d.widgets.find(w=>w.type==='spotify'&&!w.hidden);if(!spW)return;if(d.maxId===spW.id)return;const typing=document.activeElement&&document.activeElement.matches&&document.activeElement.matches('[data-spq]');if(!typing)spotifyFetch(true);},12000);

// ---------- Toast + Help fab ----------
let toastT;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);
}
// ===== Workie AI — chat (tab, contesto, chip, flussi guidati) =====
let aiSeq=1,aiSearch='',aiDateFilter='';
function aiNewConvObj(){return {id:'c'+(aiSeq++)+'_'+Date.now(),title:'',msgs:[],ts:Date.now()};}
function aiTouch(){const c=aiCur();if(c)c.ts=Date.now();}
let aiConvs=(()=>{try{const s=JSON.parse(localStorage.getItem(ukey('workie_ai_convs')));if(Array.isArray(s)&&s.length)return s;}catch(e){}return [aiNewConvObj()];})();
let aiConvId=(()=>{try{const id=localStorage.getItem(ukey('workie_ai_conv_id'));if(id&&aiConvs.some(c=>c.id===id))return id;}catch(e){}return aiConvs[0].id;})();
let aiTab='chat', aiFlow=null;
function aiCur(){return aiConvs.find(c=>c.id===aiConvId)||aiConvs[0];}
function saveAi(){try{localStorage.setItem(ukey('workie_ai_convs'),JSON.stringify(aiConvs.slice(-30).map(c=>({id:c.id,title:c.title,ts:c.ts||0,msgs:c.msgs.slice(-60)}))));localStorage.setItem(ukey('workie_ai_conv_id'),aiConvId);}catch(e){}}
// contesto pagina
const AI_CTX={
  desktop:{k:'nav_desktop',chips:[['ai_c_createday','flow:day'],['ai_c_fixday','msg:fixday'],['ai_c_tipsday','msg:tipsday']]},
  tasks:{k:'nav_tasks',chips:[['ai_c_newtask','act:newtask'],['ai_c_planweek','msg:planweek'],['ai_c_tipstasks','msg:tipstasks']]},
  projects:{k:'nav_projects',chips:[['ai_c_newproj','act:newproj'],['ai_c_tipsproj','msg:tipsproj']]},
  team:{k:'nav_team',chips:[['ai_c_tipsteam','msg:tipsteam']]},
  home:{k:'nav_home',chips:[['ai_c_today','msg:today'],['ai_c_createday','flow:day']]},
};
function aiCtx(){const el=document.querySelector('.page.active');const p=el?el.dataset.page:'home';return AI_CTX[p]||AI_CTX.home;}
const aiPanel=document.getElementById('aiPanel');
function renderAiBody(){
  const el=document.getElementById('aiBody');if(!el)return;
  document.querySelectorAll('#aiTabs .ai-tab').forEach(t=>t.classList.toggle('on',t.dataset.aitab===aiTab));
  document.getElementById('aiInrow').style.display=(aiTab==='chat')?'flex':'none';
  if(aiTab==='all'){renderAiAll(el);return;}
  if(aiTab==='work'){renderAiWork(el);return;}
  const conv=aiCur();let html='';
  if(!conv.msgs.length){
    const ctx=aiCtx();
    html+='<div class="ai-msg ai"><div class="b">'+bdEsc(tr('ai_greet').replace('%s',tr(ctx.k)))+'</div></div>';
    html+='<div class="ai-chips">'+ctx.chips.map(c=>'<button class="ai-chip" data-chip="'+c[1]+'">'+tr(c[0])+'</button>').join('')+'</div>';
  }else{
    html+=conv.msgs.map(m=>m.role==='ai'
      ?'<div class="ai-msg ai"><div class="b">'+bdEsc(m.text)+'</div></div>'
      :'<div class="ai-msg me"><div class="b">'+bdEsc(m.text)+'</div></div>').join('');
  }
  el.innerHTML=html;
  if(aiFlow)renderFlowCard();
  el.scrollTop=el.scrollHeight;
}
function aiConvDate(ts){if(!ts)return '';const d=new Date(ts),t=realToday();const dd=[d.getFullYear(),d.getMonth(),d.getDate()];const diff=Math.round((Date.UTC(dd[0],dd[1],dd[2])-Date.UTC(t[0],t[1],t[2]))/86400000);if(diff===0)return tr('al_today_word');if(diff===-1)return tr('al_yesterday');const months=MONTHS[LANG]||MONTHS.it;return dd[2]+' '+(months[dd[1]]||'').slice(0,3);}
function renderAiAll(el){
  let html='<div class="ai-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/></svg><input id="aiSearchIn" data-i18n-ph="ai_search_ph" placeholder="Cerca nelle chat…" value="'+bdEsc(aiSearch).replace(/"/g,'&quot;')+'"><input type="date" id="aiDateIn" value="'+aiDateFilter+'">'+(aiDateFilter?'<button class="ai-datex" id="aiDateX">'+SVG.x+'</button>':'')+'</div>';
  html+='<div class="ai-conv ai-conv-new" id="aiNewConv"><span class="ci newci">'+SVG.plus+'</span><div class="cmain"><div class="ct">'+tr('ai_new_chat')+'</div><div class="cs">'+tr('ai_new_chat_sub')+'</div></div></div>';
  let list=aiConvs.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));
  const q=aiSearch.toLowerCase().trim();
  if(q)list=list.filter(c=>((c.title||'')+' '+c.msgs.map(m=>m.text).join(' ')).toLowerCase().includes(q));
  if(aiDateFilter)list=list.filter(c=>{if(!c.ts)return false;const d=new Date(c.ts);return [d.getFullYear(),('0'+(d.getMonth()+1)).slice(-2),('0'+d.getDate()).slice(-2)].join('-')===aiDateFilter;});
  if(!list.length){html+='<div class="ai-empty" style="margin:24px auto;padding:10px;font-size:13px">'+tr((q||aiDateFilter)?'ai_no_results':'ai_empty_conv')+'</div>';}
  html+=list.map(c=>{
    const title=(c.title||(c.msgs.find(m=>m.role==='me')||{}).text||tr('ai_new_chat')).slice(0,40);
    const last=((c.msgs[c.msgs.length-1]||{}).text||tr('ai_empty_conv')).slice(0,48);
    return '<div class="ai-conv'+(c.id===aiConvId?' on':'')+'" data-conv="'+c.id+'"><span class="ci">'+SVG.aiface+'</span><div class="cmain"><div class="ct">'+bdEsc(title)+'</div><div class="cs">'+bdEsc(last)+'</div></div><span class="cdate">'+aiConvDate(c.ts)+'</span><span class="cdel" data-convdel="'+c.id+'">'+SVG.trash+'</span></div>';
  }).join('');
  el.innerHTML=html;
}
function renderAiWork(el){
  const acts=[['newtask','act:newtask',SVG.task],['newproj','act:newproj',SVG.proj],['setday','act:setday',SVG.daily]];
  el.innerHTML='<div class="ai-work-h">'+tr('ai_work_h')+'</div>'+acts.map(a=>'<button class="ai-act" data-chip="'+a[1]+'"><span class="ai-act-ic">'+a[2]+'</span><span class="ai-act-t">'+tr('ai_w_'+a[0])+'</span></button>').join('');
}
function aiShowTyping(){const el=document.getElementById('aiBody');if(!el)return;const d=document.createElement('div');d.className='ai-msg ai';d.id='aiTyping';d.innerHTML='<div class="b"><div class="ai-typing"><i></i><i></i><i></i></div></div>';el.appendChild(d);el.scrollTop=el.scrollHeight;}
function aiHideTyping(){const d=document.getElementById('aiTyping');if(d)d.remove();}
function aiSay(text){aiCur().msgs.push({role:'ai',text});aiTouch();saveAi();renderAiBody();}
function aiAskReply(replyText){aiShowTyping();setTimeout(()=>{aiHideTyping();aiSay(replyText);},650+Math.random()*400);}
// ---- Risposta AI a testo libero. Prova la Netlify Function (Mistral/Groq/Claude); gestisce limiti ed errori. ----
async function aiReply(){
  try{
    const r=await fetch(FN_BASE+'/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:aiCur().msgs.slice(-16),lang:LANG})});
    const d=await r.json().catch(()=>null);
    if(r.ok&&d&&d.reply)return d.reply;
    if(r.status===429)return tr('ai_limit'); // limite momentaneo: messaggio gentile
    if(d&&d.error)return '⚠️ '+String(d.error).slice(0,220); // altri errori: mostra il dettaglio per capire
  }catch(e){}
  // Offline/anteprima (la funzione gira solo su Netlify): risposta demo.
  await new Promise(r=>setTimeout(r,500));
  return tr('ai_demo');
}
async function aiSend(){
  const inp=document.getElementById('aiInput');const t=(inp.value||'').trim();if(!t)return;
  const conv=aiCur();conv.msgs.push({role:'me',text:t});if(!conv.title)conv.title=t.slice(0,42);conv.ts=Date.now();
  inp.value='';inp.style.height='auto';saveAi();renderAiBody();
  aiShowTyping();let reply;try{reply=await aiReply();}catch(e){reply=tr('ai_err');}
  aiHideTyping();aiSay(reply);
}
// ---- chip / azioni ----
function aiChip(action,label){
  const i=action.indexOf(':'),kind=action.slice(0,i),arg=action.slice(i+1);
  if(kind==='act'){aiPanel.classList.remove('open');if(arg==='newtask')openNewTask();else if(arg==='newproj')openProjTpl();else if(arg==='setday'){go('desktop');setTimeout(()=>document.getElementById('dwSetup').click(),120);}return;}
  const conv=aiCur();conv.msgs.push({role:'me',text:label});if(!conv.title)conv.title=label.slice(0,42);conv.ts=Date.now();saveAi();renderAiBody();
  if(kind==='flow'){startFlow(arg);return;}
  if(kind==='msg'){aiAskReply(tr('ai_r_'+arg));return;}
}
// ---- flussi guidati ----
const AI_FLOWS={
  day:{intro:'ai_day_intro',steps:[
    {key:'name',type:'text',q:'ai_day_q_name',ph:'ai_day_ph_name'},
    {key:'wake',type:'time',q:'ai_day_q_wake',def:'08:00'},
    {key:'work',type:'text',q:'ai_day_q_work',ph:'ai_day_ph_work'},
    {key:'lunch',type:'time',q:'ai_day_q_lunch',def:'13:00'},
    {key:'extra',type:'text',q:'ai_day_q_extra',ph:'ai_day_ph_extra',optional:true}
  ],onDone(a){buildDayFromFlow(a);}}
};
function startFlow(id){const def=AI_FLOWS[id];if(!def)return;aiFlow={def,step:0,answers:{}};aiSay(tr(def.intro));}
function renderFlowCard(){
  const el=document.getElementById('aiBody');if(!el||!aiFlow)return;
  const st=aiFlow.def.steps[aiFlow.step],n=aiFlow.def.steps.length;
  const dots=aiFlow.def.steps.map((s,i)=>'<i class="'+(i<=aiFlow.step?'on':'')+'"></i>').join('');
  const inp=st.type==='time'?'<input type="time" class="ai-flow-in" id="aiFlowIn" value="'+(st.def||'')+'">':'<input type="text" class="ai-flow-in" id="aiFlowIn" placeholder="'+(st.ph?tr(st.ph):'')+'">';
  const card=document.createElement('div');card.className='ai-flow';
  card.innerHTML='<div class="ai-flow-prog"><div class="ai-flow-dots">'+dots+'</div><span class="ai-flow-count">'+(aiFlow.step+1)+' '+tr('ai_of')+' '+n+' '+tr('ai_answers')+'</span></div>'
    +'<div class="ai-flow-q">'+tr(st.q)+'</div>'
    +'<div class="ai-flow-inrow">'+inp+'<button class="ai-flow-go" id="aiFlowGo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>'
    +(st.optional?'<button class="ai-flow-skip" id="aiFlowSkip">'+tr('ai_skip')+'</button>':'');
  el.appendChild(card);const fin=document.getElementById('aiFlowIn');if(fin)setTimeout(()=>{try{fin.focus();}catch(e){}},60);el.scrollTop=el.scrollHeight;
}
function flowNext(skip){
  if(!aiFlow)return;const st=aiFlow.def.steps[aiFlow.step];const fin=document.getElementById('aiFlowIn');let val=fin?(fin.value||'').trim():'';
  if(skip)val='';else if(!val&&!st.optional){if(fin){fin.style.borderColor='#f0a0a0';fin.focus();}return;}
  aiFlow.answers[st.key]=val;
  if(aiFlow.step<aiFlow.def.steps.length-1){aiFlow.step++;renderAiBody();}
  else{const def=aiFlow.def,ans=aiFlow.answers;aiFlow=null;saveAi();def.onDone(ans);}
}
function buildDayFromFlow(a){
  const name=(a.name||'').trim()||tr('dw_new_profile_short');
  const pid=PROF_SEQ++;PROFILES.push({id:pid,name});activeProfile=pid;
  const wd=[0,1,2,3,4],acts=[];
  if(a.wake)acts.push({name:tr('ai_act_wake'),time:a.wake});
  let ws=null,we=null;const mm=(a.work||'').match(/(\d{1,2})[:.]?(\d{2})?\s*[-–a]{1,3}\s*(\d{1,2})[:.]?(\d{2})?/);
  if(mm){ws=('0'+mm[1]).slice(-2)+':'+(mm[2]||'00');we=('0'+mm[3]).slice(-2)+':'+(mm[4]||'00');}
  if(ws)acts.push({name:tr('ai_act_workstart'),time:ws});
  if(a.lunch)acts.push({name:tr('ai_act_lunch'),time:a.lunch});
  if(we)acts.push({name:tr('ai_act_workend'),time:we});
  let t=we?dwMins(we)+30:19*60;
  (a.extra||'').split(',').map(s=>s.trim()).filter(Boolean).forEach(nm=>{acts.push({name:nm,time:('0'+Math.floor(t/60)).slice(-2)+':'+('0'+(t%60)).slice(-2)});t=Math.min(23*60+30,t+90);});
  acts.forEach(x=>RITUALS.push({id:RIT_SEQ++,name:x.name,time:x.time,days:wd.slice(),pid,done:{}}));
  saveProfiles();saveRituals();
  aiSay(tr('ai_day_done').replace('%s',name));
  if(typeof renderDaily==='function')renderDaily();
}
// ---- eventi ----
document.getElementById('aiFab').addEventListener('click',()=>{aiPanel.classList.toggle('open');if(aiPanel.classList.contains('open')){aiTab='chat';renderAiBody();setTimeout(()=>{const i=document.getElementById('aiInput');if(i)i.focus();},120);}});
document.getElementById('aiClose').addEventListener('click',()=>aiPanel.classList.remove('open'));
document.getElementById('aiTabs').addEventListener('click',e=>{const t=e.target.closest('[data-aitab]');if(t){aiTab=t.dataset.aitab;renderAiBody();}});
document.getElementById('aiSend').addEventListener('click',aiSend);
document.getElementById('aiBody').addEventListener('click',e=>{
  const chip=e.target.closest('[data-chip]');if(chip){aiChip(chip.dataset.chip,chip.textContent.trim());return;}
  if(e.target.closest('#aiFlowGo')){flowNext(false);return;}
  if(e.target.closest('#aiFlowSkip')){flowNext(true);return;}
  if(e.target.closest('#aiDateX')){aiDateFilter='';renderAiBody();return;}
  const nc=e.target.closest('#aiNewConv');if(nc){const c=aiNewConvObj();aiConvs.push(c);aiConvId=c.id;aiFlow=null;aiTab='chat';aiSearch='';aiDateFilter='';saveAi();renderAiBody();return;}
  const cd=e.target.closest('[data-convdel]');if(cd){e.stopPropagation();const id=cd.dataset.convdel;aiConvs=aiConvs.filter(c=>c.id!==id);if(!aiConvs.length)aiConvs=[aiNewConvObj()];if(aiConvId===id)aiConvId=aiConvs[aiConvs.length-1].id;saveAi();renderAiBody();return;}
  const cv=e.target.closest('[data-conv]');if(cv){aiConvId=cv.dataset.conv;aiFlow=null;aiTab='chat';saveAi();renderAiBody();return;}
});
document.getElementById('aiBody').addEventListener('input',e=>{
  if(e.target.id==='aiSearchIn'){aiSearch=e.target.value;renderAiBody();const s=document.getElementById('aiSearchIn');if(s){s.focus();try{s.setSelectionRange(s.value.length,s.value.length);}catch(_){}}}
  else if(e.target.id==='aiDateIn'){aiDateFilter=e.target.value;renderAiBody();}
});
document.getElementById('aiBody').addEventListener('keydown',e=>{if(e.target.id==='aiFlowIn'&&e.key==='Enter'){e.preventDefault();flowNext(false);}});
{const aiIn=document.getElementById('aiInput');
aiIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();aiSend();}});
aiIn.addEventListener('input',()=>{aiIn.style.height='auto';aiIn.style.height=Math.min(120,aiIn.scrollHeight)+'px';});}

// ---------- old widget modal (unused) ----------
const ov=document.getElementById('overlay');
document.getElementById('modalX').addEventListener('click',()=>ov.classList.remove('open'));
ov.addEventListener('click',e=>{if(e.target===ov)ov.classList.remove('open');});

// ---------- Confirm dialog ----------
let confirmCb=null;
const confirmOv=document.getElementById('confirmOverlay');
function askConfirm(msg,cb){document.getElementById('confirmMsg').textContent=msg;confirmCb=cb;confirmOv.classList.add('open');}
document.getElementById('confirmYes').addEventListener('click',()=>{confirmOv.classList.remove('open');const c=confirmCb;confirmCb=null;if(c)c();});
document.getElementById('confirmNo').addEventListener('click',()=>{confirmOv.classList.remove('open');confirmCb=null;});
confirmOv.addEventListener('click',e=>{if(e.target===confirmOv){confirmOv.classList.remove('open');confirmCb=null;}});

// ---------- Desktop OS ----------
const DK_WIDGETS={clock:{name:()=>tr('w_clock'),w:210,h:160},timer:{name:()=>'Timer',w:230,h:185},spotify:{name:()=>'Spotify',w:320,h:400},note:{name:()=>tr('tile_notes'),w:240,h:200},tasks:{name:()=>tr('w_today'),w:300,h:215}};
const DK_TRAY_ITEMS=[{type:'clock',e:'🕐'},{type:'timer',e:'⏱️'},{type:'note',e:'📝'},{type:'tasks',e:'✅'}];
// Connected-service apps (unlocked via Connessioni)
const DK_APPS={
  gcal:{name:'Google Calendar',badge:'31',color:'#4285F4',w:300,h:252},
  notion:{name:'Notion',badge:'N',color:'#2f2f2f',w:280,h:240},
  gmail:{name:'Gmail',badge:'M',color:'#EA4335',w:312,h:238},
  slack:{name:'Slack',badge:'S',color:'#4A154B',w:300,h:240},
  gsuite:{name:'Google Workspace',badge:'G',color:'#4285F4',w:300,h:270},
  gdocs:{name:'Google Docs',badge:'D',color:'#4285F4',w:280,h:250},
  gsheets:{name:'Google Sheets',badge:'S',color:'#0F9D58',w:280,h:250},
  gslides:{name:'Google Slides',badge:'P',color:'#F4B400',w:280,h:250},
  m365:{name:'Microsoft 365',badge:'O',color:'#D83B01',w:292,h:226},
  trello:{name:'Trello',badge:'T',color:'#0079BF',w:300,h:226},
  github:{name:'GitHub',badge:'G',color:'#30363d',w:300,h:230},
  figma:{name:'Figma',badge:'F',color:'#A259FF',w:290,h:226},
  dropbox:{name:'Dropbox',badge:'D',color:'#0061FF',w:292,h:236},
  whatsapp:{name:'WhatsApp',badge:'W',color:'#25D366',w:290,h:252}
};
Object.keys(DK_APPS).forEach(k=>{DK_WIDGETS[k]={name:()=>DK_APPS[k].name,w:DK_APPS[k].w,h:DK_APPS[k].h,app:true};});
// Real launch targets: native URL scheme (opens the installed PC app) + web fallback
const APP_URLS={
  gcal:{web:'https://calendar.google.com'},
  spotify:{scheme:'spotify:',web:'https://open.spotify.com'},
  notion:{scheme:'notion://',web:'https://www.notion.so'},
  gmail:{web:'https://mail.google.com'},
  slack:{scheme:'slack://open',web:'https://app.slack.com'},
  drive:{web:'https://drive.google.com'},
  m365:{web:'https://www.office.com'},
  trello:{web:'https://trello.com'},
  github:{web:'https://github.com'},
  figma:{scheme:'figma://',web:'https://www.figma.com'},
  dropbox:{web:'https://www.dropbox.com/home'},
  whatsapp:{scheme:'whatsapp://',web:'https://web.whatsapp.com'}
};
function openApp(type){const a=APP_URLS[type];if(!a)return;
  if(a.scheme){const timer=setTimeout(()=>{if(a.web&&document.hasFocus())window.open(a.web,'_blank','noopener');},700);
    window.addEventListener('blur',()=>clearTimeout(timer),{once:true});
    try{window.location.href=a.scheme;}catch(e){if(a.web)window.open(a.web,'_blank','noopener');}
  }else if(a.web){window.open(a.web,'_blank','noopener');}
}
function appOpenBtn(type){return `<button class="dkw-open" data-openapp="${type}">${tr('open_app')} ${DK_APPS[type]?DK_APPS[type].name:''} ${SVG.arr}</button>`;}
function appList(rows){return `<div class="dkw-list">${rows.map(r=>`<div class="dkw-row">${r.ic!==undefined?`<div class="dkw-ic" style="background:${r.icbg||'var(--panel-3)'}">${r.ic}</div>`:''}<div class="dkw-rmain"><div class="dkw-rt">${r.t}</div>${r.s?`<div class="dkw-rs">${r.s}</div>`:''}</div>${r.meta?`<div class="dkw-rmeta">${r.meta}</div>`:''}${r.unread?`<span class="dkw-dot"></span>`:''}</div>`).join('')}</div>`;}
const APP_BODY={
  gcal:()=>{
    const c=CONNECTIONS.find(x=>x.app==='gcal');
    if(c&&c.on){
      if(gcalLoading)return `<div class="dkw-msg">${tr('gcal_loading')}</div>`;
      if(!gcalEvents.length)return `<div class="dkw-msg">${tr('gcal_empty')}</div>`;
      return appList(gcalEvents.map(ev=>({ic:'',icbg:'#4285F4',t:ev.title,s:gcalWhen(ev)})));
    }
    return appList([{ic:'',icbg:'#4285F4',t:'Call con il team',meta:'15:00'},{ic:'',icbg:'#1DB954',t:'Riunione settimanale',meta:'10:00'},{ic:'',icbg:'#EA4335',t:'Consegna progetto',meta:'18:00'},{ic:'',icbg:'#F4B400',t:'Aperitivo',meta:'20:30'}]);
  },
  gmail:()=>appList([{ic:'G',icbg:'#6a4a8a',t:'Giulia Bianchi',s:'Bozza articolo pronta',unread:true},{ic:'M',icbg:'#4a6a8a',t:'Marco Rossi',s:'Re: Budget Q3'},{ic:'N',icbg:'#8a5a4a',t:'Newsletter',s:'Le novità della settimana'}]),
  notion:()=>appList([{ic:'📄',t:'Piano editoriale'},{ic:'🎯',t:'Obiettivi 2026'},{ic:'🗂️',t:'Wiki del team'},{ic:'📝',t:'Note riunione'}]),
  slack:()=>appList([{ic:'#',icbg:'#4A154B',t:'general',s:'Giulia: ci vediamo alle 15'},{ic:'#',icbg:'#4A154B',t:'marketing',s:'Marco: nuovo post pronto'},{ic:'#',icbg:'#4A154B',t:'random',s:'☕ caffè?'}]),
  gdocs:()=>gdriveAppBody('gdocs','document','document','#4285F4','D'),
  gsheets:()=>gdriveAppBody('gsheets','spreadsheet','spreadsheet','#0F9D58','S'),
  gslides:()=>gdriveAppBody('gslides','presentation','presentation','#F4B400','P'),
  gsuite:()=>{
    const c=CONNECTIONS.find(x=>x.app==='gsuite'),conn=c&&c.on;
    const bar=`<div class="gd-bar"><button class="gd-new" data-gcreate="document" data-gapp="gsuite">+ ${tr('gd_doc')}</button><button class="gd-new" data-gcreate="spreadsheet" data-gapp="gsuite">+ ${tr('gd_sheet')}</button><button class="gd-new" data-gcreate="presentation" data-gapp="gsuite">+ ${tr('gd_slides')}</button></div>`;
    if(conn){
      if(gdriveLoading)return bar+`<div class="dkw-msg">${tr('gcal_loading')}</div>`;
      if(!gdriveFiles.length)return bar+`<div class="dkw-msg">${tr('gd_empty')}</div>`;
      return bar+`<div class="dkw-list">${gdriveFiles.map(f=>{const ic=gdriveIcon(f.mimeType);return `<div class="dkw-row gd-file" data-openurl="${f.link}"><div class="dkw-ic" style="background:${ic.c}">${ic.e}</div><div class="dkw-rmain"><div class="dkw-rt">${bdEsc(f.name)}</div></div></div>`;}).join('')}</div>`;
    }
    return bar+appList([{ic:'D',icbg:'#4285F4',t:'Bozza articolo'},{ic:'S',icbg:'#0F9D58',t:'Budget 2026'},{ic:'P',icbg:'#F4B400',t:'Pitch deck'}]);
  },
  m365:()=>appList([{ic:'W',icbg:'#2B579A',t:'Relazione.docx',meta:'oggi'},{ic:'X',icbg:'#217346',t:'Bilancio.xlsx',meta:'2g'},{ic:'P',icbg:'#B7472A',t:'Pitch.pptx',meta:'4g'}]),
  trello:()=>appList([{ic:'',icbg:'#61bd4f',t:'Da fare',meta:'5'},{ic:'',icbg:'#f2d600',t:'In corso',meta:'3'},{ic:'',icbg:'#0079BF',t:'In revisione',meta:'2'},{ic:'',icbg:'#c377e0',t:'Fatto',meta:'8'}]),
  github:()=>appList([{ic:'',icbg:'#30363d',t:'workie/app',s:'3 issue aperte'},{ic:'',icbg:'#30363d',t:'workie/site',s:'PR #12 · in review'},{ic:'',icbg:'#30363d',t:'workie/docs',s:'main aggiornato'}]),
  figma:()=>appList([{ic:'',icbg:'#A259FF',t:'Workie — UI Kit'},{ic:'',icbg:'#1ABCFE',t:'Onboarding flow'},{ic:'',icbg:'#0ACF83',t:'Brand assets'}]),
  dropbox:()=>appList([{ic:'📄',t:'Contratto.pdf',meta:'1g'},{ic:'📁',t:'Foto evento',meta:'3g'},{ic:'🎬',t:'Promo.mp4',meta:'1set'}]),
  whatsapp:()=>appList([{ic:'G',icbg:'#25D366',t:'Giulia',s:'Perfetto 👍',meta:'14:20'},{ic:'T',icbg:'#128C7E',t:'Team Workie',s:'Marco: fatto',meta:'13:05',unread:true},{ic:'L',icbg:'#075E54',t:'Luca',s:'Ci sentiamo domani',meta:'ieri'}])
};
function dkDefault(){return {active:1,dseq:2,wseq:5,list:[{id:1,name:'Desktop 1',widgets:[{id:1,type:'clock',x:24,y:24,w:210,h:160},{id:2,type:'timer',x:252,y:24,w:230,h:185},{id:3,type:'tasks',x:24,y:200,w:300,h:215},{id:4,type:'spotify',x:340,y:24,w:320,h:400}]}]};}
function sanitizeDK(o){
  if(!o||typeof o!=='object')return dkDefault();
  if(!Array.isArray(o.list))o.list=[];
  o.list=o.list.filter(d=>d&&typeof d==='object');
  o.list.forEach(d=>{if(!Array.isArray(d.widgets))d.widgets=[];if(d.id==null)d.id=(o.dseq=(o.dseq||1)+1);if(!d.name)d.name='Desktop';d.widgets=d.widgets.filter(w=>w&&typeof w==='object');d.widgets.forEach(w=>{if(w.type==='timer'){w.tRunning=false;delete w._start;}});});
  if(!o.list.length){const def=dkDefault();o.list=def.list;o.active=def.active;o.dseq=def.dseq;o.wseq=def.wseq;}
  if(!o.dseq)o.dseq=o.list.length+1;
  if(!o.wseq)o.wseq=Math.max(1,...o.list.flatMap(d=>d.widgets.map(w=>w.id||0)))+1;
  if(!o.list.some(d=>d.id===o.active))o.active=o.list[0].id;
  return o;
}
let DK=(function(){try{const s=localStorage.getItem(ukey('workie_desktops'));if(s)return sanitizeDK(JSON.parse(s));}catch(e){}return dkDefault();})();
function dkSave(){try{localStorage.setItem(ukey('workie_desktops'),JSON.stringify(DK));}catch(e){}}
function curDK(){let d=DK.list.find(x=>x.id===DK.active)||DK.list[0];if(!d){sanitizeDK(DK);d=DK.list[0];}return d;}
function pad2(n){return String(n).padStart(2,'0');}
function fmtTimer(s){s=Math.floor(s);return pad2(Math.floor(s/3600))+':'+pad2(Math.floor(s%3600/60))+':'+pad2(s%60);}
function dkBody(w){
  try{
  if(w.type==='clock')return `<div class="dkw-clock" data-clock>--:--:--</div><div class="dkw-clock-d" data-clockd></div>`;
  if(w.type==='timer')return `<div class="dkw-timer" data-timer="${w.id}">${fmtTimer(w.tElapsed||0)}</div><div class="dkw-tbtns"><button data-tb="toggle" data-wid="${w.id}">${w.tRunning?SVG.pause:SVG.play}</button><button data-tb="reset" data-wid="${w.id}">${SVG.refresh}</button></div>`;
  if(w.type==='spotify')return spotifyWidget(w);
  if(w.type==='note')return `<textarea class="dkw-note" data-note="${w.id}" placeholder="...">${w.text||''}</textarea>`;
  if(w.type==='tasks')return ['dtask1','dtask2','dtask3'].map((k,i)=>`<div class="task${i===0?' done':''}" style="background:var(--panel-2);margin-bottom:6px"><div class="check">${SVG.check}</div><div class="task-main"><div class="task-title">${tr(k)}</div></div></div>`).join('');
  if(APP_BODY[w.type])return `<div class="dkw-applist">${APP_BODY[w.type]()}</div>`+appOpenBtn(w.type);
  return '';
  }catch(e){return `<div class="dkw-msg">${tr('widget_err')}</div>`;}
}
function clampW(w,cw,ch){if(cw>0){w.w=Math.min(w.w,cw);w.x=Math.max(0,Math.min(w.x,cw-w.w));}if(ch>0){w.h=Math.min(w.h,ch);w.y=Math.max(0,Math.min(w.y,ch-w.h));}}
function renderTabs(){
  const tabs=document.getElementById('dkTabs');if(!tabs)return;
  tabs.innerHTML=DK.list.map(d=>`<div class="dk-tab${d.id===DK.active?' active':''}" data-dktab="${d.id}"><span class="dk-tname">${d.name}</span><span class="dk-x" data-dkclose="${d.id}">${SVG.x}</span></div>`).join('')+`<button class="dk-newtab" id="dkNewTab">+</button>`;
}
function wname(w){return DK_WIDGETS[w.type]?DK_WIDGETS[w.type].name():w.type;}
function wHead(w,isMax){return `<div class="dk-wh"><div class="dk-wh-l"><span class="dk-wh-title">${wname(w)}</span><span class="dk-wh-hide" data-whide="${w.id}">${SVG.next}</span><span class="dk-wh-max" data-wmax="${w.id}">${isMax?SVG.minimize:SVG.maximize}</span></div><span class="dk-wh-rm" data-wrm="${w.id}">${SVG.x}</span></div>`;}
function renderStage(){
  const canvas=document.getElementById('dkCanvas');if(!canvas)return;const d=curDK();
  const cw=canvas.clientWidth,ch=canvas.clientHeight;
  const maxW=(d.maxId!=null)?d.widgets.find(w=>w.id===d.maxId&&!w.hidden):null;
  if(maxW){
    const others=d.widgets.filter(w=>!w.hidden&&w.id!==maxW.id);
    const stripH=others.length?94:0;
    canvas.innerHTML=`<div class="dk-widget dk-maximized" data-wid="${maxW.id}" style="left:12px;top:12px;right:12px;bottom:${stripH+12}px">${wHead(maxW,true)}<div class="dk-wbody">${dkBody(maxW)}</div></div>`+(others.length?`<div class="dk-previews">${others.map(w=>`<div class="dk-preview" data-wmax="${w.id}"><div class="dk-preview-t">${wname(w)}</div><div class="dk-preview-s">${tr('dk_open_full')}</div></div>`).join('')}</div>`:'');
  }else{
    const vis=d.widgets.filter(w=>!w.hidden);vis.forEach(w=>clampW(w,cw,ch));
    canvas.innerHTML=vis.length?vis.map(w=>`<div class="dk-widget" data-wid="${w.id}" style="left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px">${wHead(w,false)}<div class="dk-wbody">${dkBody(w)}</div><div class="dk-resize" data-wresize="${w.id}"></div></div>`).join(''):`<div class="dk-empty">${tr('dk_empty')}</div>`;
  }
  const hidden=d.widgets.filter(w=>w.hidden);
  document.getElementById('dkTrayList').innerHTML=hidden.length?hidden.map(w=>`<div class="dk-hidden"><span class="restore" data-wshow="${w.id}">${SVG.prev}</span><span class="name">${wname(w)}</span><span class="rm" data-wrm="${w.id}">${SVG.x}</span></div>`).join(''):`<div class="dk-empty-tray">${tr('dk_no_hidden')}</div>`;
}
function renderDesktop(){renderTabs();renderStage();}
// drag + resize
let dkDrag=null;
document.getElementById('dkCanvas').addEventListener('mousedown',e=>{
  if(curDK().maxId!=null)return;
  const canvas=document.getElementById('dkCanvas'),cw=canvas.clientWidth,ch=canvas.clientHeight;
  const rh=e.target.closest('[data-wresize]');
  if(rh){const w=curDK().widgets.find(x=>x.id==rh.dataset.wresize);if(!w)return;const el=rh.closest('.dk-widget');dkDrag={mode:'resize',w,sx:e.clientX,sy:e.clientY,sw:w.w,sh:w.h,el,cw,ch};el.classList.add('resizing');e.preventDefault();return;}
  const wh=e.target.closest('.dk-wh');
  if(wh&&!e.target.closest('.dk-wh-rm')&&!e.target.closest('.dk-wh-hide')&&!e.target.closest('.dk-wh-max')){const el=wh.closest('.dk-widget');const w=curDK().widgets.find(x=>x.id==el.dataset.wid);if(!w)return;const arr=curDK().widgets;arr.splice(arr.indexOf(w),1);arr.push(w);canvas.appendChild(el);dkDrag={mode:'move',w,sx:e.clientX,sy:e.clientY,ox:w.x,oy:w.y,el,cw,ch};el.classList.add('dragging');e.preventDefault();}
});
document.addEventListener('mousemove',e=>{
  if(!dkDrag)return;
  if(dkDrag.mode==='move'){let nx=dkDrag.ox+(e.clientX-dkDrag.sx),ny=dkDrag.oy+(e.clientY-dkDrag.sy);nx=Math.max(0,Math.min(nx,dkDrag.cw-dkDrag.w.w));ny=Math.max(0,Math.min(ny,dkDrag.ch-dkDrag.w.h));dkDrag.w.x=nx;dkDrag.w.y=ny;dkDrag.el.style.left=nx+'px';dkDrag.el.style.top=ny+'px';}
  else{let nw=Math.max(150,Math.min(dkDrag.sw+(e.clientX-dkDrag.sx),dkDrag.cw-dkDrag.w.x)),nh=Math.max(90,Math.min(dkDrag.sh+(e.clientY-dkDrag.sy),dkDrag.ch-dkDrag.w.y));dkDrag.w.w=nw;dkDrag.w.h=nh;dkDrag.el.style.width=nw+'px';dkDrag.el.style.height=nh+'px';}
});
document.addEventListener('mouseup',()=>{if(dkDrag){dkDrag.el.classList.remove('dragging','resizing');dkDrag=null;dkSave();}});
// desktop interactions
function dkAddWidget(type){const def=DK_WIDGETS[type];if(!def)return;const d=curDK(),n=d.widgets.filter(w=>!w.hidden).length;d.widgets.push({id:DK.wseq++,type,x:24+(n%5)*28,y:24+(n%5)*28,w:def.w,h:def.h,hidden:false});dkSave();renderStage();}
const dkAddOv=document.getElementById('dkAddOverlay');
function openDkAdd(){
  const native=DK_TRAY_ITEMS.map(it=>`<div class="wtile" data-dkadd="${it.type}"><div class="ic">${it.e}</div><span>${DK_WIDGETS[it.type].name()}</span></div>`).join('');
  const apps=connApps().map(c=>{const ic=c.icon?`<div class="ic dkapp-ic brand">${c.icon}</div>`:`<div class="ic dkapp-ic" style="background:${c.color}">${c.badge}</div>`;return `<div class="wtile" data-dkadd="${c.app}">${ic}<span>${c.name}</span></div>`;}).join('');
  let html=`<div class="wcat">${tr('dk_cat_widgets')}</div><div class="wrow" style="grid-template-columns:repeat(3,1fr)">${native}</div>`;
  html+=`<div class="wcat" style="margin-top:15px">${tr('dk_cat_apps')}</div>`;
  html+=apps?`<div class="wrow" style="grid-template-columns:repeat(3,1fr)">${apps}</div>`:`<div class="dk-app-hint">${tr('dk_apps_hint')} <a data-go="connections" id="dkToConn">${tr('nav_connections')}</a></div>`;
  document.getElementById('dkAddTiles').innerHTML=html;dkAddOv.classList.add('open');
}
document.getElementById('dkAddX').addEventListener('click',()=>dkAddOv.classList.remove('open'));
dkAddOv.addEventListener('click',e=>{if(e.target===dkAddOv){dkAddOv.classList.remove('open');return;}if(e.target.closest('#dkToConn')){dkAddOv.classList.remove('open');return;}const t=e.target.closest('[data-dkadd]');if(t){dkAddWidget(t.dataset.dkadd);dkAddOv.classList.remove('open');}});
document.querySelector('[data-page="desktop"]').addEventListener('click',e=>{
  if(e.target.closest('#dkHandle')){document.getElementById('dkTray').classList.toggle('open');return;}
  if(e.target.closest('#dkTrayClose')){document.getElementById('dkTray').classList.remove('open');return;}
  if(e.target.closest('#dkAddBtn')){openDkAdd();return;}
  const oapp=e.target.closest('[data-openapp]');
  if(oapp){openApp(oapp.dataset.openapp);return;}
  const spe=e.target.closest('[data-spexpand]');
  if(spe){const d=curDK();d.maxId=+spe.dataset.spexpand;dkSave();renderStage();return;}
  const spc=e.target.closest('[data-spctl]');
  if(spc){spControl(spc.dataset.spctl);return;}
  const sppl=e.target.closest('[data-spplaylist]');
  if(sppl){spOpenPlaylist(sppl.dataset.spplaylist,sppl.dataset.spname);return;}
  if(e.target.closest('[data-spback]')){spView.plOpen=null;renderStage();return;}
  const spt=e.target.closest('[data-spplay]');
  if(spt){spPlayTrack(spt.dataset.spuri,spt.dataset.spurl);return;}
  const gcr=e.target.closest('[data-gcreate]');
  if(gcr){gdriveCreate(gcr.dataset.gcreate,gcr.dataset.gapp);return;}
  const ourl=e.target.closest('[data-openurl]');
  if(ourl){window.open(ourl.dataset.openurl,'_blank','noopener');return;}
  const wmax=e.target.closest('[data-wmax]');
  if(wmax){const d=curDK(),id=+wmax.dataset.wmax;d.maxId=(d.maxId===id?null:id);dkSave();renderStage();return;}
  const whide=e.target.closest('[data-whide]');
  if(whide){const d=curDK(),w=d.widgets.find(x=>x.id==+whide.dataset.whide);if(w){w.hidden=true;if(d.maxId===w.id)d.maxId=null;dkSave();renderStage();}return;}
  const wshow=e.target.closest('[data-wshow]');
  if(wshow){const w=curDK().widgets.find(x=>x.id==+wshow.dataset.wshow);if(w){w.hidden=false;dkSave();renderStage();}return;}
  const wrm=e.target.closest('[data-wrm]');
  if(wrm){const id=+wrm.dataset.wrm;askConfirm(tr('confirm_remove_widget'),()=>{const d=curDK();d.widgets=d.widgets.filter(w=>w.id!==id);if(d.maxId===id)d.maxId=null;dkSave();renderStage();});return;}
  const close=e.target.closest('[data-dkclose]');
  if(close){const id=+close.dataset.dkclose;askConfirm(tr('confirm_close_desktop'),()=>{DK.list=DK.list.filter(d=>d.id!==id);if(!DK.list.length)DK.list=[{id:DK.dseq++,name:'Desktop 1',widgets:[]}];if(DK.active===id)DK.active=DK.list[0].id;dkSave();renderDesktop();});return;}
  if(e.target.closest('#dkNewTab')){const id=DK.dseq++;DK.list.push({id,name:'Desktop '+(DK.list.length+1),widgets:[]});DK.active=id;dkSave();renderDesktop();return;}
  const tb=e.target.closest('[data-tb]');
  if(tb){const w=curDK().widgets.find(x=>x.id==tb.dataset.wid);if(!w)return;if(tb.dataset.tb==='toggle'){if(w.tRunning){w.tElapsed=(w.tElapsed||0)+(Date.now()-w._start)/1000;w.tRunning=false;}else{w._start=Date.now();w.tRunning=true;}}else{w.tElapsed=0;w.tRunning=false;}dkSave();renderStage();return;}
  const tab=e.target.closest('[data-dktab]');
  if(tab){DK.active=+tab.dataset.dktab;dkSave();document.querySelectorAll('#dkTabs .dk-tab').forEach(el=>el.classList.toggle('active',+el.dataset.dktab===DK.active));renderStage();return;}
});
// rename desktop (doppio click sul nome)
document.getElementById('dkTabs').addEventListener('dblclick',e=>{
  const nm=e.target.closest('.dk-tname');if(!nm)return;
  const tab=nm.closest('[data-dktab]');const d=DK.list.find(x=>x.id===+tab.dataset.dktab);if(!d)return;
  nm.innerHTML=`<input class="dk-rn" value="${d.name.replace(/"/g,'&quot;')}">`;
  const inp=nm.querySelector('input');inp.focus();inp.select();
  const done=()=>{const v=inp.value.trim();if(v)d.name=v;dkSave();renderDesktop();};
  inp.addEventListener('blur',done);
  inp.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Enter')inp.blur();else if(ev.key==='Escape'){inp.value=d.name;inp.blur();}});
});
document.querySelector('[data-page="desktop"]').addEventListener('input',e=>{const n=e.target.closest('[data-note]');if(n){const w=curDK().widgets.find(x=>x.id==n.dataset.note);if(w){w.text=n.value;dkSave();}}});
// live clock + timers
setInterval(()=>{
  const cd=document.querySelectorAll('[data-clock]');
  if(cd.length){const n=new Date(),ts=pad2(n.getHours())+':'+pad2(n.getMinutes())+':'+pad2(n.getSeconds());let ds='';try{ds=n.toLocaleDateString(LOCALES[LANG],{weekday:'long',day:'numeric',month:'long'});}catch(e){}cd.forEach(el=>el.textContent=ts);document.querySelectorAll('[data-clockd]').forEach(el=>el.textContent=ds);}
  const d=curDK();if(d)d.widgets.forEach(w=>{if(w.type==='timer'){const el=document.querySelector(`[data-timer="${w.id}"]`);if(el){let s=w.tElapsed||0;if(w.tRunning&&w._start)s+=(Date.now()-w._start)/1000;el.textContent=fmtTimer(s);}}});
},500);
renderDesktop();

// nav icon sizing helper
document.querySelectorAll('.ni svg').forEach(s=>{s.style.width='15px';s.style.height='15px';s.style.display='block';});

// ---------- Sidebar toggle ----------
const toggleNav=()=>document.querySelector('.app').classList.toggle('nav-collapsed');
document.getElementById('navToggle').addEventListener('click',toggleNav);
{const nc=document.getElementById('navCollapse');if(nc)nc.addEventListener('click',toggleNav);}
// Chrome finestra: toggle sidebar + verde = schermo intero (rosso/giallo funzionano solo nell'app desktop)
{const wt=document.getElementById('wcToggle');if(wt)wt.addEventListener('click',toggleNav);
 // Puntini finestra: in Tauri comandano la finestra nativa; sul web il verde fa schermo intero
 function tauriWin(){try{return (window.__TAURI__&&window.__TAURI__.window&&window.__TAURI__.window.getCurrentWindow)?window.__TAURI__.window.getCurrentWindow():null;}catch(e){return null;}}
 const isTauri=!!(window.__TAURI__);
 const isElectron=!!(window.workieDesktop);
 // Electron: riuso la modalità app-desktop (pallini finti nascosti, chrome accanto ai
 // pallini nativi macOS) e aggiungo la striscia-drag via CSS -webkit-app-region.
 if(isElectron){document.documentElement.classList.add('is-tauri','is-electron');}
 if(isTauri){document.documentElement.classList.add('is-tauri');document.querySelectorAll('.wc-red,.wc-yellow').forEach(d=>d.style.cursor='pointer');const wd=document.querySelector('.wco-drag');if(wd)wd.setAttribute('data-tauri-drag-region','');const ch=document.getElementById('appChrome');if(ch)ch.setAttribute('data-tauri-drag-region','');
   // Trascinamento manuale: su pagina remota il gestore automatico di data-tauri-drag-region può non
   // essere iniettato, quindi chiamo io startDragging() al mousedown sulla striscia superiore.
   const doDrag=function(){var t=window.__TAURI__;if(!t)return false;
     try{if(t.window&&t.window.getCurrentWindow){t.window.getCurrentWindow().startDragging();return true;}}catch(_){}
     try{if(t.webviewWindow&&t.webviewWindow.getCurrentWebviewWindow){t.webviewWindow.getCurrentWebviewWindow().startDragging();return true;}}catch(_){}
     try{if(t.window&&t.window.appWindow&&t.window.appWindow.startDragging){t.window.appWindow.startDragging();return true;}}catch(_){}
     var inv=(t.core&&t.core.invoke)||t.invoke||(t.tauri&&t.tauri.invoke);
     if(inv){try{inv('plugin:window|start_dragging');return true;}catch(_){}}
     return false;
   };
   // Fascia superiore trascinabile via LOGICA (in fase di cattura: funziona anche dove la striscia era coperta).
   const DRAG_H=64;
   document.addEventListener('mousedown',function(e){
     if(e.button!==0)return;
     if((e.clientY||0)>DRAG_H)return;
     if(e.target.closest('button,a,input,textarea,select,[role="button"],[contenteditable],[draggable="true"],.wc-dot,.snav-btn,.ai-side-btn,.wc-toggle,.mdb-btn,[data-sview]'))return;
     var ok=doDrag();
     if(!ok&&!window._dragDiag){window._dragDiag=1;try{var t=window.__TAURI__;var k=t?Object.keys(t).join(','):'(nessuno)';var w=(t&&t.window)?Object.keys(t.window).join(','):'(nessuno)';if(typeof showToast==='function')showToast('DRAG-DIAG · __TAURI__: '+k+' · .window: '+w);}catch(_){}}
   },true);
 }
 // Schermo intero: nell'app desktop ingrandisce la finestra nativa; sul web usa la Fullscreen API.
 function toggleFullscreen(){const w=tauriWin();if(w){try{w.toggleMaximize();}catch(e){}return;}try{if(document.fullscreenElement){document.exitFullscreen();}else{(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen).call(document.documentElement);}}catch(e){}}
 const wr=document.getElementById('wcRed');if(wr)wr.addEventListener('click',()=>{const w=tauriWin();if(w)w.close();});
 const wy=document.getElementById('wcYellow');if(wy)wy.addEventListener('click',()=>{const w=tauriWin();if(w)w.minimize();});
 const wg=document.getElementById('wcGreen');if(wg)wg.addEventListener('click',toggleFullscreen);
 // Doppio clic sulla fascia superiore (la zona di trascinamento della finestra) → schermo intero,
 // come il doppio clic sulla barra del titolo del Mac. In Tauri lo gestisce la drag-region nativa.
 if(!isTauri&&!isElectron){
   const FS_DBL_H=48;
   document.addEventListener('dblclick',function(e){
     if((e.clientY||0)>FS_DBL_H)return;
     if(e.target.closest('button,a,input,textarea,select,[role="button"],[contenteditable],.wc-dot,.snav-btn,.ai-side-btn,.wc-toggle,#modeSwitch,.ms-seg,[data-sview]'))return;
     toggleFullscreen();
   });
 }}
{const shl=document.getElementById('shLogo');if(shl)shl.addEventListener('click',()=>{if(document.querySelector('.app').classList.contains('nav-collapsed'))toggleNav();});}

// ---------- Language ----------
document.getElementById('langRow').addEventListener('click',e=>{
  const o=e.target.closest('.langopt');if(!o)return;setLang(o.dataset.lang);
});

// ---------- Temi ----------
// --- dati temi (THEME_DEFS / THEME_SOON) spostati in themes.js, caricato prima di app.js ---
let curTheme=(()=>{try{return localStorage.getItem(ukey('workie_theme'))||'chiaro';}catch(e){return 'chiaro';}})();
let customCfg=(()=>{try{const s=JSON.parse(localStorage.getItem(ukey('workie_theme_custom')));if(s&&typeof s==='object')return s;}catch(e){}return {bg:'#191327',bgImg:'',accent:'#8b5cf6',panel:'#2a2246',text:'#ececf4'};})();
let savedThemes=(()=>{try{const s=JSON.parse(localStorage.getItem(ukey('workie_saved_themes')));if(Array.isArray(s))return s.filter(x=>x&&x.id&&x.cfg);}catch(e){}return [];})();
let curSavedId=(()=>{try{return localStorage.getItem(ukey('workie_theme_saved'))||null;}catch(e){return null;}})();
function saveTheme(){try{localStorage.setItem(ukey('workie_theme'),curTheme);localStorage.setItem(ukey('workie_theme_custom'),JSON.stringify(customCfg));localStorage.setItem(ukey('workie_saved_themes'),JSON.stringify(savedThemes));if(curSavedId)localStorage.setItem(ukey('workie_theme_saved'),curSavedId);else localStorage.removeItem(ukey('workie_theme_saved'));}catch(e){}}
function hexA(hex,a){hex=(hex||'').replace('#','');if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');const n=parseInt(hex,16)||0;return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;}
function shade(hex,amt){hex=(hex||'').replace('#','');if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');let r=(parseInt(hex.slice(0,2),16)||0)+amt,g=(parseInt(hex.slice(2,4),16)||0)+amt,b=(parseInt(hex.slice(4,6),16)||0)+amt;const cl=v=>Math.max(0,Math.min(255,v));return `#${[cl(r),cl(g),cl(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}`;}
function isLight(hex){hex=(hex||'').replace('#','');if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');const r=parseInt(hex.slice(0,2),16)||0,g=parseInt(hex.slice(2,4),16)||0,b=parseInt(hex.slice(4,6),16)||0;return (r*299+g*587+b*114)/1000>140;}
const CUSTOM_VARS=['--bg','--sidebar','--panel','--panel-2','--panel-3','--inset','--active-bg','--accent','--accent-2','--accent-dim','--accent-soft','--text','--text-dim','--muted','--border','--border-soft'];
const CU_PALS={
  bg:['#14101f','#0f172a','#101a12','#20141f','#241a44','#0b1020','#f3f2f8','#eae7f2'],
  accent:['#8b5cf6','#7c5cff','#6d4aff','#60a5fa','#4ade80','#fbbf24','#fb7185','#e879c9'],
  panel:['#221a3d','#232325','#1b2340','#2a2049','#122033','#26222e','#ffffff','#f0eef7'],
  text:['#ece9f7','#ededec','#ffffff','#1c1830','#e8fbff','#2a2440']
};
// Barra del titolo "tuttuno" (come le app Google): tinge la title bar della PWA
// con lo stesso colore del tema attivo, invece del nero fisso.
function updateThemeColorMeta(){
  try{
    const c=getComputedStyle(document.documentElement).getPropertyValue('--sidebar').trim();
    if(!c)return;
    let m=document.querySelector('meta[name="theme-color"]');
    if(!m){m=document.createElement('meta');m.setAttribute('name','theme-color');document.head.appendChild(m);}
    m.setAttribute('content',c);
  }catch(e){}
}
function applyThemeVars(){
  if(THEME_SOON[curTheme]){curTheme='classico';curSavedId=null;}
  const r=document.documentElement;
  // Fino a login/onboarding completati (gate visibile) il tema è sempre "classico" scuro
  const gate=document.getElementById('authGate');
  const locked=gate&&!gate.classList.contains('hidden');
  const eff=locked?'classico':curTheme;
  r.classList.remove('theme-classico','theme-futuristico','theme-chiaro','theme-custom');
  r.classList.add('theme-'+eff);
  CUSTOM_VARS.forEach(p=>r.style.removeProperty(p));
  document.body.style.background='';
  if(eff==='custom'){
    const c=customCfg,light=isLight(c.bg);
    r.style.setProperty('--bg',c.bg);
    r.style.setProperty('--sidebar',c.panel);
    r.style.setProperty('--panel',c.panel);
    r.style.setProperty('--panel-2',shade(c.panel,light?-10:12));
    r.style.setProperty('--panel-3',shade(c.panel,light?-18:22));
    r.style.setProperty('--inset',shade(c.panel,light?-6:-8));
    r.style.setProperty('--active-bg',shade(c.bg,light?-8:-6));
    r.style.setProperty('--accent',c.accent);
    r.style.setProperty('--accent-2',c.accent);
    r.style.setProperty('--accent-dim',shade(c.accent,-24));
    r.style.setProperty('--accent-soft',hexA(c.accent,.16));
    r.style.setProperty('--text',c.text);
    r.style.setProperty('--text-dim',light?'#565270':'#c6c2d8');
    r.style.setProperty('--muted',light?'#8b8699':'#928cae');
    r.style.setProperty('--border',light?'rgba(24,18,45,.11)':'rgba(255,255,255,.09)');
    r.style.setProperty('--border-soft',light?'rgba(24,18,45,.07)':'rgba(255,255,255,.05)');
    document.body.style.background=c.bgImg?`linear-gradient(${hexA(c.bg,.55)},${hexA(c.bg,.55)}),url("${c.bgImg}") center/cover fixed no-repeat`:c.bg;
  }
  updateThemeColorMeta();
}
function applyTheme(){applyThemeVars();renderThemeGrid();if(typeof renderStThemes==='function')renderStThemes();}
function themePrev(bg,card,side,ac){return `<div class="theme-prev" style="background:${bg}"><div class="p-side" style="background:${side}"></div><div class="p-card" style="background:${card}"></div><div class="p-dot" style="background:${ac}"></div></div>`;}
function renderThemeGrid(){
  const g=document.getElementById('themeGrid');if(!g)return;
  let html=THEME_DEFS.map(t=>{
    const soon=!!THEME_SOON[t.k];
    const bg=t.k==='custom'?customCfg.bg:t.bg, card=t.k==='custom'?customCfg.panel:t.card, ac=t.k==='custom'?customCfg.accent:t.accent, side=t.k==='custom'?customCfg.panel:t.side;
    const nm=tr('theme_'+t.k)||t.name, ds=soon?`<span class="theme-soon">${tr('coming_soon')}</span>`:(tr('theme_'+t.k+'_d')||t.desc);
    const active=!soon&&((t.k==='custom')?(curTheme==='custom'&&curSavedId==null):(curTheme===t.k));
    return `<div class="theme-card${active?' active':''}${soon?' soon':''}" data-theme="${t.k}">${themePrev(bg,card,side,ac)}<div><div class="theme-name">${nm}</div><div class="theme-desc">${ds}</div></div></div>`;
  }).join('');
  if(!THEME_SOON.custom)html+=savedThemes.map(s=>{
    const active=curTheme==='custom'&&curSavedId===s.id;
    return `<div class="theme-card saved${active?' active':''}" data-saved="${s.id}"><span class="theme-del" data-del="${s.id}">×</span>${themePrev(s.cfg.bg,s.cfg.panel,s.cfg.panel,s.cfg.accent)}<div><div class="theme-name">${bdEsc(s.name)}</div><div class="theme-desc">${tr('cu_saved_theme')}</div></div></div>`;
  }).join('');
  g.innerHTML=html;
  const cp=document.getElementById('themeCustom');if(cp)cp.classList.toggle('on',curTheme==='custom'&&!THEME_SOON.custom);
  renderCuSwatches();
}
function renderCuSwatches(){
  [['swBg','bg'],['swAccent','accent'],['swPanel','panel'],['swText','text']].forEach(([id,key])=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=(customCfg[key]||'').toLowerCase();
    const isPreset=CU_PALS[key].some(c=>c.toLowerCase()===cur);
    let html=CU_PALS[key].map(c=>`<div class="cu-chip${c.toLowerCase()===cur?' sel':''}" data-cuset="${key}:${c}" style="background:${c}"></div>`).join('');
    html+=`<label class="cu-chip cu-pick${isPreset?'':' sel'}"${isPreset?'':` style="background:${customCfg[key]}"`}><span class="ic">${SVG.pen||'✎'}</span><input type="color" value="${customCfg[key]}" data-cupick="${key}"></label>`;
    el.innerHTML=html;
  });
}
function setTheme(k){if(THEME_SOON[k])return;curTheme=k;curSavedId=null;saveTheme();applyTheme();}
function setCuColor(key,val,live){customCfg[key]=val;curTheme='custom';curSavedId=null;if(live){applyThemeVars();}else{saveTheme();applyTheme();}}
function selectSaved(id){const s=savedThemes.find(x=>x.id===id);if(!s)return;customCfg=Object.assign({bg:'#191327',bgImg:'',accent:'#8b5cf6',panel:'#2a2246',text:'#ececf4'},s.cfg);curTheme='custom';curSavedId=id;saveTheme();applyTheme();}
function saveCurrentTheme(){const inp=document.getElementById('cuName');const nm=(inp.value||'').trim()||(tr('theme_custom')+' '+(savedThemes.length+1));const id='t'+Date.now();savedThemes.push({id,name:nm,cfg:Object.assign({},customCfg)});curSavedId=id;curTheme='custom';inp.value='';saveTheme();applyTheme();if(typeof showToast==='function')showToast(tr('cu_saved'));}
function deleteSaved(id){savedThemes=savedThemes.filter(x=>x.id!==id);if(curSavedId===id)curSavedId=null;saveTheme();applyTheme();}
document.getElementById('themeGrid').addEventListener('click',e=>{
  const del=e.target.closest('[data-del]');if(del){e.stopPropagation();deleteSaved(del.dataset.del);return;}
  const sv=e.target.closest('[data-saved]');if(sv){selectSaved(sv.dataset.saved);return;}
  const c=e.target.closest('[data-theme]');if(c)setTheme(c.dataset.theme);
});
(()=>{const cp=document.getElementById('themeCustom');
  cp.addEventListener('click',e=>{const chip=e.target.closest('[data-cuset]');if(!chip)return;const i=chip.dataset.cuset.indexOf(':');setCuColor(chip.dataset.cuset.slice(0,i),chip.dataset.cuset.slice(i+1),false);});
  cp.addEventListener('input',e=>{const p=e.target.closest('[data-cupick]');if(p)setCuColor(p.dataset.cupick,p.value,true);});
  cp.addEventListener('change',e=>{const p=e.target.closest('[data-cupick]');if(p)setCuColor(p.dataset.cupick,p.value,false);});
})();
document.getElementById('cuSaveBtn').addEventListener('click',saveCurrentTheme);

// ================= SETTINGS MODAL (finestra impostazioni) =================
let stTab='generale';
const ST_NAV=[
  {t:'stm_g_settings',items:[['generale','stm_generale','set'],['categorie','stm_categories','grid'],['caselle','set_mailboxes','conn'],['profilo','stm_profile','person'],['account','set_account','team'],['privacy','stm_privacy','conn'],['fatturazione','stm_billing','file'],['funzionalita','stm_features','grid']]},
  {t:'stm_g_desktop',items:[['dkgenerale','stm_generale','daily'],['estensioni','stm_extensions','conn'],['sviluppatore','stm_developer','agent']]},
  {t:'stm_g_custom',items:[['connettori','stm_connectors','conn'],['plugin','stm_plugins','grid']]}
];
function renderStNav(){
  const el=document.getElementById('stmNav');if(!el)return;
  const q=(document.getElementById('stmSearch').value||'').trim().toLowerCase();
  let html='';
  ST_NAV.forEach(g=>{
    const items=g.items.filter(it=>!q||tr(it[1]).toLowerCase().includes(q));
    if(!items.length)return;
    html+='<div class="stm-gtitle">'+tr(g.t)+'</div>';
    items.forEach(it=>{html+='<button class="stm-item'+(stTab===it[0]?' on':'')+'" data-sttab="'+it[0]+'"><span class="stm-ic">'+(SVG[it[2]]||'')+'</span><span>'+tr(it[1])+'</span></button>';});
  });
  el.innerHTML=html||'<div class="stm-gtitle">'+tr('soc_no_results')+'</div>';
}
function stRow(label,control){return '<div class="stm-row"><div class="stm-label">'+label+'</div><div class="stm-control">'+control+'</div></div>';}
function stGeneraleHTML(){
  return '<div class="stm-sec-t">'+tr('stm_prefs')+'</div>'
    +stRow(tr('set_language'),'<div class="stm-langs">'+Object.keys(LANGS).map(l=>'<button class="stm-lang'+(LANG===l?' on':'')+'" data-stlang="'+l+'">'+LANGS[l].name+'</button>').join('')+'</div>')
    +stRow(tr('set_appearance'),'<div class="stm-themes" id="stThemeGrid"></div>')
    +stRow(tr('stm_font'),'<span class="stm-soon">'+tr('coming_soon')+'</span>')
    +'<div class="stm-sec-t" style="margin-top:28px">'+tr('stm_home')+'</div>'
    +stTogRow(tr('stm_home_daily'),tr('stm_home_daily_d'),'daily',USER.showDaily!==false,'sthome')
    +stTogRow(tr('stm_home_tasks'),tr('stm_home_tasks_d'),'tasks',USER.showTasks!==false,'sthome')
    +'<div class="stm-sec-t" style="margin-top:28px">'+tr('stm_notif')+'</div>'
    +stTogRow(tr('stm_notif_push'),tr('stm_notif_push_d'),'push',false,'stpush')
    +'<div class="stm-tdesc" id="stmPushHint" style="margin-top:-4px;color:var(--accent-2)"></div>';
}
function stProfileHTML(){
  const wt=USER.workType||'',opt=(v,l)=>'<option value="'+v+'"'+(wt===v?' selected':'')+'>'+l+'</option>';
  return '<div class="stm-sec-t">'+tr('stm_profile')+'</div>'
    +stRow(tr('stm_avatar'),'<div class="stm-avrow"><div class="stm-av" id="stmAv">'+avatarInner()+'</div><button class="stm-mini" id="stmAvChange">'+tr('stm_change')+'</button>'+(USER.photo?'<button class="stm-mini2" id="stmAvRemove">'+tr('remove_photo')+'</button>':'')+'</div>')
    +stRow(tr('profile_name'),'<input class="stm-in" id="stName" value="'+bdEsc(USER.name||'')+'">')
    +stRow(tr('stm_surname'),'<input class="stm-in" id="stSurname" value="'+bdEsc(USER.surname||'')+'">')
    +stRow(tr('profile_username'),'<div class="stm-userwrap"><span class="stm-at">@</span><input class="stm-in stm-userin" id="stUsername" value="'+bdEsc(USER.username||'')+'" maxlength="20" autocomplete="off"></div><div class="stm-msg" id="stUserMsg"></div>')
    +stRow(tr('stm_work'),'<select class="stm-sel" id="stWork">'+opt('',tr('stm_choose'))+opt('worker',tr('stm_worker'))+opt('student',tr('stm_student'))+opt('other',tr('stm_other'))+'</select>')
    +stRow(tr('stm_bio'),'<textarea class="stm-ta" id="stBio" rows="3" placeholder="'+tr('stm_bio_ph')+'">'+bdEsc(USER.bio||'')+'</textarea>')
    +'<div class="stm-sec-t" style="margin-top:28px">'+tr('stm_public')+'</div>'
    +stRow(tr('stm_website'),'<input class="stm-in" id="stWebsite" value="'+bdEsc(USER.website||'')+'" placeholder="'+tr('stm_website_ph')+'">')
    +SOCIALS.map(s=>stRow(s.label,'<input class="stm-in" data-stsoc="'+s.k+'" value="'+bdEsc(USER.socials[s.k]||'')+'" placeholder="@username o link">')).join('')
    +stTogRow(tr('stm_share_email'),tr('stm_share_email_d'),'email',USER.share.email===true,'sttoggle')
    +stTogRow(tr('stm_share_web'),tr('stm_share_web_d'),'website',USER.share.website===true,'sttoggle');
}
function stAccountHTML(){
  return '<div class="stm-sec-t">'+tr('set_account')+'</div>'
    +stRow(tr('profile_email'),'<div class="stm-static">'+bdEsc(USER.email||'')+'</div>')
    +'<div class="stm-sub-t" style="margin-top:18px">'+tr('stm_change_email')+'</div>'
    +stRow(tr('stm_new_email'),'<input class="stm-in" id="stNewEmail" type="email" placeholder="'+tr('stm_new_email_ph')+'">')
    +'<div class="stm-actionrow"><button class="btn-primary-sm" id="stEmailSave">'+tr('stm_update_email')+'</button><span class="stm-msg" id="stEmailMsg"></span></div>'
    +'<div class="stm-sub-t" style="margin-top:26px">'+tr('stm_change_pw')+'</div>'
    +stRow(tr('stm_cur_pw'),'<input class="stm-in" id="stPwCur" type="password" autocomplete="off">')
    +stRow(tr('pw_new'),'<input class="stm-in" id="stPwNew" type="password" autocomplete="off">')
    +stRow(tr('pw_confirm'),'<input class="stm-in" id="stPwConf" type="password" autocomplete="off">')
    +'<div class="stm-actionrow"><button class="btn-primary-sm" id="stPwSave">'+tr('pw_update')+'</button><span class="stm-msg" id="stPwMsg"></span></div>'
    +'<div class="stm-danger"><div class="stm-sub-t stm-danger-t" style="margin-top:34px">'+tr('stm_del_title')+'</div><div class="stm-tdesc" style="margin-bottom:12px">'+tr('stm_del_desc')+'</div><button class="danger-btn" id="stDeleteAcc">'+tr('stm_del_btn')+'</button></div>';
}
const ST_CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';
function stTogRow(label,desc,key,on,attr){attr=attr||'prtoggle';return '<div class="stm-trow"><div class="stm-tinfo"><div class="stm-tlabel">'+label+'</div>'+(desc?'<div class="stm-tdesc">'+desc+'</div>':'')+'</div><button class="stm-switch'+(on?' on':'')+'" data-'+attr+'="'+key+'" role="switch" aria-checked="'+on+'"><span class="stm-knob"></span></button></div>';}
function stPrivacyHTML(){
  const p=USER.privacy||{};
  return '<div class="stm-sec-t">'+tr('stm_privacy')+'</div>'
    +'<div class="stm-para">'+tr('pr_intro')+'</div>'
    +'<div class="stm-navrow" data-prlink="protect"><span>'+tr('pr_protect')+'</span><span class="stm-chev">'+ST_CHEV+'</span></div>'
    +'<div class="stm-navrow" data-prlink="use"><span>'+tr('pr_use')+'</span><span class="stm-chev">'+ST_CHEV+'</span></div>'
    +'<div class="stm-sec-t" style="margin-top:28px">'+tr('stm_prefs')+'</div>'
    +stTogRow(tr('pr_location'),tr('pr_location_d'),'location',p.location!==false)
    +stTogRow(tr('pr_improve'),tr('pr_improve_d'),'improve',p.improve!==false);
}
const PR_PROTECT={
  it:['Le tue informazioni viaggiano sempre su connessione cifrata (HTTPS) e sono conservate su server sicuri (Supabase).','L\'accesso è protetto dalla tua password o dal login con Google: solo tu entri nel tuo account.','Non vendiamo né cediamo i tuoi dati a terze parti.','Raccogliamo solo ciò che serve a far funzionare l\'app e puoi cancellare il tuo account quando vuoi.'],
  en:['Your information always travels over an encrypted connection (HTTPS) and is stored on secure servers (Supabase).','Access is protected by your password or Google sign-in: only you can enter your account.','We never sell or share your data with third parties.','We only collect what\'s needed to run the app, and you can delete your account anytime.'],
  fr:['Vos informations circulent toujours via une connexion chiffrée (HTTPS) et sont stockées sur des serveurs sécurisés (Supabase).','L\'accès est protégé par votre mot de passe ou la connexion Google : vous seul accédez à votre compte.','Nous ne vendons ni ne partageons vos données avec des tiers.','Nous ne collectons que le nécessaire, et vous pouvez supprimer votre compte à tout moment.'],
  es:['Tu información viaja siempre por una conexión cifrada (HTTPS) y se guarda en servidores seguros (Supabase).','El acceso está protegido por tu contraseña o el inicio con Google: solo tú entras en tu cuenta.','Nunca vendemos ni compartimos tus datos con terceros.','Solo recogemos lo necesario para que la app funcione, y puedes eliminar tu cuenta cuando quieras.']
};
const PR_USE={
  it:['Usiamo i tuoi dati solo per farti funzionare l\'app: la tua giornata, le task, i progetti, le connessioni e i messaggi.','Il tuo profilo (nome, username, bio) è visibile alle persone con cui ti colleghi.','Non usiamo i tuoi dati per pubblicità e non li cediamo a nessuno.','Workie è in beta: alcune informazioni anonime possono aiutarci a migliorare l\'app, senza identificarti.'],
  en:['We use your data only to run the app for you: your day, tasks, projects, connections and messages.','Your profile (name, username, bio) is visible to the people you connect with.','We don\'t use your data for advertising and never hand it to anyone.','Workie is in beta: some anonymous info may help us improve the app, without identifying you.'],
  fr:['Nous utilisons vos données uniquement pour faire fonctionner l\'app : votre journée, vos tâches, vos projets, vos connexions et messages.','Votre profil (nom, nom d\'utilisateur, bio) est visible par les personnes avec qui vous vous connectez.','Nous n\'utilisons pas vos données à des fins publicitaires et ne les cédons à personne.','Workie est en bêta : certaines infos anonymes peuvent nous aider à améliorer l\'app, sans vous identifier.'],
  es:['Usamos tus datos solo para que la app funcione: tu día, tareas, proyectos, conexiones y mensajes.','Tu perfil (nombre, usuario, bio) es visible para las personas con las que te conectas.','No usamos tus datos para publicidad ni los cedemos a nadie.','Workie está en beta: cierta información anónima puede ayudarnos a mejorar la app, sin identificarte.']
};
function stPrivacyDocHTML(which){
  const title=which==='protect'?tr('pr_protect'):tr('pr_use');
  const data=which==='protect'?PR_PROTECT:PR_USE;const pts=data[LANG]||data.en;
  return '<button class="stm-back" data-stback="privacy">'+SVG.back+'<span>'+tr('back')+'</span></button>'
    +'<div class="stm-sec-t">'+title+'</div>'
    +'<div class="stm-doc"><ul>'+pts.map(p=>'<li>'+p+'</li>').join('')+'</ul></div>';
}
function stMailHTML(){
  const accts=(typeof ibAccounts==='function')?ibAccounts():[];
  const rows=accts.length?accts.map(a=>'<div class="stm-acct"><span class="stm-acct-ic">'+ibProvBrand(a.id)+'</span><div class="stm-acct-tx"><b>'+bdEsc(a.email||a.name)+'</b><span>'+bdEsc(a.name)+'</span></div><button class="stm-acct-x" data-ibdisc="'+a.id+'">'+tr('ib_disconnect')+'</button></div>').join(''):'<div class="stm-para">'+tr('ib_no_accounts')+'</div>';
  const avail=IB_PROVIDERS.filter(p=>!accts.some(a=>a.id===p.id));
  const labelMap={gmail:'Google',outlook:'Outlook'};
  const add=avail.length?'<div class="stm-subh">'+tr('ib_add_mailbox')+'</div><div class="stm-provs">'+avail.map(p=>'<button type="button" class="ib-cs-prov" data-ibprov="'+p.id+'"><span class="ib-cs-prov-ic">'+ibProvBrand(p.id)+'</span><span>'+tr('ib_cont').replace('%s',labelMap[p.id]||p.name)+'</span></button>').join('')+'</div>':'';
  return '<div class="stm-sec-t">'+tr('set_mailboxes')+'</div>'
    +'<div class="stm-para">'+tr('ib_mail_sub')+'</div>'
    +'<div class="stm-acct-list">'+rows+'</div>'+add;
}
function stBillingHTML(){
  return '<div class="stm-sec-t">'+tr('stm_billing')+'</div>'
    +'<div class="stm-beta"><div class="stm-beta-badge">BETA</div><div class="stm-beta-t">'+tr('bill_beta_t')+'</div><div class="stm-beta-s">'+tr('bill_beta_s')+'</div></div>';
}
function renderStThemes(){
  const g=document.getElementById('stThemeGrid');if(!g)return;
  g.innerHTML=THEME_DEFS.map(t=>{const soon=!!THEME_SOON[t.k];const bg=t.k==='custom'?customCfg.bg:t.bg,card=t.k==='custom'?customCfg.panel:t.card,ac=t.k==='custom'?customCfg.accent:t.accent,side=t.k==='custom'?customCfg.panel:t.side;const nm=tr('theme_'+t.k)||t.name;const active=!soon&&curTheme===t.k;return '<div class="stm-theme'+(active?' on':'')+(soon?' soon':'')+'" data-sttheme="'+t.k+'">'+themePrev(bg,card,side,ac)+'<div class="stm-theme-n">'+nm+(soon?' · '+tr('coming_soon'):'')+'</div></div>';}).join('');
}
let stcNewColor=TCOLORS[0];
function stCategorieHTML(){
  const gs=(typeof CATEGORIES!=='undefined')?CATEGORIES:[];
  const xic='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  const rows=gs.length?gs.map(g=>{const n=(typeof TASKS!=='undefined')?TASKS.filter(t=>t.catId===g.id&&!t.done).length:0;
    return `<div class="stc-row" data-catid="${g.id}"><button class="stc-dot" data-stcolor="${g.id}" style="background:${g.color}" title="Cambia colore"></button><input class="stc-name" data-stgname="${g.id}" value="${bdEsc(g.name)}"><span class="stc-n">${n}</span><button class="stc-del" data-stgdel="${g.id}" title="${tr('cat_delete')}">${xic}</button></div>`;}).join(''):`<div class="stm-para">${tr('cat_empty')}</div>`;
  const sw=TCOLORS.map(c=>`<button class="stc-sw${c===stcNewColor?' on':''}" data-stnewcolor="${c}" style="background:${c}"></button>`).join('');
  return `<div class="stm-sec-t">${tr('stm_categories')}</div>`
    +`<div class="stm-para">${tr('cat_hint')}</div>`
    +`<div class="stc-list">${rows}</div>`
    +`<div class="stc-add"><span class="stc-newdot" id="stcNewDot" style="background:${stcNewColor}"></span><input class="stc-name stc-newname" id="stcNewName" placeholder="${tr('cat_new_ph')}"><button class="btn-primary-sm" id="stcAdd">${tr('gm_add')}</button></div>`
    +`<div class="stc-swatches" id="stcSwatches">${sw}</div>`;
}
function stcSave(){if(typeof saveCategories==='function')saveCategories();try{renderTkFilters();}catch(e){}try{renderTasks();}catch(e){}}
{const c=document.getElementById('stmContent');
 if(c){c.addEventListener('click',e=>{
   if(stTab==='caselle'){
     const prov=e.target.closest('[data-ibprov]');if(prov){ibConnectProvider(prov.dataset.ibprov);renderStTab('caselle');try{if(document.querySelector('.page[data-page="inbox"].active'))renderInboxPage();}catch(_){}return;}
     const dc=e.target.closest('[data-ibdisc]');if(dc){ibDisconnectProvider(dc.dataset.ibdisc);renderStTab('caselle');try{if(document.querySelector('.page[data-page="inbox"].active'))renderInboxPage();}catch(_){}return;}
     return;
   }
   if(stTab!=='categorie')return;
   const del=e.target.closest('[data-stgdel]');if(del){const id=+del.dataset.stgdel;askConfirm(tr('cat_confirm_del'),()=>{CATEGORIES=CATEGORIES.filter(g=>g.id!==id);TASKS.forEach(t=>{if(t.catId===id)delete t.catId;});if(typeof saveTasks==='function')saveTasks();stcSave();renderStTab('categorie');});return;}
   const dot=e.target.closest('[data-stcolor]');if(dot){const id=+dot.dataset.stcolor;const g=CATEGORIES.find(x=>x.id===id);if(g){const i=TCOLORS.indexOf(g.color);g.color=TCOLORS[(i+1)%TCOLORS.length];stcSave();renderStTab('categorie');}return;}
   const sw=e.target.closest('[data-stnewcolor]');if(sw){stcNewColor=sw.dataset.stnewcolor;const d=document.getElementById('stcNewDot');if(d)d.style.background=stcNewColor;document.querySelectorAll('#stcSwatches .stc-sw').forEach(x=>x.classList.toggle('on',x.dataset.stnewcolor===stcNewColor));return;}
   if(e.target.closest('#stcAdd')){const inp=document.getElementById('stcNewName');const nm=(inp&&inp.value||'').trim();if(!nm)return;const cid=(typeof CATID!=='undefined')?CATID++:(CATEGORIES.reduce((m,g)=>Math.max(m,g.id||0),0)+1);CATEGORIES.push({id:cid,name:nm,color:stcNewColor});stcSave();renderStTab('categorie');const ni=document.getElementById('stcNewName');if(ni)ni.value='';return;}
 });
 c.addEventListener('input',e=>{if(stTab!=='categorie')return;const nm=e.target.closest('[data-stgname]');if(nm){const id=+nm.dataset.stgname;const g=CATEGORIES.find(x=>x.id===id);if(g){g.name=nm.value;stcSave();}}});
 c.addEventListener('keydown',e=>{if(stTab==='categorie'&&e.target.id==='stcNewName'&&e.key==='Enter'){e.preventDefault();const a=document.getElementById('stcAdd');if(a)a.click();}});
}}
function renderStTab(tab){
  stTab=tab||stTab||'generale';
  const c=document.getElementById('stmContent');if(!c)return;
  if(stTab==='generale'){c.innerHTML=stGeneraleHTML();renderStThemes();if(typeof pushSyncToggle==='function')pushSyncToggle();}
  else if(stTab==='categorie'){c.innerHTML=stCategorieHTML();}
  else if(stTab==='caselle'){c.innerHTML=stMailHTML();}
  else if(stTab==='profilo'){c.innerHTML=stProfileHTML();}
  else if(stTab==='account'){c.innerHTML=stAccountHTML();}
  else if(stTab==='privacy'){c.innerHTML=stPrivacyHTML();}
  else if(stTab==='pr_protect'){c.innerHTML=stPrivacyDocHTML('protect');}
  else if(stTab==='pr_use'){c.innerHTML=stPrivacyDocHTML('use');}
  else if(stTab==='fatturazione'){c.innerHTML=stBillingHTML();}
  else{c.innerHTML='<div class="stm-soon-box"><div class="stm-soon-ic">'+(SVG.set||'')+'</div><div class="stm-soon-t">'+tr('coming_soon')+'</div><div class="stm-soon-s">'+tr('stm_soon_sub')+'</div></div>';}
  renderStNav();
}
function stCurPageLabel(){const p=document.querySelector('.page.active');const pg=p?p.dataset.page:'';
  const map={home:'nav_overview',tasks:'nav_tasks',desktop:'nav_routine',projects:'nav_projects',dayplan:'nav_dayplan',taskdetail:'nav_tasks',planday:'ov_plan',projectdetail:'nav_projects'};
  return map[pg]?tr(map[pg]):tr('nav_overview');}
function openSettings(tab,backLbl){const m=document.getElementById('settingsModal');if(!m)return;m.classList.add('open');document.documentElement.classList.add('settings-open');stSnap();stHideBar();renderStNav();renderStTab(tab||stTab||'generale');const win=m.querySelector('.stm-window');if(win)win.classList.remove('stm-detail');const bl=document.getElementById('stmBackLbl');if(bl)bl.textContent=backLbl||tr('stm_back_app');}
function stmMobile(){return window.matchMedia('(max-width:640px)').matches;}
function closeSettings(){try{stAutoSaveFlush();}catch(_){}const m=document.getElementById('settingsModal');if(m)m.classList.remove('open');document.documentElement.classList.remove('settings-open');stHideBar();}
let stSnapshot=null,stDirty=false;
function stSnap(){try{stSnapshot=JSON.stringify(USER);}catch(e){stSnapshot=null;}}
function stMarkDirty(){if(!stDirty){stDirty=true;const b=document.getElementById('stmBar');if(b)b.classList.add('show');}}
function stHideBar(){stDirty=false;const b=document.getElementById('stmBar');if(b)b.classList.remove('show');}
function stSaveChanges(){stSnap();stHideBar();
  if(sb){sbSaveProfile(userToSbProfile()).then(r=>{if(r&&r.error){if(typeof showToast==='function')showToast(/duplicate|unique|already/i.test(r.error)?tr('username_taken'):r.error);}else if(typeof showToast==='function')showToast(tr('stm_saved_ok'));});}
  else if(typeof showToast==='function')showToast(tr('stm_saved_ok'));
}
// Salvataggio automatico del profilo su Supabase (debounce): così nome/cognome ecc. NON si perdono
// al riavvio anche senza premere "Salva" (al boot authInit ricarica il profilo dal server).
let _stAutoTimer=null;
function stAutoSave(){ if(!sb)return; clearTimeout(_stAutoTimer); _stAutoTimer=setTimeout(function(){ try{sbSaveProfile(userToSbProfile());}catch(_){} },800); }
function stAutoSaveFlush(){ if(!sb)return; if(_stAutoTimer){clearTimeout(_stAutoTimer);_stAutoTimer=null;} try{sbSaveProfile(userToSbProfile());}catch(_){} }
function stCancelChanges(){if(stSnapshot){try{const s=JSON.parse(stSnapshot);Object.keys(USER).forEach(k=>{delete USER[k];});Object.assign(USER,s);saveUser();persistUsernameToAccount();renderUser();}catch(e){}}stHideBar();renderStTab(stTab);}
function updateStmAv(){const a=document.getElementById('stmAv');if(a)a.innerHTML=avatarInner();}
function stUsernameInput(t){
  const u=normUsername(t.value);if(t.value!==u)t.value=u;
  const msg=document.getElementById('stUserMsg');
  if(u&&u.length<3){if(msg){msg.textContent=tr('username_short');msg.className='stm-msg err';}return;}
  if(usernameTaken(u,USER.email)){if(msg){msg.textContent=tr('username_taken');msg.className='stm-msg err';}return;}
  if(msg){msg.textContent=u?tr('username_ok'):'';msg.className='stm-msg ok';}
  USER.username=u;saveUser();persistUsernameToAccount();renderUser();
}
function stChangeEmail(){
  const msg=document.getElementById('stEmailMsg');
  const nv=(document.getElementById('stNewEmail').value||'').trim().toLowerCase();
  if(!validEmail(nv)){msg.textContent=tr('err_email');msg.className='stm-msg err';return;}
  const oldKey=(USER.email||'').trim().toLowerCase();
  if(nv===oldKey){msg.textContent=tr('stm_same_email');msg.className='stm-msg err';return;}
  if(findAccount(nv)){msg.textContent=tr('err_email_taken');msg.className='stm-msg err';return;}
  const m=loadAccounts(),acc=m[oldKey];if(acc){acc.email=nv;delete m[oldKey];m[nv]=acc;saveAccounts(m);}
  const sufOld='::'+oldKey,sufNew='::'+nv;
  Object.keys(localStorage).forEach(k=>{if(k.endsWith(sufOld)){const base=k.slice(0,-sufOld.length);if(localStorage.getItem(base+sufNew)==null)localStorage.setItem(base+sufNew,localStorage.getItem(k));localStorage.removeItem(k);}});
  localStorage.setItem('workie_session',nv);
  msg.textContent=tr('stm_email_done');msg.className='stm-msg ok';
  setTimeout(()=>location.reload(),800);
}
function stChangePw(){
  const msg=document.getElementById('stPwMsg');
  const cur=document.getElementById('stPwCur').value,nw=document.getElementById('stPwNew').value,cf=document.getElementById('stPwConf').value;
  const acc=findAccount(USER.email);
  if(acc&&acc.pw!==cur){msg.textContent=tr('stm_wrong_cur');msg.className='stm-msg err';return;}
  if(nw.length<6){msg.textContent=tr('err_pw_short');msg.className='stm-msg err';return;}
  if(nw!==cf){msg.textContent=tr('err_pw_match');msg.className='stm-msg err';return;}
  if(acc){acc.pw=nw;const m=loadAccounts();m[(USER.email||'').toLowerCase()]=acc;saveAccounts(m);}
  ['stPwCur','stPwNew','stPwConf'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  msg.textContent=tr('stm_pw_done');msg.className='stm-msg ok';
}
document.getElementById('stmClose').addEventListener('click',closeSettings);
{const br=document.getElementById('stmBackRow');if(br)br.addEventListener('click',closeSettings);}
document.getElementById('stmLogout').addEventListener('click',()=>{closeSettings();if(typeof doLogout==='function')doLogout();});
document.getElementById('stmSave').addEventListener('click',stSaveChanges);
document.getElementById('stmCancel').addEventListener('click',stCancelChanges);
document.getElementById('settingsModal').addEventListener('click',e=>{if(e.target.id==='settingsModal')closeSettings();});

// ===== Command palette (⌘K): barra centrale con sfondo sfocato, cerca task e pagine =====
function cmdkIsOpen(){const o=document.getElementById('cmdkOverlay');return !!(o&&o.classList.contains('open'));}
function cmdkOpen(){const o=document.getElementById('cmdkOverlay');if(!o)return;o.classList.add('open');const i=document.getElementById('cmdkInput');if(i)i.value='';cmdkSel=0;cmdkRender('');if(i)setTimeout(()=>{try{i.focus();}catch(_){}},30);}
function cmdkClose(){const o=document.getElementById('cmdkOverlay');if(o)o.classList.remove('open');}
function cmdkToggle(){cmdkIsOpen()?cmdkClose():cmdkOpen();}
const CMDK_IC={page:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/></svg>',task:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>'};
let cmdkItems=[],cmdkSel=0;
function cmdkBuild(q){
  q=(q||'').trim().toLowerCase();const items=[];
  const pages=[['home',tr('nav_home')],['tasks',tr('nav_tasks')],['desktop',tr('nav_routine')],['inbox',tr('nav_inbox')],['plugin',tr('nav_plugin')]];
  pages.forEach(p=>{if(!q||(p[1]||'').toLowerCase().includes(q))items.push({type:'page',page:p[0],label:p[1]||p[0]});});
  if(typeof TASKS!=='undefined'&&Array.isArray(TASKS)){TASKS.filter(t=>t&&(!q||taskTitle(t).toLowerCase().includes(q))).slice(0,30).forEach(t=>{items.push({type:'task',id:t.id,label:taskTitle(t),done:!!t.done});});}
  return items;
}
function cmdkRender(q){
  const box=document.getElementById('cmdkResults');if(!box)return;
  cmdkItems=cmdkBuild(q);if(cmdkSel>=cmdkItems.length)cmdkSel=0;
  if(!cmdkItems.length){box.innerHTML='<div class="cmdk-empty">'+bdEsc(tr('cmdk_empty'))+'</div>';return;}
  let html='',last='';
  cmdkItems.forEach((it,i)=>{
    if(it.type!==last){html+='<div class="cmdk-sec">'+bdEsc(it.type==='page'?tr('cmdk_pages'):tr('cmdk_tasks'))+'</div>';last=it.type;}
    html+='<div class="cmdk-item'+(i===cmdkSel?' sel':'')+(it.done?' done':'')+'" data-cmdk="'+i+'"><span class="cmdk-item-ic">'+CMDK_IC[it.type]+'</span><span class="cmdk-item-lbl">'+bdEsc(it.label)+'</span>'+(it.done?'<span class="cmdk-item-sub">'+bdEsc(tr('td_done'))+'</span>':'')+'</div>';
  });
  box.innerHTML=html;
}
function cmdkExec(it){if(!it)return;cmdkClose();if(it.type==='page'){if(typeof go==='function')go(it.page);}else if(it.type==='task'){if(typeof openTaskPage==='function')openTaskPage(it.id);}}
function cmdkMove(d){if(!cmdkItems.length)return;cmdkSel=(cmdkSel+d+cmdkItems.length)%cmdkItems.length;const box=document.getElementById('cmdkResults');if(!box)return;box.querySelectorAll('.cmdk-item').forEach((el,i)=>el.classList.toggle('sel',i===cmdkSel));const s=box.querySelector('.cmdk-item.sel');if(s)s.scrollIntoView({block:'nearest'});}
{const ci=document.getElementById('cmdkInput');if(ci)ci.addEventListener('input',e=>{cmdkSel=0;cmdkRender(e.target.value);});}
{const cr=document.getElementById('cmdkResults');if(cr)cr.addEventListener('mousedown',e=>{const it=e.target.closest('[data-cmdk]');if(it){e.preventDefault();cmdkExec(cmdkItems[+it.dataset.cmdk]);}});}
{const co=document.getElementById('cmdkOverlay');if(co)co.addEventListener('mousedown',e=>{if(e.target===co)cmdkClose();});}
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();cmdkToggle();return;}
  if(!cmdkIsOpen())return;
  if(e.key==='Escape'){e.preventDefault();cmdkClose();}
  else if(e.key==='ArrowDown'){e.preventDefault();cmdkMove(1);}
  else if(e.key==='ArrowUp'){e.preventDefault();cmdkMove(-1);}
  else if(e.key==='Enter'){e.preventDefault();cmdkExec(cmdkItems[cmdkSel]);}
},true);
function cmdkIntercept(el){if(!el)return;el.addEventListener('mousedown',e=>{e.preventDefault();cmdkOpen();});el.addEventListener('focus',()=>{try{el.blur();}catch(_){}cmdkOpen();});}
cmdkIntercept(document.getElementById('sideSearchInput'));
cmdkIntercept(document.getElementById('shSearchInput'));
{const sb=document.getElementById('sideSearchBtn');if(sb)sb.addEventListener('mousedown',e=>{e.preventDefault();cmdkOpen();});}

document.getElementById('stmSearch').addEventListener('input',renderStNav);
document.getElementById('stmNav').addEventListener('click',e=>{const it=e.target.closest('[data-sttab]');if(it){renderStTab(it.dataset.sttab);if(stmMobile()){const win=document.querySelector('#settingsModal .stm-window');if(win)win.classList.add('stm-detail');}}});
{const bk=document.getElementById('stmBackM');if(bk)bk.addEventListener('click',()=>{const win=document.querySelector('#settingsModal .stm-window');if(win&&win.classList.contains('stm-detail')){win.classList.remove('stm-detail');}else{closeSettings();}});}
document.getElementById('stmContent').addEventListener('input',e=>{
  const t=e.target;
  if(t.id==='stName'){USER.name=t.value;saveUser();renderUser();updateStmAv();stMarkDirty();stAutoSave();}
  else if(t.id==='stSurname'){USER.surname=t.value;saveUser();renderUser();stMarkDirty();stAutoSave();}
  else if(t.id==='stBio'){USER.bio=t.value;saveUser();stMarkDirty();stAutoSave();}
  else if(t.id==='stWebsite'){USER.website=t.value;saveUser();stMarkDirty();stAutoSave();}
  else if(t.dataset&&t.dataset.stsoc){USER.socials=USER.socials||{};USER.socials[t.dataset.stsoc]=t.value;saveUser();stMarkDirty();stAutoSave();}
  else if(t.id==='stUsername'){stUsernameInput(t);stMarkDirty();stAutoSave();}
});
document.getElementById('stmContent').addEventListener('change',e=>{if(e.target.id==='stWork'){USER.workType=e.target.value;saveUser();stMarkDirty();stAutoSave();}});
document.getElementById('stmContent').addEventListener('click',e=>{
  if(e.target.closest('#stmAvChange')){profPhotoFile.click();return;}
  if(e.target.closest('#stmAvRemove')){USER.photo='';saveUser();renderUser();renderStTab('profilo');return;}
  const lg=e.target.closest('[data-stlang]');if(lg){setLang(lg.dataset.stlang);renderStTab(stTab);return;}
  const th=e.target.closest('[data-sttheme]');if(th){setTheme(th.dataset.sttheme);return;}
  if(e.target.closest('#stEmailSave')){stChangeEmail();return;}
  if(e.target.closest('#stPwSave')){stChangePw();return;}
  const tg=e.target.closest('[data-prtoggle]');if(tg){const on=!tg.classList.contains('on');tg.classList.toggle('on',on);tg.setAttribute('aria-checked',on);USER.privacy=USER.privacy||{};USER.privacy[tg.dataset.prtoggle]=on;saveUser();stMarkDirty();return;}
  const sg=e.target.closest('[data-sttoggle]');if(sg){const on=!sg.classList.contains('on');sg.classList.toggle('on',on);sg.setAttribute('aria-checked',on);USER.share=USER.share||{};USER.share[sg.dataset.sttoggle]=on;saveUser();stMarkDirty();return;}
  const hg=e.target.closest('[data-sthome]');if(hg){const on=!hg.classList.contains('on');hg.classList.toggle('on',on);hg.setAttribute('aria-checked',on);if(hg.dataset.sthome==='daily')USER.showDaily=on;else USER.showTasks=on;saveUser();applyHomePrefs();return;}
  const pu=e.target.closest('[data-stpush]');if(pu){const turnOn=!pu.classList.contains('on');
    if(turnOn){pushEnable().then(r=>{pushSyncToggle();if(r.ok){toast(tr('stm_notif_on'));}else{const m={denied:'stm_notif_denied',ios_install:'stm_notif_ios',unsupported:'stm_notif_unsupported',error:'stm_notif_err'}[r.reason]||'stm_notif_err';toast(tr(m));}});}
    else{pushDisable().then(()=>{pushSyncToggle();toast(tr('stm_notif_off'));});}
    return;}
  const pl=e.target.closest('[data-prlink]');if(pl){renderStTab(pl.dataset.prlink==='protect'?'pr_protect':'pr_use');return;}
  const bk=e.target.closest('[data-stback]');if(bk){renderStTab(bk.dataset.stback);return;}
  if(e.target.closest('#stDeleteAcc')){stDeleteAccount();return;}
});
function stDeleteAccount(){
  const doDelete=async()=>{
    const uid=(localStorage.getItem('workie_session')||'').trim();
    try{if(sb&&uid)await sb.from('profiles').delete().eq('id',uid);}catch(e){}
    try{const suf='::'+uid.toLowerCase();Object.keys(localStorage).forEach(k=>{if(k.toLowerCase().endsWith(suf))localStorage.removeItem(k);});}catch(e){}
    try{if(typeof loadAccounts==='function'){const m=loadAccounts();const key=(USER.email||'').toLowerCase();if(m[key]){delete m[key];saveAccounts(m);}}}catch(e){}
    try{if(sb)await sb.auth.signOut();}catch(e){}
    localStorage.removeItem('workie_session');
    location.reload();
  };
  if(typeof askConfirm==='function')askConfirm(tr('stm_del_confirm'),doDelete);
  else if(window.confirm(tr('stm_del_confirm')))doDelete();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('settingsModal').classList.contains('open'))closeSettings();});

// ================= PROFILO PUBBLICO =================
const SOCIALS=[
  {k:'linkedin',label:'LinkedIn',icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4V8z"/></svg>'},
  {k:'instagram',label:'Instagram',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>'},
  {k:'x',label:'X',icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8-9.2L1 2h7.1l4.9 6.5L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z"/></svg>'},
  {k:'facebook',label:'Facebook',icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.43 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>'},
  {k:'tiktok',label:'TikTok',icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.35 2.1 1.7 3.7 3.5 4.05V9.6c-1.3 0-2.55-.4-3.5-1.05v6.35a5.5 5.5 0 1 1-5.5-5.5c.32 0 .63.03.93.08v2.6a2.9 2.9 0 1 0 2.07 2.77V3h2.5z"/></svg>'}
];
const PF_MAIL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
const PF_LINK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>';
let pfMode='me',pfVisitor=null;
// --- Utenti Workie reali (dagli account registrati) ---
function workieProfileFor(email){let prof={};try{prof=JSON.parse(localStorage.getItem('workie_user::'+email))||{};}catch(e){}return prof;}
function workieUsers(){
  const m=loadAccounts(),me=(USER.email||'').toLowerCase();
  return Object.keys(m).filter(k=>k!==me).map(k=>{const a=m[k],p=workieProfileFor(k);
    const nm=(((p.name||a.name||'')+' '+(p.surname||a.surname||'')).trim())||a.name||'Utente';
    return {email:k,name:nm,username:(a.username||p.username||''),handle:(a.username||p.username)?('@'+(a.username||p.username)):'',bio:p.bio||'',photo:p.photo||'',socials:(p.socials&&typeof p.socials==='object')?p.socials:{},website:p.website||'',share:(p.share&&typeof p.share==='object')?p.share:{},joinTs:p.joinTs||a.created||0};});
}
function workieUserByEmail(email){return workieUsers().find(u=>u.email===(email||'').toLowerCase())||null;}
function ensureDemoUser(){try{
  const m=loadAccounts();
  if(!m['giulia@workie.app']){
    m['giulia@workie.app']={email:'giulia@workie.app',pw:'workie123',name:'Giulia',surname:'Bianchi',username:'giuliab',profession:'other',onboarded:true,created:nowTs()};
    saveAccounts(m);
    if(localStorage.getItem('workie_user::giulia@workie.app')==null)localStorage.setItem('workie_user::giulia@workie.app',JSON.stringify({name:'Giulia',surname:'Bianchi',username:'giuliab',bio:'Product Designer @ Studio Creativo',website:'giuliabianchi.design',socials:{linkedin:'giulia-bianchi',instagram:'giulia.bianchi'},share:{email:false,website:true},joinTs:nowTs()}));
  }
}catch(e){}}
ensureDemoUser();
function socialUrl(k,v){v=(v||'').trim();if(!v)return '#';if(/^https?:\/\//i.test(v))return v;const h=v.replace(/^@/,'');const base={linkedin:'https://www.linkedin.com/in/',instagram:'https://instagram.com/',x:'https://x.com/',facebook:'https://facebook.com/',tiktok:'https://www.tiktok.com/@',web:'https://'};return (base[k]||'https://')+h;}
function joinLabel(ts){try{const d=new Date(ts||nowTs());const s=d.toLocaleDateString(LOCALES[LANG]||'it-IT',{month:'long',year:'numeric'});return tr('pf_joined')+' '+s;}catch(e){return '';}}
function openMyProfile(){pfMode='me';pfVisitor=null;go('profile');}
function openVisitorProfile(v){pfMode='visitor';pfVisitor=v;go('profile');}
function renderProfile(){
  const body=document.getElementById('profileBody'),tb=document.getElementById('pfTopBtns');
  if(!body)return;
  const visitor=pfMode==='visitor'&&pfVisitor;
  const name=visitor?(pfVisitor.name||'Utente'):fullName();
  const role=visitor?(pfVisitor.bio||pfVisitor.handle||''):(USER.bio||'');
  const photo=visitor?(pfVisitor.photo||''):(USER.photo||'');
  const jTs=visitor?pfVisitor.joinTs:USER.joinTs;
  const av=photo?'<img src="'+photo+'" alt="">':(((name||'U').trim().charAt(0))||'U').toUpperCase();
  let socHTML='';
  if(visitor){const ps=pfVisitor.socials||{};socHTML=SOCIALS.filter(s=>(ps[s.k]||'').trim()).map(s=>'<a class="pf-soc filled" href="'+socialUrl(s.k,ps[s.k])+'" target="_blank" rel="noopener" title="'+bdEsc(ps[s.k])+'">'+s.icon+'</a>').join('');}
  else socHTML=SOCIALS.map(s=>{const val=(USER.socials[s.k]||'').trim();return '<span class="pf-soc'+(val?' filled':' empty')+'" data-pfsoc="'+s.k+'" title="'+bdEsc(val||s.label)+'">'+s.icon+'</span>';}).join('');
  let contacts='';
  if(visitor){const sh=pfVisitor.share||{};
    if(sh.email&&pfVisitor.email&&String(pfVisitor.email).includes('@'))contacts+='<div class="pf-contact"><span class="pf-cic">'+PF_MAIL+'</span><span>'+bdEsc(pfVisitor.email)+'</span></div>';
    if(sh.website&&(pfVisitor.website||'').trim())contacts+='<div class="pf-contact"><span class="pf-cic">'+PF_LINK+'</span><a href="'+socialUrl('web',pfVisitor.website)+'" target="_blank" rel="noopener">'+bdEsc(pfVisitor.website)+'</a></div>';
  }else{
    contacts+='<div class="pf-contact"><span class="pf-cic">'+PF_MAIL+'</span><span>'+bdEsc(USER.email||'')+'</span></div>';
    if((USER.website||'').trim())contacts+='<div class="pf-contact"><span class="pf-cic">'+PF_LINK+'</span><a href="'+socialUrl('web',USER.website)+'" target="_blank" rel="noopener">'+bdEsc(USER.website)+'</a></div>';
  }
  let mutual='';
  if(visitor){const others=SOCIAL_CONN.filter(c=>c.uid!==pfVisitor.uid&&c.status==='accepted').slice(0,3);
    if(others.length)mutual='<div class="pf-mutual"><span>'+tr('pf_mutual').replace('%n',others.length)+'</span><div class="pf-mstack">'+others.map(c=>'<span class="pf-mav" style="background:'+socColor(c.uid)+'">'+socInitials(c.name)+'</span>').join('')+'</div></div>';}
  let action='';
  if(visitor){const uid=pfVisitor.uid;const conn=uid?SOCIAL_CONN.find(c=>c.uid===uid):null;const inv=uid?SOCIAL_INVITES.find(c=>c.uid===uid):null;
    if(conn&&conn.status==='accepted')action='<button class="btn-primary-sm pf-act" id="pfMessage">'+tr('pf_message')+'</button><button class="pf-callbtn" id="pfCall" title="'+tr('soc_call_audio')+'">'+SVG.phone+'</button>';
    else if(conn&&conn.status==='pending')action='<button class="btn-primary-sm pf-act pf-pending" disabled>'+tr('soc_req_pending')+'</button>';
    else action='<button class="btn-primary-sm pf-act" id="pfConnect">'+tr(inv?'soc_accept':'pf_connect')+'</button>';}
  body.innerHTML='<div class="pf-card">'
    +'<div class="pf-banner"></div>'
    +'<div class="pf-head">'
      +'<div class="pf-av'+(visitor?'':' editable')+'"'+(visitor?'':' data-pfav="1"')+'>'+av+(visitor?'':'<span class="pf-av-cam">'+(SVG.cam||'')+'</span>')+'</div>'
      +'<div class="pf-info">'
        +'<div class="pf-nameline"><div class="pf-name">'+bdEsc(name)+'</div>'+action+'</div>'
        +(role?'<div class="pf-role">'+bdEsc(role)+'</div>':(visitor?'':'<div class="pf-role pf-role-empty">'+tr('pf_add_bio')+'</div>'))
        +(socHTML?'<div class="pf-socials">'+socHTML+'</div>':'')
        +mutual
      +'</div>'
    +'</div>'
    +(contacts?'<div class="pf-contacts"><div class="pf-contacts-h">'+tr('pf_contacts')+'</div>'+contacts+'</div>':'')
    +(visitor?'':'<button class="pf-logout" id="pfLogout">'+tr('logout')+'</button>')
    +(jTs?'<div class="pf-join">'+joinLabel(jTs)+'</div>':'')
    +'</div>';
  if(tb)tb.innerHTML=visitor?'<button class="btn-primary-sm" id="pfBack">'+tr('back')+'</button>':'<button class="btn-primary-sm" id="pfEdit">'+tr('pf_edit')+'</button>';
}
async function pfConnect(){if(!pfVisitor)return;const uid=pfVisitor.uid;
  if(sb&&uid){const res=await sbConnect(uid);await socRefresh(false);if(typeof showToast==='function')showToast(res==='accepted'?tr('soc_connected'):tr('soc_req_sent'));renderProfile();return;}
  if(typeof showToast==='function')showToast(tr('soc_req_sent'));
}
function pfCallGo(){if(!pfVisitor)return;const c=SOCIAL_CONN.find(x=>x.uid===pfVisitor.uid&&x.status==='accepted');if(c){go('social');socOpenConn(c.uid);setTimeout(()=>{if(typeof socStartCall==='function')socStartCall(false);},260);}}
function pfMessageGo(){if(!pfVisitor)return;const c=SOCIAL_CONN.find(x=>x.uid===pfVisitor.uid&&x.status==='accepted');if(c){go('social');socOpenConn(c.uid);}}
/* la user-pill ora apre il menu utente (vedi sopra), non più il profilo */
document.getElementById('profileBody').addEventListener('click',e=>{
  if(e.target.closest('[data-pfav]')){if(typeof profPhotoFile!=='undefined'&&profPhotoFile)profPhotoFile.click();return;}
  if(e.target.closest('[data-pfsoc]')){if(pfMode==='me')openSettings('generale');return;}
  if(e.target.closest('#pfConnect')){pfConnect();return;}
  if(e.target.closest('#pfMessage')){pfMessageGo();return;}
  if(e.target.closest('#pfCall')){pfCallGo();return;}
  if(e.target.closest('#pfLogout')){doLogout();return;}
});
document.getElementById('pfTopBtns').addEventListener('click',e=>{
  if(e.target.closest('#pfEdit')){openSettings('generale');return;}
  if(e.target.closest('#pfBack')){pfMode='me';pfVisitor=null;go('social');return;}
});
document.getElementById('cuName').addEventListener('keydown',e=>{if(e.key==='Enter')saveCurrentTheme();});
document.getElementById('cuImgBtn').addEventListener('click',()=>document.getElementById('cuImgFile').click());
document.getElementById('cuImgFile').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=ev=>{customCfg.bgImg=ev.target.result;curTheme='custom';curSavedId=null;saveTheme();applyTheme();};rd.readAsDataURL(f);e.target.value='';});
document.getElementById('cuImgClear').addEventListener('click',()=>{customCfg.bgImg='';curSavedId=null;saveTheme();applyTheme();});
applyLang();
applyTheme();
// ===== Notifiche push (Web Push PWA) =====
const VAPID_PUBLIC='BI9vpLoX9AMEa5C8aDjitHMv0lWp8PO3r7Fzn_9D7HFXrATElJ8KG-7pebTCjQvO-vKGkZkBTXeWIi6mpuk-glc';
function urlB64ToU8(b64){const pad='='.repeat((4-b64.length%4)%4);const s=(b64+pad).replace(/-/g,'+').replace(/_/g,'/');const raw=atob(s);const arr=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)arr[i]=raw.charCodeAt(i);return arr;}
function pushSupported(){return 'serviceWorker'in navigator&&'PushManager'in window&&'Notification'in window;}
function pushStandalone(){try{return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;}catch(e){return false;}}
function pushIsIOS(){return /iP(hone|ad|od)/.test(navigator.userAgent);}
async function pushGetSub(){try{const reg=await navigator.serviceWorker.ready;return await reg.pushManager.getSubscription();}catch(e){return null;}}
async function pushEnabled(){if(!pushSupported())return false;if(Notification.permission!=='granted')return false;return !!(await pushGetSub());}
async function pushSaveSub(sub){if(!sb||!sub)return;try{const me=await socMe();if(!me)return;const j=sub.toJSON();await sb.from('push_subs').upsert({user_id:me,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth},{onConflict:'endpoint'});}catch(e){console.warn('pushSaveSub',e);}}
async function pushDeleteSub(sub){if(!sb||!sub)return;try{await sb.from('push_subs').delete().eq('endpoint',sub.endpoint);}catch(e){}}
async function pushEnable(){
  if(!pushSupported())return{ok:false,reason:'unsupported'};
  if(pushIsIOS()&&!pushStandalone())return{ok:false,reason:'ios_install'};
  let perm=Notification.permission;
  if(perm==='default')perm=await Notification.requestPermission();
  if(perm!=='granted')return{ok:false,reason:'denied'};
  try{const reg=await navigator.serviceWorker.ready;let sub=await reg.pushManager.getSubscription();
    if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlB64ToU8(VAPID_PUBLIC)});
    await pushSaveSub(sub);return{ok:true};
  }catch(e){console.warn('pushEnable',e);return{ok:false,reason:'error'};}
}
async function pushDisable(){const sub=await pushGetSub();if(sub){await pushDeleteSub(sub);try{await sub.unsubscribe();}catch(e){}}return{ok:true};}
// invio notifica a un altro utente (via Netlify function)
async function pushSend(toUserId,payload){
  if(!toUserId||!sb)return;
  try{let token='';try{const s=await sb.auth.getSession();token=(s.data.session&&s.data.session.access_token)||'';}catch(e){}
    await fetch(FN_BASE+'/.netlify/functions/push',{method:'POST',headers:Object.assign({'Content-Type':'application/json'},token?{'Authorization':'Bearer '+token}:{}),body:JSON.stringify(Object.assign({toUserId:toUserId},payload))});
  }catch(e){}
}
// riallinea lo switch in Impostazioni allo stato reale + hint
async function pushSyncToggle(){
  const sw=document.querySelector('[data-stpush="push"]');if(!sw)return;
  const on=await pushEnabled();sw.classList.toggle('on',on);sw.setAttribute('aria-checked',on);
  const hint=document.getElementById('stmPushHint');
  if(hint){let msg='';if(!pushSupported())msg=tr('stm_notif_unsupported');else if(pushIsIOS()&&!pushStandalone())msg=tr('stm_notif_ios');else if(Notification.permission==='denied')msg=tr('stm_notif_blocked');hint.textContent=msg;hint.style.display=msg?'block':'none';}
}
// PWA: register service worker (installable, offline) + auto-update
if('serviceWorker' in navigator){
  let swRefreshing=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(swRefreshing)return;swRefreshing=true;location.reload();});
  window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').then(reg=>{reg.update&&reg.update();}).catch(()=>{});});
}
/* ===== Palla viola rimbalzante (stile DVD) ===== */
(function(){
  const ball=document.getElementById('glowBall');
  const app=document.querySelector('.app');
  if(!ball||!app)return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let cx=260,cy=220,vx=0.075,vy=0.057,last=null;
  function step(now){
    if(last==null)last=now;
    let dt=now-last;last=now;if(dt>50)dt=50;
    const w=app.clientWidth,h=app.clientHeight;
    cx+=vx*dt;cy+=vy*dt;
    if(cx<=0){cx=0;vx=Math.abs(vx);}else if(cx>=w){cx=w;vx=-Math.abs(vx);}
    if(cy<=0){cy=0;vy=Math.abs(vy);}else if(cy>=h){cy=h;vy=-Math.abs(vy);}
    ball.style.transform='translate('+(cx-ball.offsetWidth/2)+'px,'+(cy-ball.offsetHeight/2)+'px)';
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Desktop: il pannellino rapido (icona barra / ⌘J) manda qui le task approvate (array).
// Stessa logica di mtConfirm(): finiscono negli stessi dati, salvate e sincronizzate.
if(typeof window!=='undefined'&&window.workieDesktop&&typeof window.workieDesktop.onQuickCreateMany==='function'){
  window.workieDesktop.onQuickCreateMany(function(drafts){
    try{
      if(!Array.isArray(drafts)||!drafts.length)return;
      var pro=(typeof isPro==='function')?isPro():true;
      var cap=pro?Infinity:((typeof tasksLeftToday==='function')?tasksLeftToday():Infinity);
      if(cap<=0){ if(typeof openUpgrade==='function')openUpgrade('tasks'); return; }
      var added=0;
      drafts.forEach(function(d){
        var t=(d&&d.title?(''+d.title):'').trim(); if(!t)return; if(added>=cap)return;
        var task={id:++TID,title:t,scope:'personal',done:false};
        task.date=(Array.isArray(d.date)&&d.date.length===3)?d.date:realToday();
        if(d.time)task.time=d.time;
        TASKS.push(task); added++;
      });
      if(!added)return;
      if(typeof tasksTodayInc==='function')tasksTodayInc(added);
      saveTasks();
      try{if(typeof renderTasks==='function')renderTasks();}catch(e){}
      try{if(typeof renderHomeAlerts==='function')renderHomeAlerts();}catch(e){}
      try{if(typeof buildCalendar==='function')buildCalendar();}catch(e){}
      try{if(typeof renderSideTasks==='function')renderSideTasks();}catch(e){}
      if(typeof showToast==='function'&&typeof tr==='function')showToast(tr('mt_added').replace('%n',added));
      var capped=!pro&&drafts.filter(function(d){return d&&(''+(d.title||'')).trim();}).length>added;
      if(capped&&typeof openUpgrade==='function')setTimeout(function(){openUpgrade('tasks');},500);
    }catch(e){}
  });
}