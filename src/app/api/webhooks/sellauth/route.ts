import { NextRequest, NextResponse } from 'next/server';
import { cheats } from '@/data/cheats';
import { sendPurchaseThankYouEmail } from '@/lib/email';
import { isWebhookEnabled } from '@/lib/features';
import { addPurchaseEvent } from '@/lib/purchaseFeed';

export const dynamic = 'force-dynamic';

function findProductSlug(productName: string): string | undefined {
  const lower = productName.toLowerCase();
  const match = cheats.find(
    (c) =>
      c.title.toLowerCase() === lower ||
      c.titleEn?.toLowerCase() === lower ||
      lower.includes(c.slug.replace(/-/g, ' '))
  );
  return match?.slug;
}

/**
 * SellAuth order webhook — configure in SellAuth dashboard.
 * Expects JSON with product name; shape may vary — we normalize common fields.
 */
export async function POST(request: NextRequest) {
  if (!isWebhookEnabled()) {
    return NextResponse.json({ ok: false, reason: 'webhook_disabled' }, { status: 404 });
  }

  const secret = process.env.SELLAUTH_WEBHOOK_SECRET!;

  const header = request.headers.get('x-sellauth-secret');
  if (header !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const productName =
    (body.product_name as string) ||
    (body.productName as string) ||
    ((body.product as Record<string, string>)?.name) ||
    (body.title as string) ||
    'Nova Store product';

  const game =
    (body.game as string) ||
    (body.category as string) ||
    undefined;

  const email =
    (body.email as string) ||
    (body.customer_email as string) ||
    ((body.customer as Record<string, string>)?.email);

  const slug = findProductSlug(productName);

  await addPurchaseEvent({
    productName,
    game,
    purchasedAt: new Date().toISOString(),
  });

  if (email) {
    await sendPurchaseThankYouEmail({
      to: email,
      productName,
      slug,
    });
  }

  return NextResponse.json({ ok: true, slug: slug ?? null, emailed: !!email });
}
