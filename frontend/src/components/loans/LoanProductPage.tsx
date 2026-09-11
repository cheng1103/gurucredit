import { AlertTriangle, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { PageHeader, Section, Container, SectionHeader, Stat, ClosingCta } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { TrustPanel } from '@/components/TrustPanel';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import type { LoanProductDoc, LoanProductContent } from '@/lib/content/loans/types';

const ui = {
  en: { home: 'Home', loans: 'Loans', guidedPlan: 'Guided plan rate', monthlyPayment: 'Estimated monthly payment' },
  ms: { home: 'Utama', loans: 'Pinjaman', guidedPlan: 'Kadar pelan berpandu', monthlyPayment: 'Anggaran bayaran bulanan' },
} as const;

function ChecklistCard({ block }: { block: { title: string; items: string[] } }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="font-semibold text-foreground">{block.title}</h3>
      <ul className="mt-4 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LoanProductPage({ doc, language }: { doc: LoanProductDoc; language: Language }) {
  const c: LoanProductContent = doc.content[language];
  const t = ui[language];

  const checklistBlocks = [c.eligibility, c.requirements, c.documents].filter(
    (block): block is { title: string; items: string[] } => Boolean(block),
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: t.home, href: PATHS.home },
          { label: t.loans, href: PATHS.services },
          { label: c.title },
        ]}
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        actions={
          <>
            <Button asChild size="lg">
              <LocaleLink href={PATHS.eligibilityTest}>{c.cta.primary}</LocaleLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                {c.cta.secondary}
              </a>
            </Button>
          </>
        }
      >
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {c.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </PageHeader>

      {c.urgentBanner ? (
        <Section compact tone="alt">
          <Container>
            <div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-5">
              <AlertTriangle className="size-5 shrink-0 text-warning" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">{c.urgentBanner.title}</p>
                <p className="mt-1 text-sm text-foreground-muted">{c.urgentBanner.body}</p>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {c.situations ? (
        <Section>
          <Container>
            <SectionHeader title={c.situations.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.situations.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {c.benefits ? (
        <Section tone="alt">
          <Container>
            <SectionHeader title={c.benefits.title} />
            <div className="grid gap-4 md:grid-cols-2">
              {c.benefits.items.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {c.comparison ? (
        <Section>
          <Container>
            <SectionHeader title={c.comparison.title} />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground">{c.comparison.before.title}</h3>
                <div className="mt-4 divide-y divide-border">
                  {c.comparison.before.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground-subtle">{item.rate}</p>
                      </div>
                      <p className="font-semibold text-foreground">{item.payment}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <p className="text-sm text-foreground-muted">{c.comparison.before.totalLabel}</p>
                  <p className="text-xl font-semibold text-foreground">{c.comparison.before.total}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-success/30 bg-success-soft p-6 text-center">
                <h3 className="font-semibold text-foreground">{c.comparison.after.title}</h3>
                <Stat
                  className="mt-6 items-center"
                  tone="success"
                  value={c.comparison.after.rate}
                  label={t.guidedPlan}
                />
                <Stat
                  className="mt-6 items-center"
                  value={c.comparison.after.payment}
                  label={t.monthlyPayment}
                />
                <div className="mt-6 rounded-xl bg-surface/70 p-4">
                  <Stat
                    className="items-center"
                    tone="success"
                    value={c.comparison.after.savings}
                    label={c.comparison.after.savingsLabel}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {checklistBlocks.length > 0 ? (
        <Section tone="alt">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              {checklistBlocks.map((block) => (
                <ChecklistCard key={block.title} block={block} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <SectionHeader title={c.process.title} lede={c.process.subtitle} />
          <ol className="grid gap-6 md:grid-cols-3">
            {c.process.steps.map((step, index) => (
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

      {c.tips ? (
        <Section compact>
          <Container>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-foreground">{c.tips.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.tips.items.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}

      {c.warning ? (
        <Section compact>
          <Container>
            <div className="rounded-2xl border border-warning/30 bg-warning-soft p-6">
              <h3 className="font-semibold text-foreground">{c.warning.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.warning.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="alt">
        <Container size="prose" className="max-w-[760px]">
          <SectionHeader title={c.faq.title} />
          <FaqAccordion items={c.faq.items} />
        </Container>
      </Section>

      <TrustPanel title={c.trust.title} description={c.trust.description} items={c.trust.items} />

      <ClosingCta language={language} title={c.cta.title} lede={c.cta.description} primaryLabel={c.cta.primary} />
    </>
  );
}
