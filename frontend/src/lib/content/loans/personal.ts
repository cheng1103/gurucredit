import { TRUST_BLOCK } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { LoanProductDoc } from './types';

export const personalLoan: LoanProductDoc = {
  slug: 'personal',
  path: PATHS.loans.personal,
  content: {
    en: {
      eyebrow: 'Guided Personal Financing',
      title: 'Personal Loan Malaysia',
      lede: 'A tailored offer and DSR strategy to unlock up to RM100,000 in personal financing, from 4.88% flat p.a.',
      stats: [
        { value: 'RM100k', label: 'Max amount' },
        { value: '4.88%', label: 'From rate' },
        { value: '24h', label: 'Analysis speed' },
        { value: '7 yrs', label: 'Max tenure' },
      ],
      benefits: {
        title: 'Why Borrow With Guidance?',
        items: [
          { title: 'Faster access', description: 'We pre-check your DSR and documents so bank responses come sooner.' },
          { title: 'Better offers', description: 'We compare banks matched to your profile to negotiate lower flat rates.' },
          { title: 'Cleaner credit', description: 'We spot CTOS/CCRIS issues early to avoid unnecessary rejections.' },
          { title: 'Stress-free process', description: 'We manage follow-ups, timelines, and insurer upsells so you stay in control.' },
        ],
      },
      comparison: {
        title: 'Sample Funding Scenario',
        before: {
          title: 'Without Guidance',
          items: [
            { name: 'Random Bank A', rate: '8.5%', payment: 'RM1,950' },
            { name: 'Random Bank B', rate: '9.9%', payment: 'RM2,050' },
            { name: 'Fees & insurance', rate: 'RM2,000', payment: 'Paid upfront' },
          ],
          totalLabel: 'Cash needed / higher monthly',
          total: 'RM4,000+ upfront',
        },
        after: {
          title: 'With GURU Credits Plan',
          rate: '4.88% – 6.5%',
          payment: 'RM1,480/month',
          savingsLabel: 'Potential savings',
          savings: 'RM570+/month',
        },
      },
      eligibility: {
        title: 'Ideal Personal Loan Candidates',
        items: [
          'Monthly income RM2,500+ with 6 months in the role',
          'DSR below 65% after consolidation',
          'Clean or resolved CCRIS/CTOS within 12 months',
          'Company-listed employer or verified business income',
          'Need funds for medical, education, renovation, or debt consolidation',
        ],
      },
      process: {
        title: 'How It Works',
        subtitle: 'A guided 4-step path from profile to payout.',
        steps: [
          { title: 'Share your profile', description: 'Income, commitments, CCRIS/CTOS, and your target amount.' },
          { title: 'Receive a strategy', description: 'We run your DSR, shortlist banks, and prep documents.' },
          { title: 'Submit and follow up', description: 'We coordinate submission and any insurer requirements.' },
          { title: 'Funds disbursed', description: 'Track payout status and repayment reminders.' },
        ],
      },
      warning: {
        title: 'Need to Know',
        items: [
          'Flat rates look lower than effective rates — we calculate both for you',
          'Bundled insurance may be offered; we benchmark whether it is optional',
          'Multiple simultaneous applications can hurt your approval odds',
        ],
      },
      faq: {
        title: 'Personal Loan FAQ',
        items: [
          { question: 'How fast can a decision happen?', answer: 'With complete documents, some banks respond within 24–48 hours, though timelines vary by lender.' },
          { question: 'What DSR is acceptable?', answer: 'Most banks prefer a DSR below 65%, with stronger odds below 55%.' },
          { question: 'Are flat rates the same as effective rates?', answer: 'No. Flat rates appear lower; effective rates show the true annual cost.' },
        ],
      },
      trust: TRUST_BLOCK.en,
      cta: {
        title: 'Ready to Unlock RM100k?',
        description: 'Start with a RM30 analysis covering DSR review, CCRIS/CTOS audit, and a tailored loan offer.',
        primary: 'Book My Analysis',
        secondary: 'Chat on WhatsApp',
      },
    },
    ms: {
      eyebrow: 'Pinjaman Peribadi Berpandu',
      title: 'Pinjaman Peribadi Malaysia',
      lede: 'Tawaran pinjaman dan strategi DSR untuk dapatkan sehingga RM100,000 dalam pembiayaan peribadi, bermula 4.88% setahun.',
      stats: [
        { value: 'RM100k', label: 'Jumlah maksimum' },
        { value: '4.88%', label: 'Kadar dari' },
        { value: '24j', label: 'Masa analisis' },
        { value: '7 thn', label: 'Tempoh maksimum' },
      ],
      benefits: {
        title: 'Mengapa Berpandu Semasa Meminjam?',
        items: [
          { title: 'Akses lebih pantas', description: 'Kami semak DSR dan dokumen awal supaya bank boleh balas lebih cepat.' },
          { title: 'Tawaran lebih baik', description: 'Kami banding bank yang sepadan dengan profil anda untuk runding kadar lebih rendah.' },
          { title: 'Rekod lebih bersih', description: 'Kami kenal pasti isu CTOS/CCRIS awal untuk elak penolakan yang tidak perlu.' },
          { title: 'Proses tanpa tekanan', description: 'Kami urus susulan, garis masa, dan tawaran insurans supaya anda kekal terkawal.' },
        ],
      },
      comparison: {
        title: 'Senario Pembiayaan Contoh',
        before: {
          title: 'Tanpa Bimbingan',
          items: [
            { name: 'Bank Rawak A', rate: '8.5%', payment: 'RM1,950' },
            { name: 'Bank Rawak B', rate: '9.9%', payment: 'RM2,050' },
            { name: 'Yuran & insurans', rate: 'RM2,000', payment: 'Bayar awal' },
          ],
          totalLabel: 'Tunai diperlukan / bayaran lebih tinggi',
          total: 'RM4,000+ tunai awal',
        },
        after: {
          title: 'Dengan Pelan GURU Credits',
          rate: '4.88% – 6.5%',
          payment: 'RM1,480/bulan',
          savingsLabel: 'Potensi jimatan',
          savings: 'RM570+/bulan',
        },
      },
      eligibility: {
        title: 'Calon Ideal Pinjaman Peribadi',
        items: [
          'Pendapatan bulanan RM2,500+ dengan 6 bulan dalam jawatan',
          'DSR di bawah 65% selepas penyatuan',
          'CCRIS/CTOS bersih atau diselesaikan dalam 12 bulan',
          'Majikan tersenarai atau pendapatan perniagaan yang disahkan',
          'Dana untuk perubatan, pendidikan, renovasi, atau penyatuan hutang',
        ],
      },
      process: {
        title: 'Cara Ia Berfungsi',
        subtitle: 'Laluan berpandu 4 langkah dari profil hingga pembayaran.',
        steps: [
          { title: 'Kongsi profil anda', description: 'Pendapatan, komitmen, CCRIS/CTOS, dan jumlah sasaran.' },
          { title: 'Terima strategi', description: 'Kami kira DSR, pilih bank, dan sediakan dokumen.' },
          { title: 'Hantar dan susulan', description: 'Kami urus penghantaran dan sebarang keperluan insurans.' },
          { title: 'Dana dimasukkan', description: 'Jejak status pembayaran dan peringatan bayaran semula.' },
        ],
      },
      warning: {
        title: 'Perkara Penting',
        items: [
          'Kadar rata nampak lebih rendah berbanding kadar efektif — kami kira kedua-duanya untuk anda',
          'Insurans berikat mungkin ditawarkan; kami semak sama ada ia wajib',
          'Permohonan serentak berganda boleh menjejaskan peluang kelulusan',
        ],
      },
      faq: {
        title: 'Soalan Lazim Pinjaman Peribadi',
        items: [
          { question: 'Berapa cepat keputusan boleh berlaku?', answer: 'Jika dokumen lengkap, sesetengah bank boleh balas dalam 24–48 jam, tetapi tempoh berbeza mengikut bank.' },
          { question: 'DSR berapa yang diterima?', answer: 'Kebanyakan bank mahu DSR di bawah 65%, dengan peluang lebih kuat di bawah 55%.' },
          { question: 'Adakah kadar rata sama dengan kadar efektif?', answer: 'Tidak. Kadar rata nampak lebih rendah; kadar efektif menunjukkan kos tahunan sebenar.' },
        ],
      },
      trust: TRUST_BLOCK.ms,
      cta: {
        title: 'Sedia Dapatkan RM100k?',
        description: 'Mula dengan analisis RM30 merangkumi semakan DSR, audit CCRIS/CTOS, dan tawaran pinjaman yang disesuaikan.',
        primary: 'Tempah Analisis Saya',
        secondary: 'Sembang di WhatsApp',
      },
    },
  },
};
