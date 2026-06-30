'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Cheat } from '@/data/cheats';
import { gameImages } from '@/data/cheats-meta';
import { useLanguage } from '@/context/LanguageContext';
import { useSellauthReady, canOpenCheckout } from '@/hooks/useSellauthReady';
import { formatRetailPrice } from '@/lib/pricing';
import { dailyRate, isBestValuePlan, savingsVsDaily } from '@/lib/planSavings';
import { getPlanDisplayLabel, isPlanPopular } from '@/lib/productPlans';
import { getDefaultPlanIndex, openSellauthCheckout } from '@/lib/sellauth';
import { trackBeginCheckout, trackSelectPlan, trackViewItem } from '@/lib/analytics';
import { getProductVideoId } from '@/data/product-videos';
import { trackView } from '@/hooks/useRecentlyViewed';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductReviews from '@/components/ProductReviews';
import RelatedProducts from '@/components/RelatedProducts';
import TrustStrip from '@/components/TrustStrip';
import { IconCheck, IconStarRating } from '@/components/icons/ProductIcons';
import styles from './page.module.css';

const DESC_CLAMP_CHARS = 220;

function buildProductImages(cheat: Cheat): string[] {
  const urls: string[] = [];
  if (cheat.image) urls.push(cheat.image);
  if (cheat.media?.length) {
    for (const url of cheat.media) {
      if (url && !urls.includes(url)) urls.push(url);
    }
  }
  if (urls.length === 0 && gameImages[cheat.category]) {
    urls.push(gameImages[cheat.category]);
  }
  return urls;
}

function getStatusClass(status: string): string {
  if (status === 'undetected') return styles.statusUndetected;
  if (status === 'updating') return styles.statusUpdating;
  return styles.statusDetected;
}

