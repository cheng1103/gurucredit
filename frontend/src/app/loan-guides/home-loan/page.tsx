import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Home,
  Landmark,
  ClipboardList,
  MessageCircle,
  Timer,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SERVICE_AREA_LABEL, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Home Loan Checklist for Malaysia',
  description:
    'Home loan checklist and timeline for Malaysian borrowers. Prepare documents, compare rates, and improve approval odds.',
  path: '/loan-guides/home-loan',
  image: '/images/loan-guides/home-loan.svg',
  keywords:
    'home loan Malaysia, mortgage checklist, home loan documents, housing loan approval',
});

const pageContent = {
  en: {
    badge: 'Home Loan Guide',
    title: 'Home Loan Checklist for Malaysia Borrowers',
    subtitle:
      `Plan your mortgage with realistic DSR targets, margin expectations, and document prep for ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Typical margin', value: '85-90%' },
      { label: 'Tenure range', value: '10-35 yrs' },
      { label: 'DSR target', value: '< 60%' },
      { label: 'Approval time', value: '7-21 days' },
    ],
    stepsTitle: 'Mortgage Prep Timeline',
    steps: [
      {
        title: 'Budget and DSR simulation',
        description: 'Run DSR scenarios with your existing debts before choosing property price range.',
      },
      {
        title: 'Gather documents early',
        description: 'Salary slips, EPF, tax forms, SPA draft, booking receipt, and proof of down payment.',
      },
      {
        title: 'Compare bank packages',
        description: 'Review BR + spread, lock-in period, flexi features, and legal/valuation fees.',
      },
      {
        title: 'Submit and track decisions',
        description: 'Prepare for valuation scheduling, MRTA/MLTA options, and signing.',
      },
    ],
    checklistTitle: 'Required Documents',
    checklist: [
      'Latest 6 months payslips and bank statements',
      'EA/BE form (last 2 years)',
      'EPF statement + CCRIS report',
      'SPA/booking form and developer letter',
      'Joint borrower documents (if applicable)',
    ],
    pitfallsTitle: 'Common Mortgage Mistakes',
    pitfalls: [
      'Buying before checking DSR or CCRIS',
      'Underestimating legal + valuation fees',
      'Submitting to many banks without a plan',
      'Missing employer confirmation letter',
    ],
    toolsTitle: 'Useful Tools',
    toolsDescription: 'Plan instalments before you commit.',
    tools: [
      { title: 'Home Loan Calculator', href: '/tools/home-loan-calculator' },
      { title: 'DSR Calculator', href: '/calculator' },
      { title: 'Compare Loans', href: '/tools/compare' },
    ],
    articlesTitle: 'Related Articles',
    articlesDescription: 'Learn from real borrower scenarios.',
    articles: [
      { title: 'Understanding DSR for Borrowers', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'PTPTN Impact on Home Loans', href: '/blog/ptptn-loan-impact-home-loan' },
      { title: 'Loan Rejection Reasons', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Home Loan FAQ',
    faq: [
      {
        question: 'What DSR is considered safe for a home loan?',
        answer: 'Most lenders prefer a DSR below 60%, with stronger approval odds below 50%.',
      },
      {
        question: 'How much down payment should I prepare?',
        answer: 'Plan at least 10-15% plus legal, valuation, and SPA fees.',
      },
      {
        question: 'How long does a mortgage decision take?',
        answer: 'With complete documents, bank decisions typically take 7-21 days.',
      },
    ],
    ctaTitle: 'Ready to Secure Your Mortgage?',
    ctaDescription:
      'We compare banks, check CCRIS, and build a submission plan for your property target.',
    ctaPrimary: 'Book Mortgage Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Pinjaman Rumah',
    title: 'Senarai Semak Pinjaman Rumah Malaysia',
    subtitle:
      `Rancang gadai janji dengan sasaran DSR, jangkaan margin, dan persediaan dokumen untuk ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Margin lazim', value: '85-90%' },
      { label: 'Tempoh', value: '10-35 thn' },
      { label: 'Sasar DSR', value: '< 60%' },
      { label: 'Masa kelulusan', value: '7-21 hari' },
    ],
    stepsTitle: 'Garis Masa Persediaan Gadai Janji',
    steps: [
      {
        title: 'Bajet dan simulasi DSR',
        description: 'Jalankan simulasi DSR sebelum memilih julat harga hartanah.',
      },
      {
        title: 'Kumpul dokumen awal',
        description: 'Slip gaji, EPF, borang cukai, draf SPA, resit tempahan, bukti deposit.',
      },
      {
        title: 'Banding pakej bank',
        description: 'Semak BR + spread, tempoh lock-in, flexi, dan yuran guaman/penilaian.',
      },
      {
        title: 'Hantar dan jejak kelulusan',
        description: 'Sedia untuk jadual penilaian, pilihan MRTA/MLTA, dan tandatangan.',
      },
    ],
    checklistTitle: 'Dokumen Diperlukan',
    checklist: [
      'Slip gaji dan penyata bank 6 bulan terkini',
      'Borang EA/BE (2 tahun terakhir)',
      'Penyata EPF + laporan CCRIS',
      'SPA/borang tempahan dan surat pemaju',
      'Dokumen peminjam bersama (jika ada)',
    ],
    pitfallsTitle: 'Kesilapan Gadai Janji',
    pitfalls: [
      'Membeli sebelum semak DSR atau CCRIS',
      'Tidak mengira yuran guaman + penilaian',
      'Hantar ke banyak bank tanpa pelan',
      'Tiada surat pengesahan majikan',
    ],
    toolsTitle: 'Alat Berguna',
    toolsDescription: 'Rancang ansuran sebelum komit.',
    tools: [
      { title: 'Kalkulator Pinjaman Rumah', href: '/tools/home-loan-calculator' },
      { title: 'Kalkulator DSR', href: '/calculator' },
      { title: 'Banding Pinjaman', href: '/tools/compare' },
    ],
    articlesTitle: 'Artikel Berkaitan',
    articlesDescription: 'Belajar daripada situasi peminjam sebenar.',
    articles: [
      { title: 'Memahami DSR untuk Peminjam', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'Kesan PTPTN pada Pinjaman Rumah', href: '/blog/ptptn-loan-impact-home-loan' },
      { title: 'Sebab Penolakan Pinjaman', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Soalan Lazim Pinjaman Rumah',
    faq: [
      {
        question: 'DSR berapa dianggap selamat untuk pinjaman rumah?',
        answer: 'Kebanyakan bank suka DSR di bawah 60%, lebih kuat jika bawah 50%.',
      },
      {
        question: 'Berapa deposit perlu disediakan?',
        answer: 'Sasar 10-15% dan tambah kos guaman, penilaian, serta yuran SPA.',
      },
      {
        question: 'Berapa lama kelulusan gadai janji?',
        answer: 'Jika dokumen lengkap, biasanya 7-21 hari.',
      },
    ],
    ctaTitle: 'Sedia untuk Dapatkan Gadai Janji?',
    ctaDescription:
      'Kami banding bank, semak CCRIS, dan bina pelan penghantaran untuk hartanah anda.',
    ctaPrimary: 'Tempah Semakan Gadai Janji',
    ctaSecondary: 'Chat di WhatsApp',
  },
};

export default async function HomeLoanGuidePage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;

  return (
    <main className="pb-20">
      <HowToJsonLd
        name={t.stepsTitle}
        description={t.subtitle}
        steps={t.steps.map((step) => ({
          name: step.title,
          text: step.description,
        }))}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loan-guides/home-loan`}
        title={t.title}
        description={t.subtitle}
        image={`${SEO.url}/images/loan-guides/home-loan.svg`}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
          { name: t.title, url: `${SEO.url}/loan-guides/home-loan` },
        ]}
        faqItems={t.faq}
      />
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative py-16 lg:py-20">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                <span className="gradient-text">{t.title}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.stats.map((stat) => (
                <Card key={stat.label} className="surface-card border-border/60">
                  <CardContent className="py-4 text-center">
                    <p className="text-lg font-semibold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center gap-3 mb-8">
          <Timer className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">{t.stepsTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {t.steps.map((step) => (
            <Card key={step.title} className="surface-card border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{t.checklistTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <Landmark className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{t.pitfallsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.pitfalls.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t.toolsTitle}</CardTitle>
              <CardDescription>{t.toolsDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="flex items-center justify-between rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm hover:border-primary/40 transition-colors">
                  <span>{tool.title}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t.articlesTitle}</CardTitle>
              <CardDescription>{t.articlesDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.articles.map((article) => (
                <Link key={article.href} href={article.href} className="flex items-center justify-between rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm hover:border-primary/40 transition-colors">
                  <span>{article.title}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-2xl border border-border/60 bg-primary/5 p-8 md:p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
            <p className="text-sm text-muted-foreground max-w-xl">{t.ctaDescription}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25">
              <Link href="/services/3/apply">{t.ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.ctaSecondary}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="rounded-2xl border border-border/60 bg-white/75 p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faq.map((item) => (
              <div key={item.question} className="rounded-xl border border-border/60 bg-white/80 p-4">
                <p className="font-medium text-foreground mb-2">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
