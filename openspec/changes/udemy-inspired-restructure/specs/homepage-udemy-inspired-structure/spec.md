## ADDED Requirements

### Requirement: Homepage includes a tabbed skill-category browser
The homepage (`/`) SHALL include a section presenting Skilleate's
content tracks grouped by category, navigable via tabs, positioned
between the existing feature sections and the features grid.

#### Scenario: Category tabs switch visible content
- **GIVEN** a visitor on `/` reaches the skill-category browser section
- **WHEN** they select a different category tab
- **THEN** the visible set of content-track cards updates to match
  the selected category, and the previously selected tab is
  visually deselected

#### Scenario: No fabricated per-item trust signals
- **GIVEN** any content-track card in the skill-category browser
- **WHEN** its content is reviewed
- **THEN** it contains no fabricated rating, review count, or learner
  count — only descriptive, non-falsifiable information (title,
  level, format) consistent with the rest of the site's existing
  marketing copy register

### Requirement: Homepage includes a mid-page conversion band
The homepage SHALL include a full-width conversion band, positioned
between the features grid and the testimonials section, presenting
a benefit checklist and a single call-to-action.

#### Scenario: Conversion band CTA routes to signup
- **GIVEN** a visitor on `/` reaches the conversion band
- **WHEN** they activate its call-to-action
- **THEN** they are routed to `/signup`

### Requirement: Homepage includes a dense Popular Skills index
The homepage SHALL include a multi-column, dense, text-link index of
skill/topic names grouped by category, distinct from the tabbed
skill-category browser section.

#### Scenario: Skill index links resolve to real destinations
- **GIVEN** the Popular Skills index section on `/`
- **WHEN** any of its links is inspected
- **THEN** it points at an existing route or in-page anchor on this
  site (e.g. `/pricing`, `#features`) — never a fabricated or
  external destination that does not exist

### Requirement: Footer presents a denser, multi-column sitemap structure
The site footer (`AppFooter.vue`) SHALL present at least 4 link
columns, using only routes/anchors that exist on this site.

#### Scenario: Every footer link resolves to a real destination
- **GIVEN** the site footer on any page
- **WHEN** every link in every footer column is inspected
- **THEN** each one points at a route or anchor that exists on this
  site — zero dead links, zero fabricated destination
