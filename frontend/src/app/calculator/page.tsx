'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Calculator,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Home,
  Car,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp,
  Sparkles,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { CalculatorJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Free Tool',
      title: 'DSR Calculator',
      description: 'Calculate your Debt Service Ratio to understand your borrowing capacity. Most Malaysian banks require DSR below 60-70%.',
      note: 'Use net income after EPF/SOCSO. Results are estimates for guidance only.',
    },
    highlights: [
      { title: 'Bank-friendly DSR', description: 'Aim for 50% or lower to improve approval odds.' },
      { title: 'Instant feedback', description: 'See your risk tier and recommended next steps.' },
      { title: 'No sign-up', description: 'Free tool with no login required.' },
    ],
    form: {
      title: 'Enter Your Details',
      subtitle: 'All amounts in Malaysian Ringgit (RM)',
      income: {
        label: 'Monthly Net Income',
        placeholder: '5,000',
        hint: 'Your take-home pay after deductions (EPF, SOCSO, tax)',
      },
      debts: {
        label: 'Total Monthly Debt Payments',
        placeholder: '1,500',
        hint: 'All your monthly loan payments combined',
        expandLabel: 'Or enter by category',
        collapseLabel: 'Use simple mode',
        items: [
          { id: 'house', label: 'House/Property Loan' },
          { id: 'car', label: 'Car Loan' },
          { id: 'personal', label: 'Personal Loan' },
          { id: 'credit', label: 'Credit Card (min payment)' },
          { id: 'other', label: 'Other Debts (PTPTN, etc.)' },
        ],
      },
      calculate: 'Calculate DSR',
      enterIncome: 'Please enter your monthly income',
    },
    results: {
      title: 'Your DSR Result',
      noResults: {
        title: 'No Results Yet',
        description: 'Enter your income and debts to calculate your DSR',
      },
      maxDebt: {
        title: 'Max Additional Monthly Debt',
        hint: 'To maintain DSR below 50%',
      },
      status: {
        excellent: 'Excellent',
        good: 'Good',
        moderate: 'Moderate',
        high: 'High Risk',
        critical: 'Critical',
      },
      recommendations: {
        excellent: 'Your DSR is excellent! You have strong borrowing capacity and most banks will approve your loan application with favorable terms.',
        good: 'Your DSR is good. You have reasonable borrowing capacity and most banks will consider your application favorably.',
        moderate: 'Your DSR is moderate. Some banks may require additional documentation or offer less favorable terms.',
        high: 'Your DSR is high. Consider reducing existing debts before applying for new loans. Limited bank options available.',
        critical: 'Your DSR is critical. Debt consolidation is strongly recommended before any new loan applications.',
      },
    },
    cta: {
      title: 'Want Expert Analysis?',
      description: 'Get personalized advice on your credit profile and bank recommendations.',
      button: 'Get Full Analysis - RM30',
    },
    faq: {
      title: 'DSR Calculator FAQ',
      description: 'Quick answers to common DSR questions.',
      items: [
        {
          question: 'What DSR is considered safe?',
          answer: 'Most Malaysian banks prefer DSR below 60-70%, with stronger approvals below 50%.',
        },
        {
          question: 'Should I use gross or net income?',
          answer: 'Use net income after EPF/SOCSO for a more accurate DSR estimate.',
        },
        {
          question: 'Does DSR include PTPTN?',
          answer: 'Yes, PTPTN and other fixed monthly commitments should be included.',
        },
      ],
    },
    info: {
      badge: 'Learn More',
      title: 'Understanding DSR',
      whatIs: {
        title: 'What is DSR?',
        description: 'Debt Service Ratio (DSR) is the percentage of your monthly income that goes towards debt payments. Banks use this metric to assess your ability to repay loans and determine your credit worthiness.',
      },
      formula: {
        title: 'Formula',
        content: 'DSR = (Total Monthly Debt ÷ Monthly Income) × 100',
      },
      guidelines: {
        title: 'DSR Guidelines',
        items: [
          { range: 'Below 30%', desc: 'Excellent - Best rates available' },
          { range: '30-40%', desc: 'Good - Most banks approve' },
          { range: '40-50%', desc: 'Moderate - Some restrictions' },
          { range: '50-70%', desc: 'High - Limited options' },
          { range: 'Above 70%', desc: 'Critical - Most banks reject' },
        ],
      },
    },
  },
  ms: {
    header: {
      badge: 'Alat Percuma',
      title: 'Kalkulator DSR',
      description: 'Kira Nisbah Khidmat Hutang anda untuk memahami kapasiti peminjaman anda. Kebanyakan bank Malaysia memerlukan DSR di bawah 60-70%.',
      note: 'Gunakan pendapatan bersih selepas EPF/SOCSO. Ini anggaran untuk panduan sahaja.',
    },
    highlights: [
      { title: 'DSR mesra bank', description: 'Sasarkan 50% atau kurang untuk peluang lebih baik.' },
      { title: 'Maklum balas segera', description: 'Lihat tahap risiko dan langkah seterusnya.' },
      { title: 'Tiada pendaftaran', description: 'Alat percuma tanpa log masuk.' },
    ],
    form: {
      title: 'Masukkan Butiran Anda',
      subtitle: 'Semua jumlah dalam Ringgit Malaysia (RM)',
      income: {
        label: 'Pendapatan Bersih Bulanan',
        placeholder: '5,000',
        hint: 'Gaji bersih anda selepas potongan (EPF, SOCSO, cukai)',
      },
      debts: {
        label: 'Jumlah Bayaran Hutang Bulanan',
        placeholder: '1,500',
        hint: 'Semua bayaran pinjaman bulanan anda digabungkan',
        expandLabel: 'Atau masukkan mengikut kategori',
        collapseLabel: 'Gunakan mod mudah',
        items: [
          { id: 'house', label: 'Pinjaman Rumah/Hartanah' },
          { id: 'car', label: 'Pinjaman Kereta' },
          { id: 'personal', label: 'Pinjaman Peribadi' },
          { id: 'credit', label: 'Kad Kredit (bayaran min)' },
          { id: 'other', label: 'Hutang Lain (PTPTN, dll.)' },
        ],
      },
      calculate: 'Kira DSR',
      enterIncome: 'Sila masukkan pendapatan bulanan anda',
    },
    results: {
      title: 'Keputusan DSR Anda',
      noResults: {
        title: 'Tiada Keputusan Lagi',
        description: 'Masukkan pendapatan dan hutang anda untuk mengira DSR anda',
      },
      maxDebt: {
        title: 'Hutang Bulanan Tambahan Maksimum',
        hint: 'Untuk mengekalkan DSR di bawah 50%',
      },
      status: {
        excellent: 'Cemerlang',
        good: 'Baik',
        moderate: 'Sederhana',
        high: 'Risiko Tinggi',
        critical: 'Kritikal',
      },
      recommendations: {
        excellent: 'DSR anda cemerlang! Anda mempunyai kapasiti peminjaman yang kukuh dan kebanyakan bank akan meluluskan permohonan pinjaman anda dengan syarat yang baik.',
        good: 'DSR anda baik. Anda mempunyai kapasiti peminjaman yang munasabah dan kebanyakan bank akan mempertimbangkan permohonan anda dengan baik.',
        moderate: 'DSR anda sederhana. Sesetengah bank mungkin memerlukan dokumentasi tambahan atau menawarkan syarat yang kurang baik.',
        high: 'DSR anda tinggi. Pertimbangkan untuk mengurangkan hutang sedia ada sebelum memohon pinjaman baru. Pilihan bank terhad.',
        critical: 'DSR anda kritikal. Penggabungan hutang sangat disyorkan sebelum sebarang permohonan pinjaman baru.',
      },
    },
    cta: {
      title: 'Mahu Analisis Pakar?',
      description: 'Dapatkan nasihat peribadi tentang profil kredit anda dan cadangan bank.',
      button: 'Dapatkan Analisis Penuh - RM30',
    },
    faq: {
      title: 'Soalan Lazim Kalkulator DSR',
      description: 'Jawapan ringkas untuk soalan DSR.',
      items: [
        {
          question: 'DSR berapa dianggap selamat?',
          answer: 'Kebanyakan bank Malaysia suka DSR bawah 60-70%, lebih kuat jika bawah 50%.',
        },
        {
          question: 'Guna pendapatan kasar atau bersih?',
          answer: 'Guna pendapatan bersih selepas EPF/SOCSO untuk anggaran lebih tepat.',
        },
        {
          question: 'Adakah DSR termasuk PTPTN?',
          answer: 'Ya, PTPTN dan komitmen bulanan tetap perlu dimasukkan.',
        },
      ],
    },
    info: {
      badge: 'Ketahui Lebih Lanjut',
      title: 'Memahami DSR',
      whatIs: {
        title: 'Apa itu DSR?',
        description: 'Nisbah Khidmat Hutang (DSR) adalah peratusan pendapatan bulanan anda yang digunakan untuk bayaran hutang. Bank menggunakan metrik ini untuk menilai keupayaan anda membayar balik pinjaman dan menentukan kelayakan kredit anda.',
      },
      formula: {
        title: 'Formula',
        content: 'DSR = (Jumlah Hutang Bulanan ÷ Pendapatan Bulanan) × 100',
      },
      guidelines: {
        title: 'Panduan DSR',
        items: [
          { range: 'Bawah 30%', desc: 'Cemerlang - Kadar terbaik tersedia' },
          { range: '30-40%', desc: 'Baik - Kebanyakan bank lulus' },
          { range: '40-50%', desc: 'Sederhana - Beberapa sekatan' },
          { range: '50-70%', desc: 'Tinggi - Pilihan terhad' },
          { range: 'Atas 70%', desc: 'Kritikal - Kebanyakan bank tolak' },
        ],
      },
    },
  },
};

