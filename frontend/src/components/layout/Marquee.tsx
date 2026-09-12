import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function Marquee({ items, className, ariaLabel }: { items: ReactNode[]; className?: string; ariaLabel?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn('marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]', className)} aria-label={ariaLabel}>
      <div className="marquee-track gap-10">
        {doubled.map((item, i) => (<div key={i} aria-hidden={i >= items.length} className="shrink-0">{item}</div>))}
      </div>
    </div>
  );
}
