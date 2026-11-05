/**
 * @file storage.js
 * Livello account/storage: DEV_LOCAL (sessione dev in locale), CUR_ACC (account
 * corrente), ukey() (namespacing delle chiavi localStorage per account) e la
 * migrazione una-tantum dei vecchi dati globali. Caricato PRIMA di app.js: il
 * resto dell'app usa CUR_ACC/ukey (globali). La migrazione resta prima
 * dell'intercettatore sync (che resta in app.js). Estratto senza modifiche.
 */
// ----- Dati per-account (isolati per email; account/session/lang restano globali) -----
// DEV: in locale (localhost) usa una sessione "dev-local" così l'app gira senza login. Online resta normale.
const DEV_LOCAL=(function(){try{if(window.__TAURI__)return false;if(navigator&&navigator.userAgent&&navigator.userAgent.indexOf('Electron')>=0)return false;/* app desktop (Tauri/Electron): login vero, non modalità dev */return location.hostname==='localhost'||location.hostname==='127.0.0.1'||location.hostname==='';}catch(e){return false;}})();
let CUR_ACC=(function(){try{let s=localStorage.getItem('workie_session');if(!s&&DEV_LOCAL){s='dev-local';localStorage.setItem('workie_session',s);}return s||null;}catch(e){return null;}})();
function ukey(base){return CUR_ACC?base+'::'+CUR_ACC.toLowerCase():base+'::_guest';}
// migrazione una-tantum: i vecchi dati globali vanno all'account corrente, poi si rimuovono (così i nuovi account partono puliti)
(function migrateGlobalToAccount(){if(!CUR_ACC)return;['workie_user','workie_desktops','workie_projects','workie_connections'].forEach(base=>{try{const old=localStorage.getItem(base);if(old!=null){const nk=base+'::'+CUR_ACC.toLowerCase();if(localStorage.getItem(nk)==null)localStorage.setItem(nk,old);localStorage.removeItem(base);}}catch(e){}});})();
