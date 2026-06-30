'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { REFERRAL_DISCOUNT_PERCENT, storeReferralCode } from '@/lib/referral';
import styles from './ref.module.css';

export default function ReferralClient({ code }: { code: string }) {
  const { t } = useLanguage();

  useEffect(() => {
    storeReferralCode(code);
  }, [code]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{t('referral.eyebrow')}</p>
        <h1 className={styles.title}>{t('referral.title')}</h1>
        <p className={styles.desc}>
          {t('referral.desc', { percent: REFERRAL_DISCOUNT_PERCENT, code })}
        </p>
        <p className={styles.code}>{code}</p>
        <Link href="/store" className={styles.cta}>
          {t('referral.cta')}
        </Link>
      </div>
    </div>
  );
}
