## ADDED Requirements

### Requirement: Every interactive control has an accessible name
Every icon-only interactive control on the marketing homepage and
pricing page SHALL expose an accessible name to assistive technology.

#### Scenario: Mobile login shortcut is announced correctly
- **GIVEN** a screen reader user on `/` at a mobile viewport width
- **WHEN** they navigate to the icon-only login control in the header
- **THEN** it announces a name (e.g. "Sign in") rather than being
  announced as an unnamed button or link

### Requirement: Media on the homepage has captions or is non-video
Any video embedded in the marketing homepage SHALL either include a
caption track for any spoken/narrated content, or be replaced with a
non-video visual that carries no such requirement.

#### Scenario: No captionless spoken video ships
- **GIVEN** the rendered homepage
- **WHEN** its media elements are inspected
- **THEN** no `<video>` element with spoken/narrated audio lacks a
  caption track

### Requirement: Decorative motion respects reduced-motion preference
Continuous or entrance decorative animations on the marketing homepage
SHALL be disabled or reduced to a static/instant equivalent when the
user has `prefers-reduced-motion: reduce` set.

#### Scenario: Starfield animation stops under reduced motion
- **GIVEN** a user with `prefers-reduced-motion: reduce` set in their
  browser
- **WHEN** they load `/`
- **THEN** the background starfield animation does not loop/animate

#### Scenario: Hero background reveal is instant under reduced motion
- **GIVEN** a user with `prefers-reduced-motion: reduce` set
- **WHEN** they load `/`
- **THEN** the hero background graphic renders at its final state
  without an animated fade-in delay

### Requirement: Pricing billing-period toggle is fully interactive
The monthly/yearly billing toggle on `/pricing` SHALL update the
displayed plan prices in response to a real mouse click, in addition to
already-working keyboard interaction, and SHALL meet the minimum
24×24px (preferably 44×44px) interactive target size.

#### Scenario: Clicking the Yearly tab updates displayed prices
- **GIVEN** a visitor on `/pricing` with Monthly selected
- **WHEN** they click the Yearly tab with a mouse
- **THEN** the tab's `aria-selected` state changes to the Yearly tab
  and every plan's displayed price updates to its yearly value

#### Scenario: Toggle meets minimum target size
- **GIVEN** the rendered pricing page
- **WHEN** the Monthly/Yearly tab controls are measured
- **THEN** each tab's clickable area is at least 24×24px

### Requirement: Footer navigation items link to real destinations
Every item rendered in the site footer's navigation columns SHALL
either link to an existing page on the site, or not be rendered at all
— no footer item SHALL render as a control with no destination.

#### Scenario: Footer items with existing pages are real links
- **GIVEN** the rendered footer on any marketing page
- **WHEN** a footer navigation item corresponding to an existing route
  (e.g. Pricing, Blog, Docs, Changelog) is inspected
- **THEN** it renders as a link (`<a>`/`NuxtLink`) with that route as
  its destination, not an inert button

#### Scenario: No dead-end footer controls
- **GIVEN** the rendered footer
- **WHEN** every footer navigation item is inspected
- **THEN** none renders as a clickable control with no `href`/route
  destination

### Requirement: Newsletter submission does not leave a stuck loading state
The footer newsletter subscribe form SHALL return its submit control to
a non-loading state after handling a submission.

#### Scenario: Submit button is usable after subscribing
- **GIVEN** a visitor submits the newsletter form
- **WHEN** the subscription confirmation is shown
- **THEN** the submit button is no longer in a loading state and can be
  interacted with again

### Requirement: Feature sections show illustrative product visuals, not empty placeholders
The two homepage feature sections SHALL each display an illustrative
visual relevant to their copy, rather than an empty dashed-border
placeholder graphic.

#### Scenario: No empty placeholder graphic ships
- **GIVEN** the rendered homepage
- **WHEN** the two feature sections are inspected
- **THEN** neither renders the generic dashed-pattern empty-placeholder
  component; each shows a graphic relevant to its adjacent copy

### Requirement: Feature grid establishes a visual lead item
The 6-item features grid on the homepage SHALL present with a visually
distinguished lead item rather than 6 uniformly-weighted cards.

#### Scenario: One feature card is visually promoted
- **GIVEN** the rendered features grid
- **WHEN** its 6 cards are measured
- **THEN** at least one card occupies a visibly larger area than the
  other five, establishing a clear entry point for the eye

### Requirement: Testimonials are curated, not exhaustively listed above the fold
The homepage SHALL present a curated subset of testimonials by default,
with the remainder available via user-initiated disclosure, rather than
listing all available testimonials in one block.

#### Scenario: A bounded number of testimonials render by default
- **GIVEN** the rendered homepage testimonials section
- **WHEN** it first renders
- **THEN** no more than 4 testimonial cards are visible without further
  user interaction

#### Scenario: Remaining testimonials are reachable
- **GIVEN** the homepage has more testimonials available than are shown
  by default
- **WHEN** a visitor requests to see more
- **THEN** the remaining testimonials become visible via an accessible
  disclosure control
