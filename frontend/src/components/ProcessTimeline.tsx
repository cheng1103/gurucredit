import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Language } from '@/lib/i18n/translations';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ProcessTimelineSteps, type ProcessStep } from './ProcessTimelineSteps';

const content: Record<Language, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  steps: ProcessStep[];
  cta: string;
  guarantee: string;
}> = {
  en: {
    badge: 'Simple Process',
    title: 'How It',
    titleHighlight: 'Works',
    subtitle: 'Get lender-ready in just 3 simple steps',
    steps: [
      { step: '01', title: 'Apply Online', description: 'Fill out our simple online form with your basic information', time: '5 minutes', iconKey: 'fileText' },
      { step: '02', title: 'Quick Review', description: 'Our team reviews your application and processes it quickly', time: '24 hours', iconKey: 'search' },
      { step: '03', title: 'Submit to Bank', description: 'We help submit to the right lenders and guide your follow-up', time: 'Same-day submission', iconKey: 'checkCircle' },
    ],
    cta: 'Apply Now',
    guarantee: 'Competitive rates from 4.88% flat rate',
  },
  ms: {
    badge: 'Proses Mudah',
    title: 'Cara Ia',
    titleHighlight: 'Berfungsi',
    subtitle: 'Sedia untuk bank dalam 3 langkah mudah',
    steps: [
      { step: '01', title: 'Mohon Dalam Talian', description: 'Isi borang dalam talian mudah kami dengan maklumat asas anda', time: '5 minit', iconKey: 'fileText' },
      { step: '02', title: 'Semakan Pantas', description: 'Pasukan kami menyemak permohonan anda dan memproses dengan cepat', time: '24 jam', iconKey: 'search' },
      { step: '03', title: 'Hantar ke Bank', description: 'Kami bantu hantar ke bank yang sesuai dan pandu susulan', time: 'Hantaran hari sama', iconKey: 'checkCircle' },
    ],
    cta: 'Mohon Sekarang',
    guarantee: 'Kadar kompetitif dari 4.88% kadar rata',
  },
};

export function ProcessTimeline({ language }: { language: Language }) {
  const t = content[language] ?? content.en;

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Sparkles className="h-3 w-3 mr-1.5" />
            {t.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />
          <ProcessTimelineSteps steps={t.steps} />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild className="h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all">
            <Link href="/eligibility-test">
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {t.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
}
