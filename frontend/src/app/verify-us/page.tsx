import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { ContactPageJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { teamMembers } from '@/app/about/team-data';
import { Building2, CheckCircle2, ExternalLink, FileBadge2, ShieldCheck } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Verify Us: Licensing, Office, Privacy & Official Channels',
  description:
    'Review GURU Credits office details, official borrower channels, privacy handling, and the steps we expect borrowers to use when verifying our process.',
  path: '/verify-us',
  keywords:
    'verify GURU Credits, GURU Credits license, GURU Credits office, GURU Credits privacy, licensed money lender verification Malaysia, official WhatsApp lender verification',
});

const content = {
  en: {
    badge: 'Trust & Verification',
    title: 'Verify us before you submit documents or payment',
    subtitle:
      'Borrowers should be able to verify who we are, which channels are official, how documents are handled, and what a legitimate process looks like before committing to any loan discussion.',
    sections: {
      who: {
        title: '1. Confirm our operating identity',
        intro: 'Use these details as your baseline before you continue any conversation with us.',
        items: [
          'Brand used for borrower-facing communication: GURU Credits',
          'Official office address: Level 5, 13A, Jalan Semantan, Damansara Heights, 50490 Kuala Lumpur',
          'Official phone and WhatsApp must match the numbers shown on this website',
          'We only direct borrowers through our official website, email, and WhatsApp channels',
        ],
      },
      process: {
        title: '2. Know what a legitimate process looks like',
        items: [
          'We start with eligibility review, borrower profile checks, and document readiness — not instant guaranteed approval.',
          'We explain the next step, what documents are needed, and why they are relevant to the review.',
          'Payment instructions, when applicable, are shared only through our official WhatsApp flow after basic verification.',
          'We expect borrowers to read written explanations, not rely on screenshots or verbal promises alone.',
        ],
      },
      redFlags: {
        title: '3. Stop if you see these red flags',
        items: [
          'A request to transfer money to a personal account without a clear written explanation.',
          'Pressure to pay immediately before you understand the purpose of the fee or the process.',
          'Claims of guaranteed approval without looking at CCRIS, CTOS, income, or commitments.',
          'A mismatch between the website contact details and the person contacting you.',
        ],
      },
      privacy: {
        title: '4. How we handle data and documents',
        items: [
          'We follow PDPA-aligned handling for borrower information and limit document requests to what is relevant for the stage of review.',
          'We do not ask borrowers to upload every sensitive document blindly at the first touchpoint.',
          'Privacy, terms, and disclaimer pages are publicly available so borrowers can review them before proceeding.',
        ],
      },
      team: {
        title: 'Who reviews your case',
        intro: 'The borrower-facing brand is supported by specialists who work on credit review, SME facilities, and recovery cases.',
      },
      official: {
        title: 'Official resources you can cross-check',
        items: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Disclaimer', href: '/disclaimer' },
          { label: 'Editorial Policy', href: '/editorial-policy' },
          { label: 'Review Methodology', href: '/review-methodology' },
          { label: 'Service Areas', href: '/service-areas' },
          { label: 'Contact Page', href: '/contact' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
      external: {
        title: 'Public Malaysian resources',
        items: [
          { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my' },
          { label: 'AKPK', href: 'https://www.akpk.org.my' },
          { label: 'BNMTELELINK', href: 'https://telelink.bnm.gov.my' },
        ],
      },
    },
    cta: {
      title: 'Ready to verify and continue?',
      subtitle: 'Once you are comfortable with the process, move into an eligibility review or message us on the official WhatsApp line.',
      primary: 'Check Eligibility',
      secondary: 'WhatsApp Us',
    },
  },
  ms: {
    badge: 'Kepercayaan & Pengesahan',
    title: 'Sahkan kami dahulu sebelum hantar dokumen atau bayaran',
    subtitle:
      'Peminjam patut boleh menyemak siapa kami, saluran rasmi yang digunakan, cara dokumen dikendalikan, dan bagaimana proses yang sah kelihatan sebelum komited kepada sebarang perbincangan pinjaman.',
    sections: {
      who: {
        title: '1. Sahkan identiti operasi kami',
        intro: 'Gunakan butiran ini sebagai asas semakan sebelum meneruskan perbualan dengan kami.',
        items: [
          'Jenama yang digunakan untuk komunikasi dengan peminjam: GURU Credits',
          'Alamat pejabat rasmi: Level 5, 13A, Jalan Semantan, Damansara Heights, 50490 Kuala Lumpur',
          'Telefon dan WhatsApp rasmi mesti sepadan dengan nombor yang dipaparkan di laman web ini',
          'Kami hanya mengarahkan peminjam melalui laman web rasmi, e-mel, dan saluran WhatsApp rasmi kami',
        ],
      },
      process: {
        title: '2. Fahami rupa proses yang sah',
        items: [
          'Kami bermula dengan semakan kelayakan, profil peminjam, dan kesediaan dokumen — bukan janji lulus serta-merta.',
          'Kami menerangkan langkah seterusnya, dokumen yang diperlukan, dan mengapa ia relevan kepada semakan.',
          'Arahan bayaran, jika berkaitan, hanya dikongsi melalui aliran WhatsApp rasmi selepas pengesahan asas dibuat.',
          'Kami mengharapkan peminjam membaca penjelasan bertulis, bukan bergantung pada tangkap layar atau janji lisan semata-mata.',
        ],
      },
      redFlags: {
        title: '3. Berhenti jika anda nampak tanda amaran ini',
        items: [
          'Permintaan pindahan wang ke akaun peribadi tanpa penjelasan bertulis yang jelas.',
          'Tekanan untuk bayar segera sebelum anda faham tujuan yuran atau proses sebenar.',
          'Dakwaan kelulusan pasti tanpa melihat CCRIS, CTOS, pendapatan, atau komitmen.',
          'Maklumat hubungan di laman web tidak sepadan dengan individu yang menghubungi anda.',
        ],
      },
      privacy: {
        title: '4. Cara kami mengendalikan data dan dokumen',
        items: [
          'Kami mengikuti pengendalian yang selari dengan PDPA untuk maklumat peminjam dan mengehadkan permintaan dokumen kepada tahap semakan yang relevan.',
          'Kami tidak meminta semua dokumen sensitif dimuat naik secara membuta tuli pada sentuhan pertama.',
          'Halaman privasi, terma, dan penafian tersedia secara terbuka untuk disemak sebelum anda meneruskan.',
        ],
      },
      team: {
        title: 'Siapa yang menyemak kes anda',
        intro: 'Jenama ini disokong oleh pakar yang bekerja pada semakan kredit, kemudahan PKS, dan kes pemulihan fail.',
      },
      official: {
        title: 'Sumber rasmi dalaman untuk anda semak',
        items: [
          { label: 'Dasar Privasi', href: '/privacy' },
          { label: 'Penafian', href: '/disclaimer' },
          { label: 'Dasar Editorial', href: '/editorial-policy' },
          { label: 'Metodologi Semakan', href: '/review-methodology' },
          { label: 'Kawasan Perkhidmatan', href: '/service-areas' },
          { label: 'Halaman Hubungi', href: '/contact' },
          { label: 'Soalan Lazim', href: '/faq' },
        ],
      },
      external: {
        title: 'Sumber awam Malaysia',
        items: [
          { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my' },
          { label: 'AKPK', href: 'https://www.akpk.org.my' },
          { label: 'BNMTELELINK', href: 'https://telelink.bnm.gov.my' },
        ],
      },
    },
    cta: {
      title: 'Sedia untuk sahkan dan teruskan?',
      subtitle: 'Apabila anda sudah selesa dengan prosesnya, teruskan ke semakan kelayakan atau mesej kami di WhatsApp rasmi.',
      primary: 'Semak Kelayakan',
      secondary: 'WhatsApp Kami',
    },
  },
} as const;

export default async function VerifyUsPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-20">
      <WebPageJsonLd
        url={`${SEO.url}/verify-us`}
        title={t.title}
        description={t.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: language === 'ms' ? 'Sahkan Kami' : 'Verify Us', url: `${SEO.url}/verify-us` },
        ]}
      />
      <ContactPageJsonLd />
      <div className="container space-y-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            <ShieldCheck className="mr-2 h-4 w-4" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5 text-primary" />
                {t.sections.who.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{t.sections.who.intro}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.sections.who.items.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-foreground">
                <p className="font-semibold">{COMPANY.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{COMPANY.location}</p>
                <p className="mt-2 text-sm">
                  <a href={COMPANY.phoneLink} className="text-primary hover:underline">{COMPANY.phone}</a>
                  <span className="mx-2">•</span>
                  <a href={COMPANY.emailLink} className="text-primary hover:underline">{COMPANY.email}</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileBadge2 className="h-5 w-5 text-primary" />
                {t.sections.process.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.sections.process.items.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="surface-card border-amber-200/70">
            <CardHeader>
              <CardTitle className="text-xl">{t.sections.redFlags.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.sections.redFlags.items.map((item) => (
                <div key={item} className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="text-xl">{t.sections.privacy.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.sections.privacy.items.map((item) => (
                <div key={item} className="rounded-2xl border border-primary/10 bg-white/70 p-4">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold">{t.sections.team.title}</h2>
            <p className="mt-2 text-muted-foreground">{t.sections.team.intro}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="surface-card border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm font-medium text-primary">{member.role[language]}</p>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{member.credentials[language]}</p>
                  <p>{member.bio[language]}</p>
                  <p className="text-xs uppercase tracking-wide text-foreground">{member.yearsExperience}+ years experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="text-xl">{t.sections.official.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.sections.official.items.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/70 p-4 text-sm hover:border-primary/30">
                  <span>{item.label}</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </CardContent>
          </Card>
          <Card className="surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="text-xl">{t.sections.external.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {t.sections.external.items.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/70 p-4 text-sm hover:border-primary/30">
                  <span>{item.label}</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold">{t.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t.cta.subtitle}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="btn-gradient text-primary-foreground">
              <Link href="/eligibility-test">{t.cta.primary}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">{t.cta.secondary}</a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
