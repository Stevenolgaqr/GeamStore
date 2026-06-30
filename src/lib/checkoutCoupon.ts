import { getActiveCampaign } from '@/data/campaigns';
import { getReturnDiscount, getStoredReferralCode } from '@/lib/referral';

/**
 * Resolves the best available coupon for SellAuth checkout (client-side only).
 * Priority: referral code > return discount (COMEBACK10) > active campaign (NOVA10).
 */
export function resolveCheckoutCoupon(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const referral = getStoredReferralCode();
  if (referral) return referral;

  const comeback = getReturnDiscount();
  if (comeback) return comeback.code;

  const campaign = getActiveCampaign();
  if (campaign?.couponCode) return campaign.couponCode;

  return undefined;
}
