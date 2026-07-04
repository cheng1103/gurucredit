import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleLink } from '@/components/LocaleLink';
import { ArrowUpRight, MapPin, ExternalLink, Building2, Landmark, Users } from 'lucide-react';
import { getRegion, regionSlugs, formatMYR, regionMetaLabel } from '@/lib/content/regions';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const revalidate = 3600;

export async function generateStaticParams() {
  return regionSlugs.map((region) => ({ region }));
}

type Params = Promise<{ region: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};

  const language = await resolveRequestLanguage();
  const name = region.name[language];
  const prefix = regionMetaLabel(language);

  const title =
    language === 'ms'
      ? `Perundingan Pinjaman ${name} | Analisis DSR & Padanan Bank`
      : `${name} Loan Advisory | DSR Analysis & Lender Matching`;
  const description =
    language === 'ms'
      ? `Perundingan pinjaman bebas untuk peminjam di ${name}. Analisis DSR, semakan CCRIS/CTOS dan struktur pinjaman yang sesuai dengan profil kredit anda.`
      : `Independent loan advisory for borrowers in ${name}. DSR analysis, CCRIS/CTOS review, and loan structuring based on your actual credit profile.`;

  const url = `${SEO.url}/loans/my/${region.slug}`;

  return {
    title,
    description,
    // canonical + hreflang inherited from the root layout (localeAlternates)
    openGraph: {
      title: `${prefix} ${name}`,
      description,
      url,
      locale: language === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website',
    },
    other: {
      'geo.region': region.regionCode,
      'geo.placename': name,
      'geo.position': `${region.coordinates.latitude};${region.coordinates.longitude}`,
      ICBM: `${region.coordinates.latitude}, ${region.coordinates.longitude}`,
    },
  };
}

