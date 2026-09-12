import { PATHS } from '@/lib/i18n/routes';
import { SERVICE_AREA_LABEL } from '@/lib/constants';
import type { GuideDoc } from './types';

export const debtConsolidationGuide: GuideDoc = {
  slug: 'debt-consolidation',
  path: PATHS.loanGuide.debtConsolidation,
  breadcrumbLabel: 'Debt Consolidation Strategy for Malaysians',
  section: 'guides',
  content: {
    en: {
      eyebrow: 'Debt Consolidation Guide',
      title: 'Debt Consolidation Strategy for Malaysians',
      lede: `Combine credit cards and personal loans into one manageable payment with a clear DSR plan for ${SERVICE_AREA_LABEL}.`,
      stats: [
        { label: 'Target DSR', value: '< 60%' },
        { label: 'Typical tenure', value: '3-7 yrs' },
        { label: 'Review time', value: '2-5 days' },
        { label: 'Coverage', value: 'Cards + PL' },
      ],
      sections: [
        {
          kind: 'steps',
          id: 'roadmap',
          heading: 'Consolidation roadmap',
          steps: [
            { title: 'List every debt', description: 'Capture balances, rates, and minimum payments for all cards and loans.' },
            { title: 'Calculate the new instalment', description: 'Use a consolidation quote to confirm monthly savings and a healthier DSR.' },
            { title: 'Close or freeze cards', description: 'Avoid re-accumulating balances while paying off the new facility.' },
            { title: 'Track repayment milestones', description: 'Set 3, 6, and 12 month checkpoints to see CCRIS improvements.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'documents',
          heading: 'Documents required',
          items: [
            'Latest 3-6 months statements for each debt',
            'Payslips or income proof + bank statements',
            'CCRIS report showing current facilities',
            'Settlement letters (if applicable)',
          ],
        },
        {
          kind: 'warnings',
          id: 'mistakes',
          heading: 'Avoid these mistakes',
          items: [
            'Consolidating without cutting card usage',
            'Stretching tenure too long without real savings',
            'Ignoring early settlement penalties',
            'Leaving high-interest debts out of the plan',
          ],
        },
      ],
      faqs: [
        { question: 'Does consolidation reduce total interest?', answer: 'It can, if your new rate is lower and you avoid new card spending.' },
        { question: 'What debts can be consolidated?', answer: 'Most plans cover credit cards and personal loans; check eligibility for hire purchase separately.' },
        { question: 'How long before CCRIS improves?', answer: 'Expect improvement after 3-6 clean payment cycles once arrears are cleared.' },
      ],
      related: [
        { title: 'Debt Consolidation Loan', href: PATHS.loans.debtConsolidation },
        { title: 'Debt consolidation guide', href: '/blog/debt-consolidation-guide-malaysia' },
        { title: 'Improve credit score fast', href: '/blog/how-to-improve-credit-score-malaysia' },
        { title: 'Loan rejection reasons', href: '/blog/loan-rejection-reasons-solutions' },
        { title: 'Loan comparison tool', href: '/tools/compare' },
      ],
      howTo: {
        name: 'Consolidation Roadmap',
        description: `Combine credit cards and personal loans into one manageable payment with a clear DSR plan for ${SERVICE_AREA_LABEL}.`,
        steps: [
          { name: 'List every debt', text: 'Capture balances, rates, and minimum payments for all cards and loans.' },
          { name: 'Calculate the new instalment', text: 'Use a consolidation quote to confirm monthly savings and a healthier DSR.' },
          { name: 'Close or freeze cards', text: 'Avoid re-accumulating balances while paying off the new facility.' },
          { name: 'Track repayment milestones', text: 'Set 3, 6, and 12 month checkpoints to see CCRIS improvements.' },
        ],
      },
    },
    ms: {
      eyebrow: 'Panduan Penyatuan Hutang',
      title: 'Strategi Penyatuan Hutang untuk Rakyat Malaysia',
      lede: `Gabungkan kad kredit dan pinjaman peribadi kepada satu bayaran terkawal dengan pelan DSR yang jelas untuk ${SERVICE_AREA_LABEL}.`,
      stats: [
        { label: 'Sasaran DSR', value: '< 60%' },
        { label: 'Tempoh biasa', value: '3-7 thn' },
        { label: 'Masa semakan', value: '2-5 hari' },
        { label: 'Skop', value: 'Kad + PL' },
      ],
      sections: [
        {
          kind: 'steps',
          id: 'roadmap',
          heading: 'Pelan penyatuan hutang',
          steps: [
            { title: 'Senaraikan semua hutang', description: 'Rekod baki, kadar, dan bayaran minimum untuk semua kad dan pinjaman.' },
            { title: 'Kira ansuran baharu', description: 'Gunakan sebut harga penyatuan untuk pastikan penjimatan bulanan dan DSR lebih sihat.' },
            { title: 'Tutup atau bekukan kad', description: 'Elak baki bertambah semula semasa membayar kemudahan baharu.' },
            { title: 'Jejak milestone bayaran', description: 'Tetapkan semakan 3, 6, dan 12 bulan untuk lihat CCRIS pulih.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'documents',
          heading: 'Dokumen diperlukan',
          items: [
            'Penyata 3-6 bulan terkini untuk setiap hutang',
            'Slip gaji atau bukti pendapatan + penyata bank',
            'Laporan CCRIS untuk kemudahan sedia ada',
            'Surat penyelesaian (jika ada)',
          ],
        },
        {
          kind: 'warnings',
          id: 'mistakes',
          heading: 'Elak kesilapan ini',
          items: [
            'Menyatukan hutang tanpa menghentikan penggunaan kad',
            'Memanjangkan tempoh tanpa penjimatan sebenar',
            'Tidak menyemak penalti penyelesaian awal',
            'Meninggalkan hutang kadar tinggi di luar pelan',
          ],
        },
      ],
      faqs: [
        { question: 'Adakah penyatuan mengurangkan jumlah faedah?', answer: 'Boleh, jika kadar baharu lebih rendah dan anda hentikan penggunaan kad.' },
        { question: 'Hutang apa yang boleh disatukan?', answer: 'Kebanyakan pelan meliputi kad kredit dan pinjaman peribadi; semak kelayakan hire purchase secara berasingan.' },
        { question: 'Bilakah CCRIS akan pulih?', answer: 'Jangkakan penambahbaikan selepas 3-6 kitaran bayaran bersih apabila tunggakan diselesaikan.' },
      ],
      related: [
        { title: 'Pinjaman Penyatuan Hutang', href: PATHS.loans.debtConsolidation },
        { title: 'Panduan penyatuan hutang', href: '/blog/debt-consolidation-guide-malaysia' },
        { title: 'Tingkatkan skor kredit dengan pantas', href: '/blog/how-to-improve-credit-score-malaysia' },
        { title: 'Sebab penolakan pinjaman', href: '/blog/loan-rejection-reasons-solutions' },
        { title: 'Alat perbandingan pinjaman', href: '/tools/compare' },
      ],
      howTo: {
        name: 'Pelan Penyatuan Hutang',
        description: `Gabungkan kad kredit dan pinjaman peribadi kepada satu bayaran terkawal dengan pelan DSR yang jelas untuk ${SERVICE_AREA_LABEL}.`,
        steps: [
          { name: 'Senaraikan semua hutang', text: 'Rekod baki, kadar, dan bayaran minimum untuk semua kad dan pinjaman.' },
          { name: 'Kira ansuran baharu', text: 'Gunakan sebut harga penyatuan untuk pastikan penjimatan bulanan dan DSR lebih sihat.' },
          { name: 'Tutup atau bekukan kad', text: 'Elak baki bertambah semula semasa membayar kemudahan baharu.' },
          { name: 'Jejak milestone bayaran', text: 'Tetapkan semakan 3, 6, dan 12 bulan untuk lihat CCRIS pulih.' },
        ],
      },
    },
  },
};
