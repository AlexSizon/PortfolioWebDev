## ADDED Requirements

### Requirement: Public menu page displays all categories and dishes
The public `/menu` page SHALL display all menu categories and their dishes in a visually appealing layout. Dishes show name, description, price, and an availability badge (available / sold out).

#### Scenario: All categories and dishes are visible
- **WHEN** a visitor navigates to `/menu`
- **THEN** all 4 categories are displayed as section headings, and all dishes within each category are displayed below their respective heading

#### Scenario: Sold-out dishes are visually distinct
- **WHEN** a dish has `available: false` in the database
- **THEN** the dish card is visually dimmed and shows a "Sold Out" badge

#### Scenario: Page updates when menu changes (real-time)
- **WHEN** an admin updates a dish price or marks a dish as unavailable
- **THEN** the public menu page reflects the change within 2 seconds without the visitor refreshing the page

### Requirement: Menu page is aesthetically consistent with the Okami Ramen brand
The menu page SHALL use the Okami Ramen color palette (Deep, Flame, Rice, Ember), Noto Serif JP + Satoshi typography, and Framer Motion entry animations for dish cards.

#### Scenario: Dish cards animate on page load
- **WHEN** the menu page loads
- **THEN** dish cards fade and slide up in staggered sequence (50ms apart) using Framer Motion

#### Scenario: Layout is responsive
- **WHEN** viewed on mobile (< 768px)
- **THEN** dishes display in a single column; on desktop (≥1024px) dishes display in a 2-column grid per category
