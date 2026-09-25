'use client';

import { useMemo, useState } from 'react';
import { Building2, Calculator, Check, DollarSign, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Stat } from '@/components/layout';
import { cn } from '@/lib/utils';
import { ToolLayout } from './ToolLayout';
import { banks, compareUi, loanTypeDefaults, type LoanTypeId } from '@/lib/content/tools/compare';
import type { Language } from '@/lib/i18n/translations';
import type { LocalizedFaq } from '@/lib/content/listings/faq';

const loanTypeIcons: Record<LoanTypeId, typeof Building2> = {
  home: Building2,
  car: TrendingUp,
  personal: DollarSign,
};

const loanRateKey: Record<LoanTypeId, 'homeLoan' | 'carLoan' | 'personalLoan'> = {
  home: 'homeLoan',
  car: 'carLoan',
  personal: 'personalLoan',
};

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BankRateCompare({
  language,
  moreQuestions,
}: {
  language: Language;
  moreQuestions: LocalizedFaq[];
}) {
  const t = compareUi[language].bank;

  const [loanType, setLoanType] = useState<LoanTypeId>('home');
  const [loanAmount, setLoanAmount] = useState(loanTypeDefaults.home.defaultAmount);
  const [loanTenure, setLoanTenure] = useState(loanTypeDefaults.home.defaultTenure);
  const [selectedBanks, setSelectedBanks] = useState<string[]>(['maybank', 'cimb', 'publicbank']);

  const defaults = loanTypeDefaults[loanType];

  const selectLoanType = (id: LoanTypeId) => {
    setLoanType(id);
    setLoanAmount(loanTypeDefaults[id].defaultAmount);
    setLoanTenure(loanTypeDefaults[id].defaultTenure);
  };

  const toggleBank = (bankId: string) => {
    if (selectedBanks.includes(bankId)) {
      if (selectedBanks.length > 1) setSelectedBanks(selectedBanks.filter((id) => id !== bankId));
    } else if (selectedBanks.length < 4) {
      setSelectedBanks([...selectedBanks, bankId]);
    }
  };

  const comparison = useMemo(() => {
    const rateKey = loanRateKey[loanType];
    return selectedBanks
      .map((bankId) => {
        const bank = banks.find((b) => b.id === bankId)!;
        const rate = bank[rateKey];
        const minPayment = calculateMonthlyPayment(loanAmount, rate.min, loanTenure);
        const maxPayment = calculateMonthlyPayment(loanAmount, rate.max, loanTenure);
        const minTotalInterest = minPayment * loanTenure * 12 - loanAmount;
        const maxTotalInterest = maxPayment * loanTenure * 12 - loanAmount;
        return {
          bank,
          rate,
          minPayment,
          maxPayment,
          minTotalInterest,
          maxTotalInterest,
          totalPayment: { min: minPayment * loanTenure * 12, max: maxPayment * loanTenure * 12 },
        };
      })
      .sort((a, b) => a.rate.min - b.rate.min);
  }, [selectedBanks, loanType, loanAmount, loanTenure]);

  const getBankFeatures = (bank: (typeof banks)[number]) => (language === 'ms' ? bank.featuresMs : bank.featuresEn);

  const rail = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="size-5 text-primary" aria-hidden="true" />
            {t.loanDetails.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(t.loanTypes) as LoanTypeId[]).map((id) => {
              const Icon = loanTypeIcons[id];
              const active = loanType === id;
              return (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={active ? 'default' : 'outline'}
                  aria-pressed={active}
                  onClick={() => selectLoanType(id)}
                  className="gap-1.5"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {t.loanTypes[id]}
                </Button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bank-compare-amount">{t.loanDetails.loanAmount}</Label>
            <Input
              id="bank-compare-amount"
              type="number"
              inputMode="numeric"
              className="font-mono"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min={10000}
              max={defaults.maxAmount}
            />
            <p className="font-mono text-xs text-foreground-subtle">{formatCurrency(loanAmount)}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bank-compare-tenure">{t.loanDetails.loanTenure}</Label>
            <Input
              id="bank-compare-tenure"
              type="number"
              inputMode="numeric"
              className="font-mono"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              min={1}
              max={defaults.maxTenure}
            />
            <p className="text-xs text-foreground-subtle">
              {loanTenure} {t.loanDetails.years} = {loanTenure * 12} {t.loanDetails.months}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setLoanAmount(defaults.defaultAmount);
              setLoanTenure(defaults.defaultTenure);
            }}
          >
            {t.loanDetails.resetDefault}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="size-5 text-primary" aria-hidden="true" />
            {t.bankSelection.title}
          </CardTitle>
          <CardDescription>{t.bankSelection.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {banks.map((bank) => {
            const selected = selectedBanks.includes(bank.id);
            return (
              <button
                key={bank.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleBank(bank.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors',
                  selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-xl" aria-hidden="true">{bank.logo}</span>
                  {bank.name}
                </span>
                {selected ? <Check className="size-4 text-primary" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ToolLayout
      rail={rail}
      language={language}
      moreQuestions={moreQuestions}
      disclaimer={
        <div>
          <p className="font-semibold text-foreground">{t.disclaimer.title}</p>
          <p className="mt-1 text-sm text-foreground-muted">{t.disclaimer.text}</p>
        </div>
      }
    >
      <div className="grid gap-4" data-testid="bank-comparison-results">
        {comparison.map((item, index) => (
          <Card key={item.bank.id} className={cn('relative overflow-hidden', index === 0 && 'border-2 border-primary')}>
            {index === 0 ? (
              <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                <Star className="size-3" aria-hidden="true" />
                {t.comparison.bestRate}
              </div>
            ) : null}
            <CardContent className="grid gap-6 p-6 md:grid-cols-5">
              <div className="md:col-span-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-surface-alt text-2xl" aria-hidden="true">
                    {item.bank.logo}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.bank.name}</h3>
                    {item.bank.popular ? <Badge variant="secondary" className="text-xs">{t.comparison.popular}</Badge> : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {getBankFeatures(item.bank).slice(0, 2).map((feature) => (
                    <span key={feature} className="rounded bg-surface-alt px-2 py-1 text-xs text-foreground-muted">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Stat
                  className="items-center"
                  tone="primary"
                  value={`${item.rate.min}%`}
                  label={t.comparison.interestRate}
                />
                {item.rate.max !== item.rate.min ? (
                  <p className="font-mono text-xs text-foreground-subtle">– {item.rate.max}%</p>
                ) : null}
                <p className="text-xs text-foreground-subtle">{t.comparison.perAnnum}</p>
              </div>

              <div className="text-center">
                <Stat className="items-center" value={formatCurrency(item.minPayment)} label={t.comparison.monthlyPayment} />
                {item.maxPayment !== item.minPayment ? (
                  <p className="font-mono text-xs text-foreground-subtle">
                    {t.comparison.to} {formatCurrency(item.maxPayment)}
                  </p>
                ) : null}
              </div>

              <div className="text-center">
                <Stat className="items-center" value={formatCurrency(item.minTotalInterest)} label={t.comparison.totalInterest} />
                {item.maxTotalInterest !== item.minTotalInterest ? (
                  <p className="font-mono text-xs text-foreground-subtle">
                    {t.comparison.to} {formatCurrency(item.maxTotalInterest)}
                  </p>
                ) : null}
              </div>

              <div className="text-center">
                <Stat className="items-center" value={formatCurrency(item.totalPayment.min)} label={t.comparison.totalPayment} />
                {item.totalPayment.max !== item.totalPayment.min ? (
                  <p className="font-mono text-xs text-foreground-subtle">
                    {t.comparison.to} {formatCurrency(item.totalPayment.max)}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
}
