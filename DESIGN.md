# Nova Store — Design System

Register: **brand** (marketing / store). See [PRODUCT.md](PRODUCT.md).

## Design read

B2C gaming cheats e-commerce, dark-tech premium, CSS Modules + tokens. Dials: variance **8**, motion **6**, density **4**.

## Color (keep existing brand — do not replace with generic AI palette)

| Token | Value | Use |
|-------|-------|-----|
| `--bg-main` | `#0B0C10` | Page background |
| `--bg-card` | `#111216` | Cards, panels |
| `--bg-elevated` | `#16181f` | Raised surfaces |
| `--primary` | `#E60000` | CTAs, accents, active nav |
| `--primary-light` | `#FF3333` | Hover highlights |
| `--text-main` | `#F0F2F8` | Body text (≥4.5:1 on bg-main) |
| `--text-muted` | `#8A8D9E` | Secondary text |
| `--accent-green` | `#10b981` | Undetected status only |

**Rules:** Red is accent — never full-page red backgrounds. No purple/indigo gradients. Tinted neutrals over pure gray.

## Typography

| Role | EN | AR |
|------|----|----|
| Display / UI | Outfit 400–900 | Tajawal 400–800 |
| Labels / chips | Rajdhani 500–700 (optional) | Tajawal |
| Prices / IDs | JetBrains Mono | JetBrains Mono |

Load via `next/font` in layout — no per-page `@import`.

## Spacing scale

`4, 8, 12, 16, 24, 32, 48, 64, 80` px — prefer multiples of 4. Section padding: `5rem 28px` desktop, `3rem 20px` mobile.

## Motion (emilkowal-animations)

| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--duration-fast` | `200ms` |
| `--duration-normal` | `280ms` |

- Default easing: **ease-out** on enter/hover
- Never `transition: all` — specify properties
- Hero: entrance once; no infinite float if `prefers-reduced-motion`
- Nav hover: ≤200ms
- Buttons: `:active scale(0.97)`

## Touch & accessibility

- Minimum touch target: **44×44px**
- `:focus-visible`: 2px `--primary` outline, 2px offset
- `prefers-reduced-motion`: disable decorative animations
- `prefers-reduced-transparency`: solid header background

## Components

- **Cards:** single border layer, status badge top-left, one primary CTA
- **Hero:** eyebrow + headline + subtitle + CTA; product image from brand assets
- **Nav:** sticky, subtle glass with solid fallback

## ui-ux-pro-max notes

Adapted for Nova: keep dark `#0B0C10` + red `#E60000` (not light/gold from generic luxury preset). Use horizontal product discovery on home. Staggered card reveal on scroll. Bento-style game grid allowed on desktop.

## Pre-delivery checklist

- [ ] No emoji as functional icons (SVG only)
- [ ] `cursor-pointer` on clickables
- [ ] Contrast 4.5:1 minimum on body text
- [ ] RTL `dir` toggles with language
- [ ] Responsive: 375, 768, 1024, 1440px
