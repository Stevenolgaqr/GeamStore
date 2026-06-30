import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Order Cancelled',
};

export default function CancelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
