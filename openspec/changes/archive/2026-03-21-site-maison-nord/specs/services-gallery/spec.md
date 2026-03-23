## ADDED Requirements

### Requirement: Services section displays studio offerings
The services section SHALL display 5 service cards in a grid, each with a numbered label (01–05), service name, and 1–2 sentence description.

#### Scenario: All services render correctly
- **WHEN** the user scrolls to the services section
- **THEN** all 5 service cards are displayed with visible numbers, names, and descriptions. Services: Interior Design, Space Planning, 3D Visualization, Furniture Selection, Project Management

#### Scenario: Service cards respond to hover
- **WHEN** the user hovers over a service card
- **THEN** the card border transitions from sand to gold and a subtle background tint appears

### Requirement: Projects gallery displays 6 portfolio projects
The projects gallery SHALL display 6 interior design project cards in a 3×2 grid on desktop and 1-column on mobile. Each card shows a project photograph, project name, year, and category tag.

#### Scenario: Gallery grid renders on desktop
- **WHEN** a user views the projects section on desktop (≥1024px)
- **THEN** 6 project cards are displayed in a 3-column grid

#### Scenario: Project photo hover reveals overlay
- **WHEN** the user hovers over a project card
- **THEN** the photograph zooms slightly (scale 1.05) and a dark overlay appears with the project name and year in white text

#### Scenario: Gallery is single-column on mobile
- **WHEN** viewed on width < 768px
- **THEN** project cards stack in a single column with full-width images

### Requirement: Testimonials section displays client quotes
The testimonials section SHALL display 3 client testimonials in a minimal layout with client name, role, and quote text.

#### Scenario: All testimonials visible simultaneously
- **WHEN** the user scrolls to the testimonials section on desktop
- **THEN** all 3 testimonials are visible in a 3-column layout (or stacked on mobile)

#### Scenario: Testimonial text is readable
- **WHEN** viewing any testimonial
- **THEN** the quote text uses quotation marks and is set in a legible italic serif style
