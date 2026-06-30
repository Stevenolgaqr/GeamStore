const CONSENT_KEY = 'nova_analytics_consent';

export type ConsentStatus = 'granted' | 'denied' | null;

export function getAnalyticsConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'granted' || value === 'denied') return value;
  return null;
}

export function setAnalyticsConsent(status: 'granted' | 'denied') {
  localStorage.setItem(CONSENT_KEY, status);
  window.dispatchEvent(new CustomEvent('nova-consent-change', { detail: status }));
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (getAnalyticsConsent() !== 'granted') return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackViewItem(cheat: {
  slug: string;
  title: string;
  titleEn?: string;
  category: string;
  plans: { price: number }[];
}) {
  const price = Math.min(...cheat.plans.map((p) => p.price));
  trackEvent('view_item', {
    currency: 'USD',
    value: price,
    items: cheat.slug,
    item_name: cheat.titleEn || cheat.title,
    item_category: cheat.category,
  });
}

export function trackSelectPlan(cheat: { slug: string; title: string; titleEn?: string }, planIndex: number, price: number) {
  trackEvent('select_plan', {
    item_id: cheat.slug,
    item_name: cheat.titleEn || cheat.title,
    plan_index: planIndex,
    value: price,
    currency: 'USD',
  });
}

export function trackBeginCheckout(cheat: { slug: string; title: string; titleEn?: string }, price: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: price,
    item_id: cheat.slug,
    item_name: cheat.titleEn || cheat.title,
  });
}

export function trackPurchase(slug: string, productName: string, value?: number) {
  trackEvent('purchase', {
    transaction_id: `${slug}-${Date.now()}`,
    currency: 'USD',
    value: value ?? 0,
    item_id: slug,
    item_name: productName,
  });
}
