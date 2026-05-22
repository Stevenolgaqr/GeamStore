'use client';

import Script from 'next/script';

export default function SellauthEmbed() {
  return (
    <>
      {/* سكربت الدفع المدمج الخاص بمنصة Sellauth */}
      {/* تأكد من إضافة رابط السكربت الرسمي من حساب Sellauth الخاص بك إذا لزم الأمر */}
      <Script 
        src="https://sellauth.com/assets/js/sellauth-embed-2.js" 
        strategy="lazyOnload" 
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).sellAuthEmbed) {
            try {
              (window as any).sellAuthEmbed.injectCaptcha?.();
              (window as any).sellAuthEmbed.injectStyles?.();
            } catch (err) {
              console.error('Failed to initialize SellAuth Embed captchas:', err);
            }
          }
        }}
      />
    </>
  );
}
