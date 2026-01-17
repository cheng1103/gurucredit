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
  CarFront,
  ClipboardList,
  Fuel,
  MessageCircle,
  Timer,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SERVICE_AREA_LABEL, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Car Loan Approval Checklist',
  description:
    'Car loan approval checklist for Malaysians. Set your down payment, confirm income, and compare bank packages.',
  path: '/loan-guides/car-loan',
  image: '/images/loan-guides/car-loan.svg',
  keywords:
    'car loan checklist, car loan Malaysia, car financing tips, loan approval guide',
});

const pageContent = {
  en: {
    badge: 'Car Loan Guide',
    title: 'Car Loan Approval Checklist',
    subtitle:
      `Plan your car financing with realistic down payments, DSR targets, and dealer documentation in ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Down payment', value: '10%+' },
      { label: 'Tenure range', value: '5-9 yrs' },
      { label: 'DSR target', value: '< 60%' },
      { label: 'Approval time', value: '1-7 days' },
    ],
    stepsTitle: 'Fast-Track Approval Plan',
    steps: [
      {
        title: 'Set down payment budget',
        description: 'Higher deposits reduce instalments and improve approval odds.',
      },
      {
        title: 'Confirm income + debts',
        description: 'Update payslips, EPF, and existing commitments to assess DSR.',
      },
      {
        title: 'Collect dealer documents',
        description: 'Vehicle booking, proforma invoice, and registration details.',
      },
      {
        title: 'Compare bank packages',
        description: 'Check flat vs effective rates, early settlement fees, and add-ons.',
      },
    ],
    checklistTitle: 'Documents Needed',
    checklist: [
      'Latest 3-6 months payslips + bank statements',
      'EPF statement and IC copy',
      'Dealer quotation / proforma invoice',
      'Proof of down payment',
    ],
    pitfallsTitle: 'Common Car Loan Mistakes',
    pitfalls: [
      'Stretching tenure beyond affordability',
      'Ignoring insurance + road tax costs',
      'Missing dealer letter or vehicle details',
      'Applying without checking CCRIS',
    ],
    toolsTitle: 'Useful Tools',
    toolsDescription: 'Estimate instalments quickly.',
    tools: [
      { title: 'Car Loan Calculator', href: '/tools/car-loan-calculator' },
      { title: 'DSR Calculator', href: '/calculator' },
      { title: 'Eligibility Test', href: '/eligibility-test' },
    ],
    articlesTitle: 'Related Articles',
    articlesDescription: 'Borrower insights for better approvals.',
    articles: [
      { title: 'Understanding DSR for Borrowers', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'Loan Rejection Reasons', href: '/blog/loan-rejection-reasons-solutions' },
      { title: 'Debt Consolidation Guide', href: '/blog/debt-consolidation-guide-malaysia' },
    ],
    faqTitle: 'Car Loan FAQ',
    faq: [
      {
        question: 'What is a good down payment for a car loan?',
        answer: 'Aim for at least 10% to lower instalments and improve approval odds.',
      },
      {
        question: 'How long does a car loan decision take?',
        answer: 'Most banks respond within 1-7 days if documents are complete.',
      },
      {
        question: 'Is a longer tenure always better?',
        answer: 'Longer tenure lowers monthly payments but increases total interest paid.',
      },
    ],
    ctaTitle: 'Need Help Comparing Car Loans?',
    ctaDescription:
      'We match you with banks offering competitive spreads and guide you through dealer paperwork.',
    ctaPrimary: 'Start Car Loan Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Pinjaman Kereta',
    title: 'Senarai Semak Kelulusan Pinjaman Kereta',
    subtitle:
      `Rancang pembiayaan kereta dengan deposit realistik, sasaran DSR, dan dokumen dealer di ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Deposit', value: '10%+' },
      { label: 'Tempoh', value: '5-9 thn' },
      { label: 'Sasar DSR', value: '< 60%' },
      { label: 'Masa kelulusan', value: '1-7 hari' },
    ],
    stepsTitle: 'Pelan Kelulusan Pantas',
    steps: [
      {
        title: 'Tetapkan bajet deposit',
        description: 'Deposit lebih tinggi kurangkan ansuran dan bantu kelulusan.',
      },
      {
        title: 'Sahkan pendapatan + hutang',
        description: 'Kemas kini slip gaji, EPF, dan komitmen untuk kira DSR.',
      },
      {
        title: 'Kumpul dokumen dealer',
        description: 'Tempahan kereta, invois, dan maklumat pendaftaran.',
      },
      {
        title: 'Banding pakej bank',
        description: 'Semak kadar rata vs efektif, caj penyelesaian awal, add-on.',
      },
    ],
    checklistTitle: 'Dokumen Diperlukan',
    checklist: [
      'Slip gaji 3-6 bulan + penyata bank',
      'Penyata EPF dan salinan IC',
      'Sebut harga / invois dealer',
      'Bukti deposit',
    ],
    pitfallsTitle: 'Kesilapan Pinjaman Kereta',
    pitfalls: [
      'Pilih tempoh terlalu panjang hingga tidak mampu',
      'Tidak kira kos insurans + cukai jalan',
      'Dokumen dealer tidak lengkap',
      'Mohon tanpa semak CCRIS',
    ],
    toolsTitle: 'Alat Berguna',
    toolsDescription: 'Anggar ansuran dengan cepat.',
    tools: [
      { title: 'Kalkulator Pinjaman Kereta', href: '/tools/car-loan-calculator' },
      { title: 'Kalkulator DSR', href: '/calculator' },
      { title: 'Ujian Kelayakan', href: '/eligibility-test' },
    ],
    articlesTitle: 'Artikel Berkaitan',
    articlesDescription: 'Pandangan peminjam untuk kelulusan lebih baik.',
    articles: [
      { title: 'Memahami DSR untuk Peminjam', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'Sebab Penolakan Pinjaman', href: '/blog/loan-rejection-reasons-solutions' },
      { title: 'Panduan Penyatuan Hutang', href: '/blog/debt-consolidation-guide-malaysia' },
    ],
    faqTitle: 'Soalan Lazim Pinjaman Kereta',
    faq: [
      {
        question: 'Berapa deposit yang baik untuk pinjaman kereta?',
        answer: 'Sasar sekurang-kurangnya 10% untuk ansuran lebih rendah dan kelulusan lebih baik.',
      },
      {
        question: 'Berapa lama kelulusan pinjaman kereta?',
        answer: 'Biasanya 1-7 hari jika dokumen lengkap.',
      },
      {
        question: 'Adakah tempoh lebih panjang sentiasa lebih baik?',
        answer: 'Tempoh panjang kurangkan ansuran, tetapi jumlah faedah keseluruhan lebih tinggi.',
      },
    ],
    ctaTitle: 'Perlu Bantuan Banding Pinjaman Kereta?',
    ctaDescription:
      'Kami padankan anda dengan bank berdaya saing dan bantu urus dokumen dealer.',
    ctaPrimary: 'Mulakan Semakan Pinjaman Kereta',
    ctaSecondary: 'Chat di WhatsApp',
  },
};

export default async function CarLoanGuidePage() {
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
        url={`${SEO.url}/loan-guides/car-loan`}
        title={t.title}
        description={t.subtitle}
        image={`${SEO.url}/images/loan-guides/car-loan.svg`}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
          { name: t.title, url: `${SEO.url}/loan-guides/car-loan` },
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
              <Fuel className="h-5 w-5 text-primary" />
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
              <Link href="/services/2/apply">{t.ctaPrimary}</Link>
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
