# Movie Handbook — Project Notes

A dark, cinematic movie and TV discovery app built with Next.js 16 and the TMDB API.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** MUI v6 with a fully custom dark design system (`app/globals.css`)
- **Data:** [TMDB API](https://www.themoviedb.org/documentation/api) — movies, TV shows, cast, trailers, recommendations
- **Deployment:** Netlify with zero-config OpenNext adapter
- **Fonts:** Space Grotesk (headings) + Inter (body) via Google Fonts
- **Images:** `next/image` with WebP optimisation; TMDB CDN + local fallbacks

## Key Features

- **Homepage** — cinematic hero with a live trending item, three horizontal content rows, and a search CTA
- **Listing pages** — movies and TV shows with genre filters, pagination, and poster grids
- **Trending page** — filterable by media type and time window (day / week)
- **Search** — full-text TMDB search with pagination and a polished empty state
- **Detail pages** — backdrop hero, poster, rating badge, cast scroller, trailer modal, info panel, keyword pills, and recommendations
- **Responsive** — mobile-first layout with a sticky glass nav, bottom tab bar on small screens, and a slide-out mobile drawer

## Notable Implementation Details

- Migrated from Gatsby to Next.js (App Router), preserving all listing routes and adding 308 redirects for `/series` and `/tv/:id`
- `useTmdbList` custom hook handles fetch/loading/error/ignore-on-unmount for all list endpoints
- Coupled `{ filter, page }` state pattern avoids the `react-hooks/set-state-in-effect` lint error on pages that need to reset pagination when filters change
- SVG circular progress ring for the rating badge — green ≥ 7, yellow ≥ 4, red below
- All TMDB images converted to WebP at build time via `next/image` formats config
- `parseDateLocal` splits YYYY-MM-DD strings before constructing a `Date` to prevent UTC midnight timezone off-by-one

## Accessibility

- `:focus-visible` outlines on all interactive elements
- Semantic HTML throughout (`<nav>`, `<main>`, `<aside>`, `<section>`)
- `role="status"` on loading and message states
- All icon-only buttons have `aria-label`
- Colour contrast reviewed against WCAG AA on the navy/blue palette

## Environment

Requires one environment variable:

```
NEXT_PUBLIC_TMDB_API=your_tmdb_api_key_here
```

Get a free key at [themoviedb.org](https://www.themoviedb.org/settings/api). Add it to `.env.local` locally or to Netlify site environment variables for production.
