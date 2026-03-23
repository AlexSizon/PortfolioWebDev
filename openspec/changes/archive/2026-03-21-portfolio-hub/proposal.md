## Why

Alex Syzonenko needs a professional personal brand hub at alsy.dev that acts as the entry point for potential clients. The hub must showcase 4 live demo sites to demonstrate full-stack range, communicate credibility, and convert visitors into leads — it's the single URL shared with every prospect.

## What Changes

- New Turborepo monorepo initialized at the repository root with `pnpm` workspaces
- New `apps/portfolio` Next.js 15 application (personal brand site)
- `packages/tsconfig` shared TypeScript base config
- Hero section with animated personal brand (Alex Syzonenko / Alsy)
- Demo showcase grid — 4 cards linking to the 4 demo sub-sites
- About + tech skills section
- Contact form with EmailJS integration
- Full responsive layout (mobile-first)
- Railway deployment with custom domain `alsy.dev`

## Capabilities

### New Capabilities

- `portfolio-hero`: Animated hero section — name, title, tagline, gradient blob, CTA scroll button
- `demo-showcase`: Grid of 4 interactive demo cards with brand names, descriptions, stack tags, and live links
- `about-skills`: Personal about section with animated tech stack icon grid
- `contact-form`: Contact form with EmailJS delivery + social links (GitHub, Telegram)

### Modified Capabilities

_(none — greenfield project)_

## Impact

- Creates the entire Turborepo monorepo structure that all 4 demo sites will be added into
- Establishes `turbo.json`, root `package.json`, shared `tsconfig`
- After this change is complete, 4 agents can begin parallel development of demo sites
- No external service dependencies beyond EmailJS (free tier sufficient)
- Railway service: `portfolio` → `alsy.dev`
