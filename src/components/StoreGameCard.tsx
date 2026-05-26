'use client';

import React from 'react';
import Link from 'next/link';
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
  href?: string;
  onSelect?: () => void;
  safeCount?: number;
  safeLabel?: string;
};

export default function StoreGameCard({
  label,
  count,
  countLabel,
  ctaLabel,
  imageUrl,
  variant = 'default',
  animationDelay = '0ms',
  href,
  onSelect,
  safeCount,
  safeLabel,
}: Props) {
  const className = styles.card;
  const style = { '--card-delay': animationDelay } as React.CSSProperties;
  const showSafeBadge = safeCount !== undefined && safeLabel && count > 0;

  const body = (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt="" className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}
      <div className={styles.overlay} />
      {showSafeBadge && (
        <span className={styles.safeBadge}>
          {safeCount}/{count} {safeLabel}
        </span>
      )}
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
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} data-variant={variant} style={style}>
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      data-variant={variant}
      style={style}
      onClick={onSelect}
    >
      {body}
    </button>
  );
}
