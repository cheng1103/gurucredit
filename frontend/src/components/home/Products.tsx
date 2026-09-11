import { ArrowRight, Building2, Layers, Wallet } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/components/LocaleLink';
import type { HomeContent } from '@/lib/content/home';

const icons = [Wallet, Building2, Layers];

export function Products({ t }: { t: HomeContent }) {
  const p = t.products;
  return (
    <Section id="products" tone="alt">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {p.items.map((item, i) => {
            const Icon = icons[i] ?? Wallet;
            return (
              <Card key={item.href} interactive className="relative h-full gap-4 px-6">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl">
                  <LocaleLink href={item.href} className="after:absolute after:inset-0">
                    {item.title}
                  </LocaleLink>
                </h3>
                <p className="flex-1 text-foreground-muted">{item.description}</p>
                <LocaleLink href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {p.cta}
                  <ArrowRight className="size-4" />
                </LocaleLink>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
