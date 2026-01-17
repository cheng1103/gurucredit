'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

type Props = {
  referenceNumber: string;
  note: string;
};

export function ReferenceDetailsClient({ referenceNumber, note }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      const colors = ['#1e3a5f', '#2d5a87', '#FFD700', '#22c55e'];

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
        colors,
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
        colors,
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <code className="text-lg font-mono font-bold text-primary">{referenceNumber}</code>
        <Button variant="ghost" size="sm" onClick={copyReference}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{note}</p>
    </>
  );
}
