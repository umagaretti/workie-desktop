// Proxy verso l'MCP di Higgsfield (mcp.higgsfield.ai) con il token OAuth dell'utente.
// Le generazioni usano i CREDITI DEL PIANO dell'utente (nessuna API separata).
// action: 'tools' = elenca gli strumenti disponibili; 'call' = esegue uno strumento (es. generazione immagini).
const MCP_URL = 'https://mcp.higgsfield.ai/mcp';
const PROTO = '2025-06-18';

function jres(code, obj){ return { statusCode: code, headers: { 'Content-Type':'application/json' }, body: JSON.stringify(obj) }; }

async function mcpPost(token, bodyObj, sessionId){
  const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json, text/event-stream',
    'MCP-Protocol-Version': PROTO,
    'Authorization':'Bearer ' + token
  };
  if (sessionId) headers['Mcp-Session-Id'] = sessionId;
  const r = await fetch(MCP_URL, { method:'POST', headers, body: JSON.stringify(bodyObj) });
  const sid = r.headers.get('mcp-session-id') || sessionId || '';
  const text = await r.text();
  let json = null;
  try { json = JSON.parse(text); } catch(e){
    // Streamable HTTP può rispondere in SSE: prendo l'ultima riga "data:"
    const dataLines = text.split(/\r?\n/).filter(l => l.startsWith('data:'));
    for (let i = dataLines.length - 1; i >= 0; i--){
      try { json = JSON.parse(dataLines[i].slice(5).trim()); break; } catch(_){}
    }
  }
  return { ok: r.ok, status: r.status, sid, json, text };
}

async function openSession(token){
  const init = await mcpPost(token, { jsonrpc:'2.0', id:1, method:'initialize', params:{ protocolVersion:PROTO, capabilities:{}, clientInfo:{ name:'Workie', version:'0.1' } } });
  const sid = init.sid;
  if (sid) { try { await mcpPost(token, { jsonrpc:'2.0', method:'notifications/initialized' }, sid); } catch(_){} }
  return { sid, init };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return jres(200, {});
  if (event.httpMethod !== 'POST') return jres(405, { error:'POST only' });
  let body = {}; try { body = JSON.parse(event.body || '{}'); } catch(e){}
  const token = body.access_token;
  if (!token) return jres(401, { error:'missing_token' });
  const action = body.action || 'tools';
  try {
    const { sid, init } = await openSession(token);
    if (!init.ok && !(init.json && init.json.result)) {
      return jres(init.status === 401 ? 401 : 502, { error:'mcp_init_failed', status: init.status, detail: (init.text||'').slice(0,300) });
    }
    if (action === 'tools') {
      const t = await mcpPost(token, { jsonrpc:'2.0', id:2, method:'tools/list' }, sid);
      const tools = (t.json && t.json.result && t.json.result.tools) || [];
      return jres(200, { ok:true, tools, raw: tools.length ? undefined : (t.text||'').slice(0,500) });
    }
    if (action === 'call' && body.name) {
      const c = await mcpPost(token, { jsonrpc:'2.0', id:3, method:'tools/call', params:{ name: body.name, arguments: body.arguments || {} } }, sid);
      if (c.json && c.json.error) return jres(200, { ok:false, error: c.json.error });
      return jres(200, { ok:true, result: (c.json && c.json.result) || null });
    }
    return jres(400, { error:'bad_action' });
  } catch (e) {
    return jres(500, { error:'exception', detail: String(e && e.message) });
  }
};
