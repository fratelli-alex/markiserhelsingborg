// Bildpipeline. Masterfilerna (PNG eller JPG) i drafts/bilder/godkanda/ serveras aldrig. Härifrån skapas
// AVIF (q50, lägre om filen annars går över budget) och WebP (q72) i bredderna 640/780/1280/1920 (aldrig större
// än originalet) och en delningsbild 1200 × 630 (JPEG). Resultatet hamnar i public/bilder/ och måtten i
// src/data/bilder.json. Filer som redan finns och är nyare än mastern görs inte om.
// Ny bild = nytt filnamn (bilderna cachas ett år).
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const KALLA = 'drafts/bilder/godkanda';
const UT = 'public/bilder';
const BREDDER = [640, 780, 1280, 1920];
mkdirSync(UT, { recursive: true });
mkdirSync(KALLA, { recursive: true });

const aktuell = (fil, master) => existsSync(fil) && statSync(fil).mtimeMs > statSync(master).mtimeMs;
const manifest = {};
let gjorda = 0;

for (const fil of readdirSync(KALLA).filter(f => /\.(png|jpe?g)$/i.test(f)).sort()) {
  const master = `${KALLA}/${fil}`;
  const namn = fil.replace(/\.\w+$/, '');
  const { width, height } = await sharp(master).metadata();
  const bredder = BREDDER.filter(b => b < width);
  if (bredder.length < BREDDER.length) bredder.push(width);
  const varianter = [];
  for (const b of bredder) {
    const h = Math.round((height * b) / width);
    for (const [format, opt] of [['avif', { quality: 50, effort: 4 }], ['webp', { quality: 72 }]]) {
      const ut = `${UT}/${namn}-${b}.${format}`;
      if (!aktuell(ut, master)) { await sharp(master).resize(b).toFormat(format, opt).toFile(ut); gjorda++; }
    }
    // Mobilen (390 px × 3) hämtar bredder upp till 1280. Detaljrika motiv (gräs, löv) kan gå över
    // LCP-budgeten på 100 kB: sänk AVIF-kvaliteten stegvis tills filen är under 95 kB.
    const avif = `${UT}/${namn}-${b}.avif`;
    for (let q = 46; b <= 1280 && q >= 34 && statSync(avif).size > 95 * 1024; q -= 4) {
      await sharp(master).resize(b).avif({ quality: q, effort: 4 }).toFile(avif); gjorda++;
    }
    // Dator hämtar de största bredderna när bilden är heltäckande bakgrund i heron (budget 200 kB).
    for (let q = 46; b > 1280 && q >= 38 && statSync(avif).size > 190 * 1024; q -= 4) {
      await sharp(master).resize(b).avif({ quality: q, effort: 4 }).toFile(avif); gjorda++;
    }
    varianter.push({ bredd: b, hojd: h, avif: statSync(`${UT}/${namn}-${b}.avif`).size, webp: statSync(`${UT}/${namn}-${b}.webp`).size });
  }
  const og = `${UT}/${namn}-og.jpg`;
  if (!aktuell(og, master)) { await sharp(master).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78, mozjpeg: true }).toFile(og); gjorda++; }
  manifest[namn] = { bredd: width, hojd: height, varianter };
}
writeFileSync('src/data/bilder.json', JSON.stringify(manifest, null, 1) + '\n');
console.log(`bilder: ${Object.keys(manifest).length} källfiler, ${gjorda} filer skapade`);
