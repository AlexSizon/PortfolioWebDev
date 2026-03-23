## ADDED Requirements

### Requirement: Feature cards stagger-animate in on scroll
The features section SHALL display 3 feature cards that animate in with a staggered fade-up effect when the section scrolls into the viewport.

#### Scenario: Cards stagger in on scroll
- **WHEN** the features section enters the viewport
- **THEN** the first card fades up, followed by the second at +150ms delay, and the third at +300ms delay

#### Scenario: Cards are already visible if page is loaded mid-scroll
- **WHEN** the user loads the page already scrolled to the features section
- **THEN** the cards are immediately visible (entry animation does not block content)

### Requirement: Feature cards have 3D tilt on mouse hover
Each feature card SHALL respond to mouse movement with a 3D perspective tilt effect (rotateX / rotateY driven by mouse position within the card).

#### Scenario: Card tilts with mouse movement
- **WHEN** the user moves their mouse across a feature card
- **THEN** the card tilts up to ±10° on both X and Y axes following the cursor position, using smooth GSAP interpolation

#### Scenario: Card returns to flat on mouse leave
- **WHEN** the mouse leaves the card boundary
- **THEN** the card smoothly returns to 0° rotation with a spring-like settle (not instant snap)

#### Scenario: 3D tilt is disabled on touch devices
- **WHEN** the user is on a touch device
- **THEN** no tilt effect is applied; cards remain flat on tap
