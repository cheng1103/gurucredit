import { PATHS } from '@/lib/i18n/routes';
import type { GuideDoc } from './types';

export const selfEmployedIncomeProofGuide: GuideDoc = {
  slug: 'self-employed-income-proof',
  path: PATHS.loanGuide.selfEmployedIncomeProof,
  breadcrumbLabel: 'How Self-Employed Borrowers Should Prove Income in Malaysia',
  content: {
    en: {
      eyebrow: 'Self-Employed Borrower Guide',
      title: 'How Self-Employed Borrowers Should Prove Income in Malaysia',
      lede: 'How to present business, freelance, gig, or commission income so lenders can actually assess it.',
      sections: [
        {
          kind: 'steps',
          id: 'stronger-files',
          heading: 'What stronger files usually show',
          steps: [
            { title: 'Stable banked inflow', description: 'Recurring credits usually help more than one strong month with no pattern.' },
            { title: 'Matching supporting records', description: 'Invoices, contracts, tax records, or commission statements help explain the source of funds.' },
            { title: 'Clearer separation of business and personal movement', description: 'Mixed, unexplained transfers make the file harder to trust.' },
            { title: 'A realistic average, not only peak months', description: 'An annualised or multi-month average is usually more credible than one exceptional period.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'proof-that-helps',
          heading: 'Proof that usually helps',
          items: [
            'Business bank statements',
            'Tax or filing support where available',
            'Invoices, contracts, or commission statements',
            'A consistent explanation of income source',
          ],
        },
      ],
      howTo: {
        name: 'What Stronger Files Usually Show',
        description: 'How to present business, freelance, gig, or commission income so lenders can actually assess it.',
        steps: [
          { name: 'Stable banked inflow', text: 'Recurring credits usually help more than one strong month with no pattern.' },
          { name: 'Matching supporting records', text: 'Invoices, contracts, tax records, or commission statements help explain the source of funds.' },
          { name: 'Clearer separation of business and personal movement', text: 'Mixed, unexplained transfers make the file harder to trust.' },
          { name: 'A realistic average, not only peak months', text: 'An annualised or multi-month average is usually more credible than one exceptional period.' },
        ],
      },
    },
    ms: {
      eyebrow: 'Panduan Peminjam Bekerja Sendiri',
      title: 'Bagaimana Peminjam Bekerja Sendiri Patut Buktikan Pendapatan di Malaysia',
      lede: 'Cara membentangkan pendapatan perniagaan, freelance, gig, atau komisen dalam bentuk yang lender benar-benar boleh nilai.',
      sections: [
        {
          kind: 'steps',
          id: 'stronger-files',
          heading: 'Apa yang biasanya ada pada fail yang lebih kuat',
          steps: [
            { title: 'Aliran masuk bank yang stabil', description: 'Kredit berulang biasanya membantu lebih daripada satu bulan kuat tanpa corak.' },
            { title: 'Rekod sokongan yang sepadan', description: 'Invois, kontrak, rekod cukai, atau penyata komisen membantu menjelaskan sumber dana.' },
            { title: 'Pemisahan lebih jelas antara pergerakan perniagaan dan peribadi', description: 'Pindahan bercampur yang tidak dijelaskan menjadikan fail lebih sukar dipercayai.' },
            { title: 'Purata yang realistik, bukan hanya bulan puncak', description: 'Purata tahunan atau berbilang bulan biasanya lebih kredibel daripada satu tempoh luar biasa.' },
          ],
        },
        {
          kind: 'checklist',
          id: 'proof-that-helps',
          heading: 'Bukti yang biasanya membantu',
          items: [
            'Penyata bank perniagaan',
            'Sokongan cukai atau filing jika ada',
            'Invois, kontrak, atau penyata komisen',
            'Penjelasan sumber pendapatan yang konsisten',
          ],
        },
      ],
      howTo: {
        name: 'Apa yang Biasanya Ada pada Fail yang Lebih Kuat',
        description: 'Cara membentangkan pendapatan perniagaan, freelance, gig, atau komisen dalam bentuk yang lender benar-benar boleh nilai.',
        steps: [
          { name: 'Aliran masuk bank yang stabil', text: 'Kredit berulang biasanya membantu lebih daripada satu bulan kuat tanpa corak.' },
          { name: 'Rekod sokongan yang sepadan', text: 'Invois, kontrak, rekod cukai, atau penyata komisen membantu menjelaskan sumber dana.' },
          { name: 'Pemisahan lebih jelas antara pergerakan perniagaan dan peribadi', text: 'Pindahan bercampur yang tidak dijelaskan menjadikan fail lebih sukar dipercayai.' },
          { name: 'Purata yang realistik, bukan hanya bulan puncak', text: 'Purata tahunan atau berbilang bulan biasanya lebih kredibel daripada satu tempoh luar biasa.' },
        ],
      },
    },
  },
};
