'use client';

import React, { useState } from 'react';
import { cheats, gameImages } from '@/data/cheats';
import OCProductCard from '@/components/OCProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function StorePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  // Dynamically extract unique categories from cheats list
  const categoriesMap = new Map<string, { key: string; label: string; icon: string }>();
  cheats.forEach((cheat) => {
    if (cheat.category && !categoriesMap.has(cheat.category)) {
      categoriesMap.set(cheat.category, {
        key: cheat.category,
        label: language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game,
        icon: cheat.gameIcon || '🎮',
      });
    }
  });

  // Sort categories alphabetically by game name
  const sortedCategories = Array.from(categoriesMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label, language)
  );

  const categories = [
    { key: 'all', label: t('store.all'), icon: '🎮' },
    ...sortedCategories,
  ];

  const isSearching = searchQuery.trim().length > 0;

  const displayProducts = isSearching
    ? cheats.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.game.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (c.gameEn && c.gameEn.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : (activeFilter === 'all' ? cheats : cheats.filter((c) => c.category === activeFilter));

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.storeHeader}>
        <p className={styles.storeLabel}>{t('nav.store')}</p>
        <h1 className={styles.storeTitle}>{t('store.title')}</h1>
        <p className={styles.storeDesc}>{t('store.desc')}</p>
        
        {/* Search Bar */}
        <div className={styles.searchContainer}>
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
                aria-label={language === 'en' ? 'Clear search' : 'مسح البحث'}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {!isSearching && (
        <div className={styles.filtersWrapper}>
          <div className={styles.filtersScrollFade} />
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterTab} ${activeFilter === cat.key ? styles.filterTabActive : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className={styles.productsContainer}>
        {activeFilter === 'all' && !isSearching ? (
          /* Games Catalog View */
          <div className={styles.gamesGrid}>
            {categories
              .filter((cat) => cat.key !== 'all')
              .map((cat) => {
                const count = cheats.filter((c) => c.category === cat.key).length;
                return (
                  <div
                    key={cat.key}
                    className={styles.gameCard}
                    onClick={() => setActiveFilter(cat.key)}
                  >
                    {gameImages[cat.key] ? (
                      <img 
                        src={gameImages[cat.key]} 
                        alt={cat.label} 
                        className={styles.gameImage}
                      />
                    ) : (
                      <div className={styles.gameImagePlaceholder}>
                        <span className={styles.placeholderIcon}>{cat.icon}</span>
                      </div>
                    )}
                    <div className={styles.gameCardOverlay} />
                    <div className={styles.gameStar}>★</div>
                    <div className={styles.gameCardContent}>
                      <h3 className={styles.gameCardName}>{cat.label}</h3>
                      <p className={styles.gameCardCount}>{count} {t('product.options')}</p>
                      <span className={styles.gameCardBtn}>{t('product.view')}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          /* Specific Cheat Programs View / Search Results */
          <div>
            {!isSearching && (
              <div className={styles.backContainer}>
                <button className={styles.backButton} onClick={() => setActiveFilter('all')}>
                  {t('store.back')}
                </button>
              </div>
            )}
            {isSearching && (
              <div className={styles.searchResultsInfo}>
                {t('store.results')} &ldquo;{searchQuery}&rdquo;: {displayProducts.length} {t('store.products')}
              </div>
            )}
            <div className={styles.productsGrid}>
              {displayProducts.length > 0 ? (
                displayProducts.map((cheat) => (
                  <OCProductCard key={cheat.id} cheat={cheat} />
                ))
              ) : (
                <div className={styles.emptyState}>{t('store.empty')}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
