/**
 * Apply KeyHub webhook URLs to a SellAuth product edit page.
 * Run via browser CDP on https://dash.sellauth.com/products/edit/{productId}
 * with Pricing & Stock tab visible.
 */
export function applyProductWebhooks(webhookUrls, redirectUrl = 'https://nova-store.gg/success') {
  const pricingBtn = [...document.querySelectorAll('button')].find(
    (b) => b.textContent?.trim() === 'Pricing & Stock'
  );
  if (pricingBtn) pricingBtn.click();

  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  const inputs = [...document.querySelectorAll('input[placeholder=\"https://example.com\"]')];
  const keyhubInputs = inputs.filter((i) => i.value.includes('keyhub') || i.value.includes('sellauth-deliver'));
  const targets = keyhubInputs.length >= webhookUrls.length
    ? keyhubInputs.slice(0, webhookUrls.length)
    : inputs.filter((i) => i.placeholder === 'https://example.com').slice(0, webhookUrls.length);

  webhookUrls.forEach((url, i) => {
    if (targets[i] && setter) {
      setter.call(targets[i], url);
      targets[i].dispatchEvent(new Event('input', { bubbles: true }));
      targets[i].dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  if (redirectUrl) {
    const redirectInputs = inputs.filter((i) => {
      const section = i.closest('div')?.parentElement?.innerText || '';
      return section.includes('Redirect URL') && !section.includes('Dynamic Delivery');
    });
    redirectInputs.forEach((el) => {
      if (setter) {
        setter.call(el, redirectUrl);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  const dynamicRadio = document.querySelector('input[value=\"dynamic\"]');
  if (dynamicRadio && !dynamicRadio.checked) dynamicRadio.click();

  return targets.map((t) => t.value);
}
