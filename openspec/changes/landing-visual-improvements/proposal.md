## Why

The `designer`-led audit (`docs/design-audits/2026-08-20-landing-audit.md`)
scored the landing page's current visual/UX state at 6.0/10 weighted
against the repo's design-review rubric. It found 3 Critical
accessibility gaps, 5 Major visual/usability/functional issues, 2 Minor
issues, and 4 Enhancement opportunities — all independent of the
messaging pivot's copy (PR #6, already merged), which stays untouched
here. This is gate C2 (component/layout/interaction and content-
structure changes on the existing static marketing site) — no
backend, auth, or third-party integration changes; the pricing-toggle
fix and footer link fixes touch only client-side interaction and
routing, not any new integration surface.

## What Changes

- Fix 3 Critical accessibility issues: add an accessible name to the
  icon-only mobile login control (`AppHeader.vue`), replace the
  captionless third-party stock video with a captioned Skilleate
  product visual (or a static screenshot) (`PromotionalVideo.vue`),
  and add a `prefers-reduced-motion` fallback to both the hero
  background and starfield animations (`HeroBackground.vue`,
  `StarsBg.vue`).
- Fix the pricing monthly/yearly toggle, verified in the audit to not
  visibly update displayed prices on click, and enlarge its hit target
  from 24px to a standard token-sized control (`pricing.vue`).
- Give every footer navigation item a real destination (`Pricing` →
  `/pricing`, `Blog` → `/blog`, `Docs` → `/docs`, `Changelog` →
  `/changelog`) or remove items with no corresponding page, so
  `UFooterColumns` renders real links instead of inert buttons
  (`AppFooter.vue`).
- Fix the newsletter form's `loading` state never resetting after
  submit (`AppFooter.vue`).
- Replace both empty dashed-placeholder feature-section graphics with
  a real (illustrative) product visual reflecting the agent-guidance/
  progress-tracking narrative already in the copy
  (`ImagePlaceholder.vue` usage in `app/pages/index.vue`).
- Restructure the 6-item feature grid into a bento layout with one
  promoted lead tile instead of 6 equal-weight cards
  (`app/pages/index.vue`, reusing existing `UPageGrid`/`UPageCard`).
- Reduce the 9-testimonial block to 3-4 featured testimonials above
  the fold with an overflow pattern (carousel or "see more") for the
  rest, cutting mobile scroll depth (`app/pages/index.vue`, testimonial
  data already in `content/0.index.yml` — no copy rewrite, only which
  items render where).
- Apply the recommended design direction (High-End Agency + Editorial
  Minimalism) using only the existing token system: alternating
  section backgrounds via `semantic.surface.sunken`, an editorial
  serif accent (`fontFamily.serif`, already defined but unused) for
  one pull-quote-style testimonial moment, larger section spacing at
  the existing scale's upper steps. **No new raw colors, spacing
  values, or fonts.**
- **Deferred to a later change (Enhancement, not required here)**: a
  custom logo mark beyond the current text wordmark, a course-catalog/
  browse strip, and a pricing comparison table + guarantee copy. These
  add new content/visual surface rather than fixing an existing issue,
  and are called out in the audit as lower-priority than the fixes
  above.
- No new routes, no new third-party integrations, no changes to
  `content/0.index.yml` or `content/2.pricing.yml` prose (testimonial
  *selection*/*ordering* for the reduced set uses existing entries
  only). **Not BREAKING** — all changes are additive or corrective to
  existing components.

## Capabilities

### New Capabilities
- `landing-visual-quality`: the marketing homepage and pricing page
  must meet baseline accessibility (no unnamed controls, captioned
  video, motion-safe animations), have fully functional interactive
  elements (working pricing toggle, real footer navigation), and
  present a coherent visual hierarchy (real product visuals in place
  of placeholders, a weighted feature grid, a curated testimonial
  set) consistent with the existing design-token system.

### Modified Capabilities
- None. `nuxt-app-scaffold` and `learning-platform-messaging` (the two
  existing specs) cover routing/layer coexistence and copy narrative
  respectively — neither's behavior changes here.

## Tracking Issue

Closes #8.
