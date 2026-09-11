import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';
import { toolsUi, tools } from '@/lib/content/listings/tools';

export const metadata = buildMetadata({
  title: 'Loan Tools & Calculators',
  description:
    'Loan calculators and tools to estimate payments, compare bank offers, and plan your financing in Malaysia.',
  path: '/tools',
  image: '/images/hero-bg.jpg',
  keywords:
    'GURU Credits tools, loan tools Malaysia, loan comparison Malaysia, financing tools Malaysia, loan eligibility test Malaysia, compare loan rates Malaysia, bank loan comparison Malaysia, monthly instalment comparison Malaysia',
});

export default async function ToolsPage() {
  const language = await resolveRequestLanguage();
  const t = toolsUi[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/tools`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Tools', url: `${SEO.url}/tools` },
        ]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: '/' }, { label: t.breadcrumbTools }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <CardGrid columns={2}>
          {tools.map((tool) => (
            <ListingCard
              key={tool.href}
              href={tool.href}
              title={language === 'ms' ? tool.titleMs : tool.title}
              description={language === 'ms' ? tool.descriptionMs : tool.description}
              cta={t.cta}
            />
          ))}
        </CardGrid>
      </ListingShell>
    </>
  );
}
