'use client';

import { useEffect, useState } from 'react';
import { getSellAuthEmbed, SELLAUTH_READY_EVENT } from '@/lib/sellauth';

const FALLBACK_TIMEOUT_MS = 15_000;

export interface SellauthReadyState {
  ready: boolean;
  useFallback: boolean;
}

export function useSellauthReady(): SellauthReadyState {
  const [ready, setReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (cancelled) return;
      if (getSellAuthEmbed()) {
        setReady(true);
        setUseFallback(false);
      }
    };

    markReady();
    window.addEventListener('load', markReady);
    window.addEventListener(SELLAUTH_READY_EVENT, markReady);

    const poll = window.setInterval(() => {
      if (getSellAuthEmbed()) {
        markReady();
        window.clearInterval(poll);
      }
    }, 250);

    const timeout = window.setTimeout(() => {
      if (!getSellAuthEmbed() && !cancelled) setUseFallback(true);
    }, FALLBACK_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.removeEventListener('load', markReady);
      window.removeEventListener(SELLAUTH_READY_EVENT, markReady);
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, []);

  return { ready, useFallback };
}

export function canOpenCheckout(state: SellauthReadyState): boolean {
  return state.ready || state.useFallback;
}
