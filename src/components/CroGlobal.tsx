'use client';

import CampaignBanner from '@/components/CampaignBanner';
import PurchaseToast from '@/components/PurchaseToast';

export default function CroGlobal({ showPurchaseToast = false }: { showPurchaseToast?: boolean }) {
  return (
    <>
      <CampaignBanner />
      {showPurchaseToast && <PurchaseToast />}
    </>
  );
}
