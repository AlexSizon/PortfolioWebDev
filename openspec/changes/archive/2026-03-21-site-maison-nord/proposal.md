## Why

The portfolio needs a demo that shows a high-end, premium business card site — the kind a boutique studio, salon, or agency would want. Maison Nord demonstrates that beautiful static sites can be fast (Lighthouse 100) without sacrificing visual elegance. Static = simplicity, which is a selling point for small-business clients who don't need a backend.

## What Changes

- New `apps/maison-nord` Astro 4 application
- Brand: **MAISON NORD** — Interior Design Studio
- Scandinavian-luxury aesthetic: Noir, Linen, Gold, Sand palette
- 6 real-looking interior project cards in a gallery grid
- Services section with 5 service cards
- Testimonials from 3 fictional clients
- Animated contact form with EmailJS
- Custom cursor (circle that changes to "View" on project hover)
- 100/100 Lighthouse performance target

## Capabilities

### New Capabilities

- `homepage-layout`: Full-page layout with sticky nav, smooth section transitions, and footer
- `services-gallery`: Services grid + project portfolio gallery with hover zoom and overlay
- `contact-section`: Contact form, studio address, opening hours, map embed placeholder

### Modified Capabilities

_(none — standalone demo app)_

## Impact

- New app at `apps/maison-nord/` in the existing Turborepo monorepo
- Zero backend — static build, deployed to Railway as static files
- No database or auth dependencies
- Can be developed in parallel with the 3 other demo sites after `portfolio-hub` is complete
- Deployment: Railway static service `maison-nord.alsy.dev`
