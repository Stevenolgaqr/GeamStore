import { isKvConfigured, kvLpush, kvLrange, kvLtrim } from '@/lib/kv';

export interface PurchaseEvent {
  id: string;
  productName: string;
  game?: string;
  purchasedAt: string;
}

const KV_KEY = 'nova:purchases';
const MAX_EVENTS = 30;

/** In-memory fallback for local dev when KV is not configured. */
const devEvents: PurchaseEvent[] = [];

function isDevMemoryFallback(): boolean {
  return process.env.NODE_ENV !== 'production' && !isKvConfigured();
}

export function isPurchaseFeedAvailable(): boolean {
  return isKvConfigured() || isDevMemoryFallback();
}

export async function addPurchaseEvent(
  event: Omit<PurchaseEvent, 'id'>
): Promise<PurchaseEvent | null> {
  const entry: PurchaseEvent = {
    ...event,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };

  if (isKvConfigured()) {
    const pushed = await kvLpush(KV_KEY, JSON.stringify(entry));
    if (pushed) {
      await kvLtrim(KV_KEY, 0, MAX_EVENTS - 1);
      return entry;
    }
    return null;
  }

  if (isDevMemoryFallback()) {
    devEvents.unshift(entry);
    if (devEvents.length > MAX_EVENTS) devEvents.length = MAX_EVENTS;
    return entry;
  }

  return null;
}

export async function getRecentPurchases(limit = 10): Promise<PurchaseEvent[]> {
  if (isKvConfigured()) {
    const raw = await kvLrange(KV_KEY, 0, limit - 1);
    const events: PurchaseEvent[] = [];
    for (const item of raw) {
      try {
        events.push(JSON.parse(item) as PurchaseEvent);
      } catch {
        /* skip corrupt entries */
      }
    }
    return events;
  }

  if (isDevMemoryFallback()) {
    return devEvents.slice(0, limit);
  }

  return [];
}
