import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader, Section, Container, SectionHeader, Stat, Prose, ClosingCta } from '@/components/layout';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { getRegion, regionSlugs, formatMYR, regionMetaLabel } from '@/lib/content/regions';
import { regionUi, regionProductLabel } from '@/lib/content/regions-ui';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PATHS } from '@/lib/i18n/routes';
import { SEO, COMPANY } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const revalidate = 3600;

export async function generateStaticParams() {
  return regionSlugs.map((region) => ({ region }));
}

type Params = Promise<{ region: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};

  const language = await resolveRequestLanguage();
  const name = region.name[language];
  const prefix = regionMetaLabel(language);

  const title =
    language === 'ms'
      ? `Perundingan Pinjaman ${name} | Analisis DSR & Padanan Bank`
      : `${name} Loan Advisory | DSR Analysis & Lender Matching`;
  const description =
    language === 'ms'
      ? `Perundingan pinjaman bebas untuk peminjam di ${name}. Analisis DSR, semakan CCRIS/CTOS dan struktur pinjaman yang sesuai dengan profil kredit anda.`
      : `Independent loan advisory for borrowers in ${name}. DSR analysis, CCRIS/CTOS review, and loan structuring based on your actual credit profile.`;

  const url = `${SEO.url}/loans/my/${region.slug}`;

  return {
    title,
    description,
    // canonical + hreflang inherited from the root layout (localeAlternates)
    openGraph: {
      title: `${prefix} ${name}`,
      description,
      url,
      locale: language === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website',
    },
    other: {
      'geo.region': region.regionCode,
      'geo.placename': name,
      'geo.position': `${region.coordinates.latitude};${region.coordinates.longitude}`,
      ICBM: `${region.coordinates.latitude}, ${region.coordinates.longitude}`,
    },
  };
}

export default async function RegionPage({ params }: { params: Params }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const language = await resolveRequestLanguage();
  const name = region.name[language];
  const ui = regionUi[language];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Loans', url: `${SEO.url}/loans` },
          { name, url: `${SEO.url}/loans/my/${region.slug}` },
        ]}
      />

      <PageHeader
        breadcrumbs={[
          { label: ui.breadcrumbHome, href: PATHS.home },
          { label: ui.breadcrumbLoans, href: PATHS.services },
          { label: name, href: PATHS.loansRegion(region.slug) },
        ]}
        eyebrow={ui.eyebrow}
        title={ui.heroTitle(name)}
        lede={region.localContext[language]}
        actions={
          <>
            <Button asChild size="lg">
              <LocaleLink href={PATHS.eligibilityTest}>{ui.ctaPrimary}</LocaleLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                {ui.ctaSecondary}
              </a>
            </Button>
          </>
        }
      >
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <Stat value={formatMYR(region.metrics.medianHouseholdIncomeMYR)} label={ui.benchmarks.income} />
          <Stat value={formatMYR(region.metrics.medianPropertyPriceMYR)} label={ui.benchmarks.property} />
          <Stat value={`${region.metrics.dsrMedianPercent}%`} label={ui.benchmarks.dsr} />
        </div>
        <p className="mt-4 text-xs text-foreground-subtle">{ui.benchmarks.source}</p>
      </PageHeader>

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={ui.affordability.eyebrow} title={ui.affordability.title(name)} />
          <Prose>
            <p>{region.affordabilityNote[language]}</p>
          </Prose>
          <div className="mt-6 flex flex-wrap gap-2">
            {region.metrics.primaryLoanProducts.map((product) => (
              <Badge key={product} variant="outline">
                {regionProductLabel(product, language)}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {region.marketTrends ? (
        <Section>
          <Container size="wide">
            <SectionHeader eyebrow={ui.marketTrends.eyebrow} title={region.marketTrends.title[language]} />
            <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
              {region.marketTrends.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-base leading-relaxed text-foreground">{bullet[language]}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {region.bankSpecialisation ? (
        <Section tone="alt">
          <Container size="wide">
            <SectionHeader
              eyebrow={ui.bankSpecialisation.eyebrow}
              title={region.bankSpecialisation.title[language]}
              lede={region.bankSpecialisation.lead[language]}
            />
            <div className="space-y-6">
              {region.bankSpecialisation.items.map((item, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-semibold text-lg text-foreground">{item.bank}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{item.strength[language]}</p>
                  {item.caveat ? (
                    <p className="mt-2 text-sm italic leading-relaxed text-warning">
                      {ui.bankSpecialisation.caveat}
                      {item.caveat[language]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <SectionHeader eyebrow={ui.lenders.eyebrow} title={ui.lenders.title(name)} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {region.lenders.map((lender) => (
              <Badge key={lender} variant="outline" className="justify-center px-4 py-3 text-sm">
                {lender}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {region.neighbourhoodGuide ? (
        <Section tone="alt">
          <Container size="wide">
            <SectionHeader eyebrow={ui.neighbourhoodGuide.eyebrow} title={region.neighbourhoodGuide.title[language]} />
            <div className="grid gap-6 md:grid-cols-2">
              {region.neighbourhoodGuide.notes.map((note, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-semibold text-base text-foreground">{note.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{note.note[language]}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {region.localCaseStudies && region.localCaseStudies.length > 0 ? (
        <Section>
          <Container size="wide">
            <SectionHeader eyebrow={ui.localCases.eyebrow} title={ui.localCases.title(name)} lede={ui.localCases.disclaimer} />
            <div className="grid gap-6 md:grid-cols-2">
              {region.localCaseStudies.map((caseItem, i) => (
                <article key={i} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <header>
                    <p className="font-semibold text-foreground">
                      {caseItem.label}, {caseItem.ageRange}
                    </p>
                  </header>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div>
                      <dt className="eyebrow mb-1">{ui.localCases.profile}</dt>
                      <dd className="text-foreground-muted">{caseItem.profile[language]}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1">{ui.localCases.challenge}</dt>
                      <dd className="text-foreground-muted">{caseItem.challenge[language]}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1">{ui.localCases.outcome}</dt>
                      <dd className="font-semibold text-success">{caseItem.outcome[language]}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {region.faqs.length > 0 ? (
        <Section tone="alt">
          <Container size="prose" className="max-w-[760px]">
            <SectionHeader eyebrow={ui.faq.eyebrow} title={ui.faq.title(name)} />
            <FaqAccordion
              items={region.faqs.map((faq) => ({ question: faq.q[language], answer: faq.a[language] }))}
            />
          </Container>
        </Section>
      ) : null}

      {region.sources && region.sources.length > 0 ? (
        <Section compact tone="alt">
          <Container size="wide">
            <p className="eyebrow mb-4">{ui.sources.eyebrow}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {region.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
                  >
                    {src.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            {region.lastReviewed || region.reviewedBy ? (
              <p className="mt-5 text-xs text-foreground-subtle">
                {region.reviewedBy ? (
                  <>
                    {ui.sources.reviewedBy} <span className="font-medium text-foreground">{region.reviewedBy}</span>
                    {region.lastReviewed ? ' · ' : null}
                  </>
                ) : null}
                {region.lastReviewed ? (
                  <>
                    {ui.sources.lastReviewed}{' '}
                    {new Date(region.lastReviewed).toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </>
                ) : null}
              </p>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <ClosingCta language={language} title={ui.closing.title(name)} lede={ui.closing.lede} primaryLabel={ui.ctaPrimary} />
    </>
  );
}
