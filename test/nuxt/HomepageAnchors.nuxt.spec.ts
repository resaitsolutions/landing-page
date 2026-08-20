// Regression guard for the homepage hero anchor wiring — this exact
// defect (hero link's target id never rendered) was found and fixed
// in the prior visual-redesign change; this test fails if it regresses.
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('homepage anchor wiring', () => {
  it('the hero "See how it works" link target id is rendered on the page', async () => {
    const component = await mountSuspended(IndexPage, { route: '/' })

    const heroLink = component.find('a[href="#features"]')
    expect(heroLink.exists()).toBe(true)

    const target = component.find('#features')
    expect(target.exists()).toBe(true)
  })

  it('the Popular Skills index anchor target is rendered', async () => {
    const component = await mountSuspended(IndexPage, { route: '/' })

    const target = component.find('#skills')
    expect(target.exists()).toBe(true)
  })
})
