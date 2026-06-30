'use client';

import Link from 'next/link';
import { reviewsData } from '@/data/reviews-data';
import { useLanguage } from '@/context/LanguageContext';
import { IconStarRating } from '@/components/icons/ProductIcons';
import styles from './ProductReviews.module.css';

interface Props {
  game: string;
  gameEn?: string;
  limit?: number;
}

export default function ProductReviews({ game, gameEn, limit = 3 }: Props) {
  const { t } = useLanguage();

  const reviews = reviewsData
    .filter((r) => r.game === gameEn || r.game === game)
    .slice(0, limit);

  if (reviews.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="product-reviews-heading">
      <div className={styles.header}>
        <h2 id="product-reviews-heading" className={styles.title}>
          {t('product.customerReviews')}
        </h2>
        <Link href="/reviews" className={styles.allLink}>
          {t('product.allReviews')} →
        </Link>
      </div>
      <ul className={styles.list}>
        {reviews.map((r) => (
          <li key={r.id}>
            <blockquote className={styles.review}>
              <div className={styles.reviewMeta}>
                <span className={styles.avatar} aria-hidden>
                  {r.avatar}
                </span>
                <div>
                  <cite className={styles.name}>{r.name}</cite>
                  <div className={styles.stars}>
                    <IconStarRating rating={r.rating} size={12} />
                    <span className={styles.date}>{r.date}</span>
                  </div>
                </div>
              </div>
              <p className={styles.text}>{r.text}</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
