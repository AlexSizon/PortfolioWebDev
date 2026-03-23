## ADDED Requirements

### Requirement: Four demo cards are displayed in a grid
The demo showcase section SHALL display exactly 4 cards in a responsive grid (2×2 on desktop ≥1024px, 1-column on mobile) each representing one demo site: Maison Nord, Okami Ramen, Flowo CRM, and Lumina AI.

#### Scenario: All 4 cards visible on desktop
- **WHEN** a user views the page on a screen width ≥ 1024px
- **THEN** all 4 demo cards are displayed in a 2×2 grid layout with equal dimensions

#### Scenario: Cards stack on mobile
- **WHEN** a user views the page on a screen width < 768px
- **THEN** cards are displayed in a single column, stacked vertically

### Requirement: Each demo card contains essential information
Each demo card SHALL display: a preview image/mockup, the demo brand name, a 1-sentence description of what the demo shows, up to 4 technology stack tags, and an "Open Demo" link button.

#### Scenario: Card content renders correctly
- **WHEN** a user views any demo card
- **THEN** the brand name, description text, stack tags, and "Open Demo" button are all visible without overflow or truncation

#### Scenario: Stack tags display the correct technologies
- **WHEN** viewing the Maison Nord card
- **THEN** tags show "Astro", "Tailwind", "CSS Animations"
- **WHEN** viewing the Okami Ramen card
- **THEN** tags show "Next.js", "Prisma", "Real-time", "Auth"
- **WHEN** viewing the Flowo CRM card
- **THEN** tags show "Next.js", "dnd-kit", "Recharts", "Auth"
- **WHEN** viewing the Lumina AI card
- **THEN** tags show "Next.js", "Framer Motion", "GSAP"

### Requirement: Demo cards link to live demo URLs
Each demo card SHALL have an "Open Demo" button that opens the respective demo URL in a new browser tab.

#### Scenario: Open Demo button opens new tab
- **WHEN** the user clicks "Open Demo" on any card
- **THEN** the demo URL opens in a new tab (`target="_blank" rel="noopener noreferrer"`)

### Requirement: Demo cards have hover animation
Each demo card SHALL lift and show a violet border glow on mouse hover.

#### Scenario: Card hover state activates
- **WHEN** the user hovers over a demo card
- **THEN** the card translates upward by 4–8px and a violet/purple border glow becomes visible with a smooth 200ms transition
