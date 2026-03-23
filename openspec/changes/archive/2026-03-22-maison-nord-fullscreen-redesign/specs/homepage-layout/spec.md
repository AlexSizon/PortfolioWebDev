## MODIFIED Requirements

### Requirement: Full-page layout with persistent minimal navigation
The site SHALL have a fullscreen slide-based layout. A persistent minimal navbar SHALL be visible across all slides with the studio wordmark on the left and a slide counter on the right. There is no footer — studio information lives in the Studio slide. The navbar SHALL NOT change opacity based on scroll position.

#### Scenario: Navbar is always visible
- **WHEN** any slide is active
- **THEN** the navbar remains fixed at the top of the viewport with the wordmark and counter visible

#### Scenario: No scroll-opacity transition occurs
- **WHEN** the user navigates between slides
- **THEN** the navbar does not change its background opacity or add a shadow (no scroll-based style changes)

#### Scenario: Mobile navigation uses on-screen arrows
- **WHEN** a user on viewport width < 768px views any slide
- **THEN** visible ↑ ↓ arrow buttons allow navigation between slides (no hamburger menu required)

## REMOVED Requirements

### Requirement: Hero section fills the viewport
**Reason:** Replaced by the fullscreen slide navigator. The intro slide serves as the typographic opening — no photo hero exists in the new layout.
**Migration:** `Hero.astro` is deleted. The intro slide (`IntroSlide.astro`) replaces it with a black typographic slide.

### Requirement: Post-hero sections keep a consistent content frame
**Reason:** The section/shell centered-content model no longer applies — each slide is fullscreen. Content framing is handled per-slide.
**Migration:** Remove all `section-shell` container patterns. Each slide manages its own internal layout.

### Requirement: Post-hero sections maintain a spacious vertical rhythm
**Reason:** There are no scrollable sections. Vertical rhythm within slides is managed by the Studio slide's internal layout.
**Migration:** Slide inner padding replaces section `py-28/py-40` rhythm.
