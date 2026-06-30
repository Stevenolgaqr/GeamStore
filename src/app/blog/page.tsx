import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/site';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides, comparisons, and game meta updates from Nova Store.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Nova Store Blog</p>
        <h1 className={styles.title}>Guides &amp; Insights</h1>
        <p className={styles.subtitle}>
          Long-form content to help you choose the right enhancement and stay safe after patches.
        </p>
      </header>

      <div className={styles.grid}>
        {blogPosts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <p className={styles.category}>{post.category}</p>
            <h2 className={styles.cardTitle}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className={styles.cardDesc}>{post.description}</p>
            <time className={styles.date} dateTime={post.publishedAt}>
              {post.publishedAt}
            </time>
            <Link href={`/blog/${post.slug}`} className={styles.readMore}>
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
