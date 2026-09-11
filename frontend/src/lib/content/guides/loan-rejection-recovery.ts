import { PATHS } from '@/lib/i18n/routes';
import type { GuideDoc } from './types';

export const loanRejectionRecoveryGuide: GuideDoc = {
  slug: 'loan-rejection-recovery',
  path: PATHS.loanGuide.loanRejectionRecovery,
  breadcrumbLabel: 'What to Fix After a Loan Rejection in Malaysia',
  section: 'guides',
  content: {
    en: {
      eyebrow: 'Rejection Recovery Guide',
      title: 'What to Fix After a Loan Rejection in Malaysia',
      lede: 'How to identify the likely blocker, stop repeated mistakes, and rebuild the file before your next submission.',
      sections: [
        {
          kind: 'steps',
          id: 'recovery-sequence',
          heading: 'Recovery sequence',
          steps: [
            { title: 'Find the real reason first', description: 'Do not treat every rejection as the same problem. DSR, file quality, and weak documents each need a different fix.' },
            { title: 'Pause unnecessary new applications', description: 'Repeated submissions without changes usually create more file pressure, not better odds.' },
            { title: 'Repair the specific blocker', description: 'That may mean lowering commitments, improving documents, or allowing more clean repayment cycles.' },
            { title: 'Re-enter through a better route', description: 'The next attempt should fit the profile you have now, not the one you hoped to present.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'actions-that-help',
          heading: 'Actions that usually help',
          items: [
            'Review CCRIS and CTOS again',
            'Recalculate DSR honestly',
            'Tighten income proof and statements',
            'Lower the amount if affordability is the real problem',
          ],
        },
      ],
      howTo: {
        name: 'Recovery Sequence',
        description: 'How to identify the likely blocker, stop repeated mistakes, and rebuild the file before your next submission.',
        steps: [
          { name: 'Find the real reason first', text: 'Do not treat every rejection as the same problem. DSR, file quality, and weak documents each need a different fix.' },
          { name: 'Pause unnecessary new applications', text: 'Repeated submissions without changes usually create more file pressure, not better odds.' },
          { name: 'Repair the specific blocker', text: 'That may mean lowering commitments, improving documents, or allowing more clean repayment cycles.' },
          { name: 'Re-enter through a better route', text: 'The next attempt should fit the profile you have now, not the one you hoped to present.' },
        ],
      },
    },
    ms: {
      eyebrow: 'Panduan Pulih Selepas Ditolak',
      title: 'Apa yang Perlu Dibaiki Selepas Pinjaman Ditolak di Malaysia',
      lede: 'Cara mengenal pasti halangan sebenar, menghentikan kesilapan berulang, dan membina semula fail sebelum penghantaran seterusnya.',
      sections: [
        {
          kind: 'steps',
          id: 'recovery-sequence',
          heading: 'Urutan pemulihan',
          steps: [
            { title: 'Cari sebab sebenar dahulu', description: 'Jangan anggap setiap penolakan ialah masalah yang sama. DSR, kualiti fail, dan dokumen lemah masing-masing perlukan pembaikan berbeza.' },
            { title: 'Jeda permohonan baharu yang tidak perlu', description: 'Permohonan berulang tanpa perubahan biasanya menambah tekanan fail, bukan peluang yang lebih baik.' },
            { title: 'Baiki halangan yang spesifik', description: 'Itu mungkin bermaksud merendahkan komitmen, memperbaiki dokumen, atau memberi lebih banyak kitaran bayaran bersih.' },
            { title: 'Masuk semula melalui laluan yang lebih baik', description: 'Percubaan seterusnya patut sesuai dengan profil yang anda ada sekarang, bukan profil yang anda harap tunjukkan.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'actions-that-help',
          heading: 'Langkah yang biasanya membantu',
          items: [
            'Semak semula CCRIS dan CTOS',
            'Kira semula DSR dengan jujur',
            'Kemaskan bukti pendapatan dan penyata',
            'Rendahkan jumlah jika kemampuan ialah masalah sebenar',
          ],
        },
      ],
      howTo: {
        name: 'Urutan Pemulihan',
        description: 'Cara mengenal pasti halangan sebenar, menghentikan kesilapan berulang, dan membina semula fail sebelum penghantaran seterusnya.',
        steps: [
          { name: 'Cari sebab sebenar dahulu', text: 'Jangan anggap setiap penolakan ialah masalah yang sama. DSR, kualiti fail, dan dokumen lemah masing-masing perlukan pembaikan berbeza.' },
          { name: 'Jeda permohonan baharu yang tidak perlu', text: 'Permohonan berulang tanpa perubahan biasanya menambah tekanan fail, bukan peluang yang lebih baik.' },
          { name: 'Baiki halangan yang spesifik', text: 'Itu mungkin bermaksud merendahkan komitmen, memperbaiki dokumen, atau memberi lebih banyak kitaran bayaran bersih.' },
          { name: 'Masuk semula melalui laluan yang lebih baik', text: 'Percubaan seterusnya patut sesuai dengan profil yang anda ada sekarang, bukan profil yang anda harap tunjukkan.' },
        ],
      },
    },
  },
};
