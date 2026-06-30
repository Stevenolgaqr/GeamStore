import type { CheatPlan } from '@/data/cheats';

const DAYS_BY_LABEL: Record<string, number> = {
  'يوم واحد': 1,
  'يوم': 1,
  'أسبوع': 7,
  'اسبوع': 7,
  'شهر': 30,
  'مدى الحياة': 365,
  'مدى الحياه': 365,
};

export function planDays(plan: CheatPlan): number {
  const en = plan.labelEn?.toLowerCase() ?? '';
  if (en.includes('day')) return 1;
  if (en.includes('week')) return 7;
  if (en.includes('month')) return 30;
  if (en.includes('lifetime')) return 365;
  return DAYS_BY_LABEL[plan.label.trim()] ?? 1;
}

export function dailyRate(plan: CheatPlan): number {
  return plan.price / planDays(plan);
}

export function savingsVsDaily(plans: CheatPlan[], index: number): number | null {
  const dailyPlan = plans[0];
  if (!dailyPlan || index === 0) return null;
  const baseDaily = dailyRate(dailyPlan);
  const current = dailyRate(plans[index]);
  if (baseDaily <= current) return null;
  return Math.round((1 - current / baseDaily) * 100);
}

export function isBestValuePlan(plans: CheatPlan[], index: number): boolean {
  const savings = savingsVsDaily(plans, index);
  return savings !== null && savings >= 50;
}
