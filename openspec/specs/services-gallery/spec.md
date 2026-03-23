# services-gallery Specification

## Purpose
TBD - created by archiving change site-maison-nord. Update Purpose after archive.
## Requirements
### Requirement: Services displayed as compact list inside Studio slide
The 5 studio services SHALL be displayed as a compact vertical list (name only, no descriptions) inside the Studio slide. The list SHALL fit within its column of the Studio slide without requiring internal scrolling.

#### Scenario: Services list renders in Studio slide
- **WHEN** the user navigates to the Studio slide
- **THEN** all 5 service names are visible: Interior Design, Space Planning, 3D Visualization, Furniture Selection, Project Management

#### Scenario: Services fit within viewport height
- **WHEN** the Studio slide is active on any viewport ≥ 768px height
- **THEN** the services list does not overflow its column or require scrolling


