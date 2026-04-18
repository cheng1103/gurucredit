'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  imageSrc: string;
  imageAlt: string;
  quoteKicker: string;
  quote: string;
};

export function HeroVisual({ imageSrc, imageAlt, quoteKicker, quote }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <motion.div ref={ref} style={{ y: yParallax }} className="relative">
      <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.18)]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 text-background">
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-3">{quoteKicker}</p>
          <p className="text-lg lg:text-xl font-medium leading-snug">{quote}</p>
        </div>
      </div>
    </motion.div>
  );
}
