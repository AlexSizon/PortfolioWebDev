> **Prerequisites:** `portfolio-hub` change complete. Turborepo monorepo exists at repo root.
> **Agent:** This change can be executed independently in parallel with site-okami-ramen, site-flowo-crm, and site-lumina-ai.

## 1. App Scaffold

- [x] 1.1 Create `apps/maison-nord` with `pnpm create astro@latest` (TypeScript, Tailwind integration)
- [x] 1.2 Configure Tailwind with brand tokens: `nord-noir` `#0F0F0F`, `nord-linen` `#F5F0E8`, `nord-gold` `#C9A96E`, `nord-sand` `#E8E0D5`
- [x] 1.3 Install `next/font` equivalent — configure Cormorant Garamond (variable) and Inter via `@fontsource`
- [x] 1.4 Set up base `Layout.astro` with HTML structure, font CSS variables, and global styles
- [x] 1.5 Add `apps/maison-nord` to `turbo.json` pipeline; verify `pnpm dev --filter=maison-nord` runs

## 2. Navigation & Layout

- [x] 2.1 Create `Navbar.astro` component: MAISON NORD wordmark, nav links, transparent → opaque on scroll (vanilla JS island)
- [x] 2.2 Create `Footer.astro` with studio name, copyright year, and social links
- [x] 2.3 Implement mobile hamburger menu with CSS-only toggle (no React needed)

## 3. Hero Section

- [x] 3.1 Create `Hero.astro` with full-viewport background image (Unsplash interior photo, hardcoded URL)
- [x] 3.2 Add dark overlay gradient, centered "MAISON NORD" H1 in Cormorant Garamond
- [x] 3.3 Add scroll indicator arrow with CSS pulse animation
- [x] 3.4 Ensure hero `min-height: 100svh` on mobile (safe-area aware)

## 4. Custom Cursor

- [x] 4.1 Create `CustomCursor` Astro island (client:only) — circle element that follows mouse via CSS transform
- [x] 4.2 Detect `(pointer: coarse)` — skip cursor initialization on touch devices
- [x] 4.3 Add cursor "VIEW" expand state for `.project-card` hover via class toggle

## 5. About & Studio Section

- [x] 5.1 Create `About.astro` section: studio description paragraph, founding year, key values
- [x] 5.2 Add Cormorant Garamond pull-quote styling for an interior design philosophy quote

## 6. Services Section

- [x] 6.1 Create `Services.astro` with 5 service cards in a grid
- [x] 6.2 Services data: 01 Interior Design, 02 Space Planning, 03 3D Visualization, 04 Furniture Selection, 05 Project Management
- [x] 6.3 Add hover: gold border + background tint via CSS transition

## 7. Projects Gallery

- [x] 7.1 Create `Gallery.astro` with 3×2 grid of project cards
- [x] 7.2 Seed 6 projects with hardcoded Unsplash URLs (curated interior photos), names, years, and category tags
- [x] 7.3 Implement hover overlay: scale(1.05) image + dark overlay with project name/year in white text (CSS only)
- [x] 7.4 Ensure single-column layout on mobile (< 768px)

## 8. Testimonials Section

- [x] 8.1 Create `Testimonials.astro` with 3-column layout (1-column on mobile)
- [x] 8.2 Seed 3 fictional testimonials with client name, role, company, and quote text
- [x] 8.3 Style quotes with Cormorant Garamond italic, gold quotation marks

## 9. Contact Section

- [x] 9.1 Create `ContactForm` island (client:only="load") with name, email, message fields
- [x] 9.2 Integrate EmailJS (`@emailjs/browser`) with environment variables
- [x] 9.3 Add form validation (required fields, email format check)
- [x] 9.4 Add success/error state styling
- [x] 9.5 Display studio address, email, phone alongside form
- [x] 9.6 Add placeholder map area (styled div or Google Maps iframe with `loading="lazy"`)

## 10. Polish & Performance

- [x] 10.1 Audit all sections at 375px, 768px, 1024px — fix overflow or spacing issues
- [x] 10.2 Convert all project images to WebP and self-host (or verify Unsplash CDN URLs work reliably)
- [ ] 10.3 Run Lighthouse — target 100/100 Performance on desktop
- [x] 10.4 Add `<meta>` tags: title "Maison Nord — Interior Design Studio", description, OG image
- [x] 10.5 Test custom cursor behavior on desktop Chrome/Firefox/Safari; verify disabled on mobile

## 11. Deployment

- [x] 11.1 Configure Astro static build adapter (`@astrojs/node` or static output)
- [ ] 11.2 Add Railway service for `maison-nord`, set `PUBLIC_EMAILJS_*` environment variables
- [ ] 11.3 Verify live deployment at `maison-nord.alsy.dev`
