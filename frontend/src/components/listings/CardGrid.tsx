import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function CardGrid({ children, columns = 3, className }: { children: ReactNode; columns?: 2 | 3; className?: string }) {
  return <div className={cn('grid gap-4 sm:grid-cols-2 md:gap-6', columns === 3 && 'lg:grid-cols-3', className)}>{children}</div>;
}
