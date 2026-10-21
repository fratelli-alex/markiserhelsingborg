# astro-startmall

Startpunkt för byråns statiska Astro-sajter. Bygger på det som fungerade på Barnkollen.se (oktober 2026),
utan Barnkollens affiliatedelar.

## Kom igång

1. Skapa repot från mallen och klona det (eller kopiera mappen och kör `git init`).
2. `npm install`
3. Ändra `src/data/doman.mjs` och `src/data/sajt.ts`, och fyll i `CLAUDE.md`.
4. Klistra in startprompten i Claude Code.

## Kommandon

| Kommando | Vad det gör |
|---|---|
| `npm run build` | Bilder + Astro + `efterbygg` (`_redirects`, `_headers`, `robots.txt`). Rensar Astros Markdown-cache först |
| `NOINDEX=1 npm run build` | Samma för den tillfälliga adressen (noindex i meta och header, ingen GA4) |
| `npm run kontroll` | Granskar `dist/`: H1, titlar, beskrivningar, dubbletter, kanonisk, sitemap, JSON-LD, tankstreck, förbjudna fraser, platshållare, bilder och LCP-budget, länkar, telefonlänkar, formulär |
| `npm run mat` | Headless Chrome/Edge i 360/390/1280 px: ensamma ord och sidoscroll på alla sidor |
| `npm run bilder` | Masterfiler i `drafts/bilder/godkanda/` blir AVIF + WebP i flera bredder och delningsbild |

## Innehåll

- `src/lib/rehype-ensamma.mjs`, `src/lib/text.ts` (`ihop()`): inga ensamma ord, tal och enhet ihop.
  Markdown går genom rehype-regeln; text i `.astro`-mallar måste gå genom `ihop()`.
- `src/lib/rehype-lankar.mjs`: utlänkar i ny flik med pil ihop med sista ordet.
- `src/lib/schema.ts`: en JSON-LD-graf per sida (Organization eller LocalBusiness, WebSite, Service, FAQPage,
  BreadcrumbList, Article, Person).
- `src/layouts/Bas.astro`: head, Consent Mode v2, egen cookieruta, GA4 först efter ja, händelserna
  `generate_lead`, `telefon_klick`, `epost_klick`.
- `src/pages/`: start, kontakt (formulär), tack, 404, cookies, integritetspolicy (läses igenom per projekt).
- `tjanster/kontakt/`: formulärtjänsten (Node utan beroenden, Brevo), körs som Sevalla-applikation.
- `research/redirectkarta.csv`: `fran,till,kod`. `efterbygg` gör `_redirects` av den.
- `src/data/forbjudna-fraser.mjs`: fraser som kontrollen varnar för. Fyll på.
