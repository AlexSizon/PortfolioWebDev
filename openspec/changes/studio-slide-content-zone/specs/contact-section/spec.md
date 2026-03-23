## MODIFIED Requirements

### Requirement: Contact section with EmailJS form inside Studio slide
The contact form (name, email, message fields) sending via EmailJS SHALL remain embedded inside the Studio slide rather than as a standalone page section. Studio address, email, and phone SHALL appear alongside the form within the same contact area. Within the refined Studio composition, the contact block SHALL be sized and positioned as part of the shared bounded zone so it does not feel undersized, overextended, or visually detached from the about and services blocks. On desktop viewports, the contact content SHALL fit within the composed Studio zone without requiring the user to chase it across excessive empty space. On constrained or mobile viewports, the final slide SHALL preserve access to all contact content through stacked layout and controlled overflow rather than clipping fields or feedback states. The form SHALL only show a success confirmation after a successful send, and SHALL show an explicit unavailable or error state when EmailJS configuration is missing or delivery fails.

#### Scenario: Contact content stays inside the Studio composition zone
- **WHEN** the Studio slide is active
- **THEN** the address, direct-contact links, form fields, and feedback states appear inside the same bounded Studio content zone as the rest of the final-slide content

#### Scenario: Contact area remains proportionate on desktop
- **WHEN** the Studio slide is active on a desktop viewport
- **THEN** the contact block appears appropriately sized relative to the about and services sections and does not read as a narrow strip lost inside a much larger empty slide

#### Scenario: Contact remains reachable on constrained screens
- **WHEN** the Studio slide is active on a mobile viewport or a constrained-height screen
- **THEN** the user can reach all form fields, contact details, and feedback states without the bounded content zone causing clipping or inaccessible controls

#### Scenario: Missing EmailJS configuration does not report false success
- **WHEN** the user submits the form while EmailJS is unavailable, misconfigured, or the request fails
- **THEN** the Studio slide shows an explicit error or direct-contact fallback state instead of reporting a successful send
