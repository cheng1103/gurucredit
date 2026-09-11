import type { Language } from '@/lib/i18n/translations';

export interface StatusPageContent {
  eyebrow: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbLabel: string;
  meta: string;
  referenceLabel: string;
  referencePlaceholder: string;
  emailLabel: string;
  button: string;
  resultTitle: string;
  createdAt: string;
  contactPref: string;
  referral: string;
  referenceWord: string;
  empty: string;
  formTitle: string;
  formDescription: string;
  notFound: {
    title: string;
    description: string;
    hints: { prefix: string; example: string; email: string; delay: string };
    retry: string;
    whatsapp: string;
  };
  help: {
    title: string;
    description: string;
    button: string;
  };
  statusLabels: Record<'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED', string>;
}

export const statusContent: Record<Language, StatusPageContent> = {
  en: {
    eyebrow: 'Status Tracker',
    title: 'Check Application Status',
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Status',
    meta: 'Live updates · WhatsApp follow-up · Secure lookup',
    referenceLabel: 'Reference ID',
    referencePlaceholder: 'e.g. GC20260418ABC123',
    emailLabel: 'Email used in application',
    button: 'Check status',
    resultTitle: 'Status overview',
    createdAt: 'Submitted on',
    contactPref: 'Preferred WhatsApp time',
    referral: 'Referral source',
    referenceWord: 'Reference',
    empty: 'Enter your reference ID and email to see updates. Our consultant will follow up via WhatsApp.',
    formTitle: 'Find my application',
    formDescription: 'Enter both fields to continue',
    notFound: {
      title: 'We could not find that reference',
      description:
        'The reference number and email you entered do not match any application in our system. Double-check the items below before retrying:',
      hints: {
        prefix: 'Reference numbers begin with',
        example: 'and 14 characters (e.g.',
        email: 'Use the same email address you entered on the application form.',
        delay: 'A newly submitted application may take a few minutes to appear.',
      },
      retry: 'Try again',
      whatsapp: 'Ask us on WhatsApp',
    },
    help: {
      title: 'Need help?',
      description: 'Share your reference ID with our consultant for faster support.',
      button: 'Chat on WhatsApp',
    },
    statusLabels: {
      PENDING: 'Pending review',
      IN_REVIEW: 'In review',
      APPROVED: 'Approved',
      REJECTED: 'Not suitable',
      COMPLETED: 'Completed',
    },
  },
  ms: {
    eyebrow: 'Penjejak Status',
    title: 'Semak Status Permohonan',
    breadcrumbHome: 'Utama',
    breadcrumbLabel: 'Status',
    meta: 'Kemaskini segera · Susulan WhatsApp · Semakan selamat',
    referenceLabel: 'ID Rujukan',
    referencePlaceholder: 'cth. GC20260418ABC123',
    emailLabel: 'E-mel yang digunakan',
    button: 'Semak status',
    resultTitle: 'Ringkasan status',
    createdAt: 'Dihantar pada',
    contactPref: 'Masa WhatsApp pilihan',
    referral: 'Sumber rujukan',
    referenceWord: 'Rujukan',
    empty: 'Masukkan ID rujukan & e-mel anda untuk melihat kemaskini. Perunding kami akan menghubungi melalui WhatsApp.',
    formTitle: 'Cari permohonan saya',
    formDescription: 'Masukkan kedua-dua maklumat untuk meneruskan',
    notFound: {
      title: 'Rujukan tidak dijumpai',
      description:
        'Kombinasi nombor rujukan dan e-mel tidak sepadan dengan sebarang permohonan kami. Periksa perkara berikut sebelum cuba semula:',
      hints: {
        prefix: 'Nombor rujukan bermula dengan',
        example: 'dan 14 aksara tambahan (contoh',
        email: 'Gunakan e-mel yang sama seperti semasa menghantar borang permohonan.',
        delay: 'Permohonan baru dihantar mungkin mengambil beberapa minit untuk muncul.',
      },
      retry: 'Cuba sekali lagi',
      whatsapp: 'Hubungi WhatsApp',
    },
    help: {
      title: 'Perlukan bantuan?',
      description: 'Kongsi ID rujukan dengan perunding untuk bantuan pantas.',
      button: 'Sembang di WhatsApp',
    },
    statusLabels: {
      PENDING: 'Menunggu semakan',
      IN_REVIEW: 'Sedang disemak',
      APPROVED: 'Diluluskan',
      REJECTED: 'Tidak sesuai',
      COMPLETED: 'Selesai',
    },
  },
};
