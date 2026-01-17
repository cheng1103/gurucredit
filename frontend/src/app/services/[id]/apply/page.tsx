'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { applicationsAPI } from '@/lib/api';
import { useLanguage } from '@/lib/i18n';
import { COMPANY, SERVICE_AREAS } from '@/lib/constants';
import { loanApplicationSchema, validateForm, getFieldError } from '@/lib/validation';
import {
  Activity,
  Loader2,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock,
  Star,
  Building2,
  MessageCircle,
} from 'lucide-react';

// Bilingual page content
const pageContent = {
  en: {
    backToServices: 'Back to Services',
    notFound: {
      title: 'Service Not Found',
      description: 'The service you are looking for does not exist.',
    },
    steps: {
      personalInfo: 'Personal Info',
      employment: 'Employment',
      financial: 'Financial',
      review: 'Review',
    },
    stepTitles: {
      personalInfo: 'Personal Information',
      employment: 'Employment Details',
      financial: 'Financial Information',
      review: 'Review & Submit',
    },
    stepDescriptions: {
      personalInfo: 'Please provide your contact details',
      employment: 'Tell us about your employment',
      financial: 'Help us understand your financial situation',
      review: 'Review your information before submitting',
    },
    form: {
      fullName: 'Full Name (as per IC)',
      fullNamePlaceholder: 'Your full name',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      emailNote: 'We will send your analysis report to this email',
      phone: 'Phone Number',
      serviceArea: {
        label: 'Where do you live?',
        helper: 'We assist borrowers across Malaysia, including Sabah and Sarawak.',
      },
      employmentType: 'Employment Type',
      employed: 'Employed',
      selfEmployed: 'Self-Employed',
      business: 'Business Owner',
      freelance: 'Freelance',
      companyName: 'Company / Business Name',
      companyPlaceholder: 'Company name',
      jobTitle: 'Job Title / Position',
      jobPlaceholder: 'Your position',
      monthlyIncome: 'Monthly Net Income (RM)',
      incomeNote: 'Your take-home pay after all deductions',
      debtNote: 'Enter your monthly debt payments. Leave blank or enter 0 if not applicable.',
      houseLoan: 'House Loan (RM/month)',
      carLoan: 'Car Loan (RM/month)',
      personalLoan: 'Personal Loan (RM/month)',
      creditCard: 'Credit Card (min payment)',
      otherDebts: 'Other Debts (PTPTN, etc.)',
      desiredAmount: 'Desired Loan Amount (RM)',
      loanPurpose: 'Loan Purpose',
      purposes: ['House', 'Car', 'Personal', 'Business', 'Education', 'Other'],
      additionalNotes: 'Additional Notes (optional)',
      additionalNotesPlaceholder: "Any additional information you'd like us to know...",
    },
    reviewSection: {
      personalInfo: 'Personal Information',
      employmentDetails: 'Employment Details',
      financialSummary: 'Financial Summary',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      serviceArea: 'Service Area',
      type: 'Type',
      company: 'Company',
      income: 'Income',
      totalDebt: 'Total Monthly Debt',
      loanPurpose: 'Loan Purpose',
      desiredAmount: 'Desired Amount',
    },
    security: {
      title: 'Your data is secure',
      description: 'We protect your information according to PDPA guidelines. Your data will only be used for this analysis.',
    },
    navigation: {
      back: 'Back',
      next: 'Next',
      submit: 'Submit Application',
    },
    sidebar: {
      selectedService: 'Selected Loan',
      analysisFee: 'Eligibility Analysis Fee',
      oneTime: 'one-time',
      loanRate: 'Loan Rate',
      rateNote: 'flat rate p.a.',
      included: "Analysis includes:",
      analysisFeatures: [
        'Credit report analysis (CCRIS & CTOS)',
        'DSR calculation & assessment',
        'Approval chances evaluation',
        'Loan limit estimation',
        'Issue identification & solutions',
        'Bank/agency recommendation',
        'Full explanation & guidance',
      ],
      paymentNote:
        'RM30 is collected only after submission via our official WhatsApp chat. Wait for our consultant to share the payment link—no payment happens on this site.',
      turnaround: '24 Hour Turnaround',
      turnaroundDesc: 'Results delivered fast',
      confidential: '100% Confidential',
      confidentialDesc: 'Your data is secure',
      needHelp: 'Need help?',
      chatWhatsApp: 'Chat with us on WhatsApp',
    },
    quickQuestions: {
      referral: 'How did you hear about us?',
      referralPlaceholder: 'Select an option',
      contactPreference: 'Preferred WhatsApp time',
      contactNote: 'We will prioritise contacting you within this window.',
    },
    assurance: {
      title: 'We only collect essentials',
      description: 'Share just enough information for us to prepare your personalised roadmap. IC copies and supporting documents are only requested later via WhatsApp.',
      bullets: [
        'Contact + income details are stored securely',
        'No sensitive documents uploaded through the site',
        'Full PDPA compliance with encrypted submissions',
      ],
    },
    insights: {
      title: 'Instant eligibility snapshot',
      income: 'Monthly income',
      debts: 'Total monthly debts',
      dsr: 'Estimated DSR',
      missing: 'Provide income and debt figures to preview your DSR instantly.',
      status: {
        excellent: 'Comfort zone – strong approval odds',
        good: 'Healthy – most banks are comfortable',
        warning: 'Manageable – we’ll optimise before submission',
        high: 'Tight – we’ll coach you before submitting',
      },
    },
    whatsappHelper: {
      title: 'Prefer WhatsApp?',
      description: 'Share screenshots, voice notes, or follow up questions directly with our consultant.',
      responseTime: 'Average reply < 10 minutes during business hours',
      button: 'Message on WhatsApp',
      subtext: 'We reference your application automatically once you say hello.',
    },
    toast: {
      fillRequired: 'Please fill in all required fields',
      enterIncome: 'Please enter your monthly income',
      success: 'Application submitted successfully!',
      error: 'Failed to submit application. Please try again.',
    },
    services: {
      '1': {
        name: 'Personal Loan',
        description: 'Quick cash for emergencies, medical bills, debt consolidation, or any personal needs',
        features: [
          'Loan up to RM100,000',
          'Flexible tenure 1-7 years',
          'Eligibility analysis within 24 hours',
          'Minimal documentation',
          'No collateral required',
          'Competitive rates from 4.88%',
          'Fixed monthly installments',
        ],
        spotlight: {
          quote: '“Bank approved RM80k in 5 days thanks to the WhatsApp prep list.”',
          author: 'Nurul, Penang',
          faq: {
            question: 'How fast can funds be ready?',
            answer: 'Once your documents are ready we can submit to our partner banks within the same day. Approval timelines depend on the bank and documentation completeness.',
          },
        },
      },
      '2': {
        name: 'Car Loan',
        description: 'Finance your dream car with competitive rates and flexible repayment terms',
        features: ['New & used car financing', 'Up to 90% financing', 'Tenure up to 9 years', 'Competitive rates', 'Fast analysis'],
        spotlight: {
          quote: '“Dealer needed an answer within 2 days — GURU Credits delivered.”',
          author: 'Hafiz, Shah Alam',
          faq: {
            question: 'Can you work with dealer promotions?',
            answer: 'Yes, we coordinate with your salesperson and highlight the banks that match your profile so you can lock in the promotion before it expires.',
          },
        },
      },
      '3': {
        name: 'Home Loan',
        description: 'Make your dream home a reality with our home financing solutions',
        features: ['Up to 90% financing', 'Tenure up to 35 years', 'Competitive rates', 'Flexible repayment', 'Free consultation'],
        spotlight: {
          quote: '“Helped me restructure commitments so the bank approved RM450k.”',
          author: 'Melissa, Johor Bahru',
          faq: {
            question: 'Do you assist first-time buyers?',
            answer: 'Absolutely. We map DSR limits, suggest banks for your income segment, and prep the document checklist so valuation and legal work start quickly.',
          },
        },
      },
      '4': {
        name: 'Business Loan',
        description: 'Grow your business with our flexible financing options for SMEs',
        features: [
          'Working capital',
          'Equipment financing',
          'Business expansion',
          'Flexible terms',
          'Quick processing',
        ],
        spotlight: {
          quote: '“Secured RM300k working capital without leaving the shop.”',
          author: 'Jason, Klang',
          faq: {
            question: 'What if my accounts are basic?',
            answer: 'We guide you on the minimum docs (bank statements, management accounts) and liaise with lenders that support SMEs with simple bookkeeping.',
          },
        },
      },
    },
  },
  ms: {
    backToServices: 'Kembali ke Perkhidmatan',
    notFound: {
      title: 'Perkhidmatan Tidak Dijumpai',
      description: 'Perkhidmatan yang anda cari tidak wujud.',
    },
    steps: {
      personalInfo: 'Maklumat Peribadi',
      employment: 'Pekerjaan',
      financial: 'Kewangan',
      review: 'Semakan',
    },
    stepTitles: {
      personalInfo: 'Maklumat Peribadi',
      employment: 'Butiran Pekerjaan',
      financial: 'Maklumat Kewangan',
      review: 'Semak & Hantar',
    },
    stepDescriptions: {
      personalInfo: 'Sila berikan butiran hubungan anda',
      employment: 'Beritahu kami tentang pekerjaan anda',
      financial: 'Bantu kami memahami situasi kewangan anda',
      review: 'Semak maklumat anda sebelum menghantar',
    },
    form: {
      fullName: 'Nama Penuh (seperti dalam IC)',
      fullNamePlaceholder: 'Nama penuh anda',
      email: 'Alamat E-mel',
      emailPlaceholder: 'anda@email.com',
      emailNote: 'Kami akan hantar laporan analisis ke e-mel ini',
      phone: 'Nombor Telefon',
      serviceArea: {
        label: 'Anda tinggal di mana?',
        helper: 'Kami membantu peminjam di seluruh Malaysia termasuk Sabah dan Sarawak.',
      },
      employmentType: 'Jenis Pekerjaan',
      employed: 'Bekerja',
      selfEmployed: 'Bekerja Sendiri',
      business: 'Pemilik Perniagaan',
      freelance: 'Bebas',
      companyName: 'Nama Syarikat / Perniagaan',
      companyPlaceholder: 'Nama syarikat',
      jobTitle: 'Jawatan / Posisi',
      jobPlaceholder: 'Posisi anda',
      monthlyIncome: 'Pendapatan Bersih Bulanan (RM)',
      incomeNote: 'Gaji bersih anda selepas semua potongan',
      debtNote: 'Masukkan bayaran hutang bulanan anda. Biarkan kosong atau masukkan 0 jika tidak berkenaan.',
      houseLoan: 'Pinjaman Rumah (RM/bulan)',
      carLoan: 'Pinjaman Kereta (RM/bulan)',
      personalLoan: 'Pinjaman Peribadi (RM/bulan)',
      creditCard: 'Kad Kredit (bayaran min)',
      otherDebts: 'Hutang Lain (PTPTN, dll.)',
      desiredAmount: 'Jumlah Pinjaman Dikehendaki (RM)',
      loanPurpose: 'Tujuan Pinjaman',
      purposes: ['Rumah', 'Kereta', 'Peribadi', 'Perniagaan', 'Pendidikan', 'Lain-lain'],
      additionalNotes: 'Nota Tambahan (pilihan)',
      additionalNotesPlaceholder: 'Sebarang maklumat tambahan yang anda ingin kami ketahui...',
    },
    reviewSection: {
      personalInfo: 'Maklumat Peribadi',
      employmentDetails: 'Butiran Pekerjaan',
      financialSummary: 'Ringkasan Kewangan',
      name: 'Nama',
      email: 'E-mel',
      phone: 'Telefon',
      serviceArea: 'Kawasan Perkhidmatan',
      type: 'Jenis',
      company: 'Syarikat',
      income: 'Pendapatan',
      totalDebt: 'Jumlah Hutang Bulanan',
      loanPurpose: 'Tujuan Pinjaman',
      desiredAmount: 'Jumlah Dikehendaki',
    },
    security: {
      title: 'Data anda selamat',
      description: 'Kami melindungi maklumat anda mengikut garis panduan PDPA. Data anda hanya akan digunakan untuk analisis ini.',
    },
    navigation: {
      back: 'Kembali',
      next: 'Seterusnya',
      submit: 'Hantar Permohonan',
    },
    sidebar: {
      selectedService: 'Pinjaman Dipilih',
      analysisFee: 'Yuran Analisis Kelayakan',
      oneTime: 'sekali',
      loanRate: 'Kadar Pinjaman',
      rateNote: 'kadar rata setahun',
      included: 'Analisis termasuk:',
      analysisFeatures: [
        'Analisis laporan kredit (CCRIS & CTOS)',
        'Pengiraan & penilaian DSR',
        'Penilaian peluang kelulusan',
        'Anggaran had pinjaman',
        'Pengenalpastian isu & penyelesaian',
        'Cadangan bank/agensi',
        'Penjelasan & panduan penuh',
      ],
      paymentNote:
        'RM30 hanya dikutip selepas penghantaran melalui chat WhatsApp rasmi kami. Tunggu perunding berkongsi pautan pembayaran – tiada bayaran berlaku di laman web ini.',
      turnaround: 'Pemprosesan 24 Jam',
      turnaroundDesc: 'Keputusan dihantar pantas',
      confidential: '100% Sulit',
      confidentialDesc: 'Data anda selamat',
      needHelp: 'Perlukan bantuan?',
      chatWhatsApp: 'Sembang dengan kami di WhatsApp',
    },
    quickQuestions: {
      referral: 'Bagaimana anda tahu tentang kami?',
      referralPlaceholder: 'Pilih satu pilihan',
      contactPreference: 'Masa WhatsApp pilihan anda',
      contactNote: 'Kami akan cuba hubungi anda dalam tempoh ini.',
    },
    assurance: {
      title: 'Hanya maklumat asas diperlukan',
      description: 'Kongsi maklumat minimum untuk kami sediakan pelan anda. Salinan IC dan dokumen sokongan hanya diminta kemudian melalui WhatsApp.',
      bullets: [
        'Butiran hubungan + pendapatan disimpan dengan selamat',
        'Tiada dokumen sensitif dimuat naik melalui laman web',
        'Patuh PDPA dengan penghantaran disulitkan',
      ],
    },
    insights: {
      title: 'Gambaran kelayakan segera',
      income: 'Pendapatan bulanan',
      debts: 'Jumlah hutang bulanan',
      dsr: 'Anggaran DSR',
      missing: 'Isikan pendapatan dan hutang untuk melihat DSR anda serta-merta.',
      status: {
        excellent: 'Zon selesa – peluang kelulusan tinggi',
        good: 'Sihat – kebanyakan bank selesa',
        warning: 'Terkawal – kami akan optimakan sebelum hantar',
        high: 'Ketat – kami akan bimbing sebelum hantar',
      },
    },
    whatsappHelper: {
      title: 'Lebih suka WhatsApp?',
      description: 'Kongsi tangkapan skrin, nota suara atau soalan susulan terus dengan perunding kami.',
      responseTime: 'Masa balas purata < 10 minit pada waktu pejabat',
      button: 'Hubungi di WhatsApp',
      subtext: 'Sebut sahaja permohonan anda, kami terus jejak secara automatik.',
    },
    toast: {
      fillRequired: 'Sila isi semua ruangan yang diperlukan',
      enterIncome: 'Sila masukkan pendapatan bulanan anda',
      success: 'Permohonan berjaya dihantar!',
      error: 'Gagal menghantar permohonan. Sila cuba lagi.',
    },
    services: {
      '1': {
        name: 'Pinjaman Peribadi',
        description: 'Wang tunai cepat untuk kecemasan, bil perubatan, penyatuan hutang, atau keperluan peribadi',
        features: [
          'Pinjaman sehingga RM100,000',
          'Tempoh fleksibel 1-7 tahun',
          'Kelulusan pantas dalam 24 jam',
          'Dokumentasi minimum',
          'Tiada cagaran diperlukan',
          'Kadar kompetitif dari 4.88%',
          'Ansuran bulanan tetap',
        ],
        spotlight: {
          quote: '“RM80k lulus dalam 5 hari dengan senarai semak WhatsApp mereka.”',
          author: 'Nurul, Pulau Pinang',
          faq: {
            question: 'Berapa cepat saya boleh terima wang?',
            answer: 'Jika dokumen siap, kami hantar kepada bank rakan pada hari yang sama dan kebanyakan kelulusan diterima dalam 24–48 jam.',
          },
        },
      },
      '2': {
        name: 'Pinjaman Kereta',
        description: 'Biayai kereta impian anda dengan kadar kompetitif dan terma pembayaran fleksibel',
        features: ['Pembiayaan kereta baru & terpakai', 'Pembiayaan sehingga 90%', 'Tempoh sehingga 9 tahun', 'Kadar kompetitif', 'Kelulusan pantas'],
        spotlight: {
          quote: '“Perlu jawapan dalam 2 hari — GURU Credits uruskan semuanya.”',
          author: 'Hafiz, Shah Alam',
          faq: {
            question: 'Boleh ke kami guna promosi pengedar?',
            answer: 'Ya, kami selaras dengan jurujual anda dan cadangkan bank yang sesuai supaya promosi kereta boleh dikunci sebelum tamat.',
          },
        },
      },
      '3': {
        name: 'Pinjaman Rumah',
        description: 'Jadikan rumah impian anda kenyataan dengan penyelesaian pembiayaan rumah kami',
        features: ['Pembiayaan sehingga 90%', 'Tempoh sehingga 35 tahun', 'Kadar kompetitif', 'Pembayaran balik fleksibel', 'Konsultasi percuma'],
        spotlight: {
          quote: '“Bantu saya susun semula komitmen sehingga bank lulus RM450k.”',
          author: 'Melissa, Johor Bahru',
          faq: {
            question: 'Adakah anda membantu pembeli rumah pertama?',
            answer: 'Sudah tentu. Kami kira had DSR, cadang bank ikut segmen pendapatan, dan sediakan senarai dokumen supaya proses nilaian & guaman berjalan pantas.',
          },
        },
      },
      '4': {
        name: 'Pinjaman Perniagaan',
        description: 'Kembangkan perniagaan anda dengan pilihan pembiayaan fleksibel untuk PKS',
        features: [
          'Modal kerja',
          'Pembiayaan peralatan',
          'Pengembangan perniagaan',
          'Terma fleksibel',
          'Pemprosesan pantas',
        ],
        spotlight: {
          quote: '“RM300k modal kerja lulus tanpa perlu tinggalkan kedai.”',
          author: 'Jason, Klang',
          faq: {
            question: 'Macam mana jika akaun saya ringkas?',
            answer: 'Kami tunjuk dokumen minimum (penyata bank, akaun pengurusan) dan hubungkan dengan pemberi pinjaman yang mesra PKS.',
          },
        },
      },
    },
  },
};

