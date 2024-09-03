export function getDurationTime(starTime: Date, finishTime: Date): number {
  return finishTime.getTime() - starTime.getTime()
}
