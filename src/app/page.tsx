'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
  const { t, language } = useLanguage();

  const popularProducts = [
    {
      title: 'Nova Store Rust External',
      desc: language === 'en' ? 'Newest & Cheapest undetected Rust cheat on the market Nova Store External!' : 'أحدث وأرخص هاك راست خارجي آمن في السوق من نوفا ستور!',
      thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      slug: 'ancient-rust',
    },
    {
      title: 'Ancient R6',
      desc: language === 'en' ? 'Best undetected $4 Rainbow Six Siege cheat! With ESP, Aimbot + Radar!' : 'أفضل هاك رينبو 6 سيج آمن بسعر 4 دولار فقط! رادار وايمبوت والمزيد!',
      thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      slug: 'ancient-r6',
    },
    {
      title: 'RageByte ARC Raiders',
      desc: language === 'en' ? 'Best ARC Raiders S3 Cheat! Undetected Aimbot & ESP!' : 'أفضل هاك للعبة أرك رايدرز! ايمبوت ورادار آمن تماماً!',
      thumb: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      slug: 'ancient-arc-raiders',
    },
  ];

  const allGames = [
    { nameEn: 'ARENA BREAKOUT INFINITE', nameAr: 'ارينا بريك اوت إنفينيت', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180722.jpeg', slug: 'ancient-abi-radar' },
    { nameEn: 'CALL OF DUTY', nameAr: 'كول أوف ديوتي', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180723.jpeg', slug: 'ancient-cod' },
    { nameEn: 'APEX LEGENDS', nameAr: 'ابيكس ليجندز', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180723 (1).jpeg', slug: 'ancient-apex' },
    { nameEn: 'FORTNITE', nameAr: 'فورتنايت', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180735.jpeg', slug: 'ancient-fortnite' },
    { nameEn: 'HWID SPOOFER', nameAr: 'سبوفر تخطي الباند', image: '/cheats/اريد_نفس_هذه_الصوره_._202605172217.jpeg', slug: 'gouda-spoofer' },
    { nameEn: 'BATTLEFIELD NOVA', nameAr: 'باتلفيلد نوفا', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180729.jpeg', slug: 'ancient-bf6' },
    { nameEn: 'ARC RAIDERS', nameAr: 'أرك رايدرز', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180730.jpeg', slug: 'ancient-arc-raiders' },
    { nameEn: 'RUST NOVA', nameAr: 'راست نوفا', image: '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180731.jpeg', slug: 'ancient-rust' },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              {t('home.heroTitle1')}<br />
              {t('home.heroTitle2')} <span>{t('home.heroTitle3')}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {t('home.heroSubtitle')}
            </p>
            <div className={styles.heroActions}>
              <Link href="/store" className={styles.primaryBtn}>{t('home.viewAll')}</Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroO}>O</div>
            <img 
              src="/images/red-hero.jpeg" 
              alt="Character" 
              className={styles.heroCharacter} 
            />
          </div>
        </div>
      </section>

      {/* Most Popular Products */}
      <section className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('home.popular')}</h2>
          <p className={styles.sectionSubtitle}>{t('home.popularDesc')}</p>
        </div>
        <div className={styles.popularGrid}>
          {popularProducts.map((prod, i) => (
            <div key={i} className={styles.popularCard}>
              <div 
                className={styles.videoThumb} 
                style={{ backgroundImage: `url(${prod.thumb})` }}
              >
                <div className={styles.playBtn}></div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                  <h3>{prod.title}</h3>
                  <p>{prod.desc}</p>
                </div>
                <Link href={`/product/${prod.slug}`}>
                  <button className={styles.viewBtn}>{t('home.viewProd')}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Games Grid */}
      <section className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('store.all')}</h2>
        </div>
        <div className={styles.gamesGrid}>
          {allGames.map((game, i) => (
            <Link href={`/product/${game.slug}`} key={i} className={styles.gameCard} aria-label={`Buy ${game.nameEn} cheat – Nova Store`}>
              <img src={game.image} alt={`${game.nameEn} cheat – Nova Store`} className={styles.gameImage} loading="lazy" />
              <div className={styles.gameStar}>★</div>
              <div className={styles.gameNameOverlay}>{language === 'en' ? game.nameEn : game.nameAr}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
