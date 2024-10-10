import { createUniqueNumbers } from './createUniqueNumbers';

describe('Mahjong lib', () => {
  describe('createUniqueNumbers', () => {
    it('should return an array of the specified length', () => {
      const result = createUniqueNumbers(5);
      expect(result).toHaveLength(5);
    });

    it('should return an array with unique numbers', () => {
      const result = createUniqueNumbers(10);
      const uniqueSet = new Set(result);
      expect(uniqueSet.size).toBe(result.length);
    });

    it('should return numbers from 1 to the specified length', () => {
      const result = createUniqueNumbers(7);
      expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7]));
    });

    it('should return an empty array when length is 0', () => {
      const result = createUniqueNumbers(0);
      expect(result).toEqual([]);
    });

    it('should return [1] when length is 1', () => {
      const result = createUniqueNumbers(1);
      expect(result).toEqual([1]);
    });
  });
});
