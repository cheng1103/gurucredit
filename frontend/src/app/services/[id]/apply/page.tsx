'use client';

import { useParams } from 'next/navigation';
import { Section, Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { useLanguage } from '@/lib/i18n';
import { PATHS } from '@/lib/i18n/routes';
import { applyContent } from '@/lib/content/apply';
import { ApplyWizard } from '@/components/apply/ApplyWizard';

export default function ServiceApplyPage() {
  const { language } = useLanguage();
  const params = useParams();
  const serviceId = params.id as string;
  const t = applyContent[language];
  const serviceData = t.services[serviceId as keyof typeof t.services];

  if (!serviceData) {
    return (
      <Section>
        <Container size="prose" className="text-center">
          <h1 className="text-2xl font-bold">{t.notFound.title}</h1>
          <p className="mt-4 text-foreground-muted">{t.notFound.description}</p>
          <Button asChild className="mt-6">
            <LocaleLink href={PATHS.services}>{t.backToServices}</LocaleLink>
          </Button>
        </Container>
      </Section>
    );
  }

  return <ApplyWizard serviceId={serviceId} service={serviceData} />;
}
