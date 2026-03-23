## MODIFIED Requirements

### Requirement: Services displayed as compact list inside Studio slide
The 5 studio services SHALL be displayed as a compact vertical list (name only, no descriptions) inside the Studio slide. The list SHALL fit within its column of the Studio slide without requiring internal scrolling.

#### Scenario: Services list renders in Studio slide
- **WHEN** the user navigates to the Studio slide
- **THEN** all 5 service names are visible: Interior Design, Space Planning, 3D Visualization, Furniture Selection, Project Management

#### Scenario: Services fit within viewport height
- **WHEN** the Studio slide is active on any viewport ≥ 768px height
- **THEN** the services list does not overflow its column or require scrolling

## REMOVED Requirements

### Requirement: Projects gallery displays 6 portfolio projects
**Reason:** The gallery grid is replaced by the fullscreen slide navigator. Each project is now a dedicated fullscreen slide.
**Migration:** `Gallery.astro` is deleted. Project data moves to the `ProjectSlide.astro` component array.

### Requirement: Testimonials section displays client quotes
**Reason:** Testimonials section is removed entirely from the redesigned layout. The Studio slide does not include testimonials.
**Migration:** `Testimonials.astro` is deleted. No replacement.
