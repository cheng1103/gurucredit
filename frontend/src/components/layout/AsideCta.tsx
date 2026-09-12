import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

const copy = {
  en: { title: 'Not sure you qualify?', body: 'Two-minute check. Written answer within 24 hours.', primary: 'Check eligibility', whatsapp: 'WhatsApp us' },
  ms: { title: 'Tidak pasti anda layak?', body: 'Semakan dua minit. Jawapan bertulis dalam 24 jam.', primary: 'Semak kelayakan', whatsapp: 'WhatsApp kami' },
} as const;

export function AsideCta({ language, className }: { language: Language; className?: string }) {
  const t = copy[language];
  return (
    <div className={cn('corner-glow rounded-2xl border border-border bg-surface p-5 shadow-card', className)}>
      <p className="font-semibold">{t.title}</p>
      <p className="mt-1 text-sm text-foreground-muted">{t.body}</p>
      <div className="mt-4 flex flex-col gap-2">
        <Button asChild size="sm">
          <LocaleLink href={PATHS.eligibilityTest}>{t.primary}<ArrowRight className="size-4" /></LocaleLink>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" />{t.whatsapp}</a>
        </Button>
      </div>
    </div>
  );
}
