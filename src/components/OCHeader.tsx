'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import OptimizedImage from '@/components/OptimizedImage';
import { useLanguage } from '@/context/LanguageContext';
import styles from './OCHeader.module.css';

export default function OCHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav.store'), href: '/store' },
    { label: t('nav.status'), href: '/status' },
    { label: t('nav.instructions'), href: '/instructions' },
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.support'), href: '/contact' },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/store?q=${encodeURIComponent(q)}`);
    setMenuOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <OptimizedImage
            src="/images/nova-store-logo.png"
            alt="Nova Store"
            className={styles.logoImage}
            width={120}
            height={40}
            priority
          />
          <span className={styles.logoText}>
            Nova <span>Store</span>
          </span>
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearch} role="search">
          <label className={styles.srOnly} htmlFor="global-search">
            {t('header.search')}
          </label>
          <input
            id="global-search"
            type="search"
            className={styles.searchInput}
            placeholder={t('header.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn} aria-label={t('header.searchSubmit')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

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
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('header.menuClose') : t('header.menuOpen')}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </div>

      <nav className={styles.navBar} aria-label="Main">
        <div className={styles.navScrollFadeStart} aria-hidden />
        <div className={styles.navScrollFadeEnd} aria-hidden />
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

      {menuOpen && (
        <div className={styles.mobileMenuBackdrop} onClick={() => setMenuOpen(false)} aria-hidden />
      )}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href === '/store' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
