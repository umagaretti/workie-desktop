// OAuth (Authorization Code + PKCE) verso Higgsfield, auth server = Clerk.
// L'utente collega il SUO account Higgsfield: le generazioni useranno i crediti del SUO piano (via MCP), nessuna API separata.
// Client pubblico registrato via DCR (nessun client_secret). Flusso in popup: al termine fa postMessage dei token alla finestra Workie.
const crypto = require('crypto');

const CLIENT_ID = process.env.HIGGSFIELD_OAUTH_CLIENT_ID || 'xQdT62lDbXEcuUwv';
const AUTH_URL  = 'https://clerk.higgsfield.ai/oauth/authorize';
const TOKEN_URL = 'https://clerk.higgsfield.ai/oauth/token';
const SCOPE     = 'openid email offline_access';
// Deve combaciare ESATTAMENTE col redirect_uri registrato nel client DCR.
const REDIRECT  = process.env.HIGGSFIELD_OAUTH_REDIRECT || 'https://workieapp.netlify.app/.netlify/functions/higgsfield-auth';
const ORIGIN    = process.env.APP_ORIGIN || 'https://workieapp.netlify.app';

function b64url(buf){ return Buffer.from(buf).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function parseCookies(h){ const o={}; (h||'').split(';').forEach(p=>{ const i=p.indexOf('='); if(i>0) o[p.slice(0,i).trim()]=decodeURIComponent(p.slice(i+1).trim()); }); return o; }
function resultPage(payload, clearCookie){
  const headers = { 'Content-Type':'text/html; charset=utf-8' };
  if (clearCookie) headers['Set-Cookie'] = 'hf_oauth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
  const js = 'try{window.opener&&window.opener.postMessage(' + JSON.stringify(Object.assign({type:'higgsfield_oauth'}, payload)) + ',' + JSON.stringify(ORIGIN) + ');}catch(e){}setTimeout(function(){try{window.close();}catch(e){}},200);';
  const msg = payload.error ? ('Errore: ' + payload.error) : 'Account Higgsfield collegato. Puoi chiudere questa finestra.';
  return { statusCode: 200, headers, body: '<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;padding:32px;color:#222">' + msg + '<script>' + js + '</script></body>' };
}

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};

  // 1) START → genera PKCE + state, salva in cookie httpOnly, redirige a Clerk
  if (q.action === 'start') {
    const verifier  = b64url(crypto.randomBytes(32));
    const challenge = b64url(crypto.createHash('sha256').update(verifier).digest());
    const state     = b64url(crypto.randomBytes(16));
    const url = AUTH_URL
      + '?response_type=code'
      + '&client_id='     + encodeURIComponent(CLIENT_ID)
      + '&redirect_uri='  + encodeURIComponent(REDIRECT)
      + '&scope='         + encodeURIComponent(SCOPE)
      + '&state='         + encodeURIComponent(state)
      + '&code_challenge='        + encodeURIComponent(challenge)
      + '&code_challenge_method=S256';
    const cookie = 'hf_oauth=' + encodeURIComponent(JSON.stringify({ v: verifier, s: state })) + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600';
    return { statusCode: 302, headers: { Location: url, 'Set-Cookie': cookie, 'Cache-Control': 'no-store' }, body: '' };
  }

  // 2) ERRORE dall'authorization server
  if (q.error) return resultPage({ error: q.error_description || q.error }, true);

  // 3) CALLBACK → verifica state, scambia code → token
  if (q.code && q.state) {
    const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || '');
    let saved = {};
    try { saved = JSON.parse(cookies.hf_oauth || '{}'); } catch (e) {}
    if (!saved.v || saved.s !== q.state) return resultPage({ error: 'state non valido (riprova il collegamento)' }, true);
    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: q.code,
        redirect_uri: REDIRECT,
        client_id: CLIENT_ID,
        code_verifier: saved.v
      });
      const r = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }, body });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.access_token) return resultPage({ error: (data && (data.error_description || data.error)) || ('token ' + r.status) }, true);
      return resultPage({ ok: true, access_token: data.access_token, refresh_token: data.refresh_token || '', expires_in: data.expires_in || 3600, token_type: data.token_type || 'Bearer' }, true);
    } catch (e) {
      return resultPage({ error: 'eccezione nello scambio token' }, true);
    }
  }

  return { statusCode: 400, headers: { 'Content-Type': 'text/plain' }, body: 'Bad request' };
};
