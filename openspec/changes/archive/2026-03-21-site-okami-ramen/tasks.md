> **Prerequisites:** `portfolio-hub` change complete. Turborepo monorepo exists at repo root.
> **Agent:** This change can be executed independently in parallel with site-maison-nord, site-flowo-crm, and site-lumina-ai.

## 1. App Scaffold

- [x] 1.1 Create `apps/okami-ramen` with `create-next-app@latest` (TypeScript, Tailwind, App Router)
- [x] 1.2 Configure Tailwind with brand tokens: `okami-deep` `#1A0A00`, `okami-flame` `#FF4B00`, `okami-rice` `#F5E6D3`, `okami-ember` `#2D1810`
- [x] 1.3 Install `next/font` — configure Noto Serif JP and Satoshi as CSS variables
- [ ] 1.4 Add `apps/okami-ramen` to `turbo.json` pipeline; verify `pnpm dev --filter=okami-ramen` runs
- [x] 1.5 Install dependencies: `prisma`, `@prisma/client`, `next-auth@beta`, `framer-motion`, `@shadcn/ui` init

## 2. Database & Prisma

- [x] 2.1 Initialize Prisma: `npx prisma init --datasource-provider sqlite`
- [x] 2.2 Define schema models: `User`, `Category` (id, name, order), `MenuItem` (id, name, description, price, imageUrl, available, categoryId)
- [x] 2.3 Run `prisma migrate dev --name init` to create the SQLite database
- [x] 2.4 Create `prisma/seed.ts`: 1 admin user (bcrypt hashed password), 4 categories, 20 dishes with realistic names, descriptions, and prices
- [x] 2.5 Add `"prisma": { "seed": "tsx prisma/seed.ts" }` to `package.json` and run `prisma db seed`

## 3. Authentication

- [x] 3.1 Install and configure NextAuth.js v5 (`auth.ts`, `auth.config.ts`) with Credentials provider
- [x] 3.2 Implement middleware in `middleware.ts` that protects all `/admin/*` routes — redirect to `/login` if not authenticated
- [x] 3.3 Create `/login` page with email/password form (Shadcn/ui Input, Button)
- [x] 3.4 Add demo auto-fill button: pre-fills `admin@okami.app` / `demo123` and submits form programmatically
- [x] 3.5 Add demo info banner above login form: "Demo credentials — click below to enter"
- [x] 3.6 Test: unauthenticated access to `/admin` redirects to `/login`

## 4. Public Menu UI

- [x] 4.1 Create `app/menu/page.tsx` — public menu page with Okami Ramen branding
- [x] 4.2 Create `GET /api/menu` route that returns all categories with nested menu items
- [x] 4.3 Render category sections with H2 headings and dish cards (2-col grid on desktop, 1-col on mobile)
- [x] 4.4 Style dish cards with Okami Ramen palette — name, description, price, availability badge
- [x] 4.5 Add Framer Motion staggered entry animation to dish cards on load

## 5. Real-Time SSE

- [x] 5.1 Create `GET /api/menu/events` route implementing SSE: set `Content-Type: text/event-stream` headers, keep connection open with `ReadableStream`
- [x] 5.2 Create in-memory `EventEmitter` singleton (`lib/menu-events.ts`) that SSE endpoint subscribes to
- [x] 5.3 Emit `menu-updated` event from the emitter whenever any API write operation (create/update/delete) completes
- [x] 5.4 Add `EventSource` hook in `app/menu/page.tsx` — subscribe on mount, call SWR/fetch revalidation on `menu-updated` event, close on unmount
- [ ] 5.5 Test: open two browser windows (public menu + admin), change a price in admin, verify public menu updates within 2 seconds
- [x] 5.6 Add `: keepalive` SSE comment every 30 seconds to prevent proxy timeout

## 6. Admin Panel

- [x] 6.1 Create `app/admin/layout.tsx` with Shadcn sidebar navigation: Menu Items | Categories
- [x] 6.2 Create `app/admin/page.tsx` — redirect to `/admin/menu`
- [x] 6.3 Add persistent demo banner: "Demo mode — all changes reset nightly at 03:00 UTC"
- [x] 6.4 Create `app/admin/menu/page.tsx` — Shadcn DataTable of all menu items with Name, Category, Price, Available columns
- [x] 6.5 Implement "Add Dish" button → Shadcn Dialog with form (name, description, price, category, imageUrl)
- [x] 6.6 Implement "Edit" inline action → pre-filled Dialog, save updates via `PATCH /api/menu/items/[id]`
- [x] 6.7 Implement "Delete" action with confirmation AlertDialog → `DELETE /api/menu/items/[id]`
- [x] 6.8 Implement availability toggle switch → `PATCH /api/menu/items/[id]` with `{ available: boolean }`
- [x] 6.9 Implement Categories CRUD page (add/rename/delete categories)

## 7. API Routes (Admin)

- [x] 7.1 `POST /api/menu/items` — create new menu item, emit `menu-updated` event
- [x] 7.2 `PATCH /api/menu/items/[id]` — update any field, emit `menu-updated` event
- [x] 7.3 `DELETE /api/menu/items/[id]` — delete item, emit `menu-updated` event
- [x] 7.4 Add session check in all write API routes — return 401 if no session

## 8. Seed Reset Cron

- [ ] 8.1 Create Railway cron job configuration that runs `npx tsx prisma/seed.ts` nightly at 03:00 UTC
- [x] 8.2 Ensure seed script is idempotent: `upsert` all records by known ID or truncate + re-insert

## 9. Polish & Responsive

- [ ] 9.1 Audit public menu at 375px, 768px, 1024px — fix any layout issues
- [ ] 9.2 Audit admin panel at 768px — ensure Shadcn DataTable is usable on tablet
- [x] 9.3 Add loading skeletons on public menu page while data fetches
- [x] 9.4 Add optimistic updates in admin table on price/availability change (reduce perceived latency)

## 10. Deployment

- [ ] 10.1 Set Railway environment variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- [ ] 10.2 Configure Railway persistent volume at `/data` for SQLite file
- [x] 10.3 Add Railway build command: `pnpm build --filter=okami-ramen`
- [ ] 10.4 Verify live deployment at `okami-ramen.alsy.dev`, run the two-window real-time demo test
