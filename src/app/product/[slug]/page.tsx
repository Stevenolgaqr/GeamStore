'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cheats, gameImages } from '@/data/cheats';
import { use } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatRetailPrice } from '@/lib/pricing';
import ProductImageGallery from '@/components/ProductImageGallery';
import styles from './page.module.css';

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

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cheat = cheats.find((c) => c.slug === slug);
  const [selectedPlan, setSelectedPlan] = useState(1); // default to weekly
  const { language, t } = useLanguage();

  if (!cheat) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <p>❌ المنتج غير موجود</p>
          <Link href="/store" className={styles.notFoundLink}>
            ← العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  const statusClass =
    cheat.status === 'undetected' ? styles.statusUndetected : styles.statusUpdating;

  // SEO: JSON-LD Schema for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": cheat.title,
    "description": cheat.description,
    "applicationCategory": "GameApplication",
    "operatingSystem": "Windows 10, Windows 11",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": Math.min(...cheat.plans.map(p => p.price)),
      "highPrice": Math.max(...cheat.plans.map(p => p.price)),
      "offerCount": cheat.plans.length
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": cheat.rating,
      "reviewCount": cheat.reviews
    }
  };

  const displayTitle = language === 'en' && cheat.titleEn ? cheat.titleEn : cheat.title;
  const displayGame = language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game;
  const displayDesc = language === 'en' && (cheat as any).descriptionEn ? (cheat as any).descriptionEn : cheat.description;
  const displayFeatures = language === 'en' && (cheat as any).featuresEn ? (cheat as any).featuresEn : cheat.features;
  const statusLabel = t(`status.${cheat.status}`) || cheat.statusLabel;
  const productImages = buildProductImages(cheat);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ═══ Product Hero ═══ */}
      <div className={styles.productHero}>
        {/* Image */}
        <div className={styles.imageCol}>
          <ProductImageGallery
            images={productImages}
            alt={displayTitle}
            placeholderIcon={cheat.gameIcon}
            imagesLabel={t('product.productImages')}
          />
          <div className={`${styles.statusFloating} ${statusClass}`}>
            <span className={styles.statusDot} />
            {statusLabel}
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          <div className={styles.breadcrumb}>
            <Link href="/">{t('product.home')}</Link>
            <span>/</span>
            <Link href="/store">{t('nav.store')}</Link>
            <span>/</span>
            <span>{displayGame}</span>
          </div>

          <span className={styles.gameLabel}>
            {cheat.gameIcon} {displayGame}
          </span>

          <h1 className={styles.productTitle}>{displayTitle}</h1>
          <p className={styles.productDesc}>{displayDesc}</p>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <span className={styles.stars}>{'★'.repeat(Math.round(cheat.rating))}</span>
            <span className={styles.ratingNum}>{cheat.rating}</span>
            <span className={styles.reviewCount}>({cheat.reviews} {t('card.reviews')})</span>
          </div>

          {/* Plans */}
          <h3 className={styles.plansTitle}>{t('product.choosePlan')}</h3>
          <div className={styles.plans}>
            {cheat.plans.map((plan, i) => {
              // translate duration dynamically
              let displayDuration = plan.label;
              if (language === 'en') {
                if (plan.label === 'يوم واحد') displayDuration = '1 Day';
                if (plan.label === 'أسبوع') displayDuration = '1 Week';
                if (plan.label === 'شهر') displayDuration = '1 Month';
                if (plan.label === 'مدى الحياة') displayDuration = 'Lifetime';
              }
              return (
                <div
                  key={i}
                  className={`${styles.planCard} ${selectedPlan === i ? styles.planCardActive : ''}`}
                  onClick={() => setSelectedPlan(i)}
                >
                  {i === 1 && <div className={styles.planBadge}>{t('product.popular')}</div>}
                  <div className={styles.planDuration}>{displayDuration}</div>
                  <div className={styles.planPrice}>${formatRetailPrice(plan.price)}</div>
                  <span className={styles.planCurrency}>USD / {plan.duration}</span>
                </div>
              );
            })}
          </div>

          {/* Buy Actions */}
          <div className={styles.buyActions}>
            {(() => {
              const plan = cheat.plans[selectedPlan];
              const isAvailable = !!plan?.sellauthProductId;
              return (
                <button 
                  className={`${styles.buyNow} ${!isAvailable ? styles.buyNowUnavailable : ''}`}
                  onClick={(e) => {
                    if (isAvailable) {
                      e.preventDefault();
                      if (typeof window !== 'undefined' && (window as any).sellAuthEmbed) {
                        (window as any).sellAuthEmbed.checkout(e.currentTarget, {
                          cart: [{ 
                            productId: parseInt(plan.sellauthProductId!), 
                            variantId: plan.sellauthVariantId ? parseInt(plan.sellauthVariantId) : undefined,
                            quantity: 1 
                          }],
                          shopId: 185564,
                          modal: true
                        });
                      } else {
                        window.open(`https://nova-store.sellauth.com/product/${plan.sellauthProductId}`, '_blank');
                      }
                    } else {
                      e.preventDefault();
                      window.open('https://discord.gg/novastore', '_blank');
                    }
                  }}
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
                >
                  {isAvailable ? (
                    <>🔒 {t('product.securePay')} — ${formatRetailPrice(plan.price)}</>
                  ) : (
                    <>💬 {t('product.buyDiscord')}</>
                  )}
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ═══ Features ═══ */}
      <div className={styles.featuresSection}>
        <p className={styles.sectionLabel}>{t('product.features')}</p>
        <h2 className={styles.featTitle}>{t('product.whatYouGet')}</h2>
        <div className={styles.featuresList}>
          {displayFeatures.map((feat: string, i: number) => (
            <div key={i} className={styles.featureItem}>
              <div className={styles.featureCheck}>✓</div>
              {feat}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
