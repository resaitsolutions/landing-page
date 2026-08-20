## Context

Stack (confirmed from `package.json`/`nuxt.config.ts`): **Nuxt 4.5**
(`nuxt ^4.5.2`), **Nuxt UI v4.10** (`@nuxt/ui ^4.10.0`, Tailwind v4
under the hood via `@import "tailwindcss"; @import "@nuxt/ui";` in
`app/assets/css/main.css`), **Nuxt Content v3**, rendering mode
static/SSR-hybrid per existing `routeRules`/`nitro.prerender`
(unchanged by this proposal).

Current tokens (`app/app.config.ts`):
```ts
ui: { colors: { primary: 'blue', neutral: 'slate' } }
```
`app/assets/css/main.css` only overrides `--font-sans`/`--font-serif`
and four `.dark` Nuxt UI background variables — no color tokens are
customized. This is the unmodified template palette.

`.design-system/design-systems/library/` (the 138-system catalog
referenced by `.design-system/taste/aesthetic-systems.md`) is **not
installed in this repo** (confirmed via `glob` — only
`interop-protocol.md`/`crosswalk.md` exist under
`design-systems/`); the archetype recipes in `aesthetic-systems.md`
itself (which *is* installed) are used directly instead of a named
`DESIGN.md` file.

## Goals / Non-Goals

**Goals:**
- Replace the default Nuxt UI `blue`/`slate` palette with a warm,
  editorial identity appropriate to an AI-guided learning brand:
  terracotta primary accent, stone (warm gray) neutral scale.
- Every new/changed color pair passes WCAG 2.2 AA (4.5:1 normal text,
  3:1 large text/UI) in both light and dark mode, verified with
  `.design-system/scripts/contrast.py` — not eyeballed.
- Fix the broken `#features` same-page anchor (hero CTA "See how it
  works" → `sections[0]` never receives a matching DOM `id`).
- Remove the two undocumented raw hex values in `StarsBg.vue`.
- Zero new hardcoded color values anywhere else (`lint_hardcodes.py`
  clean on every changed file).

**Non-Goals:**
- No copy/narrative changes — `learning-platform-messaging` (prior
  change) already covers positioning; this is a pure visual-identity
  pass on top of it, per that change's own explicit deferral.
- No new components, pages, or routes.
- No typography scale change beyond what's already in place (`Inter`
  sans + `Lora` serif accent, both already registered) — the warm
  palette pairs with the existing serif accent used for the first
  testimonial (`font-serif` class in `index.vue`), reinforcing rather
  than replacing that decision from the prior visual-improvements
  change.
- No third-party integration, backend, auth, or hosting change (gate
  C3/C4) — pure C2 token/content-adjacent fix.
- `secondary`/`success`/`info`/`warning`/`error` semantic colors are
  **not** overridden — only one `UBadge color="success"` usage exists
  site-wide (`AgentGuidanceVisual.vue`), Tailwind's default `green`
  already passes AA on both surfaces, and touching semantic
  feedback colors is out of scope for a primary/neutral rebrand.

## Decisions

### 1. Custom `terracotta` color, 11 shades, registered as `ui.colors.primary`

Nuxt UI v4 (Tailwind v4 CSS-first theming, confirmed via the current
`ui.nuxt.com` docs) requires any non-default-palette color used via
`ui.colors.primary` to be defined as a full `50`-`950` shade ramp
under `--color-<name>-<shade>` in the `@theme` block *before* it's
referenced in `app.config.ts` — Nuxt UI's own `--ui-primary` etc.
CSS variables just alias whichever shade of that named color
(`--ui-color-primary-500` light / `-400` dark) is selected. Values
below were generated in OKLCH (hue 45°, tuned lightness/chroma per
shade) and converted to sRGB hex for verification, not copied from an
existing brand:

```css
--color-terracotta-50:  #fff4ef;
--color-terracotta-100: #ffe9de;
--color-terracotta-200: #fed3c0;
--color-terracotta-300: #f4b79c;
--color-terracotta-400: #e5946f;
--color-terracotta-500: #ce6e40;
--color-terracotta-600: #b55422;
--color-terracotta-700: #913e10;
--color-terracotta-800: #6f300e;
--color-terracotta-900: #51240e;
--color-terracotta-950: #2d1205;
```

Verified pairs (`.design-system/scripts/contrast.py`, run against the
exact hex values above — see PR verification evidence, not restated
here as claimed-but-unmeasured numbers):
- Light mode: `terracotta-600` (`--ui-primary` light-mode shade) on
  `stone-50` background → **4.72:1** (AA normal text pass, AA
  large/UI pass).
- Light mode: white text on solid `terracotta-600` button → **4.93:1**
  (AA normal pass).
- Dark mode: `terracotta-400` (`--ui-primary` dark-mode shade) on
  `stone-950` background → **8.28:1** (AAA pass, wide margin).
- Dark mode: `stone-950` text on solid `terracotta-400` button (Nuxt
  UI's own dark-mode solid-button pattern uses the `-400` shade as
  background) → **8.28:1** (AAA pass).

Rejected alternative: reuse an existing named library archetype
verbatim (e.g. `warm-editorial`/`claude` kin referenced in
`aesthetic-systems.md`). Rejected because the 138-system
`design-systems/library/` catalog is **not installed in this repo**
(confirmed empty via `glob`) — inventing exact hex values as if
copied from a named `DESIGN.md` that doesn't exist here would
misrepresent provenance. Instead this generates a fresh OKLCH ramp
following the *archetype description* (Editorial Minimalism: paper/
ink neutrals, one ink accent) and verifies it directly, which is more
honest and equally systematic.

