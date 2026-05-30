/** KeyHub: 50 credits = $5.00 */
export const CREDIT_USD = 5 / 50;

export const CHARM_ENDINGS = [0.79, 0.49, 0.99, 0.97] as const;

/** Tiered minimum markup over KeyHub cost USD. */
export function tierMultiplier(costUsd: number): number {
  if (costUsd < 1) return 2.0;
  if (costUsd < 5) return 1.89;
  if (costUsd < 15) return 1.87;
  if (costUsd < 40) return 1.874;
  if (costUsd < 50) return 1.85;
  return 1.75;
}

/** Charm priority order varies by cost tier. */
export function charmOrderForCost(costUsd: number): number[] {
  if (costUsd < 2) return [0.99, 0.79, 0.49, 0.97];
  if (costUsd < 15) return [0.79, 0.49, 0.99, 0.97];
  if (costUsd < 40) return [0.49, 0.79, 0.99, 0.97];
  return [0.79, 0.49, 0.99, 0.97];
}

export function costUsdFromCredits(credits: number): number {
  return Math.round(credits * CREDIT_USD * 100) / 100;
}

export function minRetailFromCost(costUsd: number): number {
  return Math.round(costUsd * tierMultiplier(costUsd) * 100) / 100;
}

/** First valid charm price >= minRetail (tier-aware psychological pricing). */
export function psychologicalRetailFromCost(costUsd: number): number {
  const minRetail = minRetailFromCost(costUsd);
  const startDollar = Math.floor(minRetail - 0.01);
  const order = charmOrderForCost(costUsd);

  for (const cents of order) {
    for (let d = startDollar; d <= startDollar + 4; d++) {
      const price = Math.round((d + cents) * 100) / 100;
      if (price + 0.001 >= minRetail) return price;
    }
  }

  return minRetail;
}

/** @deprecated use minRetailFromCost */
export function rawRetailFromCredits(credits: number): number {
  return minRetailFromCost(costUsdFromCredits(credits));
}

/**
 * Retail = tiered markup over KeyHub cost + charm ending (.79/.49/.99).
 * Example: $2.00 cost → $3.79 | $10.00 → $18.79 | $20.00 → $37.49
 */
export function retailFromKeyhubCredits(credits: number): number {
  return psychologicalRetailFromCost(costUsdFromCredits(credits));
}

export function retailWithCharmEnding(credits: number): number {
  return retailFromKeyhubCredits(credits);
}

export function formatRetailPrice(price: number): string {
  return price.toFixed(2);
}
