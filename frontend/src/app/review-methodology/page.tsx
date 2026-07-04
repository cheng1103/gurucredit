import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ClipboardList, FileSearch, Gauge, Landmark, ShieldCheck } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Review Methodology for Borrower Assessments',
  description: 'How GURU Credits reviews borrower files: CCRIS, CTOS, income proof, DSR, commitments, and product fit before recommending the next step.',
  path: '/review-methodology',
  keywords: 'loan review methodology Malaysia, borrower file review, DSR review method, CCRIS CTOS assessment process',
});

const content = {
  en: {
    badge: 'Review Methodology',
    title: 'How we review borrower files before recommending the next step',
    subtitle: 'This is the practical framework we use when looking at borrower readiness, affordability, and route fit.',
    stepsTitle: 'Core review sequence',
    steps: [
      { title: 'Profile and objective', description: 'We clarify the loan purpose, amount range, urgency, and whether the borrower needs a bank route, debt solution, or a smaller interim step.' },
      { title: 'Income quality', description: 'We look at salary, business receipts, commission patterns, bankability, and whether income proof is stable enough for the intended route.' },
      { title: 'Commitments and DSR', description: 'We review existing instalments, card minimums, and recurring obligations to estimate repayment fit rather than only headline affordability.' },
      { title: 'CCRIS and CTOS signals', description: 'We read repayment patterns, legal records, and whether issues are active, old, isolated, or repeated.' },
      { title: 'Document readiness and route selection', description: 'We identify the missing pieces, likely friction points, and which next step is more realistic before a formal submission is attempted.' },
    ],
    notes: [
      { icon: FileSearch, title: 'File review', text: 'The same income can produce different outcomes depending on payment history, inquiry pattern, and documentation quality.' },
      { icon: Gauge, title: 'Affordability first', text: 'Borrowing capacity is judged against commitments, not income in isolation.' },
      { icon: Landmark, title: 'Route fit', text: 'A borrower may need cleanup, debt restructuring, or a smaller request instead of another direct application.' },
      { icon: ShieldCheck, title: 'Process discipline', text: 'We avoid blanket promises and explain where uncertainty still exists.' },
    ],
    cta: 'See service areas',
  },
  ms: {
    badge: 'Metodologi Semakan',
    title: 'Bagaimana kami menyemak fail peminjam sebelum mencadangkan langkah seterusnya',
    subtitle: 'Inilah kerangka praktikal yang kami gunakan apabila menilai kesiapsiagaan peminjam, kemampuan ansuran, dan kesesuaian laluan.',
    stepsTitle: 'Urutan semakan teras',
    steps: [
      { title: 'Profil dan objektif', description: 'Kami jelaskan tujuan pinjaman, julat jumlah, tahap kecemasan, dan sama ada peminjam memerlukan laluan bank, penyelesaian hutang, atau langkah interim yang lebih kecil.' },
      { title: 'Kualiti pendapatan', description: 'Kami melihat gaji, penerimaan perniagaan, corak komisen, kebolehterimaan bank, dan sama ada bukti pendapatan cukup stabil untuk laluan yang dimaksudkan.' },
      { title: 'Komitmen dan DSR', description: 'Kami semak ansuran sedia ada, minimum kad, dan obligasi berulang untuk menganggar kesesuaian bayaran balik, bukan kemampuan di atas kertas semata-mata.' },
      { title: 'Isyarat CCRIS dan CTOS', description: 'Kami membaca corak bayaran, rekod legal, dan sama ada isu itu aktif, lama, terpencil, atau berulang.' },
      { title: 'Kesiapsiagaan dokumen dan pemilihan laluan', description: 'Kami kenal pasti jurang dokumen, titik geseran yang dijangka, dan langkah seterusnya yang lebih realistik sebelum percubaan penghantaran rasmi dibuat.' },
    ],
    notes: [
      { icon: FileSearch, title: 'Semakan fail', text: 'Pendapatan yang sama boleh memberi hasil berbeza bergantung pada sejarah bayaran, corak inquiry, dan kualiti dokumen.' },
      { icon: Gauge, title: 'Kemampuan dahulu', text: 'Kapasiti meminjam dinilai berbanding komitmen, bukan pendapatan secara terasing.' },
      { icon: Landmark, title: 'Kesesuaian laluan', text: 'Seorang peminjam mungkin perlukan pembersihan fail, penyusunan hutang, atau jumlah lebih kecil, bukan satu lagi permohonan terus.' },
      { icon: ShieldCheck, title: 'Disiplin proses', text: 'Kami mengelakkan janji pukal dan menerangkan di mana ketidakpastian masih wujud.' },
    ],
    cta: 'Lihat kawasan perkhidmatan',
  },
} as const;

export default async function ReviewMethodologyPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="pb-20">
      <HowToJsonLd name={t.stepsTitle} description={t.subtitle} steps={t.steps.map((step) => ({ name: step.title, text: step.description }))} />
      <WebPageJsonLd
        url={`${SEO.url}/review-methodology`}
        title={t.title}
        description={t.subtitle}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: language === 'ms' ? 'Metodologi Semakan' : 'Review Methodology', url: `${SEO.url}/review-methodology` }]}
      />
      <section className="relative overflow-hidden border-b"><div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" /><div className="container relative py-16 lg:py-20 max-w-5xl"><Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge><h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1><p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p></div></section>
      <section className="container py-16 max-w-5xl"><div className="flex items-center gap-3 mb-8"><ClipboardList className="h-5 w-5 text-primary" /><h2 className="text-2xl font-semibold">{t.stepsTitle}</h2></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{t.steps.map((step) => (<Card key={step.title} className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{step.description}</p></CardContent></Card>))}</div></section>
      <section className="container pb-16 max-w-5xl"><div className="grid gap-6 md:grid-cols-2">{t.notes.map((note) => { const Icon = note.icon; return <Card key={note.title} className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Icon className="h-5 w-5 text-primary" />{note.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{note.text}</p></CardContent></Card>; })}</div><div className="mt-10"><Button asChild className="btn-gradient text-white shadow-md"><LocaleLink href="/service-areas">{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></LocaleLink></Button></div></section>
    </main>
  );
}
