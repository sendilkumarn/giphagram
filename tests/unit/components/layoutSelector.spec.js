import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import LayoutSelector from '@/components/LayoutSelector.vue'
import * as actions from '../../../src/store/actions'
import { mutations } from '../../../src/store/mutations'
import { getters } from '../../../src/store/getters'

const localVue = createLocalVue()

localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store({
    state: { displayMode: 'triple' },
    actions,
    mutations,
    getters
  })
})

const checkButton = wrapper => expect(wrapper.find('#toggle-display').isVisible()).toBeTruthy()

const validateButtonWithText = (wrapper, text) => expect(wrapper.text()).toMatch(text)

const clickButton = wrapper => wrapper.find('button').trigger('click')

const tripleColumn = 'Switch to 3-column'
const singleColumn = 'Switch to 1-column'

describe('LayoutSelector.vue', () => {
  it('renders the display in single column', () => {
    const wrapper = shallowMount(LayoutSelector)
    checkButton(wrapper)
    validateButtonWithText(wrapper, tripleColumn)
  })

  it('renders the display in 3-column when the store is updated', () => {
    const wrapper = shallowMount(LayoutSelector, {
      store,
      localVue
    })
    checkButton(wrapper)
    validateButtonWithText(wrapper, singleColumn)
  })

  it('change the display mode when the button is clicked ', () => {
    const wrapper = mount(LayoutSelector, {
      store,
      localVue
    })

    checkButton(wrapper)
    clickButton(wrapper)
    validateButtonWithText(wrapper, tripleColumn)

    checkButton(wrapper)
    clickButton(wrapper)
    validateButtonWithText(wrapper, singleColumn)

    checkButton(wrapper)
    clickButton(wrapper)
    validateButtonWithText(wrapper, tripleColumn)
  })

  it('call the show method when clicked', () => {
    const show = jest.fn()
    const wrapper = shallowMount(LayoutSelector, {
      methods: {
        show
      }
    })

    clickButton(wrapper)
    expect(show.mock.calls.length).toBe(1)
  })
})
