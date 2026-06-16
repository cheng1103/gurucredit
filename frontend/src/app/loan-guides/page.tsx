import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, CheckCircle, Compass, CreditCard, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';
import { guideTopics } from '@/lib/guide-topics';

const pageContent = {
  en: {
    badge: 'Loan Knowledge Hub',
    title: 'Loan Guides for Smarter Decisions',
    subtitle:
      'Practical Malaysia-focused playbooks covering CCRIS, CTOS, DSR, rejection recovery, self-employed income proof, debt pressure, and safer borrowing decisions.',
    guidesTitle: 'Priority Guides',
    readGuide: 'Read guide',
    featuredGuides: [
      '/loan-guides/credit-score',
      '/loan-guides/debt-consolidation',
      '/loan-guides/ccris-ctos',
      '/loan-guides/loan-rejection-recovery',
      '/loan-guides/self-employed-income-proof',
      '/loan-guides/topics/personal-loan-minimum-salary',
      '/loan-guides/topics/personal-loan-documents-checklist',
      '/loan-guides/topics/bad-credit-loan-options',
      '/loan-guides/topics/high-dsr-recovery',
    ],
    highlightsTitle: 'What this section is for',
    highlights: [
      'Answer high-intent borrower questions before a formal application is attempted.',
      'Reduce repeated rejections by improving route selection and document readiness.',
      'Connect topic guides, tools, and money pages into one crawlable cluster.',
      'Support people-first finance content with stronger editorial and review pages.',
    ],
    authorityTitle: 'Authority & Trust Pages',
    authorityLinks: [
      { title: 'Editorial Policy', description: 'How we research, review, and maintain borrower-facing finance content.', href: '/editorial-policy' },
      { title: 'Review Methodology', description: 'How we assess CCRIS, CTOS, DSR, income proof, and route fit.', href: '/review-methodology' },
      { title: 'Verify Us', description: 'Official channels, office details, privacy flow, and verification guidance.', href: '/verify-us' },
      { title: 'Service Areas', description: 'Regional guide hub for Kuala Lumpur, Selangor, Johor, Sabah, and more.', href: '/service-areas' },
    ],
    ctaTitle: 'Need a personalised next step?',
    ctaDescription:
      'Use the eligibility test first, then move into a written review if the file needs deeper work.',
    ctaPrimary: 'Start Eligibility Review',
    ctaSecondary: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Pusat Pengetahuan Pinjaman',
    title: 'Panduan Pinjaman untuk Keputusan Lebih Bijak',
    subtitle:
      'Playbook praktikal Malaysia yang meliputi CCRIS, CTOS, DSR, pemulihan selepas ditolak, bukti pendapatan bekerja sendiri, tekanan hutang, dan keputusan pinjaman yang lebih selamat.',
    guidesTitle: 'Panduan Keutamaan',
    readGuide: 'Baca panduan',
    featuredGuides: [
      '/loan-guides/credit-score',
      '/loan-guides/debt-consolidation',
      '/loan-guides/ccris-ctos',
      '/loan-guides/loan-rejection-recovery',
      '/loan-guides/self-employed-income-proof',
      '/loan-guides/topics/personal-loan-minimum-salary',
      '/loan-guides/topics/personal-loan-documents-checklist',
      '/loan-guides/topics/bad-credit-loan-options',
      '/loan-guides/topics/high-dsr-recovery',
    ],
    highlightsTitle: 'Tujuan seksyen ini',
    highlights: [
      'Menjawab soalan peminjam berniat tinggi sebelum penghantaran rasmi dibuat.',
      'Mengurangkan penolakan berulang dengan memperbaiki pemilihan laluan dan kesiapsiagaan dokumen.',
      'Menyambungkan panduan topik, tools, dan money page menjadi satu kluster yang mudah dirayapi.',
      'Menyokong kandungan kewangan people-first dengan halaman editorial dan semakan yang lebih kuat.',
    ],
    authorityTitle: 'Halaman Autoriti & Kepercayaan',
    authorityLinks: [
      { title: 'Dasar Editorial', description: 'Bagaimana kami menyelidik, menyemak, dan menyelenggara kandungan kewangan untuk peminjam.', href: '/editorial-policy' },
      { title: 'Metodologi Semakan', description: 'Bagaimana kami menilai CCRIS, CTOS, DSR, bukti pendapatan, dan kesesuaian laluan.', href: '/review-methodology' },
      { title: 'Sahkan Kami', description: 'Saluran rasmi, butiran pejabat, aliran privasi, dan panduan pengesahan.', href: '/verify-us' },
      { title: 'Kawasan Perkhidmatan', description: 'Hab panduan serantau untuk Kuala Lumpur, Selangor, Johor, Sabah, dan lain-lain.', href: '/service-areas' },
    ],
    ctaTitle: 'Perlukan langkah seterusnya yang lebih peribadi?',
    ctaDescription:
      'Gunakan ujian kelayakan dahulu, kemudian teruskan ke semakan bertulis jika fail memerlukan kerja lebih mendalam.',
    ctaPrimary: 'Mulakan Semakan Kelayakan',
    ctaSecondary: 'Chat di WhatsApp',
  },
} as const;

