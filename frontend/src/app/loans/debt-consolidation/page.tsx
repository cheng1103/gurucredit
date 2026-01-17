import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  ArrowRight,
  TrendingDown,
  Wallet,
  CreditCard,
  PiggyBank,
  Target,
  Clock,
  AlertTriangle,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

export const metadata = buildMetadata({
  title: 'Debt Consolidation Loan Guidance',
  description:
    'Debt consolidation guidance for Malaysia. Combine multiple debts into one payment with lower rates and a clearer repayment plan.',
  path: '/loans/debt-consolidation',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'debt consolidation Malaysia, consolidate loans, lower interest rate, DSR strategy, repayment plan',
});

const pageContent = {
  en: {
    header: {
      badge: 'Simplify Your Finances',
      title: 'Debt',
      titleHighlight: 'Consolidation',
      subtitle: 'Combine multiple debts into one manageable monthly payment. Lower your interest rate and pay off debt faster.',
    },
    stats: [
      { value: 'RM2,000+', label: 'Average Monthly Savings' },
      { value: '50%', label: 'Lower Interest Rate' },
      { value: '1', label: 'Simple Payment' },
      { value: '24hr', label: 'Fast Approval' },
    ],
    benefits: {
      title: 'Why Consolidate Your Debts?',
      items: [
        {
          icon: 'TrendingDown',
          title: 'Lower Interest Rates',
          description: 'Replace high-interest credit card debts (18-24%) with a single loan at 6-9% p.a.',
        },
        {
          icon: 'Wallet',
          title: 'One Monthly Payment',
          description: 'No more juggling multiple due dates. Just one payment to manage each month.',
        },
        {
          icon: 'Clock',
          title: 'Pay Off Faster',
          description: 'With lower interest, more of your payment goes to principal, helping you become debt-free sooner.',
        },
        {
          icon: 'PiggyBank',
          title: 'Save Money',
          description: 'Most customers save RM500-2,000+ per month by consolidating their debts.',
        },
      ],
    },
    comparison: {
      title: 'See How Much You Could Save',
      before: {
        title: 'Before Consolidation',
        items: [
          { name: 'Credit Card 1', rate: '18%', payment: 'RM800' },
          { name: 'Credit Card 2', rate: '24%', payment: 'RM600' },
          { name: 'Personal Loan', rate: '12%', payment: 'RM500' },
          { name: 'Car Loan', rate: '3.5%', payment: 'RM900' },
        ],
        total: 'RM2,800/month',
        totalLabel: 'Total Monthly Payment',
      },
      after: {
        title: 'After Consolidation',
        rate: '7.5%',
        payment: 'RM1,800/month',
        savings: 'RM1,000',
        savingsLabel: 'Monthly Savings',
      },
    },
    eligibility: {
      title: 'Who Should Consider Debt Consolidation?',
      items: [
        'You have multiple credit card debts',
        'You are paying high interest rates (above 10%)',
        'You struggle to track multiple payment dates',
        'Your total debt payments exceed 50% of income',
        'You want to become debt-free faster',
      ],
    },
    process: {
      title: 'How It Works',
      steps: [
        { step: '1', title: 'Submit Your Details', description: 'Tell us about your current debts and income' },
        { step: '2', title: 'Get Analysis', description: 'We analyze your situation and find the best consolidation option' },
        { step: '3', title: 'Bank Decision', description: 'Once approved by the bank, your existing debts are settled by the lender' },
        { step: '4', title: 'One Payment', description: 'Make one simple monthly payment at a lower rate' },
      ],
    },
    cta: {
      title: 'Ready to Simplify Your Finances?',
      description: 'Get a free debt consolidation analysis. No obligation, no hidden fees.',
      primary: 'Get Free Analysis',
      secondary: 'Chat on WhatsApp',
    },
    warning: {
      title: 'Important Considerations',
      items: [
        'Debt consolidation works best when you commit to not taking on new debt',
        'Total interest paid may be higher if loan tenure is extended significantly',
        'Your credit score may be temporarily affected when applying',
      ],
    },
    faq: {
      title: 'Debt Consolidation FAQ',
      items: [
        {
          question: 'Which debts can be consolidated?',
          answer: 'Most plans cover credit cards and personal loans. Hire purchase eligibility depends on the bank.',
        },
        {
          question: 'Will consolidation lower my monthly payment?',
          answer: 'Usually yes, if the new rate is lower and tenure is structured properly.',
        },
        {
          question: 'How soon will CCRIS improve?',
          answer: 'Expect improvements after 3-6 clean payment cycles once arrears are cleared.',
        },
      ],
    },
  },
  ms: {
    header: {
      badge: 'Permudahkan Kewangan Anda',
      title: 'Penyatuan',
      titleHighlight: 'Hutang',
      subtitle: 'Gabungkan pelbagai hutang menjadi satu bayaran bulanan. Kurangkan kadar faedah dan bayar hutang lebih cepat.',
    },
    stats: [
      { value: 'RM2,000+', label: 'Penjimatan Bulanan Purata' },
      { value: '50%', label: 'Kadar Faedah Lebih Rendah' },
      { value: '1', label: 'Bayaran Mudah' },
      { value: '24j', label: 'Kelulusan Cepat' },
    ],
    benefits: {
      title: 'Mengapa Satukan Hutang Anda?',
      items: [
        {
          icon: 'TrendingDown',
          title: 'Kadar Faedah Lebih Rendah',
          description: 'Gantikan hutang kad kredit faedah tinggi (18-24%) dengan satu pinjaman pada 6-9% setahun.',
        },
        {
          icon: 'Wallet',
          title: 'Satu Bayaran Bulanan',
          description: 'Tiada lagi mengurus pelbagai tarikh bayaran. Hanya satu bayaran sebulan.',
        },
        {
          icon: 'Clock',
          title: 'Bayar Lebih Cepat',
          description: 'Dengan faedah lebih rendah, lebih banyak bayaran anda ke prinsipal, membantu anda bebas hutang lebih cepat.',
        },
        {
          icon: 'PiggyBank',
          title: 'Jimat Wang',
          description: 'Kebanyakan pelanggan jimat RM500-2,000+ sebulan dengan menyatukan hutang mereka.',
        },
      ],
    },
    comparison: {
      title: 'Lihat Berapa Banyak Anda Boleh Jimat',
      before: {
        title: 'Sebelum Penyatuan',
        items: [
          { name: 'Kad Kredit 1', rate: '18%', payment: 'RM800' },
          { name: 'Kad Kredit 2', rate: '24%', payment: 'RM600' },
          { name: 'Pinjaman Peribadi', rate: '12%', payment: 'RM500' },
          { name: 'Pinjaman Kereta', rate: '3.5%', payment: 'RM900' },
        ],
        total: 'RM2,800/bulan',
        totalLabel: 'Jumlah Bayaran Bulanan',
      },
      after: {
        title: 'Selepas Penyatuan',
        rate: '7.5%',
        payment: 'RM1,800/bulan',
        savings: 'RM1,000',
        savingsLabel: 'Penjimatan Bulanan',
      },
    },
    eligibility: {
      title: 'Siapa Yang Patut Pertimbangkan Penyatuan Hutang?',
      items: [
        'Anda mempunyai pelbagai hutang kad kredit',
        'Anda membayar kadar faedah tinggi (melebihi 10%)',
        'Anda sukar mengingati pelbagai tarikh bayaran',
        'Jumlah bayaran hutang anda melebihi 50% pendapatan',
        'Anda mahu bebas hutang lebih cepat',
      ],
    },
    process: {
      title: 'Cara Ia Berfungsi',
      steps: [
        { step: '1', title: 'Hantar Butiran Anda', description: 'Beritahu kami tentang hutang dan pendapatan semasa anda' },
        { step: '2', title: 'Dapatkan Analisis', description: 'Kami analisis situasi anda dan cari pilihan penyatuan terbaik' },
        { step: '3', title: 'Keputusan Bank', description: 'Setelah diluluskan oleh bank, hutang sedia ada diselesaikan oleh pihak bank' },
        { step: '4', title: 'Satu Bayaran', description: 'Buat satu bayaran bulanan mudah pada kadar lebih rendah' },
      ],
    },
    cta: {
      title: 'Bersedia untuk Permudahkan Kewangan Anda?',
      description: 'Dapatkan analisis penyatuan hutang percuma. Tiada komitmen, tiada yuran tersembunyi.',
      primary: 'Dapatkan Analisis Percuma',
      secondary: 'Sembang di WhatsApp',
    },
    warning: {
      title: 'Pertimbangan Penting',
      items: [
        'Penyatuan hutang berkesan apabila anda komited untuk tidak ambil hutang baru',
        'Jumlah faedah dibayar mungkin lebih tinggi jika tempoh pinjaman dilanjutkan dengan ketara',
        'Skor kredit anda mungkin terjejas sementara apabila memohon',
      ],
    },
    faq: {
      title: 'Soalan Lazim Penyatuan Hutang',
      items: [
        {
          question: 'Hutang apa yang boleh disatukan?',
          answer: 'Kebanyakan pelan meliputi kad kredit dan pinjaman peribadi; hire purchase ikut bank.',
        },
        {
          question: 'Adakah ansuran bulanan akan turun?',
          answer: 'Selalunya ya, jika kadar baharu lebih rendah dan tempoh disusun dengan betul.',
        },
        {
          question: 'Bila CCRIS akan pulih?',
          answer: 'Biasanya selepas 3-6 kitaran bayaran bersih selepas tunggakan diselesaikan.',
        },
      ],
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingDown,
  Wallet,
  Clock,
  PiggyBank,
};

export default async function DebtConsolidationPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <>
      <LoanProductJsonLd
        name="Debt Consolidation Loan"
        description="Combine multiple debts into one manageable monthly payment with lower interest rates"
        interestRate="6-9% p.a."
        loanTerm="1-7 years"
        minAmount={10000}
        maxAmount={200000}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/debt-consolidation`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: `${t.header.title} ${t.header.titleHighlight}`, url: `${SEO.url}/loans/debt-consolidation` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container relative">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <CreditCard className="h-3 w-3 mr-1" aria-hidden="true" />
              {t.header.badge}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.header.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.stats.map((stat, index) => (
              <Card key={index} className="text-center surface-card">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.benefits.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.benefits.items.map((benefit, index) => {
                const Icon = iconMap[benefit.icon];
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors surface-card">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.comparison.title}</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Before */}
              <Card className="border-red-200 bg-red-50/50 surface-card">
                <CardHeader>
                  <CardTitle className="text-red-700">{t.comparison.before.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t.comparison.before.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-red-600">{item.rate} interest</p>
                        </div>
                        <p className="font-bold">{item.payment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">{t.comparison.before.totalLabel}</p>
                      <p className="text-2xl font-bold text-red-600">{t.comparison.before.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* After */}
              <Card className="border-green-200 bg-green-50/50 surface-card">
                <CardHeader>
                  <CardTitle className="text-green-700">{t.comparison.after.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-1">Single Loan at</p>
                    <p className="text-4xl font-bold text-green-600 mb-4">{t.comparison.after.rate}</p>
                    <p className="text-sm text-muted-foreground mb-1">New Monthly Payment</p>
                    <p className="text-3xl font-bold mb-6">{t.comparison.after.payment}</p>
                    <div className="p-4 bg-green-100 rounded-xl">
                      <p className="text-sm text-green-700 mb-1">{t.comparison.after.savingsLabel}</p>
                      <p className="text-3xl font-bold text-green-600">{t.comparison.after.savings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Eligibility */}
          <section className="mb-16">
            <Card className="max-w-3xl mx-auto surface-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t.eligibility.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.eligibility.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.process.title}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {t.process.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < t.process.steps.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-6 -right-3 h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Warning */}
          <section className="mb-16">
            <Card className="max-w-3xl mx-auto border-amber-200 bg-amber-50/50 surface-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">{t.warning.title}</h3>
                    <ul className="space-y-2">
                      {t.warning.items.map((item, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.faq.title}</h2>
              <div className="grid gap-4">
                {t.faq.items.map((item) => (
                  <Card key={item.question} className="surface-card border-primary/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <TrustPanel
                title={trust.title}
                description={trust.description}
                items={trust.items}
              />
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25">
                    <Link href="/services/1/apply">
                      {t.cta.primary}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      {t.cta.secondary}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
