import fs from 'fs';
import { loadCheats } from './parse-cheats.mjs';

const kh = JSON.parse(fs.readFileSync('scripts/keyhub-products-snapshot.json', 'utf8').replace(/^\uFEFF/, '')).products;
const { cheats } = loadCheats();
const unmatched = [
  'Labcore BO7 and Warzone DMA',
  'MEMEZ Valorant ESP',
  'MEMEZ Valorant FULL',
  'Zcheats All Access',
  'UnnamedTech Arena Breakout Infinite',
  'Zcheats Arma Package',
  'Predator CS2',
  'Vector Dead by Daylight',
  'Zcheats DeadSide',
  'Fellas GrayZone',
  'Gouda Spoofer',
  'Vector Spoofer',
];

for (const title of unmatched) {
  const words = title.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const hits = kh.filter((p) => {
    const n = p.name.toLowerCase();
    return words.some((w) => n.includes(w));
  });
  console.log('\n', title, '->', hits.map((h) => h.name).join(' | ') || 'NONE');
}
