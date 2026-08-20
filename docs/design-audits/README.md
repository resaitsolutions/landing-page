# Design audit process

How this repo runs a design audit + improvement proposal on the marketing
landing page, and how to automate it going forward.

## When to run one

- Before a visual/UX redesign pass, to get a scored, evidence-backed
  baseline instead of starting from opinion.
- After a messaging/content pivot (once copy is settled), to check the
  visual system still matches the new narrative.
- Periodically, to catch drift (inconsistent tokens, broken interactive
  elements, accessibility regressions) before it compounds.

## What it produces

One markdown report per audit, named
`docs/design-audits/<YYYY-MM-DD>-<slug>.md`, containing:

1. A weighted 6-dimension score (Visual Hierarchy 20%, Consistency 20%,
   Accessibility 20%, Usability 20%, Responsiveness 10%, Performance 10%)
   with file:line-cited findings, Critical → Enhancement.
2. A synthesis of relevant competitor/reference sites: concrete patterns
   observed, explicitly split into "adapt" vs. "do not adapt" with a
   stated reason — never a recommendation to clone a competitor.
3. A recommended design direction (an archetype or composition from
   `.design-system/taste/aesthetic-systems.md`), mapped to this repo's
   actual token files, not invented colors/spacing.
4. A prioritized implementation roadmap ready to hand to a follow-up
   implementation task.

The audit is **read-only on the product** — it does not change any
copy, route, or component. Copy/narrative changes go through the normal
OpenSpec proposal flow (`AGENTS.md` §2–3); this process assumes the
narrative is already settled and only inspects the visual/UX layer.

## How to run one (manual, today)

1. Confirm the dev server is running and reachable
   (`pnpm dev --host 0.0.0.0` or the project's usual dev command) and
   confirm which routes are in scope (typically `/` and `/pricing` for
   this project's marketing site).
2. Dispatch a `designer` agent (via `task`) with:
   - The routes to audit (local dev server URLs).
   - Any reference/competitor URLs the user wants inspiration from.
   - The constraint that this is an audit + proposal, not an
     implementation — see `docs/design-audits/prompt-template.md` for
     the exact task prompt shape used.
   - Pointers to `.design-system/taste/design-taste.md`,
     `.design-system/workflows/design-review.md`, and the relevant
     `.design-system/tokens/*.json` files.
3. The agent must, in order:
   a. Read the taste doctrine, review rubric, and token files.
   b. Read the actual page/component/content source for every audited
      route (not just render it) — findings must cite file:line.
   c. Screenshot every audited route at mobile (~375px), tablet
      (~768px), and desktop (~1280px) via the `browser` tool.
   d. Screenshot the reference/competitor sites named by the user via
      `browser`, and extract concrete patterns (not vague impressions).
   e. Run `python3 .design-system/scripts/validate_contrast.py
      .design-system/tokens/colors.json` and cite the **real** output —
      never estimate a contrast ratio.
   f. Score the 6-dimension rubric and write the findings table.
   g. Write the competitor synthesis (adapt / do not adapt / why).
   h. Recommend a design direction mapped to real tokens.
   i. Write a prioritized roadmap.
4. Save the agent's full output as
   `docs/design-audits/<YYYY-MM-DD>-<slug>.md` (the orchestrating agent
   does this — a subagent's final `yield` is often a compressed
   summary, so the full evidence trail should be pulled from its
   `history://<agent-id>` transcript and compiled into the report, not
   just the final message).

## Automating this (future work)

To turn this into a repeatable, lower-touch pipeline:

- **Trigger**: a script/command (`design-audit <routes...> [--vs
  <competitor-urls...>]`) that assembles the task prompt from
  `docs/design-audits/prompt-template.md`, substituting routes and
  reference URLs, and dispatches it.
- **Evidence capture**: standardize screenshot output paths (e.g.
  `docs/design-audits/<date>-<slug>/screenshots/`) instead of `/tmp/`,
  so the report can embed/reference them durably instead of losing them
  when the sandbox recycles.
- **Structured output**: consider asking the agent for the score table
  and findings as structured JSON (schema below) in addition to the
  prose report, so a dashboard or trend-line can be built across
  repeated audits without re-parsing markdown.
- **Scheduling**: run on a cadence (e.g. after every merged content/
  design PR) via CI or a scheduled agent job, diffing the score against
  the previous audit to flag regressions automatically.

Suggested structured-output schema for future automation:

```json
{
  "date": "YYYY-MM-DD",
  "routes_audited": ["/", "/pricing"],
  "scores": {
    "visual_hierarchy": 0,
    "consistency": 0,
    "accessibility": 0,
    "usability": 0,
    "responsiveness": 0,
    "performance": 0,
    "weighted_overall": 0
  },
  "findings": [
    {
      "severity": "critical|major|minor|enhancement",
      "file": "path:line",
      "issue": "string",
      "fix": "string"
    }
  ],
  "competitor_synthesis": [
    {
      "source": "url",
      "adapt": ["string"],
      "avoid": ["string"],
      "reason": "string"
    }
  ],
  "recommended_direction": {
    "name": "string",
    "rationale": "string",
    "token_mapping": {}
  },
  "roadmap": ["string"]
}
```

## Index

| Date | Scope | Weighted score | Report |
|---|---|---|---|
| 2026-08-20 | Home + Pricing (marketing site) | 6.0 / 10 | [2026-08-20-landing-audit.md](./2026-08-20-landing-audit.md) |
