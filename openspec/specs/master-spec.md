# WebPortfolio — Master Project Specification

> **Author:** Alex Syzonenko (@alsy / alsy.dev)
> **Version:** 1.0 | March 2026
> **Purpose:** Complete reference specification for the entire portfolio monorepo.

---

## 1. Project Overview

A Turborepo monorepo containing 5 Next.js/Astro applications serving as a professional web development portfolio. The portfolio demonstrates range across 4 distinct client archetypes with a personal brand hub as the entry point.

**Brand Identity:**
- Full name: **Alex Syzonenko**
- Handle / Logo: **Alsy** (monogram: AS)
- Domain: **alsy.dev**
- Tagline: *"Создаю сайты которые продают."*

**Core philosophy:** Sell the picture first. Every demo must be visually stunning, fully responsive, and populated with seed data so it looks like a live product.

---

## 2. Monorepo Structure

```
WebPortfolio/                        ← git root
├── apps/
│   ├── portfolio/                   ← [SITE 0] Personal brand hub (alsy.dev)
│   ├── maison-nord/                 ← [SITE 1] Business card (Astro)
│   ├── okami-ramen/                 ← [SITE 2] Full-stack + real-time (Next.js)
│   ├── flowo-crm/                   ← [SITE 3] CRM (Next.js)
│   └── lumina-ai/                   ← [SITE 4] Animated landing (Next.js)
├── packages/
│   ├── ui/                          ← Shared primitive components (optional)
│   └── tsconfig/                    ← Shared TypeScript config
├── openspec/                        ← Project specifications
├── turbo.json
├── package.json
└── .env.example
```

**Build tool:** Turborepo with `pnpm` workspaces  
**Node version:** 20 LTS

---

## 3. Application Inventory

### Site 0 — Portfolio Hub (`apps/portfolio`)

| Property | Value |
|----------|-------|
| **Purpose** | Personal brand site, entry point to all demos |
| **Brand** | Alex Syzonenko / Alsy |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Color palette** | `#09090B` Zinc · `#FAFAFA` White · `#7C3AED` Violet |
| **Typography** | Geist (headings) + Inter (body) |
| **Backend** | Next.js API Routes (contact form) |
| **Email** | EmailJS (no backend dependency) |
| **Deploy** | Railway — `alsy.dev` |

**Sections:** Hero → Demo Showcase → About/Skills → Contact

---

### Site 1 — Maison Nord (`apps/maison-nord`)

| Property | Value |
|----------|-------|
| **Purpose** | Demo: business card / brand site for a premium studio |
| **Brand** | MAISON NORD — Interior Design Studio |
| **Framework** | Astro 4 |
| **Styling** | Tailwind CSS |
| **Animations** | CSS transitions + hover effects |
| **Color palette** | `#0F0F0F` Noir · `#F5F0E8` Linen · `#C9A96E` Gold · `#E8E0D5` Sand |
| **Typography** | Cormorant Garamond (display) + Inter (body) |
| **Backend** | None (static) |
| **Deploy** | Railway — Static adapter |
| **Lighthouse** | Target 100/100 Performance |

**Sections:** Hero → About Studio → Services → Projects Gallery → Testimonials → Contact

**Seed content:** 6 interior design projects with images, 3 testimonials, 5 services

---

### Site 2 — Okami Ramen (`apps/okami-ramen`)

| Property | Value |
|----------|-------|
| **Purpose** | Demo: full-stack site with real-time updates and admin panel |
| **Brand** | OKAMI RAMEN — Japanese Restaurant |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Color palette** | `#1A0A00` Deep · `#FF4B00` Flame · `#F5E6D3` Rice · `#2D1810` Ember |
| **Typography** | Noto Serif JP + Satoshi |
| **Backend** | Next.js API Routes |
| **Database** | Prisma + SQLite (Railway volume) |
| **Auth** | NextAuth.js v5 (credentials) |
| **Real-time** | Server-Sent Events (SSE) |
| **UI Library** | Shadcn/ui |
| **Deploy** | Railway — `okami-ramen.alsy.dev` |

