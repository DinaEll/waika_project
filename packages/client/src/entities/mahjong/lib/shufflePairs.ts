import type { MahjongFieldCell } from '../types';

export function shufflePairs<T extends NonNullable<MahjongFieldCell>>(
  pairs: T[],
): T[] {
  return pairs.sort(() => Math.random() - 0.5);
}
