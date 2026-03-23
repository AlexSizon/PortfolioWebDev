## Why

The project details panel on each `ProjectSlide` sits flush against the image boundary. The left padding on the info side is too small, making the text look visually cramped and attached to the photo rather than having its own breathing room.

## What Changes

- Increase left padding on the `ProjectSlide` details panel so the text content starts further from the image/border edge
- No layout or structural changes — padding-only adjustment

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `services-gallery`: Project slide detail column spacing updated (visual-only, no requirement change)

## Impact

- `apps/maison-nord/src/components/ProjectSlide.astro` — padding classes only
