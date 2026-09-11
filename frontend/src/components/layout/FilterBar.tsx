'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function FilterBar({
  query,
  onQueryChange,
  placeholder,
  categories,
  active,
  onSelect,
  className,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  placeholder: string;
  categories: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur', className)}>
      <div className="container flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
        <div className="relative lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <Input type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="h-10 pl-9" />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter">
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(c.id)}
                className={cn(
                  'h-9 shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors',
                  isActive ? 'border-inverse bg-inverse text-inverse-foreground' : 'border-border bg-surface text-foreground-muted hover:border-border-strong hover:text-foreground',
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
