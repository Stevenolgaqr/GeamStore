'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { cheats, gameImages, storeCategoryOrder } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import { IconStarRating } from '@/components/icons/ProductIcons';
import StoreGameCard from '@/components/StoreGameCard';
import styles from './page.module.css';

function getGameCardVariant(categoryKey: string): 'default' | 'featured' | 'wide' {
  if (categoryKey === storeCategoryOrder[0]) return 'featured';
  if (categoryKey === storeCategoryOrder[1]) return 'wide';
  return 'default';
}

export default function Home() {
  const { t, language } = useLanguage();

  const popularCheats = useMemo(
    () =>
      [...cheats]
        .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        .slice(0, 3),
    []
  );

  const featuredCategories = useMemo(() => {
    const map = new Map<string, { key: string; label: string }>();
    cheats.forEach((cheat) => {
      if (cheat.category && !map.has(cheat.category)) {
        map.set(cheat.category, {
          key: cheat.category,
          label: language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game,
        });
      }
    });
    const priorityIndex = (key: string) => {
      const i = storeCategoryOrder.indexOf(key as (typeof storeCategoryOrder)[number]);
      return i === -1 ? storeCategoryOrder.length : i;
    };
    return Array.from(map.values())
      .sort((a, b) => {
        const pa = priorityIndex(a.key);
        const pb = priorityIndex(b.key);
        if (pa !== pb) return pa - pb;
        return a.label.localeCompare(b.label, language);
      })
      .slice(0, 8);
  }, [language]);

  const stats = useMemo(() => {
    const games = new Set(cheats.map((c) => c.category)).size;
    return {
      games,
      products: cheats.length,
      undetected: cheats.filter((c) => c.status === 'undetected').length,
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>{t('home.heroEyebrow')}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {t('home.heroTitle1')}
              <br />
              {t('home.heroTitle2')} <span>{t('home.heroTitle3')}</span>
            </h1>
            <p className={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>

            <div className={styles.heroStats} aria-label={language === 'en' ? 'Store stats' : 'إحصائيات'}>
              <span className={styles.heroStat}>
                <strong>{stats.games}</strong> {t('store.statsGames')}
              </span>
              <span className={styles.heroStatDot} aria-hidden />
              <span className={styles.heroStat}>
                <strong>{stats.products}</strong> {t('store.statsProducts')}
              </span>
              <span className={styles.heroStatDot} aria-hidden />
              <span className={`${styles.heroStat} ${styles.heroStatSafe}`}>
                <strong>{stats.undetected}</strong> {t('store.statsUndetected')}
              </span>
            </div>

            <div className={styles.heroActions}>
              <Link href="/store" className={styles.primaryBtn}>
                {t('home.viewAll')}
              </Link>
              <Link href="/status" className={styles.secondaryBtn}>
                {t('home.viewStatus')}
              </Link>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <div className={styles.heroO} aria-hidden>
              N
            </div>
            <img
              src="/images/red-hero.jpeg"
              alt=""
              className={styles.heroCharacter}
              width={520}
              height={580}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className={styles.popularSection} aria-labelledby="popular-title">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{t('home.popular')}</p>
          <h2 id="popular-title" className={styles.sectionTitle}>
            {t('home.popular')}
          </h2>
          <p className={styles.sectionSubtitle}>{t('home.popularDesc')}</p>
        </div>

        <div className={styles.popularGrid}>
          {popularCheats.map((cheat, i) => {
            const displayTitle =
              language === 'en' && cheat.titleEn ? cheat.titleEn : cheat.title;
            const displayDesc =
              language === 'en' && cheat.descriptionEn
                ? cheat.descriptionEn.split('\n')[0]
                : cheat.description.split('\n')[0];
            const thumb = cheat.image || gameImages[cheat.category] || '/images/red-hero.jpeg';
            const statusLabel = t(`status.${cheat.status}`);
            const statusClass =
              cheat.status === 'undetected'
                ? styles.statusUndetected
                : cheat.status === 'updating'
                  ? styles.statusUpdating
                  : styles.statusDetected;

            return (
              <article
                key={cheat.id}
                className={styles.popularCard}
                style={{ '--card-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                <Link href={`/product/${cheat.slug}`} className={styles.thumbLink}>
                  <div
                    className={styles.videoThumb}
                    style={{ backgroundImage: `url(${thumb})` }}
                  >
                    <span className={`${styles.statusChip} ${statusClass}`}>
                      <span className={styles.statusDot} aria-hidden />
                      {statusLabel}
                    </span>
                    <div className={styles.ratingBlock}>
                      <IconStarRating rating={cheat.rating} size={12} />
                      <span>{cheat.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
                <div className={styles.cardContent}>
                  <div className={styles.cardInfo}>
                    <h3>{displayTitle}</h3>
                    <p>{displayDesc}</p>
                  </div>
                  <Link href={`/product/${cheat.slug}`} className={styles.viewBtn}>
                    {t('home.viewProd')}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.gamesSection} aria-labelledby="games-title">
        <div className={styles.sectionHeaderRow}>
          <div>
            <p className={styles.sectionLabel}>{t('store.all')}</p>
            <h2 id="games-title" className={styles.sectionTitle}>
              {t('home.featuredGames')}
            </h2>
          </div>
          <Link href="/store" className={styles.sectionLink}>
            {t('home.viewAll')}
          </Link>
        </div>

        <div className={styles.gamesGrid}>
          {featuredCategories.map((cat, index) => {
            const count = cheats.filter((c) => c.category === cat.key).length;
            return (
              <StoreGameCard
                key={cat.key}
                label={cat.label}
                count={count}
                countLabel={t('product.options')}
                ctaLabel={t('product.view')}
                imageUrl={gameImages[cat.key]}
                variant={getGameCardVariant(cat.key)}
                animationDelay={`${index * 45}ms`}
                href={`/store?category=${cat.key}`}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
