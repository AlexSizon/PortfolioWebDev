## ADDED Requirements

### Requirement: Admin panel provides full CRUD for menu items
The `/admin` area SHALL provide an authenticated dashboard where the admin can: view all categories and dishes in a table, add new dishes, edit existing dishes, delete dishes, and toggle dish availability.

#### Scenario: Admin can add a new dish
- **WHEN** the admin clicks "Add Dish", fills in name, description, price, category, and submits
- **THEN** the new dish is saved to the database and appears immediately in the admin table and on the public menu

#### Scenario: Admin can edit a dish price
- **WHEN** the admin clicks "Edit" on a dish, changes the price, and saves
- **THEN** the updated price is persisted and the public menu reflects the change within 2 seconds

#### Scenario: Admin can delete a dish
- **WHEN** the admin clicks "Delete" on a dish and confirms the dialog
- **THEN** the dish is removed from the database and disappears from the public menu

#### Scenario: Admin can toggle dish availability
- **WHEN** the admin toggles the availability switch for a dish
- **THEN** the `available` field updates immediately and the public menu reflects the sold-out state

### Requirement: Admin panel uses Shadcn/ui components
The admin panel SHALL use Shadcn/ui for all form inputs, tables, dialogs, and buttons to ensure a polished, consistent UI.

#### Scenario: Admin table is sortable and readable
- **WHEN** the admin views the dish list
- **THEN** all dishes are displayed in a Shadcn data table with columns for name, category, price, and availability status

### Requirement: Demo reset banner visible in admin
The admin panel SHALL display a persistent banner informing the demo user that data resets nightly.

#### Scenario: Banner is always visible
- **WHEN** any authenticated user views the admin panel
- **THEN** a non-dismissable banner at the top reads "Demo mode — all changes reset nightly at 03:00 UTC"
