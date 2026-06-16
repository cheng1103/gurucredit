import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, CalendarClock, FileCheck2, ShieldCheck, ArrowRight } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Editorial Policy and Content Standards',
  description: 'How GURU Credits researches, reviews, updates, and publishes financial education content for Malaysian borrowers.',
  path: '/editorial-policy',
  keywords: 'editorial policy finance website, content standards Malaysia loan website, GURU Credits editorial policy',
});

const content = {
  en: {
    badge: 'Editorial Standards',
    title: 'How we publish borrower-facing financial content',
    subtitle: 'This page explains how GURU Credits researches, reviews, updates, and maintains loan and credit education content intended for Malaysian borrowers.',
    sections: [
      {
        title: '1. People-first content before search-first content',
        body: 'We publish pages to answer borrower questions clearly: eligibility, CCRIS and CTOS, debt consolidation, self-employed income proof, lender fit, and application readiness. Search traffic matters, but it does not replace practical usefulness.',
      },
      {
        title: '2. Review before publish',
        body: 'Pages touching borrowing decisions, rates, DSR, CCRIS, CTOS, debt pressure, or application preparation are reviewed against visible page claims before they are updated or launched.',
      },
      {
        title: '3. Update cadence',
        body: 'We revise pages when borrower guidance changes, internal application patterns shift, lender requirements move materially, or a page becomes stale relative to current borrower intent.',
      },
      {
        title: '4. Claim discipline',
        body: 'We avoid guarantees, fake urgency, unverifiable approval claims, or invented licensing details. Where outcomes vary, we state that clearly and explain the conditions.',
      },
      {
        title: '5. Internal linking and maintenance',
        body: 'Important guides are linked to tools, service pages, and supporting articles so users and crawlers can follow a coherent cluster rather than isolated pages.',
      },
    ],
    cards: [
      { icon: BookOpenCheck, title: 'Scope', text: 'Loans, CCRIS, CTOS, DSR, debt consolidation, documents, and borrower decision support.' },
      { icon: FileCheck2, title: 'Review standard', text: 'Visible claims, internal consistency, and borrower usefulness are checked before publication.' },
      { icon: CalendarClock, title: 'Freshness', text: 'High-intent pages are revised when guidance becomes stale or borrower search intent shifts.' },
      { icon: ShieldCheck, title: 'YMYL care', text: 'We treat financial guidance as high-stakes content and avoid unsupported promises.' },
    ],
    cta: 'Review methodology',
  },
  ms: {
    badge: 'Standard Editorial',
    title: 'Bagaimana kami menerbitkan kandungan kewangan untuk peminjam',
    subtitle: 'Halaman ini menerangkan bagaimana GURU Credits menyelidik, menyemak, mengemas kini, dan menyelenggara kandungan pendidikan pinjaman dan kredit untuk peminjam Malaysia.',
    sections: [
      {
        title: '1. Kandungan berpandukan pengguna, bukan semata-mata carian',
        body: 'Kami menerbitkan halaman untuk menjawab soalan peminjam dengan jelas: kelayakan, CCRIS dan CTOS, penyatuan hutang, bukti pendapatan bekerja sendiri, kesesuaian lender, dan kesiapsiagaan permohonan. Trafik carian penting, tetapi ia tidak menggantikan kegunaan sebenar.',
      },
      {
        title: '2. Semakan sebelum terbit',
        body: 'Halaman yang menyentuh keputusan pinjaman, kadar, DSR, CCRIS, CTOS, tekanan hutang, atau persediaan permohonan disemak berbanding dakwaan yang dipaparkan sebelum dikemas kini atau dilancarkan.',
      },
      {
        title: '3. Kekerapan kemas kini',
        body: 'Kami mengemas kini halaman apabila panduan peminjam berubah, corak permohonan dalaman bergerak, keperluan lender berubah dengan ketara, atau halaman menjadi lapuk berbanding niat carian semasa.',
      },
      {
        title: '4. Disiplin dakwaan',
        body: 'Kami mengelakkan jaminan, urgensi palsu, dakwaan kelulusan yang tidak boleh disahkan, atau butiran lesen yang direka. Apabila hasil berbeza, kami nyatakan dengan jelas serta terangkan syaratnya.',
      },
      {
        title: '5. Internal linking dan penyelenggaraan',
        body: 'Panduan penting dipautkan kepada tools, halaman perkhidmatan, dan artikel sokongan supaya pengguna dan crawler dapat mengikuti kluster yang koheren, bukan halaman terpencil.',
      },
    ],
    cards: [
      { icon: BookOpenCheck, title: 'Skop', text: 'Pinjaman, CCRIS, CTOS, DSR, penyatuan hutang, dokumen, dan sokongan keputusan peminjam.' },
      { icon: FileCheck2, title: 'Standard semakan', text: 'Dakwaan yang dipaparkan, konsistensi dalaman, dan kegunaan untuk peminjam diperiksa sebelum penerbitan.' },
      { icon: CalendarClock, title: 'Kesegaran', text: 'Halaman berniat tinggi dikemas kini apabila panduan menjadi lapuk atau niat carian berubah.' },
      { icon: ShieldCheck, title: 'Penjagaan YMYL', text: 'Kami menganggap panduan kewangan sebagai kandungan berisiko tinggi dan mengelakkan janji yang tidak disokong.' },
    ],
    cta: 'Lihat metodologi semakan',
  },
} as const;

export default async function EditorialPolicyPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="pb-20">
      <WebPageJsonLd
        url={`${SEO.url}/editorial-policy`}
        title={t.title}
        description={t.subtitle}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: language === 'ms' ? 'Editorial' : 'Editorial Policy', url: `${SEO.url}/editorial-policy` }]}
      />
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative py-16 lg:py-20 max-w-5xl">
          <Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p>
        </div>
      </section>
      <section className="container py-16 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          {t.cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="surface-card border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Icon className="h-5 w-5 text-primary" />{card.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{card.text}</p></CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <section className="container pb-16 max-w-5xl">
        <div className="space-y-4">
          {t.sections.map((section) => (
            <Card key={section.title} className="surface-card border-border/60 shadow-sm">
              <CardHeader><CardTitle className="text-xl">{section.title}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p></CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild className="btn-gradient text-white shadow-md"><Link href="/review-methodology">{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </section>
    </main>
  );
}
