## Why

The current Maison Nord palette leans heavily on warm earth tones (cream linen, sandy beige, antique gold) that evoke a soft Scandinavian cosiness. For a reposition toward **жёсткий минимализм** — the severe, uncompromising aesthetic of Swiss typography and Nordic brutalism — those warmth signals undermine the desired impression. A cold, high-contrast monochromatic system strips away decorative warmth and lets architecture and space speak without ornamental distraction.

## What Changes

- Replace warm cream `#F5F0E8` (linen) with cool near-white `#F4F4F4` — eliminates warm undertone
- Replace sandy beige `#E8E0D5` (sand) with cool light grey `#DCDCDC` — eliminates warm secondary
- Replace antique gold `#C9A96E` with stark charcoal `#4A4A4A` — accent transitions from warm metallic to architectural grey
- Near-black `#0F0F0F` (noir) remains unchanged — already a strict neutral
- All interactive states (hover borders, focus rings, button accents) shift from gold warmth to grey severity
- Testimonials section background shifts from sandy beige to cool grey
- Custom cursor ring shifts from gold to charcoal

## Capabilities

### New Capabilities
<!-- None — this change does not introduce new sections or features -->

### Modified Capabilities
- `services-gallery`: Hover state description changes (border "from sand to gold" → cool grey accent language)
- `contact-section`: Form field focus colour description changes (gold focus ring → charcoal/grey focus)

## Impact

- **globals.css**: 4 CSS custom property values updated (`--color-nord-linen`, `--color-nord-gold`, `--color-nord-sand`; noir unchanged)
- **tailwind.config**: No changes needed — tokens are defined in CSS, Tailwind reads them at build time
- **All components**: Token names (`nord-linen`, `nord-gold`, `nord-sand`, `nord-noir`) remain identical — zero HTML/JSX edits required; only the value of each CSS variable changes
- **No breaking changes** — no APIs, no data structures, no component props affected
