import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const tones = {
  default: 'bg-background text-foreground',
  alt: 'bg-surface-alt text-foreground',
  inverse: 'bg-inverse text-inverse-foreground',
} as const;

export function Section({
  tone = 'default',
  compact = false,
  className,
  children,
  ...props
}: ComponentProps<'section'> & {
  tone?: keyof typeof tones;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        tones[tone],
        compact ? 'py-10 lg:py-16' : 'py-16 lg:py-24',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
