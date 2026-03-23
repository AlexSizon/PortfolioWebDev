## MODIFIED Requirements

### Requirement: Full-page layout with persistent minimal navigation
The site SHALL keep its fullscreen slide-based layout with a persistent minimal navbar visible across all slides. Navigation visuals SHALL be driven by the active slide context rather than document scroll position. On mobile, visible on-screen previous/next controls SHALL remain available within the safe viewport area and SHALL not block essential project caption or Studio contact content.

#### Scenario: Navbar is always visible
- **WHEN** any slide is active
- **THEN** the navbar remains fixed at the top of the viewport with the wordmark and slide status visible

#### Scenario: Slide context drives navbar treatment
- **WHEN** the user navigates between intro, project, and Studio slides
- **THEN** navbar styling changes only as needed for the active slide context and not in response to document scroll position

#### Scenario: Mobile navigation controls remain usable
- **WHEN** a user on viewport width < 768px views any slide
- **THEN** visible previous and next controls allow slide navigation without obscuring key caption or contact actions

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
