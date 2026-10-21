// npm run kontroll: granskar det byggda resultatet i dist/ som en besökare och en sökmotor ser det.
// FEL fäller kontrollen (exit 1). VARNING är kända restpunkter på den tillfälliga adressen.
// Ett publiceringsbygge (utan NOINDEX=1) är strängare: det som är varning på tillfällig adress blir fel.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';
import { FORBJUDNA } from '../src/data/forbjudna-fraser.mjs';

const NOINDEX = process.env.NOINDEX === '1';
const LIVE = !NOINDEX;
const DIST = 'dist';
const BUDGET = { mobil: 100 * 1024, dator: 200 * 1024 };
// Sidor som alltid har noindex
const ALLTID_NOINDEX = /^\/(404|tack|mallprov)\//;
const fel = [], varningar = [];
const F = (sida, t) => fel.push(`${sida}: ${t}`);
const V = (sida, t) => (LIVE ? fel : varningar).push(`${sida}: ${t}`);
const V2 = (sida, t) => varningar.push(`${sida}: ${t}`); // alltid bara varning

if (!existsSync(DIST)) { console.error('dist/ saknas. Kör npm run build först.'); process.exit(1); }

function htmlFiler(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiler(p) : f.endsWith('.html') ? [p] : [];
  });
}
const filer = htmlFiler(DIST);
const sokvag = f => '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '/');
const finns = new Set(filer.map(sokvag));
// 404-regeln längst ner (/* /404.html 404) är ingen omdirigering och får inte godkänna trasiga länkar
const redirects = new Map(readFileSync(join(DIST, '_redirects'), 'utf8').split('\n').filter(r => r && !r.startsWith('#') && !r.endsWith(' 404')).map(r => r.split(' ')));
const wildcard = [...redirects.keys()].filter(k => k.includes('*')).map(k => k.replace('*', ''));
const loser = p => finns.has(p) || redirects.has(p) || wildcard.some(w => p.startsWith(w)) || existsSync(join(DIST, decodeURI(p)));

// sizes-uttryck -> CSS-bredd för en viss skärmbredd
function storlek(sizes, vw) {
  for (const del of sizes.split(',').map(s => s.trim())) {
    const m = del.match(/^\(max-width:\s*(\d+)px\)\s+(.+)$/);
    const varde = m ? (vw <= Number(m[1]) ? m[2] : null) : del;
    if (!varde) continue;
    const calc = varde.match(/calc\(100vw\s*-\s*(\d+)px\)/);
    if (calc) return vw - Number(calc[1]);
    if (varde.endsWith('vw')) return (vw * parseFloat(varde)) / 100;
    return parseFloat(varde);
  }
  return vw;
}
function valdKandidat(srcset, behov) {
  const k = srcset.split(',').map(s => s.trim().split(' ')).map(([url, w]) => ({ url, w: parseInt(w) })).sort((a, b) => a.w - b.w);
  return k.find(x => x.w >= behov) ?? k.at(-1);
}

const titlar = new Map(), beskrivningar = new Map();
let lcpMax = { mobil: 0, dator: 0 };
const sm = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';

