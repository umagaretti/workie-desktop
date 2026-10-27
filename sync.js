/**
 * @file sync.js
 * Sync cross-device: salva/legge lo "cloud localStorage" (tabella app_data su
 * Supabase) con merge per-chiave e timestamp. Usa sb (api.js) e CUR_ACC/ukey
 * (storage.js). Caricato dopo storage.js e prima di app.js. NOTA: l'intercettatore
 * di localStorage.setItem e i listener focus/visibility restano in app.js, al loro
 * posto, per non cambiare l'ordine di avvio (devono installarsi dopo la migrazione).
 */
const SYNC_KEYS=['workie_tasks','workie_projects','workie_desktops','workie_rituals','workie_profiles','workie_active_profile','workie_habits','workie_teams','workie_connections','workie_social','workie_groups','workie_groups_shown','workie_dw_widget','workie_theme','workie_theme_custom','workie_saved_themes','workie_theme_saved'];
let syncApplying=false,syncTimer=null,syncMe=null;
async function syncUid(){if(syncMe)return syncMe;if(!sb)return null;try{const{data:{user}}=await sb.auth.getUser();syncMe=user?user.id:null;}catch(e){}return syncMe;}
function syncEmpty(v){return v==null||v===''||v==='[]'||v==='{}'||v==='null';}
function ktsLoad(){try{return JSON.parse(localStorage.getItem(ukey('workie_sync_kts')))||{};}catch(e){return {};}}
function ktsSave(m){try{localStorage.setItem(ukey('workie_sync_kts'),JSON.stringify(m));}catch(e){}}
// primo avvio col nuovo sync: marca come "correnti" le chiavi locali già presenti (non vuote)
function syncSeedKts(){try{if(!CUR_ACC)return;if(localStorage.getItem(ukey('workie_sync_kts'))!=null)return;const now=Date.now(),m={};SYNC_KEYS.forEach(k=>{const v=localStorage.getItem(ukey(k));if(v!=null&&!syncEmpty(v))m[k]=now;});localStorage.setItem(ukey('workie_sync_kts'),JSON.stringify(m));}catch(e){}}
async function syncCloud(me){try{const{data}=await sb.from('app_data').select('data').eq('id',me).maybeSingle();return (data&&data.data)?data.data:null;}catch(e){return null;}}
// Push con MERGE per-chiave: il cloud conserva sempre l'unione (per ogni chiave vince il timestamp più recente)
async function syncPush(){
  if(!sb||syncApplying)return;const me=await syncUid();if(!me)return;syncSeedKts();
  const localKts=ktsLoad();const cloud=await syncCloud(me)||{};const cloudKts=cloud._kts||{};const legacyTs=+cloud._ts||0;
  const blob={},mergedKts={},outKts=Object.assign({},localKts);
  SYNC_KEYS.forEach(k=>{
    const lv=localStorage.getItem(ukey(k));
    const lt=+localKts[k]||0;
    const hasCloud=cloud[k]!=null;
    const ct=cloudKts[k]!=null?(+cloudKts[k]||0):(hasCloud?legacyTs:0);
    if(lt>=ct){ if(lv!=null){blob[k]=lv;mergedKts[k]=lt||ct;outKts[k]=lt||ct;} else if(hasCloud){blob[k]=cloud[k];mergedKts[k]=ct;} }
    else{ if(hasCloud){blob[k]=cloud[k];mergedKts[k]=ct;} else if(lv!=null){blob[k]=lv;mergedKts[k]=lt;outKts[k]=lt;} }
  });
  const ts=Date.now();blob._ts=ts;blob._kts=mergedKts;
  try{const{error}=await sb.from('app_data').upsert({id:me,data:blob,updated_at:new Date(ts).toISOString()});if(!error){localStorage.setItem(ukey('workie_sync_ts'),String(ts));ktsSave(outKts);}}catch(e){}
}
function syncSchedule(){if(syncApplying||!sb)return;clearTimeout(syncTimer);syncTimer=setTimeout(syncPush,1600);}
// Pull per-chiave: applica in locale solo le chiavi più recenti nel cloud
async function syncPull(){
  if(!sb)return false;const me=await syncUid();if(!me)return false;syncSeedKts();
  let d=await syncCloud(me);
  if(!d){await syncPush();return false;} // nessun dato in cloud: seed
  if(!d._kts){await syncPush();d=await syncCloud(me)||d;} // riga legacy: prima push-merge (aggiunge _kts) per non perdere i dati unici
  const cloudKts=d._kts||{};const localKts=ktsLoad();
  syncApplying=true;let changed=false;const newKts=Object.assign({},localKts);
  SYNC_KEYS.forEach(k=>{const ct=+cloudKts[k]||0,lt=+localKts[k]||0;if(d[k]!=null&&ct>lt){const cur=localStorage.getItem(ukey(k));if(cur!==d[k]){localStorage.setItem(ukey(k),d[k]);changed=true;}newKts[k]=ct;}});
  localStorage.setItem(ukey('workie_sync_ts'),String(+d._ts||Date.now()));
  ktsSave(newKts);syncApplying=false;return changed;
}
// Pull anche quando torni/riapri l'app (non solo all'avvio) → cambiando device vedi subito i dati aggiornati
let lastFocusPull=0;
function syncOnFocus(){
  if(!sb||document.hidden)return;
  if(!localStorage.getItem('workie_session'))return;
  const now=Date.now();if(now-lastFocusPull<4000)return;lastFocusPull=now;
  // non ricaricare mentre stai scrivendo in una finestra aperta
  if(document.querySelector('.overlay.open, .stm-overlay.open, .m-create-ov.open, #socAddModal.open'))return;
  syncPull().then(applied=>{if(applied)location.reload();}).catch(()=>{});
}
