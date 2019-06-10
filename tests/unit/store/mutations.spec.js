import { mutations } from '../../../src/store/mutations'
import { createList } from '../testUtils'

const { triggerNewSearch, loadImagesError, noMoreImages, changeDisplay, resetOffset, updateOffset, resetImages, loadImagesSuccess, resetError } = mutations

const validateImageList = (givenArr, arr, isPresent) => {
  arr.forEach(val => {
    if (isPresent) {
      expect(givenArr).toContain(val)
    } else {
      expect(givenArr).not.toContain(val)
    }
  })
}

describe('mutations', () => {
  describe('triggerNewSearch', () => {
    it('sets the search query', () => {
      const state = { query: '' }
      triggerNewSearch(state, 'cat')
      expect(state.query).toBe('cat')
    })

    it('changes the search query to a new value', () => {
      const state = { query: 'cat' }
      triggerNewSearch(state, 'dog')
      expect(state.query).toBe('dog')
    })
  })

  describe('resetOffset', () => {
    it('sets the offset to zero', () => {
      const state = { offset: 0 }
      resetOffset(state)
      expect(state.offset).toBe(0)
    })

    it('resets the offset to zero', () => {
      const state = { offset: 1000 }
      resetOffset(state)
      expect(state.offset).toBe(0)
    })
  })

  describe('updateOffset', () => {
    it('updates the offset equal to the available imagelist', () => {
      const state = { offset: 0, imageList: createList(5) }
      updateOffset(state)
      expect(state.offset).toBe(5)
    })

    it('updates the offset equal to the available imagelist size', () => {
      const state = { offset: 10, imageList: createList(5) }
      updateOffset(state)
      expect(state.offset).toBe(5)
    })

    it('updates the offset to zero when the imagelist is zero', () => {
      const state = { offset: 10, imageList: createList(0) }
      updateOffset(state)
      expect(state.offset).toBe(0)
    })

    it('updates the offset to zero when the imagelist is not available', () => {
      const state = { offset: 10 }
      updateOffset(state)
      expect(state.offset).toBe(0)
    })
  })

  describe('resetImages', () => {
    it('sets the images to empty', () => {
      const state = { imageList: [] }
      resetImages(state)
      expect(state.imageList.length).toBe(0)
    })

    it('resets the images to empty', () => {
      const state = { imageList: createList(10) }
      resetImages(state)
      expect(state.imageList.length).toBe(0)
    })
  })

  describe('loadImagesSuccess', () => {
    it('appends to the imageList', () => {
      const existingList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      const newList = createList(10)
      const state = { imageList: existingList }

      loadImagesSuccess(state, newList)

      expect(state.imageList.length).toBe(20)
      validateImageList(state.imageList, existingList, true)
      validateImageList(state.imageList, newList, true)
    })

    it('adds to the imageList', () => {
      const existingList = []
      const newList = createList(10)
      const state = { imageList: existingList }

      loadImagesSuccess(state, newList)

      expect(state.imageList.length).toBe(10)
      validateImageList(state.imageList, newList, true)
    })
  })

  describe('loadImagesError', () => {
    it('sets the search query', () => {
      const state = { error: '' }
      loadImagesError(state)
      expect(state.error).toBe('Error loading images try searching other.')
    })
  })

  describe('noMoreImages', () => {
    it('sets the search query', () => {
      const state = { error: '' }
      noMoreImages(state)
      expect(state.error).toBe('Image Loading error.')
    })
  })

  describe('resetError', () => {
    it('sets the error to empty', () => {
      const state = { error: '' }
      resetError(state)
      expect(state.error).toBe('')
    })

    it('resets the error to empty', () => {
      const state = { error: 'some error' }
      resetError(state)
      expect(state.error).toBe('')
    })
  })

  describe('changeDisplay', () => {
    it('switches from single mode to triple mode', () => {
      const state = { displayMode: 'single' }
      changeDisplay(state)
      expect(state.displayMode).toBe('triple')
    })

    it('switches from triple mode to single mode', () => {
      const state = { displayMode: 'triple' }
      changeDisplay(state)
      expect(state.displayMode).toBe('single')
    })

    it('sets to single mode when the display mode is not available', () => {
      const state = { }
      changeDisplay(state)
      expect(state.displayMode).toBe('single')
    })

    it('sets to single mode when the display mode is not valid', () => {
      const state = { displayMode: 'some weird display' }
      changeDisplay(state)
      expect(state.displayMode).toBe('single')
    })
  })
})
