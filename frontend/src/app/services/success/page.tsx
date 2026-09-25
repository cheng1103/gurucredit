import Image from 'next/image';
import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader, Section, Container, IconTile } from '@/components/layout';
import {
  CheckCircle,
  Mail,
  Clock,
  MessageCircle,
  Home,
  FileText,
  Sparkles,
  Download,
  Calculator,
} from 'lucide-react';
import { COMPANY, SEO, SERVICES } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { successContent } from '@/lib/content/success';
import { ReferenceDetailsClient } from './ReferenceDetailsClient';

const stepIcons = [Mail, Clock, CheckCircle];

const CHECKLIST_URL = '/files/loan-document-checklist.pdf';

const generateReference = () => {
  const date = new Date();
  return `GC${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(
    date.getDate(),
  ).padStart(2, '0')}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

type SuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const language = await resolveRequestLanguage();
  const t = successContent[language] ?? successContent.en;
  const params = await searchParams;
  const serviceId = typeof params.service === 'string' ? params.service : undefined;
  const referenceFromUrl = typeof params.ref === 'string' ? params.ref.toUpperCase() : undefined;
  const referenceNumber = referenceFromUrl ?? generateReference();
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const whatsappLink = COMPANY.whatsappLink;
  const whatsappNumber = COMPANY.whatsapp;
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(whatsappLink)}`;

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/services/success`}
        title="Application Submitted"
        description="Your GURU Credits consultation request has been received. Save your reference number and we will follow up within 24 business hours."
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
          { name: 'Success', url: `${SEO.url}/services/success` },
        ]}
      />

      <PageHeader
        align="center"
        eyebrow={t.success}
        title={
          <span className="flex flex-col items-center gap-4">
            <IconTile tone="green" size="lg">
              <CheckCircle className="size-7" aria-hidden="true" />
            </IconTile>
            {t.title}
          </span>
        }
        lede={t.thankYou}
      />

      <Section>
        <Container size="prose">
          <Card>
            <CardContent className="space-y-6 p-6 lg:p-8">
              <div className="card-gradient-border shadow-glow rounded-lg p-4">
                <p className="mb-2 text-sm text-foreground-muted">{t.reference.title}</p>
                <ReferenceDetailsClient referenceNumber={referenceNumber} note={t.reference.saveNote} copyLabel={t.copyReference} />
              </div>

              <div className="rounded-lg bg-surface-alt p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-sm text-foreground-muted">{t.service.title}</p>
                    <p className="font-semibold text-foreground">{service.title}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{service.priceFormatted}</Badge>
                </div>
              </div>

              <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <FileText className="size-5 text-primary" />
                  {t.whatsNext.title}
                </h2>
                <div className="space-y-4">
                  {t.whatsNext.steps.map((step, index) => {
                    const StepIcon = stepIcons[index];
                    return (
                      <div key={step.title} className="relative flex items-start gap-4">
                        {index < 2 && <div className="absolute left-5 top-12 h-8 w-0.5 bg-border" />}
                        <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <StepIcon className="size-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <p className="font-medium text-foreground">{step.title}</p>
                            <Badge variant="secondary" className="text-xs">{step.time}</Badge>
                          </div>
                          <p className="text-sm text-foreground-muted">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface-alt p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">{t.timeline.title}</h3>
                <div className="space-y-2">
                  {t.timeline.statuses.map((status) => (
                    <div key={status.label} className="flex items-center gap-3 text-sm">
                      <div className="size-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{status.label}</p>
                        <p className="text-xs text-foreground-subtle">{status.eta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <FileText className="size-4 text-primary" />
                  {t.checklist.title}
                </p>
                <p className="text-sm text-foreground-muted">{t.checklist.description}</p>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer">
                    <Download className="size-4" />
                    {t.checklist.button}
                  </a>
                </Button>
              </div>

              <div className="space-y-3 rounded-lg border border-warning/30 bg-warning-soft p-4">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Sparkles className="size-4" />
                  {t.payment.title}
                </p>
                <p className="text-sm text-foreground-muted">{t.payment.description}</p>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  {t.payment.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-4 text-warning" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-warning/30 pt-2 text-xs text-foreground-subtle">{t.payment.note}</p>
              </div>

              <div className="space-y-4 rounded-lg bg-surface-alt p-4">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-foreground">{t.contact.title}</p>
                  <p className="text-sm text-foreground-muted">{t.contact.description}</p>
                  <p className="text-xs text-foreground-subtle">{t.contact.responseTime}</p>
                </div>
                <Button asChild className="w-full gap-2">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    {t.contact.whatsapp}
                  </a>
                </Button>
                <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-3">
                  <div>
                    <p className="text-xs text-foreground-subtle">{t.contact.scan}</p>
                    <p className="font-semibold text-foreground">{whatsappNumber}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-white p-2">
                    <Image src={whatsappQr} alt="WhatsApp QR" width={100} height={100} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="prose">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="gap-2">
              <LocaleLink href={PATHS.home}>
                <Home className="size-4" />
                {t.buttons.backHome}
              </LocaleLink>
            </Button>
            <Button asChild className="gap-2">
              <LocaleLink href={PATHS.eligibilityTest}>
                <Calculator className="size-4" />
                {t.buttons.tryCalculator}
              </LocaleLink>
            </Button>
          </div>
          <p className="mt-6 text-center text-xs text-foreground-subtle">{t.proTip}</p>
        </Container>
      </Section>
    </>
  );
}
