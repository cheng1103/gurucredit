import { resolveRequestLanguage } from '@/lib/i18n/server';
import { homeContent } from '@/lib/content/home';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { Container, Section } from '@/components/layout';

export const revalidate = 300;

export default async function HomePage() {
  const language = await resolveRequestLanguage();
  const t = homeContent[language] ?? homeContent.en;

  return (
    <div className="flex flex-col">
      <WebPageJsonLd
        url={SEO.url}
        title={SEO.defaultTitle}
        description={SEO.defaultDescription}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }]}
        faqItems={t.faq.items}
      />
      <Section id="hero">
        <Container>
          <h1 className="text-4xl lg:text-6xl">
            {t.hero.title} <span className="text-primary">{t.hero.titleAccent}</span>
          </h1>
        </Container>
      </Section>
    </div>
  );
}
