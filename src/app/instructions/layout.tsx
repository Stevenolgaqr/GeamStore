import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Setup Instructions',
  description: 'Step-by-step setup guides for all Nova Store products.',
};

export default function InstructionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
