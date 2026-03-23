# fullscreen-gallery-nav Specification

## Purpose
TBD - created by syncing change maison-nord-fullscreen-redesign.
## Requirements
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
A persistent minimal navbar SHALL remain available as part of the fullscreen gallery chrome, but it SHALL no longer display a slide counter or any replacement status element. On intro and project slides, the navbar SHALL show the studio wordmark on the left. On the final Studio slide, the top-left wordmark SHALL be hidden so the closing composition reads more quietly. Any remaining navigation controls SHALL stay usable without obscuring the slide content.

#### Scenario: Intro and project slides show only the wordmark
- **WHEN** the user is on the intro slide or any project slide
- **THEN** the navbar shows the Maison Nord wordmark without a slide counter

#### Scenario: Studio slide hides the wordmark
- **WHEN** the user reaches the final Studio slide
- **THEN** the top-left Maison Nord wordmark is not displayed

#### Scenario: Navigation chrome remains non-intrusive
- **WHEN** any slide is active
- **THEN** the remaining navbar controls stay readable and usable without competing with the slide composition

### Requirement: Project slides display fullscreen photography with caption
Each project slide SHALL continue to use a full-bleed photography-first composition with a compact caption rail, but the caption SHALL NOT display slide numbering or total-count indicators. The caption SHALL focus on project identity and metadata only. The caption container SHALL NOT show a decorative top stripe or divider above the content block, and the title, metadata, and descriptive copy SHALL be positioned consistently across all project slides. The project caption panel SHALL also keep a stable visual footprint across project slides while allowing the internal content to reflow fluidly on resize. The panel SHALL use `5%` horizontal padding on both sides, and the title block and the metadata/copy block SHALL be vertically centered within the panel composition.

#### Scenario: Project caption omits numeric index
- **WHEN** any project slide is active
- **THEN** the caption rail does not display values like `01 / 06` or any other slide-count marker

#### Scenario: Caption hierarchy remains readable without numbering
- **WHEN** a project slide is active
- **THEN** the project title, category, city, year, and descriptive copy remain readable and visually balanced without relying on a numeric index label

#### Scenario: Caption container has no top stripe
- **WHEN** any project slide is active
- **THEN** the caption object does not render a visible horizontal stripe or divider above the content area

#### Scenario: Caption content is consistently positioned
- **WHEN** the user moves between project slides
- **THEN** the title, metadata, and description maintain a stable, intentional alignment within the caption container instead of drifting or collapsing awkwardly

#### Scenario: Caption panel size remains visually consistent
- **WHEN** the user navigates between project slides with shorter and longer copy
- **THEN** the project caption card keeps a consistent width and minimum height treatment instead of shrinking or stretching unpredictably from slide to slide

#### Scenario: Caption content reflows without breaking on resize
- **WHEN** the viewport is resized across desktop, tablet, or mobile widths
- **THEN** the title, metadata, and description reflow within the caption panel without overlap, clipping, or dependence on rigid pixel-based positioning

#### Scenario: Caption panel keeps proportional side insets
- **WHEN** any project slide is active
- **THEN** the caption panel applies horizontal content padding equivalent to `5%` on the left and `5%` on the right instead of uneven or ad hoc inner spacing

#### Scenario: Caption groups are vertically centered
- **WHEN** any project slide is active
- **THEN** the project title block and the metadata/description block align around a shared vertical center within the panel rather than hugging opposite edges awkwardly

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