for (const fil of filer) {
  const sida = sokvag(fil);
  const html = readFileSync(fil, 'utf8');
  const { document } = parseHTML(html);
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const skaNoindex = NOINDEX || ALLTID_NOINDEX.test(sida);
  if (skaNoindex !== robots.includes('noindex')) F(sida, `robots är "${robots}"`);
  if (LIVE && sida.startsWith('/mallprov/')) F(sida, 'mallprovet får inte finnas i ett publiceringsbygge');

  // Titel, beskrivning, H1, kanonisk adress
  const h1 = document.querySelectorAll('h1');
  if (h1.length !== 1) F(sida, `${h1.length} st H1`);
  const titel = document.querySelector('title')?.textContent ?? '';
  if (!titel) F(sida, 'titel saknas');
  else if (titel.length > 60) V(sida, `titeln är ${titel.length} tecken (högst 60)`);
  const besk = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!besk) V(sida, 'metabeskrivning saknas');
  else if (!ALLTID_NOINDEX.test(sida) && (besk.length < 120 || besk.length > 155)) V2(sida, `metabeskrivningen är ${besk.length} tecken (120–155)`);
  if (!ALLTID_NOINDEX.test(sida)) {
    if (titel) titlar.set(titel, [...(titlar.get(titel) ?? []), sida]);
    if (besk) beskrivningar.set(besk, [...(beskrivningar.get(besk) ?? []), sida]);
    if (sm && !sm.includes(`${sida}</loc>`)) F(sida, 'saknas i sitemapen');
  }
  const kanon = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (!kanon || !kanon.endsWith(sida)) F(sida, `kanonisk adress "${kanon}"`);

  // JSON-LD: tolkbar, och inga egna omdömen för den egna organisationen (Google godtar inte självrefererande)
  for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const ld = JSON.parse(s.textContent);
      const noder = ld['@graph'] ?? [ld];
      for (const n of noder) {
        const typ = [].concat(n['@type'] ?? []);
        if (typ.some(t => /Organization|LocalBusiness|Service/.test(t)) && (n.aggregateRating || n.review)) F(sida, `${typ.join('/')} har aggregateRating eller review i JSON-LD`);
      }
    } catch { F(sida, 'JSON-LD går inte att läsa'); }
  }

  // Publik text
  const main = document.querySelector('main');
  const text = document.body.textContent ?? '';
  if (/lorem ipsum|\bTODO\b|\[[A-ZÅÄÖ][A-ZÅÄÖ .\-]{3,}\]/.test(text)) V(sida, 'platshållartext (lorem, TODO eller [HAKPARENTES]) på sidan');
  if (/\]\((\/|https?:)/.test(main?.textContent ?? '')) F(sida, 'rå Markdown-länk i texten');
  if (text.includes('—')) F(sida, 'långt tankstreck (—) i texten');
  const liten = text.toLowerCase();
  for (const fras of FORBJUDNA) if (liten.includes(fras)) V(sida, `förbjuden fras: "${fras}"`);

  // Bilder: mått, alt, lat laddning och budget för LCP-bilden
  for (const img of document.querySelectorAll('img')) {
    if (!img.getAttribute('width') || !img.getAttribute('height')) F(sida, `bild utan width/height: ${img.getAttribute('src')}`);
    if (!img.hasAttribute('alt')) F(sida, `bild utan alt: ${img.getAttribute('src')}`);
    const prio = img.getAttribute('fetchpriority') === 'high';
    if (!prio && img.getAttribute('loading') !== 'lazy' && img.closest('main')) F(sida, `bild utan loading="lazy": ${img.getAttribute('src')}`);
    const avif = img.closest('picture')?.querySelector('source[type="image/avif"]');
    if (prio && avif) {
      const sizes = avif.getAttribute('sizes');
      for (const [lage, vw, dpr] of [['mobil', 390, 3], ['dator', 1280, 2]]) {
        const k = valdKandidat(avif.getAttribute('srcset'), storlek(sizes, vw) * dpr);
        const b = statSync(join(DIST, k.url)).size;
        lcpMax[lage] = Math.max(lcpMax[lage], b);
        if (b > BUDGET[lage]) F(sida, `LCP-bild i ${lage} är ${Math.round(b / 1024)} kB (${k.url}), budget ${BUDGET[lage] / 1024} kB`);
      }
    }
  }
  if (document.querySelectorAll('img[fetchpriority="high"]').length > 1) F(sida, 'fler än en bild med hög prioritet');

  // Länkar
  for (const a of document.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (href.startsWith('/')) {
      const p = href.split('#')[0].split('?')[0];
      if (!p.endsWith('/') && !/\.\w+$/.test(p)) F(sida, `intern länk utan avslutande snedstreck: ${href}`);
      else if (!loser(p)) V(sida, `intern länk till sida som inte finns: ${href}`);
      else if (redirects.has(p)) V2(sida, `intern länk går via omdirigering: ${href} -> ${redirects.get(p)}`);
    } else if (/^https?:/.test(href)) {
      const rel = (a.getAttribute('rel') ?? '').split(' ');
      if (a.getAttribute('target') !== '_blank' || !rel.includes('noopener')) F(sida, `extern länk öppnas inte i ny flik: ${href}`);
      if (!a.querySelector('.nw, .extern-pil') && !a.classList.contains('knapp')) F(sida, `extern länk utan pil på samma rad som sista ordet: ${href}`);
    } else if (href.startsWith('tel:') && !/^tel:\+46\d{6,}$/.test(href)) F(sida, `telefonlänk i fel format (ska vara tel:+46…): ${href}`);
  }

  // Formulär: postar till kontakttjänsten, har robotfälla och samtycke
  for (const form of document.querySelectorAll('form[data-kontakt]')) {
    if (!form.getAttribute('action')) V(sida, 'formuläret saknar action (KONTAKT_URL är inte satt)');
    if (!form.querySelector('[name="webbplats"]')) F(sida, 'formuläret saknar robotfällan "webbplats"');
    if (!form.querySelector('input[type="checkbox"][required]')) F(sida, 'formuläret saknar obligatorisk samtyckesruta');
  }
}

for (const [namn, karta] of [['titel', titlar], ['metabeskrivning', beskrivningar]]) {
  for (const [v, sidor] of karta) if (sidor.length > 1) F(sidor.join(', '), `samma ${namn}: "${v.slice(0, 60)}"`);
}

// Sitemap och _redirects
if (!sm) F('/sitemap-0.xml', 'saknas');
if (/\/(tack|mallprov|404)\//.test(sm)) F('/sitemap-0.xml', 'innehåller sidor med noindex');
const sistaRegel = readFileSync(join(DIST, '_redirects'), 'utf8').trim().split('\n').at(-1);
if (sistaRegel !== '/* /404.html 404') F('/_redirects', 'sista regeln ska vara /* /404.html 404 (annars blir saknade sidor mjuka 404)');
const hdr = readFileSync(join(DIST, '_headers'), 'utf8');
if (NOINDEX !== hdr.includes('X-Robots-Tag: noindex')) F('/_headers', 'X-Robots-Tag stämmer inte med NOINDEX');

// Sammanfattning
const grupp = l => Object.entries(l.reduce((a, r) => { const k = r.replace(/^[^:]+: /, '').replace(/: .*$/, '').replace(/\d+/g, 'N'); (a[k] ||= []).push(r); return a; }, {}));
console.log(`\nKontroll av dist/ (${NOINDEX ? 'tillfällig adress, NOINDEX' : 'PUBLICERING'}): ${filer.length} sidor`);
console.log(`LCP-bild, största: mobil ${Math.round(lcpMax.mobil / 1024)} kB (budget 100), dator ${Math.round(lcpMax.dator / 1024)} kB (budget 200)`);
for (const [namn, lista] of [['VARNINGAR', varningar], ['FEL', fel]]) {
  console.log(`\n${namn}: ${lista.length}`);
  for (const [typ, rader] of grupp(lista)) {
    console.log(`  ${rader.length} × ${typ}`);
    for (const r of rader.slice(0, 3)) console.log(`      ${r}`);
  }
}
process.exit(fel.length ? 1 : 0);
