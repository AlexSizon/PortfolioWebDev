## ADDED Requirements

### Requirement: Contact form collects and sends messages via EmailJS
The contact section SHALL include a form with fields for name, email, and message that sends submissions via EmailJS without a backend API route.

#### Scenario: Successful form submission
- **WHEN** the user fills in valid name, email (valid format), and message (≥10 chars) and clicks "Send"
- **THEN** the form submits via EmailJS, shows a success state ("Message sent!") and the form fields are cleared

#### Scenario: Form validation prevents empty submission
- **WHEN** the user clicks "Send" with any required field empty
- **THEN** the empty fields show inline validation error messages and the form is NOT submitted

#### Scenario: Email field validates format
- **WHEN** the user enters a string without "@" in the email field and clicks "Send"
- **THEN** the email field shows "Invalid email address" error

#### Scenario: Loading state during send
- **WHEN** the form submission is in progress
- **THEN** the "Send" button shows a loading spinner and is disabled to prevent duplicate submissions

### Requirement: Social links are displayed in the contact section
The contact section SHALL display links to GitHub, Telegram, and LinkedIn (or equivalent) with recognizable icons.

#### Scenario: Social links open in new tab
- **WHEN** the user clicks any social link
- **THEN** the target URL opens in a new browser tab

#### Scenario: Social icons have hover state
- **WHEN** the user hovers over a social icon
- **THEN** the icon color changes to the violet accent color with a 150ms transition
