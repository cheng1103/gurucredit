import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskPhone(phone?: string | null) {
  if (!phone) return '-';
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length <= 4) return phone;
  return `****${digits.slice(-4)}`;
}

export function maskIc(icNumber?: string | null) {
  if (!icNumber) return '-';
  const trimmed = icNumber.replace(/\s+/g, '');
  if (trimmed.length <= 4) return trimmed;
  return `${'*'.repeat(trimmed.length - 4)}${trimmed.slice(-4)}`;
}
