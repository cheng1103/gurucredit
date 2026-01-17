import { Card } from '@/components/ui/card';
import { ChevronDown, MessageCircle } from 'lucide-react';
import type { FaqItem } from './data';

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <Card
          key={index}
          className="shadow-md border border-border/60 bg-card/70 overflow-hidden"
        >
          <details className="group p-6">
            <summary className="flex items-start justify-between text-left cursor-pointer list-none">
              <div className="flex items-start gap-3 pr-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{item.question}</span>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-muted-foreground leading-relaxed">{item.answer}</p>
          </details>
        </Card>
      ))}
    </div>
  );
}
