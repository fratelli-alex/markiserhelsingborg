// Formulärets mottagare. Sajten är statisk, så formulären postar hit. Tjänsten skickar meddelandet som e-post
// via Brevos API och skickar besökaren till /tack/. Samma upplägg som Bitcoinkursen och Barnkollen.
// Inga beroenden: körs med `node server.mjs` (Sevalla-applikation, build_path tjanster/kontakt).
//
// Miljövariabler (sätts i Sevalla, aldrig i koden):
//   BREVO_API_KEY  egen nyckel per sajt
//   MOTTAGARE      adressen som får förfrågningarna (visas aldrig på sajten). Flera: kommaseparerade
//   AVSANDARE      verifierad avsändare i Brevo, t.ex. formular@<domän>. Domänen måste vara autentiserad i Brevo
//   SAJTNAMN       visas i ämnesraden, t.ex. "Markiser Helsingborg"
//   SAJT           tillåtna ursprung, kommaseparerade. Första används i felsidornas länk (riktig domän först)
//   SLACK_WEBHOOK  valfri: Slacks inkommande webhook. Förfrågan postas även i kanalen
//   PORT           sätts av Sevalla
//
// Fällor (Barnkollen 2026-10-15): Brevo svarar 201 även när avsändaren är ogiltig och avvisar mejlet efteråt,
// så kontrollera leveransen i Brevos händelselogg. Brevo spärrar okända IP: godkänn tjänstens egress-IP i Brevo.
import { createServer } from 'node:http';

const { BREVO_API_KEY, MOTTAGARE, AVSANDARE, SAJTNAMN, SAJT, SLACK_WEBHOOK, PORT = 8080 } = process.env;
for (const [namn, varde] of Object.entries({ BREVO_API_KEY, MOTTAGARE, AVSANDARE, SAJTNAMN, SAJT })) {
  if (!varde) { console.error(`${namn} saknas`); process.exit(1); }
}
// Formuläret får bara skickas från sajten (och den tillfälliga adressen)
const TILLATNA = new Set(SAJT.split(',').map(s => s.trim().replace(/\/$/, '')));
const HEM = [...TILLATNA][0];
// Fält som har en egen plats i mejlet. Övriga fält (t.ex. typ av markis, mått) listas som de är.
const KANDA = new Set(['namn', 'epost', 'telefon', 'meddelande', 'webbplats', 'samtycke', 'formular', 'sida']);

// Högst 5 meddelanden per IP och timme. Minnet töms när tjänsten startar om, det räcker mot enkel spam.
const TIMME = 3600_000, GRANS = 5;
const senaste = new Map();
function forManga(ip) {
  const nu = Date.now();
  const lista = (senaste.get(ip) ?? []).filter(t => nu - t < TIMME);
  lista.push(nu);
  senaste.set(ip, lista);
  if (senaste.size > 10_000) senaste.clear();
  return lista.length > GRANS;
}

const sida = (res, status, rubrik, text, origin) => {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  res.end(`<!doctype html><html lang="sv"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${rubrik}</title><body style="font-family:system-ui,sans-serif;max-width:560px;margin:48px auto;padding:0 16px"><h1 style="font-size:24px">${rubrik}</h1><p>${text}</p><p><a href="${origin}/kontakt/">Tillbaka till formuläret</a></p></body></html>`);
};

async function lasKropp(req) {
  let data = '';
  for await (const del of req) { data += del; if (data.length > 20_000) throw new Error('för stort'); }
  return new URLSearchParams(data);
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'GET' && url.pathname === '/halsa') { res.writeHead(200); return res.end('ok'); }
  if (req.method !== 'POST' || url.pathname !== '/kontakt') { res.writeHead(404); return res.end(); }

  const origin = (req.headers.origin ?? '').replace(/\/$/, '');
  if (!TILLATNA.has(origin)) return sida(res, 403, 'Förfrågan skickades inte', `Formuläret kan bara skickas från ${SAJTNAMN}s webbplats.`, HEM);
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim();
  if (forManga(ip)) return sida(res, 429, 'För många förfrågningar', 'Du har skickat flera förfrågningar på kort tid. Försök igen om en stund.', origin);

  let f;
  try { f = await lasKropp(req); } catch { return sida(res, 413, 'Förfrågan är för lång', 'Korta ner texten och försök igen.', origin); }
  // Fältet "webbplats" är dolt för människor. Fylls det i är det en robot: låtsas att allt gick bra.
  if (f.get('webbplats')) { res.writeHead(303, { location: `${origin}/tack/` }); return res.end(); }

  const falt = k => (f.get(k) ?? '').trim();
  const namn = falt('namn').slice(0, 200);
  const epost = falt('epost').slice(0, 200);
  const telefon = falt('telefon').slice(0, 50);
  const meddelande = falt('meddelande').slice(0, 10_000);
  // Meddelandet är valfritt i stegformuläret (produkt, postnummer och telefon räcker för att ringa upp)
  if (!namn || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost) || f.get('samtycke') !== 'ja') {
    return sida(res, 400, 'Något saknas', 'Fyll i namn och en giltig e-postadress, och godkänn villkoren.', origin);
  }
  const ovriga = [...f.entries()].filter(([k, v]) => !KANDA.has(k) && v.trim()).map(([k, v]) => `${k}: ${v.trim().slice(0, 500)}`);

  const kalla = `${origin}${falt('sida') || `/${falt('formular') || 'kontakt'}/`}`;
  const rader = [meddelande, '', ...ovriga, '', '--', `${namn} <${epost}>${telefon ? `, ${telefon}` : ''}`, `Skickat via ${kalla}`].filter((r, i) => i > 0 || r);

  const epostSvar = fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: `${SAJTNAMN} formulär`, email: AVSANDARE },
      to: MOTTAGARE.split(',').map(e => ({ email: e.trim() })),
      replyTo: { email: epost, name: namn },
      subject: `${SAJTNAMN}: förfrågan från ${namn}`,
      textContent: rader.join('\n').trim(),
    }),
  }).catch(e => ({ ok: false, status: 0, text: async () => e.message }));

  // Slack: samma innehåll i kanalen. Användartext escapas så att den inte kan pinga eller länka om.
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const slackSvar = SLACK_WEBHOOK ? fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text: `*Ny förfrågan från ${esc(SAJTNAMN)}*\n${esc(rader.join('\n').trim())}` }),
  }).catch(e => ({ ok: false, status: 0, text: async () => e.message })) : null;

  const [ep, sl] = await Promise.all([epostSvar, slackSvar]);
  if (!ep.ok) console.error(`Brevo svarade ${ep.status}: ${(await ep.text()).slice(0, 300)}`);
  if (sl && !sl.ok) console.error(`Slack svarade ${sl.status}: ${(await sl.text()).slice(0, 300)}`);
  // Förfrågan räknas som mottagen om minst en kanal tog emot den
  if (!ep.ok && !(sl && sl.ok)) {
    return sida(res, 502, 'Förfrågan skickades inte', 'Något gick fel hos oss. Försök igen om en stund.', origin);
  }
  res.writeHead(303, { location: `${origin}/tack/` });
  res.end();
}).listen(PORT, () => console.log(`kontakt lyssnar på ${PORT}`));
