'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Building2,
  Calculator,
  TrendingUp,
  ArrowRight,
  Check,
  Info,
  Star,
  Percent,
  Clock,
  DollarSign,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebApplicationJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Comparison Tool',
      title: 'Loan',
      titleHighlight: 'Comparison',
      titleEnd: 'Tool',
      description: 'Compare loan rates from major Malaysian banks nationwide. Find the best deal for your home, car, or personal loan.',
    },
    loanTypes: {
      home: 'Home Loan',
      car: 'Car Loan',
      personal: 'Personal Loan',
    },
    loanDetails: {
      title: 'Loan Details',
      loanAmount: 'Loan Amount (RM)',
      loanTenure: 'Loan Tenure (Years)',
      years: 'years',
      months: 'months',
      resetDefault: 'Reset to Default',
    },
    bankSelection: {
      title: 'Select Banks',
      description: 'Choose up to 4 banks to compare',
    },
    comparison: {
      bestRate: 'Best Rate',
      popular: 'Popular',
      interestRate: 'Interest Rate',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
      to: 'to',
      perAnnum: 'p.a.',
    },
    bankFeatures: {
      flexiLoan: 'Flexi loan option',
      lowEntry: 'Low entry cost',
      onlineApp: 'Online application',
      fastApproval: 'Fast approval',
      flexibleRepay: 'Flexible repayment',
      noLockIn: 'No lock-in period',
      competitive: 'Competitive rates',
      highMargin: 'High margin financing',
      excellent: 'Excellent service',
      bundle: 'Bundle packages',
      cashback: 'Cashback rewards',
      easySwitching: 'Easy switching',
      digital: 'Digital convenience',
      lowProcessing: 'Low processing fee',
      quickDisburse: 'Quick disbursement',
      freeTakaful: 'Free takaful',
      salaryDeduct: 'Salary deduction',
      extraCashback: 'Extra cashback',
    },
    disclaimer: {
      title: 'Important Note',
      text: 'Interest rates shown are indicative and subject to change. Actual rates depend on your credit profile, loan amount, and bank policies. Contact the banks directly or use our consultation service for accurate quotes.',
    },
    faq: {
      title: 'Loan Comparison FAQ',
      description: 'Questions about how to read bank comparisons.',
      items: [
        {
          question: 'Are these rates guaranteed?',
          answer: 'No. Rates are indicative and depend on credit profile, amount, and bank policy.',
        },
        {
          question: 'Can I compare different loan types?',
          answer: 'Yes, you can switch between home, car, and personal loan comparisons.',
        },
        {
          question: 'What should I check besides interest rate?',
          answer: 'Look at fees, lock-in periods, approval speed, and flexible repayment terms.',
        },
      ],
    },
    cta: {
      title: 'Need Help Choosing the Right Loan?',
      description: 'Get personalized bank recommendations based on your profile for just RM30.',
      getAnalysis: 'Get Expert Analysis',
      eligibilityTest: 'Quick Eligibility Test',
    },
  },
  ms: {
    header: {
      badge: 'Alat Perbandingan',
      title: 'Alat',
      titleHighlight: 'Perbandingan',
      titleEnd: 'Pinjaman',
      description: 'Bandingkan kadar pinjaman dari bank utama di seluruh Malaysia. Cari tawaran terbaik untuk pinjaman rumah, kereta atau peribadi anda.',
    },
    loanTypes: {
      home: 'Pinjaman Rumah',
      car: 'Pinjaman Kereta',
      personal: 'Pinjaman Peribadi',
    },
    loanDetails: {
      title: 'Butiran Pinjaman',
      loanAmount: 'Jumlah Pinjaman (RM)',
      loanTenure: 'Tempoh Pinjaman (Tahun)',
      years: 'tahun',
      months: 'bulan',
      resetDefault: 'Set Semula ke Asal',
    },
    bankSelection: {
      title: 'Pilih Bank',
      description: 'Pilih sehingga 4 bank untuk dibandingkan',
    },
    comparison: {
      bestRate: 'Kadar Terbaik',
      popular: 'Popular',
      interestRate: 'Kadar Faedah',
      monthlyPayment: 'Bayaran Bulanan',
      totalInterest: 'Jumlah Faedah',
      totalPayment: 'Jumlah Bayaran',
      to: 'hingga',
      perAnnum: 'p.a.',
    },
    bankFeatures: {
      flexiLoan: 'Pilihan pinjaman flexi',
      lowEntry: 'Kos kemasukan rendah',
      onlineApp: 'Permohonan dalam talian',
      fastApproval: 'Kelulusan pantas',
      flexibleRepay: 'Bayaran balik fleksibel',
      noLockIn: 'Tiada tempoh kunci',
      competitive: 'Kadar kompetitif',
      highMargin: 'Pembiayaan margin tinggi',
      excellent: 'Perkhidmatan cemerlang',
      bundle: 'Pakej gabungan',
      cashback: 'Ganjaran pulangan tunai',
      easySwitching: 'Pertukaran mudah',
      digital: 'Kemudahan digital',
      lowProcessing: 'Yuran pemprosesan rendah',
      quickDisburse: 'Pengeluaran pantas',
      freeTakaful: 'Takaful percuma',
      salaryDeduct: 'Potongan gaji',
      extraCashback: 'Pulangan tunai tambahan',
    },
    disclaimer: {
      title: 'Nota Penting',
      text: 'Kadar faedah yang ditunjukkan adalah indikatif dan tertakluk kepada perubahan. Kadar sebenar bergantung kepada profil kredit, jumlah pinjaman, dan polisi bank anda. Hubungi bank secara langsung atau gunakan perkhidmatan konsultasi kami untuk sebut harga yang tepat.',
    },
    faq: {
      title: 'Soalan Lazim Perbandingan Pinjaman',
      description: 'Soalan tentang cara membaca perbandingan bank.',
      items: [
        {
          question: 'Adakah kadar ini dijamin?',
          answer: 'Tidak. Kadar adalah indikatif dan bergantung pada profil kredit, jumlah, dan polisi bank.',
        },
        {
          question: 'Boleh banding jenis pinjaman berbeza?',
          answer: 'Ya, anda boleh tukar antara pinjaman rumah, kereta, dan peribadi.',
        },
        {
          question: 'Apa lagi perlu disemak selain kadar?',
          answer: 'Semak yuran, tempoh lock-in, kelajuan kelulusan, dan fleksibiliti bayaran.',
        },
      ],
    },
    cta: {
      title: 'Perlukan Bantuan Memilih Pinjaman yang Betul?',
      description: 'Dapatkan cadangan bank yang diperibadikan berdasarkan profil anda dengan hanya RM30.',
      getAnalysis: 'Dapatkan Analisis Pakar',
      eligibilityTest: 'Ujian Kelayakan Pantas',
    },
  },
};

