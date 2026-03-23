## MODIFIED Requirements

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
