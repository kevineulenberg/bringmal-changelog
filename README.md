# Bringmal Changelog

Changelog/Blog für Bringmal.app Produkte – gebaut mit Astro, MDX Content Collections und Sveltia CMS.

## Stack

- **Astro** (static output) + `@astrojs/mdx`
- **Sveltia CMS** unter `/admin` (Git-Backend: dieses Repo, GitHub-OAuth via `astro-decap-cms-oauth` + Vercel Functions)
- **RSS-Feed** unter `/rss.xml` (`@astrojs/rss`)
- Vercel-Adapter mit Web Analytics

## Setup

```bash
npm install --legacy-peer-deps   # nötig wegen astro-decap-cms-oauth Peer-Dep
npm run dev                      # http://localhost:4321
npm run build                    # statischer Build nach dist/ (+ Vercel-Functions)
```

## Neuen Beitrag anlegen

**Variante A – per CMS:** `https://changelog.bringmal.app/admin` öffnen, mit GitHub anmelden, Beitrag schreiben. Das CMS committet direkt ins Repo.

**Variante B – per Datei:** `src/content/blog/_template.mdx` kopieren, umbenennen (Dateiname = URL-Slug `/blog/<name>/`), Frontmatter ausfüllen:

```yaml
title: Titel
excerpt: Teaser für die Karten-Ansicht
date: 2026-02-01
category: shop | tischreservierungen | neuigkeiten | app
type: feature | fix | improvement | announcement
version: "2.0"        # optional
draft: false          # true = nicht veröffentlicht
readTime: 3
featured: false       # true = großer Beitrag oben im Archiv
image: /images/uploads/xxx.webp   # optional; ohne Bild greift ein CSS-Thumbnail (thumb:)
```

Bilder liegen in `public/images/uploads/` und werden im Markdown als `/images/uploads/...` referenziert.

## OAuth / CMS-Deployment (Vercel)

1. GitHub OAuth App: Homepage `https://changelog.bringmal.app`, Callback `https://changelog.bringmal.app/oauth/callback`
2. Env-Variablen in Vercel setzen:
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
3. `.env` lokal ablegen für lokale Tests (ist gitignored).

## E2E-Tests

Headless-Chrome-Suite (playwright-core):

```bash
npm run dev          # muss laufen
node tests/e2e.mjs
```

Deckt Archiv, Filter, Artikelseiten, Bild-Loads, Mobile-Nav, RSS und Konsole ab.

## Docs

Siehe `docs/` – u. a. `changelog-writing-guide.md` (KI-Prompt für neue Einträge) und `sveltia-getting-started.md` (CMS-Bedienung).
