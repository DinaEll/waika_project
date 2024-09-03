import type { FieldCell } from '../types'
import { MahjongHelper } from '../model/MahjongHelper'

describe('MahjongHelper', () => {
  describe('fillFieldWithPairs', () => {
    it('should fill the field with given pairs', () => {
      const field: FieldCell[][] = [
        [null, null],
        [null, null],
      ]
      const pairs: FieldCell[] = [1, 2, 3, 4]
      const filledField = MahjongHelper.fillFieldWithPairs(field, pairs)

      expect(filledField).toEqual([
        [1, 2],
        [3, 4],
      ])
    })

    it('should not modify the original field', () => {
      const field: FieldCell[][] = [
        [null, null],
        [null, null],
      ]
      const pairs: FieldCell[] = [1, 2, 3, 4]
      MahjongHelper.fillFieldWithPairs(field, pairs)

      expect(field).toEqual([
        [null, null],
        [null, null],
      ])
    })

    it('should throw an error if pairs length does not match field size', () => {
      const field: FieldCell[][] = [
        [null, null],
        [null, null],
      ]
      const pairs: FieldCell[] = [1, 2, 3]

      expect(() => MahjongHelper.fillFieldWithPairs(field, pairs)).toThrow(
        'Check the length of the arrays'
      )
    })

    it('should handle null values in pairs', () => {
      const field: FieldCell[][] = [
        [null, null],
        [null, null],
      ]
      const pairs: FieldCell[] = [1, null, 3, null]
      const filledField = MahjongHelper.fillFieldWithPairs(field, pairs)

      expect(filledField).toEqual([
        [1, null],
        [3, null],
      ])
    })
  })
})
