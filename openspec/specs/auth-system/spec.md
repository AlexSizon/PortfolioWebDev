# auth-system Specification

## Purpose
TBD - created by archiving change site-okami-ramen. Update Purpose after archive.
## Requirements
### Requirement: Login page has demo auto-fill button
The `/login` page SHALL display a prominent "Login as Demo" button that pre-fills the email and password fields with demo credentials AND automatically submits the form.

#### Scenario: Demo button auto-fills and submits
- **WHEN** the user clicks "Login as Demo →" on the login page
- **THEN** the email field is set to "admin@okami.app", password to "demo123", and the form submits immediately without the user needing to click "Sign In"

#### Scenario: Demo button is visually prominent
- **WHEN** the login page loads
- **THEN** the demo button is displayed above the manual login form with a distinct style (colored background, not a ghost button)

### Requirement: Protected routes redirect unauthenticated users
All `/admin/*` routes SHALL redirect unauthenticated users to `/login` via Next.js middleware.

#### Scenario: Unauthenticated access to /admin is redirected
- **WHEN** an unauthenticated user navigates directly to `/admin`
- **THEN** they are immediately redirected to `/login`

#### Scenario: After login, user is redirected back to intended page
- **WHEN** a user is redirected to `/login` from `/admin` and then logs in
- **THEN** they are redirected to `/admin` (not to the homepage)

### Requirement: Session persists across page reloads
The NextAuth session SHALL persist in a secure HTTP-only cookie and survive browser page reloads.

#### Scenario: Logged-in user stays logged in after refresh
- **WHEN** a logged-in admin refreshes the `/admin` page
- **THEN** they remain on the admin page without being redirected to login

