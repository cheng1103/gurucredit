import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';
import { HeroSpotlight } from '@/components/HeroSpotlight';
import { HeroIntro, HeroStep } from '@/components/HeroIntro';
import { HeroVisual } from '@/components/HeroVisual';
import { MagneticCTA } from '@/components/MagneticCTA';

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
    ? 'Kami menganalisis DSR, CCRIS/CTOS dan menstrukturkan tawaran pinjaman yang sesuai dengan profil anda — terus daripada kami sebagai pemberi pinjaman berlesen.'
    : 'We analyse your DSR, CCRIS/CTOS file and structure a loan offer that fits your profile — directly from us as your licensed lender.';

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Full-bleed atmospheric hero photo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/hero-shutterstock.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Readability overlay — lighter on top, stronger toward bottom so
            text above the fold keeps contrast while the photo remains visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/60 to-background" />
      </div>

      <HeroSpotlight />

      {/* Film grain for cinematic texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[40rem] h-[40rem] bg-primary/[0.08] rounded-full blur-3xl animate-[drift_18s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] bg-accent/[0.09] rounded-full blur-3xl animate-[drift_22s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] bg-emerald-500/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="container relative pt-10 lg:pt-14 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <HeroIntro className="lg:col-span-7 space-y-10">
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
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  {editorialSubhead}
                </p>
              </HeroStep>

              <HeroStep>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                  <MagneticCTA>
                    <Button
                      size="lg"
                      asChild
                      className="h-12 px-8 text-sm font-semibold tracking-wide uppercase rounded-full"
                    >
                      <Link href={localeHref(language, PATHS.services)}>
                        {t.hero.cta}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </MagneticCTA>
                  <Link
                    href={COMPANY.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <PhoneCall className="h-4 w-4" />
                    </span>
                    {language === 'ms' ? 'Bercakap dengan perunding' : 'Speak with an advisor'}
                  </Link>
                </div>
              </HeroStep>

              <HeroStep variant="fade">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(15,23,42,0.15)]">
                  {t.stats.map((stat, index) => {
                    const parsed = parseStatValue(stat.value);
                    return (
                      <div
                        key={index}
                        className="group relative space-y-1.5 cursor-default rounded-lg -mx-2 px-2 py-2 transition-all duration-300 hover:bg-primary/[0.04] hover:-translate-y-0.5"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-2 right-2 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="font-display text-3xl lg:text-[2.5rem] font-semibold text-foreground tabular-nums tracking-tight leading-none transition-colors duration-300 group-hover:text-primary">
                          <AnimatedCounter
                            end={parsed.number}
                            suffix={parsed.suffix}
                            prefix={parsed.prefix}
                            decimals={parsed.decimals}
                            duration={1600}
                          />
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground leading-snug transition-colors duration-300 group-hover:text-foreground">
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
                  ? '"Kami bekerja dengan fail kredit sebenar anda — bukan promosi umum."'
                  : '"We work with your actual credit file — not generic offers."'
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
