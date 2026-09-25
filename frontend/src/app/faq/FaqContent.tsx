'use client';

import { useState } from 'react';
import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { FilterBar, EmptyState } from '@/components/layout';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
// TYPE-ONLY import: pulling `faqItems`/`faqUi` in as values would ship all 42
// items in both languages to the browser. The server page (./page.tsx)
// resolves them and passes the result down — see final-review.md I4.
import type { FaqCategoryId, FaqUi } from '@/lib/content/listings/faq';

/** One FAQ already resolved to the page's display language. */
export interface LocalizedFaqItem {
  category: FaqCategoryId;
  question: string;
  answer: string;
}

type FaqContentProps = {
  language: Language;
  /** `faqUi[language]`, resolved on the server. */
  t: FaqUi;
  /** Every FAQ, unfiltered, already in the page's language. */
  faqs: LocalizedFaqItem[];
};

const CATEGORY_ORDER: FaqCategoryId[] = [
  'eligibility',
  'documents',
  'fees',
  'credit',
  'process',
  'repayment',
  'security',
];

export default function FaqContent({ language, t, faqs }: FaqContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | FaqCategoryId>('all');

  const categories = [
    { id: 'all', label: t.categories.all },
    ...CATEGORY_ORDER.map((id) => ({ id, label: t.categories[id] })),
  ];

  const q = searchQuery.trim().toLowerCase();
  const matchesSearch = (faq: { question: string; answer: string }) =>
    q === '' || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);

  // One <section>/<h2> per category, each with its own accordion — filtered
  // by the active category chip and search query, and dropped entirely when
  // it has no matches.
  const sections = CATEGORY_ORDER.filter((id) => selectedCategory === 'all' || selectedCategory === id)
    .map((id) => ({
      id,
      label: t.categories[id],
      items: faqs.filter((faq) => faq.category === id && matchesSearch(faq)),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <ListingShell
      language={language}
      breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbFaq, href: PATHS.faq }]}
      eyebrow={t.eyebrow}
      title={t.title}
      lede={t.lede}
    >
      <FilterBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        placeholder={t.searchPlaceholder}
        categories={categories}
        active={selectedCategory}
        onSelect={(id) => setSelectedCategory(id as 'all' | FaqCategoryId)}
        className="-mt-16 mb-10 lg:-mt-24"
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {t.highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border p-4">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-1 text-xs text-foreground-muted">{item.description}</p>
          </div>
        ))}
      </div>

      {sections.length > 0 ? (
        <div className="mb-16 space-y-12">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`faq-${section.id}`}>
              <h2 id={`faq-${section.id}`} className="mb-4 text-xl font-semibold">
                {section.label}
              </h2>
              <FaqAccordion items={section.items} idPrefix={`faq-${section.id}`} />
            </section>
          ))}
        </div>
      ) : (
        <EmptyState title={t.noResults.title} description={t.noResults.description} />
      )}

      <CardGrid columns={3}>
        {t.quickLinks.map((item) => (
          <ListingCard key={item.title} href={item.href} title={item.title} description={item.description} cta={item.cta} />
        ))}
      </CardGrid>
    </ListingShell>
  );
}
