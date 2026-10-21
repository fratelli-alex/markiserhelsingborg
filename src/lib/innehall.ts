// Sidinnehåll i src/innehall/*.md. Frontmatter styr mallen (typ), Markdown-kroppen blir brödtexten.
// En fil = en sida. Adressen står i frontmatter (url), inte i filnamnet.
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface Fraga { fraga: string; svar: string }
export interface Fakta { namn: string; varde: string }
export interface Sida {
  typ: 'tjanst' | 'guide' | 'hubb' | 'om' | 'person';
  url: string;
  titel: string; // H1
  seoTitel?: string; // <title> utan varumärket
  beskrivning: string; // 120–155 tecken
  ingress: string;
  menynamn?: string; // brödsmulor och kort
  kortText?: string; // en mening för kort på andra sidor
  bild?: string; // namn i drafts/bilder/godkanda/
  bildAlt?: string;
  produkt?: string; // förvalt i formuläret
  fakta?: Fakta[];
  fragor?: Fraga[];
  relaterade?: string[]; // url:er till andra sidor
  forfattare?: string; // nyckel i data/forfattare.ts
  publicerad?: string; // ÅÅÅÅ-MM-DD
  uppdaterad?: string;
  forelder?: string; // url, för brödsmulor (guider: /guider/)
  ordning?: number;
}
interface Modul { frontmatter: Sida; Content: AstroComponentFactory }

const moduler = import.meta.glob<Modul>('../innehall/*.md', { eager: true });
export const SIDOR: Modul[] = Object.values(moduler).sort((a, b) => (a.frontmatter.ordning ?? 99) - (b.frontmatter.ordning ?? 99));
export const sida = (url: string) => SIDOR.find(s => s.frontmatter.url === url)?.frontmatter;
export const namn = (s: Sida) => s.menynamn ?? s.titel;
