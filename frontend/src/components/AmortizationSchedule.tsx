'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const content = {
  en: {
    title: 'Amortization Schedule',
    subtitle: 'Detailed breakdown of your loan repayment',
    month: 'Month',
    payment: 'Payment',
    principal: 'Principal',
    interest: 'Interest',
    balance: 'Balance',
    showAll: 'Show All Months',
    showLess: 'Show Less',
    downloadPdf: 'Download PDF',
    year: 'Year',
    totalPrincipal: 'Total Principal',
    totalInterest: 'Total Interest',
    totalPayment: 'Total Payment',
    yearSummary: 'Yearly Summary',
  },
  ms: {
    title: 'Jadual Amortisasi',
    subtitle: 'Pecahan terperinci pembayaran balik pinjaman anda',
    month: 'Bulan',
    payment: 'Bayaran',
    principal: 'Prinsipal',
    interest: 'Faedah',
    balance: 'Baki',
    showAll: 'Tunjuk Semua Bulan',
    showLess: 'Tunjuk Kurang',
    downloadPdf: 'Muat Turun PDF',
    year: 'Tahun',
    totalPrincipal: 'Jumlah Prinsipal',
    totalInterest: 'Jumlah Faedah',
    totalPayment: 'Jumlah Bayaran',
    yearSummary: 'Ringkasan Tahunan',
  },
};

interface AmortizationScheduleProps {
  loanAmount: number;
  annualInterestRate: number; // as percentage, e.g., 5.5 for 5.5%
  loanTermMonths: number;
  isReducingBalance?: boolean; // true for home loans, false for flat rate car loans
}

interface PaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearlySummary {
  year: number;
  totalPrincipal: number;
  totalInterest: number;
  totalPayment: number;
  endingBalance: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function AmortizationSchedule({
  loanAmount,
  annualInterestRate,
  loanTermMonths,
  isReducingBalance = true,
}: AmortizationScheduleProps) {
  const { language } = useLanguage();
  const t = content[language];
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  const schedule = useMemo(() => {
    const rows: PaymentRow[] = [];
    const monthlyRate = annualInterestRate / 100 / 12;

    if (isReducingBalance) {
      // Reducing balance method (home loans)
      const monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1);

      let balance = loanAmount;

      for (let month = 1; month <= loanTermMonths; month++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance = Math.max(0, balance - principal);

        rows.push({
          month,
          payment: monthlyPayment,
          principal,
          interest,
          balance,
        });
      }
    } else {
      // Flat rate method (car loans)
      const totalInterest = loanAmount * (annualInterestRate / 100) * (loanTermMonths / 12);
      const totalPayment = loanAmount + totalInterest;
      const monthlyPayment = totalPayment / loanTermMonths;
      const monthlyInterest = totalInterest / loanTermMonths;
      const monthlyPrincipal = loanAmount / loanTermMonths;

      let balance = loanAmount;

      for (let month = 1; month <= loanTermMonths; month++) {
        balance = Math.max(0, balance - monthlyPrincipal);

        rows.push({
          month,
          payment: monthlyPayment,
          principal: monthlyPrincipal,
          interest: monthlyInterest,
          balance,
        });
      }
    }

    return rows;
  }, [loanAmount, annualInterestRate, loanTermMonths, isReducingBalance]);

  const yearlySummary = useMemo(() => {
    const years: YearlySummary[] = [];
    const totalYears = Math.ceil(loanTermMonths / 12);

    for (let year = 1; year <= totalYears; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, loanTermMonths);
      const yearRows = schedule.slice(startMonth, endMonth);

      years.push({
        year,
        totalPrincipal: yearRows.reduce((sum, row) => sum + row.principal, 0),
        totalInterest: yearRows.reduce((sum, row) => sum + row.interest, 0),
        totalPayment: yearRows.reduce((sum, row) => sum + row.payment, 0),
        endingBalance: yearRows[yearRows.length - 1]?.balance || 0,
      });
    }

    return years;
  }, [schedule, loanTermMonths]);

  const displayedSchedule = showAll ? schedule : schedule.slice(0, 12);

  const totals = useMemo(() => {
    return {
      principal: schedule.reduce((sum, row) => sum + row.principal, 0),
      interest: schedule.reduce((sum, row) => sum + row.interest, 0),
      payment: schedule.reduce((sum, row) => sum + row.payment, 0),
    };
  }, [schedule]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
              {t.title}
            </CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('yearly')}
              aria-pressed={viewMode === 'yearly'}
            >
              {t.yearSummary}
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('monthly')}
              aria-pressed={viewMode === 'monthly'}
            >
              {t.month}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">{t.totalPrincipal}</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(totals.principal)}</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">{t.totalInterest}</p>
            <p className="text-lg font-bold text-amber-600">{formatCurrency(totals.interest)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">{t.totalPayment}</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(totals.payment)}</p>
          </div>
        </div>

        {/* Yearly Summary View */}
        {viewMode === 'yearly' && (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">{t.year}</TableHead>
                  <TableHead className="text-right font-semibold">{t.principal}</TableHead>
                  <TableHead className="text-right font-semibold">{t.interest}</TableHead>
                  <TableHead className="text-right font-semibold">{t.payment}</TableHead>
                  <TableHead className="text-right font-semibold">{t.balance}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlySummary.map((row) => (
                  <TableRow key={row.year} className="hover:bg-muted/30">
                    <TableCell>
                      <Badge variant="outline">{t.year} {row.year}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-blue-600">
                      {formatCurrency(row.totalPrincipal)}
                    </TableCell>
                    <TableCell className="text-right text-amber-600">
                      {formatCurrency(row.totalInterest)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(row.totalPayment)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(row.endingBalance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <>
            <div className="rounded-lg border overflow-hidden max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">{t.month}</TableHead>
                    <TableHead className="text-right font-semibold">{t.payment}</TableHead>
                    <TableHead className="text-right font-semibold">{t.principal}</TableHead>
                    <TableHead className="text-right font-semibold">{t.interest}</TableHead>
                    <TableHead className="text-right font-semibold">{t.balance}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedSchedule.map((row) => (
                    <TableRow key={row.month} className="hover:bg-muted/30">
                      <TableCell>
                        <Badge variant="outline">{row.month}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(row.payment)}
                      </TableCell>
                      <TableCell className="text-right text-blue-600">
                        {formatCurrency(row.principal)}
                      </TableCell>
                      <TableCell className="text-right text-amber-600">
                        {formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {schedule.length > 12 && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="gap-2"
                  aria-expanded={showAll}
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      {t.showLess}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      {t.showAll} ({schedule.length} {t.month.toLowerCase()})
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
