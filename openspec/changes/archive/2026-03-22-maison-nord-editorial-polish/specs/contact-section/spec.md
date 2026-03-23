## MODIFIED Requirements

### Requirement: Contact section with EmailJS form inside Studio slide
The contact form (name, email, message fields) sending via EmailJS SHALL remain embedded inside the Studio slide rather than as a standalone page section. Studio address, email, and phone SHALL appear alongside the form within the same contact area. On desktop viewports (>= 1024px height), the contact content SHALL fit within the composed Studio slide without internal scrolling. On constrained or mobile viewports, the final slide SHALL preserve access to all contact content through stacked layout and controlled overflow rather than clipping fields or feedback states. The form SHALL only show a success confirmation after a successful send, and SHALL show an explicit unavailable or error state when EmailJS configuration is missing or delivery fails.

#### Scenario: Successful form submission
- **WHEN** the user completes all fields with valid data and the EmailJS request succeeds
- **THEN** the form shows a success confirmation state within the Studio slide

#### Scenario: Form shows errors for invalid input
- **WHEN** the user submits with an empty or invalid field
- **THEN** inline error messages appear below the affected fields and submission is blocked

#### Scenario: Contact fits within Studio slide on desktop
- **WHEN** the Studio slide is active on a desktop viewport (>= 1024px height)
- **THEN** the contact form and studio info are visible without scrolling within the slide

#### Scenario: Contact remains reachable on constrained screens
- **WHEN** the Studio slide is active on a mobile viewport or a constrained-height screen
- **THEN** the user can reach all form fields, contact details, and feedback states without content being visually clipped

#### Scenario: Missing EmailJS configuration does not report false success
- **WHEN** the user submits the form while EmailJS is unavailable, misconfigured, or the request fails
- **THEN** the Studio slide shows an explicit error or direct-contact fallback state instead of reporting a successful send
