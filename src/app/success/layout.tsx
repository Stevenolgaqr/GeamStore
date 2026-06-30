import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Order Confirmed',
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
