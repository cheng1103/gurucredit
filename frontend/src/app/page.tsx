import { resolveRequestLanguage } from '@/lib/i18n/server';
import { homeContent } from '@/lib/content/home';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Products } from '@/components/home/Products';
import { CalculatorSection } from '@/components/home/CalculatorSection';
import { Proof } from '@/components/home/Proof';
import { Transparency } from '@/components/home/Transparency';
import { Faq } from '@/components/home/Faq';
import { FinalCta } from '@/components/home/FinalCta';

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
      <Hero t={t} language={language} />
      <HowItWorks t={t} />
      <Products t={t} />
      <CalculatorSection t={t} />
      <Proof t={t} />
      <Transparency t={t} />
      <Faq t={t} />
      <FinalCta t={t} />
    </div>
  );
}
