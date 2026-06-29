import type { CheatPlan } from '@/data/cheats';
import { isPlanPopular } from '@/lib/productPlans';

export const SELLAUTH_SHOP_ID = 185564;

export const SELLAUTH_READY_EVENT = 'sellauth-ready';

type SellAuthEmbed = {
  checkout: (el: HTMLElement, opts: object) => void;
};

export function getSellAuthEmbed(): SellAuthEmbed | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { sellAuthEmbed?: SellAuthEmbed }).sellAuthEmbed;
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

export function openSellauthCheckout(button: HTMLElement, plan: CheatPlan): void {
  if (!plan.sellauthProductId) return;

  const embed = getSellAuthEmbed();
  if (embed) {
    embed.checkout(button, {
      cart: [{
        productId: parseInt(plan.sellauthProductId, 10),
        variantId: plan.sellauthVariantId ? parseInt(plan.sellauthVariantId, 10) : undefined,
        quantity: 1,
      }],
      shopId: SELLAUTH_SHOP_ID,
      modal: true,
    });
    return;
  }

  window.open(`https://nova-store.sellauth.com/product/${plan.sellauthProductId}`, '_blank');
}
