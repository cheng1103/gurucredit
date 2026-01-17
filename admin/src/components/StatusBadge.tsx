'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200',
  IN_REVIEW: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200',
  APPROVED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200',
  REJECTED: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200',
  DEFAULT: 'bg-muted text-muted-foreground',
};

interface StatusBadgeProps {
  status?: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) {
    return (
      <Badge variant="outline" className={className}>
        Unknown
      </Badge>
    );
  }

  const display = status.replace(/_/g, ' ').toLowerCase();
  const tone = STATUS_STYLES[status] || STATUS_STYLES.DEFAULT;

  return (
    <Badge className={cn('capitalize font-medium', tone, className)}>
      {display}
    </Badge>
  );
}
