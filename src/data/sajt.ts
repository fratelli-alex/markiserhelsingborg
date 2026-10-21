// Gemensamma uppgifter för hela sajten. Ändras här, inte i mallarna.
// Allt här kommer från Projektfakta i CLAUDE.md. Saknas en uppgift: lämna den tom, hitta inte på.
import { DOMAN } from './doman.mjs';

export const SAJT = {
  namn: 'Markiser Helsingborg',
  doman: DOMAN,
  url: import.meta.env.SITE.replace(/\/$/, ''), // från astro.config.mjs (SITE_URL)
  bolag: 'Markisbyrån Sverige AB', // juridiskt namn
  orgnr: '559470-6668',
  telefon: '0431-199 77', // visningsform, t.ex. '042-12 34 56'. Tom = ingen telefon på sajten
  ga4: '', // befintligt id behålls för historikens skull
  kontaktUrl: process.env.KONTAKT_URL ?? '', // kontakttjänsten (tjanster/kontakt)
  // Tillfällig adress: NOINDEX=1. Tas bort på switch-dagen.
  noindex: process.env.NOINDEX === '1',
};

// Huvudmenyn. Ordningen styr menyn.
export const MENY: { url: string; namn: string }[] = [
  { url: '/solskydd-helsingborg/', namn: 'Solskydd' },
  { url: '/terrassmarkiser/', namn: 'Terrassmarkiser' },
  { url: '/markisvav/', namn: 'Markisväv' },
  { url: '/service-och-reparation/', namn: 'Service' },
  { url: '/guider/', namn: 'Guider' },
  { url: '/om-oss/', namn: 'Om oss' },
];

// Sidfotens kolumner: alla produktsidor, så att varje sida nås med en länk
export const SIDFOT: { rubrik: string; lankar: { url: string; namn: string }[] }[] = [
  { rubrik: 'Markiser', lankar: [
    { url: '/terrassmarkiser/', namn: 'Terrassmarkiser' },
    { url: '/fonstermarkiser/', namn: 'Fönstermarkiser' },
    { url: '/vertikalmarkiser/', namn: 'Vertikalmarkiser' },
    { url: '/balkongmarkiser/', namn: 'Balkongmarkiser' },
    { url: '/pergolamarkiser/', namn: 'Pergolamarkiser' },
    { url: '/korgmarkiser/', namn: 'Korgmarkiser' },
    { url: '/markisoletter/', namn: 'Markisoletter' },
    { url: '/markisvav/', namn: 'Markisväv' },
  ] },
  { rubrik: 'Inomhus', lankar: [
    { url: '/persienner/', namn: 'Persienner' },
    { url: '/trapersienner/', namn: 'Träpersienner' },
    { url: '/rullgardiner/', namn: 'Rullgardiner' },
    { url: '/plissegardiner/', namn: 'Plisségardiner' },
    { url: '/lamellgardiner/', namn: 'Lamellgardiner' },
  ] },
  { rubrik: 'Mer', lankar: [
    { url: '/solskydd-for-foretag/', namn: 'Solskydd för företag' },
    { url: '/service-och-reparation/', namn: 'Service och reparation' },
    { url: '/guider/', namn: 'Guider' },
    { url: '/om-oss/', namn: 'Om oss' },
    { url: '/kontakt/', namn: 'Kontakt' },
  ] },
];

// Telefonnummer i tel:-format (+46...)
export const telLank = (t: string) => 'tel:' + t.replace(/[^\d+]/g, '').replace(/^0/, '+46');

// Verksamhet med riktig adress på orten: fyll i, så blir organisationen LocalBusiness (se lib/schema.ts).
// Lämna undefined när det inte finns någon (t.ex. lead-gen utan lokal närvaro).
export const LOKAL: import('../lib/schema').Lokal | undefined = undefined;
// Organisationens profiler (Google-företagsprofil, sociala kanaler, moderbolagets sajt)
export const SAME_AS: string[] = [];

// Arbetsgången, samma på alla sidor (startsidan och tjänstesidorna)
export const STEG: [string, string][] = [
  ['Du skickar en förfrågan', 'Berätta vad du är intresserad av. Mått behövs inte.'],
  ['Vi ringer upp samma dag', 'och bokar en tid för hembesök som passar dig.'],
  ['Hembesöket', 'Vi mäter, tittar på fasaden och hur solen ligger. Du väljer väv från riktiga prover.'],
  ['Offert', 'Du får ett skriftligt förslag. Inget är bindande innan du har sagt ja.'],
  ['Montering', 'Vi monterar på den tid vi har kommit överens om.'],
];
export const BOCKAR = ['Hembesök utan kostnad', 'Svensktillverkat av Hestra', 'Väv från Sandatex'];
export const OMRADEN = ['Centrum', 'Norr', 'Tågaborg', 'Olympia', 'Ramlösa', 'Råå', 'Påarp', 'Rydebäck', 'Hittarp', 'Laröd', 'Domsten', 'Ödåkra', 'Mörarp', 'Allerum', 'Kattarp', 'Bårslöv'];
