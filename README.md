# Skilleate — Landing Page

Marketing site + product area, built with [Nuxt UI](https://ui.nuxt.com)
and [Nuxt Content](https://content.nuxt.com).

- `/` — marketing site (landing, pricing, blog, docs), based on the
  [Nuxt UI SaaS template](https://github.com/nuxt-ui-templates/saas).
- `/app/*` — product area (home, inbox, customers, settings), served by
  the [`skilleate-dashboard-layer`](https://github.com/resaitsolutions/skilleate-dashboard-layer)
  Nuxt layer, a fork of the
  [Nuxt UI Dashboard template](https://github.com/nuxt-ui-templates/dashboard).

See `AGENTS.md` for the repo's development methodology (trunk-based +
OpenSpec) and `openspec/changes/archive/scaffold-nuxt-app/` for how this
scaffold was designed and built.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Marketing site at `http://localhost:3000`, product area at
`http://localhost:3000/app`.

## Production

```bash
pnpm build
pnpm preview
```

## Checks

```bash
pnpm lint
pnpm typecheck
```
