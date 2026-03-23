## ADDED Requirements

### Requirement: Post-hero sections keep a consistent content frame
The Maison Nord homepage SHALL keep all post-hero sections inside a centered content frame that uses the intended readable page width on desktop while preserving responsive horizontal padding on smaller screens.

#### Scenario: About section uses balanced desktop composition
- **WHEN** a user views the homepage on a desktop viewport
- **THEN** the About section content is centered within the page, uses its intended multi-column layout, and does not collapse into a narrow left-aligned strip with a large empty area on the right

#### Scenario: Sections do not introduce horizontal overflow
- **WHEN** a user views any post-hero homepage section on tablet or mobile
- **THEN** the section content remains inside the viewport without horizontal scrolling or clipped columns

### Requirement: Post-hero sections maintain a spacious vertical rhythm
The Maison Nord homepage SHALL use generous vertical spacing and separation between post-hero sections, section headers, and major content groups so the layout feels calm and editorial rather than compressed.

#### Scenario: Adjacent sections have visible breathing room on desktop
- **WHEN** a user scrolls from one post-hero section to the next on a desktop viewport
- **THEN** each section is visually separated by enough padding and internal spacing that content does not appear stacked tightly against the next block

#### Scenario: About section content is not visually crowded
- **WHEN** a user views the About section on desktop
- **THEN** the heading, body copy, quote, and stat row have clear separation and do not read as a compressed cluster of elements
