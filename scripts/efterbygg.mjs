// Körs efter astro build. Skriver dist/_redirects och dist/_headers (Sevalla läser dem i Cloudflare Pages-format)
// och robots.txt, och tar bort mallprov från publiceringsbyggen.
// Omdirigeringarna kommer från research/redirectkarta.csv (fran,till,kod). Ändra i CSV:n, inte i dist.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { DOMAN } from '../src/data/doman.mjs';

const NOINDEX = process.env.NOINDEX === '1';
const SITE = (process.env.SITE_URL || `https://${DOMAN}`).replace(/\/$/, '');
const KARTA = 'research/redirectkarta.csv';
const koda = p => encodeURI(decodeURI(p));

const rader = existsSync(KARTA)
  ? readFileSync(KARTA, 'utf8').trim().split('\n').slice(1).filter(Boolean).map(r => [...r.matchAll(/(?:^|,)("[^"]*"|[^,]*)/g)].map(m => m[1]))
  : [];
const regler = [`# Genereras av scripts/efterbygg.mjs från ${KARTA}. Ändra i CSV:n.`,
  // www till domänen utan www (båda läggs till som domäner på samma Sevalla-sajt; ! = även adresser som har en fil)
  `https://www.${DOMAN}/* https://${DOMAN}/:splat 301!`];
const ejStodda = [];
for (const [fran, till, kod] of rader) {
  // 410 stöds inte i _redirects: sidan ger 404
  if (kod !== '301') { ejStodda.push(`${fran} (${kod})`); continue; }
  const f = koda(fran);
  regler.push(`${f} ${till} 301`);
  // Samma adress utan avslutande snedstreck, så att gamla länkar inte tar två steg
  if (f.endsWith('/') && !f.includes('*')) regler.push(`${f.slice(0, -1)} ${till} 301`);
}

// Adresser utan avslutande snedstreck sköts av Sevallas inställning "Pretty URLs" (måste vara på), som svarar 301
// till adressen med snedstreck.
// Sista regeln: allt som inte finns får 404-sidan med statuskod 404 (annars svarar Sevalla 200, en mjuk 404)
regler.push('/* /404.html 404');
writeFileSync('dist/_redirects', regler.join('\n') + '\n');

const headers = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  ...(NOINDEX ? ['  X-Robots-Tag: noindex, nofollow'] : []),
  '/_astro/*',
  '  Cache-Control: public, max-age=31536000, immutable',
  // Bilderna cachas hårt: ny bild = nytt filnamn
  '/bilder/*',
  '  Cache-Control: public, max-age=31536000, immutable',
];
writeFileSync('dist/_headers', headers.join('\n') + '\n');

writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap-index.xml\n`);
if (!NOINDEX) rmSync('dist/mallprov', { recursive: true, force: true });
console.log(`efterbygg: ${regler.length - 3} omdirigeringar från kartan, ${ejStodda.length} ej i _redirects${ejStodda.length ? ` (${ejStodda.join(', ')})` : ''}, NOINDEX=${NOINDEX ? 'på' : 'av'}`);
