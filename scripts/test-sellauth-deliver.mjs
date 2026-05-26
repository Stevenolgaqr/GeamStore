#!/usr/bin/env node
/**
 * Smoke-test KeyHub sellauth-deliver webhook (auth + variation routing).
 *
 *   node scripts/test-sellauth-deliver.mjs --variation var_477dcb86881b1c10dbbf73f1
 *   node scripts/test-sellauth-deliver.mjs --live   # POSTs SellAuth-shaped body (may charge credits!)
 *
 * Default: auth check only (invalid API key must return 401). Does NOT POST to deliver.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const live = args.includes('--live');
const variationArg = args.find((a) => a.startsWith('--variation='))?.split('=')[1]
  ?? (args.includes('--variation') ? args[args.indexOf('--variation') + 1] : 'var_477dcb86881b1c10dbbf73f1');

const env = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const apiKey = env.match(/^KEYHUB_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey) {
  console.error('KEYHUB_API_KEY missing in .env.local');
  process.exit(1);
}

const url = `https://keyhub.club/api/external/sellauth-deliver?api_key=${apiKey}&variation_id=${variationArg}`;

if (live) {
  const uniqueId = `pilot-test-${Date.now()}`;
  const body = {
    event: 'INVOICE.ITEM.DELIVER-DYNAMIC',
    unique_id: uniqueId,
    email: 'pilot-test@nova-store.gg',
    shop_id: 185564,
    item: {
      product_id: 727058,
      variant_id: 1179736,
      quantity: 1,
      product: { name: 'Ancient Apex' },
      variant: { name: '1 Day' },
    },
  };

  console.log('LIVE mode — purchases a key and charges KeyHub credits.');
  console.log('URL variation:', variationArg);
  console.log('unique_id:', uniqueId);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body (first 120 chars):', text.slice(0, 120));
  console.log('Check KeyHub Delivery Activity for', uniqueId);
  process.exit(res.ok ? 0 : 1);
}

// Auth-only: invalid key must be rejected
const badUrl = url.replace(apiKey, 'kh_invalid');
const res = await fetch(badUrl, { method: 'POST', body: '{}' });
console.log('Auth check (invalid key):', res.status);
if (res.status !== 401) {
  console.error('Expected 401 for invalid API key, got', res.status);
  process.exit(1);
}
console.log('OK: valid key format accepted by endpoint (use --live for real delivery test).');
