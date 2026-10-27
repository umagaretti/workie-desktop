// Workie — trascrizione audio (dettatura task). Il client registra l'audio col microfono
// e lo manda qui; noi lo trascriviamo con Whisper (Groq, economico/veloce; fallback OpenAI).
// La chiave resta SEGRETA lato server (env var Netlify): GROQ_API_KEY (consigliata) oppure OPENAI_API_KEY.
// Node 18+: FormData, Blob e fetch sono globali (nessuna dipendenza npm).

function json(statusCode, obj) {
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const groq = process.env.GROQ_API_KEY;
  const openai = process.env.OPENAI_API_KEY;
  const key = groq || openai;
  if (!key) return json(500, { error: 'Manca GROQ_API_KEY (o OPENAI_API_KEY) nelle variabili d\'ambiente di Netlify.' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (_) {}
  const dataUrl = String(body.audio || '');
  // Il mediatype può includere parametri (es. "audio/webm;codecs=opus"): catturo tutto fino a ";base64,".
  const m = dataUrl.match(/^data:([\s\S]*?);base64,([\s\S]*)$/);
  if (!m) return json(400, { error: 'Audio mancante o non valido' });
  const mime = ((m[1] || 'audio/webm').split(';')[0] || 'audio/webm').trim();
  let buf;
  try { buf = Buffer.from(m[2], 'base64'); } catch (_) { return json(400, { error: 'Audio non decodificabile' }); }
  if (!buf || !buf.length) return json(400, { error: 'Audio vuoto' });
  if (buf.length > 24 * 1024 * 1024) return json(413, { error: 'Audio troppo lungo (max ~24MB)' });

  const ext = mime.includes('webm') ? 'webm' : mime.includes('mp4') ? 'mp4' : mime.includes('mpeg') ? 'mp3'
    : mime.includes('ogg') ? 'ogg' : mime.includes('wav') ? 'wav' : 'webm';
  const url = groq ? 'https://api.groq.com/openai/v1/audio/transcriptions' : 'https://api.openai.com/v1/audio/transcriptions';
  const model = groq ? 'whisper-large-v3-turbo' : 'whisper-1';

  try {
    const form = new FormData();
    form.append('file', new Blob([buf], { type: mime || 'audio/webm' }), 'audio.' + ext);
    form.append('model', model);
    const lang = String(body.lang || '').slice(0, 2).toLowerCase();
    if (/^[a-z]{2}$/.test(lang)) form.append('language', lang);
    form.append('response_format', 'json');

    const r = await fetch(url, { method: 'POST', headers: { 'Authorization': 'Bearer ' + key }, body: form });
    const raw = await r.text();
    let data = {}; try { data = JSON.parse(raw); } catch (_) {}
    if (!r.ok) return json(r.status, { error: (data && data.error && (data.error.message || data.error)) || (raw ? raw.slice(0, 300) : ('HTTP ' + r.status)) });
    return json(200, { text: String(data.text || '').trim() });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
