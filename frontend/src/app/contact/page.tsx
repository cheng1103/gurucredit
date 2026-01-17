import ContactContent from './ContactContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { ContactPageJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function ContactPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <ContactPageJsonLd />
      <WebPageJsonLd
        url={`${SEO.url}/contact`}
        title="Contact GURU Credits"
        description="Reach GURU Credits for loan consultation, WhatsApp support, and document guidance in Klang Valley."
        image="/images/cta-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Contact', url: `${SEO.url}/contact` },
        ]}
      />
      <ContactContent language={language} />
    </>
  );
}
