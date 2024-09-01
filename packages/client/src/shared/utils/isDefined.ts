export function isDefined<T>(value: T): value is Exclude<T, undefined | null> {
  return value !== null && value !== undefined
}
