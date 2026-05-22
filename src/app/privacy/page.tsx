import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../terms/legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Nova Store collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Legal</span>
          <h1 className={styles.title}>Privacy <span className={styles.accent}>Policy</span></h1>
          <p className={styles.updated}>Last updated: May 2026</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as your email address during account creation. We also collect anonymized usage data to improve our services. We do <strong>not</strong> collect or store payment card information — all payments are processed through secure third-party providers.</p>
          </section>

          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to: provide and improve our services, send license keys and purchase confirmations, send important security and status updates, and respond to support requests.</p>
          </section>

          <section className={styles.section}>
            <h2>3. Information Sharing</h2>
            <p>Nova Store does not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for analytical purposes only.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className={styles.section}>
            <h2>5. Cookies</h2>
            <p>We use essential cookies for session management and to remember your preferences. We do not use tracking or advertising cookies.</p>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete any personal information we hold about you. Contact us via our <Link href="/contact" className={styles.link}>Support page</Link> to exercise these rights.</p>
          </section>

          <section className={styles.section}>
            <h2>7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
