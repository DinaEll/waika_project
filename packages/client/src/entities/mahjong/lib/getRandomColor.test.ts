import { getRandomColor } from './getRandomColor';

describe('Mahjong lib', () => {
  describe('getRandomColor', () => {
    it('should return a string', () => {
      const color = getRandomColor();

      expect(typeof color).toBe('string');
    });

    it('should return a string starting with #', () => {
      const color = getRandomColor();

      expect(color.startsWith('#')).toBeTruthy();
    });

    it('should return a string with 7 characters', () => {
      const color = getRandomColor();

      expect(color.length).toBe(7);
    });

    it('should return a valid hexadecimal color code', () => {
      const color = getRandomColor();

      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });

    it('should return different colors on multiple calls', () => {
      const color1 = getRandomColor();
      const color2 = getRandomColor();

      expect(color1).not.toBe(color2);
    });
  });
});
