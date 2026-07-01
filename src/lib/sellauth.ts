import type { CheatPlan } from '@/data/cheats';
import { isPlanPopular } from '@/lib/productPlans';

export const SELLAUTH_SHOP_ID = 185564;
export const SELLAUTH_SHOP_SLUG = 'nova-store';
export const SELLAUTH_SHOP_HOST = 'nova-store.mysellauth.com';

export interface CheckoutPayload {
  productId: number;
  variantId: number;
}

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

export function planToCheckoutPayload(plan: CheatPlan): CheckoutPayload | null {
  if (!plan.sellauthProductId || !plan.sellauthVariantId) return null;
  return {
    productId: parseInt(plan.sellauthProductId, 10),
    variantId: parseInt(plan.sellauthVariantId, 10),
  };
}

export function buildCheckoutLinkUrl(plan: CheatPlan): string {
  const payload = planToCheckoutPayload(plan);
  if (!payload) {
    return `https://${SELLAUTH_SHOP_HOST}`;
  }

  const params = new URLSearchParams();
  params.set('cart[0][productId]', String(payload.productId));
  params.set('cart[0][variantId]', String(payload.variantId));
  params.set('cart[0][quantity]', '1');
  return `https://${SELLAUTH_SHOP_HOST}/checkout-link?${params.toString()}`;
}

export function openSellauthCheckoutLink(plan: CheatPlan): void {
  window.open(buildCheckoutLinkUrl(plan), '_blank', 'noopener,noreferrer');
}
