import { FileText, ListChecks, Route } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal, IconTile, toneCycle } from '@/components/layout';
import type { HomeContent } from '@/lib/content/home';

const deliverableIcons = [FileText, ListChecks, Route];

export function HowItWorks({ t }: { t: HomeContent }) {
  const s = t.howItWorks;
  return (
    <Section id="how-it-works">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
        </Reveal>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {s.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 border-t border-border pt-5">
              <IconTile tone={toneCycle[i]} size="sm">
                <span className="font-mono text-xs font-semibold">{i + 1}</span>
              </IconTile>
              <h3 className="text-xl">{step.title}</h3>
              <p className="text-foreground-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <Reveal className="mt-12 lg:mt-16">
          <div className="corner-glow rounded-2xl border border-border bg-tint p-6 lg:p-8">
            <p className="eyebrow mb-5">{s.deliverablesTitle}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {s.deliverables.map((d, i) => {
                const Icon = deliverableIcons[i] ?? FileText;
                return (
                  <div key={d.title} className="flex gap-3">
                    <IconTile tone={toneCycle[i]} size="sm" className="mt-0.5">
                      <Icon className="size-4" />
                    </IconTile>
                    <div>
                      <p className="font-semibold">{d.title}</p>
                      <p className="mt-1 text-sm text-foreground-muted">{d.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
