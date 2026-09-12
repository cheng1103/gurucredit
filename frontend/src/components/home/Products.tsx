import { ArrowRight, Building2, Layers, Wallet } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal, IconTile, toneCycle } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/components/LocaleLink';
import type { HomeContent } from '@/lib/content/home';

const icons = [Wallet, Building2, Layers];

export function Products({ t }: { t: HomeContent }) {
  const p = t.products;
  return (
    <Section id="products" tone="tint">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {p.items.map((item, i) => {
            const Icon = icons[i] ?? Wallet;
            return (
              <Card key={item.href} interactive className="corner-glow relative h-full gap-4 px-6">
                <IconTile tone={toneCycle[i]} size="md">
                  <Icon className="size-5" />
                </IconTile>
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
