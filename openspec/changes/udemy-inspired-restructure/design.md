## Context

Stack unchanged from prior changes: Nuxt 4.5, Nuxt UI 4.10 (Tailwind
v4), Nuxt Content v3. Current homepage (`app/pages/index.vue` +
`content/0.index.yml`) structure: `UPageHero` → 2×`UPageSection`
(feature-list layout, horizontal orientation) → 1×`UPageSection`
(6-item `UPageGrid` bento) → 1×`UPageSection` (testimonials,
`UPageColumns` + `UCollapsible` disclosure) → `UPageCTA`.

Reference structure (Udemy, https://www.udemy.com/, captured live via
browser this session, full-page scroll top to bottom):
1. Dismissible promo utility bar + header (logo, Explore, Subscribe,
   search, Business/Teach, cart, Login/Signup, locale).
2. Hero: thin promotional card + illustration (not a strong pattern —
   Skilleate's existing hero is stronger, kept as-is).
3. "Trusted by 17,000+ companies" — logo band.
4. Student-quote carousel (single-column, one quote at a time).
5. "Get certified" — dark band, 3 certification-body cards.
6. **Tabbed skill/category browser** ("Skills to transform your career
   and life") — category tabs (Artificial Intelligence, Python,
   Excel, AI Agents & Agentic AI, Digital Marketing, AWS) each
   revealing a course-card grid (image, title, instructor, badge,
   rating+count, price).
7. **"Reimagine your career" conversion band** — dark full-width,
   asymmetric split (2×2 benefit-icon checklist + CTA left,
   collage/photo imagery right).
8. "Career Accelerators" — role-outcome cards (portrait, rating,
   learner count, hours).
9. **"Popular Skills" dense index** — multi-column skill-name list by
   category (Development/Design/Business), plus one featured
   "ChatGPT is a top skill" callout.
10. Footer: dense 4-column sitemap-style link index (In-demand
    Careers / Web Development / IT Certifications / Leadership /
    Certifications by Skill / Data Science / Communication /
    Business Analytics rows), then a second 4-column
    About/Discover/Business/Legal row, then copyright bar.

This proposal is a **structural pattern adoption**, not a literal
copy: Udemy is a multi-instructor marketplace (17K+ companies,
per-course ratings/learner counts, hundreds of thousands of courses).
Skilleate is one product. Sections 3, 4, 5, 8 depend on scale
Skilleate doesn't have and would require fabricating numbers/logos —
excluded (see Non-Goals). Sections 6, 7, 9, 10 are structural
patterns (tabbed browsing, a mid-page conversion band, a dense skill
index, a denser footer) that transplant cleanly onto a single-product
site using only real Skilleate content.

## Goals / Non-Goals

**Goals:**
- Add a tabbed skill-category browser section to the homepage,
  reusing the existing `UTabs` component (already used on
  `/pricing`) and warm-editorial tokens, with real Skilleate content-
  track data (no fabricated ratings/learner counts).
- Add a mid-page conversion band (dark, asymmetric split) between the
  features grid and testimonials.
- Add a dense "Popular Skills" multi-column index section.
- Restructure `AppFooter.vue` into a denser multi-column layout using
  only real existing routes/anchors.
- Introduce `@nuxt/test-utils` + Vitest + Playwright as dev
  dependencies; write tests for existing critical interactive paths
  (regression safety net) and every new interactive element.
- Wire a `pnpm test` script and a CI job.

**Non-Goals:**
- **No fabricated trust signals.** No invented company-logo band, no
  invented per-item ratings/learner counts/review counts, no invented
  "17,000+ companies" style claim. Skilleate has none of this today;
  inventing it would violate `design-taste.md`'s "fake-precision
  stats" anti-pattern and the review standard's honesty bar. Where
  Udemy shows a real number, Skilleate shows a real (if smaller or
  qualitative) equivalent, or omits the element.
- **No course marketplace / multi-instructor UI.** Skilleate is one
  guided product; the "skill browser" section shows content
  *tracks* (a concept the site already has via pricing tiers/course
  catalog framing), not a courses-for-sale grid with per-item
  purchase flow.
- **No new routes.** All new sections live on the existing `/`
  route; links point at existing routes/anchors (`/pricing`,
  `/signup`, in-page anchors) — never a fabricated destination.
- **No third-party integration** (analytics, real course database,
  payment) — gate C2 only.
- **No E2E browser automation running in CI in this pass.** Playwright
  is installed and its `@nuxt/test-utils` e2e helpers are available
  for local/manual use, but this proposal's CI job runs the Vitest
  unit/component projects only (fast, no browser download in CI);
  wiring a full Playwright CI job is a reasonable follow-up, not
  bundled here to keep CI fast and this change's scope contained.

## Decisions

### 1. Tabbed skill browser reuses `UTabs`, not a new component

`UTabs` (Nuxt UI v4, confirmed via `node_modules` source) is already
used on `/pricing` for the monthly/yearly toggle and accepts an
`items` array — no new dependency, no new interaction pattern to
learn. Content: 4 category tabs matching content already described in
`content/0.index.yml`'s existing feature copy (e.g. "Data &
Analytics", "Programming & AI tools", "Design", "Career & business
skills") — reusing the site's existing skill vocabulary rather than
inventing new categories wholesale. Each tab reveals 3-4 cards
(title, level tag, one factual descriptor — e.g. "Foundational" /
"12 lessons" — sourced from what the pricing/features copy already
implies about the catalog, never a fabricated rating).

Rejected alternative: build a custom carousel/grid component to more
closely visually match Udemy's course-card imagery. Rejected —
`UTabs` + `UPageCard`/`UPageGrid` (already-established primitives)
achieve the same *structural* pattern (categorized, filterable
browsing) without introducing a new one-off component or the need
for course thumbnail imagery Skilleate doesn't have.

### 2. Conversion band is a `UPageCTA`-derived pattern, not new markup

Reuse `UPageCTA`'s existing "naked" variant pattern (already used for
the bottom-of-page CTA with `LazyStarsBg`) with a two-column
`:ui` override for the asymmetric split, rather than hand-rolling a
new section component. Keeps one CTA-pattern vocabulary instead of
two.

