'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { useLanguage } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const copy = {
  en: { primary: 'Check eligibility', whatsapp: 'WhatsApp' },
  ms: { primary: 'Semak kelayakan', whatsapp: 'WhatsApp' },
} as const;

const HIDDEN_ROUTES = /^\/(ms\/)?(services\/[^/]+\/apply|services\/success|contact|status)(\/|$)/;

export function StickyMobileCTA() {
  const { language } = useLanguage();
  const pathname = usePathname() ?? '/';
  const [heroVisible, setHeroVisible] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setHeroVisible(false);
  }

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  if (HIDDEN_ROUTES.test(pathname)) return null;
  const t = copy[language];

  return (
    <div
      className={
        'fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-border bg-surface/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-float backdrop-blur transition-transform duration-200 lg:hidden ' +
        (heroVisible ? 'translate-y-full' : 'translate-y-0')
      }
    >
      <LocaleLink
        href={PATHS.eligibilityTest}
        onClick={() => trackEvent('sticky_cta_click', { language, target: 'eligibility' })}
        className="inline-flex h-12 items-center justify-center rounded-[10px] bg-primary text-sm font-semibold text-primary-foreground"
      >
        {t.primary}
      </LocaleLink>
      <a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('sticky_cta_click', { language, target: 'whatsapp' })}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-border bg-surface text-sm font-semibold text-foreground"
      >
        <MessageCircle className="size-4" />
        {t.whatsapp}
      </a>
    </div>
  );
}
