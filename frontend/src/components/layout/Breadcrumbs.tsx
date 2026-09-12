import { ChevronRight } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs text-foreground-subtle', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="size-3" aria-hidden="true" /> : null}
              {item.href && !isLast ? (
                <LocaleLink href={item.href} className="transition-colors hover:text-foreground">{item.label}</LocaleLink>
              ) : (
                <span className={cn(isLast && 'font-medium text-foreground')} aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
