import type { ReactNode } from 'react';
import { PageHeader } from './PageHeader';
import { Container } from './Container';
import { Section } from './Section';
import type { BreadcrumbItem } from './Breadcrumbs';
import { cn } from '@/lib/utils';

/**
 * Shared shell for form-driven pages (apply, contact, status): a PageHeader
 * (no lede — the form is the content) followed by a wide two-column layout
 * with the primary form on the left and a sticky sidebar on the right.
 */
export function FormLayout({
  breadcrumbs,
  eyebrow,
  title,
  meta,
  actions,
  sidebar,
  children,
  className,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} meta={meta} actions={actions} />
      <Section>
        <Container size="wide">
          <div className={cn('grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start', className)}>
            <div className="min-w-0">{children}</div>
            <div className="space-y-6 lg:sticky lg:top-24">{sidebar}</div>
          </div>
        </Container>
      </Section>
    </>
  );
}
