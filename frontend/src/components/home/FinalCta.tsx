import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { HomeContent } from '@/lib/content/home';

export function FinalCta({ t }: { t: HomeContent }) {
  const c = t.cta;
  return (
    <Section id="final-cta" tone="inverse" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-glow-dark pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] text-inverse-foreground lg:text-4xl">{c.title}</h2>
          <p className="mt-4 text-lg text-inverse-foreground/70">{c.lede}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <LocaleLink href={PATHS.eligibilityTest}>
                {c.primary}
                <ArrowRight className="size-4" />
              </LocaleLink>
            </Button>
            <Button size="lg" variant="inverse" asChild>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {c.secondary}
              </a>
            </Button>
          </div>
          <p data-nosnippet className="mt-6 text-xs text-inverse-foreground/60">{c.note}</p>
        </div>
      </Container>
    </Section>
  );
}
