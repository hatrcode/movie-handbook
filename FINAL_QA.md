# Final QA

## Portfolio Polish Pass

Final pass to bring the project to portfolio-ready standard.

### Copy and labels

| Location | Before | After |
|----------|--------|-------|
| Hero fallback headline | "Movie Handbook" | "Find your next film night in seconds." |
| Hero fallback eyebrow | "Cinema starts here" | "Movie discovery" |
| Hero fallback buttons | "View Details / Browse Trending" | "Browse Movies / What's Trending" |
| Search empty heading | "Find movies, shows and people" | "Search the movie universe" |
| Search empty eyebrow | "Search the catalogue" | "Search" |
| Search no-results | Plain `<div>` with "Sorry…" copy | `StatusMessage` with friendly copy + Trending CTA |
| Listing page body copy | "Browse curated TMDB results with quick ratings, stable poster grids and genre filters." | Filter-specific, user-focused descriptions per page |
| Trending body copy | "See what audiences are watching across TMDB right now." | "What audiences are watching and talking about right now." |
| Trending error state | "Unable to load trending data" | "Something went wrong" |
| Trending empty state | "TMDB did not return any trending items…" | "Nothing trending right now" |
| MediaListPage error | "Unable to load TMDB data" | "Something went wrong" |
| MediaListPage empty | "TMDB did not return any items…" | "Nothing here yet" |
| Search CTA heading | "Search across movies and shows" | "Find any film or show instantly" |
| Movie detail facts | `<strong>Director</strong>` (no colon) | `<strong>Director:</strong>` |
| Show detail facts | `<strong>Creator</strong>` (no colon) | `<strong>Creator:</strong>` |
| Movie/Show info panel | `<h2>Information</h2>` | `<h2>Details</h2>` |
| Show detail cast section | "Show Cast" | "Cast" |

### Label consistency

| Location | Before | After |
|----------|--------|-------|
| Trending dropdown | "Movies this week" / "Tv shows this week" | "Movies This Week" / "TV Shows This Week" |
| Mobile drawer | "Movie" (collapse button) | "Movies" |
| `app/movies/top-rated` title | "Top-rate Movies" (typo) | "Top Rated Movies" |

### Accessibility

- `LoadingSkeleton` now has `role="status"` and `aria-label="Loading content"` for screen readers.
- Removed unused `Link` + `Button` import from `SearchPageClient` after replacing the no-results `div` with `StatusMessage`.

### CSS polish

- `detail-tagline`: added `margin-top`, slightly larger font size.
- `detail-overview`: added `margin-top`, improved `line-height` to 1.7.
- `detail-facts`: tightened gap from 0.35rem → 0.4rem, margin-top 1rem → 1.1rem.
- `.trailer-button`: margin-top 1rem → 1.5rem; contained variant gets 1rem font and more generous padding for a premium feel.

### Portfolio documentation

- Created `PROJECT_NOTES.md` with stack, key features, implementation notes, accessibility summary and environment setup.

Post-pass results:
- `npm run lint`: ✓ clean (0 errors, 0 warnings)
- `npm run build`: ✓ passed — 11 routes, no type errors

### Remaining limitations

- Browser screenshot / visual QA not possible in this environment (no Chromium).
- TMDB-backed live data should be verified in a browser with `NEXT_PUBLIC_TMDB_API` set.
- `npm audit` still reports 2 moderate vulnerabilities through Next.js → `postcss`; not fixed as the only resolution path downgrades Next to 9.3.3.

## Visual Identity Refresh (Blue/Navy Palette)

Updated the design system to a premium navy/blue identity:

| Token | Before | After |
|-------|--------|-------|
| `--bg` | `#050608` (near-black) | `#050816` (deep navy) |
| `--accent` | `#ff3d5a` (red) | `#3b82f6` (blue-500) |
| `--accent-2` | `#8b5cf6` (purple) | `#38bdf8` (sky-400) |
| `--gradient-brand` | red → purple → sky | blue → sky (2-stop) |
| `--font-display` | Manrope | Space Grotesk |
| Eyebrow labels | amber | sky-400 (`--accent-2`) |
| Search focus ring | amber | blue |
| Card hover glow | red/purple | blue/sky |
| Nav/mobile bg | `rgba(5,6,8,…)` | `rgba(5,8,22,…)` (navy) |
| Hero/detail overlays | pure black | navy (`rgba(5,8,22,…)`) |
| Title gradients | white → purple | white → blue |

