'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { cheats, gameImages } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
  const { t, language } = useLanguage();

  const popularProducts = useMemo(
    () =>
      [...cheats]
        .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        .slice(0, 3)
        .map((cheat) => ({
          title: language === 'en' ? cheat.titleEn || cheat.title : cheat.title,
          desc:
            language === 'en' && cheat.descriptionEn
              ? cheat.descriptionEn.split('\n')[0]
              : cheat.description.split('\n')[0],
          thumb: cheat.image || gameImages[cheat.category] || '/images/red-hero.jpeg',
          slug: cheat.slug,
          rating: cheat.rating,
        })),
    [language]
  );

  const allGames = [
    { nameEn: 'ARENA BREAKOUT INFINITE', nameAr: 'ارينا بريك اوت إنفينيت', image: '/cheats/abi.jpeg', slug: 'ancient-abi-radar' },
    { nameEn: 'CALL OF DUTY', nameAr: 'كول أوف ديوتي', image: '/cheats/cod.jpeg', slug: 'ancient-cod' },
    { nameEn: 'APEX LEGENDS', nameAr: 'ابيكس ليجندز', image: '/cheats/apex.jpeg', slug: 'ancient-apex' },
    { nameEn: 'FORTNITE', nameAr: 'فورتنايت', image: '/cheats/fortnite.jpeg', slug: 'ancient-fortnite' },
    { nameEn: 'HWID SPOOFER', nameAr: 'سبوفر تخطي الباند', image: '/cheats/spoofer.jpeg', slug: 'gouda-spoofer' },
    { nameEn: 'BATTLEFIELD NOVA', nameAr: 'باتلفيلد نوفا', image: '/cheats/battlefield.jpeg', slug: 'ancient-bf6' },
    { nameEn: 'ARC RAIDERS', nameAr: 'أرك رايدرز', image: '/cheats/arc.jpeg', slug: 'ancient-arc-raiders' },
    { nameEn: 'RUST NOVA', nameAr: 'راست نوفا', image: '/cheats/rust.jpeg', slug: 'ancient-rust' },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>{t('home.heroEyebrow')}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {t('home.heroTitle1')}
              <br />
              {t('home.heroTitle2')} <span>{t('home.heroTitle3')}</span>
            </h1>
            <p className={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>
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
            <div className={styles.heroO} aria-hidden="true">
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
          <h2 id="popular-title" className={styles.sectionTitle}>
            {t('home.popular')}
          </h2>
          <p className={styles.sectionSubtitle}>{t('home.popularDesc')}</p>
        </div>
        <div className={`${styles.popularGrid} stagger`}>
          {popularProducts.map((prod) => (
            <article key={prod.slug} className={styles.popularCard}>
              <Link href={`/product/${prod.slug}`} className={styles.thumbLink}>
                <div
                  className={styles.videoThumb}
                  style={{ backgroundImage: `url(${prod.thumb})` }}
                >
                  <span className={styles.ratingBadge} aria-hidden="true">
                    ★ {prod.rating.toFixed(1)}
                  </span>
                </div>
              </Link>
              <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                  <h3>{prod.title}</h3>
                  <p>{prod.desc}</p>
                </div>
                <Link href={`/product/${prod.slug}`}>
                  <span className={styles.viewBtn}>{t('home.viewProd')}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gamesSection} aria-labelledby="games-title">
        <div className={styles.sectionHeader}>
          <h2 id="games-title" className={styles.sectionTitle}>
            {t('store.all')}
          </h2>
        </div>
        <div className={`${styles.gamesGrid} stagger`}>
          {allGames.map((game) => (
            <Link
              href={`/product/${game.slug}`}
              key={game.slug}
              className={styles.gameCard}
              aria-label={`${language === 'en' ? game.nameEn : game.nameAr} — Nova Store`}
            >
              <img
                src={game.image}
                alt=""
                className={styles.gameImage}
                loading="lazy"
                width={400}
                height={260}
              />
              <span className={styles.gameStar} aria-hidden="true">
                ★
              </span>
              <span className={styles.gameNameOverlay}>
                {language === 'en' ? game.nameEn : game.nameAr}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
