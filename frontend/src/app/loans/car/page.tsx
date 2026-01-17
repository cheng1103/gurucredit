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
  Car,
  BatteryCharging,
  FileSearch,
  Shield,
  ArrowRight,
  ChevronRight,
  Target,
  MessageCircle,
  Fuel,
  CheckCircle,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

export const metadata = buildMetadata({
  title: 'Car Loan Guidance',
  description:
    'Car loan guidance for Malaysia: compare bank packages, prep documents, and improve approval odds for new or used car financing.',
  path: '/loans/car',
  image: '/images/optimized/car-loan.jpg',
  keywords:
    'car loan Malaysia, car financing, car loan approval, DSR, bank comparison, loan documents',
});

const pageContent = {
  en: {
    header: {
      badge: 'Car Financing Specialists',
      title: 'Car Loan',
      titleHighlight: 'Guide 2025',
      subtitle:
        'Secure the best hire purchase package for new, used, or EV cars with DSR screening, dealer coordination, and multi-bank comparisons.',
    },
    stats: [
      { value: '2.5% - 3.5%', label: 'Flat Rate Range' },
      { value: 'Up to 90%', label: 'Margin of Finance' },
      { value: '9 Years', label: 'Max Tenure' },
      { value: '24h', label: 'Pre-check' },
    ],
    benefits: {
      title: 'What We Fix For You',
      items: [
        { icon: 'Car', title: 'Dealer Negotiation', description: 'We verify invoices, discounts, insurance upsells, and protect your booking fee.' },
        { icon: 'FileSearch', title: 'DSR & CCRIS Prep', description: 'Avoid last-minute rejections by ensuring BR + spread fits your income.' },
        { icon: 'BatteryCharging', title: 'EV & Green Loans', description: 'Access special EV rates, charger grants, and bundle with Budget 2025 incentives.' },
        { icon: 'Shield', title: 'Insurance Guidance', description: 'Compare comprehensive, RTI, windscreen, and GAP add-ons objectively.' },
      ],
    },
    comparison: {
      title: 'New vs Recond Scenario',
      before: {
        title: 'Dealer-arranged',
        items: [
          { name: 'New Car 90k @ 3.5%', rate: 'Monthly', payment: 'RM1,430' },
          { name: 'Recond 150k @ 4.5%', rate: 'Monthly', payment: 'RM1,945' },
          { name: 'Processing + Insurance', rate: 'RM3,500', payment: 'Upfront' },
        ],
        total: 'RM4,875/mnth',
        totalLabel: 'Higher cost & cash out',
      },
      after: {
        title: 'Optimised Package',
        rate: '2.48% - 3.2%',
        payment: 'RM1,280 (new) / RM1,750 (recond)',
        savings: 'Save RM1,000+ upfront',
        savingsLabel: 'Lower monthly & fees',
      },
    },
    eligibility: {
      title: 'Ideal Borrower Profile',
      items: [
        'Salary credited for 3+ months (or OA statements for self-employed)',
        'Clean CCRIS/CTOS or arrears resolved for 12 months',
        'DSR under 30% for new cars / 35% for recond',
        'Have booking form, quotation, and insurance estimate ready',
        'For EV buyers: property allows charger installation / strata approval',
      ],
    },
    process: {
      title: 'From Quote to Keys',
      steps: [
        { step: '01', title: 'Share Car Details', description: 'Quotation, booking form, downpayment plan' },
        { step: '02', title: 'Run Eligibility', description: 'DSR, CCRIS, and bank shortlist based on car age & price' },
        { step: '03', title: 'Submit & Negotiate', description: 'We coordinate with dealer & bank, including insurance & accessories' },
        { step: '04', title: 'Sign & Collect', description: 'Track bank decision, JPJ release, and disbursement to dealer' },
      ],
    },
    checklist: {
      title: 'Quick Checklist',
      items: [
        'Latest 3 payslips & bank statements',
        'EPF statement / tax form',
        'Driving licence & IC copy',
        'Booking form + quotation',
        'Insurance quotation (comprehensive)',
      ],
    },
    faq: {
      title: 'Car Loan FAQ',
      items: [
        {
          question: 'How much down payment should I prepare?',
          answer: 'Aim for at least 10% to lower instalments and improve approval odds.',
        },
        {
          question: 'How long does a bank decision take?',
          answer: 'Some banks respond within 1-7 days with complete documents, but timelines vary.',
        },
        {
          question: 'Is a longer tenure always better?',
          answer: 'Longer tenure lowers monthly payments but increases total interest paid.',
        },
      ],
    },
    cta: {
      title: 'Let’s Lock Your Car Loan',
      description: 'RM30 analysis includes DSR review, multi-bank comparison, insurance benchmark, and dealer coordination notes.',
      primary: 'Start RM30 Analysis',
      secondary: 'Chat on WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Pakar Pembiayaan Kereta',
      title: 'Panduan Pinjaman',
      titleHighlight: 'Kereta 2025',
      subtitle:
        'Dapatkan pakej sewa beli terbaik untuk kereta baharu, terpakai atau EV dengan semakan DSR, koordinasi pengedar dan perbandingan pelbagai bank.',
    },
    stats: [
      { value: '2.5% - 3.5%', label: 'Julat Kadar Rata' },
      { value: 'Sehingga 90%', label: 'Margin Pembiayaan' },
      { value: '9 Tahun', label: 'Tempoh Maksimum' },
      { value: '24j', label: 'Pra-kelulusan' },
    ],
    benefits: {
      title: 'Apa Kami Urus',
      items: [
        { icon: 'Car', title: 'Rundingan Pengedar', description: 'Kami semak invois, diskaun, insurans tambahan dan lindungi wang tempahan anda.' },
        { icon: 'FileSearch', title: 'Persediaan DSR & CCRIS', description: 'Elak penolakan di saat akhir dengan pastikan BR + spread sesuai pendapatan.' },
        { icon: 'BatteryCharging', title: 'Pinjaman EV & Hijau', description: 'Akses kadar EV khas, geran pengecas dan gabung insentif Belanjawan 2025.' },
        { icon: 'Shield', title: 'Panduan Insurans', description: 'Banding perlindungan komprehensif, RTI, cermin dan GAP secara objektif.' },
      ],
    },
    comparison: {
      title: 'Senario Baharu vs Recon',
      before: {
        title: 'Diurus Pengedar',
        items: [
          { name: 'Kereta Baharu 90k @ 3.5%', rate: 'Bulanan', payment: 'RM1,430' },
          { name: 'Recon 150k @ 4.5%', rate: 'Bulanan', payment: 'RM1,945' },
          { name: 'Yuran & Insurans', rate: 'RM3,500', payment: 'Bayar Awal' },
        ],
        total: 'RM4,875/bln',
        totalLabel: 'Kos & tunai lebih tinggi',
      },
      after: {
        title: 'Pakej Dioptimum',
        rate: '2.48% - 3.2%',
        payment: 'RM1,280 (baru) / RM1,750 (recon)',
        savings: 'Jimat RM1,000+ tunai',
        savingsLabel: 'Bayaran & yuran lebih rendah',
      },
    },
    eligibility: {
      title: 'Profil Peminjam Ideal',
      items: [
        'Gaji dikredit 3+ bulan (atau penyata perniagaan bagi bekerja sendiri)',
        'CCRIS/CTOS bersih atau tunggakan diselesaikan 12 bulan',
        'DSR di bawah 30% (baru) / 35% (recon)',
        'Sediakan borang tempahan, sebut harga & anggaran insurans',
        'Pembeli EV: kediaman benarkan pemasangan pengecas / kelulusan strata',
      ],
    },
    process: {
      title: 'Daripada Sebut Harga ke Kunci',
      steps: [
        { step: '01', title: 'Kongsi Butiran Kereta', description: 'Sebut harga, borang tempahan, rancangan deposit' },
        { step: '02', title: 'Semak Kelayakan', description: 'DSR, CCRIS dan senarai bank ikut umur/ harga kereta' },
        { step: '03', title: 'Hantar & Runding', description: 'Kami koordinasi dengan pengedar & bank termasuk insurans' },
        { step: '04', title: 'Tandatangan & Ambil', description: 'Jejak kelulusan, pelepasan JPJ dan bayaran kepada pengedar' },
      ],
    },
    checklist: {
      title: 'Senarai Semak Pantas',
      items: [
        'Slip gaji & penyata bank 3 bulan',
        'Penyata EPF / borang cukai',
        'Lesen memandu & salinan IC',
        'Borang tempahan + sebut harga',
        'Sebut harga insurans komprehensif',
      ],
    },
    faq: {
      title: 'Soalan Lazim Pinjaman Kereta',
      items: [
        {
          question: 'Berapa deposit perlu disediakan?',
          answer: 'Sasar sekurang-kurangnya 10% untuk ansuran lebih rendah.',
        },
        {
          question: 'Berapa lama kelulusan?',
          answer: 'Biasanya 1-7 hari jika dokumen lengkap.',
        },
        {
          question: 'Adakah tempoh panjang sentiasa lebih baik?',
          answer: 'Tempoh panjang kurangkan ansuran, tetapi jumlah faedah keseluruhan lebih tinggi.',
        },
      ],
    },
    cta: {
      title: 'Kunci Pinjaman Kereta Anda',
      description: 'Analisis RM30 merangkumi semakan DSR, perbandingan bank, semakan insurans dan nota koordinasi pengedar.',
      primary: 'Mulakan Analisis RM30',
      secondary: 'Chat di WhatsApp',
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  FileSearch,
  BatteryCharging,
  Shield,
};

export default async function CarLoanPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <>
      <LoanProductJsonLd
        name="Car Loan Malaysia"
        description="Hire purchase guidance with DSR analysis, EV incentives, and dealer coordination."
        interestRate="2.48% - 3.5% flat p.a."
        loanTerm="Up to 9 years"
        minAmount={20000}
        maxAmount={500000}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/car`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.header.title, url: `${SEO.url}/loans/car` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Fuel className="h-3 w-3 mr-1" aria-hidden="true" />
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
                    <p className="text-sm text-muted-foreground mb-1">Optimised Bank Pairing</p>
                    <p className="text-4xl font-bold text-green-600 mb-4">{t.comparison.after.rate}</p>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payments</p>
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
                    <Link href="/services/2/apply">
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
