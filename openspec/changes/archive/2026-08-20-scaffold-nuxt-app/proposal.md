## Why

The repo currently has only methodology/tooling scaffolding (OpenSpec,
design-skill kit) and no application code. We need a real Nuxt
application to build the Skilleate landing page on, combining a
marketing site (Nuxt UI SaaS template) with a logged-in product area
(Nuxt UI Dashboard template) inside one Nuxt project.

Nuxt layers (`extends`) do not merge files at the same path — they
shadow the lower-priority one entirely. Both templates define
conflicting `app/app.vue`, `app/app.config.ts`, `app/layouts/default.vue`,
and `app/pages/index.vue`. Combining them requires the marketing
template's content to live directly in this repo (so this project's
files always win layer-priority conflicts) and the dashboard template
to live in its own layer, forked to mount under a `/app/*` prefix so
its routes never collide with the marketing site's own routes.

## What Changes

- Add a real Nuxt 4 application at the repo root: `nuxt-ui-templates/saas`
  content copied directly into this repo (marketing site: landing,
  pricing, blog, docs — driven by Nuxt Content).
- Add `github:resaitsolutions/skilleate-dashboard-layer` (a maintained
  fork of `nuxt-ui-templates/dashboard`, routes moved under `app/pages/app/*`
  and its layout renamed to avoid colliding with this project's own
  `layouts/default.vue`) to `nuxt.config.ts` `extends`, giving this
  project a `/app/*` product area (home, inbox, customers, settings)
  alongside the marketing site at `/`.
- Resolve the one real content conflict between the two sources:
  `app.config.ts` theme colors (saas: blue/slate vs. dashboard: green/zinc)
  — this project's own `app.config.ts` is the single source of truth,
  the dashboard layer's colors never apply once this project defines
  its own.
- Wire the already-installed `.design-system/` token kit's color/type/
  spacing values into the chosen theme (this project's `app.config.ts`
  + `main.css`), per `AGENTS.md` §9.

## Capabilities

### New Capabilities
- `nuxt-app-scaffold`: the Nuxt 4 application itself — marketing site at
  `/` (saas content, direct) + product area at `/app/*` (dashboard
  layer, extended) coexisting in one build, one dev server, one deploy
  target.

### Modified Capabilities
None — this is the first application code in the repo.

## Gate

**C2** — content/styling on the static/marketing side is authorized
today. The `/app/*` dashboard area ships with its template's existing
mock data and local `server/api/*` handlers (`customers.ts`, `mails.ts`,
`members.ts`, `notifications.ts`) — **no real backend, no real auth,
no real user data** is wired in this change. Wiring the dashboard to a
real backend/auth provider is a **future, separate C3 proposal** and is
explicitly out of scope here.

## Non-goals

- No real authentication/authorization for the `/app/*` area (still
  gate C3, not authorized in this change).
- No production domain/hosting decisions (gate C4).
- No third-party integrations (forms, analytics, CMS) beyond what the
  templates already ship statically (Nuxt Content for the marketing
  site's blog/docs).
- Not modifying `resaitsolutions/skilleate-dashboard-layer` itself as
  part of this change — it is consumed as an external, versioned
  dependency via `extends`.

## Tracking Issue

https://github.com/resaitsolutions/landing-page/issues/1
