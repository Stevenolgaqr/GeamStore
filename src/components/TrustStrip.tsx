'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './TrustStrip.module.css';

export default function TrustStrip() {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap}>
      <ul className={styles.strip} aria-label={t('trust.aria')}>
        <li className={styles.item}>
          <span className={styles.icon} aria-hidden>
            🔒
          </span>
          {t('product.securePay')}
        </li>
        <li className={styles.item}>
          <span className={styles.icon} aria-hidden>
            ⚡
          </span>
          {t('trust.instantDelivery')}
        </li>
        <li className={styles.item}>
          <Link href="/refunds">{t('trust.refundPolicy')}</Link>
        </li>
        <li className={styles.item}>
          <Link href="/status">{t('trust.liveStatus')}</Link>
        </li>
      </ul>
      <div className={styles.payments} aria-hidden>
        <span className={styles.paymentIcon}>VISA</span>
        <span className={styles.paymentIcon}>MC</span>
        <span className={styles.paymentIcon}>CRYPTO</span>
        <span className={styles.paymentIcon}>PAYPAL</span>
      </div>
    </div>
  );
}
