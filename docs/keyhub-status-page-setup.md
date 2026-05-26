# إعداد صفحة الحالة — KeyHub → Nova Store

صفحة الحالة **تُبنى وتُدار من لوحة KeyHub** ([My Status Page](https://keyhub.club/portal))، والمتجر يعرضها عبر `/status` (iframe) أو يوجّه الزوار للرابط العام.

---

## 1. في KeyHub Portal

اذهب إلى: **Portal → My Status Page**

### Publish

| الإعداد | القيمة الموصى بها |
|---------|-------------------|
| **Make my status page public** | ✅ مفعّل (إلزامي — وإلا الرابط 404) |
| **Slug** | `odx` (أو `nova-store` إن أردت اسمًا أوضح) |
| **Published URL** | `https://keyhub.club/status/odx` |

### Branding (انسخ هذه القيم لمتجر Nova)

| الحقل | English | العربية (إن وُجد) |
|-------|---------|-------------------|
| **Title** | Nova Store — Live Status | Nova Store — الحالة المباشرة |
| **Description** | Real-time detection status for all Nova Store products. Updated automatically from our supplier. | حالة الاكتشاف المباشرة لجميع منتجات Nova Store. تُحدَّث تلقائياً. |
| **Logo** | ارفع `public/images/nova-store-logo.png` من المشروع | نفس الملف |
| **Primary / accent color** | `#E60000` | |
| **Background** | `#0B0C10` | |
| **Text** | `#F0F2F8` | |
| **Muted text** | `#8A8D9E` | |

### بعد الحفظ

1. اضغط **Preview** وتأكد أن المنتجات تظهر بحالاتها (Undetected / Maintenance / …).
2. فعّل **Public** واحفظ.
3. افتح الرابط في نافذة خاصة: https://keyhub.club/status/odx — يجب ألا يبقى «Loading status…» فقط.

---

## 2. ربط المتجر (GeamStore)

في `.env.local` (ومتغيرات Vercel للإنتاج):

```env
NEXT_PUBLIC_KEYHUB_STATUS_URL=https://keyhub.club/status/odx
NEXT_PUBLIC_KEYHUB_STATUS_SLUG=odx
```

- `/status` على الموقع يعرض صفحة KeyHub داخل إطار (iframe) مع شريط علوي وزر «فتح في نافذة جديدة».
- رابط القائمة **Status** في الهيدر يبقى `/status`.

---

## 3. (اختياري) API — أتمتة الإعدادات

Endpoint موجود: `https://keyhub.club/api/external/status`

مفتاحك الحالي يملك فقط: `catalog:read`, `keys:claim`.

لتشغيل السكربت `scripts/configure-keyhub-status-page.mjs`:

1. KeyHub → **API Access** → أنشئ مفتاحًا جديدًا أو عدّل الموجود.
2. أضف النطاق **`status_pages:manage`**.
3. ضع المفتاح في `.env.local` كـ `KEYHUB_API_KEY=...`.

ثم:

```bash
node scripts/configure-keyhub-status-page.mjs --dry-run
node scripts/configure-keyhub-status-page.mjs --apply
```

---

## 4. التحقق

| الخطوة | الرابط |
|--------|--------|
| KeyHub مباشرة | https://keyhub.club/status/odx |
| عبر المتجر | https://geam-store.vercel.app/status |

---

## ملاحظات

- الحالات على صفحة KeyHub تأتي من منتجاتك في KeyHub (نفس الكتالوج المرتبط بـ SellAuth).
- لا حاجة لملف `src/data/status.ts` للعرض العام إذا اعتمدت بالكامل على KeyHub؛ يمكن الإبقاء عليه كاحتياطي لاحقاً.
