import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
export function ListingCard({ href, eyebrow, title, description, meta, cta }: { href: string; eyebrow?: string; title: string; description: string; meta?: ReactNode; cta: string }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-border-strong">
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h3 className="text-lg"><LocaleLink href={href} className="after:absolute after:inset-0">{title}</LocaleLink></h3>
      <p className="mt-2 flex-1 text-sm text-foreground-muted">{description}</p>
      {meta ? <div className="mt-3 text-xs text-foreground-subtle">{meta}</div> : null}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{cta}<ArrowRight className="size-4" /></span>
    </article>
  );
}
