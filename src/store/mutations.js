import * as types from './mutation-actions'

export const mutations = {
  [types.TRIGGER_NEW_SEARCH] (state, query) {
    state.query = query
  },

  [types.RESET_OFFSET] (state) {
    state.offset = 0
  },

  [types.UPDATE_OFFSET] (state) {
    if (state.imageList) {
      state.offset = state.imageList.length
    } else {
      state.offset = 0
    }
  },

  [types.RESET_IMAGES] (state) {
    state.imageList = []
  },

  [types.LOAD_IMAGES_SUCCESS] (state, imageList) {
    state.imageList = state.imageList.concat(...imageList)
  },

  [types.LOAD_IMAGES_ERROR] (state) {
    state.error = 'Error loading images try searching other.'
  },

  [types.NO_MORE_IMAGES] (state) {
    state.error = 'Image Loading error.'
  },

  [types.RESET_ERROR] (state) {
    state.error = ''
  },

  [types.CHANGE_DISPLAY] (state) {
    state.displayMode = state.displayMode === 'single' ? 'triple' : 'single'
  }
}
