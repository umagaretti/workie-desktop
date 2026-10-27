// Workie AI — proxy serverless. La API key resta SEGRETA lato server (env var Netlify).
// Imposta su Netlify → Site settings → Environment variables:
//   ANTHROPIC_API_KEY  (Claude)  -> console.anthropic.com   [consigliato]
//   in alternativa MISTRAL_API_KEY o GROQ_API_KEY (fallback OpenAI-compatibili)
// Il front-end chiama /.netlify/functions/ai con { mode, messages, lang, context } e riceve { reply }.

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

async function fetchRetry(url, opts) {
  let r = await fetch(url, opts);
  if (r.status === 429) { await new Promise(res => setTimeout(res, 2200)); r = await fetch(url, opts); }
  return r;
}

// Modello Claude per modalità (whitelist SERVER-side: il client non sceglie modelli arbitrari)
const ANTHRO_MODEL = {
  chat: 'claude-haiku-4-5-20251001',   // Resolve chat: economico e veloce
  plan: 'claude-sonnet-5-5',           // Plan my day: ragiona meglio
  assistant: 'claude-haiku-4-5-20251001',
  mem: 'claude-haiku-4-5-20251001',    // Estrazione memoria: micro-chiamata economica
  agent: 'claude-haiku-4-5-20251001',  // Configuratore agenti: genera la config da una descrizione
  sub: 'claude-sonnet-5-5'             // Sub-agente che esegue il lavoro: qualità del deliverable
};
const OPENAI_MODEL = { def: 'mistral-small-latest', groq: 'llama-3.3-70b-versatile' };

// Temperatura per modalità: piano/memoria = deterministici, chat = più naturale.
const TEMP = { chat: 0.7, plan: 0.2, assistant: 0.5, mem: 0.1, agent: 0.4, sub: 0.6 };
// Prefill della risposta (Anthropic): forza un JSON valido fin dal primo carattere.
const PREFILL = { plan: '{', mem: '[', agent: '{' };

function pickProvider(mode) {
  if (process.env.ANTHROPIC_API_KEY) return { type: 'anthropic', key: process.env.ANTHROPIC_API_KEY, model: ANTHRO_MODEL[mode] || ANTHRO_MODEL.assistant };
  if (process.env.MISTRAL_API_KEY) return { type: 'openai', url: 'https://api.mistral.ai/v1/chat/completions', key: process.env.MISTRAL_API_KEY, model: OPENAI_MODEL.def };
  if (process.env.GROQ_API_KEY) return { type: 'openai', url: 'https://api.groq.com/openai/v1/chat/completions', key: process.env.GROQ_API_KEY, model: OPENAI_MODEL.groq };
  return null;
}

