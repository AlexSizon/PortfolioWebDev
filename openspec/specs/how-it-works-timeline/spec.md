# how-it-works-timeline Specification

## Purpose
TBD - created by archiving change site-lumina-ai. Update Purpose after archive.
## Requirements
### Requirement: Timeline steps are connected by an SVG path that draws on scroll
The "How It Works" section SHALL display 4 numbered steps connected by an SVG polyline/path. As the user scrolls through the section, the SVG path SHALL progressively draw from the first step to the last using stroke-dashoffset animation.

#### Scenario: SVG path starts undrawn and draws on scroll
- **WHEN** the user begins scrolling into the How It Works section
- **THEN** the SVG connecting line starts drawing from the first step, progressing as the user scrolls downward

#### Scenario: SVG path is fully drawn when last step is reached
- **WHEN** the last step item is scrolled into the center of the viewport
- **THEN** the SVG path is fully drawn (stroke-dashoffset = 0)

#### Scenario: Path length is calculated dynamically
- **WHEN** the component mounts or the window resizes
- **THEN** `getTotalLength()` is called on the SVG path to recalculate `stroke-dasharray` and `stroke-dashoffset` correctly

#### Scenario: Reduced motion shows static complete path
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** the SVG path is shown fully drawn without scroll animation

### Requirement: Timeline steps have numbered indicators and descriptions
Each of the 4 timeline steps SHALL display a numbered circle (1–4), a step title, and a 1–2 sentence description.

#### Scenario: All 4 steps render with correct content
- **WHEN** the How It Works section is viewed
- **THEN** 4 steps are visible: "1. Connect", "2. Create", "3. Review", "4. Publish" (or equivalent) with descriptions below each title

