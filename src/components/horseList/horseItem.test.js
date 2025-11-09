import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseItem from './horseItem.vue'

describe('HorseItem', () => {
  const mockHorse = {
    id: 1,
    name: 'Test Horse',
    color: 'Red',
    condition: 85
  }

  it('should render horse information', () => {
    const wrapper = mount(HorseItem, {
      props: {
        horse: mockHorse
      }
    })

    expect(wrapper.text()).toContain('Test Horse')
    expect(wrapper.text()).toContain('85')
    expect(wrapper.text()).toContain('Red')
  })

  it('should display color indicator with correct background color', () => {
    const wrapper = mount(HorseItem, {
      props: {
        horse: mockHorse
      }
    })

    const colorIndicator = wrapper.find('.color-indicator')
    expect(colorIndicator.exists()).toBe(true)
    expect(colorIndicator.attributes('style')).toContain('background-color: rgb(255, 0, 0)')
  })
})

