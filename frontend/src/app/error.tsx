'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Container } from '@/components/layout';
import { COMPANY } from '@/lib/constants';

const COPY = {
  en: {
    eyebrow: 'Error',
    title: 'Something broke on our side.',
    description: 'This is on us, not you. Try again, or reach us on WhatsApp and we will sort it out.',
    tryAgain: 'Try again',
    whatsapp: 'WhatsApp support',
  },
  ms: {
    eyebrow: 'Ralat',
    title: 'Sesuatu tidak kena di pihak kami.',
    description: 'Ini salah kami, bukan anda. Cuba lagi, atau hubungi kami di WhatsApp dan kami akan uruskan.',
    tryAgain: 'Cuba lagi',
    whatsapp: 'Sokongan WhatsApp',
  },
};

function detectLanguage(): 'en' | 'ms' {
  const match = document.cookie.match(/(?:^|;\s*)gc_lang=(en|ms)/);
  return match?.[1] === 'ms' ? 'ms' : 'en';
}

// No cookie-change events to subscribe to — this only needs the value read
// once per mount, so the subscriber is a no-op.
function subscribe() {
  return () => {};
}

function getServerLanguage(): 'en' | 'ms' {
  return 'en';
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useSyncExternalStore reads the cookie (an external system) directly rather
  // than setting state from an effect: the server snapshot is always 'en', so
  // hydration matches, then React re-renders with the real client value —
  // avoiding both a hydration mismatch and a setState-in-effect cascade.
  const lang = useSyncExternalStore(subscribe, detectLanguage, getServerLanguage);

  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  const t = COPY[lang];

  return (
    <Section className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container size="prose" className="text-center">
        <p className="eyebrow mb-3 text-destructive">{t.eyebrow}</p>
        <h1 className="text-4xl lg:text-5xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">{t.description}</p>
        {error.digest ? <p className="mt-2 font-mono text-xs text-foreground-subtle">{error.digest}</p> : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="size-4" aria-hidden="true" />
            {t.tryAgain}
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
