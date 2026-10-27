// Workie — crea una sessione Stripe Checkout per il piano Pro.
// Le chiavi restano SEGRETE lato server (env var Netlify). NON metterle mai nel client.
// Imposta su Netlify → Site configuration → Environment variables:
//   STRIPE_SECRET_KEY   (sk_live_... oppure sk_test_...)  da dashboard.stripe.com → Developers → API keys
//   STRIPE_PRICE_ID     (price_...)  il prezzo RICORRENTE del piano Pro (Products → il tuo prezzo mensile)
//   URL_SITE (opzionale)  es. https://workieapp.netlify.app  (per i redirect dopo il pagamento)
// Il client chiama POST /.netlify/functions/checkout con { email } e riceve { url } (pagina di pagamento Stripe).

function json(statusCode, obj) {
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const key = process.env.STRIPE_SECRET_KEY, price = process.env.STRIPE_PRICE_ID;
  if (!key || !price) return json(500, { error: 'Stripe non configurato: imposta STRIPE_SECRET_KEY e STRIPE_PRICE_ID nelle variabili d\'ambiente di Netlify.' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (_) {}
  const email = (body.email || '').slice(0, 200);
  const base = process.env.URL_SITE || process.env.URL || ('https://' + (event.headers.host || 'workieapp.netlify.app'));

  const params = new URLSearchParams();
  params.append('mode', 'subscription');
  params.append('line_items[0][price]', price);
  params.append('line_items[0][quantity]', '1');
  params.append('success_url', base + '/?checkout=success');
  params.append('cancel_url', base + '/?checkout=cancel');
  params.append('allow_promotion_codes', 'true');
  if (email) params.append('customer_email', email);

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const raw = await r.text();
    let d = {}; try { d = JSON.parse(raw); } catch (_) {}
    if (!r.ok) return json(r.status, { error: (d && d.error && d.error.message) || (raw ? raw.slice(0, 300) : ('HTTP ' + r.status)) });
    return json(200, { url: d.url, id: d.id });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
