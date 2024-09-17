export function shouldFillCell(
  level: number,
  row: number,
  col: number,
  rowCount: number,
  colCount: number,
): boolean {
  const edgeCount = level;
  if (level === 0) return true;
  return (
    row >= edgeCount &&
    row < rowCount - edgeCount &&
    col >= edgeCount &&
    col < colCount - edgeCount
  );
}
