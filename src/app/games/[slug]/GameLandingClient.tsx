'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import OCProductCard from '@/components/OCProductCard';
import type { Cheat } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import styles from './game.module.css';

type Props = {
  category: string;
  gameName: string;
  gameNameAr: string;
  products: Cheat[];
  imageUrl?: string;
};

export default function GameLandingClient({
  category,
  gameName,
  gameNameAr,
  products,
  imageUrl,
}: Props) {
  const { language, t } = useLanguage();
  const displayName = language === 'en' ? gameName : gameNameAr;
  const undetected = products.filter((p) => p.status === 'undetected').length;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        {imageUrl && (
          <OptimizedImage
            src={imageUrl}
            alt={displayName}
            fill
            className={styles.heroImage}
            sizes="100vw"
            priority
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{t('games.landingEyebrow')}</p>
          <h1 className={styles.title}>{displayName}</h1>
          <p className={styles.subtitle}>
            {t('games.landingSubtitle', { count: products.length, safe: undetected })}
          </p>
          <div className={styles.actions}>
            <Link href={`/store/${category}`} className={styles.primaryBtn}>
              {t('games.browseAll')}
            </Link>
            <Link href="/status" className={styles.secondaryBtn}>
              {t('home.viewStatus')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.products} aria-labelledby="game-products-title">
        <h2 id="game-products-title" className={styles.sectionTitle}>
          {t('games.availablePrograms')}
        </h2>
        <div className={styles.grid}>
          {products.map((cheat) => (
            <OCProductCard key={cheat.slug} cheat={cheat} />
          ))}
        </div>
      </section>
    </div>
  );
}
