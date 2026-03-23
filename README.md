# WebPortfolio — Monorepo

Turborepo monorepo housing the **Alsy** personal brand hub and 4 demo sites that showcase full-stack development skills to prospective clients.

---

## Apps

| App | Tech | URL |
|-----|------|-----|
| `apps/portfolio` | Next.js 16, Tailwind v4, Framer Motion | https://alsy.dev |
| `apps/maison-nord` | Astro, Tailwind CSS, Swiper | https://maison-nord.up.railway.app |
| `apps/okami-ramen` | Next.js, Prisma, SQLite, SSE | https://okami-ramen.up.railway.app |
| `apps/flowo-crm` | Next.js, Zustand, dnd-kit, Recharts | https://flowo-crm.up.railway.app |
| `apps/lumina-ai` | Next.js, Framer Motion, Three.js | https://lumina-ai.up.railway.app |

## Packages

| Package | Purpose |
|---------|---------|
| `packages/tsconfig` | Shared TypeScript configs (`base.json`, `nextjs.json`) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 10 (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Run an app in dev mode

```bash
# Run portfolio hub
pnpm --filter @repo/portfolio dev

# Run all apps simultaneously
pnpm dev
```

### Build all apps

```bash
pnpm build
```

### Run a specific app

```bash
pnpm --filter @repo/okami-ramen dev
```

---

## Environment Variables

Each app that requires environment variables has a `.env.local.example` file. Copy it and fill in the values:

```bash
# Portfolio (EmailJS)
cp apps/portfolio/.env.local.example apps/portfolio/.env.local
```

| App | Variables |
|-----|-----------|
| `portfolio` | `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` |
| `okami-ramen` | `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` |
| `flowo-crm` | `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` |

---

## Deployment

All apps are deployed to [Railway](https://railway.app). Each app has a `railway.json` configuration file.

Custom domain `alsy.dev` is configured in the Railway dashboard for the portfolio hub.

---

## Project Structure

```
WebPortfolio/
├── apps/
│   ├── portfolio/          # Personal brand hub (Alex Syzonenko / Alsy)
│   ├── maison-nord/        # Interior design studio demo
│   ├── okami-ramen/        # Japanese restaurant demo
│   ├── flowo-crm/          # CRM dashboard demo
│   └── lumina-ai/          # SaaS landing page demo
├── packages/
│   └── tsconfig/           # Shared TypeScript configurations
├── turbo.json              # Turborepo pipeline config
└── pnpm-workspace.yaml     # pnpm workspace definition
```
