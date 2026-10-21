// Samma regel som rehype-ensamma.mjs, för text i mallarna (rubriker, ingresser, kort):
// de två sista orden binds ihop med ett hårt mellanslag om de tillsammans är högst 34 tecken.
// Tal och enhet skiljs aldrig åt (6,4 kg, 100–150 cm, 2 449 kr).
export const enheter = (t: string) => t.replace(/(\d) (kg|g|cm|mm|m|kr|år|månader|veckor|dagar|timmar|%|°C)(?=$|[\s.,;:!?)])/g, '$1\u00a0$2').replace(/(\d)–(?=\d)/g, '$1–\u2060');

export function ihop(text?: string) {
  if (!text) return text;
  const t = enheter(text.trim());
  const m = t.match(/^([\s\S]*\S)\s+(\S+)$/);
  if (!m) return t;
  const forra = m[1].split(/\s/).at(-1)!;
  if (forra.length + m[2].length + 1 > 34) return t;
  // Webbläsaren bryter annars efter bindestreck inne i ordet ("Lära-gå-|vagn"): ordfogning (U+2060) efter varje bindestreck
  const fog = (o: string) => o.replace(/-(?=\S)/g, '-\u2060');
  return `${m[1].slice(0, -forra.length)}${fog(forra)} ${fog(m[2])}`;
}
