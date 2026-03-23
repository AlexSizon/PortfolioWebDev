## ADDED Requirements

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
