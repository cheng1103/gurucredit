import type { Language } from '@/lib/i18n/translations';

export type GuideSection =
  | { kind: 'paragraphs'; id: string; heading: string; paragraphs: string[] }
  | { kind: 'steps'; id: string; heading: string; intro?: string; steps: { title: string; description: string }[] }
  | { kind: 'checklist'; id: string; heading: string; items: string[] }
  | { kind: 'warnings'; id: string; heading: string; items: string[] };

export type GuideContent = {
  eyebrow: string;
  title: string;
  lede: string;
  stats?: { label: string; value: string }[];
  sections: GuideSection[];
  faqs?: { question: string; answer: string }[];
  related?: { title: string; href: string }[];
  howTo?: { name: string; description?: string; steps: { name: string; text: string }[] };
};

export type GuideDoc = { slug: string; path: string; breadcrumbLabel: string; section: 'guides' | 'editorial'; content: Record<Language, GuideContent> };
