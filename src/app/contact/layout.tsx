import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Get help from the Nova Store support team via Discord or direct message.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
