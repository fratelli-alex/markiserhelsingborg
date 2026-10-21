# Markiser Helsingborg – projektets sanning

Följ `STANDARD.md` (byråstandarden). Här står bara det som gäller det här projektet: fakta, beslut med skäl,
fällor, status och listorna inför domänbytet. Uppdateras löpande. `git pull` före start, commit och push före slut.

## Projektfakta

"(bekräfta)" = hittat men inte bekräftat. "okänt" = väntar på svar, hitta inte på.

| Fält | Värde |
|---|---|
| Projekttyp | C lead-gen, med gammal WordPress-sajt att städa (301-karta som i A) |
| Varumärke | Markiser Helsingborg |
| Juridiskt bolag och org.nr | Markisbyrån Sverige AB, 559470-6668 (bekräfta; gamla sajten skriver "Markisbyrån i Sverige AB") |
| Domän | markishelsingborg.se, registrar Oderland |
| Vad som säljs | Terrass-, fönster-, sido- och vertikalmarkiser, vävbyte, persienner, rullgardiner, lamell- och plisségardiner (ordning okänd) |
| Ort och marknad | Bara Helsingborg (Höganäs/Landskrona okänt) |
| Målgrupp | Privat och företag |
| Huvudmål och konvertering | Formulär (kostnadsfritt hembesök/offert) och telefon |
| Avsändare och mottagare av leads (C) | Markisbyrån Sverige AB, markisbyran.se; leads till info@markisbyran.se (bekräfta) |
| Kontaktuppgifter | 0431-199 77, info@markisbyran.se. Adress: Fibulavägen 12, 262 74 Ängelholm (markisbyran.se) eller Östra Pilkvägen 29, 262 91 Ängelholm (gamla sajten) – bekräfta |
| Varumärke/profil | okänt (ingen egen logotyp hittad) |
| Bildmaterial | okänt (video-helsingborg.mp4 i Drive, ursprung okänt) |
| Google-företagsprofil | okänt |
| Sociala kanaler | okänt |
| Författare | okänt (riktig person på Markisbyrån efterfrågad) |
| Konkurrenter | Solflex AB, Solskyddsproffset Helsingborg AB (Helsingborg); Rullux (Lund), Markiscentrum (Båstad), Solklar (Löddeköpinge); reco.se |
| Sökdata | Ahrefs + GSC + GA4, exporter i `data/` (2026-10-21) |
| Mätning | okänt GA4-id på gamla sajten (behålls) |
| Hosting | Nytt Sevalla-projekt (förslag, ej skapat) |
| Kontakttjänst | ej skapad |
| Domän och DNS | Oderland (domän och DNS). E-post på domänen okänt; MX/TXT läses av före switch-dagen |
| GitHub | fratelli-alex/markiserhelsingborg (privat) |
| Projektmapp | |
| Behåll ordagrant (A) | Inget (förslag) |
| Leverans | Live senast februari 2027, före säsongen (förslag) |

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
  Kräver att Markisbyrån bekräftar att de gör service och reparation.
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
- Bolagsnamn, org.nr, adress, utbud i ordning, fakta (tillverkare, garanti, leveranstid, prisbild), telefon,
  service/reparation, bilder, Google-profil, logotyp, författare, GA4-id, e-post på domänen.

## Före domänbytet
-

## Switch-dag
- Se STANDARD.md § Switch-dag. Projektspecifikt: gamla WordPress-sajten ligger kvar som reserv tills 301-reglerna
  är verifierade.
