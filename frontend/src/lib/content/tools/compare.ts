import { PATHS } from '@/lib/i18n/routes';

// ---------------------------------------------------------------------------
// Bank rate comparator (formerly `src/app/tools/compare/page.tsx`)
// ---------------------------------------------------------------------------

export type LoanTypeId = 'home' | 'car' | 'personal';

export interface Bank {
  id: string;
  name: string;
  logo: string;
  homeLoan: { min: number; max: number };
  carLoan: { min: number; max: number };
  personalLoan: { min: number; max: number };
  featuresEn: string[];
  featuresMs: string[];
  popular: boolean;
}

export const banks: Bank[] = [
  {
    id: 'maybank',
    name: 'Maybank',
    logo: '🏦',
    homeLoan: { min: 3.85, max: 4.50 },
    carLoan: { min: 2.48, max: 3.20 },
    personalLoan: { min: 5.00, max: 12.00 },
    featuresEn: ['Flexi loan option', 'Low entry cost', 'Online application'],
    featuresMs: ['Pilihan pinjaman flexi', 'Kos kemasukan rendah', 'Permohonan dalam talian'],
    popular: true,
  },
  {
    id: 'cimb',
    name: 'CIMB Bank',
    logo: '🏛️',
    homeLoan: { min: 3.90, max: 4.60 },
    carLoan: { min: 2.58, max: 3.30 },
    personalLoan: { min: 5.50, max: 13.00 },
    featuresEn: ['Fast decision', 'Flexible repayment', 'No lock-in period'],
    featuresMs: ['Keputusan pantas', 'Bayaran balik fleksibel', 'Tiada tempoh kunci'],
    popular: true,
  },
  {
    id: 'publicbank',
    name: 'Public Bank',
    logo: '🏢',
    homeLoan: { min: 3.80, max: 4.40 },
    carLoan: { min: 2.38, max: 3.10 },
    personalLoan: { min: 5.28, max: 11.00 },
    featuresEn: ['Competitive rates', 'High margin financing', 'Excellent service'],
    featuresMs: ['Kadar kompetitif', 'Pembiayaan margin tinggi', 'Perkhidmatan cemerlang'],
    popular: true,
  },
  {
    id: 'rhb',
    name: 'RHB Bank',
    logo: '🏗️',
    homeLoan: { min: 3.88, max: 4.55 },
    carLoan: { min: 2.50, max: 3.25 },
    personalLoan: { min: 6.00, max: 14.00 },
    featuresEn: ['Bundle packages', 'Cashback rewards', 'Easy switching'],
    featuresMs: ['Pakej gabungan', 'Ganjaran pulangan tunai', 'Pertukaran mudah'],
    popular: false,
  },
  {
    id: 'hongleong',
    name: 'Hong Leong Bank',
    logo: '🏬',
    homeLoan: { min: 3.95, max: 4.65 },
    carLoan: { min: 2.60, max: 3.35 },
    personalLoan: { min: 5.88, max: 12.50 },
    featuresEn: ['Digital convenience', 'Low processing fee', 'Quick disbursement'],
    featuresMs: ['Kemudahan digital', 'Yuran pemprosesan rendah', 'Pengeluaran pantas'],
    popular: false,
  },
  {
    id: 'ambank',
    name: 'AmBank',
    logo: '🏨',
    homeLoan: { min: 3.92, max: 4.58 },
    carLoan: { min: 2.55, max: 3.28 },
    personalLoan: { min: 5.50, max: 12.00 },
    featuresEn: ['Free takaful', 'Salary deduction', 'Extra cashback'],
    featuresMs: ['Takaful percuma', 'Potongan gaji', 'Pulangan tunai tambahan'],
    popular: false,
  },
];

export const loanTypeDefaults: Record<
  LoanTypeId,
  { defaultAmount: number; defaultTenure: number; maxAmount: number; maxTenure: number }
> = {
  home: { defaultAmount: 500000, defaultTenure: 30, maxAmount: 5000000, maxTenure: 35 },
  car: { defaultAmount: 100000, defaultTenure: 7, maxAmount: 500000, maxTenure: 9 },
  personal: { defaultAmount: 50000, defaultTenure: 5, maxAmount: 200000, maxTenure: 10 },
};

