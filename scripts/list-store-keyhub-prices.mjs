#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCheats } from './parse-cheats.mjs';
import { KEYHUB_CREDITS, CREDIT_USD } from './keyhub-catalog-credits.mjs';
import { planDurationDays, costUsdFromCredits, retailFromKeyhubCredits } from './pricing-core.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { cheats } = loadCheats();
const rows = [];
const missing = [];

for (const cheat of cheats) {
  const khName = cheat.titleEn;
  const prices = KEYHUB_CREDITS[khName] ?? null;

  for (const plan of cheat.plans) {
    const days = planDurationDays(plan);

    if (!prices || days == null || prices[days] == null) {
      missing.push({
        store: cheat.titleEn,
        plan: plan.label,
        duration: plan.duration,
      });
      continue;
    }

    const cr = prices[days];
    rows.push({
      storeProduct: cheat.titleEn,
      slug: cheat.slug,
      plan: plan.label,
      durationDays: days,
      keyhubCredits: cr,
      keyhubUsd: costUsdFromCredits(cr),
      retailUsd: retailFromKeyhubCredits(cr),
    });
  }
}

const out = {
  rate: '50 credits = $5.00 (1 cr = $0.10)',
  markup: '+55% on KeyHub USD cost + .79 charm',
  rows,
  missingFromCatalog: missing,
};

fs.writeFileSync(path.join(__dirname, 'store-keyhub-prices.json'), JSON.stringify(out, null, 2));

console.log(`سعر التحويل: 50 كريدت = $5.00 (1 كريدت = $${CREDIT_USD.toFixed(2)})\n`);
console.log('| المتجر | المدة | كريدت | تكلفة $ | بيع $ |');
console.log('|--------|-------|-------|---------|-------|');

for (const r of rows) {
  const dur =
    r.durationDays === 1
      ? '24h/يوم'
      : r.durationDays === 3
        ? '3 أيام'
        : r.durationDays === 7
          ? 'أسبوع'
          : r.durationDays === 30
            ? 'شهر'
            : r.durationDays === 90
              ? '3 أشهر'
              : r.durationDays === 365
                ? 'سنة'
                : `${r.durationDays}d`;
  console.log(
    `| ${r.storeProduct} | ${dur} | ${r.keyhubCredits} | $${r.keyhubUsd.toFixed(2)} | $${r.retailUsd.toFixed(2)} |`
  );
}

if (missing.length) {
  console.log('\n**بدون تطابق في الكتالوج (لم تُغيّر أسعارها):**\n');
  for (const m of missing) {
    console.log(`- ${m.store} — ${m.plan} (${m.duration})`);
  }
}

console.log(`\n${rows.length} خطة | ${missing.length} بدون تطابق`);
