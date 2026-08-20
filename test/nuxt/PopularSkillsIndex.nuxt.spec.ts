import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PopularSkillsIndex from '~/components/PopularSkillsIndex.vue'

describe('PopularSkillsIndex', () => {
  it('every rendered link matches an existing app route or in-page anchor', async () => {
    const groups = [
      {
        label: 'Development',
        skills: [
          { label: 'Programming fundamentals', to: '/#skills' },
          { label: 'Building your first project', to: '/#skills' }
        ]
      },
      {
        label: 'Design',
        skills: [
          { label: 'Design fundamentals', to: '/#skills' }
        ]
      }
    ]

    const component = await mountSuspended(PopularSkillsIndex, {
      props: { groups }
    })

    const links = component.findAll('a[href]')
    expect(links.length).toBe(3)

    for (const link of links) {
      const href = link.attributes('href')
      expect(href).toBe('/#skills')
    }
  })

  it('renders one nav landmark per group with a matching accessible label', async () => {
    const groups = [
      { label: 'Development', skills: [{ label: 'x', to: '/#skills' }] },
      { label: 'Design', skills: [{ label: 'y', to: '/#skills' }] }
    ]

    const component = await mountSuspended(PopularSkillsIndex, {
      props: { groups }
    })

    const navs = component.findAll('nav')
    expect(navs).toHaveLength(2)
    expect(navs[0]!.attributes('aria-label')).toBe('Development')
    expect(navs[1]!.attributes('aria-label')).toBe('Design')
  })
})
