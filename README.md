# Een Nieuwe Horizon — Hugo-site

Statische one-pager voor het boek *Een Nieuwe Horizon* van Karel Bohy, gebouwd met [Hugo](https://gohugo.io/) en gehost op Netlify.
Dagelijks gebruik (testen, publiceren): zie `SPIEKBRIEFJE.md`.

## Vereisten

- [Hugo](https://gohugo.io/installation/) (versie zoals in `netlify.toml`)

## Lokaal bekijken en bouwen

```bash
hugo server        # http://localhost:1313/
hugo --minify      # volledige site in public/
```

## Structuur

```
hugo.toml                     # configuratie + params (auteur, prijs, afbeeldingen, Turnstile)
content/_index.md             # titel van de homepage (overige .md-bestanden worden niet gerenderd)
layouts/_default/baseof.html  # HTML-omhulsel (head, meta-tags, scripts)
layouts/index.html            # de homepage-secties
layouts/robots.txt            # robots.txt (met sitemap)
static/css/                   # bootstrap.slim.css, fonts.css, style.css
static/js/main.js             # menu, scroll-effecten, formulier versturen
static/img/                   # afbeeldingen
netlify/functions/contact.js  # contactformulier -> mail via SMTP
publish.bat                   # bouwen, committen en pushen in één keer
```

## Contactformulier (Netlify Functions + SMTP)

Het formulier post naar `/.netlify/functions/contact`, die met nodemailer een mail
verstuurt via SMTP. Beveiliging: honeypot, tijd-trap en Cloudflare Turnstile
(server-side gecontroleerd). Alle gevoelige gegevens komen uit environment
variables in Netlify — nooit hardcoded:

| Variabele         | Waarde |
|-------------------|--------|
| `SMTP_HOST`       | `mail5018.site4now.net` |
| `SMTP_PORT`       | `465` |
| `SMTP_USER`       | het mailbox-adres (login) |
| `SMTP_PASS`       | het wachtwoord van die mailbox |
| `SMTP_FROM`       | afzenderadres (meestal gelijk aan `SMTP_USER`) |
| `MAIL_TO`         | waar de berichten naartoe moeten |
| `TURNSTILE_SECRET`| geheime sleutel van de Turnstile-widget (de publieke sleutel staat in `hugo.toml`) |

Netlify installeert `nodemailer` automatisch via `package.json` en bouwt de site met `hugo --minify`.
