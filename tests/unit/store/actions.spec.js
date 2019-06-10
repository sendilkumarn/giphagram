import axios from 'axios'

import * as actions from '../../../src/store/actions'
import * as types from '../../../src/store/mutation-actions'
import { createList } from '../testUtils'

jest.mock('axios')

describe('actions', () => {
  it('triggers a new search', () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const query = 'cat'

    actions.triggerNewSearch({ commit, dispatch }, query)

    expect(commit).toHaveBeenCalledWith(types.TRIGGER_NEW_SEARCH, query)
    expect(dispatch).toHaveBeenCalledWith(types.RESET_OFFSET)
  })

  it('resets the offset', () => {
    const commit = jest.fn()

    actions.resetOffset({ commit })

    expect(commit).toHaveBeenCalledWith(types.RESET_OFFSET)
  })

  it('resets the error', () => {
    const commit = jest.fn()

    actions.resetError({ commit })

    expect(commit).toHaveBeenCalledWith(types.RESET_ERROR)
  })

  it('resets the images', () => {
    const commit = jest.fn()

    actions.resetImages({ commit })

    expect(commit).toHaveBeenCalledWith(types.RESET_IMAGES)
  })

  it('emits no more images error', () => {
    const commit = jest.fn()

    actions.noMoreImages({ commit })

    expect(commit).toHaveBeenCalledWith(types.NO_MORE_IMAGES)
  })

  it('emits load images error', () => {
    const commit = jest.fn()

    actions.loadImagesError({ commit })

    expect(commit).toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
  })

  it('loads the images successfully', () => {
    const commit = jest.fn()
    const state = {}
    const dispatch = jest.fn()
    const payload = { imageList: [] }

    actions.loadImagesSuccess({ commit, state, dispatch }, payload)

    expect(commit).toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS, payload)
  })

  it('loads the images successfully and resets the error', () => {
    const commit = jest.fn()
    const state = { error: 'some error' }
    const dispatch = jest.fn()
    const payload = { imageList: [] }

    actions.loadImagesSuccess({ commit, state, dispatch }, payload)

    expect(dispatch).toHaveBeenCalledWith(types.RESET_ERROR)
    expect(commit).toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS, payload)
  })

  it('loads the image', async () => {
    axios.get.mockResolvedValue({ data: { data: createList(10) } })
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: ''
    }
    const payload = { isNewSearch: false }

    await actions.loadImages({ commit, dispatch, state }, payload)

    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_ERROR)
    expect(dispatch).toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS, createList(10))
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).not.toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('resets error and loads the image', async () => {
    axios.get.mockResolvedValue({ data: { data: createList(10) } })
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: 'some error'
    }
    const payload = { isNewSearch: false }

    await actions.loadImages({ commit, dispatch, state }, payload)

    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS, createList(10))
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).not.toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('throws error when the result is invalid', async () => {
    axios.get.mockResolvedValue({})
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: ''
    }

    await actions.loadImages({ commit, dispatch, state })

    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS)
    expect(dispatch).toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).not.toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('throws error when the result is empty', async () => {
    axios.get.mockResolvedValue({ data: { data: createList(0) } })
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: ''
    }
    const payload = { isNewSearch: false }

    await actions.loadImages({ commit, dispatch, state }, payload)

    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('throws error when the result is empty and not a new search', async () => {
    axios.get.mockResolvedValue({ data: { data: createList(0) } })
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: 'some error'
    }
    const payload = { isNewSearch: false }

    await actions.loadImages({ commit, dispatch, state }, payload)

    expect(dispatch).not.toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('throws error when the result is empty and a new search', async () => {
    axios.get.mockResolvedValue({ data: { data: createList(0) } })
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      query: 'cat',
      offset: 0,
      error: 'some error'
    }
    const payload = { isNewSearch: true }

    await actions.loadImages({ commit, dispatch, state }, payload)

    expect(dispatch).toHaveBeenCalledWith(types.RESET_IMAGES)
    expect(dispatch).not.toHaveBeenCalledWith(types.LOAD_IMAGES_SUCCESS)
    expect(dispatch).toHaveBeenCalledWith(types.LOAD_IMAGES_ERROR)
    expect(dispatch).not.toHaveBeenCalledWith(types.NO_MORE_IMAGES)
    expect(dispatch).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('updates the offset', () => {
    const commit = jest.fn()

    actions.updateOffset({ commit })

    expect(commit).toHaveBeenCalledWith(types.UPDATE_OFFSET)
  })

  it('changes the display', () => {
    const commit = jest.fn()

    actions.changeDisplay({ commit })

    expect(commit).toHaveBeenCalledWith(types.CHANGE_DISPLAY)
  })
})
