import { getters } from '../../../src/store/getters'
import { createList } from '../testUtils'

const imageList = createList(10)
const displayMode = 'single'

const state = { imageList, displayMode }

describe('getters', () => {
  describe('imageList', () => {
    it('gives the current image list', () => {
      const actual = getters.imageList(state)
      expect(actual).toBe(imageList)
    })
  })

  describe('displayMode', () => {
    it('gives the current display mode', () => {
      const actual = getters.displayMode(state)
      expect(actual).toBe(displayMode)
    })
  })
})
