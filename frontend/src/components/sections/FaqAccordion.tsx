'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

type Item = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIdx === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border bg-background shadow-sm transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-primary/40 shadow-[0_16px_40px_-20px_rgba(59,130,246,0.25)]'
                : 'border-border/60 hover:border-border hover:shadow-md'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              className="w-full flex items-start gap-4 p-5 md:p-6 text-left cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
              </div>
              <h3
                className={`flex-1 font-semibold leading-snug pt-1 transition-colors ${
                  isOpen ? 'text-foreground' : 'text-foreground'
                }`}
              >
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 mt-1 text-muted-foreground"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-6 pb-6 pl-[calc(1.25rem+2.25rem+1rem)] md:pl-[calc(1.5rem+2.25rem+1rem)] text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
