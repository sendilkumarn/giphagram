import { mount } from '@vue/test-utils'

import App from '@/App.vue'

describe('App.vue', () => {
  it('should load the application', () => {
    const wrapper = mount(App)
    expect(wrapper.find('#app').isVisible()).toBeTruthy()
    expect(wrapper.find('.container').isVisible()).toBeTruthy()
    expect(wrapper.find('#gif-search').isVisible()).toBeTruthy()
    expect(wrapper.find('#toggle-display').isVisible()).toBeTruthy()
    expect(wrapper.findAll('.image-holder').length).toBe(0)
  })
})
