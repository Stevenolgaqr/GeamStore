#!/usr/bin/env node
/**
 * Sync descriptions, features, status, and images from KeyHub → cheats.ts
 *   node scripts/sync-product-content.mjs --dry-run
 *   node scripts/sync-product-content.mjs --apply
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apply = process.argv.includes('--apply');
const MAX_IMAGES = 8;

function loadEnv() {
  const env = fs.readFileSync(path.join(root, '.env.local'), 'utf8');
  return env.match(/^KEYHUB_API_KEY=(.+)$/m)?.[1]?.trim();
}

function loadSnapshot() {
  const p = path.join(__dirname, 'keyhub-products-snapshot.json');
  if (!fs.existsSync(p)) {
    console.error('Run: node scripts/fetch-keyhub-products.mjs');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '')).products || [];
}

function imageUrl(productId, filename) {
  return `https://keyhub.club/uploads/products/${productId}/${filename}`;
}

function mapStatus(operationalStatus, statusLabel) {
  const label = (statusLabel || '').toLowerCase();
  if (label.includes('detected') && !label.includes('undetected')) {
    return { status: 'detected', statusLabel: statusLabel || 'Detected' };
  }
  if (
    operationalStatus === 'maintenance' ||
    label.includes('maintenance') ||
    label.includes('updating')
  ) {
    return { status: 'updating', statusLabel: statusLabel || 'Updating' };
  }
  return { status: 'undetected', statusLabel: statusLabel || 'Undetected' };
}

/** Parse KeyHub markdown longDescription into feature bullets */
export function parseFeatures(longDescription, max = 12) {
  if (!longDescription?.trim()) return [];
  const out = [];
  for (const line of longDescription.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('## ')) {
      out.push(t.replace(/^#+\s*/, ''));
    } else if (t.startsWith('- ')) {
      out.push(t.slice(2).trim());
    } else if (!t.startsWith('#') && t.length <= 100) {
      out.push(t);
    }
    if (out.length >= max) break;
  }
  return out.length ? out : [longDescription.split('\n')[0].trim()].filter(Boolean);
}

function escTsString(s) {
  return JSON.stringify(s);
}

function escTsArray(arr) {
  const items = arr.map((x) => `      ${escTsString(x)}`).join(',\n');
  return `[\n${items}\n    ]`;
}

async function fetchProductDetail(apiKey, productId, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(`https://keyhub.club/api/external/products/${productId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
  }
  throw new Error('429 rate limit');
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return destPath;
}

export function patchCheatBlock(src, slug, patch) {
  const slugMarker = `"slug": ${escTsString(slug)}`;
  const slugIdx = src.indexOf(slugMarker);
  if (slugIdx < 0) return { src, ok: false };

  let blockStart = src.lastIndexOf('\n  {', slugIdx);
  if (blockStart < 0) blockStart = src.lastIndexOf('{', slugIdx);
  const nextBlock = src.indexOf('\n  {', slugIdx + slugMarker.length);
  const blockEnd = nextBlock > 0 ? nextBlock : src.length;
  let block = src.slice(blockStart, blockEnd);

  const setString = (field, value) => {
    const val = escTsString(value);
    const re = new RegExp(`"${field}": "[^"]*"`);
    if (re.test(block)) block = block.replace(re, `"${field}": ${val}`);
  };

  const setArray = (field, arr) => {
    const val = escTsArray(arr);
    const re = new RegExp(`"${field}": \\[[\\s\\S]*?\\]`);
    if (re.test(block)) block = block.replace(re, `"${field}": ${val}`);
  };

  setString('description', patch.description);
  if (/"descriptionEn":/.test(block)) {
    setString('descriptionEn', patch.descriptionEn);
  } else {
    block = block.replace(
      /"description": [^\n]+\n/,
      (m) => `${m}    "descriptionEn": ${escTsString(patch.descriptionEn)},\n`
    );
  }

  setArray('features', patch.features);
  if (/"featuresEn":/.test(block)) {
    setArray('featuresEn', patch.featuresEn);
  } else {
    block = block.replace(
      /"features": \[[\s\S]*?\],/,
      (m) => `${m}\n    "featuresEn": ${escTsArray(patch.featuresEn)},`
    );
  }

  setString('image', patch.image);
  setString('status', patch.status);
  setString('statusLabel', patch.statusLabel);

  if (patch.media?.length) {
    const mediaVal = `[\n${patch.media.map((u) => `      ${escTsString(u)}`).join(',\n')}\n    ]`;
    if (/"media":/.test(block)) {
      block = block.replace(/"media": \[[\s\S]*?\]/, `"media": ${mediaVal}`);
    } else {
      block = block.replace(/"image": [^\n]+\n/, (m) => `${m}    "media": ${mediaVal},\n`);
    }
  } else if (/"media":/.test(block)) {
    block = block.replace(/"media": \[[\s\S]*?\],?\n?/, '');
  }

  return { src: src.slice(0, blockStart) + block + src.slice(blockEnd), ok: true };
}

