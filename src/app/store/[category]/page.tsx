import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cheats } from '@/data/cheats';
import { SITE_URL } from '@/lib/site';
import StorePage from '../page';

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  const categories = [...new Set(cheats.map((c) => c.category))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const sample = cheats.find((c) => c.category === category);
  if (!sample) return { title: 'Category Not Found' };

  const gameName = sample.gameEn || sample.game;
  const title = `${gameName} Cheats & Enhancements`;
  const description = `Browse undetected ${gameName} enhancements. Instant delivery, live status, and setup guides.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/store/${category}` },
    openGraph: {
      title: `${title} | Nova Store`,
      description,
      url: `${SITE_URL}/store/${category}`,
    },
  };
}

export default async function StoreCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!cheats.some((c) => c.category === category)) {
    notFound();
  }

  return <StorePage initialCategory={category} />;
}
