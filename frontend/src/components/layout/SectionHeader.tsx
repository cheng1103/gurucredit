import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 lg:mb-14',
        centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-[28px] lg:text-4xl">{title}</h2>
        {lede ? <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
