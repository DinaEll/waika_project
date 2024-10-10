import { shufflePairs } from './shufflePairs';

describe('Mahjong lib', () => {
  describe('shufflePairs', () => {
    it('should return an array of the same length as the input', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8];
      const arr = shufflePairs(input);

      expect(arr.length).toBe(input.length);
    });

    it('should contain all the same elements as the input', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8];
      const arr = shufflePairs(input);

      expect(arr).toEqual(expect.arrayContaining(input));
    });

    it('should handle an empty array', () => {
      const input: number[] = [];
      const arr = shufflePairs(input);

      expect(arr).toEqual([]);
    });
  });
});
