import type { Metadata } from 'next';
import { normalizeReferralCode } from '@/lib/referral';
import ReferralClient from './ReferralClient';

type Props = { params: Promise<{ code: string }> };

export const metadata: Metadata = {
  title: 'Referral',
  robots: { index: false, follow: true },
};

export default async function ReferralPage({ params }: Props) {
  const { code: raw } = await params;
  const code = normalizeReferralCode(raw) || 'FRIEND';

  return <ReferralClient code={code} />;
}
