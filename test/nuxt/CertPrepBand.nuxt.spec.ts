import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CertPrepBand from '~/components/CertPrepBand.vue'

describe('CertPrepBand', () => {
  it('its CTA routes to a real existing route', async () => {
    const component = await mountSuspended(CertPrepBand, {
      props: {
        title: 't',
        description: 'd',
        cta: { label: 'See all certificate tracks', to: '/pricing' },
        cards: [{ title: 'Data & Analytics', description: 'x', icon: 'i-lucide-chart-line' }]
      }
    })

    const cta = component.find('a[href="/pricing"]')
    expect(cta.exists()).toBe(true)
  })

  it('renders every certificate card title', async () => {
    const cards = [
      { title: 'Data & Analytics', description: 'x', icon: 'i-lucide-chart-line' },
      { title: 'Programming', description: 'y', icon: 'i-lucide-code' }
    ]
    const component = await mountSuspended(CertPrepBand, {
      props: { title: 't', description: 'd', cta: { label: 'l', to: '/pricing' }, cards }
    })

    for (const card of cards) {
      expect(component.text()).toContain(card.title)
    }
  })
})
