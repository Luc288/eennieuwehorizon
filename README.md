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
- **Contactformulier**: statische hosting kan geen formulieren verwerken. Zet de `action` in `layouts/index.html` op een formulierdienst zoals [Formspree](https://formspree.io/), of vervang door een `mailto:`-link.
