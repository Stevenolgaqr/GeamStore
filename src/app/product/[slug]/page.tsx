import type { Metadata } from 'next';
import { cheats } from '@/data/cheats';
import ProductPageClient from './ProductPageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cheat = cheats.find((c) => c.slug === slug);

  if (!cheat) {
    return { title: 'Product Not Found | Nova Store' };
  }

  const title = cheat.titleEn || cheat.title;
  const description = cheat.descriptionEn || cheat.description;
  const image = cheat.image || `/cheats/${cheat.category}.jpeg`;

  return {
    title: `${title} | Nova Store`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Nova Store`,
      description: description.slice(0, 160),
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient params={params} />;
}
