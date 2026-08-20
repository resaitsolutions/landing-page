## Context

The repo is a Nuxt 4 static/SSR-hybrid marketing site (see the
archived `nuxt-app-scaffold` spec): a `saas`-template-derived
marketing site at the root routes (`/`, `/pricing`, `/blog`, `/docs`,
`/changelog`, `/login`, `/signup`), extending a separate dashboard
layer at `/app/*` that is out of scope here (its copy is
product-dashboard mock data, not sales narrative).

All homepage and pricing copy currently lives in
`content/0.index.yml` and `content/2.pricing.yml` (Nuxt Content
collections rendered by `app/pages/index.vue` and the pricing page),
plus copy embedded directly in Vue components (`AppHeader.vue`,
`AppFooter.vue`, `app/app.vue`) and page-level `useSeoMeta`/OG-image
calls. None of this is hardcoded design tokens (colors/spacing/etc.)
— it's prose content, so `.design-system/scripts/lint_hardcodes.py`
does not apply; the relevant gate here is `check_no_emoji.py` (new
copy must stay emoji-free per `AGENTS.md` §9.2) and a manual read for
tone/voice against `.design-system/content/voice-tone.md`.

## Goals / Non-Goals

**Goals:**
- Rewrite `content/0.index.yml` (hero, two feature sections, features
  grid, testimonials, CTA) around: Skilleate is a learning platform
  (Udemy/Coursera-style category) whose differentiator is that
  progress tracking, personalized guidance, and mentoring are
  delivered by AI agents (Rumbor Platform's agentic core), supervised
  by humans — not by how course content is produced.
- Rewrite `content/2.pricing.yml` plan tiers, features, and FAQ for a
  learner audience (course access tiers, agent-guided mentoring
  scope, progress tracking/certificates) — replacing the leftover
  storage/domain/SSL SaaS-infra features and Lorem-ipsum FAQ.
- Update the primary nav (`AppHeader.vue`), footer columns
  (`AppFooter.vue`), site `titleTemplate` and OG image references
  (`app/app.vue`, `app/pages/index.vue`) to match the new brand name
  and narrative.
- Keep every change to prose/copy/labels/links only — zero new
  components, zero new routes, zero behavioral change to any Vue
  component's logic.

**Non-Goals:**
- The `/docs`, `/blog`, `/changelog` content trees are **not**
  touched. `/docs` genuinely documents this Nuxt Content/Nuxt UI
  setup (framework usage instructions, e.g. "Nuxt UI component
  library") — accurate technical documentation about the site's own
  stack, not sales narrative, and out of scope. `/blog` and
  `/changelog` sample posts are template filler content unrelated to
  either narrative; rewriting them is a separate, later content pass
  (explicitly deferred, not silently dropped — tracked as a follow-up
  idea, not a task here).
- No mention anywhere in the new copy of *how* course content itself
  is authored/produced (confirmed with the user: the sales narrative
  is 100% the AI-agent-guided learner experience, not content
  generation).
- No backend/auth/analytics/third-party integration (gate C3/C4) —
  pure C2 static content edit.
- No new design tokens, color palette, or visual redesign. Reuses the
  existing token system and `OgImage/Saas.takumi.vue` component
  as-is (only the text props passed to it change, e.g. via
  `defineOgImage('Saas', { title, description })` calls already
  present in every page — no new OG-image component).
- The dashboard layer (`/app/*`, `skilleate-dashboard-layer`) is a
  separate, pinned remote dependency with its own mock-data copy —
  untouched by this change (matches `nuxt-app-scaffold`'s own
  non-goal for the dashboard's content).

## Decisions

- **Positioning frame: "Udemy/Coursera, but agent-guided."** Naming
  the reference category directly (rather than inventing an abstract
  new category) gives visitors instant orientation on what kind of
  product this is, then differentiates on the agentic-guidance layer
  — this matches how the user described the pitch. Rejected
  alternative: a category-of-one pitch ("the first agentic learning
  OS") — rejected because it burns the visitor's first few seconds on
  category education instead of the actual differentiator, and this
  is gate C2 messaging validation, not a full brand-strategy exercise.
- **Audience: dual-track (non-technical learners + upskilling
  technical professionals), stated explicitly in the hero/features
  copy** rather than picking one persona. Rejected alternative:
  develop-only positioning (matches old SaaS copy's implicit
  audience) — rejected, contradicts the explicit brief that
  non-technical learners are a primary audience too.
- **Agent-guidance as the single differentiator, humans-supervise
  framed as a trust signal, not a hedge.** Every mention of "AI
  agents" pairs with "supervised by humans" in the same sentence or
  adjacent copy block (never agents-alone) — this is a considered,
  user-specified trust/safety framing for an education product,
  not an incidental caveat to bury in an FAQ.
- **Reuse existing page/section structure (`UPageHero`,
  `UPageSection`, `UPageGrid`, `UPageColumns`, `UPageCTA`), change
  only the `content/*.yml` data feeding them.** The existing
  component tree already expresses a hero → two feature sections →
  features grid → testimonials → CTA narrative arc that maps
  cleanly onto a learning platform pitch (hero = the promise,
  feature sections = "how agent guidance works" + "built for every
  learner", grid = platform capabilities, testimonials = learner
  outcomes, CTA = sign up). Rejected alternative: redesign the page
  structure/add new section components — rejected, no content or
  layout gap requires new component work, and doing so would violate
  the token→component→page composition order for a change that is
  purely a copy substitution.
- **Testimonials: rewritten as illustrative example content, not
  fabricated real endorsements.** The current testimonials are
  already fictional (SaaS-developer personas with stock avatars from
  `i.pravatar.cc`); the replacement testimonials use similarly
  clearly-generic learner personas (name + role/context + quote) in
  the same structural shape — this is placeholder/example marketing
  copy exactly as the template already ships it, not a claim of real
  customer testimonials requiring provenance. Flagged here for
  transparency, not hidden.
- **Pricing tiers keep the existing 3-tier Basic/Standard/Premium
  shape and monthly/yearly toggle**, remapping features to
  course-access/mentoring-scope/certificate tiers instead of
  storage/domains — matches the existing `PricingPlans`/pricing.yml
  schema with no code changes, only content substitution.

## Risks / Trade-offs

- **No real product yet to validate claims against.** This is a
  landing-page messaging pass ahead of the actual agentic tutoring
  product being built; copy describes capabilities (progress
  tracking, personalized guidance, human-supervised agents) that must
  be true by the time this ships to real traffic. Mitigated by
  keeping claims platform-level and directional ("agents guide your
  learning journey, humans oversee quality") rather than
  over-specific feature claims that could be falsified later
  (e.g., no specific SLA numbers, no fabricated user counts).
- **Testimonials risk reading as real endorsements if not clearly
  framed.** Mitigated by using generic learner personas/roles (no
  claim of a real company or verifiable identity), consistent with
  how the existing template already ships placeholder testimonials —
  but flagged as a judgment call a reviewer should explicitly sign
  off on, not something to wave through silently.
- **`/docs` section will look inconsistent** (still documents "Nuxt
  UI"/"Nuxt Content" framework usage) against the new homepage
  narrative once this ships, since it's out of scope. Accepted
  trade-off for this change's scope; tracked as a natural follow-up,
  not silently ignored.
- **OG image / social preview copy correctness.** `og:image` still
  routes through the existing `nuxt-og-image` module and
  `OgImage/Saas.takumi.vue` component (name unchanged, only its text
  props change) — verified via the module's own render pipeline, not
  a new asset; low risk but worth an explicit visual check in
  Verification (screenshot the generated OG image, not just the
  page).

## Rejected Alternatives

- **Full visual/design-token redesign alongside the messaging
  pivot**: rejected — nothing about the visual identity (colors,
  type, spacing) needs to change for this narrative; conflating a
  copy pivot with a redesign inflates scope and review risk for no
  stated benefit. A future `redesign`/`apply-aesthetic` pass can
  layer on top once the messaging is validated.
- **Also rewriting `/docs`, `/blog`, `/changelog` in this same
  change**: rejected — these are lower-traffic, secondary pages
  (`/docs` is legitimately about the site's own Nuxt stack; blog/
  changelog are template filler unrelated to either narrative) and
  bundling them would triple the review surface for a proposal whose
  goal is validating the *primary* sales narrative first.
