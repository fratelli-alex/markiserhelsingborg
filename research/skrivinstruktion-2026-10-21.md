# Skrivinstruktion för sidorna, 2026-10-21

Du skriver färdig text till markishelsingborg.se, en lead-gen-sajt som drivs av Markisbyrån Sverige AB
(Ängelholm). Sajten ska bara synas i Helsingborg. Alex har godkänt rösten (startsidan och /terrassmarkiser/).

## Läs först (i den här ordningen)
1. `CLAUDE.md` – projektfakta och beslut. Det som står där är sant; allt annat är okänt.
2. `src/innehall/terrassmarkiser.md` – **förebilden**. Samma frontmatter, samma ton, samma längd per avsnitt.
3. `drafts/texter/2026-10-21-rostprov.md` – rösten (startsida och terrassmarkiser).
4. `research/hestra-fakta-2026-10-21.md` – produktfakta (mått, vindklass). Fritt att använda med egna ord.
5. `research/sokordskarta-2026-10-21.md` – huvudord, varianter, intention och faktabehov per sida.

## Format
- En fil per sida: `src/innehall/<filnamn>.md`. Frontmatter som i förebilden. Fält:
  `typ` (tjanst / guide / hubb), `url`, `ordning`, `titel` (H1), `menynamn`, `seoTitel` (**högst 37 tecken**,
  varumärket läggs till automatiskt), `beskrivning` (**120–155 tecken**, räkna), `ingress` (2–3 meningar),
  `kortText` (en mening för kort på andra sidor), `bild` + `bildAlt` (bara om en bild anges i din uppgift),
  `produkt` (förval i formuläret, se listan nedan), `fakta` (tjänstesidor: 4–6 rader, kort), `fragor` (3–5),
  `relaterade` (2–3 url:er från sitemapen), guider även `forfattare`, `publicerad: 2026-10-21`, `forelder: /guider/`.
- Brödtext i Markdown med `##`-rubriker. Ingen H1 i kroppen. Tjänstesidor 350–600 ord, guider 600–1 000 ord.
- Värden med kolon eller citattecken i YAML: sätt dem inom dubbla citattecken.
- Formulärets produktval (använd exakt): Terrassmarkis, Fönstermarkis, Vertikalmarkis eller screen, Pergolamarkis,
  Balkongmarkis, Korgmarkis eller markisolett, Ny väv på befintlig markis, Service eller reparation, Persienner,
  Rullgardiner, Plissé- eller lamellgardiner, Solskydd för företag, Vet inte än.

## Röst
Rak, lokal och lugn. Du-tilltal, korta meningar, inga superlativ. Säg vad som händer och i vilken ordning.
Sälj genom att vara konkret. Skriv som en erfaren montör som förklarar för en granne.

## Lokal vinkel (krav, men inte tvångsmässigt)
Varje sida ska ha minst ett stycke som bara kan stå på en Helsingborgssajt: vinden från väster över sundet,
västerläge med eftermiddagssol från vattnet, äldre villor med puts eller tegel (Tågaborg, Ramlösa, Råå),
nyare hus med stora glaspartier (Norr, Påarp), bostadsrätter i centrum (balkonger), uteserveringar på
Kullagatan/Norra hamnen (företag). Nämn inte Helsingborg i varje mening. Inga påhittade lokala fakta.

## Förbjudet
- Priser, prisnivåer, rabatter. Leveranstider, garantitider, antal år i branschen, antal kunder.
- Påståenden om vilket motorfabrikat Markisbyrån monterar (Hestras blad nämner Somfy och Becker; det får sägas
  i guiden om motorbyte som vanliga fabrikat på marknaden, inte som Markisbyråns standard).
- Sol- och vindautomatik som något vi erbjuder (obekräftat). Erik-screenen har givare enligt Hestra; säg högst
  att "det finns sol- och vindgivare till vissa modeller".
- Att Markisbyrån säljer fristående markiser eller markis med ben (obekräftat).
- Omdömen, citat från kunder, påhittade exempel med namn.
- Text kopierad eller omskriven mening för mening från markisbyran.se, gamla markishelsingborg.se eller andra
  sajter. Läs gärna för fakta, skriv helt eget.
