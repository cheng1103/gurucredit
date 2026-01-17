const SERVICE_AREA_CODES = ['MY-14', 'MY-10'] as const;

type ServiceAreaCode = (typeof SERVICE_AREA_CODES)[number];

const SERVICE_AREA_LABELS: Record<ServiceAreaCode, string> = {
  'MY-14': 'Kuala Lumpur',
  'MY-10': 'Selangor',
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
