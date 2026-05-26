/**
 * KeyHub credit prices from user portal catalog (#1–50).
 * Match store plans only when cheat.titleEn === key exactly.
 * Keys: durationDays 1 | 3 | 7 | 30 | 90 | 365
 */
export const CREDIT_USD = 5 / 50;

/** Products with no KeyHub API match — skip pricing. */
export const SKIP_TITLE_EN = new Set([
  'Arcane Dune: Awakening',
  'Arcane Farlight 84',
  'Arcane Hell Let Loose',
  'Arcane HighGuard',
  'Arcane HumanitZ',
  'Arcane Hunt Showdown',
  'Arcane Off The Grid',
  'Arcane PIONER',
]);

/** durationDays → credits (titleEn must match cheat.titleEn exactly) */
export const KEYHUB_CREDITS = {
  'Gouda Spoofer': { 1: 20, 7: 50, 30: 100, 365: 600 },
  'Predator CS2': { 1: 9, 7: 21, 30: 36, 90: 82 },
  'Fellas GrayZone': { 1: 30, 7: 90, 30: 240 },
  'Zcheats All Access': { 1: 42, 3: 120, 7: 240, 30: 550 },
  'UnnamedTech Valorant': { 1: 36, 7: 165, 30: 333 },
  'Vector Dead by Daylight': { 1: 19, 7: 69, 30: 134 },
  'Vector Spoofer': { 1: 15, 7: 65, 30: 100 },
  'Ancient ABI Radar': { 1: 20, 7: 100, 30: 200 },
  'Ancient Albion Online': { 1: 20, 7: 75, 30: 150 },
  'Ancient Apex': { 1: 15, 7: 75, 30: 150 },
  'Ancient Arc Raiders': { 1: 20, 7: 100, 30: 200 },
  'Ancient BF6': { 1: 20, 7: 100, 30: 200 },
  'Ancient COD': { 1: 20, 7: 65, 30: 150 },
  'Ancient Dayz': { 1: 30, 7: 150, 30: 300 },
  'Ancient EFT Chams': { 1: 15, 7: 35, 30: 75 },
  'Ancient EFT Full': { 1: 25, 7: 125, 30: 250 },
  'Ancient Fortnite': { 1: 20, 7: 100, 30: 200 },
  'Ancient Hunt Showdown': { 1: 30, 7: 100, 30: 200 },
  'Ancient Pubg': { 1: 20, 7: 100, 30: 200 },
  'Ancient R6': { 1: 15, 7: 75, 30: 150 },
  'Ancient Rust': { 1: 25, 7: 125, 30: 250 },
  'Arcane Apex': { 1: 25, 7: 100, 30: 200 },
  'Arcane Arc Raiders': { 1: 25, 7: 110, 30: 200 },
  'Arcane Ark Ascended': { 1: 30, 7: 110, 30: 240 },
  'Arcane Arma Reforger': { 1: 25, 7: 110, 30: 200 },
  'Arcane BF6': { 1: 25, 7: 110, 30: 200 },
  'Arcane CS2': { 1: 13, 7: 25, 30: 40 },
  'Arcane Dayz': { 1: 15, 7: 60, 30: 130 },
  'Arcane Dead By Daylight': { 1: 20, 7: 75, 30: 150 },
  'Arcane Deadside': { 1: 20, 7: 60, 30: 110 },
  'Arcane Dark and Darker': { 1: 13, 7: 30, 30: 60 },
};

export function creditsForPlan(titleEn, durationDays) {
  const table = KEYHUB_CREDITS[titleEn];
  if (!table || durationDays == null) return null;
  return table[durationDays] ?? null;
}
