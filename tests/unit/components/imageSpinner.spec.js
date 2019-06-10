import { shallowMount } from '@vue/test-utils'
import ImageSpinner from '@/components/ImageSpinner.vue'

describe('ImageSpinner.vue', () => {
  it('renders when mounted', () => {
    const wrapper = shallowMount(ImageSpinner)
    expect(wrapper.find('.ripple').isVisible).toBeTruthy()
    expect(wrapper.findAll('.ripple').length).toBe(1)
  })
})
