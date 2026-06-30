import { isRealYoutubeId, PLACEHOLDER_YOUTUBE_ID } from '@/lib/youtube';

/** Optional YouTube demo URLs per product slug — replace placeholders with real IDs. */
export const productVideos: Record<string, string> = {
  'ancient-rust': PLACEHOLDER_YOUTUBE_ID,
  'ancient-apex': PLACEHOLDER_YOUTUBE_ID,
  'memez-valorant-esp': PLACEHOLDER_YOUTUBE_ID,
  'arcane-marvel-rivals': PLACEHOLDER_YOUTUBE_ID,
};

export function getProductVideoId(slug: string): string | undefined {
  const id = productVideos[slug];
  return isRealYoutubeId(id) ? id : undefined;
}
