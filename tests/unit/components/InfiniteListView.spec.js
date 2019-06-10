import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import InfiniteListView from '@/components/InfiniteListView.vue'
import * as actions from '../../../src/store/actions'
import { mutations } from '../../../src/store/mutations'
import { INITIAL_STATE } from '../../../src/store'
import { getters } from '../../../src/store/getters'
import { createList } from '../testUtils'
import LazyLoadDirective from '../../../src/directives/LazyLoadDirective'

const localVue = createLocalVue()

const flushPromises = () => new Promise(setImmediate)

localVue.use(Vuex)
localVue.directive('lazyImageLoader', LazyLoadDirective)
jest.mock('axios')

let store

global.scrollTo = jest.fn()

beforeEach(() => {
  store = new Vuex.Store({
    state: INITIAL_STATE,
    actions,
    mutations,
    getters
  })
})

const checkImageList = (wrapper, numberOfImages) =>
  expect(wrapper.findAll('.image-holder').length).toBe(numberOfImages)

const checkListDisplayMode = (wrapper, mode, givenLength) =>
  expect(wrapper.findAll(`.${mode}`).length).toBe(givenLength)

describe('InfiniteListView.vue', () => {
  it('calls the scroll when the component is scrolled', () => {
    const scroll = jest.fn()
    mount(InfiniteListView, {
      methods: {
        scroll
      },
      localVue
    })

    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))

    Vue.nextTick(() => {
      expect(scroll.mock.calls.length).toBe(3)
    })
  })

  it('renders no images when the imageList is empty', () => {
    const wrapper = shallowMount(InfiniteListView, {
      localVue
    })
    checkImageList(wrapper, 0)
  })

  it('renders images when the imageList has value', async () => {
    store.state.imageList = createList(5)

    const wrapper = shallowMount(InfiniteListView, {
      store,
      localVue
    })

    await flushPromises()

    checkImageList(wrapper, 5)
  })

  it('renders images in a single column by default', async () => {
    store.state.imageList = createList(10)

    const wrapper = shallowMount(InfiniteListView, {
      store,
      localVue
    })

    await flushPromises()

    checkImageList(wrapper, 10)
    checkListDisplayMode(wrapper, 'single', 10)
  })

  it('renders images in three columns when display mode is set to triple', () => {
    store.state.imageList = createList(10)
    store.state.displayMode = 'triple'

    const wrapper = shallowMount(InfiniteListView, {
      store,
      localVue
    })

    checkImageList(wrapper, 10)
    checkListDisplayMode(wrapper, 'triple', 10)
  })

  it('appends images when the page is scrolled', async () => {
    let localStore = new Vuex.Store({
      state: {
        imageList: createList(5),
        query: 'cat',
        offset: 5,
        displayMode: 'single',
        error: ''
      },
      actions,
      mutations,
      getters
    })

    axios.get.mockResolvedValue({ data: { data: [5, 6, 7, 8, 9] } })

    mount(InfiniteListView, {
      store: localStore,
      localVue
    })

    window.innerHeight = 0
    window.dispatchEvent(new Event('scroll'))

    await flushPromises()
    expect(localStore.state.imageList.length).toBe(10)
  })
})
