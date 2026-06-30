import type { Metadata } from 'next';
import OCHeader from '@/components/OCHeader';
import OCFooter from '@/components/OCFooter';
import InstructionsFab from '@/components/InstructionsFab';
import CroGlobal from '@/components/CroGlobal';
import SellauthEmbed from '@/components/SellauthEmbed';
import JsonLd from '@/components/JsonLd';
import SkipLink from '@/components/SkipLink';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';
import { LanguageProvider } from '@/context/LanguageContext';
import { fontVariables } from '@/lib/fonts';
import { isAnalyticsEnabled } from '@/lib/features';
import { isPurchaseFeedAvailable } from '@/lib/purchaseFeed';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/productJsonLd';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nova Store | #1 Gaming Cheats & Enhancements',
    template: '%s | Nova Store',
  },
  description:
    'Nova Store – The most trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer, DMA Firmware and more. Powered by top-tier security since 2020.',
  keywords: ['game cheats', 'aimbot', 'ESP', 'HWID spoofer', 'undetected', 'Nova Store', 'gaming enhancements'],
  authors: [{ name: 'Nova Store' }],
  creator: 'Nova Store',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Nova Store | #1 Gaming Cheats & Enhancements',
    description: 'The most trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer & more.',
    siteName: 'Nova Store',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Nova Store' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Store | #1 Gaming Cheats & Enhancements',
    description: 'Undetected game enhancements. Aimbot, ESP, HWID Spoofer & more.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/nova-store-logo.png',
    apple: '/images/nova-store-logo.png',
  },
};

export default function OCLayout({ children }: { children: React.ReactNode }) {
  const analyticsEnabled = isAnalyticsEnabled();
  const purchaseToastEnabled = isPurchaseFeedAvailable();

  return (
    <html lang="ar" dir="rtl" className={fontVariables} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://sellauth.com" />
        <link rel="dns-prefetch" href="https://sellauth.com" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        <LanguageProvider>
          <SkipLink />
          <SellauthEmbed />
          <OCHeader />
          <CroGlobal showPurchaseToast={purchaseToastEnabled} />
          <main id="main-content">{children}</main>
          <OCFooter />
          <InstructionsFab />
          {analyticsEnabled && <CookieConsent />}
          {analyticsEnabled && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  );
}
