# Movie Handbook Gatsby to Next.js Migration Plan

## Stage 1 Audit: Current Gatsby Structure

Movie Handbook is a small Gatsby 4 + React 17 application. It does not use local Markdown/MDX pages in practice, even though MDX and filesystem source plugins are installed. Runtime content comes from The Movie Database (TMDB) API through client-side React hooks and page effects.

### Root files

- `gatsby-config.js`
  - Loads `.env.${process.env.NODE_ENV}` via `dotenv`.
  - Defines `siteMetadata` from `src/config/website.js`.
  - Registers image, manifest, MDX, sitemap, Sharp, and filesystem plugins.
- `gatsby-browser.js`
  - Exports `wrapRootElement`.
- `gatsby-ssr.js`
  - Exports `wrapRootElement`.
- `package.json`
  - Gatsby scripts: `develop`, `start`, `build`, `serve`, `clean`.
  - Gatsby dependencies and plugins.
  - React 17.
- `package-lock.json`
- `README.md`
- `.gitignore`

### Source folders

- `src/pages`
  - Gatsby file-system routes.
- `src/components/layout`
  - Layout shell, navbar, mobile nav, bottom nav, footer, SEO.
- `src/components/items`
  - Listing cards, pagination, genre chips, detail helper cards, listing template.
- `src/hooks`
  - `useFetch` for TMDB list requests.
  - `useGerne` typo-named genre query helper.
- `src/constants`
  - TMDB image URLs, nav links, social links, sample/static TMDB data.
- `src/config`
  - Website metadata, MUI theme, date formatter, Gatsby root wrapper.
- `src/css`
  - Global CSS.
- `src/images`
  - `cover.png`, `favicon.svg`, `noPic.svg`.

## Gatsby-Specific Files, APIs, Plugins, and Dependencies

### Files to remove or replace

- `gatsby-config.js`
- `gatsby-browser.js`
- `gatsby-ssr.js`
- `src/config/wrapRootElement.js`
- `src/components/layout/SEO.js`

### Gatsby APIs and patterns

- `Link` from `gatsby`
  - Used throughout layout, cards, 404, search, and detail pages.
  - Replace with `next/link` and `href`.
- `useStaticQuery` and `graphql`
  - Used only in `src/components/layout/SEO.js`.
  - Replace with Next.js `metadata` exports and/or `generateMetadata`.
- `react-helmet`
  - Used only through `SEO.js`.
  - Replace with App Router metadata.
- `wrapRootElement`
  - Used to provide MUI theme globally.
  - Replace with an App Router provider component mounted from `app/layout`.
- `process.env.GATSBY_TMDB_API`
  - Used in client-side TMDB fetches.
  - Replace with `NEXT_PUBLIC_TMDB_API` for browser-side fetches, or `TMDB_API_KEY` if moving calls server-side.

### Gatsby plugins currently configured

- `gatsby-plugin-image`
- `gatsby-plugin-react-helmet`
- `gatsby-plugin-sitemap`
- `gatsby-plugin-manifest`
- `gatsby-plugin-mdx`
- `gatsby-plugin-sharp`
- `gatsby-transformer-sharp`
- `gatsby-source-filesystem` for `src/images`
- `gatsby-source-filesystem` for `src/pages`

### Dependencies to remove during cleanup

- `gatsby`
- `gatsby-plugin-image`
- `gatsby-plugin-manifest`
- `gatsby-plugin-mdx`
- `gatsby-plugin-react-helmet`
- `gatsby-plugin-sharp`
- `gatsby-plugin-sitemap`
- `gatsby-source-filesystem`
- `gatsby-transformer-sharp`
- `react-helmet`
- `@mdx-js/mdx`
- `@mdx-js/react`
- `@loadable/component` unless a later audit finds active usage

### Dependency issue found

- `src/components/items/Genres.js` imports `axios`, but `axios` is not listed in `package.json`.
  - During migration, replace this with native `fetch` instead of adding `axios`.

## Current Pages and Routes

