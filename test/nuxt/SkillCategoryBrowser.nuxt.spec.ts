import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SkillCategoryBrowser from '~/components/SkillCategoryBrowser.vue'

const categories = [
  {
    label: 'Data & Analytics',
    tracks: [
      { title: 'Data analysis foundations', level: 'Foundational', detail: 'x', icon: 'i-lucide-chart-line' }
    ]
  },
  {
    label: 'Programming',
    tracks: [
      { title: 'Programming fundamentals', level: 'Foundational', detail: 'y', icon: 'i-lucide-code' }
    ]
  }
]

describe('SkillCategoryBrowser', () => {
  it('shows the first category track set by default', async () => {
    const component = await mountSuspended(SkillCategoryBrowser, {
      props: { categories }
    })

    expect(component.text()).toContain('Data analysis foundations')
    expect(component.text()).not.toContain('Programming fundamentals')
  })

  it('selecting a different category tab updates the visible track set', async () => {
    const component = await mountSuspended(SkillCategoryBrowser, {
      props: { categories }
    })

    const tabs = component.findAll('[role="tab"]')
    expect(tabs.length).toBe(2)

    await tabs[1]!.trigger('mousedown', { button: 0 })
    await component.vm.$nextTick()

    expect(component.text()).toContain('Programming fundamentals')
    expect(component.text()).not.toContain('Data analysis foundations')
  })
})
