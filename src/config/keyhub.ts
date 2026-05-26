/**
 * KeyHub Status Page (portal → My Status Page)
 * Configure branding in KeyHub; set public URL here for the store embed.
 */
export const KEYHUB_STATUS_PAGE_URL =
  process.env.NEXT_PUBLIC_KEYHUB_STATUS_URL?.trim() || 'https://cheatstatus.org/odx';

/** Suggested slug if you change it in KeyHub portal */
export const KEYHUB_STATUS_PAGE_SLUG =
  process.env.NEXT_PUBLIC_KEYHUB_STATUS_SLUG?.trim() || 'odx';
