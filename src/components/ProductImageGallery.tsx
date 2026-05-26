'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './ProductImageGallery.module.css';

type Props = {
  images: string[];
  alt: string;
  placeholderIcon?: string;
  imagesLabel: string;
};

export default function ProductImageGallery({
  images,
  alt,
  placeholderIcon = '🎮',
  imagesLabel,
}: Props) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(0);
  }, [list]);

  const goTo = useCallback(
    (next: number) => {
      if (list.length <= 1) return;
      const i = ((next % list.length) + list.length) % list.length;
      setFade(true);
      window.setTimeout(() => {
        setIndex(i);
        setFade(false);
      }, 120);
    },
    [list.length]
  );

  const scrollThumbs = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = trackRef.current;
    const active = el?.querySelector(`[data-thumb-index="${index}"]`) as HTMLElement | null;
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [index]);

  if (list.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainStage}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>{placeholderIcon}</span>
          </div>
        </div>
      </div>
    );
  }

  const current = list[index];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainStage}>
        {list.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.mainNav} ${styles.mainNavPrev}`}
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.mainNav} ${styles.mainNavNext}`}
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
            >
              ›
            </button>
            <span className={styles.mainCounter}>
              {index + 1} / {list.length}
            </span>
          </>
        )}
        <img
          key={current}
          src={current}
          alt={`${alt} — ${index + 1}`}
          className={`${styles.mainImage} ${fade ? styles.mainImageFade : ''}`}
        />
      </div>

      {list.length > 1 && (
        <div className={styles.thumbsPanel}>
          <div className={styles.thumbsHeader}>
            <span className={styles.thumbsLabel}>{imagesLabel}</span>
            <div className={styles.thumbsNav}>
              <button
                type="button"
                className={styles.thumbNavBtn}
                onClick={() => scrollThumbs(-1)}
                aria-label="Scroll thumbnails left"
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.thumbNavBtn}
                onClick={() => scrollThumbs(1)}
                aria-label="Scroll thumbnails right"
              >
                ›
              </button>
            </div>
          </div>
          <div className={styles.thumbsTrack} ref={trackRef}>
            {list.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                data-thumb-index={i}
                className={`${styles.thumbBtn} ${i === index ? styles.thumbBtnActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Image ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={src} alt="" className={styles.thumbImg} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
