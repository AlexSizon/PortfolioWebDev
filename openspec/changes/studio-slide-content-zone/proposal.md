## Why

The final Studio slide currently lets its content sit too high and spread too loosely across the viewport, which weakens the intended closing composition. The last slide needs a clearly bounded content zone with a controlled footprint so the studio information feels deliberate, balanced, and visually finished.

## What Changes

- Refine the final Studio slide so its heading, studio details, services, and contact area live inside a visibly constrained composition zone instead of floating across the full available canvas.
- Define a target content footprint for the Studio slide so the closing composition feels proportionate on large desktop screens while still adapting cleanly on tablet and mobile.
- Preserve access to the full contact content, but make the overall Studio slide read as a composed panel or editorial block rather than a sparse full-screen spread.
- Refresh QA expectations so the final slide validates the bounded content region and responsive sizing behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `fullscreen-gallery-nav`: the final Studio slide requirement changes so the closing content must occupy a deliberate bounded zone with controlled sizing inside the fullscreen composition.
- `contact-section`: the contact area inside the Studio slide must fit within the new content zone without looking undersized, overextended, or visually detached from the rest of the final slide.
- `homepage-layout`: the fullscreen layout requirement changes so the last slide uses a constrained content block rather than letting Studio content span the entire open canvas.

## Impact

- Affected code: `apps/maison-nord/src/components/StudioSlide.astro`, `apps/maison-nord/src/styles/global.css`, and `apps/maison-nord/qa/maison-nord.spec.js`
- Affected specs: `fullscreen-gallery-nav`, `contact-section`, `homepage-layout`
- No new dependencies expected
