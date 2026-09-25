import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PageHeader, Section, Container, SectionHeader, ClosingCta } from '@/components/layout';
import { PATHS } from '@/lib/i18n/routes';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebApplicationJsonLd, WebPageJsonLd, CalculatorJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';
import { CompareTabs } from '@/components/tools/CompareTabs';
import { compareUi } from '@/lib/content/tools/compare';
import { toolMoreQuestions } from '@/lib/content/listings/faq';

export default async function ComparePage() {
  const language = await resolveRequestLanguage();
  const t = compareUi[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;
  // Resolved here, on the server, so the 42-item bilingual FAQ module never
  // enters the client graph — ToolLayout receives three ready-to-render
  // strings instead of importing `faq.ts` itself.
  const moreQuestions = toolMoreQuestions(language);

  return (
    <>
      <WebApplicationJsonLd
        name="Loan Comparison Tool"
        description="Compare Malaysian loan rates, tenures, and repayment estimates side by side."
        url={`${SEO.url}/tools/compare`}
        language={language}
      />
      <CalculatorJsonLd />
      <WebPageJsonLd
        url={`${SEO.url}/tools/compare`}
        title={t.page.title}
        description={t.page.lede}
        language={language}
        breadcrumbItems={[
          { name: t.page.breadcrumbHome, url: SEO.url },
          { name: t.page.breadcrumbTools, url: `${SEO.url}/tools` },
          { name: t.page.title, url: `${SEO.url}/tools/compare` },
        ]}
        faqItems={[...t.bank.faq.items]}
      />

      <PageHeader
        align="center"
        breadcrumbs={[
          { label: t.page.breadcrumbHome, href: PATHS.home },
          { label: t.page.breadcrumbTools, href: PATHS.tools },
          { label: t.page.breadcrumbCurrent, href: PATHS.toolsCompare },
        ]}
        eyebrow={t.page.eyebrow}
        title={t.page.title}
        lede={t.page.lede}
      />

      <Section>
        <Container size="wide">
          <CompareTabs language={language} moreQuestions={moreQuestions} />
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="prose">
          <SectionHeader title={t.bank.faq.title} lede={t.bank.faq.description} />
          <div className="space-y-4">
            {t.bank.faq.items.map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-surface p-4">
                <p className="font-semibold text-foreground">{item.question}</p>
                <p className="mt-2 text-sm text-foreground-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <TrustPanel title={trust.title} description={trust.description} items={trust.items} />

      <ClosingCta language={language} />
    </>
  );
}
