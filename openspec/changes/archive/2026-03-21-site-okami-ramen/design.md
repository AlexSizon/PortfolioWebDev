## Context

Okami Ramen is the "full-stack proof" demo — it must demonstrate real database operations, session auth, and live updates. The key demo moment is opening two browser windows side by side: public menu + admin panel. Admin changes a price → public page updates in under 1 second. This is the moment that sells the concept.

SQLite on a Railway persistent volume is the right choice for a demo — zero configuration, instant setup, and nightly reset via seed is trivial with Prisma.

## Goals / Non-Goals

**Goals:**
- NextAuth.js v5 credentials provider with demo auto-fill button
- Protected `/admin` routes via Next.js middleware
- Public `/menu` page subscribing to SSE for live updates
- Admin CRUD: add/edit/delete categories and dishes
- SSE endpoint: broadcasts `menu-updated` event on any write
- Prisma schema: `Category`, `MenuItem`, `User` models
- Shadcn/ui for admin interface (consistent, polished)
- Framer Motion for public menu page dish cards
- Seed: 4 categories, 20 dishes, 1 admin user
- Nightly Railway cron: `prisma db seed` resets to seed state
- Fully responsive

**Non-Goals:**
- Customer orders or reservations
- Multiple admin user roles
- Image upload (dish images are Unsplash URLs)
- Email notifications
- Payments

## Decisions

### SQLite over PostgreSQL
For a demo with ~20 rows, SQLite is faster to set up, cheaper (no separate DB service cost), and perfectly sufficient. Railway persistent volume stores the `.db` file. If a real client wants to scale, migration to PostgreSQL is straightforward via Prisma.

### Server-Sent Events (SSE) over WebSockets
SSE is unidirectional (server → client), which is exactly what's needed: server notifies clients when menu changes. No need for bidirectional communication. SSE works over standard HTTP, requires no extra infrastructure, and is natively supported by all modern browsers. WebSockets would add complexity with no benefit here.

### NextAuth.js v5 over custom JWT auth
NextAuth v5 (Auth.js) is the standard for Next.js App Router. Handles session management, CSRF protection, and cookies correctly. Credentials provider is the simplest option for a demo with a single hardcoded user.

### Shadcn/ui for admin, custom styles for public menu
Admin needs functional, polished UI components quickly — Shadcn/ui is ideal. Public menu page is brand-specific and benefits from custom styling to match the Okami Ramen aesthetic.

### SSE broadcast via in-memory event emitter
For a single-instance demo deployment, an in-memory Node.js EventEmitter is sufficient. All SSE clients connect to the same process. If multi-instance were needed, a Redis pub/sub would replace this — noted in `README.md` as a scaling path.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| SQLite file corruption under concurrent writes | Demo has at most 1-2 concurrent admins; WAL mode enabled via Prisma |
| SSE connections staying open drain Railway's free tier | Railway Starter has no connection limits; connections are short-lived if tab closes |
| Demo user can accidentally corrupt seed data | Nightly reset restores clean state; banner warns "data resets nightly" |
| Railway cron runs `prisma db seed` as a separate process | Use `tsx` to run seed script directly; cron command: `npx tsx prisma/seed.ts` |
