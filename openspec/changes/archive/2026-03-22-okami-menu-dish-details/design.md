## Context

Okami Ramen already has a full menu flow:

- Prisma stores menu items and categories
- `/api/menu` returns categories with nested items for the public menu
- `/api/menu/items` and `/api/menu/items/[id]` power admin writes
- `/app/menu/page.tsx` renders animated cards and subscribes to SSE updates

The current `MenuItem` model has no dedicated ingredient field, so ingredient-like details are embedded only in the description text. The public menu also lacks an interaction model beyond reading a card inline.

## Goals / Non-Goals

**Goals:**

- Add a dedicated ingredients field to menu items
- Let admins manage ingredients in the existing dish dialog
- Improve the public menu cards with an obvious hover affordance
- Open a modal with fuller dish details without leaving the menu page
- Preserve existing real-time updates and sold-out behavior

**Non-Goals:**

- Redesign the full menu page layout
- Add ordering, cart, or checkout behavior
- Create a separate route per dish
- Refactor the entire admin table layout

## Decisions

Use a single text field for `ingredients` in the database.
This is the lowest-risk fit for the current Prisma + SQLite setup and admin form. The UI can split the value into a presentable list at render time while keeping the persistence model simple.

Keep ingredient editing inside the existing admin dish dialog.
This avoids adding table clutter or a new management surface.

Implement the public details view as a modal dialog.
The repo already includes a shared Radix/Shadcn dialog component, and a modal satisfies the "separate window" request while keeping the user on the live-updating menu page.

Make each dish card behave like an interactive trigger.
The card should communicate clickability with hover motion, border/emphasis, and a small text cue so the modal interaction feels discoverable.

## Risks / Trade-offs

- A freeform text field is easier to ship than a structured relation, but ingredient formatting depends on lightweight parsing rules
- Keeping the public menu inside one large client file is fast for this change, but the component may become denser
- Existing local SQLite data needs a migration and reseed to fully demonstrate the new field
