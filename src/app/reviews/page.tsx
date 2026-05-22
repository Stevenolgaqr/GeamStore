'use client';

import React from 'react';
import Link from 'next/link';
import { reviewsData, cheats } from '@/data/cheats';
import styles from './page.module.css';

const supportedGames = [
  { icon: '🦀', name: 'Rust', status: 'UNDETECTED' },
  { icon: '🎯', name: 'Rainbow Six Siege', status: 'UNDETECTED' },
  { icon: '⚡', name: 'Apex Legends', status: 'UNDETECTED' },
  { icon: '💀', name: 'Call of Duty', status: 'UPDATING', isUpdating: true },
  { icon: '🐻', name: 'Escape from Tarkov', status: 'UNDETECTED' },
  { icon: '🔫', name: 'Counter Strike 2', status: 'UNDETECTED' },
  { icon: '🚗', name: 'FiveM', status: 'UNDETECTED' },
  { icon: '🤖', name: 'ARC Raiders', status: 'UNDETECTED' },
];

export default function ReviewsPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.label}>المراجعات والدعم</p>
        <h1 className={styles.title}>ماذا يقول عملاؤنا</h1>
        <p className={styles.desc}>
          انضم إلى الآلاف من اللاعبين المحترفين الذين يثقون في حلولنا المتطورة.
          شاهد ما يقوله مجتمعنا حول تجاربهم.
        </p>
      </div>

      <div className={styles.container}>
        {/* Reviews Grid */}
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

        {/* Supported Games */}
        <div className={styles.gamesSection}>
          <p className={styles.label}>الألعاب المدعومة</p>
          <h2 className={styles.sectionTitle}>جميع الألعاب التي ندعمها</h2>
          <p className={styles.sectionDesc}>
            نحدث منتجاتنا باستمرار لضمان عملها بسلاسة مع كل تحديث للعبة.
          </p>

          <div className={styles.gamesGrid}>
            {supportedGames.map((game, i) => (
              <Link href="/store" key={i} className={styles.gameCard}>
                <div className={styles.gameIcon}>{game.icon}</div>
                <div className={styles.gameName}>{game.name}</div>
                <div
                  className={`${styles.gameStatus} ${game.isUpdating ? styles.gameStatusUpdating : ''}`}
                >
                  ● {game.status}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className={styles.supportSection}>
          <p className={styles.label}>الدعم الفني</p>
          <h2 className={styles.sectionTitle}>نحن هنا لمساعدتك</h2>
          <p className={styles.sectionDesc}>
            فريقنا المتخصص جاهز لمساعدتك على مدار الساعة.
          </p>

          <div className={styles.supportGrid}>
            <a
              href="https://discord.gg/onlycheats"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={styles.supportIcon}>💎</div>
              <h3 className={styles.supportTitle}>ديسكورد</h3>
              <p className={styles.supportDesc}>
                انضم لمجتمعنا على ديسكورد للحصول على دعم فوري وتحديثات مباشرة.
              </p>
            </a>

            <a
              href="https://t.me/onlycheats"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={styles.supportIcon}>✈️</div>
              <h3 className={styles.supportTitle}>تيليغرام</h3>
              <p className={styles.supportDesc}>
                تابع آخر الأخبار والعروض الحصرية على قناة تيليغرام.
              </p>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={styles.supportIcon}>📺</div>
              <h3 className={styles.supportTitle}>يوتيوب</h3>
              <p className={styles.supportDesc}>
                شاهد فيديوهات الشرح والمعاينات الحية على قناة يوتيوب الخاصة بنا.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
