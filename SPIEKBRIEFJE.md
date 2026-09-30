# Spiekbriefje — Een Nieuwe Horizon (Hugo + Netlify)

## Waar werk ik?
Projectmap: `C:\Users\lucve\SynologyDrive\IT\Hugo\eennieuwehorizon\`

Bewerk meestal:
- `layouts\index.html` — de secties/teksten van de homepage
- `static\css\style.css` — kleuren, lettertypes, opmaak
- `hugo.toml` — instellingen + params (prijs, auteur, afbeeldingen, Turnstile-sleutel)

---

## 1. Lokaal testen
```powershell
cd "C:\Users\lucve\SynologyDrive\IT\Hugo\eennieuwehorizon"
hugo server
```
Open daarna http://localhost:1313/ — wijzigingen verschijnen meteen.
Stoppen: `Ctrl + C`.

> Let op: het contactformulier werkt NIET lokaal (de Netlify-functie draait
> alleen op de echte site en Turnstile geeft op localhost een foutmelding).
> Test het formulier op de echte site.

---

## 2. Publiceren naar Netlify
Dubbelklik op `publish.bat` (of start het met een omschrijving:
`publish.bat "Korte omschrijving"`). Het script:
1. bouwt de site ter controle (`hugo --minify`; bij een fout stopt het),
2. zet de wijzigingen klaar, commit en pusht naar GitHub.

Netlify bouwt daarna automatisch (~1 min). Volg de voortgang onder **Deploys**.

Handmatig kan ook: `git add -A`, `git commit -m "..."`, `git push`.

---

## Afbeeldingen
Alles in `static\` gaat 1-op-1 mee naar de site. Zet er dus alleen bestanden in
die je echt gebruikt, zonder spaties in de naam, en niet te groot
(boekcover ≈ 1000 px breed, `.webp`). Pas de bestandsnaam ook aan in `hugo.toml`
(`authorImage`, `bookCover`, `logo`).

---

## Handig om te weten
- **Live site:** https://eennieuwehorizon.nl/
- **Build faalt?** Kijk in Netlify onder **Deploys** → klik de rode deploy aan
  voor de foutmelding. Functiefouten staan onder **Logs → Functions → contact**.
- **Environment variables** staan in Netlify, NIET in de code
  (Site settings → Environment variables):
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (secret), `SMTP_FROM`,
  `MAIL_TO`, en `TURNSTILE_SECRET` (secret; de publieke sleutel staat in `hugo.toml`).
- **Spam-bescherming formulier:** verborgen veld (honeypot), tijd-trap
  (< 3 seconden = genegeerd) en Cloudflare Turnstile.

---

## Veelgebruikte git-commando's
| Doel | Commando |
|------|----------|
| Wat is er gewijzigd? | `git status` |
| Wijzigingen klaarzetten | `git add -A` |
| Vastleggen | `git commit -m "..."` |
| Publiceren | `git push` |
| Geschiedenis bekijken | `git log --oneline` |
