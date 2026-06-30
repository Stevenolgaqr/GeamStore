export interface Campaign {
  id: string;
  endsAt: string;
  couponCode: string;
  messageAr: string;
  messageEn: string;
  discountPercent: number;
}

/** Set `endsAt` in the future and deploy to activate. Null = no banner. */
export const campaigns: Campaign[] = [
  {
    id: 'launch-2026',
    endsAt: '2026-08-01T23:59:59Z',
    couponCode: 'NOVA10',
    messageAr: 'خصم 10% — استخدم NOVA10 عند الدفع',
    messageEn: '10% off — use NOVA10 at checkout',
    discountPercent: 10,
  },
];

export function getActiveCampaign(): Campaign | null {
  const now = Date.now();
  return (
    campaigns.find((c) => new Date(c.endsAt).getTime() > now) ?? null
  );
}
