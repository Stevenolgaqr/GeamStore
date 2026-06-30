'use client';

import { useEffect, useState } from 'react';
import {
  getSellAuthEmbed,
  SELLAUTH_FAILED_EVENT,
  SELLAUTH_READY_EVENT,
} from '@/lib/sellauth';

const DEFAULT_TIMEOUT_MS = 15_000;

export interface SellauthReadyState {
  /** Embed script loaded and checkout API is available. */
  ready: boolean;
  /** Embed failed or timed out — use direct checkout URL fallback. */
  useFallback: boolean;
}

export function useSellauthReady(timeoutMs = DEFAULT_TIMEOUT_MS): SellauthReadyState {
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

    const markFailed = () => {
      if (cancelled || getSellAuthEmbed()) return;
      setUseFallback(true);
    };

    markReady();
    window.addEventListener('load', markReady);
    window.addEventListener(SELLAUTH_READY_EVENT, markReady);
    window.addEventListener(SELLAUTH_FAILED_EVENT, markFailed);

    const poll = window.setInterval(() => {
      if (getSellAuthEmbed()) {
        markReady();
        window.clearInterval(poll);
      }
    }, 250);

    const timeout = window.setTimeout(() => {
      if (!getSellAuthEmbed()) markFailed();
    }, timeoutMs);

    return () => {
      cancelled = true;
      window.removeEventListener('load', markReady);
      window.removeEventListener(SELLAUTH_READY_EVENT, markReady);
      window.removeEventListener(SELLAUTH_FAILED_EVENT, markFailed);
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, [timeoutMs]);

  return { ready, useFallback };
}

/** True when checkout button should be enabled (embed or fallback). */
export function canOpenCheckout(state: SellauthReadyState): boolean {
  return state.ready || state.useFallback;
}
