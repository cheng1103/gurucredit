import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';

export function FinalCtaSection({ t, language }: { t: HomeContent; language: Language }) {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/optimized/cta-bg.webp"
          alt="Apply for a loan"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-1.5 tabular-nums">
            <Clock className="h-3 w-3 mr-1.5" />
            {t.cta.badge}
          </Badge>
          <h2 className="font-display text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.025em] font-semibold mb-5">
            {t.cta.title}
          </h2>
          <p className="text-white/85 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="h-14 px-9 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-xl transition-all"
            >
              <Link href={localeHref(language, PATHS.servicesApply('1'))}>
                {t.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="h-14 px-9 text-base font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl transition-all border-0"
            >
              <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.cta.secondary}
              </Link>
            </Button>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-xs text-white/80 tracking-[0.14em] uppercase font-medium">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {language === 'ms'
              ? 'Tiada bayaran di laman · Yuran CTOS RM30 melalui WhatsApp rasmi selepas pengesahan'
              : 'No payment on this website · RM30 CTOS fee settled via official WhatsApp after confirmation'}
          </p>
        </div>
      </div>
    </section>
  );
}
