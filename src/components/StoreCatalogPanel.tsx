'use client';

import React, { useMemo, useState } from 'react';
import { gameImages } from '@/data/cheats';
import GameCatalogCard from '@/components/GameCatalogCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './StoreCatalogPanel.module.css';

export type CatalogCategory = {
  key: string;
  label: string;
  total: number;
  safe: number;
};

type Props = {
  categories: CatalogCategory[];
  gameCount: number;
  productCount: number;
  onSelectGame: (key: string) => void;
};

const HOT_COUNT = 6;

export default function StoreCatalogPanel({
  categories,
  gameCount,
  productCount,
  onSelectGame,
}: Props) {
  const { t } = useLanguage();
  const [catalogQuery, setCatalogQuery] = useState('');

  const hotCategories = useMemo(() => categories.slice(0, HOT_COUNT), [categories]);

  const filteredCategories = useMemo(() => {
    const q = catalogQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.label.toLowerCase().includes(q) || c.key.toLowerCase().includes(q));
  }, [categories, catalogQuery]);

  return (
    <section className={styles.panel} aria-labelledby="catalog-headline">
      <header className={styles.panelHeader}>
        <div className={styles.panelIntro}>
          <p className={styles.panelEyebrow}>{t('nav.store')}</p>
          <h2 id="catalog-headline" className={styles.panelTitle}>
            {t('store.catalogHeadline')}
          </h2>
          <p className={styles.panelDesc}>{t('store.catalogDesc')}</p>
        </div>
        <p className={styles.panelMeta}>
          <strong>{gameCount}</strong> {t('store.statsGames')}
          <span className={styles.metaDot} aria-hidden />
          <strong>{productCount}</strong> {t('store.statsProducts')}
        </p>
      </header>

      <div className={styles.catalogLayout}>
        <aside className={styles.aside} aria-label={t('store.searchGames')}>
          <div className={styles.asideSearch}>
            <span className={styles.searchIcon} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="search"
              className={styles.asideInput}
              placeholder={t('store.searchGames')}
              value={catalogQuery}
              onChange={(e) => setCatalogQuery(e.target.value)}
              aria-label={t('store.searchGames')}
            />
            {catalogQuery && (
              <button
                type="button"
                className={styles.asideClear}
                onClick={() => setCatalogQuery('')}
                aria-label={t('store.clearSearch')}
              >
                ×
              </button>
            )}
          </div>

          {!catalogQuery && hotCategories.length > 0 && (
            <div className={styles.hotBlock}>
              <p className={styles.asideLabel}>{t('store.hotGames')}</p>
              <div className={styles.hotRow}>
                {hotCategories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={styles.hotChip}
                    onClick={() => onSelectGame(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className={styles.asideLabel}>{t('store.browseAll')}</p>
          <ul className={styles.gameList} role="list">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <li key={cat.key}>
                  <button
                    type="button"
                    className={styles.listItem}
                    onClick={() => onSelectGame(cat.key)}
                  >
                    <span className={styles.listName}>{cat.label}</span>
                    <span className={styles.listCount}>{cat.total}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className={styles.listEmpty}>{t('store.empty')}</li>
            )}
          </ul>
        </aside>

        <div className={styles.gridWrap}>
          {filteredCategories.length > 0 ? (
            <div className={styles.catalogGrid}>
              {filteredCategories.map((cat, index) => (
                <GameCatalogCard
                  key={cat.key}
                  index={index}
                  label={cat.label}
                  programCount={cat.total}
                  programsLabel={t('product.options')}
                  safeCount={cat.safe}
                  safeLabel={t('store.safePrograms')}
                  ctaLabel={t('product.view')}
                  imageUrl={gameImages[cat.key]}
                  animationDelay={`${Math.min(index, 15) * 35}ms`}
                  onSelect={() => onSelectGame(cat.key)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.gridEmpty}>
              <p>{t('store.empty')}</p>
              <button type="button" className={styles.gridEmptyBtn} onClick={() => setCatalogQuery('')}>
                {t('store.clearSearch')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
