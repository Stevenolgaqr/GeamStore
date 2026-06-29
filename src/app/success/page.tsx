'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './success.module.css';

export default function SuccessPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>✅</span>
        </div>
        <h1 className={styles.title}>{t('success.title')}</h1>
        <p className={styles.description}>{t('success.desc1')}</p>
        <p className={styles.description}>{t('delivery.keyLocation')}</p>
        <p className={styles.description}>{t('success.desc3')}</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            {t('success.home')}
          </Link>
          <Link href="/store" className={styles.storeBtn}>
            {t('success.continue')}
          </Link>
        </div>
      </div>
    </div>
  );
}
