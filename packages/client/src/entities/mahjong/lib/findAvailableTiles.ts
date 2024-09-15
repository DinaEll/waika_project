/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isDefined } from '@/shared/utils';
import type { MahjongField } from '../types';

export function findAvailableTiles(field: MahjongField): {
  number: number;
  x: number;
  y: number;
  z: number;
}[] {
  const result: ReturnType<typeof findAvailableTiles> = [];
  const levels = field.length;
  const rows = field[0]!.length;
  const cols = field[0]![0]!.length;

  for (let z = 0; z < levels; z++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const number = field[z]![y]![x];
        if (!isDefined(number)) {
          continue;
        }

        const isClosed = z < levels && isDefined(field[z + 1]?.[y]?.[x]);
        if (isClosed) {
          continue;
        }

        const hasTopNeighbor = y > 0 && isDefined(field[z]![y - 1]?.[x]);
        const hasBottomNeighbor = y < cols && isDefined(field[z]![y + 1]?.[x]);
        const hasLeftNeighbor = x > 0 && isDefined(field[z]![y]![x - 1]);
        const hasRightNeighbor = x < rows && isDefined(field[z]![y]![x + 1]);

        if (
          (!hasBottomNeighbor && (!hasLeftNeighbor || !hasRightNeighbor)) ||
          (!hasTopNeighbor && (!hasLeftNeighbor || !hasRightNeighbor))
        ) {
          result.push({
            number,
            x,
            y,
            z,
          });
        }
      }
    }
  }

  return result;
}
