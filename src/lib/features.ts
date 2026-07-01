/** True when GA or Meta Pixel env vars are set — gates cookie banner + analytics scripts. */
export function isAnalyticsEnabled(): boolean {
  return !!(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID);
}

/** True when SellAuth order webhook secret is configured. */
export function isWebhookEnabled(): boolean {
  return !!process.env.SELLAUTH_WEBHOOK_SECRET;
}

/** True when server-side SellAuth checkout API key is configured. */
export function isSellauthCheckoutEnabled(): boolean {
  return !!process.env.SELLAUTH_API_KEY;
}

/** True when post-purchase email can be sent via Resend. */
export function isEmailEnabled(): boolean {
  return !!process.env.RESEND_API_KEY;
}
