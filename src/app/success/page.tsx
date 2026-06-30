'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cheatCatalog } from '@/data/cheats-catalog';
import { useLanguage } from '@/context/LanguageContext';
import { getRelatedCheats } from '@/lib/relatedProducts';
import { issueReturnDiscount, getReturnDiscount } from '@/lib/referral';
import { trackPurchase } from '@/lib/analytics';
import OCProductCard from '@/components/OCProductCard';
import styles from './success.module.css';

export default function SuccessPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const purchasedSlug = searchParams.get('product') ?? searchParams.get('slug');
  const [returnCode, setReturnCode] = useState<string | null>(null);

  useEffect(() => {
    const existing = getReturnDiscount();
    const discount = existing ?? issueReturnDiscount();
    setReturnCode(discount.code);

    if (purchasedSlug) {
      const product = cheatCatalog.find((c) => c.slug === purchasedSlug);
      if (product) {
        trackPurchase(product.slug, product.titleEn || product.title);
      }
    }
  }, [purchasedSlug]);

  const upsell = useMemo(() => {
    if (purchasedSlug) {
      const purchased = cheatCatalog.find((c) => c.slug === purchasedSlug);
      if (purchased) {
        const related = getRelatedCheats(purchased, 3);
        if (related.length > 0) return related;
      }
    }
    return [...cheatCatalog]
      .filter((c) => c.status === 'undetected' && c.slug !== purchasedSlug)
      .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
      .slice(0, 3);
  }, [purchasedSlug]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>✅</span>
          </div>
          <h1 className={styles.title}>{t('success.title')}</h1>
          <p className={styles.description}>{t('success.desc1')}</p>
          <p className={styles.description}>{t('delivery.keyLocation')}</p>
          <p className={styles.description}>{t('success.desc3')}</p>

          {returnCode && (
            <p className={styles.discountBanner}>
              {t('success.returnDiscount', { code: returnCode })}
            </p>
          )}

          <div className={styles.actions}>
            <Link href="/" className={styles.homeBtn}>
              {t('success.home')}
            </Link>
            <Link href="/store" className={styles.storeBtn}>
              {t('success.continue')}
            </Link>
          </div>
        </div>
      </div>

      {upsell.length > 0 && (
        <section className={styles.upsellSection} aria-labelledby="success-upsell-title">
          <h2 id="success-upsell-title" className={styles.upsellTitle}>
            {t('success.youMightAlsoLike')}
          </h2>
          <div className={styles.upsellGrid}>
            {upsell.map((c) => (
              <OCProductCard key={c.slug} cheat={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