type DsrStatus = 'excellent' | 'good' | 'warning' | 'high';

// Loan interest rates (for display)
const loanRates: Record<string, number> = {
  '1': 4.88,
  '2': 3.5,
  '3': 4.0,
  '4': 5.5,
};

// Eligibility Analysis Fee - RM30 for all loan types
const ANALYSIS_FEE = 30;

// Error response interface
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ServiceApplyPage() {
  const { language } = useLanguage();
  const t = pageContent[language];

  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const serviceData = t.services[serviceId as keyof typeof t.services];
  const whatsappLink = COMPANY.whatsappLink;

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceArea: SERVICE_AREAS[0].regionCode as string,
    employmentType: 'employed',
    employerName: '',
    jobTitle: '',
    monthlyIncome: '',
    houseLoan: '',
    carLoan: '',
    personalLoan: '',
    creditCard: '',
    otherDebts: '',
    loanPurpose: '',
    loanAmount: '',
    additionalNotes: '',
    referralSource: '',
    contactPreference: 'any',
  });

  const parseAmount = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  const totalMonthlyDebt =
    parseAmount(formData.houseLoan) +
    parseAmount(formData.carLoan) +
    parseAmount(formData.personalLoan) +
    parseAmount(formData.creditCard) +
    parseAmount(formData.otherDebts);
  const monthlyIncomeValue = parseAmount(formData.monthlyIncome);
  const estimatedDSR =
    monthlyIncomeValue > 0 ? Math.min(999, (totalMonthlyDebt / monthlyIncomeValue) * 100) : null;
  const getDsrStatus = (value: number | null): DsrStatus | null => {
    if (value === null) return null;
    if (value <= 35) return 'excellent';
    if (value <= 50) return 'good';
    if (value <= 65) return 'warning';
    return 'high';
  };
  const dsrStatus = getDsrStatus(estimatedDSR);
  const statusBadgeClasses: Record<DsrStatus, string> = {
    excellent: 'bg-emerald-100 text-emerald-700',
    good: 'bg-blue-100 text-blue-700',
    warning: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700',
  };
  const dsrBadgeClass = dsrStatus ? statusBadgeClasses[dsrStatus] : 'bg-muted text-muted-foreground';
  const dsrStatusText = dsrStatus ? t.insights.status[dsrStatus] : null;
  const formattedIncome = monthlyIncomeValue ? `RM ${monthlyIncomeValue.toLocaleString()}` : '—';
  const formattedDebt = totalMonthlyDebt ? `RM ${totalMonthlyDebt.toLocaleString()}` : '—';
  const dsrLabel = estimatedDSR !== null ? `${estimatedDSR.toFixed(1)}%` : '—';

  const openWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const popup = window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = whatsappLink;
    }
  };
  const setFieldError = (field: string, message?: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }
      return next;
    });
  };
  const validateSingleField = (field: keyof typeof formData, value?: string) => {
    const fieldSchema = loanApplicationSchema.shape[field];
    const result = fieldSchema.safeParse(value ?? formData[field]);
    if (result.success) {
      setFieldError(field as string, undefined);
      return true;
    }
    setFieldError(field as string, result.error.issues[0]?.message);
    return false;
  };
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field as string]) {
      validateSingleField(field, value);
    }
  };
  const handleFieldBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field as string]: true }));
    validateSingleField(field);
  };

  if (!serviceData) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container max-w-2xl text-center">
          <h1 className="text-2xl font-bold mb-4">{t.notFound.title}</h1>
          <p className="text-muted-foreground mb-6">{t.notFound.description}</p>
          <Button asChild>
            <Link href="/services">{t.backToServices}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before submission
    const validation = validateForm(loanApplicationSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors);
      toast.error(t.toast.fillRequired);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const validatedData = validation.data;
      const response = await applicationsAPI.createPublic({
        serviceId: serviceId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceArea: validatedData.serviceArea,
        employmentType: validatedData.employmentType,
        employerName: validatedData.employerName || undefined,
        jobTitle: validatedData.jobTitle || undefined,
        monthlyIncome: parseFloat(validatedData.monthlyIncome) || 0,
        houseLoan: parseFloat(validatedData.houseLoan || '0') || 0,
        carLoan: parseFloat(validatedData.carLoan || '0') || 0,
        personalLoan: parseFloat(validatedData.personalLoan || '0') || 0,
        creditCard: parseFloat(validatedData.creditCard || '0') || 0,
        otherDebts: parseFloat(validatedData.otherDebts || '0') || 0,
        loanPurpose: validatedData.loanPurpose || undefined,
        loanAmount: validatedData.loanAmount ? parseFloat(validatedData.loanAmount) : undefined,
        additionalNotes: validatedData.additionalNotes || undefined,
        referralSource: validatedData.referralSource || undefined,
        contactPreference: validatedData.contactPreference || undefined,
      });

      toast.success(t.toast.success);
      const referenceId = response.data?.id;
      const successUrl = referenceId
        ? `/services/success?service=${serviceId}&ref=${referenceId}`
        : `/services/success?service=${serviceId}`;
      router.push(successUrl);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || t.toast.error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const stepSchema = loanApplicationSchema.pick({
        name: true,
        email: true,
        phone: true,
        serviceArea: true,
        referralSource: true,
        contactPreference: true,
      });
      const result = validateForm(stepSchema, formData);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, ...result.errors }));
        setTouched((prev) => ({
          ...prev,
          name: true,
          email: true,
          phone: true,
          serviceArea: true,
        }));
        toast.error(t.toast.fillRequired);
        return;
      }
    }
    if (step === 2) {
      const stepSchema = loanApplicationSchema.pick({
        employmentType: true,
        employerName: true,
        jobTitle: true,
        monthlyIncome: true,
      });
      const result = validateForm(stepSchema, formData);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, ...result.errors }));
        setTouched((prev) => ({
          ...prev,
          employmentType: true,
          employerName: true,
          jobTitle: true,
          monthlyIncome: true,
        }));
        toast.error(t.toast.enterIncome);
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const employmentTypes = [
    { value: 'employed', label: t.form.employed },
    { value: 'self-employed', label: t.form.selfEmployed },
    { value: 'business', label: t.form.business },
    { value: 'freelance', label: t.form.freelance },
  ];
  const referralOptions = [
    'Google Search',
    'TikTok / Social Media',
    'Friend / Referral',
    'Repeat Customer',
    'Other',
  ];
  const contactPreferences = [
    { value: 'any', label: language === 'ms' ? 'Bila-bila masa' : 'Anytime' },
    { value: 'morning', label: language === 'ms' ? 'Pagi (9am-12pm)' : 'Morning (9am-12pm)' },
    { value: 'afternoon', label: language === 'ms' ? 'Petang (12pm-4pm)' : 'Afternoon (12pm-4pm)' },
    { value: 'evening', label: language === 'ms' ? 'Malam (4pm-8pm)' : 'Evening (4pm-8pm)' },
  ];
  const stepItems = [
    { label: t.steps.personalInfo, description: t.stepDescriptions.personalInfo },
    { label: t.steps.employment, description: t.stepDescriptions.employment },
    { label: t.steps.financial, description: t.stepDescriptions.financial },
    { label: t.steps.review, description: t.stepDescriptions.review },
  ];

  return (
    <div className="relative py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container max-w-5xl relative">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToServices}
          </Link>
        </Button>

        <div className="mb-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-0">
              <Shield className="h-3 w-3 mr-1" />
              {t.sidebar.selectedService}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {serviceData.name}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {serviceData.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {serviceData.features.slice(0, 3).map((feature) => (
                <Badge key={feature} variant="outline" className="bg-white/70">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <Card className="p-4 surface-card">
            <div className="text-xs text-muted-foreground">{t.sidebar.analysisFee}</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-primary">RM{ANALYSIS_FEE}</span>
              <span className="text-sm text-muted-foreground">{t.sidebar.oneTime}</span>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <span>{t.sidebar.loanRate}: </span>
              <span className="font-semibold text-foreground">{loanRates[serviceId]}% </span>
              <span className="text-xs">{t.sidebar.rateNote}</span>
            </div>
            <div className="mt-4 rounded-lg border border-primary/10 bg-primary/5 p-3 text-xs text-muted-foreground">
              {t.sidebar.paymentNote}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-2 surface-card">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
                <ol className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3" aria-label="Application steps">
                  {stepItems.map((item, index) => (
                    <li
                      key={item.label}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
                        step === index + 1 ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border'
                      }`}
                      aria-current={step === index + 1 ? 'step' : undefined}
                    >
                      <span className="font-semibold">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ol>
                <CardTitle className="text-xl">
                  {step === 1 && t.stepTitles.personalInfo}
                  {step === 2 && t.stepTitles.employment}
                  {step === 3 && t.stepTitles.financial}
                  {step === 4 && t.stepTitles.review}
                </CardTitle>
                <CardDescription>
                  {step === 1 && t.stepDescriptions.personalInfo}
                  {step === 2 && t.stepDescriptions.employment}
                  {step === 3 && t.stepDescriptions.financial}
                  {step === 4 && t.stepDescriptions.review}
                </CardDescription>

                <Progress
                  value={(step / 4) * 100}
                  max={100}
                  className="mt-4 text-primary"
                />

                <div className="mt-4 rounded-lg border border-primary/20 bg-background/80 p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Shield className="h-4 w-4" />
                    {t.assurance.title}
                  </div>
                  <p className="text-muted-foreground">{t.assurance.description}</p>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    {t.assurance.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6">
                  {step === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.form.fullName} *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder={t.form.fullNamePlaceholder}
                            value={formData.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onBlur={() => handleFieldBlur('name')}
                            className={`pl-10 ${getFieldError(errors, 'name') ? 'border-red-500' : ''}`}
                            autoComplete="name"
                            required
                          />
                        </div>
                        {getFieldError(errors, 'name') && (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'name')}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{t.form.email} *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={t.form.emailPlaceholder}
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            onBlur={() => handleFieldBlur('email')}
                            className={`pl-10 ${getFieldError(errors, 'email') ? 'border-red-500' : ''}`}
                            autoComplete="email"
                            required
                          />
                        </div>
                        {getFieldError(errors, 'email') ? (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'email')}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">{t.form.emailNote}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.form.phone} *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+60 12-345 6789"
                            value={formData.phone}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                            onBlur={() => handleFieldBlur('phone')}
                            className={`pl-10 ${getFieldError(errors, 'phone') ? 'border-red-500' : ''}`}
                            autoComplete="tel"
                            required
                          />
                        </div>
                        {getFieldError(errors, 'phone') && (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'phone')}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceArea">{t.form.serviceArea.label} *</Label>
                        <select
                          id="serviceArea"
                          value={formData.serviceArea}
                          onChange={(e) =>
                            handleFieldChange('serviceArea', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('serviceArea')}
                          className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                            getFieldError(errors, 'serviceArea') ? 'border-red-500 focus-visible:ring-red-500/40' : ''
                          }`}
                          aria-invalid={!!getFieldError(errors, 'serviceArea')}
                        >
                          {SERVICE_AREAS.map((area) => (
                            <option key={area.regionCode} value={area.regionCode}>
                              {area.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-muted-foreground">{t.form.serviceArea.helper}</p>
                        {getFieldError(errors, 'serviceArea') && (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'serviceArea')}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referralSource">{t.quickQuestions.referral}</Label>
                        <select
                          id="referralSource"
                          value={formData.referralSource}
                          onChange={(e) => handleFieldChange('referralSource', e.target.value)}
                          onBlur={() => handleFieldBlur('referralSource')}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                          <option value="">{t.quickQuestions.referralPlaceholder}</option>
                          {referralOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>{t.quickQuestions.contactPreference}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {contactPreferences.map((pref) => (
                            <button
                              key={pref.value}
                              type="button"
                              onClick={() => handleFieldChange('contactPreference', pref.value)}
                              className={`p-2 rounded-lg border text-xs sm:text-sm transition-all ${
                                formData.contactPreference === pref.value
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/40'
                              }`}
                            >
                              {pref.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{t.quickQuestions.contactNote}</p>
                      </div>

                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label>{t.form.employmentType} *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {employmentTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, employmentType: type.value })}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                formData.employmentType === type.value
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employerName">{t.form.companyName}</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="employerName"
                            placeholder={t.form.companyPlaceholder}
                            value={formData.employerName}
                            onChange={(e) => handleFieldChange('employerName', e.target.value)}
                            onBlur={() => handleFieldBlur('employerName')}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">{t.form.jobTitle}</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="jobTitle"
                            placeholder={t.form.jobPlaceholder}
                            value={formData.jobTitle}
                            onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                            onBlur={() => handleFieldBlur('jobTitle')}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">{t.form.monthlyIncome} *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="monthlyIncome"
                            type="number"
                            placeholder="5000"
                            value={formData.monthlyIncome}
                            onChange={(e) => handleFieldChange('monthlyIncome', e.target.value)}
                            onBlur={() => handleFieldBlur('monthlyIncome')}
                            className={`pl-10 ${getFieldError(errors, 'monthlyIncome') ? 'border-red-500' : ''}`}
                            inputMode="numeric"
                            min="0"
                            required
                          />
                        </div>
                        {getFieldError(errors, 'monthlyIncome') ? (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'monthlyIncome')}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">{t.form.incomeNote}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="p-4 bg-muted/50 rounded-lg mb-4">
                        <p className="text-sm text-muted-foreground">{t.form.debtNote}</p>
                      </div>
                      <div className="rounded-xl border border-primary/10 bg-white/80 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.insights.dsr}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${dsrBadgeClass}`}>
                            {dsrLabel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {estimatedDSR !== null ? dsrStatusText : t.insights.missing}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="houseLoan">{t.form.houseLoan}</Label>
                          <Input
                            id="houseLoan"
                            type="number"
                            placeholder="0"
                            value={formData.houseLoan}
                            onChange={(e) => handleFieldChange('houseLoan', e.target.value)}
                            onBlur={() => handleFieldBlur('houseLoan')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carLoan">{t.form.carLoan}</Label>
                          <Input
                            id="carLoan"
                            type="number"
                            placeholder="0"
                            value={formData.carLoan}
                            onChange={(e) => handleFieldChange('carLoan', e.target.value)}
                            onBlur={() => handleFieldBlur('carLoan')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="personalLoan">{t.form.personalLoan}</Label>
                          <Input
                            id="personalLoan"
                            type="number"
                            placeholder="0"
                            value={formData.personalLoan}
                            onChange={(e) => handleFieldChange('personalLoan', e.target.value)}
                            onBlur={() => handleFieldBlur('personalLoan')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="creditCard">{t.form.creditCard}</Label>
                          <Input
                            id="creditCard"
                            type="number"
                            placeholder="0"
                            value={formData.creditCard}
                            onChange={(e) => handleFieldChange('creditCard', e.target.value)}
                            onBlur={() => handleFieldBlur('creditCard')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otherDebts">{t.form.otherDebts}</Label>
                          <Input
                            id="otherDebts"
                            type="number"
                            placeholder="0"
                            value={formData.otherDebts}
                            onChange={(e) => handleFieldChange('otherDebts', e.target.value)}
                            onBlur={() => handleFieldBlur('otherDebts')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loanAmount">{t.form.desiredAmount}</Label>
                          <Input
                            id="loanAmount"
                            type="number"
                            placeholder="100000"
                            value={formData.loanAmount}
                            onChange={(e) => handleFieldChange('loanAmount', e.target.value)}
                            onBlur={() => handleFieldBlur('loanAmount')}
                            inputMode="numeric"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanPurpose">{t.form.loanPurpose}</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {t.form.purposes.map((purpose) => (
                            <button
                              key={purpose}
                              type="button"
                              onClick={() => handleFieldChange('loanPurpose', purpose)}
                              className={`p-2 rounded-lg border text-sm transition-all ${
                                formData.loanPurpose === purpose
                                  ? 'border-primary bg-primary/5 text-primary font-medium'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {purpose}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalNotes">{t.form.additionalNotes}</Label>
                        <Textarea
                          id="additionalNotes"
                          placeholder={t.form.additionalNotesPlaceholder}
                          value={formData.additionalNotes}
                          onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
                          onBlur={() => handleFieldBlur('additionalNotes')}
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            {t.reviewSection.personalInfo}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">{t.reviewSection.name}:</div>
                            <div className="font-medium">{formData.name}</div>
                            <div className="text-muted-foreground">{t.reviewSection.email}:</div>
                            <div className="font-medium">{formData.email}</div>
                            <div className="text-muted-foreground">{t.reviewSection.phone}:</div>
                            <div className="font-medium">{formData.phone}</div>
                            <div className="text-muted-foreground">{t.reviewSection.serviceArea}:</div>
                            <div className="font-medium">
                              {SERVICE_AREAS.find((area) => area.regionCode === formData.serviceArea)?.name ||
                                formData.serviceArea}
                            </div>
                            {formData.referralSource && (
                              <>
                                <div className="text-muted-foreground">{t.quickQuestions.referral}:</div>
                                <div className="font-medium">{formData.referralSource}</div>
                              </>
                            )}
                            {formData.contactPreference && (
                              <>
                                <div className="text-muted-foreground">{t.quickQuestions.contactPreference}:</div>
                                <div className="font-medium">
                                  {
                                    contactPreferences.find((pref) => pref.value === formData.contactPreference)
                                      ?.label
                                  }
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            {t.reviewSection.employmentDetails}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">{t.reviewSection.type}:</div>
                            <div className="font-medium capitalize">{formData.employmentType}</div>
                            {formData.employerName && (
                              <>
                                <div className="text-muted-foreground">{t.reviewSection.company}:</div>
                                <div className="font-medium">{formData.employerName}</div>
                              </>
                            )}
                            <div className="text-muted-foreground">{t.reviewSection.income}:</div>
                            <div className="font-medium">RM {parseInt(formData.monthlyIncome || '0').toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            {t.reviewSection.financialSummary}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">{t.reviewSection.totalDebt}:</div>
                            <div className="font-medium">
                              RM{' '}
                              {(
                                (parseInt(formData.houseLoan || '0') || 0) +
                                (parseInt(formData.carLoan || '0') || 0) +
                                (parseInt(formData.personalLoan || '0') || 0) +
                                (parseInt(formData.creditCard || '0') || 0) +
                                (parseInt(formData.otherDebts || '0') || 0)
                              ).toLocaleString()}
                            </div>
                            {formData.loanPurpose && (
                              <>
                                <div className="text-muted-foreground">{t.reviewSection.loanPurpose}:</div>
                                <div className="font-medium">{formData.loanPurpose}</div>
                              </>
                            )}
                            {formData.loanAmount && (
                              <>
                                <div className="text-muted-foreground">{t.reviewSection.desiredAmount}:</div>
                                <div className="font-medium">RM {parseInt(formData.loanAmount).toLocaleString()}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{t.security.title}</p>
                            <p className="text-xs text-muted-foreground">{t.security.description}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-4">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.navigation.back}
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button type="button" onClick={nextStep} className="flex-1 btn-gradient text-primary-foreground">
                        {t.navigation.next}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-12 font-semibold btn-gradient text-primary-foreground shadow-lg shadow-primary/25"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        {t.navigation.submit}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-lg border-2 border-primary/20 surface-card">
                <CardHeader className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground pb-4">
                  <Badge className="bg-white/20 text-white border-0 w-fit mb-2">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {t.sidebar.selectedService}
                  </Badge>
                  <CardTitle className="text-lg">{serviceData.name}</CardTitle>

                  {/* Analysis Fee - RM30 */}
                  <div className="mt-4 p-3 bg-white/10 rounded-lg">
                    <p className="text-xs opacity-80 mb-1">{t.sidebar.analysisFee}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">RM{ANALYSIS_FEE}</span>
                      <span className="text-sm opacity-80">{t.sidebar.oneTime}</span>
                    </div>
                  </div>

                  {/* Loan Rate Reference */}
                  <div className="mt-3 text-sm opacity-80">
                    <span>{t.sidebar.loanRate}: </span>
                    <span className="font-semibold">{loanRates[serviceId]}% </span>
                    <span className="text-xs">{t.sidebar.rateNote}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3">{t.sidebar.included}</h4>
                  <ul className="space-y-2">
                    {t.sidebar.analysisFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground bg-muted/40 border border-dashed rounded-md p-3">
                    {t.sidebar.paymentNote}
                  </div>
                </CardContent>
              </Card>

              {serviceData.spotlight && (
                <Card className="border border-amber-200 shadow-sm surface-card">
                  <CardContent className="p-4 space-y-3">
                    <p className="italic text-sm text-muted-foreground">{serviceData.spotlight.quote}</p>
                    <p className="text-xs text-muted-foreground">— {serviceData.spotlight.author}</p>
                    <Separator />
                    <p className="text-sm font-semibold">{serviceData.spotlight.faq.question}</p>
                    <p className="text-sm text-muted-foreground">{serviceData.spotlight.faq.answer}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="border-primary/20 shadow-sm surface-card">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.insights.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.insights.income}</span>
                      <span className="font-semibold">{formattedIncome}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.insights.debts}</span>
                      <span className="font-semibold">{formattedDebt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.insights.dsr}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${dsrBadgeClass}`}>
                        {dsrLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {estimatedDSR !== null ? dsrStatusText : t.insights.missing}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow surface-card">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{t.whatsappHelper.title}</p>
                      <p className="text-sm text-muted-foreground">{t.whatsappHelper.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.whatsappHelper.responseTime}</p>
                  <Button onClick={openWhatsApp} className="w-full gap-2 btn-gradient text-primary-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {t.whatsappHelper.button}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">{t.whatsappHelper.subtext}</p>
                </CardContent>
              </Card>

              <Card className="surface-card">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t.sidebar.turnaround}</p>
                      <p className="text-xs text-muted-foreground">{t.sidebar.turnaroundDesc}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t.sidebar.confidential}</p>
                      <p className="text-xs text-muted-foreground">{t.sidebar.confidentialDesc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center text-sm text-muted-foreground">
                <p>{t.sidebar.needHelp}</p>
                <button
                  onClick={openWhatsApp}
                  className="text-primary hover:underline font-medium"
                >
                  {COMPANY.whatsapp}
                </button>
                <p className="text-xs mt-1">{t.whatsappHelper.responseTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
