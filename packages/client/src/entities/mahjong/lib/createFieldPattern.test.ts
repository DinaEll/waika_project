/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFieldPattern } from './createFieldPattern';

describe('Mahjong lib', () => {
  describe('createFieldPattern', () => {
    it('should create a field with correct dimensions', () => {
      const { field } = createFieldPattern(7, 7, 3);

      expect(field.length).toBe(3);
      expect(field[0]!.length).toBe(7);
      expect(field[0]![0]!.length).toBe(7);
    });

    it('should create a field with correct number of available cells', () => {
      const { countCells } = createFieldPattern(8, 6, 2);

      expect(countCells).toBe(56);
    });

    it('should create a field with available cells in the middle of the first level', () => {
      const { field } = createFieldPattern(7, 7, 3);

      expect(field[2]![2]![2]).toBe(0);
      expect(field[2]![2]![3]).toBe(0);
      expect(field[2]![2]![4]).toBe(0);
      expect(field[2]![3]![2]).toBe(0);
      expect(field[2]![3]![3]).toBe(0);
      expect(field[2]![3]![4]).toBe(0);
      expect(field[2]![4]![2]).toBe(0);
      expect(field[2]![4]![3]).toBe(0);
      expect(field[2]![4]![4]).toBe(0);
    });
  });
});
