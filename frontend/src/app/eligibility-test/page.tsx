import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PageHeader, Container, Section, ClosingCta } from '@/components/layout';
import { PATHS } from '@/lib/i18n/routes';
import { EligibilityTest } from '@/components/tools/EligibilityTest';
import { eligibilityUi } from '@/lib/content/tools/eligibility';

export default async function EligibilityTestPage() {
  const language = await resolveRequestLanguage();
  const t = eligibilityUi[language];

  return (
    <>
      <PageHeader
        align="center"
        breadcrumbs={[
          { label: t.page.breadcrumbHome, href: PATHS.home },
          { label: t.page.breadcrumbCurrent, href: PATHS.eligibilityTest },
        ]}
        eyebrow={t.page.badge}
        title={
          <>
            {t.page.title} <span className="text-primary">{t.page.titleHighlight}</span>
          </>
        }
        lede={t.page.description}
      >
        <p className="mt-3 text-sm text-foreground-subtle">{t.page.note}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.valueProps.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-4 text-left">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-foreground-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <Section>
        <Container size="prose">
          <EligibilityTest language={language} />
        </Container>
      </Section>

      <ClosingCta language={language} />
    </>
  );
}