function buildSystem(mode, lang, context) {
  const L = `Rispondi sempre nella lingua dell'utente (codice: ${lang}). Sii conciso e concreto.`;
  const ctx = context ? `\n\nContesto (dati reali dell'utente):\n${String(context).slice(0, 3000)}` : '';
  if (mode === 'chat') {
    return `Sei Workie, un assistente pratico che aiuta l'utente a PORTARE A TERMINE una specifica task. ` +
      `Rispondi in modo conciso e concreto. Se ti manca un'informazione essenziale, fai UNA domanda per volta. Resta sul tema della task. ` +
      `Quando la task richiede più passaggi, dopo una breve risposta proponi una ROADMAP operativa: da 3 a 7 passi brevi e azionabili, in ordine logico. ` +
      `Metti la roadmap ALLA FINE del messaggio, racchiusa ESATTAMENTE tra i tag <roadmap> e </roadmap>, UN passo per riga, senza numeri né trattini, così l'app la trasforma in una checklist. ` +
      `Esempio:\n<roadmap>\nRaccogli i materiali necessari\nScrivi la prima bozza\nRivedi e correggi\n</roadmap>\n` +
      `Se l'utente chiede di modificare o aggiornare i passi, restituisci la roadmap aggiornata sempre tra i tag <roadmap></roadmap>. Per task semplici o domande secche NON usare i tag. ` +
      `Inoltre, quando fai una domanda all'utente e ci sono alcune risposte tipiche/probabili, offri 2-4 OPZIONI rapide che l'utente può toccare (potrà comunque scrivere una risposta libera). ` +
      `Metti le opzioni ALLA FINE del messaggio, racchiuse tra i tag <options> e </options>, una per riga, brevi (max 4-5 parole). ` +
      `Esempio:\nQuando ti serve pronto?\n<options>\nOggi\nEntro domani\nQuesta settimana\n</options>\n` +
      `Usa <options> SOLO quando poni una domanda con scelte sensate, mai per contenuti liberi. ` +
      `L'app mostra le domande con <options> come un QUESTIONARIO GUIDATO passo-passo: fai UNA domanda per messaggio e procedi in ordine. ` +
      `Quando all'inizio prevedi di dover porre più domande per capire bene la task, indica il numero TOTALE di domande scrivendo il tag di apertura così: <options total="N"> (N = quante domande in tutto). Mantieni lo stesso N per tutta la sequenza. ` +
      `Poni al massimo 3-4 domande, poi passa alla risposta/roadmap. ${L}${ctx}`;
  }
  if (mode === 'plan') {
    return `Sei Workie, un assistente che pianifica la GIORNATA dell'utente. ` +
      `Dato l'elenco di task/impegni qui sotto, decidi un ordine sensato e spiega brevemente il perché di ciascuno ` +
      `(es. "questa è veloce, toglila subito"; "questa richiede concentrazione, mettila prima di pranzo"). ` +
      `Per OGNI task STIMA anche la durata in minuti ("minutes") in base al suo contenuto (una mail breve ~10-15, una riunione ~30-60, un lavoro di concentrazione ~45-90). ` +
      `Rispondi SOLO con un JSON valido: {"plan":[{"title":"...","minutes": <intero>, "reason":"..."}]}. Il "title" deve essere IDENTICO a come appare nell'elenco. Niente testo fuori dal JSON. ${L}${ctx}`;
  }
  if (mode === 'agent') {
    return `Sei il progettista di agenti di Workie. L'utente descrive (a voce o per iscritto) cosa deve fare un "agente" AI composto da più sub-agenti specializzati. Tu capisci, chiedi solo l'essenziale se manca, e proponi struttura e workflow. ` +
      `Rispondi SOLO con un JSON valido con QUESTA forma: ` +
      `{"title":"...","understanding":"...","questions":["..."],"subAgents":[{"name":"...","desc":"..."}],"workflow":[{"step":"...","agents":["..."]}]}. ` +
      `"title" = nome breve e concreto dell'agente in base a cosa fa (es. "Caroselli per Economy"). ` +
      `"understanding" = 1-3 frasi in cui riassumi cosa hai capito che deve fare, in tono amichevole ("Ok, ho capito: ..."). ` +
      `"questions" = da 0 a 3 domande di chiarimento SOLO se davvero servono per fare un buon lavoro; se è tutto chiaro, []. ` +
      `"subAgents" = i lavoratori specializzati che servono (es. Giornalista, Graphic Designer, Social Media Manager…), ognuno con "name" (1-3 parole) e "desc" (una riga su cosa fa). Da 2 a 6. ` +
      `"workflow" = il lavoro diviso in step in ordine; ogni step ha "step" (nome breve della fase) e "agents" (i nomi dei sub-agenti che lavorano in quella fase, presi da subAgents). Da 2 a 5 step. ` +
      `Scrivi tutto nella lingua dell'utente (codice: ${lang}). Niente testo fuori dal JSON.${ctx}`;
  }
  if (mode === 'sub') {
    return `Sei un SUB-AGENTE AI specializzato, parte di un "agente" di Workie, dentro un workflow a step. ` +
      `Lavori SOLO sul tuo pezzo e produci il DELIVERABLE reale e pronto all'uso (il contenuto vero, non meta-commenti tipo "ecco cosa farei"). ` +
      `Segui rigorosamente le tue istruzioni operative e il contesto qui sotto. Usa il lavoro già fatto dai sub-agenti precedenti come base. ` +
      `Se l'utente ti scrive per cambiare qualcosa, applica la modifica e RESTITUISCI la versione aggiornata completa. ` +
      `Niente preamboli inutili: vai dritto al contenuto. ${L}${ctx}`;
  }
  if (mode === 'mem') {
    return `Sei l'estrattore di memoria di Workie. Dalla conversazione tra utente (U) e assistente (A), individua da 0 a 2 FATTI STABILI e utili da ricordare sull'utente: ` +
      `ruolo/mestiere, clienti o progetti ricorrenti, preferenze e abitudini di lavoro, durate tipiche di certe attività, vincoli. ` +
      `IGNORA dettagli effimeri o legati a una singola task occasionale. Non ripetere fatti già noti. ` +
      `Rispondi SOLO con un array JSON di stringhe brevi (max 12 parole l'una) nella lingua dell'utente (codice: ${lang}). Se non c'è nulla di nuovo e stabile, rispondi []. Niente testo fuori dal JSON. ` +
      `Esempio: ["Fa social media, cliente principale Rossi","Preferisce fare le mail la mattina presto"].${ctx}`;
  }
  // assistant (default) — retro-compatibile
  return `Sei l'assistente AI di Workie, un'app per organizzare il lavoro: giornata (Daily), task e gruppi, progetti, team e connessioni. ` +
    `Aiuta l'utente a usare l'app e dai consigli brevi e pratici. ${L}${ctx}`;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (_) {}
  const mode = ['chat', 'plan', 'assistant', 'mem', 'agent', 'sub'].includes(body.mode) ? body.mode : 'assistant';
  const lang = (body.lang || 'it').slice(0, 5);
  const context = body.context ? String(body.context) : '';

  const prov = pickProvider(mode);
  if (!prov) return json(500, { error: 'Manca la API key: imposta ANTHROPIC_API_KEY (o MISTRAL/GROQ) nelle variabili d\'ambiente di Netlify.' });

  const messages = Array.isArray(body.messages) ? body.messages : [];
  // Ottimizzazione crediti: tieni solo gli ultimi turni entro un budget di caratteri
  // (la cronologia completa costa token inutili; gli ultimi scambi bastano per il contesto).
  const CHAT_BUDGET = 8000;
  const allMsgs = messages.filter(m => m && (m.text || m.image));
  const picked = [];
  let used = 0;
  for (let i = allMsgs.length - 1; i >= 0 && picked.length < 20; i--) {
    const m = allMsgs[i];
    const len = String(m.text || '').length + (m.image ? 1500 : 0);
    if (used + len > CHAT_BUDGET && picked.length >= 2) break;
    picked.unshift(m);
    used += len;
  }
  const turns = picked
    .map(m => {
      const role = m.role === 'ai' ? 'assistant' : 'user';
      if (m.image && typeof m.image === 'string' && m.image.indexOf('data:') === 0) {
        const semi = m.image.indexOf(';'), comma = m.image.indexOf(',');
        const media = (semi > 5) ? m.image.slice(5, semi) : 'image/jpeg';
        const data = (comma >= 0) ? m.image.slice(comma + 1) : '';
        const blocks = [];
        if (m.text) blocks.push({ type: 'text', text: String(m.text).slice(0, 4000) });
        if (data) blocks.push({ type: 'image', source: { type: 'base64', media_type: media, data } });
        return { role, content: blocks.length ? blocks : String(m.text || '').slice(0, 4000) };
      }
      return { role, content: String(m.text || '').slice(0, 4000) };
    });
  if (!turns.length) return json(400, { error: 'Nessun messaggio.' });

  const system = buildSystem(mode, lang, context);
  const maxTokens = mode === 'plan' ? 1200 : (mode === 'mem' ? 300 : (mode === 'agent' ? 1500 : (mode === 'sub' ? 1800 : 700)));
  const temperature = (TEMP[mode] != null) ? TEMP[mode] : 0.7;

  try {
    if (prov.type === 'anthropic') {
      // Prompt caching: il prompt di sistema (stabile) viene messo in cache lato Anthropic.
      // Sotto la soglia minima di token non viene cachato ma la richiesta funziona comunque (nessun errore).
      const systemBlocks = [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }];
      // JSON blindato: per le modalità strutturate pre-riempio l'inizio della risposta.
      const pf = PREFILL[mode] || '';
      const msgsOut = pf ? turns.concat([{ role: 'assistant', content: pf }]) : turns;
      const r = await fetchRetry('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': prov.key, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: prov.model, max_tokens: maxTokens, temperature, system: systemBlocks, messages: msgsOut })
      });
      const raw = await r.text();
      let data = {}; try { data = JSON.parse(raw); } catch (_) {}
      if (!r.ok) return json(r.status, { error: (data && data.error && (data.error.message || data.error.type)) || (raw ? raw.slice(0, 300) : ('HTTP ' + r.status)) });
      let reply = (data.content || []).map(b => b && b.text ? b.text : '').join('').trim();
      if (pf) reply = (pf + reply).trim(); // ricompongo il JSON col carattere pre-riempito
      return json(200, { reply });
    }
    // OpenAI-compatibile (Mistral / Groq) — no immagini: appiattisco a solo testo
    const chat = [{ role: 'system', content: system }].concat(turns.map(t => ({ role: t.role, content: typeof t.content === 'string' ? t.content : ((t.content.find(c => c.type === 'text') || {}).text || '') })));
    const r = await fetchRetry(prov.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + prov.key },
      body: JSON.stringify({ model: prov.model, messages: chat, temperature, max_tokens: maxTokens })
    });
    const raw = await r.text();
    let data = {}; try { data = JSON.parse(raw); } catch (_) {}
    if (!r.ok) return json(r.status, { error: (data && data.error && (data.error.message || data.error.type || data.error)) || (raw ? raw.slice(0, 300) : ('HTTP ' + r.status)) });
    const reply = (((data.choices || [])[0] || {}).message || {}).content || '';
    return json(200, { reply: String(reply).trim() });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
