import Image from 'next/image';
import { Container, Section, Stat } from '@/components/layout';
import { QuickLeadCapture } from '@/components/QuickLeadCapture';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { HeroCtas } from './HeroCtas';
import { BankLogoRow } from './BankLogoRow';

export function Hero({ t, language }: { t: HomeContent; language: Language }) {
  const h = t.hero;
  return (
    <Section id="hero" className="relative overflow-hidden pt-14 lg:pt-24">
      <div aria-hidden="true" className="bg-glow-hero bg-grid-fade pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:text-left">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {h.eyebrow}
            </span>
            <h1 className="mt-6 text-[40px] leading-[1.05] tracking-[-0.045em] lg:text-[64px] lg:leading-none">
              {h.title} <span className="text-gradient-brand">{h.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-foreground-muted lg:mx-0">{h.lede}</p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <HeroCtas primary={h.primaryCta} secondary={h.secondaryCta} language={language} />
            </div>

            <div className="mx-auto mt-12 max-w-4xl lg:mx-0 lg:mt-10 lg:max-w-none">
              <QuickLeadCapture language={language} source="HERO_QUICK_CHECK" className="card-gradient-border shadow-glow" />
              <p data-nosnippet className="mt-3 text-center text-xs text-foreground-subtle lg:text-left">{h.trustLine}</p>
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div className="relative aspect-[16/10] max-h-[280px] overflow-hidden rounded-3xl border border-border shadow-card lg:aspect-[4/5] lg:max-h-[560px]">
              <Image
                src="/images/optimized/hero-bg.webp"
                alt={h.photoAlt}
                fill
                priority
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent"
              />
            </div>

            <div
              aria-hidden="true"
              className="float-y absolute -top-4 right-2 hidden rounded-2xl border border-border bg-surface p-4 shadow-card sm:block lg:right-6 lg:top-8"
            >
              <Stat value="82%" label={h.floatFit} tone="success" />
            </div>
            <div
              aria-hidden="true"
              className="float-y absolute -bottom-4 left-2 hidden rounded-2xl border border-border bg-surface p-4 shadow-card [animation-delay:1.2s] sm:block lg:bottom-8 lg:left-6"
            >
              <Stat value="24h" label={h.floatTime} tone="primary" />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <BankLogoRow label={h.logosLabel} />
        </div>
      </Container>
    </Section>
  );
}
