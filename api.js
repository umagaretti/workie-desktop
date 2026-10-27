/**
 * @file api.js
 * Backend: client Supabase (sb) + helper auth/profilo (sbSignUp/SignIn/SignOut/
 * LoadProfile/SaveProfile/SearchUsers/UsernameTaken). Caricato PRIMA di app.js
 * e dopo l'SDK Supabase. Unico punto che crea il client; la UI non parla mai
 * diretta col server, passa da qui. Estratto da app.js senza modifiche.
 */
// ---------- Supabase (server) ----------
const SB_URL='https://ddiynylrfojaiyiuulac.supabase.co';
const SB_KEY='sb_publishable_N0fgHlp73Z9_fJ3nQlbsDQ_wtKSnD6g';
let sb=null;
// Nell'app desktop (Tauri) le fetch verso Supabase falliscono ("Load failed") finché non colleghiamo il plugin http di Tauri:
// per ora nel desktop si usa l'auth locale (offline). Sul web resta Supabase normale.
// Supabase attivo ovunque si carichi da un'origine web reale (web, PWA e app desktop Tauri che
// punta al sito live). Si disattiva SOLO se i file fossero serviti localmente da Tauri (tauri://).
try{if(location.protocol!=='tauri:'&&window.supabase&&window.supabase.createClient)sb=window.supabase.createClient(SB_URL,SB_KEY);}catch(e){console.warn('Supabase init fallito',e);}
// ---- Helper auth/profilo Supabase ----
async function sbSignUp(email,pw){if(!sb)return{error:'no-server'};const{data,error}=await sb.auth.signUp({email:email,password:pw});if(error)return{error:error.message};return{ok:true,user:data.user,session:data.session,needConfirm:!data.session};}
async function sbSignIn(email,pw){if(!sb)return{error:'no-server'};const{data,error}=await sb.auth.signInWithPassword({email:email,password:pw});if(error)return{error:error.message};return{ok:true,user:data.user,session:data.session};}
async function sbSignOut(){if(sb){try{await sb.auth.signOut();}catch(e){}}}
async function sbLoadProfile(uid){if(!sb)return null;try{const{data}=await sb.from('profiles').select('*').eq('id',uid).maybeSingle();return data||null;}catch(e){return null;}}
async function sbSaveProfile(fields){if(!sb)return{};try{const{data:{user}}=await sb.auth.getUser();if(!user)return{};const{error}=await sb.from('profiles').upsert(Object.assign({id:user.id},fields));return{error:error?error.message:null};}catch(e){return{error:String((e&&e.message)||e)};}}
async function sbSearchUsers(q){if(!sb||!q)return[];q=q.trim().replace(/^@/,'');if(!q)return[];try{const{data:{user}}=await sb.auth.getUser();const me=user?user.id:null;const{data}=await sb.from('profiles').select('*').or('name.ilike.%'+q+'%,username.ilike.%'+q+'%').limit(12);return(data||[]).filter(p=>p.id!==me).map(p=>({email:p.id,uid:p.id,name:(((p.name||'')+' '+(p.surname||'')).trim())||'Utente',username:p.username||'',handle:p.username?('@'+p.username):'',bio:p.bio||'',photo:p.photo||'',socials:(p.socials&&typeof p.socials==='object')?p.socials:{},website:p.website||'',share:(p.share&&typeof p.share==='object')?p.share:{},joinTs:p.created_at?new Date(p.created_at).getTime():0}));}catch(e){return[];}}
async function sbUsernameTaken(username,exceptId){if(!sb||!username)return false;try{const{data}=await sb.from('profiles').select('id').eq('username',username.toLowerCase()).limit(1);return !!(data&&data.length&&data[0].id!==exceptId);}catch(e){return false;}}
