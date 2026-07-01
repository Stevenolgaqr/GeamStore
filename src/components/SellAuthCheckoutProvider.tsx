'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CheatPlan } from '@/data/cheats';
import { openSellauthCheckoutLink, planToCheckoutPayload } from '@/lib/sellauth';
import styles from '@/components/SellAuthCheckoutModal.module.css';

interface SellAuthCheckoutContextValue {
  startCheckout: (plan: CheatPlan) => Promise<void>;
  isLoading: boolean;
}

const SellAuthCheckoutContext = createContext<SellAuthCheckoutContextValue | null>(null);

export function useSellAuthCheckout(): SellAuthCheckoutContextValue {
  const ctx = useContext(SellAuthCheckoutContext);
  if (!ctx) {
    throw new Error('useSellAuthCheckout must be used within SellAuthCheckoutProvider');
  }
  return ctx;
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

export default function SellAuthCheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setModalUrl(null);
  }, []);

  const startCheckout = useCallback(async (plan: CheatPlan) => {
    const payload = planToCheckoutPayload(plan);
    if (!payload) {
      openSellauthCheckoutLink(plan);
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/sellauth/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Checkout failed');
      }

      setModalUrl(data.url);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('SellAuth API checkout failed, using checkout-link fallback:', err);
      openSellauthCheckoutLink(plan);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <SellAuthCheckoutContext.Provider value={{ startCheckout, isLoading }}>
      {children}
      {modalUrl && <CheckoutModal url={modalUrl} onClose={closeModal} />}
    </SellAuthCheckoutContext.Provider>
  );
}
