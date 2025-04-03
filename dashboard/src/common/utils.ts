export function getRandomFloat(min: number, max: number): number {
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export function truncateToTwoDecimals(num: number | undefined): number | undefined {
  if (num === undefined) {
    return undefined;
  }

  return Number.parseFloat(num.toFixed(2));
}
