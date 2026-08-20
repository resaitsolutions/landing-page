## Why

The user reviewed the prior visual redesign and found it insufficient,
directing that the homepage be restructured using Udemy
(https://www.udemy.com/) as the reference for information architecture
and content patterns — a real, live-verified reference (browser-
captured this session), not a memory-based guess. Udemy's homepage
uses a denser, trust-signal-heavy structure than Skilleate's current
single-column hero → 2 feature sections → grid → testimonials → CTA
layout: a promo utility bar, tabbed skill/course-category browsing, a
dedicated "reimagine your career" conversion band, a dense multi-
column "Popular Skills" index, and a footer that itself functions as a
sitemap/skill index. This proposal restructures Skilleate's homepage
around that pattern, adapted to what Skilleate actually is (a single
agent-guided learning product, not a multi-instructor marketplace with
17,000+ company logos and per-course ratings) — never fabricating
trust signals Skilleate doesn't have. Gate: **C2** (content/styling on
the existing static site).

Separately, the user requires this change to ship with a real
regression safety net: the repo has **zero test infrastructure today**
(confirmed: no `vitest`/`playwright-core` in `package.json`, no test
files anywhere, `.github/workflows/ci.yml` runs only `lint` +
`typecheck`). Any homepage restructure this size needs component/e2e
tests to catch regressions in existing critical paths (the pricing
toggle, the footer newsletter form, the `#features` anchor fixed in
the prior change, nav routing) as well as coverage for the new
sections. This proposal introduces that test infrastructure as part
of the same change, since the restructure is what makes tests
necessary right now.

## What Changes

- **Restructure `content/0.index.yml` and `app/pages/index.vue`**
  around Udemy's pattern, adapted to Skilleate's single-product
  reality:
  - Keep the existing hero (title/description/CTA/`ProductPreview`) —
    Udemy's own hero is a thin promotional card, not a pattern worth
    copying; Skilleate's hero already earns its space.
  - **New: tabbed skill-category browser** — replaces the "Built for
    every kind of learner" section with a tabbed filter (e.g. "Data
    & Analytics", "Programming", "Design", "Career skills") each
    revealing a small set of real Skilleate content-track cards
    (title, level, one metric that's actually true — e.g. "12
    lessons" — never a fabricated rating/learner count).
  - **New: "Reimagine your career" conversion band** — a full-width
    dark band (asymmetric split: benefit checklist + illustrative
    visual) with a single CTA, positioned between the features grid
    and testimonials — mirrors Udemy's mid-page conversion band
    structure without its unrelated "AI era" copy.
  - **New: "Popular Skills" dense index section** — a multi-column
    text-link list of skill/topic names grouped by category (mirrors
    Udemy's footer-adjacent skill index), driving to in-page anchors
    or `/pricing`, not fabricated external course counts.
  - Testimonials section: kept, unchanged (already real-shaped
    placeholder content per the prior messaging change).
  - CTA section: kept, unchanged.
- **Restructure `AppFooter.vue`** into a denser multi-column layout
  (mirrors Udemy's 4-column About/Discover/Business/Legal footer
  pattern) using only routes/sections that actually exist on this
  site — no invented "Careers"/"Investors" links to nowhere.
- **New capability: test infrastructure.** Add `@nuxt/test-utils` +
  `vitest` + `@vue/test-utils` + `happy-dom` + `playwright-core` (dev
  dependencies only, no runtime/production impact). Write:
  - Unit/component tests for existing critical interactive paths
    (pricing monthly/yearly toggle, footer newsletter form submit
    state, nav active-link logic) as a regression safety net for
    this restructure.
  - Component tests for every new interactive element this proposal
    introduces (skill-category tabs, new footer links).
  - Wire `pnpm test` script + a CI job in `.github/workflows/ci.yml`
    running after lint/typecheck.
- No new routes, no backend/auth/third-party integration, no
  fabricated social-proof numbers. **Not BREAKING** — same routes,
  additive sections plus one footer restructure.

## Capabilities

### New Capabilities
- `homepage-udemy-inspired-structure`: the homepage SHALL present a
  tabbed skill-category browser, a mid-page conversion band, and a
  dense "Popular Skills" index section, styled consistently with the
  existing warm-editorial token system, with zero fabricated trust
  signals (no invented ratings, learner counts, or company logos).
- `automated-test-coverage`: the project SHALL have an automated unit/
  component test suite (Vitest + `@nuxt/test-utils`) covering existing
  critical interactive paths and every new interactive element
  introduced by this change, run in CI on every push.

### Modified Capabilities
- None. `learning-platform-messaging` (narrative) and
  `warm-editorial-visual-identity` (tokens) are both extended by, not
  contradicted by, this structural change — no existing requirement
  in either spec is altered.

## Tracking Issue

Closes #15.
