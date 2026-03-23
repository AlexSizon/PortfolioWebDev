## ADDED Requirements

### Requirement: Pricing section displays three tiers with monthly/yearly toggle
The pricing section SHALL display 3 pricing tiers (Starter, Pro, Enterprise) with a monthly/yearly billing toggle. The middle "Pro" card SHALL be visually highlighted as the recommended option.

#### Scenario: All three tiers are visible simultaneously on desktop
- **WHEN** the user views the pricing section on desktop (≥1024px)
- **THEN** all 3 pricing cards are displayed side-by-side; the Pro card is larger or has a highlighted border/background

#### Scenario: Price values animate when toggle switches
- **WHEN** the user clicks the monthly/yearly toggle
- **THEN** the price numbers on all 3 cards animate — old prices exit (slide up, fade out) and new prices enter (slide up from below, fade in) using Framer Motion AnimatePresence

#### Scenario: Yearly prices show 20% discount
- **WHEN** the yearly toggle is active
- **THEN** all prices show the discounted annual equivalent and a "Save 20%" badge is visible

### Requirement: Pricing cards list features with checkmarks
Each pricing tier card SHALL display a list of 4–6 features with green checkmark icons. Features included in lower tiers are grayed out in higher tiers (standard SaaS convention reversed — all higher tier features are shown as included).

#### Scenario: Feature list renders with checkmarks
- **WHEN** a pricing card is displayed
- **THEN** each feature is shown with a visible checkmark icon followed by feature name text

### Requirement: Social proof section has infinite logo marquee
The social proof section SHALL display an infinite auto-scrolling horizontal marquee of 8 company logos (fictional brands) and 3 testimonial quotes with author attribution.

#### Scenario: Logo marquee scrolls continuously
- **WHEN** the social proof section is visible
- **THEN** the logos scroll horizontally in a continuous loop with no visible gap or jump between iterations

#### Scenario: Marquee pauses on hover
- **WHEN** the user hovers over the marquee
- **THEN** the scrolling pauses until the mouse leaves

#### Scenario: Testimonials auto-advance
- **WHEN** the testimonials carousel is visible
- **THEN** after 5 seconds, the next testimonial slides in automatically
