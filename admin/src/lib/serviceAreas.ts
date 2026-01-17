const SERVICE_AREA_CODES = [
  'MY-01',
  'MY-02',
  'MY-03',
  'MY-04',
  'MY-05',
  'MY-06',
  'MY-07',
  'MY-08',
  'MY-09',
  'MY-10',
  'MY-11',
  'MY-12',
  'MY-13',
  'MY-14',
  'MY-15',
  'MY-16',
] as const;

type ServiceAreaCode = (typeof SERVICE_AREA_CODES)[number];

const SERVICE_AREA_LABELS: Record<ServiceAreaCode, string> = {
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

export const SERVICE_AREA_FILTERS = [
  { value: 'all', label: 'All areas' },
  ...SERVICE_AREA_CODES.map((code) => ({
    value: code,
    label: SERVICE_AREA_LABELS[code],
  })),
];

const isServiceAreaCode = (value: string): value is ServiceAreaCode =>
  (SERVICE_AREA_CODES as readonly string[]).includes(value);

export const formatServiceArea = (code?: string | null) => {
  if (!code) {
    return '-';
  }
  return isServiceAreaCode(code) ? SERVICE_AREA_LABELS[code] : code;
};