- Långa tankstreck (—). Kort tankstreck (–) bara i intervall (1,5–4 m).
- Fraserna i `src/data/forbjudna-fraser.mjs` (t.ex. "skräddarsydd", "oavsett om du", "inte bara", "när det
  kommer till"). Inga "Sammanfattning"-avsnitt. Inga frågor som rubriker i brödtexten mer än undantagsvis.
- Ingen kontaktrad direkt ovanför en knapp, ingen "kontakta oss"-uppmaning sist i brödtexten (sidan har ett
  formulär efter texten automatiskt).

## Sant som får sägas
Hembesök utan kostnad. Uppringning samma dag. Mätning och vävprover på plats. Hestra Markis (svensktillverkat),
väv från Sandatex. Service och reparation även på markiser vi inte sålt, vävbyte på alla fabrikat, vävprov kan
skickas hem. Kontor i Ängelholm, ingen butik i Helsingborg. Inga priser innan hembesök. Montering av en
terrassmarkis tar oftast några timmar. Måtten i hestra-fakta.

## Länkar
Interna länkar i brödtexten till 2–4 andra sidor i sitemapen där det är naturligt, med beskrivande ankartext.
Utlänkar bara till myndigheter (t.ex. Helsingborgs stad om bygglov) och skriv dem som vanliga Markdown-länkar.

## Guider
Guiderna ersätter gamla inlägg som fick mycket trafik. Besökaren vill lösa ett problem själv. Ge ett verkligt
svar steg för steg (allmänt för vanliga markiser med vikarmar), säkerhet först (fjäderspänning i armar, el till
motor), och avsluta med när det är dags att låta någon titta på den. Skriv bara det du är säker på är tekniskt
rätt; hellre allmänt än fel. Guiderna har författare: `mikael-lundgren` eller `roy-ridderberg` (växla).

## Lämna tillbaka
Skriv filerna. Svara sedan kort med en lista: fil, ordantal, och varje sakuppgift du var osäker på (så att
huvudsessionen kan stryka eller bekräfta). Bygg inte, committa inte, ändra inga andra filer.

## Tillägg 2026-10-21: rikare sidor (Alex: "måste hända mer")
Förebilder: `src/innehall/terrassmarkiser.md` (tjänstesida) och `src/innehall/markisarmar.md` (guide). Läs båda.
Varje sida ska nu ha, utöver befintlig text:
- **Inledande stycke utan rubrik** överst i brödtexten (2–3 meningar) om sidan saknar det.
- **`tabell`** i frontmatter (rubrik, intro, kolumner, rader, not). Tjänstesidor: Hestra-modeller med mått från
  hestra-fakta där sådana finns, annars en jämförelse (t.ex. typer mot varandra: passar för, manövrering, fördelar).
  Guider: felsökning (det du ser / trolig orsak / vad du kan göra) eller en annan uppslagstabell som passar.
  Inga påhittade siffror. Alla celler är korta.
- **`checklista`** (rubrik, valfri intro, 5–6 punkter, gärna med fetstilad början `**Ord.**`). Tjänstesidor: vad vi
  tittar på vid hembesöket eller vad du ska tänka på innan du väljer. Guider: kontrollera själv-lista.
- **En tipsruta** i brödtexten: en rad som börjar med `> **Tips:**` eller `> **Viktigt:**` (säkerhet).
- **Tjänstesidor: en mitt-CTA** i brödtexten efter första eller andra avsnittet, exakt detta format på en rad
  (byt bara rubrik och mening):
  `<aside class="cta-ruta"><div><p class="cta-ruta-rubrik">Rubrik?</p><p>En mening.</p></div><div class="knappar"><a class="knapp" href="#forfragan">Boka hembesök</a></div></aside>`
- **`kallor`**: lista med `{ namn: "...", kontrollerad: 2026-10-21 }` (och `url` för myndigheter). Ange bara källor
  du faktiskt har använt (Hestra-produktblad, EN 13561/13659, Elsäkerhetsverket, Helsingborgs stad).
- Faktaraden "Pris" på tjänstesidor ska heta "Pris" med värdet "Efter hembesök, utan kostnad" (inte service).
Nya fakta från Alex: Markisbyrån byter och eftermonterar motorer. Tryck med namn/logga på markisväv går. Service
kostar arbetskostnad och material. Fabrikat för träpersienner nämns inte.
Ändra inte `url`, `bild`, `ordning`. Bygg inte, committa inte.
