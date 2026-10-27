// Workie — skill "Analizza sito": scarica una pagina web lato server (evita CORS) e la ripulisce in testo.
// Il client chiama POST /.netlify/functions/fetch-url con { url } e riceve { url, title, text }.
// Nessuna chiave richiesta. Protezioni: solo http/https, blocco indirizzi privati/locali (anti-SSRF), timeout, limiti di dimensione.

function json(statusCode, obj) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(obj),
  };
}

function htmlToText(html) {
  let h = String(html || '');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ')
       .replace(/<style[\s\S]*?<\/style>/gi, ' ')
       .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
       .replace(/<!--[\s\S]*?-->/g, ' ');
  const tm = h.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = tm ? tm[1].replace(/\s+/g, ' ').trim() : '';
  // Preferisci il contenuto principale se c'è
  let bodyHtml = h;
  const am = h.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
  if (am) bodyHtml = am[2];
  let text = bodyHtml
    .replace(/<\/(p|div|h[1-6]|li|tr|section|article|header|footer)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (m, n) => { try { return String.fromCharCode(+n); } catch (_) { return ''; } })
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { title, text };
}

function blockedHost(h) {
  h = (h || '').toLowerCase().replace(/\.$/, '');
  if (!h) return true;
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (h === '::1' || h === '0.0.0.0') return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  return false;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (_) {}
  let url = String(body.url || '').trim();
  if (!url) return json(400, { error: 'URL mancante' });
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  let u;
  try { u = new URL(url); } catch (e) { return json(400, { error: 'URL non valido' }); }
  if (!/^https?:$/.test(u.protocol)) return json(400, { error: 'Sono ammessi solo link http/https' });
  if (blockedHost(u.hostname)) return json(400, { error: 'Indirizzo non consentito' });

  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch(u.toString(), {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WorkieBot/1.0; +https://workieapp.netlify.app)', 'Accept': 'text/html,application/xhtml+xml' }
    });
    clearTimeout(to);
    if (!r.ok) return json(r.status, { error: 'La pagina ha risposto HTTP ' + r.status });
    const ct = (r.headers.get('content-type') || '').toLowerCase();
    if (ct && !ct.includes('html') && !ct.includes('text') && !ct.includes('xml')) {
      return json(415, { error: 'Contenuto non testuale (' + ct + ')' });
    }
    let html = await r.text();
    if (html.length > 800000) html = html.slice(0, 800000);
    const { title, text } = htmlToText(html);
    if (!text && !title) return json(422, { error: 'Pagina senza testo leggibile (forse è un\'app dinamica o protetta).' });
    return json(200, { url: u.toString(), title, text: text.slice(0, 12000) });
  } catch (e) {
    return json(500, { error: (e && e.name === 'AbortError') ? 'Timeout nel caricamento della pagina' : String((e && e.message) || e) });
  }
};
