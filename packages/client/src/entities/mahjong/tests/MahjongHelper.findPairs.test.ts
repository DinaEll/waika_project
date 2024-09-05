import { MahjongHelper } from '../model/MahjongHelper'

describe('MahjongHelper', () => {
  describe('findPairs', () => {
    it('should return an empty array', () => {
      const resource = [1, 2, 3, 4]
      const result = MahjongHelper.findPairs(resource)

      expect(result).toEqual([])
    })

    it('should return matrix array with 2 pair', () => {
      const resource = [1, 2, 3, 1]
      const result = MahjongHelper.findPairs(resource)

      expect(result).toEqual([[1, 1]])
    })

    it('should return array matrix with multiple pairs', () => {
      const resource = [1, 3, 1, 5, 3]
      const result = MahjongHelper.findPairs(resource)

      expect(result).toEqual([
        [1, 1],
        [3, 3],
      ])
    })
  })
})
