import { isDefined } from './isDefined';

describe('isDefined', () => {
  it('should return true for non-null and non-undefined values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isDefined(() => {})).toBe(true);
  });

  it('should return false for null', () => {
    expect(isDefined(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });

  it('should return true for truthy values', () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined('hello')).toBe(true);
    expect(isDefined(' ')).toBe(true);
    expect(isDefined(true)).toBe(true);
    expect(isDefined([1, 2, 3])).toBe(true);
  });

  it('should work with objects', () => {
    const complexObject = { a: 1, b: { c: 2 } };
    expect(isDefined(complexObject)).toBe(true);
    expect(isDefined(complexObject.a)).toBe(true);
    expect(isDefined(complexObject.b)).toBe(true);
    expect(isDefined(complexObject.b.c)).toBe(true);
  });
});
