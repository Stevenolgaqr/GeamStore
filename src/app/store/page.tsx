'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cheats, gameImages, storeCategoryOrder } from '@/data/cheats';
import OCProductCard from '@/components/OCProductCard';
import StoreGameCard from '@/components/StoreGameCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

function getGameCardVariant(categoryKey: string): 'default' | 'featured' | 'wide' {
  if (categoryKey === storeCategoryOrder[0]) return 'featured';
  if (categoryKey === storeCategoryOrder[1]) return 'wide';
  return 'default';
}

export default function StorePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridVisible, setGridVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const categoriesMap = useMemo(() => {
    const map = new Map<string, { key: string; label: string }>();
    cheats.forEach((cheat) => {
      if (cheat.category && !map.has(cheat.category)) {
        map.set(cheat.category, {
          key: cheat.category,
          label: language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game,
        });
      }
    });
    return map;
  }, [language]);

  const priorityIndex = (key: string) => {
    const i = storeCategoryOrder.indexOf(key as (typeof storeCategoryOrder)[number]);
    return i === -1 ? storeCategoryOrder.length : i;
  };

  const sortedCategories = useMemo(
    () =>
      Array.from(categoriesMap.values()).sort((a, b) => {
        const pa = priorityIndex(a.key);
        const pb = priorityIndex(b.key);
        if (pa !== pb) return pa - pb;
        return a.label.localeCompare(b.label, language);
      }),
    [categoriesMap, language]
  );

  const categories = useMemo(
    () => [{ key: 'all', label: t('store.all') }, ...sortedCategories],
    [sortedCategories, t]
  );

  const isSearching = searchQuery.trim().length > 0;

  const displayProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return cheats.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.game.toLowerCase().includes(q) ||
          (c.gameEn && c.gameEn.toLowerCase().includes(q)) ||
          (c.titleEn && c.titleEn.toLowerCase().includes(q))
      );
    }
    return activeFilter === 'all' ? cheats : cheats.filter((c) => c.category === activeFilter);
  }, [activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const gameCount = sortedCategories.length;
    const productCount = cheats.length;
    const undetectedCount = cheats.filter((c) => c.status === 'undetected').length;
    return { gameCount, productCount, undetectedCount };
  }, [sortedCategories.length]);

  useEffect(() => {
    setGridVisible(false);
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeFilter, isSearching]);

  return (
    <div className={styles.page}>
      <header className={styles.storeHeader}>
        <p className={`${styles.storeLabel} ${styles.headerStagger}`} style={{ '--i': 0 } as React.CSSProperties}>
          {t('nav.store')}
        </p>
        <h1 className={`${styles.storeTitle} ${styles.headerStagger}`} style={{ '--i': 1 } as React.CSSProperties}>
          {t('store.title')}
        </h1>
        <p className={`${styles.storeDesc} ${styles.headerStagger}`} style={{ '--i': 2 } as React.CSSProperties}>
          {t('store.desc')}
        </p>

        <div
          className={`${styles.statsRow} ${styles.headerStagger}`}
          style={{ '--i': 3 } as React.CSSProperties}
          aria-label={language === 'en' ? 'Store statistics' : 'إحصائيات المتجر'}
        >
          <span className={styles.stat}>
            <strong>{stats.gameCount}</strong> {t('store.statsGames')}
          </span>
          <span className={styles.statDivider} aria-hidden />
          <span className={styles.stat}>
            <strong>{stats.productCount}</strong> {t('store.statsProducts')}
          </span>
          <span className={styles.statDivider} aria-hidden />
          <span className={`${styles.stat} ${styles.statSafe}`}>
            <strong>{stats.undetectedCount}</strong> {t('store.statsUndetected')}
          </span>
        </div>

        <div
          className={`${styles.searchContainer} ${styles.headerStagger}`}
          style={{ '--i': 4 } as React.CSSProperties}
        >
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="search"
              className={styles.searchInput}
              placeholder={t('store.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('store.search')}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label={t('store.clearSearch')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </header>

      {!isSearching && (
        <div className={styles.filtersWrapper}>
          <div className={styles.filtersScrollFade} aria-hidden />
          <div className={styles.filters} role="tablist" aria-label={t('store.all')}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.key}
                className={`${styles.filterTab} ${activeFilter === cat.key ? styles.filterTabActive : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.productsContainer} ref={gridRef}>
        {activeFilter === 'all' && !isSearching ? (
          <div className={`${styles.gamesGrid} ${gridVisible ? styles.gridVisible : ''}`}>
            {sortedCategories.map((cat, index) => {
              const count = cheats.filter((c) => c.category === cat.key).length;
              const variant = getGameCardVariant(cat.key);
              return (
                <StoreGameCard
                  key={cat.key}
                  label={cat.label}
                  count={count}
                  countLabel={t('product.options')}
                  ctaLabel={t('product.view')}
                  imageUrl={gameImages[cat.key]}
                  variant={variant}
                  animationDelay={`${Math.min(index, 12) * 40}ms`}
                  onSelect={() => setActiveFilter(cat.key)}
                />
              );
            })}
          </div>
        ) : (
          <div className={gridVisible ? styles.gridVisible : ''}>
            {!isSearching && (
              <div className={styles.backContainer}>
                <button type="button" className={styles.backButton} onClick={() => setActiveFilter('all')}>
                  {t('store.back')}
                </button>
              </div>
            )}
            {isSearching && (
              <p className={styles.searchResultsInfo}>
                {t('store.results')} &ldquo;{searchQuery}&rdquo;: {displayProducts.length}{' '}
                {t('store.products')}
              </p>
            )}
            <div className={styles.productsGrid}>
              {displayProducts.length > 0 ? (
                displayProducts.map((cheat, i) => (
                  <div
                    key={cheat.id}
                    className={styles.productCardWrap}
                    style={{ '--card-delay': `${Math.min(i, 11) * 45}ms` } as React.CSSProperties}
                  >
                    <OCProductCard cheat={cheat} />
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>{t('store.empty')}</p>
                  <button type="button" className={styles.emptyReset} onClick={() => setSearchQuery('')}>
                    {t('store.clearSearch')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
