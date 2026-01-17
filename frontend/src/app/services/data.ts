import { Language } from '@/lib/i18n/translations';
import { Wallet, Car, Home, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ServiceType =
  | 'PERSONAL_LOAN'
  | 'CAR_LOAN'
  | 'HOME_LOAN'
  | 'BUSINESS_LOAN';

export interface ServiceDefinition {
  id: string;
  name: string;
  tagline: string;
  rate: string;
  maxAmount: string;
  tenure: string;
  type: ServiceType;
  highlight: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicesPageContent {
  header: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    supportNote: string;
  };
  analysisBanner: {
    title: string;
    price: string;
    description: string;
  };
  loanTypes: { title: string };
  services: ServiceDefinition[];
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  loanJourney: {
    badge: string;
    title: string;
    subtitle: string;
    imageCaption: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  stats: { value: string; label: string; description: string }[];
  serviceLabels: {
    learnMore: string;
    applyNow: string;
    availability: string;
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
}

export const serviceIcons: Record<ServiceType, LucideIcon> = {
  PERSONAL_LOAN: Wallet,
  CAR_LOAN: Car,
  HOME_LOAN: Home,
  BUSINESS_LOAN: Briefcase,
};

export const serviceGradients: Record<ServiceType, string> = {
  PERSONAL_LOAN: 'from-pink-500 via-rose-500 to-orange-500',
  CAR_LOAN: 'from-blue-500 via-indigo-500 to-purple-500',
  HOME_LOAN: 'from-emerald-500 via-green-500 to-teal-500',
  BUSINESS_LOAN: 'from-amber-500 via-orange-500 to-red-500',
};

export const serviceAccentColors: Record<ServiceType, string> = {
  PERSONAL_LOAN: 'text-pink-500',
  CAR_LOAN: 'text-blue-500',
  HOME_LOAN: 'text-emerald-500',
  BUSINESS_LOAN: 'text-amber-500',
};

export const serviceImages: Record<ServiceType, string> = {
  PERSONAL_LOAN: '/images/personal-loan.jpg',
  CAR_LOAN: '/images/car-loan.jpg',
  HOME_LOAN: '/images/home-loan.jpg',
  BUSINESS_LOAN: '/images/business-loan.jpg',
};

export const loanDetailLinks: Record<ServiceType, string> = {
  PERSONAL_LOAN: '/loans/personal',
  CAR_LOAN: '/loans/car',
  HOME_LOAN: '/loans/home',
  BUSINESS_LOAN: '/loans/emergency',
};

export const highlightColors: Record<string, string> = {
  'Most Popular': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  'Paling Popular': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  'Lowest Rate': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  'Kadar Terendah': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  'Best Value': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  'Nilai Terbaik': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  'SME Friendly': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  'Mesra PKS': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
};

export const pageContent: Record<Language, ServicesPageContent> = {
  en: {
    header: {
      badge: 'Trusted by 1,000+ Malaysians',
      title: 'Choose Your',
      titleHighlight: 'Loan Type',
      subtitle:
        'Competitive rates starting from 3.5% p.a. Eligibility analysis within 24 hours.',
      primaryCta: 'Start Eligibility Analysis',
      secondaryCta: 'Take 5-min Eligibility Test',
      supportNote:
        'No payment on this website. RM30 is collected only through official WhatsApp after submission.',
    },
    analysisBanner: {
      title: 'Eligibility Analysis',
      price: 'RM30',
      description:
        'One-time fee includes CCRIS/CTOS check, DSR calculation & bank recommendations',
    },
    loanTypes: {
      title: 'Select a Loan Product',
    },
    services: [
      {
        id: '1',
        name: 'Personal Loan',
        tagline: 'Quick cash when you need it',
        rate: '4.88',
        maxAmount: '100,000',
        tenure: '1-7 years',
        type: 'PERSONAL_LOAN',
        highlight: 'Most Popular',
        features: [
          'No collateral needed',
          '24hr analysis',
          'Flexible tenure',
        ],
      },
      {
        id: '2',
        name: 'Car Loan',
        tagline: 'Drive your dream car today',
        rate: '3.50',
        maxAmount: '300,000',
        tenure: '3-9 years',
        type: 'CAR_LOAN',
        highlight: 'Lowest Rate',
        features: ['Low upfront cost', 'Insurance bundle', 'Fast analysis'],
      },
      {
        id: '3',
        name: 'Home Loan',
        tagline: 'Plan your property upgrade',
        rate: '3.98',
        maxAmount: '1,000,000',
        tenure: '10-35 years',
        type: 'HOME_LOAN',
        highlight: 'Best Value',
        features: ['Flexible tenure', 'Zero hidden fees', 'Lock-in optional'],
      },
      {
        id: '4',
        name: 'Business Loan',
        tagline: 'Scale your business with confidence',
        rate: '5.20',
        maxAmount: '500,000',
        tenure: '1-5 years',
        type: 'BUSINESS_LOAN',
        highlight: 'SME Friendly',
        features: ['Working capital', 'Asset financing', 'Expansion support'],
      },
    ],
    loanJourney: {
      badge: 'Easy Process',
      title: 'How It Works',
      subtitle: 'Three steps to get lender-ready with GURU Credits',
      imageCaption:
        'Our consultants guide you from eligibility assessment to bank submission, so you always know the next step.',
      steps: [
        {
          title: '1. Share Your Profile',
          description:
            'Tell us your goals, income, and existing commitments in 5 minutes.',
        },
        {
          title: '2. Get Expert Analysis',
          description:
            'We analyze your CCRIS/CTOS and DSR, then shortlist the right banks.',
        },
        {
          title: '3. Submission & Guidance',
          description:
            'Receive personalized guidance through submission and follow-up.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our loan services',
      items: [
        {
          question: 'What do I need to apply?',
          answer:
            'Identity card, 3 month payslips, and 3 month bank statements. That’s enough to start the analysis.',
        },
        {
          question: 'How fast is the analysis?',
          answer:
            'Most analyses are completed within 24 hours once you submit all required documents.',
        },
        {
          question: 'Is the RM30 fee refundable?',
          answer:
            'The RM30 covers your credit analysis and action plan, so it is non-refundable.',
        },
        {
          question: 'Can I apply if I had CCRIS issues before?',
          answer:
            'Yes. We specialize in helping applicants with CCRIS/CTOS issues by recommending suitable banks.',
        },
      ],
    },
    stats: [
      {
        value: '1,000+',
        label: 'Clients Guided',
        description: 'Across Malaysia',
      },
      { value: '85%', label: 'Approval Rate', description: 'With guidance' },
      { value: '24h', label: 'Turnaround', description: 'Eligibility report' },
      { value: 'RM30', label: 'Analysis Fee', description: 'Flat price' },
    ],
    serviceLabels: {
      learnMore: 'Learn More',
      applyNow: 'Apply Now',
      availability: 'Available Now',
    },
    cta: {
      title: 'Ready to start your loan journey?',
      subtitle:
        'Get a RM30 eligibility analysis with expert guidance and bank recommendations.',
      primary: 'Start Application',
      secondary: 'Chat on WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Dipercayai 1,000+ Rakyat Malaysia',
      title: 'Pilih',
      titleHighlight: 'Jenis Pinjaman',
      subtitle:
        'Kadar kompetitif dari 3.5% setahun. Analisis kelayakan dalam 24 jam.',
      primaryCta: 'Mulakan Analisis Kelayakan',
      secondaryCta: 'Ujian Kelayakan 5 Minit',
      supportNote:
        'Tiada bayaran di laman web. RM30 dikutip hanya melalui WhatsApp rasmi selepas penghantaran.',
    },
    analysisBanner: {
      title: 'Analisis Kelayakan',
      price: 'RM30',
      description:
        'Bayaran sekali termasuk semakan CCRIS/CTOS, kiraan DSR & cadangan bank',
    },
    loanTypes: {
      title: 'Pilih Produk Pinjaman',
    },
    services: [
      {
        id: '1',
        name: 'Pinjaman Peribadi',
        tagline: 'Tunai pantas bila diperlukan',
        rate: '4.88',
        maxAmount: '100,000',
        tenure: '1-7 tahun',
        type: 'PERSONAL_LOAN',
        highlight: 'Paling Popular',
        features: [
          'Tiada cagaran diperlukan',
          'Analisis 24 jam',
          'Tempoh fleksibel',
        ],
      },
      {
        id: '2',
        name: 'Pinjaman Kereta',
        tagline: 'Miliki kereta idaman anda',
        rate: '3.50',
        maxAmount: '300,000',
        tenure: '3-9 tahun',
        type: 'CAR_LOAN',
        highlight: 'Kadar Terendah',
        features: ['Kos awal rendah', 'Pakej insurans', 'Analisis pantas'],
      },
      {
        id: '3',
        name: 'Pinjaman Rumah',
        tagline: 'Rancang pembelian hartanah anda',
        rate: '3.98',
        maxAmount: '1,000,000',
        tenure: '10-35 tahun',
        type: 'HOME_LOAN',
        highlight: 'Nilai Terbaik',
        features: [
          'Tempoh fleksibel',
          'Tiada caj tersembunyi',
          'Pilihan lock-in',
        ],
      },
      {
        id: '4',
        name: 'Pinjaman Perniagaan',
        tagline: 'Kembangkan perniagaan dengan yakin',
        rate: '5.20',
        maxAmount: '500,000',
        tenure: '1-5 tahun',
        type: 'BUSINESS_LOAN',
        highlight: 'Mesra PKS',
        features: [
          'Modal pusingan',
          'Pembiayaan aset',
          'Sokongan pengembangan',
        ],
      },
    ],
    loanJourney: {
      badge: 'Proses Mudah',
      title: 'Cara Ia Berfungsi',
      subtitle:
        'Tiga langkah untuk sedia dihantar ke bank dengan GURU Credits',
      imageCaption:
        'Konsultan kami membimbing anda dari semakan kelayakan hingga penghantaran ke bank supaya anda tahu langkah seterusnya.',
      steps: [
        {
          title: '1. Kongsi Profil Anda',
          description:
            'Kongsi matlamat, pendapatan, dan komitmen sedia ada dalam 5 minit.',
        },
        {
          title: '2. Dapatkan Analisis Pakar',
          description:
            'Kami analisis CCRIS/CTOS dan DSR anda, kemudian senaraikan bank yang sesuai.',
        },
        {
          title: '3. Penghantaran & Panduan',
          description:
            'Terima panduan peribadi hingga permohonan dihantar dan diikuti.',
        },
      ],
    },
    faq: {
      title: 'Soalan Lazim',
      subtitle: 'Semua yang anda perlu tahu mengenai perkhidmatan pinjaman kami',
      items: [
        {
          question: 'Apa dokumen yang diperlukan?',
          answer:
            'Kad pengenalan, slip gaji 3 bulan, dan penyata bank 3 bulan. Cukup untuk mulakan analisis.',
        },
        {
          question: 'Berapa pantas analisis?',
          answer:
            'Kebanyakan analisis siap dalam 24 jam selepas semua dokumen diterima.',
        },
        {
          question: 'Adakah yuran RM30 boleh dikembalikan?',
          answer:
            'RM30 meliputi analisis kredit dan pelan tindakan, jadi ia tidak dikembalikan.',
        },
        {
          question: 'Boleh mohon jika ada isu CCRIS?',
          answer:
            'Ya. Kami pakar membantu pemohon dengan isu CCRIS/CTOS dengan mencadangkan bank yang sesuai.',
        },
      ],
    },
    stats: [
      {
        value: '1,000+',
        label: 'Pelanggan Dibantu',
        description: 'Seluruh Malaysia',
      },
      {
        value: '85%',
        label: 'Kadar Kejayaan',
        description: 'Dengan panduan',
      },
      { value: '24j', label: 'Analisis', description: 'Laporan kelayakan' },
      { value: 'RM30', label: 'Yuran Analisis', description: 'Harga tetap' },
    ],
    serviceLabels: {
      learnMore: 'Ketahui lanjut',
      applyNow: 'Mohon sekarang',
      availability: 'Tersedia',
    },
    cta: {
      title: 'Sedia untuk mulakan perjalanan pinjaman?',
      subtitle:
        'Dapatkan analisis kelayakan RM30 dengan panduan pakar dan cadangan bank.',
      primary: 'Mulakan Permohonan',
      secondary: 'Sembang WhatsApp',
    },
  },
};
