export type ParsedStat = {
  number: number;
  suffix: string;
  prefix: string;
  decimals: number;
};

export function parseStatValue(value: string | number | null | undefined): ParsedStat {
  const v = String(value ?? '').trim();

  // percentage like "4.88%"
  if (v.includes('%')) {
    const num = parseFloat(v.replace('%', '')) || 0;
    return { number: num, suffix: '%', prefix: '', decimals: 2 };
  }

  // time like "24h" or "24j"
  if (/\d+[hj]$/i.test(v)) {
    const num = parseInt(v, 10) || 0;
    const suffix = v.slice(-1);
    return { number: num, suffix, prefix: '', decimals: 0 };
  }

  // numbers with "+" like "1,000+"
  if (v.includes('+')) {
    const num = parseInt(v.replace(/[,+]/g, ''), 10) || 0;
    return { number: num, suffix: '+', prefix: '', decimals: 0 };
  }

  // plain numbers with commas or plain numeric strings
  const num = parseInt(v.replace(/,/g, ''), 10) || 0;
  return { number: num, suffix: '', prefix: '', decimals: 0 };
}