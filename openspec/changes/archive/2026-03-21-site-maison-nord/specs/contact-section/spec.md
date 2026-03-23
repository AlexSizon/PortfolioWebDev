## ADDED Requirements

### Requirement: Contact section with EmailJS form
The contact section SHALL include a form (name, email, message fields) that sends via EmailJS, plus the studio's address, email, and phone number displayed alongside.

#### Scenario: Successful form submission
- **WHEN** the user completes all fields with valid data and clicks "Send Message"
- **THEN** EmailJS delivers the message and the form shows a success confirmation state

#### Scenario: Form shows errors for invalid input
- **WHEN** the user submits with an empty or invalid field
- **THEN** inline error messages appear below the affected fields and submission is blocked

### Requirement: Map placeholder is displayed
The contact section SHALL include a placeholder map area showing the studio's approximate location (a styled placeholder or embedded map iframe).

#### Scenario: Map area renders without breaking layout
- **WHEN** the contact section is scrolled into view
- **THEN** a map element of appropriate height is visible below or beside the contact form
