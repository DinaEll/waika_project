import { isDefined, isEven, isNull } from '@/shared/utils';
import type { FieldCell } from '../types';

export class MahjongHelper {
  static createUniqueRandomArray(length: number): number[] {
    const numbers = Array.from({ length }, (_, i) => i + 1);
    const result: number[] = [];
    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers.splice(randomIndex, 1)[0];
      if (randomNumber) {
        result.push(randomNumber);
      }
    }

    return result;
  }

  static getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static findAvalaibleElements(
    field: FieldCell[][],
  ): { id: number; positionX: number; positionY: number }[] {
    const result: { id: number; positionX: number; positionY: number }[] = [];
    const rows = field.length;
    const cols = field[0]?.length;

    if (!cols) {
      return [];
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const current = field[x]?.[y];
        if (!isDefined(current)) continue;

        const hasTopNeighbor = x > 0 && field[x - 1]?.[y] !== null;
        const hasBottomNeighbor = x < rows - 1 && field[x + 1]?.[y] !== null;
        const hasLeftNeighbor = y > 0 && field[x]?.[y - 1] !== null;
        const hasRightNeighbor = y < cols - 1 && field[x]?.[y + 1] !== null;

        if (
          (!hasBottomNeighbor && (!hasLeftNeighbor || !hasRightNeighbor)) ||
          (!hasTopNeighbor && (!hasLeftNeighbor || !hasRightNeighbor))
        ) {
          result.push({ id: current, positionX: x, positionY: y });
        }
      }
    }

    return result;
  }

  static findPairs(arr: NonNullable<FieldCell>[]): [number, number][] {
    const pairs: [number, number][] = [];
    const seen = new Set<number>();

    arr.forEach((element) => {
      if (seen.has(element)) {
        pairs.push([element, element]);
      } else {
        seen.add(element);
      }
    });

    return pairs;
  }

  static shuffleRandomPairs(pairs: FieldCell[]) {
    const newPairs = [...pairs];

    const nonNullIndices = newPairs.reduce<NonNullable<FieldCell>[]>(
      (indices, id, idx) => {
        if (!isNull(id)) {
          indices.push(idx);
        }
        return indices;
      },
      [],
    );

    for (let i = nonNullIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonNullIndices[i], nonNullIndices[j]] = [
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nonNullIndices[j]!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nonNullIndices[i]!,
      ];
    }

    const nonNullPairs = newPairs.filter((id) => !isNull(id));

    nonNullIndices.forEach((idx, i) => {
      if (isDefined(nonNullPairs[i])) {
        newPairs[idx] = nonNullPairs[i];
      }
    });

    return newPairs;
  }

  static checkAvailablePairs(field: FieldCell[][]): boolean {
    const availableTiles = MahjongHelper.findAvalaibleElements(field);

    if (availableTiles.length === 0) {
      return false;
    } else if (
      MahjongHelper.findPairs(availableTiles.map(({ id }) => id)).length === 0
    ) {
      return false;
    }

    return true;
  }

  static fillFieldWithPairs(
    field: FieldCell[][],
    pairs: FieldCell[],
  ): FieldCell[][] {
    const fieldLength = field.flat().length;
    if (fieldLength !== pairs.length) {
      throw new Error('Check the length of the arrays');
    }
    const newField: FieldCell[][] = MahjongHelper.copyField(field);

    let sourceIndex = 0;

    for (const row of newField) {
      for (let j = 0; j < row.length; j++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        row[j] = pairs[sourceIndex]!;
        sourceIndex++;
      }
    }

    return newField;
  }

  static generateField = (size: number, pairs: FieldCell[]): FieldCell[][] => {
    if (!isEven(size)) {
      throw new Error('The number of tiles must be even');
    }

    const length = Math.sqrt(size);
    const field = Array.from<{ length: number }, FieldCell[]>({ length }, () =>
      Array<FieldCell>(length).fill(null),
    );

    return MahjongHelper.fillFieldWithPairs(field, pairs);
  };

  static initialize3DField = (
    columns: number,
    rows: number,
    depth: number,
  ): FieldCell[][][] => {
    const field: FieldCell[][][] = [];
    for (let i = 0; i < depth; i++) {
      field[i] = [];
      for (let j = 0; j < rows; j++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        field[i]![j] = [];
        for (let k = 0; k < columns; k++) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          field[i]![j]![k] = null;
        }
      }
    }
    return field;
  };

  static copyField<T>(source: T[][]): T[][] {
    return JSON.parse(JSON.stringify(source)) as T[][];
  }
}
