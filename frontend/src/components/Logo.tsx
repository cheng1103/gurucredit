import Image from 'next/image';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  size = 28,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={COMPANY.logo}
        alt="GURU Credits"
        width={size}
        height={size}
        className="rounded-md object-contain"
        priority={priority}
      />
      <span className="text-[17px] font-bold tracking-tight text-foreground">
        GURU <span className="font-semibold text-foreground-muted">Credits</span>
      </span>
    </span>
  );
}
