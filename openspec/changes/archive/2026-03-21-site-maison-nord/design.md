## Context

Maison Nord is a purely static demo site — no backend, no auth. Its job is to demonstrate that a beautiful, fast, premium business card site can be built for a small business client. The Astro framework is a deliberate showcase: perfect Lighthouse scores are a concrete deliverable that impresses non-technical clients.

The fictional brand "MAISON NORD" is an interior design studio. All content is seeded — 6 project entries, 5 services, 3 testimonials. The custom cursor and subtle hover animations are the key "wow" moments.

## Goals / Non-Goals

**Goals:**
- 100/100 Lighthouse Performance on desktop
- Custom cursor: circle that morphs to "VIEW" text on project hover
- Cormorant Garamond (serif/luxury) for headings, Inter for body
- Sticky navbar that becomes opaque on scroll
- Hero: fullscreen image overlay with studio name + scroll indicator
- Projects gallery: 3×2 grid, hover reveals project name + year overlay
- Services: clean card list with numbered labels
- Testimonials: minimal quote rotation
- Contact: form (EmailJS) + address + placeholder map
- Fully responsive down to 375px

**Non-Goals:**
- CMS or content editing
- Authentication
- Any backend API
- Dark/light toggle (light-cream theme only)

## Decisions

### Astro 4 over Next.js
Maison Nord has zero dynamic data needs. Astro outputs optimized static HTML with zero JavaScript hydration overhead by default. This achieves 100 Lighthouse naturally and demonstrates the tool choice appropriate for the job.

### CSS transitions + minimal JS over Framer Motion
Astro's partial hydration means Framer Motion would require unnecessary React islands. Pure CSS transitions (transform, opacity) are sufficient for the hover and reveal effects needed here. Custom cursor uses a small vanilla JS island.

### Cormorant Garamond for display type
Sets the luxury/editorial tone immediately. Loads as a variable font — minimal weight penalty. Paired with Inter for body text (legibility + familiarity).

### EmailJS for contact form
Same rationale as portfolio hub — client-side only, no backend needed.

### Unsplash Source for project images
Premium interior photography is essential to the aesthetic. Unsplash provides license-free high-quality images. Specific curated image IDs are hardcoded in the seed content — not random, ensuring consistent visual quality.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Cormorant Garamond may feel too formal for some viewers | Text is paired with generous whitespace; overall effect is editorial, not stuffy |
| Custom cursor JS breaks on touch devices | Feature-detect with `window.matchMedia('(pointer:coarse)')` and disable cursor on touch |
| Unsplash images depend on external CDN | For production, download and self-host the curated images as WebP |
| Astro unfamiliarity for future maintenance | App is small (~8 components); docs link included in README |
