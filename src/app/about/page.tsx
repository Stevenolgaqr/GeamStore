import Link from 'next/link';
import type { Metadata } from 'next';
import { SOCIAL_LINKS, SITE_URL } from '@/lib/site';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Nova Store — trusted undetected game enhancements since 2020. Our story, values, and commitment to security-first software.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const stats = [
  { value: '2020', label: 'Founded' },
  { value: '10K+', label: 'Customers' },
  { value: '47+', label: 'Products' },
  { value: '24/7', label: 'Support' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Our Story</p>
        <h1 className={styles.title}>Built for players who refuse to lose</h1>
        <p className={styles.lead}>
          Nova Store started in 2020 with one promise: ship undetected enhancements backed by real
          support — not empty marketing. Today we serve thousands of competitive players across
          Rust, Valorant, Apex, Tarkov, and more.
        </p>
      </header>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <h2>What we stand for</h2>
        <ul className={styles.values}>
          <li>
            <strong>Security first</strong> — Live status tracking and rapid updates after patches.
          </li>
          <li>
            <strong>Instant delivery</strong> — Keys on your SellAuth receipt the moment payment clears.
          </li>
          <li>
            <strong>Real humans</strong> — Discord support with sub-10-minute average response times.
          </li>
          <li>
            <strong>Transparency</strong> — Clear refund policy, setup guides, and honest product status.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Join the community</h2>
        <p className={styles.text}>
          Thousands of players share configs, status alerts, and setup tips in our Discord. Whether
          you are new or renewing, you are not buying software alone — you are joining a team.
        </p>
        <div className={styles.social}>
          <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
          <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </div>
      </section>

      <div className={styles.cta}>
        <Link href="/store" className={styles.ctaBtn}>
          Browse the store
        </Link>
        <Link href="/contact" className={styles.ctaLink}>
          Contact support
        </Link>
      </div>
    </div>
  );
}
