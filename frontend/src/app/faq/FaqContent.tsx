'use client';

import { useState } from 'react';
import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { FilterBar, EmptyState } from '@/components/layout';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { faqUi, faqItems } from '@/lib/content/listings/faq';

type FaqContentProps = {
  language: Language;
};

export default function FaqContent({ language }: FaqContentProps) {
  const t = faqUi[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'services', label: t.categories.services },
    { id: 'process', label: t.categories.process },
    { id: 'payment', label: t.categories.payment },
    { id: 'security', label: t.categories.security },
  ];

  const localizedFaqs = faqItems.map((item) => ({
    category: item.category,
    question: language === 'ms' ? item.questionMs : item.question,
    answer: language === 'ms' ? item.answerMs : item.answer,
  }));

  const q = searchQuery.trim().toLowerCase();

  const filteredFaqs = localizedFaqs.filter((faq) => {
    const matchesSearch = q === '' || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          onSelect={setSelectedCategory}
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

        {filteredFaqs.length > 0 ? (
          <FaqAccordion items={filteredFaqs} className="mb-16" />
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
