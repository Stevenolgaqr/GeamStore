export const REFERRAL_DISCOUNT_PERCENT = 10;
export const RETURN_DISCOUNT_CODE = 'COMEBACK10';
export const RETURN_DISCOUNT_DAYS = 7;
export const REFERRAL_STORAGE_KEY = 'nova_ref_code';

export function normalizeReferralCode(code: string): string {
  return code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
}

export function storeReferralCode(code: string): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeReferralCode(code);
  if (!normalized) return;
  localStorage.setItem(REFERRAL_STORAGE_KEY, normalized);
}

export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFERRAL_STORAGE_KEY);
}

export function issueReturnDiscount(): { code: string; expiresAt: number } {
  const expiresAt = Date.now() + RETURN_DISCOUNT_DAYS * 24 * 60 * 60 * 1000;
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'nova_return_discount',
      JSON.stringify({ code: RETURN_DISCOUNT_CODE, expiresAt })
    );
  }
  return { code: RETURN_DISCOUNT_CODE, expiresAt };
}

export function getReturnDiscount(): { code: string; expiresAt: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('nova_return_discount');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code: string; expiresAt: number };
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem('nova_return_discount');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
