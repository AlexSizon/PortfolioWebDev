## ADDED Requirements

### Requirement: Fullscreen slide navigator presents projects one at a time
The site SHALL replace conventional vertical scrolling with a fullscreen slide-based navigator. Each slide SHALL occupy exactly 100% of the viewport height and width. Navigation between slides SHALL use smooth vertical CSS transform transitions. The navigator SHALL support keyboard arrows (↑↓ / ←→), mouse wheel, and touch swipe. Only one slide SHALL be visible at a time.

#### Scenario: Intro slide appears on page load
- **WHEN** the page loads
- **THEN** the intro slide is shown first: black background, "MAISON NORD" heading in Cormorant Garamond, tagline "Interior Design Studio" and "Selected Work ↓" prompt — no photograph

#### Scenario: Navigating forward reveals the next slide
- **WHEN** the user presses ↓, →, scrolls down, or swipes up
- **THEN** the slides container translates upward smoothly (600ms cubic-bezier) to reveal the next slide, and the slide counter in the navbar updates

#### Scenario: Navigating backward reveals the previous slide
- **WHEN** the user presses ↑, ←, scrolls up, or swipes down
- **THEN** the slides container translates downward to reveal the previous slide

#### Scenario: Navigation stops at first and last slide
- **WHEN** the user attempts to navigate before the intro slide or after the Studio slide
- **THEN** no transition occurs

#### Scenario: Wheel events are debounced
- **WHEN** the user scrolls the mouse wheel rapidly
- **THEN** only one slide transition fires per scroll gesture (800ms cooldown between transitions)

#### Scenario: Touch swipe navigates on mobile
- **WHEN** a user swipes up by ≥ 50px on a touch device
- **THEN** the next slide is shown; swiping down ≥ 50px shows the previous slide

### Requirement: Navbar shows wordmark and slide counter
A persistent minimal navbar SHALL be visible on all slides. It SHALL display the studio wordmark "MAISON NORD" on the left and a slide counter on the right. The counter SHALL show "01 / 06" for the first project slide (not counting intro) through "06 / 06" for the last project slide. On the intro slide the counter shows nothing; on the Studio slide it shows "Studio".

#### Scenario: Counter updates on navigation
- **WHEN** the user navigates to a project slide
- **THEN** the counter in the navbar updates to show the current project index out of 6

#### Scenario: Navbar is transparent and non-intrusive
- **WHEN** any slide is active
- **THEN** the navbar has a transparent or very subtle background so it does not obscure slide content

### Requirement: Project slides display fullscreen photography with caption
Each of the 6 project slides SHALL display the project photograph as a fullscreen background (object-fit: cover). A caption bar at the bottom SHALL show the project name, category, city, and year. The caption SHALL be visible against the photo without an intrusive overlay.

#### Scenario: Project image fills the viewport
- **WHEN** a project slide is active
- **THEN** the photograph covers 100vw × 100vh with object-fit: cover and no white space

#### Scenario: Caption bar is readable
- **WHEN** any project slide is active
- **THEN** the caption bar at the bottom shows project name (prominent), category and year (secondary), all in light text against a dark strip or gradient

#### Scenario: Caption is visible on mobile
- **WHEN** viewed on viewport width < 768px
- **THEN** the caption text is readable and does not overflow or overlap with the navbar

### Requirement: Studio slide presents About, Services, and Contact in one view
The final slide (Studio) SHALL present studio information, a condensed services list, and the EmailJS contact form in a single viewport-height slide without internal scrolling. On desktop the layout SHALL use three columns (About | Services | Contact). On mobile it SHALL stack vertically.

#### Scenario: Studio slide fits within the viewport without scrolling
- **WHEN** the Studio slide is active on a desktop viewport (≥ 1024px height)
- **THEN** all content (about, services, contact form) is visible without requiring any scroll within the slide

#### Scenario: Contact form submits via EmailJS
- **WHEN** the user fills name, email, and message fields and clicks Submit
- **THEN** EmailJS sends the message and a success confirmation is shown within the slide

#### Scenario: Studio slide stacks on mobile
- **WHEN** the Studio slide is active on a viewport width < 768px
- **THEN** the About, Services, and Contact sections stack vertically in a single column
