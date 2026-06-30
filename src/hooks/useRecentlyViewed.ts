'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCatalogCheatBySlug } from '@/data/cheats-catalog';
import type { Cheat } from '@/data/cheats';

const KEY = 'nova_recent';

export function trackView(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list: string[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    const next = [slug, ...list.filter((s) => s !== slug)].slice(0, 5);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('nova-recent-update'));
  } catch {
    /* ignore storage errors */
  }
}

export function getRecentSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useRecentlyViewed(limit = 3): Cheat[] {
  const [items, setItems] = useState<Cheat[]>([]);

  const refresh = useCallback(() => {
    const slugs = getRecentSlugs().slice(0, limit);
    setItems(
      slugs
        .map((slug) => getCatalogCheatBySlug(slug))
        .filter((c): c is Cheat => !!c)
    );
  }, [limit]);

  useEffect(() => {
    refresh();
    window.addEventListener('nova-recent-update', refresh);
    return () => window.removeEventListener('nova-recent-update', refresh);
  }, [refresh]);

  return items;
}
