import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @returns {{ slug: string, titleEn: string, plans: Array<{ label: string, price: number, duration: string, sellauthProductId?: string, sellauthVariantId?: string }> }[]} */
export function parseCheatsFile(content) {
  const cheats = [];
  const re =
    /"slug": "([^"]+)"[\s\S]*?"titleEn": "([^"]+)"[\s\S]*?"plans": \[([\s\S]*?)\]\s*,\s*"image"/g;
  let m;
  while ((m = re.exec(content))) {
    const plansBlock = m[3];
    const plans = [];
    const planRe =
      /\{\s*"label": "([^"]*)",\s*"price": ([\d.]+),[\s\S]*?"duration": "([^"]*)",([\s\S]*?)\}/g;
    let pm;
    while ((pm = planRe.exec(plansBlock))) {
      const tail = pm[4];
      const productId = tail.match(/"sellauthProductId": "(\d+)"/)?.[1];
      const variantId = tail.match(/"sellauthVariantId": "(\d+)"/)?.[1];
      plans.push({
        label: pm[1],
        price: parseFloat(pm[2]),
        duration: pm[3],
        sellauthProductId: productId,
        sellauthVariantId: variantId,
      });
    }
    cheats.push({ slug: m[1], titleEn: m[2], plans });
  }
  return cheats;
}

export function loadCheats() {
  const src = fs.readFileSync(path.join(__dirname, '../src/data/cheats.ts'), 'utf8');
  return { src, cheats: parseCheatsFile(src) };
}
