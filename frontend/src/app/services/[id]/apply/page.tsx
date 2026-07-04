'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { applicationsAPI } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n';
import { COMPANY, SERVICE_AREAS } from '@/lib/constants';
import { loanApplicationSchema, validateForm, getFieldError } from '@/lib/validation';
import {
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
      personalInfo: 'Quick Check',
      employment: 'Contact Details',
      review: 'Review',
    },
    stepTitles: {
      personalInfo: 'Quick Approval Check',
      employment: 'Contact & Work Details',
      review: 'Review & Submit',
    },
    stepDescriptions: {
      personalInfo: 'Tell us your state, income, and loan amount first',
      employment: 'Add your contact details so our consultant can reach you',
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
      desiredAmount: 'Desired Loan Amount (RM)',
      desiredAmountNote: 'How much do you want to borrow?',
    },
    reviewSection: {
      personalInfo: 'Personal Information',
      employmentDetails: 'Employment & Loan Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      serviceArea: 'Service Area',
      type: 'Type',
      company: 'Company',
      income: 'Income',
      desiredAmount: 'Loan Amount',
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
      title: 'Your application snapshot',
      income: 'Monthly income',
      loanAsk: 'Loan amount requested',
      ctosNote:
        'We will pull your CTOS & CCRIS reports to calculate your DSR and approval chances. No need to key in your existing debts here.',
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
      personalInfo: 'Semakan Pantas',
      employment: 'Butiran Hubungan',
      review: 'Semakan',
    },
    stepTitles: {
      personalInfo: 'Semakan Kelayakan Pantas',
      employment: 'Butiran Hubungan & Kerja',
      review: 'Semak & Hantar',
    },
    stepDescriptions: {
      personalInfo: 'Berikan negeri, pendapatan, dan jumlah pinjaman dahulu',
      employment: 'Tambah butiran hubungan supaya perunding kami boleh hubungi anda',
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
      desiredAmount: 'Jumlah Pinjaman Dikehendaki (RM)',
      desiredAmountNote: 'Berapa jumlah yang anda ingin pinjam?',
    },
    reviewSection: {
      personalInfo: 'Maklumat Peribadi',
      employmentDetails: 'Pekerjaan & Pinjaman',
      name: 'Nama',
      email: 'E-mel',
      phone: 'Telefon',
      serviceArea: 'Kawasan Perkhidmatan',
      type: 'Jenis',
      company: 'Syarikat',
      income: 'Pendapatan',
      desiredAmount: 'Jumlah Pinjaman',
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
      title: 'Ringkasan permohonan anda',
      income: 'Pendapatan bulanan',
      loanAsk: 'Jumlah pinjaman dikehendaki',
      ctosNote:
        'Kami akan tarik laporan CTOS & CCRIS untuk mengira DSR dan peluang kelulusan anda. Tidak perlu isikan hutang sedia ada di sini.',
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
    loanAmount: '',
    contactPreference: 'any',
  });

  const parseAmount = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  const monthlyIncomeValue = parseAmount(formData.monthlyIncome);
  const loanAmountValue = parseAmount(formData.loanAmount);
  const formattedIncome = monthlyIncomeValue ? `RM ${monthlyIncomeValue.toLocaleString()}` : '—';
  const formattedLoanAmount = loanAmountValue ? `RM ${loanAmountValue.toLocaleString()}` : '—';
  const incomeBand = monthlyIncomeValue
    ? monthlyIncomeValue < 3000
      ? 'below-rm3000'
      : monthlyIncomeValue < 5000
        ? 'rm3000-rm5000'
        : monthlyIncomeValue < 8000
          ? 'rm5000-rm8000'
          : 'above-rm8000'
    : 'unknown';

  // Live-validation helpers for instant positive feedback
  const isValidEmail = /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(formData.email.trim());
  const isValidPhone = /^(\+?60|0)[0-9\s-]{8,14}$/.test(formData.phone.trim());

  const openWhatsApp = () => {
    if (typeof window === 'undefined') return;
    trackEvent('apply_whatsapp_click', { service_id: serviceId, language });
    const popup = window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = whatsappLink;
    }
  };

  useEffect(() => {
    if (!serviceData) return;
    trackEvent('service_apply_start', {
      service_id: serviceId,
      service_name: serviceData.name,
      language,
    });
  }, [language, serviceData, serviceId]);
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
    const fieldValue = value ?? formData[field];

    if (field === 'monthlyIncome') {
      if (!fieldValue.trim()) {
        setFieldError(
          'monthlyIncome',
          language === 'ms' ? 'Sila masukkan pendapatan bulanan anda' : 'Please enter your monthly income',
        );
        return false;
      }
    }

    const fieldSchema = loanApplicationSchema.shape[field];
    const result = fieldSchema.safeParse(fieldValue);
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
            <LocaleLink href="/services">{t.backToServices}</LocaleLink>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.monthlyIncome.trim()) {
      setErrors((prev) => ({
        ...prev,
        monthlyIncome: language === 'ms' ? 'Sila masukkan pendapatan bulanan anda' : 'Please enter your monthly income',
      }));
      toast.error(t.toast.fillRequired);
      return;
    }

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
        employmentType: validatedData.employmentType || 'employed',
        employerName: validatedData.employerName || undefined,
        jobTitle: validatedData.jobTitle || undefined,
        monthlyIncome: validatedData.monthlyIncome
          ? parseFloat(validatedData.monthlyIncome) || 0
          : 0,
        loanAmount: parseFloat(validatedData.loanAmount),
        contactPreference: validatedData.contactPreference || undefined,
      });

      trackEvent('apply_submit_success', {
        service_id: serviceId,
        employment_type: formData.employmentType,
        income_band: incomeBand,
        language,
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
      const nextErrors: Record<string, string> = {};

      if (!formData.monthlyIncome.trim()) {
        nextErrors.monthlyIncome = language === 'ms'
          ? 'Sila masukkan pendapatan bulanan anda'
          : 'Please enter your monthly income';
      } else if (!loanApplicationSchema.shape.monthlyIncome.safeParse(formData.monthlyIncome).success) {
        nextErrors.monthlyIncome = language === 'ms'
          ? 'Sila masukkan pendapatan bulanan yang sah'
          : 'Please enter a valid monthly income';
      }

      if (!loanApplicationSchema.shape.loanAmount.safeParse(formData.loanAmount).success) {
        nextErrors.loanAmount = language === 'ms'
          ? 'Sila masukkan jumlah pinjaman yang sah'
          : 'Please enter a valid loan amount';
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...nextErrors }));
        setTouched((prev) => ({
          ...prev,
          serviceArea: true,
          monthlyIncome: true,
          loanAmount: true,
          contactPreference: true,
        }));
        toast.error(t.toast.fillRequired);
        return;
      }

      trackEvent('apply_step_1_complete', {
        service_id: serviceId,
        service_area: formData.serviceArea,
        income_band: incomeBand,
        loan_amount: loanAmountValue || 0,
        language,
      });
    }

    if (step === 2) {
      const stepSchema = loanApplicationSchema.pick({
        name: true,
        email: true,
        phone: true,
        employmentType: true,
      });
      const result = validateForm(stepSchema, formData);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, ...result.errors }));
        setTouched((prev) => ({
          ...prev,
          name: true,
          email: true,
          phone: true,
          employmentType: true,
        }));
        toast.error(t.toast.fillRequired);
        return;
      }

      trackEvent('apply_step_2_complete', {
        service_id: serviceId,
        employment_type: formData.employmentType,
        language,
      });
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
  const contactPreferences = [
    { value: 'any', label: language === 'ms' ? 'Bila-bila masa' : 'Anytime' },
    { value: 'morning', label: language === 'ms' ? 'Pagi (9am-12pm)' : 'Morning (9am-12pm)' },
    { value: 'afternoon', label: language === 'ms' ? 'Petang (12pm-4pm)' : 'Afternoon (12pm-4pm)' },
    { value: 'evening', label: language === 'ms' ? 'Malam (4pm-8pm)' : 'Evening (4pm-8pm)' },
  ];
  const stepItems = [
    { label: t.steps.personalInfo, description: t.stepDescriptions.personalInfo },
    { label: t.steps.employment, description: t.stepDescriptions.employment },
    { label: t.steps.review, description: t.stepDescriptions.review },
  ];

  return (
    <div className="relative py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container max-w-5xl relative">
        <Button variant="ghost" asChild className="mb-6">
          <LocaleLink href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToServices}
          </LocaleLink>
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
          <Card className="p-4 border border-border/70 bg-card">
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
            <Card className="shadow-lg border border-border/70 bg-card">
              <CardHeader className="border-b border-border/60">
                {/* Mobile: compact "Step N of 3" pill */}
                <p className="sm:hidden text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-3 py-1">
                    <span>{String(step).padStart(2, '0')} / 03</span>
                    <span className="text-muted-foreground font-medium normal-case tracking-normal">
                      {stepItems[step - 1]?.label}
                    </span>
                  </span>
                </p>
                {/* Desktop: full 3-step breadcrumb */}
                <ol className="hidden sm:flex flex-wrap gap-2 text-xs text-muted-foreground mb-3" aria-label={language === 'ms' ? 'Langkah permohonan' : 'Application steps'}>
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
                  {step === 3 && t.stepTitles.review}
                </CardTitle>
                <CardDescription>
                  {step === 1 && t.stepDescriptions.personalInfo}
                  {step === 2 && t.stepDescriptions.employment}
                  {step === 3 && t.stepDescriptions.review}
                </CardDescription>

                <Progress
                  value={(step / 3) * 100}
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
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                        {language === 'ms'
                          ? 'Mula dengan maklumat yang paling penting: negeri, pendapatan bersih bulanan, dan jumlah pinjaman yang anda perlukan.'
                          : 'Start with the decision-making basics: your state, monthly take-home income, and the amount you need.'}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceArea">{t.form.serviceArea.label} *</Label>
                        <select
                          id="serviceArea"
                          value={formData.serviceArea}
                          onChange={(e) => handleFieldChange('serviceArea', e.target.value)}
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
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
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

                        <div className="space-y-2">
                          <Label htmlFor="loanAmount">{t.form.desiredAmount} *</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="loanAmount"
                              type="number"
                              placeholder="50000"
                              value={formData.loanAmount}
                              onChange={(e) => handleFieldChange('loanAmount', e.target.value)}
                              onBlur={() => handleFieldBlur('loanAmount')}
                              className={`pl-10 ${getFieldError(errors, 'loanAmount') ? 'border-red-500' : ''}`}
                              inputMode="numeric"
                              min="0"
                              required
                            />
                          </div>
                          {getFieldError(errors, 'loanAmount') ? (
                            <p className="text-sm text-red-500">{getFieldError(errors, 'loanAmount')}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">{t.form.desiredAmountNote}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{t.quickQuestions.contactPreference}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {contactPreferences.map((pref) => (
                            <button
                              key={pref.value}
                              type="button"
                              onClick={() => handleFieldChange('contactPreference', pref.value)}
                              className={`rounded-lg border p-2 text-xs transition-all sm:text-sm ${
                                formData.contactPreference === pref.value
                                  ? 'border-primary bg-primary/5 font-medium text-primary'
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
                      <div className="grid gap-6 md:grid-cols-2">
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
                              className={`pl-10 pr-10 ${getFieldError(errors, 'phone') ? 'border-red-500' : isValidPhone ? 'border-emerald-500/70' : ''}`}
                              autoComplete="tel"
                              required
                            />
                            {isValidPhone && !getFieldError(errors, 'phone') && (
                              <CheckCircle
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600"
                                aria-label={language === 'ms' ? 'Telefon sah' : 'Valid phone'}
                              />
                            )}
                          </div>
                          {getFieldError(errors, 'phone') && (
                            <p className="text-sm text-red-500">{getFieldError(errors, 'phone')}</p>
                          )}
                        </div>
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
                            className={`pl-10 pr-10 ${getFieldError(errors, 'email') ? 'border-red-500' : isValidEmail ? 'border-emerald-500/70' : ''}`}
                            autoComplete="email"
                            required
                          />
                          {isValidEmail && !getFieldError(errors, 'email') && (
                            <CheckCircle
                              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600"
                              aria-label={language === 'ms' ? 'E-mel sah' : 'Valid email'}
                            />
                          )}
                        </div>
                        {getFieldError(errors, 'email') ? (
                          <p className="text-sm text-red-500">{getFieldError(errors, 'email')}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">{t.form.emailNote}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>{t.form.employmentType} *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {employmentTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, employmentType: type.value })}
                              className={`rounded-lg border-2 p-3 text-sm font-medium transition-all ${
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

                      <div className="grid gap-6 md:grid-cols-2">
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
                      </div>
                    </>
                  )}

                  {step === 3 && (
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
                            <div className="text-muted-foreground">{t.reviewSection.desiredAmount}:</div>
                            <div className="font-medium">RM {parseInt(formData.loanAmount || '0').toLocaleString()}</div>
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
                    {step < 3 ? (
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
              {serviceData.spotlight && (
                <Card className="border border-amber-200 shadow-sm bg-card">
                  <CardContent className="p-4 space-y-3">
                    <p className="italic text-sm text-muted-foreground">{serviceData.spotlight.quote}</p>
                    <p className="text-xs text-muted-foreground">— {serviceData.spotlight.author}</p>
                    <Separator />
                    <p className="text-sm font-semibold">{serviceData.spotlight.faq.question}</p>
                    <p className="text-sm text-muted-foreground">{serviceData.spotlight.faq.answer}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="border border-primary/20 shadow-sm bg-card">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.insights.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.insights.income}</span>
                      <span className="font-semibold tabular-nums">{formattedIncome}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.insights.loanAsk}</span>
                      <span className="font-semibold tabular-nums">{formattedLoanAmount}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.insights.ctosNote}</p>
                </CardContent>
              </Card>

              <Card className="border border-green-200 shadow-sm bg-card">
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

              <Card className="border border-border/70 bg-card">
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
