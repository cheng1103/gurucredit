import { PATHS } from '@/lib/i18n/routes';

export type ResultLevel = 'excellent' | 'good' | 'fair' | 'poor';

export function getResultLevel(score: number): ResultLevel {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

// Question scores (language-independent — index maps to the option chosen).
export const questionScores: number[][] = [
  [20, 50, 80, 100], // Question 1
  [100, 70, 40, 60], // Question 2
  [100, 70, 40, 10], // Question 3
  [100, 60, 20, 0], // Question 4
  [100, 60, 0, 50], // Question 5
];

export const eligibilityResourceLinks = [
  { key: 'dsrGuide', href: PATHS.blogPost('understanding-dsr-debt-service-ratio') },
  { key: 'compare', href: PATHS.toolsCompare },
  { key: 'creditScore', href: PATHS.blogPost('how-to-improve-credit-score-malaysia') },
] as const;

export const eligibilityUi = {
  en: {
    page: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Eligibility Test',
      badge: 'Quick Assessment',
      title: 'Loan Eligibility',
      titleHighlight: 'Quick Test',
      description: 'Answer 5 simple questions to get an instant assessment of your loan eligibility.',
      note: 'No login required. Takes about 2 minutes to complete.',
    },
    valueProps: [
      { title: 'Instant feedback', description: 'See how each answer impacts your eligibility.' },
      { title: 'DSR-aware guidance', description: 'Get clarity on debt-to-income and credit history.' },
      { title: 'Next-step plan', description: 'Clear actions to boost your approval odds.' },
    ],
    progress: { question: 'Question', of: 'of', complete: 'Complete' },
    questions: [
      {
        question: 'What is your monthly gross income?',
        options: [
          { label: 'Below RM3,000', feedback: 'Limited loan options' },
          { label: 'RM3,000 - RM5,000', feedback: 'Basic eligibility' },
          { label: 'RM5,000 - RM10,000', feedback: 'Good eligibility' },
          { label: 'Above RM10,000', feedback: 'Excellent eligibility' },
        ],
      },
      {
        question: 'What is your current employment status?',
        options: [
          { label: 'Permanent employee (2+ years)', feedback: 'Best for eligibility' },
          { label: 'Permanent employee (< 2 years)', feedback: 'Generally acceptable' },
          { label: 'Contract/Temporary', feedback: 'Limited options' },
          { label: 'Self-employed', feedback: 'Need more documentation' },
        ],
      },
      {
        question: 'How much of your income goes to existing debt payments?',
        options: [
          { label: 'Less than 30%', feedback: 'Excellent DSR' },
          { label: '30% - 50%', feedback: 'Acceptable DSR' },
          { label: '50% - 70%', feedback: 'High DSR - limited options' },
          { label: 'More than 70%', feedback: 'Critical DSR - likely rejection' },
        ],
      },
      {
        question: 'Have you ever missed any loan/credit card payment?',
        options: [
          { label: 'Never missed a payment', feedback: 'Clean credit history' },
          { label: 'Missed 1-2 times (resolved)', feedback: 'Minor impact' },
          { label: 'Multiple missed payments', feedback: 'Significant impact' },
          { label: 'Currently in arrears', feedback: 'Major red flag' },
        ],
      },
      {
        question: 'Do you have an active CCRIS/CTOS record?',
        options: [
          { label: 'Clean record / Never checked', feedback: 'No issues' },
          { label: 'Minor issues (settled)', feedback: 'May need explanation' },
          { label: 'Active legal case / Bankruptcy', feedback: 'Likely disqualified' },
          { label: 'Not sure', feedback: 'Recommend checking' },
        ],
      },
    ],
    navigation: { previous: 'Previous question' },
    result: { yourScore: 'Your score', recommendations: 'Recommendations', basedOn: 'Based on your assessment' },
    results: {
      excellent: {
        title: 'Excellent Eligibility!',
        description: 'Based on your answers, you have a strong eligibility profile. Many banks may view your application favorably.',
        recommendations: [
          'You qualify for most banks and loan products',
          'Negotiate for better interest rates',
          'Consider premium loan packages with extra benefits',
          'Shop around for the best deal',
        ],
      },
      good: {
        title: 'Good Eligibility',
        description: 'You have a reasonable eligibility profile, though some banks may have stricter requirements.',
        recommendations: [
          'Focus on banks with flexible criteria',
          'Prepare all documents thoroughly',
          'Consider reducing existing debts first',
          'Our analysis can identify the best banks for your profile',
        ],
      },
      fair: {
        title: 'Fair Eligibility',
        description: 'Your eligibility is borderline. Some improvements may be needed before applying.',
        recommendations: [
          'Consider paying down existing debts',
          'Improve your credit record if possible',
          'Look for a guarantor or co-borrower',
          'Get professional advice before applying',
        ],
      },
      poor: {
        title: 'Needs Improvement',
        description: 'Based on your answers, you may face challenges with eligibility. We recommend addressing some issues first.',
        recommendations: [
          'Focus on improving your credit score',
          'Reduce your debt-to-income ratio',
          'Resolve any outstanding credit issues',
          'Consider our credit repair consultation service',
        ],
      },
    },
    cta: {
      title: 'Want a Detailed Analysis?',
      description: 'Get a comprehensive credit analysis with personalized bank recommendations for just RM30.',
      getAnalysis: 'Get full analysis',
      chat: 'Chat with us',
    },
    restart: 'Take test again',
    disclaimer: 'This is a quick assessment tool for informational purposes only. Actual loan approval depends on many factors. Get our professional analysis for accurate results.',
    resources: {
      title: 'Plan your next step',
      button: 'Visit',
      labels: {
        dsrGuide: 'Read the DSR Guide',
        compare: 'Compare Loans Side by Side',
        creditScore: 'Read the Credit Score Improvement Guide',
      },
      descriptions: {
        dsrGuide: 'Understand how lenders calculate your debt service ratio.',
        compare: 'See rates and terms across banks and loan products.',
        creditScore: 'Steps to raise your CCRIS/CTOS profile before applying.',
      },
    },
  },
  ms: {
    page: {
      breadcrumbHome: 'Utama',
      breadcrumbCurrent: 'Ujian Kelayakan',
      badge: 'Penilaian Pantas',
      title: 'Kelayakan Pinjaman',
      titleHighlight: 'Ujian Pantas',
      description: 'Jawab 5 soalan mudah untuk mendapatkan penilaian segera kelayakan pinjaman anda.',
      note: 'Tiada log masuk diperlukan. Siap dalam lebih kurang 2 minit.',
    },
    valueProps: [
      { title: 'Maklum balas segera', description: 'Lihat kesan setiap jawapan pada kelayakan anda.' },
      { title: 'Panduan berasaskan DSR', description: 'Fahami nisbah hutang dan sejarah kredit anda.' },
      { title: 'Pelan tindakan jelas', description: 'Langkah seterusnya untuk meningkatkan peluang.' },
    ],
    progress: { question: 'Soalan', of: 'daripada', complete: 'Selesai' },
    questions: [
      {
        question: 'Berapakah pendapatan kasar bulanan anda?',
        options: [
          { label: 'Bawah RM3,000', feedback: 'Pilihan pinjaman terhad' },
          { label: 'RM3,000 - RM5,000', feedback: 'Kelayakan asas' },
          { label: 'RM5,000 - RM10,000', feedback: 'Kelayakan baik' },
          { label: 'Atas RM10,000', feedback: 'Kelayakan cemerlang' },
        ],
      },
      {
        question: 'Apakah status pekerjaan semasa anda?',
        options: [
          { label: 'Pekerja tetap (2+ tahun)', feedback: 'Terbaik untuk kelulusan' },
          { label: 'Pekerja tetap (< 2 tahun)', feedback: 'Umumnya diterima' },
          { label: 'Kontrak/Sementara', feedback: 'Pilihan terhad' },
          { label: 'Bekerja sendiri', feedback: 'Perlu lebih dokumentasi' },
        ],
      },
      {
        question: 'Berapa banyak pendapatan anda untuk pembayaran hutang sedia ada?',
        options: [
          { label: 'Kurang dari 30%', feedback: 'DSR cemerlang' },
          { label: '30% - 50%', feedback: 'DSR boleh diterima' },
          { label: '50% - 70%', feedback: 'DSR tinggi - pilihan terhad' },
          { label: 'Lebih dari 70%', feedback: 'DSR kritikal - kemungkinan ditolak' },
        ],
      },
      {
        question: 'Pernahkah anda terlepas bayaran pinjaman/kad kredit?',
        options: [
          { label: 'Tidak pernah terlepas bayaran', feedback: 'Sejarah kredit bersih' },
          { label: 'Terlepas 1-2 kali (diselesaikan)', feedback: 'Impak kecil' },
          { label: 'Banyak kali terlepas bayaran', feedback: 'Impak ketara' },
          { label: 'Dalam tunggakan sekarang', feedback: 'Bendera merah besar' },
        ],
      },
      {
        question: 'Adakah anda mempunyai rekod CCRIS/CTOS aktif?',
        options: [
          { label: 'Rekod bersih / Tidak pernah semak', feedback: 'Tiada isu' },
          { label: 'Isu kecil (diselesaikan)', feedback: 'Mungkin perlu penjelasan' },
          { label: 'Kes undang-undang aktif / Bankrap', feedback: 'Kemungkinan tidak layak' },
          { label: 'Tidak pasti', feedback: 'Disyorkan untuk menyemak' },
        ],
      },
    ],
    navigation: { previous: 'Soalan sebelumnya' },
    result: { yourScore: 'Skor anda', recommendations: 'Cadangan', basedOn: 'Berdasarkan penilaian anda' },
    results: {
      excellent: {
        title: 'Kelayakan Cemerlang!',
        description: 'Berdasarkan jawapan anda, anda mempunyai peluang tinggi untuk kelulusan pinjaman. Kebanyakan bank kemungkinan akan meluluskan permohonan anda.',
        recommendations: [
          'Anda layak untuk kebanyakan bank dan produk pinjaman',
          'Rundingkan untuk kadar faedah yang lebih baik',
          'Pertimbangkan pakej pinjaman premium dengan faedah tambahan',
          'Bandingkan untuk tawaran terbaik',
        ],
      },
      good: {
        title: 'Kelayakan Baik',
        description: 'Anda mempunyai peluang munasabah untuk kelulusan, walaupun sesetengah bank mungkin mempunyai keperluan yang lebih ketat.',
        recommendations: [
          'Fokus pada bank dengan kriteria fleksibel',
          'Sediakan semua dokumen dengan teliti',
          'Pertimbangkan untuk mengurangkan hutang sedia ada dahulu',
          'Analisis kami boleh mengenal pasti bank terbaik untuk profil anda',
        ],
      },
      fair: {
        title: 'Kelayakan Sederhana',
        description: 'Kelayakan anda berada di sempadan. Beberapa penambahbaikan mungkin diperlukan sebelum memohon.',
        recommendations: [
          'Pertimbangkan untuk membayar hutang sedia ada',
          'Perbaiki rekod kredit anda jika boleh',
          'Cari penjamin atau peminjam bersama',
          'Dapatkan nasihat profesional sebelum memohon',
        ],
      },
      poor: {
        title: 'Perlu Penambahbaikan',
        description: 'Berdasarkan jawapan anda, anda mungkin menghadapi cabaran untuk diluluskan. Kami syorkan menangani beberapa isu terlebih dahulu.',
        recommendations: [
          'Fokus pada memperbaiki skor kredit anda',
          'Kurangkan nisbah hutang kepada pendapatan anda',
          'Selesaikan sebarang isu kredit tertunggak',
          'Pertimbangkan perkhidmatan konsultasi pembaikan kredit kami',
        ],
      },
    },
    cta: {
      title: 'Mahu Analisis Terperinci?',
      description: 'Dapatkan analisis kredit komprehensif dengan cadangan bank yang diperibadikan dengan hanya RM30.',
      getAnalysis: 'Dapatkan analisis penuh',
      chat: 'Sembang dengan kami',
    },
    restart: 'Ambil ujian semula',
    disclaimer: 'Ini adalah alat penilaian pantas untuk tujuan maklumat sahaja. Kelulusan pinjaman sebenar bergantung kepada banyak faktor. Dapatkan analisis profesional kami untuk hasil yang tepat.',
    resources: {
      title: 'Langkah seterusnya',
      button: 'Pergi',
      labels: {
        dsrGuide: 'Baca Panduan DSR',
        compare: 'Bandingkan Pinjaman',
        creditScore: 'Baca Panduan Baiki Skor Kredit',
      },
      descriptions: {
        dsrGuide: 'Fahami cara bank mengira nisbah khidmat hutang anda.',
        compare: 'Lihat kadar dan terma merentas bank dan produk pinjaman.',
        creditScore: 'Langkah untuk tingkatkan profil CCRIS/CTOS sebelum memohon.',
      },
    },
  },
} as const;
