'use client';

import { useSellAuthCheckout } from '@/hooks/useSellAuthEmbed';

export interface SellauthReadyState {
  ready: boolean;
  useFallback: boolean;
  isLoading: boolean;
}

export function useSellauthReady(): SellauthReadyState {
  const { captchaReady, useFallback, isLoading } = useSellAuthCheckout();
  return {
    ready: captchaReady,
    useFallback,
    isLoading,
  };
}

export function canOpenCheckout(state: SellauthReadyState): boolean {
  return (state.ready || state.useFallback) && !state.isLoading;
}
