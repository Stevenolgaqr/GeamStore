import type { MetadataRoute } from 'next';
import { cheats } from '@/data/cheats';
import { SITE_URL } from '@/lib/site';

const STATIC_ROUTES = [
  '',
  '/store',
  '/reviews',
  '/status',
  '/instructions',
  '/contact',
  '/about',
  '/blog',
  '/terms',
  '/privacy',
  '/refunds',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const categories = [...new Set(cheats.map((c) => c.category))];

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/store/${category}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const gameEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/games/${category}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = cheats.map((cheat) => ({
    url: `${SITE_URL}/product/${cheat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticEntries, ...categoryEntries, ...gameEntries, ...productEntries];
}
