## 1. Critical accessibility fixes

- [ ] 1.1 Add `aria-label="Sign in"` to the icon-only mobile login
      `UButton` in `app/components/AppHeader.vue:56-62`.
- [ ] 1.2 Replace `app/components/PromotionalVideo.vue`'s Cloudinary
      Nuxt UI Pro demo video with a static illustrative graphic
      (mocked agent-guidance/progress-tracking UI composition built
      from existing tokens/primitives) — repurpose or rename the
      component accordingly; remove the `<video>` element and its
      third-party asset URLs entirely.
- [ ] 1.3 Add a `prefers-reduced-motion: reduce` media query to
      `app/components/StarsBg.vue`'s `.star-layer` animation
      (`app/components/StarsBg.vue:169-182`) that disables the
      animation under that preference.
- [ ] 1.4 Add a `prefers-reduced-motion: reduce` guard to
      `app/components/HeroBackground.vue`'s mount-triggered fade-in
      (`app/components/HeroBackground.vue:7-14`) so the graphic renders
      at final opacity immediately for users with that preference.

## 2. Pricing toggle fix

- [ ] 2.1 Enlarge the Monthly/Yearly `UTabs` control in
      `app/pages/pricing.vue:37-48` from `size="xs"` (24px) to a
      token-appropriate size meeting the 44px preferred target
      (`AGENTS.md` §9.10).
- [ ] 2.2 Smoke-test with a real mouse click (not just a code read)
      that clicking the Yearly tab updates `aria-selected` and the
      displayed plan prices. If the resize alone does not fix it,
      escalate: add an explicit click handler or investigate the
      reka-ui `Tabs` pointer-event integration rather than shipping an
      unverified toggle.

## 3. Footer fixes

- [ ] 3.1 In `app/components/AppFooter.vue:2-35`, add real `to` routes
      for footer items with an existing page (`Docs` → `/docs`,
      `Pricing` → `/pricing`, `Blog` → `/blog`, `Changelog` →
      `/changelog`); remove items with no corresponding route today
      (`Help center`, `Roadmap`, `Courses`, `For teams`, `Certificates`,
      `Become an instructor`, `About`, `Careers`).
- [ ] 3.2 Reset `loading.value = false` after the toast in
      `onSubmit` (`app/components/AppFooter.vue:42-49`).

## 4. Homepage visual restructure

- [ ] 4.1 Replace both `ImagePlaceholder` usages in
      `app/pages/index.vue:39-49` with real illustrative visuals (one
      per feature section) built from existing UI primitives/tokens —
      no external stock imagery.
- [ ] 4.2 Restructure the 6-item feature grid
      (`app/pages/index.vue:51-63`) into a bento layout, promoting one
      lead tile (the audit suggests "Personalized learning paths") to
      a larger grid area using existing Tailwind grid utilities at
      current breakpoints.
- [ ] 4.3 Reduce the testimonials block (`app/pages/index.vue:65-87`)
      to 4 featured testimonials above the fold (selected for
      outcome/persona diversity per design.md D8), moving the
      remaining 5 behind a "See more stories" disclosure using the
      existing `UAccordion`/`UCollapsible` primitive.
- [ ] 4.4 Apply one editorial (`fontFamily.serif`) typographic moment
      to one of the 4 featured testimonials (a pull-quote treatment),
      and alternate section backgrounds using
      `semantic.surface.sunken` where sections currently share the
      same background, per design.md D9. No new tokens.

## 5. Verification (live, not just build)

- [ ] 5.1 `python3 .design-system/scripts/check_no_emoji.py` against
      every changed file.
- [ ] 5.2 `python3 .design-system/scripts/validate_contrast.py
      .design-system/tokens/colors.json` — confirm no regression from
      the pre-change baseline (all required pairs already pass).
- [ ] 5.3 `python3 .design-system/scripts/lint_hardcodes.py` against
      every changed `.vue` file — confirm no new raw hex/px values were
      introduced.
- [ ] 5.4 Browser-render `/` at mobile (~375px), tablet (~768px), and
      desktop (~1280px); confirm every scenario in
      `specs/landing-visual-quality/spec.md` that applies to the
      homepage.
- [ ] 5.5 Browser-render `/pricing`; confirm the toggle scenario with a
      real mouse click (see 2.2), and confirm the footer-navigation
      scenarios.
- [ ] 5.6 Test with `prefers-reduced-motion: reduce` emulated in the
      browser; confirm both motion scenarios (starfield stops, hero
      fade-in is instant).
- [ ] 5.7 `pnpm build`, `pnpm typecheck`, `pnpm lint` all pass clean.
