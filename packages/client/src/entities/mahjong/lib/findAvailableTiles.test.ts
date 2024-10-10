import { findAvailableTiles } from './findAvailableTiles';

describe('Mahjong lib', () => {
  describe('findAvailableTiles', () => {
    it('should return avalaible tiles', () => {
      const field = [
        [
          [28, 18, 26, 10, 3, 1],
          [4, 24, 5, 25, 7, 15],
          [6, 14, 9, 13, 8, 12],
          [23, 17, 2, 21, 11, 20],
          [22, 27, 16, 19, 24, 18],
          [26, 10, 3, 1, 4, 28],
        ],
        [
          [null, null, null, null, null, null],
          [null, 5, 25, 7, 15, null],
          [null, 6, 14, 9, 13, null],
          [null, 8, 12, 23, 17, null],
          [null, null, 21, 11, 20, null],
          [null, null, null, null, null, null],
        ],
        [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, 22, 27, null, null],
          [null, null, 16, 19, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
        ],
      ];

      const availableTiles = findAvailableTiles(field);
      expect(availableTiles).toEqual([
        { number: 28, x: 0, y: 0, z: 0 },
        { number: 1, x: 5, y: 0, z: 0 },
        { number: 26, x: 0, y: 5, z: 0 },
        { number: 28, x: 5, y: 5, z: 0 },
        { number: 5, x: 1, y: 1, z: 1 },
        { number: 15, x: 4, y: 1, z: 1 },
        { number: 8, x: 1, y: 3, z: 1 },
        { number: 21, x: 2, y: 4, z: 1 },
        { number: 20, x: 4, y: 4, z: 1 },
        { number: 22, x: 2, y: 2, z: 2 },
        { number: 27, x: 3, y: 2, z: 2 },
        { number: 16, x: 2, y: 3, z: 2 },
        { number: 19, x: 3, y: 3, z: 2 },
      ]);
    });
  });
});
