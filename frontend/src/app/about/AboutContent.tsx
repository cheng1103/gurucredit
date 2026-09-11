import { PageHeader, Section, Container, SectionHeader, Stat, ClosingCta } from '@/components/layout';
import { CardGrid, ListingCard } from '@/components/listings';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { aboutContent } from '@/lib/content/about';
import { teamMembers } from './team-data';

const ui = {
  en: { home: 'Home', apply: 'View details' },
  ms: { home: 'Utama', apply: 'Lihat butiran' },
} as const;

export default function AboutContent({ language }: { language: Language }) {
  const t = aboutContent[language] ?? aboutContent.en;
  const u = ui[language];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: u.home, href: PATHS.home }, { label: t.breadcrumbLabel }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      />

      {/* Mission */}
      <Section>
        <Container>
          <SectionHeader eyebrow={t.mission.eyebrow} title={t.mission.title} />
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-2xl space-y-4 text-foreground-muted">
              {t.mission.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6 rounded-2xl border border-border bg-surface p-6 lg:w-auto">
              {t.stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust & Coverage */}
      <Section tone="alt">
        <Container>
          <SectionHeader title={t.trust.title} lede={t.trust.description} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {t.trust.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold text-foreground">{t.coverage.title}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{t.coverage.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.coverage.areas.map((area) => (
                  <Badge key={area} variant="secondary">{area}</Badge>
                ))}
              </div>
              <p className="mt-4 text-xs text-foreground-subtle">{t.coverage.note}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Story timeline */}
      <Section>
        <Container size="prose">
          <SectionHeader eyebrow={t.story.eyebrow} title={t.story.title} lede={t.story.description} />
          <ol className="space-y-6 border-l border-border pl-6">
            {t.story.timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[27px] top-1 size-2.5 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-mono text-sm font-semibold text-foreground-subtle">{item.year}</span>
                <h3 className="mt-1 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Team */}
      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={t.team.eyebrow} title={t.team.title} lede={t.team.description} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground">{member.role[language]}</h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground-subtle">
                  {member.yearsExperience}{language === 'ms' ? '+ tahun pengalaman' : '+ years experience'}
                </p>
                <p className="mt-3 border-l-2 border-primary pl-3 text-xs italic leading-relaxed text-foreground-muted">
                  {member.credentials[language]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{member.bio[language]}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeader eyebrow={t.values.eyebrow} title={t.values.title} lede={t.values.description} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.items.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services overview */}
      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} />
          <CardGrid columns={3}>
            {t.services.items.map((item) => (
              <ListingCard
                key={item.title}
                href={item.href}
                title={item.title}
                description={item.description}
                cta={u.apply}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      <ClosingCta language={language} />
    </>
  );
}
