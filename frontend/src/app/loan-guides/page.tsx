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
  BookOpen,
  CreditCard,
  Home,
  CarFront,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SERVICE_AREA_LABEL, SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

const pageContent = {
  en: {
    badge: 'Loan Knowledge Hub',
    title: 'Loan Guides for Smarter Decisions',
    subtitle:
      `Practical, Malaysia-focused playbooks on credit score, home loans, car loans, and debt consolidation for ${SERVICE_AREA_LABEL}.`,
    guidesTitle: 'Popular Guides',
    readGuide: 'Read guide',
    guides: [
      {
        title: 'Credit Score & CCRIS Guide',
        description: 'Improve CCRIS/CTOS health, fix late markers, and prepare for approvals faster.',
        href: '/loan-guides/credit-score',
        icon: 'CreditCard',
        stats: '90-day recovery plan',
      },
      {
        title: 'Home Loan Checklist',
        description: 'DSR planning, margin expectations, document prep, and bank comparison tips.',
        href: '/loan-guides/home-loan',
        icon: 'Home',
        stats: 'Up to 90% financing',
      },
      {
        title: 'Car Loan Preparation',
        description: 'Down payment strategy, loan tenure choices, and dealer documentation guide.',
        href: '/loan-guides/car-loan',
        icon: 'CarFront',
        stats: 'Tenure 5-9 years',
      },
      {
        title: 'Debt Consolidation Strategy',
        description: 'Lower monthly commitments by combining credit cards and personal loans.',
        href: '/loan-guides/debt-consolidation',
        icon: 'Layers',
        stats: 'Target DSR < 60%',
      },
    ],
    highlightsTitle: 'What You Will Get',
    highlights: [
      'Step-by-step action plans tailored to Malaysian lending rules.',
      'Key numbers to benchmark DSR, margin of finance, and approval timelines.',
      'Mistakes to avoid before submitting to banks.',
      'Recommended tools and calculators to estimate affordability.',
    ],
    toolsTitle: 'Helpful Tools',
    tools: [
      {
        title: 'DSR Calculator',
        description: 'Check how much debt you can carry safely.',
        href: '/calculator',
      },
      {
        title: 'Home Loan Calculator',
        description: 'Estimate monthly instalments and total interest.',
        href: '/tools/home-loan-calculator',
      },
      {
        title: 'Car Loan Calculator',
        description: 'Plan your down payment and monthly instalments.',
        href: '/tools/car-loan-calculator',
      },
      {
        title: 'Loan Comparison',
        description: 'Compare rate ranges and eligibility fast.',
        href: '/tools/compare',
      },
    ],
    ctaTitle: 'Need a Personalized Plan?',
    ctaDescription:
      'Get a RM30 eligibility analysis with CCRIS review, lender matching, and a customized checklist.',
    ctaPrimary: 'Start Eligibility Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Pusat Pengetahuan Pinjaman',
    title: 'Panduan Pinjaman untuk Keputusan Lebih Bijak',
    subtitle:
      `Playbook praktikal Malaysia tentang skor kredit, pinjaman rumah, pinjaman kereta, dan penyatuan hutang untuk ${SERVICE_AREA_LABEL}.`,
    guidesTitle: 'Panduan Popular',
    readGuide: 'Baca panduan',
    guides: [
      {
        title: 'Panduan Skor Kredit & CCRIS',
        description: 'Tingkatkan CCRIS/CTOS, betulkan rekod lewat, dan sedia untuk kelulusan.',
        href: '/loan-guides/credit-score',
        icon: 'CreditCard',
        stats: 'Pelan pemulihan 90 hari',
      },
      {
        title: 'Senarai Semak Pinjaman Rumah',
        description: 'Perancangan DSR, jangkaan margin, dokumen, dan perbandingan bank.',
        href: '/loan-guides/home-loan',
        icon: 'Home',
        stats: 'Sehingga 90% pembiayaan',
      },
      {
        title: 'Persediaan Pinjaman Kereta',
        description: 'Strategi deposit, pilihan tempoh, dan panduan dokumen dealer.',
        href: '/loan-guides/car-loan',
        icon: 'CarFront',
        stats: 'Tempoh 5-9 tahun',
      },
      {
        title: 'Strategi Penyatuan Hutang',
        description: 'Kurangkan komitmen bulanan dengan gabungkan kad kredit & pinjaman.',
        href: '/loan-guides/debt-consolidation',
        icon: 'Layers',
        stats: 'Sasar DSR < 60%',
      },
    ],
    highlightsTitle: 'Apa Yang Anda Akan Dapat',
    highlights: [
      'Pelan tindakan langkah demi langkah ikut garis panduan bank Malaysia.',
      'Nombor penting untuk DSR, margin pembiayaan, dan garis masa kelulusan.',
      'Kesilapan yang perlu dielakkan sebelum hantar permohonan.',
      'Alat dan kalkulator yang disyorkan untuk anggaran kemampuan.',
    ],
    toolsTitle: 'Alat Berguna',
    tools: [
      {
        title: 'Kalkulator DSR',
        description: 'Semak berapa banyak hutang yang selamat.',
        href: '/calculator',
      },
      {
        title: 'Kalkulator Pinjaman Rumah',
        description: 'Anggar ansuran bulanan dan faedah.',
        href: '/tools/home-loan-calculator',
      },
      {
        title: 'Kalkulator Pinjaman Kereta',
        description: 'Rancang deposit dan ansuran bulanan.',
        href: '/tools/car-loan-calculator',
      },
      {
        title: 'Perbandingan Pinjaman',
        description: 'Banding kadar dan kelayakan dengan cepat.',
        href: '/tools/compare',
      },
    ],
    ctaTitle: 'Perlukan Pelan Peribadi?',
    ctaDescription:
      'Dapatkan analisis kelayakan RM30 dengan semakan CCRIS, padanan bank, dan senarai semak khusus.',
    ctaPrimary: 'Mulakan Semakan Kelayakan',
    ctaSecondary: 'Chat di WhatsApp',
  },
};

const guideIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Home,
  CarFront,
  Layers,
};

export default async function LoanGuidesPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <main className="pb-20">
      <WebPageJsonLd
        url={`${SEO.url}/loan-guides`}
        title={t.title}
        description={t.subtitle}
        image={`${SEO.url}/images/loan-guides/hub.svg`}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
        ]}
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
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">{t.guidesTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {t.guides.map((guide) => {
            const Icon = guideIcons[guide.icon];
            return (
              <Card key={guide.href} className="surface-card border-border/60 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">{guide.stats}</span>
                  </div>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="btn-gradient text-white shadow-md">
                    <Link href={guide.href}>
                      {t.readGuide}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">{t.highlightsTitle}</h2>
            </div>
            <div className="grid gap-4">
              {t.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-white/70 p-4 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white/75 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">{t.toolsTitle}</h3>
            <div className="space-y-3">
              {t.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-white/80 px-4 py-3 text-sm transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="font-medium text-foreground">{tool.title}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <TrustPanel
          title={trust.title}
          description={trust.description}
          items={trust.items}
        />
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
                {t.ctaSecondary}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
