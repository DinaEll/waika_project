import { MahjongHelper } from '../model/MahjongHelper'

describe('MahjongHelper', () => {
  describe('shuffleRandomPairs', () => {
    it('should return an array of the same length as the input', () => {
      const input = [1, 2, 3, 4, 5, null, 6, 7, 8, null]
      const arr = MahjongHelper.shuffleRandomPairs(input)

      expect(arr.length).toBe(input.length)
    })

    it('should contain all the same elements as the input', () => {
      const input = [1, 2, 3, 4, 5, null, 6, 7, 8, null]
      const arr = MahjongHelper.shuffleRandomPairs(input)

      expect(arr).toEqual(expect.arrayContaining(input))
    })

    it('should maintain the position of null elements', () => {
      const input = [1, null, 2, 3, null, 4, 5]
      const arr = MahjongHelper.shuffleRandomPairs(input)

      expect(arr[1]).toBeNull()
      expect(arr[4]).toBeNull()
    })

    it('should handle an empty array', () => {
      const input: number[] = []
      const arr = MahjongHelper.shuffleRandomPairs(input)

      expect(arr).toEqual([])
    })
  })
})
