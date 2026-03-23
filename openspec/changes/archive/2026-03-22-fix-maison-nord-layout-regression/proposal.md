## Why

The current Maison Nord homepage has a visible layout regression after the hero: post-hero sections no longer feel like a calm editorial composition. In addition to the earlier width and alignment issues, the updated screenshot shows that the design still feels overly compressed, with sections, cards, and text blocks packed too tightly together.

## What Changes

- Restore consistent centered content containers for Maison Nord sections that appear after the hero.
- Fix the `About`, `Services`, `Gallery`, `Testimonials`, and `Contact` section layouts so their grids and columns use the intended desktop width instead of collapsing into a narrow left column.
- Increase whitespace and visual breathing room between post-hero sections, cards, and internal content groups so the page no longer feels crowded or hastily stacked.
- Preserve responsive behavior across desktop, tablet, and mobile so sections reflow cleanly without creating large empty canvas areas or horizontal overflow.
- Add explicit acceptance criteria for section framing, spacing rhythm, and multi-column balance to prevent this regression from returning unnoticed.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `homepage-layout`: extend the page-level layout requirements to cover consistent post-hero section framing, generous spacing rhythm, and balanced desktop composition.
- `services-gallery`: tighten services, gallery, and testimonials layout requirements so multi-column sections occupy the intended centered width on desktop, retain visual breathing room, and reflow predictably on smaller screens.
- `contact-section`: require the contact section to keep a balanced two-column composition and a visible map/form layout without collapsing into a partial-width strip.

## Impact

- Affected code: `apps/maison-nord/src/pages/index.astro`, `apps/maison-nord/src/components/About.astro`, `apps/maison-nord/src/components/Services.astro`, `apps/maison-nord/src/components/Gallery.astro`, `apps/maison-nord/src/components/Testimonials.astro`, `apps/maison-nord/src/components/ContactSection.astro`, and any shared layout/style files that influence section width or spacing rhythm.
- No API, backend, or data-model changes.
- No new runtime dependencies are expected.