// ---------------------------------------------------------------------------
// Product-type comparator (formerly `src/app/compare/CompareContent.tsx`)
// ---------------------------------------------------------------------------

export type ProductKey = 'personal' | 'car' | 'home' | 'business';

export interface ProductInfo {
  id: number;
  name: string;
  rate: string;
  amount: string;
  tenure: string;
  approval: string;
  collateral: boolean;
  minIncome: string;
  documentation: 'minimal' | 'standard' | 'extensive';
  bestFor: string;
  features: string[];
}

export const productKeys: ProductKey[] = ['personal', 'car', 'home', 'business'];

// ---------------------------------------------------------------------------
// Bilingual copy
// ---------------------------------------------------------------------------

export const compareUi = {
  en: {
    page: {
      breadcrumbHome: 'Home',
      breadcrumbTools: 'Tools',
      breadcrumbCurrent: 'Compare',
      eyebrow: 'Comparison Tool',
      title: 'Loan Comparison Tool',
      lede: 'Compare loan rates from major Malaysian banks, or compare loan products side by side, to find the best deal for your home, car, personal, or business needs.',
    },
    tabs: {
      bank: 'Compare bank rates',
      product: 'Compare loan types',
    },
    bank: {
      loanTypes: { home: 'Home Loan', car: 'Car Loan', personal: 'Personal Loan' },
      loanDetails: {
        title: 'Loan Details',
        loanAmount: 'Loan Amount (RM)',
        loanTenure: 'Loan Tenure (Years)',
        years: 'years',
        months: 'months',
        resetDefault: 'Reset to default',
      },
      bankSelection: {
        title: 'Select banks',
        description: 'Choose up to 4 banks to compare',
      },
      comparison: {
        bestRate: 'Best rate',
        popular: 'Popular',
        interestRate: 'Interest rate',
        monthlyPayment: 'Monthly payment',
        totalInterest: 'Total interest',
        totalPayment: 'Total payment',
        to: 'to',
        perAnnum: 'p.a.',
      },
      disclaimer: {
        title: 'Important note',
        text: 'Interest rates shown are indicative and subject to change. Actual rates depend on your credit profile, loan amount, and bank policies. Contact the banks directly or use our consultation service for accurate quotes.',
      },
      faq: {
        title: 'Loan comparison FAQ',
        description: 'Questions about how to read bank comparisons.',
        items: [
          {
            question: 'Are these rates guaranteed?',
            answer: 'No. Rates are indicative and depend on credit profile, amount, and bank policy.',
          },
          {
            question: 'Can I compare different loan types?',
            answer: 'Yes, you can switch between home, car, and personal loan comparisons.',
          },
          {
            question: 'What should I check besides interest rate?',
            answer: 'Look at fees, lock-in periods, decision speed, and flexible repayment terms.',
          },
        ],
      },
    },
    product: {
      selectToCompare: 'Select products to compare (2-4)',
      clearAll: 'Clear all',
      applyNow: 'Apply now',
      comparisonTable: 'Comparison table',
      feature: 'Feature',
      interestRate: 'Interest rate',
      loanAmount: 'Loan amount',
      tenure: 'Tenure',
      approval: 'Decision time (est.)',
      collateral: 'Collateral required',
      minIncome: 'Min. income required',
      documentation: 'Documentation',
      bestFor: 'Best for',
      yes: 'Yes',
      no: 'No',
      minimal: 'Minimal',
      standard: 'Standard',
      extensive: 'Extensive',
      products: {
        personal: {
          id: 1,
          name: 'Personal Loan',
          rate: 'From 4.88%',
          amount: 'Up to RM100,000',
          tenure: '1-7 years',
          approval: '24 hours',
          collateral: false,
          minIncome: 'RM2,000/month',
          documentation: 'minimal',
          bestFor: 'Emergency cash, debt consolidation, medical bills, personal needs',
          features: [
            'No collateral required',
            'Fixed monthly payments',
            'Fast 24-hour decision (est.)',
            'Flexible tenure options',
          ],
        },
        car: {
          id: 2,
          name: 'Car Loan',
          rate: 'From 3.5%',
          amount: 'Up to 90% of car value',
          tenure: 'Up to 9 years',
          approval: '24-48 hours',
          collateral: true,
          minIncome: 'RM2,500/month',
          documentation: 'standard',
          bestFor: 'New car purchase, used car financing, car refinancing',
          features: [
            'New & used car financing',
            'Up to 90% financing margin',
            'Competitive rates from 3.5%',
            'Long tenure up to 9 years',
          ],
        },
        home: {
          id: 3,
          name: 'Home Loan',
          rate: 'From 4.0%',
          amount: 'Up to 90% of property value',
          tenure: 'Up to 35 years',
          approval: '1-2 weeks',
          collateral: true,
          minIncome: 'RM3,500/month',
          documentation: 'extensive',
          bestFor: 'Home purchase, property investment, home refinancing',
          features: [
            'Up to 90% financing margin',
            'Long tenure up to 35 years',
            'Competitive rates from 4.0%',
            'Flexible repayment options',
          ],
        },
        business: {
          id: 4,
          name: 'Business Loan',
          rate: 'From 5.5%',
          amount: 'Up to RM500,000',
          tenure: '1-7 years',
          approval: '3-5 days',
          collateral: false,
          minIncome: 'RM50,000/year revenue',
          documentation: 'standard',
          bestFor: 'Working capital, equipment purchase, business expansion',
          features: [
            'Working capital financing',
            'Equipment purchase loans',
            'Business expansion funding',
            'Flexible collateral options',
          ],
        },
      } satisfies Record<ProductKey, ProductInfo>,
      tips: {
        title: 'Choosing the right loan',
        items: [
          'Consider your monthly income and existing commitments',
          'Compare total interest paid, not just the rate',
          'Check for hidden fees and early settlement penalties',
          'Ensure your DSR stays below 60% after the new loan',
          'Choose a tenure that balances monthly payments and total cost',
        ],
      },
    },
  },
  ms: {
    page: {
      breadcrumbHome: 'Utama',
      breadcrumbTools: 'Alat',
      breadcrumbCurrent: 'Bandingkan',
      eyebrow: 'Alat Perbandingan',
      title: 'Alat Perbandingan Pinjaman',
      lede: 'Bandingkan kadar pinjaman dari bank utama Malaysia, atau bandingkan jenis produk pinjaman untuk keperluan rumah, kereta, peribadi, atau perniagaan anda.',
    },
    tabs: {
      bank: 'Banding kadar bank',
      product: 'Banding jenis pinjaman',
    },
    bank: {
      loanTypes: { home: 'Pinjaman Rumah', car: 'Pinjaman Kereta', personal: 'Pinjaman Peribadi' },
      loanDetails: {
        title: 'Butiran Pinjaman',
        loanAmount: 'Jumlah Pinjaman (RM)',
        loanTenure: 'Tempoh Pinjaman (Tahun)',
        years: 'tahun',
        months: 'bulan',
        resetDefault: 'Set semula ke asal',
      },
      bankSelection: {
        title: 'Pilih bank',
        description: 'Pilih sehingga 4 bank untuk dibandingkan',
      },
      comparison: {
        bestRate: 'Kadar terbaik',
        popular: 'Popular',
        interestRate: 'Kadar faedah',
        monthlyPayment: 'Bayaran bulanan',
        totalInterest: 'Jumlah faedah',
        totalPayment: 'Jumlah bayaran',
        to: 'hingga',
        perAnnum: 'p.a.',
      },
      disclaimer: {
        title: 'Nota penting',
        text: 'Kadar faedah yang ditunjukkan adalah indikatif dan tertakluk kepada perubahan. Kadar sebenar bergantung kepada profil kredit, jumlah pinjaman, dan polisi bank anda. Hubungi bank secara langsung atau gunakan perkhidmatan konsultasi kami untuk sebut harga yang tepat.',
      },
      faq: {
        title: 'Soalan lazim perbandingan pinjaman',
        description: 'Soalan tentang cara membaca perbandingan bank.',
        items: [
          {
            question: 'Adakah kadar ini dijamin?',
            answer: 'Tidak. Kadar adalah indikatif dan bergantung pada profil kredit, jumlah, dan polisi bank.',
          },
          {
            question: 'Boleh banding jenis pinjaman berbeza?',
            answer: 'Ya, anda boleh tukar antara pinjaman rumah, kereta, dan peribadi.',
          },
          {
            question: 'Apa lagi perlu disemak selain kadar?',
            answer: 'Semak yuran, tempoh lock-in, kelajuan keputusan, dan fleksibiliti bayaran.',
          },
        ],
      },
    },
    product: {
      selectToCompare: 'Pilih produk untuk dibandingkan (2-4)',
      clearAll: 'Kosongkan semua',
      applyNow: 'Mohon sekarang',
      comparisonTable: 'Jadual perbandingan',
      feature: 'Ciri',
      interestRate: 'Kadar faedah',
      loanAmount: 'Jumlah pinjaman',
      tenure: 'Tempoh',
      approval: 'Masa keputusan (anggaran)',
      collateral: 'Cagaran diperlukan',
      minIncome: 'Pendapatan minimum',
      documentation: 'Dokumentasi',
      bestFor: 'Sesuai untuk',
      yes: 'Ya',
      no: 'Tidak',
      minimal: 'Minimum',
      standard: 'Standard',
      extensive: 'Lengkap',
      products: {
        personal: {
          id: 1,
          name: 'Pinjaman Peribadi',
          rate: 'Dari 4.88%',
          amount: 'Sehingga RM100,000',
          tenure: '1-7 tahun',
          approval: '24 jam',
          collateral: false,
          minIncome: 'RM2,000/bulan',
          documentation: 'minimal',
          bestFor: 'Wang kecemasan, penggabungan hutang, bil perubatan, keperluan peribadi',
          features: [
            'Tiada cagaran diperlukan',
            'Bayaran bulanan tetap',
            'Keputusan cepat 24 jam (anggaran)',
            'Pilihan tempoh fleksibel',
          ],
        },
        car: {
          id: 2,
          name: 'Pinjaman Kereta',
          rate: 'Dari 3.5%',
          amount: 'Sehingga 90% nilai kereta',
          tenure: 'Sehingga 9 tahun',
          approval: '24-48 jam',
          collateral: true,
          minIncome: 'RM2,500/bulan',
          documentation: 'standard',
          bestFor: 'Pembelian kereta baru, pembiayaan kereta terpakai, pembiayaan semula kereta',
          features: [
            'Pembiayaan kereta baru & terpakai',
            'Margin pembiayaan sehingga 90%',
            'Kadar kompetitif dari 3.5%',
            'Tempoh panjang sehingga 9 tahun',
          ],
        },
        home: {
          id: 3,
          name: 'Pinjaman Rumah',
          rate: 'Dari 4.0%',
          amount: 'Sehingga 90% nilai hartanah',
          tenure: 'Sehingga 35 tahun',
          approval: '1-2 minggu',
          collateral: true,
          minIncome: 'RM3,500/bulan',
          documentation: 'extensive',
          bestFor: 'Pembelian rumah, pelaburan hartanah, pembiayaan semula rumah',
          features: [
            'Margin pembiayaan sehingga 90%',
            'Tempoh panjang sehingga 35 tahun',
            'Kadar kompetitif dari 4.0%',
            'Pilihan pembayaran fleksibel',
          ],
        },
        business: {
          id: 4,
          name: 'Pinjaman Perniagaan',
          rate: 'Dari 5.5%',
          amount: 'Sehingga RM500,000',
          tenure: '1-7 tahun',
          approval: '3-5 hari',
          collateral: false,
          minIncome: 'RM50,000/tahun pendapatan',
          documentation: 'standard',
          bestFor: 'Modal kerja, pembelian peralatan, pengembangan perniagaan',
          features: [
            'Pembiayaan modal kerja',
            'Pinjaman pembelian peralatan',
            'Pendanaan pengembangan perniagaan',
            'Pilihan cagaran fleksibel',
          ],
        },
      } satisfies Record<ProductKey, ProductInfo>,
      tips: {
        title: 'Memilih pinjaman yang betul',
        items: [
          'Pertimbangkan pendapatan bulanan dan komitmen sedia ada',
          'Bandingkan jumlah faedah yang dibayar, bukan hanya kadar',
          'Semak caj tersembunyi dan penalti penyelesaian awal',
          'Pastikan DSR anda kekal di bawah 60% selepas pinjaman baru',
          'Pilih tempoh yang mengimbangi bayaran bulanan dan kos total',
        ],
      },
    },
  },
} as const;

export const productApplyHref = (key: ProductKey, language: 'en' | 'ms') =>
  PATHS.servicesApply(String(compareUi[language].product.products[key].id));
