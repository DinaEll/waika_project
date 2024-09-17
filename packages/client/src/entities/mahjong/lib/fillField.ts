import { isNull } from '../../../shared/utils';
import { shouldFillCell } from './shouldFillCell';
import type { MahjongField, MahjongFieldCell } from '../types';

export function fillField(
  field: MahjongField,
  pairs: NonNullable<MahjongFieldCell>[],
): MahjongField {
  const newPairs = [...pairs];

  const filledField = field.map((level, levelIndex) => {
    return level.map((row, rowIndex) => {
      return row.map((cellValue, cellIndex) => {
        const rowCount = level.length;
        const colCount = row.length;

        if (
          !isNull(cellValue) &&
          shouldFillCell(levelIndex, rowIndex, cellIndex, rowCount, colCount)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return newPairs.pop()!;
        }
        return cellValue;
      });
    });
  });

  return filledField;
}
