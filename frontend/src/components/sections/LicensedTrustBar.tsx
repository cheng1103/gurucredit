import { ShieldCheck, Lock, Clock, Users } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

type Item = { icon: typeof ShieldCheck; text: { en: string; ms: string } };

const items: Item[] = [
  {
    icon: ShieldCheck,
    text: {
      en: 'Licensed under Moneylenders Act 1951',
      ms: 'Berlesen di bawah Akta Pemberi Pinjam Wang 1951',
    },
  },
  {
    icon: Lock,
    text: {
      en: 'PDPA compliant · end-to-end encrypted',
      ms: 'Patuh PDPA · disulitkan hujung-ke-hujung',
    },
  },
  {
    icon: Clock,
    text: {
      en: '24-hour written analysis',
      ms: 'Analisis bertulis 24 jam',
    },
  },
  {
    icon: Users,
    text: {
      en: '1,000+ Malaysians served',
      ms: '1,000+ rakyat Malaysia dilayan',
    },
  },
];

export function LicensedTrustBar({ language }: { language: Language }) {
  return (
    <section
      aria-label={language === 'ms' ? 'Kredibiliti' : 'Trust signals'}
      className="border-y border-border/70 bg-muted/40"
    >
      <div className="container">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-8 sm:gap-y-3 py-4 text-[12px] sm:text-[13px]">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className="inline-flex items-center gap-2 text-muted-foreground"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="font-medium text-foreground">{item.text[language]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