**Demo credentials:** `admin@okami.app` / `demo123` (auto-fill button on login page)

**Seed content:** 4 menu categories, 20 dishes with prices and descriptions, 1 demo admin user

**Cron reset:** Nightly seed restoration at 03:00 UTC

---

### Site 3 — Flowo CRM (`apps/flowo-crm`)

| Property | Value |
|----------|-------|
| **Purpose** | Demo: CRM system with kanban, clients, analytics |
| **Brand** | FLOWO — CRM for Creative Agencies |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Color palette** | `#0D0D14` Void · `#7C3AED` Violet · `#06B6D4` Cyan · `#F472B6` Pink |
| **Typography** | Plus Jakarta Sans |
| **Backend** | Next.js API Routes |
| **Database** | Prisma + SQLite |
| **Auth** | NextAuth.js v5 |
| **State mgmt** | Zustand + TanStack Query |
| **UI Library** | Shadcn/ui + Radix |
| **Drag & Drop** | @dnd-kit |
| **Charts** | Recharts |
| **Deploy** | Railway — `flowo.alsy.dev` |

**Demo credentials:** `demo@flowo.app` / `demo123` (auto-fill button on login page)

**Seed content:**
- 6 pipeline stages: Leads → Qualified → Proposal → Negotiation → Won → Lost
- 24 deals across stages, with values ranging $1,200–$18,500
- 20 clients with names, companies, tags, contact info
- 35 tasks with priorities and due dates
- 3 months of activity history for analytics charts

**Cron reset:** Nightly seed restoration at 03:00 UTC

---

### Site 4 — Lumina AI (`apps/lumina-ai`)

| Property | Value |
|----------|-------|
| **Purpose** | Demo: animated single-page landing for a SaaS/AI product |
| **Brand** | LUMINA AI — AI Content Creation Platform |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion (scroll) + GSAP (complex) |
| **Smooth scroll** | Lenis |
| **Color palette** | `#020817` Space · `#10B981` Emerald · `#8B5CF6` Purple · `#3B82F6` Blue |
| **Typography** | Cal Sans (headings) + Geist (body) |
| **Backend** | None (static) |
| **Deploy** | Railway — `lumina-ai.alsy.dev` |

**Sections (scroll journey):**
1. Hero — typing animation + aurora mesh background
2. Problem — stat counters animate on viewport entry
3. Features — 3 cards, staggered scroll reveal + 3D tilt on hover
4. How It Works — numbered timeline, SVG path draws as user scrolls
5. Social Proof — logo marquee + testimonials carousel
6. Pricing — 3 tiers, monthly/yearly toggle with spring animation
7. CTA — gradient section with email capture form

---

## 4. Shared Conventions

### Tech Stack Versions (March 2026)

| Package | Version |
|---------|---------|
| Node.js | 20 LTS |
| pnpm | 9.x |
| Turborepo | 2.x |
| Next.js | 15.x |
| Astro | 4.x |
| React | 19.x |
| Tailwind CSS | 4.x |
| Framer Motion | 11.x |
| Prisma | 6.x |
| NextAuth | 5.x |
| Shadcn/ui | latest |

### Code Conventions

- **TypeScript** strict mode everywhere
- **ESLint** + **Prettier** at root level (shared config)
- **Conventional commits**: `feat:`, `fix:`, `chore:`, `style:`
- File naming: `kebab-case` for files, `PascalCase` for components
- No `any` types — use `unknown` with type guards

### Responsive Breakpoints (Tailwind defaults)

| Breakpoint | Usage |
|-----------|-------|
| `sm` (640px) | Minimum supported mobile layout |
| `md` (768px) | Tablet adjustments |
| `lg` (1024px) | Desktop baseline |
| `xl` (1280px) | Wide desktop enhancements |

### Color System

