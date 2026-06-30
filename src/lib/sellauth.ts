import type { CheatPlan } from '@/data/cheats';
import { isPlanPopular } from '@/lib/productPlans';

export const SELLAUTH_SHOP_ID = 185564;
export const SELLAUTH_SHOP_SLUG = 'nova-store';

export function getDefaultPlanIndex(plans: CheatPlan[]): number {
  const popularIdx = plans.findIndex((plan, index) => isPlanPopular(plan, index) && plan.sellauthProductId);
  if (popularIdx !== -1) return popularIdx;

  const available = plans
    .map((plan, index) => ({ plan, index }))
    .filter(({ plan }) => plan.sellauthProductId);

  if (available.length === 0) return 0;

  return available.reduce((cheapest, current) =>
    current.plan.price < cheapest.plan.price ? current : cheapest
  ).index;
}

export function getDefaultPlan(plans: CheatPlan[]): CheatPlan | undefined {
  const index = getDefaultPlanIndex(plans);
  return plans[index];
}

export function getSellauthProductUrl(plan: CheatPlan): string {
  const base = `https://${SELLAUTH_SHOP_SLUG}.sellauth.com/product/${plan.sellauthProductId}`;
  if (plan.sellauthVariantId) {
    return `${base}?variation_id=${plan.sellauthVariantId}`;
  }
  return base;
}

export function openSellauthCheckout(plan: CheatPlan): void {
  if (!plan.sellauthProductId) return;
  window.open(getSellauthProductUrl(plan), '_blank', 'noopener,noreferrer');
}
