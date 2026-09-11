import { PATHS } from '@/lib/i18n/routes';

export type ToolItem = {
  href: string;
  title: string;
  titleMs: string;
  description: string;
  descriptionMs: string;
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
