import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';

export function TransparencyDisclosure({ t, bare = false }: { t: HomeContent; bare?: boolean }) {
  const body = (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">{t.disclosure.title}</h2>
      </div>
      <ul className="space-y-3">
        {t.disclosure.items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <CheckCircle2
              className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5"
              aria-hidden="true"
            />
            <span className="text-sm text-foreground leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
  if (bare) return <div>{body}</div>;
  return (
    <section className="py-14 lg:py-16 bg-background">
      <div className="container max-w-4xl mx-auto">{body}</div>
    </section>
  );
}
