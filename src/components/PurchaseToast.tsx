'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getAnalyticsConsent } from '@/lib/analytics';
import styles from './PurchaseToast.module.css';

interface PurchaseEvent {
  id: string;
  productName: string;
  game?: string;
  purchasedAt: string;
}

function minutesAgo(iso: string): number {
  return Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
}

const analyticsEnabled = !!(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID);

export default function PurchaseToast() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState<PurchaseEvent | null>(null);
  const [consentPending, setConsentPending] = useState(analyticsEnabled);
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!analyticsEnabled) {
      setConsentPending(false);
      return;
    }

    const syncConsent = () => {
      setConsentPending(getAnalyticsConsent() === null);
    };
    syncConsent();
    window.addEventListener('nova-consent-change', syncConsent);
    return () => window.removeEventListener('nova-consent-change', syncConsent);
  }, []);

  useEffect(() => {
    if (consentPending) return;

    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch('/api/recent-purchases');
        if (!res.ok || cancelled) return;
        const data: PurchaseEvent[] = await res.json();
        if (!data.length) return;

        const latest = data.find((e) => !seenRef.current.has(e.id));
        if (!latest || cancelled) return;

        const ageMin = minutesAgo(latest.purchasedAt);
        if (ageMin > 60) return;

        seenRef.current.add(latest.id);
        setEvent(latest);
        setVisible(true);
        window.setTimeout(() => setVisible(false), 6000);
      } catch {
        /* silent */
      }
    };

    poll();
    const id = window.setInterval(poll, 45000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [consentPending]);

  if (!visible || !event || consentPending) return null;

  const mins = minutesAgo(event.purchasedAt);

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.dot} aria-hidden />
      <span>
        {t('fomo.recentPurchase', {
          product: event.productName,
          minutes: mins,
        })}
      </span>
    </div>
  );
}
