#!/usr/bin/env node
/**
 * Sync retail prices: manual KeyHub catalog → costUsd × 1.55 → .79 charm.
 * Updates cheats.ts + SellAuth variants by sellauthVariantId.
 * Never calls sellauth-deliver (no key purchases).
 *
 *   node scripts/sync-prices.mjs --dry-run
 *   node scripts/sync-prices.mjs --apply
 *   node scripts/sync-prices.mjs --dry-run --validate-api
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  retailFromKeyhubCredits,
  costUsdFromCredits,
  rawRetailFromCredits,
  planDurationDays,
  KEYHUB_MARKUP,
  CREDIT_USD,
} from './pricing-core.mjs';
import { KEYHUB_CREDITS, SKIP_TITLE_EN, creditsForPlan } from './keyhub-catalog-credits.mjs';
import { loadCheats } from './parse-cheats.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apply = process.argv.includes('--apply');
const validateApi = process.argv.includes('--validate-api');

/** Plans skipped even when product is in catalog */
const SKIP_VARIANT_IDS = new Set([
  '1179746', // Ancient COD 3 Days — not in user catalog
  '1179749', // Ancient COD duplicate 30d month
]);

function loadEnv() {
  const envPath = path.join(root, '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const env = fs.readFileSync(envPath, 'utf8');
  const shopId = env.match(/^SELLAUTH_SHOP_ID=(.+)$/m)?.[1]?.trim();
  let sellauth = env.match(/^SELLAUTH_API_KEY=(.+)$/m)?.[1]?.trim();
  if (!sellauth) {
    const legacy = env.match(/^SELLAUTH_API_TOKEN=(.+)$/m)?.[1]?.trim();
    sellauth = legacy?.includes('|') ? legacy.split('|').slice(1).join('|') : legacy;
  }
  return { shopId, sellauth };
}

function loadPlanOverrides() {
  const p = path.join(__dirname, 'plan-credits-override.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const map = new Map();
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    map.set(String(k), Number(v));
  }
  return map;
}

function loadKeyhubSnapshot() {
  const snap = path.join(__dirname, 'keyhub-products-snapshot.json');
  if (!fs.existsSync(snap)) return null;
  const data = JSON.parse(fs.readFileSync(snap, 'utf8').replace(/^\uFEFF/, ''));
  return new Map((data.products || []).map((p) => [p.name, p]));
}

function resolveCredits({ cheat, plan, days, planIndex, overrides, durationSeen }) {
  const variantId = plan.sellauthVariantId ? String(plan.sellauthVariantId) : null;
  if (variantId && overrides.has(variantId)) {
    return { credits: overrides.get(variantId), source: 'override' };
  }
  if (SKIP_VARIANT_IDS.has(variantId)) {
    return { credits: null, source: 'skip-variant' };
  }
  if (SKIP_TITLE_EN.has(cheat.titleEn)) {
    return { credits: null, source: 'deferred-product' };
  }
  const catalog = KEYHUB_CREDITS[cheat.titleEn];
  if (!catalog) {
    return { credits: null, source: 'no-catalog' };
  }
  if (days == null) {
    return { credits: null, source: 'unknown-duration' };
  }
  // Ancient COD: only first 30d month from catalog
  if (cheat.titleEn === 'Ancient COD' && days === 30) {
    const seen = durationSeen.get('30') || 0;
    durationSeen.set('30', seen + 1);
    if (seen > 0) {
      return { credits: null, source: 'duplicate-duration' };
    }
  }
  const credits = creditsForPlan(cheat.titleEn, days);
  if (credits == null) {
    return { credits: null, source: 'no-duration-row' };
  }
  return { credits, source: 'catalog' };
}

function buildPricePlan({ overrides, khByName }) {
  const { cheats } = loadCheats();
  const report = {
    generatedAt: new Date().toISOString(),
    formula: { CREDIT_USD, KEYHUB_MARKUP, charm: '.79' },
    rows: [],
    matched: [],
    unmatched: [],
    deferred: [],
    ambiguous: [],
    byVariant: {},
    apiWarnings: [],
  };

  const variantPrices = new Map();

  for (const cheat of cheats) {
    const durationSeen = new Map();

    cheat.plans.forEach((plan) => {
      const days = planDurationDays(plan);
      const { credits, source } = resolveCredits({
        cheat,
        plan,
        days,
        overrides,
        durationSeen,
      });

      const base = {
        slug: cheat.slug,
        titleEn: cheat.titleEn,
        label: plan.label,
        durationDays: days,
        sellauthVariantId: plan.sellauthVariantId,
        sellauthProductId: plan.sellauthProductId,
        oldPrice: plan.price,
        source,
      };

      if (credits == null) {
        const row = { ...base, keyhubCredits: null, costUsd: null, rawPlus55: null, retail: null };
        report.rows.push(row);
        if (SKIP_TITLE_EN.has(cheat.titleEn)) {
          report.deferred.push(row);
        } else {
          report.unmatched.push({ ...row, reason: source });
        }
        return;
      }

      const costUsd = costUsdFromCredits(credits);
      const rawPlus55 = rawRetailFromCredits(credits);
      const retail = retailFromKeyhubCredits(credits);

      if (validateApi && khByName) {
        const kh = khByName.get(cheat.titleEn);
        const khVar = kh?.variations?.find((v) => v.durationDays === days);
        if (khVar && khVar.priceCredits !== credits) {
          report.apiWarnings.push({
            titleEn: cheat.titleEn,
            durationDays: days,
            catalogCredits: credits,
            apiCredits: khVar.priceCredits,
          });
        }
      }

      const entry = {
        ...base,
        keyhubCredits: credits,
        costUsd,
        rawPlus55,
        retail,
      };

      report.matched.push(entry);
      report.rows.push(entry);

      if (plan.sellauthVariantId) {
        const vid = String(plan.sellauthVariantId);
        if (variantPrices.has(vid)) {
          const prev = variantPrices.get(vid);
          if (prev.retail !== retail) {
            report.ambiguous.push({ variantId: vid, prev, next: entry });
          }
        }
        variantPrices.set(vid, entry);
        report.byVariant[vid] = entry;
      }
    });
  }

  return { report, variantPrices };
}

function applyCheatsTs(variantPrices) {
  let src = fs.readFileSync(path.join(root, 'src/data/cheats.ts'), 'utf8');
  let count = 0;
  for (const [variantId, entry] of variantPrices) {
    const priceStr = entry.retail % 1 === 0 ? String(entry.retail) : entry.retail.toFixed(2);
    const re = new RegExp(
      `(\\{[^{}]*"price": )([\\d.]+)(,[^{}]*"sellauthVariantId": "${variantId}"[^{}]*\\})`
    );
    const next = src.replace(re, `$1${priceStr}$3`);
    if (next !== src) {
      src = next;
      count++;
    }
  }
  fs.writeFileSync(path.join(root, 'src/data/cheats.ts'), src);
  return count;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function productToUpdateBody(product) {
  return {
    type: product.type || 'variant',
    name: product.name,
    path: product.path || undefined,
    category_id: product.category_id ?? null,
    description: product.description ?? '',
    meta_title: product.meta_title ?? null,
    meta_description: product.meta_description ?? null,
    meta_image_id: product.meta_image_id ?? null,
    meta_twitter_card: product.meta_twitter_card ?? 'summary_large_image',
    instructions: product.instructions ?? null,
    out_of_stock_message: product.out_of_stock_message ?? null,
    currency: product.currency || 'USD',
    tax_inclusive: product.tax_inclusive ?? true,
    deliverables_type: product.deliverables_type || 'dynamic',
    group_id: product.group_id ?? null,
    image_ids: product.images?.map((i) => i.id) ?? product.image_ids ?? null,
    visibility: product.visibility || 'public',
    discord_required: !!product.discord_required,
    block_vpn: !!product.block_vpn,
    hide_stock_count: !!product.hide_stock_count,
    affiliate_percentage: product.affiliate_percentage ?? null,
    status_color: product.status_color ?? null,
    status_text: product.status_text ?? null,
    show_views_count: product.show_views_count ?? false,
    show_sales_count: product.show_sales_count ?? false,
    show_sales_notifications: product.show_sales_notifications ?? false,
    sales_count_hours: product.sales_count_hours ?? null,
    feedback_coupon_id: product.feedback_coupon_id ?? null,
    feedback_coupon_min_rating: product.feedback_coupon_min_rating ?? null,
    deliverables_label: product.deliverables_label ?? null,
    is_mandatory: product.is_mandatory ?? false,
    custom_field_ids: product.custom_fields?.map((c) => c.id) ?? product.custom_field_ids ?? null,
    product_tabs: product.product_tabs ?? [],
    product_badges: product.product_badges ?? [],
    product_addons: product.product_addons?.map((a) => a.id ?? a) ?? [],
    product_upsells: product.product_upsells?.map((u) => u.id ?? u) ?? [],
    variants: (product.variants || []).map((v) => ({
      id: v.id,
      name: v.name,
      description: v.description ?? null,
      price: v.price,
      price_slash: v.price_slash ?? null,
      quantity_min: v.quantity_min ?? null,
      quantity_max: v.quantity_max ?? null,
      volume_discounts: v.volume_discounts ?? [],
      disable_volume_discounts_if_coupon: v.disable_volume_discounts_if_coupon ?? false,
      dynamic_url: v.dynamic_url ?? null,
      redirect_url: v.redirect_url ?? null,
      stock: v.stock ?? 999999,
      instructions: v.instructions ?? null,
      disabled_payment_method_ids: v.disabled_payment_method_ids ?? null,
      order: v.order ?? 0,
    })),
  };
}

async function updateSellauthProducts(variantPrices, shopId, token) {
  const byProduct = new Map();
  for (const entry of variantPrices.values()) {
    if (!entry.sellauthProductId) continue;
    if (!byProduct.has(entry.sellauthProductId)) byProduct.set(entry.sellauthProductId, []);
    byProduct.get(entry.sellauthProductId).push(entry);
  }

  const results = { ok: [], fail: [] };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  for (const [productId, entries] of byProduct) {
    const getUrl = `https://api.sellauth.com/v1/shops/${shopId}/products/${productId}`;
    let product;
    try {
      const res = await fetch(getUrl, { headers });
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      product = await res.json();
    } catch (e) {
      results.fail.push({ productId, error: String(e) });
      await sleep(400);
      continue;
    }

    const priceByVariant = new Map(entries.map((e) => [String(e.sellauthVariantId), e.retail.toFixed(2)]));
    for (const v of product.variants || []) {
      const p = priceByVariant.get(String(v.id));
      if (p != null) v.price = p;
    }

    const body = productToUpdateBody(product);
    const putUrl = `https://api.sellauth.com/v1/shops/${shopId}/products/${productId}/update`;
    try {
      const res = await fetch(putUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      results.ok.push(productId);
    } catch (e) {
      results.fail.push({ productId, error: String(e) });
    }
    await sleep(1500);
  }
  return results;
}

async function main() {
  const overrides = loadPlanOverrides();
  const khByName = validateApi ? loadKeyhubSnapshot() : null;
  const { report, variantPrices } = buildPricePlan({ overrides, khByName });

  const reportPath = path.join(__dirname, 'price-sync-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  const priced = Object.keys(report.byVariant).length;
  console.log(`Catalog products: ${Object.keys(KEYHUB_CREDITS).length}`);
  console.log(`Plans priced (variants): ${priced}`);
  console.log(`Matched rows: ${report.matched.length}`);
  console.log(`Deferred products (18): ${report.deferred.length} plan rows`);
  console.log(`Skipped (no catalog / plan): ${report.unmatched.length}`);
  console.log(`Ambiguous: ${report.ambiguous.length}`);
  if (report.apiWarnings.length) {
    console.warn(`API credit mismatches: ${report.apiWarnings.length}`);
  }
  console.log(`Report: ${path.relative(root, reportPath)}`);

  if (report.ambiguous.length) {
    console.error('Resolve ambiguous variant price conflicts before --apply');
    process.exit(1);
  }

  if (!apply) {
    console.log('\nSample (Ancient Apex):');
    for (const e of Object.values(report.byVariant)) {
      if (e.slug === 'ancient-apex') {
        console.log(
          `  ${e.label}: ${e.keyhubCredits} cr → cost $${e.costUsd} → raw $${e.rawPlus55} → $${e.retail} (was $${e.oldPrice})`
        );
      }
    }
    console.log('\nDry run only. Use --apply to write cheats.ts and SellAuth.');
    return;
  }

  const updated = applyCheatsTs(variantPrices);
  console.log(`Updated ${updated} prices in cheats.ts`);

  const { shopId, sellauth: sellauthToken } = loadEnv();
  if (!sellauthToken || !shopId) {
    console.warn('SELLAUTH_API_KEY or SELLAUTH_SHOP_ID missing — skipped SellAuth API');
    return;
  }

  const sa = await updateSellauthProducts(variantPrices, shopId, sellauthToken);
  console.log(`SellAuth updated: ${sa.ok.length} products`);
  const hardFails = sa.fail.filter((f) => !String(f.error).includes('404'));
  if (hardFails.length) {
    console.error('SellAuth failures:', hardFails.slice(0, 8));
    process.exit(1);
  }
  if (sa.fail.length) {
    console.warn('SellAuth skipped (missing products):', sa.fail.map((f) => f.productId).join(', '));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
