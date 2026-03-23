## Context

This repository is a pnpm workspace monorepo deployed to Railway. Railway runs dependency installation at the repository root with `pnpm i --frozen-lockfile`, so any importer drift in any app can block deployment for every service. The failing deployment targets `apps/portfolio`, but the actual failure happens earlier because `apps/maison-nord/package.json` no longer matches the committed root lockfile.

The portfolio service also relies on Next.js standalone output and a Railway start command that points to the generated server entrypoint. That means deploy success depends on both workspace integrity and app-specific runtime alignment.

## Goals / Non-Goals

**Goals:**
- Make Railway root installs succeed with `--frozen-lockfile`.
- Keep `apps/portfolio` deployable from the monorepo with its current standalone strategy.
- Capture the deployment contract in OpenSpec so future workspace changes do not silently break Railway.

**Non-Goals:**
- Redesign the monorepo structure.
- Change Railway providers, regions, or dashboard-level service ownership.
- Remove `@playwright/test` from `apps/maison-nord` or rework that app's QA approach.

## Decisions

Update the root pnpm lockfile rather than weakening CI with `--no-frozen-lockfile`.
Rationale: the Railway failure is correctly catching workspace drift. Fixing the lockfile preserves deterministic installs locally and in CI, while bypassing `frozen-lockfile` would hide a real repository consistency problem.

Keep the `portfolio` app on a standalone Next.js deployment path.
Rationale: the existing Railway flow is already set up to build from the monorepo root and start a standalone server. The right fix is to ensure the app config and start path remain aligned with the generated output.

Treat deploy-readiness as a repository-level capability.
Rationale: a service-specific deployment can fail because of unrelated workspace drift, so the spec needs to define cross-workspace requirements instead of framing this as a single-app implementation detail.

## Risks / Trade-offs

- [Risk] Future workspace dependency edits can reintroduce lockfile drift. -> Mitigation: regenerate and commit `pnpm-lock.yaml` whenever any workspace `package.json` changes.
- [Risk] Railway may still fail if the dashboard points the service at the wrong root directory. -> Mitigation: keep `apps/portfolio/railway.json` correct and ensure the Railway service root is set to `apps/portfolio`.
- [Risk] Monorepo-wide install on Railway can surface unrelated app issues during a portfolio deploy. -> Mitigation: treat the root install as the deployment contract and keep all workspace importers healthy.
