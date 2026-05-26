#!/usr/bin/env node
/**
 * Verify site prices vs KeyHub markup rule (costUsd × 1.55 + .79 charm) and SellAuth API.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  retailFromKeyhubCredits,
  costUsdFromCredits,
  rawRetailFromCredits,
  KEYHUB_MARKUP,
  CREDIT_USD,
} from './pricing-core.mjs';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('.env.local required for SellAuth pilot checks');
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const token = env.match(/^SELLAUTH_API_KEY=(.+)$/m)?.[1]?.trim();
const shopId = env.match(/^SELLAUTH_SHOP_ID=(.+)$/m)?.[1]?.trim();

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'price-sync-report.json'), 'utf8'));
const { cheats } = loadCheats();

let fail = 0;
for (const entry of Object.values(report.byVariant)) {
  const cheat = cheats.find((c) => c.slug === entry.slug);
  const plan = cheat?.plans.find((p) => String(p.sellauthVariantId) === String(entry.sellauthVariantId));
  if (!plan) continue;

  const expectedCost = costUsdFromCredits(entry.keyhubCredits);
  const expectedRaw = rawRetailFromCredits(entry.keyhubCredits);
  const expectedRetail = retailFromKeyhubCredits(entry.keyhubCredits);

  if (entry.costUsd !== expectedCost || entry.rawPlus55 !== expectedRaw || entry.retail !== expectedRetail) {
    console.error('report formula mismatch', entry.sellauthVariantId, entry);
    fail++;
  }
  if (plan.price !== entry.retail) {
    console.error('cheats mismatch', entry.sellauthVariantId, plan.price, '!=', entry.retail);
    fail++;
  }
  if (plan.price !== expectedRetail) {
    console.error('cheats formula mismatch', entry.sellauthVariantId, plan.price, '!=', expectedRetail);
    fail++;
  }
}

if (token && shopId) {
  const pilots = ['727058', '727070', '727060'];
  for (const productId of pilots) {
    const res = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    if (!res.ok) {
      console.error('SellAuth GET failed', productId, res.status);
      fail++;
      continue;
    }
    const product = await res.json();
    for (const v of product.variants || []) {
      const entry = report.byVariant[String(v.id)];
      if (!entry) continue;
      if (v.price !== entry.retail.toFixed(2)) {
        console.error('SellAuth mismatch', productId, v.id, v.price, '!=', entry.retail.toFixed(2));
        fail++;
      }
    }
    console.log(`OK pilot ${product.name}:`, product.variants.map((v) => `${v.name}=$${v.price}`).join(', '));
  }
} else {
  console.warn('SELLAUTH credentials missing — skipped SellAuth checks');
}

console.log(
  fail
    ? `${fail} issue(s)`
    : `All checks passed (CREDIT_USD=${CREDIT_USD}, ×${KEYHUB_MARKUP}, .79 charm)`
);
process.exit(fail ? 1 : 0);
