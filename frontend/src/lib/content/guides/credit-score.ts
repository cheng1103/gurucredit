import { PATHS } from '@/lib/i18n/routes';
import { SERVICE_AREA_LABEL } from '@/lib/constants';
import type { GuideDoc } from './types';

export const creditScoreGuide: GuideDoc = {
  slug: 'credit-score',
  path: PATHS.loanGuide.creditScore,
  breadcrumbLabel: 'Improve Your Credit Score in Malaysia',
  content: {
    en: {
      eyebrow: 'Credit Score Guide',
      title: 'Improve Your Credit Score in Malaysia',
      lede: `A 90-day CCRIS + CTOS playbook to raise approval odds for borrowers in ${SERVICE_AREA_LABEL}.`,
      stats: [
        { label: 'CCRIS window', value: '12 months' },
        { label: 'Safe utilization', value: '< 30%' },
        { label: 'Recovery plan', value: '90 days' },
        { label: 'Check frequency', value: 'Every 6-12 months' },
      ],
      sections: [
        {
          kind: 'steps',
          id: 'recovery-plan',
          heading: '90-day recovery plan',
          steps: [
            { title: 'Pull CCRIS + CTOS reports', description: 'Confirm late markers, legal actions, and total outstanding balances before applying.' },
            { title: 'Stabilize payment history', description: 'Clear arrears and keep every facility current for 3 straight billing cycles.' },
            { title: 'Lower utilization', description: 'Reduce card usage to under 30% of the limit, or raise the limit only after clean payments.' },
            { title: 'Avoid rapid applications', description: 'Space out new loan inquiries so too many checks don’t drag your score down.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'documents',
          heading: 'Documents to prep',
          items: [
            'Latest 6 months payslips and bank statements',
            'Recent CCRIS report (BNM eCCRIS)',
            'CTOS report or legal status verification',
            'Proof of debt settlement (if any)',
          ],
        },
        {
          kind: 'warnings',
          id: 'mistakes',
          heading: 'Mistakes that hurt your score',
          items: [
            'Paying late even once in the last 12 months',
            'Using more than 50% of credit card limits',
            'Applying for multiple loans within 2-3 weeks',
            'Ignoring PTPTN or telco arrears',
          ],
        },
      ],
      faqs: [
        { question: 'How long do late payment records stay in CCRIS?', answer: 'CCRIS shows the last 12 months of repayment history. One late marker fades after 12 clean cycles.' },
        { question: 'Should I close unused credit cards?', answer: 'If annual fees are high, close the card. Otherwise keep limits open and usage below 30%.' },
        { question: 'Can I improve my score before applying for a loan?', answer: 'Yes. Focus on clearing arrears, lowering utilization, and avoiding new applications for 60-90 days.' },
      ],
      related: [
        { title: 'Understanding DSR for borrowers', href: '/blog/understanding-dsr-debt-service-ratio' },
        { title: 'Loan comparison tool', href: '/tools/compare' },
        { title: 'How to improve credit score Malaysia', href: '/blog/how-to-improve-credit-score-malaysia' },
        { title: 'Loan rejection reasons & fixes', href: '/blog/loan-rejection-reasons-solutions' },
      ],
      howTo: {
        name: '90-Day Recovery Plan',
        description: `A 90-day CCRIS + CTOS playbook to raise approval odds for borrowers in ${SERVICE_AREA_LABEL}.`,
        steps: [
          { name: 'Pull CCRIS + CTOS reports', text: 'Confirm late markers, legal actions, and total outstanding balances before applying.' },
          { name: 'Stabilize payment history', text: 'Clear arrears and keep every facility current for 3 straight billing cycles.' },
          { name: 'Lower utilization', text: 'Reduce card usage to under 30% of the limit, or raise the limit only after clean payments.' },
          { name: 'Avoid rapid applications', text: 'Space out new loan inquiries so too many checks don’t drag your score down.' },
        ],
      },
    },
    ms: {
      eyebrow: 'Panduan Skor Kredit',
      title: 'Tingkatkan Skor Kredit di Malaysia',
      lede: `Playbook CCRIS + CTOS 90 hari untuk menaikkan peluang kelulusan di ${SERVICE_AREA_LABEL}.`,
      stats: [
        { label: 'Tempoh CCRIS', value: '12 bulan' },
        { label: 'Penggunaan selamat', value: '< 30%' },
        { label: 'Pelan pemulihan', value: '90 hari' },
        { label: 'Kekerapan semakan', value: 'Setiap 6-12 bulan' },
      ],
      sections: [
        {
          kind: 'steps',
          id: 'recovery-plan',
          heading: 'Pelan pemulihan 90 hari',
          steps: [
            { title: 'Dapatkan laporan CCRIS + CTOS', description: 'Sahkan rekod lewat, tindakan undang-undang, dan jumlah baki tertunggak sebelum memohon.' },
            { title: 'Stabilkan rekod bayaran', description: 'Selesaikan tunggakan dan kekalkan setiap kemudahan lancar selama 3 kitaran bil berturut-turut.' },
            { title: 'Turunkan penggunaan kredit', description: 'Kekalkan penggunaan kad di bawah 30% had, atau naikkan had hanya selepas bayaran bersih.' },
            { title: 'Elak permohonan berturutan', description: 'Jarakkan permohonan pinjaman baharu supaya terlalu banyak semakan tidak menjatuhkan skor anda.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'documents',
          heading: 'Dokumen yang perlu disediakan',
          items: [
            'Slip gaji dan penyata bank 6 bulan terkini',
            'Laporan CCRIS terkini (BNM eCCRIS)',
            'Laporan CTOS atau pengesahan status undang-undang',
            'Bukti penyelesaian hutang (jika ada)',
          ],
        },
        {
          kind: 'warnings',
          id: 'mistakes',
          heading: 'Kesilapan yang menjatuhkan skor',
          items: [
            'Membayar lewat walaupun sekali dalam 12 bulan lepas',
            'Menggunakan lebih 50% had kad kredit',
            'Memohon banyak pinjaman dalam tempoh 2-3 minggu',
            'Mengabaikan tunggakan PTPTN atau telco',
          ],
        },
      ],
      faqs: [
        { question: 'Berapa lama rekod bayaran lewat kekal dalam CCRIS?', answer: 'CCRIS memaparkan 12 bulan terakhir sejarah bayaran. Satu rekod lewat akan hilang selepas 12 kitaran bersih.' },
        { question: 'Perlukah saya tutup kad kredit yang tidak digunakan?', answer: 'Jika yuran tahunan tinggi, tutup kad itu. Jika tidak, kekalkan had terbuka dan penggunaan di bawah 30%.' },
        { question: 'Bolehkah saya naikkan skor sebelum memohon pinjaman?', answer: 'Ya. Fokus pada menyelesaikan tunggakan, menurunkan penggunaan, dan elak permohonan baharu selama 60-90 hari.' },
      ],
      related: [
        { title: 'Memahami DSR untuk peminjam', href: '/blog/understanding-dsr-debt-service-ratio' },
        { title: 'Alat perbandingan pinjaman', href: '/tools/compare' },
        { title: 'Cara meningkatkan skor kredit Malaysia', href: '/blog/how-to-improve-credit-score-malaysia' },
        { title: 'Sebab penolakan pinjaman & cara baiki', href: '/blog/loan-rejection-reasons-solutions' },
      ],
      howTo: {
        name: 'Pelan Pemulihan 90 Hari',
        description: `Playbook CCRIS + CTOS 90 hari untuk menaikkan peluang kelulusan di ${SERVICE_AREA_LABEL}.`,
        steps: [
          { name: 'Dapatkan laporan CCRIS + CTOS', text: 'Sahkan rekod lewat, tindakan undang-undang, dan jumlah baki tertunggak sebelum memohon.' },
          { name: 'Stabilkan rekod bayaran', text: 'Selesaikan tunggakan dan kekalkan setiap kemudahan lancar selama 3 kitaran bil berturut-turut.' },
          { name: 'Turunkan penggunaan kredit', text: 'Kekalkan penggunaan kad di bawah 30% had, atau naikkan had hanya selepas bayaran bersih.' },
          { name: 'Elak permohonan berturutan', text: 'Jarakkan permohonan pinjaman baharu supaya terlalu banyak semakan tidak menjatuhkan skor anda.' },
        ],
      },
    },
  },
};
