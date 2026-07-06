'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { QuickLeadCapture } from '@/components/QuickLeadCapture';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const HIDDEN_ON = ['/services/', '/status', '/contact'];

export function StickyMobileCTA() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const suppress = HIDDEN_ON.some((path) => pathname?.startsWith(path));
  if (suppress) return null;

  const ctaLabel = language === 'ms' ? 'Semakan Pantas' : 'Quick Check';
  const helperLabel = language === 'ms' ? 'WhatsApp review 2 minit' : '2-minute WhatsApp review';

  return (
    <div
      className={
        'fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 md:hidden ' +
        (visible ? 'translate-y-0' : 'translate-y-full')
      }
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur">
        <Sheet
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (nextOpen) {
              trackEvent('sticky_mobile_quick_check_open', {
                page_path: pathname || '/',
                language,
              });
            }
          }}
        >
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex-1 rounded-xl bg-primary px-3 text-primary-foreground"
            >
              <span className="flex h-12 flex-col items-center justify-center">
                <span className="flex items-center gap-1.5 text-sm font-semibold leading-tight">
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="mt-0.5 text-[10px] font-medium leading-none opacity-80">
                  {helperLabel}
                </span>
              </span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[92vh] rounded-t-3xl px-4 pb-8 pt-3">
            <SheetHeader className="px-0 pb-2">
              <SheetTitle>{ctaLabel}</SheetTitle>
              <SheetDescription>
                {language === 'ms'
                  ? 'Tinggalkan maklumat asas dahulu. Kami hubungi anda di WhatsApp dengan laluan yang lebih sesuai.'
                  : 'Leave the basics first. We will WhatsApp you with the route that fits your profile.'}
              </SheetDescription>
            </SheetHeader>
            <QuickLeadCapture
              language={language}
              source="STICKY_MOBILE"
              variant="sheet"
              onSuccess={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('sticky_mobile_whatsapp_click', {
              page_path: pathname || '/',
              language,
            })
          }
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
