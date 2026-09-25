import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { Prose } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PATHS } from '@/lib/i18n/routes';
import { SEO } from '@/lib/constants';
import { localizedMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';
import { getRegion, regionSlugs, formatMYR } from '@/lib/content/regions';
import { serviceAreasUi, serviceAreasIntro } from '@/lib/content/listings/service-areas';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function ServiceAreasPage() {
  const language = await resolveRequestLanguage();
  const t = serviceAreasUi[language];
  const intro = serviceAreasIntro[language];
  const regions = regionSlugs.map((slug) => getRegion(slug)).filter((region) => region !== null);

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/service-areas`}
        title={t.title}
        description={t.lede}
        language={language}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: t.breadcrumbServiceAreas, url: `${SEO.url}/service-areas` }]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbServiceAreas, href: PATHS.serviceAreas }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <Prose className="mb-10 max-w-3xl">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {intro.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? ' · ' : ''}
                <LocaleLink href={link.href}>{link.label}</LocaleLink>
              </span>
            ))}
          </p>
        </Prose>
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
