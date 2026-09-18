# Wanderlane — Responsive Tour & Travel Website

A static, responsive marketing site for a fictional tour operator, built with **React 19 + Vite**.
The build deliberately focuses on three things: **component decomposition**, **passing props
through a component tree**, and **CSS written for React** (CSS Modules over a global token layer).

No UI kit, no CSS framework, no state library — everything is hand-rolled so the structure stays visible.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint     # oxlint
```

Requires Node 20.19+ (built and tested on Node 24).

---

## Project structure

```
src/
├── App.jsx                     # owns all shared state, passes it down
├── main.jsx
├── index.css                   # design tokens, reset, layout primitives
├── data/                       # static content, separated from presentation
│   ├── destinations.js
│   ├── packages.js
│   ├── testimonials.js
│   └── site.js
└── components/
    ├── icons/index.jsx         # inline SVG icon set
    ├── ui/                     # reusable, content-agnostic primitives
    │   ├── Button/
    │   ├── Badge/
    │   ├── Card/
    │   ├── IconButton/
    │   ├── Rating/
    │   └── SectionHeading/
    ├── layout/
    │   ├── Navbar/             # Navbar.jsx + MobileDrawer.jsx
    │   └── Footer/
    └── sections/
        ├── Hero/
        ├── Destinations/       # DestinationsSection → FilterTabs + DestinationGrid → DestinationCard
        ├── Packages/           # PackagesSection → PackageCard
        ├── Testimonials/       # TestimonialsSection → TestimonialCard
        └── Contact/
```

Every component sits in its own folder next to its `*.module.css`, so styles move with the component.

---

## Reusable components

These six are content-agnostic and used in multiple places:

| Component        | Props                                                       | Used by                                    |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------ |
| `Button`         | `variant`, `size`, `href`, `fullWidth`, `type`, `onClick`     | Hero, cards, drawer, navbar, contact form   |
| `Badge`          | `tone`                                                        | Destination tags, highlights, "Most booked" |
| `Card`           | `as`, `elevation`, `interactive`                              | Destination, package and testimonial cards  |
| `IconButton`     | `label`, `variant`, `active`                                  | Wishlist heart, hamburger, drawer close     |
| `Rating`         | `value`, `count`, `max`, `size`, `showValue`                  | Destination cards, testimonials             |
| `SectionHeading` | `eyebrow`, `title`, `subtitle`, `align`, `as`                 | Every page section                          |

`Button` renders an `<a>` when given `href` and a `<button>` otherwise. `Rating` clips a filled star
layer to a percentage width, so fractional scores like `4.8` render without half-star artwork.

---

## Props drilling: how state moves

All shared state lives in `App.jsx`. Nothing below it owns application state — child components
receive values and callbacks and pass the relevant slice further down.

```
App  (activeRegion, searchQuery, savedIds, selectedPackageId)
│
├── Navbar                    ← brandName, links, wishlistCount, onWishlistClick
│     └── MobileDrawer        ← links, brandName, onClose
│
├── Hero                      ← searchQuery, onSearchChange, stats
│
├── DestinationsSection       ← destinations, regions, activeRegion, onRegionChange,
│    │                          savedIds, onToggleSave, onClearFilters
│    ├── FilterTabs           ← regions, activeRegion, onRegionChange
│    └── DestinationGrid      ← destinations, savedIds, onToggleSave, onClearFilters
│          └── DestinationCard ← destination, isSaved, onToggleSave
│                └── Badge / Rating / IconButton / Button
│
├── PackagesSection           ← packages, selectedPackageId, onSelectPackage
│     └── PackageCard         ← tourPackage, isSelected, onSelect
│
├── TestimonialsSection       ← testimonials
│     └── TestimonialCard     ← testimonial
│
└── ContactSection            ← destinations, selectedPackage, savedCount
```

Two chains are worth tracing:

1. **Wishlist (4 levels down, then back up).** `savedIds` starts in `App`, travels through
   `DestinationsSection` → `DestinationGrid` → `DestinationCard`, which receives only the derived
   boolean `isSaved`. Clicking the heart calls `onToggleSave(id)` — the same function `App` defined —
   so the navbar badge and the "Saved trips" row in the contact summary update in the same render.

2. **Search + region filter.** The hero's input is controlled by `App` via `searchQuery` /
   `onSearchChange`; `FilterTabs` controls `activeRegion` the same way. `App` combines both in a
   `useMemo` and passes only the filtered array down, so the grid never filters anything itself.

Local state is used only where it is genuinely local: the drawer's open flag and the header's
scrolled flag in `Navbar`, and the submitted flag in `ContactSection`.

---

## CSS approach

- **`src/index.css`** holds design tokens (colour ramps, fluid type scale, spacing, radii, shadows),
  the reset, and three layout primitives (`.container`, `.section`, `.sr-only`).
- **CSS Modules** everywhere else. Class names are locally scoped, so `.card`, `.head` and `.grid`
  can be reused in different files without collisions.
- Variant styling is done by composing module classes in JS
  (`[styles.button, styles[variant], styles[size]].join(" ")`), with CSS custom properties
  (`--btn-bg`) doing the per-variant work inside the stylesheet.

## Responsive behaviour

Mobile-first; breakpoints are added only where a layout actually breaks.

| Width    | Behaviour                                                                       |
| -------- | ------------------------------------------------------------------------------- |
| < 620px  | Single-column grids, stacked hero search, horizontally scrollable filter tabs     |
| ≥ 620px  | Destination grid → 2 columns                                                      |
| ≥ 720px  | Hero search becomes a single row; testimonials use `auto-fit` columns              |
| ≥ 880px  | Desktop nav replaces the hamburger; drawer no longer reachable                     |
| ≥ 900px  | Contact section splits into summary + form columns                                |
| ≥ 1000px | Destination and package grids → 3 columns                                         |

Type scales fluidly with `clamp()` rather than stepping at breakpoints, and grids use
`repeat(auto-fit, minmax(...))` where the column count does not need to be exact.

The mobile drawer is rendered through `createPortal` into `document.body`: the sticky header uses
`backdrop-filter`, which makes it a containing block and would otherwise clip the fixed-position
drawer to the header's own height.

## Accessibility notes

- Skip link, one `<h1>`, and section headings in order.
- The wishlist and package buttons expose `aria-pressed`; filter tabs use `role="tab"` / `aria-selected`.
- The drawer is `role="dialog"` with `aria-modal`, closes on Escape, and locks background scroll.
- Result count is announced via `aria-live="polite"`.
- `prefers-reduced-motion` disables transitions and smooth scrolling.

## Notes

Destination photography is hot-linked from Unsplash and avatars from pravatar, so the page needs a
network connection to show imagery. For an offline or production deployment, download the assets into
`src/assets/` and import them instead.
