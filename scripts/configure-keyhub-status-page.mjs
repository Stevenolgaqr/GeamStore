#!/usr/bin/env node
/**
 * Push Nova Store branding to KeyHub Status Page via API.
 * Requires API key scope: status_pages:manage
 *
 *   node scripts/configure-keyhub-status-page.mjs --dry-run
 *   node scripts/configure-keyhub-status-page.mjs --apply
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apply = process.argv.includes('--apply');

function loadEnv() {
  const envPath = path.join(root, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Missing .env.local');
    process.exit(1);
  }
  const env = fs.readFileSync(envPath, 'utf8');
  return {
    apiKey: env.match(/^KEYHUB_API_KEY=(.+)$/m)?.[1]?.trim(),
    slug: env.match(/^NEXT_PUBLIC_KEYHUB_STATUS_SLUG=(.+)$/m)?.[1]?.trim() || 'odx',
  };
}

/** Payload aligned with Nova Store DESIGN.md — adjust if KeyHub API field names differ */
const novaStatusPageConfig = (slug) => ({
  slug,
  isPublic: true,
  title: 'Nova Store — Live Status',
  description:
    'Real-time detection status for all Nova Store products. Updated automatically from our supplier.',
  branding: {
    primaryColor: '#E60000',
    backgroundColor: '#0B0C10',
    textColor: '#F0F2F8',
    mutedColor: '#8A8D9E',
  },
});

async function main() {
  const { apiKey, slug } = loadEnv();
  if (!apiKey) {
    console.error('KEYHUB_API_KEY missing in .env.local');
    process.exit(1);
  }

  const body = novaStatusPageConfig(slug);
  console.log('Target:', `https://keyhub.club/status/${slug}`);
  console.log('Payload:', JSON.stringify(body, null, 2));

  if (!apply) {
    console.log('\nDry run. Use --apply to PATCH https://keyhub.club/api/external/status');
    console.log('Requires API key scope: status_pages:manage');
    return;
  }

  const res = await fetch('https://keyhub.club/api/external/status', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error('Failed:', res.status, text);
    if (text.includes('status_pages:manage')) {
      console.error('\nAdd scope "status_pages:manage" in KeyHub → API Access, then retry.');
    }
    process.exit(1);
  }

  console.log('OK:', res.status, text);
  console.log(`\nVerify: https://keyhub.club/status/${slug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
