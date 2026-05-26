import React from 'react';

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
};

export function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <path
        d="M13.5 4.5L6.5 11.5L2.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStar({ filled = true, size = 14 }: { filled?: boolean; size?: number }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <path
        d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.27l-3.52 1.85.67-3.92L2.3 5.64l3.94-.57L8 1.5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStarRating({ rating, max = 5, size = 14 }: { rating: number; max?: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <IconStar key={i} filled={i < full} size={size} />
      ))}
    </span>
  );
}

export function IconAlert({ size = 20 }: { size?: number }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
