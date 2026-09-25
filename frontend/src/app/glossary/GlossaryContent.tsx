'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ListingShell } from '@/components/listings';
import { FilterBar, EmptyState } from '@/components/layout';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { glossaryUi, glossaryTerms, type GlossaryTerm, type GlossaryCategoryId } from '@/lib/content/listings/glossary';

interface GlossaryContentProps {
  language: Language;
}

export default function GlossaryContent({ language }: GlossaryContentProps) {
  const t = glossaryUi[language];
  const terms = glossaryTerms[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | GlossaryCategoryId>('all');
  const [expandedTerms, setExpandedTerms] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: t.allCategories },
    ...Object.entries(t.categories).map(([id, label]) => ({ id, label })),
  ];

  // Full lookup (unfiltered by search/category) so a "related term" chip can
  // always resolve to its display name and be followed even when the target
  // term is currently filtered out of view.
  const termsBySlug = useMemo(() => {
    const map = new Map<string, GlossaryTerm>();
    terms.forEach((term) => map.set(term.slug, term));
    return map;
  }, [terms]);

  const filteredTerms = useMemo(() => {
    let list = terms;

    if (selectedCategory !== 'all') {
      list = list.filter((term) => term.category === selectedCategory);
    }

    const search = searchTerm.trim().toLowerCase();
    if (search) {
      list = list.filter(
        (term) => term.term.toLowerCase().includes(search) || term.definition.toLowerCase().includes(search),
      );
    }

    return [...list].sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, selectedCategory, searchTerm]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const toggleExpand = (slug: string) => {
    setExpandedTerms((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <ListingShell
      language={language}
      breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbGlossary, href: PATHS.glossary }]}
      title={t.title}
      lede={t.lede}
    >
      <FilterBar
        query={searchTerm}
        onQueryChange={setSearchTerm}
        placeholder={t.searchPlaceholder}
        categories={categories}
        active={selectedCategory}
        onSelect={(id) => setSelectedCategory(id as 'all' | GlossaryCategoryId)}
        className="-mt-16 mb-10 lg:-mt-24"
      />

      {Object.keys(groupedTerms).length > 0 ? (
        <div className="mb-12 flex flex-wrap justify-center gap-2 rounded-2xl border border-border p-4">
          {Object.keys(groupedTerms).map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex size-9 items-center justify-center rounded-full border border-border text-sm font-medium transition-colors hover:border-border-strong hover:text-foreground"
            >
              {letter}
            </a>
          ))}
        </div>
      ) : null}

      {filteredTerms.length === 0 ? (
        <EmptyState title={t.noResults} />
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedTerms).map(([letter, letterTerms]) => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{letter}</div>
                <div className="h-px flex-1 bg-border" />
              </div>
              <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
                {letterTerms.map((term) => {
                  const isExpanded = expandedTerms[term.slug];
                  const hasExtra = Boolean((term.related && term.related.length > 0) || term.example);
                  return (
                    // A <dl> may only contain dt/dd pairs, optionally grouped in a
                    // <div> whose own direct children are themselves just dt/dd —
                    // so the toggle button lives inside <dt> and the expandable
                    // example/related content lives inside <dd>, keeping this
                    // wrapper's direct children to exactly [dt, dd].
                    <div key={term.slug} id={term.slug} className="scroll-mt-24 p-5 lg:p-6">
                      <dt className="flex items-start justify-between gap-4">
                        <span className="flex items-center gap-2 text-lg font-semibold">
                          {term.term}
                          <span className="eyebrow rounded-full border border-border px-2 py-0.5 text-xs font-normal normal-case tracking-normal">
                            {t.categories[term.category]}
                          </span>
                        </span>
                        {hasExtra ? (
                          <button
                            type="button"
                            onClick={() => toggleExpand(term.slug)}
                            aria-expanded={isExpanded}
                            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
                          >
                            {isExpanded ? t.showLess : t.showMore}
                            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                          </button>
                        ) : null}
                      </dt>
                      <dd className="mt-2 text-sm text-foreground-muted">
                        {term.definition}
                        {isExpanded ? (
                          <div className="mt-4 space-y-4 border-t border-border pt-4">
                            {term.example ? (
                              <div>
                                <p className="mb-1 text-sm font-medium text-primary">{t.example}:</p>
                                <p className="text-sm italic text-foreground-muted">&quot;{term.example}&quot;</p>
                              </div>
                            ) : null}
                            {term.related && term.related.length > 0 ? (
                              <div>
                                <p className="mb-2 text-sm font-medium text-primary">{t.relatedTerms}:</p>
                                <div className="flex flex-wrap gap-2">
                                  {term.related.map((relSlug) => {
                                    const relTerm = termsBySlug.get(relSlug);
                                    return (
                                      <a
                                        key={relSlug}
                                        href={`#${relSlug}`}
                                        onClick={() => {
                                          setSearchTerm('');
                                          setSelectedCategory('all');
                                          requestAnimationFrame(() => {
                                            document.getElementById(relSlug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                          });
                                        }}
                                        className="rounded-full border border-border px-3 py-1 text-xs text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                                      >
                                        {relTerm?.term ?? relSlug}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      )}
    </ListingShell>
  );
}
