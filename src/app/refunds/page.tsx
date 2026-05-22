import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../terms/legal.module.css';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Nova Store refund and return policy for all digital products.',
};

export default function RefundsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Legal</span>
          <h1 className={styles.title}>Refund <span className={styles.accent}>Policy</span></h1>
          <p className={styles.updated}>Last updated: May 2026</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Our Refund Policy</h2>
            <p>Due to the digital nature of our products, all sales are generally <strong>final and non-refundable</strong>. However, we evaluate refund requests on a case-by-case basis under the conditions listed below.</p>
          </section>

          <section className={styles.section}>
            <h2>Eligible for Refund</h2>
            <ul className={styles.list}>
              <li>Product is completely non-functional and our support team cannot resolve the issue within 48 hours.</li>
              <li>You were charged multiple times for the same purchase (duplicate charges).</li>
              <li>The product was purchased within the last 24 hours and has not been activated or used.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Not Eligible for Refund</h2>
            <ul className={styles.list}>
              <li>Product became detected by an anti-cheat update (beyond our control).</li>
              <li>Your account was banned for using our software.</li>
              <li>You changed your mind after activating the license.</li>
              <li>Incompatibility with your hardware or operating system after purchase.</li>
              <li>Game updates causing temporary downtime.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>How to Request a Refund</h2>
            <p>To request a refund, contact our support team via <Link href="/contact" className={styles.link}>the Contact page</Link> or our <Link href="/discord" className={styles.link}>Discord server</Link> within 24 hours of purchase. Include your order ID and a detailed description of the issue.</p>
          </section>

          <section className={styles.section}>
            <h2>Processing Time</h2>
            <p>Approved refunds are processed within 3–7 business days. The refund will be issued to the original payment method used during purchase.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
