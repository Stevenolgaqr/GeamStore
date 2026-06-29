'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from '@/app/terms/legal.module.css';

type Props = {
  titleKey: 'legal.termsTitle' | 'legal.privacyTitle' | 'legal.refundsTitle';
};

export default function LegalPageHeader({ titleKey }: Props) {
  const { t } = useLanguage();

  return (
    <div className={styles.header}>
      <span className={styles.badge}>{t('legal.badge')}</span>
      <h1 className={styles.title}>{t(titleKey)}</h1>
      <p className={styles.updated}>{t('legal.updated')}</p>
    </div>
  );
}
