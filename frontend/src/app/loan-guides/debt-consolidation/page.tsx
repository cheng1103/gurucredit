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
  Layers,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SERVICE_AREA_LABEL, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Debt Consolidation Strategy in Malaysia',
  description:
    'Debt consolidation strategy for Malaysians. Plan payments, calculate new instalments, and reduce interest costs.',
  path: '/loan-guides/debt-consolidation',
  image: '/images/loan-guides/debt-consolidation.svg',
  keywords:
    'debt consolidation Malaysia, debt strategy, lower interest, repayment plan',
});

const pageContent = {
  en: {
    badge: 'Debt Consolidation Guide',
    title: 'Debt Consolidation Strategy for Malaysians',
    subtitle:
      `Combine credit cards and personal loans into one manageable payment with a clear DSR plan for ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Target DSR', value: '< 60%' },
      { label: 'Typical tenure', value: '3-7 yrs' },
      { label: 'Review time', value: '2-5 days' },
      { label: 'Coverage', value: 'Cards + PL' },
    ],
    stepsTitle: 'Consolidation Roadmap',
    steps: [
      {
        title: 'List every debt',
        description: 'Capture balances, rates, and minimum payments for all cards and loans.',
      },
      {
        title: 'Calculate new instalment',
        description: 'Use a consolidation quote to ensure monthly savings and healthier DSR.',
      },
      {
        title: 'Close or freeze cards',
        description: 'Avoid re-accumulating balances while paying off the new facility.',
      },
      {
        title: 'Track repayment milestones',
        description: 'Set 3, 6, and 12 month checkpoints to see CCRIS improvements.',
      },
    ],
    checklistTitle: 'Documents Required',
    checklist: [
      'Latest 3-6 months statements for each debt',
      'Payslips or income proof + bank statements',
      'CCRIS report showing current facilities',
      'Settlement letters (if applicable)',
    ],
    pitfallsTitle: 'Avoid These Mistakes',
    pitfalls: [
      'Consolidating without cutting card usage',
      'Stretching tenure too long without savings',
      'Ignoring early settlement penalties',
      'Leaving high-interest debts out of the plan',
    ],
    toolsTitle: 'Useful Tools',
    toolsDescription: 'Run scenarios before you commit.',
    tools: [
      { title: 'DSR Calculator', href: '/calculator' },
      { title: 'Eligibility Test', href: '/eligibility-test' },
      { title: 'Loan Comparison', href: '/tools/compare' },
    ],
    articlesTitle: 'Related Articles',
    articlesDescription: 'Additional reading for better decisions.',
    articles: [
      { title: 'Debt Consolidation Guide', href: '/blog/debt-consolidation-guide-malaysia' },
      { title: 'Improve Credit Score Fast', href: '/blog/how-to-improve-credit-score-malaysia' },
      { title: 'Loan Rejection Reasons', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Debt Consolidation FAQ',
    faq: [
      {
        question: 'Does consolidation reduce total interest?',
        answer: 'It can if your new rate is lower and you avoid new card spending.',
      },
      {
        question: 'What debts can be consolidated?',
        answer: 'Most plans cover credit cards and personal loans; check eligibility for hire purchase.',
      },
      {
        question: 'How long before CCRIS improves?',
        answer: 'Expect improvements after 3-6 clean payment cycles once arrears are cleared.',
      },
    ],
    ctaTitle: 'Want a Consolidation Quote?',
    ctaDescription:
      'We compare consolidation packages and structure a repayment plan that lowers your monthly burden.',
    ctaPrimary: 'Start Debt Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Penyatuan Hutang',
    title: 'Strategi Penyatuan Hutang untuk Rakyat Malaysia',
    subtitle:
      `Gabungkan kad kredit dan pinjaman peribadi kepada satu bayaran yang terkawal dengan pelan DSR untuk ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Sasar DSR', value: '< 60%' },
      { label: 'Tempoh biasa', value: '3-7 thn' },
      { label: 'Masa semakan', value: '2-5 hari' },
      { label: 'Skop', value: 'Kad + PL' },
    ],
    stepsTitle: 'Pelan Penyatuan Hutang',
    steps: [
      {
        title: 'Senaraikan semua hutang',
        description: 'Rekod baki, kadar, dan bayaran minimum untuk semua kad dan pinjaman.',
      },
      {
        title: 'Kira ansuran baharu',
        description: 'Pastikan penjimatan bulanan dan DSR lebih sihat.',
      },
      {
        title: 'Tutup atau hadkan kad',
        description: 'Elak hutang baharu semasa bayar kemudahan penyatuan.',
      },
      {
        title: 'Jejak milestone bayaran',
        description: 'Tetapkan semakan 3, 6, dan 12 bulan untuk lihat CCRIS pulih.',
      },
    ],
    checklistTitle: 'Dokumen Diperlukan',
    checklist: [
      'Penyata 3-6 bulan untuk setiap hutang',
      'Slip gaji atau bukti pendapatan + penyata bank',
      'Laporan CCRIS untuk kemudahan sedia ada',
      'Surat penyelesaian (jika ada)',
    ],
    pitfallsTitle: 'Elak Kesilapan Ini',
    pitfalls: [
      'Menyatukan hutang tanpa hentikan penggunaan kad',
      'Memanjangkan tempoh tanpa penjimatan nyata',
      'Tidak semak penalti penyelesaian awal',
      'Tinggalkan hutang kadar tinggi di luar pelan',
    ],
    toolsTitle: 'Alat Berguna',
    toolsDescription: 'Jalankan simulasi sebelum komit.',
    tools: [
      { title: 'Kalkulator DSR', href: '/calculator' },
      { title: 'Ujian Kelayakan', href: '/eligibility-test' },
      { title: 'Perbandingan Pinjaman', href: '/tools/compare' },
    ],
    articlesTitle: 'Artikel Berkaitan',
    articlesDescription: 'Bacaan tambahan untuk keputusan lebih baik.',
    articles: [
      { title: 'Panduan Penyatuan Hutang', href: '/blog/debt-consolidation-guide-malaysia' },
      { title: 'Tingkatkan Skor Kredit', href: '/blog/how-to-improve-credit-score-malaysia' },
      { title: 'Sebab Penolakan Pinjaman', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Soalan Lazim Penyatuan Hutang',
    faq: [
      {
        question: 'Adakah penyatuan kurangkan jumlah faedah?',
        answer: 'Boleh jika kadar baharu lebih rendah dan anda hentikan penggunaan kad.',
      },
      {
        question: 'Hutang apa yang boleh disatukan?',
        answer: 'Kebanyakan pelan meliputi kad kredit dan pinjaman peribadi; semak kelayakan hire purchase.',
      },
      {
        question: 'Bila CCRIS akan pulih?',
        answer: 'Biasanya selepas 3-6 kitaran bayaran bersih selepas tunggakan diselesaikan.',
      },
    ],
    ctaTitle: 'Mahukan Sebut Harga Penyatuan?',
    ctaDescription:
      'Kami banding pakej penyatuan dan susun pelan bayaran yang mengurangkan komitmen bulanan.',
    ctaPrimary: 'Mulakan Semakan Hutang',
    ctaSecondary: 'Chat di WhatsApp',
  },
};

export default async function DebtConsolidationGuidePage() {
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
        url={`${SEO.url}/loan-guides/debt-consolidation`}
        title={t.title}
        description={t.subtitle}
        image={`${SEO.url}/images/loan-guides/debt-consolidation.svg`}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
          { name: t.title, url: `${SEO.url}/loan-guides/debt-consolidation` },
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
              <ShieldCheck className="h-5 w-5 text-primary" />
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
              <Link href="/loans/debt-consolidation">{t.ctaPrimary}</Link>
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
