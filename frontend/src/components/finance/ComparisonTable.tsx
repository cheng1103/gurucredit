import { Check, X, Minus } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

type Bilingual = { en: string; ms: string };
type Cell = boolean | 'partial' | Bilingual;

type Row = {
  label: Bilingual;
  diy: Cell;
  broker: Cell;
  guru: Cell;
};

const rows: Row[] = [
  {
    label: {
      en: 'Who you pay',
      ms: 'Siapa yang anda bayar',
    },
    diy: { en: 'Only bank fees', ms: 'Hanya yuran bank' },
    broker: { en: 'Commission to broker + bank fees', ms: 'Komisen broker + yuran bank' },
    guru: { en: 'RM30 flat · paid once', ms: 'RM30 tetap · bayar sekali' },
  },
  {
    label: {
      en: 'Who the advisor earns from',
      ms: 'Sumber pendapatan perunding',
    },
    diy: { en: 'N/A — you are on your own', ms: 'Tiada — anda sendirian' },
    broker: { en: 'Bank commission (conflict of interest)', ms: 'Komisen bank (konflik kepentingan)' },
    guru: { en: 'You — so the advice stays on your side', ms: 'Anda — jadi nasihat kekal di pihak anda' },
  },
  {
    label: {
      en: 'Full CCRIS/CTOS written interpretation',
      ms: 'Tafsiran bertulis penuh CCRIS/CTOS',
    },
    diy: false,
    broker: 'partial',
    guru: true,
  },
  {
    label: {
      en: 'DSR recalculated against each bank’s scoring rules',
      ms: 'DSR dikira semula mengikut peraturan pemarkahan setiap bank',
    },
    diy: false,
    broker: 'partial',
    guru: true,
  },
  {
    label: {
      en: 'Direct loan offer — no middleman, no referral chain',
      ms: 'Tawaran pinjaman terus — tiada orang tengah, tiada rantaian rujukan',
    },
    diy: { en: 'N/A', ms: 'Tiada' },
    broker: false,
    guru: true,
  },
  {
    label: {
      en: 'Turnaround for written analysis',
      ms: 'Masa siap analisis bertulis',
    },
    diy: { en: 'Self-paced', ms: 'Ikut kadar sendiri' },
    broker: { en: '3–7 days', ms: '3–7 hari' },
    guru: { en: '24 hours', ms: '24 jam' },
  },
  {
    label: {
      en: 'Follow-up guidance after the bank responds',
      ms: 'Panduan susulan selepas bank balas',
    },
    diy: false,
    broker: 'partial',
    guru: true,
  },
  {
    label: {
      en: 'Risk of being funnelled to a bank that pays the advisor best',
      ms: 'Risiko disalurkan ke bank yang bayar perunding terbaik',
    },
    diy: { en: 'None', ms: 'Tiada' },
    broker: { en: 'High', ms: 'Tinggi' },
    guru: { en: 'None (we take no bank commission)', ms: 'Tiada (kami tidak ambil komisen bank)' },
  },
];

const content: Record<Language, { kicker: string; title: string; subtitle: string; columns: { diy: string; broker: string; guru: string }; footNote: string }> = {
  en: {
    kicker: 'How we compare',
    title: 'Three ways to borrow in Malaysia — only one lends to you directly.',
    subtitle:
      'Most Malaysians think the choice is "walk into a bank" vs. "use a broker". The third path: borrow from a licensed non-bank lender — us. Faster decisions, fewer hoops, and loan terms set against statutory caps under the Moneylenders Act 1951.',
    columns: {
      diy: 'Bank walk-in (DIY)',
      broker: 'Traditional broker',
      guru: 'GURU Credits (direct)',
    },
    footNote:
      'We are a licensed money lender under the Moneylenders Act 1951. The RM30 you see is the pass-through CTOS report fee — our lending service is compensated via the loan itself, within statutory rate caps.',
  },
  ms: {
    kicker: 'Bagaimana kami berbanding',
    title: 'Tiga cara meminjam di Malaysia — hanya satu memberi pinjaman terus kepada anda.',
    subtitle:
      'Kebanyakan rakyat Malaysia fikir pilihannya ialah "pergi bank" atau "guna broker". Laluan ketiga: pinjam daripada pemberi pinjaman berlesen bukan bank — kami. Keputusan lebih pantas, lebih sedikit kerumitan, dan terma pinjaman dalam had berkanun di bawah Akta Pemberi Pinjam Wang 1951.',
    columns: {
      diy: 'Pergi bank sendiri',
      broker: 'Broker tradisional',
      guru: 'GURU Credits (terus)',
    },
    footNote:
      'Kami adalah pemberi pinjaman wang berlesen di bawah Akta Pemberi Pinjam Wang 1951. RM30 yang dilihat ialah yuran laporan CTOS salur lalu — perkhidmatan pinjaman kami dibayar melalui pinjaman itu sendiri, dalam had kadar berkanun.',
  },
};

