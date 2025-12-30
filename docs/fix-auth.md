Für GitHub plus Vercel plus Astro plus Decap CMS ist aktuell der robusteste Weg ein serverseitiger OAuth Client direkt in deinem Astro Projekt, damit du ohne Netlify auskommst. Decap selbst beschreibt dafür das Pattern eines OAuth Proxys mit Serverless Routes, die den GitHub Login starten und danach den Code per window.postMessage an das CMS Popup zurückgeben.  ￼
Astro verweist dafür explizit auf on demand gerenderte Routes mit aktiviertem Adapter.  ￼

Empfohlene OAuth Konfiguration

Empfehlung

Nutze eine GitHub OAuth App plus einen serverseitigen OAuth Client in Astro. Das ist der geringste Aufwand und passt genau zu Decap CMS GitHub Backend Anforderungen.  ￼

Warum nicht einfach base_url mit Pfad

Es gibt einen bekannten Stolperstein: Wenn backend.base_url einen zusätzlichen Pfad enthält, kann die Kommunikation zwischen Popup und CMS fehlschlagen, weil Decap beim Origin Vergleich nur Host und Scheme vergleicht.  ￼
Darum ist die sichere Konvention: base_url ist nur die Origin, und der Pfad kommt in auth_endpoint.

Beste Umsetzung in Astro auf Vercel

Der einfachste und in der Praxis bewährte Weg ist die Astro Integration astro-decap-cms-oauth, weil sie dir Admin Route und OAuth Routes direkt bereitstellt, inklusive der passenden Env Variablen.  ￼

Unten ist eine detaillierte Arbeitsanweisung, so formuliert, dass eine Coding AI sie direkt umsetzen kann.

Arbeitsanweisung für eine Coding AI

Ziel

Astro Site mit Blog und Changelog als Markdown in GitHub Repo. Decap CMS UI unter /admin. GitHub Login funktioniert auf Vercel ohne Netlify über serverseitige OAuth Routes unter /oauth und /oauth/callback.

Schritt 1: Astro auf Vercel für on demand Routes vorbereiten
	1.	Vercel Adapter installieren und aktivieren, weil OAuth Routes serverseitig laufen müssen.  ￼
	2.	Output Modus auf hybrid setzen, damit deine normalen Seiten statisch bleiben, aber die OAuth Endpoints serverseitig laufen können.

Beispiel astro.config.ts

import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import decapCmsOauth from "astro-decap-cms-oauth";

export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [decapCmsOauth()],
});

Hinweis: Alternativ geht output: "server", ist aber meist unnötig wenn du nur OAuth serverseitig brauchst.

Schritt 2: Decap CMS konfigurieren

Lege public/admin/config.yml an. Die Integration erwartet diese Datei dort.  ￼

Wichtig:
base_url ist die Production Origin ohne Pfad
auth_endpoint ist oauth
Callback Route ist dann automatisch /oauth/callback  ￼

Beispiel public/admin/config.yml

site_url: https://DEINE_DOMAIN.tld

backend:
  name: github
  repo: GITHUB_OWNER/GITHUB_REPO
  branch: main
  base_url: https://DEINE_DOMAIN.tld
  auth_endpoint: oauth
  site_domain: DEINE_DOMAIN.tld

media_folder: "public/uploads"
public_folder: "/uploads"

publish_mode: editorial_workflow
slug:
  encoding: "unicode"
  clean_accents: true

collections:
  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    format: "frontmatter"
    extension: "md"
    slug: "{{slug}}"
    fields:
      - { name: "title", label: "Titel", widget: "string" }
      - { name: "description", label: "Beschreibung", widget: "text", required: false }
      - { name: "pubDate", label: "Datum", widget: "datetime" }
      - { name: "updatedDate", label: "Update Datum", widget: "datetime", required: false }
      - { name: "draft", label: "Entwurf", widget: "boolean", default: false, required: false }
      - { name: "tags", label: "Tags", widget: "list", required: false }
      - { name: "heroImage", label: "Hero Bild", widget: "image", required: false }
      - { name: "body", label: "Inhalt", widget: "markdown" }

  - name: "changelog"
    label: "Changelog"
    folder: "src/content/changelog"
    create: true
    format: "frontmatter"
    extension: "md"
    slug: "{{fields.version}}"
    fields:
      - { name: "version", label: "Version", widget: "string" }
      - { name: "date", label: "Datum", widget: "datetime" }
      - { name: "type", label: "Typ", widget: "select", options: ["added","changed","fixed","removed"], required: false }
      - { name: "summary", label: "Kurztext", widget: "text" }
      - { name: "body", label: "Details", widget: "markdown", required: false }

Schritt 3: GitHub OAuth App anlegen

Erzeuge eine GitHub OAuth App und setze die Callback URL exakt auf deine Production URL plus /oauth/callback.  ￼

Konkrete Werte:
	•	Homepage URL: https://DEINE_DOMAIN.tld
	•	Authorization callback URL: https://DEINE_DOMAIN.tld/oauth/callback  ￼

Schritt 4: Secrets in Vercel setzen

In Vercel Project Settings als Environment Variables:
	•	OAUTH_GITHUB_CLIENT_ID
	•	OAUTH_GITHUB_CLIENT_SECRET  ￼

Optional:
	•	PUBLIC_DECAP_CMS_VERSION oder PUBLIC_DECAP_CMS_SRC_URL falls du Version oder Quelle pinnen willst.  ￼

Schritt 5: Deploy und Test Flow
	1.	Deploy nach Vercel
	2.	Öffne https://DEINE_DOMAIN.tld/admin
	3.	Login with GitHub
	4.	Prüfe, ob Popup nach erfolgreichem Login schließt und der Editor lädt. Das Popup schickt den Code zurück, wie von Decap für OAuth Proxys vorgesehen.  ￼

Häufige Fehler und Fixes
	1.	base_url enthält einen Pfad
Fix: base_url ist nur Origin, Pfad ausschließlich über auth_endpoint lösen.  ￼
	2.	Callback URL passt nicht exakt
Fix: Callback exakt auf /oauth/callback setzen, inklusive https und Domain wie in Production.  ￼
	3.	OAuth Routes laufen statisch
Fix: Vercel Adapter aktivieren und on demand Rendering nutzen, sonst gibt es keine Serverausführung für OAuth.  ￼

Wenn du möchtest, kann ich dir als nächsten Schritt eine komplette Minimalstruktur für src/content plus Beispielseiten für Blog Archiv und Changelog Archiv in Astro skizzieren, passend zu obiger Decap Collection Struktur.