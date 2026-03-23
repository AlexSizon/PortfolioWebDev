> **Prerequisites:** `portfolio-hub` change complete. Turborepo monorepo exists at repo root.
> **Agent:** This change can be executed independently in parallel with site-maison-nord, site-okami-ramen, and site-flowo-crm.

## 1. App Scaffold

- [x] 1.1 Create `apps/lumina-ai` with `create-next-app@latest` (TypeScript, Tailwind, App Router)
- [x] 1.2 Configure Tailwind with brand tokens: `lumina-space` `#020817`, `lumina-emerald` `#10B981`, `lumina-purple` `#8B5CF6`, `lumina-blue` `#3B82F6`
- [x] 1.3 Install `next/font` — configure Cal Sans (or Geist) for headings, Geist for body as CSS variables
- [x] 1.4 Add `apps/lumina-ai` to `turbo.json` pipeline; verify `pnpm dev --filter=lumina-ai` runs
- [x] 1.5 Install dependencies: `framer-motion`, `gsap`, `lenis`
- [x] 1.6 Configure `next.config.ts` for static output if no server needed (`output: 'export'`)

## 2. Smooth Scroll Foundation

- [x] 2.1 Create `LenisProvider` component that initializes Lenis in a `useEffect` and integrates with Framer Motion's `useAnimationFrame`
- [x] 2.2 Wrap `app/layout.tsx` root with `LenisProvider`
- [ ] 2.3 Verify momentum scroll feels natural in Chrome/Firefox/Safari
- [x] 2.4 Add `prefers-reduced-motion` check — disable Lenis and all framer-motion animations when set

## 3. Sticky Navbar

- [x] 3.1 Create `Navbar` component with Lumina AI wordmark and anchor links
- [x] 3.2 Implement transparent → frosted glass transition on scroll (> 80px): add `backdrop-blur-md bg-space/80 border-b border-white/5`
- [x] 3.3 Add mobile hamburger menu with Framer Motion slide-down overlay

## 4. Hero Section

- [x] 4.1 Create `HeroSection` — full-viewport, dark background
- [x] 4.2 Implement aurora background: layered CSS `conic-gradient` + `radial-gradient` with `@keyframes rotate` (8s linear infinite)
- [x] 4.3 Implement typewriter animation on tagline (vanilla JS or `use-typewriter-effect`) — plays once on load
- [x] 4.4 Add H1 headline, subtitle, and two CTA buttons ("Get Started" emerald, "Watch Demo" ghost)
- [x] 4.5 Add `prefers-reduced-motion` fallback: static gradient, static text (no typing animation)
- [ ] 4.6 Verify LCP — hero text must be visible within 2.5s

## 5. Problem / Stats Section

- [x] 5.1 Create `StatsSection` with 3 stat items (copy: "83% spend 4+ hours/day on content", "4.5h average time wasted weekly", "$67B content market by 2027")
- [x] 5.2 Implement counter animation hook: `useCountUp(target, duration)` — uses `requestAnimationFrame` with easeOut curve
- [x] 5.3 Trigger counter animation with `IntersectionObserver` (`once: true`) — animate from 0 to target on first viewport entry

## 6. Features Section

- [x] 6.1 Create `FeaturesSection` with 3 feature cards
- [x] 6.2 Feature content: "AI-Powered Writing", "Brand Voice Training", "Multi-Platform Publishing" with icons and descriptions
- [x] 6.3 Implement staggered scroll entry: Framer Motion `whileInView` with `variants` — each card fades up with 150ms stagger
- [x] 6.4 Implement 3D tilt effect on feature cards using GSAP: `gsap.to(card, { rotateX, rotateY })` driven by `mousemove` event listener
- [x] 6.5 Add tilt reset on `mouseleave` with `{ ease: 'elastic.out(1, 0.3)' }` spring-like return
- [x] 6.6 Detect touch device and skip GSAP tilt initialization

## 7. How It Works Timeline

- [x] 7.1 Create `TimelineSection` with 4 numbered steps: Connect → Create → Review → Publish
- [x] 7.2 Create step items with numbered circle, title, and description
- [x] 7.3 Add inline `<svg>` with `<polyline>` or `<path>` connecting the step numbers
- [x] 7.4 On component mount, call `path.getTotalLength()` and set `stroke-dasharray = stroke-dashoffset = length`
- [x] 7.5 Implement scroll-driven `stroke-dashoffset` update: map scroll progress within the section to `length → 0` using Framer Motion `useScroll` + `useTransform`
- [x] 7.6 Add `ResizeObserver` to recalculate path length on window resize
- [x] 7.7 `prefers-reduced-motion` fallback: show fully drawn static path

## 8. Social Proof Section

- [x] 8.1 Create `LogoMarquee` component: 8 fictional company logos (SVG or text) in CSS infinite scroll animation
- [x] 8.2 Duplicate the logo list to create seamless loop (`translateX` from 0 to -50%)
- [x] 8.3 Add `pause on hover` via CSS `animation-play-state: paused` on `&:hover`
- [x] 8.4 Create `TestimonialsCarousel` with 3 testimonials, auto-advance every 5s, dot navigation
- [x] 8.5 Add Framer Motion `AnimatePresence` slide transition between testimonials

## 9. Pricing Section

- [x] 9.1 Create `PricingSection` with monthly/yearly toggle (Framer Motion layout animation on toggle pill)
- [x] 9.2 Create 3 `PricingCard` components: Starter ($29/$23), Pro ($79/$63) — highlighted, Enterprise ($199/$159)
- [x] 9.3 Implement price value animation with `AnimatePresence`: old price exits (y: -10, opacity: 0), new price enters (y: 10 → 0, opacity: 0 → 1)
- [x] 9.4 Add "Save 20%" badge that appears when yearly is active
- [x] 9.5 Add feature list with checkmark icons for each tier
- [x] 9.6 Pro card: add gradient border, scale up slightly, "Most Popular" badge

## 10. CTA Section & Footer

- [x] 10.1 Create `CTASection` — aurora gradient background (same as hero), headline, email input, "Get Early Access" button
- [x] 10.2 Email input shows success toast "Demo mode — email not sent" on submit (no real API call)
- [x] 10.3 Create `Footer` with Lumina AI wordmark, navigation links, social icons, copyright

## 11. Polish & Performance

- [ ] 11.1 Audit full scroll journey at 375px, 768px, 1440px — fix any overflow, spacing, or animation jank
- [ ] 11.2 Verify `prefers-reduced-motion` disables aurora, counters, SVG draw, and card tilt
- [ ] 11.3 Run Lighthouse — target ≥90 Performance; check that GSAP and Lenis are not blocking LCP
- [ ] 11.4 Confirm GSAP import uses only `gsap/dist/gsap` (not full bundle) to minimize bundle size
- [x] 11.5 Add `<meta>` SEO tags: title "Lumina AI — Create Content at Light Speed", description, OG image

## 12. Deployment

- [x] 12.1 Configure Railway static deployment (or standard Next.js build if `output: 'export'` is not used)
- [x] 12.2 Add Railway service for `lumina-ai`, build command `pnpm build --filter=lumina-ai`
- [ ] 12.3 Verify live deployment at `lumina-ai.alsy.dev`
- [ ] 12.4 Walkthrough full scroll journey on a real mobile device — verify no jank or layout issues
