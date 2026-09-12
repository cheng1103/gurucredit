import { PATHS } from '@/lib/i18n/routes';

export type ToolItem = {
  href: string;
  title: string;
  titleMs: string;
  description: string;
  descriptionMs: string;
};

export type IntroLink = { label: string; href: string };
export type Intro = { paragraphs: string[]; links: IntroLink[] };

// 150-250 word bilingual intro rendered above the tool grid — explains what
// each tool does and links out to the pages borrowers naturally go to next.
export const toolsIntro: { en: Intro; ms: Intro } = {
  en: {
    paragraphs: [
      "GURU Credits' loan tools give Malaysian borrowers a fast, no-obligation way to understand where they stand before submitting any application. The Loan Comparison Tool lines up indicative rates, tenures, and estimated monthly instalments from major Malaysian banks side by side, so you can see how a personal loan actually compares once fees and effective rates are factored in, not just the headline interest rate. The Eligibility Test walks through your income, existing commitments, and credit profile to estimate your Debt Service Ratio and flag the loan amount and tenure combinations that are realistic for your situation, before a bank ever reviews your file.",
      'Both tools are built around the same questions borrowers ask every day: what can I actually qualify for, and how much will it really cost each month? Use the comparison tool first to shortlist a rate range, then run the eligibility test to confirm your income and DSR support that shortlist. If you are specifically comparing unsecured borrowing, our personal loan guide explains the terms banks typically offer, and our loan guides library covers CCRIS, CTOS, and debt consolidation strategy in more depth.',
    ],
    links: [
      { label: 'Check your eligibility', href: PATHS.eligibilityTest },
      { label: 'Personal loan guide', href: PATHS.loans.personal },
      { label: 'Browse loan guides', href: PATHS.loanGuides },
    ],
  },
  ms: {
    paragraphs: [
      'Alat pinjaman GURU Credits memberi peminjam Malaysia cara pantas dan tanpa sebarang komitmen untuk memahami kedudukan kewangan anda sebelum menghantar sebarang permohonan. Alat Perbandingan Pinjaman menyusun kadar indikatif, tempoh, dan anggaran ansuran bulanan daripada bank-bank utama Malaysia secara berdampingan, supaya anda dapat melihat bagaimana pinjaman peribadi sebenarnya dibandingkan selepas yuran dan kadar efektif diambil kira, bukan sekadar kadar faedah yang diiklankan. Ujian Kelayakan pula menyemak pendapatan, komitmen sedia ada, dan profil kredit anda untuk menganggarkan Nisbah Khidmat Hutang (DSR) anda serta menunjukkan gabungan jumlah dan tempoh pinjaman yang realistik untuk situasi anda, sebelum mana-mana bank menyemak fail anda.',
      'Kedua-dua alat ini dibina berdasarkan soalan yang sama yang sering ditanya peminjam: berapakah jumlah yang sebenarnya saya layak pinjam, dan berapa kos sebenar setiap bulan? Gunakan alat perbandingan dahulu untuk menyenaraikan julat kadar, kemudian jalankan ujian kelayakan untuk mengesahkan pendapatan dan DSR anda menyokong senarai tersebut. Jika anda sedang membandingkan pinjaman tanpa cagaran, panduan pinjaman peribadi kami menerangkan terma biasa ditawarkan bank, dan pustaka panduan pinjaman kami meliputi CCRIS, CTOS, dan strategi penyatuan hutang dengan lebih mendalam.',
    ],
    links: [
      { label: 'Semak kelayakan anda', href: PATHS.eligibilityTest },
      { label: 'Panduan pinjaman peribadi', href: PATHS.loans.personal },
      { label: 'Lihat panduan pinjaman', href: PATHS.loanGuides },
    ],
  },
};

export const toolsUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbTools: 'Tools',
    eyebrow: 'Toolkit',
    title: 'Loan Tools',
    lede: 'Fast calculators and comparison tools built for Malaysia borrowers. Estimate payments, compare bank rates, and check eligibility before you apply.',
    cta: 'Open tool',
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbTools: 'Alat',
    eyebrow: 'Toolkit',
    title: 'Alat Pinjaman',
    lede: 'Kalkulator dan alat perbandingan pantas untuk peminjam di Malaysia. Anggar bayaran, banding kadar, dan semak kelayakan sebelum memohon.',
    cta: 'Buka alat',
  },
} as const;

export const tools: ToolItem[] = [
  {
    href: PATHS.toolsCompare,
    title: 'Loan Comparison Tool',
    titleMs: 'Alat Perbandingan Pinjaman',
    description: 'Compare rates and fees across major banks.',
    descriptionMs: 'Bandingkan kadar dan yuran bank utama.',
  },
  {
    href: PATHS.eligibilityTest,
    title: 'Eligibility Test',
    titleMs: 'Ujian Kelayakan',
    description: 'Check if you are likely to qualify.',
    descriptionMs: 'Semak peluang kelayakan anda.',
  },
];
