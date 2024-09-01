import type { FieldCell } from '../types'
import { MahjongHelper } from '../model/MahjongHelper'

describe('MahjongHelper', () => {
  describe('checkAvailablePairs', () => {
    it('should return true when there are available pairs', () => {
      const field: FieldCell[][] = [
        [1, 2, 3],
        [null, 1, 4],
        [3, 6, 2],
      ]
      expect(MahjongHelper.checkAvailablePairs(field)).toBe(true)
    })

    it('should return false when there are no available elements', () => {
      const field: FieldCell[][] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]
      expect(MahjongHelper.checkAvailablePairs(field)).toBe(false)
    })

    it('should return false when there are available elements but no pairs', () => {
      const field: FieldCell[][] = [
        [1, 2, 3],
        [null, 4, 5],
        [6, 7, 8],
      ]
      expect(MahjongHelper.checkAvailablePairs(field)).toBe(false)
    })
  })
})
