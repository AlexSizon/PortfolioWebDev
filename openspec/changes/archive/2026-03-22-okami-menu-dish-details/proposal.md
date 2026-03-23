## Why

The Okami Ramen menu currently shows each dish as a static card with a short description, price, and availability. That works for scanning, but it does not give visitors a richer way to inspect a dish before deciding, and the admin cannot maintain a dedicated ingredients field separate from the marketing description.

Adding structured ingredients improves the data model and makes the demo feel more complete. Enhancing the public menu with hover feedback and a dish detail modal also raises the perceived polish of the restaurant experience without changing the existing real-time update flow.

## What Changes

- Add an `ingredients` field to Okami Ramen menu items
- Extend seed data, admin types, and menu item API routes to read and write ingredients
- Update the admin dish dialog so ingredients can be created and edited
- Enhance the public menu cards with hover feedback
- Allow visitors to open a dish detail modal with image, description, ingredients, price, and availability

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `public-menu`: dishes now expose ingredient details and open an interactive detail dialog from the menu grid
- `admin-panel`: admins can create and edit dish ingredients as part of the menu item form

## Impact

- Affects `apps/okami-ramen/prisma`, menu API routes, admin menu UI, and public menu UI
- Requires a Prisma migration and seed update for the local SQLite database
- Keeps the existing SSE-based update mechanism intact
