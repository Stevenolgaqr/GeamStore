import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPost } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/site';
import styles from '../blog.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      url: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Nova Store' },
    publisher: {
      '@type': 'Organization',
      name: 'Nova Store',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/nova-store-logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <Link href="/blog" className={styles.backLink}>
        ← Back to blog
      </Link>
      <article className={styles.article}>
        <p className={styles.category}>{post.category}</p>
        <h1 className={styles.articleTitle}>{post.title}</h1>
        <p className={styles.articleMeta}>
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </p>
        <div className={styles.body}>{post.body}</div>
      </article>
    </div>
  );
}
