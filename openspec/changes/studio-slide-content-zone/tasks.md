## 1. Studio Zone Layout

- [x] 1.1 Refactor `apps/maison-nord/src/components/StudioSlide.astro` to introduce a bounded Studio content zone wrapper inside the final slide
- [x] 1.2 Rebalance the Studio heading and three-column content so they live inside the new bounded zone instead of spreading across the full slide canvas
- [x] 1.3 Adjust the Studio zone sizing and vertical placement so the final slide feels centered and proportionate on large desktop viewports

## 2. Responsive Behavior And Verification

- [x] 2.1 Update `apps/maison-nord/src/styles/global.css` with shared rules for the Studio zone footprint, max width, spacing rhythm, and responsive fallback behavior
- [x] 2.2 Ensure the contact block in `apps/maison-nord/src/components/StudioSlide.astro` remains fully reachable and visually integrated inside the bounded Studio zone on constrained screens
- [x] 2.3 Expand `apps/maison-nord/qa/maison-nord.spec.js` to validate the final slide's bounded content zone and responsive sizing behavior
- [x] 2.4 Run `npm run type-check` and `npm run build` in `apps/maison-nord`
