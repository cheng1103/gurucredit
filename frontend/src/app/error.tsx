'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

const COPY = {
  en: {
    kicker: 'Unexpected error',
    headline: 'Something broke on our side.',
    body: 'This is on us, not you. The page hit an unexpected error and could not load. Try refreshing — if it still fails, reach us on WhatsApp and we will sort it out.',
    reference: 'Reference:',
    tryAgain: 'Try again',
    backHome: 'Back to home',
    whatsapp: 'WhatsApp support',
  },
  ms: {
    kicker: 'Ralat tidak dijangka',
    headline: 'Sesuatu tidak kena di pihak kami.',
    body: 'Ini salah kami, bukan anda. Halaman ini tersekat oleh ralat yang tidak dijangka dan gagal dimuatkan. Cuba muat semula — jika masih gagal, hubungi kami di WhatsApp dan kami akan uruskan.',
    reference: 'Rujukan:',
    tryAgain: 'Cuba lagi',
    backHome: 'Kembali ke utama',
    whatsapp: 'Sokongan WhatsApp',
  },
};

function detectLanguage(): 'en' | 'ms' {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)gc_lang=(en|ms)/);
  return match?.[1] === 'ms' ? 'ms' : 'en';
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<'en' | 'ms'>('en');

  useEffect(() => {
    setLang(detectLanguage());
    // eslint-disable-next-line no-console
    console.error('Route error:', error);
  }, [error]);

  const t = COPY[lang];

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-destructive/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-destructive font-semibold mb-6">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {t.kicker}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-foreground mb-6">
            {t.headline}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-4">
            {t.body}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono mb-10">
              {t.reference} <span className="text-foreground">{error.digest}</span>
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 border-t border-border/60 pt-8">
            <Button size="lg" className="h-12 px-8 rounded-full" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {t.tryAgain}
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6 rounded-full" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t.backHome}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 px-6 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 border-0"
            >
              <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.whatsapp}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
