# Final QA

## Build and Tooling

- `npm install`: passed after regenerating `package-lock.json` from the Next.js dependency set.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run dev`: passed; local server started at `http://localhost:3000`.
- `npm run start -- --port 3001`: passed after `npm run build`; production server route checks returned 200 for `/`, `/movies`, and `/show/71446`, plus 308 redirects for `/series` and `/tv/71446`.
- `npm audit --audit-level=moderate`: reports 2 moderate vulnerabilities through Next's current `postcss` dependency. npm suggests `npm audit fix --force`, but that would downgrade Next to `9.3.3`, so it was not applied.

## Local Route Checks

Checked with the Next dev server running:

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/search` | 200 |
| `/trending` | 200 |
| `/movies` | 200 |
| `/movies/upcoming` | 200 |
| `/movies/top-rated` | 200 |
| `/shows` | 200 |
| `/shows/airing-today` | 200 |
| `/shows/top-rated` | 200 |
| `/movie/580489` | 200 |
| `/show/71446` | 200 |
| `/series` | 308 redirect to `/shows` |
| `/tv/71446` | 308 redirect to `/show/71446` |

## Live Gatsby Comparison

Compared against `https://movie-handbook.netlify.app/`.

| Live route | Result |
| --- | --- |
| `/` | 200 |
| `/search` | 301 to trailing slash |
| `/trending` | 301 to trailing slash |
| `/movies` | 301 to trailing slash |
| `/movies/upcoming` | 301 to trailing slash |
| `/movies/top-rated` | 301 to trailing slash |
| `/shows` | 301 to trailing slash |
| `/shows/airing-today` | 301 to trailing slash |
| `/shows/top-rated` | 301 to trailing slash |
| `/movie/580489` | 404 on current live Gatsby site |
| `/show/71446` | 404 on current live Gatsby site |
| `/series` | 404 on current live Gatsby site |
| `/tv/71446` | 404 on current live Gatsby site |

The migrated app preserves the listing route surface and improves legacy/incorrect paths with redirects for `/series` and `/tv/:id`.

## Metadata and SEO

- Replaced Gatsby `SEO`/`react-helmet` usage with App Router metadata in `app/layout.tsx` and per-page metadata.
- Preserved title template, description, Open Graph, Twitter card, favicon, and baseline JSON-LD webpage schema.

## Images and Assets

- Moved static assets to `public/`:
  - `cover.png`
  - `favicon.svg`
  - `noPic.svg`
- Replaced direct poster image rendering with `next/image` where practical.
- Kept remote TMDB image domains in `next.config.ts`.

## Styling and Layout

- Migrated the original global CSS to `app/globals.css`.
- Added accessible `:focus-visible` outlines for links, buttons, and inputs.
- Added MUI's App Router cache provider to avoid Emotion hydration/style-order mismatches.
- Dev server logs were rechecked after the provider fix; no hydration errors appeared during route checks.

## Data and Environment

- Runtime data still comes from TMDB.
- Gatsby `GATSBY_TMDB_API` was replaced with `NEXT_PUBLIC_TMDB_API`.
- `.env.example` documents the required key.
- Local QA route checks were performed without a TMDB API key, so pages shells/routes were verified but live TMDB result content requires setting `NEXT_PUBLIC_TMDB_API`.

## Remaining Issues and Follow-Up

- Browser screenshot/mobile QA was not completed because this workspace has no Chromium/Chrome/Playwright runtime installed.
- TMDB-backed data loading should be manually checked in a browser after adding `NEXT_PUBLIC_TMDB_API`.
- The audit warning in `npm audit` remains until Next publishes or resolves the upstream `postcss` advisory without a downgrade path.
