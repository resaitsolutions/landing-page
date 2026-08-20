## Why

Skilleate's landing page still runs on the unmodified Nuxt UI `saas`
template's visual identity: `primary: 'blue'` / `neutral: 'slate'`
(`app/app.config.ts`), the default Inter-only sans stack, and stock
Tailwind blue accents throughout. The two prior changes on this repo
(`agentic-learning-platform-messaging`, `landing-visual-improvements`)
rewrote copy and fixed structural/accessibility issues but explicitly
deferred visual identity — the prior design audit's `design.md`
states "no design-token redesign alongside the messaging pivot...
A future `redesign`/`apply-aesthetic` pass can layer on top." That
pass is due now: a generic blue SaaS palette undersells an
AI-guided-learning brand and reads as templated, not designed. This
change also fixes two real defects found during discovery — a
same-page anchor link (`#features`) that never resolves because the
target section has no matching `id`, and two hardcoded raw hex values
in `StarsBg.vue` with no documented exception — while the accent
palette is being re-touched anyway. Gate: **C2** (content/styling on
the existing static site; no backend, auth, third-party integration,
or hosting change).

## What Changes

- Replace the default Nuxt UI `blue`/`slate` palette with a warm
  editorial direction: register an 11-shade custom `terracotta` color
  (`.design-system/taste/aesthetic-systems.md` → Editorial Minimalism
  / `warm-editorial` archetype kin) as `ui.colors.primary`, and switch
  `neutral` from `slate` (cool blue-gray) to `stone` (warm gray,
  Tailwind's own default palette — no custom values needed) in
  `app/app.config.ts` + `app/assets/css/main.css` (`@theme` block).
  Every new color pair is contrast-verified (see `design.md`).
- Fix the hero CTA anchor: "See how it works" (`content/0.index.yml`
  hero link) targets `#features`, and the matching section
  (`sections[0]`, `id: features`) never receives that `id` on its
  rendered `UPageSection` in `app/pages/index.vue` — the click
  currently does nothing. Wire the `id` through so the anchor
  resolves.
- Remove the two raw hex values (`#d9d9d9`, `StarsBg.vue` mask
  gradient) that carry no `ds-allow-hardcode` exception — replace
  with the new neutral-stone scale via CSS custom property, or add a
  justified exception comment if a literal mask-alpha value is
  genuinely necessary.
- Update the two brand surfaces that hardcode the old primary color
  family so they track the new terracotta accent: `AppLogo.vue` (pure
  text now, unaffected structurally — confirms no hex to change) and
  `OgImage/Saas.takumi.vue` (`bg-primary-400`/`text-primary-400`
  classes already resolve semantically — no hardcoded value, verified
  during discovery, listed here for completeness/non-goal clarity).
- No new pages, routes, components, copy narrative changes, or
  third-party integrations. **Not BREAKING** — same page structure,
  same components, same routes; only token values, one missing `id`
  attribute, and two raw hex literals change.

## Capabilities

### New Capabilities
- `warm-editorial-visual-identity`: the site SHALL present a
  terracotta-accented, warm-neutral (stone) visual identity in place
  of the default Nuxt UI blue/slate palette, verified against WCAG
  2.2 AA contrast in both light and dark mode, with zero
  undocumented hardcoded color values.

### Modified Capabilities
- None. No existing spec covers page copy/structure/token values —
  `learning-platform-messaging` (prior change) covers narrative
  content only, untouched here.

## Tracking Issue
Closes #12.
