import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('should format time with hours, minutes, and seconds', () => {
    expect(formatTime(3661000)).toBe('01:01:01');
    expect(formatTime(7322000)).toBe('02:02:02');
  });

  it('should format time with only minutes and seconds', () => {
    expect(formatTime(59000)).toBe('00:59');
    expect(formatTime(599000)).toBe('09:59');
  });

  it('should handle zero milliseconds', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(500)).toBe('00:00');
  });
});
