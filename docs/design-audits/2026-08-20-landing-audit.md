# Skilleate landing page — design audit & improvement proposal

**Date:** 2026-08-20
**Scope:** `/` (home) and `/pricing`, post-messaging-pivot (PR #6, agent-guided
learning platform narrative — copy is final and NOT touched here).
**Method:** `designer` subagent audit — see
`docs/design-audits/prompt-template.md` for the exact prompt, and
`docs/design-audits/README.md` for the process this belongs to.
**Screenshots:** `docs/design-audits/2026-08-20-landing-audit/screenshots/`

---

## 1. Score

Weighted per `.design-system/workflows/design-review.md`:

| Dimension | Weight | Score |
|---|---|---|
| Visual Hierarchy | 20% | 6/10 |
| Consistency | 20% | 6/10 |
| Accessibility | 20% | 7/10 |
| Usability | 20% | 6/10 |
| Responsiveness | 10% | 5/10 |
| Performance | 10% | 5/10 |
| **Overall (weighted)** | **100%** | **6.0/10** |

**Rationale:**
- **Visual Hierarchy (6):** Hero title + primary CTA are clear, but two
  placeholder graphics and a borrowed stock video sit where real product
  visuals should be; all 6 feature cards render at equal visual weight
  (no lead item); 9 testimonial cards in a row overwhelm rather than
  build a case.
- **Consistency (6):** Nuxt UI primitives and design tokens are mostly
  coherent (see contrast results below), but the plain-text logo, the
  dashed-placeholder graphics, and a Nuxt UI Pro stock video create a
  visible mismatch with the rest of the token-driven system.
- **Accessibility (7):** All *required* WCAG contrast pairs pass (see §2).
  Landmarks, heading structure, and most ARIA are correct. But: an
  icon-only header control has no accessible name, decorative motion has
  no `prefers-reduced-motion` fallback, and the footer's link-styled
  items render as inert buttons (see §4, Critical).
- **Usability (6):** Primary CTA and pricing toggle intent are
  discoverable, but the pricing toggle did not visibly update prices when
  clicked in testing (see §4, Major), the footer's secondary navigation
  is dead, and there's no real course-discovery or proof surface for a
  learning-platform hero.
- **Responsiveness (5):** No horizontal overflow at 320px (passes the
  reflow floor), but the home page runs ~8,145px tall on mobile and the
  hero heading wraps to 4 lines at that width — density/scan-length is
  poor even where the technical floor is met.
- **Performance (5):** 9 unlazied testimonial-avatar requests, a
  continuously animated 300-star background across 3 layers with no
  reduced-motion gate, and an externally hosted stock video poster all
  add weight without adding value.

---

## 2. Real contrast verification

```
$ python3 .design-system/scripts/validate_contrast.py .design-system/tokens/colors.json

=== LIGHT (required) ===
  PASS body text on page: 17.74:1 (need 4.5)  [#111827 on #ffffff]
  PASS body text on card: 17.74:1 (need 4.5)  [#111827 on #ffffff]
  PASS secondary text on page: 7.56:1 (need 4.5)  [#4b5563 on #ffffff]
  PASS link on page: 5.17:1 (need 4.5)  [#2563eb on #ffffff]
  PASS text on primary action: 5.17:1 (need 4.5)  [#ffffff on #2563eb]
  PASS essential control border (WCAG 1.4.11): 4.83:1 (need 3.0)  [#6b7280 on #ffffff]

=== DARK (required) ===
  PASS body text on page: 19.27:1 (need 4.5)  [#f9fafb on #030712]
  PASS body text on card: 16.98:1 (need 4.5)  [#f9fafb on #111827]
  PASS secondary text on page: 7.93:1 (need 4.5)  [#9ca3af on #030712]
  PASS link on page: 7.92:1 (need 4.5)  [#60a5fa on #030712]
  PASS text on primary action: 5.17:1 (need 4.5)  [#ffffff on #2563eb]
  PASS essential control border (WCAG 1.4.11): 4.16:1 (need 3.0)  [#6b7280 on #030712]

=== LIGHT (advisory) ===
  warn tertiary/incidental text on page: 2.54:1 (need 4.5)  [#9ca3af on #ffffff]
  warn default border on page (decorative): 1.24:1 (need 3.0)  [#e5e7eb on #ffffff]

=== DARK (advisory) ===
  warn tertiary/incidental text on page: 4.16:1 (need 4.5)  [#6b7280 on #030712]
  warn default border on page (decorative): 1.37:1 (need 3.0)  [#1f2937 on #030712]

OK: all required contrast pairs pass WCAG 2.2 minimums.
```

