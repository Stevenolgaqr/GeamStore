import React from 'react';
import Link from 'next/link';
import styles from './OCFooter.module.css';

export default function OCFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              NOVA<span>STORE</span>
            </Link>
            <p className={styles.desc}>
              Nova Store is the leading provider for undetected game enhancements. Providing high quality software and unparalleled support since 2020.
            </p>
            <a
              href="https://discord.gg/novastore"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordBadge}
            >
              Join our Discord
            </a>
          </div>

          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/store" className={styles.link}>Store</Link></li>
              <li><Link href="/status" className={styles.link}>Status</Link></li>
              <li><Link href="/reviews" className={styles.link}>Reviews</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Information</h4>
            <ul className={styles.linkList}>
              <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link href="/refunds" className={styles.link}>Refund Policy</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Top Games</h4>
            <ul className={styles.linkList}>
              <li><Link href="/product/ancient-rust" className={styles.link}>Rust</Link></li>
              <li><Link href="/product/ancient-r6" className={styles.link}>Rainbow Six Siege</Link></li>
              <li><Link href="/product/ancient-apex" className={styles.link}>Apex Legends</Link></li>
              <li><Link href="/product/ancient-eft-full" className={styles.link}>Escape from Tarkov</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>&copy; {new Date().getFullYear()} Nova Store. All Rights Reserved.</div>
          <div className={styles.payments}>
            <div className={styles.paymentIcon}>VISA</div>
            <div className={styles.paymentIcon}>MC</div>
            <div className={styles.paymentIcon}>CRYPTO</div>
            <div className={styles.paymentIcon}>PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
