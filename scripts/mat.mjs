// npm run mat: mäter alla sidor i dist/ som besökaren ser dem, i 360, 390 och 1280 px, i en headless webbläsare.
// Rapporterar ensamma ord på sista raden och innehåll utanför sidan (sidoscroll). Kör efter npm run build.
// Webbläsaren: Chrome eller Edge som redan finns på datorn. Hittas den inte, sätt MAT_WEBBLASARE till sökvägen.
// Startar med egen profil i temp och --mute-audio, och stänger bara sin egen process.
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync, mkdtempSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright-core';

const DIST = 'dist';
const BREDDER = [360, 390, 1280];
const TYPER = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

function htmlFiler(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiler(p) : f === 'index.html' ? [p] : [];
  });
}
const sidor = htmlFiler(DIST).map(f => '/' + f.slice(DIST.length + 1).replace(/index\.html$/, ''));

// Liten statisk server för dist/
const server = createServer((req, res) => {
  let p = join(DIST, decodeURI(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPER[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(0);
const bas = `http://127.0.0.1:${server.address().port}`;

const kandidater = [
  process.env.MAT_WEBBLASARE,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/opt/pw-browsers/chromium',
].filter(Boolean);
const executablePath = kandidater.find(k => existsSync(k));
if (!executablePath) { console.error('Hittar ingen Chrome/Edge. Sätt MAT_WEBBLASARE.'); process.exit(1); }
const profil = mkdtempSync(join(tmpdir(), 'mat-'));
const ctx = await chromium.launchPersistentContext(profil, { executablePath, headless: true, args: ['--mute-audio'] });
const sida = ctx.pages()[0] ?? await ctx.newPage();

// Körs i sidan: ensamma ord på sista raden och element utanför sidan
function matSida() {
  const ensamma = [];
  for (const el of document.querySelectorAll('main p, main li, main h1, main h2, main h3, main h4, main summary, main td, main th, main .knapp, footer p, footer li')) {
    if (!el.offsetParent || el.closest('.sr')) continue;
    if (el.textContent.trim().split(/\s+/).length < 2) continue;
    const r = document.createRange(); r.selectNodeContents(el);
    const rader = [...new Set([...r.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.bottom)))].sort((a, b) => a - b);
    if (rader.length < 2) continue;
    const sista = rader.at(-1), ord = [];
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) {
      const n = tw.currentNode;
      if (n.parentElement.closest('.sr')) continue;
      const re = /\S+/g; let m;
      while ((m = re.exec(n.data))) {
        const rr = document.createRange(); rr.setStart(n, m.index); rr.setEnd(n, m.index + m[0].length);
        const b = rr.getBoundingClientRect();
        if (b.width && Math.abs(Math.round(b.bottom) - sista) <= 3) ord.push(m[0]);
      }
    }
    if (ord.length === 1 && ord[0].length > 1 && !/^[↗+−-]$/.test(ord[0])) ensamma.push(el.tagName + ': …' + el.textContent.trim().slice(-50));
  }
  const utanfor = [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.width && b.right > innerWidth + 1 && !e.closest('.tabell-wrap, .sr'); })
    .slice(0, 4).map(e => e.tagName + '.' + e.className);
  return { ensamma, utanfor, sidoscroll: document.documentElement.scrollWidth > document.documentElement.clientWidth };
}

let antalFel = 0;
for (const bredd of BREDDER) {
  await sida.setViewportSize({ width: bredd, height: 900 });
  for (const u of sidor) {
    await sida.goto(bas + u, { waitUntil: 'load' });
    await sida.evaluate(() => document.fonts.ready);
    const r = await sida.evaluate(matSida);
    if (r.ensamma.length || r.utanfor.length || r.sidoscroll) {
      antalFel++;
      console.log(`${bredd} px ${u}`);
      for (const e of r.ensamma) console.log(`   ensamt ord  ${e}`);
      if (r.sidoscroll) console.log(`   sidoscroll  ${r.utanfor.join(', ')}`);
      else for (const e of r.utanfor) console.log(`   utanför     ${e}`);
    }
  }
}
await ctx.close();
server.close();
console.log(`\nmat: ${sidor.length} sidor × ${BREDDER.join('/')} px, ${antalFel} med fel`);
process.exit(antalFel ? 1 : 0);