export default function ProductPageClient({ cheat }: { cheat: Cheat }) {
  const slug = cheat.slug;
  const [selectedPlan, setSelectedPlan] = useState(() =>
    cheat ? getDefaultPlanIndex(cheat.plans) : 0
  );
  const [descExpanded, setDescExpanded] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const checkoutState = useSellauthReady();
  const checkoutAvailable = canOpenCheckout(checkoutState);

  useEffect(() => {
    if (cheat) {
      setSelectedPlan(getDefaultPlanIndex(cheat.plans));
    }
  }, [cheat?.slug]);

  useEffect(() => {
    if (slug) trackView(slug);
  }, [slug]);

  useEffect(() => {
    trackViewItem(cheat);
  }, [cheat.slug]);

  useEffect(() => {
    const plan = cheat.plans[selectedPlan];
    if (plan) {
      trackSelectPlan(cheat, selectedPlan, plan.price);
    }
  }, [cheat, selectedPlan]);

  useEffect(() => {
    const el = featuresRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [cheat?.slug]);

  const handleCheckout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!cheat) return;
      const plan = cheat.plans[selectedPlan];
      const isAvailable = !!plan?.sellauthProductId;

      if (isAvailable) {
        e.preventDefault();
        trackBeginCheckout(cheat, plan.price);
        void openSellauthCheckout(plan);
      } else {
        e.preventDefault();
        window.open('https://discord.gg/novastore', '_blank');
      }
    },
    [cheat, selectedPlan]
  );

  const statusClass = getStatusClass(cheat.status);

  const displayTitle = language === 'en' && cheat.titleEn ? cheat.titleEn : cheat.title;
  const displayGame = language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game;
  const displayDesc =
    language === 'en' && cheat.descriptionEn ? cheat.descriptionEn : cheat.description;
  const displayFeatures =
    language === 'en' && cheat.featuresEn ? cheat.featuresEn : cheat.features;
  const statusLabel = t(`status.${cheat.status}`) || cheat.statusLabel;
  const productImages = buildProductImages(cheat);
  const selectedPlanData = cheat.plans[selectedPlan];
  const isCheckoutAvailable = !!selectedPlanData?.sellauthProductId;
  const descNeedsClamp = displayDesc.length > DESC_CLAMP_CHARS;
  const descShown =
    descExpanded || !descNeedsClamp
      ? displayDesc
      : `${displayDesc.slice(0, DESC_CLAMP_CHARS).trim()}…`;

  const weekSavings = cheat.plans[1] ? savingsVsDaily(cheat.plans, 1) : null;
  const videoId = getProductVideoId(cheat.slug);

  return (
    <div className={styles.page}>
      <div className={styles.productHero}>
        <div className={styles.imageCol}>
          <ProductImageGallery
            images={productImages}
            alt={displayTitle}
            imagesLabel={t('product.productImages')}
          />
          <div className={`${styles.statusFloating} ${statusClass}`}>
            <span className={styles.statusDot} />
            {statusLabel}
          </div>
        </div>

        <div className={styles.infoCol}>
          <nav className={`${styles.breadcrumb} ${styles.infoStagger}`} style={{ '--stagger': 0 } as React.CSSProperties} aria-label="Breadcrumb">
            <Link href="/">{t('product.home')}</Link>
            <span aria-hidden>/</span>
            <Link href="/store">{t('nav.store')}</Link>
            <span aria-hidden>/</span>
            <span>{displayGame}</span>
          </nav>

          <span
            className={`${styles.gameLabel} ${styles.infoStagger}`}
            style={{ '--stagger': 1 } as React.CSSProperties}
          >
            {displayGame}
          </span>

          <h1
            className={`${styles.productTitle} ${styles.infoStagger}`}
            style={{ '--stagger': 2 } as React.CSSProperties}
          >
            {displayTitle}
          </h1>

          <div
            className={`${styles.trustRow} ${styles.infoStagger}`}
            style={{ '--stagger': 3 } as React.CSSProperties}
          >
            <div className={styles.ratingBlock} aria-label={`${cheat.rating} out of 5, ${cheat.reviews} ${t('card.reviews')}`}>
              <IconStarRating rating={cheat.rating} />
              <span className={styles.ratingNum}>{cheat.rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>
                ({cheat.reviews} {t('card.reviews')})
              </span>
            </div>
            <span className={`${styles.trustStatusChip} ${statusClass}`}>
              <span className={styles.statusDot} />
              {statusLabel}
            </span>
            <span className={styles.socialProof}>
              {t('product.trustedBy', { count: cheat.reviews })}
            </span>
          </div>

          <div
            className={`${styles.descWrap} ${styles.infoStagger}`}
            style={{ '--stagger': 4 } as React.CSSProperties}
          >
            <p className={styles.productDesc}>{descShown}</p>
            {descNeedsClamp && (
              <button
                type="button"
                className={styles.readMoreBtn}
                onClick={() => setDescExpanded((v) => !v)}
                aria-expanded={descExpanded}
              >
                {descExpanded ? t('product.readLess') : t('product.readMore')}
              </button>
            )}
          </div>

          <h3
            className={`${styles.plansTitle} ${styles.infoStagger}`}
            id="plans-heading"
            style={{ '--stagger': 5 } as React.CSSProperties}
          >
            {t('product.choosePlan')}
          </h3>
          <div
            className={`${styles.plans} ${styles.infoStagger}`}
            style={{ '--stagger': 6 } as React.CSSProperties}
            role="radiogroup"
            aria-labelledby="plans-heading"
          >
            {cheat.plans.map((plan, i) => {
              const displayDuration = getPlanDisplayLabel(plan, language, t);
              const isSelected = selectedPlan === i;
              const showPopular = isPlanPopular(plan, i);
              const savings = savingsVsDaily(cheat.plans, i);
              const perDay = dailyRate(plan);
              const bestValue = isBestValuePlan(cheat.plans, i);
              return (
                <button
                  type="button"
                  key={i}
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.planCard} ${isSelected ? styles.planCardActive : ''}`}
                  onClick={() => setSelectedPlan(i)}
                >
                  {showPopular && <div className={styles.planBadge}>{t('product.popular')}</div>}
                  {bestValue && !showPopular && (
                    <div className={`${styles.planBadge} ${styles.planBadgeValue}`}>
                      {t('product.bestValue')}
                    </div>
                  )}
                  <div className={styles.planDuration}>{displayDuration}</div>
                  <div className={styles.planPrice}>${formatRetailPrice(plan.price)}</div>
                  {savings !== null && savings > 0 && (
                    <span className={styles.planSavings}>
                      {t('product.savePercent', { percent: savings })}
                    </span>
                  )}
                  <span className={styles.planPerDay}>
                    ${perDay.toFixed(2)}
                    {t('product.perDay')}
                  </span>
                  <span className={styles.planCurrency}>USD / {getPlanDisplayLabel(plan, language, t)}</span>
                </button>
              );
            })}
          </div>

          <p
            className={`${styles.deliveryNote} ${styles.infoStagger}`}
            style={{ '--stagger': 7 } as React.CSSProperties}
          >
            {t('product.deliveryNote')}
          </p>

          {selectedPlan === 0 && cheat.plans[1] && weekSavings !== null && weekSavings > 0 && (
            <p
              className={`${styles.upgradeHint} ${styles.infoStagger}`}
              style={{ '--stagger': 7 } as React.CSSProperties}
              role="status"
            >
              <span>
                {t('product.upgradeHint', {
                  price: formatRetailPrice(cheat.plans[1].price),
                  save: weekSavings,
                })}
              </span>
              <button
                type="button"
                className={styles.upgradeBtn}
                onClick={() => setSelectedPlan(1)}
              >
                {t('product.switchToWeek')}
              </button>
            </p>
          )}

          <div
            className={`${styles.buyActions} ${styles.infoStagger}`}
            style={{ '--stagger': 8 } as React.CSSProperties}
          >
            <button
              type="button"
              className={`${styles.buyNow} ${!isCheckoutAvailable ? styles.buyNowUnavailable : ''} ${!checkoutAvailable && isCheckoutAvailable ? styles.buyNowLoading : ''}`}
              onClick={handleCheckout}
              disabled={isCheckoutAvailable && !checkoutAvailable}
              aria-busy={isCheckoutAvailable && !checkoutAvailable}
            >
              <span className={styles.buyNowLabel}>
                {isCheckoutAvailable
                  ? checkoutAvailable
                    ? t('product.buyNow')
                    : t('product.loadingCheckout')
                  : t('product.buyDiscord')}
              </span>
              {isCheckoutAvailable && selectedPlanData && checkoutAvailable && (
                <span className={styles.buyNowPrice}>
                  ${formatRetailPrice(selectedPlanData.price)}
                </span>
              )}
            </button>
          </div>

          <div
            className={`${styles.infoStagger}`}
            style={{ '--stagger': 9 } as React.CSSProperties}
          >
            <TrustStrip />
          </div>

          <Link
            href={`/instructions#${cheat.slug}`}
            className={`${styles.setupGuideLink} ${styles.infoStagger}`}
            style={{ '--stagger': 9 } as React.CSSProperties}
          >
            {t('product.setupGuide')} →
          </Link>
        </div>
      </div>

      <section
        ref={featuresRef}
        className={`${styles.featuresSection} ${featuresVisible ? styles.featuresSectionVisible : ''}`}
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className={styles.featTitle}>
          {t('product.whatYouGet')}
        </h2>
        <ul className={styles.featuresList}>
          {displayFeatures.map((feat: string, i: number) => (
            <li
              key={i}
              className={styles.featureItem}
              style={{ '--feature-delay': `${i * 50}ms` } as React.CSSProperties}
            >
              <span className={styles.featureCheck} aria-hidden>
                <IconCheck size={14} />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </section>

      {videoId && (
        <section className={styles.videoSection} aria-labelledby="product-video-title">
          <h2 id="product-video-title" className={styles.featTitle}>
            {t('product.demoVideo')}
          </h2>
          <div className={styles.videoWrap}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${displayTitle} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      )}

      <ProductReviews game={cheat.game} gameEn={cheat.gameEn} />
      <RelatedProducts cheat={cheat} />
    </div>
  );
}
