## Why

Manual testing of Flowo CRM showed that demo login is unreliable in the current local runtime. The credentials flow reaches Auth.js, but the server-side Prisma client cannot consistently open the SQLite database after Next.js bundling, which prevents valid demo credentials from authenticating.

## What Changes

- Stabilize the Flowo CRM server-side Prisma datasource so SQLite resolves to the seeded database file regardless of how the app runtime is started.
- Align Auth.js secret resolution across the main auth config and middleware so session decoding uses the same secret source.
- Improve the login flow's operational reliability for both manual credentials entry and the demo auto-login button.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `auth-demo-login`: Demo and manual login must authenticate successfully in local runtime environments where the CRM app is executed through bundled Next.js server output.

## Impact

- Affects `apps/flowo-crm/lib/prisma.ts`, `apps/flowo-crm/auth.config.ts`, and `apps/flowo-crm/middleware.ts`
- Touches server-side authentication and session handling for Flowo CRM
- Preserves the existing seeded demo credentials and UI contract on `/login`
