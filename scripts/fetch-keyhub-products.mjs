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

const res = await fetch('https://keyhub.club/api/external/products', {
  headers: { Authorization: `Bearer ${key}` },
});
if (!res.ok) {
  console.error('KeyHub API failed:', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const out = path.join(__dirname, 'keyhub-products-snapshot.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log(`Saved ${data.products?.length ?? 0} products → ${path.relative(root, out)}`);
