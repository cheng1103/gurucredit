import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';
import {
  Calculator,
  Home,
  Car,
  Scale,
  FileCheck,
  Sparkles,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Loan Tools & Calculators',
  description:
    'Loan calculators and tools to estimate payments, compare bank offers, and plan your financing in Malaysia.',
  path: '/tools',
  image: '/images/hero-bg.jpg',
  keywords:
    'loan calculator Malaysia, DSR calculator, loan comparison, financing tools',
});

const content = {
  en: {
    badge: 'Toolkit',
    title: 'Loan Tools',
    description:
      'Fast calculators and comparison tools built for Malaysia borrowers. Estimate payments, compare bank rates, and check eligibility before you apply.',
    tools: [
      {
        title: 'DSR Calculator',
        description: 'Check your debt service ratio and affordability.',
        href: '/calculator',
        icon: Calculator,
        tag: 'Most used',
      },
      {
        title: 'Home Loan Calculator',
        description: 'Estimate mortgage payments and interest.',
        href: '/tools/home-loan-calculator',
        icon: Home,
        tag: 'Mortgage',
      },
      {
        title: 'Car Loan Calculator',
        description: 'Plan repayments before you choose a car.',
        href: '/tools/car-loan-calculator',
        icon: Car,
        tag: 'Auto',
      },
      {
        title: 'Loan Comparison Tool',
        description: 'Compare rates and fees across major banks.',
        href: '/tools/compare',
        icon: Scale,
        tag: 'Compare',
      },
      {
        title: 'Eligibility Test',
        description: 'Check if you are likely to qualify.',
        href: '/eligibility-test',
        icon: FileCheck,
        tag: 'Quick check',
      },
    ],
    open: 'Open tool',
    cta: {
      title: 'Want expert validation?',
      description: 'Get a full credit analysis and bank-matching plan for RM30.',
      primary: 'Get Expert Analysis',
      secondary: 'View Services',
    },
  },
  ms: {
    badge: 'Toolkit',
    title: 'Alat Pinjaman',
    description:
      'Kalkulator dan alat perbandingan pantas untuk peminjam di Malaysia. Anggar bayaran, banding kadar, dan semak kelayakan sebelum memohon.',
    tools: [
      {
        title: 'Kalkulator DSR',
        description: 'Semak nisbah hutang dan kemampuan anda.',
        href: '/calculator',
        icon: Calculator,
        tag: 'Paling digunakan',
      },
      {
        title: 'Kalkulator Pinjaman Rumah',
        description: 'Anggar bayaran gadai janji dan faedah.',
        href: '/tools/home-loan-calculator',
        icon: Home,
        tag: 'Rumah',
      },
      {
        title: 'Kalkulator Pinjaman Kereta',
        description: 'Rancang bayaran sebelum pilih kereta.',
        href: '/tools/car-loan-calculator',
        icon: Car,
        tag: 'Auto',
      },
      {
        title: 'Alat Perbandingan Pinjaman',
        description: 'Bandingkan kadar dan yuran bank utama.',
        href: '/tools/compare',
        icon: Scale,
        tag: 'Banding',
      },
      {
        title: 'Ujian Kelayakan',
        description: 'Semak peluang kelayakan anda.',
        href: '/eligibility-test',
        icon: FileCheck,
        tag: 'Pantas',
      },
    ],
    open: 'Buka alat',
    cta: {
      title: 'Perlukan pengesahan pakar?',
      description: 'Dapatkan analisis kredit penuh dan padanan bank dengan RM30.',
      primary: 'Dapatkan Analisis Pakar',
      secondary: 'Lihat Perkhidmatan',
    },
  },
};

export default async function ToolsPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <WebPageJsonLd
          url={`${SEO.url}/tools`}
          title={t.title}
          description={t.description}
          breadcrumbItems={[
            { name: 'Home', url: SEO.url },
            { name: 'Tools', url: `${SEO.url}/tools` },
          ]}
        />
        <div className="container relative text-center">
          <Badge variant="outline" className="mb-4 bg-white/70">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.href} className="surface-card card-hover border-primary/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <Badge variant="outline" className="bg-white/70">
                      {tool.tag}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{tool.title}</h2>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <Button asChild variant="ghost" className="px-0 text-primary w-fit">
                    <Link href={tool.href}>
                      {t.open}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <TrustPanel
            title={trust.title}
            description={trust.description}
            items={trust.items}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="surface-card rounded-3xl p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <BarChart3 className="h-5 w-5" />
              <Calculator className="h-5 w-5" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-gradient text-white shadow-md">
                <Link href="/services/1/apply">
                  {t.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/30">
                <Link href="/services">{t.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
