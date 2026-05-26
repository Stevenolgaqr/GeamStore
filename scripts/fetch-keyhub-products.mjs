#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const env = fs.readFileSync(path.join(root, '.env.local'), 'utf8');
const key = env.match(/^KEYHUB_API_KEY=(.+)$/m)?.[1]?.trim();
if (!key) {
  console.error('KEYHUB_API_KEY missing in .env.local');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${key}` };
const all = [];

for (let page = 1; page <= 20; page++) {
  const url =
    page === 1
      ? 'https://keyhub.club/api/external/products'
      : `https://keyhub.club/api/external/products?page=${page}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error('KeyHub API failed:', res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  const batch = data.products || [];
  if (!batch.length) break;
  all.push(...batch);
  console.log(`Page ${page}: +${batch.length} (total ${all.length})`);
  if (batch.length < 50) break;
}

const out = path.join(__dirname, 'keyhub-products-snapshot.json');
fs.writeFileSync(out, JSON.stringify({ products: all }, null, 2));
console.log(`Saved ${all.length} products → ${path.relative(root, out)}`);
