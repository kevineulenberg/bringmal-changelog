
Create a complete, minimalist yet modern changelog CMS using Astro JS and Decap CMS for my software "Bringmal.de". Deploy everything to Vercel with automatic rebuilds on new Decap CMS publishes.

## Project Requirements

**Tech Stack:**
- Astro 4.x (static site generation)
- Decap CMS (git-based, no database)
- Tailwind CSS for modern, minimalist styling
- Vercel deployment with GitHub integration
- Automatic Vercel rebuilds triggered by Decap commits

- Design should be light (with sand color rgb(var(--sk-sand-100)) ) and dark mode, super modern clean, glassy nice!

**Decap CMS Collections (in config.yml):**
```
1. "changelogs" 
   - Fields: title (string), version (string), date (datetime), type (select: "feature", "fix", "breaking"), content (markdown), category (select: "Table Reservations", "Shop")
   
2. "table-reservations"
   - Fields: title (string), date (datetime), content (markdown), status (select: "live", "planned")
   
3. "shop"  
   - Fields: title (string), date (datetime), content (markdown), status (select: "live", "planned")
```

**Frontend Structure:**
```
- Homepage (/): 
  - Hero section with "Bringmal.de Changelog"
  - Filterable changelog feed (all entries from all collections)
  - Filters: Category (Table Reservations/Shop/All), Type (feature/fix/breaking), Date range
  - Modern card layout with Tailwind (dark mode support)
  - Latest 3 entries highlighted

- Individual pages: /changelog/[slug] for full article view
```

## Astro Setup Requirements

1. **Content Collections**: `src/content/config.ts` with schemas matching Decap collections
2. **Pages**: 
   - `src/pages/index.astro` (filtered changelog feed)
   - `src/pages/changelog/[slug].astro` (single entry)
   - `src/pages/admin/index.astro` (Decap admin)
3. **Components**: ChangelogCard.astro, FilterBar.astro
4. **Integration**: `astro-decap-cms` plugin configured for GitHub OAuth
5. **Tailwind**: Modern design (glassmorphism, subtle animations, responsive)

## Vercel Deployment

- Single GitHub repo (monorepo)
- `vercel.json` for automatic builds on main branch
- GitHub OAuth for Decap (serverless callback at /api/auth)
- Preview deploys from feature branches

## Key Features

- Instant rebuilds (10-30s) when publishing in Decap → Vercel
- SEO-optimized (OpenGraph, sitemap)
- PWA-ready (manifest, service worker)
- Dark/Light mode toggle
- Responsive (mobile-first)
- Fast loading (Astro islands)

Generate:
1. Complete file structure
2. All Astro components + pages  
3. Full `astro.config.mjs` with Decap integration
4. Complete `public/admin/config.yml`
5. Tailwind config + CSS
6. Vercel deployment files
7. GitHub Actions for OAuth setup

Make it production-ready, copy-paste deployable to Vercel in <30 minutes. Focus on clean code, zero bloat, maximum performance.


More Docs:


Decap CMS & Astro
Decap CMS (formerly Netlify CMS) is an open-source, Git-based content management system.

Decap allows you to take full advantage of all of Astro’s features, including image optimization and content collections.

Decap adds a route (typically /admin) to your project that will load a React app to allow authorized users to manage content directly from the deployed website. Decap will commit changes directly to your Astro project’s source repository.

Installing DecapCMS
There are two options for adding Decap to Astro:

Install Decap via a package manager with the following command:

npm
pnpm
Yarn
Terminal window
npm install decap-cms-app

Import the package into a <script> tag in your page <body>

/admin
<body>
  <!-- Include the script that builds the page and powers Decap CMS -->
  <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>
</body>

Configuration
Create a static admin folder at public/admin/

Add config.yml to public/admin/:

Directorypublic
Directoryadmin
config.yml
To add support for content collections, configure each schema in config.yml. The following example configures a blog collection, defining a label for each entry’s frontmatter property:

/public/admin/config.yml
collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "src/content/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    fields: # The fields for each document, usually in frontmatter
      - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Featured Image", name: "thumbnail", widget: "image" }
      - { label: "Rating (scale of 1-5)", name: "rating", widget: "number" }
      - { label: "Body", name: "body", widget: "markdown" }

Add the admin route for your React app in src/pages/admin.html.

Directorypublic
Directoryadmin
config.yml
Directorysrc
Directorypages
admin.html
/src/pages/admin.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>
  </body>
</html>

To enable media uploads to a specific folder via the Decap editor, add an appropriate path:

/public/admin/config.yml
media_folder: "src/assets/images" # Location where files will be stored in the repo
public_folder: "src/assets/images" # The src attribute for uploaded media

See the Decap CMS configuration documentation for full instructions and options.

Usage
Navigate to yoursite.com/admin/ to use the Decap CMS editor.

Authentication
Decap CMS with Netlify Identity
Decap CMS was originally developed by Netlify and has first class support for Netlify Identity.

When deploying to Netlify, configure Identity for your project via the Netlify dashboard and include the Netlify Identity Widget on the admin route of your project. Optionally include the Identity Widget on the homepage of your site if you plan to invite new users via email.

Decap CMS with External OAuth Clients
When deploying to hosting providers other than Netlify, you must create your own OAuth routes.

In Astro, this can be done with on-demand rendered routes in your project configured with an adapter enabled.

See Decap’s OAuth Docs for a list of compatible community-maintained OAuth clients.

Community Resources
Netlify Identity Template: astro-decap-ssg-netlify

On-demand rendering OAuth Routes with Astro Template: astro-decap-starter-ssr

Blog Post: Author your Astro site’s content with Git-based CMSs by Aftab Alam

Youtube Tutorial: Create a Custom Blog with Astro & NetlifyCMS in MINUTES! by Kumail Pirzada

Production Sites
The following sites use Astro + Decap CMS in production:

yunielacosta.com by Yuniel Acosta — source code on GitHub (Netlify CMS)
portfolioris.nl by Joris Hulsbosch – source code on GitHub
