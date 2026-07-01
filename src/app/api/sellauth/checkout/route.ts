import { NextRequest, NextResponse } from 'next/server';
import { SELLAUTH_SHOP_ID } from '@/lib/sellauth';

export const dynamic = 'force-dynamic';

interface CheckoutRequestBody {
  productId?: number;
  variantId?: number;
}

interface SellAuthCheckoutResponse {
  success?: boolean;
  invoice_url?: string;
  url?: string;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.SELLAUTH_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Checkout not configured' }, { status: 503 });
  }

  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { productId, variantId } = body;
  if (!productId || !variantId) {
    return NextResponse.json({ error: 'productId and variantId are required' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  const sellauthBody: Record<string, unknown> = {
    cart: [{ productId, variantId, quantity: 1 }],
  };
  if (ip) sellauthBody.ip = ip;
  if (userAgent) sellauthBody.user_agent = userAgent;

  let response: Response;
  try {
    response = await fetch(`https://api.sellauth.com/v1/shops/${SELLAUTH_SHOP_ID}/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(sellauthBody),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to reach SellAuth' }, { status: 502 });
  }

  let data: SellAuthCheckoutResponse;
  try {
    data = await response.json();
  } catch {
    return NextResponse.json({ error: 'Invalid response from SellAuth' }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message || data.error || 'SellAuth checkout failed' },
      { status: response.status }
    );
  }

  const url = data.invoice_url || data.url;
  if (!url) {
    return NextResponse.json({ error: 'No checkout URL returned' }, { status: 502 });
  }

  return NextResponse.json({ url });
}
