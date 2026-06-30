'use client';

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from '@/components/SellAuthModal.module.css';
import { SELLAUTH_SHOP_ID } from '@/lib/sellauth';

const API_BASE_URL = 'https://api-internal-3.sellauth.com/v1';
const CAPTCHA_FALLBACK_MS = 20_000;

export interface SellAuthCartItem {
  productId: number;
  variantId: number;
  quantity: number;
}

export interface CheckoutOptions {
  cart: SellAuthCartItem[];
  shopId: number;
  modal?: boolean;
  scrollTop?: boolean;
  coupon?: string;
}

type AltchaStateEvent = CustomEvent<{ state?: string; payload?: string }>;

interface SellAuthCheckoutContextValue {
  checkout: (options: CheckoutOptions) => Promise<void>;
  captchaReady: boolean;
  useFallback: boolean;
  isLoading: boolean;
  closeModal: () => void;
}

const SellAuthCheckoutContext = createContext<SellAuthCheckoutContextValue | null>(null);

const HiddenAltcha = forwardRef<
  { value: string | null },
  { onStateChange?: (ev: AltchaStateEvent) => void }
>(({ onStateChange }, ref) => {
  const widgetRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useImperativeHandle(ref, () => ({ value }), [value]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        await import('altcha');
        await customElements.whenDefined('altcha-widget');
        if (!cancelled) setIsReady(true);
      } catch (err) {
        console.error('Failed to load altcha:', err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady || !widgetRef.current) return;
    const widget = widgetRef.current;

    const handleStateChange = (ev: Event) => {
      const custom = ev as AltchaStateEvent;
      if ('detail' in custom) {
        const payload = custom.detail?.payload ?? null;
        setValue(payload);
        onStateChange?.(custom);
      }
    };

    widget.addEventListener('statechange', handleStateChange);
    return () => widget.removeEventListener('statechange', handleStateChange);
  }, [isReady, onStateChange]);

  if (!isReady || typeof document === 'undefined') return null;

  return createPortal(
    React.createElement('altcha-widget', {
      ref: widgetRef,
      challengeurl: `${API_BASE_URL}/altcha`,
      auto: 'onload',
      hidefooter: true,
      hidelogo: true,
      style: {
        display: 'none',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
      },
    }),
    document.body
  );
});

HiddenAltcha.displayName = 'HiddenAltcha';

function CheckoutModal({ url, onClose }: { url: string; onClose: () => void }) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Checkout">
      <div className={styles.backdrop} onClick={onClose} aria-hidden />
      <div className={styles.panel}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </button>
        <iframe
          src={url}
          title="SellAuth Checkout"
          referrerPolicy="no-referrer"
          allow="payment; clipboard-write"
          className={styles.frame}
        />
      </div>
    </div>,
    document.body
  );
}

type CheckoutHandler = (options: CheckoutOptions) => Promise<void>;
let registeredCheckout: CheckoutHandler | null = null;

export function registerSellAuthCheckoutHandler(handler: CheckoutHandler | null) {
  registeredCheckout = handler;
}

export function getSellAuthCheckoutHandler(): CheckoutHandler | null {
  return registeredCheckout;
}

export function SellAuthCheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [altchaToken, setAltchaToken] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [altchaKey, setAltchaKey] = useState(0);
  const altchaRef = useRef<{ value: string | null }>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!captchaReady) setUseFallback(true);
    }, CAPTCHA_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [captchaReady]);

  const handleCaptchaStateChange = useCallback((ev: AltchaStateEvent) => {
    if (ev.detail?.state === 'verified' && ev.detail.payload) {
      setAltchaToken(ev.detail.payload);
      setCaptchaReady(true);
      setUseFallback(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalUrl(null);
  }, []);

  const openCheckoutLink = useCallback((options: CheckoutOptions) => {
    const item = options.cart[0];
    if (!item) return;
    const base = `https://nova-store.sellauth.com/checkout-link`;
    const params = new URLSearchParams();
    params.set('cart[0][productId]', String(item.productId));
    params.set('cart[0][variantId]', String(item.variantId));
    params.set('cart[0][quantity]', String(item.quantity));
    if (options.coupon) params.set('affiliate', options.coupon);
    window.open(`${base}?${params.toString()}`, '_blank');
  }, []);

  const checkout = useCallback(
    async ({ cart, shopId, modal = true, scrollTop = true, coupon }: CheckoutOptions) => {
      if (isLoading) return;

      const token = altchaToken ?? altchaRef.current?.value ?? null;

      if (!token || useFallback) {
        openCheckoutLink({ cart, shopId, coupon });
        return;
      }

      setIsLoading(true);

      try {
        const body: Record<string, unknown> = { cart, shopId, altcha: token };
        if (coupon) body.coupon = coupon;

        const response = await fetch(`${API_BASE_URL}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const responseData = (await response.json()) as { error?: string; url?: string };

        if (responseData.error) {
          throw new Error(responseData.error);
        }

        if (!responseData.url) {
          throw new Error('No checkout URL returned');
        }

        if (modal) {
          setModalUrl(responseData.url);
          if (scrollTop) window.scrollTo(0, 0);
        } else {
          window.open(responseData.url, '_blank');
        }
      } catch (err) {
        console.error('SellAuth checkout failed, using checkout-link fallback:', err);
        openCheckoutLink({ cart, shopId, coupon });
      } finally {
        setIsLoading(false);
        setAltchaKey((prev) => prev + 1);
        setAltchaToken(null);
        setCaptchaReady(false);
      }
    },
    [isLoading, altchaToken, useFallback, openCheckoutLink]
  );

  useEffect(() => {
    registerSellAuthCheckoutHandler(checkout);
    return () => registerSellAuthCheckoutHandler(null);
  }, [checkout]);

  const value: SellAuthCheckoutContextValue = {
    checkout,
    captchaReady,
    useFallback,
    isLoading,
    closeModal,
  };

  return (
    <SellAuthCheckoutContext.Provider value={value}>
      <HiddenAltcha key={altchaKey} ref={altchaRef} onStateChange={handleCaptchaStateChange} />
      {children}
      {modalUrl && <CheckoutModal url={modalUrl} onClose={closeModal} />}
    </SellAuthCheckoutContext.Provider>
  );
}

export function useSellAuthCheckout(): SellAuthCheckoutContextValue {
  const ctx = useContext(SellAuthCheckoutContext);
  if (!ctx) {
    throw new Error('useSellAuthCheckout must be used within SellAuthCheckoutProvider');
  }
  return ctx;
}
