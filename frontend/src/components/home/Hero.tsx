import { Container, Section } from '@/components/layout';
import { QuickLeadCapture } from '@/components/QuickLeadCapture';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { HeroCtas } from './HeroCtas';
import { BankLogoRow } from './BankLogoRow';

export function Hero({ t, language }: { t: HomeContent; language: Language }) {
  const h = t.hero;
  return (
    <Section id="hero" className="relative overflow-hidden pt-14 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(600px 300px at 80% 0%, rgb(37 99 235 / 0.10), transparent 70%)' }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-muted">
            {h.eyebrow}
          </span>
          <h1 className="mt-6 text-[40px] leading-[1.05] tracking-[-0.045em] lg:text-[64px] lg:leading-none">
            {h.title} <span className="text-primary">{h.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-foreground-muted">{h.lede}</p>
          <div className="mt-8">
            <HeroCtas primary={h.primaryCta} secondary={h.secondaryCta} language={language} />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl lg:mt-16">
          <QuickLeadCapture language={language} source="HERO_QUICK_CHECK" />
          <p data-nosnippet className="mt-3 text-center text-xs text-foreground-subtle">{h.trustLine}</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <BankLogoRow label={h.logosLabel} />
        </div>
      </Container>
    </Section>
  );
}
