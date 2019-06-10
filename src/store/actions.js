import { loadImageData } from '../services/giphyService'
import * as types from './mutation-actions'

export const triggerNewSearch = ({ commit, dispatch }, query) => {
  commit(types.TRIGGER_NEW_SEARCH, query)
  dispatch(types.RESET_OFFSET)
}

export const resetOffset = ({ commit }) => commit(types.RESET_OFFSET)

export const loadImages = async ({ state, dispatch }, payload) => {
  const response = await loadImageData(state.query, state.offset)
  if (response && response.data) {
    const imageList = response.data.data

    if (payload.isNewSearch) {
      dispatch(types.RESET_IMAGES)
    }

    if (imageList && imageList.length !== 0) {
      dispatch(types.LOAD_IMAGES_SUCCESS, imageList)
    } else {
      if (payload.isNewSearch) {
        dispatch(types.LOAD_IMAGES_ERROR)
      } else {
        dispatch(types.NO_MORE_IMAGES)
      }
    }

    dispatch(types.UPDATE_OFFSET)
  } else {
    dispatch(types.LOAD_IMAGES_ERROR)
  }
}

export const resetImages = ({ commit }) => commit(types.RESET_IMAGES)

export const loadImagesSuccess = ({ commit, state, dispatch }, imageList) => {
  dispatch(types.RESET_ERROR)
  commit(types.LOAD_IMAGES_SUCCESS, imageList)
}

export const loadImagesError = ({ commit }) => commit(types.LOAD_IMAGES_ERROR)

export const noMoreImages = ({ commit }) => commit(types.NO_MORE_IMAGES)

export const resetError = ({ commit }) => commit(types.RESET_ERROR)

export const updateOffset = ({ commit }) => commit(types.UPDATE_OFFSET)

export const changeDisplay = ({ commit }) => commit(types.CHANGE_DISPLAY)
