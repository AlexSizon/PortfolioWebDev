## Context

Maison Nord now uses a more polished fullscreen gallery, but the interface still carries more persistent chrome than the user wants. Visible slide counting is no longer needed as orientation scaffolding, and the remaining project caption index plus the top-left wordmark on the final Studio slide both interrupt the calmer editorial tone the gallery now aims for. Separately, the current caption container on project slides still shows a top stripe/divider, uneven text placement, panel sizing that can drift from slide to slide, and internal spacing/alignment that still feel too manually tuned when the viewport changes.

This change touches multiple parts of the fullscreen navigation system: markup, slide-state logic, styling, and QA. Even though the scope is small, writing down the decisions helps keep the UI consistent across desktop and mobile.

## Goals / Non-Goals

**Goals:**
- Remove visible slide counters from the gallery across the entire experience.
- Hide the top-left Maison Nord wordmark when the Studio slide is active.
- Remove the top stripe from the project caption container, keep the panel size visually consistent across project slides, enforce `5%` side padding inside the panel, and rebalance the internal caption layout on all project slides.
- Preserve necessary navigation controls and avoid breaking slide movement behavior.
- Update QA expectations to reflect the reduced navigation chrome, counter-free project captions, more consistent panel sizing, `5%` side padding, vertical centering, and cleaner caption composition.

**Non-Goals:**
- Rework the project slides, Studio content, or gallery data model.
- Remove mobile navigation controls.
- Introduce new animation systems or navigation patterns.

## Decisions

### 1. Keep one navbar component but make it slide-aware

The existing gallery nav should stay as a single component, but it should switch to a reduced state when the active slide is `studio`. This avoids duplicating markup and keeps navigation behavior centralized in the current slide-state system.

Alternative considered:
- Conditionally render a separate Studio-only header. Rejected because it adds more branching for a very small UI difference.

### 2. Remove visible slide counting at both navbar and caption levels

The navigation counter should be removed from the DOM instead of merely hidden with CSS, and the visible project caption index should also be removed from `ProjectSlide.astro`. The slide navigator script should stop calculating or updating counter content so the behavior and tests align with the visual intent.

Alternative considered:
- Keep the element for accessibility or future reuse and visually hide it. Rejected because it preserves dead UI state and unnecessary logic.

### 3. Treat Studio as a chrome-minimal state

When the Studio slide becomes active, the navbar should hide the left wordmark while allowing the remaining mobile controls to stay usable. This preserves a clean final composition without trapping navigation on smaller devices.

Alternative considered:
- Hide the entire navbar on Studio. Rejected because mobile users still need explicit controls to move back through the gallery.

### 4. Simplify the project caption container itself

The visible top stripe inside the caption object should be removed, and the title, metadata, and descriptive copy should be repositioned so the overlay reads as a cleaner two-part editorial caption rather than a framed card with leftover structural decoration.

Alternative considered:
- Keep the existing border treatment and only tweak spacing. Rejected because the divider line is itself part of the visual clutter the user called out.

### 5. Keep the project caption panel footprint stable while letting content flow

The project caption card should use a shared minimum height and width strategy so it feels like one consistent object as the user moves between project slides. Inside that fixed-feeling shell, the content layout should be flexible rather than hard-pinned: long titles can wrap, metadata can keep its own line, and the copy block can grow without overlapping or collapsing when the viewport narrows.

Alternative considered:
- Hard-code exact pixel offsets for title and copy blocks per breakpoint. Rejected because it is more fragile during resize and likely to break again when project copy changes.

### 6. Use proportional side padding and vertically centered content blocks

The project caption panel should use proportional horizontal insets so the left and right edges breathe equally regardless of viewport width. Using `5%` side padding inside the panel keeps the object feeling premium without tying spacing to brittle pixel values. Within that shell, the title block and the metadata/copy block should align around a shared vertical center so the panel reads as one balanced composition rather than a title sitting too low or copy sitting too high.

Alternative considered:
- Keep the current mixed fixed padding utilities and only nudge text positions. Rejected because that would preserve the underlying inconsistency the user called out.

## Risks / Trade-offs

- [Less orientation feedback] -> The gallery still preserves obvious linear flow through scroll, keys, mobile controls, and caption metadata, so removing visible numbering should not harm usability.
- [Caption layout changes may expose title-length edge cases] -> Re-verify with the longest project names and metadata strings across all project slides, not just the first example.
- [A more uniform panel size may create excess empty space on shorter captions] -> Prefer a shared minimum footprint instead of an inflexible fixed height so short copy still feels balanced.
- [Flexible wrapping may still misbehave on narrow widths] -> Test around tablet and mobile breakpoints, and keep the inner layout flow-based rather than using absolute positioning.
- [Percentage padding may feel too wide on small screens] -> Clamp the `5%` rule with responsive safeguards if needed, but keep the intent of proportional side breathing room.
- [Vertical centering can look off when copy wraps to multiple lines] -> Center the two main content groups rather than forcing every text line to center individually.
- [Studio-specific nav state could drift from other slides] -> Reuse the existing slide metadata system so the behavior remains declarative and easy to test.
- [Desktop users may lose a familiar anchor when the wordmark disappears] -> Limit the hide behavior to the Studio slide only, so the rest of the gallery still carries the brand marker.

## Migration Plan

1. Remove the slide counter element and related script logic from the current gallery navigation implementation.
2. Remove visible project index labels from the caption rail without weakening the caption hierarchy.
3. Remove the top stripe, normalize the panel footprint, and rebalance caption content positioning across all project slides.
4. Add a slide-aware Studio state that hides the wordmark while preserving needed controls.
5. Apply proportional horizontal panel padding and vertically centered caption-group alignment.
6. Update styles and QA assertions to match the new reduced navigation chrome.

Rollback is straightforward: restore the visible counting markup and prior Studio nav visibility behavior.

## Open Questions

- None at the moment. The requested behavior is specific and narrow enough to implement directly.