| Gatsby file | Current URL | Next.js App Router target |
| --- | --- | --- |
| `src/pages/index.js` | `/` | `app/page.tsx` |
| `src/pages/search.js` | `/search?s=query` | `app/search/page.tsx` |
| `src/pages/trending.js` | `/trending?media_type=movie&time=week` | `app/trending/page.tsx` |
| `src/pages/movies/index.js` | `/movies` | `app/movies/page.tsx` |
| `src/pages/movies/upcoming.js` | `/movies/upcoming` | `app/movies/upcoming/page.tsx` |
| `src/pages/movies/top-rated.js` | `/movies/top-rated` | `app/movies/top-rated/page.tsx` |
| `src/pages/shows/index.js` | `/shows` | `app/shows/page.tsx` |
| `src/pages/shows/airing-today.js` | `/shows/airing-today` | `app/shows/airing-today/page.tsx` |
| `src/pages/shows/top-rated.js` | `/shows/top-rated` | `app/shows/top-rated/page.tsx` |
| `src/pages/movie/[id].js` | `/movie/:id` | `app/movie/[id]/page.tsx` |
| `src/pages/show/[id].js` | `/show/:id` | `app/show/[id]/page.tsx` |
| `src/pages/404.js` | 404 page | `app/not-found.tsx` |

### URL compatibility notes

- Existing `ItemCard` links TV items to `/show/:id`.
- Existing TV detail recommendations link to `/tv/:id`, which does not match an existing Gatsby page. Prefer preserving the real working route `/show/:id` and optionally add a redirect from `/tv/:id` to `/show/:id`.
- Existing bottom nav and `navbarLinks.links` point to `/series`, but the actual TV listing route is `/shows`. Fix to `/shows`; optionally add a redirect from `/series` to `/shows`.

## Components That Can Be Reused With Small Changes

- `Footer`
  - Can remain mostly unchanged.
- `SearchBar`
  - Can remain a simple GET form to `/search`.
- `ItemCards`
  - Can remain a mapper around `ItemCard`.
- `ItemPagination`
  - Can remain client-side, with a type-safe event handler.
- `PeopleCard`
  - Can remain mostly unchanged; update local fallback image import/public path.
- `dateConvert`
  - Can move to `lib/date.ts`.
- `muiTheme`
  - Can move to `lib/mui-theme.ts`.
- CSS in `src/css/main.css`
  - Can move to `app/globals.css` as the baseline.

## Components That Need Rewriting or Careful Conversion

- `Layout`
  - In Next, `app/layout.tsx` owns the document shell.
  - Keep a reusable `components/layout/SiteLayout.tsx` or put `Navbar`, `children`, `BottomNav`, `Footer` inside the root layout.
- `SEO`
  - Replace with Next metadata and JSON-LD where useful.
- `Navbar`, `MobileMenu`, `BottomNav`, `SubNavDrop`, `ItemCard`
  - Replace Gatsby `Link` with Next `Link`.
  - Components with MUI interaction state need `"use client"`.
- `Genres`
  - Replace `axios` with `fetch`.
  - Use `NEXT_PUBLIC_TMDB_API`.
  - Pass the actual media type instead of hardcoding `type="movie"` for TV pages.
- `ItemTemplate`
  - Keep as a client component for pagination and genre filtering.
  - Rename to something clearer like `MediaListPage`.
  - Use a TMDB helper to construct URLs.
- `useFetch`
  - Convert to TypeScript or replace with a `lib/tmdb` fetch helper plus client hook.
  - Add error handling and reset loading on URL changes.
- Dynamic detail pages
  - Convert to App Router dynamic pages.
  - They currently fetch on the client using `params`; in Next they can be server components for better metadata, but client components are acceptable for a baseline static-export-friendly migration.
  - Trailer modal state requires a nested client component if the page itself is server-rendered.

## Data and Content Source Notes

- Runtime content source: TMDB API.
- API key currently expected as `GATSBY_TMDB_API`.
- Next migration should use:
  - `NEXT_PUBLIC_TMDB_API` if requests remain browser-side.
  - `TMDB_API_KEY` if requests are moved to server components/functions.
