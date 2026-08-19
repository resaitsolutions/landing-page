---
name: review-pr
description: Review a proposal/* or feat/* pull request against this repo's hard-block, required, and judgment-call checklist. Use when asked to review, approve, or reject a PR, or to check a PR/branch before opening one.
---

# Review a PR

Operationalizes `REVIEW.md` at the repo root — read that file for the
full checklist; this skill is the invocation procedure, not a
duplicate of the rules.

## Steps

1. **Identify the PR kind.** `proposal/<change-id>` (spec/design/tasks
   only, zero code) or `feat/<change-id>` (implementation). The two
   kinds have different diff-shape expectations — a proposal PR with
   any change outside `openspec/changes/<change-id>/` is already a
   hard block (see `REVIEW.md` §1).
2. **Read the diff in full.** Don't sample. For a `proposal/*` PR,
   read `proposal.md`, `design.md`, `tasks.md`, and the delta specs.
   For a `feat/*` PR, read the changed source files and confirm they
   match the already-merged `openspec/changes/<change-id>/`.
3. **Run every hard block in `REVIEW.md` §1, in order.** Any hit →
   reject immediately, cite the exact rule, stop — do not continue to
   the judgment-call pass. No exceptions negotiated at this stage.
4. **No hard block hit → check `REVIEW.md` §2 (required).** These are
   checked and reported even when not individually fatal; a pattern of
   misses across §2 items is itself grounds to request changes.
5. **Work the judgment-call checklist (`REVIEW.md` §3).** Write out
   the reasoning, not just a verdict — these require weighing
   trade-offs specific to this PR, not a mechanical check.
6. **Check `REVIEW.md` §4 (human-only).** If the PR's decision falls
   into this list, the review MUST stop short of approval and route to
   the named human in `.github/CODEOWNERS` — state this explicitly
   rather than approving on their behalf.
7. **Verdict.** One of: approve, request changes (cite exact
   hard-block rule or judgment-call reasoning), or escalate to human
   (cite which §4 item applies). A 1-3 line comment is the floor;
   go into full technical detail whenever the change carries real
   design/security/data-handling weight (`REVIEW.md` §2, second-to-last
   bullet).

## Non-goals

- This skill does not grant approval authority beyond what
  `REVIEW.md` §5 (staged path to autonomous review) currently allows.
  Check the "Current stage" line at the bottom of `REVIEW.md` before
  treating any verdict here as final/binding rather than advisory.
- This skill does not open, edit, or merge the PR — it produces a
  review verdict and comment for a human (or the repo's PR tooling) to
  act on.
