'use client';

import React from 'react';
import Link from 'next/link';
import type { Cheat } from '@/data/cheats';
import { gameImages } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import { formatRetailPrice } from '@/lib/pricing';
import { IconStarRating } from '@/components/icons/ProductIcons';
import styles from './OCProductCard.module.css';

interface Props {
  cheat: Cheat;
}

export default function OCProductCard({ cheat }: Props) {
  const { language, t } = useLanguage();

  const statusClass =
    cheat.status === 'undetected'
      ? styles.statusUndetected
      : cheat.status === 'updating'
        ? styles.statusUpdating
        : styles.statusDetected;

  const lowestPrice = Math.min(...cheat.plans.map((p) => p.price));

  const displayTitle = language === 'en' && cheat.titleEn ? cheat.titleEn : cheat.title;
  const displayGame = language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game;
  const statusLabel = t(`status.${cheat.status}`) || cheat.statusLabel;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        {cheat.image || gameImages[cheat.category] ? (
          <img src={cheat.image || gameImages[cheat.category]} alt={displayTitle} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{cheat.gameIcon}</span>
          </div>
        )}
        <div className={styles.imageOverlay} />

        <div className={`${styles.statusBadge} ${statusClass}`}>
          <span className={styles.statusDot} />
          {statusLabel}
        </div>

        {cheat.tag && <div className={styles.tag}>{cheat.tag}</div>}
      </div>

      <div className={styles.content}>
        <span className={styles.gameLabel}>{displayGame}</span>
        <h3 className={styles.title}>{displayTitle}</h3>
        <p className={styles.desc}>{language === 'en' && cheat.descriptionEn ? cheat.descriptionEn : cheat.description}</p>

        <div className={styles.meta} aria-label={`${cheat.rating} — ${cheat.reviews} ${t('card.reviews')}`}>
          <IconStarRating rating={cheat.rating} size={12} />
          <span className={styles.ratingNum}>{cheat.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>({cheat.reviews} {t('card.reviews')})</span>
        </div>

        <div className={styles.pricing}>
          <span className={styles.priceFrom}>{t('card.startsFrom')}</span>
          <span className={styles.price}>${formatRetailPrice(lowestPrice)}</span>
          <span className={styles.priceCurrency}>USD</span>
        </div>
      </div>

      <div className={styles.cta}>
        <Link href={`/product/${cheat.slug}`} className={styles.buyBtn}>
          {t('card.buyNow')}
        </Link>
      </div>
    </div>
  );
}
