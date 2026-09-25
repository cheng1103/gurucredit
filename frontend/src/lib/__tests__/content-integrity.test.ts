import { describe, it, expect } from 'vitest';
import { faqItems, faqUi, faqsFor, type FaqCategoryId } from '../content/listings/faq';
import { glossaryTerms, type GlossaryTerm } from '../content/listings/glossary';

const FAQ_CATEGORIES: FaqCategoryId[] = [
  'eligibility',
  'documents',
  'fees',
  'credit',
  'process',
  'repayment',
  'security',
];

describe('faq content integrity', () => {
  it('has at least 42 items', () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(42);
  });

  it('has at least 5 items per category', () => {
    for (const category of FAQ_CATEGORIES) {
      const count = faqItems.filter((item) => item.category === category).length;
      expect(count, `category "${category}" should have >= 5 items`).toBeGreaterThanOrEqual(5);
    }
  });

  it('only uses valid category ids', () => {
    for (const item of faqItems) {
      expect(FAQ_CATEGORIES).toContain(item.category);
    }
  });

  it('every item has all four non-empty strings', () => {
    for (const item of faqItems) {
      expect(item.question.trim().length, `question missing for "${item.question}"`).toBeGreaterThan(0);
      expect(item.questionMs.trim().length, `questionMs missing for "${item.question}"`).toBeGreaterThan(0);
      expect(item.answer.trim().length, `answer missing for "${item.question}"`).toBeGreaterThan(0);
      expect(item.answerMs.trim().length, `answerMs missing for "${item.question}"`).toBeGreaterThan(0);
    }
  });

  it('every category label exists in both languages', () => {
    for (const category of FAQ_CATEGORIES) {
      expect(faqUi.en.categories[category]).toBeTruthy();
      expect(faqUi.ms.categories[category]).toBeTruthy();
    }
  });

  it('faqsFor filters by category and respects the limit', () => {
    const result = faqsFor(['eligibility', 'documents'], 3);
    expect(result.length).toBeLessThanOrEqual(3);
    for (const item of result) {
      expect(['eligibility', 'documents']).toContain(item.category);
    }
  });
});

const GLOSSARY_CATEGORIES = ['credit', 'rates', 'products', 'process', 'legal', 'islamic', 'property', 'general'];

describe('glossary content integrity', () => {
  it('has at least 100 terms in en and ms, with matching lengths', () => {
    expect(glossaryTerms.en.length).toBeGreaterThanOrEqual(100);
    expect(glossaryTerms.ms.length).toBeGreaterThanOrEqual(100);
    expect(glossaryTerms.en.length).toBe(glossaryTerms.ms.length);
  });

  it('has unique slugs within each language', () => {
    const enSlugs = glossaryTerms.en.map((t) => t.slug);
    const msSlugs = glossaryTerms.ms.map((t) => t.slug);
    expect(new Set(enSlugs).size).toBe(enSlugs.length);
    expect(new Set(msSlugs).size).toBe(msSlugs.length);
  });

  it('has identical slug sets across en and ms', () => {
    const enSlugs = new Set(glossaryTerms.en.map((t) => t.slug));
    const msSlugs = new Set(glossaryTerms.ms.map((t) => t.slug));
    expect(enSlugs.size).toBe(msSlugs.size);
    for (const slug of enSlugs) {
      expect(msSlugs.has(slug), `ms glossary missing slug "${slug}"`).toBe(true);
    }
  });

  it('only uses valid category ids', () => {
    for (const lang of ['en', 'ms'] as const) {
      for (const term of glossaryTerms[lang]) {
        expect(GLOSSARY_CATEGORIES, `invalid category "${term.category}" on "${term.term}"`).toContain(term.category);
      }
    }
  });

  it('no term is missing an example', () => {
    for (const lang of ['en', 'ms'] as const) {
      for (const term of glossaryTerms[lang]) {
        expect(term.example?.trim().length, `"${term.term}" (${lang}) is missing an example`).toBeGreaterThan(0);
      }
    }
  });

  it('every related slug resolves to a real term in the same language', () => {
    for (const lang of ['en', 'ms'] as const) {
      const slugs = new Set(glossaryTerms[lang].map((t) => t.slug));
      for (const term of glossaryTerms[lang] as GlossaryTerm[]) {
        expect(term.related.length, `"${term.term}" (${lang}) should have 2-3 related terms`).toBeGreaterThanOrEqual(2);
        expect(term.related.length).toBeLessThanOrEqual(3);
        for (const rel of term.related) {
          expect(slugs.has(rel), `"${term.term}" (${lang}) has a dangling related slug "${rel}"`).toBe(true);
        }
      }
    }
  });
});
