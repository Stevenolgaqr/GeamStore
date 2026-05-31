#!/usr/bin/env node
/**
 * Sync setup instructions from KeyHub Portal → src/data/instructions.ts
 *
 * KeyHub stores instructions at:
 *   GET https://keyhub.club/api/instructions          (product list)
 *   GET https://keyhub.club/api/instructions/{id}     (brand + product instructions)
 *
 * Requires portal session cookie (NOT the external API key):
 *   KEYHUB_PORTAL_COOKIE=connect.sid=...; csrf_token=...
 *
 * Usage:
 *   node scripts/fetch-keyhub-instructions.mjs --dry-run
 *   node scripts/fetch-keyhub-instructions.mjs --apply
 *   node scripts/fetch-keyhub-instructions.mjs --from-export scripts/keyhub-instructions-export.json --apply
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apply = process.argv.includes('--apply');
const fromExport = process.argv.includes('--from-export')
  ? process.argv[process.argv.indexOf('--from-export') + 1]
  : null;

function loadEnv() {
  const envPath = path.join(root, '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const env = fs.readFileSync(envPath, 'utf8');
  return {
    portalCookie: env.match(/^KEYHUB_PORTAL_COOKIE=(.+)$/m)?.[1]?.trim(),
  };
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

function combineInstructions(detail) {
  const parts = [];
  for (const item of detail.brandInstructions || []) {
    parts.push(`# ${item.title}\n\n${decodeHtmlEntities(item.content || '')}`);
  }
  for (const item of detail.productInstructions || []) {
    parts.push(`# ${item.title}\n\n${decodeHtmlEntities(item.content || '')}`);
  }
  return parts.join('\n\n---\n\n').trim();
}

async function portalFetch(cookie, pathname) {
  const res = await fetch(`https://keyhub.club${pathname}`, {
    headers: {
      Cookie: cookie,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`${pathname} → ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return res.json();
}

async function fetchFromPortal(cookie, cheats) {
  const list = await portalFetch(cookie, '/api/instructions');
  const byName = new Map((list.products || []).map((p) => [p.name, p]));
  const results = [];

  for (const cheat of cheats) {
    const kh = byName.get(cheat.titleEn);
    if (!kh) {
      results.push({
        slug: cheat.slug,
        titleEn: cheat.titleEn,
        gameEn: null,
        content: '',
        hasContent: false,
        keyhubProductId: '',
        syncedAt: new Date().toISOString(),
        error: 'not in KeyHub instructions list',
      });
      continue;
    }

    await new Promise((r) => setTimeout(r, 120));
    const detail = await portalFetch(cookie, `/api/instructions/${kh.id}`);
    const content = combineInstructions(detail);
    results.push({
      slug: cheat.slug,
      titleEn: cheat.titleEn,
      gameEn: null,
      content,
      hasContent: content.length > 0,
      keyhubProductId: kh.id,
      syncedAt: new Date().toISOString(),
    });
  }

  return results;
}

function loadFromExport(exportPath, cheats) {
  const raw = JSON.parse(fs.readFileSync(exportPath, 'utf8').replace(/^\uFEFF/, ''));
  const items = Array.isArray(raw) ? raw : raw.instructions || raw.products || [];
  const byTitle = new Map(items.map((i) => [i.titleEn, i]));

  return cheats.map((cheat) => {
    const item = byTitle.get(cheat.titleEn);
    if (!item) {
      return {
        slug: cheat.slug,
        titleEn: cheat.titleEn,
        gameEn: null,
        content: '',
        hasContent: false,
        keyhubProductId: '',
        syncedAt: new Date().toISOString(),
        error: 'missing in export',
      };
    }
    return {
      slug: cheat.slug,
      titleEn: cheat.titleEn,
      gameEn: item.gameEn ?? null,
      content: decodeHtmlEntities(item.content || ''),
      hasContent: !!(item.hasContent ?? item.content?.trim()),
      keyhubProductId: item.keyhubProductId || '',
      syncedAt: new Date().toISOString(),
      error: item.error,
    };
  });
}

function attachGameMeta(instructions, cheatsSrc) {
  return instructions.map((item) => {
    const slugMarker = `"slug": "${item.slug}"`;
    const idx = cheatsSrc.indexOf(slugMarker);
    if (idx < 0) return item;
    const block = cheatsSrc.slice(idx, idx + 600);
    const gameEn = block.match(/"gameEn": "([^"]+)"/)?.[1] ?? item.gameEn ?? '';
    const game = block.match(/"game": "([^"]+)"/)?.[1] ?? '';
    return { ...item, gameEn, game };
  });
}

function generateInstructionsTs(instructions) {
  const syncedAt = new Date().toISOString();
  const lines = [
    'export interface ProductInstruction {',
    '  slug: string;',
    '  titleEn: string;',
    '  game: string;',
    '  gameEn: string;',
    '  content: string;',
    '  hasContent: boolean;',
    '  keyhubProductId: string;',
    '  syncedAt: string;',
    '}',
    '',
    `export const instructionsSyncedAt = ${JSON.stringify(syncedAt)};`,
    '',
    'export const productInstructions: ProductInstruction[] = [',
  ];

  for (const item of instructions) {
    lines.push('  {');
    lines.push(`    slug: ${JSON.stringify(item.slug)},`);
    lines.push(`    titleEn: ${JSON.stringify(item.titleEn)},`);
    lines.push(`    game: ${JSON.stringify(item.game || '')},`);
    lines.push(`    gameEn: ${JSON.stringify(item.gameEn || '')},`);
    lines.push(`    content: ${JSON.stringify(item.content || '')},`);
    lines.push(`    hasContent: ${item.hasContent ? 'true' : 'false'},`);
    lines.push(`    keyhubProductId: ${JSON.stringify(item.keyhubProductId || '')},`);
    lines.push(`    syncedAt: ${JSON.stringify(item.syncedAt || syncedAt)},`);
    lines.push('  },');
  }

  lines.push('];', '');
  return lines.join('\n');
}

async function main() {
  const { cheats, src: cheatsSrc } = loadCheats();
  let instructions;

  if (fromExport) {
    const exportPath = path.isAbsolute(fromExport) ? fromExport : path.join(root, fromExport);
    console.log(`Loading from export: ${exportPath}`);
    instructions = loadFromExport(exportPath, cheats);
  } else {
    const { portalCookie } = loadEnv();
    if (!portalCookie) {
      console.error(
        'KEYHUB_PORTAL_COOKIE missing in .env.local\n' +
          'Log into https://keyhub.club/portal, copy your session cookie, or use:\n' +
          '  node scripts/fetch-keyhub-instructions.mjs --from-export scripts/keyhub-instructions-export.json --apply'
      );
      process.exit(1);
    }
    console.log(`Fetching ${cheats.length} products from KeyHub portal…`);
    instructions = await fetchFromPortal(portalCookie, cheats);
  }

  instructions = attachGameMeta(instructions, cheatsSrc);

  const withContent = instructions.filter((i) => i.hasContent).length;
  const missing = instructions.filter((i) => !i.hasContent);
  console.log(`Products: ${instructions.length} | with instructions: ${withContent} | empty: ${missing.length}`);
  if (missing.length) {
    console.log('Missing:', missing.map((m) => m.titleEn).join(', '));
  }

  const exportOut = path.join(__dirname, 'keyhub-instructions-export.json');
  fs.writeFileSync(exportOut, JSON.stringify({ syncedAt: new Date().toISOString(), instructions }, null, 2));
  console.log(`Export → ${path.relative(root, exportOut)}`);

  if (!apply) {
    console.log('Dry run. Use --apply to write src/data/instructions.ts');
    return;
  }

  const outPath = path.join(root, 'src/data/instructions.ts');
  fs.writeFileSync(outPath, generateInstructionsTs(instructions));
  console.log(`Wrote → ${path.relative(root, outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
