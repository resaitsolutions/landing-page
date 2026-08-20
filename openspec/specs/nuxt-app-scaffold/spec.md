# nuxt-app-scaffold Specification

## Purpose
TBD - created by archiving change scaffold-nuxt-app. Update Purpose after archive.
## Requirements
### Requirement: Marketing site at the root
The application SHALL serve the marketing site (landing, pricing,
blog, docs) at the root path `/` using content copied directly into
this repository from the Nuxt UI SaaS template.

#### Scenario: Root path renders the marketing homepage
- **GIVEN** the application is running
- **WHEN** a request is made to `/`
- **THEN** the marketing landing page renders using this project's own
  `app/pages/index.vue`, `app/app.vue`, and `app/layouts/default.vue`

#### Scenario: Blog and docs remain reachable
- **GIVEN** the application is running
- **WHEN** a request is made to `/blog` or `/docs/getting-started`
- **THEN** the corresponding Nuxt Content-driven page renders without
  error

### Requirement: Product area under /app
The application SHALL serve the dashboard product area under the
`/app` path prefix, sourced from the `resaitsolutions/skilleate-dashboard-layer`
Nuxt layer, without any of its routes or layout colliding with the
marketing site's own routes or layout.

#### Scenario: Dashboard home renders under /app
- **GIVEN** the application is running with the dashboard layer
  extended
- **WHEN** a request is made to `/app`
- **THEN** the dashboard home page renders with its sidebar layout
  (`dashboard` layout), not the marketing site's header/footer layout

#### Scenario: Dashboard sub-routes resolve under the /app prefix
- **GIVEN** the application is running
- **WHEN** a request is made to `/app/inbox`, `/app/customers`, or
  `/app/settings`
- **THEN** the corresponding dashboard page renders with the sidebar
  layout and none of these paths return a 404 or resolve to a
  marketing-site page

#### Scenario: No route collision between marketing and product area
- **GIVEN** both the marketing site and the dashboard layer are part of
  the same build
- **WHEN** the application's route table is inspected
- **THEN** no path is claimed by both sources — the marketing site owns
  `/`, `/blog`, `/pricing`, `/docs/*`, `/login`, `/signup`, `/changelog`
  and the dashboard layer owns only `/app` and its sub-routes

### Requirement: Single source of truth for shared visual config
The application SHALL resolve `app/app.config.ts` and `app/app.vue`
from this project's own files only, never from the extended dashboard
layer, so theme colors and the root SEO/shell markup are defined in
exactly one place.

#### Scenario: Theme colors come from the host project
- **GIVEN** this project defines its own `app/app.config.ts` with
  chosen `primary`/`neutral` color tokens
- **WHEN** the application builds
- **THEN** the resolved `app.config` reflects only this project's
  color choice, not the dashboard layer's own `app.config.ts` values

### Requirement: No real backend wired for the product area
The dashboard's `/app/*` pages SHALL continue to use their template's
existing static/mock data and local `server/api/*` handlers; this
change SHALL NOT introduce real authentication, authorization, or a
live backend integration for the product area.

#### Scenario: Product area has no live auth gate
- **GIVEN** the application as scaffolded by this change
- **WHEN** `/app` is requested without any credential
- **THEN** the page renders using mock data, with no redirect to a
  real login/auth provider and no real user session required

