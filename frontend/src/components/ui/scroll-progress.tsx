'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const height = doc.scrollHeight - doc.clientHeight;
      const scrolled = height > 0 ? (doc.scrollTop / height) * 100 : 0;
      setProgress(scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] transition-[width] duration-100 ease-out shadow-[0_0_12px_rgba(59,130,246,0.4)]"
        style={{
          width: `${progress}%`,
          backgroundPosition: `${100 - progress}% 0`,
        }}
      />
    </div>
  );
}
