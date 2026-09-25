'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = { question: string; answer: string };

export function FaqAccordion({
  items,
  className,
  idPrefix = 'faq',
}: {
  items: Item[];
  className?: string;
  idPrefix?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-border rounded-2xl border border-border bg-surface', className)}>
      {items.map((faq, index) => {
        const isOpen = openIdx === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const triggerId = `${idPrefix}-trigger-${index}`;
        return (
          <div key={faq.question}>
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpenIdx(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left lg:px-6 lg:py-5"
            >
              <span className="font-semibold">{faq.question}</span>
              <ChevronDown className={cn('size-5 shrink-0 text-foreground-subtle transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <div
              id={panelId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted lg:px-6"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
