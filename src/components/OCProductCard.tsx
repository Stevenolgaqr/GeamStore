'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import type { Cheat } from '@/data/cheats';
import { gameImages } from '@/data/cheats-meta';
import { useLanguage } from '@/context/LanguageContext';
import { useSellauthReady, canOpenCheckout } from '@/hooks/useSellauthReady';
import { formatRetailPrice } from '@/lib/pricing';
import { getDefaultPlan, openSellauthCheckout } from '@/lib/sellauth';
import OptimizedImage from '@/components/OptimizedImage';
import { IconStarRating } from '@/components/icons/ProductIcons';
import styles from './OCProductCard.module.css';

interface Props {
  cheat: Cheat;
}

export default function OCProductCard({ cheat }: Props) {
  const { language, t } = useLanguage();
  const checkoutState = useSellauthReady();
  const checkoutAvailable = canOpenCheckout(checkoutState);
  const defaultPlan = getDefaultPlan(cheat.plans);
  const canQuickBuy = !!defaultPlan?.sellauthProductId;

  const statusClass =
    cheat.status === 'undetected'
      ? styles.statusUndetected
      : cheat.status === 'updating'
        ? styles.statusUpdating
        : styles.statusDetected;

  const lowestPrice = Math.min(...cheat.plans.map((p) => p.price));
  const imageSrc = cheat.image || gameImages[cheat.category];

  const displayTitle = language === 'en' && cheat.titleEn ? cheat.titleEn : cheat.title;
  const displayGame = language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game;
  const displayDesc =
    language === 'en' && cheat.descriptionEn ? cheat.descriptionEn : cheat.description;
  const statusLabel = t(`status.${cheat.status}`) || cheat.statusLabel;

  const handleQuickBuy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!defaultPlan?.sellauthProductId) return;
      e.preventDefault();
      void openSellauthCheckout(defaultPlan);
    },
    [defaultPlan]
  );

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        {imageSrc ? (
          <OptimizedImage
            src={imageSrc}
            alt={displayTitle}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
          />
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

        {cheat.tag ? (
          <div className={styles.tag}>{cheat.tag}</div>
        ) : (
          cheat.reviews >= 40 &&
          cheat.rating >= 4.8 && (
            <div className={styles.tag}>{t('card.topRated')}</div>
          )
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.gameLabel}>{displayGame}</span>
        <h3 className={styles.title}>{displayTitle}</h3>
        <p className={styles.desc}>{displayDesc}</p>

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
        {canQuickBuy ? (
          <button
            type="button"
            className={styles.buyBtn}
            onClick={handleQuickBuy}
            disabled={!checkoutAvailable}
            aria-busy={!checkoutAvailable}
          >
            {checkoutAvailable ? t('card.quickBuy') : t('product.loadingCheckout')}
          </button>
        ) : (
          <Link href={`/product/${cheat.slug}`} className={styles.buyBtn}>
            {t('card.buyNow')}
          </Link>
        )}
        <Link href={`/product/${cheat.slug}`} className={styles.detailBtn}>
          {t('card.details')}
        </Link>
      </div>
    </div>
  );
}
