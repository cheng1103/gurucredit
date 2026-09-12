import type { Language } from '@/lib/i18n/translations';

export interface BankPartner {
  name: string;
  /** Real logo asset path, only set for banks whose file exists in /public/images/banks. */
  logo?: string;
  minRate: string;
  description: Record<Language, string>;
  products: Record<Language, string[]>;
}

export const bankPartners: BankPartner[] = [
  {
    name: 'Maybank',
    logo: '/images/banks/maybank.svg',
    minRate: '5.5%',
    description: { en: "Malaysia's largest bank", ms: 'Bank terbesar Malaysia' },
    products: { en: ['Personal Loan', 'Home Loan', 'Car Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'] },
  },
  {
    name: 'CIMB Bank',
    logo: '/images/banks/cimb.svg',
    minRate: '5.8%',
    description: { en: 'Leading ASEAN universal bank', ms: 'Bank universal ASEAN terkemuka' },
    products: { en: ['Personal Loan', 'Home Loan', 'SME Financing'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'] },
  },
  {
    name: 'Public Bank',
    logo: '/images/banks/publicbank.svg',
    minRate: '5.2%',
    description: { en: 'Premier domestic bank', ms: 'Bank domestik utama' },
    products: { en: ['Personal Loan', 'Home Loan', 'Car Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'] },
  },
  {
    name: 'RHB Bank',
    logo: '/images/banks/rhb.svg',
    minRate: '5.6%',
    description: { en: 'Your personal financial partner', ms: 'Rakan kewangan peribadi anda' },
    products: { en: ['Personal Loan', 'Home Loan', 'Business Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Perniagaan'] },
  },
  {
    name: 'Hong Leong Bank',
    logo: '/images/banks/hongleong.svg',
    minRate: '5.4%',
    description: { en: 'Digital-first banking', ms: 'Perbankan digital pertama' },
    products: { en: ['Personal Loan', 'Home Loan', 'Car Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'] },
  },
  {
    name: 'AmBank',
    logo: '/images/banks/ambank.svg',
    minRate: '5.9%',
    description: { en: 'Growing with you', ms: 'Berkembang bersama anda' },
    products: { en: ['Personal Loan', 'Home Loan', 'SME Financing'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'] },
  },
  {
    name: 'Bank Rakyat',
    minRate: '4.8%',
    description: { en: 'Cooperative bank for all', ms: 'Bank koperasi untuk semua' },
    products: { en: ['Personal Loan', 'Islamic Financing'], ms: ['Pinjaman Peribadi', 'Pembiayaan Islam'] },
  },
  {
    name: 'BSN',
    minRate: '5.0%',
    description: { en: 'National savings bank', ms: 'Bank simpanan nasional' },
    products: { en: ['Personal Loan', 'Home Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah'] },
  },
  {
    name: 'Alliance Bank',
    logo: '/images/banks/alliance.png',
    minRate: '5.7%',
    description: { en: 'Smart banking solutions', ms: 'Penyelesaian perbankan pintar' },
    products: { en: ['Personal Loan', 'Home Loan', 'Car Loan'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'] },
  },
  {
    name: 'Affin Bank',
    minRate: '5.8%',
    description: { en: 'Your trusted partner', ms: 'Rakan dipercayai anda' },
    products: { en: ['Personal Loan', 'Home Loan', 'SME Financing'], ms: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'] },
  },
  {
    name: 'Bank Islam',
    logo: '/images/banks/bankislam.jpg',
    minRate: '5.3%',
    description: { en: 'Islamic banking leader', ms: 'Peneraju perbankan Islam' },
    products: { en: ['Islamic Personal Financing', 'Home Financing'], ms: ['Pembiayaan Peribadi Islam', 'Pembiayaan Rumah'] },
  },
  {
    name: 'MBSB Bank',
    minRate: '5.5%',
    description: { en: 'Value-based banking', ms: 'Perbankan berasaskan nilai' },
    products: { en: ['Personal Financing', 'Home Financing'], ms: ['Pembiayaan Peribadi', 'Pembiayaan Rumah'] },
  },
];

export interface PartnersPageContent {
  eyebrow: string;
  title: string;
  lede: string;
  breadcrumbLabel: string;
  stats: { value: string; label: string }[];
  bankGrid: { title: string; fromRate: string; productsLabel: string };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  cta: { title: string; description: string; primary: string };
}

export const partnersContent: Record<Language, PartnersPageContent> = {
  en: {
    eyebrow: 'Our Partners',
    title: 'Bank Partners',
    lede: "We work with Malaysia's leading banks to get you the best loan rates and highest approval chances.",
    breadcrumbLabel: 'Partners',
    stats: [
      { value: '15+', label: 'Bank Partners' },
      { value: '85%', label: 'Approval Rate' },
      { value: '24h', label: 'Processing Time' },
      { value: '4.88%', label: 'From Rate' },
    ],
    bankGrid: { title: 'Banks We Work With', fromRate: 'From', productsLabel: 'Products' },
    howItWorks: {
      title: 'How We Work With Banks',
      steps: [
        { title: 'Analyze Your Profile', description: 'We review your income, credit, and requirements.' },
        { title: 'Match With Banks', description: 'We identify banks most likely to approve you.' },
        { title: 'Submit & Get Approved', description: 'We handle the paperwork so you can receive offers and choose the best one.' },
      ],
    },
    cta: {
      title: 'Get Matched With The Right Bank',
      description: 'Let us find the best bank for your loan needs. Free consultation.',
      primary: 'Start Your Application',
    },
  },
  ms: {
    eyebrow: 'Rakan Kami',
    title: 'Rakan Bank',
    lede: 'Kami bekerjasama dengan bank-bank terkemuka Malaysia untuk mendapatkan kadar terbaik dan peluang kelulusan tertinggi.',
    breadcrumbLabel: 'Rakan Bank',
    stats: [
      { value: '15+', label: 'Rakan Bank' },
      { value: '85%', label: 'Kadar Kelulusan' },
      { value: '24j', label: 'Masa Pemprosesan' },
      { value: '4.88%', label: 'Dari Kadar' },
    ],
    bankGrid: { title: 'Bank Yang Kami Bekerjasama', fromRate: 'Dari', productsLabel: 'Produk' },
    howItWorks: {
      title: 'Bagaimana Kami Bekerjasama Dengan Bank',
      steps: [
        { title: 'Analisis Profil Anda', description: 'Kami semak pendapatan, kredit, dan keperluan anda.' },
        { title: 'Padankan Dengan Bank', description: 'Kami kenal pasti bank yang mungkin meluluskan anda.' },
        { title: 'Hantar & Dapatkan Kelulusan', description: 'Kami uruskan kertas kerja supaya anda boleh terima tawaran dan pilih yang terbaik.' },
      ],
    },
    cta: {
      title: 'Dipadankan Dengan Bank Yang Betul',
      description: 'Biarkan kami cari bank terbaik untuk keperluan pinjaman anda. Konsultasi percuma.',
      primary: 'Mulakan Permohonan Anda',
    },
  },
};
