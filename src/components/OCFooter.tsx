'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { useLanguage } from '@/context/LanguageContext';
import styles from './OCFooter.module.css';

export default function OCFooter() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <OptimizedImage
                src="/images/nova-store-logo.png"
                alt="Nova Store"
                className={styles.logoImage}
                width={120}
                height={48}
              />
              <span className={styles.logoText}>
                NOVA<span>STORE</span>
              </span>
            </Link>
            <p className={styles.desc}>{t('footer.desc')}</p>
            <a
              href="https://discord.gg/novastore"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordBadge}
            >
              {t('footer.discord')}
            </a>
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.navigation')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>{t('footer.home')}</Link></li>
              <li><Link href="/store" className={styles.link}>{t('footer.store')}</Link></li>
              <li><Link href="/status" className={styles.link}>{t('footer.status')}</Link></li>
              <li><Link href="/reviews" className={styles.link}>{t('footer.reviews')}</Link></li>
              <li><Link href="/contact" className={styles.link}>{t('footer.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.information')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/terms" className={styles.link}>{t('footer.terms')}</Link></li>
              <li><Link href="/privacy" className={styles.link}>{t('footer.privacy')}</Link></li>
              <li><Link href="/refunds" className={styles.link}>{t('footer.refunds')}</Link></li>
              <li><Link href="/contact" className={styles.link}>{t('footer.contactUs')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.topGames')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/product/ancient-rust" className={styles.link}>Rust</Link></li>
              <li><Link href="/product/ancient-r6" className={styles.link}>Rainbow Six Siege</Link></li>
              <li><Link href="/product/ancient-apex" className={styles.link}>Apex Legends</Link></li>
              <li><Link href="/product/ancient-eft-full" className={styles.link}>Escape from Tarkov</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>&copy; {new Date().getFullYear()} Nova Store. {t('footer.rights')}</div>
          <div className={styles.payments}>
            <div className={styles.paymentIcon}>VISA</div>
            <div className={styles.paymentIcon}>MC</div>
            <div className={styles.paymentIcon}>CRYPTO</div>
            <div className={styles.paymentIcon}>PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
