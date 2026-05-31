import type { Metadata } from 'next';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Get help from the Nova Store support team via Discord or direct message.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Support</span>
          <h1 className={styles.title}>
            Get in <span className={styles.accent}>Touch</span>
          </h1>
          <p className={styles.subtitle}>
            Our support team is active 24/7. Choose the fastest way to reach us.
          </p>
        </div>

        {/* Contact Cards */}
        <div className={styles.grid}>
          {/* Discord */}
          <a
            href="https://discord.gg/novastore"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} ${styles.discordCard}`}
          >
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.033.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Join Discord</h3>
            <p className={styles.cardDesc}>
              Fastest support. Join our server and open a ticket — average response time under 10 minutes.
            </p>
            <span className={styles.cardCta}>Open Discord →</span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@nova-store.gg"
            className={`${styles.card} ${styles.emailCard}`}
          >
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Email Support</h3>
            <p className={styles.cardDesc}>
              For billing and account issues. We respond within 24 hours on business days.
            </p>
            <span className={styles.cardCta}>support@nova-store.gg →</span>
          </a>

          {/* Status */}
          <a href="/status" className={`${styles.card} ${styles.statusCard}`}>
            <div className={styles.cardIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Check Status</h3>
            <p className={styles.cardDesc}>
              Before opening a ticket, check if your product is currently affected by a detection or update.
            </p>
            <span className={styles.cardCta}>View Status Page →</span>
          </a>
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: 'How quickly will I receive my license?',
    a: 'Licenses are delivered instantly to your email after payment is confirmed.',
  },
  {
    q: 'What happens if my cheat gets detected?',
    a: 'Our team updates products within hours of detection. Check the Status page for real-time updates.',
  },
  {
    q: 'Can I use the cheat on multiple PCs?',
    a: 'Each license is tied to one hardware ID (HWID). Contact support if you need to change your device.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Refunds are evaluated case-by-case. See our Refund Policy for full details.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. We use trusted third-party payment processors. Nova Store never stores your card details.',
  },
  {
    q: 'How do I get started after purchasing?',
    a: 'Visit our Setup Instructions page for step-by-step guides for every product, or open Discord if you need help.',
  },
];
