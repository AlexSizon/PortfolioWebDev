## Context

The final Studio slide currently uses a full-height container, but the actual content cluster sits too close to the top and leaves a large, unresolved empty field below it. That weakens the closing moment of the gallery and makes the final slide feel like regular page content dropped into a fullscreen frame instead of a deliberate end composition.

The change is small in surface area but cross-cutting in effect: it touches the Studio slide layout, the contact area density, and the overall fullscreen composition contract. The solution needs to preserve readability and access to the contact form while making the last slide feel proportionate on large desktop screens and still resilient on tablet/mobile.

## Goals / Non-Goals

**Goals:**
- Constrain the Studio content into a clearly bounded composition zone instead of letting it float across the full open canvas.
- Give the final slide a controlled visual footprint so heading, about, services, and contact feel like one composed block.
- Center or balance the Studio content vertically within the viewport on large screens so the closing slide reads as intentional.
- Preserve access to the full contact content on smaller or constrained viewports through responsive stacking or controlled overflow.

**Non-Goals:**
- Rewriting the Studio content copy or changing the underlying data.
- Reintroducing counters or heavier navigation chrome.
- Turning the Studio slide into a fully separate page pattern with unrelated visual language.

## Decisions

### 1. Treat the Studio slide as a bounded stage inside the fullscreen slide

Instead of letting the Studio content stretch across the entire available height, the slide should introduce a dedicated inner stage with a max width and a target vertical footprint. That stage becomes the visible “zone” the user pointed out in the mockup.

Alternative considered:
- Keep the current full-height shell and only add more top margin. Rejected because it does not solve the core issue of the content feeling unbounded and undersized relative to the viewport.

### 2. Balance the Studio stage vertically on large screens

On desktop, the bounded Studio stage should sit closer to the visual center of the viewport rather than hugging the top edge. This can be achieved by centering the stage within the slide or using a balanced top/bottom distribution, while still respecting nav safe space and avoiding collisions with mobile controls.

Alternative considered:
- Anchor the stage to the top and cap its height. Rejected because it still leaves the closing composition feeling top-heavy.

### 3. Keep content grouped as one composition instead of three disconnected columns

The heading block, divider, and three-column details should read as one coherent editorial object. The layout should therefore prioritize a shared outer zone and internal spacing rhythm before tweaking individual column widths.

Alternative considered:
- Resize only the columns inside the current shell. Rejected because the lack of a clear outer composition boundary is itself part of the problem.

### 4. Preserve responsive escape hatches for constrained screens

The bounded-zone treatment should be strongest on wide desktop viewports. On tablet and mobile, the layout can relax into stacked or controlled-scroll behavior as long as the content remains visually grouped and fully reachable.

Alternative considered:
- Force the same bounded geometry across all breakpoints. Rejected because it would make small screens brittle and more likely to clip form content.

## Risks / Trade-offs

- [A more bounded Studio zone may feel too small on ultra-wide screens] → Use a generous max width and min/max height strategy rather than a tiny fixed block.
- [Vertical centering can clash with safe areas or navbar spacing] → Keep a clear top offset budget for the persistent nav and apply centering inside the remaining usable slide area.
- [Constraining the contact area may create cramped form spacing] → Let the inner columns rebalance proportionally inside the shared zone instead of shrinking the contact column independently.
- [Responsive fallback may diverge from the desktop composition] → Make the bounded-stage pattern the primary source of truth, then progressively relax it only where viewport constraints require it.

## Migration Plan

1. Introduce a bounded Studio stage wrapper inside `StudioSlide.astro`.
2. Move the existing Studio heading and three-part content grid into that bounded zone.
3. Update spacing and sizing rules so the zone feels visually centered and proportionate on large screens.
4. Rebalance tablet/mobile behavior so all content remains reachable without breaking the new composition.
5. Update QA expectations for the final slide footprint and bounded-zone behavior.

Rollback is straightforward: restore the current full-height top-anchored Studio shell.

## Open Questions

- None right now. The request is specific enough to express as a bounded-zone requirement and implement directly.
