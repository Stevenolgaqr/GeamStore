#!/usr/bin/env node
/** One-time: convert browser CDP export → keyhub-instructions-export.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cdpPath = process.argv[2];
if (!cdpPath) {
  console.error('Usage: node scripts/import-cdp-instructions.mjs <cdp-response.json>');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(cdpPath, 'utf8'));
const items = raw.result?.value;
if (!Array.isArray(items)) {
  console.error('Unexpected CDP format');
  process.exit(1);
}

const out = path.join(__dirname, 'keyhub-instructions-export.json');
fs.writeFileSync(out, JSON.stringify({ syncedAt: new Date().toISOString(), instructions: items }, null, 2));
console.log(`Saved ${items.length} items → ${out}`);
