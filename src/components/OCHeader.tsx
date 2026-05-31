'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './OCHeader.module.css';

export default function OCHeader() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { label: t('nav.store'), href: '/store' },
    { label: t('nav.status'), href: '/status' },
    { label: t('nav.instructions'), href: '/instructions' },
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.support'), href: '/contact' },
  ];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <img
            src="/images/nova-store-logo.png"
            alt=""
            className={styles.logoImage}
            width={120}
            height={40}
            fetchPriority="high"
          />
          <span className={styles.logoText}>
            Nova <span>Store</span>
          </span>
        </Link>
        <div className={styles.topBarActions}>
          <button
            type="button"
            onClick={toggleLanguage}
            className={styles.langToggle}
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
          <a
            href="https://discord.gg/novastore"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordBtn}
          >
            {t('nav.discord')}
          </a>
        </div>
      </div>

      <nav className={styles.navBar} aria-label="Main">
        <div className={styles.navInner}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href === '/store' && pathname === '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
