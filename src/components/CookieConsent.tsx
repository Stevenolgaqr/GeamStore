'use client';

import { useEffect, useState } from 'react';
import { getAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getAnalyticsConsent() === null);
  }, []);

  const accept = () => {
    setAnalyticsConsent('granted');
    setVisible(false);
  };

  const decline = () => {
    setAnalyticsConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="cookie-consent-title" aria-live="polite">
      <div className={styles.inner}>
        <p id="cookie-consent-title" className={styles.text}>
          {t('cookie.message')}
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.declineBtn} onClick={decline}>
            {t('cookie.decline')}
          </button>
          <button type="button" className={styles.acceptBtn} onClick={accept}>
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
