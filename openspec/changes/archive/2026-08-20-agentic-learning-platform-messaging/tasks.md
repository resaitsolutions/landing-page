## 1. Homepage narrative rewrite

- [x] 1.1 Rewrite `content/0.index.yml` hero (`title`, `description`,
      `seo.title`, `seo.description`) to position Skilleate as an
      agent-guided learning platform (Udemy/Coursera category,
      agentic-guidance differentiator, humans supervise).
- [x] 1.2 Rewrite the two `sections` feature blocks (currently
      "Powered by Nuxt UI Components" / "Built for Modern SaaS") to
      cover: (a) how agent guidance works for a learner (progress
      tracking, personalized paths, mentoring, human oversight), and
      (b) built for both non-technical learners and upskilling
      technical professionals.
- [x] 1.3 Rewrite the `features` grid (6 items) to describe
      platform-level learner capabilities (e.g., personalized
      learning paths, 24/7 agent availability with human escalation,
      progress dashboards, skill certificates, community/cohort
      support, broad skill catalog) — no infra/dev-tooling framing.
- [x] 1.4 Rewrite the 9 `testimonials` items with generic learner
      personas (name + role/context + quote) describing outcomes from
      agent-guided learning — same structural shape as the existing
      placeholder testimonials, clearly generic (no real company/
      identity claims).
- [x] 1.5 Rewrite the `cta` block (title, description, links) to
      drive learner sign-up instead of "start building"/GitHub
      template links.

## 2. Pricing page rewrite

- [x] 2.1 Rewrite `content/2.pricing.yml` `title`/`description`/`seo`
      for a learning-platform pricing page.
- [x] 2.2 Rewrite the 3 plan tiers' `features` lists to learner-
      facing value (course catalog access tier, agent mentoring
      session scope, progress tracking, certificates) — remove all
      storage/domain/email/SSL-certificate quota language.
- [x] 2.3 Rewrite the `logos`/"Trusted by" section copy (or remove if
      it no longer fits — infra-provider logos like AWS/Heroku/
      Vercel/Cloudflare/Netlify don't belong on a learning-platform
      pricing page).
- [x] 2.4 Rewrite the 6 FAQ items with real prospective-learner
      questions and answers (how agent guidance works, human
      oversight/safety, refunds, switching plans, what "supervised by
      humans" means) — replace all Lorem-ipsum content.

## 3. Site chrome and metadata

- [x] 3.1 Update `app/app.vue` `useSeoMeta` `titleTemplate` from
      `'%s - Nuxt SaaS template'` to Skilleate's own template.
- [x] 3.2 Update `app/pages/index.vue` fallback `ogImage` URL
      (currently `https://ui.nuxt.com/assets/templates/nuxt/
      saas-light.png`) — confirm how `nuxt-og-image`/`defineOgImage`
      generates the real per-page OG image and whether this static
      fallback constant needs to change or can be removed once the
      dynamic OG image is correct end-to-end.
- [x] 3.3 Update `AppFooter.vue`: remove/replace the GitHub link to
      `nuxt-ui-templates/saas` and its `aria-label="Nuxt UI on
      GitHub"`; rename footer columns/items that don't fit a learning
      platform (e.g., "Affiliates", "Sponsors" under "Features") to
      learning-platform-appropriate items or remove them.
- [x] 3.4 Review `AppHeader.vue` nav items (`Docs`, `Pricing`, `Blog`,
      `Changelog`) — confirm labels still make sense for the new
      narrative or adjust wording only (no new routes).

## 4. Verification (live, not just content diff)

- [x] 4.1 `.design-system/scripts/check_no_emoji.py` against every
      changed `content/*.yml` file and touched `.vue` files — zero
      emoji.
- [x] 4.2 Read the full rewritten homepage and pricing copy end-to-end
      against `.design-system/content/voice-tone.md` for tone
      consistency (clear, concise, human) — not just spec compliance.
- [x] 4.3 `pnpm dev`; browser-render `/` and confirm every spec
      scenario in `specs/learning-platform-messaging/spec.md` is
      observably true on the rendered page (hero copy, no
      content-generation claims, every agent mention paired with
      human-supervision framing, dual-audience explicit).
- [x] 4.4 Browser-render `/pricing`; confirm plan features and FAQ
      read as real learner-facing content, not infra quotas or
      Lorem-ipsum.
- [x] 4.5 Confirm the page `<title>` (browser tab / `document.title`)
      on `/`, `/pricing`, `/blog`, `/docs/getting-started` reflects
      the new title template.
- [x] 4.6 Screenshot or otherwise inspect the generated OG image for
      `/` (via the `nuxt-og-image` dev/preview route) to confirm it
      shows Skilleate's own title/description, not leftover SaaS
      template copy.
- [x] 4.7 `pnpm build`, `pnpm typecheck`, `pnpm lint` all pass clean.
