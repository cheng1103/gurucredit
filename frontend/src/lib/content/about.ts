import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';

export interface AboutPageContent {
  eyebrow: string;
  title: string;
  lede: string;
  breadcrumbLabel: string;
  mission: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  stats: { value: string; label: string }[];
  trust: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  coverage: {
    title: string;
    description: string;
    areas: string[];
    note: string;
  };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    timeline: { year: string; title: string; description: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
  };
  values: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; href: string }[];
  };
}

export const aboutContent: Record<Language, AboutPageContent> = {
  en: {
    eyebrow: 'About Us',
    title: 'About GURU Credits',
    lede: 'Your trusted loan consultation partner in Malaysia. We provide fast eligibility analysis and loan structuring with indicative rates starting from 4.88% per annum.',
    breadcrumbLabel: 'About',
    mission: {
      eyebrow: 'Our Mission',
      title: 'Making Loans Simple & Accessible',
      paragraphs: [
        'At GURU Credits, we believe everyone deserves access to fast, affordable financing when they need it. We understand that life can bring unexpected expenses and opportunities that require quick financial solutions.',
        'Our mission is to provide transparent, hassle-free loan guidance with indicative rates and fast analysis. No hidden fees, no complicated paperwork — just clear recommendations when you need them.',
        'Whether you need a personal loan, debt consolidation, or emergency funding, we’re here to help you achieve your financial goals.',
      ],
    },
    stats: [
      { value: '1,000+', label: 'Applications Guided' },
      { value: '4.88%', label: 'From Rate' },
      { value: '24hr', label: 'Fast Analysis' },
    ],
    trust: {
      title: 'Built for Safe, Verified Guidance',
      description: 'We prioritize transparency, privacy, and responsible lending guidance.',
      items: [
        { title: 'PDPA-aligned handling', description: 'We only collect essentials and store data securely.' },
        { title: 'No upfront payments', description: 'Eligibility fees are only collected via official WhatsApp after submission.' },
        { title: 'Transparent comparisons', description: 'We show effective costs, not just headline rates.' },
      ],
    },
    coverage: {
      title: 'Nationwide Coverage',
      description: 'We support applicants across Malaysia, including Sabah and Sarawak, with WhatsApp-first guidance and bank-ready prep.',
      areas: ['Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Sabah', 'Sarawak'],
      note: 'Coverage is nationwide and continues to expand.',
    },
    story: {
      eyebrow: 'Our Journey',
      title: 'Our Story',
      description: 'From humble beginnings to helping thousands of Malaysians achieve their financial goals.',
      timeline: [
        { year: '2019', title: 'Founded', description: 'Started with a mission to provide accessible loan guidance to all Malaysians.' },
        { year: '2020', title: 'Online Launch', description: 'Launched our online platform for faster eligibility analysis.' },
        { year: '2021', title: '500 Clients', description: 'Reached our first 500 guided applications milestone.' },
        { year: '2023', title: '1000+ Clients', description: 'Guided over 1000 applications for Malaysians nationwide.' },
        { year: '2024', title: 'Expansion', description: 'Expanded our licensed lending capacity with broader business and consolidation products.' },
      ],
    },
    team: {
      eyebrow: 'Meet the Team',
      title: 'The people behind every loan we extend',
      description: 'No bots, no outsourced call centre. Every application is personally reviewed by one of the loan officers below.',
    },
    values: {
      eyebrow: 'What We Stand For',
      title: 'Our Core Values',
      description: 'These principles guide everything we do and how we serve our clients.',
      items: [
        { title: 'Trust & Security', description: 'Your personal and financial data is handled with the highest level of confidentiality. We comply with PDPA guidelines and use SSL encryption.' },
        { title: 'Transparency', description: 'No hidden fees or surprises. All rates, terms, and charges are clearly disclosed upfront before you commit.' },
        { title: 'Fast Service', description: 'We understand urgency. Most eligibility analyses are completed within 24 hours; bank approval timelines vary.' },
        { title: 'Fair Guidance', description: 'Indicative rates starting from 4.88% with repayment insights tailored to your financial situation.' },
      ],
    },
    services: {
      eyebrow: 'Loan Products',
      title: 'What We Offer',
      items: [
        { title: 'Personal Loan', description: 'From 4.88% flat p.a. Loan amounts up to RM100,000 with flexible tenure from 1-7 years.', href: PATHS.loans.personal },
        { title: 'Debt Consolidation', description: 'Combine multiple high-interest debts into one manageable monthly payment.', href: PATHS.loans.debtConsolidation },
        { title: 'Emergency Loan', description: 'Fast eligibility analysis for urgent financial needs.', href: PATHS.loans.emergency },
      ],
    },
  },
  ms: {
    eyebrow: 'Tentang Kami',
    title: 'Tentang GURU Credits',
    lede: 'Rakan konsultasi pinjaman dipercayai anda di Malaysia. Kami menyediakan analisis kelayakan pantas dan struktur pinjaman dengan kadar indikatif bermula dari 4.88% setahun.',
    breadcrumbLabel: 'Tentang',
    mission: {
      eyebrow: 'Misi Kami',
      title: 'Menjadikan Pinjaman Mudah & Boleh Diakses',
      paragraphs: [
        'Di GURU Credits, kami percaya setiap orang berhak mendapat akses kepada pembiayaan yang pantas dan mampu milik apabila diperlukan. Kami faham bahawa kehidupan boleh membawa perbelanjaan dan peluang yang tidak dijangka yang memerlukan penyelesaian kewangan segera.',
        'Misi kami adalah menyediakan panduan pinjaman yang telus dan tanpa kerumitan dengan kadar indikatif dan analisis pantas. Tiada caj tersembunyi, tiada dokumentasi rumit - hanya cadangan yang jelas apabila anda memerlukannya.',
        'Sama ada anda memerlukan pinjaman peribadi, penyatuan hutang, atau pembiayaan kecemasan, kami sedia membantu anda mencapai matlamat kewangan anda.',
      ],
    },
    stats: [
      { value: '1,000+', label: 'Permohonan Dibimbing' },
      { value: '4.88%', label: 'Kadar Dari' },
      { value: '24j', label: 'Analisis Pantas' },
    ],
    trust: {
      title: 'Panduan yang Selamat & Disahkan',
      description: 'Kami utamakan ketelusan, privasi, dan panduan pinjaman yang bertanggungjawab.',
      items: [
        { title: 'Pengendalian patuh PDPA', description: 'Kami hanya kumpul maklumat penting dan simpan dengan selamat.' },
        { title: 'Tiada bayaran awal', description: 'Yuran kelayakan hanya dikutip melalui WhatsApp rasmi selepas dihantar.' },
        { title: 'Perbandingan telus', description: 'Kami tunjuk kos sebenar, bukan sekadar kadar iklan.' },
      ],
    },
    coverage: {
      title: 'Liputan Seluruh Malaysia',
      description: 'Kami menyokong pemohon di seluruh Malaysia termasuk Sabah dan Sarawak dengan panduan WhatsApp dan persediaan dokumen.',
      areas: ['Kuala Lumpur', 'Selangor', 'Pulau Pinang', 'Johor', 'Sabah', 'Sarawak'],
      note: 'Liputan adalah seluruh negara dan akan terus berkembang.',
    },
    story: {
      eyebrow: 'Perjalanan Kami',
      title: 'Kisah Kami',
      description: 'Dari permulaan yang sederhana hingga membantu beribu-ribu rakyat Malaysia mencapai matlamat kewangan mereka.',
      timeline: [
        { year: '2019', title: 'Ditubuhkan', description: 'Bermula dengan misi untuk menyediakan panduan pinjaman yang mudah diakses oleh semua rakyat Malaysia.' },
        { year: '2020', title: 'Pelancaran Online', description: 'Melancarkan platform dalam talian untuk analisis kelayakan yang lebih pantas.' },
        { year: '2021', title: '500 Klien', description: 'Mencapai pencapaian pertama 500 permohonan yang dibimbing.' },
        { year: '2023', title: '1000+ Klien', description: 'Membimbing lebih 1000 permohonan untuk rakyat Malaysia seluruh negara.' },
        { year: '2024', title: 'Pengembangan', description: 'Mengembangkan produk pinjaman termasuk penyatuan hutang dan kecemasan.' },
      ],
    },
    team: {
      eyebrow: 'Pasukan Kami',
      title: 'Orang sebenar di sebalik setiap pinjaman',
      description: 'Bukan bot, bukan outsource call-centre. Setiap permohonan disemak secara peribadi oleh salah seorang pegawai pinjaman di bawah ini.',
    },
    values: {
      eyebrow: 'Apa Yang Kami Perjuangkan',
      title: 'Nilai Teras Kami',
      description: 'Prinsip-prinsip ini membimbing segala yang kami lakukan dan cara kami melayani pelanggan.',
      items: [
        { title: 'Kepercayaan & Keselamatan', description: 'Data peribadi dan kewangan anda dikendalikan dengan tahap kerahsiaan tertinggi. Kami mematuhi garis panduan PDPA dan menggunakan penyulitan SSL.' },
        { title: 'Ketelusan', description: 'Tiada caj tersembunyi atau kejutan. Semua kadar, terma, dan caj dinyatakan dengan jelas sebelum anda komit.' },
        { title: 'Perkhidmatan Pantas', description: 'Kami faham keperluan segera. Kebanyakan analisis kelayakan siap dalam 24 jam; tempoh kelulusan bank berbeza.' },
        { title: 'Panduan Adil', description: 'Kadar indikatif bermula dari 4.88% dengan panduan bayaran balik yang disesuaikan dengan situasi kewangan anda.' },
      ],
    },
    services: {
      eyebrow: 'Produk Pinjaman',
      title: 'Apa Yang Kami Tawarkan',
      items: [
        { title: 'Pinjaman Peribadi', description: 'Dari 4.88% kadar rata setahun. Jumlah pinjaman sehingga RM100,000 dengan tempoh fleksibel dari 1-7 tahun.', href: PATHS.loans.personal },
        { title: 'Penyatuan Hutang', description: 'Gabungkan pelbagai hutang faedah tinggi menjadi satu bayaran bulanan yang terurus.', href: PATHS.loans.debtConsolidation },
        { title: 'Pinjaman Kecemasan', description: 'Analisis kelayakan pantas untuk keperluan kewangan segera.', href: PATHS.loans.emergency },
      ],
    },
  },
};