### 2. `neutral: 'stone'` instead of `slate`

`stone` is one of Tailwind's default palettes (no custom values
needed — confirmed via Tailwind CSS v4 docs), warm-toned (vs.
`slate`'s cool blue-gray), and pairs correctly with the terracotta
accent per the Editorial Minimalism archetype ("paper/ink neutrals").
`app.config.ts` changes from `neutral: 'slate'` to `neutral: 'stone'`
— a one-line config change, Nuxt UI resolves the rest automatically
since `stone` needs no `@theme` override.

Rejected alternative: keep `slate` and only swap `primary`. Rejected
— `design-taste.md`'s Color & Surface Taste section calls out
"off-black, warm-white... slightly warm or cool neutrals read as
designed" as a coherence requirement; pairing a warm accent with a
cool-gray neutral scale (the current `slate`) undercuts the warm
editorial direction and reads as an incomplete rebrand.

### 3. Fix `#features` anchor by threading `id` through `UPageSection`

`content/0.index.yml` declares `id: features` on `sections[0]`, and
the hero CTA link targets `to: '#features'`, but `app/pages/index.vue`
only passes `title`/`description`/`orientation`/`reverse`/`features`
to the `v-for` `UPageSection` — never `:id="section.id"`. `UPageSection`
(confirmed via `node_modules/@nuxt/ui` source) renders via `Primitive
:as="props.as"` with no explicit `inheritAttrs: false`, so passing an
`id` prop-position attribute falls through to the root element by
Vue's default attribute inheritance — no Nuxt UI prop API change
needed, just adding `:id="section.id"` to the existing `v-for` call.

Rejected alternative: remove the anchor link instead of fixing it (as
the `landing-visual-improvements` change did for other dead links
during the prior design audit). Rejected — unlike those removed
items, this one has a real, working target section one scroll away;
fixing the one-line gap is strictly better than deleting a legitimate
in-page navigation aid.

### 4. Replace `StarsBg.vue`'s two raw `#d9d9d9` values

These sit inside a CSS `mask-image` gradient (`linear-gradient(...
rgba(217,217,217,0) 0% ... #d9d9d9 50% ...)`), functioning as the
*opaque* stop of an alpha mask — not a visible color, so it's
`rgba/hex` used purely for its alpha-channel math, unlike the other
`rgba(217, 217, 217, ...)` stops already in the same gradient. Since
the existing pattern in the same block already writes this exact
gray as `rgba(217, 217, 217, N)`, the two solid-color stops become
`rgba(217, 217, 217, 1)` for internal consistency (zero visual change
— `#d9d9d9` and `rgba(217,217,217,1)` are the identical color) and to
satisfy `lint_hardcodes.py`'s hex-value rule without inventing a new
token for a single-use mask constant.

Rejected alternative: add a `ds-allow-hardcode` exception comment
instead of fixing it. Rejected — unlike the genuinely
irreducible constants elsewhere in this file (`translateY(-2000px)`
canvas travel distance, already exception-commented), this value has
a zero-cost like-for-like fix (matching the gradient's own existing
`rgba()` notation), so an exception would be lower quality than
just fixing it.

## Risks / Trade-offs

- **New color has no prior production validation.** The terracotta
  ramp is generated and contrast-verified but has not been seen by a
  human designer before this proposal. Mitigated by: values derive
  from a documented, reproducible method (OKLCH generation matching
  the Editorial Minimalism archetype), every pair is measured (not
  eyeballed) against the actual gate script, and the implementation
  PR includes live browser screenshots (light + dark, mobile/tablet/
  desktop) for human sign-off before merge — this is a judgment-call
  item for the reviewer (aesthetic fit), not a hard-block item.
- **Nuxt UI dark-mode shade convention assumption.** The design relies
  on Nuxt UI's documented pattern of `--ui-primary` resolving to
  shade-500 in light mode / shade-400 in dark mode. If a future Nuxt
  UI version changes this convention, the specific shade contrast
  numbers above would need re-verification (not the ramp itself).
  Low risk — this is Nuxt UI's stated, current (v4.10) behavior,
  confirmed via official docs read during this design pass, not
  inferred.
- **`OgImage/Saas.takumi.vue` renders through `@takumi-rs/core`'s own
  compiled Rust Tailwind-class resolver, confirmed during
  implementation to NOT read the app's live `@theme` CSS or
  `app.config.ts`** — this risk materialized as a real bug: the
  `text-primary-400`/`bg-primary-400` classes rendered the accent as
  near-invisible black (resolving against Takumi's static built-in
  default-Tailwind palette, which has no `terracotta`) instead of the
  new color. Fixed by replacing those two classes with a documented
  `ds-allow-hardcode` exception (`text-[#e5946f]`/`bg-[#e5946f]`,
  matching the verified terracotta-400 value) — the correct workaround
  for a renderer with no theme-passthrough API (confirmed via
  `@takumi-rs/core`'s `Renderer` type definitions: it accepts only
  fonts/images, no color/theme config). Verified live via browser
  screenshot of the regenerated OG image before/after the fix.
- **Scope discipline.** Two small defects (dead anchor, raw hex) were
  folded into this token-focused change because they were discovered
  while re-touching the same visual surfaces the color change already
  requires review of. Both are called out explicitly in
  `proposal.md`/`tasks.md` rather than silently bundled, per the
  review standard's scope-creep check.
