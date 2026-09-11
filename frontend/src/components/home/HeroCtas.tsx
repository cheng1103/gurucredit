'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import type { Language } from '@/lib/i18n/translations';

export function HeroCtas({ primary, secondary, language }: { primary: string; secondary: string; language: Language }) {
  const scrollToForm = () => {
    trackEvent('hero_primary_cta_click', { language, target: 'hero-quick-check' });
    const el = document.getElementById('hero-quick-check');
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    el?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button size="lg" type="button" onClick={scrollToForm} className="w-full sm:w-auto">
        {primary}
        <ArrowRight className="size-4" />
      </Button>
      <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
        <a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('hero_whatsapp_click', { language, placement: 'hero' })}
        >
          <MessageCircle className="size-4" />
          {secondary}
        </a>
      </Button>
    </div>
  );
}
