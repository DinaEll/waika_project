import { MahjongHelper } from '../model/MahjongHelper';
import type { FieldCell } from '../types';

describe('MahjongHelper', () => {
  describe('checkPairsAvailable', () => {
    it('should return true when there are available pairs', () => {
      const field: FieldCell[][] = [
        [1, 2, 3],
        [null, 1, 4],
        [3, 6, 2],
      ];
      expect(MahjongHelper.checkPairsAvailable(field)).toBe(true);
    });

    it('should return false when there are no available elements', () => {
      const field: FieldCell[][] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
      expect(MahjongHelper.checkPairsAvailable(field)).toBe(false);
    });

    it('should return false when there are available elements but no pairs', () => {
      const field: FieldCell[][] = [
        [1, 2, 3],
        [null, 4, 5],
        [6, 7, 8],
      ];
      expect(MahjongHelper.checkPairsAvailable(field)).toBe(false);
    });
  });
});
