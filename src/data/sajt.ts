// Gemensamma uppgifter för hela sajten. Ändras här, inte i mallarna.
// Allt här kommer från Projektfakta i CLAUDE.md. Saknas en uppgift: lämna den tom, hitta inte på.
import { DOMAN } from './doman.mjs';

export const SAJT = {
  namn: 'Markiser Helsingborg',
  doman: DOMAN,
  url: import.meta.env.SITE.replace(/\/$/, ''), // från astro.config.mjs (SITE_URL)
  bolag: '', // juridiskt namn
  orgnr: '',
  telefon: '', // visningsform, t.ex. '042-12 34 56'. Tom = ingen telefon på sajten
  ga4: '', // befintligt id behålls för historikens skull
  kontaktUrl: process.env.KONTAKT_URL ?? '', // kontakttjänsten (tjanster/kontakt)
  // Tillfällig adress: NOINDEX=1. Tas bort på switch-dagen.
  noindex: process.env.NOINDEX === '1',
};

// Huvudmenyn. Ordningen styr menyn.
export const MENY: { url: string; namn: string }[] = [
  { url: '/kontakt/', namn: 'Kontakt' },
];

// Telefonnummer i tel:-format (+46...)
export const telLank = (t: string) => 'tel:' + t.replace(/[^\d+]/g, '').replace(/^0/, '+46');

// Verksamhet med riktig adress på orten: fyll i, så blir organisationen LocalBusiness (se lib/schema.ts).
// Lämna undefined när det inte finns någon (t.ex. lead-gen utan lokal närvaro).
export const LOKAL: import('../lib/schema').Lokal | undefined = undefined;
// Organisationens profiler (Google-företagsprofil, sociala kanaler, moderbolagets sajt)
export const SAME_AS: string[] = [];
