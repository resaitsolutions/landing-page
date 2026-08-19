## Approach

**Marketing site: copied directly, not extended.** The
`nuxt-ui-templates/saas` content (`app/`, `content/`, `content.config.ts`,
`nuxt.config.ts`, `package.json`, etc.) becomes this repo's own
application code — not a layer dependency. This repo already owns
`.design-system/` at the root (namespaced to avoid colliding with
Nuxt's own `components/`/`content/` conventions per `AGENTS.md` §6), so
the marketing site's `app/`, `content/`, and config files sit alongside
it with no further collision (the design-system kit does not use those
Nuxt-reserved top-level names).

**Dashboard: extended as a remote layer, not copied.** Per
[Nuxt Layers](https://nuxt.com/docs/4.x/guide/going-further/layers),
`extends` entries are resolved with **this project's own files always
winning** any same-path collision, ahead of anything in `extends`. That
is exactly the property this design relies on:

```ts
export default defineNuxtConfig({
  extends: [
    'github:resaitsolutions/skilleate-dashboard-layer'
  ]
})
```

The dashboard layer is a maintained fork (this org, `resaitsolutions`)
of the upstream template, reworked specifically to be extended:

- Every page moved from `app/pages/*` to `app/pages/app/*`, so its
  routes resolve at `/app`, `/app/inbox`, `/app/customers`,
  `/app/settings` (+ sub-routes) instead of colliding with this
  project's own root-level marketing routes.
- Its layout renamed from `default.vue` to `dashboard.vue`, with every
  top-level dashboard page declaring `definePageMeta({ layout: 'dashboard' })`
  explicitly. This project's own `layouts/default.vue` (copied from
  `saas`, used for the marketing header/footer shell) always wins the
  `default` name under Nuxt's layer-priority rules — if the dashboard
  layer had kept the `default` name, its sidebar layout would be
  silently shadowed and every `/app/*` page would render with the
  marketing header/footer instead of its sidebar. See that layer's own
  README for the fork rationale in full.
- `$meta.name: 'dashboard'` gives this project a `#layers/dashboard`
  alias, and its `nuxt.config.ts` resolves its own `css` via an
  absolute path (`fileURLToPath`/`join`) rather than a `~/` alias,
  because relative layer paths resolve against the *consuming*
  project, not the layer itself.

### Why not the reverse (saas as a layer, dashboard copied)?

Symmetric to the chosen approach, but worse for this project's actual
day-to-day: the marketing site (copy, pricing, blog posts) is the part
that changes constantly as the business iterates, and putting it
behind a remote-layer indirection means every content edit requires
either forking `saas` too or overriding files project-side anyway
(defeating the point of extending it). The dashboard's mock-data pages
change far less often once shipped, so it is the better candidate to
live behind a versioned, pinnable remote dependency.

### Why a fork instead of extending `nuxt-ui-templates/dashboard` directly?

The upstream template's routes live at the root (`app/pages/index.vue`,
`app/pages/customers.vue`, ...) and its layout is named `default.vue`.
Extending it unmodified would collide with this project's own root
route (the marketing homepage) and layout name outright — Nuxt would
resolve one `/` and one `default` layout, and only one of the two
sources' files would ever apply. There is no override mechanism in
Nuxt layers that renames or re-roots an upstream layer's paths from
the consuming side; the layer itself has to be authored that way. Hence
the fork.

## Conflict Resolution

| Conflict | Resolution |
|---|---|
| `app/app.config.ts` theme colors (saas: `blue`/`slate` vs. dashboard: `green`/`zinc`) | This project defines its own `app/app.config.ts` (highest layer priority always wins); the dashboard layer's colors never apply. Actual color choice is a `design-code`/`apply-aesthetic` task (tasks.md), informed by `.design-system/tokens/colors.json`. |
| `app/app.vue` (saas: full SEO + content search; dashboard: simpler SEO, no search) | This project's own `app/app.vue` (from `saas`, since the marketing site is the primary experience) is authoritative. The dashboard layer's `app.vue` never applies — Nuxt only uses the highest-priority layer's `app.vue`. |
| `app/layouts/default.vue` | Resolved by the dashboard-layer fork (renamed to `dashboard.vue`, see above) rather than by anything on this project's side. |
| `app/pages/index.vue` (root route) | This project's own copy (from `saas`) is authoritative at `/`; the dashboard layer's equivalent lives at `/app` (a different path), so there is no actual collision once the layer fork is in place. |
| `app/error.vue`, `app/types/index.d.ts` | Both templates define incompatible content here (saas: blog/docs types; dashboard: customer/sales types). This project's copies (from `saas`) are authoritative; any dashboard-specific types the layer needs travel with the layer itself and are not duplicated project-side. |

## Risks / Trade-offs

- **Remote-layer availability at build time.** `extends: ['github:...']`
  fetches the layer at build/dev time via `giget`; a GitHub outage or a
  force-push to the layer's `main` branch could break builds. Mitigate
  by pinning a tag/commit once the layer stabilizes (`#v1.0.0` or a
  commit SHA) instead of tracking `main` indefinitely — tracked as a
  task, not blocking this scaffold.
- **Layer drift.** Because the dashboard layer is forked (not
  upstream), it will not automatically receive upstream Nuxt UI
  template updates. Accepted trade-off: the fork's routing/layout
  changes are what make coexistence possible at all; re-syncing from
  upstream is a manual, occasional task for that layer's own repo, not
  this one.
- **Two dependency surfaces to keep in sync.** `@nuxt/ui` version drift
  between this project's own `package.json` and the layer's
  `package.json` could cause subtle behavior differences. Both
  currently pin `^4.10.0`; tasks.md includes a check that they match
  after `pnpm install`.
- **No real backend wired.** The dashboard's `/app/*` pages ship with
  their template's static/mock data and local `server/api/*` handlers.
  This is intentional (gate C2 scope) and explicitly not addressed
  here — see proposal.md Non-goals.

## Rejected Alternatives

- **Nuxt Modules** (the link originally suggested): modules are for
  distributing *reusable build-time functionality* (a Nuxt hook/plugin
  package), not for combining two complete applications' pages/layouts/
  content. Rejected as the wrong primitive for this problem; Nuxt
  Layers is the documented mechanism for this ("share and reuse partial
  Nuxt applications... from a git repository").
- **Two fully separate Nuxt projects/deploys** (monorepo workspace,
  no `extends` between them): simpler to reason about per-project, but
  explicitly not what was asked — "coexist as one" requires one Nuxt
  build/app, which only `extends` (layers) provides.
- **Extending the upstream dashboard template unmodified**: rejected,
  see "Why a fork" above — its root-level routes and `default.vue`
  layout collide outright with the marketing site.
