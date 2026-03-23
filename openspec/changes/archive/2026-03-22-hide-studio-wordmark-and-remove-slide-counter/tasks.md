## 1. Navigation Chrome

- [x] 1.1 Remove the slide counter markup from `apps/maison-nord/src/components/GalleryNavigator.astro`
- [x] 1.2 Update `apps/maison-nord/src/scripts/slideNavigator.ts` so it no longer computes or updates counter state
- [x] 1.3 Add Studio-slide navbar state handling so the top-left wordmark hides when the final slide is active
- [x] 1.4 Remove the visible project index counter from `apps/maison-nord/src/components/ProjectSlide.astro`
- [x] 1.5 Remove the top stripe/divider from the project caption container in `apps/maison-nord/src/components/ProjectSlide.astro`
- [x] 1.6 Reposition the project title, metadata, and description inside the caption container so they align consistently across all project slides

## 2. Styling And Verification

- [x] 2.1 Update `apps/maison-nord/src/styles/global.css` so the reduced navigation chrome still looks intentional across intro, project, and Studio slides
- [x] 2.2 Update any shared caption spacing or alignment styles in `apps/maison-nord/src/styles/global.css` if needed to support the cleaner project caption layout
- [x] 2.3 Refresh `apps/maison-nord/qa/maison-nord.spec.js` to validate the missing counter, removed caption stripe, and corrected project-caption positioning
- [x] 2.4 Run `npm run type-check` and `npm run build` in `apps/maison-nord`

## 3. Caption Panel Consistency

- [x] 3.1 Update `apps/maison-nord/src/components/ProjectSlide.astro` so every project slide uses a visually consistent caption panel size instead of content-driven panel drift
- [x] 3.2 Replace any remaining rigid caption offsets or sizing assumptions with a more flexible internal layout that tolerates title and copy wrapping during resize
- [x] 3.3 Update `apps/maison-nord/src/styles/global.css` with shared sizing and responsive layout rules for the project caption panel
- [x] 3.4 Expand `apps/maison-nord/qa/maison-nord.spec.js` to validate stable panel dimensions and non-breaking content flow across representative viewport sizes
- [x] 3.5 Run `npm run type-check` and `npm run build` in `apps/maison-nord` after the caption panel sizing changes

## 4. Panel Insets And Vertical Alignment

- [x] 4.1 Update `apps/maison-nord/src/components/ProjectSlide.astro` so the project caption panel uses `5%` horizontal content insets on both sides
- [x] 4.2 Adjust the project caption layout so the title block and the metadata/description block are vertically centered within the panel composition
- [x] 4.3 Update `apps/maison-nord/src/styles/global.css` with shared responsive rules for proportional panel insets and vertical centering behavior
- [x] 4.4 Expand `apps/maison-nord/qa/maison-nord.spec.js` to validate the `5%` side padding intent and vertically centered caption groups across representative viewport sizes
- [x] 4.5 Run `npm run type-check` and `npm run build` in `apps/maison-nord` after the inset and alignment changes
