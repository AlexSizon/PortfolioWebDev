## ADDED Requirements

### Requirement: Hero displays personal brand identity
The hero section SHALL display "Alex Syzonenko" as the primary H1 heading, "Full-Stack Developer" as the subtitle, and a short tagline ("Создаю сайты которые продают.") on a dark zinc background with an animated violet gradient blob element.

#### Scenario: Hero content is visible on load
- **WHEN** a user navigates to the portfolio homepage
- **THEN** the heading "Alex Syzonenko", subtitle, tagline, and CTA button are all visible above the fold on desktop (1280px) and mobile (375px)

#### Scenario: Hero animates on page load
- **WHEN** the page DOM is ready
- **THEN** elements stagger in with a fade-up animation: logo first (0ms), heading (100ms), subtitle (200ms), tagline (300ms), CTA button (400ms)

#### Scenario: Gradient blob animates continuously
- **WHEN** the hero section is visible
- **THEN** the violet gradient blob drifts slowly with a CSS keyframe animation (no interaction required)

### Requirement: Navigation shows Alsy logotype
The sticky navbar SHALL display the "Alsy" logotype (or "AS" monogram) as a link to the homepage, with navigation links to #demos, #about, and #contact sections.

#### Scenario: Navbar is visible on all scroll positions
- **WHEN** the user scrolls past the hero section
- **THEN** the navbar remains fixed at the top with a dark/frosted background

#### Scenario: Logo is a home link
- **WHEN** the user clicks the Alsy logo in the navbar
- **THEN** the page scrolls to the top (or navigates to `/`)

### Requirement: Scroll CTA button navigates to demos section
The hero SHALL include a "View My Work" or equivalent CTA button that smoothly scrolls the page to the demo showcase section when clicked.

#### Scenario: CTA button triggers smooth scroll
- **WHEN** the user clicks the hero CTA button
- **THEN** the page smoothly scrolls to the `#demos` section anchor within 600ms

#### Scenario: CTA button is keyboard accessible
- **WHEN** the user focuses the CTA button with Tab and presses Enter
- **THEN** the same scroll behavior is triggered
