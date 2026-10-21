// Länkar i brödtext (Markdown):
//  - externa länkar öppnas i ny flik med rel="noopener", och på sponsrade artiklar rel="sponsored noopener"
//  - pilen ↗ hamnar på samma rad som sista ordet: sista ordet och pilen läggs i <span class="nw">
//  - en dold text säger att länken öppnas i ny flik
import { DOMAN } from '../data/doman.mjs';
const INTERN = new RegExp(`^(/|#|https?://(www\\.)?${DOMAN.replace(/\./g, '\\.')})`);

function sistaText(nod) {
  for (let i = nod.children.length - 1; i >= 0; i--) {
    const b = nod.children[i];
    if (b.type === 'text' && b.value.trim()) return { foralder: nod, index: i };
    if (b.children) { const t = sistaText(b); if (t) return t; }
  }
  return null;
}

function besok(nod, sponsrad) {
  if (nod.type === 'element' && nod.tagName === 'a') {
    const href = String(nod.properties?.href ?? '');
    if (/^https?:\/\//.test(href) && !INTERN.test(href)) {
      nod.properties.target = '_blank';
      nod.properties.rel = sponsrad ? ['sponsored', 'noopener'] : ['noopener'];
      const t = sistaText(nod);
      if (t) {
        const text = t.foralder.children[t.index];
        const m = text.value.match(/^([\s\S]*?)(\S+)(\s*)$/);
        // Långa ord (t.ex. en utskriven adress) får brytas: bara de sista tecknen hänger ihop med pilen
        let fore = m[1], sista = m[2];
        if (sista.length > 20) { fore += sista.slice(0, -8); sista = sista.slice(-8); }
        const span = { type: 'element', tagName: 'span', properties: { className: ['nw'] }, children: [
          { type: 'text', value: sista + ' ' },
          { type: 'element', tagName: 'span', properties: { className: ['extern-pil'], ariaHidden: 'true' }, children: [{ type: 'text', value: '↗' }] },
        ] };
        t.foralder.children.splice(t.index, 1, ...(fore ? [{ type: 'text', value: fore }] : []), span);
      }
      nod.children.push({ type: 'element', tagName: 'span', properties: { className: ['sr'] }, children: [{ type: 'text', value: ' (öppnas i ny flik)' }] });
    }
    return;
  }
  if (nod.children) for (const b of nod.children) besok(b, sponsrad);
}

export default function rehypeLankar() {
  return (trad, fil) => besok(trad, Boolean(fil.data?.astro?.frontmatter?.sponsrad));
}
