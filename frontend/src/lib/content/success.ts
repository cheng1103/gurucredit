import type { Language } from '@/lib/i18n/translations';

export interface SuccessPageContent {
  success: string;
  title: string;
  thankYou: string;
  copyReference: string;
  reference: { title: string; saveNote: string };
  service: { title: string };
  whatsNext: {
    title: string;
    steps: { title: string; description: string; time: string }[];
  };
  timeline: { title: string; statuses: { label: string; eta: string }[] };
  checklist: { title: string; description: string; button: string };
  payment: { title: string; description: string; bullets: string[]; note: string };
  contact: { title: string; description: string; whatsapp: string; responseTime: string; scan: string };
  buttons: { backHome: string; tryCalculator: string };
  proTip: string;
}

export const successContent: Record<Language, SuccessPageContent> = {
  en: {
    success: 'Success',
    title: 'Application Submitted!',
    thankYou: 'Thank you for choosing GURU Credits',
    copyReference: 'Copy reference',
    reference: {
      title: 'Your Reference Number',
      saveNote: 'Please save this number for your reference',
    },
    service: { title: 'Service Requested' },
    whatsNext: {
      title: 'What happens next?',
      steps: [
        {
          title: 'Check your email & WhatsApp',
          description:
            "We've emailed your reference number and will share the RM30 analysis fee instructions directly over WhatsApp. Only pay once our consultant confirms your details in the chat.",
          time: 'Immediately',
        },
        {
          title: 'We analyze your information',
          description: 'Our expert team will review your credit profile and financial details.',
          time: 'Within 24 hours',
        },
        {
          title: 'Receive your detailed report',
          description: 'Get your comprehensive analysis with recommendations via email and WhatsApp.',
          time: 'Within 24-48 hours',
        },
      ],
    },
    timeline: {
      title: 'Timeline overview',
      statuses: [
        { label: 'Application received', eta: 'Now' },
        { label: 'Consultant assigned', eta: '< 2 hours' },
        { label: 'Analysis in progress', eta: 'Within 24 hours' },
        { label: 'Report + WhatsApp follow-up', eta: 'Within 48 hours' },
      ],
    },
    checklist: {
      title: 'Document checklist',
      description: 'Prepare these items so you can share them quickly over WhatsApp when our consultant reaches out.',
      button: 'Download checklist (PDF)',
    },
    payment: {
      title: 'RM30 analysis fee via WhatsApp',
      description: 'We only collect payments through our verified WhatsApp line—never on the website.',
      bullets: [
        'Wait for our consultant to greet you on WhatsApp before paying.',
        'You will receive the official payment link/QR directly in the chat.',
        'Keep the WhatsApp receipt as part of your case record.',
      ],
      note: 'If anyone asks you to pay elsewhere, verify with us on WhatsApp before sending money.',
    },
    contact: {
      title: "Questions? We're here to help!",
      description:
        'All document sharing and payments continue through WhatsApp. Tap below to resume the conversation with our consultant.',
      whatsapp: 'Continue on WhatsApp',
      responseTime: 'Average reply time: under 10 minutes during business hours.',
      scan: 'On desktop? Scan to open WhatsApp Web.',
    },
    buttons: { backHome: 'Back to Home', tryCalculator: 'Take Eligibility Test' },
    proTip: "Pro tip: Make sure to check your spam/junk folder if you don't see our email within 30 minutes.",
  },
  ms: {
    success: 'Berjaya',
    title: 'Permohonan Dihantar!',
    thankYou: 'Terima kasih kerana memilih GURU Credits',
    copyReference: 'Salin rujukan',
    reference: {
      title: 'Nombor Rujukan Anda',
      saveNote: 'Sila simpan nombor ini untuk rujukan anda',
    },
    service: { title: 'Perkhidmatan Dimohon' },
    whatsNext: {
      title: 'Apa yang berlaku seterusnya?',
      steps: [
        {
          title: 'Semak e-mel & WhatsApp anda',
          description:
            'Kami telah menghantar e-mel rujukan dan akan berkongsi arahan pembayaran RM30 secara terus melalui WhatsApp. Hanya buat bayaran selepas perunding kami mengesahkan maklumat anda dalam chat.',
          time: 'Serta-merta',
        },
        {
          title: 'Kami menganalisis maklumat anda',
          description: 'Pasukan pakar kami akan menyemak profil kredit dan butiran kewangan anda.',
          time: 'Dalam 24 jam',
        },
        {
          title: 'Terima laporan terperinci anda',
          description: 'Dapatkan analisis komprehensif dengan cadangan melalui e-mel dan WhatsApp.',
          time: 'Dalam 24-48 jam',
        },
      ],
    },
    timeline: {
      title: 'Garis masa proses',
      statuses: [
        { label: 'Permohonan diterima', eta: 'Sekarang' },
        { label: 'Perunding ditugaskan', eta: '< 2 jam' },
        { label: 'Analisis sedang berjalan', eta: 'Dalam 24 jam' },
        { label: 'Laporan + WhatsApp susulan', eta: 'Dalam 48 jam' },
      ],
    },
    checklist: {
      title: 'Senarai semak dokumen',
      description: 'Sediakan senarai ini supaya anda boleh kongsikan dengan pantas melalui WhatsApp apabila perunding menghubungi anda.',
      button: 'Muat turun senarai (PDF)',
    },
    payment: {
      title: 'Yuran analisis RM30 melalui WhatsApp',
      description: 'Kami hanya mengutip bayaran melalui nombor WhatsApp rasmi—tiada bayaran dalam laman web.',
      bullets: [
        'Tunggu perunding kami menyapa anda di WhatsApp sebelum membuat bayaran.',
        'Anda akan menerima pautan/QR rasmi terus di dalam chat.',
        'Simpan resit WhatsApp sebagai rekod permohonan anda.',
      ],
      note: 'Jika ada pihak lain meminta bayaran di tempat lain, sahkan dengan kami di WhatsApp sebelum membuat pembayaran.',
    },
    contact: {
      title: 'Soalan? Kami sedia membantu!',
      description:
        'Segala perkongsian dokumen dan pembayaran diteruskan melalui WhatsApp. Tekan butang di bawah untuk sambung perbualan dengan perunding kami.',
      whatsapp: 'Teruskan di WhatsApp',
      responseTime: 'Masa balas purata: kurang 10 minit pada waktu pejabat.',
      scan: 'Guna komputer? Imbas untuk buka WhatsApp Web.',
    },
    buttons: { backHome: 'Kembali ke Laman Utama', tryCalculator: 'Cuba Ujian Kelayakan' },
    proTip: 'Petua: Pastikan anda menyemak folder spam/junk jika anda tidak melihat e-mel kami dalam masa 30 minit.',
  },
};
