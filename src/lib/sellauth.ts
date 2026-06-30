import type { CheatPlan } from '@/data/cheats';
import { resolveCheckoutCoupon } from '@/lib/checkoutCoupon';
import { isPlanPopular } from '@/lib/productPlans';

export const SELLAUTH_SHOP_ID = 185564;
export const SELLAUTH_SHOP_SLUG = 'nova-store';

export const SELLAUTH_READY_EVENT = 'sellauth-ready';
export const SELLAUTH_FAILED_EVENT = 'sellauth-failed';

type SellAuthEmbed = {
  checkout: (el: HTMLElement, opts: SellAuthCheckoutOptions) => void;
  injectCaptcha?: () => void;
  injectStyles?: () => void;
};

type SellAuthCheckoutOptions = {
  cart: Array<{
    productId: number;
    variantId?: number;
    quantity: number;
  }>;
  shopId: number;
  modal?: boolean;
  coupon?: string;
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

export function buildDirectCheckoutUrl(plan: CheatPlan, coupon?: string): string {
  const base = `https://${SELLAUTH_SHOP_SLUG}.sellauth.com/product/${plan.sellauthProductId}`;
  if (!coupon) return base;
  const params = new URLSearchParams({ coupon });
  return `${base}?${params.toString()}`;
}

export function openSellauthCheckout(button: HTMLElement, plan: CheatPlan): void {
  if (!plan.sellauthProductId) return;

  const coupon = resolveCheckoutCoupon();
  const embed = getSellAuthEmbed();

  if (embed) {
    const opts: SellAuthCheckoutOptions = {
      cart: [{
        productId: parseInt(plan.sellauthProductId, 10),
        variantId: plan.sellauthVariantId ? parseInt(plan.sellauthVariantId, 10) : undefined,
        quantity: 1,
      }],
      shopId: SELLAUTH_SHOP_ID,
      modal: true,
    };
    if (coupon) opts.coupon = coupon;
    embed.checkout(button, opts);
    return;
  }

  window.open(buildDirectCheckoutUrl(plan, coupon), '_blank');
}
