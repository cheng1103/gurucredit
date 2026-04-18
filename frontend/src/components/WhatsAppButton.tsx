'use client';

import { useState, useEffect, useMemo } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

const T = {
  en: {
    chattingNow: 'chatting now',
    tooltipTitle: 'Need help? Chat with us!',
    tooltipBody: 'Get instant answers via WhatsApp',
    aria: 'Chat on WhatsApp',
  },
  ms: {
    chattingNow: 'sedang berbual',
    tooltipTitle: 'Perlukan bantuan? Chat dengan kami!',
    tooltipBody: 'Jawapan segera melalui WhatsApp',
    aria: 'Chat di WhatsApp',
  },
};

// Drifts slowly between 8–15 so it feels "live" without looking fake
function useChattingCount() {
  const initial = useMemo(() => 8 + Math.floor(Math.random() * 6), []);
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = prev + delta;
        if (next < 8) return 8;
        if (next > 15) return 15;
        return next;
      });
    }, 12000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, []);

  return count;
}

export function WhatsAppButton() {
  const { language } = useLanguage();
  const t = T[language];
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  const chattingCount = useChattingCount();

  useEffect(() => {
    // Show button after scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    // Show tooltip after 5 seconds (only once)
    const tooltipTimer = setTimeout(() => {
      if (!hasShownTooltip) {
        setShowTooltip(true);
        setHasShownTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(tooltipTimer);
    };
  }, [hasShownTooltip]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
      {/* Live chatting count chip */}
      <div className="absolute bottom-full right-0 mb-2 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur shadow-md border border-border/60 pl-2 pr-3 py-1.5 text-xs whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 duration-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full bg-emerald-500 h-2 w-2" />
        </span>
        <span className="tabular-nums font-semibold text-foreground">{chattingCount}</span>
        <span className="text-muted-foreground">{t.chattingNow}</span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative bg-white rounded-lg shadow-xl border p-4 max-w-[250px]">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm font-medium text-gray-900 mb-1">{t.tooltipTitle}</p>
            <p className="text-xs text-gray-500">{t.tooltipBody}</p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r transform rotate-45" />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={t.aria}
      >
        {/* Outer breathing halo */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-[wa-breath_2.4s_ease-in-out_infinite]" />
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="relative h-7 w-7 text-white" fill="white" />
      </a>

      {/* Online indicator */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse" />
    </div>
  );
}
