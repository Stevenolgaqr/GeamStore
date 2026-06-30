export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-rust-cheats-2026',
    title: 'Best Rust Cheats in 2026: What to Look For',
    description:
      'A practical guide to choosing undetected Rust enhancements — ESP, aimbot, and HWID protection explained.',
    publishedAt: '2026-06-01',
    category: 'Guides',
    body: `Rust's anti-cheat landscape changes fast. Before buying any enhancement, check live status, update history, and whether the provider offers setup guides.

**Key features competitive players need:**
- Player ESP with distance and item filters
- Recoil control that looks human
- HWID spoofer bundled or available separately

Nova Store lists live detection status for every product and ships instant keys via SellAuth.`,
  },
  {
    slug: 'hwid-spoofer-guide',
    title: 'HWID Spoofer Guide: When You Need One',
    description:
      'Understand hardware bans and how a spoofer fits into your setup before you get back in-game.',
    publishedAt: '2026-05-15',
    category: 'Guides',
    body: `A hardware ban ties your PC identity to a blocked account. A spoofer changes the identifiers games and anti-cheats read — but it is not magic.

**Before using a spoofer:**
1. Fully uninstall conflicting software
2. Follow the provider's cleaner steps
3. Use a fresh Windows user if recommended

Browse Nova Store spoofer products with setup instructions linked from each product page.`,
  },
  {
    slug: 'valorant-esp-safety-tips',
    title: 'Valorant ESP: Safety Tips for New Users',
    description:
      'Reduce risk with sensible settings, status monitoring, and support channels when something breaks.',
    publishedAt: '2026-04-20',
    category: 'Valorant',
    body: `Valorant's Vanguard runs at kernel level. That means status pages matter more than marketing claims.

Always verify **undetected** status on our live tracker before launching. Start with minimal visuals, avoid streaming overlays, and keep Discord support handy for post-patch questions.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
