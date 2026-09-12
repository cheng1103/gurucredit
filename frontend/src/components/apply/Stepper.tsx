import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepperItem {
  label: string;
}

export function Stepper({
  items,
  current,
  stepWord,
  ofWord,
  ariaLabel,
}: {
  items: StepperItem[];
  current: number;
  stepWord: string;
  ofWord: string;
  ariaLabel: string;
}) {
  const total = items.length;

  return (
    <div>
      {/* Mobile: compact "Step N of total" pill */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-hover sm:hidden">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-3 py-1">
          {stepWord} {current} {ofWord} {total}
          <span className="font-medium normal-case tracking-normal text-foreground-muted">
            {items[current - 1]?.label}
          </span>
        </span>
      </p>

      {/* Desktop: full step breadcrumb */}
      <ol aria-label={ariaLabel} className="mb-3 hidden flex-wrap gap-2 text-xs text-foreground-muted sm:flex">
        {items.map((item, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === current;
          const done = stepNumber < current;
          return (
            <li
              key={item.label}
              aria-current={active ? 'step' : undefined}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1',
                active
                  ? 'border-primary/60 bg-primary/10 text-primary-hover'
                  : done
                    ? 'border-success/30 bg-success-soft text-success'
                    : 'border-border',
              )}
            >
              {done ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <span className="font-semibold">{String(stepNumber).padStart(2, '0')}</span>
              )}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
