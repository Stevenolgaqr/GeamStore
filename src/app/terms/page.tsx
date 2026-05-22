import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the Nova Store Terms of Service before purchasing any product.',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Legal</span>
          <h1 className={styles.title}>Terms of <span className={styles.accent}>Service</span></h1>
          <p className={styles.updated}>Last updated: May 2026</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using Nova Store, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          </section>

          <section className={styles.section}>
            <h2>2. Use of Products</h2>
            <p>All software purchased from Nova Store is provided for educational and research purposes only. You accept full responsibility for how you use our products. Nova Store is not liable for any account bans, hardware bans, or consequences resulting from the use of our software.</p>
          </section>

          <section className={styles.section}>
            <h2>3. Payments & Licenses</h2>
            <p>All purchases are final and non-refundable unless explicitly stated in our Refund Policy. A license is granted to the individual purchaser only and may not be shared, resold, or transferred.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Prohibited Activities</h2>
            <p>You may not: reverse engineer, decompile, or disassemble our software; share your license with third parties; use our products for commercial reselling without written permission; or attempt to circumvent our security measures.</p>
          </section>

          <section className={styles.section}>
            <h2>5. Service Availability</h2>
            <p>Nova Store strives to maintain high uptime for all products. However, game updates may cause temporary unavailability. We do not provide refunds for downtime caused by game developers or anti-cheat updates.</p>
          </section>

          <section className={styles.section}>
            <h2>6. Intellectual Property</h2>
            <p>All software, design, and content on Nova Store is the intellectual property of Nova Store. Unauthorized reproduction or distribution is strictly prohibited.</p>
          </section>

          <section className={styles.section}>
            <h2>7. Limitation of Liability</h2>
            <p>Nova Store shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or products.</p>
          </section>

          <section className={styles.section}>
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of Nova Store after changes constitutes acceptance of the new terms.</p>
          </section>

          <section className={styles.section}>
            <h2>9. Contact</h2>
            <p>For questions regarding these terms, contact us via our <Link href="/contact" className={styles.link}>Support page</Link> or join our <Link href="/discord" className={styles.link}>Discord server</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
