# Een Nieuwe Horizon — Hugo-site

Statische one-pager voor het boek *Een Nieuwe Horizon* van Karel Bohy, klaar om te bouwen en hosten met [Hugo](https://gohugo.io/).

## Vereisten

- [Hugo](https://gohugo.io/installation/) (extended niet vereist; standaard volstaat)

## Lokaal bekijken

```bash
hugo server
```

Open daarna http://localhost:1313/.

## Bouwen voor hosting

```bash
hugo --minify
```

De volledige website staat daarna in de map `public/`. Upload de inhoud van die map naar je host (Netlify, Cloudflare Pages, GitHub Pages, of een gewone webserver).

## Structuur

```
hugo.toml                 # configuratie + teksten (auteur, prijs, afbeelding)
content/_index.md         # titel van de homepage
layouts/_default/baseof.html  # HTML-omhulsel (head + scripts)
layouts/index.html        # de homepage-secties
static/css/style.css      # styling
static/js/main.js         # navbar-scroll + actieve link
static/img/               # plaats hier foto-karel.jpg
```

## Aanpassen

- **Teksten zoals prijs/auteur**: pas aan in `hugo.toml` onder `[params]`.
- **Auteursfoto**: plaats `foto-karel.jpg` in `static/img/`. Zonder foto toont de site automatisch een placeholder.
- **Contactformulier**: verstuurt mail via een Netlify-functie (`netlify/functions/contact.js`) en jouw SMTP-server. Zie hieronder.

## Contactformulier (Netlify Functions + SMTP)

Het formulier post naar `/.netlify/functions/contact`, die met nodemailer een mail
verstuurt via SMTP. De gegevens komen uit environment variables in Netlify
(**Site settings → Environment variables**) — nooit hardcoded:

| Variabele   | Waarde |
|-------------|--------|
| `SMTP_HOST` | `mail5018.site4now.net` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | het mailbox-adres (login) |
| `SMTP_PASS` | het wachtwoord van die mailbox |
| `SMTP_FROM` | afzenderadres (meestal gelijk aan `SMTP_USER`) |
| `MAIL_TO`   | waar de berichten naartoe moeten |

Deploy via Netlify (verbind de GitHub-repo). Netlify installeert `nodemailer`
automatisch dankzij `package.json` en bouwt de site met `hugo --minify`.
