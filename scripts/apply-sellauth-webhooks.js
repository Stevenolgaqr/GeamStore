// Run in SellAuth product edit page console (Pricing & Stock tab) or via browser CDP
function applySellauthWebhooks(webhookUrls, redirectUrl) {
  const pricingBtn = [...document.querySelectorAll('button')].find(
    (b) => b.textContent.trim() === 'Pricing & Stock'
  );
  if (pricingBtn) pricingBtn.click();

  const setReactInput = (el, value) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    if (setter) setter.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const dynamicInputs = [...document.querySelectorAll('input')].filter(
    (i) =>
      i.placeholder === 'https://example.com' &&
      (i.closest('div')?.innerText?.includes('Dynamic Delivery') ||
        i.value.includes('keyhub.club') ||
        i.value === '' ||
        i.value.startsWith('http'))
  );

  const webhookFields = dynamicInputs.filter(
    (i, idx, arr) =>
      idx < webhookUrls.length &&
      (i.value.includes('sellauth-deliver') || !i.value || i.value.includes('keyhub'))
  );

  const urlFields = [...document.querySelectorAll('input[placeholder="https://example.com"]')];
  const deliverFields = urlFields.filter((f) => {
    const section = f.closest('div')?.parentElement?.innerText || '';
    return section.includes('Dynamic Delivery') || f.value.includes('keyhub');
  });

  const targets =
    deliverFields.length >= webhookUrls.length
      ? deliverFields.slice(0, webhookUrls.length)
      : urlFields.slice(0, webhookUrls.length);

  webhookUrls.forEach((url, i) => {
    if (targets[i]) setReactInput(targets[i], url);
  });

  if (redirectUrl) {
    const redirectFields = urlFields.filter((f) => {
      const t = f.closest('div')?.parentElement?.innerText || '';
      return t.includes('Redirect URL') && !t.includes('Dynamic Delivery');
    });
    redirectFields.forEach((f) => setReactInput(f, redirectUrl));
  }

  const dynamicRadio = document.querySelector('input[value="dynamic"]');
  if (dynamicRadio && !dynamicRadio.checked) dynamicRadio.click();

  return {
    updated: targets.length,
    urls: targets.map((t) => t.value),
  };
}
