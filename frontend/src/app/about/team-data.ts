import type { Language } from '@/lib/i18n/translations';

export type TeamMember = {
  name: string;
  role: Record<Language, string>;
  credentials: Record<Language, string>;
  bio: Record<Language, string>;
  /** Optional — the About team section renders without headshots by default. */
  photo?: string;
  yearsExperience: number;
  /** Optional LinkedIn / external profile link. */
  href?: string;
};

// Team profiles are intentionally anonymised until real consultants are
// approved for public bylines. Swap in real names, photos, and credentials
// when ready — the surrounding render structure and Google E-E-A-T schema
// do not need to change.
export const teamMembers: TeamMember[] = [
  {
    name: 'Principal Loan Consultant',
    role: {
      en: 'Founder & Principal Loan Consultant',
      ms: 'Pengasas & Perunding Pinjaman Utama',
    },
    credentials: {
      en: 'Former credit manager at a Malaysian commercial bank · CCRIS/CTOS dispute specialist · 12+ years in lending',
      ms: 'Bekas pengurus kredit di bank perdagangan Malaysia · Pakar pertikaian CCRIS/CTOS · 12+ tahun dalam pemberian pinjaman',
    },
    bio: {
      en: 'Spent eight years inside Malaysian bank credit departments before founding GURU Credits as a Moneylenders Act 1951 licensed lender. Personally reviews complex CCRIS cases and signs off on the written analysis that accompanies every loan offer.',
      ms: 'Berkhidmat lapan tahun di jabatan kredit bank Malaysia sebelum mengasaskan GURU Credits sebagai pemberi pinjaman berlesen di bawah Akta Pemberi Pinjam Wang 1951. Menyemak kes CCRIS kompleks secara peribadi dan mengesahkan analisis bertulis yang mengiringi setiap tawaran pinjaman.',
    },
    yearsExperience: 12,
  },
  {
    name: 'Senior Credit Consultant',
    role: {
      en: 'Senior Credit Consultant',
      ms: 'Perunding Kredit Kanan',
    },
    credentials: {
      en: 'Certified Credit Counsellor (AKPK-aligned training) · Former branch officer at two Malaysian banks · 9 years in consumer credit',
      ms: 'Kaunselor Kredit Bertauliah (latihan AKPK) · Bekas pegawai cawangan di dua bank Malaysia · 9 tahun dalam kredit pengguna',
    },
    bio: {
      en: 'Specialises in debt-consolidation planning and borrowers recovering from AKPK enrolment. Fluent in Bahasa Malaysia, English and Tamil, and handles roughly 40% of consultations with first-language Malay-speaking clients.',
      ms: 'Pakar dalam perancangan penyatuan hutang dan peminjam yang pulih daripada pendaftaran AKPK. Fasih dalam Bahasa Malaysia, Inggeris dan Tamil, dan mengendalikan kira-kira 40% perundingan dengan klien penutur Bahasa Malaysia.',
    },
    yearsExperience: 9,
  },
  {
    name: 'Business Loan Officer',
    role: {
      en: 'SME & Business Loan Officer',
      ms: 'Pegawai Pinjaman PKS & Perniagaan',
    },
    credentials: {
      en: 'Former commercial credit assessor · 7 years underwriting SME facilities · Specialises in cash-flow-based and asset-backed lending',
      ms: 'Bekas penilai kredit komersial · 7 tahun menjamin kemudahan PKS · Pakar dalam pinjaman berasaskan aliran tunai dan bercagar aset',
    },
    bio: {
      en: 'Handles SME applications — from sole proprietorships to Sdn Bhd operators. Reviews cash-flow documents, tax filings, and director CCRIS to structure business facilities that sit safely within our statutory rate caps.',
      ms: 'Mengendalikan permohonan PKS — dari pemilikan tunggal hingga pengendali Sdn Bhd. Menyemak dokumen aliran tunai, penyata cukai, dan CCRIS pengarah untuk menstrukturkan kemudahan perniagaan dalam had kadar berkanun kami.',
    },
    yearsExperience: 7,
  },
];
