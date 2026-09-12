'use client';

import { useEffect, useMemo, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tones = {
  default: 'text-foreground',
  success: 'text-success',
  primary: 'text-primary',
  warning: 'text-warning',
  destructive: 'text-destructive',
} as const;

type ParsedValue = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  hasComma: boolean;
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^([^\d]*)([\d,]*\d(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numberPart, suffix] = match;
  const decimals = numberPart.includes('.') ? numberPart.split('.')[1].length : 0;
  const hasComma = numberPart.includes(',');
  const target = Number(numberPart.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  return { prefix, suffix, target, decimals, hasComma };
}

function formatNumber(n: number, decimals: number, hasComma: boolean) {
  const fixed = n.toFixed(decimals);
  if (!hasComma) return fixed;
  const [intPart, decPart] = fixed.split('.');
  const withCommas = Number(intPart).toLocaleString('en-US');
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

export function Stat({
  value,
  label,
  tone = 'default',
  className,
}: {
  value: string;
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const parsed = useMemo(() => parseValue(value), [value]);

  useEffect(() => {
    if (!inView || reduce || !parsed || !ref.current) return;
    const node = ref.current;
    const controls = animate(parsed.target * 0.7, parsed.target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = `${parsed.prefix}${formatNumber(latest, parsed.decimals, parsed.hasComma)}${parsed.suffix}`;
      },
      onComplete() {
        node.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, parsed, value]);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        ref={ref}
        className={cn('font-mono text-3xl font-semibold tracking-tight tabular-nums', tones[tone])}
      >
        {value}
      </span>
      <span className="text-sm text-foreground-subtle">{label}</span>
    </div>
  );
}
