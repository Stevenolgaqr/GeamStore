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
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.support'), href: '/contact' },
  ];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                fill="currentColor"
              />
              <path
                d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Nova Store</span>
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
