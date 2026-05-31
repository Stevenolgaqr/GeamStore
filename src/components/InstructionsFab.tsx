'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './InstructionsFab.module.css';

export default function InstructionsFab() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === '/instructions') return null;

  return (
    <Link
      href="/instructions"
      className={styles.fab}
      aria-label={t('instructions.title')}
      title={t('instructions.title')}
    >
      <span className={styles.icon} aria-hidden="true">
        ?
      </span>
      <span className={styles.ring} aria-hidden="true" />
    </Link>
  );
}
