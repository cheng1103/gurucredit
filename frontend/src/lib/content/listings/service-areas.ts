import { PATHS } from '@/lib/i18n/routes';

export const serviceAreasUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbServiceAreas: 'Service Areas',
    eyebrow: 'Regional Coverage',
    title: 'Service areas across Malaysia',
    lede: 'These regional pages combine local affordability context, borrower patterns, and route guidance for each major state or federal territory.',
    cta: 'Open guide',
    income: 'Median income',
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbServiceAreas: 'Kawasan Perkhidmatan',
    eyebrow: 'Liputan Serantau',
    title: 'Kawasan perkhidmatan di seluruh Malaysia',
    lede: 'Halaman serantau ini menggabungkan konteks kemampuan tempatan, corak peminjam, dan panduan laluan untuk setiap negeri atau wilayah persekutuan utama.',
    cta: 'Buka panduan',
    income: 'Pendapatan median',
  },
} as const;

export type IntroLink = { label: string; href: string };
export type Intro = { paragraphs: string[]; links: IntroLink[] };

// 150-250 word bilingual intro rendered above the region grid — explains how
// state-by-state coverage differs and links out to the pages borrowers
// naturally go to next.
export const serviceAreasIntro: { en: Intro; ms: Intro } = {
  en: {
    paragraphs: [
      'These regional pages translate loan coverage across Malaysia into the affordability context that actually differs from state to state: median household income, typical property prices, and the DSR bands lenders are comfortable with in that market. Coverage spans all 13 states and 3 federal territories, from higher urban DSR ceilings common in Kuala Lumpur and Selangor to the more conservative benchmarks typical in Sabah, Sarawak, and the East Coast states. Each page also lists the bank specialisations and local borrower patterns our consultants see most often in that region.',
      'Wherever you are based, the review process itself does not change: we still calculate your DSR, check your CCRIS or CTOS file, and match you with lenders that fit your income and existing commitments. Use these regional pages to set realistic expectations before you apply, then run the eligibility test to see where your own numbers land. If a personal loan is your main option, our personal loan guide walks through the terms most Malaysian banks offer, and the loan guides library covers credit score, CCRIS, and debt consolidation topics in more depth.',
    ],
    links: [
      { label: 'Check your eligibility', href: PATHS.eligibilityTest },
      { label: 'Personal loan guide', href: PATHS.loans.personal },
      { label: 'Browse loan guides', href: PATHS.loanGuides },
    ],
  },
  ms: {
    paragraphs: [
      'Halaman serantau ini mengubah liputan pinjaman GURU Credits di seluruh Malaysia kepada konteks kemampuan yang sebenarnya berbeza mengikut negeri: pendapatan isi rumah median, harga hartanah biasa, dan julat DSR yang selesa digunakan pemberi pinjaman di pasaran tersebut. Liputan meliputi semua 13 negeri dan 3 wilayah persekutuan, daripada had DSR bandar yang lebih tinggi lazim di Kuala Lumpur dan Selangor kepada penanda aras lebih berhati-hati yang biasa di Sabah, Sarawak, dan negeri Pantai Timur. Setiap halaman turut menyenaraikan kepakaran bank dan corak peminjam tempatan yang paling kerap dilihat perunding kami di rantau tersebut.',
      'Di mana sahaja anda berada, proses semakan itu sendiri tidak berubah: kami tetap mengira DSR anda, menyemak fail CCRIS atau CTOS anda, dan memadankan anda dengan pemberi pinjaman yang sesuai dengan pendapatan serta komitmen sedia ada. Gunakan halaman serantau ini untuk menetapkan jangkaan yang realistik sebelum memohon, kemudian jalankan ujian kelayakan untuk melihat kedudukan angka anda sendiri. Jika pinjaman peribadi adalah pilihan utama anda, panduan pinjaman peribadi kami menerangkan terma yang biasa ditawarkan kebanyakan bank Malaysia, dan pustaka panduan pinjaman kami meliputi skor kredit, CCRIS, dan topik penyatuan hutang dengan lebih mendalam.',
    ],
    links: [
      { label: 'Semak kelayakan anda', href: PATHS.eligibilityTest },
      { label: 'Panduan pinjaman peribadi', href: PATHS.loans.personal },
      { label: 'Lihat panduan pinjaman', href: PATHS.loanGuides },
    ],
  },
};
