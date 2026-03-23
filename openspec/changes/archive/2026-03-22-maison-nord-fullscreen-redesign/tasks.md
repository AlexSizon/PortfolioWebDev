## 1. Cleanup — Delete Old Components

- [x] 1.1 Delete `apps/maison-nord/src/components/Hero.astro`
- [x] 1.2 Delete `apps/maison-nord/src/components/About.astro`
- [x] 1.3 Delete `apps/maison-nord/src/components/Services.astro`
- [x] 1.4 Delete `apps/maison-nord/src/components/Gallery.astro`
- [x] 1.5 Delete `apps/maison-nord/src/components/Testimonials.astro`
- [x] 1.6 Delete `apps/maison-nord/src/components/ContactSection.astro`

## 2. CSS & Global Styles

- [x] 2.1 Add `html, body { overflow: hidden; height: 100%; }` to `global.css`
- [x] 2.2 Add `.slide-track` utility: `display:flex; flex-direction:column; height:100vh; transition: transform 600ms cubic-bezier(0.76,0,0.24,1);`
- [x] 2.3 Add `.slide` utility: `min-height: 100vh; width: 100%; flex-shrink: 0;`

## 3. Slide Navigator Script

- [x] 3.1 Create `apps/maison-nord/src/scripts/slideNavigator.ts`
- [x] 3.2 Implement `goToSlide(index)` — updates `transform: translateY(-index * 100vh)` on `.slide-track`
- [x] 3.3 Implement debounced wheel handler (800 ms cooldown, `deltaY` direction)
- [x] 3.4 Implement keyboard handler (`ArrowDown`, `ArrowRight` → next; `ArrowUp`, `ArrowLeft` → prev)
- [x] 3.5 Implement touch handler (`touchstart` + `touchend`, delta ≥ 50 px threshold)
- [x] 3.6 On slide change, update the navbar counter text (`currentIndex + 1 / totalSlides`)
- [x] 3.7 Clamp slide index to [0, totalSlides − 1]

## 4. GalleryNavigator Component

- [x] 4.1 Create `apps/maison-nord/src/components/GalleryNavigator.astro`
- [x] 4.2 Render wordmark ("MAISON NORD") fixed top-left in Cormorant Garamond italic
- [x] 4.3 Render slide counter fixed top-right (e.g., "01 / 08"), updated by navigator script
- [x] 4.4 Position with `position: fixed; z-index: 50;` so it overlays all slides

## 5. IntroSlide Component

- [x] 5.1 Create `apps/maison-nord/src/components/IntroSlide.astro`
- [x] 5.2 Full-viewport centered layout: studio tagline in Cormorant Garamond, scroll/swipe hint below
- [x] 5.3 Apply `.slide` class; background: `var(--color-nord-linen)`

## 6. ProjectSlide Component

- [x] 6.1 Create `apps/maison-nord/src/components/ProjectSlide.astro` accepting props: `title`, `category`, `year`, `description`, `imageUrl`, `index`
- [x] 6.2 Full-viewport split layout: left half = project image, right half = project details
- [x] 6.3 Project details column: large index number, title, category, year, short description
- [x] 6.4 Apply `.slide` class; alternating background per slide (linen / slight tint)

## 7. StudioSlide Component

- [x] 7.1 Create `apps/maison-nord/src/components/StudioSlide.astro`
- [x] 7.2 3-column layout: About column | Services column | Contact column
- [x] 7.3 About column: studio name, founding year, short paragraph
- [x] 7.4 Services column: compact name-only list in Cormorant Garamond
- [x] 7.5 Contact column: studio address, email, phone as text; EmailJS contact form (name, email, message, send button)
- [x] 7.6 Wire up EmailJS in the contact form (reuse existing EmailJS keys from old ContactSection)
- [x] 7.7 Form success and validation error states within the column (no scrolling)
- [x] 7.8 Apply `.slide` class; background: `var(--color-nord-noir)`; text: `var(--color-nord-linen)`

## 8. Rewrite index.astro

- [x] 8.1 Remove all old section component imports (Hero, About, Services, Gallery, Testimonials, ContactSection)
- [x] 8.2 Import GalleryNavigator, IntroSlide, ProjectSlide, StudioSlide
- [x] 8.3 Define project data array (6 projects: title, category, year, description, imageUrl) in frontmatter
- [x] 8.4 Render `<GalleryNavigator />` outside the slide track
- [x] 8.5 Render `.slide-track` wrapper containing: IntroSlide + 6 × ProjectSlide + StudioSlide
- [x] 8.6 Import and initialize `slideNavigator.ts` via `<script>` at bottom of page

## 9. Visual Verification

- [ ] 9.1 Intro slide renders full-viewport with tagline and hint visible — no overflow
- [ ] 9.2 All 6 project slides render with image + details, no content clipping
- [ ] 9.3 Studio slide 3-column layout fits within one viewport on 1080p+ screen
- [ ] 9.4 Keyboard navigation (↑↓ and ←→) moves between slides with smooth transition
- [ ] 9.5 Wheel scroll advances one slide at a time with 800 ms debounce
- [ ] 9.6 Touch swipe ≥ 50 px advances/retreats one slide
- [ ] 9.7 Slide counter updates correctly (01/08 through 08/08)
- [ ] 9.8 GalleryNavigator wordmark and counter remain visible on top of all slides
- [ ] 9.9 EmailJS contact form submits successfully from the Studio slide
- [ ] 9.10 Site looks correct on mobile (portrait) — slides stack full-height, text readable
