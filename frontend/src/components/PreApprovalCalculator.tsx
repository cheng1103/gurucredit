'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Stat } from '@/components/layout';
import { useLanguage } from '@/lib/i18n';
import { calculateDsrOutcome } from '@/lib/dsr';
import { ArrowRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { PATHS } from '@/lib/i18n/routes';
import { cn } from '@/lib/utils';

const content = {
  en: {
    title: 'Instant Pre-Approval Check',
    subtitle: 'Get your estimated loan eligibility in seconds',
    badge: 'Free & No Impact on Credit Score',
    income: {
      label: 'Monthly Net Income',
      placeholder: 'e.g., 5000',
      helper: 'Your take-home salary after EPF & tax',
    },
    commitments: {
      label: 'Monthly Commitments',
      placeholder: 'e.g., 1500',
      helper: 'Existing loans, credit cards, PTPTN, etc.',
    },
    loanAmount: {
      label: 'Desired Loan Amount',
    },
    tenure: {
      label: 'Loan Tenure',
      years: 'years',
    },
    calculate: 'Check Eligibility',
    results: {
      approved: {
        title: 'Pre-Approved!',
        subtitle: 'Based on your information, you qualify for a loan.',
      },
      conditional: {
        title: 'Conditionally Approved',
        subtitle: 'You may qualify with some adjustments.',
      },
      declined: {
        title: 'Not Eligible',
        subtitle: 'Your DSR is too high for this loan amount.',
      },
    },
    metrics: {
      dsr: 'Debt Service Ratio',
      maxLoan: 'Maximum Loan Amount',
      monthlyPayment: 'Est. Monthly Payment',
      totalInterest: 'Total Interest',
    },
    tips: {
      title: 'Tips to Improve Eligibility',
      items: [
        'Reduce existing debt commitments',
        'Consider a longer loan tenure',
        'Apply for a smaller loan amount',
        'Increase income with side income',
      ],
    },
    applyNow: 'Apply Now',
    tryAgain: 'Adjust & Try Again',
    dsrExplanation: 'Banks typically approve loans when DSR is below 60-70%',
  },
  ms: {
    title: 'Semakan Pra-Kelulusan Segera',
    subtitle: 'Dapatkan anggaran kelayakan pinjaman anda dalam saat',
    badge: 'Percuma & Tiada Kesan pada Skor Kredit',
    income: {
      label: 'Pendapatan Bersih Bulanan',
      placeholder: 'cth., 5000',
      helper: 'Gaji bawa pulang selepas EPF & cukai',
    },
    commitments: {
      label: 'Komitmen Bulanan',
      placeholder: 'cth., 1500',
      helper: 'Pinjaman sedia ada, kad kredit, PTPTN, dll.',
    },
    loanAmount: {
      label: 'Jumlah Pinjaman Dikehendaki',
    },
    tenure: {
      label: 'Tempoh Pinjaman',
      years: 'tahun',
    },
    calculate: 'Semak Kelayakan',
    results: {
      approved: {
        title: 'Pra-Diluluskan!',
        subtitle: 'Berdasarkan maklumat anda, anda layak untuk pinjaman.',
      },
      conditional: {
        title: 'Diluluskan Bersyarat',
        subtitle: 'Anda mungkin layak dengan beberapa pelarasan.',
      },
      declined: {
        title: 'Tidak Layak',
        subtitle: 'DSR anda terlalu tinggi untuk jumlah pinjaman ini.',
      },
    },
    metrics: {
      dsr: 'Nisbah Khidmat Hutang',
      maxLoan: 'Jumlah Pinjaman Maksimum',
      monthlyPayment: 'Anggaran Bayaran Bulanan',
      totalInterest: 'Jumlah Faedah',
    },
    tips: {
      title: 'Tips untuk Meningkatkan Kelayakan',
      items: [
        'Kurangkan komitmen hutang sedia ada',
        'Pertimbangkan tempoh pinjaman yang lebih panjang',
        'Mohon jumlah pinjaman yang lebih kecil',
        'Tingkatkan pendapatan dengan pendapatan sampingan',
      ],
    },
    applyNow: 'Mohon Sekarang',
    tryAgain: 'Laraskan & Cuba Lagi',
    dsrExplanation: 'Bank biasanya meluluskan pinjaman apabila DSR di bawah 60-70%',
  },
};

export function PreApprovalCalculator() {
  const { language } = useLanguage();
  const t = content[language];

  const [income, setIncome] = useState<string>('');
  const [commitments, setCommitments] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(5);

  const hasIncome = parseFloat(income) > 0;

  const calculation = useMemo(() => {
    const incomeNum = parseFloat(income) || 0;
    const commitmentsNum = parseFloat(commitments) || 0;

    return calculateDsrOutcome({
      income: incomeNum,
      commitments: commitmentsNum,
      loanAmount,
      tenureYears: tenure,
    });
  }, [income, commitments, loanAmount, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const status = calculation?.status;
  const statusTone = {
    approved: { icon: CheckCircle2, text: 'text-success', bg: 'bg-success-soft border-success/30', bar: 'bg-gradient-to-r from-success to-primary' },
    conditional: { icon: AlertCircle, text: 'text-warning', bg: 'bg-warning-soft border-warning/30', bar: 'bg-warning' },
    declined: { icon: XCircle, text: 'text-destructive', bg: 'bg-destructive/5 border-destructive/30', bar: 'bg-destructive' },
  } as const;
  const tone = status ? statusTone[status] : null;
  const StatusIcon = tone?.icon ?? CheckCircle2;
  const dsr = calculation?.dsr ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card lg:sticky lg:top-24 lg:p-6">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="income">{t.income.label}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-foreground-subtle">RM</span>
              <Input id="income" type="number" inputMode="numeric" placeholder={t.income.placeholder} value={income} onChange={(e) => setIncome(e.target.value)} className="pl-11 font-mono" />
            </div>
            <p className="text-xs text-foreground-subtle">{t.income.helper}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="commitments">{t.commitments.label}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-foreground-subtle">RM</span>
              <Input id="commitments" type="number" inputMode="numeric" placeholder={t.commitments.placeholder} value={commitments} onChange={(e) => setCommitments(e.target.value)} className="pl-11 font-mono" />
            </div>
            <p className="text-xs text-foreground-subtle">{t.commitments.helper}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t.loanAmount.label}</Label>
              <span className="font-mono text-sm font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} min={5000} max={500000} step={5000} thumbLabels={[t.loanAmount.label]} />
            <div className="flex justify-between font-mono text-[11px] text-foreground-subtle"><span>RM 5,000</span><span>RM 500,000</span></div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t.tenure.label}</Label>
              <span className="font-mono text-sm font-semibold">{tenure} {t.tenure.years}</span>
            </div>
            <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={10} step={1} thumbLabels={[t.tenure.label]} />
            <div className="flex justify-between font-mono text-[11px] text-foreground-subtle"><span>1 {t.tenure.years}</span><span>10 {t.tenure.years}</span></div>
          </div>

          <Button type="button" className="w-full" onClick={() => document.getElementById('calc-results')?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' })}>
            {t.calculate}
          </Button>
        </div>
      </div>

      <div id="calc-results" className="min-h-[320px] lg:min-h-[480px]">
        {!hasIncome || !calculation || !tone ? (
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border-strong p-8 text-center text-sm text-foreground-muted lg:min-h-[480px]">
            {language === 'ms'
              ? 'Masukkan pendapatan bulanan untuk lihat kelayakan secara langsung.'
              : 'Enter your monthly income to see eligibility update live as you adjust the sliders.'}
          </div>
        ) : (
          <div className={cn('rounded-2xl border p-6 lg:p-8', tone.bg)}>
            <div className="flex items-start gap-3">
              <StatusIcon className={cn('mt-0.5 size-6 shrink-0', tone.text)} />
              <div>
                <h3 className="text-2xl">{t.results[calculation.status].title}</h3>
                <p className="mt-1 text-foreground-muted">{t.results[calculation.status].subtitle}</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {([
                { label: t.metrics.dsr, value: `${dsr.toFixed(1)}%`, tone: calculation.status === 'approved' ? 'success' : calculation.status === 'conditional' ? 'warning' : 'destructive' },
                { label: t.metrics.maxLoan, value: formatCurrency(calculation.maxLoanAmount), tone: 'primary' },
                { label: t.metrics.monthlyPayment, value: formatCurrency(calculation.monthlyPayment), tone: 'default' },
                { label: t.metrics.totalInterest, value: formatCurrency(calculation.totalInterest), tone: 'default' },
              ] satisfies { label: string; value: string; tone: 'default' | 'success' | 'primary' | 'warning' | 'destructive' }[]).map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-surface p-4">
                  <Stat value={m.value} label={m.label} tone={m.tone} className="gap-0.5" />
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-xs text-foreground-subtle">
                <span>{t.metrics.dsr}</span>
                <span className={cn('font-mono', tone.text)}>{dsr.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface">
                <div className={cn('h-full rounded-full transition-[width] duration-500', tone.bar)} style={{ width: `${Math.min(100, dsr)}%` }} />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[11px] text-foreground-subtle"><span>0%</span><span>60%</span><span>100%</span></div>
              <p className="mt-2 text-xs text-foreground-subtle">{t.dsrExplanation}</p>
            </div>

            {calculation.status !== 'approved' && (
              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <p className="font-semibold">{t.tips.title}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground-muted">
                  {t.tips.items.map((tip) => (
                    <li key={tip} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {calculation.status !== 'declined' && (
              <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
                <LocaleLink href={PATHS.eligibilityTest}>
                  {t.applyNow}
                  <ArrowRight className="size-4" />
                </LocaleLink>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
