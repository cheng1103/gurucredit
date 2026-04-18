'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react';

type Props = {
  imageSrc: string;
  imageAlt: string;
  quoteKicker: string;
  quote: string;
};

const PHASES = [
  { key: 'scan', label: 'Scanning CTOS / CCRIS…', icon: FileSearch, color: 'text-amber-400' },
  { key: 'match', label: 'Matching bank criteria…', icon: ShieldCheck, color: 'text-sky-400' },
  { key: 'ready', label: 'Lender-ready package compiled.', icon: CheckCircle2, color: 'text-emerald-400' },
] as const;

export function HeroVisual({ imageSrc, imageAlt, quoteKicker, quote }: Props) {
  const [phase, setPhase] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Subtle parallax: right card drifts slightly up as you scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce]);

  const Icon = PHASES[phase].icon;

  return (
    <motion.div ref={ref} style={{ y: yParallax }} className="relative">
      <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)]">
        <div className="relative aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/5]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

          {/* Animated scanning frame */}
          {!reduce && (
            <>
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-6 top-6 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ y: [0, 240, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-6 right-6 top-6 bottom-24 rounded-2xl border border-white/15"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </>
          )}

          {/* Phase indicator badge */}
          <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 pl-2 pr-3 py-1.5 text-[11px] text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative rounded-full bg-emerald-400 h-2 w-2" />
            </span>
            <span className="tabular-nums">Live</span>
          </div>

          {/* Phase caption */}
          <motion.div
            key={PHASES[phase].key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-5 right-5 top-16 flex items-center gap-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 text-[12px] text-white/95"
          >
            <Icon className={`h-4 w-4 ${PHASES[phase].color} shrink-0`} />
            <span>{PHASES[phase].label}</span>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 text-background">
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-3">{quoteKicker}</p>
          <p className="text-lg lg:text-xl font-medium leading-snug">{quote}</p>
        </div>
      </div>

      {/* Floating stats chip */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hidden lg:flex absolute -left-4 -bottom-4 items-center gap-3 rounded-2xl bg-background border border-border shadow-lg px-4 py-3"
        >
          <div className="flex -space-x-2">
            {['bg-emerald-400', 'bg-sky-400', 'bg-amber-400'].map((c, i) => (
              <span
                key={i}
                className={`inline-block h-7 w-7 rounded-full ${c} border-2 border-background`}
              />
            ))}
          </div>
          <div className="leading-tight">
            <div className="text-xs text-muted-foreground">Consultants online</div>
            <div className="text-sm font-semibold tabular-nums">Avg. reply &lt; 12 min</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
