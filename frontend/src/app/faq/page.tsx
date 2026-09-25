import FaqContent, { type LocalizedFaqItem } from './FaqContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { faqUi, faqItems } from '@/lib/content/listings/faq';

export default async function FaqPage() {
  const language = await resolveRequestLanguage();
  const t = faqUi[language];

  // Full, unfiltered list — emitted in the FAQPage JSON-LD below so the
  // structured data reflects every question regardless of the on-page search
  // or category filter state, and handed to the client component so it never
  // has to import the bilingual FAQ module itself (final-review.md I4).
  const faqs: LocalizedFaqItem[] = faqItems.map((item) => ({
    category: item.category,
    question: language === 'ms' ? item.questionMs : item.question,
    answer: language === 'ms' ? item.answerMs : item.answer,
  }));

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/faq`}
        title={t.title}
        description={t.lede}
        image="/images/hero-bg.jpg"
        language={language}
        breadcrumbItems={[
          { name: t.breadcrumbHome, url: SEO.url },
          { name: t.breadcrumbFaq, url: `${SEO.url}/faq` },
        ]}
        faqItems={faqs}
      />
      <FaqContent language={language} t={t} faqs={faqs} />
    </>
  );
}
