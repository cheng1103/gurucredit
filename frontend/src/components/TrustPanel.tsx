import { ShieldCheck } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/layout';

interface TrustItem {
  title: string;
  description: string;
}

interface TrustPanelProps {
  title: string;
  description: string;
  items: TrustItem[];
}

export function TrustPanel({ title, description, items }: TrustPanelProps) {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
              {title}
            </span>
          }
          lede={description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
