import { NextResponse } from 'next/server';
import { getRecentPurchases, isPurchaseFeedAvailable } from '@/lib/purchaseFeed';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isPurchaseFeedAvailable()) {
    return NextResponse.json([]);
  }
  const events = await getRecentPurchases(10);
  return NextResponse.json(events);
}
