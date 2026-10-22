# Markiser Helsingborg – projektets sanning

Följ `STANDARD.md` (byråstandarden). Här står bara det som gäller det här projektet: fakta, beslut med skäl,
fällor, status och listorna inför domänbytet. Uppdateras löpande. `git pull` före start, commit och push före slut.

## Projektfakta

"(bekräfta)" = hittat men inte bekräftat. "okänt" = väntar på svar, hitta inte på.

| Fält | Värde |
|---|---|
| Projekttyp | C lead-gen, med gammal WordPress-sajt att städa (301-karta som i A) |
| Varumärke | Markiser Helsingborg |
| Juridiskt bolag och org.nr | Markisbyrån Sverige AB, 559470-6668 (bekräftat 2026-10-21) |
| Domän | markishelsingborg.se, registrar Oderland |
| Vad som säljs | Terrass-, fönster-, sido- och vertikalmarkiser, vävbyte, persienner, rullgardiner, lamell- och plisségardiner. Ungefär lika viktiga (Alex 2026-10-21). Markiser svensktillverkade av Hestra Markis, vävar från Sandatex. **Inga priser på sajten.** Övriga produktfakta från markisbyran.se (läs, kopiera aldrig text) |
| Ort och marknad | Bara Helsingborg (Höganäs/Landskrona okänt) |
| Målgrupp | Privat och företag |
| Huvudmål och konvertering | Formulär (kostnadsfritt hembesök/offert) och telefon |
| Avsändare och mottagare av leads (C) | Markisbyrån Sverige AB, markisbyran.se. Leads till info@markisbyran.se och till Markisbyråns Slack-kanal (webhook okänd) |
| Kontaktuppgifter | 0431-199 77 (även på denna sajt), info@markisbyran.se. Ingen adress i Helsingborg. Bolagsadress Fibulavägen 12, 262 74 Ängelholm enligt markisbyran.se (gamla sajten: Östra Pilkvägen 29 – antar markisbyran.se:s). Markisbyrån ringer alltid upp samma dag (Alex 2026-10-21) |
| Varumärke/profil | Eget ordmärke "markiser helsingborg." (gemen Poppins 700 med punkt, tagg "drivs av markisbyrån") enligt Markisbyråns profil. Profil avläst från markisbyran.se Elementor-kit 2026-10-21: petrol #182D35, #304750, sand #E3E1DB, svart text, Poppins 600/400. Markisbyråns vita logga i `public/varumarke/markisbyran-vit.png` (från Alex) |
| Bildmaterial | Markisbyrån lägger foton i Drive (mapp okänd). AI-bilder fyller luckor |
| Google-företagsprofil | Markisbyråns profil får användas för omdömen om det inte skadar markisbyran.se (länk okänd) |
| Sociala kanaler | okänt |
| Författare | Mikael Lundgren och Roy Ridderberg, båda ägare av Markisbyrån. Foton och LinkedIn finns (ej mottagna) |
| Konkurrenter | Solflex AB, Solskyddsproffset Helsingborg AB (Helsingborg); Rullux (Lund), Markiscentrum (Båstad), Solklar (Löddeköpinge); reco.se |
| Sökdata | Ahrefs + GSC + GA4, exporter i `data/` (2026-10-21) |
| Mätning | Befintlig GA4-egendom "Markishelsingborg.se" behålls (mät-id G-… okänt, syns inte i sidans HTML) |
| Hosting | Sevalla statisk sajt "Markiser Helsingborg" (id 85d33d29-acf9-42d2-a3b6-c02e9257e6ec), tillfällig adress https://markiser-helsingborg-ac7t7.kinsta.page. Skapad via Alex Mac (Sevalla-MCP där) 2026-10-21. Bygge gav 500 tills GitHub-appen Kinsta får åtkomst till repot. Egen Brevo-nyckel |
| Kontakttjänst | Sevalla-app https://markiser-helsingborg-kontak-o8k9n.sevalla.app (Stockholm, h1), KONTAKT_URL = …/kontakt. BREVO_API_KEY och SLACK_WEBHOOK läggs in av Alex i Sevalla |
| Domän och DNS | Oderland (domän och DNS). E-post på domänen okänt; MX/TXT läses av före switch-dagen |
| GitHub | fratelli-alex/markiserhelsingborg (privat) |
| Projektmapp | |
| Behåll ordagrant (A) | Inget |
| Leverans | **Live nästa vecka (v. 44, 2026)** enligt Alex 2026-10-21 |

Projektets fakta- och frågedokument: https://claude.ai/artifact/87ryUwbFR4274gt8SNFQP9

## Röstguide

