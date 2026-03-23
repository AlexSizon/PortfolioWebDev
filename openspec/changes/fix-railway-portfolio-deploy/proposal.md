## Why

Railway currently fails before the `portfolio` app even reaches its build step because the root workspace lockfile is out of sync with `apps/maison-nord/package.json`. The portfolio service also depends on a monorepo-aware standalone build/start flow, so deployment readiness needs to be treated as a repository contract rather than a local-only setup.

## What Changes

- Refresh the root `pnpm-lock.yaml` so Railway can run `pnpm i --frozen-lockfile` successfully for the whole workspace.
- Keep the `portfolio` Railway configuration aligned with its Next.js standalone output and monorepo build path.
- Add an OpenSpec capability that defines deployment-readiness requirements for Railway-based monorepo services.

## Capabilities

### New Capabilities
- `railway-deploy-readiness`: Ensure Railway installs, builds, and starts workspace apps from the monorepo without lockfile drift or mismatched runtime paths.

### Modified Capabilities
- None.

## Impact

- Root dependency management via `pnpm-lock.yaml`
- Railway/Nixpacks installs that use `pnpm i --frozen-lockfile`
- `apps/portfolio` build and runtime configuration
- Deployment reliability for monorepo apps hosted on Railway
