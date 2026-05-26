import Link from 'next/link';
import styles from './success.module.css';

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>✅</span>
        </div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.description}>
          Thank you for your purchase. Your license key is shown on the SellAuth
          checkout receipt page right after payment—copy it before closing that
          window.
        </p>
        <p className={styles.description}>
          If SellAuth has your email on file, a copy of the key may also arrive
          in your inbox. This page is only a confirmation; your key is not stored
          here.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            Return to Home
          </Link>
          <Link href="/store" className={styles.storeBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
