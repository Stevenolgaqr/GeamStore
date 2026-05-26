#!/usr/bin/env node
/**
 * Verify pilot + all synced prices: cheats.ts, KeyHub markup, SellAuth API.
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync(process.execPath, [path.join(__dirname, 'audit-all-prices.mjs')], {
  stdio: 'inherit',
});
process.exit(r.status ?? 1);
