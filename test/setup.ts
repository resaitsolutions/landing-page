// nuxt-og-image's `defineOgImage` auto-import is not resolved inside
// @nuxt/test-utils' Nuxt vitest environment (a known limitation for
// third-party module composables, not specific to this app). Stub it
// globally so page components that call it (index.vue, pricing.vue)
// can still be mounted in full for realistic component tests.
import { createRequire } from 'node:module'
import { vi } from 'vitest'

vi.stubGlobal('defineOgImage', () => [])

// `queryCollection` (@nuxt/content) fetches from a real SQLite content
// database via a runtime API call that doesn't exist in the Vitest
// Nuxt environment. Nuxt's auto-import compiles `queryCollection` to
// an import from the package's internal (non-exported) runtime/client
// module, resolved to its actual on-disk path — mock that exact path
// (resolved via `require.resolve`, so it survives pnpm's hashed store
// directory names) with fixture data matching content/0.index.yml and
// content/2.pricing.yml's real shape, so index.vue/pricing.vue render
// their actual templates (and thus their actual interactive behavior)
// in tests, rather than testing the content pipeline itself, which is
// out of scope here.
const require = createRequire(import.meta.url)
// @nuxt/content's package.json `exports` blocks direct subpath
// resolution of this internal module, so resolve it by walking the
// package's real on-disk location (its exports-map entry point,
// './dist/module.mjs') up to the package root, then appending the
// internal runtime/client.js path Nuxt's auto-import actually uses.
const contentPkgEntry = require.resolve('@nuxt/content')
const contentPkgRoot = contentPkgEntry.slice(0, contentPkgEntry.indexOf('/dist/'))
const contentClientPath = `${contentPkgRoot}/dist/runtime/client.js`

const indexFixture = {
  title: 'Learn any skill, [guided by AI]{class="text-primary"}',
  description: 'Skilleate pairs every learner with AI agents.',
  seo: { title: 'Skilleate', description: 'Skilleate' },
  hero: {
    links: [
      { label: 'Start learning', to: '/signup' },
      { label: 'See how it works', to: '#features' }
    ]
  },
  sections: [
    {
      title: 'Your own learning guide, always on',
      description: 'x',
      id: 'features',
      orientation: 'horizontal',
      features: []
    },
    {
      title: 'Built for every kind of learner',
      description: 'x',
      orientation: 'horizontal',
      reverse: true,
      features: []
    }
  ],
  skillBrowser: {
    title: 'Skills to build your career and life',
    description: 'x',
    categories: [
      { label: 'Data & Analytics', tracks: [{ title: 'Data analysis foundations', level: 'Foundational', detail: 'x', icon: 'i-lucide-chart-line' }] }
    ]
  },
  conversionBand: {
    title: 'Ready to reimagine how you learn?',
    description: 'x',
    benefits: [{ label: 'Learn any skill, guided', icon: 'i-lucide-compass' }]
  },
  features: { title: 'x', description: 'x', items: [] },
  testimonials: { headline: 'x', title: 'x', description: 'x', items: [] },
  certPrep: {
    title: 'Finish with a certificate that means something',
    description: 'x',
    cta: { label: 'See all certificate tracks', to: '/pricing' },
    cards: [{ title: 'Data & Analytics', description: 'x', icon: 'i-lucide-chart-line' }]
  },
  popularSkills: {
    title: 'Popular skills',
    topSkill: { label: 'In demand right now', description: 'x', icon: 'i-lucide-trending-up', to: '#skills' },
    groups: [{ label: 'Development', skills: [{ label: 'Programming fundamentals', to: '/#skills' }] }]
  },
  cta: { title: 'x', description: 'x', links: [] }
}

const pricingFixture = {
  title: 'A plan for every learner',
  description: 'x',
  seo: { title: 'Pricing', description: 'Pricing' },
  plans: [],
  faq: { title: 'x', description: 'x', items: [] }
}

vi.doMock(contentClientPath, () => ({
  queryCollection: (name: string) => ({
    first: async () => (name === 'pricing' ? pricingFixture : indexFixture)
  }),
  queryCollectionNavigation: () => Promise.resolve([]),
  queryCollectionItemSurroundings: () => Promise.resolve([]),
  queryCollectionSearchSections: () => Promise.resolve([]),
  useSearchCollection: () => ({ files: { value: [] } })
}))
