import { Transform } from 'class-transformer';

export const sanitizeText = (
  value: unknown,
  maxLength?: number,
  treatEmptyAsUndefined = true,
) => {
  if (typeof value !== 'string') {
    return value;
  }
  const cleaned = value
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned && treatEmptyAsUndefined) {
    return undefined;
  }

  return maxLength ? cleaned.slice(0, maxLength) : cleaned;
};

export const Sanitize = (maxLength?: number, treatEmptyAsUndefined = true) =>
  Transform(({ value }) =>
    sanitizeText(value, maxLength, treatEmptyAsUndefined),
  );
