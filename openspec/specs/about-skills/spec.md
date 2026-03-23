## ADDED Requirements

### Requirement: About section displays personal bio
The about section SHALL include a short (2–3 sentence) personal bio for Alex Syzonenko and a grid of technology stack icons with labels.

#### Scenario: Bio text is visible and readable
- **WHEN** the user scrolls to the about section
- **THEN** the bio paragraph is displayed with adequate font size (≥16px) and line-height for readability

#### Scenario: Tech stack grid renders icons
- **WHEN** the about section is in the viewport
- **THEN** a grid of 12–16 technology icons is visible, each with a label below (e.g., "React", "Next.js", "TypeScript", "Node.js", "Prisma", "Tailwind", "PostgreSQL", "Docker", "Git", "Figma")

### Requirement: Tech stack icons animate on viewport entry
The tech stack icon grid SHALL animate in when the section scrolls into the viewport (staggered fade-up).

#### Scenario: Icons animate on first scroll-into-view
- **WHEN** the user scrolls the about section into the viewport for the first time
- **THEN** each icon fades up with a staggered delay (50ms between each), creating a wave effect

#### Scenario: Icons do not re-animate on repeat scroll
- **WHEN** the user scrolls away and back to the about section
- **THEN** icons are already visible and do not replay the entrance animation
