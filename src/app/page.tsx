import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nova Store | #1 Gaming Cheats & Enhancements',
  description:
    'Nova Store – The most trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer, DMA Firmware and more.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Nova Store | #1 Gaming Cheats & Enhancements',
    description:
      'The most trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer & more.',
    url: SITE_URL,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Nova Store' }],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
