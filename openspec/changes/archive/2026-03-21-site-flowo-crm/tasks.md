> **Prerequisites:** `portfolio-hub` change complete. Turborepo monorepo exists at repo root.
> **Agent:** This change can be executed independently in parallel with site-maison-nord, site-okami-ramen, and site-lumina-ai.

## 1. App Scaffold

- [x] 1.1 Create `apps/flowo-crm` with `create-next-app@latest` (TypeScript, Tailwind, App Router)
- [x] 1.2 Configure Tailwind with brand tokens: `flowo-void` `#0D0D14`, `flowo-violet` `#7C3AED`, `flowo-cyan` `#06B6D4`, `flowo-pink` `#F472B6`
- [x] 1.3 Install `next/font` — configure Plus Jakarta Sans as CSS variable
- [x] 1.4 Add `apps/flowo-crm` to `turbo.json` pipeline; verify `pnpm dev --filter=flowo-crm` runs
- [ ] 1.5 Install dependencies: `prisma`, `@prisma/client`, `next-auth@beta`, `framer-motion`, `@dnd-kit/core`, `@dnd-kit/sortable`, `recharts`, `zustand`, `@tanstack/react-query`, `@faker-js/faker`, init `shadcn/ui`

## 2. Database & Prisma

- [x] 2.1 Initialize Prisma with SQLite datasource
- [x] 2.2 Define schema models: `User`, `Client` (id, name, company, email, phone, tags, notes, createdAt), `Deal` (id, title, value, stage, clientId, createdAt), `Task` (id, title, dueDate, priority, done, clientId, dealId), `Activity` (id, type, description, clientId, createdAt)
- [x] 2.3 Run `prisma migrate dev --name init`
- [x] 2.4 Create `prisma/seed.ts` using `@faker-js/faker` with fixed seed for determinism: 20 clients, 24 deals across 6 stages, 35 tasks, 90 days of activity events
- [x] 2.5 Run `prisma db seed` and verify data

## 3. Authentication & Demo Login

- [x] 3.1 Configure NextAuth.js v5 with Credentials provider
- [x] 3.2 Create demo user in seed: `demo@flowo.app` / `demo123` (bcrypt hashed), role: `demo`
- [x] 3.3 Add middleware protecting all `/dashboard/*`, `/pipeline/*`, `/clients/*`, `/tasks/*` routes
- [x] 3.4 Create `/login` page (glassmorphism card style) with demo banner + auto-fill button
- [x] 3.5 Demo auto-fill button: fills email + password fields and submits programmatically
- [x] 3.6 Implement demo restriction middleware in API routes: check `session.user.role === 'demo'` for delete/wipe endpoints → return `403`

## 4. App Layout & Navigation

- [x] 4.1 Create `app/(app)/layout.tsx` — app shell with sidebar + main content area
- [x] 4.2 Create `Sidebar` component: Flowo logo, nav items (Dashboard, Pipeline, Clients, Tasks, Settings), user avatar at bottom
- [x] 4.3 Implement glassmorphism card style: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`
- [x] 4.4 Add violet→cyan gradient accent for active nav items
- [x] 4.5 Implement responsive: sidebar visible on `lg`, bottom nav bar on mobile (< 1024px)

## 5. Kanban Pipeline

- [x] 5.1 Create `app/(app)/pipeline/page.tsx` with 6-column kanban layout
- [x] 5.2 Install and configure `@dnd-kit/core` + `@dnd-kit/sortable` for cross-column drag-and-drop
- [x] 5.3 Create `DealCard` component: title, client name, value (formatted), priority chip
- [x] 5.4 Create `KanbanColumn` component: column title, deal cards, total value sum at top
- [x] 5.5 Implement `onDragEnd` handler: optimistically update Zustand store, call `PATCH /api/deals/[id]` to persist new stage
- [ ] 5.6 Add "Add Deal" button → modal form (Shadcn Dialog) with title, client select, value, priority fields
- [x] 5.7 Implement `POST /api/deals` and `PATCH /api/deals/[id]` API routes
- [ ] 5.8 Test: drag deal → verify persistence after page reload

## 6. Clients Module

- [x] 6.1 Create `app/(app)/clients/page.tsx` — client list with search input and tag filter
- [x] 6.2 Implement client search: `useQuery` with debounced search param → `GET /api/clients?search=`
- [x] 6.3 Create `ClientCard` or table row component: name, company, email, tags badges
- [x] 6.4 Create `app/(app)/clients/[id]/page.tsx` — client detail layout
- [x] 6.5 Client detail sections: contact info, linked deals list, tasks list, activity timeline
- [x] 6.6 Implement "Add Client" modal and `POST /api/clients` API route
- [x] 6.7 Implement "Delete Client" — blocked for demo user (show toast "Not available in demo mode")

## 7. Tasks Module

- [x] 7.1 Create `app/(app)/tasks/page.tsx` — task list with priority filter (High/Medium/Low) and due date sort
- [x] 7.2 Create `TaskRow` component: checkbox (toggle done), title, priority chip, due date, linked client name
- [x] 7.3 Implement task done toggle via `PATCH /api/tasks/[id]`
- [x] 7.4 Add "Add Task" button → modal with title, priority, due date, client link fields

## 8. Analytics Dashboard

- [x] 8.1 Create `app/(app)/dashboard/page.tsx` with 4 KPI metric cards
- [x] 8.2 Implement KPI cards: Total Clients (static from seed), Active Deals (count), Revenue This Month (sum Won deals this month), Conversion Rate
- [x] 8.3 Create revenue bar chart (Recharts `BarChart`) showing last 3 months Won deal values — load client-side only with `dynamic(() => import(...), { ssr: false })`
- [x] 8.4 Create deal trend line chart (Recharts `LineChart`) — new deals per month over last 3 months
- [x] 8.5 Style charts with flowo color palette; add custom tooltips

## 9. API Routes

- [x] 9.1 `GET /api/clients` with optional `search` and `tag` query params
- [x] 9.2 `GET /api/clients/[id]` with eager-loaded deals, tasks, activities
- [x] 9.3 `POST /api/clients`, `PATCH /api/clients/[id]`
- [x] 9.4 `DELETE /api/clients/[id]` — demo user restriction check
- [x] 9.5 `GET /api/deals`, `POST /api/deals`, `PATCH /api/deals/[id]`
- [x] 9.6 `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/[id]`
- [x] 9.7 `GET /api/analytics/revenue` — returns monthly revenue for last 3 months
- [x] 9.8 `GET /api/analytics/deals-trend` — returns monthly deal count for last 3 months

## 10. Seed Reset Cron

- [ ] 10.1 Configure Railway cron to run `npx tsx prisma/seed.ts` nightly at 03:00 UTC
- [x] 10.2 Ensure seed is idempotent — truncate all tables and re-insert, or use `upsert` with deterministic IDs

## 11. Polish & Responsive

- [ ] 11.1 Audit all pages at 375px (bottom nav) and 1440px (sidebar) — fix spacing and overflow
- [x] 11.2 Add Framer Motion `AnimatePresence` transitions between pages (fade, 200ms)
- [x] 11.3 Add loading skeletons for all data-fetching areas (client list, kanban, charts)
- [ ] 11.4 Test glassmorphism card contrast on a mid-range monitor — adjust `bg-white/7` if needed

## 12. Deployment

- [ ] 12.1 Set Railway environment variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- [ ] 12.2 Configure Railway persistent volume at `/data` for SQLite file
- [ ] 12.3 Verify live deployment at `flowo.alsy.dev`, test demo login auto-fill, verify drag-and-drop persists
