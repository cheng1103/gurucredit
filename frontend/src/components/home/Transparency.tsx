import { ArrowRight, BadgeCheck, Lock, Percent, TriangleAlert } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

const icons = [Percent, TriangleAlert, BadgeCheck, Lock];

export function Transparency({ t }: { t: HomeContent; language: Language }) {
  const s = t.transparency;
  return (
    <Section id="transparency" tone="alt">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={s.eyebrow} title={s.title} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {s.items.map((item, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            const warn = i === 1;
            return (
              <Reveal key={item.href} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <span className={warn ? 'inline-flex size-10 items-center justify-center rounded-lg bg-warning-soft text-warning' : 'inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary'}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-foreground-muted">{item.description}</p>
                  <LocaleLink href={item.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {item.cta}
                    <ArrowRight className="size-4" />
                  </LocaleLink>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
