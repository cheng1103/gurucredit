import { Badge } from '@/components/ui/badge';
import { PageHeader, Section, Container, SectionHeader, Stat, ClosingCta } from '@/components/layout';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PATHS } from '@/lib/i18n/routes';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { bankPartners, partnersContent } from '@/lib/content/partners';

const ui = { en: { home: 'Home' }, ms: { home: 'Utama' } } as const;

export default async function PartnersPage() {
  const language = await resolveRequestLanguage();
  const t = partnersContent[language];
  const u = ui[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/partners`}
        title="Bank Partners"
        description="Partner banks across Malaysia offering personal, car, home, and SME financing options."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Partners', url: `${SEO.url}/partners` },
        ]}
      />

      <PageHeader
        breadcrumbs={[{ label: u.home, href: PATHS.home }, { label: t.breadcrumbLabel }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </PageHeader>

      <Section>
        <Container>
          <SectionHeader title={t.bankGrid.title} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bankPartners.map((bank) => (
              <div key={bank.name} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground">{bank.name}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{bank.description[language]}</p>
                <div className="mt-4">
                  <Stat value={bank.minRate} label={t.bankGrid.fromRate} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {bank.products[language].map((product) => (
                    <Badge key={product} variant="secondary">{product}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeader title={t.howItWorks.title} />
          <ol className="grid gap-6 md:grid-cols-3">
            {t.howItWorks.steps.map((step, index) => (
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

      <ClosingCta
        language={language}
        title={t.cta.title}
        lede={t.cta.description}
        primaryLabel={t.cta.primary}
      />
    </>
  );
}
