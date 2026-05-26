import type { CheatPlan } from '@/data/cheats';

/** Maps Arabic plan labels to translation keys */
const PLAN_LABEL_KEY_BY_AR: Record<string, string> = {
  'يوم واحد': 'plan.1day',
  'يوم': 'plan.1day',
  'أسبوع': 'plan.1week',
  'اسبوع': 'plan.1week',
  'شهر': 'plan.1month',
  'مدى الحياة': 'plan.lifetime',
  'مدى الحياه': 'plan.lifetime',
};

export function getPlanDisplayLabel(
  plan: CheatPlan,
  language: 'ar' | 'en',
  t: (key: string) => string
): string {
  if (language === 'en') {
    if (plan.labelEn) return plan.labelEn;
    const key = PLAN_LABEL_KEY_BY_AR[plan.label.trim()];
    if (key) {
      const translated = t(key);
      if (translated !== key) return translated;
    }
    return plan.label;
  }
  return plan.label;
}

export function isPlanPopular(plan: CheatPlan, index: number): boolean {
  if (plan.popular === true) return true;
  if (plan.popular === false) return false;
  return index === 1;
}
