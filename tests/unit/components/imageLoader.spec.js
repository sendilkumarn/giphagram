import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import ImageLoader from '@/components/ImageLoader.vue'
import LazyLoadDirective from '../../../src/directives/LazyLoadDirective'

const localVue = createLocalVue()
localVue.directive('lazyImageLoader', LazyLoadDirective)

describe('ImageLoader.vue', () => {
  it('renders spinner when the props.image is empty', () => {
    const wrapper = mount(ImageLoader, {
      localVue
    })

    expect(wrapper.findAll('.ripple').length).toBe(1)
  })

  it('renders the image when the props.image is a value', () => {
    const localVue = createLocalVue()

    localVue.directive('lazyImageLoader', LazyLoadDirective)
    const wrapper = shallowMount(ImageLoader, {
      localVue,
      propsData: {
        image: {
          title: 'randomTitle',
          fixed_height_small: {
            url: 'randomUrl'
          }
        }
      }
    })

    expect(wrapper.find('img').attributes('src')).toBe('randomUrl')
    expect(wrapper.find('img').attributes('alt')).toBe('randomTitle')
  })
})
