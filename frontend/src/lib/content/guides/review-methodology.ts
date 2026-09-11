import { PATHS } from '@/lib/i18n/routes';
import type { GuideDoc } from './types';

export const reviewMethodologyGuide: GuideDoc = {
  slug: 'review-methodology',
  path: PATHS.reviewMethodology,
  breadcrumbLabel: 'How We Review Borrower Files Before Recommending the Next Step',
  content: {
    en: {
      eyebrow: 'Editorial',
      title: 'How We Review Borrower Files Before Recommending the Next Step',
      lede: 'The practical framework we use when assessing borrower readiness, affordability, and route fit.',
      sections: [
        {
          kind: 'paragraphs',
          id: 'core-review-sequence',
          heading: 'Core review sequence',
          paragraphs: [
            'Profile and objective: we clarify the loan purpose, amount range, urgency, and whether the borrower needs a bank route, debt solution, or a smaller interim step.',
            'Income quality: we look at salary, business receipts, commission patterns, bankability, and whether income proof is stable enough for the intended route.',
            'Commitments and DSR: we review existing instalments, card minimums, and recurring obligations to estimate repayment fit rather than only headline affordability.',
            'CCRIS and CTOS signals: we read repayment patterns, legal records, and whether issues are active, old, isolated, or repeated.',
            'Document readiness and route selection: we identify the missing pieces, likely friction points, and which next step is more realistic before a formal submission is attempted.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'what-guides-us',
          heading: 'What guides our review',
          paragraphs: [
            'File review: the same income can produce different outcomes depending on payment history, inquiry pattern, and documentation quality.',
            'Affordability first: borrowing capacity is judged against commitments, not income in isolation.',
            'Route fit: a borrower may need cleanup, debt restructuring, or a smaller request instead of another direct application.',
            'Process discipline: we avoid blanket promises and explain where uncertainty still exists.',
          ],
        },
      ],
      related: [
        { title: 'Editorial policy', href: PATHS.editorialPolicy },
        { title: 'Verify us', href: PATHS.verifyUs },
      ],
    },
    ms: {
      eyebrow: 'Editorial',
      title: 'Bagaimana Kami Menyemak Fail Peminjam Sebelum Mencadangkan Langkah Seterusnya',
      lede: 'Kerangka praktikal yang kami gunakan apabila menilai kesiapsiagaan peminjam, kemampuan ansuran, dan kesesuaian laluan.',
      sections: [
        {
          kind: 'paragraphs',
          id: 'core-review-sequence',
          heading: 'Urutan semakan teras',
          paragraphs: [
            'Profil dan objektif: kami jelaskan tujuan pinjaman, julat jumlah, tahap kecemasan, dan sama ada peminjam memerlukan laluan bank, penyelesaian hutang, atau langkah interim yang lebih kecil.',
            'Kualiti pendapatan: kami melihat gaji, penerimaan perniagaan, corak komisen, kebolehterimaan bank, dan sama ada bukti pendapatan cukup stabil untuk laluan yang dimaksudkan.',
            'Komitmen dan DSR: kami semak ansuran sedia ada, minimum kad, dan obligasi berulang untuk menganggar kesesuaian bayaran balik, bukan kemampuan di atas kertas semata-mata.',
            'Isyarat CCRIS dan CTOS: kami membaca corak bayaran, rekod legal, dan sama ada isu itu aktif, lama, terpencil, atau berulang.',
            'Kesiapsiagaan dokumen dan pemilihan laluan: kami kenal pasti jurang dokumen, titik geseran yang dijangka, dan langkah seterusnya yang lebih realistik sebelum percubaan penghantaran rasmi dibuat.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'what-guides-us',
          heading: 'Apa yang memandu semakan kami',
          paragraphs: [
            'Semakan fail: pendapatan yang sama boleh memberi hasil berbeza bergantung pada sejarah bayaran, corak inquiry, dan kualiti dokumen.',
            'Kemampuan dahulu: kapasiti meminjam dinilai berbanding komitmen, bukan pendapatan secara terasing.',
            'Kesesuaian laluan: seorang peminjam mungkin perlukan pembersihan fail, penyusunan hutang, atau jumlah lebih kecil, bukan satu lagi permohonan terus.',
            'Disiplin proses: kami mengelakkan janji pukal dan menerangkan di mana ketidakpastian masih wujud.',
          ],
        },
      ],
      related: [
        { title: 'Dasar editorial', href: PATHS.editorialPolicy },
        { title: 'Sahkan kami', href: PATHS.verifyUs },
      ],
    },
  },
};
