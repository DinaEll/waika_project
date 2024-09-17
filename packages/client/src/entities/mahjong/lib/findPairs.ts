import type { MahjongFieldCell } from '../types';

export function findPairs(
  pairs: NonNullable<MahjongFieldCell>[],
): [NonNullable<MahjongFieldCell>, NonNullable<MahjongFieldCell>][] {
  const foundPairs: ReturnType<typeof findPairs> = [];
  const seen = new Set<number>();

  pairs.forEach((cell) => {
    if (seen.has(cell)) {
      foundPairs.push([cell, cell]);
    } else {
      seen.add(cell);
    }
  });

  return foundPairs;
}
