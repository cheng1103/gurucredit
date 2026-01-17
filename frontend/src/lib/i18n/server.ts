import { headers } from 'next/headers';
import { Language } from './translations';

export const resolveRequestLanguage = async (): Promise<Language> => {
  const headerStore = await headers();
  const cookieHeader = headerStore.get('cookie');
  const cookieLang = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('gc_lang='))
    ?.split('=')[1];
  if (cookieLang === 'ms' || cookieLang === 'en') {
    return cookieLang;
  }

  const acceptLanguage = headerStore.get('accept-language');
  if (acceptLanguage) {
    const normalized = acceptLanguage.toLowerCase();
    if (normalized.startsWith('ms') || normalized.startsWith('id')) {
      return 'ms';
    }
  }

  return 'en';
};
