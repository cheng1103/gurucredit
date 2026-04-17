import { AlertTriangle } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';

export function RiskWarning({ t }: { t: HomeContent }) {
  return (
    <section
      className="border-y border-amber-200 bg-amber-50/80 py-6"
      aria-label={t.risk.title}
    >
      <div className="container">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
          </div>
          <div className="text-sm text-amber-900">
            <p className="font-semibold mb-1">{t.risk.title}</p>
            <p className="leading-relaxed">{t.risk.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