Each app has its own isolated design tokens in `tailwind.config.ts`. No shared palette — visual diversity is intentional.

---

## 5. Deployment Architecture

```
Railway Project: "WebPortfolio"
│
├── Service: portfolio         → alsy.dev
├── Service: maison-nord       → maison-nord.alsy.dev  (or separate)
├── Service: okami-ramen       → okami-ramen.alsy.dev
│   └── Volume: /data          → SQLite database file
├── Service: flowo-crm         → flowo.alsy.dev
│   └── Volume: /data          → SQLite database file
└── Service: lumina-ai         → lumina-ai.alsy.dev
```

**Environment variables per service:**
```
# okami-ramen & flowo-crm
DATABASE_URL="file:/data/app.db"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://<subdomain>.alsy.dev"

# portfolio
EMAILJS_SERVICE_ID="..."
EMAILJS_TEMPLATE_ID="..."
EMAILJS_PUBLIC_KEY="..."
```

**Railway Nixpacks** auto-detects Next.js. Build command: `pnpm build --filter=<app-name>`.

---

## 6. Development Workflow

### Phase 1: Foundation (Sequential)
1. Initialize Turborepo monorepo (`portfolio-hub` change)
2. Build and deploy portfolio hub to alsy.dev
3. Verify monorepo pipeline works end-to-end

### Phase 2: Demo Sites (Parallel — 4 independent agents)
After Phase 1 completes, 4 agents work simultaneously:

| Agent | Change | App |
|-------|--------|-----|
| Agent A | `site-maison-nord` | `apps/maison-nord` |
| Agent B | `site-okami-ramen` | `apps/okami-ramen` |
| Agent C | `site-flowo-crm` | `apps/flowo-crm` |
| Agent D | `site-lumina-ai` | `apps/lumina-ai` |

Each agent's change is fully self-contained — no shared state or files between them during Phase 2.

### Running Locally

```bash
# Root
pnpm install

# Run all apps
pnpm dev

# Run single app
pnpm dev --filter=portfolio
pnpm dev --filter=maison-nord
pnpm dev --filter=okami-ramen
pnpm dev --filter=flowo-crm
pnpm dev --filter=lumina-ai
```

---

## 7. Demo Login Strategy

Sites with authentication (okami-ramen, flowo-crm) MUST have:

1. **Auto-fill button** on login page: "Войти как Demo →"
   - Pre-fills email + password fields AND submits automatically
   - Zero friction for demo visitors
2. **Banner** above the login form indicating demo mode
3. **Seed reset** nightly so demo data is always fresh and consistent

**CRM demo permissions:** Demo user sees all data, can interact with UI (drag kanban, open cards), but destructive actions (delete client, wipe pipeline) are disabled with a toast: "This is restricted in demo mode."

---

## 8. Image Strategy

- **Unsplash Source API** for placeholder images during development
- **Final images**: Curated from Unsplash with appropriate licenses
- **Format**: WebP with Next.js `<Image />` optimization
- Maison Nord: interior photography (high-res, muted tones)
- Okami Ramen: food photography (warm, steamy aesthetic)
- Lumina AI: abstract tech/gradient visuals + UI mockup screenshots

---

## 9. Performance Targets

| App | LCP | FID | CLS | Lighthouse |
|-----|-----|-----|-----|-----------|
| portfolio | <2.5s | <100ms | <0.1 | 90+ |
| maison-nord | <1.5s | <100ms | <0.1 | 100 (static) |
| okami-ramen | <3s | <100ms | <0.1 | 85+ |
| flowo-crm | <3s | <100ms | <0.1 | 85+ |
| lumina-ai | <2.5s | <100ms | <0.1 | 90+ |

---

## 10. Non-Goals (Entire Project)

- No i18n / multi-language support
- No payment processing
- No mobile apps (web only)
- No real user registration on demo sites
- No persistent user-generated content (all resets nightly)
- No complex CI/CD pipelines (direct push-to-deploy via Railway)
