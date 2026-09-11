import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PATHS } from '@/lib/i18n/routes';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';
import { getRegion, regionSlugs, formatMYR } from '@/lib/content/regions';
import { serviceAreasUi } from '@/lib/content/listings/service-areas';

export const metadata = buildMetadata({
  title: 'Malaysia Service Areas and Regional Loan Guides',
  description: 'Browse GURU Credits regional loan guidance pages for Kuala Lumpur, Selangor, Johor, Penang, Sabah, Sarawak, and more across Malaysia.',
  path: '/service-areas',
  keywords: 'loan service areas Malaysia, regional loan guide Malaysia, Kuala Lumpur loan guide, Selangor loan advisory, Johor loan advice',
});

export default async function ServiceAreasPage() {
  const language = await resolveRequestLanguage();
  const t = serviceAreasUi[language];
  const regions = regionSlugs.map((slug) => getRegion(slug)).filter((region) => region !== null);

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/service-areas`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: t.breadcrumbServiceAreas, url: `${SEO.url}/service-areas` }]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbServiceAreas, href: PATHS.serviceAreas }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <CardGrid columns={3}>
          {regions.map((region) => (
            <ListingCard
              key={region.slug}
              href={PATHS.loansRegion(region.slug)}
              title={region.name[language]}
              description={region.localContext[language]}
              meta={`${t.income}: ${formatMYR(region.metrics.medianHouseholdIncomeMYR)}`}
              cta={t.cta}
            />
          ))}
        </CardGrid>
      </ListingShell>
    </>
  );
}
