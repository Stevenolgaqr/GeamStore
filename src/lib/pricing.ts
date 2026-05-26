/** KeyHub: 50 credits = $5.00 */
export const CREDIT_USD = 5 / 50;

/** Retail markup over KeyHub cost (costUsd × 1.55). */
export const KEYHUB_MARKUP = 1.55;

export function costUsdFromCredits(credits: number): number {
  return Math.round(credits * CREDIT_USD * 100) / 100;
}

/** +55% before charm rounding. */
export function rawRetailFromCredits(credits: number): number {
  return Math.round(costUsdFromCredits(credits) * KEYHUB_MARKUP * 100) / 100;
}

/** First `.79` ending >= raw USD. */
export function retailWithCharmEndingFromRaw(raw: number): number {
  const dollars = Math.floor(raw);
  let price = dollars + 0.79;
  if (price < raw) price = dollars + 1 + 0.79;
  return Math.round(price * 100) / 100;
}

/**
 * Retail = KeyHub cost + 55%, charm `.79` floor.
 * Example: 15 cr → $1.50 cost → $2.325 raw → $2.79 retail.
 */
export function retailFromKeyhubCredits(credits: number): number {
  return retailWithCharmEndingFromRaw(rawRetailFromCredits(credits));
}

/** Alias: charm retail from credit count. */
export function retailWithCharmEnding(credits: number): number {
  return retailFromKeyhubCredits(credits);
}

/** Display price with charm cents (.79). */
export function formatRetailPrice(price: number): string {
  return price.toFixed(2);
}