// Bank data with loan rates
const banks = [
  {
    id: 'maybank',
    name: 'Maybank',
    logo: '🏦',
    color: 'from-yellow-500 to-yellow-600',
    homeLoan: { min: 3.85, max: 4.50 },
    carLoan: { min: 2.48, max: 3.20 },
    personalLoan: { min: 5.00, max: 12.00 },
    maxTenure: { home: 35, car: 9, personal: 7 },
    featuresEn: ['Flexi loan option', 'Low entry cost', 'Online application'],
    featuresMs: ['Pilihan pinjaman flexi', 'Kos kemasukan rendah', 'Permohonan dalam talian'],
    popular: true,
  },
  {
    id: 'cimb',
    name: 'CIMB Bank',
    logo: '🏛️',
    color: 'from-red-500 to-red-600',
    homeLoan: { min: 3.90, max: 4.60 },
    carLoan: { min: 2.58, max: 3.30 },
    personalLoan: { min: 5.50, max: 13.00 },
    maxTenure: { home: 35, car: 9, personal: 7 },
    featuresEn: ['Fast approval', 'Flexible repayment', 'No lock-in period'],
    featuresMs: ['Kelulusan pantas', 'Bayaran balik fleksibel', 'Tiada tempoh kunci'],
    popular: true,
  },
  {
    id: 'publicbank',
    name: 'Public Bank',
    logo: '🏢',
    color: 'from-pink-500 to-pink-600',
    homeLoan: { min: 3.80, max: 4.40 },
    carLoan: { min: 2.38, max: 3.10 },
    personalLoan: { min: 5.28, max: 11.00 },
    maxTenure: { home: 35, car: 9, personal: 10 },
    featuresEn: ['Competitive rates', 'High margin financing', 'Excellent service'],
    featuresMs: ['Kadar kompetitif', 'Pembiayaan margin tinggi', 'Perkhidmatan cemerlang'],
    popular: true,
  },
  {
    id: 'rhb',
    name: 'RHB Bank',
    logo: '🏗️',
    color: 'from-blue-500 to-blue-600',
    homeLoan: { min: 3.88, max: 4.55 },
    carLoan: { min: 2.50, max: 3.25 },
    personalLoan: { min: 6.00, max: 14.00 },
    maxTenure: { home: 35, car: 9, personal: 7 },
    featuresEn: ['Bundle packages', 'Cashback rewards', 'Easy switching'],
    featuresMs: ['Pakej gabungan', 'Ganjaran pulangan tunai', 'Pertukaran mudah'],
    popular: false,
  },
  {
    id: 'hongleong',
    name: 'Hong Leong Bank',
    logo: '🏬',
    color: 'from-green-500 to-green-600',
    homeLoan: { min: 3.95, max: 4.65 },
    carLoan: { min: 2.60, max: 3.35 },
    personalLoan: { min: 5.88, max: 12.50 },
    maxTenure: { home: 35, car: 9, personal: 7 },
    featuresEn: ['Digital convenience', 'Low processing fee', 'Quick disbursement'],
    featuresMs: ['Kemudahan digital', 'Yuran pemprosesan rendah', 'Pengeluaran pantas'],
    popular: false,
  },
  {
    id: 'ambank',
    name: 'AmBank',
    logo: '🏨',
    color: 'from-purple-500 to-purple-600',
    homeLoan: { min: 3.92, max: 4.58 },
    carLoan: { min: 2.55, max: 3.28 },
    personalLoan: { min: 5.50, max: 12.00 },
    maxTenure: { home: 35, car: 9, personal: 7 },
    featuresEn: ['Free takaful', 'Salary deduction', 'Extra cashback'],
    featuresMs: ['Takaful percuma', 'Potongan gaji', 'Pulangan tunai tambahan'],
    popular: false,
  },
];

