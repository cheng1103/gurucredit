import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';
import { LoanProductCard, type LoanIconKey } from './LoanProductCard';

const featureIconKeys: LoanIconKey[] = ['fileSearch', 'building2', 'calculator'];
const featureColors = [
  'from-blue-500 to-blue-600',
  'from-amber-500 to-amber-600',
  'from-emerald-500 to-emerald-600',
];
const featureImages = [
  '/images/optimized/personal-loan.webp',
  '/images/optimized/business-loan.webp',
  '/images/optimized/cta-bg.webp',
];

export function LoanProductsSection({ t }: { t: HomeContent }) {
  return (
    <section className="relative py-24 lg:py-32 section-accent-top overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/40 via-background to-muted/30" />
      <div aria-hidden="true" className="absolute top-20 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="container relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Zap className="h-3 w-3 mr-1" />
            {t.features.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.features.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.features.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.features.items.map((feature, index) => (
            <LoanProductCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={featureImages[index]}
              iconKey={featureIconKeys[index]}
              gradient={featureColors[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
