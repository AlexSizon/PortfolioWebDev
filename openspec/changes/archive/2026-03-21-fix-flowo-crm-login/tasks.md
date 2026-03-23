## 1. Runtime Reliability

- [x] 1.1 Add a server-side Prisma datasource resolver that maps relative SQLite URLs to the actual Flowo CRM database file.
- [x] 1.2 Reuse a single auth secret lookup for Auth.js config and middleware session decoding.

## 2. Verification

- [x] 2.1 Reproduce the login failure and confirm the server can read the seeded demo user after the datasource fix.
- [x] 2.2 Verify demo login and protected-route session handling succeed with the updated server configuration.
