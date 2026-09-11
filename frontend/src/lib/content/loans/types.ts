import type { Language } from '@/lib/i18n/translations';

export type LoanProductContent = {
  eyebrow: string;
  title: string;
  lede: string;
  stats: { value: string; label: string }[];
  /** Emergency only: top-of-page urgency callout. */
  urgentBanner?: { title: string; body: string };
  /** Emergency only: situations grid (6 cards). */
  situations?: { title: string; items: { title: string; description: string }[] };
  benefits?: { title: string; items: { title: string; description: string }[] };
  comparison?: {
    title: string;
    before: {
      title: string;
      items: { name: string; rate: string; payment: string }[];
      totalLabel: string;
      total: string;
    };
    after: { title: string; rate: string; payment: string; savingsLabel: string; savings: string };
  };
  eligibility?: { title: string; items: string[] };
  requirements?: { title: string; items: string[] };
  documents?: { title: string; items: string[] };
  process: { title: string; subtitle?: string; steps: { title: string; description: string }[] };
  tips?: { title: string; items: string[] };
  warning?: { title: string; items: string[] };
  faq: { title: string; items: { question: string; answer: string }[] };
  trust: { title: string; description: string; items: { title: string; description: string }[] };
  cta: { title: string; description: string; primary: string; secondary: string };
};

export type LoanProductDoc = {
  slug: 'personal' | 'debt-consolidation' | 'emergency';
  path: string;
  content: Record<Language, LoanProductContent>;
};
