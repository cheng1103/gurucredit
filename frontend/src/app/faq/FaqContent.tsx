'use client';

import { useState } from 'react';
import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { FilterBar, EmptyState } from '@/components/layout';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { faqUi, faqItems, type FaqCategoryId } from '@/lib/content/listings/faq';

type FaqContentProps = {
  language: Language;
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

export default function FaqContent({ language }: FaqContentProps) {
  const t = faqUi[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | FaqCategoryId>('all');

  const categories = [
    { id: 'all', label: t.categories.all },
    ...CATEGORY_ORDER.map((id) => ({ id, label: t.categories[id] })),
  ];

  // Full, unfiltered list — always emitted in the FAQPage JSON-LD below so the
  // structured data reflects every question regardless of the on-page search
  // or category filter state.
  const localizedFaqs = faqItems.map((item) => ({
    category: item.category,
    question: language === 'ms' ? item.questionMs : item.question,
    answer: language === 'ms' ? item.answerMs : item.answer,
  }));

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
      items: localizedFaqs.filter((faq) => faq.category === id && matchesSearch(faq)),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/faq`}
        title={t.title}
        description={t.lede}
        image="/images/hero-bg.jpg"
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'FAQ', url: `${SEO.url}/faq` },
        ]}
        faqItems={localizedFaqs}
      />
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
                <FaqAccordion items={section.items} />
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
    </>
  );
}
