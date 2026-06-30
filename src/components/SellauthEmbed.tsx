'use client';

import Script from 'next/script';
import { SELLAUTH_READY_EVENT } from '@/lib/sellauth';

export default function SellauthEmbed() {
  return (
    <Script
      src="https://sellauth.com/assets/js/sellauth-embed-2.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window === 'undefined') return;
        const embed = (window as unknown as { sellAuthEmbed?: { injectCaptcha?: () => void; injectStyles?: () => void } }).sellAuthEmbed;
        if (embed) {
          try {
            embed.injectCaptcha?.();
            embed.injectStyles?.();
          } catch (err) {
            console.error('Failed to initialize SellAuth Embed captchas:', err);
          }
          window.dispatchEvent(new Event(SELLAUTH_READY_EVENT));
        }
      }}
    />
  );
}
