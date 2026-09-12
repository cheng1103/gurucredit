'use client';

import { type ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import type { Language } from '@/lib/i18n/translations';

export function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  return <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>;
}
