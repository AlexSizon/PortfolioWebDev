## 1. Deployment Fixes

- [ ] 1.1 Regenerate and commit the root `pnpm-lock.yaml` so Railway frozen installs succeed for the whole workspace.
- [ ] 1.2 Keep the `portfolio` Next.js and Railway runtime configuration aligned with the standalone server output.

## 2. Verification

- [ ] 2.1 Reproduce Railway's root install locally with `pnpm i --frozen-lockfile`.
- [ ] 2.2 Build `@repo/portfolio` and verify the standalone server entrypoint exists at the configured path.
