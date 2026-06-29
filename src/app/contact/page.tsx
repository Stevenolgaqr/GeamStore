'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './contact.module.css';

const FAQ_KEYS = [
  { q: 'contact.faq1q', a: 'contact.faq1a' },
  { q: 'contact.faq2q', a: 'contact.faq2a' },
  { q: 'contact.faq3q', a: 'contact.faq3a' },
  { q: 'contact.faq4q', a: 'contact.faq4a' },
  { q: 'contact.faq5q', a: 'contact.faq5a' },
  { q: 'contact.faq6q', a: 'contact.faq6a' },
] as const;

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('contact.badge')}</span>
          <h1 className={styles.title}>
            {t('contact.title1')} <span className={styles.accent}>{t('contact.title2')}</span>
          </h1>
          <p className={styles.subtitle}>{t('contact.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          <a
            href="https://discord.gg/novastore"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} ${styles.discordCard}`}
          >
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.033.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('contact.discordTitle')}</h3>
            <p className={styles.cardDesc}>{t('contact.discordDesc')}</p>
            <span className={styles.cardCta}>{t('contact.discordCta')}</span>
          </a>

          <a
            href="mailto:support@nova-store.gg"
            className={`${styles.card} ${styles.emailCard}`}
          >
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('contact.emailTitle')}</h3>
            <p className={styles.cardDesc}>{t('contact.emailDesc')}</p>
            <span className={styles.cardCta}>support@nova-store.gg →</span>
          </a>

          <a href="/status" className={`${styles.card} ${styles.statusCard}`}>
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('contact.statusTitle')}</h3>
            <p className={styles.cardDesc}>{t('contact.statusDesc')}</p>
            <span className={styles.cardCta}>{t('contact.statusCta')}</span>
          </a>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>{t('contact.faqTitle')}</h2>
          <div className={styles.faqGrid}>
            {FAQ_KEYS.map((faq) => (
              <div key={faq.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{t(faq.q)}</h3>
                <p className={styles.faqA}>{t(faq.a)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
