## 1. Monorepo Foundation

- [x] 1.1 Initialize pnpm workspace at repo root (`pnpm init`, `pnpm-workspace.yaml` with `apps/*` and `packages/*`)
- [x] 1.2 Create `turbo.json` with `build`, `dev`, `lint` pipeline tasks
- [x] 1.3 Create `packages/tsconfig/` with `base.json` and `nextjs.json` shared configs
- [x] 1.4 Add root `.eslintrc.js`, `.prettierrc`, and `.gitignore`
- [x] 1.5 Add root `package.json` dev scripts: `dev`, `build`, `lint` forwarding to Turborepo

## 2. Portfolio App Scaffold

- [x] 2.1 Create `apps/portfolio` with `create-next-app@latest` (TypeScript, Tailwind, App Router)
- [x] 2.2 Extend from `packages/tsconfig/nextjs.json` in app's `tsconfig.json`
- [x] 2.3 Configure Tailwind with custom colors: zinc `#09090B`, white `#FAFAFA`, violet `#7C3AED`, violet-dim `#5B21B6`
- [x] 2.4 Install and configure Framer Motion (`framer-motion`)
- [x] 2.5 Install `next/font` â€” configure Geist (headings) and Inter (body) as CSS variables
- [x] 2.6 Set up global layout (`app/layout.tsx`) with font variables, dark background, and ScrollProgress wrapper

## 3. Navigation & Layout Shell

- [x] 3.1 Create `Navbar` component: Alsy logotype (SVG or text), nav links (`#demos`, `#about`, `#contact`), scroll-opacity effect
- [x] 3.2 Implement smooth scroll-to-section behavior for all nav links
- [x] 3.3 Create `Footer` component: name, year, social link icons
- [x] 3.4 Add mobile responsive navbar (hamburger menu with Framer Motion slide-in overlay)

## 4. Hero Section

- [x] 4.1 Create `HeroSection` component with animated violet gradient blob (CSS keyframes)
- [x] 4.2 Implement staggered Framer Motion entrance: name (H1) â†’ subtitle â†’ tagline â†’ CTA button
- [x] 4.3 Add "View My Work" scroll CTA button that smooth-scrolls to `#demos`
- [x] 4.4 Ensure hero is full-viewport-height on all screen sizes

## 5. Demo Showcase Section

- [x] 5.1 Create `DemoShowcase` section with `id="demos"` anchor
- [x] 5.2 Create `DemoCard` component: preview image, brand name, description, stack tags, "Open Demo" button
- [x] 5.3 Add card data for all 4 demos (Maison Nord, Okami Ramen, Flowo CRM, Lumina AI) with placeholder preview images
- [x] 5.4 Implement card hover animation: lift + violet border glow (Framer Motion `whileHover`)
- [x] 5.5 Implement responsive grid: 2Ã—2 on `lg`, 1-col on mobile

## 6. About & Skills Section

- [x] 6.1 Create `AboutSection` component with bio paragraph
- [x] 6.2 Create `SkillsGrid` component with 14 tech icons (SVG) + labels
- [x] 6.3 Implement staggered scroll-entry animation for skill icons (Framer Motion `whileInView`, `once: true`)
- [x] 6.4 Add `once: true` to all `whileInView` variants (no replay on scroll back)

## 7. Contact Section

- [x] 7.1 Create `ContactSection` component with `id="contact"` anchor
- [x] 7.2 Implement contact form: name, email, message fields with Zod validation + React Hook Form
- [x] 7.3 Install and configure EmailJS (`@emailjs/browser`); add `.env.local` variables
- [x] 7.4 Add loading spinner on submit button and success/error state UI
- [x] 7.5 Add social icon links (GitHub, Telegram) with hover color transition

## 8. Polish & Responsive

- [x] 8.1 Audit all sections at 375px, 768px, 1024px, 1440px â€” fix any overflow or truncation
- [x] 8.2 Add `<meta>` SEO tags: title "Alex Syzonenko â€” Full-Stack Developer", description, OG image
- [x] 8.3 Add `prefers-reduced-motion` media query â€” disable blob and entrance animations
- [x] 8.4 Run Lighthouse audit, target â‰¥90 Performance; fix any LCP/CLS issues

## 9. Deployment

- [x] 9.1 Create `railway.json` in `apps/portfolio/` with build and start commands
- [x] 9.2 Add Railway service for `portfolio`, set `EMAILJS_*` environment variables
- [x] 9.3 Configure custom domain `alsy.dev` in Railway dashboard
- [x] 9.4 Verify live deployment loads correctly and contact form sends email

## 10. Parallel Readiness Verification

- [x] 10.1 Confirm `apps/maison-nord/`, `apps/okami-ramen/`, `apps/flowo-crm/`, `apps/lumina-ai/` directories exist (empty scaffolds are fine)
- [x] 10.2 Confirm `turbo.json` `dev` and `build` tasks work for each app with `--filter=<name>`
- [x] 10.3 Document in root `README.md`: monorepo structure, how to run each app, environment variables needed per app
- [x] 10.4 âœ… MILESTONE: Portfolio hub deployed. 4 parallel agents can now begin site-maison-nord, site-okami-ramen, site-flowo-crm, site-lumina-ai simultaneously
