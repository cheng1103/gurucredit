'use client';

import { Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Container } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { useLanguage } from '@/lib/i18n';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';

const content = {
  en: {
    eyebrow: '404',
    title: 'We could not find that page.',
    description: 'The link may be broken, the page may have moved, or the URL was mistyped.',
    goHome: 'Back to home',
    whatsapp: 'Talk to us on WhatsApp',
  },
  ms: {
    eyebrow: '404',
    title: 'Kami tidak menemui halaman itu.',
    description: 'Pautan mungkin telah rosak, halaman telah dipindahkan, atau anda tersalah URL.',
    goHome: 'Kembali ke utama',
    whatsapp: 'Hubungi kami di WhatsApp',
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <Section className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container size="prose" className="text-center">
        <p className="eyebrow mb-3">{t.eyebrow}</p>
        <h1 className="text-4xl lg:text-5xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">{t.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <LocaleLink href={PATHS.home}>
              <Home className="size-4" aria-hidden="true" />
              {t.goHome}
            </LocaleLink>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" />
              {t.whatsapp}
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
