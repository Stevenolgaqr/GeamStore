'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<Language, string>> = {
  'nav.store': { en: 'Store', ar: 'المتجر' },
  'nav.status': { en: 'Status', ar: 'الحالة' },
  'nav.reviews': { en: 'Reviews', ar: 'المراجعات' },
  'nav.support': { en: 'Support', ar: 'الدعم' },
  'nav.discord': { en: 'Discord', ar: 'ديسكورد' },
  'header.login': { en: 'Sign In ▾', ar: 'تسجيل الدخول ▾' },
  'header.existing': { en: 'Existing user?', ar: 'عضو مسجل؟' },
  'header.signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'store.title': { en: 'Supported Games', ar: 'جميع الألعاب المدعومة' },
  'store.desc': { 
    en: 'Choose your favorite game and get the advantage you deserve. All tools are updated.', 
    ar: 'اختر لعبتك المفضلة واحصل على التفوق الذي تستحقه. جميع أدواتنا محدثة ومفحوصة.' 
  },
  'store.search': { en: 'Search for a game...', ar: 'ابحث عن لعبة أو برنامج...' },
  'store.all': { en: 'All Games', ar: 'جميع الألعاب' },
  'store.back': { en: '← Back to All Games', ar: '← العودة لجميع الألعاب' },
  'store.empty': { en: 'No products found.', ar: 'لا توجد منتجات مطابقة لبحثك.' },
  'store.results': { en: 'Search results for', ar: 'نتائج البحث عن' },
  'store.products': { en: 'products', ar: 'منتجات' },
  'store.statsGames': { en: 'games', ar: 'لعبة' },
  'store.statsProducts': { en: 'programs', ar: 'برنامج' },
  'store.statsUndetected': { en: 'undetected now', ar: 'آمن حالياً' },
  'store.clearSearch': { en: 'Clear search', ar: 'مسح البحث' },
  'store.allProducts': { en: 'All programs', ar: 'جميع البرامج' },
  'store.browseByGame': { en: 'Browse by game', ar: 'تصفح حسب اللعبة' },
  'product.buy': { en: 'Purchase Now', ar: 'شراء الآن' },
  'product.options': { en: 'Available Options', ar: 'خيارات متوفرة' },
  'product.view': { en: 'View Programs ←', ar: 'تصفح البرامج ←' },
  'card.reviews': { en: 'reviews', ar: 'مراجعة' },
  'card.startsFrom': { en: 'Starts from', ar: 'يبدأ من' },
  'card.quickBuy': { en: 'Quick Buy', ar: 'شراء سريع' },
  'card.details': { en: 'Details', ar: 'التفاصيل' },
  'status.undetected': { en: 'Undetected', ar: 'آمن' },
  'status.updating': { en: 'Updating', ar: 'قيد التحديث' },
  'status.detected': { en: 'Detected', ar: 'مكشوف' },
  'product.home': { en: 'Home', ar: 'الرئيسية' },
  'product.choosePlan': { en: 'Choose your plan', ar: 'اختر خطتك' },
  'product.popular': { en: 'Most Popular', ar: 'الأكثر شعبية' },
  'product.securePay': { en: 'Secure Pay (Sellauth)', ar: 'دفع آمن (Sellauth)' },
  'product.buyDiscord': { en: 'Not available automatically — Buy via Discord', ar: 'غير متوفر تلقائياً — الشراء عبر الديسكورد' },
  'product.features': { en: 'Features', ar: 'المميزات' },
  'product.whatYouGet': { en: 'What you will get', ar: 'ما الذي ستحصل عليه' },
  'product.gallery': { en: 'Gallery', ar: 'المعرض' },
  'product.productImages': { en: 'Product Images', ar: 'صور المنتج' },
  'product.illustrativeMedia': { en: 'Illustrative Media', ar: 'صور توضيحية' },
  'product.readMore': { en: 'Read more', ar: 'اقرأ المزيد' },
  'product.readLess': { en: 'Show less', ar: 'عرض أقل' },
  'product.notFound': { en: 'Product not found', ar: 'المنتج غير موجود' },
  'product.backToStore': { en: 'Back to store', ar: 'العودة للمتجر' },
  'product.buyNow': { en: 'Buy now', ar: 'اشترِ الآن' },
  'plan.1day': { en: '1 Day', ar: 'يوم واحد' },
  'plan.1week': { en: '1 Week', ar: 'أسبوع' },
  'plan.1month': { en: '1 Month', ar: 'شهر' },
  'plan.lifetime': { en: 'Lifetime', ar: 'مدى الحياة' },
  'status.live': { en: 'Live Status', ar: 'الحالة المباشرة' },
  'status.title1': { en: 'Cheat', ar: 'متتبع حالة' },
  'status.title2': { en: 'Status', ar: 'البرامج' },
  'status.title3': { en: 'Tracker', ar: '' },
  'status.subtitle': { 
    en: 'Real-time detection status for all Nova Store products. Updated constantly by our security team.', 
    ar: 'الحالة المباشرة لجميع منتجات نوفا ستور. يتم التحديث باستمرار من قبل فريق الأمان لدينا.' 
  },
  'status.detectedRisk': { en: 'Detected / Risk', ar: 'مكشوف / خطر' },
  'status.total': { en: 'Total Products', ar: 'إجمالي المنتجات' },
  'status.legend': { en: 'Legend', ar: 'المفتاح' },
  'status.risk': { en: 'Use at Own Risk', ar: 'استخدمه على مسؤوليتك' },
  'status.since': { en: 'Since', ar: 'منذ' },
  'status.buyDiscord': { en: 'Buy on Discord', ar: 'شراء عبر الديسكورد' },
  'home.heroTitle1': { en: 'Why Work Hard', ar: 'لماذا تتعب وتجتهد' },
  'home.heroTitle2': { en: 'When you can', ar: 'بينما يمكنك اللعب' },
  'home.heroTitle3': { en: 'Play Dirty?', ar: 'بأفضلية كاملة؟' },
  'home.heroEyebrow': {
    en: 'Trusted since 2020 · Undetected focus',
    ar: 'موثوق منذ 2020 · أولوية الأمان والتحديث',
  },
  'home.heroSubtitle': {
    en: 'Premium undetected enhancements for competitive players. Instant delivery, live status, and dedicated support.',
    ar: 'أدوات احترافية آمنة للاعبين التنافسيين. تسليم فوري، حالة مباشرة، ودعم مخصص.',
  },
  'home.viewAll': { en: 'View All Cheats', ar: 'تصفح جميع البرامج' },
  'home.viewStatus': { en: 'Live Status', ar: 'الحالة المباشرة' },
  'home.popular': { en: 'Most Popular Products', ar: 'المنتجات الأكثر شعبية' },
  'home.popularDesc': {
    en: 'Top-rated tools with verified undetected status and thousands of reviews.',
    ar: 'أعلى المنتجات تقييماً مع حالة آمنة مؤكدة وآلاف المراجعات.',
  },
  'home.viewProd': { en: 'View Product', ar: 'عرض المنتج' },
  'home.featuredGames': { en: 'Featured games', ar: 'ألعاب مميزة' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  toggleLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Load preference from local storage if available
    const stored = localStorage.getItem('nova_lang');
    if (stored === 'en' || stored === 'ar') {
      setLanguage(stored);
      document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = stored;
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('nova_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
