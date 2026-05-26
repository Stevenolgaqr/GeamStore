/** KeyHub: 50 credits = $5.00 */
export const CREDIT_USD = 5 / 50;

export const KEYHUB_MARKUP = 1.55;

export function costUsdFromCredits(credits) {
  return Math.round(credits * CREDIT_USD * 100) / 100;
}

export function rawRetailFromCredits(credits) {
  return Math.round(costUsdFromCredits(credits) * KEYHUB_MARKUP * 100) / 100;
}

export function retailWithCharmEndingFromRaw(raw) {
  const dollars = Math.floor(raw);
  let price = dollars + 0.79;
  if (price < raw) price = dollars + 1 + 0.79;
  return Math.round(price * 100) / 100;
}

/** Retail = costUsd × 1.55 → first .79 >= raw */
export function retailFromKeyhubCredits(credits) {
  return retailWithCharmEndingFromRaw(rawRetailFromCredits(credits));
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
