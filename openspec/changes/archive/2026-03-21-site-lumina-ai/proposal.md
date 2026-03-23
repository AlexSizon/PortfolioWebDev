## Why

The portfolio needs a showpiece demo that sells animation and motion design skills — the kind of landing page that makes a prospect say "I want this for my product launch." Lumina AI is a full scroll-journey SaaS landing page with every modern animation pattern: aurora hero, counter animations, scroll-triggered reveals, SVG path drawing, 3D card tilt, marquee, and pricing toggles. This demo speaks to tech startups and product companies.

## What Changes

- New `apps/lumina-ai` Next.js 15 application
- Brand: **LUMINA AI** — AI Content Creation Platform
- Deep space dark theme with aurora gradient accents (emerald/purple/blue)
- Hero section with typing animation and animated aurora mesh background
- Problem section with viewport-triggered stat counters
- Features section: 3 cards with staggered scroll reveal + 3D tilt on hover
- How It Works: numbered timeline with SVG path that draws as user scrolls
- Social proof: infinite logo marquee + testimonials carousel
- Pricing: 3 tiers with monthly/yearly toggle spring animation
- CTA: gradient section with email capture
- Lenis for smooth momentum scrolling throughout

## Capabilities

### New Capabilities

- `hero-animated`: Full-viewport hero with aurora mesh background (CSS/canvas), typing animation on tagline, and CTA buttons with hover state
- `features-scroll`: Three feature cards that stagger in on scroll (Framer Motion viewport), each with 3D perspective tilt on hover (GSAP)
- `how-it-works-timeline`: Numbered step timeline where connecting SVG path draws progressively as the user scrolls into the section
- `pricing-section`: Three pricing tier cards with a monthly/yearly toggle; switching animates price values with a spring transition; middle card permanently highlighted
- `social-proof`: Infinite horizontal marquee of 8 company logos + testimonials slider with autoplay and manual navigation

### Modified Capabilities

_(none — standalone demo app)_

## Impact

- New app at `apps/lumina-ai/` in the Turborepo monorepo
- Zero backend — static Next.js export (or standard build, no API routes needed)
- No database or auth dependencies
- Heaviest animation bundle: Framer Motion + GSAP + Lenis (~80kb gzipped JS)
- Can be developed in parallel with 3 other demo sites after `portfolio-hub` completes
- Deployment: Railway static service `lumina-ai.alsy.dev`
