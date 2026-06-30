import type { CheatPlan } from '@/data/cheats';
import { isPlanPopular } from '@/lib/productPlans';
import type { CartItem } from '@/hooks/useSellAuthEmbed';

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

export function buildSellAuthCart(plan: CheatPlan): CartItem {
  return {
    productId: parseInt(plan.sellauthProductId!, 10),
    variantId: plan.sellauthVariantId ? parseInt(plan.sellauthVariantId, 10) : undefined,
    quantity: 1,
  };
}

export function openSellauthProductFallback(productId: string): void {
  window.open(
    `https://${SELLAUTH_SHOP_SLUG}.sellauth.com/product/${productId}`,
    '_blank',
    'noopener,noreferrer'
  );
}
