## 1. Test infrastructure setup

- [ ] 1.1 Add dev dependencies: `@nuxt/test-utils`, `vitest`,
      `@vue/test-utils`, `happy-dom`, `playwright-core`.
- [ ] 1.2 Add `vitest.config.ts` using `defineVitestProject` with a
      `nuxt` project (`test/nuxt/*.nuxt.spec.ts`, `environment: nuxt`).
- [ ] 1.3 Add `"test": "vitest run"` script to `package.json`.
- [ ] 1.4 Add a `Test` step to `.github/workflows/ci.yml`, after the
      existing `Typecheck` step, same job.

## 2. Regression safety net (existing critical paths)

- [ ] 2.1 `test/nuxt/PricingToggle.nuxt.spec.ts`: mount the pricing
      page's toggle interaction, assert clicking "Yearly"/"Monthly"
      correctly flips `aria-pressed` on both buttons.
- [ ] 2.2 `test/nuxt/AppFooter.nuxt.spec.ts`: mount `AppFooter.vue`,
      assert the newsletter form's loading state is set on submit and
      reset after, and assert every footer link's `to` resolves to a
      route/anchor that exists in the app.
- [ ] 2.3 `test/nuxt/HomepageAnchors.nuxt.spec.ts`: mount the homepage,
      assert the hero's "See how it works" link target and the
      rendered section `id` match exactly (regression guard for the
      anchor bug fixed in the prior visual-redesign change).

## 3. Homepage restructure

- [ ] 3.1 `content/0.index.yml`: add `skillBrowser` data block (4
      categories, 3-4 content-track cards each: title, level,
      one factual descriptor — no fabricated ratings/counts).
- [ ] 3.2 `content/0.index.yml`: add `conversionBand` data block
      (title, benefit checklist of 4 items, single CTA to `/signup`).
- [ ] 3.3 `content/0.index.yml`: add `popularSkills` data block
      (skill names grouped into 3-4 categories, each linking to an
      existing route/anchor).
- [ ] 3.4 New component `app/components/SkillCategoryBrowser.vue`:
      `UTabs` + `UPageGrid`/`UPageCard`, positioned in
      `app/pages/index.vue` between the existing 2 feature sections
      and the features grid.
- [ ] 3.5 New component `app/components/ConversionBand.vue`: dark
      asymmetric-split `UPageCTA`-derived section, positioned between
      the features grid and testimonials in `app/pages/index.vue`.
- [ ] 3.6 New component `app/components/PopularSkillsIndex.vue`:
      dense multi-column skill-link list, positioned after
      testimonials, before the final CTA in `app/pages/index.vue`.
- [ ] 3.7 `app/components/AppFooter.vue`: restructure `columns` from 2
      to 4, using only existing real routes/anchors.

## 4. New-section test coverage

- [ ] 4.1 `test/nuxt/SkillCategoryBrowser.nuxt.spec.ts`: assert
      selecting a category tab updates the visible card set.
- [ ] 4.2 `test/nuxt/ConversionBand.nuxt.spec.ts`: assert the CTA
      link's `to` resolves to `/signup`.
- [ ] 4.3 `test/nuxt/PopularSkillsIndex.nuxt.spec.ts`: assert every
      rendered link's `to` matches an existing app route or in-page
      anchor (no fabricated destination).

## 5. Verification

- [ ] 5.1 `pnpm test` — zero failures, all new + existing-path tests
      pass.
- [ ] 5.2 `python3 .design-system/scripts/contrast.py` against any
      new color pair introduced by the conversion band's dark surface.
- [ ] 5.3 `python3 .design-system/scripts/lint_hardcodes.py app` —
      zero unjustified hardcoded values.
- [ ] 5.4 `python3 .design-system/scripts/check_no_emoji.py` against
      every changed/new file.
- [ ] 5.5 `pnpm dev`; browser-render `/` at mobile/tablet/desktop,
      light + dark — confirm all 3 new sections render correctly,
      tab switching works, conversion-band CTA routes to `/signup`,
      Popular Skills links resolve, footer's 4 columns all resolve.
- [ ] 5.6 `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test` all
      pass clean.
- [ ] 5.7 Leave the dev server running and notify the user it is
      ready for their own live review — do not merge the
      implementation PR until the user explicitly approves after
      reviewing it themselves.
