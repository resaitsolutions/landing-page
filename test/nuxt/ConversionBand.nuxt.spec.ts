import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConversionBand from '~/components/ConversionBand.vue'

describe('ConversionBand', () => {
  it('its call-to-action routes to /signup', async () => {
    const component = await mountSuspended(ConversionBand, {
      props: {
        title: 'Ready to reimagine how you learn?',
        description: 'Get an AI agent guiding your progress.',
        benefits: [
          { label: 'Learn any skill, guided', icon: 'i-lucide-compass' }
        ]
      }
    })

    const cta = component.find('a[href="/signup"]')
    expect(cta.exists()).toBe(true)
  })

  it('renders every benefit label', async () => {
    const benefits = [
      { label: 'Learn any skill, guided', icon: 'i-lucide-compass' },
      { label: 'Earn a certificate', icon: 'i-lucide-award' }
    ]
    const component = await mountSuspended(ConversionBand, {
      props: { title: 't', description: 'd', benefits }
    })

    for (const benefit of benefits) {
      expect(component.text()).toContain(benefit.label)
    }
  })
})
