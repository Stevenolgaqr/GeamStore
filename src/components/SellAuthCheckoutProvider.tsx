'use client';

import React, { createContext, useContext } from 'react';
import { useSellAuthEmbed, type CheckoutOptions } from '@/hooks/useSellAuthEmbed';

interface SellAuthCheckoutContextValue {
  checkout: (options: CheckoutOptions) => Promise<void>;
  captchaReady: boolean;
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

export default function SellAuthCheckoutProvider({ children }: { children: React.ReactNode }) {
  const { checkout, captchaReady, isLoading, captcha, modal } = useSellAuthEmbed();

  return (
    <SellAuthCheckoutContext.Provider value={{ checkout, captchaReady, isLoading }}>
      {children}
      {captcha}
      {modal}
    </SellAuthCheckoutContext.Provider>
  );
}
