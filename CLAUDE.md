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
| Varumärke/profil | Eget ordmärke "Markiser Helsingborg" enligt Markisbyråns grafiska profil (profilen okänd: läs av färger från markisbyran.se:s logotyp) |
| Bildmaterial | Markisbyrån lägger foton i Drive (mapp okänd). AI-bilder fyller luckor |
| Google-företagsprofil | Markisbyråns profil får användas för omdömen om det inte skadar markisbyran.se (länk okänd) |
| Sociala kanaler | okänt |
| Författare | Mikael Lundgren och Roy Ridderberg, båda ägare av Markisbyrån. Foton och LinkedIn finns (ej mottagna) |
| Konkurrenter | Solflex AB, Solskyddsproffset Helsingborg AB (Helsingborg); Rullux (Lund), Markiscentrum (Båstad), Solklar (Löddeköpinge); reco.se |
| Sökdata | Ahrefs + GSC + GA4, exporter i `data/` (2026-10-21) |
| Mätning | Befintlig GA4-egendom "Markishelsingborg.se" behålls (mät-id G-… okänt, syns inte i sidans HTML) |
| Hosting | Nytt Sevalla-projekt (ok från Alex 2026-10-21, ej skapat). Egen Brevo-nyckel |
| Kontakttjänst | ej skapad |
| Domän och DNS | Oderland (domän och DNS). E-post på domänen okänt; MX/TXT läses av före switch-dagen |
| GitHub | fratelli-alex/markiserhelsingborg (privat) |
| Projektmapp | |
| Behåll ordagrant (A) | Inget |
| Leverans | **Live nästa vecka (v. 44, 2026)** enligt Alex 2026-10-21 |

Projektets fakta- och frågedokument: https://claude.ai/artifact/87ryUwbFR4274gt8SNFQP9

## Röstguide

Godkända meningar (förebilder):
-

Underkända meningar (och varför):
-

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

## Fällor
- Gamla sajten har 76 massproducerade AI-inlägg, många om andra orter och andras varumärken. Inget återanvänds.
- Fratelli-nätverket har lagt länkar med exakt ankartext "markiser Helsingborg" från orelaterade sajter. Kolla
  manuella åtgärder i GSC; lägg inte till fler.

## Status
- 2026-10-21: Repo skapat från astro-startmall. Steg 1–2 klara, godkännande 1 pågår (se dokumentet ovan).
  Utkast till 301-karta i `research/redirectkarta-utkast-2026-10-21.csv`.

## Öppna luckor
- Motorfabrikat/styrning, sol- och vindautomatik, garanti och leveranstider: Alex återkommer.
- GA4-mät-id, Slack-webhook, Google-profilens länk, Drive-mapp med foton, ägarnas foton och LinkedIn,
  Markisbyråns logotyp och färger (markisbyran.se går inte att läsa härifrån), e-post på domänen (MX).

## Före domänbytet
-

## Switch-dag
- Se STANDARD.md § Switch-dag. Projektspecifikt: gamla WordPress-sajten ligger kvar som reserv tills 301-reglerna
  är verifierade.
