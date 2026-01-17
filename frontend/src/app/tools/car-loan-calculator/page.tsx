'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Car,
  Calculator,
  TrendingUp,
  ArrowRight,
  DollarSign,
  Percent,
  Clock,
  PiggyBank,
  Info,
  Calendar,
  Target,
  Fuel,
  Shield,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebApplicationJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

// Bilingual content
const pageContent = {
  en: {
    header: {
      badge: 'Financial Tool',
      title: 'Car Loan',
      titleHighlight: 'Calculator',
      description: 'Calculate your monthly car payment including insurance and road tax. Plan your car purchase with confidence.',
    },
    form: {
      title: 'Loan Details',
      subtitle: 'Enter your car loan information',
      carPrice: 'Car Price (OTR)',
      downPayment: 'Down Payment',
      interestRate: 'Interest Rate (% flat)',
      interestHint: 'Current market: 2.5% - 3.5% flat',
      loanTenure: 'Loan Tenure (Years)',
      months: 'months',
      includeTitle: 'Include in Total Cost:',
      insurance: 'Insurance',
      roadTax: 'Road Tax',
      perMonth: '/mo',
    },
    results: {
      monthlyPayment: 'Monthly Payment',
      loanOnly: 'Loan only',
      totalMonthlyCost: 'Total Monthly Cost',
      withExtras: 'With extras',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
    },
    breakdown: {
      title: 'Cost Breakdown',
      subtitle: 'Understanding your total car ownership cost',
      loanAmount: 'Loan Amount',
      afterDownPayment: 'After {percent}% down payment',
      totalInterest: 'Total Interest',
      flatEffective: '{flat}% flat = ~{effective}% effective',
      insuranceYearly: 'Insurance (Yearly)',
      insuranceDesc: 'Comprehensive coverage estimate',
      roadTaxYearly: 'Road Tax (Yearly)',
      roadTaxDesc: 'Based on engine capacity estimate',
      maintenanceYearly: 'Maintenance (Yearly)',
      maintenanceDesc: 'Service, tyres, repairs estimate',
    },
    rateComparison: {
      title: 'Flat Rate vs Effective Rate',
      subtitle: 'Understanding car loan interest calculation',
      flatRate: 'Flat Rate (Advertised)',
      flatDesc: 'Interest calculated on original loan amount throughout the tenure',
      effectiveRate: 'Effective Rate (Actual)',
      effectiveDesc: 'True cost of borrowing, comparable to home loan rates',
      info: 'Car loans in Malaysia use flat rate calculation, which means you pay interest on the full loan amount even as you pay down the principal. The effective rate is roughly double the flat rate.',
    },
    affordability: {
      title: 'Affordability Check',
      description: 'Based on the 30% rule (total car cost should not exceed 30% of income):',
      minIncome: 'Minimum monthly income needed:',
      note: 'Remember to factor in fuel, parking, and toll costs in your budget.',
    },
    cta: {
      title: 'Ready to Apply for a Car Loan?',
      description: 'Get personalized bank recommendations and know your approval chances for just RM30.',
      getAnalysis: 'Get Expert Analysis',
      compareBanks: 'Compare Bank Rates',
    },
    resources: {
      title: 'Related Resources',
      button: 'Open',
      items: [
        { label: 'Complete Car Loan Guide 2024', href: '/blog/car-loan-guide-malaysia-2024' },
        { label: 'EV vs Petrol Cost Comparison 2025', href: '/blog/ev-loan-vs-petrol-car-cost-malaysia' },
        { label: 'Take the Loan Eligibility Test', href: '/eligibility-test' },
      ],
    },
    faq: {
      title: 'Car Loan Calculator FAQ',
      description: 'Common questions about hire purchase calculations.',
      items: [
        {
          question: 'Is car loan interest flat or effective?',
          answer: 'Car loans in Malaysia use flat rates; effective rates are roughly higher.',
        },
        {
          question: 'Does the calculator include insurance and road tax?',
          answer: 'Yes, you can include them to estimate total monthly cost.',
        },
        {
          question: 'What down payment should I use?',
          answer: '10% is common, but higher down payment lowers monthly instalments.',
        },
      ],
    },
  },
  ms: {
    header: {
      badge: 'Alat Kewangan',
      title: 'Kalkulator',
      titleHighlight: 'Pinjaman Kereta',
      description: 'Kira bayaran bulanan kereta anda termasuk insurans dan cukai jalan. Rancang pembelian kereta anda dengan yakin.',
    },
    form: {
      title: 'Butiran Pinjaman',
      subtitle: 'Masukkan maklumat pinjaman kereta anda',
      carPrice: 'Harga Kereta (OTR)',
      downPayment: 'Bayaran Pendahuluan',
      interestRate: 'Kadar Faedah (% rata)',
      interestHint: 'Pasaran semasa: 2.5% - 3.5% rata',
      loanTenure: 'Tempoh Pinjaman (Tahun)',
      months: 'bulan',
      includeTitle: 'Termasuk dalam Jumlah Kos:',
      insurance: 'Insurans',
      roadTax: 'Cukai Jalan',
      perMonth: '/bln',
    },
    results: {
      monthlyPayment: 'Bayaran Bulanan',
      loanOnly: 'Pinjaman sahaja',
      totalMonthlyCost: 'Jumlah Kos Bulanan',
      withExtras: 'Dengan tambahan',
      totalInterest: 'Jumlah Faedah',
      totalPayment: 'Jumlah Bayaran',
    },
    breakdown: {
      title: 'Pecahan Kos',
      subtitle: 'Memahami jumlah kos pemilikan kereta anda',
      loanAmount: 'Jumlah Pinjaman',
      afterDownPayment: 'Selepas {percent}% bayaran pendahuluan',
      totalInterest: 'Jumlah Faedah',
      flatEffective: '{flat}% rata = ~{effective}% efektif',
      insuranceYearly: 'Insurans (Tahunan)',
      insuranceDesc: 'Anggaran perlindungan komprehensif',
      roadTaxYearly: 'Cukai Jalan (Tahunan)',
      roadTaxDesc: 'Berdasarkan anggaran kapasiti enjin',
      maintenanceYearly: 'Penyelenggaraan (Tahunan)',
      maintenanceDesc: 'Anggaran servis, tayar, pembaikan',
    },
    rateComparison: {
      title: 'Kadar Rata vs Kadar Efektif',
      subtitle: 'Memahami pengiraan faedah pinjaman kereta',
      flatRate: 'Kadar Rata (Diiklankan)',
      flatDesc: 'Faedah dikira atas jumlah pinjaman asal sepanjang tempoh',
      effectiveRate: 'Kadar Efektif (Sebenar)',
      effectiveDesc: 'Kos sebenar peminjaman, setanding dengan kadar pinjaman rumah',
      info: 'Pinjaman kereta di Malaysia menggunakan pengiraan kadar rata, yang bermaksud anda membayar faedah atas jumlah pinjaman penuh walaupun anda membayar prinsipal. Kadar efektif adalah kira-kira dua kali ganda kadar rata.',
    },
    affordability: {
      title: 'Semakan Kemampuan',
      description: 'Berdasarkan peraturan 30% (jumlah kos kereta tidak boleh melebihi 30% pendapatan):',
      minIncome: 'Pendapatan bulanan minimum diperlukan:',
      note: 'Ingat untuk mengambil kira kos bahan api, parkir, dan tol dalam bajet anda.',
    },
    cta: {
      title: 'Bersedia untuk Memohon Pinjaman Kereta?',
      description: 'Dapatkan cadangan bank peribadi dan ketahui peluang kelulusan anda dengan hanya RM30.',
      getAnalysis: 'Dapatkan Analisis Pakar',
      compareBanks: 'Bandingkan Kadar Bank',
    },
    resources: {
      title: 'Sumber Berkaitan',
      button: 'Buka',
      items: [
        { label: 'Panduan Lengkap Pinjaman Kereta 2024', href: '/blog/car-loan-guide-malaysia-2024' },
        { label: 'Perbandingan Kos EV vs Petrol 2025', href: '/blog/ev-loan-vs-petrol-car-cost-malaysia' },
        { label: 'Cuba Ujian Kelayakan Pinjaman', href: '/eligibility-test' },
      ],
    },
    faq: {
      title: 'Soalan Lazim Kalkulator Pinjaman Kereta',
      description: 'Soalan biasa tentang kiraan sewa beli.',
      items: [
        {
          question: 'Kadar pinjaman kereta rata atau efektif?',
          answer: 'Pinjaman kereta di Malaysia guna kadar rata; kadar efektif biasanya lebih tinggi.',
        },
        {
          question: 'Adakah kalkulator termasuk insurans dan cukai jalan?',
          answer: 'Ya, anda boleh masukkan untuk anggaran kos bulanan.',
        },
        {
          question: 'Bayaran pendahuluan berapa patut digunakan?',
          answer: '10% biasa digunakan, tetapi lebih tinggi akan kurangkan ansuran.',
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

export default function CarLoanCalculatorPage() {
  const { language } = useLanguage();
  const t = pageContent[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  const [carPrice, setCarPrice] = useState(100000);
  const [downPayment, setDownPayment] = useState(10);
  const [interestRate, setInterestRate] = useState(3.0);
  const [loanTenure, setLoanTenure] = useState(7);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeRoadTax, setIncludeRoadTax] = useState(true);

  const calculation = useMemo(() => {
    const downPaymentAmount = carPrice * (downPayment / 100);
    const loanAmount = carPrice - downPaymentAmount;

    // Car loan uses flat rate (simple interest)
    const totalInterest = loanAmount * (interestRate / 100) * loanTenure;
    const totalPayment = loanAmount + totalInterest;
    const monthlyPayment = totalPayment / (loanTenure * 12);

    // Estimated annual costs
    const estimatedInsurance = carPrice * 0.03; // ~3% of car price per year
    const estimatedRoadTax = carPrice < 100000 ? 300 : carPrice < 200000 ? 500 : 800; // Simplified estimate
    const estimatedMaintenance = carPrice * 0.02; // ~2% per year

    const monthlyInsurance = estimatedInsurance / 12;
    const monthlyRoadTax = estimatedRoadTax / 12;

    const totalMonthlyCost = monthlyPayment +
      (includeInsurance ? monthlyInsurance : 0) +
      (includeRoadTax ? monthlyRoadTax : 0);

    // Effective interest rate (converting flat rate to effective rate)
    const effectiveRate = (2 * interestRate * loanTenure) / (loanTenure + 1);

    return {
      carPrice,
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveRate,
      estimatedInsurance,
      estimatedRoadTax,
      estimatedMaintenance,
      monthlyInsurance,
      monthlyRoadTax,
      totalMonthlyCost,
    };
  }, [carPrice, downPayment, interestRate, loanTenure, includeInsurance, includeRoadTax]);

  const requiredIncome = calculation.totalMonthlyCost / 0.3;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebApplicationJsonLd
        name="Car Loan Calculator"
        description="Calculate car loan repayments, total interest, and monthly affordability for Malaysia."
        url={`${SEO.url}/tools/car-loan-calculator`}
      />
      <WebPageJsonLd
        url={`${SEO.url}/tools/car-loan-calculator`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Tools', url: `${SEO.url}/tools` },
          { name: `${t.header.title} ${t.header.titleHighlight}`, url: `${SEO.url}/tools/car-loan-calculator` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <Car className="h-3 w-3 mr-1" />
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
                    <Car className="h-4 w-4 text-muted-foreground" />
                    {t.form.carPrice}
                  </Label>
                  <Input
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    min={20000}
                    max={1000000}
                    step={5000}
                  />
                  <input
                    type="range"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    min={20000}
                    max={500000}
                    step={5000}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-primary font-medium">{formatCurrency(carPrice)}</p>
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
                      max={50}
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
                    max={10}
                    step={0.1}
                  />
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={1.5}
                    max={5}
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
                    min={3}
                    max={9}
                  />
                  <input
                    type="range"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    min={3}
                    max={9}
                    step={1}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-muted-foreground">{loanTenure * 12} {t.form.months}</p>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <p className="text-sm font-medium">{t.form.includeTitle}</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="rounded"
                    />
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t.form.insurance} (~{formatCurrency(calculation.monthlyInsurance)}{t.form.perMonth})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRoadTax}
                      onChange={(e) => setIncludeRoadTax(e.target.checked)}
                      className="rounded"
                    />
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t.form.roadTax} (~{formatCurrency(calculation.monthlyRoadTax)}{t.form.perMonth})</span>
                  </label>
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
                  <p className="text-xs opacity-70 mt-1">{t.results.loanOnly}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 opacity-80" />
                  <p className="text-sm opacity-80 mb-1">{t.results.totalMonthlyCost}</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculation.totalMonthlyCost)}</p>
                  <p className="text-xs opacity-70 mt-1">{t.results.withExtras}</p>
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
                  <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">{t.results.totalPayment}</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculation.totalPayment)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Cost Breakdown */}
            <Card className="surface-card border-primary/10">
              <CardHeader>
                <CardTitle>{t.breakdown.title}</CardTitle>
                <CardDescription>{t.breakdown.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{t.breakdown.loanAmount}</p>
                        <p className="text-xs text-muted-foreground">{t.breakdown.afterDownPayment.replace('{percent}', String(downPayment))}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(calculation.loanAmount)}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-50/70 rounded-lg border border-amber-200/70">
                    <div className="flex items-center gap-3">
                      <Percent className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">{t.breakdown.totalInterest}</p>
                        <p className="text-xs text-muted-foreground">{t.breakdown.flatEffective.replace('{flat}', String(interestRate)).replace('{effective}', calculation.effectiveRate.toFixed(2))}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(calculation.totalInterest)}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{t.breakdown.insuranceYearly}</p>
                        <p className="text-xs text-muted-foreground">{t.breakdown.insuranceDesc}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(calculation.estimatedInsurance)}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <Fuel className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{t.breakdown.roadTaxYearly}</p>
                        <p className="text-xs text-muted-foreground">{t.breakdown.roadTaxDesc}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(calculation.estimatedRoadTax)}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">{t.breakdown.maintenanceYearly}</p>
                        <p className="text-xs text-muted-foreground">{t.breakdown.maintenanceDesc}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(calculation.estimatedMaintenance)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interest Rate Comparison */}
            <Card className="surface-card border-primary/10">
              <CardHeader>
                <CardTitle>{t.rateComparison.title}</CardTitle>
                <CardDescription>{t.rateComparison.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">{t.rateComparison.flatRate}</p>
                    <p className="text-3xl font-bold text-primary">{interestRate}%</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t.rateComparison.flatDesc}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-muted-foreground mb-1">{t.rateComparison.effectiveRate}</p>
                    <p className="text-3xl font-bold text-amber-600">~{calculation.effectiveRate.toFixed(2)}%</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t.rateComparison.effectiveDesc}
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white/70 rounded-lg border border-primary/10">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {t.rateComparison.info}
                    </p>
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
