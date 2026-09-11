import type { Language } from '@/lib/i18n/translations';

export type LegalClause = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalContent = {
  title: string;
  lede: string;
  lastUpdated: string;
  clauses: LegalClause[];
  contact: { title: string; body: string };
};

export type LegalDoc = {
  path: string;
  content: Record<Language, LegalContent>;
};
