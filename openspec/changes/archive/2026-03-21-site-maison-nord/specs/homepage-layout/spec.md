## ADDED Requirements

### Requirement: Full-page layout with sticky navigation
The site SHALL have a full-page layout with a sticky navigation bar, smooth in-page navigation, and a footer with studio name and copyright.

#### Scenario: Navigation stays visible on scroll
- **WHEN** the user scrolls down any page
- **THEN** the navigation bar remains fixed at the top of the viewport

#### Scenario: Navigation becomes opaque on scroll
- **WHEN** the user scrolls more than 80px from the top
- **THEN** the navbar background transitions from transparent to `#0F0F0F` with 90% opacity and a subtle shadow

#### Scenario: Mobile menu opens on small screens
- **WHEN** a user on viewport width < 768px taps the hamburger icon
- **THEN** a full-screen mobile menu slides in with navigation links

### Requirement: Hero section fills the viewport
The hero SHALL be a full-viewport-height section with a high-quality interior photograph background, a dark overlay, the studio name "MAISON NORD" in Cormorant Garamond, and a scroll indicator arrow.

#### Scenario: Hero image covers full viewport
- **WHEN** the page loads
- **THEN** the hero background image covers 100vh with `object-fit: cover`, no white space visible

#### Scenario: Scroll indicator animates
- **WHEN** the hero is visible
- **THEN** a downward-pointing arrow or line pulses with a CSS animation to invite scrolling

### Requirement: Custom cursor activates on desktop
On devices with a fine pointer (mouse), the site SHALL show a custom circular cursor that transforms to display "VIEW" text when hovering over project gallery items.

#### Scenario: Custom cursor visible on desktop
- **WHEN** a desktop user moves the mouse over any page content
- **THEN** the native cursor is hidden and a custom circle cursor (24px, gold outlined) follows the pointer

#### Scenario: Cursor shows VIEW label on project hover
- **WHEN** the custom cursor moves over a project gallery image
- **THEN** the cursor expands and displays the text "VIEW" centered inside it

#### Scenario: Custom cursor disabled on touch devices
- **WHEN** the user is on a touch device (coarse pointer)
- **THEN** the custom cursor is not initialized and the native cursor/touch behavior is unchanged
