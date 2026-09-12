import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
const tones = {
  blue: 'bg-primary-soft text-primary',
  green: 'bg-success-soft text-success',
  amber: 'bg-warning-soft text-warning',
  violet: 'bg-violet-soft text-violet',
} as const;
export type IconTone = keyof typeof tones;
export function IconTile({ tone = 'blue', size = 'md', className, children }: { tone?: IconTone; size?: 'sm' | 'md' | 'lg'; className?: string; children: ReactNode }) {
  const sizes = { sm: 'size-9 rounded-lg [&_svg]:size-4', md: 'size-11 rounded-xl [&_svg]:size-5', lg: 'size-14 rounded-2xl [&_svg]:size-6' };
  return <span className={cn('inline-flex shrink-0 items-center justify-center', tones[tone], sizes[size], className)}>{children}</span>;
}
export const toneCycle: IconTone[] = ['blue', 'green', 'amber', 'violet'];
