import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PATHS } from '@/lib/i18n/routes';
import type { HomeContent } from '@/lib/content/home';

export function Faq({ t }: { t: HomeContent }) {
  const f = t.faq;
  return (
    <Section id="faq">
      <Container className="max-w-[760px]">
        <Reveal>
          <SectionHeader
            eyebrow={f.eyebrow}
            title={f.title}
            action={
              <LocaleLink href={PATHS.faq} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {f.viewAll}
                <ArrowRight className="size-4" />
              </LocaleLink>
            }
          />
        </Reveal>
        <FaqAccordion items={f.items} />
      </Container>
    </Section>
  );
}
