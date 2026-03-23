## ADDED Requirements

### Requirement: Valid CRM credentials authenticate in bundled local runtime
The CRM SHALL authenticate valid credentials against the seeded demo user even when the app is executed through bundled Next.js server output in local development.

#### Scenario: Manual demo credentials succeed
- **WHEN** a user submits `demo@flowo.app` and `demo123` on `/login`
- **THEN** the credentials provider authenticates the user and the app navigates to `/dashboard`

#### Scenario: Demo button login succeeds
- **WHEN** a user clicks "Login as Demo →" on `/login`
- **THEN** the auto-filled credentials authenticate successfully and the app navigates to `/dashboard`

## MODIFIED Requirements

### Requirement: Session persists across page reloads
The NextAuth session SHALL persist via a secure HTTP-only cookie, be decoded consistently by both the auth route handlers and route protection middleware, and survive page reloads without re-login.

#### Scenario: Logged-in demo user stays authenticated after refresh
- **WHEN** the demo user refreshes any CRM page
- **THEN** they remain authenticated and see the CRM interface (not the login page)

#### Scenario: Middleware accepts the same session as Auth.js
- **WHEN** a logged-in user requests a protected CRM route such as `/dashboard`
- **THEN** route protection middleware accepts the session token and allows the request without redirecting back to `/login`
