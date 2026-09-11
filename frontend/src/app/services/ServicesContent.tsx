import { AlertTriangle } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { PageHeader, Section, Container, SectionHeader, Stat, ClosingCta } from '@/components/layout';
import { Language } from '@/lib/i18n/translations';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';
import { VerifyTrustCard } from '@/components/VerifyTrustCard';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import ServiceGrid from './ServiceGrid';
import { pageContent } from './data';

const ui = { en: { home: 'Home', services: 'Services' }, ms: { home: 'Utama', services: 'Perkhidmatan' } } as const;

interface Props {
  language: Language;
}

export default function ServicesContent({ language }: Props) {
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;
  const u = ui[language];
  const firstServiceId = t.services[0]?.id ?? '1';

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/services`}
        title={t.header.title}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
        ]}
        faqItems={t.faq.items}
      />

      <PageHeader
        breadcrumbs={[{ label: u.home, href: PATHS.home }, { label: u.services, href: PATHS.services }]}
        eyebrow={t.header.badge}
        title={t.header.title}
        lede={t.header.subtitle}
        actions={
          <>
            <Button asChild size="lg">
              <LocaleLink href={PATHS.servicesApply(firstServiceId)}>{t.header.primaryCta}</LocaleLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <LocaleLink href={PATHS.eligibilityTest}>{t.header.secondaryCta}</LocaleLink>
            </Button>
          </>
        }
      >
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </PageHeader>

      <Section compact>
        <Container>
          <div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-5">
            <AlertTriangle className="size-5 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="font-semibold text-foreground">
                {t.analysisBanner.title} — {t.analysisBanner.price}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">{t.analysisBanner.description}</p>
              <p className="mt-2 text-xs text-foreground-subtle">{t.header.supportNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ServiceGrid services={t.services} applyLabel={t.serviceLabels.applyNow} availabilityLabel={t.serviceLabels.availability} />
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={t.loanJourney.badge} title={t.loanJourney.title} lede={t.loanJourney.subtitle} />
          <ol className="grid gap-6 md:grid-cols-3">
            {t.loanJourney.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-surface p-5">
                <span className="font-mono text-sm font-semibold text-foreground-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container size="prose" className="max-w-[760px]">
          <SectionHeader title={t.faq.title} lede={t.faq.subtitle} />
          <FaqAccordion items={t.faq.items} />
        </Container>
      </Section>

      <TrustPanel title={trust.title} description={trust.description} items={trust.items} />

      <Section tone="alt">
        <Container size="prose" className="max-w-[820px]">
          <VerifyTrustCard language={language} />
        </Container>
      </Section>

      <ClosingCta
        language={language}
        title={t.cta.title}
        lede={t.cta.subtitle}
        primaryHref={PATHS.servicesApply(firstServiceId)}
        primaryLabel={t.cta.primary}
      />
    </>
  );
}
