# learning-platform-messaging Specification

## Purpose
TBD - created by archiving change agentic-learning-platform-messaging. Update Purpose after archive.
## Requirements
### Requirement: Homepage positions Skilleate as an agent-guided learning platform
The homepage (`/`) SHALL present Skilleate as an online learning
platform in the same category as Udemy/Coursera, whose differentiator
is that progress tracking, personalized guidance, and mentoring
throughout a learner's journey are delivered by AI agents (built on
Rumbor Platform's agentic core), with human supervision — not by how
course content itself is authored or produced.

#### Scenario: Hero states the platform category and the agent differentiator
- **GIVEN** a visitor lands on `/`
- **WHEN** the hero section renders
- **THEN** the hero title and description communicate both that
  Skilleate is a learning platform (comparable category to
  Udemy/Coursera) and that AI agents guide the learner's progress and
  mentoring

#### Scenario: No claim about content generation
- **GIVEN** the homepage copy (hero, feature sections, features grid,
  testimonials, CTA)
- **WHEN** the copy is reviewed
- **THEN** no sentence claims or implies that course content itself is
  generated, authored, or produced by AI — every AI/agent mention
  refers only to the learner-facing guidance/progress/mentoring
  experience

#### Scenario: Every agent mention pairs with human supervision
- **GIVEN** any homepage copy block that mentions AI agents guiding,
  tracking, or mentoring a learner
- **WHEN** that block is read in isolation
- **THEN** it states or is immediately adjacent to a statement that
  agents are supervised by humans — no standalone "agents alone"
  claim appears anywhere on the page

#### Scenario: Dual audience is explicit
- **GIVEN** the homepage feature sections
- **WHEN** the target audience is described
- **THEN** the copy explicitly addresses both non-technical learners
  picking up a new skill and technical professionals upskilling —
  neither audience is omitted

### Requirement: Pricing page reflects a learner-facing plan structure
The pricing page (`/pricing`) SHALL present plan tiers, features, and
FAQ appropriate to a course marketplace/learning platform (course
access, agent-guided mentoring scope, progress tracking,
certificates), replacing the template's SaaS-infrastructure feature
list (storage, domains, SSL certificates) and placeholder FAQ content.

#### Scenario: Plan features describe learner value, not infra quotas
- **GIVEN** a visitor on `/pricing`
- **WHEN** any plan's feature list renders
- **THEN** every listed feature describes a learning-platform
  capability (e.g., course catalog access, mentoring session scope,
  certificates, progress tracking) and none reference storage,
  domains, email accounts, or SSL certificates

#### Scenario: FAQ answers real prospective-learner questions
- **GIVEN** a visitor on `/pricing`
- **WHEN** the FAQ section renders
- **THEN** every question and answer is coherent, on-topic content
  addressing a real concern a prospective learner or upskilling
  professional would have (e.g., how agent guidance works, human
  oversight, refunds, switching plans) — none are Lorem-ipsum or
  placeholder text

### Requirement: Site chrome and metadata match the new brand narrative
The primary navigation, footer, page `<title>` template, and
Open Graph metadata SHALL reflect Skilleate's brand and learning-
platform narrative rather than the "Nuxt SaaS Template" identity
inherited from the source template.

#### Scenario: Page title reflects Skilleate branding
- **GIVEN** any marketing page under `/`, `/pricing`, `/blog`, or
  `/docs`
- **WHEN** the page's `<title>` is inspected
- **THEN** it is built from a title template referencing Skilleate,
  not "Nuxt SaaS template"

#### Scenario: Footer and external links no longer point at the source template
- **GIVEN** the site footer
- **WHEN** its links are inspected
- **THEN** no link points at `github.com/nuxt-ui-templates/saas` (or
  another nuxt-ui-templates repository) as if it were this project's
  own source, and footer column labels do not reference SaaS-specific
  concepts (Affiliates/Sponsors framed for infra SaaS) that don't fit
  a learning platform

