'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  DollarSign,
  CreditCard,
  Building2,
  Clock,
  TrendingUp,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Quick Assessment',
      title: 'Loan Eligibility',
      titleHighlight: 'Quick Test',
      description: 'Answer 5 simple questions to get an instant assessment of your loan eligibility.',
      note: 'No login required. Takes about 2 minutes to complete.',
    },
    valueProps: [
      {
        title: 'Instant feedback',
        description: 'See how each answer impacts your eligibility.',
      },
      {
        title: 'DSR-aware guidance',
        description: 'Get clarity on debt-to-income and credit history.',
      },
      {
        title: 'Next-step plan',
        description: 'Clear actions to boost your approval odds.',
      },
    ],
    progress: {
      question: 'Question',
      of: 'of',
      complete: 'Complete',
    },
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
    navigation: {
      previous: 'Previous Question',
    },
    result: {
      yourScore: 'Your Score',
      recommendations: 'Recommendations',
      basedOn: 'Based on your assessment',
    },
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
      getAnalysis: 'Get Full Analysis',
      chat: 'Chat With Us',
    },
    restart: 'Take Test Again',
    disclaimer: 'This is a quick assessment tool for informational purposes only. Actual loan approval depends on many factors. Get our professional analysis for accurate results.',
    resources: {
      title: 'Plan Your Next Step',
      button: 'Visit',
      items: [
        { label: 'Use the Car Loan Calculator', href: '/tools/car-loan-calculator' },
        { label: 'Use the Home Loan Calculator', href: '/tools/home-loan-calculator' },
        { label: 'Read the Credit Score Improvement Guide', href: '/blog/how-to-improve-credit-score-malaysia' },
      ],
    },
  },
  ms: {
    header: {
      badge: 'Penilaian Pantas',
      title: 'Kelayakan Pinjaman',
      titleHighlight: 'Ujian Pantas',
      description: 'Jawab 5 soalan mudah untuk mendapatkan penilaian segera kelayakan pinjaman anda.',
      note: 'Tiada log masuk diperlukan. Siap dalam lebih kurang 2 minit.',
    },
    valueProps: [
      {
        title: 'Maklum balas segera',
        description: 'Lihat kesan setiap jawapan pada kelayakan anda.',
      },
      {
        title: 'Panduan berasaskan DSR',
        description: 'Fahami nisbah hutang dan sejarah kredit anda.',
      },
      {
        title: 'Pelan tindakan jelas',
        description: 'Langkah seterusnya untuk meningkatkan peluang.',
      },
    ],
    progress: {
      question: 'Soalan',
      of: 'daripada',
      complete: 'Selesai',
    },
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
    navigation: {
      previous: 'Soalan Sebelumnya',
    },
    result: {
      yourScore: 'Skor Anda',
      recommendations: 'Cadangan',
      basedOn: 'Berdasarkan penilaian anda',
    },
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
      getAnalysis: 'Dapatkan Analisis Penuh',
      chat: 'Sembang Dengan Kami',
    },
    restart: 'Ambil Ujian Semula',
    disclaimer: 'Ini adalah alat penilaian pantas untuk tujuan maklumat sahaja. Kelulusan pinjaman sebenar bergantung kepada banyak faktor. Dapatkan analisis profesional kami untuk hasil yang tepat.',
    resources: {
      title: 'Langkah Seterusnya',
      button: 'Pergi',
      items: [
        { label: 'Guna Kalkulator Pinjaman Kereta', href: '/tools/car-loan-calculator' },
        { label: 'Guna Kalkulator Pinjaman Rumah', href: '/tools/home-loan-calculator' },
        { label: 'Baca Panduan Baiki Skor Kredit', href: '/blog/how-to-improve-credit-score-malaysia' },
      ],
    },
  },
};

// Question scores (same for both languages)
const questionScores = [
  [20, 50, 80, 100], // Question 1 scores
  [100, 70, 40, 60], // Question 2 scores
  [100, 70, 40, 10], // Question 3 scores
  [100, 60, 20, 0],  // Question 4 scores
  [100, 60, 0, 50],  // Question 5 scores
];

type ResultLevel = 'excellent' | 'good' | 'fair' | 'poor';

function getResultLevel(score: number): ResultLevel {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

const resultIcons = {
  excellent: CheckCircle,
  good: TrendingUp,
  fair: AlertTriangle,
  poor: XCircle,
};

const resultColors = {
  excellent: {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  good: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  fair: {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  poor: {
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
};

export default function EligibilityTestPage() {
  const { language } = useLanguage();
  const t = pageContent[language];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const score = questionScores[currentQuestion][optionIndex];
    setAnswers({ ...answers, [currentQuestion]: score });

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const averageScore = showResult ? Math.round(totalScore / t.questions.length) : 0;
  const resultLevel = showResult ? getResultLevel(averageScore) : 'excellent';
  const result = t.results[resultLevel];
  const colors = resultColors[resultLevel];
  const ResultIcon = resultIcons[resultLevel];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / t.questions.length) * 100;

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container max-w-3xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Target className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <p className="text-sm text-muted-foreground mt-3">{t.header.note}</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {t.valueProps.map((item) => (
              <Card key={item.title} className="p-4 text-left surface-card">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2" aria-live="polite">
            <span>{t.progress.question} {Math.min(currentQuestion + 1, t.questions.length)} {t.progress.of} {t.questions.length}</span>
            <span>{Math.round(progress)}% {t.progress.complete}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {!showResult ? (
          /* Question Card */
          <Card className="shadow-lg border-2 surface-card">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {currentQuestion === 0 && <DollarSign className="h-8 w-8 text-primary" />}
                {currentQuestion === 1 && <Building2 className="h-8 w-8 text-primary" />}
                {currentQuestion === 2 && <TrendingUp className="h-8 w-8 text-primary" />}
                {currentQuestion === 3 && <Clock className="h-8 w-8 text-primary" />}
                {currentQuestion === 4 && <CreditCard className="h-8 w-8 text-primary" />}
              </div>
              <CardTitle className="text-xl lg:text-2xl">
                {t.questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {t.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      answers[currentQuestion] === questionScores[currentQuestion][index]
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {option.feedback && (
                      <p className="text-sm text-muted-foreground mt-1">{option.feedback}</p>
                    )}
                  </button>
                ))}
              </div>

              {currentQuestion > 0 && (
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  className="mt-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t.navigation.previous}
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Result Card */
          <div className="space-y-6">
            <Card className={`shadow-lg border-2 ${colors.borderColor} ${colors.bgColor}`}>
              <CardContent className="pt-8 pb-8 text-center">
                <div className={`w-20 h-20 rounded-full ${colors.bgColor} flex items-center justify-center mx-auto mb-4 border-4 ${colors.borderColor}`}>
                  <ResultIcon className={`h-10 w-10 ${colors.color}`} />
                </div>
                <Badge className="mb-4" variant="outline">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t.result.yourScore}: {averageScore}/100
                </Badge>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${colors.color}`}>
                  {result.title}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {result.description}
                </p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t.result.recommendations}
                </CardTitle>
                <CardDescription>{t.result.basedOn}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>{t.resources.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {t.resources.items.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-xl p-4">
                    <p className="font-medium">{item.label}</p>
                    <Button asChild size="sm">
                      <Link href={item.href}>
                        {t.resources.button}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-bold mb-2">{t.cta.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25">
                    <Link href="/services/1/apply">
                      {t.cta.getAnalysis}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t.cta.chat}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Restart */}
            <div className="text-center">
              <Button variant="ghost" onClick={handleRestart}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.restart}
              </Button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}
