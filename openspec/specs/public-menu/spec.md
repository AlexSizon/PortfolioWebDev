# public-menu Specification

## Purpose
TBD - created by archiving change site-okami-ramen. Update Purpose after archive.

## Requirements
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
- **THEN** dishes display in a single column; on desktop (>=1024px) dishes display in a 2-column grid per category

### Requirement: Public menu dishes expose richer detail on demand
The public `/menu` page SHALL allow a visitor to inspect a dish in a modal dialog without leaving the page. The dialog SHALL show the dish name, image when available, full description, ingredients, price, and availability state.

#### Scenario: Visitor opens a dish detail dialog
- **WHEN** a visitor clicks a dish card on `/menu`
- **THEN** a modal dialog opens with the selected dish's detailed information

#### Scenario: Dish ingredients are visible in the detail view
- **WHEN** a dish has ingredients stored in the menu data
- **THEN** the dish detail dialog shows those ingredients in a readable list or grouped tokens

### Requirement: Public menu cards communicate interactivity
Dish cards on the public `/menu` page SHALL provide a hover treatment that makes it clear they can be opened for more detail.

#### Scenario: Visitor hovers a dish card
- **WHEN** a pointing-device user hovers over an available or sold-out dish card
- **THEN** the card responds with a visible interactive hover state without hiding price or availability information
