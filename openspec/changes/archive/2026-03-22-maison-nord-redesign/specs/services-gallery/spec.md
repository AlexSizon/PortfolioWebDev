## MODIFIED Requirements

### Requirement: Services section displays studio offerings
The services section SHALL display 5 service cards in a responsive grid, each with a numbered label (01–05), service name, and 1–2 sentence description. On desktop, the grid SHALL occupy the intended centered content width rather than collapsing into a narrow partial-width column, and the cards SHALL preserve enough padding and spacing to feel airy rather than cramped.

#### Scenario: All services render correctly
- **WHEN** the user scrolls to the services section
- **THEN** all 5 service cards are displayed with visible numbers, names, and descriptions. Services: Interior Design, Space Planning, 3D Visualization, Furniture Selection, Project Management

#### Scenario: Service cards respond to hover
- **WHEN** the user hovers over a service card
- **THEN** the card border transitions to a charcoal grey accent and a subtle dark background tint appears

#### Scenario: Services grid keeps balanced desktop width
- **WHEN** a user views the services section on a desktop viewport
- **THEN** the full set of cards spans the centered section container with evenly distributed columns and without a large unused right-side area

#### Scenario: Service cards preserve breathing room
- **WHEN** a user views the services section on desktop
- **THEN** the spacing between cards, headings, numbering, and body copy is generous enough that the section does not read as a dense wall of boxes
