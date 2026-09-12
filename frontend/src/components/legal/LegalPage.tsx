import { Mail, Phone, MessageCircle } from 'lucide-react';
import { PageHeader, Section, Container, Prose, TableOfContents } from '@/components/layout';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import type { LegalDoc } from '@/lib/content/legal/types';

const ui = {
  en: { home: 'Home', lastUpdated: 'Last updated', toc: 'On this page' },
  ms: { home: 'Utama', lastUpdated: 'Kemas kini terakhir', toc: 'Dalam halaman ini' },
} as const;

export function LegalPage({ doc, language }: { doc: LegalDoc; language: Language }) {
  const c = doc.content[language];
  const t = ui[language];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: t.home, href: PATHS.home }, { label: c.title }]}
        title={c.title}
        meta={<span>{t.lastUpdated} · {c.lastUpdated}</span>}
      />
      <Section>
        <Container size="wide">
          <details className="mb-8 rounded-xl border border-border bg-surface px-4 py-3 lg:hidden">
            <summary className="cursor-pointer font-semibold">{t.toc}</summary>
            <TableOfContents containerId="legal-body" title={t.toc} className="mt-3" />
          </details>
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,680px)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents containerId="legal-body" title={t.toc} className="hidden lg:block" />
            </aside>
            <Prose id="legal-body">
              {c.intro?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {c.clauses.map((clause, index) => (
                <div key={clause.id}>
                  <h2 id={clause.id}>
                    {index + 1}. {clause.title}
                  </h2>
                  {clause.paragraphs?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                  {clause.list ? (
                    <ul>
                      {clause.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <div className="not-prose mt-12 rounded-2xl border border-border p-6">
                {/* Deliberately not a heading: TableOfContents scans #legal-body for
                    h2/h3, and this card isn't one of the numbered clauses. */}
                <p className="text-lg font-semibold text-foreground">{c.contact.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{c.contact.body}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href={COMPANY.emailLink} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    <Mail className="size-4" aria-hidden="true" />
                    {COMPANY.email}
                  </a>
                  <a href={COMPANY.phoneLink} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    <Phone className="size-4" aria-hidden="true" />
                    {COMPANY.phone}
                  </a>
                  <a href={COMPANY.whatsappLink} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {COMPANY.whatsapp}
                  </a>
                </div>
              </div>
            </Prose>
          </div>
        </Container>
      </Section>
    </>
  );
}
