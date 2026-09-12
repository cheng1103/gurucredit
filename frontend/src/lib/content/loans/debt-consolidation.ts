import { TRUST_BLOCK } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { LoanProductDoc } from './types';

export const debtConsolidationLoan: LoanProductDoc = {
  slug: 'debt-consolidation',
  path: PATHS.loans.debtConsolidation,
  content: {
    en: {
      eyebrow: 'Simplify Your Finances',
      title: 'Debt Consolidation Loan Malaysia',
      lede: 'Combine multiple debts into one manageable monthly payment, lower your interest rate, and pay off debt faster.',
      stats: [
        { value: 'RM2,000+', label: 'Average monthly savings' },
        { value: '50%', label: 'Lower interest rate' },
        { value: '1', label: 'Simple payment' },
        { value: '24hr', label: 'Fast approval' },
      ],
      benefits: {
        title: 'Why Consolidate Your Debts?',
        items: [
          { title: 'Lower interest rates', description: 'Replace high-interest credit card debt (18–24%) with a single loan at 6–9% p.a.' },
          { title: 'One monthly payment', description: 'No more juggling multiple due dates — just one payment to manage each month.' },
          { title: 'Pay off faster', description: 'With lower interest, more of each payment goes to principal, so you become debt-free sooner.' },
          { title: 'Save money', description: 'Most customers save RM500–2,000+ per month by consolidating their debts.' },
        ],
      },
      comparison: {
        title: 'See How Much You Could Save',
        before: {
          title: 'Before Consolidation',
          items: [
            { name: 'Credit card 1', rate: '18%', payment: 'RM800' },
            { name: 'Credit card 2', rate: '24%', payment: 'RM600' },
            { name: 'Personal loan', rate: '12%', payment: 'RM500' },
            { name: 'Car loan', rate: '3.5%', payment: 'RM900' },
          ],
          totalLabel: 'Total monthly payment',
          total: 'RM2,800/month',
        },
        after: {
          title: 'After Consolidation',
          rate: '7.5%',
          payment: 'RM1,800/month',
          savingsLabel: 'Monthly savings',
          savings: 'RM1,000',
        },
      },
      eligibility: {
        title: 'Who Should Consider Debt Consolidation?',
        items: [
          'You have multiple credit card debts',
          'You are paying high interest rates (above 10%)',
          'You struggle to track multiple payment dates',
          'Your total debt payments exceed 50% of income',
          'You want to become debt-free faster',
        ],
      },
      process: {
        title: 'How It Works',
        steps: [
          { title: 'Submit your details', description: 'Tell us about your current debts and income.' },
          { title: 'Get an analysis', description: 'We assess your situation and find the best consolidation option.' },
          { title: 'Bank decision', description: 'Once approved, your existing debts are settled by the lender.' },
          { title: 'One payment', description: 'Make one simple monthly payment at a lower rate.' },
        ],
      },
      warning: {
        title: 'Important Considerations',
        items: [
          'Consolidation works best when you commit to not taking on new debt',
          'Total interest paid may be higher if the tenure is extended significantly',
          'Your credit score may be temporarily affected when applying',
        ],
      },
      faq: {
        title: 'Debt Consolidation FAQ',
        items: [
          { question: 'Which debts can be consolidated?', answer: 'Most plans cover credit cards and personal loans; hire purchase eligibility depends on the bank.' },
          { question: 'Will my monthly payment go down?', answer: 'Usually yes, if the new rate is lower and the tenure is structured properly.' },
          { question: 'How soon will CCRIS improve?', answer: 'Expect improvement after 3–6 clean payment cycles once arrears are cleared.' },
        ],
      },
      trust: TRUST_BLOCK.en,
      cta: {
        title: 'Ready to Simplify Your Finances?',
        description: 'Get a free debt consolidation analysis. No obligation, no hidden fees.',
        primary: 'Get Free Analysis',
        secondary: 'Chat on WhatsApp',
      },
      guideLink: { label: 'Read the full strategy guide', href: PATHS.loanGuide.debtConsolidation },
    },
    ms: {
      eyebrow: 'Permudahkan Kewangan Anda',
      title: 'Pinjaman Penyatuan Hutang Malaysia',
      lede: 'Gabungkan pelbagai hutang menjadi satu bayaran bulanan, kurangkan kadar faedah, dan bayar hutang lebih cepat.',
      stats: [
        { value: 'RM2,000+', label: 'Penjimatan bulanan purata' },
        { value: '50%', label: 'Kadar faedah lebih rendah' },
        { value: '1', label: 'Bayaran mudah' },
        { value: '24j', label: 'Kelulusan cepat' },
      ],
      benefits: {
        title: 'Mengapa Satukan Hutang Anda?',
        items: [
          { title: 'Kadar faedah lebih rendah', description: 'Gantikan hutang kad kredit faedah tinggi (18–24%) dengan satu pinjaman pada 6–9% setahun.' },
          { title: 'Satu bayaran bulanan', description: 'Tiada lagi mengurus pelbagai tarikh bayaran — hanya satu bayaran sebulan.' },
          { title: 'Bayar lebih cepat', description: 'Dengan faedah lebih rendah, lebih banyak bayaran anda pergi ke prinsipal, jadi anda bebas hutang lebih cepat.' },
          { title: 'Jimat wang', description: 'Kebanyakan pelanggan jimat RM500–2,000+ sebulan dengan menyatukan hutang mereka.' },
        ],
      },
      comparison: {
        title: 'Lihat Berapa Banyak Anda Boleh Jimat',
        before: {
          title: 'Sebelum Penyatuan',
          items: [
            { name: 'Kad kredit 1', rate: '18%', payment: 'RM800' },
            { name: 'Kad kredit 2', rate: '24%', payment: 'RM600' },
            { name: 'Pinjaman peribadi', rate: '12%', payment: 'RM500' },
            { name: 'Pinjaman kereta', rate: '3.5%', payment: 'RM900' },
          ],
          totalLabel: 'Jumlah bayaran bulanan',
          total: 'RM2,800/bulan',
        },
        after: {
          title: 'Selepas Penyatuan',
          rate: '7.5%',
          payment: 'RM1,800/bulan',
          savingsLabel: 'Penjimatan bulanan',
          savings: 'RM1,000',
        },
      },
      eligibility: {
        title: 'Siapa Patut Pertimbangkan Penyatuan Hutang?',
        items: [
          'Anda mempunyai pelbagai hutang kad kredit',
          'Anda membayar kadar faedah tinggi (melebihi 10%)',
          'Anda sukar menjejaki pelbagai tarikh bayaran',
          'Jumlah bayaran hutang anda melebihi 50% pendapatan',
          'Anda mahu bebas hutang lebih cepat',
        ],
      },
      process: {
        title: 'Cara Ia Berfungsi',
        steps: [
          { title: 'Hantar butiran anda', description: 'Beritahu kami tentang hutang dan pendapatan semasa anda.' },
          { title: 'Dapatkan analisis', description: 'Kami nilai situasi anda dan cari pilihan penyatuan terbaik.' },
          { title: 'Keputusan bank', description: 'Setelah diluluskan, hutang sedia ada diselesaikan oleh pihak bank.' },
          { title: 'Satu bayaran', description: 'Buat satu bayaran bulanan mudah pada kadar lebih rendah.' },
        ],
      },
      warning: {
        title: 'Pertimbangan Penting',
        items: [
          'Penyatuan hutang berkesan apabila anda komited untuk tidak mengambil hutang baharu',
          'Jumlah faedah dibayar mungkin lebih tinggi jika tempoh pinjaman dilanjutkan dengan ketara',
          'Skor kredit anda mungkin terjejas sementara apabila memohon',
        ],
      },
      faq: {
        title: 'Soalan Lazim Penyatuan Hutang',
        items: [
          { question: 'Hutang apa yang boleh disatukan?', answer: 'Kebanyakan pelan meliputi kad kredit dan pinjaman peribadi; kelayakan hire purchase bergantung pada bank.' },
          { question: 'Adakah bayaran bulanan saya akan turun?', answer: 'Selalunya ya, jika kadar baharu lebih rendah dan tempoh disusun dengan betul.' },
          { question: 'Bila CCRIS akan pulih?', answer: 'Jangka penambahbaikan selepas 3–6 kitaran bayaran bersih sejurus tunggakan diselesaikan.' },
        ],
      },
      trust: TRUST_BLOCK.ms,
      cta: {
        title: 'Bersedia Permudahkan Kewangan Anda?',
        description: 'Dapatkan analisis penyatuan hutang percuma. Tiada komitmen, tiada yuran tersembunyi.',
        primary: 'Dapatkan Analisis Percuma',
        secondary: 'Sembang di WhatsApp',
      },
      guideLink: { label: 'Baca panduan strategi penuh', href: PATHS.loanGuide.debtConsolidation },
    },
  },
};
