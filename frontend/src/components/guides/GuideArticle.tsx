import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArticleLayout, Stat } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import type { GuideDoc, GuideSection } from '@/lib/content/guides/types';
import { guideUi } from '@/lib/content/guides/ui';

type GuideUiLabels = Record<keyof (typeof guideUi)['en'], string>;

function Section({ s, labels }: { s: GuideSection; labels: GuideUiLabels }) {
  switch (s.kind) {
    case 'paragraphs':
      return (<><h2 id={s.id}>{s.heading}</h2>{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</>);
    case 'steps':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          {s.intro ? <p>{s.intro}</p> : null}
          <ol aria-label={labels.steps} className="not-prose grid gap-4 !pl-0">
            {s.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <span className="font-mono text-sm font-semibold text-foreground-subtle">{String(i + 1).padStart(2, '0')}</span>
                <div><h3 className="!mt-0 text-lg">{step.title}</h3><p className="mt-1 text-sm text-foreground-muted">{step.description}</p></div>
              </li>
            ))}
          </ol>
        </>
      );
    case 'checklist':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 !pl-0">
            {s.items.map((item) => (<li key={item} className="flex gap-2 text-foreground-muted"><CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />{item}</li>))}
          </ul>
        </>
      );
    case 'warnings':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 rounded-2xl border border-warning/30 bg-warning-soft p-5 !pl-0">
            {s.items.map((item) => (<li key={item} className="flex gap-2 text-foreground"><AlertTriangle className="mt-1 size-4 shrink-0 text-warning" />{item}</li>))}
          </ul>
        </>
      );
  }
}

export function GuideArticle({ doc, language }: { doc: GuideDoc; language: Language }) {
  const c = doc.content[language];
  const labels = guideUi[language];
  const url = new URL(doc.path, SEO.url).toString();
  const parent = doc.section === 'guides' ? { label: labels.guides, href: PATHS.loanGuides } : null;
  const breadcrumbs = [{ label: labels.home, href: PATHS.home }, ...(parent ? [parent] : []), { label: doc.breadcrumbLabel }];
  const breadcrumbItems = [
    { name: labels.home, url: SEO.url },
    ...(parent ? [{ name: parent.label, url: new URL(parent.href, SEO.url).toString() }] : []),
    { name: c.title, url },
  ];
  return (
    <>
      {c.howTo ? <HowToJsonLd name={c.howTo.name} description={c.howTo.description} steps={c.howTo.steps} /> : null}
      <WebPageJsonLd url={url} title={c.title} description={c.lede} faqItems={c.faqs} breadcrumbItems={breadcrumbItems} />
      <ArticleLayout
        language={language}
        breadcrumbs={breadcrumbs}
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        footer={
          c.related?.length ? (
            <div>
              <h2 className="text-2xl">{labels.related}</h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {c.related.map((r) => (
                  <li key={r.href}>
                    <LocaleLink href={r.href} className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 font-medium transition-colors hover:border-border-strong">
                      {r.title}<ArrowRight className="size-4 text-primary" />
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        }
      >
        {c.stats?.length ? (
          <div className="not-prose grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface-alt p-5 sm:grid-cols-4">
            {c.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
          </div>
        ) : null}
        {c.sections.map((s) => <Section key={s.id} s={s} labels={labels} />)}
        {c.faqs?.length ? (<><h2 id="faq">{labels.faq}</h2><div className="not-prose"><FaqAccordion items={c.faqs} /></div></>) : null}
      </ArticleLayout>
    </>
  );
}
