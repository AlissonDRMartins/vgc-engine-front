export function roundStat(value: number) {
  const decimal = value % 1;

  if (decimal === 0.5) {
    return Math.floor(value);
  }

  return Math.round(value);
}
