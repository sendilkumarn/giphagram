import { mount } from '@vue/test-utils'

import Giphagram from '@/components/Giphagram.vue'

describe('Giphagram.vue', () => {
  it('should load the search bar when the state is empty', () => {
    const wrapper = mount(Giphagram)
    expect(wrapper.find('.container').isVisible()).toBeTruthy()
    expect(wrapper.find('#gif-search').isVisible()).toBeTruthy()
    expect(wrapper.find('#toggle-display').isVisible()).toBeTruthy()
    expect(wrapper.findAll('.image-holder').length).toBe(0)
  })
})