MUI theme updated: `primary.main #3b82f6`, `secondary.main #38bdf8`, background colours match navy tokens.

Post-change results:
- `npm run lint`: ✓ clean
- `npm run build`: ✓ passed — 11 routes, no type errors

## 2026 Visual Redesign Pass

- Redesigned the site around a dark cinematic visual system with near-black backgrounds, glass panels, blue/navy/sky accents, rounded poster cards, premium nav, and responsive page shells.
- Added reusable UI components:
  - `PageShell`
  - `SectionHeader`
  - `HeroBanner`
  - `MediaCard`
  - `RatingBadge`
  - `LoadingSkeleton`
- Homepage now has a poster-led hero, Trending Now, Popular Movies, Popular Shows, and a search CTA. If `NEXT_PUBLIC_TMDB_API` is missing, it keeps the clear missing-key state.
- Listing, trending, and search pages now use consistent section headers, poster grids/rows, skeleton loading states, and glass empty/error panels.
- Movie/show detail pages now use a cinematic backdrop hero with poster, title, metadata, rating, overview, trailer CTA, cast scroller, info panel, keywords, and related media cards.
- Header/nav is sticky with translucent dark glass styling, active desktop states, keyboard-open dropdowns, and a dark mobile drawer.
- Footer was restyled to match the dark system.

## Build and Tooling

- `npm install`: passed after regenerating `package-lock.json` from the Next.js dependency set.
- `npm run lint`: passed after the redesign pass.
- `npm run build`: passed after the redesign pass.
- `npm run dev`: passed; local server started at `http://localhost:3000`.
- `npm run start -- --port 3001`: passed after `npm run build`; production server route checks returned the expected statuses listed below.
- `npm audit --audit-level=moderate`: reports 2 moderate vulnerabilities through Next's current `postcss` dependency. npm suggests `npm audit fix --force`, but that would downgrade Next to `9.3.3`, so it was not applied.
- Secret scan: no committed TMDB API key was found. Only the placeholder `NEXT_PUBLIC_TMDB_API=your_tmdb_api_key_here` appears in `.env.example` and `README.md`.

## Local Route Checks

