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
NEXTAUTH_SECRET="replace-me"
NEXTAUTH_URL="http://localhost:3000"
```

For Railway, use a persistent volume and point the database at:

```bash
DATABASE_URL="file:/data/okami.db"
```

## Deployment Notes

- Railway build command: `pnpm build --filter=okami-ramen`
- Railway persistent volume mount: `/data`
- Railway start command: `HOSTNAME=0.0.0.0 node apps/okami-ramen/.next/standalone/apps/okami-ramen/server.js`
- Force `HOSTNAME=0.0.0.0` for standalone mode so Next.js does not try to bind to the container hostname, which can cause Railway healthchecks to fail even after a successful build.

## Nightly Reset Cron

Set a Railway cron job to run nightly at `03:00 UTC` with this command:

```bash
npx tsx prisma/seed.ts
```

Recommended cron expression:

```bash
0 3 * * *
```
