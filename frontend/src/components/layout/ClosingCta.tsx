import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { Container } from './Container';
import { Section } from './Section';

const copy = {
  en: { title: 'Get a written answer before you send documents.', lede: 'Start with four details. We reply on official WhatsApp with the likely route and what to prepare.', primary: 'Start the 2-minute check', secondary: 'WhatsApp us', note: 'No payment on this website. Next steps are explained on official WhatsApp.' },
  ms: { title: 'Dapatkan jawapan bertulis sebelum hantar dokumen.', lede: 'Mula dengan empat butiran. Kami balas di WhatsApp rasmi dengan laluan yang mungkin dan apa yang perlu disediakan.', primary: 'Mula semakan 2 minit', secondary: 'WhatsApp kami', note: 'Tiada bayaran di laman web ini. Langkah seterusnya diterangkan di WhatsApp rasmi.' },
} as const;

export function ClosingCta({ language, title, lede, primaryHref, primaryLabel }: { language: Language; title?: string; lede?: string; primaryHref?: string; primaryLabel?: string }) {
  const t = copy[language];
  return (
    <Section id="closing-cta" tone="inverse">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] text-inverse-foreground lg:text-4xl">{title ?? t.title}</h2>
          <p className="mt-4 text-lg text-inverse-foreground/70">{lede ?? t.lede}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <LocaleLink href={primaryHref ?? PATHS.eligibilityTest}>{primaryLabel ?? t.primary}<ArrowRight className="size-4" /></LocaleLink>
            </Button>
            <Button size="lg" variant="inverse" asChild>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" />{t.secondary}</a>
            </Button>
          </div>
          <p data-nosnippet className="mt-6 text-xs text-inverse-foreground/60">{t.note}</p>
        </div>
      </Container>
    </Section>
  );
}
