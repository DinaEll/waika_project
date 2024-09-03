import type { FieldCell } from '../types';
import { MahjongHelper } from '../model/MahjongHelper';

describe('MahjongHelper', () => {
  describe('generateField', () => {
    it('should generate a field with correct dimensions', () => {
      const size = 16;
      const pairs: FieldCell[] = [
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
      ];
      const field = MahjongHelper.generateField(size, pairs);

      expect(field.length).toBe(4);
      expect(field[0].length).toBe(4);
    });

    it('should fill the field with provided pairs', () => {
      const size = 16;
      const pairs: FieldCell[] = [
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
      ];
      const field = MahjongHelper.generateField(size, pairs);

      const flatField = field.flat();
      expect(flatField).toEqual(expect.arrayContaining(pairs));
      expect(flatField.length).toBe(pairs.length);
    });

    it('should throw an error if size is not even', () => {
      const size = 15;
      const pairs: FieldCell[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8];

      expect(() => {
        MahjongHelper.generateField(size, pairs);
      }).toThrow('The number of tiles must be even');
    });

    it('should throw an error if pairs length does not match field size', () => {
      const size = 16;
      const pairs: FieldCell[] = [1, 1, 2, 2, 3, 3, 4, 4];

      expect(() => {
        MahjongHelper.generateField(size, pairs);
      }).toThrow('Check the length of the arrays');
    });

    it('should generate a field with null values if provided', () => {
      const size = 16;
      const pairs: FieldCell[] = [
        1,
        null,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
      ];
      const field = MahjongHelper.generateField(size, pairs);

      expect(field.flat()).toContain(null);
    });
  });
});
