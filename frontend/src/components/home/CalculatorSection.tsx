import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { CalculatorTabs } from './CalculatorTabs';
import type { HomeContent } from '@/lib/content/home';

export function CalculatorSection({ t }: { t: HomeContent }) {
  const c = t.calculator;
  return (
    <Section id="calculator">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} align="center" />
        </Reveal>
        <CalculatorTabs t={t} />
      </Container>
    </Section>
  );
}
