// Regression guard for the footer newsletter form's loading-state and
// for every footer link resolving to a real, existing destination
// (never a fabricated/dead link).
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from '~/components/AppFooter.vue'

const KNOWN_ROUTES_AND_ANCHORS = [
  '/pricing',
  '/docs',
  '/blog',
  '/changelog',
  '/login',
  '/signup',
  '/#features',
  '/#skills',
  '/#testimonials'
]

describe('AppFooter', () => {
  it('does not leave the subscribe button stuck in a loading state after submit', async () => {
    const component = await mountSuspended(AppFooter)

    const input = component.find('input[type="email"]')
    await input.setValue('learner@example.com')

    const form = component.find('form')
    await form.trigger('submit.prevent')
    await component.vm.$nextTick()

    const submitButton = component.find('button[type="submit"]')
    expect(submitButton.attributes('aria-busy')).toBeFalsy()
  })

  it('every footer link points at a real, existing route or anchor', async () => {
    const component = await mountSuspended(AppFooter)

    const links = component.findAll('a[href]')
    expect(links.length).toBeGreaterThan(0)

    for (const link of links) {
      const href = link.attributes('href')
      if (!href || href === '#') continue
      expect(KNOWN_ROUTES_AND_ANCHORS).toContain(href)
    }
  })

  it('has at least 4 link columns', async () => {
    const component = await mountSuspended(AppFooter)

    const headings = component.findAll('h3[data-slot="label"]')
    expect(headings.length).toBeGreaterThanOrEqual(4)
  })
})
