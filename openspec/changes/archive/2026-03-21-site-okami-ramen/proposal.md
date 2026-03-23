## Why

The portfolio needs a full-stack demo that shows real database-backed functionality, authentication, and real-time updates — things small-business clients (restaurants, cafes, retail) genuinely need. Okami Ramen demonstrates the "killer feature": an admin changes the menu and the customer-facing page updates instantly without a reload. This is the demo that turns skeptical clients into buyers.

## What Changes

- New `apps/okami-ramen` Next.js 15 application
- Brand: **OKAMI RAMEN** — Japanese Restaurant
- Public menu page with real-time live pricing and dish availability
- Admin login panel (protected routes via NextAuth.js v5)
- Full CRUD for menu categories and dishes in the admin
- Server-Sent Events (SSE) endpoint powering live updates on the public page
- Demo login auto-fill button (`admin@okami.app` / `demo123`)
- Seed data: 4 categories, 20 dishes
- Nightly cron seed reset (Railway cron job)
- Shadcn/ui component library for polished admin UI

## Capabilities

### New Capabilities

- `public-menu`: Customer-facing menu page showing categories, dishes, prices, and availability status in real-time
- `admin-panel`: Protected admin dashboard with full CRUD for menu items and categories
- `auth-system`: NextAuth.js credentials authentication with demo auto-fill button and protected route middleware
- `realtime-updates`: SSE endpoint that broadcasts menu change events; public page subscribes and updates without reload

### Modified Capabilities

_(none — standalone demo app)_

## Impact

- New app at `apps/okami-ramen/` in the Turborepo monorepo
- Requires `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` env vars
- SQLite database file on Railway persistent volume (`/data/okami.db`)
- Can be developed in parallel with 3 other demo sites after `portfolio-hub` completes
- Deployment: Railway service `okami-ramen.alsy.dev`
