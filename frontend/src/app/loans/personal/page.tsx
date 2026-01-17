import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Wallet,
  Shield,
  Clock,
  ChevronRight,
  Target,
  MessageCircle,
  Percent,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

export const metadata = buildMetadata({
  title: 'Personal Loan Playbook',
  description:
    'Personal loan guidance for Malaysians. Get DSR strategy, CCRIS/CTOS checks, and lender shortlists to unlock better personal financing terms.',
  path: '/loans/personal',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'personal loan Malaysia, personal financing, DSR analysis, CCRIS CTOS, loan guidance, lender shortlist',
});

const pageContent = {
  en: {
    header: {
      badge: 'Guided Personal Financing',
      title: 'Personal Loan',
      titleHighlight: 'Playbook',
      subtitle:
        'Action plan, lender shortlist, and DSR strategy to unlock up to RM100,000 in personal financing at rates from 4.88% flat p.a.',
    },
    stats: [
      { value: 'RM100k', label: 'Max Amount' },
      { value: '4.88%', label: 'From Rate' },
      { value: '24h', label: 'Analysis Speed' },
      { value: '7 yrs', label: 'Max Tenure' },
    ],
    benefits: {
      title: 'Why Borrow With Guidance?',
      items: [
        {
          icon: 'Zap',
          title: 'Faster Access',
          description: 'Pre-check DSR and documents so bank responses can be faster.',
        },
        {
          icon: 'Wallet',
          title: 'Better Offers',
          description: 'Compare banks that match your profile to negotiate lower flat rates.',
        },
        {
          icon: 'Shield',
          title: 'Cleaner Credit',
          description: 'Spot CTOS/CCRIS issues early and avoid unnecessary rejections.',
        },
        {
          icon: 'Clock',
          title: 'Stress-Free Process',
          description: 'We manage follow-ups, timelines, and insurer upsells so you stay in control.',
        },
      ],
    },
    comparison: {
      title: 'Sample Funding Scenario',
      before: {
        title: 'Without Guidance',
        items: [
          { name: 'Random Bank A', rate: '8.5%', payment: 'RM1,950' },
          { name: 'Random Bank B', rate: '9.9%', payment: 'RM2,050' },
          { name: 'Fees & Insurance', rate: 'RM2,000', payment: 'Paid Upfront' },
        ],
        total: 'RM4,000+ upfront',
        totalLabel: 'Cash Needed / Higher Monthly',
      },
      after: {
        title: 'With GURU Credits Plan',
        rate: '4.88% - 6.5%',
        payment: 'RM1,480/month',
        savings: 'RM570+/month',
        savingsLabel: 'Potential Savings',
      },
    },
    eligibility: {
      title: 'Ideal Personal Loan Candidates',
      items: [
        'Monthly income RM2,500+ with 6 months tenure',
        'DSR below 65% after consolidation',
        'Clean or resolved CCRIS/CTOS within 12 months',
        'Company-listed employers or verified business income',
        'Need funds for medical, education, renovation, or consolidation',
      ],
    },
    process: {
      title: '3-Step Guided Process',
      steps: [
        { step: '01', title: 'Share Your Profile', description: 'Income, commitments, CCRIS/CTOS & target amount' },
        { step: '02', title: 'Receive Strategy', description: 'We run DSR, shortlist banks, and prep documents' },
        { step: '03', title: 'Submit & Follow Up', description: 'We coordinate submission, insurer upsells, and disbursement' },
        { step: '04', title: 'Funds Disbursed', description: 'Track payout status and repayment reminders' },
      ],
    },
    warning: {
      title: 'Need to Know',
      items: [
        'Flat rates advertise lower numbers than effective rates – we calculate both',
        'Banks may offer bundled insurance; we benchmark if it is optional',
        'Multiple simultaneous applications can hurt approval odds',
      ],
    },
    faq: {
      title: 'Personal Loan FAQ',
      items: [
        {
          question: 'How fast can personal loan decisions happen?',
          answer: 'With complete documents, some banks respond within 24-48 hours, but timelines vary.',
        },
        {
          question: 'What DSR is acceptable for personal loans?',
          answer: 'Most banks prefer DSR below 65%, with stronger odds below 55%.',
        },
        {
          question: 'Are flat rates the same as effective rates?',
          answer: 'No. Flat rates appear lower; effective rates show the true annual cost.',
        },
      ],
    },
    cta: {
      title: 'Ready to Unlock RM100k?',
      description: 'Start with a RM30 analysis that includes DSR review, CCRIS/CTOS audit, and lender shortlist.',
      primary: 'Book My Analysis',
      secondary: 'Chat on WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Pinjaman Peribadi Berpandu',
      title: 'Panduan Pinjaman',
      titleHighlight: 'Peribadi',
      subtitle:
        'Pelan tindakan, senarai bank dan strategi DSR untuk mendapatkan sehingga RM100,000 dengan kadar bermula 4.88% setahun.',
    },
    stats: [
      { value: 'RM100k', label: 'Jumlah Maksimum' },
      { value: '4.88%', label: 'Kadar Dari' },
      { value: '24j', label: 'Masa Analisis' },
      { value: '7 thn', label: 'Tempoh Maksimum' },
    ],
    benefits: {
      title: 'Mengapa Berbimbing?',
      items: [
        {
          icon: 'Zap',
          title: 'Akses Lebih Pantas',
          description: 'Semak DSR & dokumen awal supaya kelulusan hadir dalam 24-48 jam.',
        },
        {
          icon: 'Wallet',
          title: 'Tawaran Lebih Baik',
          description: 'Banding bank yang sepadan profil anda untuk runding kadar lebih rendah.',
        },
        {
          icon: 'Shield',
          title: 'Rekod Lebih Bersih',
          description: 'Kenal pasti isu CTOS/CCRIS awal dan elak penolakan tidak perlu.',
        },
        {
          icon: 'Clock',
          title: 'Proses Tanpa Tekanan',
          description: 'Kami urus susulan, garis masa dan upsell insurans supaya anda terkawal.',
        },
      ],
    },
    comparison: {
      title: 'Senario Pembiayaan Contoh',
      before: {
        title: 'Tanpa Bimbingan',
        items: [
          { name: 'Bank Rawak A', rate: '8.5%', payment: 'RM1,950' },
          { name: 'Bank Rawak B', rate: '9.9%', payment: 'RM2,050' },
          { name: 'Yuran & Insurans', rate: 'RM2,000', payment: 'Bayar Awal' },
        ],
        total: 'RM4,000+ tunai awal',
        totalLabel: 'Tunai diperlukan / bayaran tinggi',
      },
      after: {
        title: 'Dengan Pelan GURU Credits',
        rate: '4.88% - 6.5%',
        payment: 'RM1,480/bln',
        savings: 'Jimatan RM570+/bln',
        savingsLabel: 'Potensi Jimatan',
      },
    },
    eligibility: {
      title: 'Calon Ideal Pinjaman Peribadi',
      items: [
        'Pendapatan bulanan RM2,500+ dengan tempoh kerja 6 bulan',
        'DSR di bawah 65% selepas penstrukturan',
        'CCRIS/CTOS bersih atau diselesaikan dalam 12 bulan',
        'Majikan tersenarai atau pendapatan perniagaan dibuktikan',
        'Dana diperlukan untuk perubatan, pendidikan, renovasi atau penyatuan hutang',
      ],
    },
    process: {
      title: 'Proses 3 Langkah',
      steps: [
        { step: '01', title: 'Kongsi Profil', description: 'Pendapatan, komitmen, CCRIS/CTOS & jumlah sasaran' },
        { step: '02', title: 'Terima Strategi', description: 'Kami kira DSR, pilih bank dan sediakan dokumen' },
        { step: '03', title: 'Hantar & Susulan', description: 'Kami urus penghantaran, upsell insurans dan kemaskini' },
        { step: '04', title: 'Dana Dimasukkan', description: 'Jejak status bayaran dan ingatan pembayaran semula' },
      ],
    },
    warning: {
      title: 'Perkara Penting',
      items: [
        'Kadar rata nampak rendah berbanding kadar efektif – kami kira kedua-duanya',
        'Bank mungkin tawar insurans berikat; kami semak sama ada wajib',
        'Permohonan serentak berganda boleh jejaskan peluang kelulusan',
      ],
    },
    faq: {
      title: 'Soalan Lazim Pinjaman Peribadi',
      items: [
        {
          question: 'Berapa cepat kelulusan pinjaman peribadi?',
          answer: 'Jika dokumen lengkap, kelulusan boleh berlaku dalam 24-48 jam.',
        },
        {
          question: 'DSR berapa yang diterima?',
          answer: 'Kebanyakan bank mahu DSR bawah 65%, lebih kuat jika bawah 55%.',
        },
        {
          question: 'Adakah kadar rata sama dengan kadar efektif?',
          answer: 'Tidak. Kadar rata nampak rendah; kadar efektif menunjukkan kos sebenar tahunan.',
        },
      ],
    },
    cta: {
      title: 'Sedia Dapatkan RM100k?',
      description: 'Mulakan dengan analisis RM30 yang merangkumi semakan DSR, audit CCRIS/CTOS dan senarai bank.',
      primary: 'Tempah Analisis Saya',
      secondary: 'Chat di WhatsApp',
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Wallet,
  Shield,
  Clock,
};

export default async function PersonalLoanPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <>
      <LoanProductJsonLd
        name="Personal Loan Malaysia"
        description="Personal loan guidance with RM30 analysis, DSR strategy, and curated bank shortlist."
        interestRate="4.88% - 8.5% flat p.a."
        loanTerm="1-7 years"
        minAmount={5000}
        maxAmount={100000}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/personal`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.header.title, url: `${SEO.url}/loans/personal` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Percent className="h-3 w-3 mr-1" aria-hidden="true" />
              {t.header.badge}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.header.subtitle}</p>
          </div>

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

          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.comparison.title}</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                          <p className="text-xs text-red-600">{item.rate}</p>
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

              <Card className="border-green-200 bg-green-50/50 surface-card">
                <CardHeader>
                  <CardTitle className="text-green-700">{t.comparison.after.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-1">Guided Bank Package</p>
                    <p className="text-4xl font-bold text-green-600 mb-4">{t.comparison.after.rate}</p>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
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

          <section className="mb-16">
            <Card className="max-w-3xl mx-auto border-amber-200 bg-amber-50/50 surface-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-amber-600 shrink-0" aria-hidden="true" />
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

          <section>
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.cta.description}</p>
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
