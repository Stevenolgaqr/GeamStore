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
      {/* Image */}
      <div className={styles.imageWrap}>
        {cheat.image || gameImages[cheat.category] ? (
          <img src={cheat.image || gameImages[cheat.category]} alt={displayTitle} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{cheat.gameIcon}</span>
          </div>
        )}
        <div className={styles.imageOverlay} />

        {/* Status Badge */}
        <div className={`${styles.statusBadge} ${statusClass}`}>
          <span className={styles.statusDot} />
          {statusLabel}
        </div>

        {/* Tag */}
        {cheat.tag && <div className={styles.tag}>{cheat.tag}</div>}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.gameLabel}>{displayGame}</span>
        <h3 className={styles.title}>{displayTitle}</h3>
        <p className={styles.desc}>{language === 'en' && (cheat as any).descriptionEn ? (cheat as any).descriptionEn : cheat.description}</p>

        {/* Meta */}
        <div className={styles.meta} aria-label={`${cheat.rating} — ${cheat.reviews} ${t('card.reviews')}`}>
          <IconStarRating rating={cheat.rating} size={12} />
          <span className={styles.ratingNum}>{cheat.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>({cheat.reviews} {t('card.reviews')})</span>
        </div>

        {/* Price */}
        <div className={styles.pricing}>
          <span className={styles.priceFrom}>{t('card.startsFrom')}</span>
          <span className={styles.price}>${formatRetailPrice(lowestPrice)}</span>
          <span className={styles.priceCurrency}>USD</span>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <a 
          href={`/product/${cheat.slug}`} 
          className={styles.buyBtn}
          onClick={(e) => {
            const firstPlan = cheat.plans[0];
            if (firstPlan?.sellauthProductId) {
              e.preventDefault();
              if (typeof window !== 'undefined' && (window as any).sellAuthEmbed) {
                (window as any).sellAuthEmbed.checkout(e.currentTarget, {
                  cart: [{ 
                    productId: parseInt(firstPlan.sellauthProductId), 
                    variantId: firstPlan.sellauthVariantId ? parseInt(firstPlan.sellauthVariantId) : undefined,
                    quantity: 1 
                  }],
                  shopId: 185564,
                  modal: true
                });
              } else {
                window.open(`https://nova-store.sellauth.com/product/${firstPlan.sellauthProductId}`, '_blank');
              }
            }
          }}
        >
          {t('card.quickBuy')}
        </a>
        <Link href={`/product/${cheat.slug}`} className={styles.detailBtn}>
          {t('card.details')}
        </Link>
      </div>
    </div>
  );
}
