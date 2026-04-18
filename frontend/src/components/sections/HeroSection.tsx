import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';

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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-backdrop hero-backdrop-mask pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[40rem] h-[40rem] bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] bg-accent/[0.07] rounded-full blur-3xl" />
      </div>

      <div className="container relative pt-10 lg:pt-14 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="font-medium">{editorialKicker}</span>
            </div>

            <h1
              className="font-display leading-[1.02] tracking-[-0.03em] text-foreground"
              style={{ fontSize: 'clamp(2.5rem, 5.7vw, 5.2rem)' }}
            >
              {editorialHeadline}
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {editorialSubhead}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 pt-10 border-t border-border/60">
              {t.stats.map((stat, index) => {
                const parsed = parseStatValue(stat.value);
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="font-display text-3xl lg:text-[2.5rem] font-semibold text-foreground tabular-nums tracking-tight leading-none">
                      <AnimatedCounter
                        end={parsed.number}
                        suffix={parsed.suffix}
                        prefix={parsed.prefix}
                        decimals={parsed.decimals}
                        duration={1600}
                      />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground leading-snug">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-12">
            <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)]">
              <div className="relative aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/5]">
                <Image
                  src="/images/optimized/hero-bg.webp"
                  alt="Loan advisory consultation"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 text-background">
                <p className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-3">
                  {language === 'ms' ? 'Pendekatan Kami' : 'Our Approach'}
                </p>
                <p className="text-lg lg:text-xl font-medium leading-snug">
                  {language === 'ms'
                    ? '"Kami bekerja dengan fail kredit sebenar anda — bukan promosi umum."'
                    : '"We work with your actual credit file — not generic offers."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
