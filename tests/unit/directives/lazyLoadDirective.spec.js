import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import LazyLoadDirective from '../../../src/directives/LazyLoadDirective'

describe('LazyLoadDirective', () => {
  it('renders data URL into the src of the image', () => {
    const URL = 'something.png'

    const testComponent = Vue.component('test', {
      directives: {
        'lazyImageLoader': LazyLoadDirective
      },
      attachToDocument: true,
      data: function () {
        return {
          url: URL
        }
      },
      template: '<div v-lazyImageLoader> <img :data-url="url" /> </div>'
    })

    const wrapper = mount(testComponent)

    expect(wrapper.find('img').attributes('src')).toBe(URL)
  })

  it('renders data URL into the src of the image, when undefined', () => {
    const URL = ''
    const testComponent = Vue.component('test', {
      directives: {
        'lazyImageLoader': LazyLoadDirective
      },
      data: function () {
        return {
          url: URL
        }
      },
      template: '<div v-lazyImageLoader> <img :data-url="url" /> </div>'
    })

    const wrapper = mount(testComponent)

    expect(wrapper.find('img').attributes('src')).toBeUndefined()
  })

  it('calls the notification observer once the component is mounted', () => {
    global.IntersectionObserver = jest.fn(function () {
      this.observe = jest.fn()
      this.unobserve = jest.fn()
    })

    const URL = 'something.png'
    const calls = global.IntersectionObserver.mock.calls
    const testComponent = Vue.component('test', {
      directives: {
        'lazyImageLoader': LazyLoadDirective
      },
      data: function () {
        return {
          url: URL
        }
      },
      template: '<div> <div v-lazyImageLoader> <img :data-url="url" /> </div> <div v-lazyImageLoader> <img :data-url="url" /> </div> </div>'
    })
    mount(testComponent)
    expect(calls.length).toBe(2)
  })

  describe('renders the element into view', () => {
    const unobserve = jest.fn()

    beforeAll(() => {
      const mockEntry = { isIntersecting: true }

      window.IntersectionObserver = jest.fn(function () {
        this.observe = () => {}
        this.unobserve = unobserve
      })

      const testComponent = Vue.component('test', {
        directives: {
          'lazyImageLoader': LazyLoadDirective
        },
        template: '<div v-lazyImageLoader> <img /> </div>'
      })

      shallowMount(testComponent)

      const observerCallback = window.IntersectionObserver.mock.calls[0][0]

      const ob = new window.IntersectionObserver()
      observerCallback([mockEntry], ob)
    })

    it('disconnects the observer', () => {
      expect(unobserve).toBeCalled()
    })
  })
})
