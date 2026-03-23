# auth-demo-login Specification

## Purpose
TBD - created by archiving change site-flowo-crm. Update Purpose after archive.
## Requirements
### Requirement: Login page has prominent demo auto-fill button
The `/login` page SHALL display a "Login as Demo →" button above the manual form that pre-fills credentials (`demo@flowo.app` / `demo123`) and auto-submits.

#### Scenario: Demo button auto-fills and submits
- **WHEN** the user clicks "Login as Demo →"
- **THEN** the email field is set to "demo@flowo.app", password to "demo123", and the form submits automatically

#### Scenario: Demo banner is visible on login page
- **WHEN** the login page renders
- **THEN** an info banner above the form reads "Demo credentials are pre-filled. Click below to enter."

### Requirement: Demo user has read-only permissions for destructive operations
The demo user account SHALL be able to view all data and interact with the UI (drag kanban, open modals, use filters) but SHALL NOT be able to delete clients, deals, tasks, or wipe data.

#### Scenario: Demo user sees delete buttons but cannot execute
- **WHEN** the demo user clicks any "Delete" button and confirms
- **THEN** a toast notification appears: "This action is not available in demo mode" and no data is modified

#### Scenario: Demo user can drag kanban cards
- **WHEN** the demo user drags a deal card to a new pipeline stage
- **THEN** the card moves in the UI and the stage change is persisted (drag interaction is allowed)

### Requirement: Session persists across page reloads
The NextAuth session SHALL persist via a secure HTTP-only cookie, be decoded consistently by both the auth route handlers and route protection middleware, and survive page reloads without re-login.

#### Scenario: Logged-in demo user stays authenticated after refresh
- **WHEN** the demo user refreshes any CRM page
- **THEN** they remain authenticated and see the CRM interface (not the login page)

#### Scenario: Middleware accepts the same session as Auth.js
- **WHEN** a logged-in user requests a protected CRM route such as `/dashboard`
- **THEN** route protection middleware accepts the session token and allows the request without redirecting back to `/login`

### Requirement: Valid CRM credentials authenticate in bundled local runtime
The CRM SHALL authenticate valid credentials against the seeded demo user even when the app is executed through bundled Next.js server output in local development.

#### Scenario: Manual demo credentials succeed
- **WHEN** a user submits `demo@flowo.app` and `demo123` on `/login`
- **THEN** the credentials provider authenticates the user and the app navigates to `/dashboard`

#### Scenario: Demo button login succeeds
- **WHEN** a user clicks "Login as Demo →" on `/login`
- **THEN** the auto-filled credentials authenticate successfully and the app navigates to `/dashboard`

