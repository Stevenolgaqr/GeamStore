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
          Thank you for your purchase. Your payment has been processed successfully.
          You should receive an email with your key shortly.
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
