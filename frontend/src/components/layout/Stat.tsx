import { cn } from '@/lib/utils';

const tones = {
  default: 'text-foreground',
  success: 'text-success',
  primary: 'text-primary',
} as const;

export function Stat({
  value,
  label,
  tone = 'default',
  className,
}: {
  value: string;
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className={cn('font-mono text-3xl font-semibold tracking-tight tabular-nums', tones[tone])}>
        {value}
      </span>
      <span className="text-sm text-foreground-subtle">{label}</span>
    </div>
  );
}
