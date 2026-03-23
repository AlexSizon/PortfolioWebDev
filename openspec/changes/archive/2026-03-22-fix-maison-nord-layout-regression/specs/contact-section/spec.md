## MODIFIED Requirements

### Requirement: Contact section with EmailJS form
The contact section SHALL include a form (name, email, message fields) that sends via EmailJS, plus the studio's address, email, and phone number displayed alongside. On desktop, the contact content SHALL maintain a balanced two-column composition within the centered section width rather than collapsing into a narrow left strip.

#### Scenario: Successful form submission
- **WHEN** the user completes all fields with valid data and clicks "Send Message"
- **THEN** EmailJS delivers the message and the form shows a success confirmation state

#### Scenario: Form shows errors for invalid input
- **WHEN** the user submits with an empty or invalid field
- **THEN** inline error messages appear below the affected fields and submission is blocked

#### Scenario: Contact section keeps balanced desktop layout
- **WHEN** a user views the contact section on a desktop viewport
- **THEN** the form and companion content align within the centered section container without leaving a large unused area on the right side

### Requirement: Map placeholder is displayed
The contact section SHALL include a placeholder map area showing the studio's approximate location (a styled placeholder or embedded map iframe), and the map SHALL remain visibly integrated with the contact layout across supported breakpoints.

#### Scenario: Map area renders without breaking layout
- **WHEN** the contact section is scrolled into view
- **THEN** a map element of appropriate height is visible below or beside the contact form

#### Scenario: Map remains visible in the responsive layout
- **WHEN** a user views the contact section on desktop, tablet, or mobile
- **THEN** the map remains visible and aligned with the surrounding contact content without clipping or forcing horizontal overflow
