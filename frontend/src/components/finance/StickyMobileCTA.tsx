'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

// Routes that already have their own submission flow — don't double-stack a CTA on top
const HIDDEN_ON = ['/services/', '/status', '/contact'];

export function StickyMobileCTA() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

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

  const ctaLabel = language === 'ms' ? 'Mohon Sekarang' : 'Apply Now';
  const feeLabel = language === 'ms' ? 'Laporan CTOS RM30' : 'RM30 CTOS Report';

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-3 mb-3 rounded-2xl bg-card/95 backdrop-blur border border-border/70 shadow-2xl p-2 flex items-center gap-2">
        <Link
          href="/services/1/apply"
          className="flex-1 inline-flex flex-col items-center justify-center h-12 rounded-xl bg-primary text-primary-foreground px-3"
        >
          <span className="text-sm font-semibold leading-tight flex items-center gap-1.5">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-medium opacity-80 leading-none mt-0.5">
            {feeLabel}
          </span>
        </Link>
        <a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 h-12 rounded-xl bg-emerald-600 text-white text-sm font-semibold px-4"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
