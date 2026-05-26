'use client';

import React from 'react';
import styles from './GameCatalogCard.module.css';

type Props = {
  index: number;
  label: string;
  programCount: number;
  programsLabel: string;
  safeCount: number;
  safeLabel: string;
  ctaLabel: string;
  imageUrl?: string;
  animationDelay?: string;
  onSelect: () => void;
};

export default function GameCatalogCard({
  index,
  label,
  programCount,
  programsLabel,
  safeCount,
  safeLabel,
  ctaLabel,
  imageUrl,
  animationDelay = '0ms',
  onSelect,
}: Props) {
  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <button
      type="button"
      className={styles.card}
      style={{ '--card-delay': animationDelay } as React.CSSProperties}
      onClick={onSelect}
    >
      <span className={styles.index} aria-hidden>
        #{indexLabel}
      </span>

      {imageUrl ? (
        <img src={imageUrl} alt="" className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}

      <div className={styles.overlay} aria-hidden />

      {programCount > 0 && (
        <span className={styles.safeBadge}>
          {safeCount}/{programCount} {safeLabel}
        </span>
      )}

      <div className={styles.body}>
        <h3 className={styles.name}>{label}</h3>
        <div className={styles.footer}>
          <span className={styles.programs}>
            {programCount} {programsLabel}
          </span>
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
      </div>
    </button>
  );
}
