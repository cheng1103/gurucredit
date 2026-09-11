'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

type Props = {
  referenceNumber: string;
  note: string;
};

export function ReferenceDetailsClient({ referenceNumber, note }: Props) {
  const [copied, setCopied] = useState(false);

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
        <code className="font-mono text-lg font-semibold text-primary">{referenceNumber}</code>
        <Button variant="ghost" size="icon-sm" onClick={copyReference} aria-label="Copy reference">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="mt-2 text-xs text-foreground-subtle">{note}</p>
    </>
  );
}
