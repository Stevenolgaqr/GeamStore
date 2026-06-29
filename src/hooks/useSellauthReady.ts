'use client';

import { useEffect, useState } from 'react';
import { getSellAuthEmbed, SELLAUTH_READY_EVENT } from '@/lib/sellauth';

export function useSellauthReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (getSellAuthEmbed()) setReady(true);
    };

    check();
    window.addEventListener('load', check);
    window.addEventListener(SELLAUTH_READY_EVENT, check);

    const interval = window.setInterval(() => {
      if (getSellAuthEmbed()) {
        setReady(true);
        window.clearInterval(interval);
      }
    }, 250);

    return () => {
      window.removeEventListener('load', check);
      window.removeEventListener(SELLAUTH_READY_EVENT, check);
      window.clearInterval(interval);
    };
  }, []);

  return ready;
}
