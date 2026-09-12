# Setup Guide: Decap CMS + GitHub App + Astro 5 + Vercel

Dieser Guide beschreibt die finale, funktionierende Konfiguration für ein Astro-Projekt mit Decap CMS, das auf Vercel gehostet wird und eine GitHub App für die Authentifizierung nutzt (ohne Netlify).

## 1. GitHub App Erstellung & Konfiguration

Gehe zu `Settings > Developer Settings > GitHub Apps > New GitHub App`.

### Basis-Daten
- **GitHub App name:** Dein Projektname
- **Homepage URL:** `https://deine-domain.de`
- **Callback URL:** `https://deine-domain.de/oauth/callback`
- **Expire user authorization tokens:** Deaktiviert (Unchecked)
- **Webhook:** Deaktiviert (Active Unchecked)

### Berechtigungen (Permissions)
Unter **Repository permissions**:
- **Contents:** `Read & write` (Wichtig für das Speichern von Posts)
- **Metadata:** `Read-only`
- **Pull requests:** `Read & write` (Erforderlich für den Editorial Workflow / Entwürfe)

Unter **User permissions**:
- **Email addresses:** `Read-only`

### Installation (WICHTIGSTER SCHRITT)
Nach dem Erstellen der App:
1. Klicke links auf **Install App**.
2. Wähle dein GitHub-Konto aus und klicke auf **Install**.
3. Wähle **Only select repositories** und füge dein Repository hinzu.
*Ohne diesen Schritt erhältst du den Fehler: "Resource not accessible by integration".*

---

## 2. Vercel Konfiguration

### Umgebungsvariablen (Environment Variables)
Füge in den Vercel Project Settings unter **Environment Variables** folgende Keys hinzu:
- `OAUTH_GITHUB_CLIENT_ID`: Die Client ID deiner GitHub App.
- `OAUTH_GITHUB_CLIENT_SECRET`: Das generierte Client Secret deiner GitHub App.

*Hinweis: Falls du lokale Tests machst, erstelle eine `.env` Datei mit denselben Keys.*

---

## 3. Astro Projekt-Setup (Astro 5+)

### Installation der Integration
```bash
npm install astro-decap-cms-oauth @astrojs/vercel
```

### astro.config.mjs
Astro 5 nutzt standardmäßig `output: 'static'`, was nun auch hybride Routen unterstützt.
```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import decapCmsOauth from "astro-decap-cms-oauth";

export default defineConfig({
  output: 'static', // Astro 5 Standard
  adapter: vercel(),
  integrations: [
    decapCmsOauth(), // Stellt /oauth und /oauth/callback bereit
  ],
});
```

---

## 4. Decap CMS Konfiguration

### public/admin/config.yml
```yaml
backend:
  name: github
  repo: dein-user/dein-repo
  branch: main
  base_url: https://deine-domain.de # Zwingend erforderlich für eigene Proxies
  auth_endpoint: oauth # Entspricht dem Pfad der Integration
```

### src/pages/admin.astro (Robuste Initialisierung)
Um "Netlify-Redirects" zu vermeiden, ist eine manuelle Initialisierung in der `admin.astro` am sichersten:

```astro
---
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <script is:inline>window.CMS_MANUAL_INIT = true;</script>
    <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>
    <script is:inline>
      const CMS = window.CMS || window.NetlifyCMS;
      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'dein-user/dein-repo',
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'oauth'
          },
          // ... restliche config (collections etc.)
        }
      });
    </script>
  </body>
</html>
```

---

## Common Errors & Fixes

| Fehler | Ursache | Lösung |
| :--- | :--- | :--- |
| `client_id=undefined` | Env-Variablen falsch benannt oder Vercel-Deployment nicht aktuell. | Namen prüfen (`OAUTH_GITHUB_CLIENT_ID`) und neu redeployen. |
| Redirect zu `api.netlify.com` | `base_url` fehlt in der Config oder CMS nutzt Default-Werte. | `base_url` und `auth_endpoint: oauth` explizit setzen. |
| `Resource not accessible` | GitHub App ist nicht im Repo installiert. | GitHub App Settings -> Install App -> Repo auswählen. |
| 404 bei `/oauth/callback` | Astro ist nicht im Hybrid/Server Modus. | `adapter` in `astro.config.mjs` prüfen und sicherstellen, dass Integration aktiv ist. |
