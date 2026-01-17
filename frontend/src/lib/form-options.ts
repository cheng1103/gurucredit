export const SERVICE_AREA_CODES = [
  'MY-01', // Johor
  'MY-02', // Kedah
  'MY-03', // Kelantan
  'MY-04', // Melaka
  'MY-05', // Negeri Sembilan
  'MY-06', // Pahang
  'MY-07', // Penang
  'MY-08', // Perak
  'MY-09', // Perlis
  'MY-10', // Selangor
  'MY-11', // Terengganu
  'MY-12', // Sabah
  'MY-13', // Sarawak
  'MY-14', // Kuala Lumpur
  'MY-15', // Labuan
  'MY-16', // Putrajaya
] as const;

export type ServiceAreaCode = (typeof SERVICE_AREA_CODES)[number];

export const SERVICE_AREA_LABELS: Record<ServiceAreaCode, string> = {
  'MY-01': 'Johor',
  'MY-02': 'Kedah',
  'MY-03': 'Kelantan',
  'MY-04': 'Melaka',
  'MY-05': 'Negeri Sembilan',
  'MY-06': 'Pahang',
  'MY-07': 'Penang',
  'MY-08': 'Perak',
  'MY-09': 'Perlis',
  'MY-10': 'Selangor',
  'MY-11': 'Terengganu',
  'MY-12': 'Sabah',
  'MY-13': 'Sarawak',
  'MY-14': 'Kuala Lumpur',
  'MY-15': 'Labuan',
  'MY-16': 'Putrajaya',
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
