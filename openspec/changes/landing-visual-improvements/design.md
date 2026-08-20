## Context

Marketing homepage (`/`) and pricing page (`/pricing`) currently score
6.0/10 weighted against `.design-system/workflows/design-review.md`
(`docs/design-audits/2026-08-20-landing-audit.md`). The narrative pivot
(PR #6) is done and stays untouched; this change addresses the
remaining visual/UX/accessibility/interaction gaps the audit found.

## Goals / Non-Goals

**Goals:**
- Fix all 3 Critical accessibility findings (unnamed icon-only control,
  captionless third-party video, motion with no reduced-motion
  fallback).
- Fix the confirmed pricing-toggle mouse-interaction gap and its
  undersized hit target.
- Fix dead footer navigation and the stuck newsletter loading state.
- Replace placeholder graphics with real illustrative product visuals.
- Restructure the feature grid and testimonial block for better visual
  hierarchy (bento lead tile; 3-4 featured testimonials).
- Apply the recommended High-End Agency + Editorial Minimalism
  direction using only the existing token system.

**Non-Goals:**
- No copy/narrative changes (`content/0.index.yml`,
  `content/2.pricing.yml` prose stays as merged in PR #6; only which
  existing testimonial entries render, and where, changes — no new or
  reworded text).
- No new routes, backend, auth, or third-party integrations.
- No custom logo mark, course-catalog/browse strip, or pricing
  comparison table — these are Enhancement-tier per the audit and
  explicitly deferred to a later change (see proposal.md).
- No new design tokens (colors, spacing, radii, fonts) — every visual
  change re-composes tokens already defined in `.design-system/tokens/`.

## Decisions

### D1 — Icon-only header control (C1)
Add `aria-label="Sign in"` to the mobile login shortcut
(`AppHeader.vue:56-62`). One-line fix, no alternative considered — this
is the textbook fix for WCAG 4.1.2 on an icon-only control that already
has a clear single purpose.

### D2 — Captionless third-party video (C2)
`PromotionalVideo.vue` embeds a Cloudinary-hosted Nuxt UI Pro demo video
with no caption track — both a third-party-asset problem (same category
as the logo issue already fixed in PR #6) and a WCAG 1.2.1/1.2.2 gap.
**Decision: replace the video with a static illustrative product
visual** (a mocked screenshot-style graphic depicting an agent-guidance/
progress-tracking UI, consistent with the homepage copy) rather than
producing a new video. **Rejected alternative:** add a caption track to
a *new* Skilleate demo video — rejected because no real product video
exists yet (the agentic product itself isn't built), and fabricating a
video with invented UI would overstate current capability; a labeled
illustrative static graphic makes no false claim and is honest about
what exists today. The component is renamed/repurposed accordingly
(see tasks.md) rather than kept as a video component with no video.

### D3 — Motion with no reduced-motion fallback (C3)
Two distinct cases, different severity:
- `StarsBg.vue:169-182`: a genuinely infinite, 3-layer, 300-star CSS
  animation behind the CTA. **Decision:** wrap `.star-layer`'s animation
  in `@media (prefers-reduced-motion: reduce) { animation: none; }`,
  per `.design-system/taste/motion-choreography.md`'s explicit pattern
  for perpetual/loading-style motion. This is the higher-severity case
  (continuous, unbounded).
- `HeroBackground.vue:7-14`: a single one-shot opacity fade-in (≤1000ms)
  on mount, not a loop. **Decision:** still add the reduced-motion
  guard (skip the delayed reveal, render at final opacity immediately)
  for correctness and consistency with the doctrine, but this is lower
  risk in practice than `StarsBg` and is sequenced after it.

### D4 — Pricing toggle (M4)
**Investigated live, not assumed.** Re-tested in this design phase
(headless browser, `http://localhost:3000/pricing`):
- Keyboard interaction (`ArrowRight` after focusing the tablist) DOES
  correctly change `aria-selected` and update displayed prices to the
  yearly values ($99.9/$199.9/$299.9). The component's underlying
  state/logic is NOT broken.
- A real mouse click (`page.mouse.click` at the tab's screen
  coordinates) and a synthesized full `pointerdown`+`pointerup`+`click`
  event sequence both consistently fail to change `aria-selected` or
  the displayed price, across three independent test methods.
- **This is inconclusive as a "broken for all real users" claim** — it
  may be specific to this sandbox's headless Chromium automation
  rather than a real desktop-browser mouse click, and I cannot fully
  rule that out from this environment alone.
- **Decision:** treat this as a Major, verify-again-post-fix item, not
  assume the pointer path is broken by design. The concrete fix applied
  regardless: enlarge the tab control from `size="xs"` (24px, below the
  AA floor) to a token-appropriate size (44px preferred target per
  `AGENTS.md` §9.10) — this alone may resolve the click-target issue if
  root-caused to hit-area/geometry rather than event handling. Tasks.md
  requires an explicit **real-mouse-click** smoke test after the resize
  (not just a code read) before this is marked done; if the resize
  alone does not fix it, escalate as a confirmed reka-ui/Reka Tabs
  integration bug requiring a deeper fix (e.g. explicit `@click`
  handler bypassing the primitive's internal pointer logic), not
  silently ship an unverified toggle.

### D5 — Dead footer links + stuck loading state (M5, M6)
`AppFooter.vue`'s `columns` array items have no `to`, so
`UFooterColumns` renders `<button>`s with no destination — violates the
button-vs-link ARIA convention. **Decision:** add real `to` routes for
items with an existing page (`Docs` → `/docs`, `Pricing` → `/pricing`,
`Blog` → `/blog`, `Changelog` → `/changelog`); remove items with no
corresponding route today (`Help center`, `Roadmap`, `Courses`, `For
teams`, `Certificates`, `Become an instructor`, `About`, `Careers`) —
**rejected alternative:** stub pages for all of them — rejected as
scope creep for a visual-quality change; shipping a footer link to a
placeholder/empty page is worse than omitting the link, and creating
7 new pages is a different, larger change. Reset `loading.value = false`
after the toast in `onSubmit` (`AppFooter.vue:42-49`).

### D6 — Placeholder graphics → real visuals (M1)
Both feature-section slots currently render `ImagePlaceholder.vue`
(a dashed empty box) via `app/pages/index.vue:39-49`. **Decision:**
replace with a static illustrative graphic per section (one depicting
personalized progress tracking, one depicting human-supervised agent
guidance) built from existing UI primitives/tokens (e.g. a mocked
dashboard card composition), not an externally sourced stock image —
keeps everything token-driven and avoids reintroducing a third-party-
asset problem. **Rejected alternative:** commission/source real
photography or illustration — rejected as out of scope for this change
(no asset pipeline exists yet); a token-built mock UI graphic is
honest, on-brand, and buildable now with existing primitives.

### D7 — Equal-weight feature grid → bento (M2)
`app/pages/index.vue:51-63` renders 6 `UPageCard spotlight` at uniform
size via `UPageGrid`. **Decision:** promote one item (the audit
suggests "Personalized learning paths" as the lead) to span a larger
grid area via Tailwind grid utilities already available in the token
system (`col-span-2`/`row-span-2` equivalent at the existing
breakpoints), keeping the same 6 underlying feature entries and
`UPageCard` component — a data/layout change, not a new component.

### D8 — 9 testimonials → featured 3-4 + overflow (M3)
`app/pages/index.vue:65-87` renders all 9 testimonial entries from
`content/0.index.yml` in one dense `UPageColumns` block.
**Decision:** render 4 featured testimonials above the fold (chosen for
outcome-story diversity: career-switcher, hobbyist-technical,
human-escalation-story, time-constrained-learner — covering both
non-technical and technical personas per the messaging pivot's dual-
audience requirement) and move the remaining 5 behind a "See more
stories" disclosure using the existing `UAccordion`/`UCollapsible`
primitive (already used elsewhere in this codebase, e.g. the FAQ) —
**rejected alternative:** a carousel — rejected because it requires a
new interaction pattern/dependency not otherwise used in this codebase,
where a simple disclosure achieves the same scroll-depth reduction with
an existing, already-accessible primitive.

### D9 — Editorial Minimalism token application
Per the audit's token mapping (§6 of the audit report): alternate
section backgrounds using `semantic.surface.sunken` (already defined,
currently unused on this page), and use the existing-but-unused
`fontFamily.serif` (Lora) for one pull-quote-style testimonial moment
in the featured set (D8) to add an editorial touch without changing
the UI typeface everywhere. Section vertical spacing moves to the
existing scale's upper steps (80/96px) for breathing room around the
restructured grid/testimonials — no new spacing values.

## Risks / Trade-offs

- **D4's root cause may not be the hit-target size.** If the real-mouse
  smoke test after resizing still fails, this becomes a confirmed
  reka-ui integration bug requiring a workaround (e.g. bypassing
  `UTabs`' internal pointer handling with an explicit click handler) —
  flagged in tasks.md as a possible follow-up rather than silently
  shipped broken.
- **D6's mocked UI graphics are illustrative, not real product
  screenshots** (the actual agentic product doesn't exist as a UI yet).
  This is honest (no false capability claim) but is a known limitation
  to revisit once a real product surface exists to screenshot.
- **D5 removes several footer links entirely** rather than stubbing
  pages for them — reduces perceived site breadth in the footer;
  accepted trade-off vs. the alternative of linking to non-existent
  pages, which is worse for both users and SEO.
- **D8's testimonial selection is a judgment call** (which 4 of 9 to
  feature) — flagged here for explicit reviewer sign-off, not asserted
  as objectively "the right 4."

## Rejected Alternatives

- **Full visual redesign in one pass** (new component library, new
  layout system): rejected — the audit's own roadmap prioritizes
  fixing existing issues over adding new surface; conflating this with
  a from-scratch redesign inflates review risk with no stated user
  benefit beyond what's scoped here.
- **Deferring accessibility fixes until after the visual restructure**:
  rejected — per the audit's own prioritized roadmap (§7), accessibility
  fixes are cheapest and highest-risk-if-shipped-as-is; sequencing them
  last would mean shipping known accessibility regressions for longer
  than necessary.
