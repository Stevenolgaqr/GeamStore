import { writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Register ts via dynamic import - use compiled approach
const { execSync } = await import('child_process');
const output = execSync('npx --yes tsx -e "import { cheats } from \'./src/data/cheats.ts\'; console.log(JSON.stringify(cheats.map(c => ({ id: c.id, slug: c.slug, game: c.game, gameEn: c.gameEn, title: c.title, titleEn: c.titleEn, description: c.description, descriptionEn: c.descriptionEn, status: c.status, statusLabel: c.statusLabel, tag: c.tag, features: c.features, featuresEn: c.featuresEn, plans: c.plans, image: c.image, gameIcon: c.gameIcon, category: c.category, isFeatured: c.isFeatured, reviews: c.reviews, rating: c.rating }))))"', {
  cwd: new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});

const catalog = JSON.parse(output.trim());

writeFileSync(
  new URL('../src/data/cheats-catalog.ts', import.meta.url),
  `import type { Cheat } from './cheats';

/** Lightweight catalog for client bundles */
export const cheatCatalog: Cheat[] = ${JSON.stringify(catalog, null, 2)} as Cheat[];

export function getCatalogCheatBySlug(slug: string): Cheat | undefined {
  return cheatCatalog.find((c) => c.slug === slug);
}
`
);

console.log(`Generated cheats-catalog.ts with ${catalog.length} items`);
