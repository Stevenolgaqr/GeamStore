import { cheatCatalog } from '@/data/cheats-catalog';
import type { Cheat } from '@/data/cheats';

export function getRelatedCheats(cheat: Cheat, limit = 4): Cheat[] {
  return cheatCatalog
    .filter(
      (c) =>
        c.slug !== cheat.slug &&
        c.category === cheat.category &&
        c.status === 'undetected'
    )
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, limit);
}
