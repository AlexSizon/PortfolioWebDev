## 1. Data And Slide Metadata

- [x] 1.1 Extend the Maison Nord project data in `apps/maison-nord/src/pages/index.astro` with the location metadata needed by the editorial caption system
- [x] 1.2 Add stable slide metadata attributes for intro, project, and Studio slides so navigation state and QA do not rely on hardcoded DOM assumptions

## 2. Navigator And Fullscreen Behavior

- [x] 2.1 Update `apps/maison-nord/src/components/GalleryNavigator.astro` to support blank intro state, `01 / 06` project counting, `Studio` final state, and slide-aware contrast treatment
- [x] 2.2 Refactor `apps/maison-nord/src/scripts/slideNavigator.ts` so initial state, mobile controls, and slide transitions stay synchronized from first render onward
- [x] 2.3 Adjust fullscreen navigation handlers so Studio slide form interaction and constrained viewport behavior do not trigger accidental slide changes

## 3. Editorial Slide Layouts

- [x] 3.1 Redesign `apps/maison-nord/src/components/ProjectSlide.astro` as a full-bleed photography slide with a bottom caption rail for title, category, city, year, and supporting copy
- [x] 3.2 Update shared layout and style files to keep the navbar, project captions, and fullscreen imagery visually balanced across desktop and mobile
- [x] 3.3 Rework `apps/maison-nord/src/components/StudioSlide.astro` for a composed desktop layout plus a safe constrained-screen fallback that keeps all contact content reachable

## 4. Interaction Polish

- [x] 4.1 Update `apps/maison-nord/src/components/CustomCursor.astro` so the desktop cursor behavior no longer depends on removed gallery-card hover targets or stale labels
- [x] 4.2 Make Studio contact feedback truthful for validation, EmailJS success, and missing or failed EmailJS delivery states

## 5. QA And Verification

- [x] 5.1 Rewrite `apps/maison-nord/qa/maison-nord.spec.js` to validate the fullscreen gallery architecture instead of the removed long-scroll sections
- [x] 5.2 Run `npm run type-check` and `npm run build` in `apps/maison-nord`
- [x] 5.3 Perform responsive visual verification for intro, project, and Studio slides on desktop, tablet, and mobile viewports