function renderCell(value: Cell, language: Language, emphasis: 'positive' | 'neutral' | 'negative') {
  if (typeof value === 'boolean') {
    if (value) {
      return <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.25} aria-label="Yes" />;
    }
    return <X className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.75} aria-label="No" />;
  }
  if (value === 'partial') {
    return <Minus className="h-4 w-4 text-amber-600" strokeWidth={2} aria-label="Partial" />;
  }
  const text = value[language];
  const cls =
    emphasis === 'positive'
      ? 'text-sm font-medium text-foreground'
      : emphasis === 'negative'
        ? 'text-sm text-muted-foreground'
        : 'text-sm text-foreground';
  return <span className={cls}>{text}</span>;
}

export function ComparisonTable({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section className="py-24 lg:py-32">
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow text-muted-foreground mb-5">{t.kicker}</p>
          <h2 className="font-display text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.025em] text-foreground mb-5">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Desktop grid (md+) */}
        <div className="hidden md:block rounded-xl border border-border/70 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border/70 bg-muted/40">
            <div className="px-6 py-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              {language === 'ms' ? 'Ciri' : 'Capability'}
            </div>
            <div className="px-6 py-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              {t.columns.diy}
            </div>
            <div className="px-6 py-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              {t.columns.broker}
            </div>
            <div className="px-6 py-5 text-[11px] uppercase tracking-[0.18em] font-bold text-primary bg-primary/5">
              {t.columns.guru}
            </div>
          </div>
          {rows.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border/70 last:border-b-0 ${
                index % 2 === 1 ? 'bg-muted/20' : ''
              }`}
            >
              <div className="px-6 py-5 text-sm text-foreground leading-relaxed">
                {row.label[language]}
              </div>
              <div className="px-6 py-5 flex items-center">
                {renderCell(row.diy, language, 'neutral')}
              </div>
              <div className="px-6 py-5 flex items-center">
                {renderCell(row.broker, language, 'negative')}
              </div>
              <div className="px-6 py-5 flex items-center bg-primary/5">
                {renderCell(row.guru, language, 'positive')}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile stacked cards (below md) — one card per capability, 3 columns within become 3 rows */}
        <div className="md:hidden space-y-4">
          {rows.map((row, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"
            >
              <p className="px-5 py-4 text-sm font-semibold text-foreground border-b border-border/60 leading-relaxed bg-muted/40">
                {row.label[language]}
              </p>
              <dl className="divide-y divide-border/60">
                <div className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                    {t.columns.diy}
                  </dt>
                  <dd className="text-right flex items-center gap-2">
                    {renderCell(row.diy, language, 'neutral')}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                    {t.columns.broker}
                  </dt>
                  <dd className="text-right flex items-center gap-2">
                    {renderCell(row.broker, language, 'negative')}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-3 bg-primary/5">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-primary font-bold">
                    {t.columns.guru}
                  </dt>
                  <dd className="text-right flex items-center gap-2">
                    {renderCell(row.guru, language, 'positive')}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground max-w-3xl italic leading-relaxed">
          {t.footNote}
        </p>
      </div>
    </section>
  );
}
