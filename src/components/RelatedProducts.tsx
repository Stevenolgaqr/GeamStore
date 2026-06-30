'use client';

import type { Cheat } from '@/data/cheats';
import { useLanguage } from '@/context/LanguageContext';
import { getRelatedCheats } from '@/lib/relatedProducts';
import OCProductCard from '@/components/OCProductCard';
import styles from './RelatedProducts.module.css';

interface Props {
  cheat: Cheat;
}

export default function RelatedProducts({ cheat }: Props) {
  const { t, language } = useLanguage();
  const related = getRelatedCheats(cheat);

  if (related.length === 0) return null;

  const gameLabel =
    language === 'en' && cheat.gameEn ? cheat.gameEn : cheat.game;

  return (
    <section className={styles.section} aria-labelledby="related-products-heading">
      <h2 id="related-products-heading" className={styles.title}>
        {t('product.relatedTitle', { game: gameLabel })}
      </h2>
      <div className={styles.grid}>
        {related.map((c) => (
          <OCProductCard key={c.slug} cheat={c} />
        ))}
      </div>
    </section>
  );
}
