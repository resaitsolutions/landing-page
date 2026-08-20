## 1. Copy marketing site into the repo

- [x] 1.1 Copy `nuxt-ui-templates/saas` content (`app/`, `content/`,
      `content.config.ts`, `nuxt.config.ts`, `package.json`,
      `eslint.config.mjs`, `tsconfig.json`, `public/`, `.env.example`)
      into the repo root, on `feat/scaffold-nuxt-app`.
- [x] 1.2 Remove template-specific branding that doesn't apply here
      (upstream `renovate.json`, upstream `.github/workflows/ci.yml` —
      replace with this repo's own CI once a stack exists, per
      `AGENTS.md` §5).

## 2. Wire the dashboard layer

- [x] 2.1 Add `github:resaitsolutions/skilleate-dashboard-layer` to
      `nuxt.config.ts` `extends`.
- [x] 2.2 Run `pnpm install`; confirm `@nuxt/ui` version matches between
      this project's `package.json` and the layer's (both `^4.10.0` as
      of this proposal — flag and reconcile if they've drifted).
- [x] 2.3 Confirm `/app` and its sub-routes resolve correctly in `pnpm dev`
      (see Verification).

## 3. Resolve the app.config.ts / app.vue conflict

- [x] 3.1 Decide the theme (`primary`/`neutral` color tokens) using
      `.design-system/tokens/colors.json` as the source; this project's
      own `app/app.config.ts` is authoritative (see design.md).
- [x] 3.2 Confirm `app/app.vue` (from the saas copy) is the one that
      actually renders for both `/` and `/app` — the dashboard layer's
      own `app.vue` must never apply.

## 4. Design-system integration

- [x] 4.1 Wire `.design-system/tokens/*.json` values into
      `app/assets/css/main.css` / `app/app.config.ts` per `AGENTS.md`
      §9.5–9.8 (token-first, no hardcoded hex/px).
- [x] 4.2 Run `.design-system/scripts/validate_tokens.py`,
      `contrast.py`, and `check_no_emoji.py` against the new app code.

## 5. Verification (live, not just build)

- [x] 5.1 `pnpm dev`; confirm `/` renders the marketing homepage with
      the marketing header/footer layout.
- [x] 5.2 Confirm `/blog` and `/docs/getting-started` render without
      error.
- [x] 5.3 Confirm `/app`, `/app/inbox`, `/app/customers`, `/app/settings`
      (+ its `members`/`notifications`/`security` sub-routes) all
      render with the dashboard sidebar layout, not the marketing
      layout.
- [x] 5.4 Confirm no route returns a 404 that shouldn't, and no path is
      claimed by both sources (spot-check the route table via
      `nuxt.config` devtools or `.output` route manifest after build).
- [x] 5.5 `pnpm build` succeeds cleanly.
- [x] 5.6 `pnpm typecheck` and `pnpm lint` pass.

## 6. Pin the layer dependency

- [x] 6.1 Once `/app/*` is verified working end-to-end, tag
      `resaitsolutions/skilleate-dashboard-layer` (e.g. `v1.0.0`) and
      update this project's `extends` entry to pin that tag instead of
      tracking `main` (see design.md → Risks).
