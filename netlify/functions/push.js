// Workie — invio Web Push (event-driven: messaggi, inviti).
// Env richieste su Netlify: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (es. mailto:tu@mail.com),
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE (chiave service_role — SOLO server, mai nel frontend).
// Il front chiama /.netlify/functions/push con Authorization: Bearer <jwt utente> e body { toUserId, title, body, url, tag }.
const webpush = require('web-push');

const SB_URL = process.env.SUPABASE_URL || 'https://ddiynylrfojaiyiuulac.supabase.co';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || '';

function json(statusCode, obj) {
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
}

function vapidReady() {
  const pub = process.env.VAPID_PUBLIC_KEY, priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:workie@example.com', pub, priv);
  return true;
}

// Verifica che il chiamante sia un utente autenticato reale
async function verifyCaller(token) {
  if (!token) return null;
  try {
    const r = await fetch(SB_URL + '/auth/v1/user', { headers: { apikey: SERVICE_ROLE, Authorization: 'Bearer ' + token } });
    if (!r.ok) return null;
    const u = await r.json();
    return u && u.id ? u.id : null;
  } catch (e) { return null; }
}

async function getSubs(userId) {
  const r = await fetch(SB_URL + '/rest/v1/push_subs?user_id=eq.' + userId + '&select=endpoint,p256dh,auth', {
    headers: { apikey: SERVICE_ROLE, Authorization: 'Bearer ' + SERVICE_ROLE }
  });
  if (!r.ok) return [];
  return await r.json();
}

async function deleteSub(endpoint) {
  try {
    await fetch(SB_URL + '/rest/v1/push_subs?endpoint=eq.' + encodeURIComponent(endpoint), {
      method: 'DELETE', headers: { apikey: SERVICE_ROLE, Authorization: 'Bearer ' + SERVICE_ROLE }
    });
  } catch (e) {}
}

// Invia a tutte le subscription di un utente. Esportata anche per il reminder.
async function sendToUser(userId, payload) {
  const subs = await getSubs(userId);
  const data = JSON.stringify(payload);
  let sent = 0;
  await Promise.all(subs.map(async s => {
    const sub = { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } };
    try { await webpush.sendNotification(sub, data); sent++; }
    catch (err) { if (err && (err.statusCode === 404 || err.statusCode === 410)) await deleteSub(s.endpoint); }
  }));
  return sent;
}

exports.sendToUser = sendToUser;
exports.vapidReady = vapidReady;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method' });
  if (!SERVICE_ROLE) return json(500, { error: 'no_service_role' });
  if (!vapidReady()) return json(500, { error: 'no_vapid' });

  const token = (event.headers.authorization || event.headers.Authorization || '').replace(/^Bearer\s+/i, '');
  const caller = await verifyCaller(token);
  if (!caller) return json(401, { error: 'unauthorized' });

  let b;
  try { b = JSON.parse(event.body || '{}'); } catch (e) { return json(400, { error: 'bad_json' }); }
  const toUserId = b.toUserId;
  if (!toUserId) return json(400, { error: 'no_target' });

  const payload = {
    title: (b.title || 'Workie').slice(0, 80),
    body: (b.body || '').slice(0, 180),
    url: b.url || '/',
    tag: b.tag || undefined
  };
  const sent = await sendToUser(toUserId, payload);
  return json(200, { ok: true, sent });
};
