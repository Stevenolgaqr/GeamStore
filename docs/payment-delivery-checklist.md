# Payment & instant delivery checklist (SellAuth + KeyHub)

On-demand flow: customer pays on SellAuth → SellAuth POSTs to KeyHub `sellauth-deliver` → KeyHub buys from provider → key returned to SellAuth invoice UI. GeamStore does **not** host delivery webhooks.

## Pilot products (phase 1) — configured

| Cheat slug | SellAuth product | Variants | Dynamic + ∞ stock | Per-variant webhook | Redirect |
|------------|------------------|----------|-------------------|---------------------|----------|
| `ancient-apex` | [727058](https://dash.sellauth.com/products/edit/727058) | 1179736 / 1179737 / 1179738 | Yes | Yes (`variation_id` in URL) | `https://nova-store.gg/success` |
| `arcane-apex` | [727070](https://dash.sellauth.com/products/edit/727070) | 1179774 / 1179775 / 1179776 | Yes | Yes | Yes |
| `ancient-bf6` | [727060](https://dash.sellauth.com/products/edit/727060) | 1179742 / 1179743 / 1179744 | Yes | Yes | Yes |

Mapping source: `scripts/pilot-webhooks.json`. Regenerate webhook URLs locally:

```bash
node scripts/generate-webhook-urls.mjs
```

Paste each URL into **Pricing & Stock → Dynamic Delivery URL** for the matching variant only (never one URL for all durations).

## Price alignment (retail = KeyHub USD cost + 55%, charm `.79`)

**Formula:** `50 credits = $5.00` → cost = credits × $0.10 → retail = cost × 1.55 → round up to nearest `.79` (never below +55%).

| Product | Day / 24h | Week | Month |
|---------|-----------|------|-------|
| Ancient Apex | 2.79 | 11.79 | 23.79 |
| Arcane Apex | 4.79 | 15.79 | 31.79 |
| Ancient BF6 | 3.79 | 15.79 | 31.79 |

Source of truth: [`scripts/keyhub-catalog-credits.mjs`](../scripts/keyhub-catalog-credits.mjs) (user-provided catalog). Exact `titleEn` match only — no cross-product name mapping.

Sync matched products only (18 store products without catalog entries stay unchanged until you add them):

```bash
node scripts/sync-prices.mjs --dry-run
node scripts/sync-prices.mjs --apply
node scripts/audit-all-prices.mjs
```

Optional API cross-check: `--validate-api` (requires `keyhub-products-snapshot.json`).

Products without a catalog match are **skipped** (price unchanged). See `scripts/price-sync-report.json` → `unmatched`.

**Never** run live key delivery tests unless intentional — scripts do not purchase keys during price sync.

**Security:** store `SELLAUTH_API_KEY` in `.env.local` only; rotate if exposed in chat.

## Security

- API key: KeyHub → API Access → `nova-store-sellauth` (rotate if exposed in old SellAuth URLs).
- Never commit `.env.local` or `scripts/webhook-urls.generated.json`.
- Minimum balance: keep KeyHub ≥ highest pilot month cost (150 cr) + buffer; enable API Safety alerts in KeyHub if available.

## Live test protocol (required before rollout)

For **each** pilot product × **each** duration:

1. Buy cheapest plan from the site (SellAuth embed).
2. Confirm key appears on SellAuth receipt within seconds.
3. KeyHub → **Delivery Activity** → filter Sellauth → **Delivered**.
4. Retry same SellAuth `unique_id` (or re-fire webhook) → same key (idempotent), no double charge.

Auth-only check (no delivery, no credit charge):

```bash
node scripts/test-sellauth-deliver.mjs
```

API delivery test (charges credits — use only when intentional):

```bash
node scripts/test-sellauth-deliver.mjs --live --variation var_477dcb86881b1c10dbbf73f1
```

During setup, one Ancient Apex day webhook returned **200** with a real key (KeyHub Delivery Activity → Sellauth). Finish validation with a full SellAuth checkout for each pilot product.

## Rollout template (~46 remaining products)

Work in batches of 10–15 per session.

| Step | Action |
|------|--------|
| 1 | KeyHub Sellauth Wizard → copy **one URL per variation** |
| 2 | SellAuth product → General → **Dynamic** |
| 3 | Each variant → ∞ stock + Dynamic Delivery URL + optional redirect |
| 4 | Match prices: `cheats.ts` = SellAuth = KeyHub credits |
| 5 | One test purchase per product (cheapest plan) |
| 6 | Mark row in table below |

### Rollout tracker

| cheat slug | sellauthProductId | webhooks OK | prices OK | test purchase |
|------------|-------------------|-------------|-----------|---------------|
| *(add rows from cheats.ts)* | | | | |

Priority: products with `sellauthProductId` in `src/data/cheats.ts` and highest traffic.

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Key shows wrong game/duration | Same webhook URL on all variants — fix per `variation_id` |
| Delivery failed, balance OK | Revoked API key still in SellAuth URL |
| KeyHub catalog “0 stock” | Normal for on-demand; needs provider + balance |
| SellAuth “partially_completed” | KeyHub rejected delivery — check Delivery Activity |

## Site copy

Success page (`src/app/success/page.tsx`) tells customers the key is on the **SellAuth receipt**, not email-only.
