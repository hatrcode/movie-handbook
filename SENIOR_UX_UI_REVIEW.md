# Senior UX/UI Review — Movie Handbook (2026)

Reviewed against: 2026 streaming/movie site standards, WCAG 2.1 AA, Next.js 14 best practices.

---

## 1. What Works Well

- **Dark cinematic aesthetic** is cohesive and competitive with modern streaming sites (HBO Max, Letterboxd, JustWatch).
- **Glass-panel system** (`backdrop-filter: blur`) is consistently applied and gives depth without being overdone.
- **Hero banner** layout — poster + copy side by side — is strong and content-first.
- **Card hover overlay** showing overview text is the right UX pattern for a catalogue browser.
- **Circular score badge** (SVG ring, colour-coded green/yellow/red) is a significant upgrade and competitive with TMDB's own UI.
- **Sticky nav + bottom nav** pattern covers both desktop and mobile correctly.
- **Eyebrow → heading → body** typography hierarchy is clear on listing pages.
- **Genre chip filter** with add/remove pattern is usable and familiar.
- **Skeleton loading states** are consistently applied across all listing and home rows.
- **Redirect handling** (`/series`, `/tv/:id`) is correct and SEO-safe.
- **Error/empty/missing-key states** are all handled with glass panels — no blank screens.
- **Search pagination** (fixed in this pass) now surfaces results beyond page 1.

---

## 2. What Feels Outdated or Weak

- **MUI theme has no dark mode** (`mode: 'dark'` missing). Genre chips, Pagination, and PeopleCard render with MUI light-mode defaults — white/grey backgrounds that break the dark UI. This is visually broken.
- **MUI theme font is `"Quicksand"`**, a font never loaded anywhere. All MUI components (buttons, chips, pagination) fall back to system fonts, inconsistent with the Inter/Manrope design system.
- **PeopleCard uses MUI `CardMedia` (`<img>`)** — raw `<img>` tag, no Next.js optimisation, no WebP, no lazy-load, no CLS guard. The only component in the app not using `next/image`.
- **`section-header` left border uses `border-image`** — `border-image` overrides all border properties and has inconsistent cross-browser behaviour on single sides. Will silently fail in older Safari.
- **TrailerButton modal has no close button** — clicking anywhere closes it, but there is zero visual affordance. On mobile, accidental trailer launches have no obvious exit.
- **SearchBar has no submit button** — the search input triggers only on Enter. On mobile, users may not realise they need to press the keyboard's Go/Search key.
- **Bottom nav active state is frozen** — `useState(initialValue)` is computed once at mount. Navigating between sections leaves the tab indicator stuck on the first-load route.
- **`eyebrow::before` gradient bar** fires in every context, including `not-found.tsx` where it sits inside a div without flex alignment, causing the bar and text to stack vertically instead of sitting inline.
- **PeopleCard character name uses MUI `text.secondary`** — in dark mode, this renders as dark grey on dark grey. Illegible.

---

## 3. High-Priority Fixes

| # | Issue | File | Impact |
|---|-------|------|--------|
| H1 | MUI theme missing `mode: 'dark'`, wrong font | `lib/mui-theme.ts` | Chips, cards, pagination visually broken |
| H2 | PeopleCard uses raw `<img>`, MUI Card with light bg | `components/items/PeopleCard.tsx` | Unoptimised images, white card bg in dark UI |
| H3 | BottomNav active state stale after navigation | `components/layout/BottomNav.tsx` | Wrong tab highlighted on mobile |
| H4 | `section-header` border-image unreliable | `app/globals.css` | Left accent border fails in some browsers |
| H5 | MobileMenu label "Tv Shows" wrong capitalisation | `components/layout/MobileMenu.tsx` | Copy error visible to all mobile users |

---

## 4. Medium-Priority Improvements

| # | Issue | File |
|---|-------|------|
| M1 | TrailerButton: no visible close button on modal | `components/items/TrailerButton.tsx` |
| M2 | SearchBar: no submit button / search affordance | `components/SearchBar.tsx` |
| M3 | `eyebrow::before` bar breaks in non-flex contexts | `app/globals.css` |
| M4 | `nav-links.ts` duplicate `id` values across arrays | `lib/nav-links.ts` |
| M5 | `media-card-compact` CSS class defined in JSX but has no styles | `app/globals.css` |
| M6 | Hero `<h1>` gradient text uses `-webkit-text-fill-color` which overrides `color` for `prefers-contrast` | `app/globals.css` |
| M7 | `search-cta` 3-column grid has no medium breakpoint — orphaned button at ~800px | `app/globals.css` |

---

## 5. Mobile-Specific Issues

- **Bottom nav active state** (see H3) — affects every mobile user on navigation.
- **Hero poster hover animation** (`translateY(-16px)` on `.hero-banner:hover`) has no effect on touch devices; the `filter: drop-shadow` and transform on `.hero-poster` add GPU cost on low-end Android with no benefit.
- **`search-cta` grid** breaks to a single column at 900px but the "Open Search" button orphans below the search bar at intermediate widths.
- **TrailerButton on mobile**: no close affordance. Users on phones will have a full-screen autoplaying video with no obvious dismiss.

---

## 6. Accessibility Issues

| Severity | Issue |
|----------|-------|
| Medium | `StatusMessage` uses `role="status"` (implies live region) on a static element — should be `role="region"` with `aria-label` |
| Medium | Bottom nav active tab is stale — screen reader announces wrong active item |
| Low | `LoadingSkeleton` `div.item-list` has `aria-label="Loading media"` but no `role="list"` — assistive tech won't understand it as a list |
| Low | TrailerButton `<Modal>` closes on backdrop click only; Escape key closes it via MUI but there is no visual close button for motor-impaired users |
| Low | `eyebrow::before` decorative gradient bar has no `aria-hidden` (it's a CSS pseudo so it's already hidden from AT — this is fine) |
| Low | `section-header h2` gradient text: `-webkit-text-fill-color` transparent can reduce contrast in Windows High Contrast mode |

---

## 7. Final Recommendation

**Needs another design pass before deploy — do not ship yet.**

The core visual direction is solid and competitive. However three issues make it not production-ready:

1. **MUI dark mode missing** — genre chips and cast cards have wrong backgrounds; this is visible on every listing and detail page.
2. **PeopleCard raw img** — bypasses all image optimisation and renders a light-background card in a dark UI.
3. **BottomNav stale state** — mobile users see the wrong active tab after any navigation.

Fix these three (plus the font and border-image issues) and the site is ready for a staging review.
