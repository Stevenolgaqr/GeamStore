'use client';

import Link from 'next/link';
import { statusData, CheatStatus } from '@/data/status';
import { cheats } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const statusConfig: Record<CheatStatus, { label: string; className: string }> = {
  undetected: { label: 'status.undetected', className: 'undetected' },
  updating: { label: 'status.updating', className: 'updating' },
  detected: { label: 'status.detected', className: 'detected' },
  risk: { label: 'status.risk', className: 'risk' },
};

export default function StatusPage() {
  const { t, language } = useLanguage();
  const totalProducts = statusData.reduce((acc, cat) => acc + cat.products.length, 0);
  const undetectedCount = statusData.reduce(
    (acc, cat) => acc + cat.products.filter((p) => p.status === 'undetected').length,
    0
  );
  const updatingCount = statusData.reduce(
    (acc, cat) => acc + cat.products.filter((p) => p.status === 'updating').length,
    0
  );
  const detectedCount = statusData.reduce(
    (acc, cat) =>
      acc + cat.products.filter((p) => p.status === 'detected' || p.status === 'risk').length,
    0
  );

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>{t('status.live')}</span>
          <h1 className={styles.heroTitle}>
            {t('status.title1')} <span className={styles.highlight}>{t('status.title2')}</span> {t('status.title3')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t('status.subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.dotGreen}`}></div>
            <div>
              <span className={styles.statNum}>{undetectedCount}</span>
              <span className={styles.statLabel}>{t('status.undetected')}</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.dotYellow}`}></div>
            <div>
              <span className={styles.statNum}>{updatingCount}</span>
              <span className={styles.statLabel}>{t('status.updating')}</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.dotRed}`}></div>
            <div>
              <span className={styles.statNum}>{detectedCount}</span>
              <span className={styles.statLabel}>{t('status.detectedRisk')}</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.dotWhite}`}></div>
            <div>
              <span className={styles.statNum}>{totalProducts}</span>
              <span className={styles.statLabel}>{t('status.total')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className={styles.legendSection}>
        <div className={styles.legendInner}>
          <span className={styles.legendTitle}>{t('status.legend')}:</span>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <span className={`${styles.badge} ${styles.undetected}`}>● {t('status.undetected')}</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.badge} ${styles.updating}`}>● {t('status.updating')}</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.badge} ${styles.detected}`}>● {t('status.detected')}</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.badge} ${styles.risk}`}>● {t('status.risk')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Status Categories */}
      <section className={styles.categoriesSection}>
        <div className={styles.categoriesInner}>
          {statusData.map((category, ci) => (
            <div key={ci} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h2 className={styles.categoryTitle}>
                  {language === 'en' ? category.game : (category as any).gameAr || category.game}
                </h2>
                <span className={styles.categoryCount}>{category.products.length} {t('store.products')}</span>
              </div>
              <div className={styles.productList}>
                {category.products.map((product, pi) => {
                  const config = statusConfig[product.status];
                  const hasProduct = cheats.some((c) => c.slug === product.slug);
                  const purchaseUrl = hasProduct ? `/product/${product.slug}` : 'https://discord.gg/novastore';
                  
                  return (
                    <div key={pi} className={`${styles.productRow} ${styles[config.className + 'Row']}`}>
                      <div className={styles.productInfo}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        {product.since && (
                          <p className={styles.productMeta}>{t('status.since')}: {product.since}</p>
                        )}
                        {product.note && (
                          <p className={styles.productNote}>{product.note}</p>
                        )}
                      </div>
                      <div className={styles.productActions}>
                        <span className={`${styles.badge} ${styles[config.className]}`}>
                          <span className={styles.badgeDot}></span>
                          {t(config.label)}
                        </span>
                        {hasProduct ? (
                          <Link href={purchaseUrl} className={styles.buyBtn}>
                            {t('product.buy')}
                          </Link>
                        ) : (
                          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" className={styles.buyBtn} style={{ background: '#7289da' }}>
                            {t('status.buyDiscord')}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