All required pairs pass. The two advisory warnings are by design
(tertiary/incidental text and decorative dividers are explicitly
sub-3:1 by the token system's own documentation) — not action items.

---

## 3. Current state (screenshots)

| Page | Desktop (1280px) | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| Home | `screenshots/home-desktop.webp` | `screenshots/home-tablet.webp` | `screenshots/home-mobile.webp` |
| Pricing | `screenshots/pricing-desktop.webp` | `screenshots/pricing-tablet.webp` | `screenshots/pricing-mobile.webp` |

Measured (desktop unless noted):
- Home page height: 5,448px desktop / 6,941px tablet / 7,547px mobile.
- Home `<h1>` wraps to 1 line desktop, 2 lines tablet, 2 lines mobile —
  but at 320px specifically it reaches **4 lines** (288×144px), past the
  ~3-line ceiling `.design-system/taste/design-taste.md` recommends for
  headings.
- Pricing page height: 2,237px desktop / 3,633px mobile.
- Pricing interactive controls at 375px: header icon controls are 32×32
  (below the 44px preferred target, at the 24px AA floor); the
  monthly/yearly tabs are 92×24 (below even the 24px AA floor); plan CTA
  buttons are 295×36.

---

## 4. Prioritized findings

### Critical

| # | File:line | Issue | Fix |
|---|---|---|---|
| C1 | `app/components/AppHeader.vue:56-62` | Icon-only `UButton` (mobile login shortcut, `icon="i-lucide-log-in"`) has no `aria-label` — a screen reader announces it as an unnamed button/link (WCAG 4.1.2). | Add `aria-label="Sign in"` (or `Log in`) to the button. |
| C2 | `app/components/PromotionalVideo.vue:7-24` | Video has visible controls but no caption/transcript track — fails WCAG 1.2.1/1.2.2 for any spoken content, and it's a third-party Nuxt UI Pro stock asset, not Skilleate's own product. | Replace with an actual Skilleate product screen-recording (agent guidance UI, progress dashboard) with a real caption track, or remove the video and use a static annotated screenshot instead. |
| C3 | `app/components/HeroBackground.vue:7-23`, `app/components/StarsBg.vue:169-182` | Continuous background animation (hero gradient transitions on a `setTimeout` loop; 300-star, 3-layer perpetual animation behind the CTA) has no `prefers-reduced-motion` fallback — violates the motion-choreography doctrine (`.design-system/taste/motion-choreography.md`) and WCAG 2.3.3 guidance for users sensitive to motion. | Wrap both animations in a `prefers-reduced-motion: reduce` media-query check; render a static frame instead of animating for those users. |

### Major

| # | File:line | Issue | Fix |
|---|---|---|---|
| M1 | `app/pages/index.vue:39-49` (renders `ImagePlaceholder.vue:5-32` twice via `content/0.index.yml:20-47`'s two `sections`) | Both feature sections show a dashed-border empty placeholder instead of a real visual — on a page selling "see your progress, guided by an agent," showing no actual product UI undercuts the pitch. | Replace with a real (even simplified/mocked) screenshot of the learner progress dashboard / agent guidance UI referenced in the copy. |
| M2 | `app/pages/index.vue:51-63`, `content/0.index.yml:49-70` | All 6 feature-grid cards (`UPageCard spotlight`) render at identical visual weight — no lead/anchor item, so the eye has nowhere to land first. | Promote 1 card (e.g. "Personalized learning paths") to a larger lead tile in a bento-style grid; keep the other 5 as supporting tiles. |
| M3 | `app/pages/index.vue:65-87`, `content/0.index.yml:71-129` | 9 testimonial cards render together in a dense 4-column block — reads as filler rather than proof, and is a long scroll on mobile (testimonial heading alone starts at ~4,178px scroll depth on mobile). | Feature 3-4 testimonials with strongest outcome framing above the fold of that section; move the rest behind a "see more" or a horizontal carousel. |
| M4 | `app/pages/pricing.vue:37-47` | Monthly/Yearly toggle renders as two 92×24px tabs (`size="xs"`, `class="w-48"`) — small hit target, and in live testing the displayed prices did not visibly change after clicking the Yearly tab (worth re-verifying with a real click-and-observe test before shipping any pricing change). | Increase the toggle to a standard-size token control (44px preferred target), and add a visible "save X%" cue on the Yearly option; confirm the price actually re-renders on toggle. |
| M5 | `app/components/AppFooter.vue:2-35` | Every footer column's `children` items (Help center, Docs, Roadmap, Changelog, Courses, For teams, Certificates, Become an instructor, About, Pricing, Careers, Blog) have no `to` — `UFooterColumns` renders them as inert `<button>`s with no destination, which reads as broken navigation and violates the "button = action, `<a>` = navigation" ARIA pattern (`.design-system/accessibility/aria-patterns.md`). | Add real routes for the items that exist (`Pricing` → `/pricing`, `Blog` → `/blog`, `Docs` → `/docs`, `Changelog` → `/changelog`) and either remove or clearly mark as "coming soon" the ones that don't have a page yet. |

### Minor

| # | File:line | Issue | Fix |
|---|---|---|---|
| M6 | `app/components/AppFooter.vue:42-49` | Newsletter form's `loading` ref is set `true` on submit but never reset — the submit button will appear permanently loading after first use. | Reset `loading.value = false` after `toast.add(...)`, or move it into the (currently absent) async request lifecycle. |
| M7 | `content/0.index.yml` testimonials section | 9 testimonials is more volume than the section needs above the fold (see M3) — flagged separately here as a content-density concern distinct from the layout fix. | Covered by M3's fix; no separate content change needed beyond what M3 proposes. |

### Enhancement

| # | Area | Idea |
|---|---|---|
| E1 | `app/components/AppLogo.vue` | Current mark is a plain text wordmark (correct fix for the prior Nuxt UI logo mismatch — see PR #6), but has no distinct visual mark. A small custom icon/mark paired with the wordmark would strengthen brand recognition without reopening the third-party-asset problem. |
| E2 | Home page | Add a lightweight "browse a skill" or course-category strip (inspired by Coursera's grouped rails and Udemy's goal tiles) so the platform's actual catalog breadth is visible, not just the agent-guidance pitch. |
| E3 | Pricing page | Add a simple plan-comparison table and a stated guarantee/refund assurance near the plan cards (inspired by Udemy's pricing page trust block), reinforcing the human-supervision trust narrative already in the FAQ. |
| E4 | Header/Nav | `app/components/AppHeader.vue:39-79` desktop nav has good structural hierarchy already — no fix needed, called out as a **pattern to keep**, not change. |

---

## 5. Competitor synthesis

Screenshots: `screenshots/reference-udemy.webp`,
`screenshots/reference-zerotomastery.webp`,
`screenshots/reference-coursera.webp`. Udemy's pricing page
(`https://www.udemy.com/pricing/`) was also inspected directly.

| Source | What it does | Adapt? | Reasoning |
|---|---|---|---|
| **Udemy** | Search-first nav, image-led promotional hero, dense course cards with rating/instructor/price metadata, sale-banner urgency; pricing page uses audience-labeled plans (Personal/Team/Enterprise) + "trusted by 17,000+ companies" trust block + comparison table + FAQ. | **Adapt:** audience-labeled plan tiers, a transparent trust/proof signal near pricing, a plan-comparison table (→ E3). **Avoid:** discount/countdown urgency and card-metadata density — wrong register for a guided, human-supervised learning experience; Skilleate's differentiator is depth of guidance, not transactional course-shopping. |
| **Zero to Mastery** | Countdown sale banner, dark high-drama hero, "500,000+ students/instructors/mentors" community proof, checklist of concrete career outcomes, real product screenshot (Discord community UI) as hero visual, Trustpilot rating, roadmap/instructor-story structure. | **Adapt:** a real product screenshot as hero visual (directly fixes M1), a concrete outcome checklist, a real (not stock) trust rating if Skilleate has one. **Avoid:** the countdown/flash-sale urgency and dark-tech visual register — those signal a bootcamp-hustle brand, which conflicts with the calmer "supervised, trustworthy" positioning this pivot deliberately chose (see `openspec/changes/agentic-learning-platform-messaging/design.md`). |
| **Coursera** | Institutional trust: audience-split hero (individual vs. business), partner/company logo strip, course rails grouped by "Most popular / Hot new releases / Trending," provider branding (Google, Microsoft, IBM) per course card. | **Adapt:** a lightweight grouped-catalog rail to show breadth (→ E2), if Skilleate has partner/provider branding worth surfacing, a logo trust strip. **Avoid:** the enterprise/institutional split and dense provider-branding — Skilleate's trust story is "agents + human oversight," not third-party institutional accreditation, and a business/individual split isn't part of this pivot's stated audience framing (non-technical + technical learners, not consumer vs. enterprise). |

**Net direction:** none of the three should be cloned. Udemy is
transactional/dense, Zero to Mastery is urgent/dark-tech, Coursera is
institutional/enterprise — Skilleate's own identity (calm, trustworthy,
supervised-AI-guidance) sits deliberately apart from all three, per the
positioning already locked in the messaging pivot's `design.md`. Borrow
proof mechanics (real product visuals, concrete outcomes, transparent
plan comparison) without borrowing tone.

---

## 6. Recommended design direction

**High-End Agency + Editorial Minimalism** (from
`.design-system/taste/aesthetic-systems.md`), not a dark-tech or
enterprise-institutional direction.

**Why:** Skilleate needs to read as premium and trustworthy — a
human-supervised AI learning guide, not a hustle-bootcamp brand
(rules out Zero to Mastery's register) and not an enterprise-credential
platform (rules out Coursera's institutional register). Editorial
minimalism signals confidence and care without needing dark-tech
visual tropes or urgency mechanics; it also composes naturally with the
existing token system rather than requiring a palette swap.

**Token mapping (no new raw hex, only re-composition of existing tokens):**

| Aspect | Token(s) | Notes |
|---|---|---|
| Accent | `semantic.action.primary` (`blue.600`) / hover `blue.700` | Keep as-is — already passes contrast (§2), no change needed. |
| Text | `primitive.gray.900` (primary) / `gray.600` (secondary) | Keep as-is. |
| Surfaces | `semantic.surface.page` (white) / `semantic.surface.sunken` (`gray.50`) | Use `sunken` to differentiate alternating sections instead of introducing a new surface color. |
| Typography | `fontFamily.sans` (Inter, already wired per the messaging pivot) for UI; consider `fontFamily.serif` (Lora, already defined in `typography.json` but unused) for 1-2 editorial moments (e.g. a pull-quote testimonial) to reinforce the "considered, human" tone without changing the whole type system. | Introduces zero new tokens — `serif` already exists in `typography.json`, just unused today. |
| Spacing | Existing `spacing.json` scale; section gaps at the larger end of the existing scale (80/96px) rather than a new value, to give the bento grid and testimonial stack room to breathe. | No new spacing tokens needed. |
| Radius/elevation | `borders.json` `radius.lg` (cards), `radius.md` (buttons); `shadows.json` lowest elevation step only | Keep flat/quiet — editorial minimalism avoids heavy shadows. |

**Layout changes implied (not new components, recomposition of existing
Nuxt UI primitives):**
- Full-bleed asymmetric hero with a real product visual (fixes M1, C2).
- Bento-style 6-feature grid with one lead tile (fixes M2).
- Editorial testimonial stack (3-4 featured, not 9 - fixes M3).
- Index-style pricing comparison next to the existing plan cards (E3).
- Quiet, low-motion CTA band (motion respecting `prefers-reduced-motion`, fixes C3).

---

## 7. Prioritized implementation roadmap

1. **Accessibility fixes first (C1, C2, C3, M5)** — cheapest to fix,
   highest risk if shipped as-is, and independent of any visual
   direction decision.
2. **Pricing toggle functional fix (M4)** — verify and fix before any
   visual change to the pricing page, since a broken toggle undermines
   trust regardless of how the plans look.
3. **Hero visual replacement (M1, C2)** — replace both placeholder
   sections and the stock video with real product visuals; this is the
   single highest-leverage visual-hierarchy fix.
4. **Feature grid bento restructure (M2)** — promote one lead tile.
5. **Testimonial stack reduction (M3)** — cut to 3-4 featured + overflow
   pattern.
6. **Footer real navigation (M5) + loading-state fix (M6)**.
7. **Enhancements (E1-E3)** — logo mark, catalog/browse strip, pricing
   comparison table + guarantee — once the above are stable, as they add
   new content/visual surface rather than fixing existing issues.

None of the above requires touching `content/0.index.yml` or
`content/2.pricing.yml` copy — every fix is component/layout/interaction
level, consistent with the messaging pivot's copy being final.
