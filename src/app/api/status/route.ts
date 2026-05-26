import { NextResponse } from 'next/server';
import {
  buildStatusPayload,
  fetchKeyHubProducts,
  keyhubProductsByName,
} from '@/lib/keyhub-status';

export const revalidate = 60;

export async function GET() {
  const apiKey = process.env.KEYHUB_API_KEY?.trim();

  try {
    if (apiKey) {
      const products = await fetchKeyHubProducts(apiKey);
      const byName = keyhubProductsByName(products);
      const payload = buildStatusPayload(byName);
      return NextResponse.json(payload, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    }
  } catch (err) {
    console.error('[api/status] KeyHub fetch failed:', err);
  }

  const fallback = buildStatusPayload(null);
  return NextResponse.json(
    { ...fallback, source: 'local' as const },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    }
  );
}