Godkända meningar (förebilder, startsidan 2026-10-21):
- "Vi mäter, visar vävprover på plats och monterar."
- "Det är samma personer som svarar i telefon, mäter hos dig och monterar."
- "Vid sundet blåser det mer än inne i landet, och en markis i västerläge får eftermiddagssolen rakt in från vattnet."
- "Det är sådant vi tittar på vid hembesöket, och därför ger vi inga priser innan vi har sett huset."

Underkända meningar (och varför):
- H1 på fyra rader på dator (Alex 2026-10-21): rubriker ska rymmas på högst två rader på dator.

## Beslut
- 2026-10-21: Både markishelsingborg.se och markisbyran.se siktar på "markiser helsingborg". Helt egna texter och
  egen lokal vinkel; markisbyran.se:s sida /markiser-helsingborg/ rörs inte. Ingen text kopieras från markisbyran.se
  eller gamla sajten.
- 2026-10-21: Fem reparationsguider skrivs om med egna texter och behålls (de gamla tio guideadresserna gav
  3 117 av 3 362 GSC-klick på 16 månader). De slutar med service/reparation i Helsingborg som uppmaning.
- 2026-10-21: Markisbyrån gör service och reparation även på markiser de inte sålt, vävbyte på alla fabrikat och
  skickar vävprov till kunder från sajten (Alex). Guiderna uppmanar till service i Helsingborg.
- 2026-10-21: Inga priser på sajten (Alex), trots att markisbyran.se visar en prisbild.
- 2026-10-21: Organisationen blir `Organization` + `Service` med `areaServed` Helsingborg, inte `LocalBusiness`,
  så länge det inte finns en riktig adress i Helsingborg.

- 2026-10-21 (Alex): Träpersienner: fabrikat okänt, nämns inte. Tryck/logga på markisväv för företag: ja.
  Markisbyrån byter och eftermonterar motorer: ja. Servicebesök kostar arbetskostnad och material. Förfrågningar
  sparas i 30 dagar. Alex ger åtkomst till Sevalla (kräver nätverksåtkomst till api.sevalla.com i molnmiljön).
- 2026-10-21 (Alex): Tjänstesidorna och guiderna var för tunna ("måste hända mer"). Förebilder:
  redovisningsföretag.se/redovisningskonsult/ (formulär i hero, checklista, steg, CTA mitt i, källor, länklistor,
  formulär igen sist) och barnkollen.se/kungliga-namn/ (byline med författarruta, innehållsförteckning, tabeller,
  tipsruta, relaterade kort med bild).

## Fällor
- Gamla sajten har 76 massproducerade AI-inlägg, många om andra orter och andras varumärken. Inget återanvänds.
- Fratelli-nätverket har lagt länkar med exakt ankartext "markiser Helsingborg" från orelaterade sajter. Kolla
  manuella åtgärder i GSC; lägg inte till fler.

## Status
- 2026-10-22: Alla 34 sidor följer v2 (tabell, checklista, tipsruta, CTA mitt i, källor). Slutlig 301-karta i
  `research/redirectkarta.csv`: 59 adresser med 301 (118 regler med/utan snedstreck), 46 gamla AI-inlägg och arkiv
  får 404 med flit. Väntar: Sevalla-bygge via Alex Mac, formulärtest, AI-bilder.
- 2026-10-21: Godkännande 3 klart: Alex valde riktning B och godkände startsidan ("Kanon, nästa steg"). Ändringar
  efter hans kommentarer: H1 på två rader, egen SVG-karta över Helsingborg, en bakgrundston (sand bara för
  räknaren), Boka hembesök i mobilmenyn. Inspiration: redovisningsföretag.se (formulär i hero, CTA i sidhuvudet,
  verktyg). Sidinnehåll i `src/innehall/*.md` (frontmatter = mall), skrivinstruktion i
  `research/skrivinstruktion-2026-10-21.md`. Kontakttjänsten postar även till Slack (SLACK_WEBHOOK).
- 2026-10-21: Designriktning A/B/C i `drafts/design/2026-10-21-riktning/` (artifact https://claude.ai/artifact/S9Gp4RAgA74UyNVVd6VvWg). Bildkarta i `drafts/bilder/bildkarta.md`, Hestra-fakta i `research/hestra-fakta-2026-10-21.md`.
- 2026-10-21: Repo skapat från astro-startmall. Steg 1–2 klara, godkännande 1 pågår (se dokumentet ovan).
  Utkast till 301-karta i `research/redirectkarta-utkast-2026-10-21.csv`.

## Öppna luckor
- Motorfabrikat/styrning, sol- och vindautomatik, garanti och leveranstider: Alex återkommer.
- GA4-mät-id, Slack-webhook, Google-profilens länk, Drive-mapp med foton, ägarnas foton och LinkedIn,
  e-post på domänen (MX).

## Före domänbytet
-

## Switch-dag
- Se STANDARD.md § Switch-dag. Projektspecifikt: gamla WordPress-sajten ligger kvar som reserv tills 301-reglerna
  är verifierade.
