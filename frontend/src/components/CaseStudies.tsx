import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Quote,
  MapPin,
  Clock,
  Building2,
  ListChecks,
} from 'lucide-react';

const customerPhotos = [
  '/images/customers/indian-male-34.jpg',
  '/images/customers/chinese-male-41.jpg',
  '/images/customers/malay-male-29.jpg',
];

type CaseFact = { label: string; value: string };
type Case = {
  name: string;
  age: number;
  location: string;
  profile: string;
  challenge: string;
  facts: CaseFact[];
  actions: string[];
  outcome: {
    amount: string;
    bank: string;
    timeline: string;
    note: string;
  };
  quote: string;
};

type CopyBlock = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  labels: {
    income: string;
    ccris: string;
    rejected: string;
    approved: string;
    bank: string;
    days: string;
    challengeLabel: string;
    actionLabel: string;
  };
  cases: Case[];
  cta: string;
  disclaimer: string;
};

const content: Record<Language, CopyBlock> = {
  en: {
    badge: 'Real borrower case summaries',
    title: 'Anonymised cases from',
    titleHighlight: 'the past 12 months',
    subtitle:
      'Names changed, numbers kept. Each case below shows the borrower profile, the blocker we identified, and the action taken before submission.',
    labels: {
      income: 'Monthly income',
      ccris: 'CCRIS status',
      rejected: 'Previously rejected',
      approved: 'Approved amount',
      bank: 'Lender',
      days: 'Timeline',
      challengeLabel: 'The problem',
      actionLabel: 'What we changed',
    },
    cases: [
      {
        name: 'Encik Rajesh K.',
        age: 34,
        location: 'Shah Alam, Selangor',
        profile: 'IT manager, 6 years with same employer',
        challenge:
          'Had two 30-day late markers on a credit card from 2023. Rejected by Maybank and CIMB for a home loan in the same month.',
        facts: [
          { label: 'Monthly income', value: 'RM 9,200' },
          { label: 'CCRIS status', value: '2× late markers, cleared 14 months ago' },
          { label: 'Previously rejected', value: 'Maybank, CIMB' },
        ],
        actions: [
          'Reviewed the late-payment pattern against lender scoring differences.',
          'Prepared a cleaner submission pack with payslips, bank statements, and an explanation note.',
          'Matched the case to a lender with a more workable appetite for older cleared markers.',
        ],
        outcome: {
          amount: 'RM 420,000',
          bank: 'Hong Leong Bank',
          timeline: '11 business days',
          note: 'Home loan, 35-year tenure, BR + 0.95%',
        },
        quote:
          'I thought I had to wait another year for those late markers to age off. GURU showed me that Hong Leong scores late markers differently from MBB — I got approved the same month.',
      },
      {
        name: 'Encik Tan W.M.',
        age: 41,
        location: 'George Town, Penang',
        profile: 'Sole proprietor, 4-year F&B business',
        challenge:
          'Needed working capital for new outlet. All three banks she walked into asked for 2 years of audited accounts she did not have yet.',
        facts: [
          { label: 'Monthly income', value: 'RM 14,500 (declared)' },
          { label: 'CCRIS status', value: 'Clean, 4 active facilities' },
          { label: 'Previously rejected', value: 'Walk-in: 3 banks' },
        ],
        actions: [
          'Reworked the file around bank statements, tax records, and consistent cash flow evidence.',
          'Removed banks that were too audit-heavy for this stage of the business.',
          'Prepared a tighter checklist before submission to avoid repeated walk-ins and mixed messaging.',
        ],
        outcome: {
          amount: 'RM 180,000',
          bank: 'SME Bank',
          timeline: '9 business days',
          note: 'Business term loan, 5-year tenure, 5.2% p.a.',
        },
        quote:
          'Branch staff kept saying I need 2 years audited. GURU pointed me to SME Bank and an alternative doc list — bank statements + tax returns were enough.',
      },
      {
        name: 'Encik Faiz H.',
        age: 29,
        location: 'Kuantan, Pahang',
        profile: 'Staff nurse, contract-to-permanent in month 11',
        challenge:
          'Stuck with 4 personal loans and 2 credit cards taking RM 2,800/month. DSR above 70%, no one would refinance.',
        facts: [
          { label: 'Monthly income', value: 'RM 4,800' },
          { label: 'CCRIS status', value: 'Clean, but DSR 72%' },
          { label: 'Previously rejected', value: 'AKPK intake rejected' },
        ],
        actions: [
          'Recalculated DSR facility by facility instead of relying on rough estimates.',
          'Shifted the case from a generic refinance angle to a debt-consolidation route.',
          'Timed the submission around the contract-to-permanent transition and supporting documents.',
        ],
        outcome: {
          amount: 'RM 95,000',
          bank: 'Bank Rakyat',
          timeline: '14 business days',
          note: 'Debt consolidation at 6.5% p.a., saves RM 620/month',
        },
        quote:
          'Every broker told me to go AKPK first. GURU found a Bank Rakyat consolidation product that fit my contract conversion — saved RM 620 every month.',
      },
    ],
    cta: 'Start eligibility review',
    disclaimer:
      'Cases are real but names and minor details have been changed to protect client privacy. Results depend on your individual profile — past outcomes do not guarantee future approvals.',
  },
  ms: {
    badge: 'Ringkasan kes peminjam sebenar',
    title: 'Kes sebenar dari',
    titleHighlight: '12 bulan lepas',
    subtitle:
      'Nama disamar, nombor kekal. Setiap kes di bawah menunjukkan profil peminjam, halangan yang dikenal pasti, dan tindakan yang dibuat sebelum penghantaran.',
    labels: {
      income: 'Pendapatan bulanan',
      ccris: 'Status CCRIS',
      rejected: 'Pernah ditolak',
      approved: 'Jumlah diluluskan',
      bank: 'Pemberi pinjaman',
      days: 'Tempoh masa',
      challengeLabel: 'Masalah',
      actionLabel: 'Apa yang kami ubah',
    },
    cases: [
      {
        name: 'Encik Rajesh K.',
        age: 34,
        location: 'Shah Alam, Selangor',
        profile: 'Pengurus IT, 6 tahun dengan majikan sama',
        challenge:
          '2 rekod lewat 30 hari pada kad kredit dari 2023. Ditolak oleh Maybank dan CIMB untuk pinjaman rumah dalam bulan sama.',
        facts: [
          { label: 'Pendapatan bulanan', value: 'RM 9,200' },
          { label: 'Status CCRIS', value: '2× lewat, telah clear 14 bulan lalu' },
          { label: 'Pernah ditolak', value: 'Maybank, CIMB' },
        ],
        actions: [
          'Semak corak bayaran lewat itu berdasarkan perbezaan cara lender menilai rekod lama.',
          'Sediakan fail yang lebih bersih dengan payslip, penyata bank, dan nota penjelasan.',
          'Padankan kes ini kepada lender yang lebih sesuai untuk rekod lama yang sudah diselesaikan.',
        ],
        outcome: {
          amount: 'RM 420,000',
          bank: 'Hong Leong Bank',
          timeline: '11 hari bekerja',
          note: 'Pinjaman rumah, tempoh 35 tahun, BR + 0.95%',
        },
        quote:
          'Saya ingat kena tunggu setahun lagi untuk rekod lewat hilang. GURU tunjuk yang Hong Leong nilai rekod lewat lain daripada MBB — diluluskan dalam bulan yang sama.',
      },
      {
        name: 'Encik Tan W.M.',
        age: 41,
        location: 'George Town, Pulau Pinang',
        profile: 'Tuan punya tunggal, perniagaan F&B 4 tahun',
        challenge:
          'Perlu modal pusingan untuk cawangan baru. 3 bank walk-in semua minta akaun audit 2 tahun yang belum ada.',
        facts: [
          { label: 'Pendapatan bulanan', value: 'RM 14,500 (diisytihar)' },
          { label: 'Status CCRIS', value: 'Bersih, 4 kemudahan aktif' },
          { label: 'Pernah ditolak', value: 'Walk-in: 3 bank' },
        ],
        actions: [
          'Susun semula fail menggunakan penyata bank, rekod cukai, dan bukti aliran tunai yang konsisten.',
          'Keluarkan bank yang terlalu bergantung pada audit untuk tahap perniagaan ini.',
          'Sediakan senarai semak yang lebih ketat sebelum penghantaran supaya tidak perlu ulang walk-in.',
        ],
        outcome: {
          amount: 'RM 180,000',
          bank: 'SME Bank',
          timeline: '9 hari bekerja',
          note: 'Pinjaman perniagaan, tempoh 5 tahun, 5.2% setahun',
        },
        quote:
          'Staf cawangan kata perlu 2 tahun audit. GURU tunjuk ke SME Bank dan senarai dokumen alternatif — penyata bank + cukai dah cukup.',
      },
      {
        name: 'Encik Faiz H.',
        age: 29,
        location: 'Kuantan, Pahang',
        profile: 'Jururawat, kontrak ke tetap pada bulan ke-11',
        challenge:
          'Terikat dengan 4 pinjaman peribadi + 2 kad kredit, RM 2,800/bulan. DSR > 70%, tiada bank mahu refinance.',
        facts: [
          { label: 'Pendapatan bulanan', value: 'RM 4,800' },
          { label: 'Status CCRIS', value: 'Bersih, tetapi DSR 72%' },
          { label: 'Pernah ditolak', value: 'AKPK ditolak' },
        ],
        actions: [
          'Kira semula DSR mengikut setiap kemudahan, bukan hanya anggaran kasar.',
          'Tukar pendekatan daripada refinance umum kepada laluan penyatuan hutang yang lebih sesuai.',
          'Susun masa penghantaran ikut penukaran kontrak ke tetap dan dokumen sokongan.',
        ],
        outcome: {
          amount: 'RM 95,000',
          bank: 'Bank Rakyat',
          timeline: '14 hari bekerja',
          note: 'Penyatuan hutang pada 6.5% setahun, jimat RM 620/bulan',
        },
        quote:
          'Semua broker suruh saya ke AKPK. GURU jumpa produk penyatuan Bank Rakyat yang padan dengan penukaran kontrak — jimat RM 620 sebulan.',
      },
    ],
    cta: 'Mulakan semakan kelayakan',
    disclaimer:
      'Kes adalah sebenar tetapi nama dan butiran kecil diubah untuk melindungi privasi klien. Keputusan bergantung pada profil individu — hasil lepas tidak menjamin kelulusan masa depan.',
  },
};

