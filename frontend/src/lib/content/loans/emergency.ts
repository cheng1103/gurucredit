import { TRUST_BLOCK } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { LoanProductDoc } from './types';

export const emergencyLoan: LoanProductDoc = {
  slug: 'emergency',
  path: PATHS.loans.emergency,
  content: {
    en: {
      eyebrow: 'Urgent Financial Help',
      title: 'Emergency Loan Malaysia',
      lede: 'Fast guidance when you need it most — same-day analysis for urgent financial needs.',
      urgentBanner: {
        title: 'Need Cash Today?',
        body: 'Priority processing for medical, vehicle and household emergencies. Call us for same-day review.',
      },
      stats: [
        { value: '2–4hrs', label: 'Express analysis' },
        { value: 'RM50k', label: 'Up to amount' },
        { value: '24/7', label: 'Application' },
        { value: '4.88%', label: 'From rate' },
      ],
      situations: {
        title: 'Common Emergency Situations We Help With',
        items: [
          { title: 'Medical emergencies', description: 'Hospital bills, surgery costs, or unexpected medical expenses.' },
          { title: 'Car repairs', description: 'Urgent vehicle repairs needed to get back to work.' },
          { title: 'Home repairs', description: 'A leaking roof, broken pipes, or essential home fixes.' },
          { title: 'Family emergencies', description: 'Funeral costs, urgent travel, or family support.' },
          { title: 'Business cash flow', description: 'Cover payroll, suppliers, or urgent business needs.' },
          { title: 'Overdue bills', description: 'Prevent utility cutoffs or late payment penalties.' },
        ],
      },
      benefits: {
        title: 'Why Choose Our Emergency Loans?',
        items: [
          { title: 'Express processing', description: 'Priority handling for urgent cases — analysis within 2–4 hours once documents are complete.' },
          { title: 'Minimal documents', description: 'Just IC, salary slip, and bank statement. We keep paperwork to a minimum.' },
          { title: 'No collateral', description: 'Unsecured personal loans — no need to put up assets as security.' },
          { title: 'Flexible repayment', description: 'Choose a tenure from 1–7 years and adjust payments to fit your budget.' },
        ],
      },
      process: {
        title: 'Emergency Loan Process',
        subtitle: 'Get lender-ready in 3 simple steps.',
        steps: [
          { title: 'Apply online or call', description: 'Submit online, or call us directly for faster processing. Takes about 5 minutes.' },
          { title: 'Quick verification', description: 'Our team verifies your documents and completes your eligibility analysis in 2–4 hours.' },
          { title: 'Submit to bank', description: 'We submit to the right lenders and guide your follow-up — same day if documents are complete.' },
        ],
      },
      requirements: {
        title: 'Basic Requirements',
        items: [
          'Malaysian citizen or PR',
          'Age 21–60 years old',
          'Minimum income RM2,000/month',
          'Working for at least 6 months',
          'Valid bank account',
        ],
      },
      documents: {
        title: 'Documents Needed',
        items: [
          'IC (MyKad) — front and back',
          'Latest 3 months’ salary slips',
          'Latest 3 months’ bank statement',
          'Employment confirmation letter (if available)',
        ],
      },
      tips: {
        title: 'Tips for Faster Processing',
        items: [
          'Have all documents ready before applying',
          'Ensure your salary slip matches your bank statement deposits',
          'Apply during business hours (9am–6pm) for same-day analysis',
          'Call ahead if your case is extremely urgent',
        ],
      },
      faq: {
        title: 'Emergency Loan FAQ',
        items: [
          { question: 'How fast can my application be submitted?', answer: 'With complete documents, analysis can happen within 2–4 hours and submission the same day. Approval timelines depend on the bank.' },
          { question: 'What documents are required?', answer: 'Typically IC, latest salary slips, and recent bank statements.' },
          { question: 'Is collateral needed?', answer: 'No. Emergency loans are unsecured personal loans.' },
        ],
      },
      trust: TRUST_BLOCK.en,
      cta: {
        title: 'Need Emergency Cash Now?',
        description: 'Apply now or reach us directly for priority processing. We understand urgency.',
        primary: 'Apply Now',
        secondary: 'WhatsApp Us',
      },
    },
    ms: {
      eyebrow: 'Bantuan Kewangan Segera',
      title: 'Pinjaman Kecemasan Malaysia',
      lede: 'Panduan pantas bila anda perlukan — analisis hari yang sama untuk keperluan kewangan segera.',
      urgentBanner: {
        title: 'Perlukan Wang Hari Ini?',
        body: 'Pemprosesan keutamaan untuk kecemasan perubatan, kenderaan dan isi rumah. Hubungi kami untuk semakan hari yang sama.',
      },
      stats: [
        { value: '2–4jam', label: 'Analisis ekspres' },
        { value: 'RM50k', label: 'Sehingga jumlah' },
        { value: '24/7', label: 'Permohonan' },
        { value: '4.88%', label: 'Dari kadar' },
      ],
      situations: {
        title: 'Situasi Kecemasan Yang Kami Bantu',
        items: [
          { title: 'Kecemasan perubatan', description: 'Bil hospital, kos pembedahan, atau perbelanjaan perubatan tidak dijangka.' },
          { title: 'Pembaikan kereta', description: 'Pembaikan kenderaan segera diperlukan untuk kembali bekerja.' },
          { title: 'Pembaikan rumah', description: 'Bumbung bocor, paip pecah, atau pembaikan rumah penting.' },
          { title: 'Kecemasan keluarga', description: 'Kos pengebumian, perjalanan segera, atau sokongan keluarga.' },
          { title: 'Aliran tunai perniagaan', description: 'Tampung gaji, pembekal, atau keperluan perniagaan segera.' },
          { title: 'Bil tertunggak', description: 'Elakkan pemutusan utiliti atau penalti bayaran lewat.' },
        ],
      },
      benefits: {
        title: 'Mengapa Pilih Pinjaman Kecemasan Kami?',
        items: [
          { title: 'Pemprosesan ekspres', description: 'Pengendalian keutamaan untuk kes segera — analisis siap dalam 2–4 jam apabila dokumen lengkap.' },
          { title: 'Dokumen minimum', description: 'Hanya IC, slip gaji, dan penyata bank. Kami minimumkan kertas kerja.' },
          { title: 'Tiada cagaran', description: 'Pinjaman peribadi tanpa cagaran — tiada keperluan meletakkan aset sebagai jaminan.' },
          { title: 'Bayaran balik fleksibel', description: 'Pilih tempoh dari 1–7 tahun dan sesuaikan bayaran mengikut bajet anda.' },
        ],
      },
      process: {
        title: 'Proses Pinjaman Kecemasan',
        subtitle: 'Sedia untuk bank dalam 3 langkah mudah.',
        steps: [
          { title: 'Mohon dalam talian atau hubungi', description: 'Hantar permohonan dalam talian, atau hubungi kami terus untuk pemprosesan lebih cepat. Ambil masa sekitar 5 minit.' },
          { title: 'Pengesahan cepat', description: 'Pasukan kami sahkan dokumen anda dan siapkan analisis kelayakan dalam 2–4 jam.' },
          { title: 'Hantar ke bank', description: 'Kami hantar ke bank yang sesuai dan pandu susulan anda — hari yang sama jika dokumen lengkap.' },
        ],
      },
      requirements: {
        title: 'Syarat Asas',
        items: [
          'Warganegara Malaysia atau PR',
          'Umur 21–60 tahun',
          'Pendapatan minimum RM2,000/bulan',
          'Bekerja sekurang-kurangnya 6 bulan',
          'Akaun bank yang sah',
        ],
      },
      documents: {
        title: 'Dokumen Diperlukan',
        items: [
          'IC (MyKad) — depan dan belakang',
          'Slip gaji 3 bulan terkini',
          'Penyata bank 3 bulan terkini',
          'Surat pengesahan majikan (jika ada)',
        ],
      },
      tips: {
        title: 'Tip untuk Proses Lebih Cepat',
        items: [
          'Sediakan semua dokumen sebelum memohon',
          'Pastikan slip gaji sepadan dengan deposit penyata bank anda',
          'Mohon semasa waktu perniagaan (9pg–6ptg) untuk analisis hari sama',
          'Hubungi terlebih dahulu jika kes anda sangat segera',
        ],
      },
      faq: {
        title: 'Soalan Lazim Pinjaman Kecemasan',
        items: [
          { question: 'Berapa cepat permohonan saya boleh dihantar?', answer: 'Jika dokumen lengkap, analisis siap dalam 2–4 jam dan penghantaran boleh dibuat hari yang sama. Tempoh kelulusan bergantung pada bank.' },
          { question: 'Dokumen apa diperlukan?', answer: 'Kebiasaannya IC, slip gaji terkini, dan penyata bank terkini.' },
          { question: 'Perlukah cagaran?', answer: 'Tidak. Pinjaman kecemasan adalah pinjaman peribadi tanpa cagaran.' },
        ],
      },
      trust: TRUST_BLOCK.ms,
      cta: {
        title: 'Perlukan Wang Tunai Kecemasan Sekarang?',
        description: 'Mohon sekarang atau hubungi kami terus untuk pemprosesan keutamaan. Kami faham kesegeraan.',
        primary: 'Mohon Sekarang',
        secondary: 'WhatsApp Kami',
      },
    },
  },
};
