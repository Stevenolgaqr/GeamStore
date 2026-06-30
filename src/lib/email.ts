type PurchaseEmailPayload = {
  to: string;
  productName: string;
  slug?: string;
};

export async function sendPurchaseThankYouEmail(payload: PurchaseEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? 'Nova Store <orders@nova-store.gg>';

  if (!apiKey || !payload.to) {
    return false;
  }

  const relatedHint = payload.slug
    ? `https://nova-store.gg/product/${payload.slug}`
    : 'https://nova-store.gg/store';

  const body = {
    from,
    to: [payload.to],
    subject: 'Thanks for your Nova Store purchase',
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your purchase of <strong>${payload.productName}</strong> is confirmed.</p>
      <p>Your license key is on your SellAuth receipt. Keep that page open until you copy it.</p>
      <p>Need help? Join our Discord: https://discord.gg/novastore</p>
      <p>Customers who love ${payload.productName} also browse: <a href="${relatedHint}">${relatedHint}</a></p>
      <p>Use code <strong>COMEBACK10</strong> on your next order within 7 days.</p>
    `,
  };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}
