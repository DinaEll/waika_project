import { MahjongFieldCell } from '../types';

export function createUniqueNumbers(
  length: number,
): NonNullable<MahjongFieldCell>[] {
  const numbers = Array.from({ length }, (_, i) => i + 1);
  return numbers;
}
