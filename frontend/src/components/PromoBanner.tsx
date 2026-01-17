'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Clock, ArrowRight, Gift, Percent, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Promotion {
  id: string;
  type: 'limited-time' | 'special-offer' | 'holiday' | 'flash-sale';
  startDate: string;
  endDate: string;
  en: {
    title: string;
    description: string;
    cta: string;
  };
  ms: {
    title: string;
    description: string;
    cta: string;
  };
  link: string;
  bgColor: string;
  icon: 'sparkles' | 'clock' | 'gift' | 'percent' | 'zap';
}

// Configurable promotions - can be updated for different campaigns
const promotions: Promotion[] = [
  {
    id: 'year-end-2024',
    type: 'limited-time',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    en: {
      title: 'Year-End Special',
      description: 'Get rates as low as 4.88% p.a. + 0% Processing Fee!',
      cta: 'Apply Now',
    },
    ms: {
      title: 'Promosi Akhir Tahun',
      description: 'Kadar serendah 4.88% p.a. + 0% Fi Pemprosesan!',
      cta: 'Mohon Sekarang',
    },
    link: '/services/1/apply',
    bgColor: 'from-primary via-primary/90 to-primary/80',
    icon: 'sparkles',
  },
  {
    id: 'fast-approval',
    type: 'special-offer',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    en: {
      title: 'Flash Approval',
      description: 'Apply before 12PM, get approval by 6PM today!',
      cta: 'Get Started',
    },
    ms: {
      title: 'Kelulusan Kilat',
      description: 'Mohon sebelum 12PM, dapat kelulusan sebelum 6PM hari ini!',
      cta: 'Mula Sekarang',
    },
    link: '/services/1/apply',
    bgColor: 'from-orange-500 via-orange-500/90 to-orange-500/80',
    icon: 'zap',
  },
];

const iconMap = {
  sparkles: Sparkles,
  clock: Clock,
  gift: Gift,
  percent: Percent,
  zap: Zap,
};

export function PromoBanner() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Promotion | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!sessionStorage) return;
    const dismissed = sessionStorage.getItem('promoBannerDismissed');
    if (dismissed) return;

    const now = new Date();
    const active = promotions.find((promo) => {
      const start = new Date(promo.startDate);
      const end = new Date(promo.endDate);
      return now >= start && now <= end;
    });

    if (!active) return;

    const endDate = new Date(active.endDate);
    const scheduleBanner = () => {
      setCurrentPromo(active);
      setIsVisible(true);
    };

    requestAnimationFrame(scheduleBanner);

    const updateTimer = () => {
      const diff = endDate.getTime() - new Date().getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promoBannerDismissed', 'true');
  };

  if (!isVisible || !currentPromo) return null;

  const t = currentPromo[language];
  const Icon = iconMap[currentPromo.icon];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`bg-gradient-to-r ${currentPromo.bgColor} text-white relative overflow-hidden`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
        </div>

        <div className="container relative">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left: Icon and text */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm sm:text-base">{t.title}</span>
                  {currentPromo.type === 'limited-time' && (
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full hidden md:inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                  )}
                </div>
                <p className="text-sm opacity-90 truncate">{t.description}</p>
              </div>
            </div>

            {/* Right: CTA and close */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="hidden sm:inline-flex bg-white text-primary hover:bg-white/90"
              >
                <Link href={currentPromo.link}>
                  {t.cta}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Floating promo widget for corners of the page
export function FloatingPromoWidget() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show after 10 seconds if not dismissed
    const dismissed = localStorage.getItem('floatingPromoDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('floatingPromoDismissed', 'true');
  };

  const content = {
    en: {
      title: 'Limited Time Offer!',
      description: 'Get pre-approved in 5 minutes',
      cta: 'Check Eligibility',
    },
    ms: {
      title: 'Tawaran Terhad!',
      description: 'Dapatkan pra-kelulusan dalam 5 minit',
      cta: 'Semak Kelayakan',
    },
  };

  if (!isVisible) return null;

  const t = content[language];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="fixed bottom-24 right-4 z-40"
      >
        {isMinimized ? (
          <Button
            onClick={() => setIsMinimized(false)}
            className="rounded-full w-14 h-14 shadow-lg"
          >
            <Gift className="h-6 w-6" />
          </Button>
        ) : (
          <div className="bg-card border rounded-xl shadow-xl p-4 w-72">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{t.title}</h4>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/eligibility-test">{t.cta}</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