type LoanType = 'home' | 'car' | 'personal';

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

export default function ComparePage() {
  const { language } = useLanguage();
  const t = pageContent[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  const [loanType, setLoanType] = useState<LoanType>('home');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTenure, setLoanTenure] = useState(30);
  const [selectedBanks, setSelectedBanks] = useState<string[]>(['maybank', 'cimb', 'publicbank']);

  const loanTypes = [
    { id: 'home' as LoanType, label: t.loanTypes.home, icon: Building2, defaultAmount: 500000, defaultTenure: 30 },
    { id: 'car' as LoanType, label: t.loanTypes.car, icon: TrendingUp, defaultAmount: 100000, defaultTenure: 7 },
    { id: 'personal' as LoanType, label: t.loanTypes.personal, icon: DollarSign, defaultAmount: 50000, defaultTenure: 5 },
  ];

  const currentLoanType = loanTypes.find(lt => lt.id === loanType)!;

  const toggleBank = (bankId: string) => {
    if (selectedBanks.includes(bankId)) {
      if (selectedBanks.length > 1) {
        setSelectedBanks(selectedBanks.filter(id => id !== bankId));
      }
    } else {
      if (selectedBanks.length < 4) {
        setSelectedBanks([...selectedBanks, bankId]);
      }
    }
  };

  const comparison = useMemo(() => {
    return selectedBanks.map(bankId => {
      const bank = banks.find(b => b.id === bankId)!;
      const rateKey = loanType === 'home' ? 'homeLoan' : loanType === 'car' ? 'carLoan' : 'personalLoan';
      const rate = bank[rateKey];
      const minPayment = calculateMonthlyPayment(loanAmount, rate.min, loanTenure);
      const maxPayment = calculateMonthlyPayment(loanAmount, rate.max, loanTenure);
      const minTotalInterest = (minPayment * loanTenure * 12) - loanAmount;
      const maxTotalInterest = (maxPayment * loanTenure * 12) - loanAmount;

      return {
        bank,
        rate,
        minPayment,
        maxPayment,
        minTotalInterest,
        maxTotalInterest,
        totalPayment: {
          min: minPayment * loanTenure * 12,
          max: maxPayment * loanTenure * 12,
        },
      };
    }).sort((a, b) => a.rate.min - b.rate.min);
  }, [selectedBanks, loanType, loanAmount, loanTenure]);

  const getBankFeatures = (bank: typeof banks[0]) => {
    return language === 'ms' ? bank.featuresMs : bank.featuresEn;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebApplicationJsonLd
        name="Loan Comparison Tool"
        description="Compare Malaysian loan rates, tenures, and repayment estimates side by side."
        url={`${SEO.url}/tools/compare`}
      />
      <WebPageJsonLd
        url={`${SEO.url}/tools/compare`}
        title={`${t.header.title} ${t.header.titleHighlight} ${t.header.titleEnd}`}
        description={t.header.description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Tools', url: `${SEO.url}/tools` },
          { name: `${t.header.title} ${t.header.titleHighlight} ${t.header.titleEnd}`, url: `${SEO.url}/tools/compare` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <BarChart3 className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span> {t.header.titleEnd}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
        </div>

        {/* Loan Type Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {loanTypes.map((type) => (
            <Button
              key={type.id}
              variant={loanType === type.id ? 'default' : 'outline'}
              onClick={() => {
                setLoanType(type.id);
                setLoanAmount(type.defaultAmount);
                setLoanTenure(type.defaultTenure);
              }}
              className="gap-2"
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="surface-card border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  {t.loanDetails.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.loanDetails.loanAmount}</Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    min={10000}
                    max={loanType === 'home' ? 5000000 : loanType === 'car' ? 500000 : 200000}
                  />
                  <p className="text-xs text-muted-foreground">{formatCurrency(loanAmount)}</p>
                </div>

                <div className="space-y-2">
                  <Label>{t.loanDetails.loanTenure}</Label>
                  <Input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    min={1}
                    max={loanType === 'home' ? 35 : loanType === 'car' ? 9 : 10}
                  />
                  <p className="text-xs text-muted-foreground">{loanTenure} {t.loanDetails.years} = {loanTenure * 12} {t.loanDetails.months}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30"
                  onClick={() => {
                    setLoanAmount(currentLoanType.defaultAmount);
                    setLoanTenure(currentLoanType.defaultTenure);
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t.loanDetails.resetDefault}
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {t.bankSelection.title}
                </CardTitle>
                <CardDescription>{t.bankSelection.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => toggleBank(bank.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      selectedBanks.includes(bank.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{bank.logo}</span>
                      <span className="text-sm font-medium">{bank.name}</span>
                    </div>
                    {selectedBanks.includes(bank.id) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Comparison */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {comparison.map((item, index) => (
                <Card
                  key={item.bank.id}
                  className={`relative overflow-hidden surface-card border-primary/10 ${
                    index === 0 ? 'border-2 border-primary' : ''
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                      <Star className="h-3 w-3 inline mr-1" />
                      {t.comparison.bestRate}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-5 gap-6">
                      {/* Bank Info */}
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.bank.color} flex items-center justify-center text-2xl`}>
                          {item.bank.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.bank.name}</h3>
                            {item.bank.popular && (
                              <Badge variant="secondary" className="text-xs">{t.comparison.popular}</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {getBankFeatures(item.bank).slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-muted/70 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                          <Percent className="h-3 w-3" />
                          {t.comparison.interestRate}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {item.rate.min}%
                          {item.rate.max !== item.rate.min && (
                            <span className="text-base font-normal text-muted-foreground"> - {item.rate.max}%</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.comparison.perAnnum}</p>
                      </div>

                      {/* Monthly Payment */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                          <Clock className="h-3 w-3" />
                          {t.comparison.monthlyPayment}
                        </p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(item.minPayment)}
                        </p>
                        {item.maxPayment !== item.minPayment && (
                          <p className="text-xs text-muted-foreground">
                            {t.comparison.to} {formatCurrency(item.maxPayment)}
                          </p>
                        )}
                      </div>

                      {/* Total Interest */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {t.comparison.totalInterest}
                        </p>
                        <p className="text-xl font-semibold text-amber-600">
                          {formatCurrency(item.minTotalInterest)}
                        </p>
                        {item.maxTotalInterest !== item.minTotalInterest && (
                          <p className="text-xs text-muted-foreground">
                            {t.comparison.to} {formatCurrency(item.maxTotalInterest)}
                          </p>
                        )}
                      </div>

                      {/* Total Payment */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {t.comparison.totalPayment}
                        </p>
                        <p className="text-xl font-semibold">
                          {formatCurrency(item.totalPayment.min)}
                        </p>
                        {item.totalPayment.max !== item.totalPayment.min && (
                          <p className="text-xs text-muted-foreground">
                            {t.comparison.to} {formatCurrency(item.totalPayment.max)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-amber-50/70 border border-amber-200/70 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">{t.disclaimer.title}</p>
                  <p className="text-sm text-amber-700">
                    {t.disclaimer.text}
                  </p>
                </div>
              </div>
            </div>

            <Card className="mt-6 surface-card border-primary/10">
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

            <div className="mt-6">
              <TrustPanel
                title={trust.title}
                description={trust.description}
                items={trust.items}
              />
            </div>

            {/* CTA */}
            <Card className="mt-6 surface-card border-primary/15">
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
                    <Link href="/eligibility-test">
                      {t.cta.eligibilityTest}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
