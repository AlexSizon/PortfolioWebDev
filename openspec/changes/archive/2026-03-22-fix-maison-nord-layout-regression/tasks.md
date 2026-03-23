## 1. Diagnose The Regression

- [x] 1.1 Reproduce the broken Maison Nord homepage layout in the browser and note which post-hero sections collapse into a narrow left-aligned content strip
- [x] 1.2 Audit shared layout wrappers, section containers, and global styles to determine whether the regression originates from a common width/alignment primitive
- [x] 1.3 Review the `About`, `Services`, `Gallery`, `Testimonials`, and `ContactSection` components to identify any section-local grid or width rules that contribute to the collapse

## 2. Restore Section Framing

- [x] 2.1 Normalize the centered container and horizontal padding strategy for post-hero Maison Nord sections
- [x] 2.2 Fix the `About` and `ContactSection` two-column layouts so they occupy the intended desktop width and stack cleanly on smaller breakpoints
- [x] 2.3 Fix the `Services`, `Gallery`, and `Testimonials` grids so cards and quotes distribute across the centered content width without leaving large unused right-side areas

## 3. Validate Responsive Behavior

- [x] 3.1 Verify the homepage at desktop widths to confirm each affected section is centered and no longer renders as a narrow partial-width strip
- [x] 3.2 Verify tablet and mobile breakpoints to confirm there is no horizontal overflow, clipped content, or broken stacking order
- [x] 3.3 Run the Maison Nord project checks and perform a manual visual smoke test before marking the change ready for implementation

## 4. Improve Visual Breathing Room

- [x] 4.1 Audit the About, Services, Gallery, and Testimonials sections for overly tight spacing between headers, body copy, cards, and adjacent sections
- [x] 4.2 Increase vertical rhythm and internal spacing so post-hero sections feel calmer and less compressed on desktop without breaking tablet and mobile layouts
- [x] 4.3 Rebalance service card padding, inter-card gaps, and gallery gutters so the page reads as curated rather than densely packed
- [x] 4.4 Perform a visual comparison pass on desktop and tablet to confirm the updated spacing adds noticeable breathing room without making the layout feel empty
