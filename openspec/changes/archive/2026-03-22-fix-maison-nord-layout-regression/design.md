## Context

Maison Nord is a long-scroll landing page composed of independently implemented Astro sections inside a shared layout. The first regression made the post-hero sections collapse into a narrow left-aligned track, but the follow-up screenshot shows a second issue: even when the sections are structurally aligned, the composition still feels dense and crowded.

The About, Services, and Gallery areas are especially affected. Headings, copy blocks, stat rows, cards, and section transitions sit too close together, which weakens the premium editorial tone the page is aiming for. The design update therefore needs to treat whitespace as part of the layout system, not as a cosmetic afterthought.

## Goals / Non-Goals

**Goals:**
- Restore a consistent centered content frame across all post-hero homepage sections.
- Ensure two-column and card-grid sections use the intended width on desktop and degrade cleanly on tablet and mobile.
- Introduce more generous negative space between sections, cards, and internal content groupings so the layout feels deliberate rather than crowded.
- Make the layout expectations explicit in specs so future regressions are caught during implementation and review.

**Non-Goals:**
- Redesign Maison Nord’s visual identity, typography, copy, or content hierarchy.
- Introduce new homepage sections, animations, or interactions unrelated to layout integrity.
- Change contact submission behavior, gallery data, or navigation behavior beyond what is required to restore layout and spacing.

## Decisions

### Treat this as a cross-section composition issue

The screenshot shows that the problem is no longer a single broken block. The post-hero layout now needs both structural alignment and calmer spacing. The fix should therefore consider section framing, internal gutters, card padding, and section-to-section rhythm together.

Alternative considered: only tweak the section with the most obvious crowding. This was rejected because the screenshot shows a repeated density issue across several adjacent sections.

### Use a single section framing pattern for post-hero content

Sections after the hero should align to one consistent content container strategy for max width and horizontal padding. Individual sections can still define their own layouts, but they should all inherit the same centered page rhythm.

Alternative considered: keep each section’s sizing fully custom. This was rejected because it makes spacing drift more likely and weakens overall cohesion.

### Use whitespace as a first-class layout constraint

Correct width alone is not enough; the page can still feel crowded if gutters, vertical rhythm, and card padding are too tight. The implementation should therefore establish a more generous spacing system across section headers, major content blocks, service cards, gallery gutters, and testimonial reading layouts.

Alternative considered: stop after width fixes. This was rejected because it would leave the page technically aligned but still visually cramped.

### Prefer component-local spacing fixes unless a shared primitive is clearly missing

If the shared layout does not already provide the needed rhythm, the update should still keep most spacing changes close to the affected sections. This keeps the blast radius smaller and makes visual tuning easier.

Alternative considered: refactor the whole site into a new spacing framework immediately. This was rejected as too broad for a regression-focused change.

### Validate visually at explicit breakpoints

The fix should be verified at representative desktop, tablet, and mobile widths, with special attention to section separation, card density, reading comfort, and horizontal overflow. This is a visual quality issue, so completion should not rely on build success alone.

Alternative considered: rely only on static code review. This was rejected because visual crowding can still pass type checks and builds.

## Risks / Trade-offs

- [Spacing grows too aggressively] -> Increase whitespace deliberately, but avoid turning the page into a sparse or empty composition.
- [Desktop spacing breaks tablet/mobile reflow] -> Validate section grids and vertical rhythm at desktop, tablet, and mobile widths before closing the change.
- [Shared and local spacing rules conflict] -> Audit shared wrappers first, then keep section-specific tuning minimal and intentional.
- [One section still feels denser than the others] -> Keep room for section-level refinement after applying the shared rhythm pass.

## Migration Plan

There is no data or API migration. Implementation should proceed by reviewing the current visual density, adjusting shared or section-level spacing, and validating the homepage in the browser across representative breakpoints before merging.

Rollback is straightforward: revert the spacing-related class changes in the affected Maison Nord components and any shared style file touched by the fix.

## Open Questions

- Should Maison Nord use one shared post-hero spacing scale, or should some sections intentionally feel tighter or looser than others?
- Is the current crowding most influenced by section-to-section spacing, internal card padding, or the relationship between text blocks and media?
