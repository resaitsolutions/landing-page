## Why

This repo's landing page currently sells the `nuxt-ui-templates/saas`
boilerplate itself — hero, features, testimonials, and pricing all
pitch "100+ Vue components" and "ship your SaaS" to a developer
audience. Skilleate's actual product is an AI-native learning
platform (an Udemy/Coursera-style catalog) whose real differentiator
is that the entire learning *experience* — progress tracking,
personalized guidance, mentoring, unblocking — is delivered by AI
agents (built on Rumbor Platform's agentic core), with humans
supervising rather than manually tutoring every learner. The target
audience is non-technical learners picking up any skill, and
technical learners leveling up — neither of whom is being addressed
by the current dev-tooling pitch. This is gate C2 (content/copy and
information architecture on the existing static marketing site) — no
backend, auth, or third-party integration changes.

## What Changes

- Replace the entire homepage narrative (hero, two feature sections,
  features grid, testimonials, CTA) in `content/0.index.yml` from
  "ship a SaaS with Nuxt UI" to "learn any skill, guided by AI agents
  supervised by humans" — positioned against Udemy/Coursera as the
  reference category, with the agentic-guidance layer as the
  differentiator.
- Replace `content/2.pricing.yml` plan copy (storage/domains/SSL
  placeholder features left over from the SaaS template) with
  learner-facing plan tiers appropriate to a course marketplace
  (e.g., course access, agent-guided mentoring sessions/scope,
  progress tracking, certificates) and rewrite the placeholder
  Lorem-ipsum FAQ with real questions a prospective learner or
  upskilling professional would ask (how agent guidance works, human
  oversight, refunds, plan switching).
- Update primary navigation labels/CTAs in `AppHeader.vue`/
  `AppFooter.vue` and SEO metadata (`app/app.vue` `titleTemplate`,
  page-level `useSeoMeta` calls, `app/types/index.d.ts` `BlogPost`
  copy references only if content requires it) to match the new
  brand narrative — no structural/behavioral change to those
  components, copy only.
- Replace SaaS-audience blog/changelog sample copy is explicitly
  **out of scope** for this change (see Non-goals) — homepage and
  pricing are the two pages that carry the primary sales narrative
  and are the ones a prospective learner lands on first.
- Update `og:image`/social preview copy references tied to the old
  positioning (`Nuxt SaaS Template` OG image string in `app/app.vue`
  and `app/pages/index.vue`) to Skilleate's own copy — reusing the
  existing `OgImage/Saas.takumi.vue` component's structure (title/
  description/headline props), not a new component build.
- No new pages, routes, components, or third-party integrations are
  introduced. **Not BREAKING** — content-only, same page structure/
  components/routes.

## Capabilities

### New Capabilities
- `learning-platform-messaging`: the homepage and pricing page must
  present Skilleate as an AI-agent-guided learning platform (progress
  tracking, personalized guidance, human-supervised agent mentoring)
  positioned against Udemy/Coursera-style competitors, with zero
  mention of how course content itself is authored/produced.

### Modified Capabilities
- None. `nuxt-app-scaffold` (the only existing spec) covers routing/
  layer coexistence, not page copy — untouched by this change.

## Tracking Issue

Closes #4.
