import type { ReactNode } from 'react';
import type { Language } from '@/lib/i18n/translations';
import { Container } from './Container';
import { Section } from './Section';
import { PageHeader } from './PageHeader';
import { Prose } from './Prose';
import { TableOfContents } from './TableOfContents';
import { AsideCta } from './AsideCta';
import { ClosingCta } from './ClosingCta';
import type { BreadcrumbItem } from './Breadcrumbs';

const tocTitle = { en: 'On this page', ms: 'Dalam halaman ini' } as const;

export function ArticleLayout({
  language,
  breadcrumbs,
  eyebrow,
  title,
  lede,
  meta,
  children,
  aside,
  footer,
  closing = true,
}: {
  language: Language;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  meta?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  closing?: boolean;
}) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} lede={lede} meta={meta} size="wide" />
      <Section>
        <Container size="wide">
          <details className="mb-8 rounded-xl border border-border bg-surface px-4 py-3 lg:hidden">
            <summary className="cursor-pointer font-semibold">{tocTitle[language]}</summary>
            <TableOfContents containerId="article-body" title={tocTitle[language]} className="mt-3" />
          </details>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-16">
            <Prose id="article-body">{children}</Prose>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col gap-6">
                <TableOfContents containerId="article-body" title={tocTitle[language]} className="hidden lg:block" />
                {aside}
                <AsideCta language={language} />
              </div>
            </aside>
          </div>
          {footer ? <div className="mt-16 border-t border-border pt-12">{footer}</div> : null}
        </Container>
      </Section>
      {closing ? <ClosingCta language={language} /> : null}
    </>
  );
}