Checked with the production Next server running locally on `http://localhost:3001`:

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/search` | 200 |
| `/search?s=matrix` | 200 |
| `/trending` | 200 |
| `/movies` | 200 |
| `/movies/upcoming` | 200 |
| `/movies/top-rated` | 200 |
| `/movie/580489` | 200 |
| `/shows` | 200 |
| `/shows/airing-today` | 200 |
| `/shows/top-rated` | 200 |
| `/show/71446` | 200 |
| `/series` | 308 redirect to `/shows` |
| `/tv/71446` | 308 redirect to `/show/71446` |

The missing-key state was also checked in production HTML without `NEXT_PUBLIC_TMDB_API` set:

| Route | Missing-key message |
| --- | --- |
| `/search?s=matrix` | Present |
| `/trending` | Present |
| `/movies` | Present |
| `/movie/580489` | Present |
| `/shows` | Present |
| `/show/71446` | Present |

## Redesign Page Checks

- `/`: redesigned homepage shell, cinematic hero fallback, search CTA, and API-key state checked.
- `/movies`, `/movies/upcoming`, `/movies/top-rated`: redesigned intro, genre filters, loading/error/empty states, and poster grid checked.
- `/shows`, `/shows/airing-today`, `/shows/top-rated`: redesigned intro, genre filters, loading/error/empty states, and poster grid checked.
- `/trending`: redesigned page intro, loading/error/empty states, and poster grid checked.
- `/search`: redesigned empty search panel and result state checked.
- `/movie/580489` and `/show/71446`: redesigned missing-key/detail shell checked. Full live TMDB detail rendering still needs `NEXT_PUBLIC_TMDB_API`.
- `/series` and `/tv/71446`: redirects checked.

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
- Poster images use fixed width/height and CSS `aspect-ratio: 2 / 3` with `object-fit: cover` in grids to avoid layout jumps.
- Image alt text is content-specific where titles/names are available, with useful fallbacks for posters and recommendations.

## Styling and Layout

- Migrated the original global CSS to `app/globals.css`.
- Added accessible `:focus-visible` outlines for links, buttons, and inputs.
- Added keyboard-open behavior for desktop dropdown navigation using `:focus-within`.
- Added a visually hidden search label while keeping the existing search design.
- Added social-link accessible labels.
- Added MUI's App Router cache provider to avoid Emotion hydration/style-order mismatches.
- Dev server logs were rechecked after the provider fix; no hydration errors appeared during route checks.
- Desktop/mobile layout was reviewed from the code and route output. The redesign uses responsive shells, poster rows, mobile two-column grids, sticky glass nav, dark mobile drawer, and bottom nav on small screens.
- Browser screenshot/mobile QA was not completed because this workspace has no Chromium/Chrome/Playwright runtime installed.

## Data and Environment

- Runtime data still comes from TMDB.
- Gatsby `GATSBY_TMDB_API` was replaced with `NEXT_PUBLIC_TMDB_API`.
- `.env.example` documents the required key, where to get it, and that it must be set locally and in Netlify environment variables.
- When `NEXT_PUBLIC_TMDB_API` is missing, API-backed pages now show a clear "TMDB API key missing" state instead of silently rendering empty lists or blank details.
- API responses are validated before detail pages render. Failed TMDB responses now show error states.

## Netlify Deployment Notes

- `netlify.toml` uses:
  - build command: `npm run build`
  - publish directory: `.next`
- Current Netlify documentation says modern Next.js apps are supported with zero configuration through Netlify's OpenNext adapter, including App Router, image optimization, and redirects/rewrites.
- The project does not pin `@netlify/plugin-nextjs`; Netlify recommends not pinning the adapter unless you intentionally need a specific version.
- Redirects are defined in both `next.config.ts` and `netlify.toml`:
  - `/series` -> `/shows`
  - `/tv/:id` -> `/show/:id`
- Before deploying, set `NEXT_PUBLIC_TMDB_API` in Netlify site environment variables.

## Senior UX/UI Review Pass

Full review documented in `SENIOR_UX_UI_REVIEW.md`. Five high-priority issues identified and fixed:

| Fix | File(s) | Detail |
|-----|---------|--------|
| MUI theme dark mode + correct font | `lib/mui-theme.ts` | Added `mode: "dark"`, palette matched to design tokens (`--accent`, `--accent-2`), font changed from `"Quicksand"` (never loaded) to `"Inter"` |
| PeopleCard rebuilt without MUI Card | `components/items/PeopleCard.tsx`, `app/globals.css` | Replaced MUI `Card`/`CardMedia` (raw `<img>`, light bg) with custom markup using `next/image`; added `.people-card` CSS matching the dark system |
| BottomNav active tab stale fix | `components/layout/BottomNav.tsx` | Removed `useState(initialValue)` pattern; active tab now derived from `usePathname()` on every render — also covers `/movie/:id` and `/show/:id` detail routes |
| `section-header` gradient border | `app/globals.css` | Replaced unreliable `border-image` (fails on single-side in Safari) with a `::before` pseudo-element using `background: var(--gradient-brand)` |
| MobileMenu "Tv Shows" capitalisation | `components/layout/MobileMenu.tsx` | Corrected to "TV Shows" |

Two lint errors (`react-hooks/set-state-in-effect`) were also fixed in the same pass:

- `TrendingPageClient`: removed `useEffect(() => setPage(1), [mediaType, time])` — replaced with coupled `{ filter, page }` state so page resets automatically when filters change, no effect needed.
- `SearchPageClient`: same pattern — `{ query, page }` state replaces the two-effect approach; `effectivePage` derives to 1 automatically when query changes.

Post-fix results:
- `npm run lint`: ✓ clean (0 errors, 0 warnings)
- `npm run build`: ✓ passed — 11 routes, Turbopack, no type errors

## Remaining Issues and Follow-Up

- Browser screenshot/mobile QA was not completed because this workspace has no Chromium/Chrome/Playwright runtime installed.
- TMDB-backed data loading should be manually checked in a browser after adding `NEXT_PUBLIC_TMDB_API`.
- The audit warning in `npm audit` remains until Next publishes or resolves the upstream `postcss` advisory without a downgrade path.
- Medium-priority UX issues documented in `SENIOR_UX_UI_REVIEW.md` (TrailerButton close button, SearchBar submit affordance, search-cta responsive gap) remain for a follow-up pass.