export default async function RegionPage({ params }: { params: Params }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const language = await resolveRequestLanguage();
  const name = region.name[language];
  const kicker = regionMetaLabel(language);

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Loans', url: `${SEO.url}/loans` },
          { name, url: `${SEO.url}/loans/my/${region.slug}` },
        ]}
      />

      <section className="py-20 lg:py-28 border-b border-border/60">
        <div className="container">
          <nav className="text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <LocaleLink href="/" className="hover:text-foreground transition-colors">
                  {language === 'ms' ? 'Laman Utama' : 'Home'}
                </LocaleLink>
              </li>
              <li>/</li>
              <li>
                <LocaleLink href="/loans/personal" className="hover:text-foreground transition-colors">
                  {language === 'ms' ? 'Pinjaman' : 'Loans'}
                </LocaleLink>
              </li>
              <li>/</li>
              <li className="text-foreground">{name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {kicker} {name}
              </p>
              <h1 className="font-display text-4xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-foreground mb-6">
                {language === 'ms'
                  ? `Pembiayaan di ${name}, dipadankan pada profil anda.`
                  : `Lending in ${name}, matched to your profile.`}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {region.localContext[language]}
              </p>
              <div className="flex items-center gap-5 mt-8">
                <LocaleLink
                  href="/services"
                  className="inline-flex items-center h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
                >
                  {language === 'ms' ? 'Mulakan Analisis' : 'Start Analysis'}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </LocaleLink>
                <LocaleLink
                  href="/eligibility-test"
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {language === 'ms' ? 'Ujian Kelayakan' : 'Eligibility Test'}
                  <ArrowUpRight className="h-4 w-4" />
                </LocaleLink>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:pl-8">
              <div className="rounded-lg border border-border/70 p-6 space-y-5 bg-muted/20">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                  {language === 'ms' ? 'Penanda Aras Tempatan' : 'Local Benchmarks'}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {language === 'ms' ? 'Pendapatan Isi Rumah Median' : 'Median Household Income'}
                    </p>
                    <p className="font-display text-2xl font-semibold text-foreground tabular-nums">
                      {formatMYR(region.metrics.medianHouseholdIncomeMYR)}
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {language === 'ms' ? 'Harga Hartanah Median' : 'Median Property Price'}
                    </p>
                    <p className="font-display text-2xl font-semibold text-foreground tabular-nums">
                      {formatMYR(region.metrics.medianPropertyPriceMYR)}
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {language === 'ms' ? 'DSR Median' : 'Median DSR'}
                    </p>
                    <p className="font-display text-2xl font-semibold text-foreground tabular-nums">
                      {region.metrics.dsrMedianPercent}%
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {language === 'ms'
                    ? 'Data disusun daripada DOSM, Bank Negara dan data dalaman kami.'
                    : 'Compiled from DOSM, Bank Negara, and our internal benchmarks.'}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {language === 'ms' ? 'Kemampuan' : 'Affordability'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-6">
                {language === 'ms'
                  ? `Apa yang bermakna untuk pembeli ${name}.`
                  : `What this means for ${name} buyers.`}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {region.affordabilityNote[language]}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {region.metrics.primaryLoanProducts.map((product) => {
                  const labels: Record<string, { en: string; ms: string }> = {
                    home: { en: 'Home Loan', ms: 'Pinjaman Rumah' },
                    car: { en: 'Car Loan', ms: 'Pinjaman Kereta' },
                    personal: { en: 'Personal Loan', ms: 'Pinjaman Peribadi' },
                    business: { en: 'Business Loan', ms: 'Pinjaman Perniagaan' },
                    refinance: { en: 'Refinance', ms: 'Pembiayaan Semula' },
                  };
                  return (
                    <span
                      key={product}
                      className="text-xs uppercase tracking-wider border border-border px-3 py-1.5 rounded-full bg-background"
                    >
                      {labels[product][language]}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {region.marketTrends && (
        <section className="py-20 lg:py-24 border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 flex items-center gap-2">
                <Landmark className="h-3.5 w-3.5" />
                {language === 'ms' ? 'Tinjauan Pasaran' : 'Market Snapshot'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight">
                {region.marketTrends.title[language]}
              </h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              {region.marketTrends.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  <p className="text-base leading-relaxed text-foreground">{bullet[language]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {region.bankSpecialisation && (
        <section className="py-20 lg:py-24 bg-muted/30 border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" />
                {language === 'ms' ? 'Pengkhususan Bank' : 'Lender Specialisation'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-5">
                {region.bankSpecialisation.title[language]}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {region.bankSpecialisation.lead[language]}
              </p>
            </div>
            <div className="space-y-6">
              {region.bankSpecialisation.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-lg text-foreground mb-3">{item.bank}</h3>
                  <p className="text-sm text-foreground leading-relaxed mb-2">
                    {item.strength[language]}
                  </p>
                  {item.caveat && (
                    <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed italic">
                      {language === 'ms' ? 'Amaran: ' : 'Caveat: '}
                      {item.caveat[language]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-24 border-t border-border/60">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
              {language === 'ms' ? 'Pemberi Pinjaman Aktif' : 'Active Lenders'}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight">
              {language === 'ms'
                ? `Bank yang aktif di ${name}.`
                : `Lenders active in ${name}.`}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {region.lenders.map((lender) => (
              <div
                key={lender}
                className="flex items-center justify-center rounded-lg border border-border/70 bg-card py-6 text-sm font-semibold text-foreground"
              >
                {lender}
              </div>
            ))}
          </div>
        </div>
      </section>

      {region.neighbourhoodGuide && (
        <section className="py-20 lg:py-24 bg-muted/30 border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {language === 'ms' ? 'Panduan Kejiranan' : 'Neighbourhood Guide'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight">
                {region.neighbourhoodGuide.title[language]}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {region.neighbourhoodGuide.notes.map((note, i) => (
                <div key={i} className="rounded-xl border border-border/70 bg-card p-6 shadow-sm">
                  <h3 className="font-semibold text-base text-foreground mb-3">{note.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {note.note[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {region.localCaseStudies && region.localCaseStudies.length > 0 && (
        <section className="py-20 lg:py-24 border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 flex items-center gap-2">
                <Users className="h-3.5 w-3.5" />
                {language === 'ms' ? 'Kes Tempatan' : 'Local Cases'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-4">
                {language === 'ms'
                  ? `Peminjam sebenar di ${name}.`
                  : `Real borrowers in ${name}.`}
              </h2>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                {language === 'ms'
                  ? 'Nama disamar. Nombor dan hasil adalah sebenar, daripada rekod klien kami dalam 12 bulan lepas.'
                  : 'Names changed. Numbers and outcomes are real, drawn from our client records in the last 12 months.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {region.localCaseStudies.map((caseItem, i) => (
                <article
                  key={i}
                  className="rounded-xl border border-border/70 bg-card p-6 shadow-sm space-y-4"
                >
                  <header>
                    <p className="font-semibold text-foreground">
                      {caseItem.label}, {caseItem.ageRange}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{caseItem.profile[language]}</p>
                  </header>
                  <div>
                    <p className="eyebrow text-destructive mb-1.5">
                      {language === 'ms' ? 'Cabaran' : 'Challenge'}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">{caseItem.challenge[language]}</p>
                  </div>
                  <div className="pt-4 border-t border-border/60">
                    <p className="eyebrow text-emerald-700 dark:text-emerald-300 mb-1.5">
                      {language === 'ms' ? 'Hasil' : 'Outcome'}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">{caseItem.outcome[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {region.faqs.length > 0 && (
        <section className="py-20 lg:py-24 bg-muted/30 border-t border-border/60">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {language === 'ms' ? 'Soalan Tempatan' : 'Local Questions'}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-10">
                {language === 'ms' ? `Diminta oleh peminjam ${name}` : `Asked by ${name} borrowers`}
              </h2>
              <div className="space-y-8">
                {region.faqs.map((faq, i) => (
                  <div key={i} className="border-t border-border/70 pt-8">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {faq.q[language]}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {faq.a[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {region.sources && region.sources.length > 0 && (
        <section className="py-14 border-t border-border/60 bg-muted/20">
          <div className="container max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {language === 'ms' ? 'Sumber & Rujukan' : 'Sources & References'}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {region.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                  >
                    {src.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            {(region.lastReviewed || region.reviewedBy) && (
              <p className="mt-5 text-xs text-muted-foreground">
                {region.reviewedBy && (
                  <>
                    {language === 'ms' ? 'Disemak oleh' : 'Reviewed by'}{' '}
                    <span className="font-medium text-foreground">{region.reviewedBy}</span>
                    {region.lastReviewed && ' · '}
                  </>
                )}
                {region.lastReviewed && (
                  <>
                    {language === 'ms' ? 'Kemaskini terakhir' : 'Last reviewed'}{' '}
                    {new Date(region.lastReviewed).toLocaleDateString(
                      language === 'ms' ? 'ms-MY' : 'en-MY',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </>
                )}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28 border-t border-border/60">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl leading-[1.2] tracking-tight mb-6">
            {language === 'ms'
              ? `Sedia untuk laporan DSR & struktur pinjaman ${name}?`
              : `Ready for a ${name} DSR & lender-match report?`}
          </h2>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            {language === 'ms'
              ? 'Yuran RM30. Analisis bertulis dalam 24 jam. Yuran hanya diterima melalui WhatsApp rasmi selepas penghantaran.'
              : 'RM30 flat fee. Written analysis in 24 hours. Fee is collected only through official WhatsApp after submission.'}
          </p>
          <LocaleLink
            href="/services"
            className="inline-flex items-center h-12 px-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
          >
            {language === 'ms' ? 'Mulakan Analisis' : 'Start Analysis'}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
