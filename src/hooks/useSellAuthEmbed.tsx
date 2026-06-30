'use client';

import 'altcha';
import type {} from 'altcha/types/react';

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import styles from '@/components/SellAuthModal.module.css';

const API_BASE_URL = 'https://api-internal-3.sellauth.com/v1';
const CAPTCHA_FALLBACK_MS = 12_000;

export interface CartItem {
  productId: number;
  variantId?: number;
  quantity: number;
}

export interface CheckoutOptions {
  cart: CartItem[];
  shopId: number;
  modal?: boolean;
  scrollTop?: boolean;
}

type AltchaStateDetail = {
  state?: string;
  payload?: string;
};

type AltchaWidgetElement = HTMLElement & {
  reset?: (newState?: string, err?: string | null) => void;
};

function HiddenAltcha({
  onStateChange,
}: {
  onStateChange?: (detail: AltchaStateDetail | undefined) => void;
}) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;

  const widgetNodeRef = useRef<AltchaWidgetElement | null>(null);
  const widgetHandlerRef = useRef<((ev: Event) => void) | null>(null);

  const widgetCallbackRef = useCallback((node: AltchaWidgetElement | null) => {
    if (widgetNodeRef.current && widgetHandlerRef.current) {
      widgetNodeRef.current.removeEventListener('statechange', widgetHandlerRef.current);
    }

    widgetNodeRef.current = node;
    widgetHandlerRef.current = null;

    if (!node) return;

    const handleStateChange = (ev: Event) => {
      const detail = (ev as CustomEvent<AltchaStateDetail>).detail;
      onStateChangeRef.current?.(detail);

      if (detail?.state === 'expired' || detail?.state === 'error') {
        node.reset?.('unverified');
      }
    };

    widgetHandlerRef.current = handleStateChange;
    node.addEventListener('statechange', handleStateChange);
  }, []);

  if (!isClient || typeof document === 'undefined') return null;

  return createPortal(
    React.createElement('altcha-widget', {
      ref: widgetCallbackRef,
      challenge: `${API_BASE_URL}/altcha`,
      auto: 'onload',
      hidefooter: true,
      hidelogo: true,
      style: {
        display: 'none',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        '--altcha-max-width': '100%',
      },
    }),
    document.body
  );
}

function CheckoutModal({ url, onClose }: { url: string; onClose: () => void }) {
  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Checkout">
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close checkout" />
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
          className={styles.iframe}
        />
      </div>
    </div>,
    document.body
  );
}

export interface SellAuthEmbedHook {
  checkout: (options: CheckoutOptions) => Promise<void>;
  isLoading: boolean;
  captchaReady: boolean;
  useFallback: boolean;
  closeModal: () => void;
  captcha: React.ReactElement;
  modal: React.ReactElement | null;
}

export function useSellAuthEmbed(): SellAuthEmbedHook {
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [altchaToken, setAltchaToken] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [altchaKey, setAltchaKey] = useState(0);

  const handleCaptchaStateChange = useCallback((detail: AltchaStateDetail | undefined) => {
    if (detail?.state === 'verified') {
      setAltchaToken(detail.payload ?? null);
      setUseFallback(false);
    } else if (detail?.state === 'expired' || detail?.state === 'error') {
      setAltchaToken(null);
    }
  }, []);

  useEffect(() => {
    if (altchaToken) return;

    setUseFallback(false);
    const timer = window.setTimeout(() => {
      setUseFallback(true);
    }, CAPTCHA_FALLBACK_MS);

    return () => window.clearTimeout(timer);
  }, [altchaKey, altchaToken]);

  const closeModal = useCallback(() => {
    setModalUrl(null);
  }, []);

  const checkout = useCallback(
    async ({ cart, shopId, modal = true, scrollTop = true }: CheckoutOptions) => {
      if (isLoading) return;

      if (!altchaToken) {
        throw new Error('Captcha not ready. Please try again in a moment.');
      }

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart, shopId, altcha: altchaToken }),
        });

        const responseData = (await response.json()) as { error?: string; url?: string };

        if (responseData.error) {
          throw new Error(responseData.error);
        }

        if (!responseData.url) {
          throw new Error('No checkout URL returned. Please try again.');
        }

        if (modal) {
          setModalUrl(responseData.url);
          if (scrollTop) window.scrollTo(0, 0);
        } else {
          window.open(responseData.url, '_blank', 'noopener,noreferrer');
        }
      } finally {
        setIsLoading(false);
        setAltchaKey((prev) => prev + 1);
        setAltchaToken(null);
      }
    },
    [isLoading, altchaToken]
  );

  return {
    checkout,
    isLoading,
    captchaReady: !!altchaToken,
    useFallback,
    closeModal,
    captcha: <HiddenAltcha key={altchaKey} onStateChange={handleCaptchaStateChange} />,
    modal: modalUrl ? <CheckoutModal url={modalUrl} onClose={closeModal} /> : null,
  };
}
