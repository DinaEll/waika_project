import { getFlattenField } from './getFlattenField';
import type { MahjongFieldCell } from '../types';

describe('Mahjong lib', () => {
  describe('flattenField', () => {
    it('should return array from a two-dimensional array', () => {
      const field: MahjongFieldCell[][] = [
        [1, 2, 3],
        [null, 1, 4],
        [3, null, 2],
      ];

      expect(getFlattenField(field)).toEqual([1, 2, 3, null, 1, 4, 3, null, 2]);
    });

    it('should return array from a three-dimensional array', () => {
      const field = [
        [
          [28, null],
          [4, 24],
        ],
        [
          [1, 2],
          [null, 2],
        ],
        [
          [4, 2],
          [null, 5],
        ],
      ];

      expect(getFlattenField(field)).toEqual([
        28,
        null,
        4,
        24,
        1,
        2,
        null,
        2,
        4,
        2,
        null,
        5,
      ]);
    });

    it('should return array from a four-dimensional array', () => {
      const field = [
        [
          [28, null],
          [4, 24],
        ],
        [
          [1, 2],
          [null, 2],
        ],
        [
          [4, 2],
          [null, 5],
        ],
        [
          [1, null],
          [4, 2],
        ],
      ];

      expect(getFlattenField(field)).toEqual([
        28,
        null,
        4,
        24,
        1,
        2,
        null,
        2,
        4,
        2,
        null,
        5,
        1,
        null,
        4,
        2,
      ]);
    });
  });
});
