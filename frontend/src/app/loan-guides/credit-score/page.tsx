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
  AlertTriangle,
  Activity,
  ClipboardList,
  MessageCircle,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SERVICE_AREA_LABEL, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Improve Credit Score in Malaysia',
  description:
    'Step-by-step CCRIS + CTOS guidance to improve your credit score and loan approval odds in Malaysia.',
  path: '/loan-guides/credit-score',
  image: '/images/loan-guides/credit-score.svg',
  keywords:
    'credit score Malaysia, improve credit score, CCRIS, CTOS, loan approval tips',
});

const pageContent = {
  en: {
    badge: 'Credit Score Guide',
    title: 'Improve Your Credit Score in Malaysia',
    subtitle:
      `A practical CCRIS + CTOS playbook to raise approval odds for borrowers in ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'CCRIS window', value: '12 months' },
      { label: 'Safe utilization', value: '< 30%' },
      { label: 'Recovery plan', value: '90 days' },
      { label: 'Check frequency', value: 'Every 6-12 months' },
    ],
    stepsTitle: '90-Day Recovery Plan',
    steps: [
      {
        title: 'Pull CCRIS + CTOS reports',
        description: 'Confirm late markers, legal actions, and total outstanding balances before applying.',
      },
      {
        title: 'Stabilize payment history',
        description: 'Clear arrears and keep every facility current for 3 straight billing cycles.',
      },
      {
        title: 'Lower utilization',
        description: 'Reduce card usage to under 30% of the limit or request a higher limit only after clean payments.',
      },
      {
        title: 'Avoid rapid applications',
        description: 'Space out new loan inquiries to prevent score drops from too many checks.',
      },
    ],
    checklistTitle: 'Documents to Prep',
    checklist: [
      'Latest 6 months payslips and bank statements',
      'Recent CCRIS report (BNM eCCRIS)',
      'CTOS report or legal status verification',
      'Proof of debt settlement (if any)',
    ],
    pitfallsTitle: 'Mistakes That Hurt Scores',
    pitfalls: [
      'Paying late even once in the last 12 months',
      'Using > 50% of credit card limits',
      'Applying for multiple loans within 2-3 weeks',
      'Ignoring PTPTN or telco arrears',
    ],
    toolsTitle: 'Helpful Tools',
    toolsDescription: 'Free calculators to keep your DSR healthy.',
    tools: [
      { title: 'DSR Calculator', href: '/calculator' },
      { title: 'Eligibility Test', href: '/eligibility-test' },
      { title: 'Loan Comparison', href: '/tools/compare' },
    ],
    articlesTitle: 'Related Articles',
    articlesDescription: 'Deep dives to support your plan.',
    articles: [
      { title: 'How to Improve Credit Score Malaysia', href: '/blog/how-to-improve-credit-score-malaysia' },
      { title: 'Understanding DSR for Borrowers', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'Loan Rejection Reasons & Fixes', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Credit Score FAQ',
    faq: [
      {
        question: 'How long do late payment records stay in CCRIS?',
        answer: 'CCRIS shows the last 12 months of repayment history. One late marker fades after 12 clean cycles.',
      },
      {
        question: 'Should I close unused credit cards?',
        answer: 'If annual fees are high, close the card. Otherwise keep limits low and usage below 30%.',
      },
      {
        question: 'Can I improve my score before applying for a loan?',
        answer: 'Yes. Focus on clearing arrears, lowering utilization, and avoiding new applications for 60-90 days.',
      },
    ],
    ctaTitle: 'Want a Credit Repair Plan?',
    ctaDescription:
      'We review your CCRIS/CTOS and suggest the fastest path to approval with a RM30 analysis package.',
    ctaPrimary: 'Start Eligibility Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Skor Kredit',
    title: 'Tingkatkan Skor Kredit di Malaysia',
    subtitle:
      `Playbook CCRIS + CTOS yang praktikal untuk menaikkan peluang kelulusan di ${SERVICE_AREA_LABEL}.`,
    stats: [
      { label: 'Tempoh CCRIS', value: '12 bulan' },
      { label: 'Penggunaan selamat', value: '< 30%' },
      { label: 'Pelan pemulihan', value: '90 hari' },
      { label: 'Semakan', value: 'Setiap 6-12 bulan' },
    ],
    stepsTitle: 'Pelan Pemulihan 90 Hari',
    steps: [
      {
        title: 'Dapatkan laporan CCRIS + CTOS',
        description: 'Sahkan rekod lewat, tindakan undang-undang, dan jumlah baki tertunggak.',
      },
      {
        title: 'Stabilkan rekod bayaran',
        description: 'Selesaikan tunggakan dan kekalkan bayaran tepat selama 3 kitaran.',
      },
      {
        title: 'Turunkan penggunaan kredit',
        description: 'Pastikan penggunaan kad bawah 30% sebelum memohon pembiayaan baharu.',
      },
      {
        title: 'Elak permohonan berturut',
        description: 'Jarakkan permohonan supaya skor tidak jatuh akibat terlalu banyak semakan.',
      },
    ],
    checklistTitle: 'Dokumen Perlu Disedia',
    checklist: [
      'Slip gaji dan penyata bank 6 bulan terkini',
      'Laporan CCRIS terkini (BNM eCCRIS)',
      'Laporan CTOS atau status undang-undang',
      'Bukti penyelesaian hutang (jika ada)',
    ],
    pitfallsTitle: 'Kesilapan yang Menjatuhkan Skor',
    pitfalls: [
      'Bayar lewat walau sekali dalam 12 bulan',
      'Gunakan > 50% had kad kredit',
      'Memohon banyak pinjaman dalam 2-3 minggu',
      'Mengabaikan tunggakan PTPTN atau telco',
    ],
    toolsTitle: 'Alat Berguna',
    toolsDescription: 'Kalkulator percuma untuk jaga DSR anda.',
    tools: [
      { title: 'Kalkulator DSR', href: '/calculator' },
      { title: 'Ujian Kelayakan', href: '/eligibility-test' },
      { title: 'Perbandingan Pinjaman', href: '/tools/compare' },
    ],
    articlesTitle: 'Artikel Berkaitan',
    articlesDescription: 'Bacaan tambahan untuk menyokong pelan anda.',
    articles: [
      { title: 'Cara Meningkatkan Skor Kredit', href: '/blog/how-to-improve-credit-score-malaysia' },
      { title: 'Memahami DSR untuk Peminjam', href: '/blog/understanding-dsr-debt-service-ratio' },
      { title: 'Sebab Penolakan Pinjaman & Cara Baiki', href: '/blog/loan-rejection-reasons-solutions' },
    ],
    faqTitle: 'Soalan Lazim Skor Kredit',
    faq: [
      {
        question: 'Berapa lama rekod lewat kekal dalam CCRIS?',
        answer: 'CCRIS memaparkan 12 bulan terakhir. Rekod lewat akan hilang selepas 12 kitaran bayaran bersih.',
      },
      {
        question: 'Perlu tutup kad kredit yang tidak digunakan?',
        answer: 'Jika yuran tahunan tinggi, tutup kad. Jika tidak, kekalkan had rendah dan penggunaan < 30%.',
      },
      {
        question: 'Boleh naikkan skor sebelum mohon pinjaman?',
        answer: 'Ya. Selesaikan tunggakan, turunkan penggunaan, dan elakkan permohonan baharu 60-90 hari.',
      },
    ],
    ctaTitle: 'Mahukan Pelan Pemulihan Kredit?',
    ctaDescription:
      'Kami semak CCRIS/CTOS anda dan cadangkan laluan terpantas ke kelulusan dengan pakej analisis RM30.',
    ctaPrimary: 'Mulakan Semakan Kelayakan',
    ctaSecondary: 'Chat di WhatsApp',
  },
};

export default async function CreditScoreGuidePage() {
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
        url={`${SEO.url}/loan-guides/credit-score`}
        title={t.title}
        description={t.subtitle}
        image={`${SEO.url}/images/loan-guides/credit-score.svg`}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
          { name: t.title, url: `${SEO.url}/loan-guides/credit-score` },
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
          <Activity className="h-5 w-5 text-primary" />
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
              <AlertTriangle className="h-5 w-5 text-primary" />
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
              <Link href="/eligibility-test">{t.ctaPrimary}</Link>
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
