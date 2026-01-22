# Bringmal.app Changelog CMS

A modern, minimalist changelog CMS built with Astro, Decap CMS, and Tailwind CSS.

## Features
- **Astro 5**: Blazing fast static site generation.
- **Decap CMS**: Git-based content management.
- **Tailwind CSS**: Modern styling.
- **Vercel Auth**: Serverless functions for GitHub OAuth flow.
- **Content Collections**: Type-safe content schemas.
- **Filtering**: Instant client-side filtering by Category and Type.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```

### 3. Vercel Deployment & OAuth Setup

1. **Create a GitHub OAuth App:**
   - Go to GitHub Settings > Developer settings > OAuth Apps > New OAuth App.
   - **Homepage URL**: `https://your-project.vercel.app`
   - **Authorization callback URL**: `https://your-project.vercel.app/api/callback`

2. **Deploy to Vercel:**
   - Import this repository to Vercel.
   - Framework Preset: **Astro**
   - Add Environment Variables:
     - `OAUTH_CLIENT_ID`: Your GitHub App Client ID
     - `OAUTH_CLIENT_SECRET`: Your GitHub App Client Secret
     - `OAUTH_REDIRECT_URI`: `https://your-project.vercel.app/api/callback` (Optional, defaults to auto-detect)

3. **Configure Repo in CMS:**
   - Open `src/pages/admin.astro`.
   - Update the `repo: 'kevineulenberg/bringmal-changelog'` field in the `CMS.init` configuration if your repository name changes.
   - The `base_url` is automatically set to `window.location.origin`, so it works on both localhost and production without manual changes.

## Content Management

Navigate to `/admin` to access the CMS.
- **Dynamic Backend**: The CMS automatically connects to your custom OAuth backend (`/api/auth`) on the current domain.
- **Changelogs**: Feature updates, fixes, etc.
- **Table Reservations**: Updates specific to the reservation system.
- **Shop**: Updates specific to the shop system.
