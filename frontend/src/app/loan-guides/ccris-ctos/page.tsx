import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, FileSearch, MessageCircle, ShieldCheck } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'CCRIS and CTOS Guide Malaysia',
  description:
    'A practical Malaysia guide to CCRIS and CTOS: what lenders actually look at, how old issues differ from active ones, and what to fix before reapplying.',
  path: '/loan-guides/ccris-ctos',
  keywords:
    'CCRIS CTOS guide Malaysia, how lenders read CCRIS, CTOS report Malaysia, improve loan file Malaysia',
});

const content = {
  en: {
    badge: 'CCRIS + CTOS Guide',
    title: 'How lenders actually read your CCRIS and CTOS file',
    subtitle:
      'This guide explains what matters inside a borrower file, how lenders interpret repayment patterns, and how to prepare a stronger next move before another application.',
    stepsTitle: 'What to review first',
    steps: [
      { title: 'Read repayment patterns, not only the label', description: 'Old isolated late markers are not treated the same as active or repeated issues.' },
      { title: 'Separate legal records from affordability issues', description: 'Some files fail because of legal or collection signals; others fail because the numbers no longer fit.' },
      { title: 'Check current affordability at the same time', description: 'A cleaner file can still be declined when DSR is too high.' },
      { title: 'Use the right route after diagnosis', description: 'Some borrowers need cleanup, some need a smaller request, and some need a different product path.' },
    ],
    checks: [
      'Latest CCRIS and CTOS reports',
      'Current debt and card commitment list',
      'Income proof and recent bank statements',
      'Any settlement or release letters already available',
    ],
    cta: 'Start eligibility review',
    whatsapp: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan CCRIS + CTOS',
    title: 'Bagaimana lender sebenarnya membaca fail CCRIS dan CTOS anda',
    subtitle:
      'Panduan ini menerangkan apa yang penting dalam fail peminjam, bagaimana lender mentafsir corak bayaran, dan bagaimana menyediakan langkah seterusnya yang lebih kuat sebelum permohonan baharu.',
    stepsTitle: 'Apa yang perlu disemak dahulu',
    steps: [
      { title: 'Baca corak bayaran, bukan label semata-mata', description: 'Rekod lewat lama yang terpencil tidak dinilai sama seperti isu aktif atau berulang.' },
      { title: 'Asingkan rekod legal daripada isu kemampuan', description: 'Sesetengah fail gagal kerana isyarat legal atau collection; yang lain gagal kerana nombor tidak lagi sesuai.' },
      { title: 'Semak kemampuan semasa pada masa yang sama', description: 'Fail yang lebih bersih masih boleh ditolak apabila DSR terlalu tinggi.' },
      { title: 'Gunakan laluan yang betul selepas diagnosis', description: 'Ada peminjam perlukan pembersihan, ada perlukan jumlah lebih kecil, dan ada perlukan laluan produk berbeza.' },
    ],
    checks: [
      'Laporan CCRIS dan CTOS terkini',
      'Senarai komitmen hutang dan kad semasa',
      'Bukti pendapatan dan penyata bank terkini',
      'Sebarang surat settlement atau release yang sudah ada',
    ],
    cta: 'Mulakan semakan kelayakan',
    whatsapp: 'Chat di WhatsApp',
  },
} as const;

export default async function CcrisCtosGuidePage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="pb-20">
      <HowToJsonLd name={t.stepsTitle} description={t.subtitle} steps={t.steps.map((step) => ({ name: step.title, text: step.description }))} />
      <WebPageJsonLd url={`${SEO.url}/loan-guides/ccris-ctos`} title={t.title} description={t.subtitle} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Loan Guides', url: `${SEO.url}/loan-guides` }, { name: t.title, url: `${SEO.url}/loan-guides/ccris-ctos` }]} />
      <section className="relative overflow-hidden border-b"><div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" /><div className="container relative py-16 lg:py-20 max-w-4xl"><Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge><h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1><p className="mt-5 text-lg text-muted-foreground">{t.subtitle}</p></div></section>
      <section className="container py-16 max-w-5xl"><div className="flex items-center gap-3 mb-8"><FileSearch className="h-5 w-5 text-primary" /><h2 className="text-2xl font-semibold">{t.stepsTitle}</h2></div><div className="grid gap-6 md:grid-cols-2">{t.steps.map((step) => (<Card key={step.title} className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{step.description}</p></CardContent></Card>))}</div></section>
      <section className="container pb-16 max-w-5xl"><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start"><Card className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-xl">{language === 'ms' ? 'Semakan berguna' : 'Useful checks'}</CardTitle></CardHeader><CardContent className="space-y-3">{t.checks.map((item) => (<div key={item} className="flex gap-3 rounded-xl border border-border/60 bg-white/70 p-4"><CheckCircle className="h-5 w-5 text-primary mt-0.5" /><p className="text-sm text-muted-foreground">{item}</p></div>))}</CardContent></Card><Card className="surface-card border-primary/15 shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" />{language === 'ms' ? 'Perlukan semakan fail?' : 'Need a file review?'}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{language === 'ms' ? 'Kami semak CCRIS, CTOS, DSR, dan kesesuaian laluan secara bersama sebelum langkah seterusnya dipilih.' : 'We review CCRIS, CTOS, DSR, and route fit together before the next step is chosen.'}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild className="btn-gradient text-white shadow-md"><Link href="/eligibility-test">{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild variant="outline"><a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />{t.whatsapp}</a></Button></div></CardContent></Card></div></section>
    </main>
  );
}
