import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Store',
  description:
    'Browse undetected game enhancements for Rust, Fortnite, Valorant, Apex, and more. Instant delivery via SellAuth.',
  alternates: { canonical: `${SITE_URL}/store` },
  openGraph: {
    title: 'Store | Nova Store',
    description: 'Browse undetected game enhancements for all supported titles.',
    url: `${SITE_URL}/store`,
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
