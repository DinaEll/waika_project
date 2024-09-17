/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shouldFillCell } from './shouldFillCell';
import type { MahjongField } from '../types';

export function createFieldPattern(
  columns: number,
  rows: number,
  levels: number,
): { field: MahjongField; countCells: number } {
  const field: MahjongField = [];
  let countAvalaibleCells = 0;
  for (let z = 0; z < levels; z++) {
    field[z] = [];
    for (let y = 0; y < rows; y++) {
      field[z]![y] = [];
      for (let x = 0; x < columns; x++) {
        if (
          columns > 4 &&
          z === 0 &&
          (y === 0 || y === rows - 1) &&
          x > 1 &&
          x < columns - 2
        ) {
          field[z]![y]![x] = null;
        } else if (
          rows > 4 &&
          z === 0 &&
          (x === 0 || x === columns - 1) &&
          y > 1 &&
          y < rows - 2
        ) {
          field[z]![y]![x] = null;
        } else if (shouldFillCell(z, y, x, columns, rows)) {
          field[z]![y]![x] = 0;
          countAvalaibleCells += 1;
        } else {
          field[z]![y]![x] = null;
        }
      }
    }
  }
  return { field, countCells: countAvalaibleCells };
}
