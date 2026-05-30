#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCheats } from './parse-cheats.mjs';
import { planDurationDays, retailFromKeyhubCredits } from './pricing-core.mjs';
import { CREDIT_USD, KEYHUB_CREDITS } from './keyhub-catalog-credits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const snap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'keyhub-products-snapshot.json'), 'utf8')
);
const khByName = new Map(snap.products.map((p) => [p.name, p]));
const overrides = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'plan-credits-override.json'), 'utf8')
);
const { cheats } = loadCheats();

function findVar(product, days, idx) {
  const vars = product?.variations || [];
  const by = vars.filter((v) => v.durationDays === days);
  if (by.length === 1) return by[0];
  if (by.length > 1) return by[idx] ?? by[0];
  return vars[idx] ?? null;
}

function durLabel(d) {
  if (d === 1) return '24h/يوم';
  if (d === 3) return '3 أيام';
  if (d === 7) return 'أسبوع';
  if (d === 30) return 'شهر';
  if (d === 90) return '3 أشهر';
  if (d === 365) return 'سنة';
  return `${d}d`;
}

const rows = [];
const missing = [];

for (const c of cheats) {
  const kh = khByName.get(c.titleEn);
  const seen = new Map();
  for (const plan of c.plans) {
    const days = planDurationDays(plan);
    const vid = plan.sellauthVariantId;
    let cr = null;
    if (vid && overrides[vid] != null && !String(vid).startsWith('_')) {
      cr = overrides[vid];
    } else if (KEYHUB_CREDITS[c.titleEn]?.[days] != null) {
      cr = KEYHUB_CREDITS[c.titleEn][days];
    } else if (kh && days != null) {
      const k = String(days);
      const idx = seen.get(k) || 0;
      seen.set(k, idx + 1);
      const v = findVar(kh, days, idx);
      if (v) cr = v.priceCredits;
    }
    if (cr == null) {
      missing.push({ product: c.titleEn, plan: plan.label, duration: plan.duration });
      continue;
    }
    rows.push({
      titleEn: c.titleEn,
      slug: c.slug,
      plan: plan.label,
      durationDays: days,
      durationLabel: durLabel(days),
      keyhubCredits: cr,
      keyhubUsd: Math.round(cr * CREDIT_USD * 100) / 100,
      newRetail: retailFromKeyhubCredits(cr),
    });
  }
}

const byProduct = new Map();
for (const r of rows) {
  if (!byProduct.has(r.titleEn)) byProduct.set(r.titleEn, []);
  byProduct.get(r.titleEn).push(r);
}

const out = {
  rate: '50 credits = $5.00 USD (1 credit = $0.10)',
  note: 'Original KeyHub cost + newRetail (tiered psychological pricing)',
  productCount: byProduct.size,
  planCount: rows.length,
  missingCount: missing.length,
  products: [...byProduct.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([titleEn, plans]) => ({ titleEn, plans })),
  missing,
};

fs.writeFileSync(path.join(__dirname, 'keyhub-original-prices-export.json'), JSON.stringify(out, null, 2));

console.log(`سعر التحويل: 50 كريدت = $5.00 (1 كريدت = $${CREDIT_USD.toFixed(2)})\n`);
console.log(`| المنتج | المدة | كريدت | تكلفة KH $ | سعر البيع $ |`);
console.log(`|--------|-------|-------|------------|-------------|`);

for (const { titleEn, plans } of out.products) {
  for (const p of plans) {
    console.log(
      `| ${titleEn} | ${p.durationLabel} | ${p.keyhubCredits} | $${p.keyhubUsd.toFixed(2)} | $${p.newRetail.toFixed(2)} |`
    );
  }
}

if (missing.length) {
  console.log('\n**بدون سعر KeyHub:**');
  for (const m of missing) {
    console.log(`- ${m.product} — ${m.plan} (${m.duration})`);
  }
}

console.log(`\n${rows.length} خطة | ${missing.length} بدون تطابق`);
console.log('JSON: scripts/keyhub-original-prices-export.json');
