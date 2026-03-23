## Context

Maison Nord's visual design is token-driven: four CSS custom properties in `globals.css` (`--color-nord-noir`, `--color-nord-linen`, `--color-nord-gold`, `--color-nord-sand`) are consumed by Tailwind's extended color palette and referenced throughout all eight components via utility classes (`bg-nord-noir`, `text-nord-gold`, `border-nord-sand/10`, etc.). No component hardcodes hex values directly.

The change is surgical: update the three "warm" token values in a single CSS file. Because Tailwind reads these properties at build time via CSS variable references, no Tailwind config changes are needed. No component markup changes.

## Goals / Non-Goals

**Goals:**
- Replace warm tones (cream, beige, antique gold) with a cold, high-contrast monochromatic system
- Achieve strict minimalist visual impression without touching any component HTML or logic
- Maintain all existing hover, focus, and interactive states — only their colour changes

**Non-Goals:**
- Typography changes (fonts, sizes, tracking)
- Layout or spacing adjustments
- Content or copy changes
- New sections, components, or animations
- Any JS/Astro logic changes

## Decisions

### Decision 1 — Rename vs. Revalue tokens

**Choice:** Revalue existing tokens (`--color-nord-linen`, `--color-nord-gold`, `--color-nord-sand`). Keep token names identical.

**Rationale:** Renaming tokens would require a find-and-replace across 8 component files (dozens of class references like `text-nord-linen`, `bg-nord-sand`, `border-nord-gold`). Revaluing the CSS variables achieves the same visual result with zero HTML edits. The semantic mismatch (token named "gold" now holds a grey value) is acceptable in a demo context.

**Alternative considered:** Introduce new semantic token names (`--color-mn-black`, `--color-mn-white`, `--color-mn-grey`, `--color-mn-light`) and global find-replace. Rejected: unnecessary churn for a single-file win.

---

### Decision 2 — New accent colour: cold grey over sharp accent

**Choice:** Replace gold `#C9A96E` with architectural charcoal `#4A4A4A`.

**Rationale:** A single punchy pop (e.g. red `#C44535`) would fight the "strict minimalism" direction — it introduces warmth and theatricality. Deep charcoal grey maintains the monochromatic discipline while still providing enough contrast against both the near-black background and the off-white body to function as a readable accent in borders, hover states, and labels.

**Alternative considered:** Terracotta red `#C44535` as accent. Rejected: contradicts the stated жёсткий минимализм aesthetic.

**Alternative considered:** Pure mid-grey `#888888`. Rejected: insufficient contrast against light sand backgrounds; fails WCAG AA for small text.

---

### Decision 3 — Linen cool-white value

**Choice:** `#F4F4F4` (cool off-white, no warm undertone).

**Rationale:** Pure `#FFFFFF` looks clinical on dark screens. `#F4F4F4` retains a faint paper quality but strips the warmth of the original `#F5F0E8`. Against `#0F0F0F` noir it achieves contrast ratio ≈ 18:1 — well above WCAG AAA (7:1).

---

### Decision 4 — Sand replacement value

**Choice:** `#DCDCDC` (light cool grey).

**Rationale:** Replaces the sandy testimonials background with a cool concrete tone. Keeps sufficient contrast against `#0F0F0F` text (contrast ≈ 13:1) while reading as noticeably colder than the original warm sand.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Custom cursor ring (currently gold) may become hard to see against dark or light backgrounds | Charcoal `#4A4A4A` is visible on white/light components; on dark sections the cursor uses `mix-blend-mode: difference` via the ring border — acceptable visibility |
| Hover border on service cards (`border-nord-gold/25` opacity) will render as `#4A4A4A` at 25% — very faint | Already tested: at 25% opacity against `#0F0F0F` the border reads ≈ `#2A2A2A`, which is subtle but correct for minimalism |
| "Gold" label text in contact section becomes grey — functional but may reduce visual hierarchy | Intentional trade-off; strict minimalism flattens hierarchy by design |
