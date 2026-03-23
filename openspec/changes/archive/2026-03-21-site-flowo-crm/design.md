## Context

Flowo CRM is the most technically complex demo — it demonstrates state management, data visualization, and complex UI patterns (drag-and-drop, modals, nested routing). The glassmorphism dark UI with violet/cyan gradients creates an immediate "this looks like a real product" impression.

The challenge is showing richness without overwhelming the demo visitor. A pre-populated database with realistic data (client names, deal values, activity history) makes the demo feel alive and immediately understandable.

## Goals / Non-Goals

**Goals:**
- Glassmorphism dark UI (card backgrounds: `bg-white/5 backdrop-blur-md border border-white/10`)
- Sidebar navigation: Dashboard | Pipeline | Clients | Tasks | Settings
- Kanban pipeline: 6 columns, drag deals between columns (@dnd-kit)
- Client list: searchable, filterable by tag, click-through to detail page
- Client detail: contact info, deal history timeline, notes
- Analytics dashboard: revenue bar chart, deal trend line, conversion KPIs (Recharts)
- Demo mode: read-only badge, delete buttons disabled with toast
- Demo auto-fill button: pre-fills and submits login form
- Seed: 20 clients, 24 deals, 35 tasks, 90 days of activity
- Nightly seed reset
- Responsive (sidebar collapses to bottom nav on mobile)

**Non-Goals:**
- Email integration (send emails from CRM)
- Calendar integration
- Document/file attachments
- Multi-seat team features
- Custom pipeline stage editor

## Decisions

### Zustand for client state + TanStack Query for server state
Kanban board needs optimistic drag-and-drop updates — Zustand handles the local UI state instantly while TanStack Query syncs with the API. This is the correct pattern: no double data fetching, no stale UI during network calls.

### @dnd-kit over react-beautiful-dnd
react-beautiful-dnd is unmaintained. @dnd-kit is the current standard — accessible, performant, and has a modular API that integrates cleanly with our list-of-columns kanban layout.

### Recharts over Chart.js or Tremor
Recharts is a React-native charting library — composable components that integrate naturally with Tailwind CSS custom colors. Tremor is higher-level but less customizable for the bespoke dark glassmorphism aesthetic. Chart.js is canvas-based and harder to style responsively.

### Hardcoded demo restrictions in API middleware
Delete and destructive endpoints check for the demo user's ID and return `403` with a JSON body `{ message: "Not available in demo mode" }`. The UI catches this and shows a toast. This is simpler than a role/permission system.

### SQLite on Railway volume
Same rationale as Okami Ramen — sufficient for a demo. Nightly reset with `prisma db seed`.

### Sidebar layout on desktop, bottom nav on mobile
Standard pattern for SaaS apps. Sidebar collapses at `md` breakpoint to a bottom navigation bar with icons. Keeps the layout recognizable across devices.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| dnd-kit drag state and TanStack Query cache mismatch | Use optimistic updates in Zustand; revalidate TanStack Query after `onDragEnd` |
| 90 days of seed data is heavy to generate | Generate programmatically with `faker` in seed script — deterministic with fixed seed |
| Recharts doesn't support SSR well | Wrap charts in `dynamic(() => import(...), { ssr: false })` for Next.js App Router |
| Glassmorphism at low contrast on some monitors | Test contrast ratios; never use glassmorphism for text — only for card backgrounds |
