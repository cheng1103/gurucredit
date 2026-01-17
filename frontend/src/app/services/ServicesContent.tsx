import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/i18n/translations';
import { SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';
import {
  FileText,
  Calculator,
  MessageCircle,
  Target,
  Shield,
} from 'lucide-react';
import ServiceGrid from './ServiceGrid';
import FaqAccordion from './FaqAccordion';
import { pageContent, serviceGradients } from './data';

interface Props {
  language: Language;
}

export default function ServicesContent({ language }: Props) {
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <div className="min-h-screen">
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <WebPageJsonLd
          url={`${SEO.url}/services`}
          title={`${t.header.title} ${t.header.titleHighlight}`}
          description={t.header.subtitle}
          breadcrumbItems={[
            { name: 'Home', url: SEO.url },
            { name: 'Services', url: `${SEO.url}/services` },
          ]}
          faqItems={t.faq.items}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
              <Shield className="h-4 w-4 mr-2" />
              {t.header.badge}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t.header.title}{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t.header.titleHighlight}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              {t.header.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="btn-gradient text-primary-foreground">
                <Link href={`/services/${t.services[0]?.id ?? '1'}/apply`}>
                  {t.header.primaryCta}
                  <Calculator className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30">
                <Link href="/eligibility-test">{t.header.secondaryCta}</Link>
              </Button>
            </div>

            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-xl shadow-primary/25">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t.analysisBanner.title}</span>
                  <span className="text-2xl font-bold">{t.analysisBanner.price}</span>
                </div>
                <p className="text-sm text-white/80">{t.analysisBanner.description}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">{t.header.supportNote}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.stats.map((stat) => (
              <Card key={stat.label} className="p-4 text-left surface-card">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm font-semibold">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Target className="h-3 w-3 mr-1" />
              {t.loanTypes.title}
            </Badge>
            <h2 className="text-3xl font-bold">{t.loanTypes.title}</h2>
          </div>

          <ServiceGrid
            services={t.services}
            applyLabel={t.serviceLabels.applyNow}
            learnMoreLabel={t.serviceLabels.learnMore}
            availabilityLabel={t.serviceLabels.availability}
          />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4">{t.loanJourney.badge}</Badge>
            <h2 className="text-3xl font-bold mb-3">{t.loanJourney.title}</h2>
            <p className="text-muted-foreground mb-8">{t.loanJourney.subtitle}</p>

            <div className="space-y-4">
              {t.loanJourney.steps.map((step, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${Object.values(serviceGradients)[index % 4]} text-white flex items-center justify-center text-lg font-bold`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6 shadow-xl surface-card">
            <Image
              src="/images/optimized/team.jpg"
              alt="Loan Journey"
              width={600}
              height={400}
              className="rounded-2xl object-cover mb-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <p className="text-muted-foreground">{t.loanJourney.imageCaption}</p>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="container space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-3">
              <MessageCircle className="h-3 w-3 mr-1" />
              {t.faq.title}
            </Badge>
            <h2 className="text-3xl font-bold mb-2">{t.faq.title}</h2>
            <p className="text-muted-foreground">{t.faq.subtitle}</p>
          </div>

          <FaqAccordion items={t.faq.items} />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <TrustPanel
            title={trust.title}
            description={trust.description}
            items={trust.items}
          />
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-4">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            {t.cta.title}
          </Badge>
          <h2 className="text-3xl font-bold">{t.cta.title}</h2>
          <p className="max-w-2xl mx-auto text-primary-foreground/80">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-gradient text-primary-foreground">
              <Link href={`/services/${t.services[0]?.id ?? '1'}/apply`}>
                {t.cta.primary}
                <Calculator className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/40">
              <Link href="https://wa.me/601127486389" target="_blank" rel="noreferrer">
                {t.cta.secondary}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
