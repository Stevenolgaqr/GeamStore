#!/usr/bin/env node
/**
 * List KeyHub costs for products in GeamStore only, then retail (+55%).
 * Does not buy keys or change SellAuth.
 *
 *   node scripts/fetch-keyhub-products.mjs
 *   node scripts/extract-store-keyhub-prices.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { retailFromKeyhubCredits } from './pricing-core.mjs';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadNameMap() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'product-name-map.json'), 'utf8'));
  const map = {};
  for (const [k, v] of Object.entries(raw)) {
    if (!k.startsWith('_')) map[k] = v;
  }
  return map;
}

function planDurationDays(plan) {
  const d = (plan.duration || '').toLowerCase();
  const label = (plan.label || '').toLowerCase();
  if (d.includes('3') && (d.includes('day') || label.includes('3'))) return 3;
  if (d.includes('7') || label.includes('week') || d.includes('أسبوع')) return 7;
  if (d.includes('30') || label.includes('month') || d.includes('شهر')) return 30;
  if (d.includes('1') || label.includes('day') || label.includes('يوم') || label.includes('24')) return 1;
  return null;
}

function findVariation(product, durationDays, index) {
  const vars = product.variations || [];
  const byDuration = vars.filter((v) => v.durationDays === durationDays);
  if (byDuration.length === 1) return byDuration[0];
  if (byDuration.length > 1) return byDuration[index] ?? byDuration[0];
  return vars[index] ?? null;
}

const snap = path.join(__dirname, 'keyhub-products-snapshot.json');
if (!fs.existsSync(snap)) {
  console.error('Run: node scripts/fetch-keyhub-products.mjs');
  process.exit(1);
}

const { products: keyhub } = JSON.parse(fs.readFileSync(snap, 'utf8').replace(/^\uFEFF/, ''));
const khByName = new Map(keyhub.map((p) => [p.name, p]));
const nameMap = loadNameMap();
const { cheats } = loadCheats();

console.log('slug | store title | KeyHub product | plan | KH cr | retail (+55%)');
console.log('---');

let rows = 0;
let skipped = 0;

for (const cheat of cheats) {
  const khName = nameMap[cheat.titleEn] || cheat.titleEn;
  const khProduct = khByName.get(khName);
  const durationCounts = {};

  for (const plan of cheat.plans) {
    const days = planDurationDays(plan);
    const idx = durationCounts[days] ?? 0;
    durationCounts[days] = idx + 1;

    if (!khProduct || days == null) {
      skipped++;
      console.log(`${cheat.slug} | ${cheat.titleEn} | — | ${plan.label} | — | SKIP (no KeyHub)`);
      continue;
    }

    const variation = findVariation(khProduct, days, idx);
    if (!variation) {
      skipped++;
      console.log(`${cheat.slug} | ${cheat.titleEn} | ${khName} | ${plan.label} | — | SKIP (no variation)`);
      continue;
    }

    const cr = variation.priceCredits;
    const retail = retailFromKeyhubCredits(cr);
    console.log(
      `${cheat.slug} | ${cheat.titleEn} | ${khName} | ${plan.label} | ${cr} | $${retail.toFixed(2)}`
    );
    rows++;
  }
}

console.log(`\nPriced from KeyHub: ${rows} plans | Skipped: ${skipped}`);
console.log('Full JSON: scripts/store-keyhub-prices.json (run sync-prices --dry-run to refresh)');