const guideMeta = new Map<string, { title: string; titleMs: string; description: string; descriptionMs: string }>([
  ['/loan-guides/credit-score', { title: 'Credit Score & CCRIS Guide', titleMs: 'Panduan Skor Kredit & CCRIS', description: 'Improve CCRIS / CTOS health, fix late markers, and prepare for stronger approvals.', descriptionMs: 'Tingkatkan CCRIS / CTOS, betulkan rekod lewat, dan sedia untuk kelulusan yang lebih kuat.' }],
  ['/loan-guides/debt-consolidation', { title: 'Debt Consolidation Strategy', titleMs: 'Strategi Penyatuan Hutang', description: 'Lower monthly commitments by combining cards and personal loans more deliberately.', descriptionMs: 'Kurangkan komitmen bulanan dengan menggabungkan kad dan pinjaman peribadi secara lebih teratur.' }],
  ['/loan-guides/ccris-ctos', { title: 'CCRIS & CTOS Guide', titleMs: 'Panduan CCRIS & CTOS', description: 'Understand what lenders actually read in your file before you apply again.', descriptionMs: 'Fahami apa yang lender sebenarnya baca dalam fail anda sebelum mohon semula.' }],
  ['/loan-guides/loan-rejection-recovery', { title: 'Loan Rejection Recovery', titleMs: 'Pemulihan Selepas Pinjaman Ditolak', description: 'Diagnose the real blocker and rebuild the file before the next submission.', descriptionMs: 'Kenal pasti halangan sebenar dan bina semula fail sebelum penghantaran seterusnya.' }],
  ['/loan-guides/self-employed-income-proof', { title: 'Self-Employed Income Proof', titleMs: 'Bukti Pendapatan Bekerja Sendiri', description: 'Prepare variable or business income in a way lenders can actually assess.', descriptionMs: 'Sediakan pendapatan berubah atau perniagaan dalam bentuk yang lender benar-benar boleh nilai.' }],
]);

for (const topic of guideTopics) {
  guideMeta.set(`/loan-guides/topics/${topic.slug}`, {
    title: topic.title,
    titleMs: topic.titleMs,
    description: topic.description,
    descriptionMs: topic.descriptionMs,
  });
}

export default async function LoanGuidesPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <main className="pb-20">
      <WebPageJsonLd
        url={`${SEO.url}/loan-guides`}
        title={t.title}
        description={t.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
        ]}
      />
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative py-16 lg:py-20">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                <span className="gradient-text">{t.title}</span>
              </h1>
              <p className="text-lg text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">{t.guidesTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {t.featuredGuides.map((href) => {
            const meta = guideMeta.get(href);
            if (!meta) return null;
            return (
              <Card key={href} className="surface-card border-border/60 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{language === 'ms' ? meta.titleMs : meta.title}</CardTitle>
                  </div>
                  <CardDescription>{language === 'ms' ? meta.descriptionMs : meta.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="btn-gradient text-white shadow-md">
                    <Link href={href}>{t.readGuide}<ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-primary" /><h2 className="text-2xl font-semibold">{t.highlightsTitle}</h2></div>
            <div className="grid gap-4">
              {t.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-white/70 p-4 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <TrustPanel title={trust.title} description={trust.description} items={trust.items} />
          </div>
          <div className="space-y-6">
            <Card className="surface-card border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" />{t.authorityTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {t.authorityLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-xl border border-border/60 bg-white/80 px-4 py-3 text-sm transition-colors hover:border-primary/40">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                ))}
              </CardContent>
            </Card>
            <Card className="surface-card border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Compass className="h-5 w-5 text-primary" />{t.ctaTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t.ctaDescription}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="btn-gradient text-white shadow-md"><Link href="/eligibility-test">{t.ctaPrimary}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  <Button asChild variant="outline"><a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">{t.ctaSecondary}</a></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
