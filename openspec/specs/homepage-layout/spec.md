# homepage-layout Specification

## Purpose
TBD - created by archiving change site-maison-nord. Update Purpose after archive.
## Requirements
### Requirement: Full-page layout with persistent minimal navigation
The site SHALL keep its fullscreen slide-based layout with reduced, slide-aware navigation chrome. The top navigation SHALL remain available across the gallery, but it SHALL not include a slide counter. The project caption system SHALL also avoid visible slide numbering. On intro and project slides, the top-left wordmark SHALL remain visible. On the final Studio slide, the wordmark MAY recede completely so the final screen feels less overlaid. On mobile, visible on-screen previous and next controls SHALL remain available where needed for gallery navigation.

#### Scenario: Navigation stays minimal across the gallery
- **WHEN** the user moves through the fullscreen slides
- **THEN** the top navigation remains visually light and the interface does not display slide numbering

#### Scenario: Studio slide uses quieter header chrome
- **WHEN** the user reaches the Studio slide
- **THEN** the top-left wordmark is hidden while navigation remains usable on supported viewports

#### Scenario: Mobile navigation controls remain usable
- **WHEN** a user on viewport width < 768px views any slide
- **THEN** visible previous and next controls still allow slide navigation without requiring the removed slide counter

### Requirement: Custom cursor activates on desktop
On devices with a fine pointer, the site SHALL only hide the native cursor when a synchronized custom cursor experience is active. The cursor treatment SHALL match the fullscreen gallery architecture and SHALL NOT depend on removed gallery-card hover targets or expose stale hover labels when the user moves across non-interactive slide content.

#### Scenario: Custom cursor is synchronized on supported desktops
- **WHEN** a desktop user moves the mouse over page content on a fine-pointer device
- **THEN** either a synchronized custom cursor follows the pointer or the native cursor remains visible, with no broken intermediary state

#### Scenario: No stale gallery hover state appears
- **WHEN** the user moves across project slides that do not expose the old gallery-card hover pattern
- **THEN** the cursor does not get stuck showing obsolete labels or expanded states tied to removed layouts

#### Scenario: Custom cursor is disabled on touch devices
- **WHEN** the user is on a touch device or coarse-pointer environment
- **THEN** the custom cursor is not initialized and native touch behavior is unchanged

