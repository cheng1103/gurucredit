import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const sizes = {
  default: 'max-w-[1120px]',
  prose: 'max-w-[680px]',
  wide: 'max-w-[1280px]',
} as const;

export function Container({
  size = 'default',
  className,
  children,
}: {
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
