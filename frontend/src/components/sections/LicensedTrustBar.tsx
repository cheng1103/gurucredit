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
      className="relative border-y border-border/70 overflow-hidden"
    >
      {/* Animated top accent rule */}
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      {/* Subtle animated shimmer sweeping across */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[linear-gradient(110deg,transparent_20%,rgba(59,130,246,0.06)_50%,transparent_80%)] bg-[length:200%_100%] animate-[shimmer_8s_ease-in-out_infinite]"
      />
      <div className="container relative">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-8 sm:gap-y-3 py-4 text-[12px] sm:text-[13px]">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-default"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary group-hover:scale-110">
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
