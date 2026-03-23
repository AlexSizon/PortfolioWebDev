## Context

Lumina AI is the motion design showcase — every section must deliver a "wow" moment on scroll. The demo visitor is expected to be a tech startup founder or product marketer who has seen many SaaS landing pages. The bar for novelty is high. Three key differentiators: the aurora hero background (not a simple gradient), the SVG path-drawing timeline, and the 3D card tilt (not a flat hover shadow).

Performance is a real constraint: heavy animation libraries must not block LCP. All scroll-triggered animations use `IntersectionObserver` (via Framer Motion's `whileInView`) so they don't run until needed.

## Goals / Non-Goals

**Goals:**
- Lenis smooth scroll initialized at app root — silky momentum scrolling everywhere
- Aurora hero: animated CSS mesh gradient or WebGL canvas (canvas fallback to CSS)
- Typing animation on hero tagline (typewriter effect, loops once)
- Problem section: stat counters animate from 0 to target value on viewport entry
- Features: 3 cards stagger in on scroll; each has 3D perspective tilt on mouse move
- Timeline: SVG polyline stroke-dashoffset animates from 0 to full length on scroll
- Social proof: CSS infinite marquee (logos) + testimonials with dot navigation
- Pricing toggle: monthly/yearly — price values animate with Framer Motion `AnimatePresence`
- CTA section: aurora gradient background (same as hero), email input with submit
- Sticky navbar: transparent → frosted glass backdrop on scroll
- Fully responsive

**Non-Goals:**
- Actual AI functionality
- Form submission backend (CTA form is UI-only, shows success toast)
- User accounts
- Dynamic content
- Dark/light toggle (dark only)

## Decisions

### Framer Motion for scroll animations + GSAP for 3D tilt
Framer Motion's `whileInView` + `variants` is the cleanest API for scroll-triggered entry animations. GSAP is used specifically for the 3D tilt effect because GSAP's `mousemove` + `rotateX/rotateY` interpolation is smoother at high frame rates than Framer Motion's spring physics for pointer tracking.

### CSS mesh gradient for aurora (not WebGL)
A CSS `conic-gradient` + `radial-gradient` combination with `animation: rotate 8s linear infinite` achieves the aurora effect at near-zero JS cost. WebGL (Three.js / GLSL shader) would be more impressive but adds ~250kb and risks poor mobile performance. CSS approach targets 90+ Lighthouse.

### SVG stroke-dashoffset for timeline animation
Native SVG technique — no library needed. The SVG path length is measured on mount with `getTotalLength()`. `stroke-dashoffset` is driven by scroll position mapped to `0 → pathLength`. Triggers when the timeline section is 20% into the viewport.

### Lenis over native scroll
Lenis adds ~8kb. The benefit: consistent scroll momentum across browsers (native scroll feel varies between Chrome/Firefox/Safari). Lenis also integrates with Framer Motion scroll context cleanly.

### Static Next.js build (no API routes)
Lumina AI has no dynamic data needs. A static build (`output: 'export'`) gives the fastest possible load times and simplest deployment. The CTA email form shows a success toast without any actual submission.

### AnimatePresence for pricing toggle
The monthly/yearly price values need to animate out and in on toggle. `AnimatePresence` handles the exit animation cleanly. The pricing numbers use `motion.span` with `initial/animate/exit` variants — numbers slide up out, new numbers slide in from below.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| GSAP + Framer Motion loaded together (~60kb combined) | GSAP is used only for the 3D tilt effect — import only `gsap/core` + `Observer` |
| Aurora CSS animation causes jank on low-end mobile | Add `@media (prefers-reduced-motion)` to disable the rotation animation; display static gradient |
| SVG path length calculation fails if element not mounted | Use `useEffect` + `ResizeObserver` to recalculate on mount and resize |
| Lenis conflicts with Framer Motion scroll context | Initialize Lenis scroll updates inside Framer Motion's `useAnimationFrame` loop |
| CTA form "succeeds" without actual email delivery | Add a clear "Demo mode — email not sent" note in the success toast |
