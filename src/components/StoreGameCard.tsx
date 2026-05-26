'use client';

import React from 'react';
import styles from './StoreGameCard.module.css';

type Variant = 'default' | 'featured' | 'wide';

type Props = {
  label: string;
  count: number;
  countLabel: string;
  ctaLabel: string;
  imageUrl?: string;
  variant?: Variant;
  animationDelay?: string;
  onSelect: () => void;
};

export default function StoreGameCard({
  label,
  count,
  countLabel,
  ctaLabel,
  imageUrl,
  variant = 'default',
  animationDelay = '0ms',
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      className={styles.card}
      data-variant={variant}
      style={{ '--card-delay': animationDelay } as React.CSSProperties}
      onClick={onSelect}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h3 className={styles.name}>{label}</h3>
        <p className={styles.count}>
          {count} {countLabel}
        </p>
        <span className={styles.cta}>
          {ctaLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}
