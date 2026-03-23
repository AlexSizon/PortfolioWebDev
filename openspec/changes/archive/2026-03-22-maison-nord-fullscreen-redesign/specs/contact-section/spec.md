## MODIFIED Requirements

### Requirement: Contact section with EmailJS form inside Studio slide
The contact form (name, email, message fields) sending via EmailJS SHALL be embedded inside the Studio slide rather than as a standalone page section. Studio address, email, and phone SHALL appear alongside the form within the same column. The form SHALL fit within the viewport height of the Studio slide without internal scrolling.

#### Scenario: Successful form submission
- **WHEN** the user completes all fields with valid data and clicks "Send Message"
- **THEN** EmailJS delivers the message and the form shows a success confirmation state within the Studio slide

#### Scenario: Form shows errors for invalid input
- **WHEN** the user submits with an empty or invalid field
- **THEN** inline error messages appear below the affected fields and submission is blocked

#### Scenario: Contact fits within Studio slide
- **WHEN** the Studio slide is active on a desktop viewport (≥ 1024px height)
- **THEN** the contact form and studio info are visible without scrolling within the slide

## REMOVED Requirements

### Requirement: Map placeholder is displayed
**Reason:** The Studio slide must fit within one viewport height. A map element adds too much vertical space for the constrained single-viewport layout.
**Migration:** Map iframe is removed. Studio address remains as text in the contact column of the Studio slide.
