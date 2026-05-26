'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function StorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && cheats.some((c) => c.category === category)) {
      setActiveFilter(category);
    } else if (!category) {
      setActiveFilter('all');
    }
  }, [searchParams]);

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

  const categoryStats = useMemo(() => {
    const map = new Map<string, { total: number; safe: number }>();
    cheats.forEach((cheat) => {
      const current = map.get(cheat.category) ?? { total: 0, safe: 0 };
      current.total += 1;
      if (cheat.status === 'undetected') current.safe += 1;
      map.set(cheat.category, current);
    });
    return map;
  }, []);

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
  const showGameCatalog = activeFilter === 'all' && !isSearching;
  const showProducts = isSearching || activeFilter !== 'all';

  const displayProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = cheats;
    if (q) {
      list = cheats.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.game.toLowerCase().includes(q) ||
          (c.gameEn && c.gameEn.toLowerCase().includes(q)) ||
          (c.titleEn && c.titleEn.toLowerCase().includes(q))
      );
    } else if (activeFilter !== 'all') {
      list = cheats.filter((c) => c.category === activeFilter);
    }
    return [...list].sort((a, b) => {
      const pa = priorityIndex(a.category);
      const pb = priorityIndex(b.category);
      if (pa !== pb) return pa - pb;
      return a.title.localeCompare(b.title, language);
    });
  }, [activeFilter, searchQuery, language]);

  const stats = useMemo(() => {
    const gameCount = sortedCategories.length;
    const productCount = cheats.length;
    const undetectedCount = cheats.filter((c) => c.status === 'undetected').length;
    return { gameCount, productCount, undetectedCount };
  }, [sortedCategories.length]);

  const selectFilter = useCallback(
    (key: string, options?: { scrollToProducts?: boolean }) => {
      setActiveFilter(key);
      if (key === 'all') {
        router.replace('/store', { scroll: false });
      } else {
        router.replace(`/store?category=${encodeURIComponent(key)}`, { scroll: false });
      }
      if (options?.scrollToProducts && key !== 'all') {
        requestAnimationFrame(() => {
          productsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    },
    [router]
  );

  const selectGameFromCatalog = useCallback(
    (key: string) => {
      selectFilter(key, { scrollToProducts: true });
    },
    [selectFilter]
  );

  const activeGameLabel =
    categories.find((c) => c.key === activeFilter && c.key !== 'all')?.label ?? '';

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
                onClick={() => selectFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={productsContainerRef} className={styles.productsContainer}>
        {showGameCatalog && (
          <section className={styles.catalogSection} aria-labelledby="catalog-heading">
            <h2 id="catalog-heading" className={styles.catalogTitle}>
              {t('store.pickGame')}
            </h2>
            <div className={styles.gamesGrid}>
              {sortedCategories.map((cat, index) => {
                const stat = categoryStats.get(cat.key) ?? { total: 0, safe: 0 };
                return (
                  <StoreGameCard
                    key={cat.key}
                    label={cat.label}
                    count={stat.total}
                    countLabel={t('product.options')}
                    ctaLabel={t('product.view')}
                    imageUrl={gameImages[cat.key]}
                    variant={getGameCardVariant(cat.key)}
                    animationDelay={`${Math.min(index, 12) * 40}ms`}
                    safeCount={stat.safe}
                    safeLabel={t('store.safePrograms')}
                    onSelect={() => selectGameFromCatalog(cat.key)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {showProducts && (
          <section
            className={`${styles.productsSection} ${styles.viewEnter}`}
            aria-labelledby="products-heading"
          >
            {!isSearching && activeFilter !== 'all' && (
              <div className={styles.backContainer}>
                <button type="button" className={styles.backButton} onClick={() => selectFilter('all')}>
                  {t('store.back')}
                </button>
              </div>
            )}

            <h2 id="products-heading" className={styles.productsHeading}>
              {isSearching ? (
                <>
                  {t('store.results')} &ldquo;{searchQuery}&rdquo;
                </>
              ) : (
                activeGameLabel
              )}
              <span className={styles.productsCount}>
                {displayProducts.length} {t('store.products')}
              </span>
            </h2>

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
                  <button
                    type="button"
                    className={styles.emptyReset}
                    onClick={() => {
                      setSearchQuery('');
                      selectFilter('all');
                    }}
                  >
                    {t('store.clearSearch')}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StorePageFallback() {
  return (
    <div className={styles.page}>
      <div className={styles.storeFallback} aria-busy="true" aria-label="Loading store" />
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<StorePageFallback />}>
      <StorePageContent />
    </Suspense>
  );
}
