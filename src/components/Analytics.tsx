'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { getAnalyticsConsent } from '@/lib/analytics';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const onConsent = () => {
      if (getAnalyticsConsent() === 'granted' && typeof window.gtag === 'function' && gaId) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        window.gtag('config', gaId, { page_path: window.location.pathname });
      }
      if (getAnalyticsConsent() === 'granted' && metaPixelId && typeof window.fbq === 'function') {
        window.fbq('consent', 'grant');
        window.fbq('track', 'PageView');
      }
    };

    window.addEventListener('nova-consent-change', onConsent);
    onConsent();
    return () => window.removeEventListener('nova-consent-change', onConsent);
  }, [gaId, metaPixelId]);

  if (!gaId && !metaPixelId) return null;

  return (
    <>
      {gaId && (
        <>
          <Script id="ga-consent-default" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `}
          </Script>
        </>
      )}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('consent', 'revoke');
            fbq('init', '${metaPixelId}');
          `}
        </Script>
      )}
    </>
  );
}
