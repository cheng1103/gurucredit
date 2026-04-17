import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileSearch, Calculator, TrendingUp, Building2, Zap } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';

const featureIcons = [FileSearch, Building2, Calculator];
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
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Zap className="h-3 w-3 mr-1" />
            {t.features.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.features.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.features.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Card
                key={index}
                className="group card-hover border-0 shadow-lg overflow-hidden h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] min-h-[160px] overflow-hidden">
                  <Image
                    src={featureImages[index]}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div
                    className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${featureColors[index]} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
