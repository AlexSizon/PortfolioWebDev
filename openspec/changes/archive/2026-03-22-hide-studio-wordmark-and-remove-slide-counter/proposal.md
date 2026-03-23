## Why

The current Maison Nord gallery chrome still competes with the content at moments where the layout should feel most resolved. Visible slide counting is no longer necessary for orientation, and both the persistent top-left wordmark on the Studio slide and the project caption markers add interface noise that pulls attention away from the imagery and final composition. The current caption container also has a visible top stripe, uneven internal positioning, inconsistent panel sizing behavior, and padding/alignment that still feel too ad hoc, making the overlay feel less refined than the rest of the gallery and fragile during resize.

## What Changes

- **BREAKING** Remove visible slide counters from the fullscreen gallery on all slides, including the navbar and project caption rail.
- Update the gallery navbar so the top-left Maison Nord wordmark is hidden on the final Studio slide.
- Refine the project caption container on all non-final slides by removing the top stripe/divider, making the panel dimensions feel consistent across project slides, setting side padding to `5%` on each side, and correcting the internal positioning of title, metadata, and description.
- Preserve the remaining navigation affordances needed for movement between slides, especially on mobile.
- Refresh QA expectations to validate the reduced navigation chrome, stripe-free project captions, more consistent panel sizing, `5%` side padding, vertically centered content blocks, corrected content positioning, and Studio-slide header behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `fullscreen-gallery-nav`: simplify the gallery by removing visible slide-count status from both navigation and project captions, hiding the wordmark on the Studio slide, and cleaning up the project caption container layout so it keeps a consistent panel footprint, `5%` horizontal padding, vertically centered content blocks, and flexible internal flow.
- `homepage-layout`: update the persistent navigation requirement so the nav chrome can recede on the final slide while keeping the fullscreen flow usable and unnumbered.

## Impact

- Affected code: `apps/maison-nord/src/components/GalleryNavigator.astro`, `apps/maison-nord/src/components/ProjectSlide.astro`, `apps/maison-nord/src/pages/index.astro`, `apps/maison-nord/src/scripts/slideNavigator.ts`, `apps/maison-nord/src/styles/global.css`, and `apps/maison-nord/qa/maison-nord.spec.js`
- Affected specs: `fullscreen-gallery-nav`, `homepage-layout`
- No new dependencies expected