interface DSRResult {
  dsrPercentage: number;
  status: 'excellent' | 'good' | 'moderate' | 'high' | 'critical';
  recommendation: string;
  maxAdditionalDebt: number;
}

const statusConfig = {
  excellent: {
    color: 'bg-emerald-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: CheckCircle,
  },
  good: {
    color: 'bg-green-500',
    bgLight: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    icon: CheckCircle,
  },
  moderate: {
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    icon: AlertTriangle,
  },
  high: {
    color: 'bg-orange-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    icon: AlertTriangle,
  },
  critical: {
    color: 'bg-red-500',
    bgLight: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    icon: AlertTriangle,
  },
};

const guidelineColors = [
  'bg-emerald-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-red-500',
];

const debtIcons = [Home, Car, Wallet, CreditCard, PiggyBank];

export default function CalculatorPage() {
  const { language } = useLanguage();
  const t = pageContent[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [totalDebt, setTotalDebt] = useState('');
  const [detailedMode, setDetailedMode] = useState(false);
  const [debts, setDebts] = useState<Record<string, string>>({
    house: '',
    car: '',
    personal: '',
    credit: '',
    other: '',
  });
  const [result, setResult] = useState<DSRResult | null>(null);

  const handleDebtChange = (id: string, value: string) => {
    setDebts((prev) => ({ ...prev, [id]: value }));
  };

  const getDetailedTotal = () => {
    return Object.values(debts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const calculateDSR = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const totalDebts = detailedMode ? getDetailedTotal() : (parseFloat(totalDebt) || 0);

    if (income <= 0) {
      alert(t.form.enterIncome);
      return;
    }

    const dsrPercentage = (totalDebts / income) * 100;

    let status: DSRResult['status'];
    let recommendation: string;

    if (dsrPercentage <= 30) {
      status = 'excellent';
      recommendation = t.results.recommendations.excellent;
    } else if (dsrPercentage <= 40) {
      status = 'good';
      recommendation = t.results.recommendations.good;
    } else if (dsrPercentage <= 50) {
      status = 'moderate';
      recommendation = t.results.recommendations.moderate;
    } else if (dsrPercentage <= 60) {
      status = 'high';
      recommendation = t.results.recommendations.high;
    } else {
      status = 'critical';
      recommendation = t.results.recommendations.critical;
    }

    const maxTotalDebt = income * 0.5;
    const maxAdditionalDebt = Math.max(0, maxTotalDebt - totalDebts);

    setResult({
      dsrPercentage: Math.round(dsrPercentage * 100) / 100,
      status,
      recommendation,
      maxAdditionalDebt: Math.round(maxAdditionalDebt),
    });
  };

  const resetCalculator = () => {
    setMonthlyIncome('');
    setTotalDebt('');
    setDebts({ house: '', car: '', personal: '', credit: '', other: '' });
    setResult(null);
  };

  const config = result ? statusConfig[result.status] : null;

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <CalculatorJsonLd />
      <WebPageJsonLd
        url={`${SEO.url}/calculator`}
        title={t.header.title}
        description={t.header.description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.header.title, url: `${SEO.url}/calculator` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Calculator className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.header.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <p className="text-sm text-muted-foreground mt-3">{t.header.note}</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {t.highlights.map((item) => (
              <Card key={item.title} className="p-4 text-left surface-card">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-2 surface-card">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  {t.form.title}
                </CardTitle>
                <CardDescription>{t.form.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Income Input */}
                <div className="space-y-2">
                  <Label htmlFor="income" className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {t.form.income.label} *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      RM
                    </span>
                    <Input
                      id="income"
                      type="number"
                      placeholder={t.form.income.placeholder}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="pl-12 h-12 text-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{t.form.income.hint}</p>
                </div>

                {/* Debt Input - Simple Mode */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    {t.form.debts.label}
                  </Label>

                  {!detailedMode && (
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                          RM
                        </span>
                        <Input
                          type="number"
                          placeholder={t.form.debts.placeholder}
                          value={totalDebt}
                          onChange={(e) => setTotalDebt(e.target.value)}
                          className="pl-12 h-12 text-lg"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{t.form.debts.hint}</p>
                    </div>
                  )}

                  {/* Expandable Detailed Mode */}
                  <Collapsible open={detailedMode} onOpenChange={setDetailedMode}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto">
                        <ChevronDown className={cn("h-4 w-4 mr-1 transition-transform", detailedMode && "rotate-180")} />
                        {detailedMode ? t.form.debts.collapseLabel : t.form.debts.expandLabel}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border">
                        {t.form.debts.items.map((input, index) => {
                          const Icon = debtIcons[index];
                          return (
                            <div key={input.id} className="space-y-1.5">
                              <Label htmlFor={input.id} className="text-sm flex items-center gap-1.5">
                                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                {input.label}
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                  RM
                                </span>
                                <Input
                                  id={input.id}
                                  type="number"
                                  placeholder="0"
                                  value={debts[input.id]}
                                  onChange={(e) => handleDebtChange(input.id, e.target.value)}
                                  className="pl-12"
                                />
                              </div>
                            </div>
                          );
                        })}
                        {getDetailedTotal() > 0 && (
                          <div className="sm:col-span-2 pt-2 border-t mt-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Total:</span>
                              <span className="font-semibold text-primary">RM {getDetailedTotal().toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    size="lg"
                    className="flex-1 h-12 text-base font-semibold btn-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    onClick={calculateDSR}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t.form.calculate}
                  </Button>
                  <Button size="lg" variant="outline" onClick={resetCalculator} className="h-12 px-4">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {result && config ? (
              <>
                <Card className="shadow-lg border-2 overflow-hidden surface-card">
                  <CardHeader className={`${config.bgLight} border-b ${config.border}`}>
                    <CardTitle className="text-lg">{t.results.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* DSR Display */}
                    <div className="text-center mb-6">
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-36 h-36 transform -rotate-90">
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-muted/30"
                          />
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${Math.min(result.dsrPercentage, 100) * 3.77} 377`}
                            className={config.text}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-3xl font-bold">{result.dsrPercentage}%</span>
                          <span className="text-xs text-muted-foreground">DSR</span>
                        </div>
                      </div>
                      <Badge className={`${config.color} text-white mt-4`}>
                        {t.results.status[result.status]}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 mb-6">
                      <div className="relative">
                        <svg
                          className={cn(
                            "h-3 w-full text-primary",
                            config.color.replace('bg-', 'text-')
                          )}
                          viewBox="0 0 100 4"
                          preserveAspectRatio="none"
                        >
                          <rect width="100" height="4" rx="2" fill="var(--muted)" />
                          <rect
                            width={Math.min(result.dsrPercentage, 100)}
                            height="4"
                            rx="2"
                            fill="currentColor"
                          />
                          {[30, 50, 70].map((position) => (
                            <line
                              key={position}
                              x1={position}
                              x2={position}
                              y1="0"
                              y2="4"
                              stroke="var(--border)"
                              strokeWidth="0.5"
                            />
                          ))}
                        </svg>
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>0%</span>
                        <span>30%</span>
                        <span>50%</span>
                        <span>70%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`p-4 rounded-xl ${config.bgLight} border ${config.border}`}>
                      <div className="flex items-start gap-3">
                        <config.icon className={`h-5 w-5 ${config.text} mt-0.5 shrink-0`} />
                        <p className="text-sm leading-relaxed">{result.recommendation}</p>
                      </div>
                    </div>

                    {/* Max Additional Debt */}
                    {result.maxAdditionalDebt > 0 && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm font-medium mb-1">{t.results.maxDebt.title}</p>
                        <p className="text-2xl font-bold text-primary">RM{result.maxAdditionalDebt.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{t.results.maxDebt.hint}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 surface-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Info className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{t.cta.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.cta.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full font-semibold btn-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40"
                      size="lg"
                      asChild
                    >
                      <Link href="/services">
                        {t.cta.button}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full min-h-[400px] flex items-center justify-center shadow-lg border-2 border-dashed surface-card">
                <CardContent className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground font-medium mb-1">{t.results.noResults.title}</p>
                  <p className="text-sm text-muted-foreground/70">{t.results.noResults.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16">
          <Card className="shadow-lg overflow-hidden surface-card">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
              <Badge variant="outline" className="w-fit mb-2">
                <Info className="h-3 w-3 mr-1" />
                {t.info.badge}
              </Badge>
              <CardTitle>{t.info.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">?</span>
                      </div>
                      {t.info.whatIs.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.info.whatIs.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">=</span>
                      </div>
                      {t.info.formula.title}
                    </h4>
                    <code className="block bg-muted p-4 rounded-lg text-sm font-mono">
                      {t.info.formula.content}
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t.info.guidelines.title}</h4>
                  <ul className="space-y-3">
                    {t.info.guidelines.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${guidelineColors[index]}`} />
                        <span className="text-sm">
                          <strong>{item.range}:</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

        <div className="mt-16">
          <Card className="shadow-lg surface-card">
            <CardHeader>
              <CardTitle>{t.faq.title}</CardTitle>
              <CardDescription>{t.faq.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {t.faq.items.map((item) => (
                <div key={item.question} className="rounded-xl border border-border/60 bg-white/70 p-4">
                  <p className="font-semibold text-foreground mb-2">{item.question}</p>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
