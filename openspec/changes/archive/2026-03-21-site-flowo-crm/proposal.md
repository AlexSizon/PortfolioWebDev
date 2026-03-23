## Why

The portfolio needs a complex-application demo that targets medium-sized business clients (agencies, studios, consultancies). Flowo CRM demonstrates advanced React patterns — drag-and-drop kanban, data visualizations, and a polished glassmorphism dark UI. This is the demo that qualifies high-value client conversations: "Can you build something custom for our team?" The answer is visible without a word.

## What Changes

- New `apps/flowo-crm` Next.js 15 application
- Brand: **FLOWO** — CRM for Creative Agencies
- Dark glassmorphism UI with violet/cyan/pink gradients
- Kanban pipeline board with drag-and-drop (dnd-kit) across 6 stages
- Client management: list, detail view, tags, contact info, deal history
- Task management linked to clients and deals
- Analytics dashboard: revenue chart, conversion funnel, deal count by month
- Demo login with auto-fill button (`demo@flowo.app` / `demo123`)
- Demo mode restrictions (no destructive actions)
- Seed data: 20 clients, 24 deals, 35 tasks, 3 months history
- Nightly cron seed reset

## Capabilities

### New Capabilities

- `kanban-pipeline`: Drag-and-drop deal board across 6 pipeline stages with deal values and client associations
- `client-management`: Client list with search/filter, client detail pages with deal history, notes, and contact info
- `analytics-dashboard`: Revenue bar chart, monthly deal trend line, conversion rate KPIs, top clients list
- `auth-demo-login`: NextAuth credentials auth with demo auto-fill button; demo user has restricted permissions (no delete/wipe)

### Modified Capabilities

_(none — standalone demo app)_

## Impact

- New app at `apps/flowo-crm/` in the Turborepo monorepo
- Requires `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` env vars
- SQLite database file on Railway persistent volume (`/data/flowo.db`)
- Heaviest client-side bundle of the 5 apps (dnd-kit + Recharts + Framer Motion)
- Can be developed in parallel with 3 other demo sites after `portfolio-hub` completes
- Deployment: Railway service `flowo.alsy.dev`
