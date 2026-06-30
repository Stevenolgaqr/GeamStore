'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './SkipLink.module.css';

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className={styles.skipLink}>
      {t('a11y.skipToContent')}
    </a>
  );
}
