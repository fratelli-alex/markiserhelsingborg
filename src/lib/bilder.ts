import manifest from '../data/bilder.json';

export interface Variant { bredd: number; hojd: number; avif: number; webp: number }
export interface Master { bredd: number; hojd: number; varianter: Variant[] }

export function bild(namn: string): Master {
  const m = (manifest as Record<string, Master>)[namn];
  if (!m) throw new Error(`Bilden "${namn}" finns inte i drafts/bilder/godkanda/. Kör npm run bilder.`);
  return m;
}
export const srcset = (namn: string, format: 'avif' | 'webp') =>
  bild(namn).varianter.map(v => `/bilder/${namn}-${v.bredd}.${format} ${v.bredd}w`).join(', ');
export const ogBild = (namn: string) => `/bilder/${namn}-og.jpg`;
export const harBild = (namn: string) => namn in (manifest as Record<string, Master>);
