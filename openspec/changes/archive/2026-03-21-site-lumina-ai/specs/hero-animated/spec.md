## ADDED Requirements

### Requirement: Hero section with aurora background and typing animation
The hero section SHALL occupy 100vh with an animated aurora mesh background (CSS gradient animation), the tagline displayed with a typewriter effect, and two CTA buttons ("Get Started" and "Watch Demo").

#### Scenario: Aurora background animates on load
- **WHEN** the page loads
- **THEN** the hero background shows a slow-moving gradient animation (conic + radial gradients rotating over 8–12 seconds)

#### Scenario: Typing animation plays once on load
- **WHEN** the page first loads
- **THEN** the hero tagline text is "typed" character by character at ~40ms per character, plays once, and then stays static

#### Scenario: Reduced motion disables aurora animation
- **WHEN** `prefers-reduced-motion: reduce` is set in the OS
- **THEN** the aurora animation is replaced with a static gradient and the typing animation is replaced with static text

### Requirement: Problem section animates counters on viewport entry
The problem section SHALL contain 3 statistics (e.g., "83% of marketers waste time on content", "4.5 hours per day", "$12B market size") that animate from 0 to their target values when scrolled into view.

#### Scenario: Counter animates from 0 on first viewport entry
- **WHEN** the problem section enters the viewport for the first time
- **THEN** each counter starts at 0 and increments to its target value over 1.5 seconds using an easing function

#### Scenario: Counter does not re-animate
- **WHEN** the user scrolls away and back to the problem section
- **THEN** counters show their final values and do not replay the animation
