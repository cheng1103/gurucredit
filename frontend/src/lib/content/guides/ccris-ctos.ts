import { PATHS } from '@/lib/i18n/routes';
import type { GuideDoc } from './types';

export const ccrisCtosGuide: GuideDoc = {
  slug: 'ccris-ctos',
  path: PATHS.loanGuide.ccrisCtos,
  breadcrumbLabel: 'How Lenders Actually Read Your CCRIS and CTOS File',
  content: {
    en: {
      eyebrow: 'CCRIS + CTOS Guide',
      title: 'How Lenders Actually Read Your CCRIS and CTOS File',
      lede: 'What matters inside a borrower file, how lenders interpret repayment patterns, and how to prepare a stronger next move before another application.',
      sections: [
        {
          kind: 'steps',
          id: 'review-first',
          heading: 'What to review first',
          steps: [
            { title: 'Read repayment patterns, not only the label', description: 'Old, isolated late markers are not treated the same as active or repeated issues.' },
            { title: 'Separate legal records from affordability issues', description: 'Some files fail because of legal or collection signals; others fail because the numbers no longer fit.' },
            { title: 'Check current affordability at the same time', description: 'A cleaner file can still be declined when DSR is too high.' },
            { title: 'Use the right route after diagnosis', description: 'Some borrowers need cleanup, some need a smaller request, and some need a different product path.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'useful-checks',
          heading: 'Useful checks',
          items: [
            'Latest CCRIS and CTOS reports',
            'Current debt and card commitment list',
            'Income proof and recent bank statements',
            'Any settlement or release letters already available',
          ],
        },
      ],
      howTo: {
        name: 'What to review first',
        description: 'What matters inside a borrower file, how lenders interpret repayment patterns, and how to prepare a stronger next move before another application.',
        steps: [
          { name: 'Read repayment patterns, not only the label', text: 'Old, isolated late markers are not treated the same as active or repeated issues.' },
          { name: 'Separate legal records from affordability issues', text: 'Some files fail because of legal or collection signals; others fail because the numbers no longer fit.' },
          { name: 'Check current affordability at the same time', text: 'A cleaner file can still be declined when DSR is too high.' },
          { name: 'Use the right route after diagnosis', text: 'Some borrowers need cleanup, some need a smaller request, and some need a different product path.' },
        ],
      },
    },
    ms: {
      eyebrow: 'Panduan CCRIS + CTOS',
      title: 'Bagaimana Lender Sebenarnya Membaca Fail CCRIS dan CTOS Anda',
      lede: 'Apa yang penting dalam fail peminjam, bagaimana lender mentafsir corak bayaran, dan bagaimana menyediakan langkah seterusnya yang lebih kuat sebelum permohonan baharu.',
      sections: [
        {
          kind: 'steps',
          id: 'review-first',
          heading: 'Apa yang perlu disemak dahulu',
          steps: [
            { title: 'Baca corak bayaran, bukan label semata-mata', description: 'Rekod lewat lama yang terpencil tidak dinilai sama seperti isu aktif atau berulang.' },
            { title: 'Asingkan rekod legal daripada isu kemampuan', description: 'Sesetengah fail gagal kerana isyarat legal atau collection; yang lain gagal kerana nombor tidak lagi sesuai.' },
            { title: 'Semak kemampuan semasa pada masa yang sama', description: 'Fail yang lebih bersih masih boleh ditolak apabila DSR terlalu tinggi.' },
            { title: 'Gunakan laluan yang betul selepas diagnosis', description: 'Ada peminjam perlukan pembersihan, ada perlukan jumlah lebih kecil, dan ada perlukan laluan produk berbeza.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'useful-checks',
          heading: 'Semakan berguna',
          items: [
            'Laporan CCRIS dan CTOS terkini',
            'Senarai komitmen hutang dan kad semasa',
            'Bukti pendapatan dan penyata bank terkini',
            'Sebarang surat settlement atau release yang sudah ada',
          ],
        },
      ],
      howTo: {
        name: 'Apa yang perlu disemak dahulu',
        description: 'Apa yang penting dalam fail peminjam, bagaimana lender mentafsir corak bayaran, dan bagaimana menyediakan langkah seterusnya yang lebih kuat sebelum permohonan baharu.',
        steps: [
          { name: 'Baca corak bayaran, bukan label semata-mata', text: 'Rekod lewat lama yang terpencil tidak dinilai sama seperti isu aktif atau berulang.' },
          { name: 'Asingkan rekod legal daripada isu kemampuan', text: 'Sesetengah fail gagal kerana isyarat legal atau collection; yang lain gagal kerana nombor tidak lagi sesuai.' },
          { name: 'Semak kemampuan semasa pada masa yang sama', text: 'Fail yang lebih bersih masih boleh ditolak apabila DSR terlalu tinggi.' },
          { name: 'Gunakan laluan yang betul selepas diagnosis', text: 'Ada peminjam perlukan pembersihan, ada perlukan jumlah lebih kecil, dan ada perlukan laluan produk berbeza.' },
        ],
      },
    },
  },
};
