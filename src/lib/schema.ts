// JSON-LD. En @graph per sida. Organisationen och WebSite finns på alla sidor och refereras med @id.
// Aldrig aggregateRating eller review för den egna organisationen (Google godtar inte självrefererande omdömen).
// npm run kontroll fäller bygget om det händer.
import { SAJT, LOKAL, SAME_AS } from '../data/sajt';
import { FORFATTARE, forfattarUrl } from '../data/forfattare';
import type { Smula } from '../components/Brodsmulor.astro';

const abs = (url: string) => (url.startsWith('http') ? url : SAJT.url + url);
export const ORG_ID = `${SAJT.url}/#organisation`;
const WEB_ID = `${SAJT.url}/#webbplats`;
const iso = (d: Date) => d.toISOString().slice(0, 10);

// Organisationen. LocalBusiness (eller en mer specifik typ) bara när det finns en riktig verksamhet med adress
// på orten; annars Organization och areaServed på tjänsterna.
export interface Lokal {
  typ: string; // t.ex. 'HomeAndConstructionBusiness'
  adress: { gata: string; postnr: string; ort: string };
  geo?: { lat: number; lng: number };
  oppettider?: { dagar: string[]; oppnar: string; stanger: string }[];
}
export function grund(lokal?: Lokal, sameAs: string[] = []) {
  const org = {
    '@type': lokal ? lokal.typ : 'Organization', '@id': ORG_ID, name: SAJT.namn, url: SAJT.url + '/',
    ...(SAJT.bolag ? { legalName: SAJT.bolag } : {}),
    ...(SAJT.orgnr ? { taxID: SAJT.orgnr } : {}),
    ...(SAJT.telefon ? { telephone: SAJT.telefon } : {}),
    logo: { '@type': 'ImageObject', url: abs('/apple-touch-icon.png'), width: 180, height: 180 },
    ...(sameAs.length ? { sameAs } : {}),
    ...(lokal ? {
      address: { '@type': 'PostalAddress', streetAddress: lokal.adress.gata, postalCode: lokal.adress.postnr, addressLocality: lokal.adress.ort, addressCountry: 'SE' },
      ...(lokal.geo ? { geo: { '@type': 'GeoCoordinates', latitude: lokal.geo.lat, longitude: lokal.geo.lng } } : {}),
      ...(lokal.oppettider ? { openingHoursSpecification: lokal.oppettider.map(o => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: o.dagar, opens: o.oppnar, closes: o.stanger })) } : {}),
    } : {}),
  };
  return [org, { '@type': 'WebSite', '@id': WEB_ID, name: SAJT.namn, url: SAJT.url + '/', inLanguage: 'sv-SE', publisher: { '@id': ORG_ID } }];
}

export function brodsmulor(smulor: Smula[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: smulor.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.namn, ...(s.url ? { item: abs(s.url) } : {}) })),
  };
}

// Tjänst. Pris bara när det kommer från kunden, aldrig påhittat.
export function tjanst(o: { url: string; namn: string; beskrivning: string; orter?: string[]; pris?: { fran: number; valuta?: string } }) {
  return {
    '@type': 'Service', '@id': abs(o.url) + '#tjanst', name: o.namn, description: o.beskrivning, url: abs(o.url),
    provider: { '@id': ORG_ID },
    ...(o.orter?.length ? { areaServed: o.orter.map(n => ({ '@type': 'City', name: n })) } : {}),
    ...(o.pris ? { offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: o.pris.fran, priceCurrency: o.pris.valuta ?? 'SEK' } } } : {}),
  };
}

export function forfattare(nyckel?: string) {
  const f = nyckel ? FORFATTARE[nyckel] : undefined;
  if (!f) return { '@id': ORG_ID };
  return { '@type': 'Person', '@id': abs(forfattarUrl(nyckel!)) + '#person', name: f.namn, jobTitle: f.roll, url: abs(forfattarUrl(nyckel!)), worksFor: { '@id': ORG_ID }, ...(f.foto ? { image: abs(`/bilder/${f.foto}-640.webp`) } : {}), ...(f.epost ? { email: f.epost } : {}), ...(f.sameAs ? { sameAs: f.sameAs } : {}) };
}

export function artikel(o: { url: string; titel: string; beskrivning?: string; publicerad: Date; uppdaterad: Date; forfattare?: string; bild?: string }) {
  return {
    '@type': 'Article', '@id': abs(o.url) + '#artikel', mainEntityOfPage: abs(o.url), headline: o.titel,
    ...(o.beskrivning ? { description: o.beskrivning } : {}),
    datePublished: iso(o.publicerad), dateModified: iso(o.uppdaterad),
    author: forfattare(o.forfattare), publisher: { '@id': ORG_ID }, inLanguage: 'sv-SE',
    ...(o.bild ? { image: abs(o.bild) } : {}),
  };
}

// Genereras från samma lista som den synliga FAQ:n, aldrig handskriven
export function faq(fragor: { fraga: string; svar: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: fragor.map(f => ({ '@type': 'Question', name: f.fraga, acceptedAnswer: { '@type': 'Answer', text: f.svar } })),
  };
}

export const graf = (...noder: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': [...grund(LOKAL, SAME_AS), ...noder] });
