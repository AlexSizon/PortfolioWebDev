## Context

The portfolio hub is the first touchpoint for every potential client. Alex Syzonenko presents under the brand "Alsy" (monogram AS) with full name Alex Syzonenko visible in the hero. The site must: load fast, look polished on mobile, clearly present the 4 demos, and have a working contact channel.

Tech context: This change also bootstraps the entire Turborepo monorepo that the 4 demo sites live in. Infrastructure decisions made here affect all downstream apps.

## Goals / Non-Goals

**Goals:**
- Initialize Turborepo monorepo with pnpm workspaces
- Hero: name + title + tagline + animated gradient blob + scroll CTA
- Demo showcase: 4 cards with brand name, description, stack tags, "Open demo" link
- About: 1-paragraph bio + animated tech stack icon grid (12–16 icons)
- Contact: EmailJS form + GitHub/Telegram social links
- Fully responsive (mobile breakpoints: 375px minimum)
- First Contentful Paint < 2.5s
- Deploy to Railway with `alsy.dev` custom domain

**Non-Goals:**
- Blog, articles, or case study pages
- Authentication or user accounts
- CMS — all content is hardcoded
- Dark/light mode toggle (dark only)
- Analytics integration (can add later)

## Decisions

### Turborepo + pnpm workspaces
Railway builds individual apps using `--filter`. Turborepo's caching speeds up local dev. pnpm is faster than npm for monorepos with shared packages.

### Next.js 15 (App Router) over Astro for portfolio hub
The contact form requires an API route OR client-side EmailJS. EmailJS is client-side only, so technically Astro would work. Decision: Next.js for consistency with 3 of the 4 demo sites, and to support future additions (analytics API route, etc.).

### EmailJS over a backend email service
No backend needed. EmailJS free tier (200 emails/month) is more than sufficient for a portfolio. Avoids Railway service cost for a trivial endpoint.

### Demo cards use static design preview images (not live iframes)
iframes create cross-origin issues, layout thrashing, and slow page load. Static mockup images serve as visual previews; clicking opens the demo in a new tab. Images are high-quality WebP screenshots/mockups of each demo.

### Framer Motion for animations
Adds ~28kb gzipped but delivers spring-based animations that feel premium vs pure CSS transitions. Used for: hero stagger reveal, demo card hover lift, section scroll entry animations.

### Violet (`#7C3AED`) as the single accent color
Violet reads as "technical + creative" — appropriate for a developer portfolio. Single accent avoids visual noise on a dark background.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Demo preview images go stale when demos change | Use illustrative design mockup images, not literal screenshots |
| EmailJS public key exposed in client bundle | Acceptable — EmailJS is designed for client-side use; rate limiting is on their end |
| Framer Motion bundle size on a portfolio site | Acceptable trade-off for the visual quality it provides |
| Monorepo setup complexity delays demo site work | Structure all monorepo config in the first few tasks so agents can branch immediately |
