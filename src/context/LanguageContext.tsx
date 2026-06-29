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
  'nav.instructions': { en: 'Instructions', ar: 'التعليمات' },
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
  'store.pickGame': { en: 'Pick your game', ar: 'اختر لعبتك' },
  'store.catalogHeadline': { en: 'Game library', ar: 'مكتبة الألعاب' },
  'store.catalogDesc': {
    en: 'Browse every supported title. Pick a game to see programs, pricing, and live status.',
    ar: 'تصفح كل الألعاب المدعومة. اختر لعبتك لعرض البرامج والأسعار والحالة المباشرة.',
  },
  'store.searchGames': { en: 'Filter games…', ar: 'تصفية الألعاب…' },
  'store.hotGames': { en: 'Popular', ar: 'الأكثر طلباً' },
  'store.browseAll': { en: 'All titles', ar: 'كل الألعاب' },
  'store.safePrograms': { en: 'undetected', ar: 'آمن' },
  'product.buy': { en: 'Purchase Now', ar: 'شراء الآن' },
  'product.options': { en: 'Available Options', ar: 'خيارات متوفرة' },
  'product.view': { en: 'View Programs ←', ar: 'تصفح البرامج ←' },
  'card.reviews': { en: 'reviews', ar: 'مراجعة' },
  'card.startsFrom': { en: 'Starts from', ar: 'يبدأ من' },
  'card.buyNow': { en: 'Buy Now', ar: 'اشتري الآن' },
  'card.quickBuy': { en: 'Quick Buy', ar: 'شراء سريع' },
  'card.details': { en: 'View Details', ar: 'عرض التفاصيل' },
  'card.viewDetails': { en: 'Details', ar: 'التفاصيل' },
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
  'product.loadingCheckout': { en: 'Preparing checkout…', ar: 'جاري تجهيز الدفع…' },
  'product.deliveryNote': {
    en: 'Your license key appears on the SellAuth receipt immediately after payment — copy it before closing that window. A copy may also be emailed if SellAuth has your address.',
    ar: 'يظهر مفتاح الترخيص فوراً على صفحة إيصال SellAuth بعد الدفع — انسخه قبل إغلاق النافذة. قد تصل نسخة إلى بريدك إن كان مسجلاً لدى SellAuth.',
  },
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
  'status.keyhubEmbed': {
    en: 'Live status powered by KeyHub — synced with our catalog.',
    ar: 'حالة مباشرة عبر KeyHub — متزامنة مع الكتالوج.',
  },
  'status.openKeyhub': { en: 'Open status page', ar: 'فتح صفحة الحالة' },
  'status.iframeTitle': { en: 'Nova Store live status', ar: 'الحالة المباشرة — Nova Store' },
  'instructions.title': { en: 'Setup Instructions', ar: 'تعليمات التشغيل' },
  'instructions.subtitle': {
    en: 'Step-by-step guides for every product in our catalog. Content is synced from KeyHub.',
    ar: 'دليل خطوة بخطوة لكل برنامج في المتجر. المحتوى من KeyHub.',
  },
  'instructions.search': { en: 'Search products...', ar: 'ابحث عن برنامج...' },
  'instructions.empty': { en: 'No instructions available', ar: 'لا توجد تعليمات' },
  'instructions.select': { en: 'Select a product', ar: 'اختر برنامجاً' },
  'instructions.noResults': { en: 'No products match your search.', ar: 'لا توجد نتائج مطابقة.' },
  'instructions.viewProduct': { en: 'View product', ar: 'عرض المنتج' },
  'instructions.contactDiscord': { en: 'Ask on Discord', ar: 'اسأل على الديسكورد' },
  'instructions.showList': { en: 'Show product list', ar: 'عرض قائمة البرامج' },
  'instructions.hideList': { en: 'Hide product list', ar: 'إخفاء القائمة' },
  'product.setupGuide': { en: 'Setup Instructions', ar: 'تعليمات التشغيل' },
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
  'store.viewCatalog': { en: 'Browse by game', ar: 'تصفح حسب اللعبة' },
  'store.viewAllProducts': { en: 'All programs', ar: 'جميع البرامج' },
  'header.search': { en: 'Search products…', ar: 'ابحث عن منتج…' },
  'header.searchSubmit': { en: 'Search', ar: 'بحث' },
  'header.menuOpen': { en: 'Open menu', ar: 'فتح القائمة' },
  'header.menuClose': { en: 'Close menu', ar: 'إغلاق القائمة' },
  'delivery.keyLocation': {
    en: 'Your license key appears on the SellAuth receipt immediately after payment — copy it before closing that window. A copy may also be emailed if SellAuth has your address on file.',
    ar: 'يظهر مفتاح الترخيص فوراً على صفحة إيصال SellAuth بعد الدفع — انسخه قبل إغلاق النافذة. قد تصل نسخة إلى بريدك إن كان مسجلاً لدى SellAuth.',
  },
  'success.title': { en: 'Payment Successful!', ar: 'تم الدفع بنجاح!' },
  'success.desc1': {
    en: 'Thank you for your purchase.',
    ar: 'شكراً لشرائك.',
  },
  'success.desc2': {
    en: 'Your license key is shown on the SellAuth checkout receipt page right after payment—copy it before closing that window.',
    ar: 'يظهر مفتاح الترخيص على صفحة إيصال SellAuth مباشرة بعد الدفع — انسخه قبل إغلاق النافذة.',
  },
  'success.desc3': {
    en: 'If SellAuth has your email on file, a copy of the key may also arrive in your inbox. This page is only a confirmation; your key is not stored here.',
    ar: 'إذا كان بريدك مسجلاً لدى SellAuth، قد تصل نسخة من المفتاح إلى بريدك. هذه الصفحة للتأكيد فقط؛ المفتاح غير مخزّن هنا.',
  },
  'success.home': { en: 'Return to Home', ar: 'العودة للرئيسية' },
  'success.continue': { en: 'Continue Shopping', ar: 'متابعة التسوق' },
  'cancel.title': { en: 'Payment Cancelled', ar: 'تم إلغاء الدفع' },
  'cancel.desc': {
    en: 'Your payment process was cancelled or failed. No charges were made. If you experienced an issue, please try again or contact support.',
    ar: 'تم إلغاء عملية الدفع أو فشلت. لم يتم خصم أي مبلغ. إذا واجهت مشكلة، أعد المحاولة أو تواصل مع الدعم.',
  },
  'cancel.store': { en: 'Return to Store', ar: 'العودة للمتجر' },
  'cancel.support': { en: 'Contact Support', ar: 'تواصل مع الدعم' },
  'footer.desc': {
    en: 'Nova Store is the leading provider for undetected game enhancements. Providing high quality software and unparalleled support since 2020.',
    ar: 'نوفا ستور المزود الرائد لأدوات الألعاب الآمنة. برمجيات عالية الجودة ودعم متميز منذ 2020.',
  },
  'footer.discord': { en: 'Join our Discord', ar: 'انضم لديسكورد' },
  'footer.navigation': { en: 'Navigation', ar: 'التنقل' },
  'footer.information': { en: 'Information', ar: 'معلومات' },
  'footer.topGames': { en: 'Top Games', ar: 'أبرز الألعاب' },
  'footer.home': { en: 'Home', ar: 'الرئيسية' },
  'footer.store': { en: 'Store', ar: 'المتجر' },
  'footer.status': { en: 'Status', ar: 'الحالة' },
  'footer.reviews': { en: 'Reviews', ar: 'المراجعات' },
  'footer.contact': { en: 'Contact', ar: 'الدعم' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.refunds': { en: 'Refund Policy', ar: 'سياسة الاسترداد' },
  'footer.contactUs': { en: 'Contact Us', ar: 'اتصل بنا' },
  'footer.rights': { en: 'All Rights Reserved.', ar: 'جميع الحقوق محفوظة.' },
  'contact.badge': { en: 'Support', ar: 'الدعم' },
  'contact.title1': { en: 'Get in', ar: 'تواصل' },
  'contact.title2': { en: 'Touch', ar: 'معنا' },
  'contact.subtitle': {
    en: 'Our support team is active 24/7. Choose the fastest way to reach us.',
    ar: 'فريق الدعم متاح على مدار الساعة. اختر أسرع طريقة للتواصل.',
  },
  'contact.discordTitle': { en: 'Join Discord', ar: 'انضم للديسكورد' },
  'contact.discordDesc': {
    en: 'Fastest support. Join our server and open a ticket — average response time under 10 minutes.',
    ar: 'أسرع دعم. انضم للسيرفر وافتح تذكرة — متوسط الرد أقل من 10 دقائق.',
  },
  'contact.discordCta': { en: 'Open Discord →', ar: 'فتح الديسكورد ←' },
  'contact.emailTitle': { en: 'Email Support', ar: 'دعم البريد' },
  'contact.emailDesc': {
    en: 'For billing and account issues. We respond within 24 hours on business days.',
    ar: 'لمشاكل الفواتير والحساب. نرد خلال 24 ساعة في أيام العمل.',
  },
  'contact.statusTitle': { en: 'Check Status', ar: 'تحقق من الحالة' },
  'contact.statusDesc': {
    en: 'Before opening a ticket, check if your product is currently affected by a detection or update.',
    ar: 'قبل فتح تذكرة، تحقق إن كان منتجك متأثراً بكشف أو تحديث.',
  },
  'contact.statusCta': { en: 'View Status Page →', ar: 'صفحة الحالة ←' },
  'contact.faqTitle': { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
  'contact.faq1q': { en: 'How quickly will I receive my license?', ar: 'متى أستلم المفتاح؟' },
  'contact.faq1a': {
    en: 'Your license key appears on the SellAuth receipt immediately after payment — copy it before closing that window. A copy may also be emailed if SellAuth has your address.',
    ar: 'يظهر مفتاح الترخيص فوراً على إيصال SellAuth بعد الدفع — انسخه قبل إغلاق النافذة. قد تصل نسخة للبريد إن كان مسجلاً.',
  },
  'contact.faq2q': { en: 'What happens if my cheat gets detected?', ar: 'ماذا لو أُكتشف البرنامج؟' },
  'contact.faq2a': {
    en: 'Our team updates products within hours of detection. Check the Status page for real-time updates.',
    ar: 'فريقنا يحدّث المنتجات خلال ساعات من الكشف. راجع صفحة الحالة للتحديثات المباشرة.',
  },
  'contact.faq3q': { en: 'Can I use the cheat on multiple PCs?', ar: 'هل يعمل على أكثر من جهاز؟' },
  'contact.faq3a': {
    en: 'Each license is tied to one hardware ID (HWID). Contact support if you need to change your device.',
    ar: 'كل ترخيص مربوط بمعرّف جهاز واحد (HWID). تواصل مع الدعم لتغيير الجهاز.',
  },
  'contact.faq4q': { en: 'Do you offer refunds?', ar: 'هل تقدمون استرداداً؟' },
  'contact.faq4a': {
    en: 'Refunds are evaluated case-by-case. See our Refund Policy for full details.',
    ar: 'الاسترداد يُقيَّم حسب الحالة. راجع سياسة الاسترداد للتفاصيل.',
  },
  'contact.faq5q': { en: 'Is my payment information secure?', ar: 'هل الدفع آمن؟' },
  'contact.faq5a': {
    en: 'Yes. We use trusted third-party payment processors. Nova Store never stores your card details.',
    ar: 'نعم. نستخدم معالجات دفع موثوقة. نوفا ستور لا يخزّن بيانات بطاقتك.',
  },
  'contact.faq6q': { en: 'How do I get started after purchasing?', ar: 'كيف أبدأ بعد الشراء؟' },
  'contact.faq6a': {
    en: 'Visit our Setup Instructions page for step-by-step guides for every product, or open Discord if you need help.',
    ar: 'زر صفحة تعليمات التشغيل للدليل خطوة بخطوة، أو افتح الديسكورد للمساعدة.',
  },
  'reviews.label': { en: 'Reviews & Support', ar: 'المراجعات والدعم' },
  'reviews.title': { en: 'What Our Customers Say', ar: 'ماذا يقول عملاؤنا' },
  'reviews.desc': {
    en: 'Join thousands of competitive players who trust our solutions. See what our community says about their experience.',
    ar: 'انضم إلى الآلاف من اللاعبين المحترفين الذين يثقون في حلولنا. شاهد ما يقوله مجتمعنا حول تجاربهم.',
  },
  'reviews.gamesLabel': { en: 'Supported Games', ar: 'الألعاب المدعومة' },
  'reviews.gamesTitle': { en: 'All Games We Support', ar: 'جميع الألعاب التي ندعمها' },
  'reviews.gamesDesc': {
    en: 'We continuously update our products to work smoothly with every game patch.',
    ar: 'نحدث منتجاتنا باستمرار لضمان عملها بسلاسة مع كل تحديث للعبة.',
  },
  'reviews.supportLabel': { en: 'Technical Support', ar: 'الدعم الفني' },
  'reviews.supportTitle': { en: 'We Are Here to Help', ar: 'نحن هنا لمساعدتك' },
  'reviews.supportDesc': {
    en: 'Our specialized team is ready to assist you around the clock.',
    ar: 'فريقنا المتخصص جاهز لمساعدتك على مدار الساعة.',
  },
  'reviews.discordTitle': { en: 'Discord', ar: 'ديسكورد' },
  'reviews.discordDesc': {
    en: 'Join our Discord community for instant support and live updates.',
    ar: 'انضم لمجتمعنا على ديسكورد للحصول على دعم فوري وتحديثات مباشرة.',
  },
  'reviews.emailTitle': { en: 'Email', ar: 'البريد الإلكتروني' },
  'reviews.emailDesc': {
    en: 'Contact our support team via the contact page for personalized help.',
    ar: 'تواصل مع فريق الدعم عبر صفحة الاتصال للحصول على مساعدة مخصصة.',
  },
  'reviews.youtubeTitle': { en: 'YouTube', ar: 'يوتيوب' },
  'reviews.youtubeDesc': {
    en: 'Watch setup guides and live previews on our YouTube channel.',
    ar: 'شاهد فيديوهات الشرح والمعاينات الحية على قناة يوتيوب.',
  },
  'legal.badge': { en: 'Legal', ar: 'قانوني' },
  'legal.updated': { en: 'Last updated: May 2026', ar: 'آخر تحديث: مايو 2026' },
  'legal.termsTitle': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'legal.privacyTitle': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'legal.refundsTitle': { en: 'Refund Policy', ar: 'سياسة الاسترداد' },
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
