## Context

Maison Nord already has a fullscreen slide architecture, but the current implementation still carries assumptions from the removed long-scroll version. The active gallery counter is hardcoded, project slides use a split image/detail layout instead of image-led fullscreen compositions, the Studio slide depends on rigid `100vh` fitting, and both the custom cursor and Playwright QA still target obsolete gallery-card and section patterns.

This change needs a design document because it crosses page data, multiple Astro components, gallery navigation logic, responsive layout behavior, and QA. The site must stay lightweight and static-first: no new backend, no CMS migration, and no new runtime dependency should be required to deliver the editorial polish.

## Goals / Non-Goals

**Goals:**
- Align the implemented fullscreen experience with the intended editorial gallery direction.
- Make navigation state accurate from the first render through the final Studio slide.
- Move project slides to photography-first compositions with compact metadata.
- Preserve Studio slide usability on mobile and low-height viewports without clipping contact content.
- Replace stale interaction hooks and stale QA coverage with behaviors that match the current fullscreen architecture.

**Non-Goals:**
- Rebrand Maison Nord from scratch with a new palette, font system, or content strategy.
- Introduce a backend, CMS, or dynamic project source.
- Add complex motion systems or new animation libraries.
- Expand the site beyond the current intro, six projects, and final Studio slide structure.

## Decisions

### 1. Introduce an explicit slide metadata contract

Each rendered slide should expose enough metadata for the navigator and QA to reason about it without depending on DOM position alone. Project data in `index.astro` should be expanded with city/location fields, and slide markup should expose stable attributes such as slide type, project index, and navigation theme.

Why this approach:
- It lets the navigator derive intro/project/studio states accurately on first render.
- It removes brittle logic tied to hardcoded totals or CSS-only assumptions.
- It gives QA stable selectors that survive visual refactors.

Alternative considered:
- Infer everything from slide order and element text. Rejected because it stays fragile and makes future content changes riskier.

### 2. Make project slides full-bleed and caption-led

`ProjectSlide.astro` should become an image-first fullscreen slide with a compact caption rail anchored at the bottom. The caption carries the project name, category, city, year, and optional short descriptive line while the image owns the viewport.

Why this approach:
- It matches the premium portfolio direction already implied by the existing specs.
- It gives the work visual priority instead of splitting attention with a large static text column.
- It simplifies responsive behavior by keeping one dominant image surface and one compact metadata block.

Alternative considered:
- Keep the split image/detail layout and only refine spacing. Rejected because it preserves the current “case study” feel instead of an editorial gallery.

### 3. Use responsive Studio modes instead of one rigid viewport fit

The Studio slide should keep its composed three-column spread on desktop, but it should switch to a constrained-view strategy on mobile and low-height viewports. That strategy can use tighter spacing, stacking, and controlled overflow for the Studio content area rather than allowing content to become unreachable.

Why this approach:
- The current global `overflow: hidden` model makes clipped content a hard failure.
- Contact usability matters more than preserving a no-scroll illusion on very small screens.
- Desktop can still satisfy the “single composed view” requirement while smaller viewports get a safe fallback.

Alternative considered:
- Preserve a strict no-scroll rule on every viewport. Rejected because it turns the final slide into a content trap on constrained screens.

### 4. Scope interaction polish to real fullscreen targets

Navigation and cursor behavior should be aware of interaction context. The custom cursor must no longer depend on removed gallery-card hover targets, and fullscreen navigation should avoid interfering with form input on the Studio slide.

Why this approach:
- It removes broken or dead hover states.
- It reduces accidental slide changes while the user is typing or interacting with controls.
- It keeps the polished feel without introducing “clever” behavior that fights the user.

Alternative considered:
- Leave global handlers and simply retarget selectors. Rejected because that still treats every interaction surface as equivalent and does not address form-focused navigation conflicts.

### 5. Rewrite QA around fullscreen semantics

The QA suite should validate the actual fullscreen architecture: intro state, slide count semantics, project caption readability hooks, mobile navigation controls, Studio accessibility on constrained viewports, and cursor fallback behavior.

Why this approach:
- Current tests still assert removed section IDs and obsolete gallery-card elements.
- Passing stale tests creates false confidence during future visual changes.
- Stable slide metadata makes the new QA less brittle than the old DOM-shape assertions.

Alternative considered:
- Patch only a few selectors in the existing tests. Rejected because the old suite encodes the wrong mental model of the site.

## Risks / Trade-offs

- [More metadata on slides] -> Keep metadata minimal and generated from the existing project array so it does not become a second source of truth.
- [Adaptive nav styling may feel inconsistent across images] -> Use explicit light/dark theme tokens per slide instead of trying to analyze image brightness at runtime.
- [Controlled overflow on constrained Studio screens softens the pure fullscreen aesthetic] -> Limit that behavior to constrained breakpoints and keep desktop as the flagship composition.
- [QA becomes more coupled to gallery semantics] -> Use a small set of stable data attributes so tests remain resilient to visual restyling.
- [Removing the large split-layout text block reduces room for copy] -> Keep concise descriptive copy in the caption system and reserve longer studio narrative for the final slide.

## Migration Plan

1. Expand the project data model with the metadata needed by the editorial caption system.
2. Update slide markup to expose stable metadata for navigation, theming, and QA.
3. Refactor gallery navigation and navigator rendering so intro, project, and Studio states initialize correctly.
4. Convert project slides to full-bleed image compositions with caption rails and nav-safe spacing.
5. Rework the Studio slide for desktop and constrained viewport modes, including truthful contact success/error behavior.
6. Update custom cursor logic and fullscreen navigation guards to match the new interaction surfaces.
7. Replace stale QA assertions and run build, type-check, and fullscreen interaction verification.

Rollback is straightforward: revert the component, style, script, and QA changes in this change set. No data migration or irreversible content transformation is involved.

## Open Questions

- On constrained Studio viewports, should overflow be limited to the contact column or allowed on the Studio content area as a whole while the slide is active?
- Should Maison Nord keep a subtle custom accent cursor on desktop, or is reverting to the native cursor the cleaner premium choice after the gallery shift?
