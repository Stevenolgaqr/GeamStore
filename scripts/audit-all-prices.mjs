#!/usr/bin/env node
/**
 * Verify site prices vs tiered psychological pricing rule and SellAuth API.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  retailFromKeyhubCredits,
  costUsdFromCredits,
  minRetailFromCost,
  tierMultiplier,
  CREDIT_USD,
} from './pricing-core.mjs';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('.env.local required for SellAuth checks');
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const token = env.match(/^SELLAUTH_API_KEY=(.+)$/m)?.[1]?.trim();
const shopId = env.match(/^SELLAUTH_SHOP_ID=(.+)$/m)?.[1]?.trim();

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'price-sync-report.json'), 'utf8'));
const { cheats } = loadCheats();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchProduct(productId) {
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' };
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/products/${productId}`, { headers });
    if (res.status === 429) {
      await sleep(3000 * (attempt + 1));
      continue;
    }
    return res;
  }
  return fetch(`https://api.sellauth.com/v1/shops/${shopId}/products/${productId}`, { headers });
}

let fail = 0;
for (const entry of Object.values(report.byVariant)) {
  const cheat = cheats.find((c) => c.slug === entry.slug);
  const plan = cheat?.plans.find((p) => String(p.sellauthVariantId) === String(entry.sellauthVariantId));
  if (!plan) continue;

  const expectedCost = costUsdFromCredits(entry.keyhubCredits);
  const expectedTier = tierMultiplier(expectedCost);
  const expectedMin = minRetailFromCost(expectedCost);
  const expectedRetail = retailFromKeyhubCredits(entry.keyhubCredits);

  if (
    entry.costUsd !== expectedCost ||
    entry.tierMult !== expectedTier ||
    entry.minRetail !== expectedMin ||
    entry.retail !== expectedRetail
  ) {
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
  const productIds = [...new Set(Object.values(report.byVariant).map((e) => e.sellauthProductId).filter(Boolean))];
  let checked = 0;
  for (const productId of productIds) {
    const res = await fetchProduct(productId);
    if (!res.ok) {
      if (res.status === 404) {
        console.warn('SellAuth product missing (404):', productId);
        await sleep(400);
        continue;
      }
      console.error('SellAuth GET failed', productId, res.status);
      fail++;
      await sleep(400);
      continue;
    }
    const product = await res.json();
    for (const v of product.variants || []) {
      const entry = report.byVariant[String(v.id)];
      if (!entry) continue;
      checked++;
      if (v.price !== entry.retail.toFixed(2)) {
        console.error('SellAuth mismatch', productId, v.id, v.price, '!=', entry.retail.toFixed(2));
        fail++;
      }
    }
    await sleep(1200);
  }
  console.log(`SellAuth variants checked: ${checked}`);
} else {
  console.warn('SELLAUTH credentials missing — skipped SellAuth checks');
}

console.log(
  fail
    ? `${fail} issue(s)`
    : `All checks passed (CREDIT_USD=${CREDIT_USD}, tiered psychological pricing)`
);
process.exit(fail ? 1 : 0);
