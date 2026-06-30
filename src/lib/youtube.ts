/** Placeholder IDs — hide video sections until real content is added. */
export const PLACEHOLDER_YOUTUBE_ID = 'dQw4w9WgXcQ';

export function isRealYoutubeId(id: string | undefined): id is string {
  return !!id && id !== PLACEHOLDER_YOUTUBE_ID;
}