export function CaseStudies({ language }: { language: Language }) {
  const t = content[language] ?? content.en;

  return (
    <section data-nosnippet className="relative py-24 lg:py-32 section-accent-top overflow-hidden">
      <div className="container max-w-6xl relative">
        <div className="max-w-2xl mb-14 lg:mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-semibold tracking-wide">
            <TrendingUp className="h-3 w-3 mr-1.5" />
            {t.badge}
          </Badge>
          <h2 className="font-display text-3xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-foreground">
            {t.title}{' '}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {t.cases.map((caseStudy, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(15,23,42,0.18)] hover:shadow-[0_24px_60px_-12px_rgba(59,130,246,0.28)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60"
              />
              <CardContent className="p-0 h-full flex flex-col">
                <div className="p-6 border-b border-border/60">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0 border border-border/70">
                      <Image
                        src={customerPhotos[index]}
                        alt={caseStudy.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base text-foreground">
                        {caseStudy.name}, {caseStudy.age}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        {caseStudy.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {caseStudy.profile}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-destructive/5 border-b border-border/60">
                  <p className="eyebrow text-destructive mb-2">{t.labels.challengeLabel}</p>
                  <p className="text-sm text-foreground leading-relaxed">{caseStudy.challenge}</p>
                </div>

                <div className="p-6 space-y-2.5 border-b border-border/60">
                  {caseStudy.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <span className="text-muted-foreground">{fact.label}</span>
                      <span className="font-medium text-foreground text-right tabular-nums">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-primary/5 border-b border-border/60">
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="eyebrow text-primary">{t.labels.actionLabel}</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-foreground">
                    {caseStudy.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/20 border-b border-border/60">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span className="eyebrow text-emerald-700 dark:text-emerald-300">
                      {t.labels.approved}
                    </span>
                  </div>
                  <p className="font-display text-3xl font-semibold text-foreground tabular-nums tracking-tight">
                    {caseStudy.outcome.amount}
                  </p>
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>
                        {t.labels.bank}:{' '}
                        <span className="font-medium text-foreground">
                          {caseStudy.outcome.bank}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>
                        {t.labels.days}:{' '}
                        <span className="font-medium text-foreground">
                          {caseStudy.outcome.timeline}
                        </span>
                      </span>
                    </div>
                    <p className="pt-1 text-muted-foreground leading-relaxed">
                      {caseStudy.outcome.note}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <Quote className="h-5 w-5 text-primary/40 mb-2" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{caseStudy.quote}&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <p className="text-xs text-muted-foreground max-w-2xl italic leading-relaxed">
            {t.disclaimer}
          </p>
          <Button asChild variant="outline" className="h-11 px-6 rounded-full whitespace-nowrap">
            <Link href={localeHref(language, PATHS.eligibilityTest)}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
