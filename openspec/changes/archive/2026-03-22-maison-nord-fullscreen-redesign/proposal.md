## Why

The current Maison Nord site uses a conventional vertical "agency tour" layout — Hero → About → Services → Gallery → Testimonials → Contact — that reads as a generic template rather than a premium design studio. The redesign replaces this with a fullscreen slide-based navigator where each project occupies the entire viewport, asserting that the work itself is the brand.

## What Changes

- **BREAKING** — Remove `Hero.astro`, `About.astro`, `Services.astro`, `Gallery.astro`, `Testimonials.astro`, `ContactSection.astro` (all existing page sections)
- **BREAKING** — Replace single-scroll layout in `index.astro` with a slide container architecture
- Add `IntroSlide.astro` — typographic black opening slide (studio name, tagline, "Selected Work ↓")
- Add `ProjectSlide.astro` — reusable fullscreen project component (photo + caption bar)
- Add `StudioSlide.astro` — final slide combining About / Services / Contact in one view
- Add `GalleryNavigator.astro` — persistent navbar with wordmark + slide counter (01/06)
- Add `slideNavigator.ts` — client JS managing slide transitions (vertical smooth slide), keyboard ↑↓ / ←→, wheel events, touch swipe
- Update `global.css` — `html, body { overflow: hidden; height: 100% }` + slide transition utilities

## Capabilities

### New Capabilities
- `fullscreen-gallery-nav`: Fullscreen slide-by-slide project gallery with smooth vertical transitions, keyboard and scroll navigation, and an intro + studio bookend slide

### Modified Capabilities
- `homepage-layout`: Navigation bar changes from sticky scroll-reactive to persistent minimal counter bar; overall page layout model changes from vertical scroll to slide-based
- `services-gallery`: Gallery is no longer a grid section — projects are now fullscreen slides; services move to the Studio slide
- `contact-section`: Contact is no longer a standalone section — it lives compacted inside the Studio slide alongside About and Services

## Impact

- **All Maison Nord component files** — 5 existing section components deleted, 4 new components created
- `src/pages/index.astro` — fully rewritten
- `src/styles/global.css` — overflow and slide CSS additions
- No new npm dependencies (vanilla JS, CSS transforms only)
- No API or data model changes
- EmailJS integration preserved — moved into StudioSlide contact form
