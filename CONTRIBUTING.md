# Contributing

Full methodology lives in `AGENTS.md` — read that first. This file is
the condensed, PR-oriented summary.

## Workflow in one paragraph

Trivial change (typo, copy, formatting)? Single PR to `main`, done.
Anything else: propose first. `git checkout -b proposal/<change-id>`,
run `/opsx:propose <change-id>` to generate
`openspec/changes/<change-id>/{proposal.md,design.md,tasks.md}` +
delta specs, open a **proposal PR containing zero source code**. Once
that merges, `git checkout -b feat/<change-id>` from `main` and
implement `tasks.md`. Open the **implementation PR**, get it approved,
merge, then `openspec archive <change-id> --yes`.

Two branches, two PRs, per non-trivial change. Never one PR that both
proposes and implements. Never skip the proposal.

## Scope boundaries (gates)

- **C1/C2 — authorized today.** Repo/tooling baseline, page content,
  styling, the design system, local dev work.
- **C3/C4 — blocked, need explicit approval first.** Third-party
  integrations (forms, analytics, CMS), production domain/hosting.
  Discover mid-implementation that a task needs one of these? Stop and
  escalate — do not proceed by inference.

See `AGENTS.md` §4 for the full gate table.

## What every PR must explain

- What changed and why.
- Which gate it belongs to (C1–C4).
- Security/data-handling impact, if any.
- Checks performed (build/typecheck, tests, live verification).
- Rollback approach.

A proposal PR additionally states: the exact gate, at least one
rejected alternative (for anything touching C3/C4), and links the
tracking issue once it exists.

An implementation PR additionally states: whether any
real-credential/real-host step in `tasks.md` was actually executed,
and by whom.

## Review

Every PR is checked against `REVIEW.md` — hard blocks (reject
immediately, no exceptions), required checks, and judgment calls. Read
it before opening a PR to avoid an avoidable rejection.
