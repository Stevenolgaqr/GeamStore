#!/usr/bin/env node
/**
 * Regenerate scripts/webhook-urls.generated.json from .env.local + pilot-webhooks.json
 * Run: node scripts/generate-webhook-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env.local');
const pilotPath = path.join(__dirname, 'pilot-webhooks.json');
const outPath = path.join(__dirname, 'webhook-urls.generated.json');

const env = fs.readFileSync(envPath, 'utf8');
const key = env.match(/^KEYHUB_API_KEY=(.+)$/m)?.[1]?.trim();
if (!key) {
  console.error('KEYHUB_API_KEY missing in .env.local');
  process.exit(1);
}

const { webhookBase, pilots } = JSON.parse(fs.readFileSync(pilotPath, 'utf8'));
const base = `${webhookBase}?api_key=${key}`;
const out = {};

for (const p of pilots) {
  out[p.sellauthProductId] = p.variants.map(
    (v) => `${base}&variation_id=${v.keyhubVariationId}`
  );
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${Object.keys(out).length} products to ${path.relative(root, outPath)}`);
