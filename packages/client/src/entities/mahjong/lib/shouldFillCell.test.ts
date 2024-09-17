import { shouldFillCell } from './shouldFillCell';

describe('Mahjong lib', () => {
  describe('shouldFillCell', () => {
    it('should return true for all cells when level is 0', () => {
      expect(shouldFillCell(0, 0, 0, 5, 5)).toBe(true);
      expect(shouldFillCell(0, 4, 4, 5, 5)).toBe(true);
    });

    it('should return true for inner cells when level is 1', () => {
      expect(shouldFillCell(1, 1, 1, 5, 5)).toBe(true);
      expect(shouldFillCell(1, 2, 2, 5, 5)).toBe(true);
      expect(shouldFillCell(1, 3, 3, 5, 5)).toBe(true);
    });

    it('should return false for edge cells when level is 1', () => {
      expect(shouldFillCell(1, 0, 0, 5, 5)).toBe(false);
      expect(shouldFillCell(1, 0, 2, 5, 5)).toBe(false);
      expect(shouldFillCell(1, 2, 0, 5, 5)).toBe(false);
      expect(shouldFillCell(1, 4, 4, 5, 5)).toBe(false);
    });

    it('should return true for inner cells when level is 2', () => {
      expect(shouldFillCell(2, 2, 2, 7, 7)).toBe(true);
      expect(shouldFillCell(2, 3, 3, 7, 7)).toBe(true);
      expect(shouldFillCell(2, 4, 4, 7, 7)).toBe(true);
    });

    it('should return false for outer cells when level is 2', () => {
      expect(shouldFillCell(2, 0, 0, 7, 7)).toBe(false);
      expect(shouldFillCell(2, 1, 1, 7, 7)).toBe(false);
      expect(shouldFillCell(2, 5, 5, 7, 7)).toBe(false);
      expect(shouldFillCell(2, 6, 6, 7, 7)).toBe(false);
    });
  });
});
