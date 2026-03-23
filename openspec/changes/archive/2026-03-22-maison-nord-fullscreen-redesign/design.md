## Context

Maison Nord is a static Astro site. The current layout uses a normal vertical scroll page with 7 sections. The redesign replaces all content sections with a fullscreen slide architecture: `html` and `body` become `overflow: hidden`, a slides container holds all slides stacked vertically, and a JavaScript navigator translates the container to show one slide at a time via `transform: translateY(-N * 100vh)`.

The site has no backend and no build-time data fetching — all content is hardcoded in Astro components. EmailJS handles the contact form via client-side JS.

## Goals / Non-Goals

**Goals:**
- Replace the entire page layout with a slide-based fullscreen navigator
- Smooth vertical CSS transform transitions between slides
- Keyboard (↑↓ / ←→) + mouse wheel + touch swipe navigation
- Persistent minimal navbar: wordmark left, slide counter right (e.g. `01 / 06`)
- Typographic intro slide (no photo, black bg)
- 6 fullscreen project slides (photo + caption bar)
- 1 Studio slide with compacted About / Services / Contact
- Preserve EmailJS contact form in Studio slide
- Works on mobile (swipe navigation, caption overlay readable)

**Non-Goals:**
- Animated page transitions between routes (no routing)
- Lazy-loading images via IntersectionObserver (all 6 project images preload)
- CMS or dynamic content
- Testimonials section (removed entirely in this redesign)
- Dedicated "/project/:slug" detail pages

## Decisions

### Decision 1 — CSS transform slide vs. scroll-snap

**Choice:** Manual `transform: translateY(-index * 100vh)` controlled by JS, not CSS scroll-snap.

**Rationale:** CSS scroll-snap can fire during accidental partial scrolls and is harder to throttle. Manual JS gives full control: we can debounce wheel events to prevent rapid multi-slide jumps, and we can drive the slide counter in the navbar precisely. `transition: transform 600ms cubic-bezier(0.77, 0, 0.18, 1)` gives the smooth deceleration feel.

**Alternative considered:** `scroll-snap-type: y mandatory` — simpler but loses counter sync and debounce control.

---

### Decision 2 — Single JS file vs. Astro `<script>` inline

**Choice:** Single `src/scripts/slideNavigator.ts` imported into the Layout component via `<script>`.

**Rationale:** Astro bundles `<script>` tags automatically. Keeping navigator logic in a named `.ts` file makes it testable and readable. The navigator needs to run once on the client — Astro's client hydration model is not needed (no framework components).

---

### Decision 3 — Slide data: hardcoded vs. Astro content collections

**Choice:** Keep data hardcoded in component props arrays (same as current Gallery/Services).

**Rationale:** This is a demo portfolio site. Content collections add `content/` directory overhead and type generation complexity for no real benefit at this scale. Data stays in the component files exactly as it is now.

---

### Decision 4 — Studio slide layout

**Choice:** Three-column layout on desktop (About | Services | Contact), single column on mobile.

**Rationale:** The Studio slide is the only non-photo slide other than Intro. Cramming everything into a narrow single column would look poor on desktop. Three columns mirrors the editorial "information density" aesthetic while keeping the slide within viewport height — text + services list + small contact form must all fit without scrolling.

**Constraint:** Studio slide must NOT require internal scrolling. If content overflows, it must be trimmed. Services list condensed to name-only (no descriptions). Contact form: name + email + message only, same as current.

---

### Decision 5 — Wheel event debouncing

**Choice:** Accept one slide change per wheel event sequence, with a 800ms cooldown after each transition.

**Rationale:** MouseWheel fires many events per physical scroll gesture. Without debouncing, a single scroll flicks through 3–4 slides. 800ms matches the 600ms transition + 200ms buffer — user can initiate next slide immediately after previous has settled.

---

### Decision 6 — Mobile navigation

**Choice:** Touch swipe (touchstart / touchend delta ≥ 50px triggers slide change) + arrow buttons shown on mobile.

**Rationale:** No wheel events on touch devices. Swipe is natural. Arrow buttons (↑ ↓) as fixed UI elements give a fallback for users who don't discover swipe.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Studio slide content overflows viewport height on small laptops (768px height) | Cap font sizes; services list = names only, no descriptions; limit contact form to 3 fields with compact styling |
| `overflow: hidden` on `body` breaks browser scrollbar hints / accessibility | Add `role="application"` to slide container; ensure keyboard focus management between slides via `tabindex` |
| 6 fullscreen images (each ~200–400KB webp) slow initial load | Hero image (slide 01) loads `eager`; slides 02–06 load `lazy`; all images already exist in `/public/images/projects/` |
| Wheel event interferes with browser zoom (Ctrl+scroll) | Check `event.ctrlKey` — skip slide navigation when true |

## Migration Plan

1. Create new components (`IntroSlide`, `ProjectSlide`, `StudioSlide`, `GalleryNavigator`)
2. Create `slideNavigator.ts` script
3. Update `global.css`
4. Rewrite `index.astro`
5. Delete old section components
6. Verify at `localhost:4321` — all 8 slides navigable, mobile swipe works, EmailJS form operational

**Rollback:** Old components are Astro files — git revert restores them instantly. No database migrations.
