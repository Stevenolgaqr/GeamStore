import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cheats } from '@/data/cheats';
import { gameImages } from '@/data/cheats-meta';
import JsonLd from '@/components/JsonLd';
import GameLandingClient from './GameLandingClient';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const categories = [...new Set(cheats.map((c) => c.category))];
  return categories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sample = cheats.find((c) => c.category === slug);
  if (!sample) return { title: 'Game Not Found' };

  const gameName = sample.gameEn || sample.game;
  const title = `${gameName} Cheats — Undetected Enhancements`;
  const description = `Shop ${gameName} cheats with live status, instant delivery, and setup guides. ${cheats.filter((c) => c.category === slug).length}+ programs available.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/games/${slug}` },
    openGraph: {
      title: `${title} | Nova Store`,
      description,
      url: `${SITE_URL}/games/${slug}`,
      images: gameImages[slug] ? [{ url: gameImages[slug] }] : undefined,
    },
  };
}

export default async function GameLandingPage({ params }: Props) {
  const { slug } = await params;
  const products = cheats.filter((c) => c.category === slug);
  if (products.length === 0) notFound();

  const sample = products[0];
  const gameName = sample.gameEn || sample.game;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${gameName} Cheats`,
    description: `Nova Store catalog for ${gameName}`,
    url: `${SITE_URL}/games/${slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <GameLandingClient
        category={slug}
        gameName={gameName}
        gameNameAr={sample.game}
        products={products}
        imageUrl={gameImages[slug]}
      />
    </>
  );
}
