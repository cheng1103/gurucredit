import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Language } from '@/lib/i18n/translations';
import { Calculator, Info, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    badge: 'Personal Loan Guide',
    title: 'Monthly Payment',
    titleHighlight: 'Reference Table',
    subtitle: 'Quick reference for personal loan monthly installments at 4.88% p.a. flat rate',
    loanAmount: 'Loan Amount',
    years: 'yrs',
    perMonth: '/month',
    note: 'Estimates only. Actual payments may vary based on credit profile and bank terms.',
    interestRate: '4.88% p.a.',
    cta: 'Check Your Eligibility',
    popular: 'Popular',
  },
  ms: {
    badge: 'Panduan Pinjaman Peribadi',
    title: 'Jadual Bayaran',
    titleHighlight: 'Bulanan',
    subtitle: 'Rujukan pantas untuk ansuran bulanan pinjaman peribadi pada kadar 4.88% s.t.',
    loanAmount: 'Jumlah Pinjaman',
    years: 'thn',
    perMonth: '/bulan',
    note: 'Anggaran sahaja. Bayaran sebenar mungkin berbeza berdasarkan profil kredit dan terma bank.',
    interestRate: '4.88% s.t.',
    cta: 'Semak Kelayakan Anda',
    popular: 'Popular',
  },
};

// Loan amounts in RM
const loanAmounts = [5000, 10000, 20000, 30000, 50000, 80000, 100000];
// Loan terms in years
const loanTerms = [1, 2, 3, 4, 5, 6, 7];
// Popular combinations
const popularCombos = [
  { amount: 20000, years: 5 },
  { amount: 30000, years: 5 },
  { amount: 50000, years: 7 },
];

// Calculate monthly payment with flat rate interest
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const totalInterest = principal * (annualRate / 100) * years;
  const totalAmount = principal + totalInterest;
  const monthlyPayment = totalAmount / (years * 12);
  return monthlyPayment;
}

// Pre-calculate all payments at 4.88% flat rate
const INTEREST_RATE = 4.88;
const paymentTable: Record<number, Record<number, number>> = {};

loanAmounts.forEach((amount) => {
  paymentTable[amount] = {};
  loanTerms.forEach((years) => {
    paymentTable[amount][years] = calculateMonthlyPayment(amount, INTEREST_RATE, years);
  });
});

function isPopular(amount: number, years: number): boolean {
  return popularCombos.some((c) => c.amount === amount && c.years === years);
}

export function LoanPaymentTable({ language }: { language: Language }) {
  const t = content[language] ?? content.en;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-4 px-4 py-1.5">
          <Calculator className="h-3 w-3 mr-1.5" />
          {t.badge}
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          {t.title} <span className="gradient-text">{t.titleHighlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden border-2 border-primary/10 shadow-xl">
        {/* Interest Rate Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Interest Rate</span>
          </div>
          <span className="text-lg font-bold">{t.interestRate}</span>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/60">
                  <th className="text-left p-4 font-bold text-sm uppercase tracking-wide border-b-2 border-primary/20 sticky left-0 bg-muted/60 z-10 min-w-[130px]">
                    {t.loanAmount}
                  </th>
                  {loanTerms.map((years) => (
                    <th key={years} className="text-center p-4 font-bold text-sm border-b-2 border-primary/20 min-w-[100px]">
                      <span className="text-primary text-lg">{years}</span>
                      <span className="text-muted-foreground ml-1">{t.years}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loanAmounts.map((amount, index) => (
                  <tr
                    key={amount}
                    className={`
                      ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                      hover:bg-primary/5 transition-colors group
                    `}
                  >
                    <td className={`
                      p-4 font-bold text-base border-b sticky left-0 z-10
                      ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                      group-hover:bg-primary/5 transition-colors
                    `}>
                      <span className="text-primary">RM</span>{' '}
                      <span>{amount.toLocaleString()}</span>
                    </td>
                    {loanTerms.map((years) => {
                      const popular = isPopular(amount, years);
                      return (
                        <td key={years} className="text-center p-4 border-b relative">
                          {popular && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" title={t.popular} />
                          )}
                          <div className={`
                            font-semibold tabular-nums
                            ${popular ? 'text-primary text-lg' : 'text-foreground'}
                          `}>
                            RM {Math.round(paymentTable[amount][years]).toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.perMonth}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gradient-to-r from-muted/50 to-muted/30 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0" />
              {t.note}
            </p>
            <Button asChild className="shrink-0 shadow-lg shadow-primary/20">
              <Link href="/services/1/apply">
                {t.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span>{t.popular}</span>
        </div>
      </div>
    </div>
  );
}