async function main() {
  const apiKey = loadEnv();
  if (!apiKey) {
    console.error('KEYHUB_API_KEY missing in .env.local');
    process.exit(1);
  }

  const products = loadSnapshot();
  const byName = new Map(products.map((p) => [p.name, p]));
  const { cheats } = loadCheats();

  const report = { synced: [], skipped: [], errors: [] };
  let cheatsSrc = apply ? fs.readFileSync(path.join(root, 'src/data/cheats.ts'), 'utf8') : '';

  for (const cheat of cheats) {
    const base = byName.get(cheat.titleEn);
    if (!base) {
      report.skipped.push({ slug: cheat.slug, titleEn: cheat.titleEn, reason: 'no KeyHub product' });
      continue;
    }

    try {
      const detail = await fetchProductDetail(apiKey, base.id);
      const { status, statusLabel } = mapStatus(detail.operationalStatus, detail.statusLabel);
      const shortDesc = (detail.description || '').trim() || `${cheat.titleEn} on KeyHub`;
      const featuresEn = parseFeatures(detail.longDescription);
      const features = featuresEn.length ? featuresEn : [shortDesc];

      const imageFiles = (detail.images || []).slice(0, MAX_IMAGES);
      const localPaths = [];
      const publicUrls = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const ext = path.extname(file) || '.png';
        const rel = `/cheats/products/${cheat.slug}/${i === 0 ? 'hero' : `gallery-${i}`}${ext}`;
        const abs = path.join(root, 'public', rel.replace(/^\//, ''));
        const url = imageUrl(detail.id, file);

        if (apply) {
          await downloadImage(url, abs);
        }
        localPaths.push(rel);
        publicUrls.push(rel);
      }

      const patch = {
        description: shortDesc,
        descriptionEn: shortDesc,
        features,
        featuresEn,
        image: publicUrls[0] || '',
        media: publicUrls.slice(1),
        status,
        statusLabel,
      };

      report.synced.push({
        slug: cheat.slug,
        titleEn: cheat.titleEn,
        keyhubId: detail.id,
        images: publicUrls.length,
        features: features.length,
        status,
      });

      if (apply) {
        const result = patchCheatBlock(cheatsSrc, cheat.slug, patch);
        if (!result.ok) {
          report.errors.push({ slug: cheat.slug, error: 'patch failed' });
        } else {
          cheatsSrc = result.src;
        }
      }

      await new Promise((r) => setTimeout(r, 2200));
    } catch (e) {
      report.errors.push({ slug: cheat.slug, titleEn: cheat.titleEn, error: String(e) });
    }
  }

  const reportPath = path.join(__dirname, 'content-sync-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`Synced: ${report.synced.length} | Skipped: ${report.skipped.length} | Errors: ${report.errors.length}`);
  if (report.synced[0]) {
    console.log('Sample:', report.synced[0]);
  }
  console.log(`Report: ${path.relative(root, reportPath)}`);
  if (apply && cheatsSrc) {
    fs.writeFileSync(path.join(root, 'src/data/cheats.ts'), cheatsSrc);
    console.log('Updated src/data/cheats.ts');
  }
  if (!apply) {
    console.log('\nDry run (no file writes). Use --apply to download images and update cheats.ts');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
