## Context

Flowo CRM uses Prisma with a SQLite datasource and Auth.js credentials login for the seeded demo account. Manual testing showed that valid demo credentials fail inside the bundled Next.js server runtime because the Prisma client cannot reliably open the SQLite file, and session decoding errors appear when auth surfaces do not clearly share one secret source.

## Goals / Non-Goals

**Goals:**
- Make the Flowo CRM server-side Prisma client resolve the seeded SQLite database file consistently in local runtime environments.
- Ensure Auth.js route handlers and middleware decode the session token with the same secret source.
- Preserve the existing login UI, demo credentials, and seeded data flow.

**Non-Goals:**
- Replacing SQLite with another database.
- Changing demo credentials, seed contents, or login page copy.
- Refactoring the broader CRM auth model beyond this reliability fix.

## Decisions

- Resolve relative SQLite datasource URLs to a concrete existing file path before constructing `PrismaClient`.
  Rationale: the bug appears in the runtime environment, not in credential validation logic. A datasource override in `lib/prisma.ts` fixes the unstable file lookup without requiring schema or seed changes.
  Alternative considered: changing `.env` to another relative path. Rejected because it remains sensitive to how the app runtime is launched.
- Centralize auth secret lookup and reuse it in both Auth.js config and middleware.
  Rationale: session reads and route protection should rely on the same secret source to avoid decode mismatches across surfaces.
  Alternative considered: leaving environment resolution implicit. Rejected because the current setup is harder to reason about and already produced session decode errors during testing.

## Risks / Trade-offs

- [Runtime path assumptions] -> Mitigate by checking multiple expected database locations and only rewriting relative SQLite URLs.
- [Existing stale cookies from earlier secret values may still log one-time decode errors] -> Mitigate by using one shared secret source going forward; a fresh login overwrites the session.
- [Server-only path logic could accidentally leak into client code] -> Mitigate by keeping the datasource resolution helper inside the server-side Prisma module.
