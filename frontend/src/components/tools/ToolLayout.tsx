import type { ReactNode } from 'react';
import { LocaleLink } from '@/components/LocaleLink';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { faqsFor } from '@/lib/content/listings/faq';

const TOOL_MORE_QUESTIONS = faqsFor(['fees', 'process'], 3);

const moreQuestionsUi = {
  en: { title: 'More questions', viewAll: 'View all FAQs' },
  ms: { title: 'Soalan lanjut', viewAll: 'Lihat semua Soalan Lazim' },
} as const;

/**
 * Shared two-column layout for interactive comparison tools: a sticky input
 * rail on the left, results on the right, with an optional disclaimer note
 * and a small "more questions" block (linking to /faq) under the results.
 * Plain composition — no hooks, so it's safe to render from either a server
 * or a client component (though every current caller is a client component).
 */
export function ToolLayout({
  rail,
  children,
  disclaimer,
  language,
}: {
  rail: ReactNode;
  children: ReactNode;
  disclaimer?: ReactNode;
  language: Language;
}) {
  const t = moreQuestionsUi[language];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
      <div className="lg:sticky lg:top-24 lg:self-start">{rail}</div>
      <div className="min-w-0 space-y-6">
        {children}
        {disclaimer ? (
          <div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-5">{disclaimer}</div>
        ) : null}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-semibold">{t.title}</h2>
          <div className="mt-3 space-y-2">
            {TOOL_MORE_QUESTIONS.map((item) => (
              <details key={item.question} className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer text-sm font-medium">
                  {language === 'ms' ? item.questionMs : item.question}
                </summary>
                <p className="mt-2 text-sm text-foreground-muted">
                  {language === 'ms' ? item.answerMs : item.answer}
                </p>
              </details>
            ))}
          </div>
          <LocaleLink href={PATHS.faq} className="mt-4 inline-block text-sm font-medium text-primary">
            {t.viewAll}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
