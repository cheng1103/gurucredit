import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BriefcaseBusiness, CheckCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Self-Employed Income Proof Guide Malaysia',
  description:
    'How self-employed, freelance, and variable-income borrowers in Malaysia should prepare stronger income proof before applying for loans.',
  path: '/loan-guides/self-employed-income-proof',
  keywords:
    'self employed loan Malaysia, income proof self employed Malaysia, freelance loan documents, commission income loan Malaysia',
});

const content = {
  en: {
    badge: 'Self-Employed Borrower Guide',
    title: 'How self-employed borrowers should prove income in Malaysia',
    subtitle:
      'This guide focuses on explainability: how to present business, freelance, gig, or commission income in a way lenders can actually assess.',
    stepsTitle: 'What stronger files usually show',
    steps: [
      { title: 'Stable banked inflow', description: 'Recurring credits usually help more than one strong month with no pattern.' },
      { title: 'Matching supporting records', description: 'Invoices, contracts, tax records, or commission statements help explain the source of funds.' },
      { title: 'Clearer separation of business and personal movement', description: 'Mixed unexplained transfers make the file harder to trust.' },
      { title: 'A realistic average, not only peak months', description: 'An annualised or multi-month average is usually more credible than showing one exceptional period.' },
    ],
    checks: ['Business bank statements', 'Tax or filing support where available', 'Invoices / contracts / commission statements', 'Consistent explanation of income source'],
    cta: 'Start eligibility review',
    whatsapp: 'Chat on WhatsApp',
  },
  ms: {
    badge: 'Panduan Peminjam Bekerja Sendiri',
    title: 'Bagaimana peminjam bekerja sendiri patut buktikan pendapatan di Malaysia',
    subtitle:
      'Panduan ini memfokuskan pada kebolehterangan: bagaimana membentangkan pendapatan perniagaan, freelance, gig, atau komisen dalam bentuk yang lender benar-benar boleh nilai.',
    stepsTitle: 'Apa yang biasanya ada pada fail yang lebih kuat',
    steps: [
      { title: 'Aliran masuk bank yang stabil', description: 'Kredit berulang biasanya membantu lebih daripada satu bulan kuat tanpa corak.' },
      { title: 'Rekod sokongan yang sepadan', description: 'Invois, kontrak, rekod cukai, atau penyata komisen membantu menjelaskan sumber dana.' },
      { title: 'Pemisahan lebih jelas antara perniagaan dan peribadi', description: 'Pindahan bercampur yang tidak dijelaskan menjadikan fail lebih sukar dipercayai.' },
      { title: 'Purata yang realistik, bukan hanya bulan puncak', description: 'Purata tahunan atau berbilang bulan biasanya lebih kredibel daripada menunjukkan satu tempoh luar biasa.' },
    ],
    checks: ['Penyata bank perniagaan', 'Sokongan cukai atau filing jika ada', 'Invois / kontrak / penyata komisen', 'Penjelasan sumber pendapatan yang konsisten'],
    cta: 'Mulakan semakan kelayakan',
    whatsapp: 'Chat di WhatsApp',
  },
} as const;

export default async function SelfEmployedIncomeProofPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <main className="pb-20">
      <HowToJsonLd name={t.stepsTitle} description={t.subtitle} steps={t.steps.map((step) => ({ name: step.title, text: step.description }))} />
      <WebPageJsonLd url={`${SEO.url}/loan-guides/self-employed-income-proof`} title={t.title} description={t.subtitle} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Loan Guides', url: `${SEO.url}/loan-guides` }, { name: t.title, url: `${SEO.url}/loan-guides/self-employed-income-proof` }]} />
      <section className="relative overflow-hidden border-b"><div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" /><div className="container relative py-16 lg:py-20 max-w-4xl"><Badge className="bg-primary/10 text-primary border-primary/20">{t.badge}</Badge><h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"><span className="gradient-text">{t.title}</span></h1><p className="mt-5 text-lg text-muted-foreground">{t.subtitle}</p></div></section>
      <section className="container py-16 max-w-5xl"><div className="flex items-center gap-3 mb-8"><BriefcaseBusiness className="h-5 w-5 text-primary" /><h2 className="text-2xl font-semibold">{t.stepsTitle}</h2></div><div className="grid gap-6 md:grid-cols-2">{t.steps.map((step) => (<Card key={step.title} className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{step.description}</p></CardContent></Card>))}</div></section>
      <section className="container pb-16 max-w-5xl"><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start"><Card className="surface-card border-border/60 shadow-sm"><CardHeader><CardTitle className="text-xl">{language === 'ms' ? 'Bukti yang biasanya membantu' : 'Proof that usually helps'}</CardTitle></CardHeader><CardContent className="space-y-3">{t.checks.map((item) => (<div key={item} className="flex gap-3 rounded-xl border border-border/60 bg-white/70 p-4"><CheckCircle className="h-5 w-5 text-primary mt-0.5" /><p className="text-sm text-muted-foreground">{item}</p></div>))}</CardContent></Card><Card className="surface-card border-primary/15 shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" />{language === 'ms' ? 'Perlukan semakan dokumen?' : 'Need a document review?'}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{language === 'ms' ? 'Kami semak sama ada fail pendapatan anda cukup stabil, cukup jelas, dan cukup boleh diterangkan untuk laluan yang anda mahu.' : 'We review whether your income file is stable enough, clear enough, and explainable enough for the route you want.'}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild className="btn-gradient text-white shadow-md"><LocaleLink href="/eligibility-test">{t.cta}<ArrowRight className="ml-2 h-4 w-4" /></LocaleLink></Button><Button asChild variant="outline"><a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />{t.whatsapp}</a></Button></div></CardContent></Card></div></section>
    </main>
  );
}
