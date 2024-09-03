import { MahjongHelper } from '../model/MahjongHelper';

describe('MahjongHelper', () => {
  describe('createUniqueRandomArray', () => {
    const length = 16;

    it('should return an empty array', () => {
      const arr = MahjongHelper.createUniqueRandomArray(0);

      expect(arr).toEqual([]);
    });

    it('should return an array of the specified length', () => {
      const arr = MahjongHelper.createUniqueRandomArray(length);

      expect(arr.length).toBe(length);
    });

    it('should return an array with unique elements', () => {
      const arr = MahjongHelper.createUniqueRandomArray(length);
      const uniqueSet = new Set(arr);

      expect(uniqueSet.size).toBe(length);
    });

    it('should contain numbers from 1 to the specified length', () => {
      const arr = MahjongHelper.createUniqueRandomArray(length);
      for (let i = 1; i <= length; i++) {
        expect(arr).toContain(i);
      }
    });

    it('should return different arrays on multiple calls', () => {
      const arr1 = MahjongHelper.createUniqueRandomArray(length);
      const arr2 = MahjongHelper.createUniqueRandomArray(length);

      expect(arr1).not.toEqual(arr2);
    });
  });
});
