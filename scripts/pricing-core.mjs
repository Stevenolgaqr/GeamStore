/** KeyHub: 50 credits = $5.00 */
export const CREDIT_USD = 5 / 50;

export const CHARM_ENDINGS = [0.79, 0.49, 0.99, 0.97];

/** Tiered minimum markup over KeyHub cost USD. */
export function tierMultiplier(costUsd) {
  if (costUsd < 1) return 2.0;
  if (costUsd < 5) return 1.89;
  if (costUsd < 15) return 1.87;
  if (costUsd < 40) return 1.874;
  if (costUsd < 50) return 1.85;
  return 1.75;
}

/** Charm priority order varies by cost tier. */
export function charmOrderForCost(costUsd) {
  if (costUsd < 2) return [0.99, 0.79, 0.49, 0.97];
  if (costUsd < 15) return [0.79, 0.49, 0.99, 0.97];
  if (costUsd < 40) return [0.49, 0.79, 0.99, 0.97];
  return [0.79, 0.49, 0.99, 0.97];
}

export function costUsdFromCredits(credits) {
  return Math.round(credits * CREDIT_USD * 100) / 100;
}

export function minRetailFromCost(costUsd) {
  return Math.round(costUsd * tierMultiplier(costUsd) * 100) / 100;
}

/** First valid charm price >= minRetail (tier-aware psychological pricing). */
export function psychologicalRetailFromCost(costUsd) {
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
export function rawRetailFromCredits(credits) {
  return minRetailFromCost(costUsdFromCredits(credits));
}

export function retailFromKeyhubCredits(credits) {
  return psychologicalRetailFromCost(costUsdFromCredits(credits));
}

export function retailWithCharmEnding(credits) {
  return retailFromKeyhubCredits(credits);
}

/** Parse plan duration from cheats.ts fields → KeyHub durationDays */
export function planDurationDays(plan) {
  const d = (plan.duration || '').toLowerCase();
  const label = (plan.label || '').toLowerCase();
  if (
    d.includes('365') ||
    label.includes('سنة') ||
    label.includes('year') ||
    label.includes('lifetime') ||
    d.includes('lifetime') ||
    d.includes('مدى')
  ) {
    return 365;
  }
  if (d.includes('90') || label.includes('90') || label.includes('3 month') || label.includes('3 أشهر')) {
    return 90;
  }
  if (d.includes('30') || label.includes('month') || label.includes('شهر')) return 30;
  if (d.includes('7') || label.includes('week') || d.includes('أسبوع')) return 7;
  if (d.includes('3') && (d.includes('day') || label.includes('3'))) return 3;
  if (d.includes('1') || label.includes('day') || label.includes('يوم') || label.includes('24')) return 1;
  return null;
}