Rejected alternative: a fully custom section component. Rejected —
`UPageCTA` already supports the needed slots/layout primitives; a new
component would duplicate an existing composition pattern for no
functional gain.

### 3. "Popular Skills" index is a plain multi-column `UPageColumns`/list, not a new grid

Dense text-link index matching Udemy's footer-adjacent skill list.
Built from semantic `<nav>`/`<ul>` markup with existing typography
tokens (small text, generous column gaps) — a content/typography
pattern, not a new interactive component. Links point at `/pricing`
or in-page anchors (e.g. `#features`) since Skilleate has no
per-skill landing pages yet; each list item is a real skill name
already present in the site's existing feature/pricing copy.

### 4. Footer restructure keeps `AppFooter.vue`'s existing pattern, adds columns

Nuxt UI's `UFooterColumns` (already used) accepts an array of
`{ label, children }` column objects — the current footer already
uses this API with 2 columns (Resources, Company); this proposal
adds 2 more columns (mirroring Udemy's 4-column footer count) using
only real existing routes (no "Careers"/"Investors"/"Blog" links to
pages that don't exist on this site).

### 5. Test stack: `@nuxt/test-utils` + Vitest (official, matches Nuxt 4)

Per Nuxt's own testing docs (confirmed via `nuxt.com/docs/getting-
started/testing`, read this session, not from memory): `@nuxt/test-
utils` is Nuxt's first-class testing library, supporting Vitest for
unit/component tests (`mountSuspended` for mounting real Nuxt
components with plugin/injection context) and Playwright for e2e.
Dev dependencies added: `@nuxt/test-utils`, `vitest`, `@vue/test-
utils`, `happy-dom`, `playwright-core`. Zero runtime/production
impact (dev-only).

Test organization (per official docs' recommended structure):
```
test/
├── nuxt/       # component tests needing Nuxt runtime (mountSuspended)
│   ├── PricingToggle.nuxt.spec.ts
│   ├── AppFooter.nuxt.spec.ts
│   ├── SkillCategoryTabs.nuxt.spec.ts
│   └── HomepageAnchors.nuxt.spec.ts
```
All tests in this proposal use the `nuxt` Vitest project/environment
(`mountSuspended`), since every target is a real Nuxt/Nuxt UI
component needing plugin/injection context — no separate `unit`
project is needed yet (no pure-function utility module exists to
test in isolation today).

Rejected alternative: Playwright/`@playwright/test` as the sole test
runner (full e2e, real browser). Rejected for this pass — heavier
CI cost (browser download/install), slower feedback loop, and Vitest
component tests already cover the actual regression risk (toggle
state, form state, tab state, computed link targets) without needing
a rendered browser. Playwright/`playwright-core` is still installed
per `@nuxt/test-utils`'s peer-dependency setup so e2e tests can be
added later without a second install pass; not wiring it into CI yet
is a deliberate, stated non-goal above, not an oversight.

### 6. CI: new `test` job after `lint`/`typecheck`, same workflow file

Add a `pnpm test` script (`vitest run`) and a step in
`.github/workflows/ci.yml` after the existing `Typecheck` step,
same job/matrix — no new workflow file, keeping one CI entry point.

## Risks / Trade-offs

- **New test suite has no history of catching real regressions yet.**
  Mitigated by deliberately writing tests for the exact interactive
  paths already known to be regression-prone from this session's own
  history (pricing toggle click behavior, footer form submit-state
  reset, anchor `id` wiring) — not generic boilerplate tests.
- **Skill-category tab content is illustrative, not a real course
  catalog.** Flagged explicitly (see Non-Goals) — cards describe
  learning tracks in the same directional, non-falsifiable register
  as the rest of the site's existing marketing copy (per the prior
  messaging change's own stated risk-mitigation approach), not a
  claim of a specific number of real courses.
- **Footer column expansion risk: inventing destinations.** Mitigated
  by using only routes that exist today (`/docs`, `/changelog`,
  `/pricing`, `/blog`, `/signup`, `/login`) redistributed across more
  columns, plus in-page anchors — zero new dead links, unlike the
  template's original GitHub links already removed in the prior
  design-audit change.
- **CI runtime increase.** Adding a test job increases CI time
  modestly (Vitest component tests are fast, no browser download
  needed for this pass since Playwright isn't wired into CI yet).
  Acceptable trade-off for catching regressions before merge.
- **Process for this change is stricter than the prior two changes**,
  per explicit user instruction: neither the proposal PR nor the
  implementation PR merges without the user's own explicit
  authorization message (not agent self-review-and-merge, unlike the
  prior two changes in this repo's history). The implementation PR
  additionally requires the user to review the running dev server
  themselves before approval, and the OpenSpec archive step happens
  *on the PR, before merge* (a variation from AGENTS.md §3 step 15's
  default post-merge archive timing) — flagged here as an explicit,
  one-time process deviation requested by the user for this change,
  not a change to the repo's standing methodology.
