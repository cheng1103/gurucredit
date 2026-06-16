'use client';

import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { HeroSpotlight } from '@/components/HeroSpotlight';
import { HeroIntro, HeroStep } from '@/components/HeroIntro';
import { HeroVisual } from '@/components/HeroVisual';
import { MagneticCTA } from '@/components/MagneticCTA';
import { QuickLeadCapture } from '@/components/QuickLeadCapture';
import { trackEvent } from '@/lib/analytics';

function parseStatValue(raw: string) {
  const v = String(raw ?? '').trim();
  if (v.includes('%')) {
    return { number: parseFloat(v.replace('%', '')) || 0, suffix: '%', prefix: '', decimals: 0 };
  }
  if (/\d+[hj]$/i.test(v)) {
    return { number: parseInt(v, 10) || 0, suffix: v.slice(-1), prefix: '', decimals: 0 };
  }
  if (v.includes('+')) {
    return { number: parseInt(v.replace(/[,+]/g, ''), 10) || 0, suffix: '+', prefix: '', decimals: 0 };
  }
  if (v.toUpperCase().startsWith('RM')) {
    return { number: parseFloat(v.replace(/RM|,/gi, '')) || 0, suffix: '', prefix: 'RM', decimals: 0 };
  }
  return { number: parseInt(v.replace(/,/g, ''), 10) || 0, suffix: '', prefix: '', decimals: 0 };
}

type Props = { t: HomeContent; language: Language };

export function HeroSection({ t, language }: Props) {
  const editorialHeadline = language === 'ms'
    ? 'Panduan pinjaman yang telus, berdasarkan data anda.'
    : 'Data-driven loan guidance, tailored to your credit profile.';

  const editorialKicker = language === 'ms'
    ? 'Perundingan Pinjaman Malaysia'
    : 'Malaysian Loan Advisory';

  const editorialSubhead = language === 'ms'
    ? 'Semak potensi kelulusan, DSR, dan isu CCRIS/CTOS anda dahulu. Kami bantu susun laluan pinjaman yang lebih sesuai sebelum anda hantar permohonan penuh.'
    : 'Check your approval fit, DSR, and CCRIS/CTOS issues first. We help structure the right borrowing route before you submit a full application.';

  const handleQuickCheckClick = () => {
    trackEvent('hero_primary_cta_click', { language, target: 'hero-quick-check' });
    document.getElementById('hero-quick-check')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWhatsAppClick = () => {
    trackEvent('hero_whatsapp_click', { language, placement: 'hero' });
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.16] saturate-[0.85]"
          style={{
            backgroundImage: "url('/images/hero/hero-shutterstock.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      <HeroSpotlight />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 h-[40rem] w-[40rem] rounded-full bg-primary/[0.08] blur-3xl animate-[drift_18s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-accent/[0.09] blur-3xl animate-[drift_22s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/3 left-1/4 h-[20rem] w-[20rem] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      </div>

      <div className="container relative pt-10 pb-20 lg:pt-14 lg:pb-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <HeroIntro className="space-y-10 lg:col-span-7">
            <>
              <HeroStep>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="h-px w-10 bg-foreground/30" />
                  <span className="font-medium">{editorialKicker}</span>
                </div>
              </HeroStep>

              <HeroStep>
                <h1
                  className="font-display leading-[1.02] tracking-[-0.03em] text-foreground"
                  style={{ fontSize: 'clamp(2.5rem, 5.7vw, 5.2rem)' }}
                >
                  {editorialHeadline}
                </h1>
              </HeroStep>

              <HeroStep>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  {editorialSubhead}
                </p>
              </HeroStep>

              <HeroStep>
                <div className="flex flex-col items-start gap-5 pt-2 sm:flex-row sm:items-center">
                  <MagneticCTA>
                    <Button
                      size="lg"
                      type="button"
                      onClick={handleQuickCheckClick}
                      className="h-12 rounded-full px-8 text-sm font-semibold uppercase tracking-wide"
                    >
                      {language === 'ms' ? 'Semak Potensi Kelulusan' : 'Check Approval Fit'}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </MagneticCTA>
                  <a
                    href={COMPANY.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <PhoneCall className="h-4 w-4" />
                    </span>
                    {language === 'ms' ? 'Bercakap dengan perunding' : 'Speak with an advisor'}
                  </a>
                </div>
              </HeroStep>

              <HeroStep>
                <QuickLeadCapture language={language} source="HERO_QUICK_CHECK" />
              </HeroStep>

              <HeroStep variant="fade">
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/60 bg-white/55 p-5 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:gap-4 sm:p-6 lg:grid-cols-4">
                  {t.stats.map((stat, index) => {
                    const parsed = parseStatValue(stat.value);
                    return (
                      <div
                        key={index}
                        className="group relative -mx-2 space-y-1.5 rounded-lg px-2 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/[0.04]"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-2 right-2 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <div className="font-display text-3xl leading-none font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary lg:text-[2.5rem]">
                          <AnimatedCounter
                            end={parsed.number}
                            suffix={parsed.suffix}
                            prefix={parsed.prefix}
                            decimals={parsed.decimals}
                            duration={1600}
                          />
                        </div>
                        <div className="text-[11px] leading-snug text-muted-foreground uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-foreground">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </HeroStep>
            </>
          </HeroIntro>

          <div className="lg:col-span-5 lg:pt-12">
            <HeroVisual
              imageSrc="/images/optimized/hero-bg.webp"
              imageAlt="Loan advisory consultation"
              quoteKicker={language === 'ms' ? 'Pendekatan Kami' : 'Our Approach'}
              quote={
                language === 'ms'
                  ? '"Kami semak fail kredit sebenar anda dahulu sebelum cadang langkah seterusnya."'
                  : '"We review your actual credit file first before recommending the next move."'
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
