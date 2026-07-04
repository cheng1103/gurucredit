import { LocaleLink } from '@/components/LocaleLink';
import { ArrowUpRight, TrendingUp, LineChart, BarChart3 } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

type Insight = {
  category: { en: string; ms: string };
  title: { en: string; ms: string };
  excerpt: { en: string; ms: string };
  href: string;
  icon: typeof TrendingUp;
  publishedAt: string;
};

const insights: Insight[] = [
  {
    category: { en: 'Rate Report', ms: 'Laporan Kadar' },
    title: {
      en: 'Malaysian Loan Rate Benchmark — Q1 2026',
      ms: 'Penanda Aras Kadar Pinjaman Malaysia — S1 2026',
    },
    excerpt: {
      en: 'Effective rates across 12 local lenders for personal, mortgage, and hire-purchase loans, with OPR sensitivity.',
      ms: 'Kadar efektif merentasi 12 pemberi pinjaman tempatan untuk pinjaman peribadi, gadai janji dan sewa-beli.',
    },
    href: '/blog/bnm-opr-update-jan-2025',
    icon: LineChart,
    publishedAt: '2026-01-14',
  },
  {
    category: { en: 'Methodology', ms: 'Metodologi' },
    title: {
      en: 'How we score lender fit: the 7-factor model',
      ms: 'Bagaimana kami menilai struktur pinjaman: model 7-faktor',
    },
    excerpt: {
      en: 'Our scoring framework blends DSR, CCRIS tenure, income stability, and product-specific risk thresholds.',
      ms: 'Rangka kerja pemarkahan kami menggabungkan DSR, tempoh CCRIS, kestabilan pendapatan dan ambang risiko produk.',
    },
    href: '/blog/how-to-improve-credit-score-malaysia',
    icon: BarChart3,
    publishedAt: '2025-12-02',
  },
  {
    category: { en: 'Policy', ms: 'Polisi' },
    title: {
      en: 'Budget 2026: What changes for Malaysian borrowers',
      ms: 'Belanjawan 2026: Apa yang berubah untuk peminjam Malaysia',
    },
    excerpt: {
      en: 'Stamp duty adjustments, MyHome scheme updates, and the impact on first-time home buyers.',
      ms: 'Pindaan duti setem, kemas kini skim MyHome dan kesan kepada pembeli rumah pertama.',
    },
    href: '/blog/budget-2025-housing-incentives',
    icon: TrendingUp,
    publishedAt: '2025-11-18',
  },
];

const content: Record<Language, { kicker: string; title: string; subtitle: string; cta: string; readMore: string }> = {
  en: {
    kicker: 'Research & Insights',
    title: 'Data we publish openly.',
    subtitle:
      'We maintain our own rate benchmarks and lender scoring model. Every recommendation is traceable back to published data — not affiliate incentives.',
    cta: 'All research notes',
    readMore: 'Read the note',
  },
  ms: {
    kicker: 'Penyelidikan & Wawasan',
    title: 'Data yang kami terbitkan secara terbuka.',
    subtitle:
      'Kami menyelenggara penanda aras kadar dan model pemarkahan bank sendiri. Setiap cadangan boleh dikesan semula kepada data yang diterbitkan — bukan insentif afiliasi.',
    cta: 'Semua nota penyelidikan',
    readMore: 'Baca nota',
  },
};

export function InsightsSection({ language }: { language: Language }) {
  const t = content[language];
  const locale = language === 'ms' ? 'ms-MY' : 'en-MY';

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
              {t.kicker}
            </p>
            <h2 className="font-display text-3xl lg:text-[2.5rem] leading-[1.15] tracking-tight text-foreground">
              {t.title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight) => {
            const Icon = insight.icon;
            const formattedDate = new Date(insight.publishedAt).toLocaleDateString(locale, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
            return (
              <LocaleLink
                key={insight.href}
                href={insight.href}
                className="group flex flex-col rounded-lg border border-border/70 bg-card p-7 hover:border-foreground/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    {insight.category[language]}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl leading-[1.3] tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                  {insight.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-auto">
                  {insight.excerpt[language]}
                </p>
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/70 text-xs text-muted-foreground">
                  <span>{formattedDate}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    {t.readMore}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </LocaleLink>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <LocaleLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            {t.cta}
            <ArrowUpRight className="h-4 w-4" />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
