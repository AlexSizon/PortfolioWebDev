## Why

Two visual polish issues remain in the Maison Nord fullscreen redesign:
1. The Studio slide (footer) content is left-aligned and doesn't use the full width — the 3-column grid hugs the left side, leaving the right side empty.
2. The separator between the project photo and the details panel is a pale sand/neutral border that reads as structural, not branded. A gold accent line would reinforce the design system and give the split a more intentional feel.

## What Changes

- **StudioSlide**: Vertically center the entire content block within the viewport; the 3-column grid should sit in the middle of the dark slide, not drift to the top-left
- **ProjectSlide**: Replace the existing neutral `border-nord-sand/30` separator between image and details with a gold accent line (`border-nord-gold`)

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- Visual-only adjustments, no spec-level requirement changes -->

## Impact

- `apps/maison-nord/src/components/StudioSlide.astro` — flex alignment adjustments
- `apps/maison-nord/src/components/ProjectSlide.astro` — border color change on separator
