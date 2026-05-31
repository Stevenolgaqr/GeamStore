'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { productInstructions, type ProductInstruction } from '@/data/instructions';
import { useLanguage } from '@/context/LanguageContext';
import { markdownToHtml } from '@/lib/instructionsMarkdown';
import styles from './instructions.module.css';

type GameGroup = {
  gameEn: string;
  game: string;
  items: ProductInstruction[];
};

function groupByGame(items: ProductInstruction[], language: 'ar' | 'en'): GameGroup[] {
  const map = new Map<string, GameGroup>();
  for (const item of items) {
    const key = item.gameEn || item.game || 'Other';
    if (!map.has(key)) {
      map.set(key, { gameEn: item.gameEn || key, game: item.game || key, items: [] });
    }
    map.get(key)!.items.push(item);
  }
  return [...map.values()]
    .map((g) => ({
      ...g,
      items: [...g.items].sort((a, b) => a.titleEn.localeCompare(b.titleEn)),
    }))
    .sort((a, b) => {
      const labelA = language === 'ar' ? a.game : a.gameEn;
      const labelB = language === 'ar' ? b.game : b.gameEn;
      return labelA.localeCompare(labelB);
    });
}

export default function InstructionsPage() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mobileListOpen, setMobileListOpen] = useState(false);

  const sorted = useMemo(
    () => [...productInstructions].sort((a, b) => a.titleEn.localeCompare(b.titleEn)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (item) =>
        item.titleEn.toLowerCase().includes(q) ||
        item.gameEn.toLowerCase().includes(q) ||
        item.game.toLowerCase().includes(q)
    );
  }, [query, sorted]);

  const groups = useMemo(() => groupByGame(filtered, language), [filtered, language]);

  const selected = useMemo(
    () => sorted.find((item) => item.slug === selectedSlug) ?? null,
    [selectedSlug, sorted]
  );

  const selectProduct = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setMobileListOpen(false);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${slug}`);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && sorted.some((item) => item.slug === hash)) {
      setSelectedSlug(hash);
      return;
    }
    const firstWithContent = sorted.find((item) => item.hasContent);
    if (firstWithContent) setSelectedSlug(firstWithContent.slug);
  }, [sorted]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && sorted.some((item) => item.slug === hash)) {
        setSelectedSlug(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [sorted]);

  const contentHtml = selected?.hasContent ? markdownToHtml(selected.content) : '';

  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>{t('nav.instructions')}</span>
          <h1 className={styles.title}>
            {t('instructions.title')}
          </h1>
          <p className={styles.subtitle}>{t('instructions.subtitle')}</p>
        </header>

        <div className={styles.layout}>
          <aside className={`${styles.sidebar} ${mobileListOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarInner}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('instructions.search')}
                className={styles.search}
                aria-label={t('instructions.search')}
              />

              <nav className={styles.productNav} aria-label={t('instructions.title')}>
                {groups.length === 0 ? (
                  <p className={styles.noResults}>{t('instructions.noResults')}</p>
                ) : (
                  groups.map((group) => (
                    <div key={group.gameEn} className={styles.gameGroup}>
                      <h2 className={styles.gameLabel}>
                        {language === 'ar' ? group.game : group.gameEn}
                      </h2>
                      <ul className={styles.productList}>
                        {group.items.map((item) => (
                          <li key={item.slug}>
                            <button
                              type="button"
                              className={`${styles.productBtn} ${
                                selectedSlug === item.slug ? styles.productBtnActive : ''
                              }`}
                              onClick={() => selectProduct(item.slug)}
                              aria-current={selectedSlug === item.slug ? 'true' : undefined}
                            >
                              <span className={styles.productName}>{item.titleEn}</span>
                              {!item.hasContent && (
                                <span className={styles.noGuideTag}>{t('instructions.empty')}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </nav>
            </div>
          </aside>

          <section className={styles.contentPanel} aria-live="polite">
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileListOpen((v) => !v)}
              aria-expanded={mobileListOpen}
            >
              {mobileListOpen ? t('instructions.hideList') : t('instructions.showList')}
            </button>

            {!selected ? (
              <div className={styles.emptyState}>
                <h2>{t('instructions.select')}</h2>
              </div>
            ) : (
              <>
                <div className={styles.contentHeader}>
                  <div>
                    <p className={styles.contentGame}>
                      {language === 'ar' ? selected.game : selected.gameEn}
                    </p>
                    <h2 className={styles.contentTitle}>{selected.titleEn}</h2>
                  </div>
                  <Link href={`/product/${selected.slug}`} className={styles.productLink}>
                    {t('instructions.viewProduct')} →
                  </Link>
                </div>

                {selected.hasContent ? (
                  <div
                    className={styles.markdown}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                ) : (
                  <div className={styles.emptyState}>
                    <p>{t('instructions.empty')}</p>
                    <a
                      href="https://discord.gg/novastore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.discordLink}
                    >
                      {t('instructions.contactDiscord')}
                    </a>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
