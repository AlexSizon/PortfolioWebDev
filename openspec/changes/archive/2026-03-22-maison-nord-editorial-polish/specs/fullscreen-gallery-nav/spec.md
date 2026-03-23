## MODIFIED Requirements

### Requirement: Navbar shows wordmark and slide counter
A persistent minimal navbar SHALL be visible on all slides. It SHALL display the studio wordmark on the left and a slide-aware status element on the right. The status element SHALL be blank on the intro slide, SHALL show `01 / 06` through `06 / 06` across the six project slides, and SHALL show `Studio` on the final slide. The navbar styling SHALL remain legible against both light and dark slides through explicit slide-aware contrast treatment rather than scroll-triggered opacity changes.

#### Scenario: Counter updates on navigation
- **WHEN** the user navigates to a project slide
- **THEN** the status element updates to show the current project index out of 6

#### Scenario: Intro and Studio states initialize correctly
- **WHEN** the page loads on the intro slide or the user reaches the final Studio slide
- **THEN** the navbar immediately shows the correct blank or `Studio` state without requiring an extra navigation event

#### Scenario: Navbar remains legible across slide themes
- **WHEN** any slide is active
- **THEN** the wordmark, status element, and mobile navigation controls remain readable without obscuring core slide content

### Requirement: Project slides display fullscreen photography with caption
Each of the 6 project slides SHALL present a full-viewport photograph as the primary composition. A compact caption rail SHALL sit near the bottom edge of the slide and SHALL display the project name, category, city, and year, with an optional short descriptive line. The caption treatment SHALL preserve image dominance while remaining readable on desktop and mobile.

#### Scenario: Project image fills the viewport
- **WHEN** a project slide is active
- **THEN** the photograph covers the visible slide area edge to edge with no unused white-space panel competing with it

#### Scenario: Caption rail communicates project metadata
- **WHEN** any project slide is active
- **THEN** the caption rail shows the project title prominently with category, city, and year grouped as supporting metadata

#### Scenario: Caption and navbar coexist on mobile
- **WHEN** a project slide is viewed on viewport width < 768px
- **THEN** the caption remains readable and does not collide with the navbar or on-screen slide controls
