# Okami Ramen

Full-stack Japanese restaurant demo with live public menu updates, protected admin CRUD, Prisma + SQLite, and nightly seed reset support for Railway.

## Stack

- Next.js 16 App Router
- Prisma + SQLite
- NextAuth.js v5 credentials auth
- Server-Sent Events for public menu updates
- Tailwind CSS v4 + custom shadcn-style components

## Development

```bash
pnpm --filter @repo/okami-ramen dev
```

## Environment Variables

```bash
DATABASE_URL="file:./dev.db"
AUTH_SECRET="replace-me"
NEXTAUTH_SECRET="replace-me"
NEXTAUTH_URL="http://localhost:3000"
```

For Railway, add these service variables and use a persistent volume:

```bash
DATABASE_URL="file:/data/okami.db"
AUTH_SECRET="generate-a-long-random-string"
```

`NEXTAUTH_SECRET` is also supported as a fallback, but `AUTH_SECRET` is the preferred Auth.js v5 name.

## Deployment Notes

- Railway build command: `pnpm build --filter=okami-ramen`
- Railway persistent volume mount: `/data`
- Railway start command: `node apps/okami-ramen/scripts/start-production.mjs`
- Startup now runs `prisma migrate deploy` automatically, seeds the demo database on first boot, and then launches the standalone Next.js server on `0.0.0.0`.
- The build step also copies `.next/static` into the standalone output so Railway can serve the generated CSS, JS, and font files.
- Demo admin login: `admin@okami.app` / `demo123`

## Nightly Reset Cron

Set a Railway cron job to run nightly at `03:00 UTC` with this command:

```bash
node ./scripts/seed-database.mjs
```

Recommended cron expression:

```bash
0 3 * * *
```
