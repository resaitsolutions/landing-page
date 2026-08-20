// Regression guard for the pricing monthly/yearly toggle. Mounts the
// real page component (not a copy) so the test fails if the toggle's
// state-transition behavior regresses.
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PricingPage from '~/pages/pricing.vue'

describe('pricing monthly/yearly toggle', () => {
  it('starts on Monthly and flips aria-pressed correctly on click', async () => {
    const component = await mountSuspended(PricingPage, { route: '/pricing' })

    const buttons = component.findAll('button[aria-pressed]')
    expect(buttons).toHaveLength(2)

    const monthlyBtn = buttons[0]!
    const yearlyBtn = buttons[1]!
    expect(monthlyBtn.attributes('aria-pressed')).toBe('true')
    expect(yearlyBtn.attributes('aria-pressed')).toBe('false')

    await yearlyBtn.trigger('click')

    expect(monthlyBtn.attributes('aria-pressed')).toBe('false')
    expect(yearlyBtn.attributes('aria-pressed')).toBe('true')

    await monthlyBtn.trigger('click')

    expect(monthlyBtn.attributes('aria-pressed')).toBe('true')
    expect(yearlyBtn.attributes('aria-pressed')).toBe('false')
  })
})
