import type { Cheat } from '@/data/cheats';
import { SITE_URL } from '@/lib/site';

function availabilityFromStatus(status: Cheat['status']): string {
  if (status === 'undetected') return 'https://schema.org/InStock';
  if (status === 'updating') return 'https://schema.org/PreOrder';
  return 'https://schema.org/OutOfStock';
}

function resolveImageUrl(image: string): string {
  if (image.startsWith('http')) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

export function buildProductJsonLd(cheat: Cheat) {
  const image = cheat.image || `/cheats/${cheat.category}.jpeg`;
  const prices = cheat.plans.map((p) => p.price);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cheat.titleEn || cheat.title,
    description: (cheat.descriptionEn || cheat.description).slice(0, 500),
    image: resolveImageUrl(image),
    url: `${SITE_URL}/product/${cheat.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Nova Store',
    },
    category: cheat.gameEn || cheat.game,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: cheat.plans.length,
      availability: availabilityFromStatus(cheat.status),
      url: `${SITE_URL}/product/${cheat.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: cheat.rating,
      reviewCount: cheat.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nova Store',
    url: SITE_URL,
    logo: `${SITE_URL}/images/nova-store-logo.png`,
    sameAs: [
      'https://discord.gg/novastore',
      'https://www.youtube.com/@NovaStoreGG',
      'https://x.com/NovaStoreGG',
      'https://t.me/NovaStoreGG',
    ],
    foundingDate: '2020',
    description:
      'Trusted provider for undetected game enhancements. Aimbot, ESP, HWID Spoofer, DMA Firmware and more.',
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nova Store',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/store?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
