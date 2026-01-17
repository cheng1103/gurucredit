'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  Home,
  Calculator,
  TrendingUp,
  ArrowRight,
  DollarSign,
  Percent,
  Clock,
  PiggyBank,
  Info,
  Building2,
  Calendar,
  Target,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { AmortizationSchedule } from '@/components/AmortizationSchedule';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebApplicationJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

// Bilingual content
const pageContent = {
  en: {
    header: {
      badge: 'Financial Tool',
      title: 'Home Loan',
      titleHighlight: 'Calculator',
      description: 'Calculate your monthly mortgage payment, total interest, and see a complete breakdown of your home loan.',
    },
    form: {
      title: 'Loan Details',
      subtitle: 'Enter your loan information',
      propertyPrice: 'Property Price',
      downPayment: 'Down Payment',
      interestRate: 'Interest Rate (% p.a.)',
      interestHint: 'Current market: 3.8% - 4.5%',
      loanTenure: 'Loan Tenure (Years)',
      months: 'months',
    },
    results: {
      monthlyPayment: 'Monthly Payment',
      loanAmount: 'Loan Amount',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
    },
    breakdown: {
      title: 'Payment Breakdown',
      subtitle: 'Principal vs Interest over the loan tenure',
      principal: 'Principal (Loan Amount)',
      totalInterest: 'Total Interest',
      interest: 'Interest',
    },
    affordability: {
      title: 'Affordability Check',
      description: 'Based on the 30% rule (housing payment should not exceed 30% of income):',
      minIncome: 'Minimum monthly income needed:',
      note: 'This is a general guideline. Banks typically require DSR below 60-70%.',
    },
    schedule: {
      title: 'Yearly Payment Schedule',
      subtitle: 'See how your payments are distributed over time',
      year: 'Year',
      principal: 'Principal',
      interest: 'Interest',
      totalPaid: 'Total Paid',
      balance: 'Balance',
    },
    cta: {
      title: 'Ready to Apply for a Home Loan?',
      description: 'Get personalized bank recommendations and know your approval chances for just RM30.',
      getAnalysis: 'Get Expert Analysis',
      compareBanks: 'Compare Bank Rates',
    },
    resources: {
      title: 'Related Resources',
      button: 'Open',
      items: [
        { label: 'First-Time Home Buyer Guide 2024', href: '/blog/home-loan-first-time-buyer-guide-2024' },
        { label: 'BNM OPR Update & Impact', href: '/blog/bnm-opr-update-jan-2025' },
        { label: 'Fix CCRIS/CTOS Issues Before Applying', href: '/blog/how-to-improve-credit-score-malaysia' },
      ],
    },
    faq: {
      title: 'Home Loan Calculator FAQ',
      description: 'Answers to common mortgage calculation questions.',
      items: [
        {
          question: 'Is the interest rate flat or effective?',
          answer: 'Home loans typically use effective rates. This calculator uses the annual rate you enter.',
        },
        {
          question: 'Does the calculator include MRTA/insurance?',
          answer: 'No. Add insurance and legal fees separately when budgeting.',
        },
        {
          question: 'How accurate is the monthly payment estimate?',
          answer: 'It is a close estimate; banks may adjust based on fees and final rate approval.',
        },
      ],
    },
  },
  ms: {
    header: {
      badge: 'Alat Kewangan',
      title: 'Kalkulator',
      titleHighlight: 'Pinjaman Rumah',
      description: 'Kira bayaran gadai janji bulanan anda, jumlah faedah, dan lihat pecahan lengkap pinjaman rumah anda.',
    },
    form: {
      title: 'Butiran Pinjaman',
      subtitle: 'Masukkan maklumat pinjaman anda',
      propertyPrice: 'Harga Hartanah',
      downPayment: 'Bayaran Pendahuluan',
      interestRate: 'Kadar Faedah (% p.a.)',
      interestHint: 'Pasaran semasa: 3.8% - 4.5%',
      loanTenure: 'Tempoh Pinjaman (Tahun)',
      months: 'bulan',
    },
    results: {
      monthlyPayment: 'Bayaran Bulanan',
      loanAmount: 'Jumlah Pinjaman',
      totalInterest: 'Jumlah Faedah',
      totalPayment: 'Jumlah Bayaran',
    },
    breakdown: {
      title: 'Pecahan Pembayaran',
      subtitle: 'Prinsipal vs Faedah sepanjang tempoh pinjaman',
      principal: 'Prinsipal (Jumlah Pinjaman)',
      totalInterest: 'Jumlah Faedah',
      interest: 'Faedah',
    },
    affordability: {
      title: 'Semakan Kemampuan',
      description: 'Berdasarkan peraturan 30% (bayaran perumahan tidak boleh melebihi 30% pendapatan):',
      minIncome: 'Pendapatan bulanan minimum diperlukan:',
      note: 'Ini adalah garis panduan umum. Bank biasanya memerlukan DSR di bawah 60-70%.',
    },
    schedule: {
      title: 'Jadual Pembayaran Tahunan',
      subtitle: 'Lihat bagaimana pembayaran anda diagihkan dari semasa ke semasa',
      year: 'Tahun',
      principal: 'Prinsipal',
      interest: 'Faedah',
      totalPaid: 'Jumlah Dibayar',
      balance: 'Baki',
    },
    cta: {
      title: 'Bersedia untuk Memohon Pinjaman Rumah?',
      description: 'Dapatkan cadangan bank peribadi dan ketahui peluang kelulusan anda dengan hanya RM30.',
      getAnalysis: 'Dapatkan Analisis Pakar',
      compareBanks: 'Bandingkan Kadar Bank',
    },
    resources: {
      title: 'Sumber Berkaitan',
      button: 'Buka',
      items: [
        { label: 'Panduan Pembeli Rumah Pertama 2024', href: '/blog/home-loan-first-time-buyer-guide-2024' },
        { label: 'Kemas Kini OPR BNM & Kesan', href: '/blog/bnm-opr-update-jan-2025' },
        { label: 'Baiki CCRIS/CTOS Sebelum Memohon', href: '/blog/how-to-improve-credit-score-malaysia' },
      ],
    },
    faq: {
      title: 'Soalan Lazim Kalkulator Pinjaman Rumah',
      description: 'Jawapan untuk soalan kiraan gadai janji.',
      items: [
        {
          question: 'Kadar faedah ini kadar rata atau efektif?',
          answer: 'Pinjaman rumah biasanya kadar efektif. Kalkulator guna kadar tahunan yang anda masukkan.',
        },
        {
          question: 'Adakah kalkulator termasuk MRTA/insurans?',
          answer: 'Tidak. Tambah insurans dan kos guaman secara berasingan.',
        },
        {
          question: 'Sejauh mana anggaran bayaran tepat?',
          answer: 'Ini anggaran hampir; bank boleh laraskan mengikut yuran dan kadar akhir.',
        },
      ],
    },
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export default function HomeLoanCalculatorPage() {
  const { language } = useLanguage();
  const t = pageContent[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(10);
  const [interestRate, setInterestRate] = useState(4.0);
  const [loanTenure, setLoanTenure] = useState(30);

  const calculation = useMemo(() => {
    const downPaymentAmount = propertyPrice * (downPayment / 100);
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths;
    } else {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const interestPercentage = (totalInterest / loanAmount) * 100;

    // Yearly breakdown
    const yearlyBreakdown = [];
    let balance = loanAmount;
    for (let year = 1; year <= loanTenure; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 1; month <= 12; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
        balance -= principalPayment;
      }
      yearlyBreakdown.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        totalPaid: yearPrincipal + yearInterest,
        remainingBalance: Math.max(0, balance),
      });
    }

    return {
      propertyPrice,
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestPercentage,
      yearlyBreakdown,
    };
  }, [propertyPrice, downPayment, interestRate, loanTenure]);

  // Calculate affordability (30% rule)
  const requiredIncome = calculation.monthlyPayment / 0.3;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebApplicationJsonLd
        name="Home Loan Calculator"
        description="Estimate mortgage payments, total interest, and affordability for Malaysia home loans."
        url={`${SEO.url}/tools/home-loan-calculator`}
      />
      <WebPageJsonLd
        url={`${SEO.url}/tools/home-loan-calculator`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Tools', url: `${SEO.url}/tools` },
          { name: `${t.header.title} ${t.header.titleHighlight}`, url: `${SEO.url}/tools/home-loan-calculator` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <Home className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 surface-card border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  {t.form.title}
                </CardTitle>
                <CardDescription>{t.form.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {t.form.propertyPrice}
                  </Label>
                  <Input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    min={50000}
                    max={10000000}
                    step={10000}
                  />
                  <input
                    type="range"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    min={50000}
                    max={3000000}
                    step={10000}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-primary font-medium">{formatCurrency(propertyPrice)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    {t.form.downPayment}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      min={0}
                      max={90}
                      className="w-20"
                    />
                    <span className="flex items-center text-muted-foreground">%</span>
                  </div>
                  <input
                    type="range"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    min={0}
                    max={50}
                    step={5}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-muted-foreground">{formatCurrency(calculation.downPaymentAmount)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    {t.form.interestRate}
                  </Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={1}
                    max={15}
                    step={0.1}
                  />
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={2}
                    max={8}
                    step={0.1}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-muted-foreground">{t.form.interestHint}</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {t.form.loanTenure}
                  </Label>
                  <Input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    min={5}
                    max={35}
                  />
                  <input
                    type="range"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    min={5}
                    max={35}
                    step={1}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-muted-foreground">{loanTenure * 12} {t.form.months}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Results */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 opacity-80" />
                  <p className="text-sm opacity-80 mb-1">{t.results.monthlyPayment}</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculation.monthlyPayment)}</p>
                </CardContent>
              </Card>

              <Card className="surface-card border-primary/10">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">{t.results.loanAmount}</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculation.loanAmount)}</p>
                </CardContent>
              </Card>

              <Card className="surface-card border-primary/10">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                  <p className="text-sm text-muted-foreground mb-1">{t.results.totalInterest}</p>
                  <p className="text-2xl font-bold text-amber-600">{formatCurrency(calculation.totalInterest)}</p>
                </CardContent>
              </Card>

              <Card className="surface-card border-primary/10">
                <CardContent className="p-6 text-center">
                  <Target className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-sm text-muted-foreground mb-1">{t.results.totalPayment}</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculation.totalPayment)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Breakdown Chart */}
            <Card className="surface-card border-primary/10">
              <CardHeader>
                <CardTitle>{t.breakdown.title}</CardTitle>
                <CardDescription>{t.breakdown.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t.breakdown.principal}</span>
                        <span className="font-medium">{formatCurrency(calculation.loanAmount)}</span>
                      </div>
                      <Progress
                        value={(calculation.loanAmount / calculation.totalPayment) * 100}
                        className="h-4 text-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t.breakdown.totalInterest}</span>
                        <span className="font-medium text-amber-600">{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                      <Progress
                        value={(calculation.totalInterest / calculation.totalPayment) * 100}
                        className="h-4 text-amber-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span>{t.breakdown.principal.split(' ')[0]} ({((calculation.loanAmount / calculation.totalPayment) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-amber-500" />
                      <span>{t.breakdown.interest} ({calculation.interestPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Affordability */}
            <Card className="surface-card border-primary/15">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.affordability.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.affordability.description}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {t.affordability.minIncome} {formatCurrency(requiredIncome)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.affordability.note}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amortization Schedule */}
            <AmortizationSchedule
              loanAmount={calculation.loanAmount}
              annualInterestRate={interestRate}
              loanTermMonths={loanTenure * 12}
              isReducingBalance={true}
            />

            {/* CTA */}
            <Card className="surface-card border-primary/15">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-bold mb-2">{t.cta.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="btn-gradient text-white shadow-md">
                    <Link href="/services/1/apply">
                      {t.cta.getAnalysis}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-primary/30">
                    <Link href="/tools/compare">
                      {t.cta.compareBanks}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card className="surface-card border-primary/10">
            <CardHeader>
              <CardTitle>{t.resources.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {t.resources.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-primary/10 rounded-xl p-4 bg-white/70">
                  <div>
                    <p className="font-semibold">{item.label}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild size="sm" className="btn-gradient text-white shadow-sm">
                      <Link href={item.href}>
                        {t.resources.button}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <TrustPanel
            title={trust.title}
            description={trust.description}
            items={trust.items}
          />
        </div>

        <div className="mt-12">
          <Card className="surface-card border-primary/10">
            <CardHeader>
              <CardTitle>{t.faq.title}</CardTitle>
              <CardDescription>{t.faq.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {t.faq.items.map((item) => (
                <div key={item.question} className="rounded-xl border border-primary/10 bg-white/70 p-4">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
