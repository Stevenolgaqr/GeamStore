'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cheats, gameImages } from '@/data/cheats';
import { use } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatRetailPrice } from '@/lib/pricing';
import { getPlanDisplayLabel, isPlanPopular } from '@/lib/productPlans';
import ProductImageGallery from '@/components/ProductImageGallery';
import { IconAlert, IconCheck, IconStarRating } from '@/components/icons/ProductIcons';
import styles from './page.module.css';

const DESC_CLAMP_CHARS = 220;

function buildProductImages(cheat: (typeof cheats)[number]): string[] {
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

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cheat = cheats.find((c) => c.slug === slug);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

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
        const embed = typeof window !== 'undefined' ? (window as unknown as { sellAuthEmbed?: { checkout: (el: HTMLElement, opts: object) => void } }).sellAuthEmbed : undefined;
        if (embed) {
          embed.checkout(e.currentTarget, {
            cart: [{
              productId: parseInt(plan.sellauthProductId!),
              variantId: plan.sellauthVariantId ? parseInt(plan.sellauthVariantId) : undefined,
              quantity: 1,
            }],
            shopId: 185564,
            modal: true,
          });
        } else {
          window.open(`https://nova-store.sellauth.com/product/${plan.sellauthProductId}`, '_blank');
        }
      } else {
        e.preventDefault();
        window.open('https://discord.gg/novastore', '_blank');
      }
    },
    [cheat, selectedPlan]
  );

  if (!cheat) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <IconAlert size={32} />
          <p>{t('product.notFound')}</p>
          <Link href="/store" className={styles.notFoundLink}>
            {t('product.backToStore')}
          </Link>
        </div>
      </div>
    );
  }

  const statusClass = getStatusClass(cheat.status);

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'SoftwareApplication',
    name: cheat.title,
    description: cheat.description,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(...cheat.plans.map((p) => p.price)),
      highPrice: Math.max(...cheat.plans.map((p) => p.price)),
      offerCount: cheat.plans.length,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: cheat.rating,
      reviewCount: cheat.reviews,
    },
  };

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

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                  <div className={styles.planDuration}>{displayDuration}</div>
                  <div className={styles.planPrice}>${formatRetailPrice(plan.price)}</div>
                  <span className={styles.planCurrency}>USD / {plan.duration}</span>
                </button>
              );
            })}
          </div>

          <div
            className={`${styles.buyActions} ${styles.infoStagger}`}
            style={{ '--stagger': 7 } as React.CSSProperties}
          >
            <button
              type="button"
              className={`${styles.buyNow} ${!isCheckoutAvailable ? styles.buyNowUnavailable : ''}`}
              onClick={handleCheckout}
            >
              <span className={styles.buyNowLabel}>
                {isCheckoutAvailable ? t('product.buyNow') : t('product.buyDiscord')}
              </span>
              {isCheckoutAvailable && selectedPlanData && (
                <span className={styles.buyNowPrice}>
                  ${formatRetailPrice(selectedPlanData.price)}
                </span>
              )}
            </button>
          </div>

          <Link
            href={`/instructions#${cheat.slug}`}
            className={`${styles.setupGuideLink} ${styles.infoStagger}`}
            style={{ '--stagger': 8 } as React.CSSProperties}
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
    </div>
  );
}
