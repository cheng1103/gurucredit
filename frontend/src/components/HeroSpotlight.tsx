'use client';

import { useEffect, useRef } from 'react';

export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Skip on touch (no hover)
    const coarse = window.matchMedia('(pointer: coarse)');
    if (coarse.matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--spot-x', `${x}%`);
        el.style.setProperty('--spot-y', `${y}%`);
        el.style.setProperty('--spot-opacity', '1');
      });
    };
    const onLeave = () => {
      el.style.setProperty('--spot-opacity', '0');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-auto"
      style={{ '--spot-x': '50%', '--spot-y': '30%', '--spot-opacity': '0' } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: 'var(--spot-opacity)',
          background:
            'radial-gradient(600px circle at var(--spot-x) var(--spot-y), oklch(0.45 0.12 250 / 0.12), transparent 55%)',
        }}
      />
    </div>
  );
}
