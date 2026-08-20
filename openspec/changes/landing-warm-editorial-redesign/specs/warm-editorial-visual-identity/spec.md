## ADDED Requirements

### Requirement: Site uses a warm terracotta/stone visual identity
The site SHALL present a terracotta-accented, stone-neutral visual
identity as its `primary`/`neutral` color tokens, replacing the
default Nuxt UI `blue`/`slate` template palette, across every page
(`/`, `/pricing`, `/login`, `/signup`, `/blog`, `/docs`, `/changelog`)
and in both light and dark color modes.

#### Scenario: Primary color token resolves to terracotta
- **GIVEN** any page renders a primary-colored interactive element
  (a solid `UButton`, an active nav link, the pricing toggle's
  selected state)
- **WHEN** its computed background or text color is inspected
- **THEN** the color resolves to a shade of the registered
  `terracotta` custom color (`--color-terracotta-*`), not Tailwind's
  default `blue`

#### Scenario: Neutral color token resolves to stone
- **GIVEN** any page renders a neutral-toned surface, border, or
  muted text element
- **WHEN** its computed color is inspected
- **THEN** the color resolves to a shade of Tailwind's `stone`
  palette, not `slate`

#### Scenario: Identity is consistent across light and dark mode
- **GIVEN** a visitor toggles color mode (`UColorModeButton` in the
  header)
- **WHEN** the page re-renders in the opposite mode
- **THEN** the same terracotta/stone identity is present in both
  modes (re-balanced per mode, not a raw inversion), with no
  leftover `blue`/`slate` value visible in either mode

### Requirement: Every visual-identity color pair passes WCAG 2.2 AA contrast
Every new or changed color pair introduced by the terracotta/stone
identity SHALL meet WCAG 2.2 AA contrast minimums (4.5:1 normal text,
3:1 large text and non-text UI) in both light and dark mode.

#### Scenario: Primary-on-surface text pairs pass AA
- **GIVEN** the terracotta primary color used as text or an icon on
  its corresponding surface color, in either light or dark mode
- **WHEN** the pair's contrast ratio is measured with
  `.design-system/scripts/contrast.py`
- **THEN** the ratio is at least 4.5:1 for normal-size text/icon
  usage, or at least 3:1 for large-text/UI-only usage

#### Scenario: Solid-button text pairs pass AA
- **GIVEN** a solid-variant primary button (light-mode or dark-mode
  shade, per Nuxt UI's own light/dark shade convention)
- **WHEN** its foreground-on-background contrast is measured
- **THEN** the ratio is at least 4.5:1

### Requirement: Zero undocumented hardcoded color values
Every color value used in `app/components/*.vue`, `app/pages/*.vue`,
and `app/assets/css/main.css` SHALL be either a design token
reference (CSS custom property, Tailwind semantic/palette class) or
a raw literal carrying a `ds-allow-hardcode` justification comment.

#### Scenario: lint_hardcodes.py reports zero unjustified values
- **GIVEN** every `.vue`/`.css` file changed by this proposal
- **WHEN** `.design-system/scripts/lint_hardcodes.py` is run against
  the `app/` directory
- **THEN** it reports zero hardcoded hex/px/ms values without a
  `ds-allow-hardcode` comment

### Requirement: Hero "See how it works" anchor resolves to its target section
The homepage hero's "See how it works" link SHALL navigate to the
first feature section it names as its target, rather than resolving
to nothing.

#### Scenario: Anchor click scrolls to the features section
- **GIVEN** a visitor on `/` clicks "See how it works" in the hero
- **WHEN** the browser processes the `#features` same-page anchor
- **THEN** the page scrolls to the section titled "Your own learning
  guide, always on" (the section carrying `id="features"` in the
  rendered DOM)
