import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
export function ListingCard({ href, eyebrow, title, description, meta, cta }: { href: string; eyebrow?: string; title: string; description: string; meta?: ReactNode; cta: string }) {
  return (
    <article className="corner-glow relative flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h3 className="text-lg"><LocaleLink href={href} className="after:absolute after:inset-0">{title}</LocaleLink></h3>
      <p className="mt-2 flex-1 text-sm text-foreground-muted">{description}</p>
      {meta ? <div className="mt-3 text-xs text-foreground-subtle">{meta}</div> : null}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{cta}<ArrowRight className="size-4" /></span>
    </article>
  );
}
