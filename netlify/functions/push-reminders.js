// Workie — promemoria giornalieri (digest mattutino). Schedulata da netlify.toml.
// Per ogni utente legge le task salvate in app_data e, se ci sono attività in ritardo o
// in scadenza oggi, invia UNA notifica riepilogo. Gira una volta al giorno → niente spam.
const { sendToUser, vapidReady } = require('./push');

const SB_URL = process.env.SUPABASE_URL || 'https://ddiynylrfojaiyiuulac.supabase.co';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || '';

function romeToday() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const g = t => +parts.find(p => p.type === t).value;
  return [g('year'), g('month') - 1, g('day')]; // mese 0-based, come nel client
}
function cmp(a, b) { return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]; }
function taskDue(t) {
  if (t.date) return t.date;
  if (t.month) return [t.month[0], t.month[1], new Date(t.month[0], t.month[1] + 1, 0).getDate()];
  return null;
}

exports.handler = async () => {
  if (!SERVICE_ROLE) return { statusCode: 500, body: 'no_service_role' };
  if (!vapidReady()) return { statusCode: 500, body: 'no_vapid' };

  let rows = [];
  try {
    const r = await fetch(SB_URL + '/rest/v1/app_data?select=id,data', {
      headers: { apikey: SERVICE_ROLE, Authorization: 'Bearer ' + SERVICE_ROLE }
    });
    if (r.ok) rows = await r.json();
  } catch (e) { return { statusCode: 500, body: 'fetch_error' }; }

  const today = romeToday();
  let notified = 0;

  for (const row of rows) {
    const uid = row.id;
    const data = row.data || {};
    const key = 'workie_tasks::' + String(uid).toLowerCase();
    let raw = data[key];
    if (raw == null) continue;
    let tasks;
    try { tasks = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch (e) { continue; }
    if (!Array.isArray(tasks)) continue;

    let overdue = 0, todayCount = 0;
    for (const t of tasks) {
      if (!t || t.done) continue;
      const d = taskDue(t);
      if (!d) continue;
      const c = cmp(d, today);
      if (c < 0) overdue++;
      else if (c === 0) todayCount++;
    }
    if (overdue === 0 && todayCount === 0) continue;

    let body;
    if (overdue && todayCount) body = todayCount + ' attività oggi · ' + overdue + ' in ritardo';
    else if (overdue) body = overdue + (overdue === 1 ? ' attività in ritardo' : ' attività in ritardo');
    else body = todayCount + (todayCount === 1 ? ' attività da fare oggi' : ' attività da fare oggi');

    try {
      const sent = await sendToUser(uid, { title: 'Il tuo Workie di oggi', body: body, url: '/', tag: 'reminder' });
      if (sent) notified++;
    } catch (e) {}
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, users: rows.length, notified }) };
};
