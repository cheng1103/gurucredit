import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Language } from '@/lib/i18n/translations';
import Link from 'next/link';
import {
  FileText,
  Search,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

const content = {
  en: {
    badge: 'Simple Process',
    title: 'How It',
    titleHighlight: 'Works',
    subtitle: 'Get your loan approved in just 3 simple steps',
    steps: [
      {
        step: '01',
        title: 'Apply Online',
        description: 'Fill out our simple online form with your basic information',
        time: '5 minutes',
        icon: FileText,
      },
      {
        step: '02',
        title: 'Quick Review',
        description: 'Our team reviews your application and processes it quickly',
        time: '24 hours',
        icon: Search,
      },
      {
        step: '03',
        title: 'Get Your Cash',
        description: 'Once approved, funds are transferred directly to your account',
        time: 'Fast disbursement',
        icon: CheckCircle,
      },
    ],
    cta: 'Apply Now',
    guarantee: 'Competitive rates from 4.88% flat rate',
  },
  ms: {
    badge: 'Proses Mudah',
    title: 'Cara Ia',
    titleHighlight: 'Berfungsi',
    subtitle: 'Dapatkan kelulusan pinjaman dalam 3 langkah mudah',
    steps: [
      {
        step: '01',
        title: 'Mohon Dalam Talian',
        description: 'Isi borang dalam talian mudah kami dengan maklumat asas anda',
        time: '5 minit',
        icon: FileText,
      },
      {
        step: '02',
        title: 'Semakan Pantas',
        description: 'Pasukan kami menyemak permohonan anda dan memproses dengan cepat',
        time: '24 jam',
        icon: Search,
      },
      {
        step: '03',
        title: 'Terima Wang Anda',
        description: 'Setelah diluluskan, wang dipindahkan terus ke akaun anda',
        time: 'Pengeluaran cepat',
        icon: CheckCircle,
      },
    ],
    cta: 'Mohon Sekarang',
    guarantee: 'Kadar kompetitif dari 4.88% kadar rata',
  },
} as const;

export function ProcessTimeline({ language }: { language: Language }) {
  const t = content[language] ?? content.en;

  return (
    <section className="py-20 lg:py-24">
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
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {t.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="h-full border-2 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="pt-8 pb-6 px-6 text-center">
                      {/* Step Number */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {step.step}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-6 mt-4 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Time Badge */}
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {step.time}
                      </Badge>
                    </CardContent>
                  </Card>

                  {/* Arrow for larger screens */}
                  {index < 2 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild className="h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all">
            <Link href="/services/1/apply">
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
