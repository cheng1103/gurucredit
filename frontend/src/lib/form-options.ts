export const SERVICE_AREA_CODES = ['MY-14', 'MY-10'] as const;

export type ServiceAreaCode = (typeof SERVICE_AREA_CODES)[number];

export const SERVICE_AREA_LABELS: Record<ServiceAreaCode, string> = {
  'MY-14': 'Kuala Lumpur',
  'MY-10': 'Selangor',
};

export const EMPLOYMENT_TYPES = [
  'employed',
  'self-employed',
  'business',
  'freelance',
] as const;

export const REFERRAL_SOURCES = [
  'Google Search',
  'TikTok / Social Media',
  'Friend / Referral',
  'Repeat Customer',
  'Other',
] as const;

export const CONTACT_PREFERENCES = [
  'any',
  'morning',
  'afternoon',
  'evening',
] as const;
