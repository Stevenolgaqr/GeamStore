import type { CheatPlan } from '@/data/cheats';
import { resolveCheckoutCoupon } from '@/lib/checkoutCoupon';
import type { CheckoutOptions, SellAuthCartItem } from '@/hooks/useSellAuthEmbed';
import { getSellAuthCheckoutHandler } from '@/hooks/useSellAuthEmbed';
import { isPlanPopular } from '@/lib/productPlans';

export const SELLAUTH_SHOP_ID = 185564;
export const SELLAUTH_SHOP_SLUG = 'nova-store';

export function planToCartItem(plan: CheatPlan): SellAuthCartItem | null {
  if (!plan.sellauthProductId || !plan.sellauthVariantId) return null;
  return {
    productId: parseInt(plan.sellauthProductId, 10),
    variantId: parseInt(plan.sellauthVariantId, 10),
    quantity: 1,
  };
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

export function buildCheckoutLinkUrl(plan: CheatPlan, coupon?: string): string | null {
  const item = planToCartItem(plan);
  if (!item) return null;

  const params = new URLSearchParams();
  params.set('cart[0][productId]', String(item.productId));
  params.set('cart[0][variantId]', String(item.variantId));
  params.set('cart[0][quantity]', String(item.quantity));
  if (coupon) params.set('affiliate', coupon);

  return `https://${SELLAUTH_SHOP_SLUG}.sellauth.com/checkout-link?${params.toString()}`;
}

export function buildDirectCheckoutUrl(plan: CheatPlan, coupon?: string): string {
  const link = buildCheckoutLinkUrl(plan, coupon);
  if (link) return link;
  return `https://${SELLAUTH_SHOP_SLUG}.sellauth.com/product/${plan.sellauthProductId}`;
}

export function buildCheckoutOptions(plan: CheatPlan): CheckoutOptions | null {
  const cartItem = planToCartItem(plan);
  if (!cartItem) return null;

  const coupon = resolveCheckoutCoupon();
  const options: CheckoutOptions = {
    cart: [cartItem],
    shopId: SELLAUTH_SHOP_ID,
    modal: true,
    scrollTop: true,
  };
  if (coupon) options.coupon = coupon;
  return options;
}

export async function openSellauthCheckout(plan: CheatPlan): Promise<void> {
  const options = buildCheckoutOptions(plan);
  if (!options) return;

  const handler = getSellAuthCheckoutHandler();
  if (handler) {
    await handler(options);
    return;
  }

  const coupon = resolveCheckoutCoupon();
  const url = buildCheckoutLinkUrl(plan, coupon) ?? buildDirectCheckoutUrl(plan, coupon);
  window.open(url, '_blank');
}
