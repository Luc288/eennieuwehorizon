# Spiekbriefje — Een Nieuwe Horizon (Hugo + Netlify)

## Waar werk ik?
Projectmap: `C:\Users\lucve\SynologyDrive\IT\Python\eennieuwehorizon-hugo\`

Bewerk meestal:
- `layouts\index.html` — de secties/teksten van de homepage
- `static\css\style.css` — kleuren, lettertypes, opmaak
- `hugo.toml` — instellingen + params (prijs, auteur, ...)

---

## 1. Lokaal testen
```powershell
cd "C:\Users\lucve\SynologyDrive\IT\Python\eennieuwehorizon-hugo"
hugo server
```
Open daarna http://localhost:1313/ — wijzigingen verschijnen meteen.
Stoppen: `Ctrl + C`.

> Let op: het contactformulier werkt NIET lokaal (de Netlify-functie draait
> alleen op de echte site). Test het formulier op het *.netlify.app-adres.

---

## 2. Publiceren naar Netlify
```powershell
git add -A
git commit -m "Korte omschrijving van de wijziging"
git push
```
Netlify bouwt automatisch (~1 min). Volg de voortgang onder **Deploys** in Netlify.
Geen handmatige upload nodig — `git push` regelt alles.

---

## Handig om te weten
- **Live site:** https://illustrious-dasik-0770d8.netlify.app/
  (of je nieuwe naam na "Change site name")
- **Build faalt?** Kijk in Netlify onder **Deploys** → klik de rode deploy aan
  voor de foutmelding. Functiefouten staan onder **Logs → Functions → contact**.
- **SMTP-instellingen** (mailserver) staan als environment variables in Netlify,
  NIET in de code. Wachtwoord = `SMTP_PASS` (secret).

---

## Veelgebruikte git-commando's
| Doel | Commando |
|------|----------|
| Wat is er gewijzigd? | `git status` |
| Wijzigingen klaarzetten | `git add -A` |
| Vastleggen | `git commit -m "..."` |
| Publiceren | `git push` |
| Geschiedenis bekijken | `git log --oneline` |
