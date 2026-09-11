'use client';

import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const label = { en: 'Chat on WhatsApp', ms: 'Sembang di WhatsApp' } as const;

export function WhatsAppFab() {
  const { language } = useLanguage();
  return (
    <a
      href={COMPANY.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label[language]}
      onClick={() => trackEvent('whatsapp_fab_click', { language })}
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-inverse text-inverse-foreground shadow-float transition-transform hover:-translate-y-0.5 lg:flex"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