- Static local constants:
  - `singleMovie.js`, `singleTv.js`, and `movieData.js` look like sample TMDB payloads and are not referenced by active pages/components.
  - Keep them initially, possibly under `data/fixtures`, until confirmed unused after migration.
- Local images:
  - Move `src/images/favicon.svg`, `src/images/noPic.svg`, and `src/images/cover.png` to `public/`.
- No Gatsby GraphQL content pages need recreation.
- No `generateStaticParams` is practical for `/movie/[id]` or `/show/[id]` because IDs are open-ended TMDB API data from links/search.
- Keep the app static-export friendly where possible, but TMDB detail/search routes depend on runtime query and dynamic IDs. Client-side fetches are the simplest static-hosting-compatible baseline.

## Proposed Next.js Structure

```text
app/
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
  providers.tsx
  search/page.tsx
  trending/page.tsx
  movies/page.tsx
  movies/upcoming/page.tsx
  movies/top-rated/page.tsx
  shows/page.tsx
  shows/airing-today/page.tsx
  shows/top-rated/page.tsx
  movie/[id]/page.tsx
  show/[id]/page.tsx
components/
  items/
  layout/
  SearchBar.tsx
lib/
  date.ts
  links.ts
  mui-theme.ts
  nav-links.ts
  site.ts
  tmdb.ts
data/
  fixtures/
public/
  cover.png
  favicon.svg
  noPic.svg
```

## Styling Notes

- Preserve `src/css/main.css` as the visual baseline by moving it to `app/globals.css`.
- Add accessible focus states for links, buttons, inputs, and MUI-driven controls without changing the visual design.
- Keep Quicksand font. Prefer `next/font/google` if compatible with deployment needs; otherwise preserve the existing CSS `@import`.
- Preserve existing card/list/scroller layout and MUI typography.
- Check mobile behavior for:
  - Navbar drawer.
  - Bottom navigation.
  - Search form.
  - Detail hero/poster grid.
  - Horizontal cast and recommendation scrollers.

## Deployment Notes for Netlify

- Add or update `netlify.toml`.
- For standard Next on Netlify:

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

- Ensure the Netlify Next runtime/plugin is available through Netlify’s current defaults or add the official plugin if needed.
- If choosing static export later, set `output: "export"` in `next.config` and publish `out`, but only after verifying dynamic/search routes still work as client-rendered pages.
- Environment variables needed in Netlify:
  - `NEXT_PUBLIC_TMDB_API` for the baseline browser-fetch migration.
- Suggested redirects:
  - `/series` -> `/shows`
  - `/tv/:id` -> `/show/:id`

## Stage Plan

### Stage 2: Create the Next.js app

- Replace Gatsby setup with Next.js App Router.
- Use TypeScript because the app is small and the migration blast radius is manageable.
- Install/update dependencies for Next, React, TypeScript, MUI, icons, and React Icons.
- Keep CSS/MUI baseline; no redesign.

### Stage 3: Migrate pages to App Router

- Convert each route listed above.
- Replace Gatsby `Link`.
- Use Next metadata in route files.
- Replace 404 with `not-found.tsx`.

### Stage 4: Migrate data/content

- Centralize TMDB URL construction in `lib/tmdb.ts`.
- Replace `GATSBY_TMDB_API`.
- Keep fixture constants if unused but move them out of app-critical paths.

### Stage 5: Styling and layout

- Move global CSS.
- Add focus states.
- Verify responsive layout.

### Stage 6: Clean dependencies

- Remove Gatsby and Gatsby plugins.
- Remove unused packages.
- Update scripts:
  - `dev`
  - `build`
  - `start`
  - `lint`
- Run `npm install`, `npm run build`, and `npm run lint`.

### Stage 7: Netlify deployment

- Add `netlify.toml`.
- Confirm build command and publish directory.
- Add redirects if old incorrect routes are worth preserving.

### Stage 8: QA

- Compare against `https://movie-handbook.netlify.app/`.
- Check every recreated page and route.
- Check images, links, titles/metadata, mobile layout, and console/build errors.
- Record findings in `FINAL_QA.md`.

