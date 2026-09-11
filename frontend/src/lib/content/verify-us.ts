import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';

export type VerifyUsSection =
  | { kind: 'checklist'; id: string; heading: string; intro?: string; items: string[] }
  | { kind: 'warnings'; id: string; heading: string; items: string[] }
  | { kind: 'links'; id: string; heading: string; items: { label: string; href: string; external?: boolean }[] };

export interface VerifyUsContent {
  eyebrow: string;
  title: string;
  lede: string;
  breadcrumbLabel: string;
  sections: VerifyUsSection[];
  team: { title: string; intro: string };
}

export const verifyUsContent: Record<Language, VerifyUsContent> = {
  en: {
    eyebrow: 'Trust & Verification',
    title: 'Verify us before you submit documents or payment',
    lede: 'Borrowers should be able to verify who we are, which channels are official, how documents are handled, and what a legitimate process looks like before committing to any loan discussion.',
    breadcrumbLabel: 'Verify Us',
    sections: [
      {
        kind: 'checklist',
        id: 'who',
        heading: '1. Confirm our operating identity',
        intro: 'Use these details as your baseline before you continue any conversation with us.',
        items: [
          'Brand used for borrower-facing communication: GURU Credits',
          'Official office address: Level 5, 13A, Jalan Semantan, Damansara Heights, 50490 Kuala Lumpur',
          'Official phone and WhatsApp must match the numbers shown on this website',
          'We only direct borrowers through our official website, email, and WhatsApp channels',
        ],
      },
      {
        kind: 'checklist',
        id: 'process',
        heading: '2. Know what a legitimate process looks like',
        items: [
          'We start with eligibility review, borrower profile checks, and document readiness — not instant guaranteed approval.',
          'We explain the next step, what documents are needed, and why they are relevant to the review.',
          'Payment instructions, when applicable, are shared only through our official WhatsApp flow after basic verification.',
          'We expect borrowers to read written explanations, not rely on screenshots or verbal promises alone.',
        ],
      },
      {
        kind: 'warnings',
        id: 'red-flags',
        heading: '3. Stop if you see these red flags',
        items: [
          'A request to transfer money to a personal account without a clear written explanation.',
          'Pressure to pay immediately before you understand the purpose of the fee or the process.',
          'Claims of guaranteed approval without looking at CCRIS, CTOS, income, or commitments.',
          'A mismatch between the website contact details and the person contacting you.',
        ],
      },
      {
        kind: 'checklist',
        id: 'privacy',
        heading: '4. How we handle data and documents',
        items: [
          'We follow PDPA-aligned handling for borrower information and limit document requests to what is relevant for the stage of review.',
          'We do not ask borrowers to upload every sensitive document blindly at the first touchpoint.',
          'Privacy, terms, and disclaimer pages are publicly available so borrowers can review them before proceeding.',
        ],
      },
      {
        kind: 'links',
        id: 'official',
        heading: 'Official resources you can cross-check',
        items: [
          { label: 'Privacy Policy', href: PATHS.privacy },
          { label: 'Disclaimer', href: PATHS.disclaimer },
          { label: 'Editorial Policy', href: PATHS.editorialPolicy },
          { label: 'Review Methodology', href: PATHS.reviewMethodology },
          { label: 'Service Areas', href: PATHS.serviceAreas },
          { label: 'Contact Page', href: PATHS.contact },
          { label: 'FAQ', href: PATHS.faq },
        ],
      },
      {
        kind: 'links',
        id: 'external',
        heading: 'Public Malaysian resources',
        items: [
          { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my', external: true },
          { label: 'AKPK', href: 'https://www.akpk.org.my', external: true },
          { label: 'BNMTELELINK', href: 'https://telelink.bnm.gov.my', external: true },
        ],
      },
    ],
    team: {
      title: 'Who reviews your case',
      intro: 'The borrower-facing brand is supported by specialists who work on credit review, SME facilities, and recovery cases.',
    },
  },
  ms: {
    eyebrow: 'Kepercayaan & Pengesahan',
    title: 'Sahkan kami dahulu sebelum hantar dokumen atau bayaran',
    lede: 'Peminjam patut boleh menyemak siapa kami, saluran rasmi yang digunakan, cara dokumen dikendalikan, dan bagaimana proses yang sah kelihatan sebelum komited kepada sebarang perbincangan pinjaman.',
    breadcrumbLabel: 'Sahkan Kami',
    sections: [
      {
        kind: 'checklist',
        id: 'who',
        heading: '1. Sahkan identiti operasi kami',
        intro: 'Gunakan butiran ini sebagai asas semakan sebelum meneruskan perbualan dengan kami.',
        items: [
          'Jenama yang digunakan untuk komunikasi dengan peminjam: GURU Credits',
          'Alamat pejabat rasmi: Level 5, 13A, Jalan Semantan, Damansara Heights, 50490 Kuala Lumpur',
          'Telefon dan WhatsApp rasmi mesti sepadan dengan nombor yang dipaparkan di laman web ini',
          'Kami hanya mengarahkan peminjam melalui laman web rasmi, e-mel, dan saluran WhatsApp rasmi kami',
        ],
      },
      {
        kind: 'checklist',
        id: 'process',
        heading: '2. Fahami rupa proses yang sah',
        items: [
          'Kami bermula dengan semakan kelayakan, profil peminjam, dan kesediaan dokumen — bukan janji lulus serta-merta.',
          'Kami menerangkan langkah seterusnya, dokumen yang diperlukan, dan mengapa ia relevan kepada semakan.',
          'Arahan bayaran, jika berkaitan, hanya dikongsi melalui aliran WhatsApp rasmi selepas pengesahan asas dibuat.',
          'Kami mengharapkan peminjam membaca penjelasan bertulis, bukan bergantung pada tangkap layar atau janji lisan semata-mata.',
        ],
      },
      {
        kind: 'warnings',
        id: 'red-flags',
        heading: '3. Berhenti jika anda nampak tanda amaran ini',
        items: [
          'Permintaan pindahan wang ke akaun peribadi tanpa penjelasan bertulis yang jelas.',
          'Tekanan untuk bayar segera sebelum anda faham tujuan yuran atau proses sebenar.',
          'Dakwaan kelulusan pasti tanpa melihat CCRIS, CTOS, pendapatan, atau komitmen.',
          'Maklumat hubungan di laman web tidak sepadan dengan individu yang menghubungi anda.',
        ],
      },
      {
        kind: 'checklist',
        id: 'privacy',
        heading: '4. Cara kami mengendalikan data dan dokumen',
        items: [
          'Kami mengikuti pengendalian yang selari dengan PDPA untuk maklumat peminjam dan mengehadkan permintaan dokumen kepada tahap semakan yang relevan.',
          'Kami tidak meminta semua dokumen sensitif dimuat naik secara membuta tuli pada sentuhan pertama.',
          'Halaman privasi, terma, dan penafian tersedia secara terbuka untuk disemak sebelum anda meneruskan.',
        ],
      },
      {
        kind: 'links',
        id: 'official',
        heading: 'Sumber rasmi dalaman untuk anda semak',
        items: [
          { label: 'Dasar Privasi', href: PATHS.privacy },
          { label: 'Penafian', href: PATHS.disclaimer },
          { label: 'Dasar Editorial', href: PATHS.editorialPolicy },
          { label: 'Metodologi Semakan', href: PATHS.reviewMethodology },
          { label: 'Kawasan Perkhidmatan', href: PATHS.serviceAreas },
          { label: 'Halaman Hubungi', href: PATHS.contact },
          { label: 'Soalan Lazim', href: PATHS.faq },
        ],
      },
      {
        kind: 'links',
        id: 'external',
        heading: 'Sumber awam Malaysia',
        items: [
          { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my', external: true },
          { label: 'AKPK', href: 'https://www.akpk.org.my', external: true },
          { label: 'BNMTELELINK', href: 'https://telelink.bnm.gov.my', external: true },
        ],
      },
    ],
    team: {
      title: 'Siapa yang menyemak kes anda',
      intro: 'Jenama ini disokong oleh pakar yang bekerja pada semakan kredit, kemudahan PKS, dan kes pemulihan fail.',
    },
  },
};
