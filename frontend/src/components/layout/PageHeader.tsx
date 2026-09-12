import type { ReactNode } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { cn } from '@/lib/utils';

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  meta,
  actions,
  align = 'left',
  size = 'default',
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  align?: 'left' | 'center';
  size?: 'default' | 'prose' | 'wide';
  children?: ReactNode;
}) {
  const centered = align === 'center';
  return (
    <Section compact className="bg-glow-band border-b border-border bg-background">
      <Container size={size} className={cn(centered && 'text-center')}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className={cn('mb-6', centered && 'justify-center [&_ol]:justify-center')} /> : null}
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className={cn('text-[34px] lg:text-5xl', centered && 'mx-auto max-w-3xl')}>{title}</h1>
        {lede ? <p className={cn('mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted', centered && 'mx-auto')}>{lede}</p> : null}
        {meta ? <div className={cn('mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-subtle', centered && 'justify-center')}>{meta}</div> : null}
        {actions ? <div className={cn('mt-6 flex flex-col gap-3 sm:flex-row', centered && 'sm:justify-center')}>{actions}</div> : null}
        {children}
      </Container>
    </Section>
  );
}
