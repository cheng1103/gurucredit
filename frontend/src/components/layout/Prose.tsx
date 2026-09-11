import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Prose({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={cn('prose', className)}>
      {children}
    </div>
  );
}
