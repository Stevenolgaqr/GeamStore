/**
 * Optional Upstash / Vercel KV REST client for server-side persistence.
 * Set KV_REST_API_URL + KV_REST_API_TOKEN (auto-injected on Vercel KV).
 */

function getKvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

export function isKvConfigured(): boolean {
  return getKvConfig() !== null;
}

async function kvCommand<T>(path: string, method: 'GET' | 'POST' = 'GET'): Promise<T | null> {
  const config = getKvConfig();
  if (!config) return null;

  try {
    const res = await fetch(`${config.url}${path}`, {
      method,
      headers: { Authorization: `Bearer ${config.token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: T };
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function kvLpush(key: string, value: string): Promise<boolean> {
  const encoded = encodeURIComponent(value);
  const result = await kvCommand<number>(`/lpush/${key}/${encoded}`, 'POST');
  return result !== null;
}

export async function kvLtrim(key: string, start: number, stop: number): Promise<void> {
  await kvCommand<number>(`/ltrim/${key}/${start}/${stop}`, 'POST');
}

export async function kvLrange(key: string, start: number, stop: number): Promise<string[]> {
  const result = await kvCommand<string[]>(`/lrange/${key}/${start}/${stop}`);
  return Array.isArray(result) ? result : [];
}
