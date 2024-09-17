import type { MahjongFieldCell } from '../types';

export function getFlattenField(
  field:
    | MahjongFieldCell
    | MahjongFieldCell[]
    | MahjongFieldCell[][]
    | MahjongFieldCell[][][],
): MahjongFieldCell[] {
  return Array.isArray(field)
    ? field.flatMap((cell) => getFlattenField(cell))
    : [field];
}
