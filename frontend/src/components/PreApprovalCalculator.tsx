'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/lib/i18n';
import { calculateDsrOutcome } from '@/lib/dsr';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Calculator,
  Sparkles,
  TrendingUp,
  Wallet,
  Building2,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';

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
  const [showResults, setShowResults] = useState(false);

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

  const handleCalculate = () => {
    if (calculation) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setShowResults(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusIcon = () => {
    if (!calculation) return null;
    switch (calculation.status) {
      case 'approved':
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case 'conditional':
        return <AlertCircle className="h-16 w-16 text-yellow-500" />;
      case 'declined':
        return <XCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    if (!calculation) return 'bg-muted';
    switch (calculation.status) {
      case 'approved':
        return 'bg-green-500/10 border-green-500/20';
      case 'conditional':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'declined':
        return 'bg-red-500/10 border-red-500/20';
    }
  };

  const getDsrColor = (dsr: number) => {
    if (dsr <= 50) return 'text-green-500';
    if (dsr <= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            {t.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-muted-foreground text-lg">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      {t.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Income */}
                      <div className="space-y-2">
                        <Label htmlFor="income" className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-primary" />
                          {t.income.label}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            RM
                          </span>
                          <Input
                            id="income"
                            type="number"
                            placeholder={t.income.placeholder}
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="pl-12"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{t.income.helper}</p>
                      </div>

                      {/* Commitments */}
                      <div className="space-y-2">
                        <Label htmlFor="commitments" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          {t.commitments.label}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            RM
                          </span>
                          <Input
                            id="commitments"
                            type="number"
                            placeholder={t.commitments.placeholder}
                            value={commitments}
                            onChange={(e) => setCommitments(e.target.value)}
                            className="pl-12"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{t.commitments.helper}</p>
                      </div>
                    </div>

                    {/* Loan Amount Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          {t.loanAmount.label}
                        </Label>
                        <span className="text-lg font-semibold text-primary">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        min={5000}
                        max={500000}
                        step={5000}
                        thumbLabels={[t.loanAmount.label]}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>RM 5,000</span>
                        <span>RM 500,000</span>
                      </div>
                    </div>

                    {/* Tenure Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          {t.tenure.label}
                        </Label>
                        <span className="text-lg font-semibold text-primary">
                          {tenure} {t.tenure.years}
                        </span>
                      </div>
                      <Slider
                        value={[tenure]}
                        onValueChange={(value) => setTenure(value[0])}
                        min={1}
                        max={10}
                        step={1}
                        thumbLabels={[t.tenure.label]}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 {t.tenure.years}</span>
                        <span>10 {t.tenure.years}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      size="lg"
                      className="w-full"
                      disabled={!income}
                    >
                      {t.calculate}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className={`border-2 ${getStatusColor()}`}>
                  <CardContent className="pt-8">
                    {/* Status Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="mb-4 flex justify-center"
                      >
                        {getStatusIcon()}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">
                        {calculation && t.results[calculation.status].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {calculation && t.results[calculation.status].subtitle}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-card rounded-lg p-4 text-center border">
                        <p className="text-xs text-muted-foreground mb-1">{t.metrics.dsr}</p>
                        <p className={`text-2xl font-bold ${getDsrColor(calculation?.dsr || 0)}`}>
                          {calculation?.dsr.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-4 text-center border">
                        <p className="text-xs text-muted-foreground mb-1">{t.metrics.maxLoan}</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(calculation?.maxLoanAmount || 0)}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-4 text-center border">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.metrics.monthlyPayment}
                        </p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(calculation?.monthlyPayment || 0)}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-4 text-center border">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.metrics.totalInterest}
                        </p>
                        <p className="text-2xl font-bold text-muted-foreground">
                          {formatCurrency(calculation?.totalInterest || 0)}
                        </p>
                      </div>
                    </div>

                    {/* DSR Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{t.metrics.dsr}</span>
                        <span className={getDsrColor(calculation?.dsr || 0)}>
                          {calculation?.dsr.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            (calculation?.dsr || 0) <= 50
                              ? 'bg-green-500'
                              : (calculation?.dsr || 0) <= 70
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, calculation?.dsr || 0)}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span className="text-green-500">50% Good</span>
                        <span className="text-yellow-500">70% Max</span>
                        <span>100%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        {t.dsrExplanation}
                      </p>
                    </div>

                    {/* Tips for declined/conditional */}
                    {calculation && calculation.status !== 'approved' && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold mb-3">{t.tips.title}</h4>
                        <ul className="space-y-2">
                          {t.tips.items.map((tip, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleReset} variant="outline" className="flex-1">
                        {t.tryAgain}
                      </Button>
                      {calculation?.status !== 'declined' && (
                        <Button asChild className="flex-1">
                          <Link href="/services/1/apply">
                            {t.applyNow}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
