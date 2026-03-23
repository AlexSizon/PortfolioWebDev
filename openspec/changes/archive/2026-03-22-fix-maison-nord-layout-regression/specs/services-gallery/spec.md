## MODIFIED Requirements

### Requirement: Services section displays studio offerings
The services section SHALL display 5 service cards in a responsive grid, each with a numbered label (01–05), service name, and 1–2 sentence description. On desktop, the grid SHALL occupy the intended centered content width rather than collapsing into a narrow partial-width column, and the cards SHALL preserve enough padding and spacing to feel airy rather than cramped.

#### Scenario: All services render correctly
- **WHEN** the user scrolls to the services section
- **THEN** all 5 service cards are displayed with visible numbers, names, and descriptions. Services: Interior Design, Space Planning, 3D Visualization, Furniture Selection, Project Management

#### Scenario: Service cards respond to hover
- **WHEN** the user hovers over a service card
- **THEN** the card border transitions from sand to gold and a subtle background tint appears

#### Scenario: Services grid keeps balanced desktop width
- **WHEN** a user views the services section on a desktop viewport
- **THEN** the full set of cards spans the centered section container with evenly distributed columns and without a large unused right-side area

#### Scenario: Service cards preserve breathing room
- **WHEN** a user views the services section on desktop
- **THEN** the spacing between cards, headings, numbering, and body copy is generous enough that the section does not read as a dense wall of boxes

### Requirement: Projects gallery displays 6 portfolio projects
The projects gallery SHALL display 6 interior design project cards in a responsive grid: 3 columns on desktop, fewer columns on smaller screens, and 1 column on mobile. Each card shows a project photograph, project name, year, and category tag, and the gallery SHALL remain centered within the available content width with enough gutters and section spacing to avoid a crowded collage effect.

#### Scenario: Gallery grid renders on desktop
- **WHEN** a user views the projects section on desktop (≥1024px)
- **THEN** 6 project cards are displayed in a 3-column grid that fills the intended centered content area

#### Scenario: Project photo hover reveals overlay
- **WHEN** the user hovers over a project card
- **THEN** the photograph zooms slightly (scale 1.05) and a dark overlay appears with the project name and year in white text

#### Scenario: Gallery is single-column on mobile
- **WHEN** viewed on width < 768px
- **THEN** project cards stack in a single column with full-width images

#### Scenario: Gallery composition feels spacious on desktop
- **WHEN** a user views the projects section on desktop
- **THEN** the image grid uses clear gaps and surrounding whitespace so individual projects feel curated rather than tightly packed together

### Requirement: Testimonials section displays client quotes
The testimonials section SHALL display 3 client testimonials in a minimal responsive layout with client name, role, and quote text. On desktop, the testimonials SHALL render as balanced columns inside the centered section container instead of collapsing into a narrow partial-width strip, and the quote layout SHALL leave enough whitespace for comfortable reading.

#### Scenario: All testimonials visible simultaneously
- **WHEN** the user scrolls to the testimonials section on desktop
- **THEN** all 3 testimonials are visible in a balanced 3-column layout (or stacked on smaller screens)

#### Scenario: Testimonial text is readable
- **WHEN** viewing any testimonial
- **THEN** the quote text uses quotation marks and is set in a legible italic serif style

#### Scenario: Testimonials section keeps balanced section width
- **WHEN** a user views the testimonials section on desktop
- **THEN** the testimonial columns are centered within the section and do not leave a large empty canvas area caused by broken width constraints

#### Scenario: Testimonials keep comfortable reading density
- **WHEN** a user views the testimonials section on desktop
- **THEN** the spacing around quote text and attribution blocks is open enough that the testimonials do not feel compressed
