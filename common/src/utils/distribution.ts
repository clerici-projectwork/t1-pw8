export function gaussianDistribution(mean: number, stdDev: number): number {
  const z0 = Math.sqrt(-2.0 * Math.log(Math.random()));
  const z1 = Math.cos(2.0 * Math.PI * Math.random());

  return z0 * z1 * stdDev + mean;
}
