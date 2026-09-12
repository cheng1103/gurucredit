import Image from 'next/image';
import { BadgeCheck, CheckCircle2, FileSearch, Hash, MessageSquareWarning } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal, IconTile, toneCycle } from '@/components/layout';
import type { HomeContent } from '@/lib/content/home';

const icons = [BadgeCheck, FileSearch, MessageSquareWarning, Hash];
const avatars = ['/images/optimized/customer-1.webp', '/images/optimized/customer-2.webp', '/images/optimized/customer-3.webp'];

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
                <IconTile tone={toneCycle[i]}>
                  <Icon className="size-5" />
                </IconTile>
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
          {p.cases.map((c, i) => (
            <article key={c.name} className="corner-glow flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center gap-3">
                <Image
                  src={avatars[i] ?? avatars[0]}
                  alt={c.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-foreground-subtle">{c.location}</p>
                </div>
              </div>
              <blockquote className="mt-4 rounded-xl bg-surface-alt p-3 text-sm italic text-foreground-muted">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <dl className="mt-4 space-y-4 text-sm">
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
                  <dd className="flex items-center gap-2 font-semibold text-success">
                    <IconTile tone="green" size="sm">
                      <CheckCircle2 className="size-4" />
                    </IconTile>
                    {c.outcome}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-foreground-subtle">{p.disclaimer}</p>
      </Container>
    </Section>
  );
}
