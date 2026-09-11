import { BadgeCheck, FileSearch, Hash, MessageSquareWarning } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import type { HomeContent } from '@/lib/content/home';

const icons = [BadgeCheck, FileSearch, MessageSquareWarning, Hash];

export function Proof({ t }: { t: HomeContent }) {
  const p = t.proof;
  return (
    <Section id="proof">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} />
        </Reveal>

        <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
          {p.points.map((pt, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            return (
              <div key={pt.title} className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg">{pt.title}</h3>
                  <p className="mt-1 text-foreground-muted">{pt.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <p className="eyebrow mb-6">{p.casesTitle}</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {p.cases.map((c) => (
            <article key={c.name} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="eyebrow mb-1">{p.labels.situation}</dt>
                  <dd className="text-foreground-muted">{c.situation}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">{p.labels.action}</dt>
                  <dd className="text-foreground-muted">{c.action}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">{p.labels.outcome}</dt>
                  <dd className="font-semibold text-success">{c.outcome}</dd>
                </div>
              </dl>
              <blockquote className="mt-6 border-t border-border pt-4 text-sm italic text-foreground-muted">
                &ldquo;{c.quote}&rdquo;
                <footer className="mt-2 not-italic text-xs text-foreground-subtle">{c.name} · {c.location}</footer>
              </blockquote>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-foreground-subtle">{p.disclaimer}</p>
      </Container>
    </Section>
  );
}
