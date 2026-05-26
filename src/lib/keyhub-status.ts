import { cheats, type Cheat } from '@/data/cheats';
import type { CheatStatus } from '@/data/status';

export type KeyHubProductListItem = {
  id: string;
  name: string;
  slug?: string;
  operationalStatus?: string;
  statusLabel?: string;
  statusColor?: string;
  lastUpdatedAt?: string;
};

export type StatusProductView = {
  slug: string;
  name: string;
  nameEn: string;
  status: CheatStatus;
  statusLabel: string;
  statusColor: string;
  lastUpdatedAt: string | null;
  source: 'keyhub' | 'local';
};

export type StatusGameGroup = {
  gameKey: string;
  game: string;
  gameEn: string;
  products: StatusProductView[];
};

export type StatusPagePayload = {
  source: 'keyhub' | 'local';
  updatedAt: string;
  stats: {
    total: number;
    undetected: number;
    updating: number;
    detected: number;
    risk: number;
  };
  groups: StatusGameGroup[];
};

export function mapKeyHubToCheatStatus(
  operationalStatus?: string,
  statusLabel?: string
): { status: CheatStatus; label: string } {
  const label = (statusLabel || 'Undetected').trim();
  const lower = label.toLowerCase();
  const op = (operationalStatus || '').toLowerCase();

  if (op === 'use-at-own-risk' || lower.includes('own risk')) {
    return { status: 'risk', label };
  }
  if (lower.includes('detected') && !lower.includes('undetected')) {
    return { status: 'detected', label };
  }
  if (op === 'maintenance' || lower.includes('maintenance') || lower.includes('updating')) {
    return { status: 'updating', label };
  }
  return { status: 'undetected', label };
}

export function defaultStatusColor(status: CheatStatus): string {
  switch (status) {
    case 'undetected':
      return '#10b981';
    case 'updating':
      return '#3b82f6';
    case 'detected':
      return '#ef4444';
    case 'risk':
      return '#f59e0b';
    default:
      return '#8A8D9E';
  }
}

export async function fetchKeyHubProducts(apiKey: string): Promise<KeyHubProductListItem[]> {
  const headers = { Authorization: `Bearer ${apiKey}` };
  const all: KeyHubProductListItem[] = [];

  for (let page = 1; page <= 20; page++) {
    const url =
      page === 1
        ? 'https://keyhub.club/api/external/products'
        : `https://keyhub.club/api/external/products?page=${page}`;
    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`KeyHub API ${res.status}`);
    }
    const data = (await res.json()) as { products?: KeyHubProductListItem[] };
    const batch = data.products || [];
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < 50) break;
  }

  return all;
}

export function buildStatusPayload(
  keyhubByName: Map<string, KeyHubProductListItem> | null
): StatusPagePayload {
  const groupsMap = new Map<string, StatusGameGroup>();

  for (const cheat of cheats) {
    const gameKey = cheat.category || cheat.gameEn || cheat.game;
    const kh = keyhubByName?.get(cheat.titleEn);
    const mapped = kh
      ? mapKeyHubToCheatStatus(kh.operationalStatus, kh.statusLabel)
      : { status: cheat.status as CheatStatus, label: cheat.statusLabel };

    const product: StatusProductView = {
      slug: cheat.slug,
      name: cheat.title,
      nameEn: cheat.titleEn,
      status: mapped.status,
      statusLabel: mapped.label,
      statusColor: kh?.statusColor || defaultStatusColor(mapped.status),
      lastUpdatedAt: kh?.lastUpdatedAt ?? null,
      source: kh ? 'keyhub' : 'local',
    };

    const existing = groupsMap.get(gameKey);
    if (existing) {
      existing.products.push(product);
    } else {
      groupsMap.set(gameKey, {
        gameKey,
        game: cheat.game,
        gameEn: cheat.gameEn,
        products: [product],
      });
    }
  }

  const groups = Array.from(groupsMap.values()).sort((a, b) =>
    a.gameEn.localeCompare(b.gameEn)
  );

  groups.forEach((g) => {
    g.products.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
  });

  const allProducts = groups.flatMap((g) => g.products);
  const stats = {
    total: allProducts.length,
    undetected: allProducts.filter((p) => p.status === 'undetected').length,
    updating: allProducts.filter((p) => p.status === 'updating').length,
    detected: allProducts.filter((p) => p.status === 'detected').length,
    risk: allProducts.filter((p) => p.status === 'risk').length,
  };

  return {
    source: keyhubByName ? 'keyhub' : 'local',
    updatedAt: new Date().toISOString(),
    stats,
    groups,
  };
}

export function keyhubProductsByName(products: KeyHubProductListItem[]): Map<string, KeyHubProductListItem> {
  return new Map(products.map((p) => [p.name, p]));
}
