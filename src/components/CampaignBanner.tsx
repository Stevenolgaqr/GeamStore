'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getActiveCampaign, type Campaign } from '@/data/campaigns';
import styles from './CampaignBanner.module.css';

function formatCountdown(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return '';
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${mins}m`;
}

export default function CampaignBanner() {
  const { language, t } = useLanguage();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const active = getActiveCampaign();
    setCampaign(active);
    if (!active) return;

    const tick = () => {
      const remaining = formatCountdown(active.endsAt);
      if (!remaining) {
        setCampaign(null);
        return;
      }
      setCountdown(remaining);
    };

    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  if (!campaign) return null;

  const message = language === 'en' ? campaign.messageEn : campaign.messageAr;

  return (
    <div className={styles.banner} role="status">
      <span className={styles.message}>{message}</span>
      {countdown && (
        <span className={styles.countdown}>
          {t('campaign.endsIn', { time: countdown })}
        </span>
      )}
      <span className={styles.code}>{campaign.couponCode}</span>
    </div>
  );
}
