'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../success/success.module.css';

export default function CancelPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ background: 'rgba(255, 71, 87, 0.1)', boxShadow: '0 0 30px rgba(255, 71, 87, 0.2)' }}>
          <span className={styles.icon} style={{ filter: 'drop-shadow(0 0 10px rgba(255, 71, 87, 0.5))' }}>❌</span>
        </div>
        <h1 className={styles.title}>{t('cancel.title')}</h1>
        <p className={styles.description}>{t('cancel.desc')}</p>
        <div className={styles.actions}>
          <Link href="/store" className={styles.homeBtn}>
            {t('cancel.store')}
          </Link>
          <Link href="/contact" className={styles.storeBtn} style={{ background: 'linear-gradient(135deg, #ff4757, #ff6b81)', boxShadow: '0 10px 20px rgba(255, 71, 87, 0.2)' }}>
            {t('cancel.support')}
          </Link>
        </div>
      </div>
    </div>
  );
}
