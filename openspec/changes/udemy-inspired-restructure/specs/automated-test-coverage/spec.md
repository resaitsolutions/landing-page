## ADDED Requirements

### Requirement: Project has an automated component test suite
The project SHALL have an automated test suite using Vitest and
`@nuxt/test-utils`, runnable via a `pnpm test` script, covering
existing critical interactive paths and every new interactive
element introduced by the homepage restructure.

#### Scenario: Test suite runs and passes locally
- **GIVEN** the repository at any commit on this change
- **WHEN** `pnpm test` is run
- **THEN** the command exits 0 with zero failing tests

#### Scenario: Pricing toggle behavior is covered
- **GIVEN** the pricing page's monthly/yearly toggle component
- **WHEN** its test is run
- **THEN** the test asserts that clicking "Yearly" sets its
  `aria-pressed` state to `true` and "Monthly"'s to `false` (and vice
  versa), failing if that state transition regresses

#### Scenario: Footer newsletter form state is covered
- **GIVEN** the footer newsletter subscribe form
- **WHEN** its test is run
- **THEN** the test asserts the loading state is set during submit
  and reset afterward, failing if the loading state is left stuck

#### Scenario: Homepage anchor wiring is covered
- **GIVEN** the homepage's hero "See how it works" link and its
  target section
- **WHEN** its test is run
- **THEN** the test asserts the rendered target section carries the
  exact `id` the hero link's `href`/`to` targets, failing if that
  wiring regresses (the exact defect fixed in the prior visual-
  redesign change)

#### Scenario: New skill-category tabs are covered
- **GIVEN** the new skill-category browser section
- **WHEN** its test is run
- **THEN** the test asserts selecting a category tab updates the
  visible content-track set

### Requirement: CI runs the test suite on every push
The CI workflow (`.github/workflows/ci.yml`) SHALL run the test suite
after lint and typecheck, on the same job/matrix as existing checks.

#### Scenario: CI fails on a broken test
- **GIVEN** a push that introduces a failing test
- **WHEN** the CI workflow runs
- **THEN** the workflow run fails at the test step, blocking merge
  via the existing required-checks convention
