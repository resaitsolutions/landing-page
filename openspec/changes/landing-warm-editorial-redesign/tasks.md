## 1. Color token registration

- [ ] 1.1 Add the 11-shade `--color-terracotta-*` ramp (values in
      `design.md`) to the `@theme static` block in
      `app/assets/css/main.css`.
- [ ] 1.2 Update `app/app.config.ts`: `ui.colors.primary: 'blue'` →
      `'terracotta'`, `ui.colors.neutral: 'slate'` → `'stone'`.

## 2. Bug fixes surfaced during the same visual pass

- [ ] 2.1 `app/pages/index.vue`: add `:id="section.id"` to the
      `v-for` `UPageSection` so the hero's `#features` anchor
      resolves to `content/0.index.yml`'s `sections[0].id: features`.
- [ ] 2.2 `app/components/StarsBg.vue`: replace both `#d9d9d9`
      literals in the `-webkit-mask-image`/`mask-image` gradients
      with `rgba(217, 217, 217, 1)`, matching the notation already
      used by the other stops in the same gradient (zero visual
      change, satisfies `lint_hardcodes.py`).

## 3. Verification

- [ ] 3.1 `python3 .design-system/scripts/contrast.py` against every
      pair listed in `design.md` (light + dark, text + solid-button)
      — confirm the exact ratios stated in `design.md`, not just
      "pass".
- [ ] 3.2 `python3 .design-system/scripts/lint_hardcodes.py app` —
      zero unjustified hardcoded values.
- [ ] 3.3 `python3 .design-system/scripts/check_no_emoji.py` against
      every changed file.
- [ ] 3.4 `pnpm dev`; browser-render `/` in light mode at mobile
      (~375px), tablet (~768px), desktop (~1280px) — confirm
      terracotta/stone identity renders correctly, hero CTA
      "See how it works" scrolls to the features section, no visual
      regression from the prior design audit's fixes (aria-label on
      icon-only login button, bento grid, reduced-motion, pricing
      toggle 44px target, footer links).
- [ ] 3.5 Toggle dark mode (`UColorModeButton`); re-render `/` and
      `/pricing` — confirm the identity re-balances correctly (no
      leftover blue/slate, no contrast regression).
- [ ] 3.6 Screenshot the generated OG image for `/` (`nuxt-og-image`
      dev/preview route) in both modes — confirm
      `OgImage/Saas.takumi.vue`'s semantic `primary-400` classes
      correctly resolve to the new terracotta accent through the
      separate Takumi render pipeline.
- [ ] 3.7 `pnpm build`, `pnpm typecheck`, `pnpm lint` all pass clean.
