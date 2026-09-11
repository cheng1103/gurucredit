import type { ReactNode } from 'react';
import { Container, Section, PageHeader, ClosingCta, type BreadcrumbItem } from '@/components/layout';
import type { Language } from '@/lib/i18n/translations';

export function ListingShell({ language, breadcrumbs, eyebrow, title, lede, children, closing = true }: { language: Language; breadcrumbs: BreadcrumbItem[]; eyebrow?: string; title: ReactNode; lede: string; children: ReactNode; closing?: boolean }) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} lede={lede} size="wide" />
      <Section>
        <Container size="wide">{children}</Container>
      </Section>
      {closing ? <ClosingCta language={language} /> : null}
    </>
  );
}
