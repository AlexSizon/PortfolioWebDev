## MODIFIED Requirements

### Requirement: Full-page layout with persistent minimal navigation
The site SHALL keep its fullscreen slide-based layout with reduced, slide-aware navigation chrome. The top navigation SHALL remain available across the gallery, but it SHALL not include a slide counter. The project caption system SHALL also avoid visible slide numbering. On intro and project slides, the top-left wordmark SHALL remain visible. On the final Studio slide, the wordmark MAY recede completely so the final screen feels less overlaid. On mobile, visible on-screen previous and next controls SHALL remain available where needed for gallery navigation. The last slide SHALL additionally use a constrained Studio content block so the final layout feels composed inside the fullscreen frame rather than sparse across the full viewport.

#### Scenario: Navigation stays minimal across the gallery
- **WHEN** the user moves through the fullscreen slides
- **THEN** the top navigation remains visually light and the interface does not display slide numbering

#### Scenario: Studio slide uses quieter header chrome
- **WHEN** the user reaches the Studio slide
- **THEN** the top-left wordmark is hidden while navigation remains usable on supported viewports

#### Scenario: Mobile navigation controls remain usable
- **WHEN** a user on viewport width < 768px views any slide
- **THEN** visible previous and next controls still allow slide navigation without requiring the removed slide counter

#### Scenario: Final slide uses a constrained content block
- **WHEN** the Studio slide is active on a large viewport
- **THEN** the Studio content sits inside a bounded layout block with a controlled footprint instead of occupying the full apparent page canvas
