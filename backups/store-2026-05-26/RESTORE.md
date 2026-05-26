# نسخة احتياطية للمتجر — 26 مايو 2026

هذه نسخة من حالة المتجر بعد:
- صور الألعاب (Marvel Rivals, Off The Grid, PIONER)
- إزالة All Access و Warthunder
- ترتيب Rust → Fortnite → Valorant أولاً
- الشعار + اسم Nova Store

## استعادة سريعة (PowerShell)

من جذر المشروع `GeamStore`:

```powershell
.\backups\store-2026-05-26\restore.ps1
```

ثم ارفع التغييرات إن أردت نشرها على Vercel:

```powershell
git add .
git commit -m "استعادة نسخة المتجر 2026-05-26"
git push
```

## استعادة عبر Git (علامة)

```powershell
git checkout store-backup-2026-05-26 -- src/data/cheats.ts src/app/store src/components/OCHeader.tsx src/components/OCHeader.module.css src/components/OCFooter.tsx src/components/OCFooter.module.css src/components/OCProductCard.tsx src/components/OCProductCard.module.css src/context/LanguageContext.tsx public/cheats public/images/nova-store-logo.png
```

## الملفات المشمولة

| المسار | الوصف |
|--------|--------|
| `src/data/cheats.ts` | كل المنتجات والأسعار |
| `src/app/store/` | صفحة المتجر |
| `src/components/OCProductCard.*` | بطاقة المنتج |
| `src/components/OCHeader.*` / `OCFooter.*` | الهيدر والفوتر |
| `src/context/LanguageContext.tsx` | نصوص المتجر |
| `public/cheats/*.jpeg` | صور أقسام الألعاب |
| `public/images/nova-store-logo.png` | الشعار |

> **ملاحظة:** صور المنتجات داخل `public/cheats/products/` غير مضمنة (حجم كبير). استعادتها من Git إن لزم.
