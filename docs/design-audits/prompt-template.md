# Design audit task prompt template

The exact task prompt shape dispatched to a `designer` subagent for a
design audit. Substitute `{{ROUTES}}`, `{{COMPETITOR_URLS}}`, and the
file references for the project's actual paths.

## Context (shared across the batch, given once)

```
# Goal
Produce a design audit + prioritized improvement proposal for {{PROJECT}}'s
marketing landing page. Do NOT implement changes in this pass; the
deliverable is a proposal document with prioritized findings and a
concrete visual direction, for the user to decide what to apply. Code may
only be touched if indispensable to produce comparative screenshots (e.g.
toggling a theme) — the primary deliverable is analysis + recommendations,
not an implementation.

# Constraints
- Stack: {{FRAMEWORK/STACK DETAILS}}. Dev server already running at
  {{DEV_URL}} — do not restart unless genuinely necessary.
- Design system lives at {{DESIGN_SYSTEM_ROOT}} (tokens, taste doctrine,
  validation scripts). Key paths:
  - `{{DESIGN_SYSTEM_ROOT}}/taste/design-taste.md` (banned defaults, anti-slop doctrine)
  - `{{DESIGN_SYSTEM_ROOT}}/taste/aesthetic-systems.md` (named design systems for direction)
  - `{{DESIGN_SYSTEM_ROOT}}/workflows/design-review.md` (6-dimension rubric + Nielsen heuristics)
  - `{{DESIGN_SYSTEM_ROOT}}/tokens/*.json` (color, typography, spacing, etc.)
  - `{{DESIGN_SYSTEM_ROOT}}/scripts/validate_contrast.py`, `lint_hardcodes.py`, `check_no_emoji.py`
- The current copy/narrative is FINAL — do not change it. This audit is
  purely VISUAL/UX (hierarchy, typography, spacing, color, components,
  layout, motion), not copy.
- Routes in scope: {{ROUTES}} (list each with its source file(s), e.g.
  `/` -> `app/pages/index.vue` + `content/0.index.yml`).
- Reference/competitor URLs for inspiration: {{COMPETITOR_URLS}}. Navigate
  them with `browser`, screenshot real pages, extract concrete visual
  patterns (hero hierarchy, color usage, card layout, testimonials, CTA,
  trust signals) — adapt, never clone 1:1.
- `browser` tool available: use `tab.goto`, `tab.screenshot`,
  `tab.observe()` on both the local dev server and the external
  reference sites.

# Contract
Final deliverable: an audit + proposal document following the
`design-review` skill format (weighted 6-dimension rubric: Visual
Hierarchy 20%, Consistency 20%, Accessibility 20%, Usability 20%,
Responsiveness 10%, Performance 10%) PLUS a "Visual direction proposal"
section with:
1. Current score across the 6 dimensions + prioritized findings table
   (Critical/Major/Minor/Enhancement) with file:line and a concrete fix.
2. Synthesis of patterns observed in the reference sites (what to adapt
   and what NOT to, with reasoning — e.g. "Site A is dense/transactional,
   Site B is premium/dark-tech, Site C is institutional/trustworthy — our
   product needs its own identity, not a clone of any one").
3. Recommended design direction (an archetype or composition from
   `aesthetic-systems.md`) with justification, and how it resolves in
   tokens (palette, typography, spacing) without breaking the existing
   token system.
4. A prioritized roadmap of changes (what to touch first: hero, feature
   cards, testimonials, pricing cards, header/logo, etc.) ready for a
   follow-up implementation task to execute.
Do not implement the full redesign in this pass except point comparison
mockups/screenshots if they help communicate the proposal.
```

## Task (per-agent, `agent: "designer"`)

```
Audit the current visual/UX design of {{PROJECT}}'s landing page
({{ROUTES}} on {{DEV_URL}}) and produce a prioritized improvement
proposal.

Steps:
1. Read `{{DESIGN_SYSTEM_ROOT}}/taste/design-taste.md`,
   `{{DESIGN_SYSTEM_ROOT}}/workflows/design-review.md`, and the relevant
   `{{DESIGN_SYSTEM_ROOT}}/tokens/*.json` files to understand the current
   token system.
2. With `browser`, navigate every route in {{ROUTES}}. Screenshot each at
   mobile (~375px), tablet (~768px), and desktop (~1280px). Observe visual
   hierarchy, section structure, card/grid patterns, testimonials, CTAs,
   and (if a pricing page is in scope) plan cards, FAQ, header, footer.
3. With `browser`, navigate {{COMPETITOR_URLS}} — screenshot heroes,
   feature/course cards, testimonials, and pricing/CTA if applicable.
   Extract concrete patterns, not vague impressions.
4. Apply the `design-review` rubric (6 weighted dimensions) to the current
   landing page with a real score and findings citing file:line for every
   relevant source file.
5. Verify real contrast of the current tokens with
   `python3 {{DESIGN_SYSTEM_ROOT}}/scripts/validate_contrast.py
   {{DESIGN_SYSTEM_ROOT}}/tokens/colors.json` and cite the actual result,
   never an estimate.
6. Write the full proposal per the Contract section above: score +
   prioritized findings, competitor synthesis, recommended direction with
   token mapping, and a prioritized implementation roadmap.

Do not touch copy/narrative (already final). Do not implement the full
redesign — the deliverable is the audit/proposal document. Avoid
project-wide build/lint/test commands; the dev server is already
running — use it only to observe/capture.
```

## Known execution notes (from the 2026-08-20 run)

- The subagent's final `yield` is typically a compressed summary (a few
  bullet points), not the full report. Compile the actual report from
  the subagent's `hub` progress messages and `history://<agent-id>`
  transcript, which carry the full evidence trail (exact measurements,
  screenshot paths, file:line citations).
- Screenshots land in `/tmp/omp-sshots-*.webp` by default and do not
  survive sandbox recycling — for durable reports, have the agent (or
  the orchestrator) copy them into
  `docs/design-audits/<date>-<slug>/screenshots/` before finalizing.
- Interactive verification (e.g. clicking a pricing toggle) can surface
  real functional bugs beyond visual findings — instruct the agent to
  report these as findings too, not just visual/static observations.
