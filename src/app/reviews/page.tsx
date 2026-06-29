'use client';

import React from 'react';
import Link from 'next/link';
import { reviewsData } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const supportedGames = [
  { icon: '🦀', name: 'Rust', statusKey: 'status.undetected', category: 'rust' },
  { icon: '🎯', name: 'Rainbow Six Siege', statusKey: 'status.undetected', category: 'r6' },
  { icon: '⚡', name: 'Apex Legends', statusKey: 'status.undetected', category: 'apex' },
  { icon: '💀', name: 'Call of Duty', statusKey: 'status.updating', category: 'cod', isUpdating: true },
  { icon: '🐻', name: 'Escape from Tarkov', statusKey: 'status.undetected', category: 'tarkov' },
  { icon: '🔫', name: 'Counter Strike 2', statusKey: 'status.undetected', category: 'cs2' },
  { icon: '🚗', name: 'FiveM', statusKey: 'status.undetected', category: 'fivem' },
  { icon: '🤖', name: 'ARC Raiders', statusKey: 'status.undetected', category: 'arc' },
];

export default function ReviewsPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.label}>{t('reviews.label')}</p>
        <h1 className={styles.title}>{t('reviews.title')}</h1>
        <p className={styles.desc}>{t('reviews.desc')}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.reviewsGrid}>
          {reviewsData.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>{review.avatar}</div>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>{review.name}</span>
                  <span className={styles.reviewerGame}>{review.game}</span>
                </div>
              </div>
              <div className={styles.reviewStars}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <p className={styles.reviewDate}>{review.date}</p>
            </div>
          ))}
        </div>

        <div className={styles.gamesSection}>
          <p className={styles.label}>{t('reviews.gamesLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('reviews.gamesTitle')}</h2>
          <p className={styles.sectionDesc}>{t('reviews.gamesDesc')}</p>

          <div className={styles.gamesGrid}>
            {supportedGames.map((game) => (
              <Link href={`/store?category=${game.category}`} key={game.category} className={styles.gameCard}>
                <div className={styles.gameIcon}>{game.icon}</div>
                <div className={styles.gameName}>{game.name}</div>
                <div
                  className={`${styles.gameStatus} ${game.isUpdating ? styles.gameStatusUpdating : ''}`}
                >
                  ● {t(game.statusKey).toUpperCase()}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.supportSection}>
          <p className={styles.label}>{t('reviews.supportLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('reviews.supportTitle')}</h2>
          <p className={styles.sectionDesc}>{t('reviews.supportDesc')}</p>

          <div className={styles.supportGrid}>
            <a
              href="https://discord.gg/novastore"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={styles.supportIcon}>💎</div>
              <h3 className={styles.supportTitle}>{t('reviews.discordTitle')}</h3>
              <p className={styles.supportDesc}>{t('reviews.discordDesc')}</p>
            </a>

            <Link href="/contact" className={styles.supportCard}>
              <div className={styles.supportIcon}>✉️</div>
              <h3 className={styles.supportTitle}>{t('reviews.emailTitle')}</h3>
              <p className={styles.supportDesc}>{t('reviews.emailDesc')}</p>
            </Link>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={styles.supportIcon}>📺</div>
              <h3 className={styles.supportTitle}>{t('reviews.youtubeTitle')}</h3>
              <p className={styles.supportDesc}>{t('reviews.youtubeDesc')}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
