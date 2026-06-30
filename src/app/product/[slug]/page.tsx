import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cheats } from '@/data/cheats';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
} from '@/lib/productJsonLd';
import { SITE_URL } from '@/lib/site';
import ProductPageClient from './ProductPageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cheats.map((cheat) => ({ slug: cheat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cheat = cheats.find((c) => c.slug === slug);

  if (!cheat) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = cheat.titleEn || cheat.title;
  const description = cheat.descriptionEn || cheat.description;
  const image = cheat.image || `/cheats/${cheat.category}.jpeg`;
  const canonical = `${SITE_URL}/product/${slug}`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title,
      description: description.slice(0, 160),
      url: canonical,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 160),
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const cheat = cheats.find((c) => c.slug === slug);

  if (!cheat) {
    notFound();
  }

  const productJsonLd = buildProductJsonLd(cheat);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Store', url: `${SITE_URL}/store` },
    { name: cheat.gameEn || cheat.game, url: `${SITE_URL}/store/${cheat.category}` },
    { name: cheat.titleEn || cheat.title, url: `${SITE_URL}/product/${cheat.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <ProductPageClient cheat={cheat} />
    </>
  );
}
