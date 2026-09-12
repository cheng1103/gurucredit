import { AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { ArticleLayout } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { buildMetadata } from '@/lib/seo';
import { ContactPageJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { teamMembers } from '@/app/about/team-data';
import { verifyUsContent, type VerifyUsSection } from '@/lib/content/verify-us';

export const metadata = buildMetadata({
  title: 'Verify Us: Licensing, Office & Privacy',
  description:
    'Review GURU Credits office details, official borrower channels, privacy handling, and the steps we expect borrowers to use when verifying our process.',
  path: '/verify-us',
  keywords:
    'verify GURU Credits, GURU Credits license, GURU Credits office, GURU Credits privacy, licensed money lender verification Malaysia, official WhatsApp lender verification',
});

const ui = { en: { home: 'Home' }, ms: { home: 'Utama' } } as const;

function Section({ s }: { s: VerifyUsSection }) {
  switch (s.kind) {
    case 'checklist':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          {s.intro ? <p>{s.intro}</p> : null}
          <ul className="not-prose grid gap-2 !pl-0">
            {s.items.map((item) => (
              <li key={item} className="flex gap-2 text-foreground-muted">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </>
      );
    case 'warnings':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 rounded-2xl border border-warning/30 bg-warning-soft p-5 !pl-0">
            {s.items.map((item) => (
              <li key={item} className="flex gap-2 text-foreground">
                <AlertTriangle className="mt-1 size-4 shrink-0 text-warning" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </>
      );
    case 'links':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 !pl-0 sm:grid-cols-2">
            {s.items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-colors hover:border-border-strong"
                  >
                    {item.label}
                    <ExternalLink className="size-4 text-primary" aria-hidden="true" />
                  </a>
                ) : (
                  <LocaleLink
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-colors hover:border-border-strong"
                  >
                    {item.label}
                    <ExternalLink className="size-4 text-primary" aria-hidden="true" />
                  </LocaleLink>
                )}
              </li>
            ))}
          </ul>
        </>
      );
  }
}

export default async function VerifyUsPage() {
  const language = await resolveRequestLanguage();
  const t = verifyUsContent[language];
  const u = ui[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/verify-us`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.breadcrumbLabel, url: `${SEO.url}/verify-us` },
        ]}
      />
      <ContactPageJsonLd />
      <ArticleLayout
        language={language}
        breadcrumbs={[{ label: u.home, href: PATHS.home }, { label: t.breadcrumbLabel }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
        footer={
          <div>
            <h2 className="text-2xl">{t.team.title}</h2>
            <p className="mt-2 text-foreground-muted">{t.team.intro}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role[language]}</p>
                  <p className="mt-3 text-sm text-foreground-muted">{member.credentials[language]}</p>
                  <p className="mt-2 text-sm text-foreground-muted">{member.bio[language]}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                    {member.yearsExperience}
                    {language === 'ms' ? '+ tahun pengalaman' : '+ years experience'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="not-prose rounded-2xl border border-border bg-surface-alt p-5">
          <p className="font-semibold text-foreground">{COMPANY.name}</p>
          <p className="mt-1 text-sm text-foreground-muted">{COMPANY.location}</p>
          <p className="mt-2 text-sm">
            <a href={COMPANY.phoneLink} className="text-primary hover:underline">{COMPANY.phone}</a>
            <span className="mx-2">•</span>
            <a href={COMPANY.emailLink} className="text-primary hover:underline">{COMPANY.email}</a>
          </p>
        </div>
        {t.sections.map((s) => (
          <Section key={s.id} s={s} />
        ))}
      </ArticleLayout>
    </>
  );
}
