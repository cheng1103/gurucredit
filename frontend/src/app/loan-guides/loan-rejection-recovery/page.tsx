import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, MessageCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Loan Rejection Recovery Guide Malaysia',
  description:
    'A practical recovery plan for Malaysians rejected for loans. Learn how to identify the blocker and rebuild a stronger application path.',
  path: '/loan-guides/loan-rejection-recovery',
  keywords: 'loan rejection Malaysia, why loan rejected Malaysia, recover after rejected loan, fix loan file Malaysia',
});

const content = {
  en: {
    badge: 'Rejection Recovery Guide',
    title: 'What to fix after a loan rejection in Malaysia',
    subtitle:
      'This guide helps borrowers identify the likely blocker, stop repeated mistakes, and rebuild the file before the next submission.',
    stepsTitle: 'Recovery sequence',
    steps: [
      { title: 'Find the real reason first', description: 'Do not treat every rejection as the same problem. DSR, file quality, and weak documents require different fixes.' },
      { title: 'Pause unnecessary new applications', description: 'Repeated submissions without changes usually create more file pressure, not better odds.' },
      { title: 'Repair the specific blocker', description: 'That may mean lowering commitments, improving documents, or allowing more clean repayment cycles.' },
      { title: 'Re-enter through a better route', description: 'The next attempt should fit the profile you have now, not the one you hoped to present.' },
    ],
    actions: ['Review CCRIS and CTOS again', 'Recalculate DSR honestly', 'Tighten income proof and statements', 'Lower the amount if affordability is the real problem'],
    cta: 'Start eligibility review',
    whatsapp: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Pulih Selepas Ditolak',
    title: 'Apa yang perlu dibaiki selepas pinjaman ditolak di Malaysia',
    subtitle:
      'Panduan ini membantu peminjam mengenal pasti halangan yang berkemungkinan, menghentikan kesilapan berulang, dan membina semula fail sebelum penghantaran seterusnya.',
    stepsTitle: 'Urutan pemulihan',
    steps: [
      { title: 'Cari sebab sebenar dahulu', description: 'Jangan anggap setiap penolakan ialah masalah yang sama. DSR, kualiti fail, dan dokumen lemah memerlukan pembaikan yang berbeza.' },
      { title: 'Jeda permohonan baharu yang tidak perlu', description: 'Permohonan berulang tanpa perubahan biasanya mewujudkan lebih banyak tekanan fail, bukan peluang yang lebih baik.' },
      { title: 'Baiki halangan yang spesifik', description: 'Itu mungkin bermaksud merendahkan komitmen, memperbaiki dokumen, atau memberi lebih banyak kitaran bayaran bersih.' },
      { title: 'Masuk semula melalui laluan yang lebih baik', description: 'Percubaan seterusnya patut sesuai dengan profil yang anda ada sekarang, bukan profil yang anda harap untuk tunjuk.' },
    ],
    actions: ['Semak semula CCRIS dan CTOS', 'Kira semula DSR dengan jujur', 'Kemaskan bukti pendapatan dan penyata', 'Rendahkan jumlah jika kemampuan ialah masalah sebenar'],
    cta: 'Mulakan semakan kelayakan',
    whatsapp: 'Chat di WhatsApp',
  },
} as const;

export default async function LoanRejectionRecoveryPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="pb-20">
      <HowToJsonLd name={t.stepsTitle} description={t.subtitle} steps={t.steps.map((step) => ({ name: step.title, text: step.description }))} />
      <WebPageJsonLd url={`${SEO.url}/loan-guides/loan-rejection-recovery`} title={t.title} description={t.subtitle} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Loan Guides', url: `${SEO.url}/loan-guides` }, { name: t.title, url: `${SEO.url}/loan-guides/loan-rejection-recovery` }]} />
      <section className="relative overflow-hidden border-b"><div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" /><div className="container relative py-16 lg:py-20 max-w-4xl"><Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge><h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1><p className="mt-5 text-lg text-muted-foreground">{t.subtitle}</p></div></section>
      <section className="container py-16 max-w-5xl"><div className="flex items-center gap-3 mb-8"><RotateCcw className="h-5 w-5 text-primary" /><h2 className="text-2xl font-semibold">{t.stepsTitle}</h2></div><div className="grid gap-6 md:grid-cols-2">{t.steps.map((step) => (<Card key={step.title} className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{step.description}</p></CardContent></Card>))}</div></section>
      <section className="container pb-16 max-w-5xl"><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start"><Card className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-xl">{language === 'ms' ? 'Langkah yang biasanya membantu' : 'Actions that usually help'}</CardTitle></CardHeader><CardContent className="space-y-3">{t.actions.map((item) => (<div key={item} className="flex gap-3 rounded-xl border border-border/60 bg-white/70 p-4"><CheckCircle className="h-5 w-5 text-primary mt-0.5" /><p className="text-sm text-muted-foreground">{item}</p></div>))}</CardContent></Card><Card className="surface-card border-primary/15 shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" />{language === 'ms' ? 'Perlukan diagnosis fail?' : 'Need a file diagnosis?'}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{language === 'ms' ? 'Kami semak sama ada isu utama ialah DSR, bukti pendapatan, fail kredit, atau pemilihan laluan yang salah.' : 'We review whether the main issue is DSR, income proof, credit-file quality, or route mismatch.'}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild className="btn-gradient text-white shadow-md"><LocaleLink href="/eligibility-test">{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></LocaleLink></Button><Button asChild variant="outline"><a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />{t.whatsapp}</a></Button></div></CardContent></Card></div></section>
    </main>
  );
}
