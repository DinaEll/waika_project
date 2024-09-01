import { MahjongHelper } from '../model/MahjongHelper'

describe('MahjongHelper', () => {
  describe('findAvalaibleElements', () => {
    it('should return avalaible elements', () => {
      const matrix = [
        [1, 2, 3],
        [1, 2, 6],
        [null, 5, 3],
      ]
      const avalaibleElements = MahjongHelper.findAvalaibleElements(matrix)

      expect(avalaibleElements).toEqual([
        { id: 1, positionX: 0, positionY: 0 },
        { id: 3, positionX: 0, positionY: 2 },
        { id: 1, positionX: 1, positionY: 0 },
        { id: 5, positionX: 2, positionY: 1 },
        { id: 3, positionX: 2, positionY: 2 },
      ])
    })
  })
})
