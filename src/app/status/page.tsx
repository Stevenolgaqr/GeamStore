'use client';

import { KEYHUB_STATUS_PAGE_URL } from '@/config/keyhub';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function StatusPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarText}>
          <span className={styles.liveBadge}>{t('status.live')}</span>
          <p className={styles.toolbarDesc}>{t('status.keyhubEmbed')}</p>
        </div>
        <a
          href={KEYHUB_STATUS_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openExternal}
        >
          {t('status.openKeyhub')}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <iframe
        title={t('status.iframeTitle')}
        src={KEYHUB_STATUS_PAGE_URL}
        className={styles.frame}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
