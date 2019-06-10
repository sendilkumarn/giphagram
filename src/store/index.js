import Vue from 'vue'
import Vuex from 'vuex'

import { mutations } from './mutations'
import * as actions from './actions'
import { getters } from './getters'

Vue.use(Vuex)

export const INITIAL_STATE = {
  query: '',
  offset: 0,
  imageList: [],
  displayMode: 'single',
  error: ''
}

export default new Vuex.Store({
  state: INITIAL_STATE,
  mutations,
  actions,
  getters
})
