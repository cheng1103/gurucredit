import { CheckCircle } from 'lucide-react';
import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { guideTopics } from '@/lib/guide-topics';
import { loanGuidesUi, staticGuides, authorityLinks } from '@/lib/content/listings/loan-guides';

export default async function LoanGuidesPage() {
  const language = await resolveRequestLanguage();
  const t = loanGuidesUi[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/loan-guides`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
        ]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: '/' }, { label: t.breadcrumbLoanGuides }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{t.guidesTitle}</h2>
          <CardGrid columns={3}>
            {staticGuides.map((guide) => (
              <ListingCard
                key={guide.href}
                href={guide.href}
                title={language === 'ms' ? guide.titleMs : guide.title}
                description={language === 'ms' ? guide.descriptionMs : guide.description}
                cta={t.readGuide}
              />
            ))}
          </CardGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{t.topicsTitle}</h2>
          <CardGrid columns={3}>
            {guideTopics.map((topic) => (
              <ListingCard
                key={topic.slug}
                href={`/loan-guides/topics/${topic.slug}`}
                title={language === 'ms' ? topic.titleMs : topic.title}
                description={language === 'ms' ? topic.descriptionMs : topic.description}
                cta={t.readGuide}
              />
            ))}
          </CardGrid>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t.highlightsTitle}</h2>
            <ul className="grid gap-3">
              {t.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-foreground-muted">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t.authorityTitle}</h2>
            <CardGrid columns={2}>
              {authorityLinks.map((item) => (
                <ListingCard
                  key={item.href}
                  href={item.href}
                  title={language === 'ms' ? item.titleMs : item.title}
                  description={language === 'ms' ? item.descriptionMs : item.description}
                  cta={t.openLabel}
                />
              ))}
            </CardGrid>
          </div>
        </section>
      </ListingShell>
    </>
  );
}
