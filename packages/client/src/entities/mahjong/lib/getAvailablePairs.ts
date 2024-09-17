import { MahjongField, MahjongFieldCell } from '../types';
import { findAvailableTiles } from './findAvailableTiles';
import { findPairs } from './findPairs';

export function getAvailablePairs(
  field: MahjongField,
): [NonNullable<MahjongFieldCell>, NonNullable<MahjongFieldCell>][] {
  const availableTiles = findAvailableTiles(field);

  if (availableTiles.length === 0) {
    return [];
  }

  const availablePairs = findPairs(availableTiles.map(({ number }) => number));

  return availablePairs;
}
