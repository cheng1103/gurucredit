import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Percent, TrendingUp, Calendar, Wallet } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

type Row = { product: string; rateType: string; from: string; tenure: string };

const content: Record<Language, { title: string; badge: string; subtitle: string; rows: Row[]; note: string }> = {
  en: {
    badge: 'Indicative Rates',
    title: 'Transparent Rate Disclosure',
    subtitle:
      'Indicative rates across common loan products in Malaysia. Actual rate depends on your DSR, credit profile and the lender.',
    rows: [
      { product: 'Personal Loan', rateType: 'Flat Rate p.a.', from: '4.88%', tenure: '1-7 years' },
      { product: 'Business Loan', rateType: 'Effective Rate p.a.', from: '5.50%', tenure: '1-7 years' },
      { product: 'Debt Consolidation', rateType: 'Effective Rate p.a.', from: '6.00%', tenure: '1-7 years' },
      { product: 'Emergency Loan', rateType: 'Flat Rate p.a.', from: '4.88%', tenure: '1-7 years' },
    ],
    note:
      'Rates shown are indicative only and are subject to change by the respective banks. BNM-regulated effective rates may differ from advertised flat rates.',
  },
  ms: {
    badge: 'Kadar Indikatif',
    title: 'Pendedahan Kadar Telus',
    subtitle:
      'Kadar indikatif bagi produk pinjaman utama di Malaysia. Kadar sebenar bergantung pada DSR, profil kredit dan bank anda.',
    rows: [
      { product: 'Pinjaman Peribadi', rateType: 'Kadar Rata/tahun', from: '4.88%', tenure: '1-7 tahun' },
      { product: 'Pinjaman Perniagaan', rateType: 'Kadar Efektif/tahun', from: '5.50%', tenure: '1-7 tahun' },
      { product: 'Penyatuan Hutang', rateType: 'Kadar Efektif/tahun', from: '6.00%', tenure: '1-7 tahun' },
      { product: 'Pinjaman Kecemasan', rateType: 'Kadar Rata/tahun', from: '4.88%', tenure: '1-7 tahun' },
    ],
    note:
      'Kadar yang ditunjukkan adalah indikatif sahaja dan tertakluk kepada perubahan oleh bank. Kadar efektif yang dikawal BNM mungkin berbeza daripada kadar rata yang diiklankan.',
  },
};

export function RateDisclosure({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section data-nosnippet className="py-16 lg:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Percent className="h-3 w-3 mr-1" />
            {t.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">{t.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.rows.map((row) => (
            <Card
              key={row.product}
              className="border border-border/70 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-3">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {row.rateType}
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">{row.product}</p>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-bold text-primary">{row.from}</span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ms' ? 'dari' : 'from'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{row.tenure}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-4xl mx-auto text-xs text-muted-foreground text-center flex items-start justify-center gap-2">
          <Wallet className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{t.note}</span>
        </p>
      </div>
    </section>
  );
}
