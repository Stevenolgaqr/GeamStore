'use client';

import Image from 'next/image';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export default function OptimizedImage({
  src,
  alt,
  className,
  width = 400,
  height = 225,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 33vw',
  fill = false,
}: OptimizedImageProps) {
  if (!src) return null;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
    />
  );
}
