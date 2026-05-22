import type { Metadata } from 'next';
import OCHeader from '@/components/OCHeader';
import OCFooter from '@/components/OCFooter';
import SellauthEmbed from '@/components/SellauthEmbed';
import { LanguageProvider } from '@/context/LanguageContext';
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
  metadataBase: new URL('https://nova-store.gg'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nova-store.gg',
    title: 'Nova Store | #1 Gaming Cheats & Enhancements',
    description: 'The most trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer & more.',
    siteName: 'Nova Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Store | #1 Gaming Cheats & Enhancements',
    description: 'Undetected game enhancements. Aimbot, ESP, HWID Spoofer & more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OCLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;700;800&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <SellauthEmbed />
          <OCHeader />
          <main>{children}</main>
          <OCFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
