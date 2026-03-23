## Why

The current Maison Nord fullscreen experience has a strong concept but still behaves like an unfinished transition from the earlier long-scroll site. Several key interactions and compositions now diverge from the intended premium editorial gallery: the navigator state is inaccurate, project slides use a split layout instead of immersive photography, the Studio slide is fragile on constrained viewports, and QA coverage still targets removed sections.

## What Changes

- Refine the fullscreen gallery navigator so its counter, labels, controls, and contrast treatment match the active slide state from intro through Studio.
- Rework project slides into full-bleed editorial compositions led by photography, with a compact caption system that carries project metadata without competing with the imagery.
- Add missing project metadata needed by the gallery presentation, including city/location information for each featured project.
- Harden the Studio slide for desktop, mobile, and low-height screens so contact and studio information remain reachable without breaking the fullscreen experience.
- Align interaction polish with the current layout by updating or removing dead custom cursor states and refreshing QA coverage around fullscreen navigation and responsive behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `fullscreen-gallery-nav`: update gallery slide presentation, counter semantics, caption content, and slide-aware navigation behavior to match the editorial fullscreen concept.
- `homepage-layout`: update persistent navigation and custom cursor behavior to match the current fullscreen architecture and remove reliance on obsolete section/gallery patterns.
- `contact-section`: tighten Studio slide contact behavior on constrained viewports so form and contact content remain usable within the final fullscreen slide experience.

## Impact

- Affected code: `apps/maison-nord/src/pages/index.astro`, `apps/maison-nord/src/components/GalleryNavigator.astro`, `apps/maison-nord/src/components/ProjectSlide.astro`, `apps/maison-nord/src/components/StudioSlide.astro`, `apps/maison-nord/src/components/CustomCursor.astro`, `apps/maison-nord/src/scripts/slideNavigator.ts`, `apps/maison-nord/src/styles/global.css`, and `apps/maison-nord/qa/maison-nord.spec.js`
- Affected specs: `fullscreen-gallery-nav`, `homepage-layout`, `contact-section`
- No new runtime dependencies expected
