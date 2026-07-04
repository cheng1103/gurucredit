import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Building2, Wallet } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';
import { getRegion, regionSlugs, formatMYR } from '@/lib/content/regions';

export const metadata = buildMetadata({
  title: 'Malaysia Service Areas and Regional Loan Guides',
  description: 'Browse GURU Credits regional loan guidance pages for Kuala Lumpur, Selangor, Johor, Penang, Sabah, Sarawak, and more across Malaysia.',
  path: '/service-areas',
  keywords: 'loan service areas Malaysia, regional loan guide Malaysia, Kuala Lumpur loan guide, Selangor loan advisory, Johor loan advice',
});

const content = {
  en: {
    badge: 'Regional Coverage',
    title: 'Service areas across Malaysia',
    subtitle: 'These regional pages combine local affordability context, borrower patterns, and route guidance for each major state or federal territory.',
    cta: 'Open guide',
    income: 'Median income',
    price: 'Median price',
  },
  ms: {
    badge: 'Liputan Serantau',
    title: 'Kawasan perkhidmatan di seluruh Malaysia',
    subtitle: 'Halaman serantau ini menggabungkan konteks kemampuan tempatan, corak peminjam, dan panduan laluan untuk setiap negeri atau wilayah persekutuan utama.',
    cta: 'Buka panduan',
    income: 'Pendapatan median',
    price: 'Harga median',
  },
} as const;

export default async function ServiceAreasPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];
  const regions = regionSlugs.map((slug) => getRegion(slug)).filter(Boolean);

  return (
    <main className="pb-20">
      <WebPageJsonLd
        url={`${SEO.url}/service-areas`}
        title={t.title}
        description={t.subtitle}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: language === 'ms' ? 'Kawasan Perkhidmatan' : 'Service Areas', url: `${SEO.url}/service-areas` }]}
      />
      <section className="relative overflow-hidden border-b"><div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" /><div className="container relative py-16 lg:py-20 max-w-5xl"><Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge><h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1><p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p></div></section>
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {regions.map((region) => {
            if (!region) return null;
            const name = region.name[language];
            return (
              <Card key={region.slug} className="surface-card border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-primary" />{name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{region.localContext[language]}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-border/60 bg-white/70 p-3"><p className="text-xs text-muted-foreground mb-1">{t.income}</p><p className="font-semibold text-foreground tabular-nums">{formatMYR(region.metrics.medianHouseholdIncomeMYR)}</p></div>
                    <div className="rounded-xl border border-border/60 bg-white/70 p-3"><p className="text-xs text-muted-foreground mb-1">{t.price}</p><p className="font-semibold text-foreground tabular-nums">{formatMYR(region.metrics.medianPropertyPriceMYR)}</p></div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground"><Building2 className="h-4 w-4" /><span>{region.primaryCity}</span><Wallet className="h-4 w-4 ml-2" /><span>DSR {region.metrics.dsrMedianPercent}%</span></div>
                  <Button asChild className="w-full btn-gradient text-white shadow-md"><LocaleLink href={`/loans/my/${region.slug}`}>{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></LocaleLink></Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
