// Inga ensamma ord på sista raden: de två sista orden i varje textblock binds ihop med ett hårt
// mellanslag, om de tillsammans är högst 34 tecken (annars kan raden bli för lång i mobilen).
// text-wrap: pretty finns kvar i CSS men räcker inte i alla webbläsare.
const BLOCK = new Set(['p', 'li', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'summary', 'figcaption', 'dd', 'dt', 'blockquote']);
const HOPPA = new Set(['ul', 'ol', 'table', 'p', 'div', 'pre', 'code', 'details']);
const MAX = 34; // 34 tecken i 17 px ≈ 300 px, ryms i mobilens 358 px
// Tabellceller är smala i mobilen: där binds bara korta par, annars blir kolumnen bredare än skärmen
const MAX_CELL = 24;

// Textnoderna i blockets egen löptext, i ordning (nästlade listor och tabeller räknas inte)
function textnoder(nod, ut = []) {
  for (const b of nod.children ?? []) {
    if (b.type === 'text') ut.push(b);
    else if (b.type === 'element' && !HOPPA.has(b.tagName) && !(b.properties?.className ?? []).includes('sr')) textnoder(b, ut);
  }
  return ut;
}

// Bindestreck i sista ordet ("Sachsen-Lauenburg") får inte bli en radbrytning: ordfogning (U+2060) efter strecket
function fogaSista(nod, ord) {
  if (!nod || !ord.includes('-')) return;
  const i = nod.value.lastIndexOf(ord);
  if (i >= 0) nod.value = nod.value.slice(0, i) + ord.replace(/-(?=\S)/g, '-\u2060') + nod.value.slice(i + ord.length);
}

function bind(block) {
  const noder = textnoder(block);
  if (/^h[1-6]$/.test(block.tagName)) return bindRubrik(block, noder);
  const hel = noder.map(n => n.value).join('').replace(/\s+$/, '');
  const m = hel.match(/(\S+)(\s+)(\S+)$/);
  const max = block.tagName === 'td' || block.tagName === 'th' ? MAX_CELL : MAX;
  if (!m || m[1].length + m[3].length + 1 > max || m[2].includes(' ')) return;
  // Hitta mellanslaget före sista ordet och byt det mot ett hårt mellanslag
  let pos = hel.length - m[3].length - m[2].length;
  for (const n of noder) {
    if (pos < n.value.length) { n.value = n.value.slice(0, pos) + ' ' + n.value.slice(pos + m[2].length).replace(/^\s+/, ''); fogaSista(noder.at(-1), m[3]); return; }
    pos -= n.value.length;
  }
}

// Tal och enhet skiljs aldrig åt (samma regel som enheter() i text.ts)
const ENHET = /(\d) (kg|g|cm|mm|m|kr|år|månader|veckor|dagar|timmar|%|°C)(?=$|[\s.,;:!?)])/g;
// Intervall (1851–1926, 3–5 år) bryts inte efter tankstrecket: ordfogning (U+2060) efter strecket
const INTERVALL = /(\d)–(?=\d)/g;
function enheter(nod) {
  if (nod.type === 'text') nod.value = nod.value.replace(ENHET, '$1\u00a0$2').replace(INTERVALL, '$1–\u2060');
  for (const b of nod.children ?? []) enheter(b);
}

// Rubriker: de två sista orden läggs i <span class="nw"> med vanligt mellanslag, så att Astros rubrik-id
// (som räknas fram från texten efter våra regler) får bindestreck mellan orden.
function bindRubrik(block, noder) {
  const sista = noder.at(-1);
  const m = sista?.value.match(/^([\s\S]*?)(\S+\s+\S+)(\s*)$/);
  if (!m || m[2].length > MAX) return;
  const foralder = hittaForalder(block, sista);
  if (!foralder) return;
  const i = foralder.children.indexOf(sista);
  foralder.children.splice(i, 1,
    ...(m[1] ? [{ type: 'text', value: m[1] }] : []),
    { type: 'element', tagName: 'span', properties: { className: ['nw'] }, children: [{ type: 'text', value: m[2] }] },
    ...(m[3] ? [{ type: 'text', value: m[3] }] : []));
}
function hittaForalder(nod, mal) {
  for (const b of nod.children ?? []) { if (b === mal) return nod; const f = hittaForalder(b, mal); if (f) return f; }
  return null;
}

function besok(nod) {
  if (nod.type === 'element' && BLOCK.has(nod.tagName)) bind(nod);
  for (const b of nod.children ?? []) besok(b);
}

export default function rehypeEnsamma() {
  return trad => { enheter(trad); besok(trad); };
}
