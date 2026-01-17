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
  FileText,
  Calculator,
  Layers,
  Shield,
  ArrowRight,
  ChevronRight,
  Target,
  MessageCircle,
  Building2,
  CheckCircle,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

export const metadata = buildMetadata({
  title: 'Home Loan Guidance',
  description:
    'Home loan guidance for Malaysians. Compare mortgage options, rates, tenure, and required documents before you apply.',
  path: '/loans/home',
  image: '/images/optimized/home-loan.jpg',
  keywords:
    'home loan Malaysia, mortgage guidance, home financing, housing loan, bank rates, loan documents',
});

const pageContent = {
  en: {
    header: {
      badge: 'Mortgage Strategy',
      title: 'Home Loan',
      titleHighlight: 'Blueprint',
      subtitle:
        'Structure your mortgage with DSR planning, bank comparisons, SPA review, and document coaching for properties up to RM1 million.',
    },
    stats: [
      { value: '3.9% - 4.5%', label: 'Indicative Rate' },
      { value: '90%', label: 'Max Financing' },
      { value: '35 yrs', label: 'Max Tenure' },
      { value: '24h', label: 'Eligibility Report' },
    ],
    benefits: {
      title: 'How We Help You Buy Faster',
      items: [
        { icon: 'Calculator', title: 'DSR Forecast', description: 'Stress test BR+spread against existing debts and PTPTN/AKPK obligations.' },
        { icon: 'FileText', title: 'Document Coaching', description: 'Full checklist for salaried, joint borrowers, EPF withdrawals, or flexi packages.' },
        { icon: 'Layers', title: 'Bank Comparison', description: 'Compare spreads, lock-in periods, and flexi features across 8+ lenders.' },
        { icon: 'Shield', title: 'SPA & Valuation Notes', description: 'Coordinate with lawyers, valuers, and developers to prevent bottlenecks.' },
      ],
    },
    comparison: {
      title: 'Scenario: RM650k Property',
      before: {
        title: 'Without Strategy',
        items: [
          { name: 'Margin limited to 80%', rate: 'Need RM130k DP', payment: 'RM2,300' },
          { name: 'BR + 1.8%', rate: 'Higher spread', payment: 'RM2,600' },
          { name: 'Missing docs', rate: 'Delay 3-4 weeks', payment: 'Late SPA' },
        ],
        total: 'Loan RM520k',
        totalLabel: 'Lower approval odds',
      },
      after: {
        title: 'With Blueprint',
        rate: 'BR + 0.9%',
        payment: 'RM2,050/month',
        savings: 'Extra RM70k financing',
        savingsLabel: '90% + MRTA add-on',
      },
    },
    eligibility: {
      title: 'Best Fit Borrowers',
      items: [
        'Income RM4,000+ combined (joint borrowers welcome)',
        'Clean PTPTN / AKPK or proven repayment plan',
        'Booking form + SPA draft ready',
        'Property value RM250k - RM1m (subsale or new launch)',
        'Willing to prep legal + valuation docs early',
      ],
    },
    process: {
      title: 'Blueprint Workflow',
      steps: [
        { step: '01', title: 'Profile & Property Review', description: 'Income, debts, SPA/letter offer, property type' },
        { step: '02', title: 'DSR & Bank Plan', description: 'Scenario planning for different tenures & spreads' },
        { step: '03', title: 'Document Coaching', description: 'Prep HR letters, EPF, tax forms, valuation booking' },
        { step: '04', title: 'Submission & Tracking', description: 'Monitor bank decision, valuation, MRTA/MLTA and signing' },
      ],
    },
    checklist: {
      title: 'Must-Have Documents',
      items: [
        'Latest 6 months payslips & bank statements',
        'EA form / BE form (last 2 years)',
        'EPF statement & CCRIS report',
        'SPA / booking form / developer letter',
        'Joint borrower documents (if any)',
      ],
    },
    faq: {
      title: 'Home Loan FAQ',
      items: [
        {
          question: 'What DSR is considered safe for a home loan?',
          answer: 'Most lenders prefer a DSR below 60%, with stronger approval odds below 50%.',
        },
        {
          question: 'How much down payment should I prepare?',
          answer: 'Plan at least 10-15% plus legal, valuation, and SPA fees.',
        },
        {
          question: 'How long does a bank decision take?',
          answer: 'With complete documents, bank decisions typically take 7-21 days, depending on the lender.',
        },
      ],
    },
    cta: {
      title: 'Plan Your Mortgage Now',
      description: 'RM30 analysis covers DSR, CCRIS review, margin simulations, and recommended banks for your property.',
      primary: 'Book Mortgage Session',
      secondary: 'Chat on WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Strategi Gadai Janji',
      title: 'Blueprint Pinjaman',
      titleHighlight: 'Rumah',
      subtitle:
        'Strukturkan pinjaman rumah dengan perancangan DSR, perbandingan bank, semakan SPA dan bimbingan dokumen untuk hartanah sehingga RM1 juta.',
    },
    stats: [
      { value: '3.9% - 4.5%', label: 'Kadar Anggaran' },
      { value: '90%', label: 'Pembiayaan Maks' },
      { value: '35 thn', label: 'Tempoh Maks' },
      { value: '24j', label: 'Laporan Kelayakan' },
    ],
    benefits: {
      title: 'Bagaimana Kami Mempercepat Pembelian Anda',
      items: [
        { icon: 'Calculator', title: 'Ramalan DSR', description: 'Uji BR+spread terhadap hutang sedia ada dan komitmen PTPTN/AKPK.' },
        { icon: 'FileText', title: 'Bimbingan Dokumen', description: 'Senarai semak penuh untuk bergaji, peminjam bersama, pengeluaran EPF atau pakej flexi.' },
        { icon: 'Layers', title: 'Perbandingan Bank', description: 'Banding spread, tempoh lock-in dan ciri flexi merentas 8+ bank.' },
        { icon: 'Shield', title: 'Nota SPA & Penilaian', description: 'Koordinasi dengan peguam, jurunilai dan pemaju supaya tiada halangan.' },
      ],
    },
    comparison: {
      title: 'Senario: Hartanah RM650k',
      before: {
        title: 'Tanpa Strategi',
        items: [
          { name: 'Margin terhad 80%', rate: 'Perlu RM130k deposit', payment: 'RM2,300' },
          { name: 'BR + 1.8%', rate: 'Spread lebih tinggi', payment: 'RM2,600' },
          { name: 'Dokumen kurang', rate: 'Lewat 3-4 minggu', payment: 'SPA lewat' },
        ],
        total: 'Pinjaman RM520k',
        totalLabel: 'Peluang kelulusan rendah',
      },
      after: {
        title: 'Dengan Blueprint',
        rate: 'BR + 0.9%',
        payment: 'RM2,050/bln',
        savings: 'Tambahan RM70k pembiayaan',
        savingsLabel: '90% + MRTA',
      },
    },
    eligibility: {
      title: 'Peminjam Paling Sesuai',
      items: [
        'Pendapatan gabungan RM4,000+ (peminjam bersama dialu-alukan)',
        'PTPTN / AKPK bersih atau pelan bayaran jelas',
        'Borang tempahan + draf SPA sedia',
        'Nilai hartanah RM250k - RM1j (subsale atau projek baharu)',
        'Sedia sediakan dokumen guaman & penilaian awal',
      ],
    },
    process: {
      title: 'Aliran Kerja Blueprint',
      steps: [
        { step: '01', title: 'Semakan Profil & Hartanah', description: 'Pendapatan, hutang, SPA/surat tawaran, jenis hartanah' },
        { step: '02', title: 'Pelan DSR & Bank', description: 'Senario tempoh & spread berbeza' },
        { step: '03', title: 'Bimbingan Dokumen', description: 'Sedia surat HR, EPF, borang cukai, tempah penilaian' },
        { step: '04', title: 'Hantar & Jejak', description: 'Pantau kelulusan, penilaian, MRTA/MLTA dan tandatangan' },
      ],
    },
    checklist: {
      title: 'Dokumen Wajib',
      items: [
        'Slip gaji & penyata bank 6 bulan terkini',
        'Borang EA / BE (2 tahun terakhir)',
        'Penyata EPF & laporan CCRIS',
        'SPA / borang tempahan / surat pemaju',
        'Dokumen peminjam bersama (jika ada)',
      ],
    },
    faq: {
      title: 'Soalan Lazim Pinjaman Rumah',
      items: [
        {
          question: 'DSR berapa dianggap selamat?',
          answer: 'Kebanyakan bank suka DSR di bawah 60%, lebih kuat jika bawah 50%.',
        },
        {
          question: 'Berapa deposit perlu disediakan?',
          answer: 'Sasar 10-15% dan tambah kos guaman, penilaian, serta yuran SPA.',
        },
        {
          question: 'Berapa lama kelulusan?',
          answer: 'Jika dokumen lengkap, biasanya 7-21 hari.',
        },
      ],
    },
    cta: {
      title: 'Rancang Gadai Janji Anda',
      description: 'Analisis RM30 merangkumi DSR, semakan CCRIS, simulasi margin dan cadangan bank untuk hartanah anda.',
      primary: 'Tempah Sesi Gadai Janji',
      secondary: 'Chat di WhatsApp',
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  FileText,
  Layers,
  Shield,
};

export default async function HomeLoanPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <>
      <LoanProductJsonLd
        name="Home Loan Malaysia"
        description="Mortgage planning with DSR strategy, multi-bank comparison, and document coaching."
        interestRate="BR + 0.9% - 1.5%"
        loanTerm="Up to 35 years"
        minAmount={150000}
        maxAmount={1000000}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/home`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.header.title, url: `${SEO.url}/loans/home` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Building2 className="h-3 w-3 mr-1" aria-hidden="true" />
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
                    <p className="text-sm text-muted-foreground mb-1">Optimised Mortgage</p>
                    <p className="text-4xl font-bold text-green-600 mb-4">{t.comparison.after.rate}</p>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Instalment</p>
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
            <Card className="max-w-3xl mx-auto border-primary/20 surface-card">
              <CardHeader>
                <CardTitle>{t.checklist.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.checklist.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
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
                    <Link href="/services/3/apply">
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
